#!/usr/bin/env node
// .qa/enhance.mjs — content rewriter that hits all 10 quality dimensions
// (funny / interesting / attractive / interactive / human / specific / memorable / arc / load / not-AI).
// Reads existing weak content.md + live deck, returns a drop-in replacement.
//
// Usage:
//   node .qa/enhance.mjs decks/cb_decks/2_deck                    (writes content-enhanced.md)
//   node .qa/enhance.mjs decks/cb_decks/2_deck --inplace          (overwrites content.md, makes .bak)
//   node .qa/enhance.mjs decks/cb_decks/2_deck --no-screenshots   (text-only)

import fs from 'node:fs/promises';
import path from 'node:path';
import {
  ROOT, DEFAULT_MODEL,
  loadEnv, loadDeckFiles, loadGuidance, loadScreenshots,
  callGeminiWithFallback, loadPrompt, stripCodeFence, makeHeader, makePipelineFooter,
  makeIssueLog,
} from './lib/shared.mjs';

function buildUserPrompt({ deckRel, files, guidance, screenshotsCount }) {
  const today = new Date().toISOString().slice(0, 10);
  const sections = [
    `# Enhance this deck's content.md`,
    `**Deck path:** \`${deckRel}\``,
    `**Today:** ${today}`,
    `**Screenshots attached:** ${screenshotsCount}`,
    '',
  ];

  if (guidance.length > 0) {
    sections.push(`# Guidance (CLAUDE.md, broadest → most specific)`);
    for (const g of guidance) {
      sections.push(`## \`${g.relPath}\``);
      sections.push('```markdown', g.content, '```', '');
    }
  }

  if (files['index.html']) {
    sections.push(`# Live deck source (\`index.html\` — source of truth)`);
    sections.push('```html', files['index.html'], '```', '');
  }
  if (files['slides.md']) {
    sections.push(`# Live deck source (\`slides.md\` — source of truth)`);
    sections.push('```markdown', files['slides.md'], '```', '');
  }
  if (files['content.md']) {
    sections.push(`# Existing \`content.md\` — REWRITE this to hit all 10 quality dimensions`);
    sections.push('```markdown', files['content.md'], '```', '');
  } else {
    sections.push(`# Existing \`content.md\`\n_(none — write a fresh content.md from scratch matching the live deck)_\n`);
  }
  if (files['notes.md']) {
    sections.push(`# Companion \`notes.md\` (for tone reference; do not include in your output)`);
    sections.push('```markdown', files['notes.md'], '```', '');
  }

  sections.push('---');
  sections.push('# Your task');
  sections.push('Rebuild the speaker\'s voice from the ground up. Hit every one of the 10 dimensions in the system prompt. Output is the entire rewritten `content.md` as Markdown — no preamble, no code fences, no trailing notes.');
  return sections.join('\n');
}

async function main() {
  const argv = process.argv.slice(2);
  if (!argv[0] || ['-h', '--help'].includes(argv[0])) {
    console.log(`Usage: node .qa/enhance.mjs <deck-path> [--inplace] [--no-screenshots]
Outputs:
  default:    decks/<deck>/content-enhanced.md  (review, then mv to content.md)
  --inplace:  overwrites content.md (creates content.md.bak)`);
    process.exit(argv[0] ? 0 : 1);
  }

  const noScreens = argv.includes('--no-screenshots');
  const inplace = argv.includes('--inplace');
  const deckPath = path.resolve(argv.filter(a => !a.startsWith('--'))[0]);
  const deckRel = path.relative(ROOT, deckPath);

  try { await fs.access(deckPath); } catch { console.error(`Deck not found: ${deckPath}`); process.exit(2); }

  const log = makeIssueLog();
  console.log(`[enhance] ${deckRel}`);
  const t0 = Date.now();

  const { source, env } = await loadEnv();
  console.log(`[enhance] api key from ${path.relative(ROOT, source)}`);

  const guidance = await loadGuidance(deckPath);
  const files = await loadDeckFiles(deckPath);
  const screenshots = await loadScreenshots(deckPath, { skip: noScreens, autoRender: true, issueLog: log });
  console.log(`[enhance] CLAUDE.md ancestors: ${guidance.length}, screenshots: ${screenshots.length}, has content.md: ${!!files['content.md']}`);

  const systemPrompt = await loadPrompt('enhance.md');
  const userText = buildUserPrompt({ deckRel, files, guidance, screenshotsCount: screenshots.length });

  console.log(`[enhance] calling ${DEFAULT_MODEL}... (60–180s for a long deck)`);
  let result;
  try {
    result = await callGeminiWithFallback({
      apiKey: env.GEMINI_API_KEY,
      model: DEFAULT_MODEL,
      systemPrompt,
      userText,
      images: screenshots,
      generationConfig: { temperature: 0.75, maxOutputTokens: 32768 },
      issueLog: log,
    });
  } catch (err) {
    console.error(`[enhance] FATAL: ${err.message}`);
    if (/certificate|UNABLE_TO_VERIFY|self-signed/i.test(err.message)) {
      console.error('[enhance] Cert MITM — retry with: $env:NODE_OPTIONS = "--use-system-ca"');
    }
    process.exit(3);
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const u = result.usage || {};
  console.log(`[enhance] ${result.model} · ${elapsed}s · in=${u.promptTokenCount ?? '?'} out=${u.candidatesTokenCount ?? '?'}`);

  const body = stripCodeFence(result.text);
  const header = makeHeader({ tool: 'enhance', deckRel, model: result.model, elapsed, usage: u, screenshotsCount: screenshots.length });
  const footer = makePipelineFooter(log.issues);

  let outPath;
  if (inplace) {
    const orig = path.join(deckPath, 'content.md');
    const bak = path.join(deckPath, 'content.md.bak');
    if (files['content.md']) {
      await fs.writeFile(bak, files['content.md']);
      console.log(`[enhance] backup: ${path.relative(ROOT, bak)}`);
    }
    outPath = orig;
  } else {
    outPath = path.join(deckPath, 'content-enhanced.md');
  }
  await fs.writeFile(outPath, header + body + footer);
  console.log(`[enhance] ✓ ${path.relative(ROOT, outPath)}`);
  if (!inplace) console.log('[enhance] (review then mv to content.md, or rerun with --inplace)');
}

main().catch(err => {
  console.error('[enhance] FATAL:', err.message);
  if (process.env.QA_DEBUG && err.stack) console.error(err.stack);
  process.exit(1);
});

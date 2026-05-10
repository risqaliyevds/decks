#!/usr/bin/env node
// .qa/apply.mjs — final HTML rebuilder.
// Takes (current index.html + humanized content.md + visual manifest + assets)
// and produces a rebuilt index_new.html for safe A/B testing.
//
// Usage:
//   node .qa/apply.mjs decks/cb_decks/2_deck                  (writes index_new.html)
//   node .qa/apply.mjs decks/cb_decks/2_deck --inplace        (overwrites index.html, makes .bak)

import fs from 'node:fs/promises';
import path from 'node:path';
import {
  ROOT, DEFAULT_MODEL,
  loadEnv, loadDeckFiles, loadGuidance,
  callGeminiWithFallback, loadPrompt, stripCodeFence,
  makeIssueLog,
} from './lib/shared.mjs';

async function loadManifestAndAssets(deckPath) {
  const autoDir = path.join(deckPath, 'images/auto');
  let manifest = null;
  try { manifest = await fs.readFile(path.join(autoDir, 'manifest.md'), 'utf8'); } catch {}
  let assets = [];
  try {
    assets = (await fs.readdir(autoDir)).filter(f => f !== 'manifest.md');
  } catch {}
  return { manifest, assets, dir: autoDir };
}

function buildUserPrompt({ deckRel, files, guidance, manifest, assets }) {
  const today = new Date().toISOString().slice(0, 10);
  const sections = [
    `# Rebuild this deck's index.html with all editorial + visual decisions applied`,
    `**Deck path:** \`${deckRel}\``,
    `**Today:** ${today}`,
    `**Visual assets present in images/auto/:** ${assets.length} file(s)`,
    '',
  ];
  if (assets.length > 0) {
    sections.push('Asset list (paths are relative to the deck folder, e.g. `images/auto/<filename>`):');
    sections.push('```');
    for (const a of assets) sections.push(a);
    sections.push('```', '');
  }

  if (guidance.length > 0) {
    sections.push(`# Project + series rules (CLAUDE.md, broadest → most specific) — TREAT AS BINDING`);
    for (const g of guidance) {
      sections.push(`## \`${g.relPath}\``);
      sections.push('```markdown', g.content, '```', '');
    }
  }

  sections.push(`# Visual manifest (\`images/auto/manifest.md\`) — applies to slides as specified`);
  sections.push('```markdown', manifest || '(no manifest — skip Layer B)', '```', '');

  if (files['content.md']) {
    sections.push(`# Humanized speaker content (\`content.md\`) — distill into ON-SCREEN text per slide`);
    sections.push('```markdown', files['content.md'], '```', '');
  }

  if (files['index.html']) {
    sections.push(`# Current \`index.html\` — REBUILD this`);
    sections.push('```html', files['index.html'], '```', '');
  } else {
    throw new Error('No index.html in deck — apply requires existing HTML to rebuild');
  }

  sections.push('---');
  sections.push('# Your task');
  sections.push('Apply Layer A (content sync), Layer B (visual injection), Layer C (boring-fix). Preserve all CSS, all scripts, all class names, all structure. Output the **complete rebuilt HTML file** — start with `<!doctype html>` (or `<!DOCTYPE html>` matching the original casing), end with `</html>`. No preamble, no code fences, no commentary.');
  return sections.join('\n');
}

async function main() {
  const argv = process.argv.slice(2);
  if (!argv[0] || ['-h', '--help'].includes(argv[0])) {
    console.log(`Usage: node .qa/apply.mjs <deck-path> [--inplace]
Defaults: writes index_new.html (review before overwriting).
With --inplace: overwrites index.html (creates index.html.bak).`);
    process.exit(argv[0] ? 0 : 1);
  }

  const inplace = argv.includes('--inplace');
  const deckPath = path.resolve(argv.filter(a => !a.startsWith('--'))[0]);
  const deckRel = path.relative(ROOT, deckPath);

  try { await fs.access(deckPath); } catch { console.error(`Deck not found: ${deckPath}`); process.exit(2); }

  const log = makeIssueLog();
  console.log(`[apply] ${deckRel}`);
  const t0 = Date.now();

  const { source, env } = await loadEnv();
  console.log(`[apply] api key from ${path.relative(ROOT, source)}`);

  const guidance = await loadGuidance(deckPath);
  const files = await loadDeckFiles(deckPath);
  const { manifest, assets } = await loadManifestAndAssets(deckPath);

  if (!files['index.html']) { console.error(`[apply] index.html missing in ${deckRel}`); process.exit(3); }
  if (!files['content.md']) log.issue('No content.md — Layer A (content sync) will skip; only Layer B/C may apply');
  if (!manifest) log.issue('No images/auto/manifest.md — Layer B (visual injection) will skip; run illustrate first to enable');

  console.log(`[apply] CLAUDE.md ancestors: ${guidance.length}, content.md: ${!!files['content.md']}, manifest: ${!!manifest}, assets: ${assets.length}`);

  const systemPrompt = await loadPrompt('apply.md');
  const userText = buildUserPrompt({ deckRel, files, guidance, manifest, assets });

  console.log(`[apply] calling ${DEFAULT_MODEL}... (this is heavy — 90–240s for a typical deck)`);
  let result;
  try {
    result = await callGeminiWithFallback({
      apiKey: env.GEMINI_API_KEY,
      model: DEFAULT_MODEL,
      systemPrompt,
      userText,
      images: [], // no screenshots — we want fast & deterministic, work from HTML + content
      generationConfig: { temperature: 0.3, maxOutputTokens: 65536 }, // generous output budget
      issueLog: log,
    });
  } catch (err) {
    console.error(`[apply] FATAL: ${err.message}`);
    if (/certificate|UNABLE_TO_VERIFY|self-signed/i.test(err.message)) {
      console.error('[apply] Cert MITM — retry with: $env:NODE_OPTIONS = "--use-system-ca"');
    }
    process.exit(4);
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const u = result.usage || {};
  console.log(`[apply] ${result.model} · ${elapsed}s · in=${u.promptTokenCount ?? '?'} out=${u.candidatesTokenCount ?? '?'}`);

  let html = stripCodeFence(result.text);

  // Sanity checks
  const sectionCountIn = (files['index.html'].match(/<section class="slide/g) || []).length;
  const sectionCountOut = (html.match(/<section class="slide/g) || []).length;
  const startsWell = /^<!doctype html/i.test(html.trim());
  const endsWell = /<\/html>\s*$/i.test(html.trim());

  console.log(`[apply] sanity: starts<!doctype>=${startsWell} ends</html>=${endsWell} slides=${sectionCountOut}/${sectionCountIn}`);
  if (sectionCountOut !== sectionCountIn) log.issue(`slide count mismatch: input ${sectionCountIn}, output ${sectionCountOut}`);
  if (!startsWell) log.issue('output does not start with <!doctype html> — may be malformed');
  if (!endsWell) log.issue('output does not end with </html> — may be truncated');

  // Write
  let outPath;
  if (inplace) {
    const orig = path.join(deckPath, 'index.html');
    const bak = path.join(deckPath, 'index.html.bak');
    await fs.writeFile(bak, files['index.html']);
    console.log(`[apply] backup: ${path.relative(ROOT, bak)}`);
    outPath = orig;
  } else {
    outPath = path.join(deckPath, 'index_new.html');
  }
  await fs.writeFile(outPath, html);
  console.log(`[apply] ✓ ${path.relative(ROOT, outPath)} (${(html.length / 1024).toFixed(1)} KB)`);

  if (log.issues.length > 0) {
    console.log(`[apply] ⚠  ${log.issues.length} non-fatal issue(s):`);
    log.issues.forEach(m => console.log(`         - ${m}`));
  }
  if (!inplace) console.log(`[apply] open in browser to compare:  file:///${outPath.replace(/\\/g, '/')}`);
}

main().catch(err => {
  console.error('[apply] FATAL:', err.message);
  if (process.env.QA_DEBUG && err.stack) console.error(err.stack);
  process.exit(1);
});

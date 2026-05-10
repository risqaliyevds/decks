#!/usr/bin/env node
// .qa/humanize.mjs — Gemini-powered content.md rewriter.
// Reads a deck's index.html + content.md + screenshots and produces a humanized
// content-humanized.md (drop-in replacement candidate). Never overwrites
// content.md directly — diff/review/copy-paste is on you.
//
// Usage:
//   node .qa/humanize.mjs decks/cb_decks/1_deck
//   node .qa/humanize.mjs decks/cb_decks/1_deck --no-screenshots
//   node .qa/humanize.mjs decks/cb_decks/1_deck --inplace   ← overwrite content.md (uses backup)
//
// Required: GEMINI_API_KEY in .env. Cert MITM: NODE_OPTIONS=--use-system-ca.

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3-pro-preview';
const FALLBACK_MODELS = ['gemini-3-pro-preview', 'gemini-3.1-pro-preview', 'gemini-pro-latest', 'gemini-2.5-pro'];
const MAX_INLINE_BYTES = 18 * 1024 * 1024;

const pipelineIssues = [];
const issue = (m) => { pipelineIssues.push(m); console.warn(`⚠  ${m}`); };

async function loadEnv() {
  for (const p of [path.join(ROOT, '.env'), path.join(ROOT, 'decks/cb_decks/bots/.env')]) {
    try {
      const txt = await fs.readFile(p, 'utf8');
      const env = {};
      for (const line of txt.split(/\r?\n/)) {
        if (!line || line.startsWith('#')) continue;
        const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
        if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      }
      if (env.GEMINI_API_KEY) return { source: p, env };
    } catch { /* try next */ }
  }
  throw new Error('GEMINI_API_KEY not found in .env');
}

async function loadDeckFiles(deckPath) {
  const files = {};
  for (const name of ['index.html', 'slides.md', 'content.md', 'notes.md']) {
    try { files[name] = await fs.readFile(path.join(deckPath, name), 'utf8'); }
    catch { files[name] = null; }
  }
  return files;
}

async function loadGuidance(deckPath) {
  const found = [];
  let dir = deckPath;
  while (true) {
    try { found.push({ relPath: path.relative(ROOT, path.join(dir, 'CLAUDE.md')), content: await fs.readFile(path.join(dir, 'CLAUDE.md'), 'utf8') }); }
    catch { /* none here */ }
    if (path.resolve(dir) === path.resolve(ROOT)) break;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return found.reverse();
}

async function loadScreenshots(deckPath, skip) {
  if (skip) return [];
  const ssDir = path.join(deckPath, 'screenshots');
  let pngs = [];
  try { pngs = (await fs.readdir(ssDir)).filter(f => /^slide-\d+\.png$/.test(f)); }
  catch { issue('No screenshots directory — proceeding text-only'); return []; }
  pngs.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
  const out = [];
  for (const f of pngs) {
    try {
      const bytes = await fs.readFile(path.join(ssDir, f));
      const slideNum = parseInt(f.match(/\d+/)[0], 10);
      out.push({ slideNum, bytes });
    } catch (err) { issue(`screenshot ${f}: ${err.message}`); }
  }
  return out;
}

async function callGemini({ apiKey, model, systemPrompt, userText, images }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const parts = [{ text: userText }];
  let inlineBytes = Buffer.byteLength(userText, 'utf8');
  let dropped = 0;
  for (const img of images) {
    if (inlineBytes + img.bytes.length > MAX_INLINE_BYTES) { dropped++; continue; }
    parts.push({ inline_data: { mime_type: 'image/png', data: img.bytes.toString('base64') } });
    parts.push({ text: `↑ slide ${img.slideNum}` });
    inlineBytes += img.bytes.length;
  }
  if (dropped > 0) issue(`${dropped} screenshot(s) dropped to stay under inline byte budget`);

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts }],
    generationConfig: { temperature: 0.7, topP: 0.95, maxOutputTokens: 32768 },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Gemini API ${res.status}: ${(await res.text()).slice(0, 500)}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('\n') || '';
  if (!text) throw new Error(`empty response (finish: ${data.candidates?.[0]?.finishReason || 'unknown'})`);
  return { text, usage: data.usageMetadata, model };
}

async function callWithFallback(args) {
  const queue = [args.model, ...FALLBACK_MODELS.filter(m => m !== args.model)];
  let lastErr;
  for (const m of queue) {
    try {
      const out = await callGemini({ ...args, model: m });
      if (m !== args.model) issue(`Used ${m} as fallback (requested ${args.model})`);
      return out;
    } catch (err) {
      lastErr = err;
      if (!/^Gemini API (404|400):/.test(err.message)) throw err;
    }
  }
  throw lastErr;
}

function buildUserPrompt({ deckRel, files, guidance, screenshotsCount }) {
  const today = new Date().toISOString().slice(0, 10);
  const sections = [];
  sections.push(`# Humanize this deck's content.md`);
  sections.push(`**Deck path:** \`${deckRel}\``);
  sections.push(`**Today:** ${today}`);
  sections.push(`**Screenshots attached:** ${screenshotsCount}`);
  sections.push('');

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
    sections.push(`# Existing \`content.md\` (likely stale — REWRITE this)`);
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
  sections.push('Return the **entire rewritten `content.md`** as Markdown. Match the deck\'s language. Match the speaker\'s voice. Strip every AI cliché. Match the slide-by-slide structure to the LIVE deck (not the stale outline). Output is the file content only — no preamble, no code fences around the whole thing, no trailing notes.');
  return sections.join('\n');
}

async function main() {
  const argv = process.argv.slice(2);
  if (!argv[0] || ['--help', '-h'].includes(argv[0])) {
    console.log(`Usage: node .qa/humanize.mjs <deck-path> [--no-screenshots] [--inplace]
Examples:
  node .qa/humanize.mjs decks/cb_decks/1_deck
  node .qa/humanize.mjs decks/cb_decks/1_deck --no-screenshots
  node .qa/humanize.mjs decks/cb_decks/1_deck --inplace   (overwrites content.md, makes .bak)
`);
    process.exit(argv[0] ? 0 : 1);
  }

  const noScreenshots = argv.includes('--no-screenshots');
  const inplace = argv.includes('--inplace');
  const deckPath = path.resolve(argv.filter(a => !a.startsWith('--'))[0]);
  const deckRel = path.relative(ROOT, deckPath);

  try { await fs.access(deckPath); } catch { console.error(`Deck not found: ${deckPath}`); process.exit(2); }

  console.log(`[humanize] ${deckRel}`);
  const t0 = Date.now();

  const { source, env } = await loadEnv();
  console.log(`[humanize] api key from ${path.relative(ROOT, source)}`);

  const guidance = await loadGuidance(deckPath);
  const files = await loadDeckFiles(deckPath);
  const screenshots = await loadScreenshots(deckPath, noScreenshots);
  console.log(`[humanize] CLAUDE.md ancestors: ${guidance.length}, screenshots: ${screenshots.length}, has content.md: ${!!files['content.md']}`);

  const systemPrompt = await fs.readFile(path.join(__dirname, 'prompts/humanize.md'), 'utf8');
  const userText = buildUserPrompt({ deckRel, files, guidance, screenshotsCount: screenshots.length });

  console.log(`[humanize] calling ${DEFAULT_MODEL}... (this may take 60–180s for a long deck)`);
  let result;
  try {
    result = await callWithFallback({
      apiKey: env.GEMINI_API_KEY,
      model: DEFAULT_MODEL,
      systemPrompt,
      userText,
      images: screenshots,
    });
  } catch (err) {
    console.error(`[humanize] FATAL: ${err.message}`);
    if (/certificate|UNABLE_TO_VERIFY|self-signed/i.test(err.message)) {
      console.error('[humanize] Cert MITM — retry with: $env:NODE_OPTIONS = "--use-system-ca"');
    }
    process.exit(3);
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const u = result.usage || {};
  console.log(`[humanize] ${result.model} · ${elapsed}s · in=${u.promptTokenCount ?? '?'} out=${u.candidatesTokenCount ?? '?'} total=${u.totalTokenCount ?? '?'}`);

  // Strip stray code fences if the model wrapped the whole output in ```markdown
  let body = result.text.trim();
  if (body.startsWith('```')) {
    body = body.replace(/^```[a-zA-Z]*\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  const header = [
    `<!--`,
    `  Humanized by .qa/humanize.mjs`,
    `  Source: ${deckRel}/content.md (existing) + index.html + ${screenshots.length} screenshots`,
    `  Model: ${result.model}`,
    `  Generated: ${new Date().toISOString()}`,
    `  Elapsed: ${elapsed}s`,
    `  Tokens: in=${u.promptTokenCount ?? '?'} out=${u.candidatesTokenCount ?? '?'}`,
    `-->`,
    '',
  ].join('\n');

  let footer = '';
  if (pipelineIssues.length > 0) {
    footer = '\n\n<!-- Pipeline issues:\n' + pipelineIssues.map(m => `- ${m}`).join('\n') + '\n-->\n';
  }

  let outPath;
  if (inplace) {
    const orig = path.join(deckPath, 'content.md');
    const bak = path.join(deckPath, 'content.md.bak');
    if (files['content.md']) {
      await fs.writeFile(bak, files['content.md']);
      console.log(`[humanize] backup written: ${path.relative(ROOT, bak)}`);
    }
    outPath = orig;
  } else {
    outPath = path.join(deckPath, 'content-humanized.md');
  }
  await fs.writeFile(outPath, header + body + footer);
  console.log(`[humanize] ✓ ${path.relative(ROOT, outPath)}`);
  if (!inplace) console.log('[humanize] (review then mv to content.md, or rerun with --inplace to overwrite)');
}

main().catch(err => {
  console.error('[humanize] FATAL:', err.message);
  if (process.env.QA_DEBUG && err.stack) console.error(err.stack);
  process.exit(1);
});

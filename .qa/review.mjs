#!/usr/bin/env node
// .qa/review.mjs — multimodal Gemini-powered deck reviewer.
// Reads index.html + content.md + notes.md + screenshots/ for one deck and
// returns a Markdown qa-report.md inside the deck folder.
//
// Usage:
//   node .qa/review.mjs decks/cb_decks/1_deck
//   GEMINI_MODEL=gemini-3.1-pro-preview node .qa/review.mjs decks/cb_decks/1_deck
//
// Required: GEMINI_API_KEY in .env at repo root (fallback: decks/cb_decks/bots/.env)
// Cert MITM environments: also set NODE_OPTIONS=--use-system-ca

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-3-pro-preview';
const FALLBACK_MODELS = [
  'gemini-3-pro-preview',
  'gemini-3.1-pro-preview',
  'gemini-pro-latest',
  'gemini-2.5-pro',
];
const MAX_INLINE_BYTES = 18 * 1024 * 1024; // ~18 MB, under Gemini's 20 MB inline limit

// ---------- pipeline issue tracking (continue-on-error) ----------
const pipelineIssues = [];
const issue = (msg) => { pipelineIssues.push(msg); console.warn(`⚠  ${msg}`); };

// ---------- env loading ----------
async function loadEnv() {
  const candidates = [
    path.join(ROOT, '.env'),
    path.join(ROOT, 'decks/cb_decks/bots/.env'),
  ];
  for (const p of candidates) {
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
  throw new Error('GEMINI_API_KEY not found in .env (root or decks/cb_decks/bots/)');
}

// ---------- deck file loading ----------
async function loadDeckFiles(deckPath) {
  const files = {};
  // Optional files — missing is fine, log but don't shout.
  for (const name of ['index.html', 'slides.md', 'content.md', 'notes.md']) {
    try {
      files[name] = await fs.readFile(path.join(deckPath, name), 'utf8');
    } catch {
      files[name] = null;
    }
  }
  if (!files['index.html'] && !files['slides.md']) {
    issue('Neither index.html nor slides.md found — review will be text-only over content.md/notes.md');
  }
  return files;
}

// Walk from deck folder up to repo root, collecting every CLAUDE.md found.
// Returns an array of { relPath, content } in *descending depth* (most-specific last
// — so child rules can be presented as overriding/refining ancestor rules).
async function loadGuidance(deckPath) {
  const found = [];
  let dir = deckPath;
  while (true) {
    const candidate = path.join(dir, 'CLAUDE.md');
    try {
      const content = await fs.readFile(candidate, 'utf8');
      found.push({ relPath: path.relative(ROOT, candidate), content });
    } catch { /* no CLAUDE.md at this level */ }
    if (path.resolve(dir) === path.resolve(ROOT)) break;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // We collected child→root; reverse so the prompt lists root first (broadest rules)
  // and most-specific (deck-level) last for the model to layer correctly.
  return found.reverse();
}

function extractTitles(html) {
  if (!html) return [];
  const m = html.match(/const TITLES\s*=\s*\[([\s\S]*?)\];/);
  if (!m) return [];
  const body = m[1];
  const titles = [];
  let i = 0;
  while (i < body.length) {
    while (i < body.length && /[\s,]/.test(body[i])) i++;
    if (i >= body.length) break;
    const quote = body[i];
    if (quote !== "'" && quote !== '"' && quote !== '`') { i++; continue; }
    i++; // skip opening quote
    let s = '';
    while (i < body.length && body[i] !== quote) {
      if (body[i] === '\\' && i + 1 < body.length) { s += body[i + 1]; i += 2; }
      else { s += body[i]; i++; }
    }
    if (i < body.length) i++; // skip closing quote
    titles.push(s);
  }
  return titles;
}

function countSlides(html, slidesMd) {
  if (html) return (html.match(/<section class="slide/g) || []).length;
  if (slidesMd) return (slidesMd.match(/^---\s*$/gm) || []).length + 1; // Slidev: slides separated by ---
  return 0;
}

// ---------- screenshots ----------
async function ensureScreenshots(deckPath) {
  const ssDir = path.join(deckPath, 'screenshots');
  let pngs = [];
  try {
    pngs = (await fs.readdir(ssDir)).filter(f => /^slide-\d+\.png$/.test(f));
  } catch { /* dir missing */ }

  if (pngs.length === 0) {
    console.log('No screenshots found — running screenshot.mjs...');
    const scriptPath = path.join(ROOT, '.claude/skills/html-slides/scripts/screenshot.mjs');
    try { await fs.access(scriptPath); }
    catch { issue('screenshot.mjs not found — proceeding text-only'); return []; }

    const ok = await runChild('node', [scriptPath, deckPath]);
    if (!ok) { issue('screenshot.mjs failed — proceeding text-only'); return []; }

    try {
      pngs = (await fs.readdir(ssDir)).filter(f => /^slide-\d+\.png$/.test(f));
    } catch { /* still missing */ }
  }

  return pngs.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
    .map(f => path.join(ssDir, f));
}

function runChild(cmd, args) {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    proc.on('exit', code => resolve(code === 0));
    proc.on('error', err => { issue(`${cmd} spawn error: ${err.message}`); resolve(false); });
  });
}

// ---------- Gemini call ----------
async function callGemini({ apiKey, model, systemPrompt, userText, images }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const parts = [{ text: userText }];
  let inlineBytes = Buffer.byteLength(userText, 'utf8');
  let dropped = 0;
  for (const img of images) {
    if (inlineBytes + img.bytes.length > MAX_INLINE_BYTES) { dropped++; continue; }
    parts.push({ inline_data: { mime_type: 'image/png', data: img.bytes.toString('base64') } });
    parts.push({ text: `↑ slide ${img.slideNum} screenshot` });
    inlineBytes += img.bytes.length;
  }
  if (dropped > 0) issue(`${dropped} screenshot(s) skipped to stay under inline byte budget`);

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts }],
    generationConfig: {
      temperature: 0.4,
      topP: 0.95,
      maxOutputTokens: 16384,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Gemini API ${res.status}: ${errBody.slice(0, 500)}`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).filter(Boolean).join('\n') || '';
  if (!text) {
    const reason = data.candidates?.[0]?.finishReason || 'unknown';
    throw new Error(`Gemini returned empty response (finish: ${reason})`);
  }
  return { text, usage: data.usageMetadata, model };
}

async function callGeminiWithFallback(args) {
  const tried = [];
  const queue = [args.model, ...FALLBACK_MODELS.filter(m => m !== args.model)];
  let lastErr;
  for (const m of queue) {
    try {
      const out = await callGemini({ ...args, model: m });
      if (m !== args.model) issue(`Model ${args.model} unavailable; used ${m} as fallback`);
      return out;
    } catch (err) {
      tried.push(`${m}: ${err.message.slice(0, 120)}`);
      lastErr = err;
      // Only retry on 404 (unknown model) or 400 (model rejected payload)
      if (!/^Gemini API (404|400):/.test(err.message)) throw err;
    }
  }
  throw new Error(`All Gemini models failed:\n - ${tried.join('\n - ')}`);
}

// ---------- prompt assembly ----------
function buildUserPrompt({ deckRel, files, titles, slideCount, guidance, screenshots }) {
  const today = new Date().toISOString().slice(0, 10);
  const sections = [
    `# Deck under review`,
    `**Path:** \`${deckRel}\``,
    `**Today's date:** ${today}`,
    `**Slide count (DOM):** ${slideCount}`,
    `**Slide count (TITLES array):** ${titles.length}`,
    screenshots.length > 0
      ? `**Screenshots attached:** ${screenshots.length} (one per slide, inlined below this prompt)`
      : `**Screenshots:** none — text-only review`,
    '',
    `# Slide titles (from TITLES array)`,
    titles.length
      ? titles.map((t, i) => `${i + 1}. ${t}`).join('\n')
      : '_(could not extract TITLES array)_',
    '',
  ];

  if (guidance.length === 0) {
    sections.push(`# Guidance (CLAUDE.md files)\n_(none found from deck folder up to repo root — review against universal craft standards only)_\n`);
  } else {
    sections.push(`# Guidance (CLAUDE.md files, broadest → most specific)`);
    for (const g of guidance) {
      sections.push(`## \`${g.relPath}\``);
      sections.push('```markdown', g.content, '```', '');
    }
  }

  if (files['index.html']) {
    sections.push(`# index.html (interactive deck source — source of truth)`);
    sections.push('```html', files['index.html'], '```', '');
  }
  if (files['slides.md']) {
    sections.push(`# slides.md (Slidev deck source — source of truth)`);
    sections.push('```markdown', files['slides.md'], '```', '');
  }
  if (!files['index.html'] && !files['slides.md']) {
    sections.push(`# Deck source\n_(neither index.html nor slides.md present)_\n`);
  }

  if (files['content.md']) {
    sections.push(`# content.md (full speaker content / outline)`);
    sections.push('```markdown', files['content.md'], '```', '');
  }
  if (files['notes.md']) {
    sections.push(`# notes.md (slide-by-slide speaker cues)`);
    sections.push('```markdown', files['notes.md'], '```', '');
  }

  sections.push('---');
  sections.push('# Your task');
  sections.push('Review this deck against every dimension in the system prompt. Output the structured Markdown report exactly as specified. Be specific, cite slide numbers, quote problem text, and recommend concrete fixes.');
  return sections.join('\n');
}

// ---------- main ----------
async function main() {
  const argv = process.argv.slice(2);
  if (!argv[0] || argv[0] === '--help' || argv[0] === '-h') {
    console.log(`Usage: node .qa/review.mjs <deck-path> [--no-screenshots]
Examples:
  node .qa/review.mjs decks/cb_decks/1_deck
  node .qa/review.mjs decks/bank-demo --no-screenshots
  GEMINI_MODEL=gemini-3.1-pro-preview node .qa/review.mjs decks/cb_decks/1_deck
`);
    process.exit(argv[0] ? 0 : 1);
  }

  const noScreenshots = argv.includes('--no-screenshots');
  const deckArg = argv.filter(a => !a.startsWith('--'))[0];
  const deckPath = path.resolve(deckArg);
  const deckRel = path.relative(ROOT, deckPath);

  try { await fs.access(deckPath); } catch { console.error(`Deck path not found: ${deckPath}`); process.exit(2); }

  console.log(`[QA] reviewing ${deckRel}`);
  const t0 = Date.now();

  const { source, env } = await loadEnv();
  console.log(`[QA] api key from ${path.relative(ROOT, source)}`);

  const guidance = await loadGuidance(deckPath);
  const files = await loadDeckFiles(deckPath);
  const titles = extractTitles(files['index.html'] || '');
  const slideCount = countSlides(files['index.html'], files['slides.md']);
  console.log(`[QA] ${slideCount} slides, ${titles.length} titles, content.md: ${files['content.md'] ? 'yes' : 'no'}, notes.md: ${files['notes.md'] ? 'yes' : 'no'}, CLAUDE.md ancestors: ${guidance.length}`);

  let screenshots = [];
  if (!noScreenshots) {
    const ssPaths = await ensureScreenshots(deckPath);
    for (const p of ssPaths) {
      try {
        const bytes = await fs.readFile(p);
        const slideNum = parseInt(path.basename(p).match(/\d+/)[0], 10);
        screenshots.push({ slideNum, path: p, bytes });
      } catch (err) { issue(`Could not read screenshot ${p}: ${err.message}`); }
    }
    console.log(`[QA] ${screenshots.length} screenshots loaded`);
  }

  const systemPrompt = await fs.readFile(path.join(__dirname, 'prompts/deck-review.md'), 'utf8');
  const userText = buildUserPrompt({ deckRel, files, titles, slideCount, guidance, screenshots });

  console.log(`[QA] calling ${DEFAULT_MODEL}...`);
  let result;
  try {
    result = await callGeminiWithFallback({
      apiKey: env.GEMINI_API_KEY,
      model: DEFAULT_MODEL,
      systemPrompt,
      userText,
      images: screenshots,
    });
  } catch (err) {
    console.error(`[QA] FATAL: ${err.message}`);
    if (/certificate|UNABLE_TO_VERIFY|self-signed/i.test(err.message)) {
      console.error('[QA] Cert MITM detected — retry with: $env:NODE_OPTIONS = "--use-system-ca"; node .qa/review.mjs ' + deckRel);
    }
    process.exit(3);
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const usage = result.usage || {};
  console.log(`[QA] ${result.model} · ${elapsed}s · in=${usage.promptTokenCount ?? '?'} out=${usage.candidatesTokenCount ?? '?'} total=${usage.totalTokenCount ?? '?'}`);

  // Header + body + pipeline issues footer
  const header = [
    `<!--`,
    `  Generated by .qa/review.mjs`,
    `  Deck: ${deckRel}`,
    `  Model: ${result.model}`,
    `  Generated: ${new Date().toISOString()}`,
    `  Elapsed: ${elapsed}s`,
    `  Tokens: in=${usage.promptTokenCount ?? '?'} out=${usage.candidatesTokenCount ?? '?'}`,
    `  Screenshots reviewed: ${screenshots.length}`,
    `-->`,
    '',
  ].join('\n');

  let footer = '';
  if (pipelineIssues.length > 0) {
    footer = '\n\n---\n\n## Pipeline issues (non-fatal)\n' +
      pipelineIssues.map(m => `- ${m}`).join('\n') + '\n';
  }

  const reportPath = path.join(deckPath, 'qa-report.md');
  await fs.writeFile(reportPath, header + result.text + footer);
  console.log(`[QA] ✓ ${path.relative(ROOT, reportPath)}`);
}

main().catch(err => {
  console.error('[QA] FATAL:', err.message);
  if (err.stack && process.env.QA_DEBUG) console.error(err.stack);
  process.exit(1);
});

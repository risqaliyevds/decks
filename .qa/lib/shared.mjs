// .qa/lib/shared.mjs — common helpers used across review/humanize/enhance/agent.
// Single import surface so behavior stays consistent.

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '../..');
export const DEFAULT_MODEL = 'gemini-3-pro-preview';
export const FALLBACK_MODELS = [
  'gemini-3-pro-preview',
  'gemini-3.1-pro-preview',
  'gemini-pro-latest',
  'gemini-2.5-pro',
];
export const MAX_INLINE_BYTES = 18 * 1024 * 1024;

// ---------- pipeline issue tracking ----------
export function makeIssueLog() {
  const issues = [];
  return {
    issues,
    issue: (msg) => { issues.push(msg); console.warn(`⚠  ${msg}`); },
  };
}

// ---------- env loading ----------
export async function loadEnv() {
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
export async function loadDeckFiles(deckPath) {
  const files = {};
  for (const name of ['index.html', 'slides.md', 'content.md', 'notes.md']) {
    try { files[name] = await fs.readFile(path.join(deckPath, name), 'utf8'); }
    catch { files[name] = null; }
  }
  return files;
}

// ---------- CLAUDE.md ancestor walk ----------
export async function loadGuidance(deckPath) {
  const found = [];
  let dir = deckPath;
  while (true) {
    const candidate = path.join(dir, 'CLAUDE.md');
    try {
      const content = await fs.readFile(candidate, 'utf8');
      found.push({ relPath: path.relative(ROOT, candidate), content });
    } catch { /* none here */ }
    if (path.resolve(dir) === path.resolve(ROOT)) break;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return found.reverse(); // broadest → most specific
}

// ---------- HTML extractors ----------
export function extractTitles(html) {
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
    i++;
    let s = '';
    while (i < body.length && body[i] !== quote) {
      if (body[i] === '\\' && i + 1 < body.length) { s += body[i + 1]; i += 2; }
      else { s += body[i]; i++; }
    }
    if (i < body.length) i++;
    titles.push(s);
  }
  return titles;
}

export function countSlides(html, slidesMd) {
  if (html) return (html.match(/<section class="slide/g) || []).length;
  if (slidesMd) return (slidesMd.match(/^---\s*$/gm) || []).length + 1;
  return 0;
}

// ---------- screenshots ----------
export async function loadScreenshots(deckPath, { skip = false, autoRender = true, issueLog } = {}) {
  if (skip) return [];
  const ssDir = path.join(deckPath, 'screenshots');
  let pngs = [];
  try { pngs = (await fs.readdir(ssDir)).filter(f => /^slide-\d+\.png$/.test(f)); }
  catch { /* dir missing */ }

  if (pngs.length === 0 && autoRender) {
    console.log('No screenshots found — running screenshot.mjs...');
    const scriptPath = path.join(ROOT, '.claude/skills/html-slides/scripts/screenshot.mjs');
    try { await fs.access(scriptPath); }
    catch {
      issueLog?.issue('screenshot.mjs not found — proceeding text-only');
      return [];
    }
    const ok = await runChild('node', [scriptPath, deckPath]);
    if (!ok) { issueLog?.issue('screenshot.mjs failed — proceeding text-only'); return []; }
    try { pngs = (await fs.readdir(ssDir)).filter(f => /^slide-\d+\.png$/.test(f)); }
    catch { /* still missing */ }
  }

  pngs.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
  const out = [];
  for (const f of pngs) {
    try {
      const bytes = await fs.readFile(path.join(ssDir, f));
      const slideNum = parseInt(f.match(/\d+/)[0], 10);
      out.push({ slideNum, path: path.join(ssDir, f), bytes });
    } catch (err) { issueLog?.issue(`screenshot ${f}: ${err.message}`); }
  }
  return out;
}

// ---------- subprocess ----------
export function runChild(cmd, args) {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    proc.on('exit', code => resolve(code === 0));
    proc.on('error', () => resolve(false));
  });
}

// ---------- Gemini API ----------
export async function callGemini({ apiKey, model, systemPrompt, userText, images = [], generationConfig = {}, issueLog }) {
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
  if (dropped > 0) issueLog?.issue(`${dropped} screenshot(s) dropped to stay under inline byte budget`);

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: 'user', parts }],
    generationConfig: {
      temperature: 0.4,
      topP: 0.95,
      maxOutputTokens: 16384,
      ...generationConfig,
    },
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
  if (!text) throw new Error(`Gemini returned empty (finish: ${data.candidates?.[0]?.finishReason || 'unknown'})`);
  return { text, usage: data.usageMetadata, model };
}

export async function callGeminiWithFallback(args) {
  const requested = args.model || DEFAULT_MODEL;
  const queue = [requested, ...FALLBACK_MODELS.filter(m => m !== requested)];
  let lastErr;
  for (const m of queue) {
    try {
      const out = await callGemini({ ...args, model: m });
      if (m !== requested) args.issueLog?.issue(`Used ${m} as fallback (requested ${requested})`);
      return out;
    } catch (err) {
      lastErr = err;
      if (!/^Gemini API (404|400):/.test(err.message)) throw err;
    }
  }
  throw lastErr;
}

// ---------- prompt loader ----------
export async function loadPrompt(name) {
  const p = path.join(__dirname, '..', 'prompts', name);
  return fs.readFile(p, 'utf8');
}

// ---------- output stripping ----------
export function stripCodeFence(s) {
  let body = s.trim();
  if (body.startsWith('```')) {
    body = body.replace(/^```[a-zA-Z]*\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  return body;
}

// ---------- header / footer for generated files ----------
export function makeHeader({ tool, deckRel, model, elapsed, usage, screenshotsCount }) {
  return [
    '<!--',
    `  Generated by .qa/${tool}.mjs`,
    `  Deck: ${deckRel}`,
    `  Model: ${model}`,
    `  Generated: ${new Date().toISOString()}`,
    `  Elapsed: ${elapsed}s`,
    `  Tokens: in=${usage?.promptTokenCount ?? '?'} out=${usage?.candidatesTokenCount ?? '?'}`,
    `  Screenshots: ${screenshotsCount}`,
    '-->',
    '',
  ].join('\n');
}

export function makePipelineFooter(issues) {
  if (!issues || issues.length === 0) return '';
  return '\n\n<!-- Pipeline issues:\n' + issues.map(m => `- ${m}`).join('\n') + '\n-->\n';
}

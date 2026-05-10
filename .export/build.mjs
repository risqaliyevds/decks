#!/usr/bin/env node
// .export/build.mjs — final-version converter: HTML deck → PDF + PPTX.
//
// Workflow:
//   1. (Re)render screenshots via .claude/skills/html-slides/scripts/screenshot.mjs
//      so PDF/PPTX always reflect the latest HTML state.
//   2. Build PDF: each PNG → one 1920×1080 page in a single PDF.
//   3. Build PPTX: each PNG → one full-bleed slide (16:9), with speaker notes
//      pulled from content.md (## Slide N — title → **Speaker notes:**).
//
// Usage:
//   node .export/build.mjs decks/cb_decks/1_deck                    (both)
//   node .export/build.mjs decks/cb_decks/1_deck --pdf              (PDF only)
//   node .export/build.mjs decks/cb_decks/1_deck --pptx             (PPTX only)
//   node .export/build.mjs decks/cb_decks/1_deck --skip-screenshots (use existing PNGs)
//
// Outputs land in the deck folder: <deck>/<deck-name>.pdf, <deck>/<deck-name>.pptx

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import PptxGenJS from 'pptxgenjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SLIDE_W = 1920;
const SLIDE_H = 1080;
const PPTX_W_INCH = 13.333;
const PPTX_H_INCH = 7.5;

// ---------- helpers ----------
function runChild(cmd, args) {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });
    proc.on('exit', code => resolve(code === 0));
    proc.on('error', () => resolve(false));
  });
}

async function ensureScreenshots(deckPath, skip) {
  const ssDir = path.join(deckPath, 'screenshots');
  if (!skip) {
    console.log('[export] (re)rendering screenshots so PDF/PPTX reflect latest HTML...');
    const ok = await runChild('node', [path.join(ROOT, '.claude/skills/html-slides/scripts/screenshot.mjs'), deckPath]);
    if (!ok) console.warn('[export] screenshot script failed — falling back to whatever PNGs already exist');
  }
  let pngs;
  try { pngs = (await fs.readdir(ssDir)).filter(f => /^slide-\d+\.png$/.test(f)); }
  catch { throw new Error(`No screenshots/ folder at ${ssDir} and screenshot generation failed`); }
  if (pngs.length === 0) throw new Error(`No slide PNGs found in ${ssDir}`);
  pngs.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
  return pngs.map(f => ({ num: parseInt(f.match(/\d+/)[0], 10), path: path.join(ssDir, f) }));
}

// Parse content.md for speaker notes per slide.
// Looks for "## Slide N — title" sections, then captures everything under "**Speaker notes:**"
// (or "Speaker notes:" without bold) until the next "**...**" label, "##" header, or "---".
function extractSpeakerNotes(contentMd) {
  if (!contentMd) return new Map();
  const notes = new Map();
  const slideHeaderRe = /^##\s+Slide\s+(\d+)\b[^\n]*$/gm;
  let lastIdx = 0, lastNum = null;
  const headers = [];
  let m;
  while ((m = slideHeaderRe.exec(contentMd)) !== null) {
    headers.push({ num: parseInt(m[1], 10), idx: m.index, headerEnd: slideHeaderRe.lastIndex });
  }
  for (let i = 0; i < headers.length; i++) {
    const start = headers[i].headerEnd;
    const end = i + 1 < headers.length ? headers[i + 1].idx : contentMd.length;
    const block = contentMd.slice(start, end);
    // Find Speaker notes block — tolerate bold/non-bold + Uzbek "Spiker qaydlari" if used
    const labelRe = /(?:\*\*Speaker notes:\*\*|\*\*Spiker qaydlari:\*\*|Speaker notes:|Spiker qaydlari:)/i;
    const labelMatch = block.match(labelRe);
    if (!labelMatch) continue;
    const after = block.slice(labelMatch.index + labelMatch[0].length);
    // Stop at next bold-label, next markdown horizontal rule, or another ## header
    const stopRe = /\n\s*(?:\*\*[^*\n]+:\*\*|---+\s*\n|##\s+)/;
    const stop = after.search(stopRe);
    let raw = (stop === -1 ? after : after.slice(0, stop)).trim();
    // Strip surrounding quotes "..." / «...» / leading >
    raw = raw.replace(/^["«]+|["»]+$/g, '').replace(/^>\s+/gm, '').trim();
    if (raw) notes.set(headers[i].num, raw);
  }
  return notes;
}

// ---------- PDF ----------
async function buildPdf(deckPath, outPath, slides) {
  console.log(`[export] building PDF (${slides.length} pages)...`);
  const pdf = await PDFDocument.create();
  for (const s of slides) {
    const bytes = await fs.readFile(s.path);
    const img = await pdf.embedPng(bytes);
    const page = pdf.addPage([SLIDE_W, SLIDE_H]);
    page.drawImage(img, { x: 0, y: 0, width: SLIDE_W, height: SLIDE_H });
  }
  const out = await pdf.save();
  await fs.writeFile(outPath, out);
  console.log(`[export] ✓ PDF: ${path.relative(ROOT, outPath)} (${(out.length / 1024).toFixed(0)} KB)`);
}

// ---------- PPTX ----------
async function buildPptx(deckPath, outPath, slides, notesMap, deckName) {
  console.log(`[export] building PPTX (${slides.length} slides)...`);
  const pres = new PptxGenJS();
  pres.title = deckName;
  pres.author = 'crea7iveai';
  pres.layout = 'LAYOUT_WIDE'; // 13.333" × 7.5" = 16:9 = matches 1920×1080

  for (const s of slides) {
    const slide = pres.addSlide();
    slide.background = { color: '020A24' };
    slide.addImage({ path: s.path, x: 0, y: 0, w: PPTX_W_INCH, h: PPTX_H_INCH });
    const note = notesMap.get(s.num);
    if (note) slide.addNotes(note);
  }

  await pres.writeFile({ fileName: outPath });
  let size = 0;
  try { size = (await fs.stat(outPath)).size; } catch {}
  console.log(`[export] ✓ PPTX: ${path.relative(ROOT, outPath)} (${(size / 1024).toFixed(0)} KB)`);
}

// ---------- main ----------
async function main() {
  const argv = process.argv.slice(2);
  if (!argv[0] || ['-h', '--help'].includes(argv[0])) {
    console.log(`Usage: node .export/build.mjs <deck-path> [--pdf] [--pptx] [--skip-screenshots]

Outputs:
  <deck>/<deck-name>.pdf      pixel-perfect 1920x1080 multi-page PDF
  <deck>/<deck-name>.pptx     editable PPTX (each slide = full-bleed PNG + speaker notes)

Defaults: build BOTH PDF and PPTX, refresh screenshots first.`);
    process.exit(argv[0] ? 0 : 1);
  }

  const deckArg = argv.filter(a => !a.startsWith('--'))[0];
  const deckPath = path.resolve(deckArg);
  const deckRel = path.relative(ROOT, deckPath);
  const deckName = path.basename(deckPath);

  const onlyPdf = argv.includes('--pdf');
  const onlyPptx = argv.includes('--pptx');
  const doPdf = onlyPdf || (!onlyPdf && !onlyPptx);
  const doPptx = onlyPptx || (!onlyPdf && !onlyPptx);
  const skipScreens = argv.includes('--skip-screenshots');

  try { await fs.access(deckPath); } catch { console.error(`Deck not found: ${deckPath}`); process.exit(2); }

  const t0 = Date.now();
  console.log(`[export] deck: ${deckRel}`);
  console.log(`[export] outputs: ${doPdf ? 'PDF' : ''}${doPdf && doPptx ? ' + ' : ''}${doPptx ? 'PPTX' : ''}`);

  const slides = await ensureScreenshots(deckPath, skipScreens);
  console.log(`[export] ${slides.length} slides ready`);

  let notesMap = new Map();
  if (doPptx) {
    try {
      const md = await fs.readFile(path.join(deckPath, 'content.md'), 'utf8');
      notesMap = extractSpeakerNotes(md);
      console.log(`[export] speaker notes parsed: ${notesMap.size}/${slides.length} slides`);
    } catch { console.warn('[export] no content.md found — PPTX will have no speaker notes'); }
  }

  const tasks = [];
  if (doPdf) tasks.push(buildPdf(deckPath, path.join(deckPath, `${deckName}.pdf`), slides));
  if (doPptx) tasks.push(buildPptx(deckPath, path.join(deckPath, `${deckName}.pptx`), slides, notesMap, deckName));
  await Promise.all(tasks);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[export] done in ${elapsed}s`);
}

main().catch(err => {
  console.error('[export] FATAL:', err.message);
  if (process.env.QA_DEBUG && err.stack) console.error(err.stack);
  process.exit(1);
});

#!/usr/bin/env node
// Screenshot every slide of an HTML deck for QA.
//
// Usage:
//   node screenshot.mjs <deck-folder>                 (all slides)
//   node screenshot.mjs <deck-folder> --only 3,7,12   (specific slides)
//   node screenshot.mjs <deck-folder> --width 1920 --height 1080
//
// Detects framework by which file exists in <deck-folder>:
//   slides.md  -> Slidev (spawns `npx slidev`, screenshots /1, /2, …)
//   index.html -> Reveal.js or Custom (file:// load, navigates by hash)
//
// Output: <deck-folder>/screenshots/slide-NN.png

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node screenshot.mjs <deck-folder> [--only 1,2,3] [--width N] [--height N]');
  process.exit(2);
}

const deckDir = resolve(args[0]);
const onlyArg = argValue('--only');
const only = onlyArg ? new Set(onlyArg.split(',').map(n => parseInt(n.trim(), 10))) : null;
const width  = parseInt(argValue('--width')  ?? '1920', 10);
const height = parseInt(argValue('--height') ?? '1080', 10);

function argValue(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}

if (!existsSync(deckDir)) { console.error(`No such folder: ${deckDir}`); process.exit(1); }

const outDir = join(deckDir, 'screenshots');
mkdirSync(outDir, { recursive: true });

const slidevFile = join(deckDir, 'slides.md');
const htmlFile   = join(deckDir, 'index.html');

if (existsSync(slidevFile))      await screenshotSlidev(slidevFile);
else if (existsSync(htmlFile))   await screenshotHtml(htmlFile);
else { console.error(`No slides.md or index.html in ${deckDir}`); process.exit(1); }

// ---------------------------------------------------------------------------

async function screenshotSlidev(file) {
  const port = 3030 + Math.floor(Math.random() * 100);
  console.log(`[slidev] starting dev server on :${port}`);
  const child = spawn('npx', ['slidev', file, '--port', String(port), '--open', 'false'], {
    stdio: ['ignore', 'pipe', 'inherit'], shell: process.platform === 'win32',
  });

  await waitForPort(`http://localhost:${port}/`);

  try {
    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();

    await page.goto(`http://localhost:${port}/1`);
    await page.waitForLoadState('networkidle');
    const total = await page.evaluate(() =>
      Number(document.body.dataset.total)
        || Number(document.querySelector('[data-total]')?.dataset.total)
        || (window.__slidev?.nav?.total?.value)
        || 1
    );

    const list = only ?? new Set(range(1, total));
    for (const n of [...list].sort((a, b) => a - b)) {
      await page.goto(`http://localhost:${port}/${n}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(300);
      await snap(page, n);
    }

    await browser.close();
  } finally {
    child.kill();
  }
}

async function screenshotHtml(file) {
  const url = pathToFileURL(file).href;
  console.log(`[html] loading ${url}`);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();

  await page.goto(url);
  await page.waitForLoadState('networkidle');

  const isReveal = (await page.$('.reveal .slides')) !== null;
  let total;
  if (isReveal) {
    total = await page.evaluate(() => Reveal.getTotalSlides());
  } else {
    total = await page.evaluate(() => document.querySelectorAll('.slide').length || 1);
  }

  const list = only ?? new Set(range(1, total));
  for (const n of [...list].sort((a, b) => a - b)) {
    if (isReveal) {
      await page.evaluate(i => Reveal.slide(i - 1, 0), n);
    } else {
      await page.goto(`${url}#${n}`);
    }
    await page.waitForTimeout(400);
    await snap(page, n);
  }

  await browser.close();
}

async function snap(page, n) {
  const path = join(outDir, `slide-${String(n).padStart(2, '0')}.png`);
  await page.screenshot({ path, fullPage: false });
  console.log(`  ✓ slide ${n} → ${path}`);
}

function range(a, b) { return Array.from({ length: b - a + 1 }, (_, i) => a + i); }

async function waitForPort(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try { await fetch(url); return; } catch { await new Promise(r => setTimeout(r, 500)); }
  }
  throw new Error(`Server never came up at ${url}`);
}

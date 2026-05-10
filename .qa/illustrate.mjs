#!/usr/bin/env node
// .qa/illustrate.mjs — visual director: plans + generates per-slide imagery.
//
// Pipeline:
//   1. PLAN: Gemini-3-pro reads deck + screenshots → JSON manifest assigning each slide
//      a visual mode (hero / icon / none).
//   2. EXECUTE:
//      - hero: gemini-2.5-flash-image generates a brand-matched PNG (saved as auto/slide-N.png)
//      - icon: fetch Lucide SVG from CDN (saved as auto/slide-N-icon-{name}.svg)
//      - none: skip
//   3. WRITE manifest.md with HTML snippets you copy-paste into index.html.
//
// Default behavior: ICONS ONLY. AI hero generation is off unless --enable-heroes is passed.
// Heroes were removed from the default flow because the speaker found them weak.
//
// Usage:
//   node .qa/illustrate.mjs decks/cb_decks/2_deck                       (icons only — default)
//   node .qa/illustrate.mjs decks/cb_decks/2_deck --slides 5,7,9        (limit slides)
//   node .qa/illustrate.mjs decks/cb_decks/2_deck --plan-only           (preview decisions)
//   node .qa/illustrate.mjs decks/cb_decks/2_deck --enable-heroes       (opt in to AI hero generation)
//   node .qa/illustrate.mjs decks/cb_decks/2_deck --force-mode icons    (icons only on every slide)

import fs from 'node:fs/promises';
import path from 'node:path';
import {
  ROOT, DEFAULT_MODEL,
  loadEnv, loadDeckFiles, loadGuidance, loadScreenshots,
  callGeminiWithFallback, loadPrompt, stripCodeFence,
  makeIssueLog,
} from './lib/shared.mjs';

const PLANNER_MODEL = 'gemini-3-pro-preview';
const IMAGE_MODEL = 'gemini-2.5-flash-image';
const LUCIDE_CDN = 'https://unpkg.com/lucide-static@latest/icons';

// ---------- planner ----------
function buildPlannerPrompt({ deckRel, files, guidance, screenshotsCount, onlySlides, forceMode, heroesEnabled }) {
  const sections = [
    `# Plan visuals for this deck`,
    `**Deck path:** \`${deckRel}\``,
    `**Slides screenshots attached:** ${screenshotsCount}`,
    `**Heroes:** ${heroesEnabled ? 'enabled (use sparingly)' : 'DISABLED — do not propose `hero` mode for any slide'}`,
    onlySlides ? `**ONLY consider these slide numbers:** ${onlySlides.join(', ')}` : '',
    forceMode ? `**Override:** force mode \`${forceMode}\` for every considered slide (skip auto-decision)` : '',
    '',
  ].filter(Boolean);

  if (guidance.length > 0) {
    sections.push(`# Guidance (CLAUDE.md, broadest → most specific)`);
    for (const g of guidance) {
      sections.push(`## \`${g.relPath}\``);
      sections.push('```markdown', g.content, '```', '');
    }
  }

  if (files['index.html']) {
    sections.push(`# Live deck source (\`index.html\`)`);
    sections.push('```html', files['index.html'], '```', '');
  }
  if (files['content.md']) {
    sections.push(`# Speaker notes (\`content.md\` — for context only, do not include in plan)`);
    sections.push('```markdown', files['content.md'], '```', '');
  }

  sections.push('---');
  sections.push('# Your task');
  sections.push('Return ONLY a JSON object matching the schema in the system prompt. Include EVERY slide. No prose, no Markdown fences.');
  return sections.join('\n');
}

function parsePlannerJson(text) {
  let body = stripCodeFence(text).trim();
  // Sometimes the model wraps in extra prose; find the first '{' and last '}'
  const start = body.indexOf('{');
  const end = body.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('Planner did not return JSON');
  const json = body.slice(start, end + 1);
  return JSON.parse(json);
}

// ---------- executor: hero image generation ----------
async function generateHero({ apiKey, prompt, alt, slideNum, outDir, issueLog }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    issueLog?.issue(`hero gen failed slide ${slideNum}: ${res.status} ${err.slice(0, 120)}`);
    return null;
  }
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imgPart = parts.find(p => p.inlineData);
  if (!imgPart) {
    issueLog?.issue(`hero gen returned no image for slide ${slideNum}`);
    return null;
  }
  const buf = Buffer.from(imgPart.inlineData.data, 'base64');
  const outName = `slide-${String(slideNum).padStart(2, '0')}-hero.png`;
  const outPath = path.join(outDir, outName);
  await fs.writeFile(outPath, buf);
  return { fileName: outName, path: outPath, bytes: buf.length, alt };
}

// ---------- executor: lucide icon fetch ----------
async function fetchIcon({ name, slideNum, position, outDir, issueLog }) {
  const url = `${LUCIDE_CDN}/${name}.svg`;
  const res = await fetch(url);
  if (!res.ok) {
    issueLog?.issue(`icon fetch failed slide ${slideNum} "${name}": ${res.status}`);
    return null;
  }
  const svg = await res.text();
  const safeName = name.replace(/[^a-z0-9-]/gi, '');
  const outName = `slide-${String(slideNum).padStart(2, '0')}-icon-${position}-${safeName}.svg`;
  const outPath = path.join(outDir, outName);
  await fs.writeFile(outPath, svg);
  return { fileName: outName, path: outPath, name, position };
}

// ---------- manifest.md writer ----------
function buildManifest({ deckRel, plan, results, model, elapsed }) {
  const lines = [
    `<!--`,
    `  Generated by .qa/illustrate.mjs`,
    `  Deck: ${deckRel}`,
    `  Planner model: ${model}`,
    `  Image model: ${IMAGE_MODEL}`,
    `  Generated: ${new Date().toISOString()}`,
    `  Elapsed: ${elapsed}s`,
    `-->`,
    '',
    `# Visual manifest · ${deckRel}`,
    '',
    `**Theme:** ${plan.deck_theme || '(not specified)'}`,
    `**Style direction:** ${plan.global_style || '(not specified)'}`,
    '',
    `Each section below shows the planner's decision and (if applicable) ready-to-paste HTML.`,
    '',
    `---`,
    '',
  ];

  for (const slide of plan.slides) {
    const r = results.find(x => x.slide === slide.slide);
    lines.push(`## Slide ${slide.slide} — ${slide.title || '(untitled)'}`);
    lines.push(`**Current visual:** ${slide.current_visual || '(unknown)'}`);
    lines.push(`**Decision:** \`${slide.mode}\` — ${slide.reason || '(no reason given)'}`);
    lines.push('');

    if (slide.mode === 'hero' && r?.hero) {
      lines.push(`**Generated:** \`${r.hero.fileName}\` (${(r.hero.bytes / 1024).toFixed(0)} KB)`);
      lines.push(`**Prompt used:** ${slide.hero.prompt}`);
      lines.push('');
      lines.push('**HTML snippet (paste into the slide):**');
      lines.push('```html');
      const pos = slide.hero.position || 'background';
      if (pos === 'background') {
        lines.push(`<!-- as a full-bleed background image overlay -->`);
        lines.push(`<div class="hero-bg" style="position:absolute;inset:0;z-index:0;opacity:0.35;background:url('images/auto/${r.hero.fileName}') center/cover no-repeat"></div>`);
      } else {
        lines.push(`<!-- inline as a positioned image -->`);
        lines.push(`<img src="images/auto/${r.hero.fileName}" alt="${r.hero.alt || ''}" style="max-width:46%;border-radius:var(--r);box-shadow:0 18px 48px -20px rgba(37,99,235,0.45)">`);
      }
      lines.push('```');
      lines.push('');
    } else if (slide.mode === 'icon' && r?.icons) {
      lines.push(`**Generated:** ${r.icons.length} icon(s)`);
      lines.push('');
      lines.push('**HTML snippet (one per card — wrap with current accent color):**');
      lines.push('```html');
      for (const ic of r.icons) {
        lines.push(`<!-- ${ic.position}: ${ic.name} -->`);
        lines.push(`<span class="auto-icon" style="display:inline-block;width:1.4em;height:1.4em;color:var(--accent-2)" aria-label="${ic.name} icon">`);
        lines.push(`  <!-- inline the SVG content from images/auto/${ic.fileName} OR <img src="images/auto/${ic.fileName}"> -->`);
        lines.push(`</span>`);
      }
      lines.push('```');
      lines.push('');
      lines.push('Or as `<img>` references (simpler, no inline SVG):');
      lines.push('```html');
      for (const ic of r.icons) {
        lines.push(`<img src="images/auto/${ic.fileName}" alt="${ic.name}" style="width:1.4em;height:1.4em;filter:invert(60%) sepia(58%) saturate(2210%) hue-rotate(195deg) brightness(101%) contrast(96%)">`);
      }
      lines.push('```');
      lines.push('');
    }
    // mode === 'none' or no results: just the decision line above
    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

// ---------- main ----------
async function main() {
  const argv = process.argv.slice(2);
  if (!argv[0] || ['-h', '--help'].includes(argv[0])) {
    console.log(`Usage: node .qa/illustrate.mjs <deck-path> [--slides N,M,K] [--plan-only] [--force-mode hero|icon]
Outputs:
  decks/<deck>/images/auto/         (PNGs + SVGs)
  decks/<deck>/images/auto/manifest.md  (decisions + HTML snippets to paste)
`);
    process.exit(argv[0] ? 0 : 1);
  }

  const deckArg = argv.filter(a => !a.startsWith('--'))[0];
  const deckPath = path.resolve(deckArg);
  const deckRel = path.relative(ROOT, deckPath);

  const slidesArg = argv.find(a => a.startsWith('--slides'))?.split('=')[1] ??
                    (argv.includes('--slides') ? argv[argv.indexOf('--slides') + 1] : null);
  const onlySlides = slidesArg ? slidesArg.split(',').map(s => parseInt(s.trim(), 10)).filter(Number.isFinite) : null;

  const planOnly = argv.includes('--plan-only');
  const heroesEnabled = argv.includes('--enable-heroes');
  const forceMode = argv.find(a => a.startsWith('--force-mode'))?.split('=')[1] ??
                    (argv.includes('--force-mode') ? argv[argv.indexOf('--force-mode') + 1] : null);
  if (forceMode === 'hero' && !heroesEnabled) {
    console.error('[illustrate] --force-mode hero requires --enable-heroes (heroes are off by default)');
    process.exit(2);
  }

  try { await fs.access(deckPath); } catch { console.error(`Deck not found: ${deckPath}`); process.exit(2); }

  const log = makeIssueLog();
  console.log(`[illustrate] ${deckRel}`);
  console.log(`[illustrate] heroes: ${heroesEnabled ? 'ENABLED (--enable-heroes)' : 'disabled (default — icons only)'}`);
  if (onlySlides) console.log(`[illustrate] limiting to slides: ${onlySlides.join(', ')}`);
  if (forceMode) console.log(`[illustrate] force mode: ${forceMode}`);
  if (planOnly) console.log(`[illustrate] PLAN-ONLY (no generation)`);
  const t0 = Date.now();

  const { source, env } = await loadEnv();
  console.log(`[illustrate] api key from ${path.relative(ROOT, source)}`);

  const guidance = await loadGuidance(deckPath);
  const files = await loadDeckFiles(deckPath);
  const screenshots = await loadScreenshots(deckPath, { autoRender: true, issueLog: log });
  console.log(`[illustrate] CLAUDE.md ancestors: ${guidance.length}, screenshots: ${screenshots.length}`);

  // ----- PLAN -----
  const systemPrompt = await loadPrompt('illustrate.md');
  const userText = buildPlannerPrompt({ deckRel, files, guidance, screenshotsCount: screenshots.length, onlySlides, forceMode, heroesEnabled });

  console.log(`[illustrate] planning with ${PLANNER_MODEL}...`);
  let plannerResult;
  try {
    plannerResult = await callGeminiWithFallback({
      apiKey: env.GEMINI_API_KEY,
      model: PLANNER_MODEL,
      systemPrompt,
      userText,
      images: screenshots,
      generationConfig: { temperature: 0.4, maxOutputTokens: 16384 },
      issueLog: log,
    });
  } catch (err) {
    console.error(`[illustrate] planner FATAL: ${err.message}`);
    process.exit(3);
  }

  let plan;
  try { plan = parsePlannerJson(plannerResult.text); }
  catch (err) {
    console.error(`[illustrate] could not parse planner JSON: ${err.message}`);
    console.error(`[illustrate] raw response (first 600 chars):\n${plannerResult.text.slice(0, 600)}`);
    process.exit(4);
  }

  // Filter slides if --slides requested
  if (onlySlides) plan.slides = plan.slides.filter(s => onlySlides.includes(s.slide));

  // Apply --force-mode override
  if (forceMode) {
    plan.slides = plan.slides.map(s => {
      if (s.mode === 'none') return s; // keep none even when force-mode set, unless slide is in onlySlides
      return s;
    });
  }

  // Belt-and-suspenders: if heroes disabled, downgrade any 'hero' decisions to 'none'
  if (!heroesEnabled) {
    let downgraded = 0;
    plan.slides = plan.slides.map(s => {
      if (s.mode === 'hero') {
        downgraded++;
        return { ...s, mode: 'none', reason: '(hero downgraded — --enable-heroes not passed)' };
      }
      return s;
    });
    if (downgraded > 0) console.log(`[illustrate] downgraded ${downgraded} hero decision(s) to 'none' (heroes disabled)`);
  }

  console.log(`[illustrate] plan ready: ${plan.slides.length} slides considered`);
  const heroSlides = plan.slides.filter(s => s.mode === 'hero').length;
  const iconSlides = plan.slides.filter(s => s.mode === 'icon').length;
  const skipSlides = plan.slides.filter(s => s.mode === 'none').length;
  console.log(`[illustrate]   ${heroSlides} hero · ${iconSlides} icon · ${skipSlides} none`);

  if (planOnly) {
    const planPath = path.join(deckPath, 'images/auto/manifest.md');
    await fs.mkdir(path.dirname(planPath), { recursive: true });
    await fs.writeFile(planPath, buildManifest({ deckRel, plan, results: [], model: plannerResult.model, elapsed: ((Date.now() - t0) / 1000).toFixed(1) }));
    console.log(`[illustrate] ✓ plan saved: ${path.relative(ROOT, planPath)}`);
    return;
  }

  // ----- EXECUTE -----
  const outDir = path.join(deckPath, 'images/auto');
  await fs.mkdir(outDir, { recursive: true });

  const results = [];
  const heroQueue = plan.slides.filter(s => s.mode === 'hero');
  const iconQueue = plan.slides.filter(s => s.mode === 'icon');

  // hero — sequentially (image gen is rate-limited)
  if (heroQueue.length > 0) console.log(`[illustrate] generating ${heroQueue.length} hero image(s)...`);
  for (const slide of heroQueue) {
    process.stdout.write(`[illustrate]   slide ${slide.slide} hero... `);
    const r = await generateHero({
      apiKey: env.GEMINI_API_KEY,
      prompt: slide.hero?.prompt || `Minimalist illustration relevant to: ${slide.title}`,
      alt: slide.hero?.alt || slide.title || '',
      slideNum: slide.slide,
      outDir,
      issueLog: log,
    });
    if (r) {
      results.push({ slide: slide.slide, hero: r });
      console.log(`✓ ${r.fileName} (${(r.bytes / 1024).toFixed(0)} KB)`);
    } else {
      console.log(`✗ failed`);
    }
  }

  // icons — in parallel (CDN fetches are fast)
  if (iconQueue.length > 0) console.log(`[illustrate] fetching icons for ${iconQueue.length} slide(s)...`);
  for (const slide of iconQueue) {
    const icons = slide.icons || [];
    process.stdout.write(`[illustrate]   slide ${slide.slide} icons (${icons.length})... `);
    const fetched = [];
    for (const ic of icons) {
      const r = await fetchIcon({
        name: ic.name,
        slideNum: slide.slide,
        position: ic.position || `pos${fetched.length + 1}`,
        outDir,
        issueLog: log,
      });
      if (r) fetched.push(r);
    }
    if (fetched.length > 0) {
      results.push({ slide: slide.slide, icons: fetched });
      console.log(`✓ ${fetched.length}/${icons.length}`);
    } else {
      console.log(`✗ none`);
    }
  }

  // ----- WRITE MANIFEST -----
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const manifest = buildManifest({ deckRel, plan, results, model: plannerResult.model, elapsed });
  const manifestPath = path.join(outDir, 'manifest.md');
  await fs.writeFile(manifestPath, manifest);
  console.log(`\n[illustrate] ✓ manifest: ${path.relative(ROOT, manifestPath)}`);
  console.log(`[illustrate] ✓ assets in: ${path.relative(ROOT, outDir)}/`);
  console.log(`[illustrate] elapsed: ${elapsed}s`);
  if (log.issues.length > 0) console.log(`[illustrate] ⚠  ${log.issues.length} non-fatal issue(s) — see manifest for details`);
}

main().catch(err => {
  console.error('[illustrate] FATAL:', err.message);
  if (process.env.QA_DEBUG && err.stack) console.error(err.stack);
  process.exit(1);
});

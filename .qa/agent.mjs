#!/usr/bin/env node
// .qa/agent.mjs — orchestrator that detects deck state and runs the right pipeline.
//
// Modes:
//   auto     (default) — detect state, recommend + run (or print plan with --dry-run)
//   enhance            — rewrite content.md with full quality criteria
//   humanize           — tone-only rewrite
//   review             — QA only
//   full               — enhance --inplace → humanize --inplace → review
//   dry-run            — detect + print recommendations, run nothing
//
// Usage:
//   node .qa/agent.mjs decks/cb_decks/2_deck                  (auto, runs full pipeline if recommended)
//   node .qa/agent.mjs decks/cb_decks/2_deck --mode full
//   node .qa/agent.mjs decks/cb_decks/2_deck --dry-run        (just diagnose)
//   node .qa/agent.mjs decks/cb_decks/2_deck --mode enhance --inplace

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ROOT,
  loadDeckFiles, loadGuidance,
  runChild, makeIssueLog,
} from './lib/shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------- state detection ----------
function detectState(files) {
  if (!files['index.html'] && !files['slides.md']) {
    return { state: 'no-deck', summary: 'No index.html or slides.md — build the HTML deck first.', recommend: [] };
  }

  const content = files['content.md'];
  if (!content) {
    return { state: 'no-content', summary: 'Deck source exists but no content.md — run enhance to draft from scratch.', recommend: ['enhance'] };
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const lineCount = content.split('\n').length;

  // Heuristic AI-tells
  const aiPatterns = [
    /samaradorlikni oshirish/gi,
    /amaliy yechimlar/gi,
    /transformatsiya/gi,
    /qayta tasavvur qilish/gi,
    /innovatsiyalarni joriy etish/gi,
    /yuksak darajadagi/gi,
    /zamonaviy yechimlar/gi,
    /ekosistema/gi,
    /paradigma/gi,
  ];
  const aiHits = aiPatterns.reduce((sum, re) => sum + (content.match(re)?.length ?? 0), 0);

  // Speaker-note signals
  const speakerNoteSections = (content.match(/\*\*Speaker notes:\*\*/g) ?? []).length;
  const stageDirections = (content.match(/\(pauza\)|\(zal/gi) ?? []).length;
  const personalAsides = (content.match(/aytmoqchi|qarang,|eslaysizmi|men o'zim/gi) ?? []).length;

  // Score: human-feeling content has stage directions + asides
  const humanSignals = stageDirections + personalAsides;

  // Verdict logic
  if (wordCount < 1200) {
    return {
      state: 'thin-content',
      summary: `content.md is thin (${wordCount} words). Likely a stub — needs a full enhance pass.`,
      diagnosis: { wordCount, lineCount, aiHits, speakerNoteSections, humanSignals },
      recommend: ['enhance --inplace', 'humanize --inplace', 'review'],
    };
  }

  if (aiHits >= 3 || (humanSignals === 0 && speakerNoteSections > 5)) {
    return {
      state: 'ai-flavored',
      summary: `content.md reads AI-generated (${aiHits} cliché hits, ${humanSignals} human signals across ${speakerNoteSections} speaker notes). Run enhance + humanize.`,
      diagnosis: { wordCount, lineCount, aiHits, speakerNoteSections, humanSignals },
      recommend: ['enhance --inplace', 'humanize --inplace', 'review'],
    };
  }

  if (humanSignals < speakerNoteSections / 3) {
    return {
      state: 'dry-content',
      summary: `content.md is structured but dry (${humanSignals} human signals across ${speakerNoteSections} speaker notes). Humanize + review will lift it.`,
      diagnosis: { wordCount, lineCount, aiHits, speakerNoteSections, humanSignals },
      recommend: ['humanize --inplace', 'review'],
    };
  }

  return {
    state: 'mature',
    summary: `content.md looks polished (${wordCount} words, ${humanSignals} human signals, ${aiHits} cliché hits). Just run review.`,
    diagnosis: { wordCount, lineCount, aiHits, speakerNoteSections, humanSignals },
    recommend: ['review'],
  };
}

// ---------- step runner ----------
async function runStep(stepArg, deckRel) {
  // stepArg examples: "enhance --inplace", "humanize --inplace", "review"
  const [tool, ...flags] = stepArg.split(/\s+/);
  const scriptPath = path.join(__dirname, `${tool}.mjs`);
  console.log(`\n[agent] ▶ ${tool} ${flags.join(' ')}`.trim());
  console.log(`[agent]   script: ${path.relative(ROOT, scriptPath)}`);
  const ok = await runChild('node', [scriptPath, deckRel, ...flags]);
  if (!ok) console.error(`[agent] ✗ ${tool} failed`);
  return ok;
}

// ---------- main ----------
async function main() {
  const argv = process.argv.slice(2);
  if (!argv[0] || ['-h', '--help'].includes(argv[0])) {
    console.log(`Usage: node .qa/agent.mjs <deck-path> [--mode auto|enhance|humanize|review|full] [--dry-run] [--inplace]

Modes:
  auto         (default) detect deck state and recommend; runs the recommended chain
  enhance               rewrite content.md with full quality criteria
  humanize              tone-only rewrite
  review                QA only (writes qa-report.md)
  illustrate            generate per-slide imagery (AI hero + Lucide icons) → images/auto/
  full                  enhance --inplace → humanize --inplace → review
  full+visuals          full + illustrate (the everything chain)

Flags:
  --dry-run            diagnose state, print recommendations, run nothing
  --inplace            for enhance/humanize: overwrite content.md (creates .bak)
  --no-screenshots     skip the multimodal screenshot pass

Examples:
  node .qa/agent.mjs decks/cb_decks/2_deck                          (auto + run)
  node .qa/agent.mjs decks/cb_decks/2_deck --dry-run                (just diagnose)
  node .qa/agent.mjs decks/cb_decks/2_deck --mode full              (full chain, inplace)
  node .qa/agent.mjs decks/cb_decks/2_deck --mode review            (QA only)
`);
    process.exit(argv[0] ? 0 : 1);
  }

  const deckArg = argv.filter(a => !a.startsWith('--'))[0];
  const deckPath = path.resolve(deckArg);
  const deckRel = path.relative(ROOT, deckPath);

  const modeArg = argv.find(a => a.startsWith('--mode'))?.split('=')[1] ??
                  (argv.includes('--mode') ? argv[argv.indexOf('--mode') + 1] : 'auto');
  const dryRun = argv.includes('--dry-run');
  const inplace = argv.includes('--inplace');
  const noScreens = argv.includes('--no-screenshots');

  try { await fs.access(deckPath); } catch { console.error(`Deck not found: ${deckPath}`); process.exit(2); }

  const log = makeIssueLog();
  console.log(`[agent] deck: ${deckRel}`);
  console.log(`[agent] mode: ${modeArg}${dryRun ? ' (dry-run)' : ''}`);

  // Always diagnose state first
  const guidance = await loadGuidance(deckPath);
  const files = await loadDeckFiles(deckPath);
  const detection = detectState(files);

  console.log(`\n[agent] ─── state ───`);
  console.log(`[agent] state:    ${detection.state}`);
  console.log(`[agent] summary:  ${detection.summary}`);
  if (detection.diagnosis) {
    const d = detection.diagnosis;
    console.log(`[agent] diagnosis: ${d.wordCount} words · ${d.aiHits} AI clichés · ${d.humanSignals} human signals · ${d.speakerNoteSections} speaker-note sections`);
  }
  console.log(`[agent] guidance: ${guidance.length} CLAUDE.md ancestor(s)`);
  console.log(`[agent] recommended chain: ${detection.recommend.length ? detection.recommend.join(' → ') : '(none — deck not ready)'}`);

  // Build plan based on mode
  let plan;
  switch (modeArg) {
    case 'auto':       plan = detection.recommend; break;
    case 'enhance':    plan = [`enhance${inplace ? ' --inplace' : ''}${noScreens ? ' --no-screenshots' : ''}`]; break;
    case 'humanize':   plan = [`humanize${inplace ? ' --inplace' : ''}${noScreens ? ' --no-screenshots' : ''}`]; break;
    case 'review':     plan = [`review${noScreens ? ' --no-screenshots' : ''}`]; break;
    case 'illustrate': plan = ['illustrate']; break;
    case 'full':       plan = ['enhance --inplace', 'humanize --inplace', 'review'];
                       if (noScreens) plan = plan.map(s => `${s} --no-screenshots`);
                       break;
    case 'full+visuals': plan = ['enhance --inplace', 'humanize --inplace', 'illustrate', 'review'];
                         if (noScreens) plan = plan.map(s => s === 'illustrate' ? s : `${s} --no-screenshots`);
                         break;
    default:
      console.error(`[agent] unknown mode: ${modeArg}`);
      process.exit(4);
  }

  console.log(`\n[agent] ─── plan ───`);
  if (plan.length === 0) {
    console.log(`[agent] no actions needed.`);
    process.exit(0);
  }
  plan.forEach((s, i) => console.log(`[agent]   ${i + 1}. ${s}`));

  if (dryRun) {
    console.log(`\n[agent] dry-run — exiting before execution. Run without --dry-run to execute.`);
    process.exit(0);
  }

  // Execute
  console.log(`\n[agent] ─── executing ───`);
  let okCount = 0;
  for (const step of plan) {
    const ok = await runStep(step, deckRel);
    if (ok) okCount++;
    else console.warn(`[agent] step failed; continuing to next`);
  }

  console.log(`\n[agent] ─── done ───`);
  console.log(`[agent] ${okCount}/${plan.length} steps succeeded`);
  if (okCount === plan.length) console.log(`[agent] ✓ pipeline complete for ${deckRel}`);
}

main().catch(err => {
  console.error('[agent] FATAL:', err.message);
  if (process.env.QA_DEBUG && err.stack) console.error(err.stack);
  process.exit(1);
});

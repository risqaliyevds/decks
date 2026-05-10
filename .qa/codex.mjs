#!/usr/bin/env node
// .qa/codex.mjs — formal codex CLI review wrapper
//
// Invokes Codex CLI via bash (PowerShell stdin hangs codex) with /dev/null
// redirect, passes the deck-aware codex prompt, and confirms codex_review.md
// is written to the deck folder.

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, basename, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const deckArg = process.argv[2];
if (!deckArg) {
  console.error('usage: node .qa/codex.mjs <deck-path>');
  process.exit(1);
}

const deckRel = deckArg.replace(/\\/g, '/');
const deckAbs = resolve(deckRel).replace(/\\/g, '/');
const deckName = basename(deckAbs);

if (!existsSync(deckAbs)) {
  console.error(`[CODEX] deck not found: ${deckAbs}`);
  process.exit(1);
}

const promptPath = join(__dirname, 'prompts', 'codex.md');
const promptTpl = readFileSync(promptPath, 'utf8');
const prompt = promptTpl
  .replace(/{{DECK_ABS}}/g, deckAbs)
  .replace(/{{DECK_NAME}}/g, deckName);

const reportPath = join(deckAbs, 'codex_review.md').replace(/\\/g, '/');
const beforeMtime = existsSync(reportPath) ? statSync(reportPath).mtimeMs : 0;

console.log(`[CODEX] deck: ${deckName}`);
console.log(`[CODEX] starting codex exec (this may take 60-180s)...`);
const start = Date.now();

// codex exec --dangerously-bypass-approvals-and-sandbox '<prompt>' < /dev/null
// Single-quoted prompt; escape single quotes inside.
const escaped = prompt.replace(/'/g, "'\\''");
const cmd = `codex exec --dangerously-bypass-approvals-and-sandbox '${escaped}' < /dev/null`;

const result = spawnSync('bash', ['-c', cmd], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
  maxBuffer: 50 * 1024 * 1024,
});

const elapsed = ((Date.now() - start) / 1000).toFixed(1);

if (result.error) {
  console.error(`[CODEX] failed to spawn bash:`, result.error.message);
  process.exit(2);
}

if (result.status !== 0) {
  console.error(`[CODEX] codex exec returned non-zero status ${result.status}`);
  console.error('--- stdout (tail) ---');
  console.error((result.stdout || '').slice(-2000));
  console.error('--- stderr (tail) ---');
  console.error((result.stderr || '').slice(-2000));
  process.exit(result.status || 3);
}

console.log(`[CODEX] codex exec done in ${elapsed}s`);

if (existsSync(reportPath)) {
  const afterMtime = statSync(reportPath).mtimeMs;
  if (afterMtime > beforeMtime) {
    console.log(`[CODEX] ✓ ${reportPath}`);
    process.exit(0);
  }
}

// Codex didn't write the report itself — fall back to its stdout.
const stdoutBody = (result.stdout || '').trim();
if (stdoutBody.length === 0) {
  console.error(`[CODEX] ✗ codex_review.md not written and stdout is empty`);
  process.exit(4);
}

writeFileSync(reportPath, stdoutBody, 'utf8');
console.log(`[CODEX] ✓ ${reportPath} (recovered from stdout, ${stdoutBody.length} chars)`);

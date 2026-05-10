# `.qa/` — Gemini-powered slide content agent

Multi-mode pipeline that **diagnoses → enhances → humanizes → reviews** any deck in this repo. Reusable across all decks (`cb_decks/*`, `bank-demo`, future ones). Auto-detects deck language and writes outputs in that language.

## Tools

| Script | Purpose | Output |
|---|---|---|
| `agent.mjs` | Orchestrator: detects deck state and runs the right chain | (runs other tools) |
| `enhance.mjs` | Rewrites weak/AI-feeling content.md to hit 10 quality dimensions | `content.md` (or `content-enhanced.md`) |
| `humanize.mjs` | Tone-only rewrite — strips AI clichés, adds verbal voice | `content.md` (or `content-humanized.md`) |
| `review.mjs` | Multi-modal QA — punch list of concrete fixes per slide | `qa-report.md` |
| `illustrate.mjs` | Visual director — AI hero images + Lucide icons per slide | `images/auto/` + `manifest.md` |
| `lib/shared.mjs` | Shared helpers (env, Gemini client, screenshots, CLAUDE.md walk) | (lib) |

PowerShell wrappers (`*.ps1`) handle the corporate-cert-MITM `NODE_OPTIONS=--use-system-ca` quirk automatically.

## The 10 quality dimensions enforced by `enhance`

1. **Funny** (where appropriate — wry > slapstick)
2. **Interesting** (cliffhangers, curiosity gaps, surprising stats)
3. **Attractive** (concrete sensory imagery > abstract claims)
4. **Interactive** (questions, polls, brainstorms, demos — every deck must have at least 2)
5. **Human** (verbal tics, asides, pauses, stage directions, callbacks)
6. **Specific** (real numbers, real banks, real banker tasks)
7. **Memorable** (anchor visuals, quotable lines, tweet-sized takeaway)
8. **Clear narrative arc** (hook → problem → stakes → framework → demo → application → payoff)
9. **Right cognitive load** (max 3 new ideas per slide, prerequisite ordering)
10. **NOT AI-generated** (no clichés, no parallel triple-bullets, no marketing-speak, asymmetric rhythm)

Full criteria + anti-cliché vocabulary table lives in `prompts/enhance.md` — edit it to tune the system.

## Usage

### Auto mode (recommended) — diagnose + run

```powershell
.\.qa\agent.ps1 decks\cb_decks\2_deck
```

The agent inspects `content.md`, classifies the state, and runs the right chain:

| State | Detected by | Recommended chain |
|---|---|---|
| `no-deck` | no `index.html` / `slides.md` | (none — build the HTML first) |
| `no-content` | no `content.md` | `enhance` |
| `thin-content` | <1200 words | `enhance --inplace` → `humanize --inplace` → `review` |
| `ai-flavored` | ≥3 cliché hits or 0 human signals | `enhance --inplace` → `humanize --inplace` → `review` |
| `dry-content` | low human-signal density | `humanize --inplace` → `review` |
| `mature` | passes all heuristics | `review` only |

### Just diagnose (no execution)

```powershell
.\.qa\agent.ps1 decks\cb_decks\2_deck --dry-run
```

### Force a specific mode

```powershell
.\.qa\agent.ps1 decks\cb_decks\2_deck --mode full           # enhance + humanize + review
.\.qa\agent.ps1 decks\cb_decks\2_deck --mode full+visuals   # everything: enhance + humanize + illustrate + review
.\.qa\agent.ps1 decks\cb_decks\2_deck --mode enhance        # rewrite only
.\.qa\agent.ps1 decks\cb_decks\2_deck --mode humanize       # tone fix only
.\.qa\agent.ps1 decks\cb_decks\2_deck --mode review         # QA only
.\.qa\agent.ps1 decks\cb_decks\2_deck --mode illustrate     # visuals only
```

### Run individual tools directly

```powershell
.\.qa\enhance.ps1     decks\cb_decks\2_deck --inplace
.\.qa\humanize.ps1    decks\cb_decks\2_deck --inplace
.\.qa\review.ps1      decks\cb_decks\2_deck
.\.qa\illustrate.ps1  decks\cb_decks\2_deck                     (auto-decide per slide)
.\.qa\illustrate.ps1  decks\cb_decks\2_deck --plan-only          (preview decisions, no API spend)
.\.qa\illustrate.ps1  decks\cb_decks\2_deck --slides 5,7,9       (only these slides)
```

### Visual layer modes (`illustrate.mjs`)

For each slide, the planner (Gemini-3-pro reading the screenshot) decides one of:

| Mode | What gets generated | When chosen |
|---|---|---|
| `hero` | Brand-matched AI illustration via `gemini-2.5-flash-image` (~900 KB PNG) | Hooks, metaphors, section openers, text-heavy slides |
| `icon` | Lucide SVG icons (~0.5 KB each) for cards / lists | Multi-card grids, taxonomies, feature lists |
| `none` | Nothing | Slide already has rich visuals (chart, video, big-stat, QR) |

**Output:**
- `decks/<deck>/images/auto/slide-N-hero.png` (full-bleed images)
- `decks/<deck>/images/auto/slide-N-icon-{position}-{name}.svg` (individual icons)
- `decks/<deck>/images/auto/manifest.md` — per-slide decisions + ready-to-paste HTML snippets

You copy-paste the snippets into `index.html` where you want them. Nothing auto-applies to the deck — visual decisions stay reviewable.

**Bias:** typical 12-slide deck gets 1–3 heroes + 4–6 icon-equipped slides, rest untouched. Don't over-illustrate.

### Batch over all 15 cb_decks modules

```powershell
1..15 | ForEach-Object { .\.qa\agent.ps1 "decks\cb_decks\${_}_deck" }
```

Each module is diagnosed and run independently. A failure on one doesn't stop the next.

## Files written per deck

| File | Tool that writes it | Notes |
|---|---|---|
| `content.md` | `enhance` / `humanize` (with `--inplace`) | The deliverable speaker notes |
| `content-enhanced.md` | `enhance` (without `--inplace`) | Review before replacing |
| `content-humanized.md` | `humanize` (without `--inplace`) | Review before replacing |
| `qa-report.md` | `review` | Punch list of concrete fixes per slide |
| `screenshots/slide-NN.png` | auto-rendered if missing | Used by review + enhance + humanize |

## Source-of-truth rule

The **live deck** (`index.html` / `slides.md`) is canonical. The agents treat companion `content.md` / `notes.md` as potentially stale. They never recommend reverting deck source to match outdated Markdown.

## Output language rule

Every prompt auto-detects the deck's primary language from titles and body. Reports + rewrites are in that language. Section headings stay English so structure is parseable.

## Cost & latency

| Tool | Tokens (typical 19-slide deck) | Time |
|---|---|---|
| `review` | ~65K in / ~1–2K out | 30–80 s |
| `enhance` | ~65K in / ~5–8K out | 60–120 s |
| `humanize` | ~65K in / ~7K out | 60–100 s |
| `agent --mode full` | sum of above | 3–5 min |

Multimodal screenshots dominate input tokens. Use `--no-screenshots` for ~3× faster, ~2× cheaper passes if you only need text-only review.

## Editing the prompts

`.qa/prompts/*.md` are the brains. Each script reads them at runtime — no rebuild needed. Edit, rerun, iterate.

| Prompt | Purpose |
|---|---|
| `prompts/review.md` | What QA looks for, severity rubric, output schema |
| `prompts/humanize.md` | What "human voice" means, anti-cliché table |
| `prompts/enhance.md` | The 10 quality dimensions, voice profile inference, per-slide rewrite playbook |
| `prompts/illustrate.md` | Visual decision criteria, brand-style template, JSON manifest schema |

## Hard requirements

- Node.js 22+ (built-in `fetch`, `--use-system-ca`)
- `GEMINI_API_KEY` in `.env` at repo root (or `decks/cb_decks/bots/.env` as fallback)
- Internet access to `generativelanguage.googleapis.com`
- For visual review: `playwright` with Chromium (already a project dep — used by `screenshot.mjs`)
- Default model: `gemini-3-pro-preview`. Falls back to `gemini-3.1-pro-preview` → `gemini-pro-latest` → `gemini-2.5-pro` if a 404/400 hits.

## When to gitignore reports

`qa-report.md` is regeneratable. Decision is yours: commit to track quality over revisions, or gitignore as ephemeral. The agent doesn't make that choice for you.

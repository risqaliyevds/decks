# slides — project rules

This repo holds slide decks for meetups, project pitches, and talks. **All decks are interactive HTML.** PowerPoint output is never produced from this project.

## Hard rules

1. **Never produce a `.pptx` file.** If the user says "powerpoint" they mean an HTML deck. If they truly need pptx, redirect them to a different project.
2. **Skill priority — invoke `frontend-slides` first** for any new deck (single-file HTML, style discovery, viewport fitting, 12 curated presets). Fall back to `html-slides` when (a) the deck must be Reveal.js or Slidev, (b) you're editing existing decks under `decks/bank-demo/` or `decks/cb_decks/`, or (c) you need the framework decision tree, design playbook, or QA loop docs. The two skills are complementary — `frontend-slides` is the design authority, `html-slides` is the project workflow authority.
3. **Pick exactly one framework per deck** (Reveal.js, Slidev, or hand-rolled). Don't mix. `frontend-slides` only emits hand-rolled single-file HTML; if Reveal/Slidev is required, use `html-slides`.
4. **Every deck lives under `decks/<YYYY-MM-event-topic>/`.** This overrides `frontend-slides`' default of emitting a loose HTML file — always place its output at `decks/<deck>/index.html`. Keep assets in `assets/`, screenshots in `screenshots/` (gitignored).
5. **No deck is "done" until QA has run at least one fix-and-verify cycle.** Use this project's loop, not `frontend-slides`' PDF-only path: screenshot every slide via `screenshot.mjs` → invoke the `slide-reviewer` subagent → fix → re-screenshot affected slides → re-review.
6. **Default theme themes are forbidden** for shipped decks — Reveal's `black/white/league.css`, Slidev's `default/seriph`. Always override with a custom palette + type pairing. For custom HTML, prefer one of `frontend-slides`' 12 presets (`STYLE_PRESETS.md`) or a palette from `.claude/skills/html-slides/design.md`.
7. **No accent line directly under titles.** Hallmark of AI-generated decks. Use whitespace, background color, or a side-bar instead.
8. **Every slide needs a visual element.** Title + bullets only is forbidden — add an image, icon, chart, embed, or animated element.
9. **Viewport fitting is non-negotiable** (from `frontend-slides`): every slide fits exactly within 100vh, no internal scrolling, all sizing in `clamp()`. Content overflows? Split the slide.

## Workflow shape

**Default path (new deck, hand-rolled HTML)** — driven by `frontend-slides`:

1. Outline in `decks/<deck>/notes.md` first (one bullet = one slide).
2. Run `frontend-slides` Phase 1 (content discovery) and Phase 2 (style discovery — 3 visual previews, user picks).
3. Generate the deck per `frontend-slides` Phase 3, but write output to `decks/<deck>/index.html` (project folder convention overrides the skill's default).
4. **Skip `frontend-slides` Phase 5–6** (delivery / Vercel / PDF). Instead, run this project's QA loop: `screenshot.mjs` → `slide-reviewer` → fix → re-screenshot.

**Alternate path (Reveal.js or Slidev required)** — driven by `html-slides`:

1. Outline in `notes.md` first.
2. Pick framework via the decision table in `.claude/skills/html-slides/SKILL.md`.
3. Pick palette + type pairing + motif from `design.md`. Commit before writing slides.
4. Build slides per the framework guide (`reveal.md` or `slidev.md`).
5. Layer interactivity from `interactivity.md` only where it adds meaning.
6. Run the same QA loop from `qa.md`.

## Tools

- Screenshot script: `node .\.claude\skills\html-slides\scripts\screenshot.mjs decks\<deck>`
- Reviewer subagent: invoke the `slide-reviewer` agent with the deck path
- Local serve (custom decks): `npx http-server decks\<deck>` or just open the file URL
- `frontend-slides` skill location: `C:\Users\User\.claude\skills\frontend-slides\` (cloned manually; `/plugin marketplace add zarazhangrui/frontend-slides` will replace this with the marketplace-managed copy).

## Voice & tone for slide content

- Headlines: short, declarative. Not questions, not clickbait.
- Body text: write for a projector reader 4 meters away — concise, scannable, no walls of text.
- Speaker notes: cues, not scripts. The speaker is reading the room, not the slide.

---
name: html-slides
description: "Use this skill any time slides, decks, or presentations are involved — creating, editing, reviewing, or exporting. This project produces interactive HTML decks for meetups, talks, pitches, and project showcases. Trigger on the words \"slide,\" \"slides,\" \"deck,\" \"presentation,\" \"talk,\" \"pitch,\" \"meetup,\" \"keynote,\" or any reference to .html / .md slide files inside C:\\projects\\slides. NEVER produce .pptx output from this project — even if the user says \"powerpoint\" they mean an HTML deck. The skill picks the right framework (Reveal.js, Slidev, or hand-rolled HTML) for the deck and walks through design, build, and QA."
---

# html-slides — interactive HTML decks

> Adapted from Anthropic's `pptx` skill. **PowerPoint output is never produced.** Every deck in this repo is a self-contained HTML experience — designed for the browser, projected from a browser, exported (if needed) to PDF from a browser.

## Quick reference

| Task | Where to look |
|------|---------------|
| Pick a framework for a new deck | [§ Framework decision](#framework-decision) below |
| Build a Reveal.js deck | [reveal.md](reveal.md) |
| Build a Slidev deck | [slidev.md](slidev.md) |
| Build a hand-rolled HTML deck | [custom.md](custom.md) |
| Color, typography, layout, motifs | [design.md](design.md) |
| Animations, embeds, live demos | [interactivity.md](interactivity.md) |
| Screenshot + verify before declaring done | [qa.md](qa.md) |
| Get a fresh-eyes visual review | invoke the `slide-reviewer` subagent |

---

## Framework decision

Before writing any HTML, pick one. The choice is sticky for the deck — don't mix frameworks.

| If the deck is… | Use | Why |
|---|---|---|
| A standard meetup / project intro / pitch with normal slide flow | **Reveal.js** | Single HTML file, CDN, mature, plugin ecosystem, easiest to share |
| Code-heavy (live coding, syntax highlighting, line-by-line walkthroughs, dev talks) | **Slidev** | Markdown-first, Shiki highlighting, Monaco editor, hot reload |
| A showcase, portfolio piece, product launch, or anything that needs unique full-bleed creative effects | **Custom HTML** | No framework constraints — scroll-jack, WebGL, canvas, anything |

If the user is ambiguous, **ask once** — don't guess. The framework changes the whole file layout.

---

## Project layout

Every deck lives in its own folder under `decks/`:

```
decks/
  2026-05-meetup-rust/         <- one folder per deck
    index.html                 (Reveal/Custom) or
    slides.md                  (Slidev)
    assets/                    images, fonts, video
    screenshots/               QA output (gitignored)
    notes.md                   speaker notes / outline
```

Folder name format: `YYYY-MM-<event>-<topic>` so chronological sort is meaningful.

---

## Workflow (every deck)

1. **Outline first, code second.** Write the slide list in `notes.md` before opening `index.html`. One bullet = one slide.
2. **Pick a framework** using the table above.
3. **Pick a palette + motif** from [design.md](design.md). Commit before writing slides — don't tweak colors slide-by-slide.
4. **Build slides** following the framework guide.
5. **Layer in interactivity** from [interactivity.md](interactivity.md) where it adds meaning, not decoration.
6. **QA loop** ([qa.md](qa.md)) — screenshot every slide, invoke `slide-reviewer`, fix, re-screenshot. Do **at least one** fix-and-verify cycle before declaring done.

---

## Reading existing decks

```powershell
# Open in default browser
Start-Process .\decks\<deck>\index.html

# Slidev dev server
npx slidev .\decks\<deck>\slides.md
```

Don't try to `markitdown` an HTML deck — just read the file with the `Read` tool.

---

## Design ideas (don't make boring slides)

The full design playbook is in [design.md](design.md). The non-negotiables:

- **Bold, content-informed palette.** If swapping your colors into an unrelated deck would still "work," they're too generic.
- **One color dominates** (60–70% visual weight). Never give all colors equal weight.
- **Sandwich structure:** dark title + dark closing, light content in between. Or commit to dark throughout.
- **Pick one motif** (rounded image frames, icons in colored circles, thick single-side borders, animated underline) and repeat it across every slide.
- **Every slide needs a visual element** — image, chart, icon, animation, embedded demo. Plain title + bullets is forbidden.
- **No accent lines under titles.** They scream AI-generated. Use whitespace or background color instead.

Interactivity-specific (HTML's superpower over pptx) — see [interactivity.md](interactivity.md):

- Live runnable code blocks (CodeSandbox embeds, Monaco, Shiki)
- Scroll-triggered or fragment-revealed reveals
- Embedded video / autoplay loops as background
- Inline charts with real data (Chart.js, D3, observable embeds)
- Hover/click micro-interactions on diagrams
- Real product demos in iframes

---

## QA is required

**Assume there are problems. Your job is to find them.**

The first render is almost never correct. Approach QA as a bug hunt, not a confirmation step. If you found zero issues on first inspection, you weren't looking hard enough.

Full QA loop in [qa.md](qa.md). The short version:

1. `node .claude/skills/html-slides/scripts/screenshot.mjs <deck-folder>` → produces `decks/<deck>/screenshots/slide-NN.png`
2. Invoke the `slide-reviewer` subagent with the screenshot paths. Fresh eyes catch what you miss.
3. Fix issues.
4. Re-screenshot affected slides only (`--only 3,7,12`).
5. Repeat until a full pass reveals nothing new.

**Do not declare a deck done until you've completed at least one fix-and-verify cycle.**

---

## Dependencies

Install once per machine (the project doesn't pin them):

```powershell
# For QA screenshots (used by every framework)
npm install -g playwright
npx playwright install chromium

# Slidev (only if building a Slidev deck)
npm install -g @slidev/cli

# Reveal.js & Custom decks need no install — they're CDN-loaded HTML
```

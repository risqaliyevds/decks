# `.export/` — final-version converter (HTML → PDF + PPTX)

Reusable build step you run **after** the deck is finalized in HTML. Always renders fresh screenshots first so the outputs reflect the current state of `index.html`.

## Usage

```powershell
# Both PDF + PPTX (default)
.\.export\build.ps1 decks\cb_decks\1_deck

# Just one
.\.export\build.ps1 decks\cb_decks\1_deck --pdf
.\.export\build.ps1 decks\cb_decks\1_deck --pptx

# Skip the screenshot refresh (faster — use when you know PNGs are current)
.\.export\build.ps1 decks\cb_decks\1_deck --skip-screenshots
```

```bash
# bash equivalent
NODE_OPTIONS=--use-system-ca node .export/build.mjs decks/cb_decks/1_deck
```

## Outputs

```
<deck>/<deck-name>.pdf      ← multi-page PDF, 1920×1080 per page, pixel-perfect
<deck>/<deck-name>.pptx     ← editable PowerPoint, 16:9 widescreen, full-bleed PNG per slide
```

For deck `decks/cb_decks/1_deck`, that's `decks/cb_decks/1_deck/1_deck.pdf` and `1_deck.pptx`.

## What lands where in the PPTX

- **Slide visuals:** each slide is rendered as a full-bleed PNG (1920×1080 from `screenshots/`). PowerPoint sees images, not editable text — but you keep pixel-perfect fidelity from the HTML.
- **Speaker notes:** if `content.md` has `## Slide N — title` sections with `**Speaker notes:**` blocks, those notes are pulled into PowerPoint's Notes pane. Visible in Presenter View.
- **Title metadata:** `pres.title = <deck-name>`, `pres.author = "crea7iveai"`.

## What does NOT survive the conversion

| HTML feature | PDF | PPTX |
|---|---|---|
| Fragment animations (one-by-one reveals) | ❌ all visible | ❌ all visible |
| `<video autoplay>` | ❌ frozen frame | ❌ frozen frame |
| Hyperlinks (`t.me/bankragbot`) | ❌ static text | ❌ static text |
| Click-anywhere navigation | n/a | uses arrow keys |
| Custom fonts (Inter, Space Grotesk, Archivo Black) | ✓ embedded as part of the PNG | ✓ same |

If you need any of those, present from the HTML directly. The PDF/PPTX are for offline distribution and submission — not the live talk.

## Why it always re-screenshots first

The HTML is the source of truth. If you edited a slide and forgot to refresh PNGs, the PDF/PPTX would silently lag. The default flow runs `screenshot.mjs` to keep them in sync. Pass `--skip-screenshots` only when you've just rendered them and want to skip the ~30 sec.

## Dependencies

Already installed via `npm install pdf-lib pptxgenjs --no-save`. If you fresh-clone this repo, run that command once.

## Batch over all 15 cb_decks modules

```powershell
1..15 | ForEach-Object { .\.export\build.ps1 "decks\cb_decks\${_}_deck" }
```

Each module gets its own `<N>_deck.pdf` + `<N>_deck.pptx` in its own folder. ~1–2 min per deck (mostly screenshot time).

# cb_decks — Style standard

This is the canonical visual standard for all 15 decks in the Central Bank seminar series. Every deck under `cb_decks/N_deck/` must use these fonts, CSS variables, and base classes verbatim. Per-slide custom CSS is fine on top, but the variables below should never be overridden.

If you change something here, you change it everywhere — and re-screenshot all affected decks.

## Fonts

- **Display:** `Archivo Black` (heavy, geometric — used for h1/h2, chips, footer brand, big numbers, captions)
- **Body:** `Space Grotesk` (300/400/500/600/700 — used for paragraphs, list items, leads)
- **No Inter, no Inter preload.** Earlier drafts loaded Inter as a fallback; it was never used as `font-family` and just added weight. Keep it out.

### Canonical Google Fonts link (paste in `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Body declaration

```css
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;background:#020A24;color:#fff;font-family:'Space Grotesk',sans-serif}
```

### Letter-spacing fix (mandatory — fixes Space Grotesk I/l ambiguity)

Without this, "AI" can look like "Al" at projector distance. Place this **at the top of the style block**, before any class definitions:

```css
body,p,li,.lead{letter-spacing:0.018em}
```

Decks that have visual elements with English ALL-CAPS labels can extend the selector list (`.row p, .dict-card p, .benefit p, etc.`) — but the four base selectors above are the floor.

## CSS variables (`:root`)

These nine variables are the entire size system. Don't add new size variables; if a slide needs something custom, use `clamp(...)` inline.

```css
:root{
  /* Background palette */
  --bg:#020A24;            /* deep navy — body bg */
  --bg-2:#06173B;          /* slightly lifted */
  --bg-3:#0B2D79;          /* highlighted block */

  /* Accent palette */
  --accent:#2563eb;        /* primary blue — buttons, agent cards, key callouts */
  --accent-2:#60a5fa;      /* light blue — labels, chips, secondary highlights */
  --accent-glow:#1FF2F9;   /* cyan glow — fragment hover, edge accents */

  /* Neutral palette */
  --ink:#0a0f1f;           /* darkest panel */
  --mute:#7a8aa3;          /* muted body text, captions */
  --soft:rgba(255,255,255,0.08); /* hairline borders */

  /* Layout */
  --pad:clamp(1.5rem,4vw,4rem);

  /* Type scale */
  --title:clamp(2rem,5.5vw,5rem);   /* slide-1 title-display */
  --h2:clamp(1.5rem,3.2vw,2.75rem); /* every other slide H2 */
  --h3:clamp(1.1rem,2vw,1.6rem);    /* card headers */
  --body:clamp(0.85rem,1.2vw,1.15rem);
  --small:clamp(0.7rem,0.9vw,0.85rem);

  /* Radius */
  --r:clamp(0.75rem,1.5vw,1.5rem);

  /* Display font (alias) */
  --display:'Archivo Black',sans-serif;
}
```

## Base classes

These six classes appear in every deck. Their definitions must match exactly.

```css
.title-display{font-family:var(--display);font-weight:900;font-size:var(--title);line-height:0.95;letter-spacing:-0.03em;text-transform:uppercase}

.h2{font-family:var(--display);font-size:clamp(1.75rem,3.6vw,3rem);line-height:1.05;letter-spacing:-0.025em;text-transform:uppercase;color:#fff}

.lead{font-size:var(--body);line-height:1.55;color:rgba(255,255,255,0.78);max-width:60ch;margin-top:clamp(0.85rem,1.5vw,1.25rem);font-weight:400}

.num{font-family:var(--display);font-size:clamp(2rem,4vw,3.2rem);line-height:0.9;letter-spacing:-0.04em;color:var(--accent-2);text-align:right}

.foot .speaker strong{font-family:var(--display);letter-spacing:0.08em;font-size:var(--small)}

.hl{color:var(--accent-2)} /* in-line text highlight */
```

The accent-bar pattern (`<span class="accent-bar"></span>`) under titles is **forbidden** per the project rule (smells AI-generated). Use whitespace, color, or chip-out for separation.

## Drop-in header block

For a brand-new deck, paste this as the start of `<style>`. Everything below is correct by default.

```html
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;background:#020A24;color:#fff;font-family:'Space Grotesk',sans-serif}
body,p,li,.lead{letter-spacing:0.018em}

:root{
  --bg:#020A24;--bg-2:#06173B;--bg-3:#0B2D79;
  --accent:#2563eb;--accent-2:#60a5fa;--accent-glow:#1FF2F9;
  --ink:#0a0f1f;--mute:#7a8aa3;--soft:rgba(255,255,255,0.08);
  --pad:clamp(1.5rem,4vw,4rem);
  --title:clamp(2rem,5.5vw,5rem);
  --h2:clamp(1.5rem,3.2vw,2.75rem);
  --h3:clamp(1.1rem,2vw,1.6rem);
  --body:clamp(0.85rem,1.2vw,1.15rem);
  --small:clamp(0.7rem,0.9vw,0.85rem);
  --r:clamp(0.75rem,1.5vw,1.5rem);
  --display:'Archivo Black',sans-serif;
}

.title-display{font-family:var(--display);font-weight:900;font-size:var(--title);line-height:0.95;letter-spacing:-0.03em;text-transform:uppercase}
.h2{font-family:var(--display);font-size:clamp(1.75rem,3.6vw,3rem);line-height:1.05;letter-spacing:-0.025em;text-transform:uppercase;color:#fff}
.lead{font-size:var(--body);line-height:1.55;color:rgba(255,255,255,0.78);max-width:60ch;margin-top:clamp(0.85rem,1.5vw,1.25rem);font-weight:400}
.num{font-family:var(--display);font-size:clamp(2rem,4vw,3.2rem);line-height:0.9;letter-spacing:-0.04em;color:var(--accent-2);text-align:right}
.hl{color:var(--accent-2)}

/* Per-slide CSS goes below — never override the variables above. */
</style>
```

## What's NOT standardized

These are intentionally per-deck — don't lift them into the standard:

- **Per-slide layout classes** (`.flow`, `.cases`, `.benefits`, `.arch`, `.node-mock`, `.recap-mini`, etc.) — every deck builds the layouts it needs
- **Slide section classes** (`.s-title`, `.s-arch`, `.s-build`, etc.) — naming is per-deck
- **Speaker brand-strip image paths** — every deck imports from `../_shared/`
- **HUD / nav-dot / counter** — same JavaScript pattern, but visual tweaks allowed per deck

## When the standard changes

Edit this file, then run a one-shot patch over all 15 decks. Don't expect drift to fix itself.

```powershell
# Verify drift after a standard change — should return identical output for every deck
foreach ($n in 1..15) {
  $f = "decks\cb_decks\${n}_deck\index.html"
  Get-Content $f | Select-String "body,p,li,.lead\{letter-spacing"
}
```

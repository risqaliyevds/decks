# Design playbook

Adapted from the pptx skill, retuned for HTML/CSS. Use this for every deck — pick a palette, pick a type pairing, commit to a motif before writing slides.

## Before starting

- **Pick a bold, content-informed palette.** It should feel designed for THIS topic. If swapping your colors into an unrelated deck would still "work," you haven't made specific enough choices.
- **Dominance over equality.** One color should dominate (60–70% visual weight), with 1–2 supporting tones and one sharp accent. Never give all colors equal weight.
- **Dark/light contrast.** Dark backgrounds for title + closing slides, light for content (sandwich structure). Or commit to dark throughout for a premium feel.
- **Commit to a visual motif.** Pick ONE distinctive element and repeat it — rounded image frames, icons in colored circles, thick single-side borders, animated underline strokes, dotted grids in the corners. Carry it across every slide.

## Color palettes

Don't default to generic blue. Pick a palette that matches the topic. Use these as inspiration:

| Theme | Primary | Secondary | Accent |
|-------|---------|-----------|--------|
| **Midnight Executive** | `#1E2761` | `#CADCFC` | `#FFFFFF` |
| **Forest & Moss** | `#2C5F2D` | `#97BC62` | `#F5F5F5` |
| **Coral Energy** | `#F96167` | `#F9E795` | `#2F3C7E` |
| **Warm Terracotta** | `#B85042` | `#E7E8D1` | `#A7BEAE` |
| **Ocean Gradient** | `#065A82` | `#1C7293` | `#21295C` |
| **Charcoal Minimal** | `#36454F` | `#F2F2F2` | `#212121` |
| **Teal Trust** | `#028090` | `#00A896` | `#02C39A` |
| **Berry & Cream** | `#6D2E46` | `#A26769` | `#ECE2D0` |
| **Sage Calm** | `#84B59F` | `#69A297` | `#50808E` |
| **Cherry Bold** | `#990011` | `#FCF6F5` | `#2F3C7E` |
| **Cyber Night** | `#0F1020` | `#FF206E` | `#41EAD4` |
| **Solar Flare** | `#FFB400` | `#FF5400` | `#1B1B1E` |

Wire palettes into CSS as variables so swapping them is one edit:

```css
:root {
  --bg: #FCF6F5; --fg: #212121;
  --primary: #990011; --secondary: #FCF6F5; --accent: #2F3C7E;
}
```

## Typography

Choose an interesting pairing — don't default to Arial or system-ui alone. Header font should have personality, body font should be clean and legible at small sizes.

| Header | Body | Vibe |
|---|---|---|
| Fraunces | Inter | Editorial, modern serif on sans |
| Space Grotesk | Inter | Tech, geometric |
| Playfair Display | Source Sans Pro | Elegant, magazine |
| Bricolage Grotesque | Inter | Playful, contemporary |
| Instrument Serif | Geist | Refined, startup-modern |
| JetBrains Mono | Inter | Dev/code talks |
| Cormorant Garamond | Lato | Premium, classical |
| Bebas Neue | Inter | Bold, condensed headers |
| Archivo Black | Archivo | Heavy display, brutalist |
| IBM Plex Serif | IBM Plex Sans | Trustworthy, corporate |

Load via Google Fonts (preconnect for speed) or self-host in `assets/fonts/`:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

| Element | Suggested size (16:9 1920×1080) |
|---|---|
| Slide title | `clamp(2.5rem, 5vw, 4.5rem)` bold |
| Section header | `clamp(1.5rem, 2.5vw, 2.25rem)` bold |
| Body text | `clamp(1rem, 1.5vw, 1.5rem)` |
| Captions / footer | `clamp(0.75rem, 1vw, 0.95rem)` muted |

`clamp()` keeps the deck readable on a laptop preview AND on a projector — much better than fixed `pt`.

## Layout options

Vary across the deck — don't repeat the same one slide after slide.

- **Two-column** — text left, illustration/code right
- **Icon + text rows** — icon in a colored circle, bold header, short description
- **2×2 or 2×3 grid** — image on one side, content blocks on the other
- **Half-bleed image** — full left or right side image with content overlay
- **Stat callout** — one giant number (60–120pt) with a small label below
- **Comparison columns** — before/after, pros/cons, side-by-side options
- **Timeline / process flow** — numbered steps with arrows or connecting lines
- **Quote** — large pulled quote with attribution
- **Full-bleed media** — edge-to-edge image or video with minimal overlay text

## Visual polish

- Icons in small colored circles next to section headers (use [Lucide](https://lucide.dev) or [Heroicons](https://heroicons.com) — both work as inline SVG)
- Italic accent text for stats or taglines
- Subtle gradients on buttons and stat callouts (avoid 90s-style harsh gradients)
- Soft shadows (`box-shadow: 0 8px 30px -10px rgba(0,0,0,0.2)`) on cards
- Rounded corners (`border-radius: 0.75rem`) — but commit to one radius across the deck

## Spacing

- Minimum 0.5"-equivalent margins (`padding: clamp(2rem, 6vw, 6rem)`)
- 0.3–0.5" between content blocks (`gap: 1.5rem`)
- Leave breathing room — don't fill every inch

## Avoid (common mistakes)

- **Don't repeat the same layout** — vary columns, cards, callouts across slides
- **Don't center body text** — left-align paragraphs and lists; center only titles, hero numbers, and quotes
- **Don't skimp on size contrast** — titles need ~3× body size to stand out
- **Don't default to blue** — pick colors that reflect the specific topic
- **Don't mix spacing randomly** — pick a gap value (e.g. `1.5rem`) and use it consistently
- **Don't style one slide and leave the rest plain** — commit fully or keep it simple throughout
- **Don't create text-only slides** — every slide needs a visual element
- **Don't use low-contrast text** — run [WebAIM contrast](https://webaim.org/resources/contrastchecker/) on header/bg pairs; aim for AA (4.5:1) at minimum
- **NEVER use accent lines under titles** — these are a hallmark of AI-generated slides; use whitespace, background color, or a side-bar instead
- **Don't use Reveal/Slidev default themes** — they're recognizable; always override
- **Don't rely on emoji as icons** — they render differently per OS, look amateurish on a projector. Use SVG icons.

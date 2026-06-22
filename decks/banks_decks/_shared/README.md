# `_shared/` — series-wide assets for cb_decks

Files in this folder are referenced from every `N_deck/index.html` via `../_shared/`. Don't move or rename without updating every deck.

## Logos (production — use these in slides)

| File | Subject | Source | Notes |
|---|---|---|---|
| `logo-ministry.png` | O'zbekiston Respublikasi Raqamli Texnologiyalar Vazirligi (Ministry of Digital Technologies) | recolored from `lotin vazirlik.png` | white ink on transparent · 5906×1278 · use on dark backgrounds only |
| `logo-digital-ed.png` | Raqamli Ta'limni Rivojlantirish Markazi (Digital Education Development Center) | recolored from `new_logo.png` | white ink on transparent · 2188×644 · use on dark backgrounds only |

Both logos are sized via CSS (`.header-bar img { height: 70%; width: auto; }`) — never set explicit pixel widths.

## Original source files (reference — do not delete, do not embed)

| File | Notes |
|---|---|
| `lotin vazirlik.png` | original Ministry logo, blue ink on white. Source for `logo-ministry.png`. |
| `new_logo.png` | original Digital Ed Center logo, two-tone blue on white. Source for `logo-digital-ed.png`. |

## Recolor process (white-ink-on-transparent)

If either source logo is replaced, regenerate the white versions with this transform:

1. Promote source PNG into a fresh 32bpp ARGB canvas (skipping this step on a 24bpp source produces an opaque-white block — the alpha bytes stomp the next pixel's blue).
2. For each pixel — preserve already-transparent pixels; for opaque pixels compute Rec. 601 luminance and remap:
   - `lum ≥ 245` → `α = 0` (white background → transparent)
   - `lum ≤ 180` → `α = 255` (ink → fully opaque white)
   - between → linear ramp (anti-aliased edges)
3. Write `RGB = 255,255,255` for every non-transparent pixel.

The PowerShell implementation lives in this folder's git history (commit that introduced the white logos). Re-run with the function `Convert-LogoToWhite` if needed.

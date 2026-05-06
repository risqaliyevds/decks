# Reveal.js workflow

Use Reveal.js for standard meetup decks, project intros, pitches, and any deck where the slides flow linearly. Single self-contained `index.html` — no build step, ships over CDN, opens in any browser.

## Starter file

Create `decks/<deck>/index.html`. Pin a Reveal version (don't use `@latest` — it can break overnight).

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>{{ deck title }}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reset.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/highlight/monokai.css" />
<link rel="stylesheet" href="./theme.css" />
</head>
<body>
<div class="reveal"><div class="slides">

  <section data-background-color="#1E2761">
    <h1>{{ title }}</h1>
    <p class="subtitle">{{ subtitle }}</p>
  </section>

  <section>
    <h2>{{ section heading }}</h2>
    <ul>
      <li class="fragment">First reveal</li>
      <li class="fragment">Second reveal</li>
    </ul>
  </section>

</div></div>

<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/highlight/highlight.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/notes/notes.js"></script>
<script>
  Reveal.initialize({
    hash: true,
    slideNumber: 'c/t',
    transition: 'fade',
    plugins: [RevealHighlight, RevealNotes],
  });
</script>
</body>
</html>
```

Always create a sibling `theme.css` for deck-specific overrides — never edit Reveal's stylesheets directly.

## Slide patterns

**Vertical stacks** (sub-slides) — useful for "drill down" sequences. Press ↓ instead of →.

```html
<section>
  <section><h2>Topic</h2></section>
  <section><h3>Detail 1</h3></section>
  <section><h3>Detail 2</h3></section>
</section>
```

**Fragment reveals** — progressive disclosure inside one slide.

```html
<li class="fragment fade-up">Appears on next click</li>
<li class="fragment fade-in-then-semi-out">Highlight then dim</li>
```

**Per-slide background** — image, color, video, or iframe.

```html
<section data-background-image="./assets/cover.jpg" data-background-size="cover">…</section>
<section data-background-video="./assets/loop.mp4" data-background-video-loop>…</section>
<section data-background-iframe="https://example.com">…</section>
```

**Speaker notes** — `S` opens speaker view in browser.

```html
<aside class="notes">Don't read these aloud; they're cues.</aside>
```

## Useful plugins (load via CDN, no install)

| Plugin | Use for |
|---|---|
| `highlight` | Code blocks with Monokai/Zenburn |
| `notes` | Speaker view |
| `math` | KaTeX equations |
| `chalkboard` (rajgoel) | Live annotation during the talk |
| `mermaid` | Inline mermaid diagrams |

## Theme overrides (`theme.css`)

Don't fight Reveal's reset — extend it. Minimal theme skeleton:

```css
:root {
  --r-background-color: #FCF6F5;
  --r-main-color: #212121;
  --r-heading-color: #990011;
  --r-link-color: #2F3C7E;
  --r-main-font: 'Inter', system-ui, sans-serif;
  --r-heading-font: 'Fraunces', Georgia, serif;
  --r-heading-text-transform: none;
  --r-heading1-size: 3.2em;
  --r-heading2-size: 1.8em;
}

.reveal h1, .reveal h2 { letter-spacing: -0.02em; }
.reveal section { text-align: left; }
.reveal section.title-slide { text-align: center; }
```

Pull web fonts from Google Fonts or self-host in `assets/fonts/`.

## Export to PDF (for sharing)

```powershell
# Open the deck with ?print-pdf appended, then File → Print → Save as PDF
Start-Process "file:///C:/projects/slides/decks/<deck>/index.html?print-pdf"

# Or automated:
npx decktape reveal "file:///C:/projects/slides/decks/<deck>/index.html" .\decks\<deck>\export.pdf
```

## Common mistakes (Reveal-specific)

- **Don't put everything in one giant `<section>`.** Break by topic — Reveal's transitions are how the audience tracks where they are.
- **Don't forget `data-background-color` on dark slides.** Background defaults to white, you'll get a flash on transition.
- **Don't use Reveal's built-in themes** (`black.css`, `white.css`, `league.css`, etc.) for anything you're proud of. They're recognizable and bland. Always ship a custom `theme.css`.
- **Don't auto-fit text** (`data-auto-animate` with weird sizes). If a slide overflows, the slide has too much on it — split it.

# Custom HTML workflow

Use a hand-rolled HTML deck when the deck is the show: product launches, portfolio pieces, conference keynotes, anything where you want full-bleed creative effects (WebGL, scroll-jacking, canvas, custom transitions, choreographed motion). No framework constraints. More work per deck, but the result is unique.

## Skeleton

`decks/<deck>/index.html`:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{{ deck title }}</title>
<link rel="stylesheet" href="./style.css" />
</head>
<body>

<main class="deck" data-current="0">
  <section class="slide" data-bg="dark">
    <h1>{{ title }}</h1>
  </section>

  <section class="slide">
    <h2>{{ heading }}</h2>
    <p>{{ body }}</p>
  </section>

  <section class="slide">
    <!-- whatever you want -->
  </section>
</main>

<footer class="hud">
  <span class="counter"></span>
  <progress class="bar" value="0" max="1"></progress>
</footer>

<script type="module" src="./deck.js"></script>
</body>
</html>
```

## Minimum-viable navigation (`deck.js`)

Keyboard, swipe, click, deep-link via hash. Don't reinvent this — copy:

```js
const slides = [...document.querySelectorAll('.slide')];
const deck = document.querySelector('.deck');
const counter = document.querySelector('.counter');
const bar = document.querySelector('.bar');

function go(i) {
  i = Math.max(0, Math.min(slides.length - 1, i));
  deck.dataset.current = i;
  slides.forEach((s, n) => s.classList.toggle('is-active', n === i));
  counter.textContent = `${i + 1} / ${slides.length}`;
  bar.value = (i + 1) / slides.length;
  history.replaceState(null, '', `#${i + 1}`);
}

addEventListener('keydown', e => {
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) go(+deck.dataset.current + 1);
  if (['ArrowLeft', 'PageUp'].includes(e.key))         go(+deck.dataset.current - 1);
  if (e.key === 'Home') go(0);
  if (e.key === 'End')  go(slides.length - 1);
});

addEventListener('click', e => {
  if (e.target.closest('a, button, input, [data-no-advance]')) return;
  go(+deck.dataset.current + (e.clientX > innerWidth / 2 ? 1 : -1));
});

const initial = parseInt(location.hash.slice(1), 10);
go(Number.isFinite(initial) ? initial - 1 : 0);
```

## Minimum-viable styles (`style.css`)

Slides are absolutely positioned and only the active one is visible. This pattern keeps transitions cheap and lets each slide compose freely.

```css
:root {
  --bg: #FCF6F5;
  --fg: #212121;
  --accent: #990011;
  --slide-w: 100vw;
  --slide-h: 100vh;
}

* { box-sizing: border-box; }
html, body { margin: 0; height: 100%; background: var(--bg); color: var(--fg);
  font-family: 'Inter', system-ui, sans-serif; }

.deck { position: relative; width: var(--slide-w); height: var(--slide-h); overflow: hidden; }

.slide {
  position: absolute; inset: 0;
  display: grid; place-content: center;
  padding: clamp(2rem, 6vw, 6rem);
  opacity: 0; pointer-events: none;
  transition: opacity 350ms ease;
}
.slide.is-active { opacity: 1; pointer-events: auto; }
.slide[data-bg="dark"] { background: #1E2761; color: #FCF6F5; }

.hud {
  position: fixed; inset: auto 1.25rem 1rem; display: flex; gap: 1rem; align-items: center;
  font: 500 0.85rem 'Inter', sans-serif; color: color-mix(in srgb, var(--fg) 60%, transparent);
}
.bar { flex: 1; height: 4px; appearance: none; }
.bar::-webkit-progress-bar { background: color-mix(in srgb, var(--fg) 10%, transparent); }
.bar::-webkit-progress-value { background: var(--accent); }
```

## Where custom decks earn their keep

These are things Reveal/Slidev struggle with — reach for a custom deck when at least one matters:

- **Choreographed motion** between slides (a shape that grows from a logo into the next slide's diagram)
- **Persistent background** (a WebGL scene, a video loop) that all slides sit on top of
- **Scroll-as-narrative** — instead of click-through, build a long-scroll story and make `Space` jump to anchors
- **Real product embedded** — your actual app running inside the deck, not a screenshot
- **Custom physics** for transitions (FLIP animations, shared-element morphs)

## Patterns worth stealing

**Per-slide accent color** — set as a CSS var on the section, let nested elements pick it up:

```html
<section class="slide" style="--accent: #F96167">…</section>
```

**Self-contained slide modules** — one file per slide, glob-imported at build time:

```js
import.meta.glob('./slides/*.html', { eager: true, as: 'raw' });
```

**Shared-element transitions** — give the source and destination elements the same `view-transition-name` and call `document.startViewTransition()` inside `go()`.

## Common mistakes (Custom-specific)

- **Don't reinvent slide math.** Use the navigation snippet above. Custom keyboard handling is where bugs hide.
- **Don't forget the deep-link hash.** When you screenshot for QA, the script needs to load each slide directly.
- **Don't autoplay audio.** Browsers block it without a user gesture and the deck looks broken.
- **Don't use `position: fixed` for slides.** It breaks PDF export and printing.
- **Don't load fonts from a slow CDN.** Self-host in `assets/fonts/` or use `font-display: swap` so the deck renders text immediately.

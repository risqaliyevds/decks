# Interactivity playbook

The reason we ship HTML and not pptx. Use these techniques where they add meaning — not as decoration. A flashy effect that distracts from the point is worse than a static slide.

## When to add interactivity

Ask: **"would the audience understand this faster if it moved or responded?"** If yes, add interaction. If you're adding it because it looks cool, cut it.

Good reasons:
- Showing how a system reacts to input → live demo beats a screenshot
- Walking through code transformations → animated diff or magic-move
- Comparing options → toggle button, not two side-by-side static screenshots
- Time-series data → animated chart, not a frozen snapshot
- Architecture diagrams → hover to highlight a path
- "How did we get here" stories → scroll-revealed timeline

Bad reasons:
- "Slides feel empty" → add density via design (icons, layout), not animation
- "I want to show off" → save it for the actual product demo
- Continuous looping motion behind text → it competes for attention and slows readers

## Patterns

### Live runnable code

**CodeSandbox / StackBlitz embeds** — full IDE inside the slide:

```html
<iframe src="https://stackblitz.com/edit/your-id?embed=1&view=preview&hideExplorer=1"
        style="width:100%; height:70vh; border:0; border-radius:0.5rem"></iframe>
```

**Monaco editor** (Slidev built-in) — see [slidev.md](slidev.md).

**Run-in-browser snippets** — inline `<script type="module">` with a textarea + button to re-execute. Good for math/algorithm demos.

### Scroll-triggered reveals (custom decks)

Use `IntersectionObserver` — never `scroll` event listeners (jank).

```js
const io = new IntersectionObserver(entries => {
  for (const e of entries) e.target.classList.toggle('in-view', e.isIntersecting);
}, { threshold: 0.5 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
```

```css
[data-reveal] { opacity: 0; transform: translateY(2rem); transition: 600ms; }
[data-reveal].in-view { opacity: 1; transform: none; }
```

### Background video / loops

Mute, autoplay, loop, `playsinline`. Lazy-load if it's not the first slide.

```html
<video autoplay muted loop playsinline class="bg-video">
  <source src="./assets/loop.mp4" type="video/mp4">
</video>
```

```css
.bg-video { position: absolute; inset: 0; width: 100%; height: 100%;
  object-fit: cover; z-index: -1; }
```

### Inline charts with real data

[Chart.js](https://www.chartjs.org/) for standard charts, [D3](https://d3js.org/) for custom, [Observable Plot](https://observablehq.com/plot/) for quick declarative charts. Load via CDN.

```html
<canvas id="growth"></canvas>
<script type="module">
  import Chart from 'https://cdn.jsdelivr.net/npm/chart.js@4/+esm';
  new Chart(document.getElementById('growth'), {
    type: 'line',
    data: { labels: ['Q1','Q2','Q3','Q4'], datasets: [{ data: [12,19,28,47] }] },
    options: { animation: { duration: 1500 } },
  });
</script>
```

### Hover/click on diagrams

Build the diagram as inline SVG so each part is a real DOM node. Then it's just CSS:

```css
.node { transition: 200ms; }
.node:hover { fill: var(--accent); transform: scale(1.05); transform-origin: center; }
.path { stroke-dasharray: 600; stroke-dashoffset: 600; transition: 1s; }
.path.active { stroke-dashoffset: 0; }
```

### Real product demos in iframes

Embed staging URLs of your own app — way more compelling than a screencast. Use `sandbox` attribute to be safe with third-party sources:

```html
<iframe src="https://staging.myapp.com/demo" sandbox="allow-scripts allow-same-origin"
        style="width:100%; aspect-ratio:16/9; border:0"></iframe>
```

### Shared-element transitions

For Chrome/Edge — works in custom decks, gives shared-element morphs between slides:

```css
.logo { view-transition-name: logo; }
```

```js
function go(i) {
  if (!document.startViewTransition) return _go(i);
  document.startViewTransition(() => _go(i));
}
```

### Web Animations API (custom timing)

Cleaner than CSS keyframes for one-off choreography:

```js
slide.querySelector('.headline').animate(
  [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }],
  { duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' }
);
```

## Performance budget

- **First slide ≤ 1s to interactive.** If your title slide stalls on web fonts or heavy JS, you've lost the room.
- **Lazy-load offscreen video, iframes, big SVGs** — use `loading="lazy"` on `<img>` and `<iframe>`.
- **Preload only what slide 1 needs.** Reveal/Slidev preload all slides; in custom decks, defer assets until the slide before they're needed.
- **No autoplay audio.** Browsers block it; the deck looks broken.
- **Test on the actual projector.** What renders smoothly on a Mac dev machine can chug on an event laptop.

## Accessibility (still applies even though it's a deck)

- Captions/transcripts for any video that has spoken content
- Keyboard navigation works (Reveal/Slidev give this; custom decks need the snippet in [custom.md](custom.md))
- `alt` text on `<img>` and `aria-label` on SVG diagrams
- Don't rely on color alone (e.g. red/green diff) — also use icons or text

## Anti-patterns

- **Scroll-jacking the whole deck** when the audience just wants to use ←/→. Pick one mode and stick with it.
- **Auto-advancing slides** unless the deck is unattended (lobby loop). Speakers need control.
- **Animations longer than 800ms.** Audience attention drops; you'll click ahead before the animation finishes.
- **"Wow" intros that play once.** If you might re-show a slide, the second time will feel slow and broken.
- **Spinning, parallax, or particle backgrounds** during slides with reading. Reading + motion = nothing read.

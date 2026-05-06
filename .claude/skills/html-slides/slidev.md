# Slidev workflow

Use Slidev for code-heavy talks: live coding demos, line-by-line walkthroughs, dev meetups, framework deep-dives. Markdown-first, hot reload, Shiki syntax highlighting, Monaco editor for live edits during the talk.

## Starter file

`decks/<deck>/slides.md`:

```markdown
---
theme: default
title: {{ deck title }}
info: |
  {{ one-line description for sharing }}
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: fade-out
mdc: true
colorSchema: dark
---

# {{ title }}
## {{ subtitle }}

<div class="abs-br m-6 text-sm opacity-60">
  {{ speaker }} · {{ event }} · {{ date }}
</div>

---

# Section heading

- First point
- Second point  <!-- v-click reveals on click: see below -->

<v-click>

Revealed after first click.

</v-click>

---
layout: two-cols
---

# Left column

Text on the left.

::right::

```ts {1|3-5|all}
const x = 1;

function greet() {
  return 'hi';
}
```
```

Each `---` on its own line is a slide break. Frontmatter on a slide overrides the deck-level setup.

## Run it

```powershell
# Dev server (hot reload, opens browser)
npx slidev .\decks\<deck>\slides.md

# Build static site (good for hosting)
npx slidev build .\decks\<deck>\slides.md --base /<deck>/

# Export to PDF
npx slidev export .\decks\<deck>\slides.md
```

## Code-talk patterns (Slidev's superpower)

**Line-by-line reveal** — the `{1|3-5|all}` after the language tells Shiki which lines to highlight on each click.

````markdown
```ts {1|3-5|all}
const config = loadConfig();

if (!config.valid) {
  throw new Error('bad config');
}
```
````

**Diff highlighting** — show before/after in one block.

````markdown
```ts {*|2-4|*}{lines:true}
function add(a, b) {
-   return a - b;
+   return a + b;
}
```
````

**Monaco editor** — live-editable code right in the slide.

````markdown
```ts {monaco-run}
function fib(n) {
  return n < 2 ? n : fib(n-1) + fib(n-2);
}
console.log(fib(10));
```
````

**Magic-move** between code states (Slidev's killer feature for refactoring talks):

````markdown
````md magic-move
```ts
const x = compute();
return x;
```
```ts
return compute();
```
````
````

## Layouts (frontmatter `layout:`)

| Layout | When |
|---|---|
| `cover` | Title slide |
| `intro` | "About me / about the talk" |
| `two-cols` | Side-by-side text + code |
| `image-right` / `image-left` | Half-bleed image |
| `center` | One big idea, centered |
| `quote` | Pull quote |
| `statement` | Single bold sentence |
| `end` | Closing slide |

## Custom components

Drop a `.vue` file in `decks/<deck>/components/`, then use it in markdown like `<MyChart :data="..." />`. Use this when the slide needs interactivity Markdown can't express (live data, animations, embeds).

## Theme overrides

Slidev uses UnoCSS — write Tailwind-like classes inline:

```markdown
<div class="text-amber-400 font-bold text-6xl tracking-tight">
  150ms
</div>
```

For deck-wide CSS, add `style.css` next to `slides.md` and import it in `slides.md` frontmatter via `---\nstyle: ./style.css\n---`.

## Common mistakes (Slidev-specific)

- **Don't ship the default theme.** Override colors, fonts, and at least the cover layout. The Slidev default is recognizable.
- **Don't use Monaco for code that doesn't need to change.** Static Shiki is faster and looks cleaner; Monaco is for "I'm going to edit this live."
- **Don't forget `<v-click>` wrappers** for progressive reveal — without them, every bullet appears at once.
- **Don't put images in `slides.md` as base64.** Put them in `assets/` and reference with `![](./assets/x.png)`.
- **Don't forget the export flag for fonts.** `npx slidev export --with-clicks` if you want each click state as a separate PDF page.

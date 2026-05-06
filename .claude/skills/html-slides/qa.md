# QA loop

**Assume there are problems. Your job is to find them.**

The first render is almost never correct. Approach QA as a bug hunt, not a confirmation step. If you found zero issues on first inspection, you weren't looking hard enough.

This is the only path to "done." No deck ships without at least one fix-and-verify cycle.

---

## 1. Content sanity

Read every slide's text yourself first. Look for:

- Placeholder text (`{{ ... }}`, `lorem`, `TODO`, `xxxx`)
- Wrong order, missing slides
- Typos in names, numbers, dates
- Outdated stats or stale links

```powershell
# Quick scan for common placeholder leftovers
Select-String -Path .\decks\<deck>\*.html, .\decks\<deck>\*.md `
              -Pattern 'lorem|ipsum|TODO|FIXME|\{\{|xxxx' -CaseSensitive:$false
```

Fix any matches before screenshotting.

---

## 2. Screenshot every slide

```powershell
node .\.claude\skills\html-slides\scripts\screenshot.mjs decks\<deck>
```

This produces `decks/<deck>/screenshots/slide-01.png`, `slide-02.png`, etc. at 1920×1080.

To re-render specific slides after a fix:

```powershell
node .\.claude\skills\html-slides\scripts\screenshot.mjs decks\<deck> --only 3,7,12
```

The script auto-detects framework:
- `slides.md` → spawns `npx slidev` and screenshots each slide
- `index.html` → opens directly, navigates by hash (`#1`, `#2`, …) for custom or by Reveal's hash for Reveal.js

---

## 3. Visual review (use the slide-reviewer subagent)

**You've been staring at the code and will see what you expect, not what's there.** A subagent has fresh eyes.

Invoke the `slide-reviewer` subagent with the screenshot directory. It will return a per-slide list of issues.

Don't skip this for "small" decks. The bugs you miss are exactly the bugs the audience will see first.

---

## 4. Fix → re-screenshot affected slides → re-review

One fix often creates another problem (text reflow, overlap shifts). After every fix:

1. Re-screenshot just the affected slides (`--only`)
2. Re-invoke the reviewer on the new images
3. Repeat until a full pass surfaces nothing new

---

## 5. Final cross-check

Before declaring done:

- [ ] Open the deck in a real browser (not just screenshots) and arrow-key through it. Verify navigation, fragments, animations.
- [ ] Resize the window — does it hold up at 1280×720 (laptop) and 1920×1080 (projector)?
- [ ] Tab through interactive elements. Anything broken?
- [ ] Test the export path you'll actually use (PDF, hosted URL).
- [ ] Print-preview if PDF export is part of the workflow.

---

## What the reviewer is looking for

If you're doing the review yourself (don't — use the subagent — but if you must):

- Overlapping elements (text behind shapes, lines through words)
- Text overflow at the edge of the viewport or inside containers
- Decorative lines positioned for one-line titles when the title wrapped
- Footers / page numbers colliding with content above
- Inconsistent gaps (cramped here, vast empty there)
- Insufficient margin from slide edges
- Columns/rows not aligned across sibling slides
- Low-contrast text (light gray on cream, dark on dark)
- Low-contrast icons (no contrasting background circle)
- Text boxes too narrow → excessive wrapping
- Leftover placeholder content
- Different fonts/weights between sibling slides (suggests partial styling)
- Visual style drift (slide 5 looks like a different deck than slide 4)

For each slide: list issues even if minor. **No issue is too small to flag.**

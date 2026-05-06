# cb_decks — Central Bank seminar series

This folder holds all decks for a 2-day, 15-module seminar on AI in banking, delivered to Central Bank of Uzbekistan staff. Each module gets its own deck under `N_deck/`.

Project-wide rules in `C:\projects\slides\CLAUDE.md` still apply — this file only adds context specific to this seminar.

## Audience & voice

- **Audience:** Central Bank of Uzbekistan staff. Non-technical (operations, compliance, management). NOT developers, NOT data scientists.
- **Language:** Uzbek (primary). Avoid translated marketing speak ("amaliy yechimlar", "qayta tasavvur qilish") — concrete, conversational Uzbek with relatable analogies before any abstract concept.
- **Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
- **Brand on slides:** crea7iveai
- **Tone:** business/workflow framing — time saved, fewer errors, faster customer responses, compliance-aware. Never lead with model names or ML terminology.

## Schedule (15 modules across 2 days, 60 min each)

### Day 1 — 9:00–18:15 (8 modules)
| # | Folder | Module title (Uzbek) | Format |
|---|---|---|---|
| 1 | `1_deck/` | Bank sektori uchun sun'iy intellekt asoslari | Ma'ruza + muhokama |
| 2 | `2_deck/` | Bank jarayonlarida SI qo'llash imkoniyatlarini aniqlash | Guruhli tahlil |
| 3 | `3_deck/` | Sun'iy intellekt xavflari, komplaens va boshqaruv | Interaktiv muhokama |
| 4 | `4_deck/` | Sun'iy intellekt uchun jarayonlarni strukturalashtirish | Amaliy mashq |
| 5 | `5_deck/` | Promt muhandisligi — professional daraja | Namoyish + mashq |
| 6 | `6_deck/` | Bank uchun tayyor promt kutubxonasi | — |
| 7 | `7_deck/` | SI platformalar bilan ishlash (ChatGPT, Claude) | — |
| 8 | `8_deck/` | No-code avtomatlashtirish (Zapier, n8n, Make) | — |

### Day 2 — 9:00–17:45 (7 modules)
| # | Folder | Module title (Uzbek) | Format |
|---|---|---|---|
| 9 | `9_deck/` | Oddiy sun'iy intellekt ish tizimini yaratish | Bosqichli qurish |
| 10 | `10_deck/` | Sun'iy intellekt agentlari tushunchasi | Ma'ruza + muhokama |
| 11 | `11_deck/` | Bank uchun sun'iy intellekt agenti dizayni | Dizayn seminar |
| 12 | `12_deck/` | Murakkab sun'iy intellekt jarayonlari | Namoyish + tahlil |
| 13 | `13_deck/` | Bank amaliyotidagi real keyslar | Keys-stadi |
| 14 | `14_deck/` | Sun'iy intellekt yechimini ishlab chiqish | Guruhli loyiha |
| 15 | `15_deck/` | Taqdimot va yakuniy qism | Taqdimot |

Day 2 closes with a certificate ceremony (17:15–17:45) — accommodate in deck 15.

## Per-deck convention

Each `N_deck/` folder follows the standard html-slides layout:

```
N_deck/
  notes.md         outline first (one bullet = one slide), speaker cues
  index.html       (Reveal.js or Custom) or slides.md (Slidev)
  style.css        if Custom HTML
  assets/          images, fonts, video
  screenshots/     QA output (gitignored)
```

Pick one framework per deck (don't mix). The seminar style favors **Custom HTML** for showcase modules (1, 13, 15) and **Reveal.js** for content-dense lecture modules — but make the call per deck against the framework decision table in `.claude/skills/html-slides/SKILL.md`.

## Series-level design consistency

Every deck in this series should share the **same palette, type pairing, and motif** so the 15 decks read as one course, not 15 unrelated talks. Lock these in once (in a sibling `design.md` here, or copy from the `bank-demo` deck if reusing) and don't drift.

Reference images for the syllabus live in `images/` (the official schedule sheets). Don't delete — they're the source of truth for module titles and timing.

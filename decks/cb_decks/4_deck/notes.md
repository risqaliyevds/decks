# 4-deck — Sun'iy intellekt uchun jarayonlarni strukturalashtirish

**Module:** 4-modul · Kun 1 · 14:00–15:00 (60 daqiqa)
**Format:** Amaliy mashq (practical exercise)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`)
**Slaydlar soni:** 13 ta · 4 ta faza
**Atamalar (≥2/modul talab):** Workflow (jarayon zanjiri), Task Decomposition — slide 5 da kiritiladi, slide 12 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "Sun'iy intellekt uchun jarayonlarni strukturalashtirish"
2. **Agenda** — 4 faza (Nima uchun · Workflow · Vazifani bo'lish · Amaliy mashq)
3. **Hook** — Tartibsiz ish ↔ Strukturalangan zanjir (`.compare`)
4. **Nima uchun strukturalash** — 3 sabab: Tezroq · Aniqroq · Qayta ishlatiladigan (`.benefits` + proof)
5. **YANGI: Lug'at** — Workflow + Task Decomposition (`.dict`, 2 cards wider)
6. **Workflow anatomiyasi** — 5-step `.flow` (Kirish → Tekshiruv → Tahlil → Xulosa → Yetkazish), AI 3-qadamga branded
7. **YANGI MOTIF: Task Decomposition fan** — 1 katta vazifa → 3 ta sub-task
8. **Showcase: Kredit arizasi end-to-end** — 5-step `.flow`, 2 ta qadam AI badge bilan
9. **Hand-off** — `.cando` AI qiladi (5) / Inson qiladi (5)
10. **Amaliy mashq** — `.s-brain` 3 ta savol, 12 daq stollarda
11. **Tez-tez uchraydigan xato** — 2-juftli `.myth` ("Bir promtda hammasi" / "Aniq vazifa, aniq qadam")
12. **Closing** — 3 xulosa + lug'at recap (Workflow/Task Decomposition jamoa bilan)
13. **Q&A** — ochiq savol-javob, murod@mohir.dev

## Asosiy g'oya

Bu modul — kursning birinchi qo'l bilan ishlanadigan moduli. Maqsad: har bir ishtirokchi o'z bo'limidagi takrorlanuvchi ishini **5–7 qadamli zanjirga** ajratib, AI hand-off nuqtalarini belgilab ketsin. Keyingi modul (5 — promt muhandisligi) shu zanjirning AI qadamlarini promtga aylantiradi.

Asosiy xabar: **strukturalanmagan jarayonni AI tuzatmaydi.** Avval qadam, keyin AI.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Nima uchun (Hook + Why) | 3–4 | ~10 daq |
| 02 · Workflow (Lug'at + Anatomy) | 5–6 | ~12 daq |
| 03 · Vazifani bo'lish (Fan + Bank example + Hand-off) | 7–9 | ~13 daq |
| 04 · Amaliy mashq + Xato + Closing + Q&A | 10–13 | ~22 daq |
| **Jami** | **13** | **~60 daq** |

> Slayd 10 (live exercise) — 12 daqiqa kirib oladi. Bu modulda eng qimmatli vaqt — stollarda qog'oz va qalam bilan. Speakerlik vaqtini qisqartiring, ish vaqtini uzaytiring.

## Design lock-in (series)

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa)
- **Yangi motif (faqat shu deck'ga):** **1 → 3 fan diagram** — slayd 7da. CSS oxirida `<style>` ichida qo'shilgan, locked tokenlarga tegmaydi.
- **Showcase:** slayd 8 (tijorat banki hisoboti flow) — bu deck'ning "bosh slaydi". Auditoriya nimanidir tashlab ketsa, shuni tashlab ketsin.

## Tayyorgarlik (deck'dan tashqari)

- A4 plakat bo'sh blanka har stolda — slide 10 mashqi uchun (5–7 qadam katakchasi + AI/Inson belgisi).
- Qalin marker har stolda.
- Speakerlik joyidan stollar orasiga aylanish — slayd 10 davomida zaldagi stollarning kamida yarmiga bosh suqib ko'rish.
- Slayd 8 (tijorat banki hisoboti) — Markaziy Bank auditoriyasiga eng yaqin misol; agar zalda HR yoki marketing xodimi bo'lsa, ularning bo'limidan misol so'rab, kerak bo'lsa fly chartda chizib bering.
- Vazirlik logotiplari `_shared/` da turibdi.
- QA: orchestrator `screenshot.mjs` + `slide-reviewer` ni butun deck to'plami yig'ilgandan keyin yuritadi — bu deck o'zi yuritmaydi.

## Series-wide bog'lanish

- **Avvalgi modul:** [`3_deck/`](../3_deck/) — Xavflar, muvofiqlik, boshqaruv
- **Keyingi modul:** [`5_deck/`](../5_deck/) — Promt muhandisligi (shu workflow'larning AI qadamlari promtga aylanadi)
- **Atama qaytishi:** Workflow → 8-modul (no-code), 9-modul (RAG), 12-modul (pipeline). Task Decomposition → 5-modul (CoT), 10–11-modul (agentlar).

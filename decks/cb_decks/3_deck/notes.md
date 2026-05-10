# 3-deck — Sun'iy intellekt xavflari, muvofiqlik va boshqaruv

**Module:** 3-modul · Kun 1 · 11:45–12:45 (60 daqiqa)
**Format:** Interaktiv muhokama
**Audience:** Markaziy Bank xodimlari (muvofiqlik, ichki audit, operatsiya)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`) · Style A · Bold Signal
**Slaydlar soni:** 14 ta · 4 ta faza
**Atamalar (≥2/modul talab):** **Hallucination** (gallyutsinatsiya), **Data Masking** — slide 5 da kiritiladi, slide 13 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "SI xavflari va muvofiqlik — bankda"
2. **Agenda** — 4 faza (Xavflar xaritasi · Gallyutsinatsiya · Ma'lumot himoyasi · Boshqaruv)
3. **Hook** — Live hallucination demo: AI MB qoidasini "ishonch bilan" o'ylab topadi
4. **Risk taxonomy** — 4 ta xavf (Ma'lumot oqishi · Gallyutsinatsiya · Bias · Regulator buzilishi)
5. **YANGI: Lug'at** — Hallucination + Data Masking (bankir tilida)
6. **Hallucination anatomy** — Internet bilimi vs RAG bilan cheklangan (compare)
7. **Data Masking deep-dive** — to'liq PII → maskalangan tokenlar (before/after)
8. **Compliance qatlamlari** — MB qoidalari · Ichki bank siyosati · Xalqaro standartlar
9. **Yopiq kontur arxitekturasi** — User → Masking gateway → AI → Audit log
10. **Governance** — RACI-lite 4 rol (Egasi · Tasdiqlovchi · Ishlovchi · Auditor)
11. **Risk-rating mashq** — 3 senariy, zal L/M/H ovoz beradi (interaktiv)
12. **Common pitfalls** — 3 ta afsona vs haqiqat (RAGsiz, PIIsiz, Auditsiz)
13. **Closing** — 3 xulosa + lug'at recap (Hallucination, Data Masking)
14. **Q&A** — ochiq savol-javob, murod@mohir.dev

## Asosiy g'oya

Muvofiqlik — bu AI joriy etishning "qizil chizig'i" emas, **xavfsiz koridori**. To'g'ri arxitektura (RAG + masking gateway + audit log) bilan har qanday xavfni boshqarsa bo'ladi. 3 ta texnik vosita (RAG, Data Masking, Audit log) — muvofiqlik uchun 3 ta poydevor.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~4 daq |
| 01 · Xavflar xaritasi | 3–4 | ~10 daq |
| 02 · Gallyutsinatsiya (lug'at + RAG yechim) | 5–6 | ~10 daq |
| 03 · Ma'lumot himoyasi (Masking + Compliance + Yopiq kontur) | 7–9 | ~16 daq |
| 04 · Boshqaruv (Governance + Mashq + Pitfalls) | 10–12 | ~13 daq |
| Closing + Q&A | 13–14 | ~7 daq |

## Atama eslatmasi

| # | Atama | Bankir tilida | Slaydda |
|---|---|---|---|
| 1 | **Hallucination** (gallyutsinatsiya) | AI ishonch bilan o'ylab topgan, lekin haqiqatda mavjud bo'lmagan javob | Slide 3 (demo) · 5 (lug'at) · 6 (yechim) · 13 (recap) |
| 2 | **Data Masking** | PII (ism, karta raqami) AI'ga uzatishdan oldin avtomatik o'chirib yuborilishi | Slide 5 (lug'at) · 7 (deep-dive) · 9 (arxitektura) · 13 (recap) |

## Design lock-in

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa)
- **Motif:** subtle grid background, blue-gradient highlights, blur-on-transition
- **Series consistency:** 1-deck bilan bir xil palette + type pairing
- **Yangi CSS:** 4-card grid (`.sec.sec-4`) — risk taxonomy va governance uchun (locked tokenlarga tegmaydi)

## Tayyorgarlik (deck'dan tashqari)

- Live hallucination demo tayyor — slide 3 (bot prompt + screenshot fallback)
- "Bu qoida mavjud emas" reveal — fragment animation
- Risk-rating mashq uchun 3 ta senariy yodda (slide 11)
- Vazirlik logotiplari `_shared/` da turibdi
- QA: orchestrator screenshot.mjs + slide-reviewer

## Series bog'lanish

- **Avvalgi modul:** [`2_deck/`](../2_deck/) — Use case discovery (xavflar shu yerdan kelib chiqadi)
- **Keyingi modul:** [`4_deck/`](../4_deck/) — Process structuring (workflow + task decomposition)
- **Bog'liq:** 1-modul slide 11 (Security teaser — "qizil chiziq") — bu modulda chuqur
- **Bog'liq:** 9-modul (RAG amaliyoti) — bu modulda nazariy yechim sifatida ko'riladi

# 11-deck — Bank uchun sun'iy intellekt agenti dizayni (voice memo)

**Module:** 11-modul · Kun 2 · 14:00–15:00 (60 daqiqa)
**Format:** Dizayn seminar (design workshop)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`)
**Stack:** Telegram + Gemini audio + n8n + Google Sheets/Drive
**Paired bot:** [`bots/02_voice_memo/`](../bots/02_voice_memo/) — voice memo → CRM
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talab):** **Speech-to-Text (STT)**, **Function Calling / Schema** — slide 5 da kiritiladi, slide 17 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "Bank uchun AI agenti dizayni" + Kun 2 chip
2. **Agenda** — 4 faza (Voice bot · STT · Schema · Birga loyihalash)
3. **Hook** — Jonli voice memo demo: bankir 15 sek gapiradi → CRM rowi paydo bo'ladi
4. **Voice memo muammosi** — Avval (15 daq qog'oz) vs Hozir (15 sek ovoz) compare
5. **Lug'at** — STT + Function Calling/Schema (`.dict.dict-2`)
6. **STT modellari** — Whisper / Gemini Flash / ElevenLabs (`.sec` 3-card)
7. **Voice bot arxitekturasi** — Telegram → STT → ekstrakt → schema → CRM (`.flow` 5-step)
8. **Schema dizayn** — JSON shabloni (`.template-box`)
9. **Schema 4 qoidasi** — Nom · Tip · Required · Misol (`.road.road-4`)
10. **Banking misoli** — Kredit uchrashuv 8-maydonli schema, real Uzbek audio
11. **Schema validatsiya** — Schema'siz vs Schema bilan (`.compare`)
12. **STT xato turlari** — To'g'ri ishlaydi vs Xato qiladi (`.cando`)
13. **Privacy** — Ovoz qayerda, qancha vaqt, kim eshitadi (`.sec` 3-card)
14. **Tayyor template** — `bots/02_voice_memo` ko'rsatish (`.s-hook` style schematic)
15. **Dizayn mashqi** — 3 ta savol stol uchun (`.s-brain`)
16. **Schema canvas** — 4 katakli worksheet (`.canvas-grid`)
17. **Closing** — 3 xulosa + lug'at recap (STT / Schema)
18. **Q&A** — murod@mohir.dev

## Asosiy g'oya

Bankir uchrashuvdan qaytayotgan paytda 15 soniyalik ovoz qoldiradi — bot uni transkript qiladi, mantiqni ajratadi va CRM'ga aniq formatda yozadi. Bugun **dizayn fazasi**: pipelinening har bo'g'inini auditoriya bilan birga loyihalaymiz, schema'ni o'z bo'limiga moslab to'ldiramiz. Kod yozilmaydi — diagramma, JSON shabloni, kanavasi.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Voice bot · "nega kerak" | 3–4 | ~9 daq |
| 02 · STT · "qanday eshitadi" | 5–6 | ~10 daq |
| 03 · Schema · "qanday yozadi" | 7–11 | ~17 daq |
| 04 · Sifat va privacy | 12–13 | ~6 daq |
| 05 · Birga loyihalash | 14–18 | ~15 daq |

## Atama lug'ati (slide 5 da kiritiladi)

| Atama | Bankir tilida | Misol |
|---|---|---|
| **Speech-to-Text (STT)** | Ovozni matnga aylantirish | Telegramdagi 15 sekund ovoz → 2 jumla yozuv |
| **Function Calling / Schema** | AI'ga aniq formatdagi JSON yozishga majburlash | "customer_name", "decision", "follow_up" maydonlari |

Closing slide (17) — jamoa bilan birga: "STT — bu nima edi? Schema — bu nima edi?"

## Yangi qo'shilgan minimal CSS

`<style>` blokining oxiriga (locked tokenlarga tegmasdan):

- `.dict.dict-2` — 2-card variant
- `.road.road-4` — 4-step roadmap
- `.benefits-4` — 4-card benefits
- `.sec.sec-4` — 4-card sec
- `.canvas-grid` + `.canvas-cell` — worksheet 2x2
- `.template-box` (+ `.tpl-wrap`, `.tpl-meta`, `.ph`, `.role`, `.label`, `.com`) — JSON snippet
- `.cando` — to'g'ri/xato 2-column

Hech bir `:root` token o'zgartirilmadi.

## Design lock-in

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa)
- **Motif:** subtle grid background, blue-gradient highlights, blur-on-transition
- **Series consistency:** 1–10 deck bilan bir xil tokenlar
- **r3 / r4 qoidasi:** Screenshot bug oldini olish uchun har slaydda main content `r2` yoki `r3` da; r4 faqat tail accent (footer eslatma) uchun.

## Tayyorgarlik (deck'dan tashqari)

- Telegram voice memo demo bot ishlab turibdi (n8n + Gemini audio + Sheets) — slide 3
- Demo voice memo tayyor: Aliyev Vali · avtokredit 200 mln · 12 oy · garov kvartira
- Backup: agar audio ishlamasa, transkriptni ekrandan o'qib bering
- Stol uchun bo'sh canvas worksheet (4 katakli A4) — slide 16
- `bots/02_voice_memo/design/data-schema.md` slide 10 uchun yodda
- Vazirlik logotiplari `_shared/` da turibdi

## Series-wide bog'lanish

- **Avvalgi modul:** [`10_deck/`](../10_deck/) — Agentlar tushunchasi (Tool Use)
- **Keyingi modul:** [`12_deck/`](../12_deck/) — Murakkab pipeline'lar (shu bot debugging)
- **Muvofiqlik chuqur:** [`3_deck/`](../3_deck/) — slide 13 (privacy) shu erga ishora qiladi
- **RAG bilan farqi:** [`9_deck/`](../9_deck/) — RAG matn ustida, voice bot ovoz ustida

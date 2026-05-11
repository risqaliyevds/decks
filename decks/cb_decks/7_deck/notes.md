# 7-deck — SI platformalar bilan ishlash (ChatGPT, Claude, Gemini)

**Module:** 7-modul · Kun 1 · 17:45–18:45 (60 daqiqa)
**Format:** Platforma taqqoslash + jonli demo
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`)
**Stack davom:** Gemini + RAG + n8n (kursning asosiy yo'nalishi)
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Token** · **Context Window** — slide 5 da kiritiladi, slide 17 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "SI platformalar bilan ishlash" · Kun 1 · 17:45–18:45
2. **Agenda** — 4 faza (Platformalar · Atamalar · Imkoniyat farqi · Live mashq)
3. **Hook** — Bir savol, 3 ta platforma · 3 ustunli compare-rich
4. **Bozor xaritasi** — 5 ta katta o'yinchi (ChatGPT, Claude, Gemini, Perplexity, Yandex GPT)
5. **YANGI Lug'at** — **Token** + **Context Window** (.dict.dict-2)
6. **Token vs so'z misoli** — 1 so'z ≈ 1.3 token, A4 ≈ 650 token (.compare)
7. **Context window taqqoslash** — GPT-5.5 · Claude Opus 4.7 · Gemini 3 Pro (uch frontier 1M ga teng) · O'rtacha shartnoma (bar chart)
8. **ChatGPT chuqurlashish** — kuchli tomon, qachon ishlatish (.sec 3-card)
9. **Claude chuqurlashish** — uzun matn, aniqlik (.sec 3-card)
10. **Gemini chuqurlashish** — Workspace, multimodal — kursning tanlovi (.sec 3-card)
11. **Bank uchun tanlash mezoni** — HA / YO'Q ro'yxat (.cando)
12. **Narx va litsenziya** — Free / Pro / Enterprise (.benefits 3-card)
13. **Web vs API** — chrome'da yozish vs n8n orqali avtomat (.compare)
14. **Xavfsizlik** — saqlanadimi · training · korporativ shartnoma (.sec 3-card)
15. **Eng ko'p uchraydigan 3 xato** — antipattern vs to'g'ri yondashuv (.myth)
16. **Live mashq** — 3 stol, 1 savol, 2 platforma, taqqoslash (.s-brain)
17. **Closing** — 3 xulosa + lug'at recap (Token / Context Window)
18. **Q&A** — ochiq savol-javob, murod@mohir.dev

## Asosiy g'oya

Bankir bitta platforma ishqibozi bo'lib qolmasligi kerak. Vazifaga qarab to'g'ri AI'ni tanlash — bu *muhandislik qarori*. Modulning oxiriga kelib har ishtirokchi: (a) 3 ta platformaning farqini bilishi, (b) o'z bo'limidagi muammo uchun qaysi modelni tanlashini tushunishi, (c) **Token** va **Context Window** atamalari orqali narx va imkoniyatlar haqida gaplasha olishi kerak.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Platformalar (Hook → Market → Deep-dive ×3) | 3–4, 8–10 | ~17 daq |
| 02 · Atamalar (Lug'at → Token misol → Context jadval) | 5–7 | ~10 daq |
| 03 · Imkoniyat farqi (Tanlash mezoni → Narx → Web/API → Xavfsizlik → Xato) | 11–15 | ~17 daq |
| 04 · Live mashq + yakun | 16–18 | ~13 daq |

## Design lock-in

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa) — locked
- **Yangi motiflar (this deck):**
  - **3-ustunli `compare-rich-3`** — slide 3 hook (3 platforma, bir savol)
  - **`bars`** — context window vertical bar chart (slide 7)
  - **`pricing` 3-card** — Free/Pro/Enterprise (slide 12)
- Reuse: `.dict.dict-2` (5_deck), `.sec` 3-card (1_deck), `.cando` (1_deck), `.compare` (1_deck), `.myth` (1_deck), `.s-brain` (1_deck), `.s-close .recap` (1_deck), `.benefits-5` reused for 5-platform market map
- **r3 / r4 qoidasi:** Screenshot bug oldini olish uchun har slaydda main content `r2`/`r3` da; r4 faqat tail accent (footer eslatma) uchun.

## Series-wide bog'lanish

- **Avvalgi modul:** [`6_deck/`](../6_deck/) — Promt kutubxonasi (System Prompt + Template Prompt)
- **Keyingi modul:** [`8_deck/`](../8_deck/) — No-code avtomatlashtirish (Zapier, n8n, Make)
- **Gemini chuqur:** [`9_deck/`](../9_deck/) — RAG bilan birinchi AI ish tizimi
- **Muvofiqlik chuqur:** [`3_deck/`](../3_deck/) — Yopiq kontur va ma'lumot saqlash

## Tayyorgarlik (deck'dan tashqari)

- 3 ta platformaga ulanish ekran ulashish bilan tayyor: ChatGPT (Plus), Claude (Pro), Gemini (Workspace) — slide 3 demo
- Slide 3 demo savol: bir xil bank PDF — har 3 platformaga yuboramiz, javoblarni yonma-yon
- Slide 16 mashq tayyorgarligi: 3 stolga "case kartochkasi" tarqatiladi (kredit · muvofiqlik · operatsion murojaat — hammasi PII'siz) + 5 mezonli scoring rubric
- 3 ta platforma narx-namunasi yangilangan (oxirgi 7 kun) — slide 12
- QA: orchestrator screenshot.mjs + slide-reviewer'ni ishlatadi

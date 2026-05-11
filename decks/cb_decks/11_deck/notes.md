# 11-deck — Bank uchun sun'iy intellekt agenti dizayni (RAG chatbot showcase)

**Module:** 11-modul · Kun 2 · 11:00–12:00 (60 daqiqa)
**Format:** Showcase + dizayn seminar (instructor demos · students DESIGN, do not build)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`)
**Stack:** Telegram + Gemini + Google Sheets + Drive + In-Memory Vector Store
**Paired bot:** [`bots/02_rag_chatbot/`](../bots/02_rag_chatbot/) — 77 node, 14 marshrut, production
**Live workflow:** `kLcPx1CZX9RwH1z8` · risqaliyevds.app.n8n.cloud
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talab):** **RAG**, **Embedding** — slide 5 da kiritiladi, slide 17 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "Bank uchun AI agenti dizayni · RAG chatbot" + Kun 2 chip
2. **Agenda** — 4 faza (RAG nima · arxitektura · Production bot · Sizning RAG)
3. **Hook** — Live RAG bot demo: t.me/bankragbot QR + chat preview ("Avtokredit foizi qancha?" → manba bilan javob)
4. **Pure LLM muammosi** — uydirma vs manba (compare-rich 2-col)
5. **Lug'at** — RAG + Embedding (`.dict.dict-2`)
6. **RAG arxitekturasi** — 4 bosqich (Indexing → Chunking → Embedding → Retrieval+Generation)
7. **Production RAG bot** — 77 node · 14 marshrut · 2 eshik · Top-K=5 (stat-grid)
8. **Bank PDF qo'llanma** — Drive folder + Sheets indeks (4 tab)
9. **Chunk size + overlap** — 800 / 120, visualisation + 3 spec rows
10. **Banking misol** — "Avtokredit foizi qancha?" → kredit_siyosati.pdf 4.2-band
11. **Manba tekshiruvi** — har javob audit izi (4 audit row: systemPrompt, a-source, UsageLog, Documents)
12. **RAG qachon yaxshi/yomon** — `.cando` 2-col
13. **Privacy** — bank PDF qayerda + korporativ shartnoma + audit log (3 sec)
14. **Tayyor template** — `bots/02_rag_chatbot/` folder pointer + live workflow ID
15. **Dizayn mashqi** — 3 ta savol (3 ta hujjat · foydalanuvchi + savol · "topilmadi" qachon)
16. **RAG pilot canvas** — 5 qator (use case · manba · test · xavf · qaror)
17. **Closing** — 3 xulosa + lug'at recap (RAG / Embedding)
18. **Q&A** — murod@mohir.dev

## Asosiy g'oya

Showcase modul. 9-modulda klassifikator (7 node) qurildi; 11-modul — uning chuqur, manba bilan ishlaydigan versiyasi (77 node, 14 marshrut). Studentslar **qurmaydi** — instructor demosini kuzatadi, RAG'ning architectural daraja tushuniladi, va pilot canvas bilan chiqadi. Tone: "eshitiladigan, ko'riladigan", "qo'l bilan qiladigan" emas.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · RAG nima · live demo + atamalar | 3–5 | ~10 daq |
| 02 · RAG arxitekturasi · 4 bosqich + chunking | 6, 9 | ~9 daq |
| 03 · Production bot · BankRAGBoti shape | 7, 8, 10–13 | ~22 daq |
| 04 · Sizning RAG · canvas mashqi | 14–17 | ~14 daq |
| Q&A | 18 | ~2 daq |

## Atama lug'ati (slide 5 da kiritiladi)

| Atama | Bankir tilida | Misol |
|---|---|---|
| **RAG** (Retrieval-Augmented Generation) | AI internetdan emas, faqat sizning bank PDF'idan o'qib javob beradi | "Avtokredit foizi qancha?" → kredit_siyosati.pdf 4.2-band |
| **Embedding** (vektor ko'rinishi) | Matnni raqamli vakilga aylantirish — yaqin ma'no yaqin topiladi | "avtokredit foizi" ≈ "mashina krediti stavkasi" (cos sim 0.94) |

Closing slide (17) — jamoa bilan birga: "RAG = avval manbani top, keyin javob yoz. Embedding = matnni ma'no bo'yicha qidirish."

## Cross-references

- Slide 3 hook QR — bir xil `t.me/bankragbot` 1-modul slide 5 + 9-modul slide 3 bilan
- Slide 4 (Pure LLM vs RAG) — 3-modul Hallucination atamasi
- Slide 7 — 9-modul klassifikator (7 node) bilan farqi: 11x katta
- Slide 11 — UsageLog auditi · 13-modul real production keysga ko'prik
- Slide 13 — 3-modul Data Masking + Vertex AI Workspace
- Slide 17 — 9-modul "graduation path" pattern

## Atamalar uniqueness

- **RAG va Embedding** — faqat 11-deck'da rasmiy ravishda dict-card va recap-term sifatida kiritiladi
- 1-deck slide 5 — `Demo botning ishlash printsipi sifatida` cross-reference (ta'rifsiz)
- Boshqa decklarda RAG faqat kontekst sifatida tilga olinadi (qayta ta'riflanmaydi)

## Yangi qo'shilgan minimal CSS

`<style>` blokining oxiriga (locked tokenlarga tegmasdan):

- `.qr-stack`, `.qr-url`, `.qr-box.has-img` — QR + URL stacked (1-modul slide 5 pattern)
- `.chat`, `.bubble.user`, `.bubble.ai` — chat bubble preview
- `.compare-rich` — 2-col Pure LLM vs RAG
- `.dict.dict-2` — 2-card dict
- `.flow` (4-step) — RAG architecture
- `.stat-grid`, `.stat-cell`, `.prod-strip` — production stats panel
- `.corpus` — Drive + Sheets layout
- `.chunk-vis`, `.chunk-doc`, `.chunk-spec` — chunking visualisation
- `.bank-ex`, `.bank-q`, `.bank-a` — banking Q&A example
- `.audit-list`, `.audit-row` — audit izi
- `.cando` — RAG good/bad
- `.sec` — privacy 3-card
- `.tpl-wrap`, `.template-box` — bot folder template
- `.pilot-canvas`, `.pilot-row` — RAG pilot canvas (5 rows)
- `.close-list`, `.recap` — closing + recap

Hech bir `:root` token o'zgartirilmadi.

## Design lock-in

- **Style:** Bold Signal — Archivo Black + Space Grotesk + letter-spacing 0.018em
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa)
- **Motif:** subtle grid background, blue-gradient highlights, blur-on-transition
- **Series consistency:** 1–10, 12+ deck bilan bir xil tokenlar (STANDARDS.md)
- **r3 / r4 qoidasi:** Screenshot bug oldini olish uchun har slaydda main content `r2` yoki `r3` da

## Tayyorgarlik (deck'dan tashqari)

- BankRAGBoti ishlab turibdi (Telegram + Gemini + Sheets + Drive + In-Memory vector store)
- Demo savol tayyor: "Avtokredit foizi qancha?" → kredit_siyosati.pdf · 4.2-band, manba bilan javob
- Backup: agar bot to'xtab qolsa, screen-recording (15 sek) yoki ekrandan transcript
- `bots/02_rag_chatbot/design/workflow-graph.md` ochiq tab — slide 7 va 14 uchun
- n8n cloud ochiq tab — workflow `kLcPx1CZX9RwH1z8` ko'rsatish uchun
- Vazirlik logotiplari `_shared/` da turibdi

## Series-wide bog'lanish

- **Avvalgi modul:** [`10_deck/`](../10_deck/) — Agentlar tushunchasi (Tool Use)
- **9-modul klassifikator bot:** [`9_deck/`](../9_deck/) — bugungi RAG bot uning chuqur versiyasi
- **Keyingi modul:** [`12_deck/`](../12_deck/) — Murakkab pipeline'lar (RAG bot multi-chain analysis uchun)
- **Muvofiqlik chuqur:** [`3_deck/`](../3_deck/) — slide 4 (Hallucination), slide 13 (privacy/Data Masking)
- **Promt engineering:** [`5_deck/`](../5_deck/) — system prompt, few-shot

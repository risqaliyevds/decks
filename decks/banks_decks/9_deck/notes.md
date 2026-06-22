# 9-deck — Oddiy sun'iy intellekt ish tizimini yaratish

**Module:** 9-modul · Kun 2 · 9:00–10:00 (60 daqiqa)
**Format:** Bosqichli qurish (step-by-step build)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`)
**Stack:** Telegram + Gemini + Google Sheets + n8n
**Slaydlar soni:** 19 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Classification (Tasniflash)**, **Schema (Sxema)** — slayd 5 da kiritiladi, slayd 18 da recap
**Paired bot:** [`bots/01_classifier_bot/`](../bots/01_classifier_bot/) — BankYordamchi · n8n workflow · 13 nodes (8 asosiy + /start greeting + 4 LLM sub-nodes) · no code
**To'liq kontent:** [`content.md`](./content.md)

## Asosiy g'oya

Kechagi RAG bot kuchli edi, lekin murakkab (77 node, 2 soat). Bugun har bir ishtirokchi o'z birinchi botini quradi (8 ta asosiy node + greeting branch + LLM sozlamalar — jami 13 ta node) — mijoz xatlarini avtomatik tasniflaydi va to'g'ri operatorga uzatadi. **Konsept → amaliyot ko'prigi: ~30–45 daqiqada darsda birga quriladigan bot.** Modul oxirida har stolda ishlaydigan Telegram bot bo'ladi: mijoz xat yozadi, AI tasniflaydi, Sheets'ga ariza saqlanadi, javob qaytadi.

## Outline (one bullet = one slide)

1. **Title** — "Oddiy SI ish tizimini yaratamiz"
2. **Agenda** — 4 faza (Tushuncha · Arxitektura · Live build · Yakun)
3. **Hook** — kechagi RAG (murakkab) → bugungi classifier (oddiy)
4. **Erkin javob vs strukturali JSON** — odamga vs tizimga
5. **Atama lug'ati** — Classification + Schema (`.dict.dict-2`)
6. **Schema misoli** — matn → JSON 3 ta misolda
7. **Classifier arxitekturasi** — n8n flowgraph (13 node · 8 asosiy + greeting + LLM sozlamalar)
8. **Bosqich 1 · Telegram trigger** — BotFather + updates + chiquvchi ma'lumot
9. **Bosqich 2 · LLM Chain · Gemini** — botning miyasi · sof JSON
10. **Bosqich 3 · Operator topish va javob qoralash** — Sheets read + Aggregate + LLM Dispatch+Reply
11. **Bosqich 4 · Saqlash + javob jo'natish** — Sheets Save + Telegram Send (LLM Dispatcher javob matnini ichida tuzgan)
12. **Google Sheets schema** — Operators (siz to'ldirasiz) + Applications (bot to'ldiradi)
13. **Bot xatni qanday qayta ishlaydi** — 4 qadam (s-journey)
14. **Sifat tekshiruvi** — classifier yaxshi / yomon (.cando)
15. **Live build · stol mashqi** — workflow ulang (8 asosiy + greeting branch + LLM sub-nodes), 5 operator, 3 test xat (s-brain)
16. **Tez-tez uchraydigan 4 xato** — JSON format, toifa nomi, operator yo'q, ustun nomi (.myth)
17. **Mini-recap** — bugun → bo'lim → 10/11-modul (agent + RAG)
18. **Closing** — 3 xulosa + lug'at recap (Classification, Schema)
19. **Q&A** — savol-javob, murod@mohir.dev

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Anatomiya | 3–7 | ~14 daq |
| 02 · Atamalar (lug'at + chuqurlashish) | 5–6 (overlap) | (ichida) |
| 03 · Bosqichli qurish | 8–13 | ~22 daq |
| 04 · Test va xulosa | 14–19 | ~21 daq |
| **Jami** | **19** | **~60 daq** |

## Atamalar (kursning 9-bo'limga to'g'ri keladi)

- **Classification (Tasniflash)** — kelgan xatni 5 toifadan biriga avtomatik ajratish. Bankir misol: "1000 ta mijoz xati keladi → bot har birini 5 turdan biriga (kredit / karta / depozit / shikoyat / info) yo'naltiradi".
- **Schema (Sxema)** — strukturali javob. AI ixtiyoriy matn yozmaydi — u faqat aniq maydonlarni to'ldiradi. Bankir misol: "category, subject, details, urgency — har xatda aynan shu 4 ta katak".

Closing slaydda recap row jamoa bilan birga aytamiz (cb_decks/CLAUDE.md series qoidasi).

## Series-wide bog'lanishlar

- **1-modul slide 8** — chatbot oqim ilk marta ko'rilgan. Bugun chuqur ochildi.
- **5-modul (Promt muhandisligi)** — bugungi system prompt shu modul asosida quriladi.
- **8-modul** — n8n + Webhook. Bugun shu node'lardan foydalanamiz.
- **10-modul (keyingi)** — Agent kontseptsiyasi. Classifier → Tool Use → Agent o'sish chizig'i.
- **11-modul** — RAG agent dizayni · paired bot 02_rag_chatbot. Hujjatdan aniq javob kerak bo'lganda.
- **12-modul** — Pipeline. Bugungi classifier multi-step pipeline'ga aylanadi.

## Speaker cues — har faza uchun

- **Hook (slide 3):** kechagi RAG demosini eslatib, "kuchli edi, lekin murakkab — bugun oddiyroq, ammo amaliy" deb pog'ona tushiring.
- **Atama (slide 5–6):** **Classification** va **Schema** — har birini 1 ta misol bilan, sodda tilda. JSON ko'rib qo'rqitmang, "aniq maydonlar to'ldiriladi" deb tushuntiring.
- **Arxitektura (slaydlar 7–13):** har bosqichda *yutuq metrika* ayting (qancha vaqt tejaydi, qanday xatoni oldini oladi). Slaydlar texnik, lekin gapingiz natijaga yo'naltirilgan bo'lsin.
- **Sifat tekshiruvi (14):** classifier'ning "qachon ishlaydi" ro'yxati — ishonch yaratish; "qachon ishlamaydi" — kutishlarni to'g'ri belgilash. RAG (11-modul) va agent (10-modul) ko'prigi.
- **Live build (15):** ~30 daqiqa quring (13 node, n8n shabloni copy-paste'dan boshlanadi), 10 daqiqa test, 5 daqiqa hisobot. Qo'shimcha: bot 01 README-ga link (`bots/01_classifier_bot/`).
- **Closing (18):** "Bugun siz oddiy AI ish tizimini qurdingiz. Keyin shu botga **agent** (10) va **RAG** (11) qo'shamiz" — keyingi 2 modulga ko'prik.

## Tayyorgarlik checklist

- [ ] Bot 01 (`bots/01_classifier_bot/`) instructorda ishlayapti — backup demo uchun.
- [ ] Har stolga Operators jadvali shabloni tayyor (5 toifa + bo'sh ustunlar).
- [ ] n8n cloud akkaunt har stolda ochiq, BankYordamchi workflow shabloni klonlab qo'yilgan.
- [ ] Telegram bot tokeni har stol uchun pre-generated (BotFather'da yangi bot, har stolga bittadan).
- [ ] Vazirlik logotiplari `_shared/` da turibdi.
- [ ] Slaydlar QA ko'rilgan: orchestrator screenshot.mjs + slide-reviewer.

## Design lock-in

- **Style:** Bold Signal (style-a) — series consistency, locked tokens (`:root` o'zgarmaydi).
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa) + accent-glow (#1FF2F9).
- **Type:** Archivo Black (display) + Space Grotesk (body).
- **Motif:** subtle grid background, blue-gradient highlights.
- **Brand strip:** har slaydda Vazirlik + DigitalEd logotiplari.

## Restructure tarixi

**v2 (2026-05-10):** RAG bot complexity reset. Module 9 was "Build the BankRAGBoti" (77 nodes) — replaced with classifier bot (BankYordamchi). RAG content relocates to deck 11. Atamalar swap: RAG/Embedding → Classification/Schema. Slides 4–17 rewritten; slides 1, 3, 19 keep shells (slide 3 reframed: "yesterday RAG, today classifier"). Paired bot path: `bots/01_classifier_bot/`.

**v2.1 (2026-05-11):** Audited deck against the real n8n workflow `LaEmx5Gwi8A6oxVb`. Corrected node count from claimed 7 → actual 13 (Telegram Trigger → If → LLM Classify → Sheets Read Operators → Aggregate → LLM Dispatch+Reply → Sheets Save → Telegram Send, plus `/start` → Telegram Greeting branch, plus Gemini Classifier + Output Parser × 2 LLM steps). Slide 7 replaced "linear 7-node flow" diagram with full n8n flowgraph. Bosqich 3 (slide 10) reflowed: "Read + Code Pick Operator" → "Read + Aggregate + LLM Dispatch+Reply". Bosqich 4 (slide 11) simplified: dropped "Edit Fields (Format Reply)" — LLM Dispatcher writes reply text inline. Live-build timing: 15–30 daq → ~30–45 daq.

**v1 (2026-05-08):** ilk versiya. 1–2 slaydlari stub'dan kelib chiqdi (Kun 2 chip, 4 fazali agenda); 3–19 slaydlari series-brief 9_deck spetsifikatsiyasiga qarab tuzildi. RAG arxitekturasini 1_deck slide 8 dagi `.s-flow` pattern'idan kengaytirib, 4 bosqichni alohida slaydlarga (8–11) chuqur ochib berdik.

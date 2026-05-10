# 9-deck — Oddiy sun'iy intellekt ish tizimini yaratish

**Module:** 9-modul · Kun 2 · 9:00–10:00 (60 daqiqa)
**Format:** Bosqichli qurish (step-by-step build)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`)
**Stack:** Gemini + RAG + n8n + Vector DB
**Slaydlar soni:** 19 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **RAG**, **Embedding** — slayd 5 da kiritiladi, slayd 18 da recap
**Paired bot:** [`bots/01_rag_basics/`](../bots/01_rag_basics/) — bugun ishtirokchilar shu botni o'z stollarida quradi
**To'liq kontent:** [`content.md`](./content.md)

## Asosiy g'oya

1-modulda QR-kod bilan ishlagan RAG bot — bugun shu botning ichini ochamiz va har bir ishtirokchi o'z bo'limi uchun o'xshashini quradi. **Konsept → amaliyot ko'prigi.** Modul oxirida har stolda ishlaydigan Telegram bot bo'ladi: PDF yuklanadi, savol so'raladi, javob ichki hujjatdan olinadi.

## Outline (one bullet = one slide)

1. **Title** — "Oddiy SI ish tizimini yaratamiz"
2. **Agenda** — 4 faza (Anatomiya · Atamalar · Bosqichli qurish · Test)
3. **Hook** — 1-modul demo botiga qaytish: "Bugun siz quryapsiz"
4. **Pure LLM vs RAG** — internet bilimi vs bizning hujjat
5. **Atama lug'ati** — RAG + Embedding (`.dict.dict-2`)
6. **Embedding amaliy ko'rinish** — matn → vektor + soddalashtirilgan misol
7. **RAG arxitekturasi** — 4-bosqich umumiy oqim
8. **Bosqich 1 · Hujjat yig'ish** — PDF / Sheets / Notion + bank misollari
9. **Bosqich 2 · Chunking** — butun PDF vs xatboshilarga bo'lish
10. **Bosqich 3 · Embedding va saqlash** — chunk → vektor → vector DB
11. **Bosqich 4 · Savol kelganda** — savol → vektor → top-3 → Gemini
12. **Vector DB tanlash** — Supabase pgvector vs Pinecone vs Chroma
13. **n8n bilan RAG qurish** — 5 ta node, bot 01 ga ko'rsatkich
14. **Sifat tekshiruvi** — RAG yaxshi / yomon ishlaydigan holatlar (.cando)
15. **Live build · stol mashqi** — har stol o'z PDFini yuklaydi (s-brain)
16. **Tez-tez uchraydigan 4 xato** — chunk hajmi, embed mismatch, top-K, manba yo'q (.myth)
17. **Mini-recap** — bugun → bo'lim → 12-modul agentga aylantirish
18. **Closing** — 3 xulosa + lug'at recap (RAG, Embedding)
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

- **RAG** — *Retrieval-Augmented Generation*. Bankir tilida: "qidir + javob bil". AI internetdan emas, bizning ichki hujjatlardan ko'chirib javob beradi.
- **Embedding** — *vektor ko'rinishi*. Bankir tilida: "matnni raqamlar tilida yozish". O'xshash ma'noli matnlar — yaqin koordinatada.

Closing slaydda recap row jamoa bilan birga aytamiz (cb_decks/CLAUDE.md series qoidasi).

## Series-wide bog'lanishlar

- **1-modul slide 8** — RAG flow ilk marta ko'rilgan. Bugun shu sxemaga **chuqur** kirib boramiz.
- **3-modul** — Hallucination, Data Masking. RAG aynan gallyutsinatsiya muammosini yechadi.
- **8-modul** — n8n + Webhook. Bugun shu node'lardan foydalanamiz.
- **10-modul (keyingi)** — Agent kontseptsiyasi. RAG → Tool Use → Agent o'sish chizig'i.
- **12-modul** — Pipeline. Bugungi RAG botni multi-step pipeline'ga aylantiramiz.

## Speaker cues — har faza uchun

- **Hook (slide 3):** auditoriyaning 1-modul demosini eslatib, "bugun shu botni siz quryapsiz" deb ma'no qo'shing. Telefonlar tayyor — QR bilan eski demo botiga qaytishlari mumkin.
- **Atama (slide 5–6):** **RAG** va **Embedding** — har birini 1 ta misol bilan, sodda tilda. Vektor matematikasiga kirmang. "Yaqin ma'no — yaqin koordinata" — yetadi.
- **Bosqichli qurish (8–13):** har bosqichda *yutuq metrika* ayting (qancha vaqt tejaydi, qanday xatoni oldini oladi). Slaydlar texnik, lekin gapingiz natijaga yo'naltirilgan bo'lsin.
- **Sifat tekshiruvi (14):** RAG-ning "qachon ishlaydi" ro'yxati — ishonch yaratish; "qachon ishlamaydi" — kutishlarni to'g'ri belgilash.
- **Live build (15):** har stolga 1 ta yengil PDF (10–15 bet) bering. 20 daqiqa quring, 5 daqiqa test, 5 daqiqa hisobot. Qo'shimcha: bot 01 README-ga link.
- **Closing (18):** "Bugun siz oddiy AI ish tizimini qurdingiz. Ertaga shu botni **agent**ga aylantiramiz" — 10-modulga ko'prik.

## Tayyorgarlik checklist

- [ ] Bot 01 (`bots/01_rag_basics/`) instructorda ishlayapti — backup demo uchun.
- [ ] Har stolga test PDFi tayyor (avtokredit nizomi, FAQ, tarif jadvali — 10–15 bet).
- [ ] n8n cloud akkaunt har stolda ochiq, BankRAGBoti workflow shabloni klonlab qo'yilgan.
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

**v1 (2026-05-08):** ilk versiya. 1–2 slaydlari stub'dan kelib chiqdi (Kun 2 chip, 4 fazali agenda); 3–19 slaydlari series-brief 9_deck spetsifikatsiyasiga qarab tuzildi. RAG arxitekturasini 1_deck slide 8 dagi `.s-flow` pattern'idan kengaytirib, 4 bosqichni alohida slaydlarga (8–11) chuqur ochib berdik.

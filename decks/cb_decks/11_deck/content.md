# 11-modul · Bank uchun sun'iy intellekt agenti dizayni — RAG chatbot showcase

**Module:** 11-modul · Kun 2 · 11:00–12:00 (60 daqiqa)
**Format:** Showcase + dizayn seminar (instructor demos, students DESIGN)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Telegram + Gemini + Google Sheets + Drive + In-Memory Vector Store
**Paired bot:** [`bots/02_rag_chatbot/`](../bots/02_rag_chatbot/) — production RAG bot (77 nodes, 14 routes)
**Live workflow:** `kLcPx1CZX9RwH1z8` (risqaliyevds.app.n8n.cloud)
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **RAG**, **Embedding** — slide 5 da kiritiladi, slide 17 da recap

> Asosiy g'oya (showcase): "9-modulda siz oddiy klassifikator (n8n workflow · 13 node) qurdingiz. Bu — uning chuqur, manba bilan ishlaydigan versiyasi (77 node, ~6x katta). Bugun siz qurmaysiz — ichini ochib ko'rsatamiz, RAG'ning architectural daraja tushuntiriladi. Pilot canvas to'ldirib chiqasiz."

---

## Slide 1 — Title

**Sarlavha:** Bank uchun **AI agenti dizayni**.
**Chip:** Kun 2 · 11:00 — 12:00
**Tagline:** RAG chatbot · ichki PDF'dan javob, manba ko'rsatib. Showcase modul.

**Speaker notes:**
Tushlikdan keyingi sessiya. Ayting: "Bugungi modul — showcase + dizayn. Siz qurmaysiz, lekin **architectural daraja**da tushunasiz. 9-modulda 13 nodeli klassifikator (n8n workflow) qurdingiz; bu — uning **77 nodeli kattaligi**, ~6x kattaroq. Botning ichini ochib ko'rsataman, lug'atni mustahkamlaymiz, va siz pilot canvas bilan chiqasiz."

---

## Slide 2 — Agenda (4 faza)

1. **01 — RAG nima** · ~10 daq · slaydlar 3–5
   Live demo + Pure LLM vs RAG farqi + 2 atama (RAG + Embedding).
2. **02 — RAG arxitekturasi** · ~14 daq · slaydlar 6, 9
   4 bosqich (Indexing → Chunking → Embedding → Retrieval+Generation), chunking strategiyasi.
3. **03 — Production bot** · ~22 daq · slaydlar 7, 8, 10–13
   BankRAGBoti shape, korpus layout, real Q&A misol, audit izi, "qachon yaxshi/yomon", privacy.
4. **04 — Sizning RAG** · ~14 daq · slaydlar 14–17
   Bot folder pointer, dizayn mashqi, pilot canvas, closing recap.

---

## Slide 3 — Hook · Live RAG bot demo (centered QR + chat preview)

**Sarlavha:** 1-modulda ishlatgan bot — **bugun ichini ochamiz**.
**Chip:** Live demo · BankRAGBoti
**Vizual:** Chap — `t.me/bankragbot` QR (1-modul slide 5 + 9-modul slide 3 bilan bir xil). O'ng — chat bubble preview.

**Chat preview:**
- (user) "Avtokredit foizi qancha?"
- (ai) "Ichki PDF'dan qidirilmoqda — vector_store_search..."
- (ai) "Tarif №3, 4-band: **yillik 18%**. Manba: **kredit_siyosati.pdf**. Yakuniy qaror — bankir hamkasbim bilan kelishilgan holda bo'ladi."

**Lead:** Showcase modul. Bugun siz qurmaysiz — ichini ko'rasiz. **9-modulda** 13 nodeli klassifikator (n8n workflow) quryapsiz; bu — uning **chuqur, manba bilan ishlaydigan** versiyasi. Stack: Telegram + Gemini + Sheets + Drive · 77 node · kod yo'q.

**Speaker notes:**
Telefondan QR'ni skanlatuvchining ekraniga ko'rsating. Auditoriya botga kirib, bir nechta savol bersin. Real javob ko'rsating — manba bilan birga. "Bu — kechagi sehr; bugun mexanizmini tushunamiz." 9-modulga ko'prik: "Klassifikator botingiz kim qaysi operatorga tushishini hal qiladi. Bu bot — endi javobni o'zi qaytaradi, lekin **faqat bank PDF'idan**."

---

## Slide 4 — Pure LLM muammosi · uydirma vs manba

**Sarlavha:** Pure LLM — **uydirma**.<br>RAG — manbaga tayangan.
**Lead:** Oddiy LLM umumiy bilimga tayanadi va manbasiz javob berishi mumkin — bankka yaramaydi. RAG javobdan oldin **tasdiqlangan ichki PDF'dan** tegishli bandni topadi va javobni shu manbaga bog'laydi.

**Compare:**
- **Pure LLM** — "Avtokredit foizi taxminan **22% atrofida**..." | Manba yo'q · gallyutsinatsiya xavfi · bankir tasdiqlay olmaydi
- **RAG** — "Tarif №3, 4-band: **yillik 18%**. (avtokredit_nizomi.pdf · 12-bet)" | Manba bor · joriy hujjat · audit izi · "Topilmadi" javobi mumkin

**Speaker notes:**
Aniq raqam ko'rsating. "Pure LLM 22% deb javob berdi. Bank PDF'da 18% yozilgan. Bu — gallyutsinatsiya, kelishmovchilik, mijoz oldida bankir uchun jarima xavfi." 3-modul Hallucination atamasini eslating. RAG bu xavfning **architectural yechimi** — promptdagi qoida emas, butun mexanizm.

---

## Slide 5 — Lug'at · RAG + Embedding (`.dict.dict-2`)

**Chip:** Bankir uchun AI lug'ati · 11-modul
**Sarlavha:** Ikki so'z — RAG botning **poydevori**.
**Lead:** RAG — usulning umumiy nomi. Embedding — uning ichidagi mexanizm.

**2 ta dict-card:**

- **RAG** — *Retrieval-Augmented Generation*
  Bankir tilida: "**AI avval tasdiqlangan bank hujjatlaridan mos bandni topadi, keyin faqat shu bandga tayanib javob yozadi**". Manba topilmasa — javob yo'q.

- **Embedding** — *matnning vektor ko'rinishi*
  Matnni raqamli vakilga aylantirish — shunda **"avtokredit foizi"** va **"mashina krediti stavkasi"** bir-biriga yaqin topiladi (ma'no jihatidan). Foydalanuvchi qaysi so'zni ishlatishidan qat'i nazar — bot to'g'ri bandni topadi.

**Speaker notes:**
Bu modulda yangi 2 atama. Boshqa decklar bularni qayta ta'riflamaydi (uniqueness rule). Embedding'ni soddalashtirib aytib bering: "Har matnga AI 768 ta raqam beradi. **Yaqin ma'no — yaqin koordinata**. Demo: 'avtokredit foizi' = [0.21, 0.84, ...]; 'mashina krediti stavkasi' = [0.23, 0.81, ...] — yaqin. 'Yangi yil ta'tili' = [-0.40, 0.05, ...] — uzoq."

17-slaydda jamoa bilan birga aytamiz: "RAG = avval manbani top, keyin javob yoz. Embedding = matnni ma'no bo'yicha qidirish."

---

## Slide 6 — RAG arxitekturasi · 4 bosqich (`.flow`)

**Sarlavha:** RAG — to'rtta **bosqichdan** iborat.

**4 step:**
1. 📚 **Indexing** — Drive folderidagi PDF yig'iladi
2. ✂️ **Chunking** — 800 belgili bo'laklarga, 120 overlap bilan
3. 🧬 **Embedding** — Gemini bilan vektorga aylantiriladi
4. 🧠 **Retrieval + Generation** — savol kelganda Top-5 yaqin bandni top, tayanib javob ber (`brain` step)

**Yakuniy qator:** → Tayyorgarlik bir marta · Ishlatish million marta. Pipeline arxitekturasi 12-modulda chuqur.

---

## Slide 7 — Production RAG bot · 77 node · 14 marshrut (stat-grid)

**Chip:** Production grade · BankRAGBoti
**Sarlavha:** Real bot — **77 node, 14 marshrut**, ikki eshik.
**Lead:** Ipak Yo'li Bank uchun yozilgan. Telegram + Gemini + Sheets + Drive + In-Memory vector store.

**4 stat-cell:**
- **77 Node** — 9-modul klassifikator: 13 node. Bu — ~6x katta.
- **14 Marshrut** — Q&A + 7 admin (/help /list_docs /add_doc /delete_doc /reindex /stats /cancel) + 6 tasdiqlash/xato qadami.
- **2 Eshik** — Front: Telegram (savol). Back: Manual Trigger (admin reload).
- **5 Top-K** — Har savolga 5 ta eng yaqin chunk. 800 belgi, 120 overlap.

**Production strip:** Live workflow `kLcPx1CZX9RwH1z8` · risqaliyevds.app.n8n.cloud · siz qurmaysiz, ichini ko'rasiz.

---

## Slide 8 — Bank PDF qo'llanma · Drive folder + Sheets indeksi

**Sarlavha:** Bank PDF qo'llanma — **Drive + Sheets**.
**Lead:** Hujjat bir joyda · indeks ikkinchi joyda · vektor uchinchi joyda. Audit shu uchligi ustiga qurildi.

**2 column corpus:**

- 📁 **Drive folder** — original PDF nusxalari (kredit_siyosati.pdf, avtokredit_nizomi.pdf, depozit_shartlari_q2.pdf, komplaens_qoidalari.pdf)
- 📊 **Sheets indeks** — 4 tab: Documents (doc_id, file_name, drive_id, is_active) · Admins (chat_id allow-list) · AdminStates (pending operatsiya, 1 soat TTL) · UsageLog (savol, javob, "topilmadi", manba)

---

## Slide 9 — Chunk size + overlap · 800 / 120

**Sarlavha:** Chunk — **800 belgi · 120 overlap**.
**Lead:** Butun PDF'ni AI'ga bera olmaymiz — kontekst oynasi to'lib ketadi. Bo'laklarga ajratamiz, har biriga vektor; har savolga eng yaqin 5 ta bo'lak topiladi.

**Chunk visualization:**
- Chap: kredit_siyosati.pdf 4-bo'limning 3 ta chunk + 2 ta overlap (rangli highlight)
- O'ng: 3 ta spec-row — Chunk size (800 belgi, ~150 so'z) · Overlap (120 belgi, chegara saqlash) · Yakuniy qoida (test orqali, 20–30 real savol)

**Speaker notes:**
Overlap nima ekanligini visualisation bilan ko'rsating. "Bandning bog'lovchi qismi (oldingi va keyingi chunk'da bir qism takrorlanadi) — chegarada qolgan ma'lumot yo'qolmaydi." 800/120 — sanoat standartining yaxshi boshlang'ich qiymati. 12-modulda chunk strategy (semantic chunking, hierarchical) chuqurroq.

---

## Slide 10 — Banking misol · ichki PDF Q&A

**Sarlavha:** Real misol — **ichki PDF** Q&A.

**2 column:**

- **Mijoz savoli** — "Avtokredit foizi qancha?" (Embedding: vektor [0.21, 0.84, ...] · Top-K=5 chunk topiladi · AI Agent shu 5 chunk'ga tayanib javob tuzadi)

- **Bot javobi** — "Kredit siyosati 4-bandiga ko'ra: yangi avto — yillik **18%**; ikkilamchi bozor — yillik **21%**; boshlang'ich to'lov 30% dan kam emas; 5 yildan eski avto uchun 50%."
  - **Manba:** kredit_siyosati.pdf · 4.1-band, 4.2-band
  - "Yakuniy qaror — bankir hamkasbim bilan kelishilgan holda bo'ladi."

---

## Slide 11 — Manba tekshiruvi · har javob = audit izi

**Sarlavha:** Har javob — **manba bilan**. Har manba — audit izi.
**Lead:** RAG botning bank uchun asosiy ustunligi — har bir javobni audit qilish mumkin.

**4 audit-row:**
1. **Manba majburiyati** (`systemPrompt:5`) — System prompt: "Faqat topilgan parchalardan javob ber. Topilmasa — 'Ushbu hujjatda ma'lumot topilmadi'. Internetdan, taxmindan — taqiqlangan."
2. **Iqtibos har javobda** (`a-source`) — "Manba: <hujjat nomi>, <bo'lim>". Bankir bir bosishda PDF'ga o'tib bandni qayta o'qishi mumkin.
3. **UsageLog jurnali** (`UsageLog`) — Sheets · UsageLog tab: chat_id, savol, topilgan chunk_id'lar, javob, "topilmadi" bayrog'i, latency. **/stats** buyrug'i 7-kunlik ko'rsatkichni qaytaradi.
4. **Hujjat versiyasi** (`Documents`) — doc_id, added_by, added_at, is_active. **/delete_doc** soft-delete; **/reindex** butun korpusni qayta quradi.

---

## Slide 12 — RAG qachon yaxshi · qachon yomon (`.cando`)

**Sarlavha:** RAG **qachon** ishlaydi — qachon ishlamaydi.

**✓ Yaxshi ishlaydi:**
- Hujjatda aniq yozilgan faktlar (foiz, summa, sana)
- "Qayerda yozilgan?" tipidagi savollar
- Shartnoma bandlari, qoidalar, tariflar
- FAQ tipidagi takrorlanuvchi savollar
- 5–50 betlik bir mavzu hujjatlari

**✗ Yomon ishlaydi:**
- Bir nechta hujjatlarni taqqoslash ("qaysi tarif foydaliroq?")
- Hisob-kitob talab qiladigan savollar
- Muddati o'tgan hujjat (RAG bilmaydi — qayta indekslamaguncha)
- Real-time ma'lumot (bugungi kurs)
- Chunk chegarasiga tushgan band — "retrieval miss"

**Yakuniy qator:** → RAG yetmasa — agent / pipeline kerak (12-modul · murakkab pipeline arxitekturasi).

---

## Slide 13 — Privacy · bank PDF qayerda saqlanadi

**Sarlavha:** Bank PDF — **bank tasdiqlagan konturda**.

**3 sec:**
- 🔒 **Saqlash konturi** — Drive folder bank tasdiqlangan bulut konturida. Embedding + LLM = Gemini API orqali (Vertex AI Workspace, korporativ shartnoma + opt-out treningdan).
- 📜 **Korporativ shartnoma** — DPA hujjati, data residency, zero-training bandi, audit huquqi. 3-modul Data Masking shu yerda qaytadi.
- 📒 **Audit log** — Sheets · UsageLog. Adminlar — Admins sheet'idagi allow-list. Telegram_ID kiritilmagan — admin emas.

**Yakuniy qator:** → Tasdiqsiz haqiqiy bank PDF demoga kiritilmaydi. Pilot — sintetik yoki ochiq nizomlardan boshlanadi.

---

## Slide 14 — Tayyor template · `bots/02_rag_chatbot/`

**Sarlavha:** **Tayyor pipeline** — to'liq dizayn papkasi.
**Lead:** Bu botning to'liq dizayni va prompt'lari `bots/02_rag_chatbot/` da. Workflow grafi, system prompt, admin command sxemasi — hammasi bor. Showcase: ko'ramiz, n8n'da ochib, ichidan o'rganamiz.

```
bots/02_rag_chatbot/
  ├─ README.md                            ← bot nima qiladi · 2 eshik mental model
  ├─ design/
  │   ├─ workflow-graph.md              ← 77 node, 14 marshrut, ASCII grafi
  │   ├─ conversation-flow.md           ← USER Q&A + admin state machine
  │   └─ data-schema.md                 ← Sheets tab'lar, Drive layout, chunk strategy
  ├─ prompt/
  │   ├─ 00-MASTER-PROMPT.md            ← bitta paste — bot tikladi
  │   ├─ 01-overview-and-mental-model.md
  │   ├─ 04-chain-qa-rag.md             ← Q&A spine
  │   └─ … (10 ta chain fayli)
  └─ prompts/
      └─ system-prompt.md               ← AI Agent persona, RAG-only qoidalar
```

**Tpl-hint:** Live workflow: **kLcPx1CZX9RwH1z8** — risqaliyevds.app.n8n.cloud. Pipeline arxitekturasi 12-modulda chuqur.

---

## Slide 15 — Dizayn mashqi · 3 ta savol

**Chip:** Dizayn mashqi · stol bo'yicha · 10 daq
**Sarlavha:** Sizning bo'limingiz uchun **RAG pilot**.

**3 ta savol:**
1. Sizning bo'limingizda **qaysi 3 ta hujjat** RAG'ning birinchi pilot manbasi bo'la oladi? (nizom, qoida, tarif — aniq fayl nomi)
2. Foydalanuvchi **kim** — mijoz, ichki bankir, yoki audit? Va u **qanday savol** beradi? (3 ta tipik misol)
3. "**Topilmadi**" javobi qachon to'g'ri, qachon xato? Qaysi savolga RAG umuman **javob bermasligi** kerak?

**Yakuniy qator:** → 10 daqiqa stol ichida muhokama. Keyingi slaydda 5 qatorli pilot canvas to'ldiramiz.

---

## Slide 16 — RAG pilot canvas (5 qator)

**Chip:** Stol bo'yicha · 8 daq · canvas to'ldirish
**Sarlavha:** **RAG pilot canvas** — 5 qator, qaror.

**5 qator:**
1. 🎯 **Use case** — Bo'limning qaysi savol oqimi RAG bilan yopiladi? (1 jumla · mas'ul bo'lim ko'rsatiladi)
2. 📚 **Manba** — Qaysi 3 ta PDF korpusga tushadi? Hujjat toifasi, yangilanish davri, admin allow-list.
3. ✅ **Test savollar** — 20 ta savol test seti — har javobda manba majburiy, xato javob 0, "topilmadi" holatlari alohida ko'rib chiqiladi.
4. ⚠️ **Xavf + eskalatsiya** — "Topilmadi" qachon to'g'ri? Eski hujjat ishlatilsa nima bo'ladi? Eskalatsiya egasi kim?
5. 🚦 **Qaror** — "Hozir boshlamaymiz / sintetik hujjat bilan sinaymiz / cheklangan haqiqiy korpus bilan pilot qilamiz". Qaror egasi va qayta indekslash davri yoziladi.

**Yakuniy qator:** → 8 daqiqadan so'ng 2 ta stol o'z qarorini auditoriyaga taqdim etadi.

---

## Slide 17 — Closing · 3 xulosa + lug'at recap

**Sarlavha:** O'zimiz bilan **olib ketadigan** 3 xulosa.

**3 ta close-row:**
- 💡 **RAG — manbasiz emas, manbaga tayangan AI**. Bank uchun yagona to'g'ri javob: ichki PDF + iqtibos. "Topilmadi" — javob, "balki" emas.
- 💡 **Showcase — keyingi darajaga andoza**. 9-modulda 13 nodeli klassifikator (n8n workflow) qurdingiz; bu — uning chuqur, manba bilan ishlaydigan versiyasi (77 node, ~6x katta). Bugun siz arxitekturani ko'rib, o'z pilotingizga talab yozasiz — qurish emas.
- 💡 **Pilot qarori bilan chiqamiz** — har stol 5 qatorli canvas: use case + manba + test + xavf + qaror. Tayyor template `bots/02_rag_chatbot` papkasida.

**Lug'at recap (interaktiv, 30–60 sek):**
> "Eslay olasizmi?"
- **RAG** = … (jamoa: "avval bank PDF'idan top, keyin shu manbaga tayangan javob yoz")
- **Embedding** = … (jamoa: "matnni ma'no bo'yicha qidirish uchun raqamli vektorga aylantirish")

---

## Slide 18 — Q&A

**Sarlavha (markazlashgan):** Sizning **savollaringiz**.
**Kontakt:** murod@mohir.dev

**Tipik savollar:**
- "RAG'ga necha ta PDF beraman?" → Pilot uchun 3 ta yetarli; production: minglab. Top-K orqali tezlik nazoratda.
- "Mijoz pasport raqamini so'rasa?" → System prompt rad qiladi (PII filter); 13-modul Data Masking shu joyda.
- "Bot eski hujjatdan javob berib qoldi-chi?" → /reindex orqali korpusni yangilang. CI/CD avtomatlashtirish — 14-modul.
- "9-modul klassifikator + 11-modul RAG bir botda?" → Mumkin: classifier birinchi, faqat RAG savol topilsa — yo'naltir. 12-modulda multi-chain pipeline arxitekturasi.

---

## Series-wide bog'lanish

- **Avvalgi modul:** [`10_deck/`](../10_deck/) — Agentlar tushunchasi (Tool Use, ReAct)
- **9-modul klassifikator bot:** [`9_deck/`](../9_deck/) — bugungi RAG bot uning chuqur versiyasi
- **Keyingi modul:** [`12_deck/`](../12_deck/) — Pipeline va Idempotent design (RAG bot multi-chain analiz uchun maqsad)
- **Muvofiqlik:** [`3_deck/`](../3_deck/) — Hallucination, Data Masking
- **Promt engineering:** [`5_deck/`](../5_deck/) — system prompt, few-shot

## Series-wide terminologiya talab

`cb_decks/CLAUDE.md` ga qarang. 11-modulning hissasi: **RAG, Embedding** (slide 5 da kiritildi, slide 17 da recap). 12-modul: Pipeline + Idempotent design.

## Tayyorgarlik checklist (deck'dan tashqari)

- [ ] BankRAGBoti ishlab turibdi (Telegram + Gemini + Sheets + Drive + In-Memory vector store)
- [ ] Demo savol: "Avtokredit foizi qancha?" → kredit_siyosati.pdf · 4.2-band
- [ ] Backup: agar bot to'xtab qolsa, ekrandan ssreen-recording (15 sek)
- [ ] `bots/02_rag_chatbot/design/workflow-graph.md` ochiq tab — slide 7 va 14 uchun
- [ ] n8n cloud ochiq tab — workflow `kLcPx1CZX9RwH1z8` ko'rsatish uchun
- [ ] Vazirlik logotiplari `_shared/` da
- [ ] QA: orchestrator screenshot.mjs run qiladi

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · RAG nima | 3–5 | ~10 daq |
| 02 · RAG arxitekturasi | 6, 9 | ~9 daq |
| 03 · Production bot | 7, 8, 10–13 | ~22 daq |
| 04 · Sizning RAG | 14–17 | ~14 daq |
| Q&A | 18 | ~2 daq |
| **Jami** | **18** | **~60 daq** |

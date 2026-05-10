# 9-modul · Oddiy SI ish tizimini yaratish — to'liq kontent

**Module:** 9-modul · Kun 2 · 9:00–10:00 (60 daqiqa)
**Format:** Bosqichli qurish (step-by-step build)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Gemini (LLM) + Embedding + Vector DB + n8n
**Slaydlar soni:** 19 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **RAG**, **Embedding** — slayd 5 da kiritiladi, slayd 18 da recap
**Paired bot:** [`bots/01_rag_basics/`](../bots/01_rag_basics/)

> Asosiy g'oya: 1-modulda QR bilan ishlagan RAG bot — bugun shu botning ichini ochamiz va har bir ishtirokchi o'z bo'limi uchun o'xshashini quradi.

---

## Slide 1 — Title

**Sarlavha:**
Oddiy SI **ish tizimini** yaratamiz.

**Eyebrow / chip:**
Kun 2 · 9:00 — 10:00

**Tagline:**
Birinchi to'liq SI ish tizimini bosqichma-bosqich quramiz.

**Speaker notes:**
Auditoriyaga "ikkinchi kun, qo'l ostiga olamiz" tonini bering. Birinchi kun konseptual edi — bugun amaliyot. 1-modulda ko'rgan bot — bugun siz quryapsiz. Modul oxirida har stolda **ishlaydigan** Telegram bot bo'ladi. Slaydda "bosqichma-bosqich" so'ziga urg'u bering — qo'rquv pasayadi.

---

## Slide 2 — Agenda

**Sarlavha:**
Mavzuning **yo'l xaritasi**.

**Eyebrow:** Agenda

**4 faza (2×2 grid, klikable card):**

1. **01 — Anatomiya** · ~14 daq
   RAG nima uchun kerak, qanday ishlaydi. Pure LLM bilan farqi. Modulning kontseptual asosi.
   *(slaydlar 3–7)*

2. **02 — Atamalar** · ichkarida
   **RAG** va **Embedding** — kunning ikki kalit so'zi. Vektor matematikasi shart emas, ma'noni tushunamiz.
   *(slaydlar 5–6)*

3. **03 — Bosqichli qurish** · ~22 daq
   Hujjat yig'ish → chunking → embedding → retrieval → generation. Har bosqichni alohida ochib, n8n'da yig'amiz.
   *(slaydlar 8–13)*

4. **04 — Test** · ~21 daq
   Sifat tekshiruvi, live build (har stol o'z botini quradi), xato tuzog'i, yakun.
   *(slaydlar 14–19)*

**Speaker notes:**
60 daqiqani 4 fazaga bo'lib ko'rsating. "Anatomiya"ni qisqa, "Bosqichli qurish"ni eng katta blok qilib aniqlang — bu bugungi seminarning yuragi.

---

## Slide 3 — Hook · "1-modul demo botini eslang"

**Chip:** Live recall · Modul 1

**Sarlavha:**
1-modulda ishlatgan bot — **bugun siz quryapsiz**.

**Vizual elementlar:**
- Chap tomonda QR-kod katakchasi (1-moduldagi demo botga qaytaradi).
- O'ng tomonda — eslatma matn va shablonli savol.

**Demo savol (italik):**
> "Ikkilamchi bozordan avtomobil olish uchun boshlang'ich to'lov qancha va qanday hujjatlar kerak?"

**Tagline:**
→ Kechagi sehr — bugungi qoida. Ichki sxema ochilyapti.

**Speaker notes:**
Auditoriyaga 1-modul demosini eslating. Bot bank PDFiga qarab javob bergan edi — hech kim "bu qanday qilingan" deb so'ramadi, jadval qiziq edi. Bugun shu sxemaning ichini ochamiz. 60 soniya, telefonlar bilan QR'ni qaytarib skanerlashlarini ayting (eski demo bot hali tirik). Ammo asosiy fokus — "bugun siz **quryapsiz**". Stolingizdagi noutbukda n8n ochilyapti, bot tokenlar tarqatiladi.

---

## Slide 4 — Pure LLM vs RAG

**Sarlavha:**
Oddiy LLM — internet bilimi.
**RAG** — bizning hujjat.

**Lead:**
Oddiy LLM umumiy bilimga tayanadi va manbasiz javob berishi mumkin. RAG javobdan oldin bank hujjatidan tegishli bo'lakni topadi va javobni shu manbaga bog'laydi — xato xavfini kamaytiradi, lekin manba sifati va test natijasi bilan tekshirilishi shart.

**Compare bloki:**
| Pure LLM (internet bilimi) | → | RAG (bizning hujjat) |
|---|---|---|
| "Avtokredit foizi taxminan 22% atrofida" | | "Tarif №3, b.4: yillik 18%" |
| Manba yo'q · Eski ma'lumot | | Manba bor · Joriy hujjat · Test + manba havolasi bilan qabul qilinadi |

**Speaker notes:**
3-moduldagi **gallyutsinatsiya** atamasini eslating. Pure LLM — gallyutsinatsiya uchun eshik ochiq. Bot ishonch bilan noto'g'ri foizni aytishi mumkin, bu muvofiqlikda halokat. RAG — bu gallyutsinatsiya muammosining **inzhenerlik yechimi**. Ko'rsating: Bank uchun "balki" javobi noto'g'ri javobdan ham xavfli — chunki mijoz uni ishonchli deb qabul qiladi. Shuning uchun bizga RAG kerak. Ikki ustun orasidagi qarama-qarshilikni ovozda ham bering: "balki" → "Tarif №3, b.4".

---

## Slide 5 — Atama lug'ati · RAG + Embedding

**Chip:** Bugungi 2 ta atama

**Sarlavha:**
Kunning ikki kalit so'zi — **RAG** va **Embedding**.

**Lead:**
RAG — usulning umumiy nomi. Embedding — uning ichidagi mexanizm. Vektor matematikasiga kirmaymiz, ma'nosini tushunamiz.

**2 ta dict-card:**

- **RAG** — *Retrieval-Augmented Generation*
  Bankir tilida: "**avval manbani top, keyin javob yoz**". Bot javob berishdan oldin tasdiqlangan ichki hujjatdan tegishli bo'laklarni topadi, keyin javobni faqat shu bo'laklarga tayangan holda tuzadi.

- **Embedding** — *Matnning ma'no izi*
  Matn raqamli vektorga aylantiriladi — "avtokredit foizi" va "mashina krediti stavkasi" kabi yaqin ma'noli iboralar bir-biriga yaqin topiladi. Raqamlar modelga bog'liq; slayddagi qiymatlar — soddalashtirilgan misol.

**Speaker notes:**
2 atama, 2 daqiqa. RAG nomini birinchi marta eshitadigan auditoriya bor — har bir harf nimani anglatishini sodda tilda ayting:
- **R** (Retrieval) — qidiruv. PDFdan kerakli xatboshini topish.
- **A** (Augmented) — to'ldirilgan. Topilgan xatboshi LLMga qo'shib beriladi.
- **G** (Generation) — javob yozish. LLM topilgan ma'lumotga qarab javob tuzadi.

Embedding — bu "AIning ma'no kompasi". Keyingi slaydda misol bilan ko'ramiz. 18-slaydda jamoa bilan birga takrorlaymiz.

---

## Slide 6 — Embedding mashq · matn → vektor

**Sarlavha:**
**Embedding** — matnni raqamlar tilida ifodalash.

**Lead:**
Har bir matnga AI 768 yoki 1536 ta raqam beradi. Yaqin ma'noli matnlar — yaqin koordinatalarda. Misol qarang.

**3 ta misol kartochka (matn → vektor [soddalashtirilgan]):**

| Matn | Vektor (qisqartirilgan) | Yaqinlik |
|---|---|---|
| "Avtokredit foizi" | [0.21, 0.84, 0.13, …] | (asos) |
| "Mashina kreditining stavkasi" | [0.23, 0.81, 0.15, …] | **0.94** ✓ yaqin |
| "Yangi yil ta'tili" | [-0.40, 0.05, 0.92, …] | 0.12 ✗ uzoq |

**Tagline:**
→ Savol kelganda: savolni ham vektor qiladi → eng yaqin matnlarni topadi → LLMga uzatadi.

**Speaker notes:**
"Mashina krediti stavkasi" va "Avtokredit foizi" — har xil so'zlar, lekin **bir ma'no**. Embedding shu o'xshashlikni raqamlarda ko'rsatadi: 0.94 yaqinlik. "Yangi yil ta'tili" — boshqa ma'no — 0.12 yaqinlik (uzoq). Bu retrievalning poydevori: foydalanuvchi qanday so'z ishlatishidan qat'i nazar, bot hujjatdagi to'g'ri qismni topadi. Vektor matematikasiga kirmang — "yaqin ma'no — yaqin koordinata" — yetadi.

---

## Slide 7 — RAG arxitekturasi · 4 bosqich

**Sarlavha:**
RAG — to'rtta **bosqichdan** iborat.

**Lead:**
Markazda bitta aniq vendor emas, LLM xizmati turadi. Mashqda Gemini ishlatamiz; bank muhitida model va infratuzilma axborot xavfsizligi, ma'lumot joylashuvi, audit talabi va xarajat bo'yicha tanlanadi.

**Flow (4 step, o'rtadagisi blue gradient brain):**

1. 📚 **Indexing** — hujjatlarni yig'ish va tayyorlash
2. → ✂️ **Chunking + Embedding** — bo'lib, vektorga aylantirish
3. → 🧠 **Retrieval (Gemini)** — savolga eng yaqin chunklarni topish
4. → 💬 **Generation** — javob yozish

**Speaker notes:**
1-modul slayd 8 (RAG flow) — eslang. U yerda 4 bosqichni qisqacha ko'rganmiz. Bugun har biriga alohida slayd bag'ishlaymiz (8–11). Bosh fikr: RAG — bu **bitta sehrgarlik emas**, balki **4 ta bog'langan ish**. Hujjat yig'ish va indekslash — botingiz ishlay boshlashidan **oldin** qiladigan ish. Retrieval va generation — har bir savolda qaytariladigan ish. Tayyorgarlik bir marta, ishlatish million marta.

---

## Slide 8 — Bosqich 1 · Hujjat yig'ish (Indexing)

**Sarlavha:**
**Bosqich 1** — qaysi hujjatlarni AI ko'radi?

**Lead:**
Botingizning bilim doirasi — siz yuklagan hujjatlardan iborat. Boshlash uchun 3 ta manba turi yetadi.

**3 ta benefit kartochka:**

- 📄 **PDF**
  Tarif jadvali, shartnomalar, ichki nizomlar. Bank uchun eng tabiiy format.
  Misol: avtokredit nizomi, ichki tartiblar, AML qoidalari.

- 📊 **Google Sheets**
  FAQ ro'yxati, kichik faktlar bazasi. Tezkor o'zgartirish kerak bo'lganda — eng oson manba.
  Misol: kunlik kurs, filiallar ro'yxati.

- 📝 **Notion / Confluence**
  Bo'lim ichidagi yo'riqnomalar, jarayon tavsiflari. Allaqachon yozilgan bilim.
  Misol: yangi xodim onboarding hujjati.

**Speaker notes:**
"Garbage in — garbage out". Hujjatlar sifati — botingiz sifatining 70%. Eski tahriridagi PDF, xato bilan to'lgan FAQ — botingiz ham xato javob beradi. Ko'rsating: avval hujjatlarni "tozalash" — kerakli, joriy versiyasini ajratish. Bugun har stol o'z bo'limidan **bitta** PDF tanlaydi (10–15 bet). Mukammallik kerak emas — boshlanish kerak.

---

## Slide 9 — Bosqich 2 · Chunking

**Sarlavha:**
**Bosqich 2** — hujjatni **bo'laklarga** ajratish.

**Lead:**
Butun PDFni SIga bera olmaymiz — kontekst oynasi to'lib ketadi. Boshlang'ich sozlama: ~500–800 belgilik **bo'laklar (chunk)**, kichik overlap bilan. Yakuniy sozlama — **test orqali** tanlanadi.

**Compare bloki:**

| Butun PDF (xom) | → | Bo'laklarga (chunk) ajratilgan |
|---|---|---|
| Katta hujjat · 1 ta blok | | Boshlang'ich: ~500–800 belgi · kichik overlap bilan |
| AI hammasini o'qiydi | | AI faqat tegishli bo'laklarni o'qiydi |
| Sekin · qimmat · sifatni o'lchab bo'lmaydi | | Tanlov tekshiruvi: 20–30 real savolda manba va javob to'g'riligi o'lchanadi |

**Speaker notes:**
Bu — RAGning eng underrated qismi. Yomon chunking → yomon RAG. **800 belgi** — odatda yaxshi standart (LangChain RecursiveCharacterTextSplitter). 120 belgilik **overlap** bilan: chunklar bir-biriga ozgina kirib turadi, kontekst yo'qolmaydi. Bu 16-slaydda "tez-tez uchraydigan xato" sifatida qaytib chiqadi. Bot 01 ham aynan 800/120 sozlamada quriladi.

---

## Slide 10 — Bosqich 3 · Embedding va saqlash

**Sarlavha:**
**Bosqich 3** — har chunkni vektorga aylantirib, **vector DB**ga saqlash.

**Lead:**
Bu — bir martalik tayyorgarlik bosqichi. Hujjat o'zgarmaguncha qayta-qayta qilmaymiz.

**Flow (3 step):**

1. ✂️ **Chunk** — "Avtokredit foizi yillik 18%..."
2. → 🔢 **Embedding modeli** — matn → vektor (raqamli "ma'no izi")
3. → 🗄️ **Vector DB** — pgvector / Pinecone / Chroma — har chunk va vektori saqlanadi

**Tagline:**
→ **Muhim qoida:** hujjatni saqlashda ham, savolni qidirishda ham bir xil embedding modeli ishlatiladi. Indekslash bir marta — qidirish million marta.

**Speaker notes:**
Embedding modeli muhim — ishlatishda **bir xil model** ikkala tomonda turishi kerak (saqlashda va savol qidirishda). Aks holda vektorlar bir-biriga mos kelmaydi va retrieval xato qiladi. Bot 01 da `gemini-embedding-001` ishlatamiz, hammasida bir xil. Vector DB esa — saqlovchi joy. Keyingi slaydda 3 ta variant.

---

## Slide 11 — Bosqich 4 · Savol kelganda

**Sarlavha:**
**Bosqich 4** — savol kelganda **4 ta** harakat.

**Lead:**
Foydalanuvchi savol berdi. Ichida nima bo'ladi:

**Flow (4 step):**

1. 💬 **Savol** — "Avtokredit foizi qancha?"
2. → 🔢 **Embedding** — savolni vektorga aylantirish
3. → 🔍 **Yaqin bo'laklar** — vektor DB'dan eng yaqin chunklar topiladi
4. → 🧠 **Generation** — topilgan bo'laklarga tayanib javob + manba

**Tagline:**
→ Tezlik deploymentga bog'liq (model, tarmoq, DB). Bank uchun asosiy metrika — **javob va manba to'g'riligi**, sekundlar emas.

**Speaker notes:**
Bu — har savol uchun qaytariladigan oqim. Top-3 — odatiy boshlang'ich, top-5 ham ishlaydi. Top-1 — kam, top-10 — shovqin (xato javob xavfi). Generation bosqichida Gemini'ga "**faqat berilgan chunklar asosida**" deb aniq aytamiz (system prompt). Topilmasa — "topilmadi" deydi, taxmin qilmaydi. Bu — gallyutsinatsiyaga qarshi himoya devori.

---

## Slide 12 — Vector DB tanlash

**Sarlavha:**
Vector DB — 3 ta nomzod, 4 mezon bilan tanlanadi.

**Lead:**
"Eng yaxshi" bitta javobi yo'q. Qaror 4 mezon bilan olinadi: **ma'lumot qayerda saqlanadi** · **audit log bormi** · **jamoa qaysi texnologiyani qo'llab-quvvatlay oladi** · **yuklama va xarajat**.

**3 ta sec kartochka:**

- 🐘 **Supabase pgvector**
  PostgreSQL ekotizimi bor jamoalar uchun nomzod. O'zingizning serveringizda turadi.
  Tavsiya: Postgres ekotizimi bor jamoa.

- 🌲 **Pinecone**
  Boshqariladigan servis kerak bo'lsa nomzod. Ma'lumot bulutda — muvofiqlik tekshiruvidan keyin.
  Tavsiya: muvofiqlik tasdig'idan keyin.

- 🧪 **Chroma / In-Memory**
  O'quv mashqi va prototip uchun. n8n ichida tayyor turadi — bugungi mashqda shu tanlov.
  Tavsiya: mashq · prototip · production qarori emas.

**Speaker notes:**
Bugungi mashqda **In-Memory** vector store ishlatamiz (n8n tomonidan beriladi, bot 01 shu sxemada qurilgan). Sabab: hech qanday qo'shimcha sozlash kerak emas, n8n workflow ichida turadi. Production uchun Supabase pgvector — bank uchun sertifikatlangan, mahalliy serverda turadi. Pinecone — tezroq, lekin ma'lumot bulutda. Tanlovni muvofiqlik bo'limi bilan kelishish kerak (3-modulga ko'prik).

---

## Slide 13 — Production arxitektura · BankRAGBoti

**Chip:** BankRAGBoti · production · n8n

**Sarlavha:**
Real bot — **9 node Q&A oqimi** + 4 ta AI subkomponenti.

**Lead:**
Stoldagi 5 node — boshlanish. Production bot Telegramdan kirish, ruxsatni tekshirish, marshrut, RAG va admin oqimini bitta workflow'da boshqaradi.

**3 tier — production architecture:**

```
INGRESS (5 node)
Telegram Trigger → Parse Input → Lookup Admin → Compute Route → Route Switch (14)
                                                                         ↓ Q&A (1/14)

Q&A CORE — RAG ishlaydigan joy (LangChain agent + 4 subkomponent)
┌──────────────────┐   ┌──────────────────────┐
│   Q&A AI Agent   │ ← │ Gemini Chat Model    │ (LLM)
│  (LangChain)     │ ← │ Bank PDF Search      │ (RAG tool)
│                  │   │  ↳ Vector Store      │ (in-memory)
│                  │   │  ↳ Gemini Embeddings │ (768-d)
└──────────────────┘   └──────────────────────┘

EGRESS (2 node)
QA Format Reply → Send Reply → Foydalanuvchi
```

**Meta chiplari:**
- 77 node · butun workflow
- 14 marshrut · Q&A · admin oqimi (Add / Delete / Reindex / Stats)
- Stol mashqi: `../bots/01_rag_basics` · workflow: BankRAGBoti

**Speaker notes:**
Bu slayd — qoidaning kuchini ko'rsatadi: Q&A oqimida 9 ta node bor, lekin yarmi RAG bilan emas, **ruxsat boshqaruvi** bilan band (Lookup Admin, Compute Route, Route Switch). Production bot — bu hech qachon "5 node" emas: u hujjatni kim qo'sha oladi, kim ko'ra oladi, kim o'chira oladi degan savollarga javob bergan tizim.

Q&A CORE qismi — markaz. Bir narsa diqqat bilan: AI Agent **o'zi qaror qabul qilmaydi** — u tooliga (Bank PDF Search) "manba top" deb buyuradi, manba topilsa, javobni faqat shu manbaga tayanib yozadi. Embedding va Vector Store — Bank PDF Search'ning ichki mexanizmi: matn qanday topiladi.

Stollarga: `../bots/01_rag_basics/` — bu workflow'ning soddalashtirilgan o'quv versiyasi. Production workflow ID: `kLcPx1CZX9RwH1z8` (BankRAGBoti). Stol bot'ini muvaffaqiyatli yig'gandan keyin, production'ga o'tish — Lookup Admin, Route Switch va admin oqimini qo'shish demakdir.

Vaqt: 5-6 daqiqa. Ko'rsating, savollarga javob bering, keyin slide 14 (Quality / CANDO).

---

## Slide 14 — Sifat tekshiruvi · RAG qachon ishlaydi?

**Sarlavha:**
RAG qachon ishlaydi — qachon **ishlamaydi**.

**Lead:**
Hech bir vosita universal emas. RAG'ning kuchli va zaif tomonini bilsak — kutishlarni to'g'ri belgilaymiz.

**2 ta cando ustun (5+5):**

✓ **Yaxshi ishlaydi:**
- Hujjatda aniq yozilgan faktlar (foiz, summa, sana)
- "Qayerda yozilgan?" tipidagi savollar
- Shartnoma bandlari, qoidalar, tariflar
- FAQ tipidagi takrorlanuvchi savollar
- Bir mavzu ichidagi 5–10 betlik hujjatlar

✗ **Yomon ishlaydi:**
- Bir nechta hujjatlarni taqqoslash ("qaysi tarif foydaliroq?")
- Hisob-kitob talab qiladigan savollar
- Muddati o'tgan hujjat (RAG bilmaydi)
- Real-time ma'lumot (bugungi kurs)
- Mantiqiy zanjir bo'yicha xulosa chiqarish

**Speaker notes:**
Bu — 1-modul slayd 7 (Can/Cannot) ning RAG-ga moslashtirilgan versiyasi. Auditoriyaga ishonch beradi: "men botga nima ishonib topshira olaman?". Birinchi ustun — RAG **kuchli** joyi. Ikkinchi ustun — agent yoki pipeline kerak (10–12 modullarga ko'prik). Misol bilan tasdiqlang: "Qaysi tarif foydaliroq?" — bu **hisob-kitob va taqqoslash**, RAG yetmaydi. 10-modulda agent qo'shamiz, **Tool Use** bilan kalkulyator chaqiramiz.

---

## Slide 15 — Live build · stol mashqi

**Chip:** Interaktiv · Stollar bo'yicha

**Sarlavha:**
Endi navbat **sizga** — har stol o'z botini quradi.

**3 ta savol (s-brain pattern):**

- **01** — Sizning bo'limingizdan **qaysi PDFni** botga yuklaysiz? (Bitta, 10–15 bet.)
- **02** — Test uchun **3 ta savol** o'ylab ko'ring. Botning natijasini real bilim bilan solishtirasiz.
- **03** — Ishlamasa — qaysi bosqich xato qildi? Chunking? Retrieval? Prompt?

**Tagline:**
→ 10 daq qurish · 5 daq test · 3 daq stollararo hisobot.

**Speaker notes:**
Modulning amaliy yuragi. 30 daqiqa, har stolda 4–5 kishi. Vazifa: USER pathni n8n'da yig'ish (bot 01 shabloni klonlangan), o'z PDFlarini /add_doc orqali yuklash, 3 ta test savol berish. Yordamga 1–2 ta yordamchi bilan yuring (orchestrator). Hisobot bosqichida har stol qisqacha aytadi: PDF nima edi, qaysi savol yaxshi ishladi, qaysi savol — yo'q. Bu auditoriyada o'z-o'zidan paydo bo'lgan retrospektiv. Eng kerakli bilim shu yerdan keladi, slaydlardan emas.

---

## Slide 16 — Tez-tez uchraydigan 4 xato

**Sarlavha:**
4 ta xato — **oldindan** bilsak, oldini olamiz.

**4 ta myth qator (afsona ↔ tuzatish):**

- ✗ **Xato:** Chunk hajmi juda katta — "10 betlik bo'lak, kontekst yetadi"
  ✓ **Tuzatish:** ~500–800 belgilik bo'lak + kichik overlap. Katta chunk → noaniq retrieval, sekin generation.

- ✗ **Xato:** Saqlash va qidirishda **har xil** embedding modeli
  ✓ **Tuzatish:** Bir xil model ikkala tomonda. Aks holda vektorlar mos kelmaydi.

- ✗ **Xato:** Top-K ni "ko'r-ko'rona" qo'yish — sinov yo'q
  ✓ **Tuzatish:** Top-3 dan boshlang, keyin **test qiling**. Manba o'tkazib yuborilsa → Top-K yoki chunk hajmini oshiring; ortiqcha shovqin → Top-K ni kamaytiring.

- ✗ **Xato:** "Topilmadi" javobiga ruxsat bermaslik
  ✓ **Tuzatish:** System prompt'ga: "manbada yo'q bo'lsa — 'topilmadi' deb ayt". Gallyutsinatsiyaning oldini oladi.

**Speaker notes:**
Bu — orchestrator sifatida o'zim eng ko'p ko'rgan 4 xato. Birinchi va to'rtinchi — eng halokatli. "10 betlik chunk" — bot sekin va xato. "Topilmadi" javobiga ruxsat bermaslik — bot **o'ylab topishni boshlaydi** (gallyutsinatsiya, 3-modul). System prompt'da aniq band yozish — bot 01 prompts/system-prompt.md da namuna bor.

---

## Slide 17 — Mini-recap · bugun → keyin

**Sarlavha:**
Bugun siz quryapsiz —
ertaga **agent**ga aylanadi.

**Lead:**
Bugungi RAG bot — siz qurgan birinchi to'liq AI ish tizimi. Hozir oddiy, ammo tez kengayadi.

**3 ta benefit kartochka:**

- 🟢 **Bugun**
  RAG bot · 5 node · USER + ADMIN path · ichki PDF bilim manbai.

- 🔵 **Bo'lim uchun**
  Bo'limdagi takrorlanuvchi savollarning qaysi qismi RAGga mos kelishini **test savollari orqali o'lchaysiz** — keyin pilotga.

- 🟡 **10-modul · keyingi qadam**
  Bugungi botga **fikrlash qatlami** (agent) qo'shamiz: kerakli asbobni tanlash, ko'p qadamli rejalashtirish — **Tool Use**.

**Speaker notes:**
Bu — 10-modulga ko'prik. Bugungi bot **statik** — savol kelsa, RAG ishlaydi, javob qaytaradi. Agent — **dinamik**: bot fikrlaydi, kerakli asbobni tanlaydi (Tool Use), bir nechta qadam qo'yadi. Lekin barcha agentlarning ostida shu RAG turadi. Bugungi qurganingiz — keyingi 5 modulning **fundamenti**. Auditoriyaga ko'prik tashlang: "10-modulda biz shu botga 'fikrlash qatlamini' qo'shamiz".

---

## Slide 18 — Closing · 3 xulosa + lug'at recap

**Sarlavha:**
Bugungi mashg'ulotdan **3 ta asosiy** xulosa.

**3 ta xulosa (close-row, blue accent border-left):**

- 💡 **RAG = avval manbani top, keyin javob yoz.** Gallyutsinatsiya xavfini kamaytiradi, lekin **nolga tushirmaydi** — har bot test savollari + manba havolasi bilan qabul qilinadi.
- 💡 **4 bosqich:** indexing → chunking + embedding → retrieval → generation. Hammasi n8n'da, 5 ta node bilan.
- 💡 **Bugungi yakun — ishlagan bot emas, qaror varaqasi.** Har stol topshiradi: hujjat, 5 ta test, javob/manba natijasi, xavflar, keyingi qaror.

**RAG pilot qaror varaqasi (5 mezon, har stol):**
1. **Use case** — qaysi bo'lim, qaysi savollar?
2. **Manba** — hujjat nomi, versiya sanasi, egasi.
3. **Test** — nechta savoldan nechtasi to'g'ri manbani topdi?
4. **Xavf** — maxfiylik, xato javob, eskirgan hujjat.
5. **Qaror** — pilotga ruxsat / qayta ishlash / rad etish.

**Lug'at recap (interaktiv, 30–60 sek):**
Auditoriyaga so'rang: "Eslay olasizmi?"
- **RAG** = … (jamoa: "avval manbani top, keyin shu manbaga tayangan javob yoz")
- **Embedding** = … (jamoa: "matnni ma'nosi bo'yicha qidirish uchun raqamli vektorga aylantirish")

**Speaker notes:**
3 xulosa — qisqa, takror aytsa bo'ladi. Har biriga 10–15 soniya. Lug'at recap — series-wide qoida. RAG va Embedding — 9-modulning bank glossary'siga qo'shilishi. Auditoriya birgalikda aytadi: "RAG — bu qidir va javob bil". Tovushda kuchaytirib aytish — yodda qolish kafolati. 15-modulda yakuniy glossary review da bu 2 atama qaytib chiqadi.

---

## Slide 19 — Q&A

**Vizual:**
Markaziy katta **"?"** belgisi (blue accent), ostida sarlavha va kontakt.

**Sarlavha (markazlashgan):**
Sizning **savollaringiz**.

**Tagline:**
RAG, n8n, vector DB tanlovi, muvofiqlik — marhamat.

**Kontakt:**
murod@mohir.dev

**Speaker notes:**
5–10 daqiqa, 60 daqiqalik normaning yakuni. Texnik savollar ko'p kelishi mumkin (bu kunning eng texnik moduli). Ko'p uchraydigan savollar:
- "Vector DB qaysisini tanlash kerak?" → 12-slaydga qaytaring.
- "PDF qaerda saqlanadi?" → muvofiqlik, 3-modulga ko'prik.
- "Bot xato javob bersa nima qilamiz?" → 16-slaydga (4 xato).
- "Agentdan farqi nima?" → 10-modulga ko'prik (ertaga).

Agar savol kelmasa — siz so'rang:
- "Qaysi bo'limingiz uchun bot eng tez foyda keltiradi?"
- "Qaysi PDFni botga ishonib topshira olasiz?"

---

## Series-wide bog'lanish

- **Avvalgi modullar:**
  - 1-modul slayd 8 — RAG flow ilk ko'rilgan. Bugun chuqur ochildi.
  - 3-modul — Gallyutsinatsiya. RAG aynan shu muammoning yechimi.
  - 8-modul — n8n + Webhook. Bugun shu node'lar ishlatildi.
- **Keyingi modullar:**
  - [`10_deck/`](../10_deck/) — Agent kontseptsiyasi (ertaga RAG → Agent).
  - [`12_deck/`](../12_deck/) — Pipeline (multi-step). Bugungi bot multi-stepga aylanadi.

## Atamalar — kursning glossary'siga hissa

- **RAG** (Retrieval-Augmented Generation) — slayd 5 da kiritildi, slayd 18 da recap.
- **Embedding** (vektor ko'rinishi) — slayd 5 va 6 da kiritildi, slayd 18 da recap.

## Tayyorgarlik checklist

- [ ] Bot 01 (`bots/01_rag_basics/`) instructorda ishlayapti.
- [ ] Har stolda 1 ta test PDFi tayyor (10–15 bet).
- [ ] n8n cloud akkaunt har stolda ochiq, BankRAGBoti shabloni klonlangan.
- [ ] Telegram bot tokeni har stolga 1 dona (BotFather).
- [ ] Backup: agar Telegram'da muammo bo'lsa — n8n test pin data orqali demo.

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Anatomiya (Hook → vs RAG → Lug'at → Embedding → Arxitektura) | 3–7 | ~14 daq |
| 03 · Bosqichli qurish (Indexing → Chunking → Embedding → Retrieval → DB → n8n) | 8–13 | ~22 daq |
| 04 · Test (Sifat → Live build → Xato → Recap → Closing → Q&A) | 14–19 | ~21 daq |
| **Jami** | **19** | **~60 daq** |

---

## Restructure tarixi

**v1 (2026-05-08):**
- Stub'dagi 1–2 slaydlardan boshlandi (Kun 2 chip, agenda 4 faza).
- 19 slaydli to'liq versiya — series-brief 9_deck spetsifikatsiyasiga to'liq mos.
- RAG arxitekturasi 1-modul slayd 8 dagi 4 step flow'dan kelib chiqdi va to'rt alohida slaydga (8–11) chuqurlashtirildi.
- Atamalar (RAG, Embedding) — slayd 5 ga `.dict.dict-2` pattern'i bilan kiritildi (3-deck pattern reuse).
- Live build (slayd 15) — `s-brain` + screenshot mockup; bot 01 README-ga ishtirokchilar yo'naltiriladi.
- Closing — `.s-close` + `.recap` row, RAG va Embedding jamoa bilan birga aytiladi.

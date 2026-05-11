# 9-modul · Oddiy SI ish tizimini yaratish — to'liq kontent

**Module:** 9-modul · Kun 2 · 9:00–10:00 (60 daqiqa)
**Format:** Bosqichli qurish (step-by-step build)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Telegram + Gemini + Google Sheets + n8n
**Slaydlar soni:** 19 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Classification (Tasniflash)**, **Schema (Sxema)** — slayd 5 da kiritiladi, slayd 18 da recap
**Paired bot:** [`bots/01_classifier_bot/`](../bots/01_classifier_bot/) — BankYordamchi (7 node, no code)

> Asosiy g'oya: kechagi RAG bot kuchli edi, lekin murakkab. Bugun har bir ishtirokchi 7 ta node bilan o'z birinchi botini quradi — mijoz xatlarini avtomatik tasniflaydi va to'g'ri operatorga uzatadi.

---

## Slide 1 — Title

**Sarlavha:**
Oddiy SI **ish tizimini** yaratamiz.

**Eyebrow / chip:**
Kun 2 · 9:00 — 10:00

**Tagline:**
Birinchi to'liq SI ish tizimini bosqichma-bosqich quramiz.

**Speaker notes:**
Auditoriyaga "ikkinchi kun, qo'l ostiga olamiz" tonini bering. Birinchi kun konseptual edi — bugun amaliyot. Modul oxirida har stolda **ishlaydigan** Telegram bot bo'ladi. Slaydda "bosqichma-bosqich" so'ziga urg'u bering — qo'rquv pasayadi.

---

## Slide 2 — Agenda

**Sarlavha:**
Mavzuning **yo'l xaritasi**.

**Eyebrow:** Agenda · 9-modul

**4 faza (2×2 grid, klikable card):**

1. **01 — Tushuncha** · ~12 daq
   Bot nima qiladi: erkin javob emas — sof JSON. Tasniflash va Schema atamalari bankir tilida.
   *(slaydlar 3–6)*

2. **02 — 7 ta node** · ~18 daq
   Telegram → Gemini → Sheets. Har node nima qiladi — alohida ochib ko'ramiz.
   *(slaydlar 7–13)*

3. **03 — Live build** · ~20 daq
   Har stol n8n'da o'z BankYordamchi'ni yig'adi — 15–30 daqiqa, kod yozmasdan.
   *(slaydlar 14–15)*

4. **04 — Yakun** · ~10 daq
   Sifat: qachon ishlaydi/qachon yo'q, 4 ta xato, mini-recap, lug'at va Q&A.
   *(slaydlar 16–19)*

**Speaker notes:**
60 daqiqani 4 fazaga bo'lib ko'rsating. "Tushuncha"ni qisqa, "7 ta node"ni eng katta texnik blok, "Live build"ni amaliy yurak qilib aniqlang.

---

## Slide 3 — Hook · "Kechagi RAG → bugungi classifier"

**Chip:** Live recall · kechagi demo

**Sarlavha:**
Kechagi RAG bot — kuchli, lekin **murakkab**.

**Vizual elementlar:**
- Chap tomonda QR-kod katakchasi (1-modul demosi · t.me/bankragbot · hali tirik).
- O'ng tomonda — chat bubble: kechagi RAG (77 node, 2 soat) → bugungi classifier (7 node, 15–30 daq).

**Demo savol (italik):**
> "Avtokredit foizi qancha?"

**Tagline:**
→ Kechagi RAG bot — qancha kuchli bo'lsa, shuncha murakkab. Bugun siz oddiyroq, ammo amaliy botni quryapsiz: 15–30 daqiqada.

**Speaker notes:**
Auditoriyaga 1-modul demosini eslating. Bot bank PDFiga qarab javob bergan edi — lekin u 77 node, vector store, 2 soatlik qurish edi. Ko'pchiligimiz bunday bilan boshlay olmaymiz. Bugun **birinchi qadam** — 7 node, kod yo'q, 15 daqiqada ishlaydi. Mijoz xatlarini avtomatik tasniflash va to'g'ri operatorga uzatish — bank uchun konkret ish.

---

## Slide 4 — Erkin javob vs Strukturali javob

**Sarlavha:**
Erkin javob — odamga.
**Strukturali javob** — tizimga.

**Lead:**
Bugungi botning siri shunda: AI ixtiyoriy matn yozmaydi. U faqat aniq maydonlarni to'ldiradi — toifa, mavzu, tafsilot, shoshilinchlik. Shu sof JSONni Sheets to'g'ridan-to'g'ri saqlaydi va operatorni topadi.

**Compare bloki:**
| Erkin javob (odam o'qiydi) | → | Strukturali javob (tizim o'qiydi) |
|---|---|---|
| "Avtokredit borasida sizga yordam beraman, foiz stavkasi turlicha bo'lishi mumkin..." | | `{"category":"kredit","subject":"Avtokredit so'rovi","urgency":"medium"}` |
| Chiroyli matn, lekin tizim o'qiy olmaydi | | Aniq maydonlar · Sheets'ga to'g'ri yoziladi · operator filter avtomatik ishlaydi |

**Speaker notes:**
Bu — bugungi ish tizimining yuragi. Mijoz xohlagancha yozadi (har xil so'zlar, har xil grammatika), AI esa **bir xil shaklda** javob beradi. Shu bir xillik tufayli Sheets'ga avtomatik joylanadi va operator topiladi. "Erkin matn — chiroyli; strukturali matn — foydali" g'oyasini ovozda kuchaytiring.

---

## Slide 5 — Atama lug'ati · Classification + Schema

**Chip:** Bugungi 2 ta atama

**Sarlavha:**
Kunning ikki kalit so'zi — **Classification** va **Schema**.

**Lead:**
Classification — bot nima qiladi. Schema — bot qanday formatda javob beradi. Ikkalasi birga — birinchi ish tizimingizning poydevori.

**2 ta dict-card:**

- **Classification** — *Tasniflash · so'rovni toifaga ajratish*
  Bankir tilida: "**kelgan xatni 5 turdan biriga yo'naltirish**". 1000 ta mijoz xati keldi — bot har birini avtomatik kredit / karta / depozit / shikoyat / info dan biriga ajratadi. Operator faqat o'zining toifasini ko'radi.

- **Schema** — *Sxema · javob uchun qat'iy shakl*
  Bankir tilida: "**AI erkin matn yozmaydi, faqat kelishilgan kataklarni to'ldiradi**" — toifa, mavzu, tafsilot, shoshilinchlik. Shu sabab Sheets ustunlari adashmaydi va operator avtomatik topiladi. Maydonlar: `category, subject, details, urgency`.

**Speaker notes:**
2 atama, 2 daqiqa. **Classification** — eski biznes atamasi. Bank ham allaqachon shikoyatlarni "kredit / karta / boshqa" deb ajratadi — qo'lda. Bot shu ishni avtomatik qiladi. **Schema** — yangi atama. AIga "ixtiyoriy javob berma — aynan shu maydonlarni to'ldir" deyishning rasmiy nomi. n8n'da Output Parser qatlami nazorat qiladi — sxemaga mos kelmasa, AI qayta so'raydi. 18-slaydda jamoa bilan birga takrorlaymiz.

---

## Slide 6 — Schema misoli · matn → JSON

**Sarlavha:**
**Schema** misoli — mijoz xati JSONga aylanadi.

**Lead:**
Mijoz qanday yozsa — bot bir xil 4 ta maydonni to'ldiradi. Erkin matn yo'q · faqat strukturali ma'lumot.

**3 ta misol qator:**

| Mijoz xati | JSON (Schema bo'yicha) | Toifa |
|---|---|---|
| "Avtokredit olmoqchiman, 50 mln so'mga, 5 yilga" | `{category:"kredit", subject:"Avtokredit so'rovi", urgency:"medium"}` | kredit ✓ aniq |
| "Kartam yo'qoldi tezda blokirovka qiling!!!" | `{category:"karta", subject:"Yo'qolgan karta", urgency:"high"}` | karta ✓ shoshilinch |
| "Omonat foizi qancha?" | `{category:"depozit", subject:"Omonat foizi", urgency:"low"}` | depozit ✓ ma'lumot |

**Tagline:**
→ Sheets'ning ustun nomlari shu kalitlarga to'liq mos: category · subject · details · urgency. Saqlash avtomatik.

**Speaker notes:**
3 ta haqiqiy misol. Diqqat: har xat har xil tarzda yozilgan (formal, shoshilinch, qisqa savol), lekin chiqish — bir xil shaklda. Bu — Schema'ning kuchi: AI nima qilsa ham, format barqaror. **Urgency** maydoni alohida muhim — `high` shoshilinch keysni darhol ajratadi (yo'qolgan karta), `low` faqat ma'lumot so'rovi (foiz). Shu bilan operator avval shoshilinchni ko'radi.

---

## Slide 7 — Classifier arxitekturasi · 7 node

**Sarlavha:**
BankYordamchi — **7 ta node**, bitta yo'nalish.

**Lead:**
Telegram → AI tasniflaydi → Sheets'dan operator topadi → ariza saqlanadi → mijozga javob. Markazda Gemini turadi; har node n8n'da 1–2 daqiqada sozlanadi, murakkab dasturlash yo'q (faqat bitta tayyor skript copy-paste).

**Flow (4 ta blokda 7 node):**

1. 💬 **1 · Telegram** — mijoz xatini qabul qiladi
2. → 🧠 **2 · Gemini** — xatni tasniflaydi · JSON chiqaradi (markazda · brain)
3. → 📋 **3–4 · Operator** — Sheets'dan filter · birinchisini oladi
4. → 📤 **5–7 · Saqla + javob** — ariza yoziladi · operator nomi bilan javob mijozga

**Speaker notes:**
Bu slayd butun botning xaritasi. Keyingi 4 slaydda har blokni alohida ochamiz. Asosiy fikr: **bitta yo'nalish, hech qanday shartli o'tish yo'q**. Mijoz xat yozadi → 7 node ketma-ket ishlaydi → mijozga javob qaytadi. Bu — eng oddiy AI workflow shakli, "linear pipeline".

---

## Slide 8 — Bosqich 1 · Telegram trigger

**Chip:** Bosqich 1 / 4 · Telegram trigger

**Sarlavha:**
Mijoz xati **qaerdan** keladi?

**Lead:**
Eng birinchi node — Telegram trigger. Mijoz botga xabar yozsa, n8n shu joyda "uyg'onadi" va keyingi qadamlarni ishga tushiradi. Sozlash bir martalik.

**3 ta benefit kartochka:**

- 🤖 **BotFather token**
  Telegramda @BotFather ga "/newbot" yozasiz · bot nomi va token oladingiz · n8n credentialiga kiritasiz. 2 daqiqalik ish.
  Misol: BankYordamchiBot · token: 78034:AA...XYZ

- 🔔 **updates: ["message"]**
  Trigger faqat oddiy xabarlarga uyg'onadi — komanda, tugma yoki callback emas.
  Misol: mijoz "Avtokredit kerak" deb yozsa — workflow boshlanadi

- 📨 **Chiquvchi ma'lumot**
  Trigger keyingi node'larga taqdim etadi: chat_id, first_name, message.text.
  Misol: chat_id: 123456789 · text: "Kartam yo'qoldi"

**Speaker notes:**
Eng tabiiy savol: "bot tokenini qaerdan olamiz?". @BotFather Telegramning rasmiy bot yaratuvchisi — "/newbot" ni yozsangiz, ikki savol so'raydi (nom va username), keyin token beradi. n8n'da "Telegram Trigger" node'ga shu tokenni kiritasiz. Ishga tushgandan keyin har xat avtomatik n8n'ga uchadi. Production uchun Telegram token — maxfiy, bank ichki sertifikatlash bilan saqlanadi.

---

## Slide 9 — Bosqich 2 · LLM Chain · Gemini tasniflaydi

**Chip:** Bosqich 2 / 4 · LLM Chain · Gemini

**Sarlavha:**
Botning **miyasi** — Gemini xatni tasniflaydi.

**Lead:**
Basic LLM Chain node ichida Gemini turadi. System prompt unga 5 ta toifani aytadi va sof JSON chiqarishini buyuradi. Output Parser javobni schema bo'yicha tekshiradi — boshqa format chiqsa, qayta so'raydi.

**Compare bloki:**

✗ **Erkin javob · ishonchsiz:**
- "Kelgan xatga qarab kredit yoki karta bo'limi bilan bog'lanish kerakdek..."
- Sheets'ga to'g'ri yozib bo'lmaydi · har xat har xil format
- Tizim qarshi tomondan o'qiy olmaydi · operatorni avtomatik topib bo'lmaydi

✓ **Schema bo'yicha JSON:**
- `{"category":"kredit","subject":"...","details":"...","urgency":"medium"}`
- 5 toifa: kredit · karta · depozit · shikoyat · info
- temperature: 0.2 — kam ijodkorlik · barqaror tasniflash · har xat bir xil tarzda

**Speaker notes:**
Bu — botning yuragi. **Basic LLM Chain** — n8n'ning oddiy LLM node'i. Unga uchta narsa biriktiramiz: (1) Gemini Chat Model — javobni kim yozadi, (2) System prompt — qanday qoidalar bilan, (3) Output Parser — JSON sxemasi. **Temperature: 0.2** — past ijodkorlik. Yuqori bo'lsa AI har xil javob beradi, biz bir xillik xohlaymiz. System prompt to'liq matni paired bot folder'ida (`prompts/system-prompt.md`).

---

## Slide 10 — Bosqich 3 · Operator topish · Sheets'dan o'qish

**Chip:** Bosqich 3 / 4 · Operatorni topish

**Sarlavha:**
Toifaga mos **operatorni** Sheets'dan olamiz.

**Lead:**
Gemini "kredit" deb ajratdi — endi Operators jadvalidan kredit toifasidagi faol operatorni topish kerak. Filter ikki shart bilan ishlaydi: toifa (category) + active=TRUE.

**Flow (3 step):**

1. 📋 **Read Operators** — Sheets node · Operators jadvalini o'qiydi
2. → 🔍 **Filter** — `category={{$json.category}} AND active=TRUE` (markazda · brain)
3. → 👤 **Code (Pick Operator)** — Code node · tayyor 8 qatorli skript copy-paste · birinchi qatorni oladi · bo'sh bo'lsa "Tayinlanmagan"

**Tagline:**
→ Operators jadvalini siz to'ldirasiz — bo'limga yangi xodim qo'shilsa satr qo'shasiz, ketsa active=FALSE qilasiz. Bot sizning sozlamangizni quvib boradi.

**Speaker notes:**
Bu — botning eng "amaliy" qismi. **Operators jadvali — siz boshqaradigan ma'lumot**. Hech qanday kod, hech qanday cron, hech qanday admin paneli kerak emas: Google Sheets ochilgan, satrni tahrirlaysiz, bot keyingi xatdayoq yangi qatorni ishlatadi. Code node'da fallback: agar sheet bo'sh bo'lsa yoki active=FALSE bo'lsa, "Tayinlanmagan" yoziladi va admin keyin qo'lda biriktiradi.

---

## Slide 11 — Bosqich 4 · Saqlash + javob yuborish

**Chip:** Bosqich 4 / 4 · Saqlash + javob

**Sarlavha:**
Ariza **saqlanadi**, mijozga javob qaytadi.

**Lead:**
Operator topildi — endi 3 ta yakuniy node. Applications jadvaliga to'liq satr qo'shamiz, javob matnini tuzamiz va Telegram orqali mijozga jo'natamiz.

**Flow (3 step):**

1. 📥 **Append Application** — Sheets'ga to'liq satr: vaqt, mijoz, toifa, mavzu, operator
2. → ✍️ **Format Reply** — Edit Fields (sobiq Set) node · Uzbek matn shabloni: "Salom! Operatoringiz: ..."
3. → 📤 **Telegram Send** — mijozga javob jo'natiladi · operator nomi va kontakti bilan (markazda · brain)

**Tagline:**
→ Sheets ustun nomlari JSON kalitlariga to'liq mos · autoMapInputData avtomatik joylaydi · Code node yozish shart emas.

**Speaker notes:**
Yakuniy 3 node — eng oddiy. **Append Application** Sheets'ning ustun nomlarini JSON kalitlariga avtomatik moslashtiradi — qo'lda bog'lanish yo'q. **Format Reply** — oddiy matn shabloni: `"Salom, {{user_name}}! Sizning operator: {{operator_name}}, kontakt: {{operator_contact}}. 24 soat ichida bog'lanamiz."`. **Telegram Send** — chatId Trigger'dan olinadi, text — Format Reply'dan. Ish tugadi.

---

## Slide 12 — Google Sheets schema · Operators + Applications

**Sarlavha:**
Botning butun "xotirasi" — **2 ta varaq**.

**Lead:**
Bitta Google Sheets fayli, ikki varaq. Birinchisini siz to'ldirasiz (operatorlar ro'yxati bo'limga ko'ra), ikkinchisini bot to'ldiradi (har mijoz xati). Database yo'q · Drive yo'q · ortiqcha integratsiya yo'q.

**3 ta sec kartochka:**

- 👥 **Operators (siz to'ldirasiz)**
  Har toifaga kim mas'ul · 6 ustun: operator_id, name, category, contact, active, notes.
  Misol: Aziza Karimova · kredit · +998 90 ... · TRUE

- 📥 **Applications (bot to'ldiradi)**
  Har mijoz xati — bir satr · 11 ustun: timestamp, chat_id, user_name, category, subject, details, urgency, status, operator_name, operator_contact.
  Misol: demo paytida varaqni o'zgartirmang — bot yozyapti

- ⚙️ **Avtomatik bog'lanish**
  Sheets ustun nomlari JSON kalitlariga aynan mos · n8n autoMapInputData rejimida ishlaydi.
  Misol: yangi toifa qo'shsangiz — Operators'ga satr qo'shing, system prompt'ga bandni qo'shing — kod tegmaydi.

**Speaker notes:**
Bank uchun bu eng muhim slayd: **bot ma'lumotlari qaerda**. Javob — bitta Google Sheets fayl, bank boshqaradi (kirish huquqi bo'limning admin xodimida). Demo rejimida mijoz xati Gemini API'ga tasniflash uchun yuboriladi, natija bank Sheets'iga yoziladi. **Production uchun alohida qaror kerak:** PII masking, token va Sheets huquqlari, audit log, ma'lumot saqlash muddati va komplaens roziligi. Operators jadvalini to'ldirish — administrator ishi, kod o'zgartirish kerak emas.

---

## Slide 13 — Bot xatni qanday qayta ishlaydi · 4 qadam

**Chip:** BankYordamchi · mijoz yo'li · 4 qadam

**Sarlavha:**
Bot xatni **qanday qayta ishlaydi**?

**Lead:**
Mijoz Telegramga xat yozadi. Bot to'rt qadamda ishlaydi — AI tasniflaydi · operator topiladi · ariza saqlanadi · javob qaytadi. Murakkab dasturlash yo'q.

**4 qadam (journey pattern):**

1. 💬 **Mijoz yozadi**
   Telegram orqali bo'sh matn — har xil tarzda.
   *"Kartam yo'qoldi tezda blokirovka qiling!!!"*

2. → 🧠 **AI tasniflaydi** *(brand-step · ko'k)*
   Gemini xatni o'qiydi va schema bo'yicha JSON chiqaradi.
   → category: karta · urgency: high

3. → 👤 **Operator topiladi** *(brand-step · ko'k)*
   Sheets'dan toifaga mos faol operator olinadi.
   → Bekzod Rahimov · +998 91 234 56 78

4. → 📤 **Javob yuboriladi**
   Ariza saqlanadi, mijozga operator nomi bilan javob qaytadi.
   *"Sizning operator: Bekzod Rahimov · 24 soat ichida bog'lanadi"*

**Atama tags:**
- **Classification** = 2-qadam · xatni 5 toifadan biriga ajratish
- **Schema** = JSON shakli · category, subject, details, urgency

**Production line:**
Bu — birinchi ish tizimingiz. 7 ta node, kod yo'q, 15–30 daqiqada qurasiz. Stol mashqi: `../bots/01_classifier_bot`.

**Speaker notes:**
Slayd 7 node arxitekturasini "bankir tilida" yana bir bor takrorlaydi. Endi auditoriya texnik tafsilotlardan emas, **mijoz tajribasidan** qaraydi. Yo'qolgan karta misolida "high" urgency'ning mantiqini ko'rsating: shoshilinch shikoyat → operator ro'yxatining boshida ko'radi. Atama tag'lar — ko'rinib turgan ko'prik (5-slayd lug'ati shu yerda amalda).

---

## Slide 14 — Sifat tekshiruvi · Classifier qachon yaxshi / qachon yomon

**Sarlavha:**
Classifier **qachon ishlaydi** — qachon ishlamaydi.

**Lead:**
Tasniflagich — bitta aniq vazifaga mo'ljallangan vosita. Kuchli va zaif tomonni bilsak — qaysi xatlar uchun ishlatib, qaysilarini insonga uzatishni to'g'ri belgilaymiz.

**2 ta cando ustun (5+5):**

✓ **Yaxshi ishlaydi:**
- Toifalar aniq va kam (5–7 ta)
- Bitta xatda — bitta niyat (kredit yoki karta)
- Strukturali ma'lumot kerak (Sheets, CRM ga yozish)
- Triage / yo'naltirish — operatorga uzatish
- Takrorlanadigan, oddiy mijoz xatlari

✗ **Yomon ishlaydi:**
- Bir xatda 2–3 niyat ("kredit + karta + shikoyat")
- Toifalar chegarasi noaniq (kredit/lizing farqi)
- Mijozga aniq javob kerak — hujjatdan (11-modul mavzusi)
- Hisob-kitob, taqqoslash, ko'p qadamli savol
- 50+ toifa · "agent" yondashuvi to'g'riroq (10-modul)

**Speaker notes:**
Bu — bot xaritasini to'g'ri belgilash uchun slayd. **Classifier — triage vositasi**, javob mashinasi emas. Mijoz "kreditim haqida" deb yozsa — bot kredit operatoriga uzatadi, ammo o'zi javob bermaydi. Agar mijoz aniq javob istasa (foiz, shartlar) — hujjatdan javob beradigan botni 11-modulda ko'ramiz. Agar mijoz bir nechta savol bersa — agent kerak (10-modul). Bu modul — eng oddiy holat: **bitta xat → bitta toifa → bitta operator**. Bank xizmati uchun bu hali ham juda foydali — chunki 80% xatlar shu shaklda.

---

## Slide 15 — Live build · stol mashqi

**Chip:** Live build · Stollar bo'yicha · 15–30 daq

**Sarlavha:**
Endi navbat **sizga** — har stol o'z BankYordamchi'sini yig'adi.

**3 ta savol (s-brain pattern):**

- **01** — n8n'da **7 ta node** ulang: Telegram trigger → LLM Chain → Sheets read → **Code** (Pick Operator) → Sheets append → **Edit Fields** → Telegram send.
- **02** — Operators sheet'iga **5 ta operatorni** kiriting — har toifaga bittadan (kredit, karta, depozit, shikoyat, info).
- **03** — Telegram'dan **3 ta xat** yuboring (kredit · karta yo'qoldi · omonat). Sheets'ga to'g'ri toifa va to'g'ri operator yozilishini tekshiring.

**Tagline:**
→ Instructor shablonidan boshlaymiz · har stolga tayyor Sheets template · 15 daq qurish · 10 daq test · 5 daq stollararo hisobot.

**Speaker notes:**
Modulning amaliy yuragi. 30 daqiqa, har stolda 4–5 kishi. Vazifa: bot 01 shabloni klonlangan n8n'da 7 node'ni ulash, Operators sheet'ini to'ldirish, 3 ta test xat yuborish. Yordamchilar (1–2 nafar) stol bo'yicha yuradi. Hisobot bosqichida har stol qisqacha aytadi: qaysi xat eng yaxshi tasniflandi, qaysi xat — chalkashlik kelirdi.

---

## Slide 16 — Tez-tez uchraydigan 4 xato

**Sarlavha:**
4 ta xato — **oldindan** bilsak, oldini olamiz.

**4 ta myth qator (xato ↔ tuzatish):**

- ✗ **Xato:** Gemini JSON o'rniga erkin matn qaytaradi · markdown bilan (` ```json ... ``` `) o'raydi
  ✓ **Tuzatish:** System prompt'ga aniq: "faqat sof JSON, markdown belgilari yo'q". Output Parser'ni yoqing — sxemaga mos kelmasa qayta so'raydi.

- ✗ **Xato:** Toifa Sheets'dagidan boshqa nom bilan chiqadi — "Kredit" yoki "credit" (Operators'da kredit)
  ✓ **Tuzatish:** 5 ta toifa nomini tek shaklda yozing — kichik harf, lotin: kredit/karta/depozit/shikoyat/info. Sheets ham xuddi shu format.

- ✗ **Xato:** Toifaga mos operator yo'q — Operators sheet bo'sh yoki active=FALSE
  ✓ **Tuzatish:** Code node'da fallback: bo'sh bo'lsa "Tayinlanmagan" yoziladi. Har toifaga kamida 1 ta faol operator. Ariza baribir saqlanadi — admin qo'lda biriktiradi.

- ✗ **Xato:** Sheets ustun nomlari JSON kalitlariga mos kelmaydi · qatorlar bo'sh tushadi
  ✓ **Tuzatish:** Ustun nomlari aynan: category, subject, details, urgency, operator_name... · autoMapInputData rejimi avtomatik joylaydi.

**Speaker notes:**
Bu — orchestrator sifatida o'zim eng ko'p ko'rgan 4 xato. Birinchi (markdown bilan o'rash) — eng halokatli, butun pipeline buziladi. To'rtinchi (ustun nomlari) — eng noaniq, satr saqlanadi lekin bo'sh keladi. Har xatga aniq tuzatish bering — "shu yerda to'xtang" emas, "shu kombinatsiyani yoqing".

---

## Slide 17 — Mini-recap · bugun → keyin

**Sarlavha:**
Bugun classifier —
keyin **agent va RAG**.

**Lead:**
Bugungi BankYordamchi — siz qurgan birinchi to'liq SI ish tizimi. 7 ta node · sof JSON · operator triage. Tez ishlaydi va tez kengayadi.

**3 ta recap-mini kartochka:**

- 🟢 **Bugun · 9-modul · BankYordamchi classifier**
  7 node · Telegram + Gemini + Sheets · 5 toifaga ajratadi · operator topadi · ariza saqlaydi · javob qaytaradi.

- 🔵 **Bo'lim uchun · Triage avtomatlashtiriladi**
  Mijoz xatlarining katta qismi takrorlanadi — bot ularni avtomatik toifaga ajratadi va to'g'ri operatorga uzatadi. Inson faqat murakkab keyslar bilan ishlaydi.

- 🟡 **10–11-modul · keyin · Agent + RAG**
  Bugungi botga fikrlash qatlami (10-modul · Agent · Tool Use) va hujjatdan javob (11-modul · RAG · Embedding) qo'shamiz.

**Speaker notes:**
Bu — keyingi 2 modulga ko'prik. Bugungi bot **statik, oddiy va to'g'ri** — har xat → toifa → operator. 10-modulda agent qo'shamiz (Tool Use bilan kalkulyator yoki ma'lumot bazasini chaqirish), 11-modulda RAG qo'shamiz (hujjatdan aniq javob). Lekin barcha kengayishlar shu birinchi ish tizimi ustiga quriladi. **Bugun siz qo'shilgan birinchi ehtimollik: AI bilan ishlaydigan ish jarayoni qurish.**

---

## Slide 18 — Closing · 3 xulosa + lug'at recap

**Sarlavha:**
Bugungi mashg'ulotdan **3 ta asosiy** xulosa.

**3 ta xulosa (close-row, blue accent border-left):**

- 💡 **Classification + Schema = birinchi ish tizimingiz.** Mijoz erkin yozadi · AI sof JSON chiqaradi · tizim avtomatik triage qiladi.
- 💡 **7 ta node, murakkab dasturlash yo'q.** Telegram + Gemini + Sheets · bitta tayyor skript copy-paste · 15–30 daqiqada quriladi · har bo'lim o'z toifa va operator ro'yxatini kiritadi.
- 💡 **Mashg'ulot yakuni — pilot qaror varaqasi.** Har stol topshiradi: bo'lim, toifalar, 10 ta test xat natijasi, asosiy xavflar va qaror — pilotga ruxsat / qayta ishlash / rad etish.

**Classifier pilot qaror varaqasi (5 mezon, har stol):**
1. **Bo'lim** — qaysi bo'lim · mijoz oqimi qancha?
2. **Toifalar** — 5 ta toifa yetadimi · qaysilarini qo'shish kerak?
3. **Test** — 10 ta xatdan nechtasi to'g'ri toifaga tushdi?
4. **Xavf** — noto'g'ri toifa · operator topilmasa · maxfiylik.
5. **Qaror** — pilotga ruxsat / qayta ishlash / rad etish.

**Lug'at recap (interaktiv, 30–60 sek):**
Auditoriyaga so'rang: "Eslay olasizmi?"
- **Classification** = … (jamoa: "kelgan xatni 5 toifadan biriga avtomatik ajratish")
- **Schema** = … (jamoa: "AI faqat aniq maydonlarni to'ldiradi · erkin matn yozmaydi")

**Speaker notes:**
3 xulosa — qisqa, takror aytsa bo'ladi. Har biriga 10–15 soniya. Lug'at recap — series-wide qoida. Classification va Schema — 9-modulning bank glossary'siga qo'shilishi. Auditoriya birgalikda aytadi: "Classification — toifaga ajratish; Schema — qat'iy shakl". Tovushda kuchaytirib aytish — yodda qolish kafolati. 15-modulda yakuniy glossary review da bu 2 atama qaytib chiqadi.

---

## Slide 19 — Q&A

**Vizual:**
Markaziy katta **"?"** belgisi (blue accent), ostida sarlavha va kontakt.

**Sarlavha (markazlashgan):**
Sizning **savollaringiz**.

**Tagline:**
Toifalar, n8n, Sheets, Gemini, muvofiqlik — marhamat.

**Kontakt:**
murod@mohir.dev

**Speaker notes:**
5–10 daqiqa, 60 daqiqalik normaning yakuni. Ko'p uchraydigan savollar:
- "Bot Telegramdan boshqa kanalda ishlaydimi?" → ha, WhatsApp/web/email — Trigger node almashtiriladi.
- "Mijoz ma'lumoti qaerga boradi?" → bank Sheets'i (siz boshqarasiz) + Gemini API (so'rov uchun, saqlamaydi). 3-modul muvofiqligiga ko'prik.
- "Toifa qo'shish kerak bo'lsa?" → Operators'ga satr + system prompt'ga band. Kod tegmaydi.
- "Botni qanday yangilash mumkin?" → har xato test bilan: 10 xat → 8 to'g'ri → prompt tuzatamiz → 10 xat → 9 to'g'ri.
- "Agentdan farqi nima?" → 10-modulga ko'prik.

---

## Series-wide bog'lanish

- **Avvalgi modullar:**
  - 1-modul slayd 8 — chatbot oqim ilk ko'rilgan. Bugun chuqur ochildi.
  - 5-modul (Promt muhandisligi) — bugungi system prompt shu modul asosida quriladi.
  - 8-modul — n8n + Webhook. Bugun shu node'lar ishlatildi.
- **Keyingi modullar:**
  - [`10_deck/`](../10_deck/) — Agent kontseptsiyasi (RAG + Tool Use bilan kengaytirish).
  - [`11_deck/`](../11_deck/) — RAG agent dizayni · paired bot 02_rag_chatbot.
  - [`12_deck/`](../12_deck/) — Pipeline. Bugungi classifier multi-step pipeline'ga aylanadi.

## Atamalar — kursning glossary'siga hissa

- **Classification (Tasniflash)** — slayd 5 da kiritildi, slayd 18 da recap.
- **Schema (Sxema)** — slayd 5 va 6 da kiritildi, slayd 18 da recap.

## Tayyorgarlik checklist

- [ ] Bot 01 (`bots/01_classifier_bot/`) instructorda ishlayapti.
- [ ] Har stolga Operators jadvali shabloni tayyor (5 toifa + bo'sh ustunlar).
- [ ] n8n cloud akkaunt har stolda ochiq, BankYordamchi shabloni klonlangan.
- [ ] Telegram bot tokeni har stolga 1 dona (BotFather).
- [ ] Backup: agar Telegram'da muammo bo'lsa — n8n test pin data orqali demo.

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Tushuncha (Hook → vs JSON → Lug'at → Schema misol) | 3–6 | ~12 daq |
| 02 · 7 ta node (Arxitektura → 4 bosqich → Sheets → user journey) | 7–13 | ~18 daq |
| 03 · Live build (sifat tekshiruvi → stol mashqi) | 14–15 | ~20 daq |
| 04 · Yakun (xato → recap → closing → Q&A) | 16–19 | ~10 daq |
| **Jami** | **19** | **~60 daq** |

---

## Restructure tarixi

**v2 (2026-05-10):** RAG bot complexity reset. Module 9 was "Build the BankRAGBoti" (77 nodes) — replaced with classifier bot (BankYordamchi, 7 nodes). RAG content relocates to deck 11. Atamalar swap: RAG/Embedding → Classification/Schema. Slides 4–17 rewritten; slides 1, 3, 19 keep shells (slide 3 reframed: "yesterday RAG, today classifier"). Paired bot path: `bots/01_classifier_bot/` (was `bots/01_rag_basics/`).

**v1 (2026-05-08):** initial RAG-focused version (now archived in git history).

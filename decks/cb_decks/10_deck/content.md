# 10-modul · Sun'iy intellekt agentlari tushunchasi — to'liq kontent

**Module:** 10-modul · Kun 2 · 10:00–11:00 (60 daqiqa)
**Format:** Ma'ruza + muhokama
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2 talab):** **Agent**, **Tool Use** — slayd 5 da kiritiladi, slayd 16 da recap, slayd 17 da bank qaror artefakti

> Asosiy g'oya: Agent — bu shunchaki "yana bir bot" emas. Bu LLM'ning fikrlash qobiliyati va asbobdan foydalanish (tool use) imkoniyatini bir tizimga jamlagan yechim. Bo'lim ichida real ishlatish uchun — qaerda foydali, qaerda xavfli — auditoriya bilan birga aniqlaymiz.

---

## Slide 1 — Title

**Sarlavha:**
Sun'iy intellekt **agentlari** tushunchasi.

**Chip:**
Kun 2 · 10:00 — 11:00

**Tagline:**
Oddiy bot va aqlli agent — farq nimada?

**Speaker notes (~150 so'z):**
Bugun ertalab biz 9-modulda RAG bot qurdik — savolga aniq, manbaga asoslangan javob beradigan bot. Lekin u haligacha bir narsa qila olmaydi: "fikrlash" va "ish bajarish". Agar mijoz "Hisobimda 1 mln so'm qoldimi?" desa — bot bilim bazasida raqam topa olmaydi, chunki bu raqam jonli ma'lumotda. Shu yerda agent kiradi. Agent — bu LLM'ning ikki yangi qobiliyati: (1) o'ylab ko'rib qaror qabul qilish, (2) tashqi asboblardan foydalanish. Keyingi 60 daqiqada biz bu farqni aniq ko'rib chiqamiz, agent qachon kerak va qachon kerak emasligini belgilab olamiz, va eng muhimi — bo'limingizda qaysi vazifaga agent qo'yish samaraliroq ekanini birga aniqlaymiz. Maqsad: bugun zaldan chiqqanda har bir ishtirokchi "bizning bo'limga 1 ta agent kerak, mana bunaqasi" deb ayta olishi.

---

## Slide 2 — Agenda · "Mavzuning yo'l xaritasi"

**Sarlavha:**
Mavzuning **yo'l xaritasi**.

**4 faza (2×2 grid):**

1. **01 — Bot vs Agent** · ~12 daq — Bot bilan agent o'rtasidagi haqiqiy farq, evolyutsiya zinapoyasi, atamalar.
2. **02 — Anatomiya** · ~16 daq — Agentni tashkil etadigan 3 ta blok: Miya · Xotira · Asboblar. Tool Use mashq.
3. **03 — Misollar** · ~17 daq — Operator yordamchi agent va muvofiqlik agent — bank ichidagi 2 ta real misol; cheklovlar va xavflar.
4. **04 — Muhokama** · ~12 daq — Sizning bo'limingizda qanday agent kerak? Birga muhokama va savol-javob.

**Speaker notes (~140 so'z):**
60 daqiqani 4 ta blokga bo'lib ko'rsating. Auditoriyaga: birinchi 12 daqiqa nazariya emas — bot bilan agent farqini bittagina misol ustida ko'rib chiqamiz, shuning uchun "men bilmayman" degan qo'rquv bo'lmasin. Ikkinchi qism — agent ichida nima borligi va u qanday "ishlaydi" (Reasoning → Action → Observation sikli). Uchinchi qism — eng muhimi: bank ichida ikki real agent ishchi misol bo'ladi, shu yerda har biringiz o'z bo'limingizdagi vazifani solishtiradi. To'rtinchi qism — flipchart bilan birga muhokama, shu yerda "bizning bo'limga qaysi agent" degan tasavvur paydo bo'ladi. Card'lar interaktiv — keyingisiga o'tish uchun bossangiz ham bo'ladi.

---

## Slide 3 — Hook · "Bot vs Agent — bittagina misol"

**Sarlavha:**
"Hisobimda nechta pul?" — **bot va agent** bir xil emas.

**Mazmun (`.compare` 2-col):**

- **Oddiy bot:** "Iltimos, mobile-bank ilovasiga kiring va u yerda balansingizni ko'ring."
- **Agent:** [fikrlaydi] → ruxsatni tekshiradi → balance_check (read tool) → "Demo hisob qoldig'i topildi. Real tizimda — autentifikatsiya + audit log shart."

**Speaker notes (~180 so'z):**
Eng oddiy misol bilan boshlaymiz. Mijoz Telegramda yozyapti: "Hisobimda nechta pul?". Oddiy bot — savolga matn bilan javob beradi. Agar bilim bazasida bunday ma'lumot bo'lmasa, eng yaxshi holatda foydalanuvchini boshqa joyga yuboradi: "Mobile-bankka kiring, balansni o'zingiz ko'ring". Bu — bot. Agent boshqacha. Agent o'ylab ko'radi: "Bu savolga javob berish uchun menga real raqam kerak, men buni qaerdan olaman? Mening qo'limda balance_check degan tool bor — uni ishlataman". Tool ishga tushadi, raqam qaytadi, agent uni mijoz tushunadigan tilda javobga aylantiradi. E'tibor bering: agent matn ishlab chiqarmaydi — agent ish bajaradi. U yerda LLM hozirgina mantiq yuritdi, asbob chaqirdi, natijani sharhladi. Bu uchta narsa — fikrlash, asbob ishlatish, natijani matnga aylantirish — birgalikda agentni hosil qiladi. Botda esa faqat bittasi bor: matn ishlab chiqarish. Mana shu farq — bugungi modulning butun mazmuni.

---

## Slide 4 — Botdan agentga evolyutsiya

**Sarlavha:**
Botdan agentga — **4 bosqichli** evolyutsiya.

**Mazmun (`.flow` 4-step):**

1. **Static FAQ** — Tayyor savol-javob ro'yxati. Yangi savol kelsa — javob yo'q.
2. **RAG bot** — Hujjatdan qidiradi, javob yozadi (9-modul). Lekin ish bajara olmaydi.
3. **Tool-using bot** — 1 ta toolni chaqira oladi (masalan, balance_check). Mantiq oddiy.
4. **Agent (multi-step)** — Bir nechta toolni ketma-ket ishlata oladi, oraliq natijaga qarab keyingisini tanlaydi.

**Speaker notes (~190 so'z):**
Bot va agent o'rtasidagi farq — bir kechada paydo bo'lmagan. Bu 4 ta bosqichdan o'tib kelgan. Birinchi bosqich — Static FAQ. Bu eski usul: oldindan tayyorlangan 50 ta savol va 50 ta javob. Mijozning savoli ro'yxatda yo'q bo'lsa — bot "Tushunmadim" deydi. Ikkinchi bosqich — bizning bugun ertalabki RAG bot. Bilim bazasidan qidiradi, real javob yozadi. Lekin u faqat o'qiy oladi, hech narsa "qila olmaydi". Uchinchi bosqich — bitta tool bilan ta'minlangan bot. Masalan: "Bugungi USD kursi qancha?" degan savolga API chaqirib javob beradi. Lekin bu hali ham bittagina mantiq qadami. To'rtinchi bosqich — chinakam agent. U bir nechta toolni ketma-ket chaqira oladi, har birining natijasiga qarab keyingisini tanlaydi: "Avval mijoz hisobini topay, keyin tarif jadvalini olib, ikkalasini taqqoslab javob berayin". Mana shu — agent. E'tibor bering: bizning kursimiz shu yo'lda — 1-modulda LLM bilan tanishdik, 9-modulda RAG, bugun agent, ertaga (11-modul) butun bir agent dizayni. Bu zinapoya.

---

## Slide 5 — Lug'at · Agent + Tool Use

**Sarlavha:**
Ikkita so'z — modulning **poydevori**.

**Chip:** Bankir uchun AI lug'ati · 10-modul

**Mazmun (`.dict.dict-2`):**

- **Agent** — *"Fikrlovchi yordamchi tizim"*. LLM + xotira + ruxsat berilgan asboblar bir tizimda. Vazifani tushunadi, mosini tanlaydi, natijani izohlaydi va belgilangan chegaradan chiqsa — inson xodimiga uzatadi. Mustaqil qaror egasi emas: huquq, limit va javobgarlik bank siyosati bilan belgilanadi.
- **Tool Use** — *"Asbobdan foydalanish"*. AI ruxsatli asbobni chaqiradi. Bankda ikki guruh: **read tool** — faqat o'qiydi (balans, hujjat, kurs); **write tool** — tizimga ta'sir qiladi (xat, hisob, fayl) va odatda inson tasdig'i, limit va auditni talab qiladi.

**Speaker notes (~170 so'z):**
Bu ikki atama bugundan keyin har modulda qaytadi: 11-modulda function calling bilan birga, 12-modulda pipeline ichida, 14-modulda guruhli loyihada. Hozir bir marta to'g'ri tushunsak — qolgan kun engil o'tadi. Agent — bu **bitta dastur**. Uning ichida 3 ta narsa bor: LLM (mantiqiy fikrlash uchun), xotira (avvalgi savollar va RAG bilim bazasi), va asboblar ro'yxati. Bu uchtasi birgalikda — agent. Tool Use — bu agent ichidagi eng muhim qobiliyat. Avvalgi LLM faqat matn yozardi. Tool use bilan u: bank tizimiga so'rov yuboradi, valyuta kursini API'dan oladi, kalkulyatorda hisoblaydi, faylga yozadi. AIning "qo'li" — shu. Hozircha shuni eslab qoling: agent — bu yondashuv, tool use — bu agentning eng muhim mexanizmi. Birinchisiz ikkinchisi yo'q. Birga aytamiz: Agent — fikrlovchi yordamchi. Tool Use — asbobdan foydalanish.

---

## Slide 6 — Agent anatomiyasi

**Sarlavha:**
Agentning **3 ta bloki**.

**Mazmun (`.stack` 3-card):**

- **Miya · LLM** *(featured)* — Vazifani tushunadi va keyingi qadamni tanlashga yordam beradi. Vendor keyin tanlanadi: ma'lumot joylashuvi, audit imkoniyati, ruxsat nazorati, narx va integratsiya shartlariga qarab.
- **Xotira · State + RAG** — Avvalgi muloqotlar (qisqa muddat) va kompaniya bilim bazasi (uzoq muddat). Agar agent "kim bilan gaplashayotganini" eslab qolmasa — sikl uzilgan.
- **Asboblar · Tool list** — Aniq belgilangan funktsiyalar ro'yxati: balance_check(account_id), tariff_get(product), email_send(to, body). Har birining "imzosi" bor.

**Speaker notes (~190 so'z):**
Agentni "qora quti" deb tushunmang. Uning ichi shaffof — uch bo'lakdan iborat. Birinchisi — Miya. Bu LLM (Gemini, GPT, Claude). Lekin u alohida emas, sistema prompti ichida belgilangan rolga ega: "Sen — bank operatorining yordamchisisan. Mijoz savoliga javob berish uchun shu asboblardan foydalanasan." Ikkinchisi — Xotira. Bu ikki turli: qisqa muddat (joriy suhbat — kim bilan gaplashayapsiz, oldingi savol nima edi) va uzoq muddat (RAG — kompaniyaning hujjatlari, qoidalar, tariflar — bu 9-modulda qurganimiz). Agentda xotirasiz har savol "boshidan" boshlanadi — bu mijozni jahliga keltiradi. Uchinchisi — Asboblar ro'yxati. Bu eng yangi qism. Sizning agentingizga qaysi tool'lar berilgan — shuni qila oladi. balance_check toolingiz bo'lmasa — agent balansni topa olmaydi, hech qancha aqlli bo'lsa ham. Shuning uchun agent dizaynida 80% vaqt — toolni to'g'ri tanlash va imzosini to'g'ri yozishga ketadi. Buni 11-modulda chuqurroq ko'rib chiqamiz.

---

## Slide 7 — Tool Use mashq · ReAct sikli

**Sarlavha:**
Tool Use — **4 bosqichli** sikl.

**Mazmun (`.flow` 4-step, brain step = AI):**

1. **Mijoz savoli** — "Mening hisobimda pul bormi?"
2. **Agent fikrlaydi** *(brain)* — "Bu savolga javob berish uchun real raqam kerak. balance_check (read tool) bor — uni ishlataman."
3. **Tool chaqiriladi** — `balance_check(account_id="demo_user")` → `DEMO_BALANCE` qaytadi.
4. **Javob** — "Demo hisob bo'yicha qoldiq topildi. Real tizimda — autentifikatsiya, ruxsat va audit log bilan ko'rsatiladi."

**Speaker notes (~180 so'z):**
Bu — agent ichida har savol uchun takrorlanadigan sikl. Uni texnik tilda ReAct deyiladi: Reason + Act + Observe. E'tibor bering, ikkinchi qadamda agent o'ylaydi va o'z fikrini yozadi — bu LLMning "nutqi". Buni biz log'da ko'ramiz: "Foydalanuvchiga balansni javob berish uchun balance_check toolini ishlatishim kerak, account_id parametri kerak, foydalanuvchining ID'si suhbat kontekstida — user_42". Uchinchi qadam — tool chaqiriladi. Bu — kod yozilgan API funksiyasi: bank tizimiga so'rov yuboradi, javob qaytaradi. To'rtinchi qadam — agent natijani matnga aylantiradi, mijoz tushunadigan tilda. Sikl shu — savolga 2-3 marta tool ishlatish kerak bo'lsa, sikl 2-3 marta takrorlanadi. Real misol: "Mening eng so'nggi 5 ta o'tkazmamni ko'rsat va eng kattasini Telegram orqali yubor" — bu yerda 2 ta tool: transactions_list va telegram_send. Agent ularni avtomatik ketma-ket bajaradi. Buni siz buyurtma qilmaysiz — agent o'zi o'ylab topadi.

---

## Slide 8 — 5 turdagi tool

**Sarlavha:**
Sizning agentingizga **qaysi 5 ta tool**?

**Mazmun (`.benefits.benefits-5` 5-card):**

1. **API call (tashqi so'rov)** — Tashqi xizmatdan ma'lumot olish (read tool). *Misol: valyuta kursi, sanksiyalar bazasi.*
2. **DB query (baza so'rovi)** — Bank ichki bazaga so'rov, faqat o'qish huquqi (read tool). *Misol: mijoz hisobi, tarix, kredit jadvali.*
3. **File read (fayl o'qish)** — PDF/Excel/Word fayldan kerakli xatboshini topish (read tool, RAG bilan). *Misol: shartnoma, tarif jadvali.*
4. **Email/Telegram (xabar)** — Xabar yuborish (write tool). Limit, inson tasdig'i va audit shart. *Misol: mijozga eslatma, rahbarga hisobot.*
5. **Calculation (hisob-kitob)** — Calculator tool (read tool). LLM matematikada zaif. *Misol: kredit foizi, EMI, valyuta konvertatsiyasi.*

**Speaker notes (~170 so'z):**
Bank ichida ko'pchilik agent shu 5 ta tool atrofida quriladi. Birinchisi — API call. Bu eng keng tarqalgan: agent tashqi xizmatga so'rov yuboradi va javobni javobiga qo'shadi. Markaziy bank kursi, mijoz raqamiga xat, sanksiyalar bazasi — hammasi shu yerda. Ikkinchisi — Database query. Bank ichki bazasiga "SELECT" so'rovi. Mijoz balansi, oxirgi 10 o'tkazma, kredit jadvali — bu DB tool bilan olinadi. Eslatma: agentga to'g'ri huquq bering — faqat o'qish, yozmaslik. Uchinchisi — File read. PDF shartnomadan kerakli xatboshini topadi. Bu RAG bilan birga ishlaydi. To'rtinchisi — Email/Telegram send. Agent o'zi xat yubora oladi: "Mijozga eslatma jo'nat" desa — yuboradi. Bu eng xavfli tool — buni 13-slaydda ko'rib chiqamiz. Beshinchisi — Calculation. LLM matematikada zaif, shuning uchun calculator toolini berish kerak. Agent o'zi hisoblamaydi — toolga buyuradi. Sizning bo'limingizda qaysi 3 ta tool eng kerak? — bu savol slayd 15 da qaytadi.

---

## Slide 9 — ReAct pattern · oddiy LLM vs agent

**Sarlavha:**
**Oddiy LLM** vs **ReAct agent** — javob bir xil emas.

**Mazmun (`.compare` 2-col):**

- **Oddiy LLM (yo'q)** — "Hisobingizda taxminan 50,000 so'm bor, aniq raqamni mobile-bankdan ko'ring." → *Taxmin. Manba yo'q. Gallyutsinatsiya.*
- **ReAct agent (HA)** — Reasoning: "balance_check kerak" → ruxsat va autentifikatsiya tekshiriladi → Action: tool ishlaydi → Observation: `DEMO_BALANCE` → "Demo hisob qoldig'i topildi." → *Aniq, manbaga asoslangan, audit log'da.*

**Speaker notes (~170 so'z):**
Oddiy LLM — bu 1-modulda gaplashgan stajyor. U ko'p o'qigan, lekin ish bajara olmaydi va aniq raqamni bilmaydi. Mijoz "Hisobimda qancha?" deb so'rasa, eng yaxshi javob — gallyutsinatsiya: "taxminan 50,000 so'm bo'lsa kerak". Bu — eng katta xato turi (3-modulda gaplashganmiz). ReAct agent boshqacha. Uning sikli aniq: avval Reasoning ("nima qilishim kerak?"), keyin Action ("balance_check tool"), keyin Observation ("1,243,500 UZS qaytdi"). Va bu sikl ko'p marta takrorlanishi mumkin: agar mijoz "yana karta limitini ko'rsat" desa — yana Reasoning, yana Action (card_limit_get), yana Observation. Buni odatda ishlab chiquvchi log'da ko'radi va siz ham har qadamni nazorat qila olasiz. Eng muhimi: agent har qadamni asoslab borishi mumkin. Muvofiqlikda bu juda qimmatli — auditor "Nega bunday qaror qildingiz?" desa, log'da har qadamni ko'rsatib bering: avval qaysi qoidaga qaradim, keyin qaysi tarixni oldim, keyin xulosa.

---

## Slide 10 — Bank misoli #1 · Operator yordamchi agent

**Sarlavha:**
Bank misoli #1 — **operator yordamchi** agent.

**Mazmun (`.flow` 5-step):**

1. **Mijoz savoli** — "Mening kredit to'lovim qachon?"
2. **Agent fikrlaydi** *(brain)* — "Mijoz ID + autentifikatsiya kerak, keyin kredit jadvali."
3. **Tool 1: customer_lookup** *(read tool)* — demo mijoz topildi.
4. **Tool 2: credit_schedule** *(read tool)* — keyingi to'lov sanasi va summasi qaytadi.
5. **Javob** — sana + summa. Eslatma yuborish — write tool, inson tasdig'i bilan.

**Speaker notes (~190 so'z):**
Bu real misol. Bizning bo'limlardan birida operator har kuni 100+ savolga javob beradi va aksariyati shunday: "to'lov qachon?", "balansim qancha?", "tarif qaysi?". Agent bu vazifani 24/7 bajara oladi. Sikl: mijoz Telegramda yozadi, agent kontekstdan mijoz ID'sini oladi (avvalgi suhbatdan), customer_lookup toolini chaqiradi (bazadan to'liq ma'lumot keladi), keyin credit_schedule toolini chaqiradi (kelajakdagi to'lov rejasi keladi). Va eng muhimi — agent o'zi taklif qiladi: "Eslatma yuborayinmi?". Bu yerda 3-tool potentsial: telegram_reminder_set. Agar mijoz "ha" desa — agent eslatma rejalashtiradi va aniq vaqtda jo'natadi. Bizning misolda 3 ta tool — eng oddiy operator agent. Bo'limingizda bunday agent qancha vaqt tejashi mumkin? Aytaylik, kuniga 100 savol × 5 daq = 8 soat. Bitta operator. Agentning kuchi shu — operator vaqtini ozod qiladi va kechki kunlarda ham xizmat ko'rsatadi. Lekin: agentga aniqlikka qiyinlik tug'diradigan savollar (shikoyat, murakkab e'tiroz) — operatorga qaytariladi. Bu agent dizaynining muhim qoidasi.

---

## Slide 11 — Bank misoli #2 · Muvofiqlik agent

**Sarlavha:**
Bank misoli #2 — **muvofiqlik** agent.

**Mazmun (`.flow` 5-step):**

1. **Yangi mijoz tekshiruvi** — KYC bo'limidan signal: F.I.O. + pasport.
2. **Tool 1: rules_db** — Muvofiqlik qoidalari: yangi mijoz qaysi ro'yxatlardan o'tishi kerak.
3. **Tool 2: sanctions_check** *(brain)* — Sanksiyalar bazasi: nom topilmadi.
4. **Tool 3: customer_history** — Bizning bazada avval mijoz bo'lmagan.
5. **Tool 4: audit_log + Xulosa** — "Sanksiyalar tozaligi tasdiqlandi, yangi mijoz, oddiy KYC oqimida davom etiladi." Audit log'ga yozildi.

**Speaker notes (~200 so'z):**
Bu — yuqori riskli agent. Muvofiqlikda har qadam izlanadi va auditor tomonidan tekshiriladi. Shuning uchun agent dizayni boshqacha: har tool chaqiruvi log'ga yoziladi, har qadam asoslanadi, va eng muhimi — agent o'z-o'zi qaror qabul qilmaydi. Misolda 4 ta tool. Birinchisi — qoidalar bazasi (qaysi tekshiruvlar talab qilinadi). Ikkinchisi — sanksiyalar ro'yxati (FATF, OFAC, Markaziy bank ro'yxati). Uchinchisi — bizning ichki tarix (mijoz avval kelganmi). To'rtinchisi — audit log (har qadamni saqlash). Bu yerda agent xulosa yozadi, lekin oxirgi qaror — muvofiqlik xodimida. Agent shunchaki ish hajmini kamaytiradi: avval bir mijozni 30 daq tekshirgan muvofiqlik xodimi, endi 5 daq vaqt sarflaydi (agent tekshirib qo'ygan, faqat tasdiqlash kerak). Auditor "Nega bu mijozga ruxsat berdingiz?" desa — agent log'i to'liq tarix beradi: qaysi vaqtda, qaysi ro'yxat tekshirildi, natijasi qanday edi. Bu — production-grade muvofiqlik agent. Lekin diqqat: bunday agentni qurish 11–12-modullarda ko'rib chiqiladi, bugun shunchaki ko'z bilan ko'rib qoldik.

---

## Slide 12 — Multi-agent xavfi · cando

**Sarlavha:**
Multi-agent — qachon **HA**, qachon **YO'Q**.

**Mazmun (`.cando` 2-col):**

**HA — Bitta agent uchun yaxshi:**
- Vazifa aniq, bir o'qda — savol → tool → javob.
- Mas'uliyat 1 bo'limga tushadi (operator, KYC).
- Tool soni 3–6 ga kiradi.
- Sikl natijasi tekshiriladigan.
- Audit log bitta joyda yig'iladi.

**YO'Q — Bitta agent uchun yomon:**
- Vazifa 5+ bo'limga tarqalgan (kredit + muvofiqlik + xazina + xavfsizlik).
- Har bo'limning o'z qoidasi bor — bitta agent hammasini bilolmaydi.
- Tool soni 15+ — agent yo'qolib qoladi.
- Bitta agent ikkalovchi qaror qabul qiladi (mijoz va bank manfaati ziddiyati).
- Birinchi xato butun jarayonni to'xtatadi.

**Speaker notes (~190 so'z):**
Multi-agent — moda. Internet "100 ta agent birga ishlaydi" ulashlarini to'la. Lekin bankda diqqat: aksariyat hollarda BITTA, sodda, aniq agent — 5 ta multi-agentdan yaxshiroq. Chap tomonda — agent qachon yaxshi ishlaydi. Vazifa aniq bo'lsa (operator yordamchisi, muvofiqlik preview), tool soni kichik (3–6), va siklning natijasi tekshiriladigan bo'lsa — agent foydali. O'ng tomonda — agent qachon halok bo'ladi. Ko'p bo'limga tarqalgan vazifa: "Kredit ber, sanksiyani tekshir, kassada belgila, xavfsizlikka jo'nat" — bu bitta agent uchun og'ir. Tool 15+ bo'lsa — agent qaysi toolni qachon ishlatishni unutadi va xato ko'paya boshlaydi. Eng xavfli holat — bitta agentga ikki tomonlama qaror qildirilsa: "Mijoz uchun ham, bank uchun ham eng yaxshi taklifni ber". Bu mantiqsiz — agent o'zining ichki ziddiyatini hal qila olmaydi. Bizning maslahat: birinchi agentni juda tor doirada qiling — bitta vazifa, 3 ta tool, bitta bo'lim. Keyinchalik kerak bo'lsa — kengaytiramiz. Bu MVP yondashuv (14-modulda chuqurroq).

---

## Slide 13 — Cheklov va xavf · sec

**Sarlavha:**
Agentlarning **3 ta xavf nuqtasi**.

**Mazmun (`.sec` 3-card):**

- **Mavjud bo'lmagan asbobni chaqirish (Hallucinated tool call)** — Agent yo'q toolni "ishlatdim" deb yozadi yoki parametrni xato beradi. Yechim: schema validatsiya (11-modul).
- **Cheksiz sikl (Infinite loop)** — Agent siklda qolib ketadi: tool chaqiradi → natija yoqmaydi → yana chaqiradi. Yechim: qadam cheklovi (max_steps = 5–8).
- **Xavfsizlik chegarasi (Security boundary)** — Agent o'z-o'zi xat yuboradi, hisob o'zgartiradi, fayl o'chiradi. Yechim: write tool'larga inson tasdig'i, limit, audit; har tool huquqi alohida.

**Speaker notes (~190 so'z):**
Agent — kuchli, lekin xavfli vosita. Uchta eng katta xavfni biling. Birinchisi — hallucinated tool call. Agent ko'p marta toolni xayoliga keltirib chaqiradi: "balance_get" deb yozadi, lekin bizda "balance_check" bor. Yoki parametrni xato beradi: account_id o'rniga ism yozadi. Bu bilan tizimda xato keladi. Yechim — schema validatsiya: har tool chaqiruvi oldin tekshiriladi, mos kelmasa bekor qilinadi. Buni 11-modulda function calling bilan o'rganamiz. Ikkinchisi — infinite loop. Agent o'z natijasini yoqtirmaydi va qayta-qayta chaqiradi. Bu — qimmat (har chaqiruv pul) va xavfli (foydalanuvchi javobni kutib qoladi). Yechim — qattiq cheklov: max 5–8 qadam, undan keyin agent to'xtaydi va "Yordam topa olmadim, operatorga jo'natayinmi?" deydi. Uchinchisi va eng xavflisi — security boundary. Agentga "email_send" tool berdik — u bir xato qildi va 1000 ta mijozga noto'g'ri xat yubordi. Yechim: yozish (write) tool'lariga albatta inson tasdig'i. O'qish (read) tool'lar avtomatik bo'lishi mumkin, yozish — yo'q. Bu qoida. Muvofiqlikda esa — har tool huquqi alohida loglanadi.

---

## Slide 14 — Mini-recap · 3 darajada AI

**Sarlavha:**
Mini-recap: **3 darajada AI yordami**.

**Mazmun (`.benefits` 3-card):**

- **Chatbot · Sodda** — *Tayyor savol → tayyor javob.* Bilim cheklangan. **Foyda:** FAQ.
- **RAG bot · O'rtacha** — *Hujjatdan qidiradi → aniq javob.* Bilim — sizning fayllar. **Foyda:** policy reference.
- **Agent · Yuqori** — *Fikrlaydi + ish bajaradi.* Tool ishlatadi, sikl quradi. **Foyda:** real ish (operator, muvofiqlik preview, kredit kartasi limit yangilash).

**Speaker notes (~150 so'z):**
Bugungi modul oxirida sizda 3 darajadagi AI tasavvuri bo'lishi kerak. Birinchi daraja — chatbot. FAQ ro'yxati. Foydali, lekin cheklangan. Ikkinchi daraja — RAG bot (bugun ertalab qurganimiz). Hujjatlardan qidiradi, real javob beradi. Lekin u faqat o'qiy oladi. Uchinchi daraja — agent. Bu yangi: agent o'qiy oladi, fikrlay oladi va ish bajara oladi. Sizning bo'limingizdagi vazifa qaysi darajaga to'g'ri keladi — shu narsa qarorni belgilaydi. FAQ kifoyamasmi? — chatbot bering. Hujjatlarni qidirish kerakmi? — RAG bot. Real harakat kerakmi (xat yuborish, hisobni yangilash, hisobot tayyorlash) — agent. Hammasiga agent kerak emas. Aksincha, agent eng qimmat (har savolga ko'p tool chaqiradi → tokenlar) va eng murakkab (debugging, monitoring). Birinchi qadam: bo'limingizda eng oddiy chatbot, keyin RAG, keyin agent. Bu zinapoya. Slayd 15 da bu savolni o'zingiz uchun javob berasiz.

---

## Slide 15 — Muhokama · s-brain

**Sarlavha:**
Sizning bo'limingizda **qanday agent** kerak?

**Chip:** Interaktiv · 3 savol · Flipchart

**Mazmun (`.s-brain` 3 ta savol):**

1. Sizning bo'limingizda **qaysi takrorlanadigan vazifa** uchun agent kerak?
2. Agentga **qaysi 3 ta tool** berasiz? (DB query, API, hisob-kitob, file read, email)
3. **Qayerda xavf** bor? Tool chaqiruvi noto'g'ri bo'lsa — nima yo'qotamiz?

**Speaker notes (~190 so'z):**
Bu — modulning eng amaliy qismi. 12 daqiqa: 3-4 ta stol, har biri yuqoridagi 3 savolga javob yozadi. Birinchi savol — "qaysi vazifa". Eng yaxshi javob — kuniga 10+ marta takrorlanadigan, oddiy mantiqli, va aniq natijasi bor vazifa. Operator yordamchi, KYC preview, kredit jadvali so'rovi, daily report — bularning hammasi yaxshi nomzodlar. Yomon nomzodlar — kreativ qaror talab qiluvchi, juda kam takrorlanadigan, yoki murakkab istisnoga to'la vazifalar. Ikkinchi savol — toollar. Stollar 3 ta tool tanlaydi (slayd 8 dagi 5 turdan). Bu juda muhim — agent dizayni shu tanlovdan boshlanadi. Uchinchi savol — xavf. Eng kerakli: "agar agent xato qilsa, eng yomoni nima bo'lishi mumkin?". Misol: agar agent mijozga noto'g'ri balansni ayttsa — kichik xavf, mijoz aniqlaydi. Lekin agar agent noto'g'ri xat yuborsa yoki noto'g'ri hisobga pul yuborsa — katta xavf. Bu javob agent dizaynida nima qadar tasdiqlash kerakligini hal qiladi. Stollardan 2-3 ta yaxshi javobni eshitamiz va flipchartda yozamiz.

---

## Slide 16 — Closing + lug'at recap

**Sarlavha:**
Bugun **o'zingiz bilan olib ketadigan** 3 xulosa.

**Mazmun (`.close-list` 3 row + `.recap`):**

1. **Agent ≠ bot** — agent ruxsat berilgan tool'lardan foydalanib bosqich tanlaydi. Tool Use bu farqning markazi.
2. **Aniq, tor doirada qiling** — birinchi agent: 1 vazifa + 3 tool + 1 bo'lim. Multi-agent — keyinroq.
3. **Xavf chegaralari aniq** — schema validatsiya, qadam cheklovi (max_steps), write tool'larga inson tasdig'i, audit log.

**Lug'at recap (`.recap`):**
- **Agent** — ruxsatli yordamchi tizim: LLM + xotira + asboblar; chegaradan chiqsa — insonga uzatadi
- **Tool Use** — read tool o'qiydi · write tool tasdiq, limit va audit talab qiladi

**Speaker notes (~150 so'z):**
Auditoriyaga 3 xulosani qisqa ovoz bilan birga aytamiz. Birinchisi — agent va bot bir xil emas. Bu — modulning markaziy farqi. Ikkinchisi — agent loyihasini boshlaganda, tor doirada qiling. Bizning birinchi maslahatimiz: 1 vazifa, 3 tool, 1 bo'lim. Multi-agent moda, lekin ko'p xato. Uchinchisi — xavfni avval bilib oling: schema validatsiya, max steps, va eng muhimi — write tool'lar uchun inson tasdig'i. Lug'at recapda 30 soniya: "Agent — bu nima edi?" — auditoriyadan biri javob beradi: "fikrlovchi yordamchi". "Tool Use — bu nima edi?" — yana javob: "asbobdan foydalanish". Quvvatlangan retentsiya — bu eng muhim usul. Keyingi modul (11-modul) — bizda voice memo bot va schema dizayni: agent qurishning amaliy davomi.

---

## Slide 17 — Bank qaror artefakti · Agent pilot qaror varaqasi

**Chip:** Bank qaror artefakti · 1 sahifa

**Sarlavha:**
Agent **pilot qaror varaqasi**.

**Lead:** Har bir stol bitta agent nomzodini shu 8 maydonga joylaydi.

**Mazmun (`.artifact` 8 row, 2-col):**

1. **Vazifa** — Qaysi takrorlanadigan ish agentga beriladi?
2. **Owner** — Qaysi bo'lim javobgar va tasdiqni beradi?
3. **Tool'lar** — Qaysilari read tool, qaysilari write tool?
4. **Chegara** — Agent nimalarni qila olmaydi (qaysi limit)?
5. **Tasdiq** — Qaysi qadamda inson tasdig'i shart?
6. **Audit** — Qaysi loglar saqlanadi va kim ko'radi?
7. **Pilot metrikasi** — Vaqt, xato, eskalatsiya, kutish vaqti — qanday o'lchanadi?
8. **Qaror** — RAG yetarlimi, agent pilotga tayyormi yoki jarayon avval tartibga keltiriladimi?

**Yakuniy mezon:** Agar owner, tool, tasdiq va audit aniq bo'lmasa — bu agent pilotga tayyor emas.

**Speaker notes (~140 so'z):**
Bu artefakt — modulning amaliy natijasi. Slayd 15 muhokamasidan keyin har stol bitta nomzod tanlaydi va shu 8 maydonni to'ldiradi. 8 daqiqa: 4-5 daqiqa stol ishi, 3-4 daqiqa kalit topilmalarni eshitamiz. Maqsad — bo'limga qaytib borgan har bir ishtirokchi qo'lida bitta varaq bo'lsin: "agentimiz pilotga tayyor — yo'q". Eng katta gap: agar tool, owner, tasdiq va audit aniq bo'lmasa, bu agent hali pilotga emas. Bu — Markaziy Bank governance qoidasi: nazoratsiz vazifa avtonomiya bilan bajarilmaydi. Bu varaq 11-modulda (function calling/schema) chuqurroq, 14-modulda (guruhli loyiha) pilot rejasiga aylanadi.

---

## Slide 18 — Q&A

**Sarlavha:**
Sizning **savollaringiz**.

**Mazmun:**
murod@mohir.dev

**Speaker notes (~110 so'z):**
8–10 daqiqa savol-javob. Eng ko'p uchraydigan savollar: (1) "Bizning bo'limga agent kerakmi?" — slayd 17 dagi qaror varaqasiga qarang: agar tool, owner va tasdiq aniq bo'lmasa — hali emas; aksariyat hollarda RAG yetarli. (2) "Agent qancha turadi?" — narx model, tool chaqiruvlari soni, token hajmi, hosting va inson nazoratiga bog'liq; aniq raqam pilot smetasidan keyin chiqadi (1 vazifa, 3 tool, kunlik hajm, xavf nazorati). (3) "O'zimiz qura olamizmi?" — 11–14 modullarda asboblar bor; pilotni 1 vazifa + 3 tool bilan boshlash mumkin. Savol-javobdan keyin — 10 daqiqa tanaffus, keyin 11-modul: voice memo agent dizayni.

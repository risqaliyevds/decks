# 8-modul · No-code avtomatlashtirish (Zapier, n8n, Make) — to'liq kontent

**Module:** 8-modul · Kun 1 · 17:30–18:15 (60 daqiqa, Day 1 closing slot)
**Format:** Workflow building demos + audience exercise
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Telegram + n8n (self-hosted) + Gemini + Google Sheets
**Slaydlar soni:** 19 ta · 4 ta faza + bank qaror varaqasi
**Atamalar (≥2/modul talabi):** Trigger · Webhook — slide 5 da kiritiladi, slide 17 da recap

> Asosiy g'oya: Workflow yig'ish — bo'lim xodimining yangi ko'nikmasi. IT bo'limi navbatini kutmaymiz; o'zimiz yig'amiz, IT auditdan o'tkazadi. Modul oxirida har ishtirokchi 4-nodeli mini-workflow'ni o'z ko'zi bilan ekranda quriganini ko'radi.

---

## Slide 1 — Title

**Sarlavha:** No-code avtomatlashtirish.
**Chip:** Kun 1 · 17:30 — 18:15
**Tagline:** Zapier, Make, n8n — kodsiz workflow. Bo'lim xodimi o'zi yig'adi.

**Speaker text (~140 so'z):**
Salom, Day 1'ning oxirgi mavzusiga keldik. Tongdan beri promt, AI lug'at, platformalar bilan ishladik. Endi savol: bularning hammasi qanday bir-biriga ulanadi? Telegram, Gemini, sizning bank tizimingiz, Sheets — bu xizmatlar bir-biri bilan o'zicha gaplashmaydi. Kimdir bog'lab qo'yishi kerak. An'anaviy javob: programmist yozadi. Yangi javob: bo'lim xodimi sichqoncha bilan yig'adi, 30 daqiqada. Bu shu modul mavzusi — "no-code avtomatlashtirish". Aniq aytsam: kod yozmasdan, lekin haqiqiy ish jarayonini avtomatlashtiradigan vositalar. Zapier, Make va eng asosiysi — n8n. Nima uchun n8n? Chunki u sizning bank serveringizda turishi mumkin. Hech qanday ma'lumot tashqariga chiqmaydi. Va ertaga 9-modulda shu n8n ustida birinchi RAG botingizni qurishni boshlaymiz. Boshlaymiz.

---

## Slide 2 — Agenda

**Sarlavha:** Mavzuning yo'l xaritasi.
**Eyebrow:** Agenda
**4 faza (2×2 grid):**

1. **01 — Nima uchun no-code** · ~14 daq · Hook, falsafa, lug'at (Trigger · Webhook)
2. **02 — Platformalar** · ~14 daq · Zapier vs Make vs n8n · workflow anatomiyasi
3. **03 — Bank misollari** · ~18 daq · Spravka · Email shikoyat · Muvofiqlik hisobot
4. **04 — Mini-build · mashq** · ~14 daq · Ekranda 5-nodeli workflow (Telegram→Set→Gemini→Sheets→Reply) · xato · xavfsizlik · Q&A

**Speaker text (~180 so'z):**
Yo'l xaritamiz to'rt qismdan iborat. Birinchi qismda — nima uchun bu mavzu sizga, bo'lim xodimiga, kerakligini aniqlaymiz. Programmist va bo'lim xodimining ikki yo'lini taqqoslaymiz, no-code falsafasini ochib beramiz, va kursning 8-modulgacha kelgan ikki yangi atamani — Trigger va Webhook'ni — bankir tilida o'rganamiz. Ikkinchi qismda uch platformani solishtiramiz: Zapier, Make va n8n. n8n nega bizning tanlovimiz ekanini ko'rsatamiz. Workflow'ning anatomiyasini ko'ramiz — har qanday avtomatlashtirish 5 ta qadamga bo'linadi. Uchinchi qism — eng konkret qism. Sizning bo'limingizdagi 3 ta real misol: spravka avtomatlashtirish, email shikoyatlarni AI orqali bo'limga yo'naltirish, va muvofiqlik hisobotini har juma avtomatik tuzish. Har birida qaysi trigger ishlatilganiga e'tibor bering. To'rtinchi qism — eng qiziqarlisi. Ekranda men sizning ko'zingiz oldida 5-nodeli mini-workflow yig'aman. Siz savol berasiz, bot javob beradi. Eng ko'p uchraydigan xatolarni va xavfsizlik chiziqlarini sanab beraman, va lug'atni recap qilamiz.

---

## Slide 3 — Hook · prototipni kim yig'adi

**Sarlavha:** Spravka avtomatlashtirish — prototipni kim yig'adi?
**Compare:** An'anaviy yo'l (haftalar + IT navbati) vs No-code prototip yo'li (sandbox prototipi soatlarda · prototip → IT audit → pilot → production)

**Speaker text (~210 so'z):**
Bir misol bilan boshlayman — har bankda uchraydigan vaziyat. Mijoz sizdan spravka so'raydi: hisobida qancha aylanma bor edi 2024-yilda. Bo'lim xodimi qo'l bilan tayyorlaydi, imzolaydi, mijozga yuboradi — 15-20 daqiqa. Kuniga 50 marta. Yiliga 12 ming marta. Avtomatlashtirish kerakligi aniq. Endi savol: kim qiladi? Eski yo'l: bo'lim xodim IT bo'limga ariza yozadi. Brief tayyor bo'lishi 3-4 kun. TZ — yana hafta. Sprint, test, deploy — 2 hafta umumiy, agar yengil bo'lsa. Uch oydan keyin bot ishlay boshlaydi. Yangi yo'l: bo'lim xodimi o'zi yig'adi. n8n ochadi, Telegram trigger node tashlaydi, sichqoncha bilan ulaydi. 30 daqiqa — bot tayyor. IT bo'limi keyin auditdan o'tkazadi, xavfsizlik tekshiradi, production'ga chiqarishni tasdiqlaydi. Bu — no-code inqilobi. "Avtomatlashtirish kim qila oladi?" degan savolga javob o'zgardi. Bu sizning kursingizdagi eng amaliy modul, chunki ertaga bormang, bugungi bilim bilan o'z bo'limingizdagi bitta jarayonni avtomatlashtirishingiz mumkin. Va bu yerda eng zo'r qismi — IT bo'lim sizdan minnatdor bo'ladi, chunki ularning navbati bo'shaydi.

---

## Slide 4 — No-code falsafasi · 3 ta yutuq

**Sarlavha:** No-code falsafasi · 3 ta yutuq.
**Lead:** Bu texnologiya emas — bu ish madaniyati o'zgarishi. Bo'lim prototip qiladi, IT xavfsizlik bo'limi tekshiradi, komplayens tasdiqlaydi.
**3 benefit:** ⚡ Tezroq prototip · ↓ IT navbatini yengillashtiradi · 👁 Tushunish oson

**Speaker text (~190 so'z):**
No-code'ni texnologiya deb tushunish — yarim haqiqat. Asl mohiyati boshqa: ish madaniyati o'zgarishi. Birinchi yutuq — tezlik. Spravka misolida ko'rdik: 2 hafta o'rniga 30 daqiqa. Bu raqam haqiqiy. Sprint planning'siz, brief'siz, TZ'siz, deployment ceremoniya'siz. G'oya tug'ildi — bir kunda ishlaydi. Ikkinchi yutuq — IT bo'limining yuki. Bilingki, sizning IT bo'limingizning navbati doim to'liq. Kichik avtomatlashtirish so'rovlari kattalarni kechiktiradi. No-code platformalar bu kichik so'rovlarni bo'lim xodimiga qaytaradi. IT esa strategik, murakkab vazifalar bilan shug'ullanadi — kor banking tizimlari, xavfsizlik, integratsiya arxitekturasi. Hammasi yutadi. Uchinchi yutuq — eng ahamiyatlisi: shaffoflik. Workflow vizual ko'rinadi — node, ulanish, ma'lumot oqimi. Yangi xodim 1 soatda tushunadi: "ushbu node bu yerga ulanadi, AI shu joyda ishlaydi". Eski "qora quti" tushunchasi yo'qoladi. Bu — muvofiqlik va audit uchun katta yutuq. Auditor sizning workflow'ingizni ko'rib, kim qaerda nima qilayotganini bir qarashda tushunadi. Kodli yechimda buni isbotlash juda qiyin — yuzlab satr o'qib chiqish kerak edi.

---

## Slide 5 — Atama lug'ati · Trigger + Webhook

**Sarlavha:** Ikki so'z — workflow'ning poydevori.
**Chip:** Bankir uchun AI lug'ati · 8-modul
**Atama 1 — Trigger:** Qo'zg'atuvchi hodisa — workflow'ni boshlatadigan signal. Misol: Telegram'ga "/spravka" buyrug'i; soat 09:00; yangi email; mijoz form'ni to'ldirdi.
**Atama 2 — Webhook:** Boshqa dasturdan xabar olish nuqtasi — maxsus URL-eshik. Bankda eshik *ochiq* emas: token, IP cheklovi, imzo va audit log bilan himoyalanadi. Misol URL: https://n8n.bank.uz/webhook/spravka-arizasi

**Speaker text (~200 so'z):**
Endi ikkita kalit so'zni o'rganib olaylik. Bularsiz keyingi 13 ta slayd tushunarsiz bo'ladi, va ertaga 9-modulda ham bu atamalar qaytib chiqadi. Birinchisi — Trigger. Ingliz tilida "qo'zg'atuvchi" degani. Bankir tilida — workflow'ni boshlatadigan signal. Har bir avtomatlashtirishda birinchi savol: "qachon, qanday hodisa kelsa, bot uyg'onadi?" Misollar: mijoz Telegram'ga /spravka deb yozdi — Telegram trigger; soat 17:00 bo'ldi va juma — Schedule trigger; yangi email keldi — Email trigger; mijoz saytdagi formani to'ldirdi — Form trigger. Bu birinchi atama. Ikkinchisi — Webhook. Bu maxsus URL — botning eshigi. Boshqa tizim shu URL'ga xabar yuboradi, bizniki uyg'onadi va xabarni qabul qiladi. Misol: bizning n8n'da URL bor: n8n.bank.uz/webhook/spravka-arizasi. Bank ichki tizimi shu URL'ga "yangi mijoz keldi" deb yuboradi — bizning workflow boshlanadi. Webhook — Trigger turining bir turi, eng kuchlisi, chunki har qanday boshqa tizim bilan ulanish imkonini beradi. Esda saqlang: trigger nima edi? — workflow'ni boshlatuvchi hodisa. Webhook nima edi? — boshqa dasturdan xabar olish nuqtasi, URL.

---

## Slide 6 — 3 ta platforma taqqoslash

**Sarlavha:** Bozorda 3 ta yo'l · har birining o'z o'rni bor.
**3 platforma (.sec):**
- **Zapier:** eng oddiy · 7000+ ulanish · faqat AQSh serveri · $30+/oy · use-case'ga qarab — bank ma'lumoti chiqishi mumkin
- **Make:** vizual · murakkab oqim · Yevropa serveri (GDPR) · $9+/oy · hosting o'zimizniki emas
- **n8n** (pilot uchun mos variant): self-hosted joylashtirilsa, ma'lumot oqimini bank nazoratida ushlash osonroq · bepul yoki $20/oy · connector/log/backup alohida audit

**Speaker text (~210 so'z):**
Bozorda asosan uchta platforma bor. Hammasi bir narsani qiladi: turli xizmatlarni bir oqimga ulaydi. Lekin farq katta. Birinchisi — Zapier. Eng tanilgan, eng oddiy. 7 mingdan ortiq tayyor ulanish. Yangi boshlovchi uchun ideal — 30 daqiqada birinchi workflow'ni qurasiz. Kamchiligi: serverlar AQShda. Hech qanday tanlov yo'q. Bank uchun bu masala — mijoz ma'lumoti chet elga chiqadi. Plus, narxi yuqori — vazifa bo'yicha hisob, $30 dan boshlanadi. Ikkinchisi — Make. Avval Integromat deb atalardi. Vizual kuchli, murakkab oqimlar uchun yaxshi. If-else, loop, error handling — hammasi bor. Serverlar Yevropada — GDPR muvofiq. Narxi yengilroq, $9 dan. Lekin baribir hosting o'zimizniki emas — bank uchun bu muvofiqlik xavfi. Uchinchisi — n8n. Bizning tanlovimiz. Open-source, ochiq kod. Eng asosiysi: o'z serveringizda turadi. Bank ma'lumoti chetga bir bayt ham chiqmaydi. Self-hosted versiyasi bepul, bulut variant $20/oy. Bonus: kerak bo'lsa kod ham yozish mumkin (JavaScript node), shuning uchun cheklovlar yo'q. Va eng zo'ri — n8n hozir AI integratsiyasida yetakchi: Gemini, OpenAI, Anthropic — barcha LLM'lar bilan tayyor ulanishlar. Shuning uchun keyingi 11 slayd va ertangi 9-modulda biz n8n bilan ishlaymiz.

---

## Slide 7 — Nima uchun n8n · bank uchun

**Sarlavha:** Nima uchun n8n · bank uchun?
**3 yutuq (.benefits):**
- 🏦 **Self-hosted** — bankning o'z serveri, hech narsa chetga chiqmaydi (3-modul Yopiq kontur tamoyili)
- 🌐 **Open-source** — kod ochiq, IT xavfsizlik bo'limi tekshiradi
- 🔌 **500+ ulanish** — Telegram, Email, Sheets, Postgres, Gemini barchasi tayyor

**Speaker text (~190 so'z):**
n8n nima uchun bizning tanlovimiz — uchta aniq sabab bor. Birinchisi — eng muhimi — self-hosted. Bankning o'z serverida turadi. 3-modulda gaplashganimiz "Yopiq kontur" tamoyili shu yerda mukammal ishlaydi. Mijoz ma'lumoti, hujjat, hisob raqami — bularning hech biri n8n.io serveriga yoki AQSh ga chiqmaydi. Bank ichki tarmog'ida turadi, IT bo'limi to'liq nazorat qiladi. Bu muvofiqlik va Markaziy Bank talablariga to'liq mos. Ikkinchi sabab — open-source. Kodi ochiq. Bank xavfsizlik bo'limi har bir satrini ko'rib chiqishi mumkin. Vendor lock-in yo'q — agar ertaga n8n kompaniyasi yopilsa ham, sizning workflow'laringiz ishlaydi, kod sizda. Va litsenziya: jamoaviy foydalanish bepul. Yiliga yuz minglab dollar tejaladi. Uchinchi sabab — ekosistema. 500 dan ortiq tayyor ulanish: Telegram, Email, Google Sheets, Postgres, MySQL, OpenAI, Gemini, Claude, va eng asosiysi — webhook orqali har qanday tizim. Yangi node 30 daqiqada yoziladi. Bu jamoaning kuchli tomoni. Ertaga 9-modulda biz aynan shu n8n ustida birinchi RAG botingizni quramiz. Bugun n8n falsafasini, ertaga amalini ko'ramiz.

---

## Slide 8 — Workflow anatomiyasi · 5 qadam

**Sarlavha:** Workflow anatomiyasi · 5 qadam.
**Lead:** Telegram'dan kelgan savol → AI'ga jo'natiladi → javobni Sheets'ga yozadi → menejerga xabar.
**5-step .flow:** Trigger → Filtr → AI (brain) → Saqlash → Bildirish

**Speaker text (~200 so'z):**
Workflow'ning anatomiyasini bilsangiz, har qanday avtomatlashtirish sizga tushunarli bo'ladi. Chunki bularning hammasi shu beshlikning kombinatsiyasi. Birinchi qadam — Trigger. Hozirgina o'rgangan atama: workflow'ni boshlatuvchi hodisa. Mijoz Telegram'ga savol yozdi. Ikkinchi qadam — Filtr. Har bir kelgan ma'lumot foydali emas. Bo'sh xabar, dublikat, spam — chetga olib tashlanadi. Bu juda muhim, chunki keyingi qadam pulli (AI). Bekor so'rovga AI ishlatish — pul behuda. Uchinchi qadam — AI. Bu workflow'ning aql qismi: Gemini yoki boshqa LLM mijoz savoliga javob tuzadi. Bu yerda bizning 5-modulda o'rgangan promt shabloni ishlaydi: rol, kontekst, vazifa, format. To'rtinchi qadam — Saqlash. Har bir savol va javob Google Sheets yoki bank Postgres bazasiga yoziladi. Bu — audit trail. Muvofiqlik uchun kritik: kim, qachon, nima so'radi va bot nima dedi. Beshinchi qadam — Bildirish. Mijozga Telegram orqali javob qaytaradi, va menejerga "yangi savolga javob bordi" deb xabar yuboradi. Hammasi 5 ta n8n node — ekranda 5 ta to'rtburchak, sichqoncha bilan ulanadi. Hech qanday kod. Boshqa har qanday murakkab workflow ham — shu beshlikning kengaytirilgan varianti.

---

## Slide 9 — 5 turdagi Trigger

**Sarlavha:** Trigger 5 ta turdan birortasi bo'ladi.
**5 trigger (.benefits-5, 2+3 grid):**
- ⏰ **Schedule** — vaqt belgilangan: har juma, har kuni 08:00. Misol: muvofiqlik hisoboti har juma 17:00
- 🌐 **Webhook** — boshqa tizim URL'ga xabar tashlaydi. Misol: CRM mijoz holatini o'zgartirsa
- 📧 **Email** — yangi xat, ma'lum filtr bilan. Misol: shikoyat@bank.uz har xati
- 💬 **Telegram** — botga xabar/buyruq. Misol: /spravka
- 📋 **Form** — saytdagi yoki Google Form to'ldirildi. Misol: yangi mijoz onlayn ariza

**Speaker text (~190 so'z):**
Trigger turlari beshta. Bilingki, bank stsenariylarining 95% shu beshlikka tushadi. Birinchisi — Schedule. Vaqt belgilanadi. Har juma 17:00, har kuni 08:00, oyning 1-kuni. Eng oddiy va eng ko'p ishlatiladigan turi. Misol: muvofiqlik hisoboti har juma 17:00 da avtomatik tuziladi va yuboriladi. Hech kim eslatmaydi. Ikkinchisi — Webhook. Hozirgina o'rgangan atama. Boshqa tizim bizga URL orqali xabar tashlaydi. Misol: CRM tizimida mijoz holati "VIP" ga o'zgardi — workflow boshlanadi, mijozga maxsus xat yuboradi. Uchinchisi — Email. Yangi xat keladi, mavzu yoki yuboruvchi bo'yicha filtr. Misol: shikoyat@bank.uz pochta yashigiga kelgan har bir xat avtomatik tahlil qilinadi. To'rtinchisi — Telegram. Bu siz uchun tanish: bot xabar oladi yoki maxsus buyruq. Misol: mijoz /spravka yozadi. Va beshinchisi — Form. Sayt formasi yoki Google Form. Misol: yangi mijoz onlayn ariza yuboradi. Endi savol — sizning bo'limingizdagi avtomatlashtirishlar qaysi trigger bilan boshlanadi? Ko'pchiligi Schedule (har kun, har juma) yoki Email (mijoz xabari). Aniqlab oling — bu workflow loyihalashning 1-qadami.

---

## Slide 10 — Webhook chuqurroq · ikki yo'nalish

**Sarlavha:** Webhook · eshik, ikki xil ishlatiladi.
**Compare-rich:** Tashqi xizmat → bizga (Telegram bot webhook) vs Ichki tizim → bizga (CRM o'zgarish webhook)
**URL misollari:** POST https://n8n.bank.uz/webhook/telegram va POST https://n8n.bank.uz/webhook/crm-update

**Speaker text (~200 so'z):**
Webhook eng kuchli trigger turi, lekin u ham eng ko'p chalkashtiriladigan tushuncha. Ikki yo'nalishda ishlatiladi. Birinchi yo'nalish: tashqi xizmat → bizga. Misol: Telegram bot. Telegram serveri har gal mijoz botga xabar yozsa, bizga URL orqali xabar tashlaydi. Bizning n8n.bank.uz/webhook/telegram URL'ga POST yuboradi, ichida kim yozdi va nima yozdi. Biz cheksiz polling qilib o'tirmaymiz, "yangi xabar bormi" deb so'ramaymiz — Telegram o'zi bizga ovoz beradi. Ikkinchi yo'nalish: ichki tizim → bizga. Bu yanada kuchli. Misol: bank CRM tizimida mijoz holati o'zgaradi. CRM bizning bank-ichi URL'ga xabar tashlaydi: "client_id 1023, status VIP". Bizning workflow uyg'onadi va kerakli ishni boshlaydi — yangi xat tayyorlash, eslatma yuborish, yangi tarif taklif. Webhook — bu siyosiy katta narsa: xizmatlar bir-biridan ajralib, lekin bog'lanib turadi. Avval 1C, CRM, bank yadrosi alohida-alohida ishlardi, qo'l bilan ma'lumot ko'chirilardi. Webhook bilan ular avtomatik gaplashadi. URL har bir workflow uchun yagona — siz n8n'da yaratasiz, copy qilasiz, boshqa tizimga beraylik. Tamom — eshik tayyor, kim kelishi kutilmoqda.

---

## Slide 11 — Bank misoli #1 · Spravka avtomatlashtirish

**Sarlavha:** Mijoz Telegram orqali spravka oladi · 6 qadam.
**Lead:** Trigger = Telegram'dan kelgan ariza. Mijoz 5 daqiqada PDF spravkani Telegram'da oladi.
**6-step .flow:** Telegram /spravka → JSHIR+telefon tasdiq → Bank API so'rov → PDF tuzish (AI) → Sheets audit log → Telegram'ga PDF

**Speaker text (~210 so'z):**
Birinchi real misol — boshda gapirgan spravka. Ko'rib chiqaylik, qadam-qadam. Trigger — Telegram. Mijoz /spravka deb yozadi yoki tugmani bosadi. Birinchi qadam — workflow boshlandi. Ikkinchi qadam — tasdiq. Mijoz JSHIR va telefon raqamini kiritadi, bot bank bazasidan tekshiradi: bu mijozmi? Agar yo'q bo'lsa — ariza to'xtaydi va xato xabari beriladi. Uchinchi qadam — bank API'siga so'rov. Mijoz hisobi, harakatlar tarixi, kerakli davr — barchasi olinadi. Bu yerda HTTP Request node'i ishlatiladi. To'rtinchi qadam — PDF tuzish. Bu yerda AI ishlaydi: shablonni oladi, mijoz ma'lumotini joylaydi, balansni hisoblaydi, summani so'z bilan yozadi (eski ish-junior'ning eng zerikarli vazifasi), va PDF generatsiya qiladi. Beshinchi qadam — audit log. Sheets'ga yoziladi: kim, qachon, qanday spravka oldi. Bu muvofiqlik uchun kritik. Oltinchi qadam — yuborish. PDF Telegram'ga yuboriladi, mijoz darrov yuklab olishi mumkin. Yiliga taxminan 12 ming spravka so'rovi. Eski tartibda har biri 15 daqiqa, bu — 3 ming soat operator vaqti. Yangi tartibda — 0. Operator faqat istisno hollar bilan shug'ullanadi: noaniq ma'lumot, maxsus so'rovlar, vakil orqali olish. Vaqt strategik vazifalarga ozod bo'ladi.

---

## Slide 12 — Bank misoli #2 · Email shikoyat toifalash

**Sarlavha:** Email shikoyat — AI avtomatik yo'naltiradi.
**Lead:** Trigger = shikoyat@bank.uz'ga kelgan email. AI mavzuni o'qib tegishli bo'limga yo'naltiradi.
**5-step .flow:** Yangi email → Toifalash (AI: Karta/Kredit/Mobile/Boshqa) → Yo'naltirish → CRM tiket → SLA timer 24 soat

**Speaker text (~210 so'z):**
Ikkinchi misol — har bankda kuniga 100-200 marta uchraydigan vaziyat. Mijoz shikoyat@bank.uz pochtaga email yozadi. Eski tartib: bo'sh xona kotibasi yoki call-center xodimi har birini o'qib chiqadi, qaysi bo'limga tegishli ekanligini aniqlaydi, qo'l bilan tegishli bo'limga yuboradi. Bu kuniga 4 soat sof saralash ishi. Yangi tartib — AI bilan. Birinchi qadam — Email trigger. Yangi xat keldi — workflow boshlandi. Ikkinchi qadam — eng muhimi — toifalash. AI mavzuni va matnni o'qiydi, va aniq belgilangan toifalardan birini tanlaydi: Karta muammosi, Kredit, Mobile bank, yoki Boshqa. Bu yerda bizning 5-modulda o'rgangan promt shabloni ishlaydi. Few-shot misollari berilgan — har toifadan 2-3 ta misol ko'rsatilgan. Aniqlik 90% atrofida. Uchinchi qadam — yo'naltirish. Tegishli bo'lim email'iga: kartalar@bank.uz, kreditlar@bank.uz va hokazo. To'rtinchi qadam — CRM'da yangi tiket ochiladi, mijoz va shikoyat matni kiritiladi. Beshinchi qadam — SLA timer. 24 soat ichida javob bo'lmasa — eskalatsiya, bo'lim raisiga avtomatik xabar boradi. Natija: operator vaqti kuniga 4 soatdan ~30 daqiqaga qisqaradi, faqat noaniq toifa "Boshqa" bo'lganlari qo'l bilan ko'riladi.

---

## Slide 13 — Bank misoli #3 · Muvofiqlik hisobot · Schedule

**Sarlavha:** Har juma 17:00 — Schedule trigger.
**Lead:** Muvofiqlik xodimi har juma 4 soatda hisobot to'plardi. Bot 5 daqiqada qiladi.
**5-step .flow:** Schedule juma 17:00 → Yig'ish (Postgres+1C+Sheets) → Anomaliya+xulosa (AI) → PDF shablonga → Email+arxiv

**Speaker text (~210 so'z):**
Uchinchi misol — Schedule trigger uchun klassik. Muvofiqlik bo'limi har juma haftalik hisobot tayyorlaydi: katta tranzaksiyalar, anomaliyalar, qora ro'yxatdagi mijozlar harakatlari. Eski tartib: muvofiqlik xodim 3-4 soat ma'lumotni Postgres'dan, 1C'dan, Sheets'dan qo'l bilan yig'adi, Excel'da tayyorlaydi, xulosa yozadi, PDF qiladi, email qiladi. Yangi tartib — bot qiladi, har juma 17:00 da. Birinchi qadam — Schedule trigger. Juma kuni soat 17:00. Workflow uyg'onadi. Ikkinchi qadam — yig'ish. SQL so'rovlar Postgres'ga, API'lar 1C'ga, Sheets'dan ma'lumot olinadi. Hammasi bir struktura ichiga keltiriladi. Uchinchi qadam — AI tahlili. Bu eng qiziqarli qism. AI ma'lumotni ko'rib, anomaliyalarni topadi: "bu mijoz oxirgi haftada 50 ta yangi tranzaksiya qildi, oldingi haftalardan 10 marta ko'p", "bu hisobda 5 ta katta o'tkazma yangi mamlakatga". Va xulosa yozadi — 2-3 paragrafda, audit komitetiga tushunarli tilda. To'rtinchi qadam — PDF. Tayyor shablonga jadval va xulosa joylanadi. Beshinchi qadam — email. Audit komiteti, bo'lim raisi, tegishli mas'ullarga yuboriladi, va arxivga saqlanadi. 4 soat ish — 5 daqiqaga qisqaradi. Muvofiqlik xodim endi tahlil qiladi, saralash bilan emas. Bu — vaqtning strategik foydalanishi.

---

## Slide 14 — Live mini-build · 5 ta node

**Sarlavha:** 5 ta node · o'z ko'zingiz bilan.
**Chip:** Live mini-build · 10 daq · ekranda
**Lead:** Telegram'dan kelgan savolni Gemini'ga jo'natamiz, javobni Sheets'ga yozamiz, mijozga qaytaramiz.
**5 ta node (workflow.json):** 01 Telegram Trigger → 02 Set node → 03 Gemini AI → 04 Sheets → 05 Telegram Reply
**Tagline:** Endi siz savol bering — botga yozasiz, javob ekranda chiqadi.

**Speaker text (~220 so'z):**
Endi eng qiziq qism. Hammasini chala-chala ko'rdik — endi men ekranda haqiqiy workflow yig'aman. Sizning ko'zingiz oldida. Vazifa: bot oladi sizdan savol, Gemini bilan javob beradi, va saqlaydi log'da. Birinchi node — Telegram Trigger. Bot username'i ekranda turibdi, men hozir nodeni qo'shaman, credentials'ni tanlayman. Tayyor — bot endi har xabarni "eshitadi". Ikkinchi node — Set. Telegram Trigger juda ko'p ma'lumot beradi: kim yozdi, qachon, qanday chat ID. Bizga faqat matn kerak. Set node bilan kerakli maydonni ajratamiz. Uchinchi node — Gemini AI. Eng asosiy. Promt shabloni: "Sen bank konsultanti. Foydalanuvchi savoliga professional, lekin tushunarli javob ber. Maksimal 3 abzas." Va foydalanuvchi savolini joylaymiz. To'rtinchi node — Google Sheets. Yangi qator: vaqt, foydalanuvchi, savol, javob. Audit uchun. Beshinchi node — Telegram Reply. AI javobini foydalanuvchiga qaytaradi. Hammasi. 5 ta node, 0 satr kod. "Activate" tugmasini bosaman, workflow ishga tushdi. Endi siz savol bering — Telegram bot username'i ekranda. Bittangiz savol yozing — javob ekranda 5 sekundda chiqadi. (Auditoriyadan 2-3 ta savol kutamiz, jonli ko'rsatamiz.) Bu — bizning oddiy demo. Ertaga shu skeletga PDF, RAG va xotira qo'shamiz.

---

## Slide 15 — 3 ta katta xato

**Sarlavha:** Workflow'da 3 ta katta xato · va to'g'risi.
**3 myth/reality:**
- Loop muammo → Idempotent dizayn (12-modul)
- Xato bo'lsa xat keladi → Error workflow + Telegram alert
- AI hammasini hal qiladi → AI tayyorlaydi, inson tasdiqlaydi (4-modul)

**Speaker text (~210 so'z):**
Workflow'lar bilan ishlaganda eng ko'p uchraydigan uch xatoni aytib bera. Birinchisi — loop. Bot ishladi deb xayoliga keldi-yu, qarab qo'ygani yo'q. Loop bo'lib qoldi: bot o'ziga o'zi xat yubordi, mijozga 200 marta bir xil xabar bordi. Yoki AI har 5 sekundda yangi versiyani ishlab chiqarib turdi, shu sabab oyiga $5000 hisob kelgan kompaniyalar bor. Yechim: idempotent dizayn — har trigger'ga unikal ID beriladi, ID takror kelsa workflow qayta bajarmaydi. Bu 12-modulda chuqur ko'ramiz. Hozircha shuni esda saqlang: har workflow'da "men buni 10 marta ishga tushirsam, oqibat bir marta ishlatgandagi bilan bir xil bo'ladimi?" deb savol bering. Ikkinchi xato — silent crash. Workflow yarim tunda yiqildi, ertasi kuni bilib qoldik. Mijozlar tushunarsiz xat olishdi. Yechim: error workflow va alert. Har n8n workflow'ga "agar yiqilsa, mana bu workflow ishlasin" deb beriladi — u Telegram'ga xato detallari bilan xabar yuboradi 30 sekundda. Ko'rmasdan qolmaysiz. Uchinchi xato — AI'ga juda ko'p ishonish. "AI hammasini hal qiladi" deb mijoz arizasini AI o'zi tasdiqlaydi, kredit beradi. Yo'q. AI tayyorlaydi, inson tasdiqlaydi. 4-modulning hand-off tamoyili shu yerda — mas'uliyat hech qachon AI'ga o'tmaydi.

---

## Slide 16 — Xavfsizlik · 3 qizil chiziq

**Sarlavha:** Xavfsizlik · 3 ta qizil chiziq.
**Lead:** No-code qulay, lekin "xohlagan xodim xohlagan workflow yasashi" — xato.
**3 sec:**
- 🔑 **API key — saqlanadi** — credentials bo'limi, shifrlangan, vault audit
- 📜 **Audit log — har qadam** — kim/qachon/qanday ma'lumot, xato joyini bir ko'rishda topish
- 👥 **Rolega kirish** — workflow yaratish bo'lim xodimi, production'ga chiqarish IT/Compliance

**Speaker text (~200 so'z):**
No-code qanchalik qulay bo'lsa, shunchalik xavfli — agar to'g'ri qoidalar bo'lmasa. Bo'lim xodimi har xil ma'lumotni har joyga yo'naltirib qo'yishi mumkin. Shuning uchun 3 ta qoida — qizil chiziq, ulardan o'tib bo'lmaydi. Birinchi qoida — API kalitlar saqlanadi. Telegram, Gemini, CRM, bank API kalitlari workflow ichiga yozilmaydi — n8n'ning credentials bo'limiga joylanadi, shifrlangan holda. Vault'da kim yaratganini, kim qaytarganini ko'rsatadi. Agar xodim ishdan ketsa, kalitlari rotated qilinadi avtomatik. Hech bir kalit kodda yoki ekranda ko'rinmaydi. Ikkinchi qoida — audit log. Har n8n node ishlashi avtomatik log'lanadi: kim trigger qildi, qachon, qaysi ma'lumot kirdi, qaysi chiqdi. Xato bo'lsa — qaysi qadamda yiqilganini bir ko'rishda topamiz. Bu muvofiqlik uchun — havo. Markaziy Bank tekshiruvi kelsa, oxirgi 3 yillik har bir avtomatlashtirilgan jarayon log'i saqlanadi. Uchinchi qoida — rolega kirish. Workflow yaratish — bo'lim xodimning huquqi. Lekin uni production'ga chiqarish — IT yoki Compliance tasdig'i shart. Sandbox'da sinab ko'rasiz, audit qilasiz, faqat undan keyin "live" bo'ladi. Bu 3-modulda gaplashganimiz xavf-xatar boshqaruvi tamoyillarining konkret amali.

---

## Slide 17 — Closing + lug'at recap

**Sarlavha:** Bugundan qaytib ketadigan 3 xulosa.
**3 xulosa:**
- No-code — prototip tezligini oshiradi (sandbox prototipi soatlarda · production qarori IT audit + komplayens tasdig'idan keyin · tezlik pilot bilan o'lchanadi)
- Trigger — workflow'ning yuragi (5 turdan biri · use-case'ga qarab; Webhook bo'lsa: token + IP + audit log shart)
- Ertaga 9-modulda RAG bot prototipini quramiz n8n ustida
**Lug'at recap:** Trigger · Webhook (token + log bilan himoyalanadi)

---

## Slide 18 — Bank qaror varaqasi · 6 ta savol (decision artifact)

**Sarlavha:** 6 ta savol — production yoki sandbox?
**Chip:** Bank qaror varaqasi · workflow pilotga chiqadimi?
**Lead:** Har bo'lim bitta workflow nomini yozsin. 6 savolga "ha" javobi bo'lmasa — sandbox prototipi, production emas.

**6 ta savol:**
1. **Trigger aniqmi?** Email · Schedule · Telegram · Form · Webhook — qaysi va nega.
2. **Ma'lumot turi aniqlanganmi?** Ochiq · ichki · maxfiy · mijozga oid — har biri uchun alohida nazorat.
3. **Inson qayerda tasdiqlaydi?** AI faqat tayyorlaydimi yoki qaror ham qilyaptimi — bankir imzosi qaerda.
4. **Audit log bormi?** Kim, qachon, nima kiritdi va nima chiqdi.
5. **Test mezoni bormi?** Vaqt · xato · SLA · eskalatsiya · xavfsizlik — pilot oxirida o'lchanadigan ko'rsatkichlar.
6. **Mas'ul shaxs bormi?** Bo'lim rahbari · IT rahbari · Komplayens rahbari — uchalasi imzolaydi.

**Speaker text (~150 so'z):**
Yakuniy savol-javobdan oldin — bugun olib ketadigan bitta artefakt. Bank qaror varaqasi. Har bo'lim 9-modulgacha bo'lgan tanaffusda bitta workflow nomini yozsin. So'ng shu 6 savolga "ha" yoki "yo'q" javob bering. Trigger aniqmi? Email yoki Schedule yoki Webhook — qaysi va nega. Ma'lumot turi qanday — ochiq jamoatchilik bo'limi axboroti emas, mijoz hisob raqami yoki shaxsiy ma'lumot bo'lsa, alohida nazorat shart. Inson qayerda tasdiqlaydi? AI faqat tayyorlasin, yakuniy "ha/yo'q" — bankir. Audit log: har qadam yozilishi shart. Test mezoni — pilot oxirida nimani o'lchaysiz: vaqt, xato, SLA, xavfsizlik incidenti. Mas'ul shaxs — uchov: bo'lim rahbari, IT rahbari, komplayens rahbari. Faqat 6 ta "ha" bo'lsa — workflow pilotdan production'ga chiqadi. Aks holda — sandbox'da qoladi. Bu varaqa ertaga 9-modulda RAG bot loyihalashda ham ishlaydi.

**Speaker text (~190 so'z):**
Yakun. Bugundan uy ga olib ketadigan uch fikr. Birinchisi: no-code — bo'lim xodimining yangi ish vositasi. Spravka misoli edi: 2 hafta sprintdan 30 daqiqali yig'ishga o'tdik. Programmist navbatini kutmaymiz — o'zimiz yig'amiz, IT auditdan o'tkazadi. Bu sizning ish kunlik amaliyotingizni o'zgartirishi mumkin bo'lgan eng amaliy bilim. Ikkinchisi: trigger — workflow'ning yuragi. Schedule, Webhook, Email, Telegram, Form. Bank stsenariylarining 95% shu beshlikka tushadi. Avtomatlashtirishni boshlaganda doim birinchi savol: "qaysi trigger?" Aniq javob bilan qoldirsangiz — qolgan qadamlar oson kelishadi. Uchinchisi: ertaga 9-modulda biz aynan shu n8n ustida sizning bo'limingiz uchun ishlaydigan birinchi RAG botni quramiz. Bu siz bilan birga qurish — auditoriyadagi har bir ishtirokchi bo'limining hujjatlariga asoslangan o'z botiga ega bo'ladi. Endi — lug'at recap. Birga aytamiz: Trigger nima edi? — workflow'ni boshlatuvchi hodisa. Webhook nima edi? — boshqa dasturdan xabar olish nuqtasi, URL. Yaxshi. Day 1 yakunlandi. Ertaga 9:00 da kun ikkita boshlanadi — kuchni saqlang, 9-modul amaliy va kuchli bo'ladi.

---

## Slide 19 — Q&A

**Sarlavha:** Sizning savollaringiz.
**Lead:** Workflow, trigger tanlash, n8n joylashtirish, xavfsizlik — marhamat.
**Contact:** murod@mohir.dev

**Speaker text (~120 so'z):**
Endi savollar. Eng ko'p uchraydiganlarini eslatib qo'yaman, agar qiziqsangiz — so'rang: "n8n bizning serverimizda qanday joylashtiriladi?" — IT bo'lim bilan keyingi haftada o'tirish kerak, Docker yoki VM versiya tanlanadi. "Qaysi triggerdan boshlash kerak?" — bo'limingizda eng ko'p qaytariladigan jarayonni belgilang, Schedule yoki Email bo'lib chiqadi odatda. "AI'ga ishonchsizman" — AI faqat tayyorlaydi, yakuniy tasdiq bankir imzosi orqali. "Bizning bank bunga tayyormi?" — pilot loyiha, bitta bo'limda, 4 hafta. 14-modulda MVP loyiha qilamiz. Boshqa savollar bor — yozing: murod@mohir.dev. Telegram orqali ham javob beraman. Day 1 yakunlandi. Rahmat. Day 2 — RAG, agentlar, voice memo, real keyslar. Eng amaliy qism — sizni ertaga kutamiz.

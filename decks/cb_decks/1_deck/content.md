<!--
  Humanized by .qa/humanize.mjs
  Source: decks\cb_decks\1_deck/content.md (existing) + index.html + 19 screenshots
  Model: gemini-3-pro-preview
  Generated: 2026-05-10T08:11:20.413Z
  Elapsed: 102.0s
  Tokens: in=66404 out=7425
-->
# 1-modul · Bank sektori uchun sun'iy intellekt asoslari — to'liq kontent

**Module:** 1-modul · Kun 1 · 9:15–10:15 (60 daqiqa)
**Format:** Ma'ruza + jonli demo + interaktiv brainstorm
**Audience:** Markaziy Bank xodimlari (operatsion, muvofiqlik, boshqaruv — dasturchilar emas)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Gemini (miya) + RAG (xotira) + n8n (ishchi) — mutlaqo kodsiz
**Slaydlar soni:** 20 ta · 4 ta faza
**Atamalar:** LLM, Promt, API (Slayd 8 da kiritiladi, slayd 19 da auditoriya bilan birga qaytariladi + AI qaror kartasi ko'prigi). RAG va Embedding — 9 va 11-modulning atamalari, bu yerda demo botning ishlash printsipi sifatida tilga olinadi xolos.

## Asosiy g'oya

AI — qandaydir tushunarsiz sehr yoki sizning ishingizni tortib oladigan dushman emas. Bu shunchaki sizning charchamaydigan, super-aqlli stajyoringiz. Bugun biz u bilan qanday gaplashishni o'rganamiz va kurs oxirigacha har biringiz o'z bo'limingiz uchun bitta kodsiz bot yasab ketasiz. Markaziy Bank uchun eng muhimi — bu bot internetdan taxmin qilib emas, aynan sizning tasdiqlangan hujjatlaringizdan (RAG) xavfsiz javob berishini tushunib olish.

---

## Deck outline (20 slayd)

| # | Sarlavha | Format / urg'u | Vaqt | Faza |
|---|---|---|---|---|
| 1 | Bank sektori uchun sun'iy intellekt asoslari | Kirish | ~1 daq | — |
| 2 | Mavzuning yo'l xaritasi | Agenda (4 bekat) | ~1 daq | — |
| 3 | Tanishuv · Kim sizga gapiradi? | Speaker intro (60 soniya) | ~1 daq | — |
| 4 | Odamlar AI'dan hozir qanday foydalanyapti? | WOW hook — rasm (kal/sochli) | ~1 daq | 01 |
| 5 | AI ko'pincha kontent o'yinchog'i bo'lib qolyapti | WOW hook — video (it) | ~1 daq | 01 |
| 6 | Keling, kelajakni hozir sinab ko'ramiz | Live demo (QR + bot) | ~5 daq | 01 |
| 7 | AI = super-aqlli ishchi | Metafora (17 tab vs AI) | ~3 daq | 01 |
| 8 | Uchta so'z — kursning poydevori | Lug'at (LLM, Promt, API) | ~4 daq | 01 |
| 9 | AI ishimni olib qo'yadimi? — Yo'q | Dramatic answer | ~1 daq | 01 |
| 10 | Miflarga qarshi zarba | Afsona ↔ Haqiqat (4 ta) | ~3 daq | 01 |
| 11 | AI — bu vosita. Sehr emas. | Can / Cannot chegaralari | ~3 daq | 01 |
| 12 | 10 yilda 15× o'sish | Global AI banking bozori | ~2 daq | 02 |
| 13 | Osiyo-Tinch okeani — eng tez o'sadigan | Mintaqaviy o'sish | ~1 daq | 02 |
| 14 | Banklar AI'ni qayerda ishlatadi? | 4 ta segment (Mijoz xizmati) | ~2 daq | 02 |
| 15 | Botni 3 rol bilan eslab qolamiz | Arxitektura (Miya, Xotira, Ishchi) | ~4 daq | 03 |
| 16 | Savol javobga qanday aylanadi? | RAG jarayoni (5 qadam) | ~4 daq | 03 |
| 17 | Bank siri va ma'lumotlar — qizil chiziq | Xavfsizlik (Masking, Zero-train) | ~4 daq | 03 |
| 18 | Eng zerikarli ish qaysi? | Interaktiv Wordcloud | ~6 daq | 04 |
| 19 | 2 kundan keyin: | Xulosa + Lug'at recap | ~3 daq | 04 |
| 20 | Sizning savollaringiz | Q&A | ~7 daq | 04 |

---

## Slide 1 — Bank sektori uchun sun'iy intellekt asoslari

**Sarlavha:**
Bank sektori uchun **sun'iy intellekt** asoslari.

**Lead matn:**
Kodsiz AI yechim — bank xodimlari uchun.

**Vizual elementlar:**
To'q ko'k fon, gridli yuza. Markazda katta oq sarlavha, "sun'iy intellekt" so'zi ko'k highlight bilan ajratilgan. Yuqorida vazirlik logotiplari.

**Speaker notes:**
Xush kelibsiz. Men Murad. Keling, darhol bir narsani kelishib olamiz: bu yerda qandaydir murakkab IT-ma'ruza bo'lmaydi. Men sizga kod yozishni o'rgatmayman. Ekranga e'tibor bering — "kodsiz AI yechim" degan yozuv bor. Ikki kundan keyin har biringiz o'z bo'limingiz — kredit bo'ladimi, muvofiqlikmi yoki mijozlarga xizmat ko'rsatishmi — o'sha yerdagi eng zerikarli ishingizni avtomatlashtiradigan bot yasab ketasiz. O'z qo'lingiz bilan. Dasturlashsiz.

---

## Slide 2 — Mavzuning yo'l xaritasi

**Sarlavha:**
Mavzuning **yo'l xaritasi**.

**Lead matn:**
01 AI aslida nima · 02 Raqamlar nima deyapti · 03 Bot ichida nima bor · 04 Sizning bankingizda nimalar qilsak bo'ladi

**Vizual elementlar:**
4 ta bosqichli grid. Har bir bosqich alohida karta ko'rinishida, ustiga borganda ko'k rangda yonadi.

**Speaker notes:**
Oldimizda 60 daqiqa va 4 ta aniq bekat bor. Birinchi — vahimani yig'ishtirib, AI aslida nimaligini bankir tilida tushunib olamiz. Ikkinchi — nega butun dunyo banklari bunga millionlar sarflayotganini raqamlarda ko'ramiz. Uchinchi — o'sha "sehrli" botimiz ichida nima borligini qismlarga ajratamiz. Va oxirida, eng muhimi — sizning bo'limingizdagi qaysi ishlarni AI'ga topshirishimiz mumkinligini birga hal qilamiz. Ketdik.

---

## Slide 3 — Tanishuv · Kim sizga gapiradi?

**Chip:** Tanishuv · 60 soniya

**Sarlavha:**
Sizga **2 kun** davomida kim gapiradi?

**Bio (chap):**
- Ism: Riskaliev Murad
- Brend: crea7iveai
- Tajriba: 3+ yildan beri AI va NLP loyihalari. Asosiy yo'nalish — O'zbek tili uchun production-grade AI: bank, ta'lim, e-commerce.

(Lavozim "NLP Engineer · Mohirdev" — pastdagi HUDda ko'rinib turibdi, takrorlamaymiz.)

**3 ta kalit raqam:**
- 10+ production AI mahsulotlar
- 5+ o'z startaplari va MVP'lar
- 2 kun — bugun sizga shu tajribani topshiraman

**Loyihalar va startaplar (o'ng):**
- **dialix** — AI suhbat platformasi
- **labelcraft** — ML data labeling
- **manakartabot** — Telegram AI bot
- **saytoai** — Sayt → AI yordamchi
- + va boshqa pet-projects va MVP'lar
- Havola: linkedin.com/in/risqaliyevds

**Speaker notes:**
60 soniyalik tanishuv. Tezkor, ammo asoslangan. Bankir nima uchun aynan menga ishonishi kerakligini bilishi muhim — qog'oz emas, real loyihalar.

Boshlang: ism, lavozim, brend. So'ng 1 jumla bilan tajriba doirasini bering: "3+ yildan beri AI bilan ishlayman, asosiy fokus — O'zbek tilida ishlaydigan production tizimlar". Bu jumla auditoriya uchun signal: ona tilida AI yangiliklarini aytayotgan odam.

Loyihalarni 1-2 ta misol bilan sharhlang (hammasini aytmang — slaydda bor):
- **dialix** — AI suhbat platformasi, biznes yordamchi botlar quradi.
- **saytoai** — har qanday sayt ustiga AI suhbatdosh qo'shadi.
- Qolganlarini "qiziqsangiz LinkedIn'da to'liq ro'yxat" deb yopib qo'ying.

3 raqam — qisqa va aniq. **2 kun** raqamiga urg'u bering: "Shu 3+ yillik tajribani 2 kun ichida sizga topshiramoz; nazariya emas — bu loyihalardan olingan real darslar".

LinkedIn havolasini eslatib qo'ying — auditoriyaga: "Slaydlardan keyin profiledan ham topishingiz mumkin".

Vaqt: 60 soniya. Uzaytirmang.

---

## Slide 4 — Odamlar AI'dan hozir qanday foydalanyapti?

**Sarlavha:**
Odamlar AI'dan hozir **qanday** foydalanyapti?

**Lead matn:**
Bu qiziq. Lekin bu AI'ning eng past qiymatli ishlatilishi.

**Vizual elementlar:**
Ikkita rasm yonma-yon. AVVAL — kal sochli yigit. KEYIN — AI yordamida soch qo'shilgan o'sha yigit.

**Speaker notes:**
Ekranga qarang. Ko'pchilik sun'iy intellekt deganda aynan shuni tushunadi. Rasm chizish, kimningdir yuzini o'zgartirish, memlar yasash. Aytmoqchi, bu o'zimman — AI menga soch qo'shib berdi. Qiziqmi? Ha. Lekin bank uchun buning bir tiyinlik qadri yo'q. Bu texnologiyaning eng ibtidoiy, eng past qiymatli ishlatilishi.

---

## Slide 5 — AI ko'pincha kontent o'yinchog'i bo'lib qolyapti

**Sarlavha:**
AI ko'pincha **kontent o'yinchog'i** bo'lib qolyapti.

**Lead matn:**
Rasm, video, mem, trend. Odamlar AI'ni ko'rinadigan, kulgili narsalarga sarflayapti.
Biz esa uni real ishga buramiz: hujjat, javob, tekshiruv, qaror tayyorlash.

**Vizual elementlar:**
Chap tomonda raqsga tushayotgan itning videosi aylanib turibdi.

**Speaker notes:**
Yoki mana bu. Itlarga raqs tushirish. Odamlar AI'ni hozir asosan shunday o'yinchoq sifatida ko'ryapti. Biz esa keyingi ikki kunda bu o'yinchoqni haqiqiy ish quroliga aylantiramiz. Bizga raqs kerak emas. Biz yuz sahifalik nizomdan risklarni 5 soniyada topishni, mijozning savoliga aniq javob tayyorlashni va kredit arizasini tekshirishni xohlaymiz.

---

## Slide 6 — Keling, kelajakni hozir sinab ko'ramiz

**Sarlavha:**
Keling, kelajakni **hozir** sinab ko'ramiz.

**Lead matn:**
Bu Google emas. Bu sizning bankingizdagi ichki bilim.

**Vizual elementlar:**
Katta QR kod va `t.me/bankragbot` ssilkasi. O'ng tomonda chat vizualizatsiyasi: foydalanuvchi avtokredit haqida so'rayapti, AI ichki PDF'dan qidirib javob beryapti.

**Speaker notes:**
Quruq gapdan ko'ra, keling amalda ko'ramiz. Telefonlarni olinglar. Shu QR kodni skaner qiling yoki Telegramdan botni toping. Unga bank xizmatlari, masalan avtokredit haqida ixtiyoriy savol yozing.
*(10-15 soniya pauza, zal botga kirishini kuting)*
Javob keldimi? E'tibor bering — bot Google'dan qidirib, taxmin qilib yozgani yo'q. U orqa fonda biz yuklagan test PDF hujjatini ochdi, o'qidi va faqat o'sha qoidaga asoslanib javob berdi. Manba ham ko'rsatildi: `kredit_siyosati.pdf, 4.2-band`. Yakuniy qaror baribir mas'ul xodimda qoladi. Real joriy etish faqat ma'lumot xavfsizligi, vakolat va inson tasdig'i belgilangandan keyin ko'rib chiqiladi.

**Demo qoidasi (slaydda yozilgan + auditoriyaga aytib o'ting):** bot faqat oldindan yuklangan test PDF korpusidan javob beradi · real mijoz ma'lumoti ishlatilmagan · hujjatda javob bo'lmasa, bot "ma'lumot topilmadi" deydi.

**Tayyorgarlik:**
Bot uzilishsiz ishlab turganiga ishonch hosil qiling. Agar kimdadir internet ishlamasa, ekrandagi chat animatsiyasiga ishora qiling.

---

## Slide 7 — AI = super-aqlli ishchi

**Sarlavha:**
AI = SUPER-AQLLI ISHCHI

**Lead matn:**
Metafora.

**Vizual elementlar:**
Ikkita panel. Chapda "17 TAB OCHILGAN" (charchagan xodim, qog'ozlar). O'ngda "AI TARTIBLANGAN ISH OQIMI" (hujjatni o'qiydi, xulosa qiladi, javob tayyorlaydi).

**Speaker notes:**
Aslida AI nima? U qandaydir hamma narsani biluvchi sehrgar emas. O'zingizni eng og'ir kuningizni eslang: brauzerda 17 ta tab ochilgan, oldingizda qog'ozlar uyumi, mijozlar bir xil savolni qayta-qayta beryapti, vaqt qistayapti. Charchaysiz, xato qilasiz.
AI esa — charchamaydigan, e'tibori chalg'imaydigan super-aqlli stajyor. Unga hujjatni berasiz, "shu yerdan risklarni topib ber" deysiz, u sizga tayyor xulosani chiqarib beradi. U mustaqil qaror qabul qilmaydi, u sizga qora mehnatni qilib beradi.

---

## Slide 8 — Uchta so'z — kursning poydevori

**Sarlavha:**
Uchta so'z — kursning **poydevori**.

**Lead matn:**
Keyingi 15 modulda bu uchta atama qaytib-qaytib chiqadi. Hozir bir marta tushunsak — dars ancha silliq kechadi.

**Vizual elementlar:**
3 ta karta:
1. LLM (Katta Til Modeli) — Inson tilini tushunuvchi "Miya". (Gemini, ChatGPT)
2. PROMT (To'g'ri Buyruq) — AI'dan narsa so'rash uchun yoziladigan savol.
3. API (AI'ni avtomat ulash) — Brauzerdan qo'l bilan emas, AI ichki tizim bilan o'zi suhbat quradi: CRM, Telegram bot, sayt.

**Speaker notes:**
IT jargonlarini yomon ko'raman, lekin shu uchta so'zni bugun kelishib olishimiz shart. Kurs davomida bularni ko'p eshitasiz.
Birinchisi — **LLM**. Bu kompyuterning til miyasi. Masalan, ChatGPT yoki biz ishlatadigan Gemini.
Ikkinchisi — **Promt**. Bu sizning AI'ga beradigan buyrug'ingiz. "Qisqa qilib yoz" yoki "Jadval qilib ber" — bular promt.
Uchinchisi — **API**. Brauzerdan ChatGPTga qo'l bilan yozish — bir xil ish. Lekin bank ichida AI'ni har gal qo'l bilan ishlatib bo'lmaydi: 1000 ta so'rov keldi — 1000 marta yozasizmi? API — bu AI'ni Telegram bot, CRM, ichki sayt bilan avtomat ulash usuli. Bir marta sozlanadi, har bir so'rov avtomatik ishlanadi. Boyagi Telegram botimiz aynan shu printsipda — AI bilan tizim API orqali bog'langan.

---

## Slide 9 — AI ishimni olib qo'yadimi?

**Sarlavha:**
AI ishimni olib qo'yadimi?

**Lead matn:**
AI ishlatadigan odam ishlatmaydigan odamni almashtiradi.

**Vizual elementlar:**
Markazda qizil rangda, qiyshiq urilgan ulkan "YO'Q" muhri (stamp).

**Speaker notes:**
Eng ko'p beriladigan, lekin hamma ham ochiq aytishga tortinadigan savol. AI ishimni olib qo'yadimi?
Javob qisqa — YO'Q.
AI o'z-o'zidan kelib bankir bo'lib qolmaydi. U kredit qarorini qabul qilolmaydi. Lekin bir narsani aniq biling: AI'dan foydalanishni o'rganib olgan bankir, eski usulda qog'oz titib o'tirgan bankirning o'rnini albatta egallaydi. Chunki u ishni 10 barobar tezroq qiladi. Biz shu birinchi guruhda bo'lishimiz kerak.

---

## Slide 10 — Miflarga qarshi zarba

**Sarlavha:**
**Miflarga** qarshi zarba.

**Lead matn:**
Afsona va Haqiqat juftliklari.

**Vizual elementlar:**
4 ta qator. Chapda qizil afsonalar, o'ngda ko'k haqiqatlar.
1. Hamma ish yo'qoladi vs AI ishlatadiganlar qoladi.
2. 5 yil dasturlash kerak vs "No-code" inqilobi.
3. AI hamma narsani biladi vs RAG orqali PDFdan javob.
4. AI = ChatGPT vs Gemini, Claude, n8n.

**Speaker notes:**
Zalda hozir "men dasturlashni bilmayman-ku" degan xavotir bor. Bu eng katta afsona. Hozir "No-code" inqilobi davri. Mantiqiy fikrlash kod yozishdan ancha muhimroq bo'lib qoldi.
Yana bir xato tushuncha — "AI hamma narsani biladi". Yo'q, AI qachondir o'qitilgan bazasini biladi xolos. Yangi kredit stavkangizni u qayerdan bilsin? Shuning uchun biz unga RAG orqali o'zimizning aniq PDF hujjatimizni beramiz.
Va oxirgisi, AI faqat ChatGPT degani emas. Bugun biz Google'ning Gemini modeli va n8n tizimi bilan ishlaymiz.

---

## Slide 11 — AI — bu vosita. Sehr emas.

**Sarlavha:**
AI — bu vosita. Sehr emas.

**Lead matn:**
Real bank misollari vs AI'ga yolg'iz topshirilmaydi.

**Vizual elementlar:**
Ikkita ustun. Chapda yashil belgilar bilan AI qila oladigan ishlar (Morgan Stanley, uchrashuv xulosasi, hujjat tahlili). O'ngda qizil belgilar bilan AI qila olmaydigan ishlar (Kredit tasdiqlash, AML qarori).

**Speaker notes:**
AI'dan sehrgar yasab olsak, ishonchimiz tez sinadi. Uning aniq chegaralari bor.
U nima qila oladi? Morgan Stanley hozir maslahatchilariga yuzlab tahliliy hujjatlardan javobni soniyalarda topish uchun AI beryapti. Yoki uchrashuvdan keyin mijozga xulosa emailini yozishni AI'ga topshiryapti. Bu zo'r ishlaydi.
Lekin u nimani eplay olmaydi? Yakuniy qarorni. AI sizga "bu mijozda risk borga o'xshaydi" deb signal berishi mumkin, lekin kreditni berish yoki rad etish tugmasini bosish har doim bankirning zimmasida qoladi. Mas'uliyatni AI'ga yuklab bo'lmaydi.

---

## Slide 12 — 10 yilda 15× o'sish

**Sarlavha:**
10 yilda **15× o'sish**

**Lead matn:**
AI Banking · Global Bozor

**Vizual elementlar:**
Katta raqamlar: 2023-yilda $20.87B → 2033-yilda $310.79B. O'rtada o'ngga qaragan strelka.

**Speaker notes:**
Nega aynan hozir Markaziy Bankda shu mavzuni o'tyapmiz? Chunki raqamlar aqldan ozdiradigan darajada.
O'tgan yili bank sohasida AI'ga 20 milliard dollar sarflangan bo'lsa, keyingi 10 yilda bu raqam 310 milliardga chiqadi. Bu 15 barobar o'sish degani. Har ikki yarim yilda bozor ikki barobar kattalashyapti. Bu poyezd allaqachon stansiyadan chiqib ketdi, biz unga hozir sakrab chiqib olishimiz kerak.

---

## Slide 13 — Osiyo-Tinch okeani — eng tez o'sadigan mintaqa

**Sarlavha:**
**Osiyo-Tinch okeani** — eng tez o'sadigan mintaqa

**Lead matn:**
Mintaqaviy o'sish · 2024–2033

**Vizual elementlar:**
4 ta mintaqa ko'rsatilgan progress barlar. Shimoliy Amerika eng katta, lekin Osiyo-Tinch okeani ko'k rangda yonib turibdi (eng tez o'sish).

**Speaker notes:**
Eng qizig'i shundaki, bu o'sish faqatgina Amerikada bo'layotgani yo'q. Ha, eng katta bozor hozircha ularda. Lekin eng tez o'sayotgan mintaqa — bu Osiyo-Tinch okeani.
Eslatma: bu O'zbekiston bo'yicha alohida prognoz emas — bu global signal. Lekin xulosa aniq: bank sektorida AI tezlashayapti, biz uchun muhim xulosa shu — texnologiyani shoshilmasdan, nazorat va pilot mezonlari bilan sinash kerak.

---

## Slide 14 — Banklar AI'ni qayerda ishlatadi?

**Sarlavha:**
Banklar AI'ni **qayerda** ishlatadi?

**Lead matn:**
Bankda AI · Qo'llash sohalari

**Vizual elementlar:**
2x2 grid. Risk menejmenti, Mijozlarga xizmat, Virtual yordamchi, Moliyaviy maslahat. Mijozlarga xizmat kartasi ko'k highlight bilan ajratilgan (Eng tez o'sadigan segment).

**Speaker notes:**
Xo'sh, banklar bu milliardlarni aynan qayerga sarflayapti? To'rtta asosiy yo'nalish bor. Risk menejmentida skoring va firibgarlikni aniqlash uchun. Virtual yordamchi sifatida bankirlarni o'ziga.
Lekin eng tez o'sadigan segment — bu Mijozlarga xizmat. 24/7 javob berish, navbatlarni yo'q qilish. Eslang, boya birinchi ko'rgan Telegram botimiz aynan shu segmentga tushadi.

---

## Slide 15 — Botni 3 rol bilan eslab qolamiz

**Sarlavha:**
Botni 3 rol bilan eslab qolamiz

**Lead matn:**
Tizim rollari

**Vizual elementlar:**
3 ta karta:
1. Miya (Gemini) — Matnni tushunadi.
2. Xotira (RAG) — Bankning tasdiqlangan hujjatlari.
3. Ishchi (n8n) — Jarayonni boshqaradi.

**Speaker notes:**
Endi, keling boyagi botimizning qopqog'ini ochib, ichiga qaraymiz. U qanday ishlaydi? Bu yerda faqat uchta qahramon bor.
Birinchisi — **Miya**. Bizda bu Gemini. U matnni o'qiydi va insondek tushunadi.
Ikkinchisi — **Xotira**. Bu RAG tizimi. Ya'ni bizning bankimizning qoidalari, PDF hujjatlarimiz. Miya faqat shu xotiradan ma'lumot oladi.
Uchinchisi — **Ishchi**. Bu n8n deb ataladigan platforma. U Telegramdan savolni oladi, xotiradan qidiradi, miyaga beradi va tayyor javobni yana Telegramga qaytaradi. U bizning qo'llarimiz.

---

## Slide 16 — Savol javobga qanday aylanadi?

**Sarlavha:**
Savol javobga qanday aylanadi?

**Lead matn:**
RAG jarayoni

**Vizual elementlar:**
Jarayon chizig'i: Savol → Qidiruv → PDF'dan topish → Tahlil → Javob.
Pastda qora terminal (kod oynasi) ko'rinishida savol va javob logi.

**Speaker notes:**
Mijoz Telegramda "Avtokredit boshlang'ich to'lovi qancha?" deb yozganida nima yuz beradi?
Ishchi (n8n) savolni oladi. Uni Xotiraga olib borib, "kredit_siyosati.pdf" ning 4.2-bo'limidan kerakli xatboshini topib oladi. Keyin bu qisqa matnni Miyaga (Gemini) berib, "Shunga qarab chiroyli javob yozib ber" deydi.
Gemini tahlil qiladi va javob qaytaradi. Eng muhimi — u o'zidan hech narsa qo'shmaydi. Agar PDF'da javob bo'lmasa, "Men bu ma'lumotni topa olmadim" deydi. Bu bizni gallyutsinatsiyadan asraydi.

---

## Slide 17 — Bank siri va ma'lumotlar — qizil chiziq

**Sarlavha:**
Bank siri va ma'lumotlar — **qizil chiziq**.

**Lead matn:**
AI yechim bankda faqat quyidagi nazoratlar to'liq joriy bo'lganda ishlatiladi.

**Vizual elementlar:**
3 ta xavfsizlik bloki: Yopiq Kontur, Zero-Training, Data Masking.

**Speaker notes:**
Meni eshitib turib, ichingizda bitta savol aylanyapti: "Xavfsizlik nima bo'ladi? Bank siri-chi?"
Juda to'g'ri savol. Biz ochiq ChatGPT'ga mijoz pasportini tashlamaymiz.
Birinchidan, biz Yopiq Kontur (API) orqali ishlaymiz. Ikkinchidan, Google bilan "Zero-Training" kelishuvi bor — ya'ni biz yuborgan ma'lumotlar ularning modelini o'qitish uchun ishlatilmaydi. Uchinchidan, Data Masking — mijozning ismi, hisob raqami AI'ga yetib borguncha avtomatik tarzda o'chirib, yashirib yuboriladi. Muvofiqlik haqida ertaga 3-modulda juda chuqur gaplashamiz.

---

## Slide 18 — Eng zerikarli ish qaysi?

**Sarlavha:**
Eng zerikarli ish qaysi?

**Lead matn:**
Interaktiv so'rovnoma

**Vizual elementlar:**
Katta harflar bilan Wordcloud (so'zlar buluti): hisobot, hujjat tekshirish, mijoz savollari, shikoyatlar, Excel, takroriy javob. Pastida 4 ta mezon-pill: takrorlanadi · hujjatga tayanadi · xavfi past · inson tasdig'i saqlanadi.

**Speaker notes:**
Endi navbat sizga. Ma'ruza tugadi.
O'ylab ko'ring, har kuni ishingizda asabingizni eng ko'p buzadigan, "shuni kimdir qilsa-yu, men qutulsam" deydigan eng zerikarli rutinalaringiz qaysi? Hisobot yig'ishmi? Yuzlab sahifa hujjat tekshirishmi? Yo oxiri ko'rinmaydigan Excel jadvallarmi?
*(Zaldan javoblarni eshiting, Wordcloud'dagi so'zlarga urg'u bering)*
Ajoyib. Mana shu aytgan muammolaringizning eng ko'p takrorlanganini olamiz va ertangi amaliyotda o'z qo'limiz bilan unga bot yasaymiz.

---

## Slide 19 — 2 kundan keyin:

**Sarlavha:**
2 kundan keyin:

**Lead matn:**
Siz AI haqida shunchaki eshitgan odam emas, AI bilan ishlaydigan bankirga aylanasiz.

**Vizual elementlar:**
Markazda katta xulosa matni. Pastda interaktiv lug'at recap: LLM = miya, Promt = buyruq, API = avtomat ulash. Eng pastda — "AI qaror kartasi" ko'prik bloki (3 ta savol): 1) Qaysi takroriy jarayon? 2) Qaysi tasdiqlangan hujjat? 3) Qaysi joyda inson tasdig'i?

**Speaker notes:**
Xulosa qilamiz. AI ishingizni olmaydi, u ishingizni tezlashtiradi.
Keling, bugun o'rgangan uchta asosiy so'zimizni birga qaytaramiz. Men boshini aytaman, siz davomini.
LLM nima edi? *(Zal: Kompyuter miyasi / Gemini)*
Promt nima edi? *(Zal: AI'ga beriladigan buyruq / savol)*
Va uchinchisi, API nima edi? *(Zal: AI'ni boshqa tizim bilan avtomat ulash / CRM, Telegram botga ulash)*
Ajoyib. Endi 2-modulga ko'prik. Har bir guruh 1 betlik "AI qaror kartasi"ni to'ldiradi: qaysi takroriy jarayon? qaysi tasdiqlangan hujjat? qaysi joyda inson tasdig'i shart? Shu karta 2-moduldagi use-case tanlovimizga kirish nuqtasi bo'ladi.

---

## Slide 20 — Sizning savollaringiz

**Sarlavha:**
Sizning **savollaringiz**.

**Lead matn:**
murod@mohir.dev

**Vizual elementlar:**
Katta ko'k so'roq belgisi. Pastda spikerning elektron pochtasi.

**Speaker notes:**
Menda hozircha shular. Endi mikrofon sizda. Muvofiqlik, botning ishlashi, yoki hozirgina aytgan muammolaringiz bo'yicha qanday savollar bor? Bemalol.
*(Savollarga javob bering. Agar texnik yoki muvofiqlik savoli juda chuqurlashsa, "Bu mavzuni 3 yoki 5-modulda batafsil ko'ramiz" deb ko'prik tashlang).*

---

## Series-wide bog'lanish

- **Keyingi modul:** `2_deck/` — Bank jarayonlarida SI qo'llash imkoniyatlarini aniqlash (bu yerda yig'ilgan og'riqlar tahlil qilinadi).
- **Muvofiqlik chuqur:** `3_deck/` — Xavfsizlik va yopiq kontur (slide 16 dagi mavzular).
- **RAG chuqur:** `9_deck/` — Slide 15 dagi jarayonni o'z qo'limiz bilan yig'amiz.

## Tayyorgarlik checklist

- [ ] Demo Telegram bot (`bots/01_rag_basics/`) barqaror ishlayotganini tekshirish.
- [ ] Slide 5 dagi QR kod aynan o'sha botga olib borishini telefon orqali sinab ko'rish.
- [ ] Slide 3 va 4 dagi media (rasm va video) to'g'ri ochilayotganini tekshirish.
- [ ] Slide 11 va 12 dagi Spherical Insights raqamlarini (15x o'sish, $310B) xotirada yangilash.
- [ ] Slide 18 dagi lug'at recap interaktivligini (klaviatura o'ng tugmasi bilan birin-ketin ochilishini) sinash.

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Kirish va Yo'l xaritasi | 1–2 | ~2 daq |
| 01 · Tushuncha va Miflar | 3–10 | ~17 daq |
| 02 · Raqamlar va Bozor | 11–13 | ~5 daq |
| 03 · Texnik jarayon va Xavfsizlik | 14–16 | ~12 daq |
| 04 · Amaliyot, Xulosa va Q&A | 17–19 | ~24 daq |
| **Jami** | **19 ta slayd** | **~60 daq** |

---

## Restructure tarixi
- **v5 (joriy):** 19 slaydlik jonli `index.html` bilan to'liq sinxronlandi. RAG tushunchasi to'g'rilandi. AI klişelari tozalandi, gapirish ohangi bankir/spiker tiliga o'girildi.
- **v4:** 14 → 19 slayd. Wow hook ikkilik (image + video), Spherical Insights stat trio, stamp "YO'Q", interaktiv lug'at recap qo'shilgan.
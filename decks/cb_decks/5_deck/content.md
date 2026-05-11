<!--
  Humanized by .qa/humanize.mjs
  Source: decks\cb_decks\5_deck/content.md (existing) + index.html + 13 screenshots
  Model: gemini-3-pro-preview
  Generated: 2026-05-10T10:47:59.328Z
  Elapsed: 78.2s
  Tokens: in=50606 out=6582
-->
# 5-modul · Promt muhandisligi — professional daraja

**Module:** 5-modul · Kun 1 · 14:15–15:15 (60 daqiqa)  
**Format:** Namoyish + mashq (demo + exercise)  
**Audience:** Markaziy Bank xodimlari (kredit, muvofiqlik, operatsion bo'lim, mijozlarga xizmat ko'rsatish)  
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev  
**Brand:** crea7iveai  
**Stack:** Promt — universal vosita (Gemini, ChatGPT, Claude)  
**Slaydlar soni:** 13 ta  
**Atamalar (≥2/modul):** Few-shot Prompting, Chain-of-Thought (CoT) — slayd 5 da kiritiladi, slayd 12 da birga qaytariladi.

> **Asosiy g'oya:** "Promt yozish" bu dasturlash emas. Bu — ishga yangi kelgan, juda tez ishlaydigan, lekin har bir so'zingizni to'g'ridan-to'g'ri tushunadigan stajyorga aniq vazifa berish san'ati. AI bilan to'g'ri gaplashishni o'rgansak, u eng zerikarli qog'ozbozlikni o'z bo'yniga oladi.

---

## Deck outline

| # | Sarlavha | Format / urg'u | Vaqt | Faza |
|---|---|---|---|---|
| 1 | Promt muhandisligi — professional daraja | Title | ~2 daq | — |
| 2 | Mavzuning yo'l xaritasi | Agenda — 4 faza | ~1 daq | — |
| 3 | Qaysi promt eng aniq javob beradi? | Vote-hook — `.s-vote` · 3 karta | ~1 daq | 01 Asoslar |
| 4 | Bir vazifa — ikki natija | Hook · BAD vs GOOD | ~7 daq | 01 Asoslar |
| 4 | Sifatli promtning 5 ta elementi | 5 ta element grid | ~4 daq | 01 Asoslar |
| 5 | Ikkita texnika — promtning kuchli qurollari | Few-shot + CoT lug'ati | ~3 daq | 01 Asoslar |
| 6 | Few-shot — namuna bilan o'rgatish | 0-shot → 1-shot → Few-shot | ~6 daq | 02 Texnikalar |
| 7 | Chain-of-Thought — quruq vs asoslangan javob | Audit izi · 5 qismli format | ~6 daq | 02 Texnikalar |
| 8 | Bankir uchun 3 ta tayyor shablon | Kredit memo · Mijoz · KYC | ~6 daq | 03 Bank misollari |
| 9 | Sizning bo'limingiz uchun promt yozaylik | Live workshop (`<pre>`) | ~12 daq | 04 Mashq |
| 10 | Yo'l qo'yiladigan 3 ta xato | Afsona vs Haqiqat | ~4 daq | 04 Mashq |
| 11 | Yaxshi promtni 5 sekundda taniysiz | Checklist | ~3 daq | 04 Mashq |
| 12 | Bugundan olib ketadigan 3 ta asosiy xulosa | Yakun + Lug'at recap | ~3 daq | 04 Mashq |
| 13 | Sizning savollaringiz | Q&A | ~3 daq | 04 Mashq |

---

## Slide 1 — Promt muhandisligi — professional daraja

**Sarlavha:**
Promt **muhandisligi** — professional daraja.

**Lead matn:**
Kun 1 · 14:15 — 15:15
AI bilan to'g'ri gaplashish texnikasi va shablonlari.

**Vizual elementlar:**
To'q ko'k fon, grid yuzasi. "Muhandisligi" so'zi yorqin ko'k rangda ajratilgan.

**Speaker notes:**
Xush kelibsizlar. Oldingi soatda biz jarayonlarni qanday qilib qismlarga bo'lishni ko'rdik. Endi eng qiziq va muhim qismga keldik. 

Ekranda "muhandisligi" degan vahimali so'z turibdi. Ko'pchilik "E-e, men bankirman, muhandis emas, kod yozishni bilmayman" deb o'ylaydi. Aytmoqchi, men ham boshida shunday o'ylardim — adashgan ekanman.

Promt yozish — bu kod yozish emas. Bu shunchaki o'z fikringizni aniq, lo'nda, hech qanday ortiqcha gaplarsiz tushuntirish. Xuddi yangi xodimga: "Mana bu hujjatni ol, faqat 3-bandini o'qi, DTI ni hisobla va menga ikkita xatboshida xulosa qilib ber" degandek gap. 

Bugun sizlar bilan AI tilini oddiy bankir tiliga o'giramiz. Kettik.

---

## Slide 2 — Mavzuning yo'l xaritasi

**Sarlavha:**
Mavzuning **yo'l xaritasi**.

**Lead matn:**
Agenda

**Vizual elementlar:**
4 ta faza uchun 2x2 grid. Interaktiv kartochkalar.

**Speaker notes:**
Oldimizda 60 daqiqa bor. Rejamiz juda oddiy.

Birinchisi — Asoslar. Nega ba'zida AI juda ahmoqona javob beradi va buni qanday to'g'rilaymiz?
Ikkinchisi — Texnikalar. Ikkita professional usulni ko'ramiz.
Uchinchisi — Bank misollari. Shu yerda hammamiz telefonlarni chiqarib, ekrandagi tayyor shablonlarni rasmga olib olamiz. Ertalab ishda asqotadi.
Va to'rtinchisi — eng kattasi. Mashq. Zal bilan birgalikda o'zimizning birinchi professional promtimizni yozamiz. Keng tarqalgan xatolar, checklist, yakun. Tayyormizmi? Boshladik.

---

## Slide 3 — Vote-hook · Qaysi promt eng aniq javob beradi?

**Format:** 30 soniyalik mini-so'rovnoma. 3 ta vote-card (`.vote-grid--3`): "01 · 'Javob yoz'" (mavhum buyruq), "02 · Xushmuomala" ("iltimos, professional ohangda..."), "03 · Strukturali" (rol · vazifa · qoidalar · misol). Spiker zaldan ovoz oladi va strukturali variant (03) — bu modulning markaziy texnikasi ekanini e'lon qiladi.

---

## Slide 4 — Bir vazifa — ikki natija

**Sarlavha:**
Bir vazifa — **ikki natija**.

**Lead matn:**
Ikkita stajyorga bir xil topshiriq berdik. Promt qanday yozilsa — AI shunday javob beradi.

**Vizual elementlar:**
Ekranda ikkita karta. Chapda qorong'i "Yomon promt", o'ngda yorqin "To'la promt". AI natijalari kichikroq kursiv bilan.

**Speaker notes:**
Ekranga qaraymiz. Tasavvur qiling, bo'limingizga ikkita stajyor keldi. Ikkalasiga ham bir xil vazifa berdingiz.

Chapdagi stajyorga aytdingiz: "Hisobotni tahlil qil". Bo'ldi.
U nima yozdi? *"Hisobot ko'rib chiqildi. Bir nechta ko'rsatkichlar belgilanishi mumkin. Qo'shimcha ma'lumot kerak."* 
Shu zalda kim shunday xulosa yozgan xodimni maqtagan bo'lardi? Hech kim. Bu xulosada nol ma'lumot. Bo'sh.

Endi o'ng tomonga qaraymiz. Ikkinchi stajyorga aniqroq aytdingiz: *"Sen — bank nazorati bo'limi tahlilchisan. Quyidagi prudensial hisobotda 3 ta ko'rsatkich talabga mos kelmasa, rahbariyat uchun 1 betlik xulosa tayyorla: faktlar · qaysi normaga zid · risk · keyingi qadam."*

Natijani qarang: *"1) Kapital yetarliligi 11.2% (norma ≥13%). 2) Likvidlik 18% (norma ≥25%). 3) Risk: o'rta-yuqori. Tavsiya: 3 kun ichida tushuntirish xati so'rash."*

Farqni ko'ryapsizmi? Aniq raqam bor, mantiq bor, keyingi qadam bor. Rahbariyat oldida himoyalanadigan, audit izi tayyor xulosa.

(Pauza)
Sizlarga bitta sirni aytaman. Bu ikkala stajyor ham — bitta AI. Bitta model. Farq AI'da emas. Farq — biz qanday savol berganimizda.

---

## Slide 4 — Sifatli promtning 5 ta elementi

**Sarlavha:**
Sifatli promtning **5 ta elementi**.

**Lead matn:**
Yaxshi promt — rejaga muvofiq qurilgan jumla. Beshta blok bor: barchasi birdek muhim.

**Vizual elementlar:**
2 ta tepada, 3 ta pastda joylashgan grid kartochkalari (Rol, Kontekst, Vazifa, Format, Misollar). Beshinchi kartochka ixtiyoriy ekanligini bildirish uchun chiziqli (dashed) hoshiyada.

**Speaker notes:**
Xo'sh, o'sha o'ng tomondagi "mo''jizaviy" promt qanday yoziladi? Uning doim 5 ta qismi bo'ladi.

Birinchisi — **Rol**. AI'ga kiyim kiydiring. "Sen xodimsan" emas, "Sen 10 yillik tajribaga ega kredit tahlilchisisan". O'zini tutishi o'zgaradi.
Ikkinchisi — **Kontekst**. Vaziyat nima o'zi? Mijoz kim? Qanday qoidaga tayanyapmiz? Kontekstsiz AI — bu ko'zi bog'liq holda mashina haydayotgan odam.
Uchinchisi — **Vazifa**. Bitta aniq fe'l. "Tahlil qil", "Solishtir". "Hammasini ko'rib chiqib, o'ylab ko'r" degan mavhum gaplar o'tmaydi.
To'rtinchisi — **Format**. Bu eng ko'p unutiladigan narsa. AI'ga qolib bermasangiz, u sizga 3 betlik doston yozib beradi. "3 ta abzas", "Jadval qilib ber", "100 ta so'zdan oshmasin" deng.
Beshinchisi — **Misollar**. Bu ixtiyoriy, lekin eng kuchli qurol. Buni keyingi slaydda ko'ramiz. 

Shu 5 ta blokni eslab qolsangiz, ertadan ishingiz ikki barobar tezlashadi.

---

## Slide 5 — Ikkita texnika — promtning kuchli qurollari

**Sarlavha:**
Ikkita texnika — promtning **kuchli qurollari**.

**Lead matn:**
Bu ikki atamani keyingi 10 modulda yana eshitasiz. Hozir bir marta tushunsak — qolgan vaqtda osonroq bo'ladi.

**Vizual elementlar:**
Ikkita katta kartochka: Chapda Few-shot, o'ngda Chain-of-Thought. Har birida ta'rif va bank sohasi uchun misol.

**Speaker notes:**
Eslaysizlarmi, har darsning boshida atama o'rganyapmiz. Bugun yodlab olishimiz kerak bo'lgan ikkita yangi so'z bor. Bu atamalar ertaga ham, kelasi haftada ham oldimizdan chiqadi.

Birinchisi: **Few-shot Prompting**. O'zbekchasiga — "namuna bilan o'rgatish".
AI'ga quruq qoida tushuntirgandan ko'ra, "Mana senga arxivdagi 3 ta tayyor hujjat, to'rtinchisini xuddi shularga o'xshatib yoz" deymiz. AI naqshni aynan sizning bank ovozingizdan oladi.

Ikkinchisi: **Chain-of-Thought** yoki qisqacha CoT. O'zbekchasiga — "Asoslangan javob · audit izi". Bu modelning ichki fikrini chiqarish emas. Maqsad — javob formatini biz boshqarish: AI'dan quruq "Ha/Yo'q" emas, **asos · mezon · hisob-kitob · tekshiruv bandlari** bilan javob so'raymiz. Auditga tushuntirsa bo'ladigan javob shu yerdan boshlanadi.

---

## Slide 6 — Few-shot — namuna bilan o'rgatish

**Sarlavha:**
**Few-shot** — namuna bilan o'rgatish.

**Lead matn:**
Bir vazifani uch xil yozamiz. Misol soni qancha ko'p — javob shuncha aniq.

**Vizual elementlar:**
Uch bosqichli gorizontal jarayon (0-shot → 1-shot → Few-shot). Uchinchi qadam ko'k rangda ajratilgan.

**Speaker notes:**
Keling, namuna qanday ishlashini ko'ramiz. Mijozning shikoyat xatiga javob yozishimiz kerak.

0-shot (nol namuna). "Javob yoz" deymiz. Natija? Umumiy, quruq, rasmiy. Mijoz buni o'qib asabi buzilishi aniq.
1-shot (bitta namuna). "Mana bu xatga o'xshatib yoz" deymiz. AI formatni tushunadi, lekin ohang hali ham g'alati.
Few-shot (bir nechta namuna). Ekranga qarang, uchinchi bosqich. Biz unga eng tajribali xodimimiz yozgan 3 ta tasdiqlangan javobni beramiz va "Quyidagi 3 ta namuna kabi yoz" deymiz. Natija? AI sizning ovozingizni oladi. U endi yuzsiz robot emas, xuddi sizning bo'limingizda 5 yil ishlagan mutaxassisdek yozadi.

(Zalga qarab) Real ish jarayonidagi promtlarda 2–3 ta namuna berish — bu oltin standart.

---

## Slide 7 — Chain-of-Thought — quruq javob vs asoslangan javob

**Sarlavha:**
**Chain-of-Thought** — quruq javob vs asoslangan javob.

**Lead matn:**
Bu AI'ning ichki fikrini chiqarish emas. Maqsad — javob formatini biz boshqarish: faktlar, mezon, hisob va tekshiruv bandlarini alohida ko'rsatish.

**Vizual elementlar:**
Chapda "Quruq so'rov" va AI natijasi (qizil xoch: asos yo'q). O'ngda "CoT · Asoslangan format" so'rovi va natijasi (yashil galochka: asos · mezon · audit izi tayyor).

**Speaker notes:**
Endi, eng nozik masala. Muvofiqlik va nazorat xodimlari bormi zalda? Bu sizlar uchun.

Chap tomonga qarang. AI'dan so'rayapmiz: "AML hisobotida shubhali operatsiya bormi? Risk yuqorimi?"
AI javob beryapti: "Ha, risk yuqori."
(Pauza) Sizga bitta xodim kelib, hujjatga qaramasdan "Ha, risk bor" desa, ishonasizmi? Yo'q! Asos, mezon, qaysi raqam ortib ketdi — hammasi kerak.

O'ng tomonga qarang. Promtni o'zgartiramiz: "Quyidagi hisobotni tahlil qil. Javob formatini saqla: 1) faktlar, 2) qo'llangan mezon, 3) hisob-kitob, 4) nomuvofiqlik yoki risk, 5) inson tekshiruvi kerak bandlar. Yetishmagan ma'lumotni taxmin qilma."
Endi AI javobi: "1) 3 ta tranzaksiya 200 mln dan oshgan. 2) Mezon: 100 mln ostonasi. 3) 3/3 oshgan. 4) Manba hujjati yo'q. 5) Compliance xodimi tasdig'i kerak."

Mana bu — asoslangan javob. Asosini ko'rsatgan AI javobini xodim tekshirishi va himoyalashi oson. Bu modelning ichki fikrini chiqarish emas — bu javob formatini biz boshqarishimiz.

---

## Slide 8 — Markaziy Bank xodimi uchun 3 ta tayyor shablon

**Sarlavha:**
Markaziy Bank xodimi uchun **3 ta tayyor shablon**.

**Lead matn:**
Uch xil bo'lim — bir xil 5 element. Telefoningizga rasmga oling, ertaga ishda ishlatasiz.

**Vizual elementlar:**
3 ta kodli kartochkalar (Normativ hujjat xulosasi, Mijoz xatiga javob, KYC qisqa xulosa). Har birida "Sen — [rol]", "Vazifa — [format]" aniq ajratilgan.

**Speaker notes:**
Hammadan iltimos, telefonlarni chiqaramiz. Bu slaydni rasmga olib oling — bu yerda quruq nazariya emas, tayyor ish quroli turibdi.

Uchta shablon, uchta turli bo'lim uchun. Lekin tarkibi — bir xil 5 element.

Birinchisi — **Normativ hujjat xulosasi**. Bu zalda nazorat, tahlil yoki huquq bo'limidan kelganlar uchun. "Sen — moliyaviy tartibga solish bo'yicha tahlilchisan" deb rolni belgilaymiz, kirish hujjatining matnini beramiz, format esa: 1 betlik xulosa — asosiy talablar, ta'sirlanadigan tashkilotlar, risklar va ochiq qoladigan savollar.

Ikkinchisi — **Mijoz xatiga javob**. Bu mijozlarga xizmat ko'rsatish va operatsion bo'limlar uchun. Tonal aniq belgilangan: rasmiy, hamdard, aniq. 3 abzas.

Uchinchisi — **KYC qisqa xulosa**. Bu muvofiqlik uchun. Kechqurun soat 19:00 da 47 sahifalik tekshiruv hujjatini o'qib o'tirmaysiz — shu shablonga solasiz, AI 200 so'zda xulosa qiladi. Lekin diqqat: hujjatdagi shaxsiy ma'lumotni avval olib tashlaymiz. Bu haqida keyingi slaydda gapiramiz.

Keyingi darsda (6-modulda) biz sizga shunday shablonlardan 30 tasini beramiz — har bo'lim uchun alohida.

---

## Slide 9 — Sizning bo'limingiz uchun promt yozaylik

**Sarlavha:**
Sizning bo'limingiz uchun **promt yozaylik**.

**Lead matn:**
Beshta blokni jamoa bilan birga to'ldiramiz. Yozish — ekranda. Tasdiq — sizning ovozingizdan.

**Vizual elementlar:**
Katta terminal ko'rinishidagi qora quti (`prompt.txt`). Ichida 5 ta qator: sen, kontekst, vazifa, format, misol.

**Speaker notes:**
Bo'ldi, nazariya tugadi. Kelinglar, o'zimiz yozamiz. 
Men hozir klaviaturadaman, sizlar menga nima yozishni aytasiz.

(Zalga qarab) Qaysi bo'lim uchun yozamiz? Kredit bo'limi? Yaxshi.
Birinchi qator: ROL. Nima deb yozay? (Zaldan javob kuting) "Sen — yetakchi avtokredit mutaxassisisan". Yozdim.
Kontekst nima beramiz? "Mijoz BYD Song Plus olmoqchi, daromadi rasmiy emas". Yozdim.
Vazifa? "Riskni tahlil qil". 
Format qanday bo'lsin? "Jadval ko'rinishida: plyuslar, minuslar va qaror."

Ko'ryapsizmi? Biz hozirgina 2 daqiqa ichida shunday promt yozdikki, u ishingizni kamida 30 daqiqaga qisqartiradi. Hech qanday sehr yo'q, faqat shu 5 ta element.

*(Tayyorgarlik: Bu slaydda auditoriya aytgan gaplarni ekranda real vaqtda yozib ko'rsatish kerak)*

---

## Slide 10 — Yo'l qo'yiladigan 3 ta xato

**Sarlavha:**
Yo'l qo'yiladigan **3 ta xato**.

**Lead matn:**
Afsona va Haqiqat.

**Vizual elementlar:**
3 ta qator. Qizil rangda "Afsona", yashil ko'k rangda "Haqiqat". Ixcham dizayn.

**Speaker notes:**
Promt yozishda ko'pchilik tushadigan 3 ta xato bor. Bu uchtasini bilsangiz — yarmi safardan qutulasiz.

Birinchi afsona: "Qancha uzun yozsam, shuncha aqlli tushunadi". 
Yo'q. AI'ni ortiqcha so'zlar chalg'itadi. Aniq promt — uzun promtdan ancha kuchli. 5 element yetarli.

Ikkinchi afsona — bu eng xavflisi: "Real mijoz hujjatini AI'ga yopishtirsam, tezroq xulosa qiladi". 
Yo'q. Bu zalda hech kim mijozning pasportini, hisob raqamini yoki ichki tekshiruv hujjatini AI'ga to'g'ridan-to'g'ri yubormaydi. Qoida: avval ismni "Mijoz X", raqamni "100 mln" deb umumlashtirasiz, keyin yuborasiz. AI yordamchi, lekin maxfiy ma'lumot eshigi sizning qo'lingizda qoladi. Yakuniy javobni doim siz tekshirasiz.

Uchinchi afsona: Bitta zo'r promt yozib olib, hamma ishga ishlatsa bo'ladi.
Yo'q. Mijozga javob yozadigan shablon muvofiqlik tekshiruviga tushmaydi. Har vazifa uchun alohida shablon bo'lishi shart.

---

## Slide 11 — Yaxshi promtni 5 sekundda taniysiz

**Sarlavha:**
Yaxshi promtni **5 sekundda** taniysiz.

**Lead matn:**
Yuborishdan oldin shu ro'yxat bilan tekshiring. Bittasi yetishmasa — qayta yozing.

**Vizual elementlar:**
Ikki ustunli ro'yxat. Chapda "Yaxshi promt belgilari" (5 ta belgi), o'ngda "Yomon promt belgilari" (5 ta belgi). Yashil ↔ qizil aksent.

**Yaxshi promt belgilari (chap, ✓):**
- Rol aniq belgilangan (kim gapiradi)
- Kontekst yetarli (vaziyat, mijoz, qoida)
- Bitta aniq vazifa (bitta fe'l)
- Format ko'rsatilgan (3 abzas, jadval, 100 so'z)
- 1–3 misol qo'shilgan (Few-shot — kuchli)

**Yomon promt belgilari (o'ng, ✗):**
- "Yoz", "Tahlil qil" — kontekstsiz buyruq
- Bir necha vazifa aralash (yoz + solishtir)
- Format yo'q — "qisqa", "uzun" kabi mavhum so'zlar
- Mijoz haqida yarim ma'lumot
- Misol yo'q — AI o'zicha tasavvur qiladi

**Speaker notes:**
Tasavvur qiling, promtni yozdingiz. Enter bosishdan oldin ekranga 5 sekund qarab oling.

Agar promtingizda "Rol", "Kontekst", bitta aniq fe'l ("Vazifa") va aniq "Format" (masalan, 3 abzas) bo'lsa — bosishingiz mumkin. Natija sizni xursand qiladi.

Lekin, agar promtingiz faqat "Mijoz xatini tahlil qil" deb tugagan bo'lsa... to'xtang. Bu yomon promt. Format yo'q, kontekst yo'q. AI hozir o'zidan o'zi nimadir to'qib chiqaradi va siz "AI baribir ishlamas ekan" deb hafsalangiz pir bo'ladi.
Yodda tuting: Natijaning yomon chiqishi — AI'ning xatosi emas, bizning qolib bermaganimiz xatosidir.

---

## Slide 12 — Bugundan olib ketadigan 3 ta asosiy xulosa

**Sarlavha:**
Bugundan **olib ketadigan** 3 ta asosiy xulosa.

**Lead matn:**
Asosiy fikrlar va lug'at takrori.

**Vizual elementlar:**
3 ta xulosa qatori va pastda lug'at takrori (recap) bloki.

**Speaker notes:**
Yakunlaymiz. Bugun uyingizga olib ketadigan 3 ta narsa:

Birinchisi: Promt — bu sizning eng asosiy ko'nikmangiz. AI texnologiyasi qanchalik zo'r bo'lmasin, sizning fikringiz aniq bo'lmasa, u foydasiz.
Ikkinchisi: 5 element shablonini unutmang. Rol, Kontekst, Vazifa, Format, Misol.
Uchinchisi: Shablon kutubxonasi vaqtni tejaydi — tayyor shablon vazifaga moslanadi, noldan yozish o'rniga eng yaxshi versiyadan boshlanadi.

Endi, o'sha an'anamiz. Lug'atni eslaymiz, hammamiz birgalikda aytamiz.
(Zalga qarab so'rang) AI'ga 2-3 ta tayyor hujjat ko'rsatib, naqsh o'rgatish nima deyilardi?
*(Zaldan kuting: "Few-shot")* To'g'ri!

AI javobida asos, mezon, hisob va tekshiruv bandlarini ko'rsatishga majbur qilish nima edi?
*(Zaldan kuting: "Chain-of-Thought")* Ajoyib. Bu atamalarni yoddan chiqarmang.

Va yana bir muhim narsa — promt qanchalik yaxshi bo'lmasin, yakuniy javobgarlik mas'ul xodimda qoladi. AI xatoni kamaytiradi, lekin yo'q qilmaydi.

---

## Slide 13 — Sizning savollaringiz

**Sarlavha:**
Sizning **savollaringiz**.

**Lead matn:**
murod@mohir.dev

**Vizual elementlar:**
Katta ko'k so'roq belgisi. Markazlashgan matn.

**Speaker notes:**
(Zalga qarab)
Bizda 3-4 daqiqa vaqt qoldi. 
Kim o'z ishida qandaydir murakkab hisobot yoki xat yozishda qiynaladi va uni AI'ga topshirmoqchi? Shunga qanday promt yozish bo'yicha savollar bormi? Marhamat.

*(Kutilayotgan savollar: "O'zbekchada xato qiladimi?", "Qancha misol bersam bo'ladi?". Qisqa va lo'nda javob bering: "O'zbekchani tushunadi, faqat kontekst bersangiz. 2-3 ta misol yetarli, oshiqchasi chalg'itadi.")*

Rahmat!

---

## Series-wide bog'lanish

- **Avvalgi modul:** `4_deck/` — Jarayonlarni strukturalashtirish (Workflow). U yerda zanjirni qurdik, bu yerda o'sha zanjirning bir halqasi — promtni qanday yozishni o'rgandik.
- **Keyingi modul:** `6_deck/` — Bank uchun tayyor promt kutubxonasi. Bu moduldagi 5 element shabloni endi 30+ tayyor holatda taqdim etiladi.
- **Terminologiya:** Few-shot va Chain-of-Thought 11-modulda (Agent dizayni) va 15-modulda (Yakuniy quiz) qaytib chiqadi.

## Tayyorgarlik checklist

- [ ] Slayd 3 dagi BAD/GOOD matnlari yodda bo'lishi kerak (ekranga qaramay auditoriyaga qarab o'qish uchun).
- [ ] Slayd 6 dagi 0-shot, 1-shot dinamikasini ritm bilan, pauzalar qilib tushuntirish.
- [ ] Slayd 9 (Live workshop) uchun zalda qaysi bo'lim xodimlari ko'pligini oldindan bilib olish.
- [ ] Vaqt nazorati: 4-faza (Mashq) ga kamida 12-15 daqiqa qoldirish.

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Asoslar (Hook → Anatomy → Lug'at) | 3–5 | ~14 daq |
| 02 · Texnikalar (Few-shot → CoT) | 6–7 | ~12 daq |
| 03 · Bank misollari | 8 | ~6 daq |
| 04 · Mashq (Workshop → Xatolar → Checklist → Yakun → Q&A) | 9–13 | ~25 daq |
| **Jami** | **13** | **~60 daq** |
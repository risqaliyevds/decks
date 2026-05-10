# 14-deck — Speaker text

Module 14 · Kun 2 · 15:00 — 16:30 · Guruhli loyiha

---

## Slide 1 — Title

Salom, hammaga. 14-modulga xush kelibsiz. Hozirgacha biz nazariyani ko'rib chiqdik, atamalarni o'rgandik, bot ko'rdik. Bu modulda esa **birga qo'l urib quramiz**. Stollarda bir-ikki bo'lib emas, butun zal bir vaqtda bitta murakkab AI yechimi ustida ishlaydi — har stol bir bo'lakni oladi, oxirida hammasini yig'ib, bir tayyor agentni ko'ramiz.

Bugun siz xayolingizdagi loyihani 6 oydan keyinga qoldirmaysiz. Bugun "minimal ishlaydigan versiyasi" qanday ko'rinishini kog'ozga tushirib, demo qilib chiqamiz. Maqsad — bir narsani isbotlash: **bo'limimizga AI yechimini biz o'zimiz dizayn qila olamiz**. Mukammal qilish kerak emas, ishlaydigan versiyasi yetarli. Ishlasa — keyin yaxshilaymiz.

Boshlaymiz.

---

## Slide 2 — Agenda

Yo'l xaritamiz to'rt fazada quriladi. **Birinchi faza — Muammo:** stol bo'yicha bo'limimizning qaysi muammosini tanlashimizni aniqlaymiz, MVP fikrini va Iteration siklini o'rganamiz. **Ikkinchi faza — Reja:** ikki ta tayyor MVP misol ko'ramiz, iteratsiya tsiklini ochamiz, brief shablonini birga to'ldiramiz. **Uchinchi faza — Yig'ish:** stollar bo'lib, har biri agentning bir qismini quradi: bir stol — system prompt, ikkinchi — schema, uchinchi — bilim bazasi, to'rtinchi — suhbat oqimi, beshinchi — testlar. **To'rtinchi faza — Demo:** stollar o'z ishini ko'rsatadi, savol-javob shu yerda bo'ladi.

Bu modul davriy ma'ruza emas — **stol-ish moduli**. Slaydlar slide 11 dan keyin sizga eslatma sifatida xizmat qiladi: ekranda nima yozilgan bo'lsa, stolda shu ish ketyapti.

---

## Slide 3 — Hook · 6 oy vs 4 hafta

Sizga ikkita tanish kartina ko'rsatay. Birinchisi: katta bank, "AI strategiyasi" qoshib qo'yilgan, 6 oy davomida texnik komanda yopiq xonada o'tirib mukammal yechim quradi, hujjat to'la, prezentatsiya rang-barang — natijada loyiha **rad etiladi**, chunki real bo'limga qaytib kelganda kerakli muammoni hal qilmaydi. Ikkinchi kartina: kichik komanda 4 haftada eng asosiy funksiyani yig'adi, bo'limga olib boradi, foydalanuvchi sinab ko'radi, kamchiligini aytadi, keyin asta-sekin yaxshilanadi.

Qaysi loyiha omon qoldi? **Ikkinchisi.** Sababi oddiy: birinchisi bilan biz "biz bilamiz nima yaxshi" deb taxmin qilamiz; ikkinchisi bilan **foydalanuvchi o'zi aytadi**. Kim ko'p hujjat yozdi — chiroyli; kim ko'p sinov o'tkazdi — to'g'ri qildi.

---

## Slide 4 — MVP falsafasi

MVPning uchta toshi bor. **Tor doiradagi muammo** — butun bo'limni avtomatlashtirmaymiz, faqat bitta takrorlanadigan ishni olamiz. Masalan, butun "kredit jarayoni" emas, faqat "kredit arizasini Telegram orqali qabul qilish" — shu. **Eng kichik ishlaydigan yechim** — yechim mukammal ko'rinmasligi mumkin, kichik kamchiliklari bo'ladi, lekin asosiy ishni bajaradi. **Real foydalanuvchi sinashi** — ofisingizdagi bankir uni 1 hafta ishlatib ko'radi, kamchiligini gapiradi, biz iteratsiya qilamiz.

Bu uch tosh bilan loyiha 4–6 haftada yo'lga tushadi. 6 oy emas. Va eng muhimi — **siz uchun**, bo'limingiz uchun foyda keltiradi, instruktor uchun emas. Pilot Loyiha (2-modulda gaplashgan edik) — bu MVPning real ko'rinishi. Pilot doirasi tor — MVP shu doirada eng kichik ishlaydigan versiya.

---

## Slide 5 — Atama: MVP + Iteration

Ikki yangi atama. Birinchisi — **MVP**, ya'ni Minimum Viable Product, mahalliy tilda **Minimum Mahsulot**. Bu — eng kichik ishlaydigan versiya: foydalanuvchi haqiqatan ishlatib, foyda olishi mumkin bo'lgan eng oddiy yechim. "Demo" emas, "ishlaydigan birinchi versiya".

Ikkinchisi — **Iteration**, ya'ni **takrorlash sikli**. Loyihani bir martalik yopib qo'ymaymiz: Build (yig'ish) → Test (sinash) → Measure (o'lchash) → Learn (saboq olish). Keyin yana boshidan, lekin ozgina yaxshilangan holda. Har siklda bitta narsa o'zgaradi: prompt, schema, bilim bazasi, yoki suhbat oqimi. AI loyihasida iteration odatdagi loyihadan farqli — har Iteration **promptni qayta yozish, schema'ni o'zgartirish, knowledge base'ni yangilash** demakdir, kod emas.

Eslab qoling: bugun MVP quramiz, ertaga iteratsiya qilamiz. Hech qachon bir martalik mukammal qilolmaymiz — har xil sharoitda har xil ishlaydi.

---

## Slide 6 — MVP misoli #1: RAG bot

9-modulda biz RAG botni qurgan edik. Lekin u birdaniga to'liq emas edi. **V1** — eng oddiy: bot faqat tayyor 20 ta savolga javob beradi, FAQ darajasida. Bo'lim ko'rdi, sinadi. Foyda bor, lekin yetarli emas. **V2** — chunking qo'shdik: PDF hujjatlardan kerakli xatboshilarni topib javob bera oladi. Endi bot 200 ta savolga javob bermoqda. **V3** — agentlik qo'shdik: bot kerak bo'lganda mijoz hisobini tekshirish funksiyasini chaqira oladi.

Diqqat qiling — har versiya orasida 1–2 hafta vaqt o'tdi. V1ni darhol bo'limga berdik, ular sinadi, kamchilik aytdi, biz V2da to'g'rladik. Agar 6 oy V3 ustida ishlasak, kerakmasligi ham mumkin edi. **MVP — bu V1 bo'lib turadi**, V3 emas. V1 darajasida foyda bo'lyaptimi — keyin V2 ga, keyin V3 ga.

---

## Slide 7 — MVP misoli #2: Voice bot

Ikkinchi misol — 11-moduldagi voice memo bot. **V1** — bot Telegram audio xabarni qabul qiladi, transcribe qiladi (matnga aylantiradi), bankirga matn ko'rinishida qaytaradi. Hech qanday ekstrakt yo'q, schema yo'q. Faqat ovozni matn qiladi. **V2** — schema bo'yicha asosiy maydonlarni ekstrakt qildirdik: mijoz ismi, sana, asosiy mavzu. Endi bankir CRM'ga qo'lda yozish o'rniga AI tayyor maydonlarni beradi. **V3** — CRM integratsiyasi qo'shildi, bot Sheets'ga to'g'ridan-to'g'ri yozadi, bankir tasdiqlaydi.

Yana o'sha xulosa — har versiya 1–2 hafta. V1 darajasida ham bankir vaqt tejaydi (qo'lda yozish o'rniga matn olyapti). V3 oxirida — to'liq avtomatlashgan oqim. Lekin biz V3 dan boshlasak, **V1 darajasida muammo bormi** degan savolga javob bermay qolardik.

---

## Slide 8 — Iteration siklasi

Iteration sikli to'rt qadamdan iborat. **Build** — bir bosqich qo'shamiz, masalan, schema'ga yangi maydon. **Test** — 5–10 ta real holatda sinaymiz: ishlaydimi? **Measure** — o'lchaymiz: necha foiz holatda to'g'ri ishladi, bankir necha marta qo'lda tuzatdi, qancha vaqt tejandi? **Learn** — saboq: nima yaxshi bo'ldi, nima ishlamadi, keyingi siklda nimani o'zgartiramiz?

Bu — bankdagi "Plan-Do-Check-Act" sikli kabi, faqat AI uchun. Farqi — bizda "Build" odatda **prompt yoki schema yoki knowledge base** o'zgartirish bo'ladi, kod emas. Yangi misolni qo'shdik, prompt'ni biroz qayta yozdik — bu yangi versiya. Loyiha boshqaruvchisi sifatida sizning vazifangiz — har 1–2 haftada bir Iteration o'tkazish, foydalanuvchidan fikr olish, keyingi siklni rejalashtirish.

Eng katta xato: **Iteration o'rniga "yana qaytib quramiz".** Iteration — bir kichik o'zgarish, qayta sinash. Qayta qurish emas.

---

## Slide 9 — Loyiha brief shabloni

Bu — har AI loyihasi boshlanishida to'ldiriladigan 5 maydonli shablon. **Muammo:** bo'limimizdagi qaysi takrorlanuvchi vazifa? Bir-ikki jumla bilan, aniq. **MVP doirasi:** birinchi versiyada nimalar bo'ladi, nimalar yo'q? Aniq chegara. **Foydalanuvchi:** kim sinab ko'radi, kim kunlik ishlatadi? **Muvaffaqiyat mezoni:** qanday raqam yoki holat bo'lsa, "ishladi" deb hisoblaymiz? Masalan: "85% holatda to'g'ri javob beradi" yoki "bankir kuniga 30 daqiqa tejaydi". **Vaqt:** birinchi versiya qachon tayyor bo'ladi? Real sana — 2 oy emas, 4 hafta.

Stol bo'yicha shu shablonni to'ldirib chiqamiz. Bu shablon — bizning birinchi qadamimiz. Agar muvaffaqiyat mezoni aniq bo'lmasa, MVP qachon "tayyor" ekanini ham bilmaymiz. Agar vaqt belgilanmasa, loyiha 6 oyga cho'ziladi. **Aniq mezon + aniq vaqt = MVP.**

---

## Slide 10 — Bo'lim ichidagi loyiha turlari

Bank ichida AI loyihalari to'rtta katta oilaga tushadi. Bu — 2-moduldagi Use Case oilalari emas, balki **bo'lim turi bo'yicha**. **Hujjat ishlash** — kredit memo, shartnoma tahlili, yuristga qaror tayyorlash. **Mijoz xizmati** — chat-bot, shikoyatga javob, FAQ. **Muvofiqlik** — sanksiya tekshiruvi, KYC, audit log tahlili. **HR** — yangi xodim onboarding, ichki savol-javob, ariza qabul.

Diqqat — har stol bugungi loyihasini shu to'rtta oilaning birida pozitsiyalaydi. Stol 1 — Hujjat oilasi, stol 2 — Mijoz xizmati, va h.k. Yoki birgalikda bir stsenariy ustida ishlash mumkin: kredit arizasini qabul qilish — bu Hujjat va Mijoz xizmati uchidagi loyiha. Tanlangan oilangiz keyin **prompt uslubi**, **schema dizayni**, **bilim bazasi mazmuni** — hammasini belgilaydi.

---

## Slide 11 — Bugungi guruhli loyiha · `bots/03_complex_agent`

Endi tanishtirayotgan narsa bugungi guruh loyihasi. Bu — `bots/03_complex_agent/` papkasidagi tayyor shablon: 13 ta n8n nodedan iborat, Telegram'dan kelgan ko'p bosqichli suhbatni boshqaradigan, ma'lumot va hujjat yig'uvchi bot. Ko'rib turganingiz — **5 bosqichli oqim**.

**Bosqich 1 — Telegram:** mijoz xabar yuboradi (matn, audio yoki fayl). **Bosqich 2 — Agent (Gemini):** xabarni o'qiydi, suhbatning qaysi bosqichida ekanligini tushunadi (kirish / ism / hujjat / tasdiq), keyingi savolni tuzadi. **Bosqich 3 — Memory:** so'nggi 50 ta xabar va inline JSON state — bot eslab qoladi. **Bosqich 4 — Sheets/Drive:** har mijoz bitta qator, yig'ilgan ma'lumot va hujjat link'lari shu yerda. **Bosqich 5 — Bankir:** mijoz tugatgach, bankir hamkasbga signal — yakuniy qaror har doim **odam** zimmasida.

Bot **5 ta stsenariyga** moslangan: Kredit, Depozit, HR onboarding, Muvofiqlik shikoyat, yoki sizning stolingiz tanlagan boshqa stsenariy. Stollar bir xil shablon ustida ishlaydi, lekin har biri o'z stsenariysiga moslaydi.

---

## Slide 12 — Stol 1 vazifasi · Agent dizayni

Stol 1 — botning **miyasi**ni dizayn qiladi. Ya'ni system prompt va asbob ro'yxati. Sizning vazifangiz: stol stsenariysini tanlang (kredit / depozit / HR / muvofiqlik), keyin `prompts/system-prompt.md` shablonidagi `{DEPARTMENT}`, `{USE_CASE}`, `{ENTITY_TYPES}` o'rinlarini to'ldiring. Asoslantirib yozing — bot kim, qanday ohangda, qanday chegaralar bilan?

Eng muhim qism — **mas'uliyat chegarasi**. Bot hech qachon yakuniy bank qarorini chiqarmaydi. Har suhbat oxirida shu jumla bo'lishi shart: "Yakuniy qarorni bizning bankir hamkasbim qabul qiladi, men shu uchun ma'lumotlarni yig'aman". Bu — 1-modulda gaplashgan Can/Cannot va 3-moduldagi xavfsizlik chiziqlarining amalda namoyon bo'lishi. Stolda 5 ta tool nomini ham tanlang: get_customer_data, save_progress, request_document, va h.k.

20 daqiqa vaqt bor, oxirida 1 ta vakil prezentatsiya qiladi.

---

## Slide 13 — Stol 2 vazifasi · Schema dizayni

Stol 2 — **ma'lumot tuzilishi**ni dizayn qiladi. Ya'ni: bot suhbat oxirida qanday ko'rinishda Sheets'ga yozadi? Qanday ustunlar? Qanday tip — matn, raqam, sana, tanlov ro'yxati? Stol stsenariysiga qarab 6 ta asosiy maydonni tanlang. Masalan, kredit uchun: ism · INN · summa · muddat · maqsad · garov. HR uchun: ism · pozitsiya · boshlash sanasi · hujjatlar · maslahatchi · status.

Schema dizayni — 11-modulda Schema atamasini gaplashgan edik. Function calling shablonidan kelib chiqib, har maydonga **tip**, **majburiy/ixtiyoriy**, **misol** — uchtasi yozilishi kerak. Aks holda bot maydonni noto'g'ri to'ldirib qo'yadi yoki bo'sh qoldiradi. Validatsiya qoidalari ham yozing — masalan, "summa minimum 1 mln so'm", "sana bugundan keyin emas".

Eslatma: schema oddiy bo'lsin. **6 maydon yetadi**, 20 maydon emas. Iteratsiya qilamiz.

---

## Slide 14 — Stol 3 vazifasi · Bilim bazasi

Stol 3 — botning **kutubxonasi**ni tayyorlaydi. Ya'ni RAG bazasi: bot qaysi hujjatdan ma'lumot oladi? Stol stsenariysi uchun 3–5 ta hujjat tanlang: tariflar PDF, ichki qoidalar, mijoz uchun ko'rsatma, FAQ. Real hujjatga ehtiyoj yo'q — bugun nomini va mazmunini sanab beresizlar yetadi.

Keyingi savol — **chunking strategiyasi**. 9-modulda gaplashgan edik: butun PDF emas, kichik bo'laklar. Stolda hal qiling: chunk hajmi qancha (250 so'z? 500 so'z?), bo'limlar bo'yichami yoki paragraf bo'yichami? Misolni keltiring: "Tariflar PDF — har tarif (oilaviy kredit, biznes kredit) alohida chunk".

Va eng muhimi — **yangilash strategiyasi**. Tarif o'zgarsa nima qilamiz? Stolda 2 ta variant chizib qo'ying: qo'lda yangilash (oson, lekin unutib qolish mumkin) yoki avtomat sinxronizatsiya (qiyinroq, lekin ishonchli).

---

## Slide 15 — Stol 4 vazifasi · Suhbat oqimi

Stol 4 — **suhbat senariylari**ni yozadi. Bot mijoz bilan qanday gaplashadi? 3 ta misol stsenariy yozib chiqing.

**Senariy 1 — to'liq oqim:** mijoz keladi, bot salomlashadi, ismni so'raydi, ariza ma'lumotlarini yig'adi, hujjatlarni so'raydi, tasdiqlaydi va bankirga yo'naltiradi. Bu — "happy path", hammasi joyiga tushadi.

**Senariy 2 — kamchilik:** mijoz hujjatni yubormaydi yoki noto'g'ri narsa yuboradi. Bot nima qilishi kerak? Qaytadan so'raydi? Necha marta? Qachon "men bankirga ulayman" deydi?

**Senariy 3 — chetga chiqish:** mijoz savol beradi — masalan, "umuman bu kreditni olishim kerakmi?" Bu bot vazifasidan tashqari. Bot nima deyishi kerak? "Bu masala bo'yicha bankir bilan suhbatlashing" — to'g'ri javob.

Har senariyni 5–8 qatorda yozing — bot xabari va mijoz javobi navbati bilan. **Naturalligi muhim** — rasmiy emas, ammo professional.

---

## Slide 16 — Stol 5 vazifasi · Test mashqlari

Stol 5 — **test ishlab chiqaruvchi**. Bot ishlab chiqilgandan keyin uni qanday sinab ko'ramiz? 5 ta test holatini yozing. Har test uchun: **input** (mijoz nima yozadi yoki yuboradi), **kutilgan natija** (bot qanday javob berishi kerak), **muvaffaqiyat mezoni** (necha foiz to'g'ri bajarsa o'tdi).

Misollar: **Test 1 — happy path:** mijoz to'g'ri kelib, hammasini to'liq beradi → bot 6 maydonli qatorni Sheet'ga yozadi. **Test 2 — bo'sh javob:** mijoz "salom" yozadi va keyin yo'q bo'ladi → bot 24 soatdan keyin eslatma yuboradi. **Test 3 — noto'g'ri hujjat:** PDF o'rniga selfie keldi → bot to'g'ri formatni so'raydi. **Test 4 — chetga chiqish:** mijoz mavzudan tashqari savol beradi → bot bankirga ulaydi. **Test 5 — yakuniy javob xatosi:** mijoz "menga kredit bering" deydi → bot **hech qachon "ha" yoki "yo'q" demaydi**, bankirga yo'naltiradi.

Bu beshta test — agentni real foydalanuvchiga olib chiqishdan oldin yopish kerak bo'lgan minimum.

---

## Slide 17 — Mashq formati · Canvas worksheet

Endi ish stoliga o'tamiz. Har stolda A4 worksheet bor — slaydda ko'rib turganingiz 4 katakli canvas. **Muammo** katakda: stol bo'lim qanday muammoni hal qiladi, 2 jumla. **Foydalanuvchi:** kim ishlatadi — bankir, mijoz, ikkalasi? **MVP doirasi:** birinchi versiyada qaysi 5 funksiya bo'ladi, qaysilari yo'q? **Muvaffaqiyat:** qanday raqam yoki holat — "ishladi" demoqdamiz?

Vaqt — **30 daqiqa stolda ishlash**. Bu vaqt davomida har stol o'z vazifasini (slide 12–16 bo'yicha) bajaradi — 1-stol agent prompt yozadi, 2-stol schema chizadi, va h.k. Men stol bo'yicha aylanaman, savolingizga javob beraman.

Keyin **30 daqiqa demo va savol-javob.** Har stol 5 daqiqa: o'z bo'lagini taqdim qiladi, qolgan stollar savol beradi, men kommentariya beraman. Oxirida — biz 5 ta bo'lakni qo'shib, bitta to'liq agentni ko'ramiz. Bu modulning yutug'i shu — **siz dizayn qildingiz, biz taqdim qilamiz.**

---

## Slide 18 — Closing + lug'at recap

Bugundan uchta narsani olib ketamiz. **Birinchi:** mukammal yechim 6 oyda — afsona; ishlaydigan MVP 4 haftada — haqiqat. Biz buni bugungi kunda qilib ko'rsatdik. **Ikkinchi:** AI loyihasi bir martalik emas — har 1–2 haftada bir Iteration. Build, Test, Measure, Learn. **Uchinchi:** dizayn — bo'lim ichidagi bankirning vazifasi, dasturchining emas. Siz bilasiz qaysi muammo dolzarb, siz bilasiz qaysi maydonlar muhim. Texnik komanda — quradi. Lekin nimani qurish kerakligini siz aytasiz.

Lug'at recap — birga ayatamiz. **MVP** — bu nima edi? Minimum Mahsulot, eng kichik ishlaydigan versiya. **Iteration** — bu nima edi? Build, Test, Measure, Learn — qayta-qayta yaxshilash sikli.

15-modulda — sertifikat va yo'l-yorug', shu yerga tayyor keldingiz. Endi sizning **stol prezentatsiyalaringizga** o'taman. Birinchi stol kim?

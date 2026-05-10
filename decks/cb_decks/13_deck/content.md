# 13-modul · Speaker text · Bank amaliyotidagi real keyslar

## 1 — Title

Salom, hammaga. Kun 2 ning yarmiga keldik. Ertalabki to'rtta modulda biz texnik tomonni ko'rdik: oddiy AI tizimini qurdik (9-modul), agent tushunchasini ochdik (10-modul), voice-bot dizayn qildik (11-modul) va murakkab pipeline'larni tahlil qildik (12-modul). Endi savol: bu narsalar haqiqiy banklarda ishlayaptimi? Yoki faqat seminar zalida go'zalmi? 60 daqiqa ichida 5 ta global keys, 2 ta mintaqaviy keys ko'rib chiqamiz, va eng muhim ikki savolga javob beramiz: nima uchun ba'zi banklar AI'ni production'ga olib chiqa olgan, ba'zilari pilotda cho'kib qolgan. Bu modul nazariya emas, faktlar va saboq. Yoddan tushib qolish uchun emas, bo'limingizga olib borish uchun.

## 2 — Agenda

To'rtta faza. Birinchi 10 daqiqada biz kontekstni quramiz: nima uchun bu mavzu hozir muhim, qanday metodologiya bilan keys'larni o'qiymiz, va ikki kalit atamani aniqlaymiz. Keyin 20 daqiqa — beshta global keys: JPMorgan, Morgan Stanley, Bank of America, DBS Singapur, Sberbank. Har biri 4 daqiqacha. Uchinchi faza — mintaqaviy: Qozog'iston va O'zbekiston banklari, qisqa va realistik ramkada. Va eng muhimi — oxirgi 23 daqiqa: muvaffaqiyat omillari, ikki failure pattern, saboq ro'yxati va sizning bo'limingiz uchun amaliy mashq. Keys'lar yodda qolmasin uchun — ularni o'z ish jarayonimizga moslab oxirida bog'laymiz.

## 3 — Hook · McKinsey statistikasi

Bitta raqam bilan boshlaymiz. McKinsey "The State of AI" 2024 hisobotida shunday yozilgan: dunyo bo'ylab banklarning 70 foizida hozir AI piloti yoki POC ishlamoqda. Lekin shu banklarning faqat 14 foizida AI haqiqatan production'da, ya'ni kunlik ishda turibdi. Boshqacha aytganda — har 5 ta pilotning faqat bittasi production'ga chiqyapti. Qolgan to'rttasi yo demolarda qolib ketadi, yo "loyiha tugadi" deb yopiladi. Savol: bu farq qayerdan? Texnologiya yetarli emasmi? Yo'q, model yetarli darajada kuchli — biz buni 5-modulda ko'rdik. Pul yo'qligimi? Yo'q, banklar moliyaviy resurslarga to'la. Sabab — adoption va production-grade tushunchalarining yetishmasligi. Bugun shu farqni qopolaymiz.

## 4 — Keys-stadi metodologiyasi

Har bir keys'ni uchta savol bilan o'qiymiz, va shu uchta savol oxirigacha bizning kompasimiz bo'ladi. Birinchisi — Kontekst: bank qaysi muammoni yechmoqchi edi, hajm qancha, qanday cheklovlar bor edi? Faqat raqam emas — ish kontekstini tushunish muhim. Ikkinchisi — Yechim: aniq qanday AI texnologiyasi tanlangan, jarayon ichiga qanday joylashgan, kim ishlatadi? Bu joyda biz "nima qildi"ni emas, "qanday qildi"ni qidiramiz. Va uchinchisi — Natija va saboq: aniq metrikalar (vaqt, soat, foiz, dollar), va undan biz nimani olib qoldira olamiz? Hech bir keys'ni "ular qilgan, biz qilolmaymiz" deb yopmaymiz — har biridan kamida bitta saboq olamiz. Tayyor bo'lsangiz — birinchi keys'ga o'tamiz.

## 5 — Atama · AI Adoption + Production-grade

Ikki atama. Bularsiz keys'larni o'qib bo'lmaydi, oxirida testda ham qaytadi. Birinchisi — AI Adoption. Sodda izoh: "AI yaratildi" emas, "AI haqiqatda ishlatilyapti" degan ma'no. Misol uchun, bo'limingizga ChatGPT loginini ochib qo'ydi — bu adoption emas, bu kirish. Adoption — kunlik ishda 70+ foiz xodim shu vositadan foydalanyapti, va o'lchanyapti. Ikkinchi atama — Production-grade. Sodda izoh: "test emas, real". Bu ham technical, ham organizatsion belgi. Texnik: tizim 99% uptime'da ishlaydi, log'lar bor, fallback bor, monitoring bor. Organizatsion: agar ertaga AI ishlamasa, biznes to'xtab qolmaydi — yoki AI tuzatiladi, yoki manual fallback bor. Bu ikkala tushunchani esda saqlang — keys'lardan keyin recap qilamiz.

## 6 — Keys 1 · JPMorgan COIN

Birinchi keys — eng mashhuri. JPMorgan Chase, 2017 yil, COIN tizimi — Contract Intelligence dasturi. Kontekst: yiliga 12,000 ta yangi kommertsial kredit shartnomasi. Har bittasi yuristlar tomonidan o'qiladi, kalit shartlar (foiz, muddat, garov, jazo) qo'lda chiqariladi. Hajm: bu ish bir yilda taxminan 360,000 yurist-soatni olar edi — JPMorgan o'zi 2017 yilgi press release'da aytgan raqam. Yechim: NLP modeli (o'sha vaqtda hali GPT emas, klassik named-entity extraction) shartnomadan kalit bandlarni 5-6 soniyada chiqaradi. Yurist faqat tasdiqlaydi. Natija: 360,000 soat tejaldi, xato darajasi yurist o'qigani bilan teng yoki yaxshiroq. Saboq bizga: AI insonni almashtirmadi — yurist hali ham tasdiqlaydi. AI eng zerikarli, eng qaytariluvchi qismni oldi. Buni "Mexanik vazifa" deb chaqiramiz — birinchi nishon shu.

## 7 — Keys 2 · Morgan Stanley AI Assistant

Ikkinchi keys — Morgan Stanley AI Assistant. 2023 yil, OpenAI GPT-4 ustida qurilgan. Kontekst: 16,000+ moliyaviy maslahatchi har kuni mijozlar bilan ishlaydi. Bankning ichki tadqiqot kutubxonasi 100,000+ tahliliy hujjat — analyst report'lar, market commentary, mahsulot tavsiflari. Maslahatchi savolga javob izlash uchun 30-40 daqiqa sarflar edi. Yechim: aynan biz 9-modulda qurgan RAG arxitekturasi. Maslahatchi savol yozadi → tizim ichki kutubxonadan top-3 dokument topadi → GPT-4 ularga asoslanib javob tuzadi → maslahatchi tasdiqlaydi va mijozga yuboradi. Aniq narx tejovi Morgan Stanley tomonidan oshkor qilinmagan, lekin ichki ma'lumotlarga ko'ra javob vaqti 30+ daqiqadan 1 daqiqa atrofiga tushgan. Saboq: RAG = inson bilim qidiruvini tezlashtirish, qaror qilishni emas. Maslahatchi hali ham mas'ul, AI faqat kutubxonachi.

## 8 — Keys 3 · Bank of America Erica

Uchinchi keys — Bank of America Erica. Bu virtual assistant 2018 yilda chiqarilgan, hozir BofA mobil ilovasida ishlaydi. Raqamlar BofA yillik hisobotidan: 2 milliarddan ortiq mijoz interaksiyasi, 42 mln+ aktiv foydalanuvchi, eng ko'p ishlatiladigan AI banking assistant AQShda. Erica nima qiladi? Mijoz "oxirgi tranzaksiyamni ko'r", "kreditim bo'yicha qancha qarz qoldi", "shu oyda qancha sarfladim" deb so'raydi. Erica hisobga ulanadi (tool use — biz 10-modulda ko'rgan), javob beradi. Eng muhim: u shaxsiy moliyaviy maslahat bermaydi — bu compliance chiziq. Faqat ma'lumot ko'rsatadi va oddiy aksiyalarni qiladi. Saboq: AI assistant'ning haqiqiy adoption'i — telefon ekranida bo'lishi. Mijoz boshqa app ochmasin, bot mijoz allaqachon turgan joyda bo'lsin. Va — eng katta qoida — agent o'zi qaror qilmasin.

## 9 — Keys 4 · DBS Singapore

To'rtinchi keys — DBS Singapur. Bu meni shaxsan ko'p qiziqtiradi, chunki DBS keng frontda AI'ni joriy qilgan: kredit risk skoring, anti-fraud, mijoz xizmati, ichki HR, hatto kod yozish ham. Kontekst: DBS o'zini "data-driven bank" deb pozitsiyalaydi. 2023 yillik hisobotida 600+ AI use case ishga tushganini va shundan kelib chiqqan ekonomik foyda taxminan 370 mln Singapur dollari ekanligini e'lon qilgan. Avval va keyin: kredit skoring uchun avval 5 kun kerak edi (qog'oz, manual tekshiruv), hozir AI bilan oraliq qaror 1 minut, yakuniy tasdiqlash 1 soat. Yechim sifati: hech bir AI o'zi qaror qilmaydi — AI tavsiya beradi, inson imzolaydi. Saboq: ko'lam — bu kichik 1 ta loyiha emas, butun bank ichida AI tarqatish. DBS shu yo'lda 5+ yil yurgan. Tezroq emas, lekin barqaror.

## 10 — Keys 5 · Sberbank GigaChat

Beshinchi keys — Sberbank GigaChat. Eng yaqin geografik misol, va eng nozik. Sberbank o'z LLM'ini qurgan — GigaChat. 2023 yilda chiqarilgan, hozir kunlik millionlab so'rov olmoqda. Kontekst: Rossiya bozorida ma'lumot suvereniteti talabi qattiq — banklar OpenAI'ni to'g'ridan-to'g'ri ishlata olmaydi. Sberbank o'zi qurish yo'lini tanladi. Yechim: ichki Cloud, o'z modeli, mijoz xizmati va ichki HR uchun. Kuchli tomon: ma'lumot ham, model ham bank kontrolida. Lekin ehtiyot — o'z model qurish bahosi yuqori, va GigaChat keyfiyati ochiq modellarga (GPT-4, Claude) hozircha to'liq teng emas. Saboq biz uchun: "o'zimiz qurish" yo'li mavjud, lekin uning narxi va vaqti realistik bo'lishi kerak. O'zbekiston uchun hozircha bu yo'l erta — mavjud xavfsiz API'lardan foydalanish to'g'ri qaror.

## 11 — Mintaqaviy · Qozog'iston · Halyk va Forte

Endi mintaqaga yaqinlashamiz. Qozog'iston banklari Markaziy Osiyoda AI implementatsiyasida bir-ikki qadam oldinda. Halyk Bank — eng katta bank — kredit skoring va mijoz xizmati uchun ML modellaridan 2020 yildan beri foydalanadi. So'nggi yillarda generativ AI (chatbot, hujjat tahlili) ham qo'shildi. Forte Bank esa ko'proq raqamli kanallarda — mobil ilovada AI yordamchi, kredit oldindan tasdiqlash. Aniq raqamlarni rasmiy oshkor qilmaganlar, lekin ikkala bank ham AI'ni "core stack" sifatida qabul qilgan. Muhim kuzatuv: ular ham xuddi DBS singari — bir loyiha emas, dasturlar ko'p. Va — ekstremaliga bormaydi: o'z LLM qurmaydi, OpenAI/Anthropic/Yandex API'larini ehtiyot bilan ishlatadi. Bu modelni biz ham olishimiz mumkin.

## 12 — Mintaqaviy · O'zbekiston banklari

O'zbekiston bo'limi. Hozircha aniq raqamlar oz, chunki hammasi yangi. Lekin trend boshlangan: Uzum Bank (raqamli neobank sifatida), Anorbank, Kapital Bank — har biri 2024 dan boshlab AI piloti yoki integratsiyani e'lon qilgan. Yo'nalishlar: chat-yordamchi, hujjat ekstraktsiyasi, kredit oldindan baholash. Bu joyda halol bo'laylik — biz hali "JPMorgan COIN" darajasidagi keys'larga ega emasmiz. Hozir ko'pi pilot, ba'zilari ichki PoC. Bu yomon emas — hamma yo'lning shu nuqtadan boshlangan. Muhimi — keyingi 12-18 oyda shu pilotlardan qaysilari production'ga chiqishi. Va shu yerda Markaziy Bank roli katta — adoption uchun infratuzilma, standart, talab — siz buyurtma berasiz, banklar javob beradi. Bizning mashqimiz: bu o'tish nuqtasini xato qilmaslik.

## 13 — Muvaffaqiyat omillari

5 ta global va 2 ta mintaqaviy keys'ni qo'yib ko'rsak, 4 ta omil qaytadan-qaytaron chiqadi. Birinchi — boshlik qo'llab-quvvatlashi. JPMorgan COIN'ni CEO Jamie Dimon shaxsan turtkilagan; DBS'da Piyush Gupta AI'ni strategiyaga qo'ygan. Bu xayoliy emas — pulning yo'nalishi shu yerdan boshlanadi. Ikkinchi — aniq use case. "AI bilan nima qilamiz" emas, "qaysi 1 ta jarayonni AI bilan qisqartiramiz". Morgan Stanley dastlab faqat 1 ta vazifaga (research kutubxonasi) qaratdi, keyin kengaytirdi. Uchinchi — ma'lumot tayyor. RAG ishlasin uchun hujjatlar tartibli, indekslanadigan, yangi versiyali bo'lishi kerak. Ko'p banklar shu joyda cho'kadi. To'rtinchi — muvofiqlik hamkorligi. AI loyihasini risk va comply'dan keyin emas, ular bilan birga boshlash. Aks holda 6 oy keyin "qabul qilinmaydi" javobini olasiz. Bu to'rtta omil — sizning checklist'ingiz.

## 14 — Failure pattern 1 · Pilotda qolish

Birinchi failure naqshi — eng ommabop. "Pilotda qolish". Afsona: pilotni boshlasak, demolarni ko'rsatsak — loyiha bitdi. Haqiqat: pilot demo emas, pilot bu production'ga ko'prik. Agar piloning maqsadi "menejer ko'rsin" bo'lsa, pilot allaqachon o'lik. Pilotning to'g'ri maqsadi: "12 hafta ichida 1 ta foydalanuvchi guruhi (masalan, 50 nafar operator) shu vositani kunda ishlatishi va bizga aniq metrikalar berishi". Ikkinchi afsona: pilotda hammasini tekshiramiz — barcha use case, barcha bo'lim. Haqiqat: pilot bu tor qarashli mashq. 1 ta bo'lim, 1 ta use case, 4 hafta oraliq. Uchinchi afsona: pilot tugagandan keyin production rejasi qilinadi. Haqiqat: pilot rejasi bilan birga production rejasi yoziladi — kim qabul qiladi, qaysi tizimga ulanadi, qancha xarajat qiladi. Aks holda pilot tugagandan keyin "ha, ha" deb taxtga qo'yiladi va unutiladi.

## 15 — Failure pattern 2 · Texnologiya bor, jarayon yo'q

Ikkinchi failure naqshi — undan ham xavfli, chunki ko'rinmaydi. Texnologiya joriy qilindi, bot ishlayapti, lekin bo'limda hech kim ishlatmaydi. Sababi — AI ish jarayoniga singdirilmagan. Misol: bo'limga "shartnoma tekshirish boti" qo'ydik. Lekin xodimlarning workflow'i o'zgarmadi — ular hali ham PDF'ni qo'lda ochib o'qiyapti. Bot alohida tab'da o'tiribdi va birovga kerak emas. Yechim: AI joriy qilish texnik loyiha emas, ish jarayoni o'zgarishi. Bot xodim allaqachon ishlatadigan tizimga (CRM, Outlook, ichki portal) joylashishi kerak. Va — "majburiy" emas, "tabiiy" bo'lishi kerak: xodim shu vositadan foydalanmasa, ishini sekinroq qiladi. Mana shu darajaga yetkazsangiz — adoption o'sadi. Aks holda bot 3 oy ishlaydi, keyin bekor qilinadi.

## 16 — Saboqlar · Bunday qil / Bunday qilma

Hammasini bir slaydda yig'amiz. Chap kolonna — qil. O'ngda — qilma. Qilish kerak: birinchidan, 1 ta tor use case'dan boshlash. Ikkinchidan, ma'lumot bazasini birinchi kunda tekshirib chiqish. Uchinchidan, muvofiqlik va riskni boshidan jamoaga olish. To'rtinchidan, kunlik ishlatish metrikalarini o'rnatish. Beshinchidan, fallback (manual yo'l) saqlash. Oltinchidan, har 4 hafta retrospective o'tkazish. Qilmaslik kerak: barcha bo'limlarni bir vaqtda boshlash; "AI yaxshi narsa" deb umumiy gaplar bilan loyihani sotish; texnologiya tanlovini biznesdan oldin qilish; pilot natijalarini production rejasiz qoldirish; modeldan to'liq qaror qilishni kutish; va eng katta xato — odamga "AI sizni almashtiradi" tarzida e'lon qilish. Aksincha: "AI sizning eng zerikarli ishingizni oladi, siz qiziqroq ishga o'tasiz" — bu xabar, va u haqiqat.

## 17 — Mashq · Bo'lim drift'larini topish

Endi sizga 8 daqiqa. Stol bo'yicha 3 guruhga bo'linamiz: kredit, KYC/muvofiqlik, mijoz xizmati. Ekrandagi jadvalga qarang. Har stol o'z bo'limini tanlaydi va 3 ustunni to'ldiradi. Birinchi ustun: bizning hozirgi jarayon (2-3 jumla). Ikkinchi ustun: global keys (masalan, kredit uchun JPMorgan COIN) qanday qilgan. Uchinchi ustun — eng muhimi — drift, ya'ni bizda qaysi nuqtada uzilish bo'lishi mumkin. Misol uchun: JPMorgan'da yurist tasdiqlaydi — bizda kim tasdiqlaydi? Yoki Erica chiqargan ma'lumotlar real-time bo'lishi kerak — bizda real-time integratsiya bormi? 8 daqiqadan keyin har stoldan 1 vakil 1 daqiqada 3 ta drift'ni baland aytadi. Maqsad — keys qilib o'qish emas, keys'ni ko'zga ko'rinmas tarzda bo'limimizga taqqoslash. Bu sizning real ish hujjatingiz bo'ladi.

## 18 — Closing + recap

Yakunlaymiz. Uch xulosa. Birinchi: muvaffaqiyat 70/14 boshqa qoidaga bo'ysunadi — texnologiya emas, adoption va jarayon. Eng yuqori darajadagi modelni olishingiz mumkin, lekin agar bo'limingiz uni ishlatmasa — bu pilot. Ikkinchi: keys'lar shablon emas, kompas. Hech qaysi bank o'z aynan vaziyatingizda bo'lmagan, lekin har biri sizga 1-2 ta savol beradi: kim tasdiqlaydi? qancha vaqt tejab? qanday metrika? Bu savollar bilan o'zingiz keys yozasiz. Uchinchi: pilot bu production'ga ko'prik — pilot rejasi yozilganda production rejasi ham bir vaqtda yozilsin. Aks holda pul va vaqt suvga ketadi. Va lug'at recap — birga aytamiz: AI Adoption — bu kunlik ishlatishdir, login emas. Production-grade — bu real ishonchli, test emas. Bu ikki so'zni Markaziy Bank kontekstida har joyda eslang.

## 19 — Q&A

Savollaringiz. Muvofiqlik, byudjet, vendor tanlash, ichki resurs vs tashqi vendor, kerakli xodimlar tarkibi — barcha amaliy savollarga javob beraman.

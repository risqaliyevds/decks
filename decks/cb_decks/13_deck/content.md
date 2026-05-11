# 13-modul · Speaker text · Bank amaliyotidagi real keyslar

## Slide 1 — Title

Salom, hammaga. Kun 2 ning yarmiga keldik. Ertalabki to'rtta modulda biz texnik tomonni ko'rdik: oddiy AI tizimini qurdik (9-modul), agent tushunchasini ochdik (10-modul), voice-bot dizayn qildik (11-modul) va murakkab pipeline'larni tahlil qildik (12-modul). Endi savol: bu narsalar haqiqiy banklarda ishlayaptimi? Yoki faqat seminar zalida go'zalmi? 60 daqiqa ichida 5 ta global keys, 2 ta mintaqaviy keys ko'rib chiqamiz, va eng muhim ikki savolga javob beramiz: nima uchun ba'zi banklar AI'ni production'ga olib chiqa olgan, ba'zilari pilotda cho'kib qolgan. Bu modul nazariya emas, faktlar va saboq. Yoddan tushib qolish uchun emas, bo'limingizga olib borish uchun.

## Slide 2 — Agenda

To'rtta faza. Birinchi 10 daqiqada biz kontekstni quramiz: nima uchun bu mavzu hozir muhim, qanday metodologiya bilan keys'larni o'qiymiz, va ikki kalit atamani aniqlaymiz. Keyin 20 daqiqa — beshta global keys: JPMorgan, Morgan Stanley, Bank of America, DBS Singapur, Sberbank. Har biri 4 daqiqacha. Uchinchi faza — mintaqaviy: Qozog'iston va O'zbekiston banklari, qisqa va realistik ramkada. Va eng muhimi — oxirgi 23 daqiqa: muvaffaqiyat omillari, ikki failure pattern, saboq ro'yxati va sizning bo'limingiz uchun amaliy mashq. Keys'lar yodda qolmasin uchun — ularni o'z ish jarayonimizga moslab oxirida bog'laymiz.

## Slide 3 — Hook · McKinsey statistikasi

Bitta raqam bilan boshlaymiz. McKinsey "The State of AI" 2024 global so'rovida shunday: tashkilotlarning 70 foizida hozir AI piloti yoki POC ishlamoqda. Lekin faqat 14 foizida AI haqiqatan production'da, ya'ni kunlik ishda turibdi. Banklarda ham xuddi shu naqsh ko'rinadi. Boshqacha aytganda — har 5 ta pilotning faqat bittasi production'ga chiqadi. Qolgan to'rttasi yo demolarda qoladi, yo "loyiha tugadi" deb yopiladi. Savol: bu farq qayerdan? Texnologiya yetarli emasmi? Yo'q. Pul yo'qligimi? Yo'q. Sabab — adoption va production-grade tushunchalarining yetishmasligi. Bugun shu farqni ochamiz.

## Slide 4 — Keys-stadi metodologiyasi

Har bir keys'ni uchta savol bilan o'qiymiz, va shu uchta savol oxirigacha bizning kompasimiz bo'ladi. Birinchisi — Kontekst: bank qaysi muammoni yechmoqchi edi, hajm qancha, qanday cheklovlar bor edi? Faqat raqam emas — ish kontekstini tushunish muhim. Ikkinchisi — Yechim: aniq qanday AI texnologiyasi tanlangan, jarayon ichiga qanday joylashgan, kim ishlatadi? Bu joyda biz "nima qildi"ni emas, "qanday qildi"ni qidiramiz. Va uchinchisi — Natija va saboq: aniq metrikalar (vaqt, soat, foiz, dollar), va undan biz nimani olib qoldira olamiz? Hech bir keys'ni "ular qilgan, biz qilolmaymiz" deb yopmaymiz — har biridan kamida bitta saboq olamiz. Tayyor bo'lsangiz — birinchi keys'ga o'tamiz.

## Slide 5 — Atama · AI Adoption + Production-grade

Ikki atama. Bularsiz keys'larni o'qib bo'lmaydi, oxirida ham qaytadi. Birinchisi — AI Adoption. Sodda izoh: tizim borligi emas, belgilangan foydalanuvchi guruhi uni muntazam ishlatishi va bu ish natijasiga ta'sir qilishi. Masalan: 50 nafar operatorning ko'p so'rovlari yangi yordamchi orqali o'tadi, vaqt va xato metrikasi o'lchanadi. Threshold universal emas — har loyihaga KPI alohida belgilanadi. Ikkinchi atama — Production-grade. Sodda izoh: "test emas, bank standartida turadigan". Bu yerda 99% uptime yetarli emas — SLA, audit log, access control, change management, model validation, fallback yo'li, egasi belgilangan, complaint handling protokoli — bularning hammasi bor. AI ishlamaganda biznes to'xtab qolmaydi: yoki AI tuzatiladi, yoki qo'lda fallback ishga tushadi. Bu ikkala tushunchani esda saqlang — keys'lardan keyin recap qilamiz.

## Slide 6 — Keys 1 · JPMorgan COIN

Birinchi keys — eng mashhuri. JPMorgan Chase, 2017 yil, COIN tizimi — Contract Intelligence dasturi. Kontekst: yiliga 12,000 ta yangi tijorat krediti shartnomasi. Har bittasi yuristlar tomonidan o'qiladi, kalit shartlar (foiz, muddat, garov, jazo) qo'lda chiqariladi. Hajm: bu ish bir yilda taxminan 360,000 yurist-soatni olar edi — JPMorgan o'zi 2017 yilgi press release'da aytgan raqam. Yechim: NLP modeli (o'sha vaqtda hali GPT emas, klassik named-entity extraction) shartnomadan kalit bandlarni 5-6 soniyada chiqaradi. Yurist faqat tasdiqlaydi. Natija: 360,000 soat tejaldi, xato darajasi yurist o'qigani bilan teng yoki yaxshiroq. Saboq bizga: AI insonni almashtirmadi — yurist hali ham tasdiqlaydi. AI eng zerikarli, eng qaytariluvchi qismni oldi. Buni "Mexanik vazifa" deb chaqiramiz — birinchi nishon shu.

## Slide 7 — Keys 2 · Morgan Stanley AI Assistant

Ikkinchi keys — Morgan Stanley AI Assistant. 2023 yil, OpenAI GPT-4 ustida qurilgan. Kontekst: 16,000+ moliyaviy maslahatchi har kuni mijozlar bilan ishlaydi. Bankning ichki tadqiqot kutubxonasi 100,000+ tahliliy hujjat — analyst report'lar, market commentary, mahsulot tavsiflari. Maslahatchi savolga javob izlash uchun 30-40 daqiqa sarflar edi. Yechim: aynan biz 9-modulda qurgan RAG arxitekturasi. Maslahatchi savol yozadi → tizim ichki kutubxonadan top-3 dokument topadi → GPT-4 ularga asoslanib javob tuzadi → maslahatchi tasdiqlaydi va mijozga yuboradi. Aniq narx tejovi Morgan Stanley tomonidan oshkor qilinmagan, lekin ichki ma'lumotlarga ko'ra javob vaqti 30+ daqiqadan 1 daqiqa atrofiga tushgan. Saboq: RAG = inson bilim qidiruvini tezlashtirish, qaror qilishni emas. Maslahatchi hali ham mas'ul, AI faqat kutubxonachi.

## Slide 8 — Keys 3 · Bank of America Erica

Uchinchi keys — Bank of America Erica. Bu virtual assistant 2018 yilda chiqarilgan, hozir BofA mobil ilovasida ishlaydi. Raqamlar BofA yillik hisobotidan: 2 milliarddan ortiq mijoz interaksiyasi, 42 mln+ aktiv foydalanuvchi, eng ko'p ishlatiladigan AI banking assistant AQShda. Erica nima qiladi? Mijoz "oxirgi tranzaksiyamni ko'r", "kreditim bo'yicha qancha qarz qoldi", "shu oyda qancha sarfladim" deb so'raydi. Erica hisobga ulanadi (tool use — biz 10-modulda ko'rgan), javob beradi. Eng muhim: u shaxsiy moliyaviy maslahat bermaydi — bu compliance chiziq. Faqat ma'lumot ko'rsatadi va oddiy aksiyalarni qiladi. Saboq: AI assistant'ning haqiqiy adoption'i — telefon ekranida bo'lishi. Mijoz boshqa app ochmasin, bot mijoz allaqachon turgan joyda bo'lsin. Va — eng katta qoida — agent o'zi qaror qilmasin.

## Slide 9 — Keys 4 · DBS Singapore

To'rtinchi keys — DBS Singapur. Bu meni shaxsan ko'p qiziqtiradi, chunki DBS keng frontda AI'ni joriy qilgan: kredit risk skoring, anti-fraud, mijoz xizmati, ichki HR. Kontekst: DBS o'zini "data-driven bank" deb pozitsiyalaydi. 2023 yillik hisobotida 350+ AI use case va 800+ model ishga tushganini, shundan kelib chiqqan ekonomik foyda taxminan 370 mln Singapur dollari ekanligini e'lon qilgan. Avval va keyin: kredit skoring uchun avval 5 kun kerak edi (qog'oz, qo'lda tekshiruv), hozir AI bilan oraliq qaror 1 minut, yakuniy tasdiqlash 1 soat. Yechim sifati: hech bir AI o'zi qaror qilmaydi — AI tavsiya beradi, inson imzolaydi. Saboq: ko'lam — bu kichik 1 ta loyiha emas, butun bank ichida AI tarqatish. DBS shu yo'lda 5+ yil yurgan. Tezroq emas, lekin barqaror.

## Slide 10 — Keys 5 · Sberbank GigaChat

Beshinchi keys — Sberbank GigaChat. Eng yaqin geografik misol, va eng nozik. Sberbank o'z LLM'ini qurgan — GigaChat. 2023 yilda chiqarilgan, hozir kunlik millionlab so'rov olmoqda. Kontekst: Rossiya bozorida ma'lumot suvereniteti talabi qattiq — banklar OpenAI'ni to'g'ridan-to'g'ri ishlata olmaydi. Sberbank o'zi qurish yo'lini tanladi. Yechim: ichki Cloud, o'z modeli, mijoz xizmati va ichki HR uchun. Kuchli tomon: ma'lumot ham, model ham bank kontrolida. Ehtiyot tomon: bahosi yuqori (yuzlab million dollar), va sifati ochiq modellarga hozircha to'liq teng emas. Bizga saboq: "o'z model" va "tashqi vendor" — ikki ekstremal tanlov emas. Har pilot uchun 4 mezon solishtiriladi: ma'lumot qayerda qoladi, audit log bormi, xarajat qancha, fallback qanday. Shundan keyin sertifikatlangan API, lokal model yoki ichki platforma tanlanadi.

## Slide 11 — Mintaqaviy · Qozog'iston · Halyk va Forte

Endi mintaqaga yaqinlashamiz. Qozog'iston banklari Markaziy Osiyoda AI implementatsiyasida bir-ikki qadam oldinda. Halyk Bank — eng katta bank — kredit skoring va mijoz xizmati uchun ML modellaridan 2020 yildan beri foydalanadi. So'nggi yillarda generativ AI (chatbot, hujjat tahlili) ham qo'shildi. Forte Bank esa ko'proq raqamli kanallarda — mobil ilovada AI yordamchi, kredit oldindan tasdiqlash. Aniq raqamlarni rasmiy oshkor qilmaganlar — bu joyda kuzatilayotgan yo'nalish bilan kifoyalanamiz. Muhim kuzatuv: ular ham xuddi DBS singari — bir loyiha emas, dasturlar ko'p. Va ekstremaliga bormaydi: o'z LLM'ini qurmaydi, sertifikatlangan, shartnomaviy nazorat ostidagi vendor xizmatlaridan ehtiyot bilan foydalanadi. Bu modelni biz ham olishimiz mumkin.

## Slide 12 — Mintaqaviy · O'zbekiston banklari

O'zbekiston bo'limi. Hozircha aniq raqamlar oz, chunki hammasi yangi. Lekin trend boshlangan: Uzum Bank (raqamli neobank sifatida), Anorbank, Kapital Bank — har biri 2024 dan boshlab AI piloti yoki integratsiyani e'lon qilgan. Yo'nalishlar: chat-yordamchi, hujjat ekstraktsiyasi, kredit oldindan baholash. Bu joyda xolis bo'laylik — biz hali "JPMorgan COIN" darajasidagi keys'larga ega emasmiz. Hozir ko'pi pilot, ba'zilari ichki PoC. Bu yomon emas — hamma yo'lning shu nuqtadan boshlangan. Muhimi — keyingi 12-18 oyda shu pilotlardan qaysilari production'ga chiqishi. Va shu yerda Markaziy Bank roli katta — adoption uchun infratuzilma, standart, talab — siz buyurtma berasiz, banklar javob beradi. Bizning mashqimiz: bu o'tish nuqtasini xato qilmaslik.

## Slide 13 — Muvaffaqiyat omillari

5 ta global va 2 ta mintaqaviy keys'ni qo'yib ko'rsak, 4 ta omil qayta-qayta chiqadi. Birinchi — boshlik qo'llab-quvvatlashi. JPMorgan COIN'ni CEO Jamie Dimon shaxsan turtkilagan; DBS'da Piyush Gupta AI'ni strategiyaga qo'ygan. Bu xayoliy emas — pulning yo'nalishi shu yerdan boshlanadi. Ikkinchi — aniq use case. "AI bilan nima qilamiz" emas, "qaysi 1 ta jarayonni AI bilan qisqartiramiz". Morgan Stanley dastlab faqat 1 ta vazifaga (research kutubxonasi) qaratdi, keyin kengaytirdi. Uchinchi — ma'lumot tayyor. RAG ishlasin uchun hujjatlar tartibli, indekslanadigan, yangi versiyali bo'lishi kerak. Ko'p banklar shu bosqichda to'xtab qoladi. To'rtinchi — muvofiqlik birinchi kundan stol atrofida. Qaysi ma'lumot ishlatiladi, kim tasdiqlaydi, audit izi qayerda saqlanadi, mijozga noto'g'ri javob berilsa kim javobgar — bular pilotdan oldin yoziladi. Bu to'rtta omil — sizning checklist'ingiz.

## Slide 14 — Failure pattern 1 · Pilotda qolish

Birinchi failure naqshi — eng ommabop. "Pilotda qolish". Afsona: pilotni boshlasak, demolarni ko'rsatsak — loyiha bitdi. Haqiqat: pilot demo emas, pilot bu production'ga ko'prik. Agar piloning maqsadi "menejer ko'rsin" bo'lsa, pilot allaqachon o'lik. Pilotning to'g'ri maqsadi: "12 hafta ichida 1 ta foydalanuvchi guruhi (masalan, 50 nafar operator) shu vositani kunda ishlatishi va bizga aniq metrikalar berishi". Ikkinchi afsona: pilotda hammasini tekshiramiz — barcha use case, barcha bo'lim. Haqiqat: pilot bu tor qarashli mashq. 1 ta bo'lim, 1 ta use case, 4 hafta oraliq. Uchinchi afsona: pilot tugagandan keyin production rejasi qilinadi. Haqiqat: pilot rejasi bilan birga production rejasi yoziladi — kim qabul qiladi, qaysi tizimga ulanadi, qancha xarajat qiladi. Aks holda pilot tugagandan keyin "ha, ha" deb taxtga qo'yiladi va unutiladi.

## Slide 15 — Failure pattern 2 · Texnologiya bor, jarayon yo'q

Ikkinchi failure naqshi — undan ham xavfli, chunki ko'rinmaydi. Texnologiya joriy qilindi, bot ishlayapti, lekin bo'limda hech kim ishlatmaydi. Sababi — AI ish jarayoniga singdirilmagan. Misol: bo'limga "shartnoma tekshirish boti" qo'ydik. Lekin xodimlarning workflow'i o'zgarmadi — ular hali ham PDF'ni qo'lda ochib o'qiyapti. Bot alohida tab'da o'tiribdi va birovga kerak emas. Yechim: AI joriy qilish texnik loyiha emas, ish jarayoni o'zgarishi. Bot xodim allaqachon ishlatadigan tizimga (CRM, Outlook, ichki portal) joylashishi kerak. Va — "majburiy" emas, "tabiiy" bo'lishi kerak: xodim shu vositadan foydalanmasa, ishini sekinroq qiladi. Mana shu darajaga yetkazsangiz — adoption o'sadi. Aks holda bot 3 oy ishlaydi, keyin bekor qilinadi.

## Slide 16 — Saboqlar · Bunday qil / Bunday qilma

Hammasini bir slaydda yig'amiz. Chap kolonna — qil. O'ngda — qilma. Qilish kerak: birinchidan, 1 ta tor use case'dan boshlash. Ikkinchidan, ma'lumot bazasini birinchi kunda tekshirib chiqish. Uchinchidan, muvofiqlik va riskni boshidan jamoaga olish. To'rtinchidan, kunlik ishlatish metrikalarini o'rnatish. Beshinchidan, fallback (manual yo'l) saqlash. Oltinchidan, har 4 hafta retrospective o'tkazish. Qilmaslik kerak: barcha bo'limlarni bir vaqtda boshlash; "AI yaxshi narsa" deb umumiy gaplar bilan loyihani sotish; texnologiya tanlovini biznesdan oldin qilish; pilot natijalarini production rejasiz qoldirish; modeldan to'liq qaror qilishni kutish; va eng katta xato — odamga "AI sizni almashtiradi" tarzida e'lon qilish. Aksincha: "AI sizning eng zerikarli ishingizni oladi, siz qiziqroq ishga o'tasiz" — bu xabar, va u haqiqat.

## Slide 17 — Mashq · Bo'lim drift'larini topish

Endi sizga 8 daqiqa. Stol bo'yicha 3 guruhga bo'linamiz: kredit, KYC/muvofiqlik, mijoz xizmati. Ekrandagi jadvalga qarang. Har stol o'z bo'limini tanlaydi va 3 ustunni to'ldiradi. Birinchi ustun: bizning hozirgi jarayon (2-3 jumla). Ikkinchi ustun: global keys (masalan, kredit uchun JPMorgan COIN) qanday qilgan. Uchinchi ustun — eng muhimi — drift, ya'ni bizda qaysi nuqtada uzilish bo'lishi mumkin. Misol uchun: JPMorgan'da yurist tasdiqlaydi — bizda kim tasdiqlaydi? Yoki Erica chiqargan ma'lumotlar real-time bo'lishi kerak — bizda real-time integratsiya bormi? 8 daqiqadan keyin har stoldan 1 vakil 1 daqiqada 3 ta drift'ni baland aytadi. Maqsad — keys qilib o'qish emas, keys'ni ko'zga ko'rinmas tarzda bo'limimizga taqqoslash. Bu sizning real ish hujjatingiz bo'ladi.

## Slide 18 — Closing + recap

Yakunlaymiz. Bugundan olib ketiladigan hujjat — uch xulosa va besh darvozali Pilot Readiness checklist. Xulosalar: birinchi — 70/14 farqi texnologiya emas, adoption va jarayonda. Eng yuqori darajadagi modelni olishingiz mumkin, lekin agar bo'limingiz uni ishlatmasa, bu pilot. Ikkinchi — keys'lar shablon emas, kompas. Hech bir bank sizning aynan vaziyatingizda emas; har biri 1-2 ta savol beradi: kim tasdiqlaydi? qancha tejaldi? qanday metrika? Javoblar bilan o'z keys'ingizni yozasiz. Uchinchi — pilot bu production'ga ko'prik. Pilot rejasi bilan birga production rejasi yoziladi: egasi, ulanish, byudjet birinchi kunda aniq. Endi Pilot Readiness — 5 ta darvoza, qog'ozda olib chiqing va bo'limga olib qaytishni tavsiya qilaman: 1) use case va foydalanuvchi guruhi aniq, 2) ma'lumot manbasi va PII nazorati, 3) inson tasdig'i + qo'lda fallback, 4) adoption KPI (login emas, foydalanish), 5) production gate — SLA, log, monitoring, egasi. Shu 5 qatordan o'tmagan pilot production'ga chiqmaydi. Va lug'at recap — birga aytamiz: AI Adoption — belgilangan guruhda muntazam foydalanish va ish natijasiga ta'sir. Production-grade — SLA, audit log, fallback, egasi bor; bank standartlarida turadigan tizim. Bu ikki so'zni Markaziy Bank kontekstida har joyda eslang.

## Slide 19 — Q&A

Savollaringiz. Vendor tanlash, byudjet, ichki resurs vs tashqi vendor, kerakli xodimlar tarkibi, muvofiqlik — barcha amaliy savollarga javob beraman.

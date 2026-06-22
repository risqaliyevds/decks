# Deck 9 — Oddiy SI ish tizimini yaratamiz

## Slide 1 — Modul ochilishi

Xayrli tong. Ikkinchi kunga xush kelibsiz. Kechagi yakunda gapirgan edim — bugun amaliyot kuni. Kecha biz nazariyani — AI nima, qanday xavflari bor, qanday promt yoziladi, qaysi platforma qachon ishlatiladi, no-code nima — yopdik. Bugun esa, mana shu daqiqadan boshlab, har bir ishtirokchi o'z birinchi sun'iy intellekt ish tizimini quradi. Modul oxirida har stolda ishlaydigan Telegram bot bo'ladi. Bosqichma-bosqich. Qo'rqmang, bilim hozir yetadi.

## Slide 2 — Mavzuning yo'l xaritasi

Yo'l xaritamiz to'rt qismdan iborat. Birinchi qism — tushuncha. Bot nima qiladi: erkin javob emas, sof JSON. Tasniflash va Schema atamalarini bankir tilida o'rganamiz. Ikkinchi qism — arxitektura. Telegram, Gemini va Sheets'dan iborat n8n flowgraph — o'n uchta node. Har bosqichni alohida ochamiz. Uchinchi qism — eng katta vaqt: live build. Har stol n8n'da o'z botini yig'adi, taxminan o'ttiz-qirq besh daqiqa, kod yozmasdan, darsda birga. To'rtinchi qism — sifat tekshiruvi, eng ko'p uchraydigan to'rt xato, recap, lug'at va savollar.

## Slide 3 — Kechagi RAG bot — bugungi classifier

Kechagi birinchi kunda biz BankRAGBoti'ni demo qilgan edik. Bot bank PDFidan foydalanib mijoz savollariga javob bergan edi. Esingizdami? Telegramda demo qildik. QR-kod hozir ekranda — bot hali ham tirik, sinab ko'rishingiz mumkin. Lekin men sizga rost gapni aytaman: bu RAG bot 77 ta node bilan ishlaydi, qurish ikki soat oldindan tayyorlangan. Bunday bot bilan boshlay olmaymiz.

Bugun biz boshqa yo'ldan boramiz. Birinchi qadam — oddiyroq, lekin amaliy bot. O'n uchta node bo'ladi: sakkizta asosiy node, plus /start xush kelibsiz tugmasi uchun bittasi, plus to'rtta LLM sozlamasi. Kod yo'q. Darsda birgalikda quramiz. Vazifasi: mijoz xatlarini avtomatik tasniflash va to'g'ri operatorga uzatish. Bank uchun konkret ish — chunki kuniga 200 ta xat keladi, kim qaysi bo'limga tegishli ekanligini saralash juda ko'p vaqt oladi.

## Slide 4 — Erkin javob vs Strukturali javob

Bugungi botning siri shunda: AI ixtiyoriy matn yozmaydi. U faqat aniq maydonlarni to'ldiradi — toifa, mavzu, tafsilot, shoshilinchlik. Shu sof JSONni Sheets to'g'ridan-to'g'ri saqlaydi va operatorni topadi.

Solishtirib ko'raylik. Erkin javob qanday ko'rinadi? "Avtokredit borasida sizga yordam beraman, foiz stavkasi turlicha bo'lishi mumkin..." — chiroyli matn, lekin tizim o'qiy olmaydi. Strukturali javob esa: aniq JSON — `{category: kredit, subject: Avtokredit so'rovi, urgency: medium}`. Aniq maydonlar, Sheets'ga to'g'ri yoziladi, operator filter avtomatik ishlaydi. Erkin matn chiroyli, lekin strukturali matn foydali. Bu bugungi farqning yuragi.

## Slide 5 — Bankir tili: Classification va Schema

Birinchi atama — Classification, ya'ni tasniflash. Bankir tilida: kelgan xatni besh turdan biriga yo'naltirish. Ming ta mijoz xati keldi — bot har birini avtomatik kredit, karta, depozit, shikoyat yoki info dan biriga ajratadi. Operator faqat o'zining toifasini ko'radi. Aytmoqchi, Classification — eski biznes atamasi. Bank ham allaqachon shikoyatlarni "kredit, karta, boshqa" deb ajratadi — lekin qo'lda. Bot shu ishni avtomatik qiladi.

Ikkinchi atama — Schema, ya'ni sxema. Bankir tilida: AI erkin matn yozmaydi, faqat kelishilgan kataklarni to'ldiradi. Toifa, mavzu, tafsilot, shoshilinchlik. Shu sabab Sheets ustunlari adashmaydi va operator avtomatik topiladi. Schema — yangi atama. AI'ga "ixtiyoriy javob berma, aynan shu maydonlarni to'ldir" deyishning rasmiy nomi. n8n'da Output Parser qatlami nazorat qiladi — agar AI Schema'ga mos kelmasa, qayta so'raydi.

## Slide 6 — Schema misoli — JSON

Misol bilan ko'rsataman. Mijoz har xil yozadi. "Avtokredit olmoqchiman, 50 mln so'mga, 5 yilga" — bot uni `{category: kredit, subject: Avtokredit so'rovi, urgency: medium}` ga aylantiradi. Kredit toifasi, aniq. "Kartam yo'qoldi tezda blokirovka qiling!!!" — bu `{category: karta, subject: Yo'qolgan karta, urgency: high}`. Karta toifasi, shoshilinch. Yo'qolgan kartani darhol blokirovka kerak. "Omonat foizi qancha?" — bu `{category: depozit, subject: Omonat foizi, urgency: low}`. Depozit toifasi, oddiy ma'lumot so'rovi. Sheets'ning ustun nomlari shu kalitlarga to'liq mos: category, subject, details, urgency. Saqlash avtomatik.

Diqqat qiling — har xat har xil tarzda yozilgan. Formal, shoshilinch, qisqa savol. Lekin chiqish bir xil shaklda. Bu — Schema'ning kuchi. Urgency maydoni alohida muhim — high shoshilinch keysni darhol ajratadi, low faqat ma'lumot so'rovi. Operator avval shoshilinch keysni ko'radi.

## Slide 7 — BankYordamchi to'liq arxitektura

Endi butun botning xaritasini ko'rib chiqamiz. Sakkizta asosiy node, gorizontal chiziq bo'ylab. Telegram Trigger — If shartli node, /start bo'lsa boshqacha boradi — keyin LLM Classify, Sheets Read Operators, Aggregate, ikkinchi LLM Dispatch+Reply, Sheets Save Application, va oxirida Telegram Send Reply. Yuqorida bitta ayri: /start true bo'lsa Telegram Greeting node ishga tushadi va yordam matnini yuboradi. Plus, LLM nodelar ostida to'rtta sozlama node — Gemini Classifier va Output Parser, va ikkinchi LLM uchun yana shunday juftlik.

Asosiy fikr: asosiy oqim chiziqli, lekin /start uchun kichik shartli ayri bor. Mijoz xat yozadi, If tekshiradi, /start bo'lsa Greeting javob qaytaradi, aks holda LLM Classify boshlanadi va oqim oxirigacha boradi. Bu eng oddiy AI workflow shakli — linear pipeline plus welcome branch.

Keling, bosqichlarni alohida ochamiz. To'rt bosqich.

## Slide 8 — Mijoz xati qayerdan keladi

Mijoz xati qaerdan keladi? Eng birinchi node — Telegram trigger. Mijoz botga xabar yozsa, n8n shu joyda uyg'onadi va keyingi qadamlarni ishga tushiradi. Sozlash bir martalik.

Eng tabiiy savol: "bot tokenini qaerdan olamiz?". Javob: Telegramning rasmiy bot yaratuvchisi @BotFather. Telegramda /newbot deb yozasiz, ikki savol so'raydi — bot nomi va username. Keyin token beradi. Mana shu token — botning passporti. n8n'da Telegram Trigger node'ga shu tokenni kiritasiz. Ikki daqiqalik ish.

Trigger faqat oddiy xabarlarga uyg'onadi — komanda, tugma yoki callback emas. Mijoz "Avtokredit kerak" deb yozsa, workflow boshlanadi. Trigger keyingi nodelarga uchta narsa beradi: chat ID — kimga javob qaytarish kerak, first_name — mijoz ismi, va message text — xat matni. Production uchun Telegram token maxfiy, bank ichki sertifikatlash bilan saqlanadi. n8n'ning credentials bo'limida shifrlangan holatda turadi.

## Slide 9 — Gemini xatni tasniflaydi

Endi botning miyasi. Basic LLM Chain node ichida Gemini turadi. System prompt unga besh toifani aytadi va sof JSON chiqarishini buyuradi. Output Parser javobni schema bo'yicha tekshiradi — boshqa format chiqsa, qayta so'raydi.

Solishtirib ko'raylik. Agar AI'ga shunchaki "javob ber" desak, u shunday yozadi: "Kelgan xatga qarab kredit yoki karta bo'limi bilan bog'lanish kerakdek...". Chiroyli, lekin Sheets'ga to'g'ri yozib bo'lmaydi. Tizim qarshi tomondan o'qiy olmaydi. Operatorni avtomatik topib bo'lmaydi. Aksincha, Schema bo'yicha JSON: `{category: kredit, subject:..., details:..., urgency: medium}`. Besh toifa: kredit, karta, depozit, shikoyat, info. Va eng muhimi — temperature parametri 0.2 ga qo'yiladi. Kam ijodkorlik. Barqaror tasniflash. Har xat bir xil tarzda o'qiladi.

Bu botning yuragi. Basic LLM Chain — n8n'ning oddiy LLM node'i. Unga uchta narsa biriktiramiz: birinchi, Gemini Chat Model — javobni kim yozadi. Ikkinchi, System prompt — qanday qoidalar bilan. Uchinchi, Output Parser — JSON sxemasi. Temperature 0.2 nima degani? Yuqori temperature bo'lsa AI har xil javob beradi, ijodiyot ko'p. Bizning vazifa esa tasniflash — bir xillik xohlaymiz. System prompt to'liq matni paired bot folder'ida yozilgan, har stol nusxasini oladi.

## Slide 10 — Operatorni tanlash va javob yozish

Gemini "kredit" deb ajratdi. Endi uch node ketma-ket boradi. Sheets'dan operatorlar ro'yxatini olamiz, Aggregate bitta ro'yxatga to'playdi, ikkinchi Gemini — Dispatcher — operatorni tanlaydi va mijozga matnli javobni bir vaqtning o'zida yozadi.

Sheets Read Operators node filtr bilan ishlaydi: category sizning Gemini natijasiga teng va active TRUE. Mos satrlarni qaytaradi. Aggregate Sheets'dan kelgan satrlarni bitta ro'yxatga birlashtiradi — LLM uchun tanlov varianti tayyor. Va LLM Dispatch+Reply ikkinchi Gemini chaqiruvi va Output Parser. Bir vaqtning o'zida ikki ish: operatorni tanlaydi va mijozga javob matnini yozadi.

Bu botning eng amaliy qismi. Operators jadvali — siz boshqaradigan ma'lumot. Hech qanday kod, hech qanday cron, hech qanday admin paneli kerak emas. Google Sheets ochilgan, satrni tahrirlaysiz, bot keyingi xatdayoq yangi qatorni ishlatadi. Bo'limga yangi xodim qo'shildi — Operators sheet'ga satr qo'shasiz. Xodim ketdi — active ustunini FALSE qilasiz. Bot sizning sozlamangizni quvib boradi.

Ikkinchi LLM Dispatcher bitta chaqiruvda ikki ish qiladi: operatorni mos qoidaga ko'ra tanlaydi — toifa plus active TRUE, va mijozga yumshoq, bankir tilidagi javobni yozadi. Fallback ham bor: agar ro'yxat bo'sh bo'lsa, LLM "Tayinlanmagan" deb belgilaydi va admin keyin qo'lda biriktiradi.

## Slide 11 — Ariza saqlanadi, javob qaytadi

Dispatcher operatorni tanlab javob matnini ham yozib qo'ydi. Endi ikki yakuniy node. Sheets Save Application — Applications jadvaliga to'liq satr: vaqt, mijoz, toifa, mavzu, operator, tayyor javob matni. Va Telegram Send Reply — LLM Dispatcher chiqargan javob matnini chat ID'ga jo'natadi, operator nomi va kontakti bilan.

Eng oddiy qism. Sheets Save Application Sheets'ning ustun nomlarini JSON kalitlariga avtomatik moslashtiradi — qo'lda bog'lanish yo'q. Telegram Send Reply — chat ID Trigger'dan olinadi, text esa LLM Dispatcher chiqargan reply_text maydonidan. Ikkita Gemini chaqiruvi — ikki ishni bajardi: tasniflash plus javob yozish. Sheets'da to'liq audit izi qoldi. Mijozga shaxsiy javob bordi. Ish tugadi.

## Slide 12 — Botning xotirasi: 2 ta varaq

Endi savol: botning butun xotirasi qaerda? Javob — bitta Google Sheets fayl, ikki varaq. Birinchisini siz to'ldirasiz — operatorlar ro'yxati bo'limga ko'ra. Ikkinchisini bot to'ldiradi — har mijoz xati. Database yo'q. Drive yo'q. Ortiqcha integratsiya yo'q.

Operators varag'ida olti ustun: operator ID, ism, toifa, kontakt, active, izoh. Misol: Aziza Karimova, kredit toifasi, telefon +998 90 ..., active TRUE. Bo'lim admini bu jadvalni boshqaradi. Applications varag'i bot tarafidan to'ldiriladi. Har mijoz xati — bir satr. O'n bir ustun: vaqt, chat ID, mijoz ismi, toifa, mavzu, tafsilot, shoshilinchlik, status, operator ismi, operator kontakti va tayyor javob matni. Demo paytida varaqni o'zgartirmang — bot yozyapti.

Sheets ustun nomlari JSON kalitlariga aynan mos. n8n autoMapInputData rejimida ishlaydi. Yangi toifa qo'shsangiz — Operators'ga satr qo'shing, system prompt'ga bandni qo'shing — kod tegmaydi. Bu bank uchun juda muhim: bot ma'lumotlari qaerda turadi. Demo rejimida mijoz xati Gemini API'ga tasniflash uchun yuboriladi, natija bank Sheets'iga yoziladi. Production uchun alohida qaror kerak — PII masking, token va Sheets huquqlari, audit log, ma'lumot saqlash muddati va komplaens roziligi. Bu masalalarni 3-modulda gaplashganmiz.

## Slide 13 — Bot xatni qanday qayta ishlaydi

Endi texnik tafsilotlardan emas, mijoz tajribasidan qarab chiqamiz. To'rt qadam.

Birinchi qadam: mijoz Telegramga xat yozadi. Bo'sh matn — har xil tarzda. Masalan, "Kartam yo'qoldi tezda blokirovka qiling!!!".

Ikkinchi qadam: AI tasniflaydi. Gemini xatni o'qiydi va schema bo'yicha JSON chiqaradi. Category karta, urgency high. Bu — Classification atamasining amalda ishlashi.

Uchinchi qadam: operator topiladi. Sheets'dan toifaga mos faol operator olinadi. Bekzod Rahimov, telefon raqami bor.

To'rtinchi qadam: javob yuboriladi. Ariza saqlanadi, mijozga operator nomi bilan javob qaytadi: "Sizning operator Bekzod Rahimov, 24 soat ichida bog'lanadi".

Yo'qolgan karta misolida high urgency mantiqini ko'ring: shoshilinch shikoyat — operator ro'yxatining boshida ko'radi. Hech qanday murakkab dasturlash yo'q. Sakkizta asosiy node plus LLM sozlamalar. Kod yo'q. Darsda birga quramiz.

Bu — birinchi ish tizimingiz. Classification va Schema — yakuniy ko'prik, bu atamalar besh-slayd lug'atda kiritilgan, hozir amalda ko'ringan.

## Slide 14 — Classifier qachon ishlaydi, qachon yo'q

Tasniflagich — bitta aniq vazifaga mo'ljallangan vosita. Kuchli va zaif tomonni bilsak, qaysi xatlar uchun ishlatib, qaysilarini insonga uzatishni to'g'ri belgilaymiz.

Classifier yaxshi ishlaydi qachon? Toifalar aniq va kam — besh-yetti ta. Bitta xatda bitta niyat — kredit yoki karta, lekin ikkalasi emas. Strukturali ma'lumot kerak — Sheets'ga yoki CRM'ga yozish. Triage va yo'naltirish — operatorga uzatish maqsadi. Takrorlanadigan, oddiy mijoz xatlari.

Classifier yomon ishlaydi qachon? Bir xatda ikki-uch niyat — "kredit plus karta plus shikoyat" hammasi bitta xatda. Toifalar chegarasi noaniq — kredit va lizing farqi noaniq bo'lsa. Mijozga aniq javob kerak — hujjatdan, bu 11-modul mavzusi. Hisob-kitob, taqqoslash, ko'p qadamli savol kerak bo'lsa. Ellikdan ortiq toifa kerak bo'lsa — bunda agent yondashuvi to'g'riroq, 10-modul.

Classifier — triage vositasi, javob mashinasi emas. Mijoz "kreditim haqida" deb yozsa — bot kredit operatoriga uzatadi, ammo o'zi javob bermaydi. Agar mijoz aniq javob istasa, foiz yoki shartlar haqida — hujjatdan javob beradigan botni 11-modulda ko'ramiz. Agar mijoz bir nechta savol bersa — agent kerak, 10-modulda. Bugun esa eng oddiy holat: bitta xat, bitta toifa, bitta operator. Bank xizmati uchun bu hali ham juda foydali — chunki 80% xatlar shu shaklda.

## Slide 15 — Stol mashqi · Live build

Endi navbat sizga. Har stol o'z BankYordamchisini yig'adi. O'ttiz-qirq besh daqiqa. Har stolda to'rt-besh kishi.

Vazifa uch qismdan iborat. Birinchi: n8n'da workflow'ni quring. Telegram Trigger, keyin If shartli (/start bormi?), keyin LLM Classify — Gemini va Parser bilan. Keyin Sheets Read Operators. Aggregate. LLM Dispatch+Reply — yana Gemini va Parser. Sheets Save Application. Telegram Send Reply. Plus, /start uchun Telegram Greeting branchi.

Ikkinchi vazifa: Operators sheet'iga besh ta operatorni kiriting. Har toifaga bittadan — kredit, karta, depozit, shikoyat, info. Hozirgi vaqtda haqiqiy operatorlar emas, test maqsadida o'zingiz yoki yordamchilarni yozasiz.

Uchinchi vazifa: Telegram'dan uch ta xat yuboring. Birinchi xat — kredit haqida. Ikkinchi xat — karta yo'qolgan. Uchinchi xat — omonat haqida. Sheets'ga to'g'ri toifa va to'g'ri operator yozilishini tekshiring.

Instructor shablonidan boshlaymiz. Har stolga tayyor Sheets template'i bor. O'ttiz daqiqa qurish. O'n daqiqa test. Besh daqiqa stollararo hisobot. Yordamchilar — bir-ikki nafar — stol bo'yicha yuradi. Hisobot bosqichida har stol qisqacha aytadi: qaysi xat eng yaxshi tasniflandi, qaysi xat chalkashlik kelirdi.

## Slide 16 — 4 ta xato — oldindan bilsak

Oldindan bilsak, oldini olamiz. Mening tajribamdan kelib chiqib, eng ko'p ko'rilgan to'rt xato bor.

Birinchi xato: Gemini JSON o'rniga erkin matn qaytaradi. Markdown bilan o'raydi, uch baquot ichida. Tuzatish: system prompt'ga aniq yozasiz — "faqat sof JSON, markdown belgilari yo'q". Output Parser'ni yoqing — sxemaga mos kelmasa qayta so'raydi. Bu birinchi xato eng halokatli — butun pipeline buziladi.

Ikkinchi xato: toifa Sheets'dagidan boshqa nom bilan chiqadi. AI "Kredit" deb katta harf bilan yoki "credit" deb lotin yozadi, Operators'da esa "kredit" — kichik harf, o'zbekcha lotin. Tuzatish: besh ta toifa nomini tek shaklda yozing. Kichik harf, lotin: kredit, karta, depozit, shikoyat, info. Sheets ham xuddi shu format.

Uchinchi xato: toifaga mos operator yo'q. Operators sheet bo'sh yoki active FALSE. Tuzatish: LLM Dispatcher prompt'ida fallback qoidasi — ro'yxat bo'sh bo'lsa "Tayinlanmagan" yoziladi. Har toifaga kamida bitta faol operator bo'lishi shart. Ariza baribir saqlanadi — admin qo'lda biriktiradi.

To'rtinchi xato: Sheets ustun nomlari JSON kalitlariga mos kelmaydi. Qatorlar bo'sh tushadi. Bu eng noaniq xato — satr saqlanadi lekin bo'sh keladi. Tuzatish: ustun nomlari aynan category, subject, details, urgency, operator_name va hokazo. autoMapInputData rejimi avtomatik joylaydi. Bitta harf farq qilsa ham — bo'sh keladi.

## Slide 17 — Bugun classifier, keyin agent va RAG

Bugungi BankYordamchi — siz qurgan birinchi to'liq AI ish tizimi. n8n workflow, sof JSON, operator triage. Tez ishlaydi va tez kengayadi.

Bo'lim uchun ma'nosi: triage avtomatlashtiriladi. Mijoz xatlarining katta qismi takrorlanadi — bot ularni avtomatik toifaga ajratadi va to'g'ri operatorga uzatadi. Inson faqat murakkab keyslar bilan ishlaydi. Bu vaqtning strategik foydalanishi.

Keyin nima? O'n-o'n birinchi modullarda biz bugungi botga ikki qatlam qo'shamiz. O'ninchi modulda agent qo'shamiz — Tool Use bilan kalkulyator yoki ma'lumot bazasini chaqirish. O'n birinchi modulda RAG qo'shamiz — hujjatdan aniq javob. Lekin barcha kengayishlar shu birinchi ish tizimi ustiga quriladi. Bugun siz qo'shilgan birinchi ehtimollik: AI bilan ishlaydigan ish jarayoni qurish.

## Slide 18 — 3 ta asosiy xulosa

Bugungi mashg'ulotdan uch ta asosiy xulosa.

Birinchisi: Classification va Schema — birinchi ish tizimingiz. Mijoz erkin yozadi, AI sof JSON chiqaradi, tizim avtomatik triage qiladi. Bu yangi ish usuli.

Ikkinchisi: sakkizta asosiy node plus LLM sozlamalar. Murakkab dasturlash yo'q. Telegram plus Gemini plus Sheets. Bitta tayyor JSON shabloni. Darsda birga quriladi. Har bo'lim o'z toifa va operator ro'yxatini kiritadi.

Uchinchisi: mashg'ulot yakuni — pilot qaror varaqasi. Har stol topshiradi: bo'lim nomi, toifalar ro'yxati, o'n test xat natijasi, asosiy xavflar va qaror — pilotga ruxsat, qayta ishlash yoki rad etish.

Pilot qaror varaqasi besh mezondan iborat. Birinchi: bo'lim — qaysi bo'lim, mijoz oqimi qancha? Ikkinchi: toifalar — besh ta yetadimi, qaysilarini qo'shish kerak? Uchinchi: test — o'n ta xatdan nechtasi to'g'ri toifaga tushdi? To'rtinchi: xavf — noto'g'ri toifa, operator topilmasa, maxfiylik. Beshinchi: qaror — pilotga ruxsat, qayta ishlash yoki rad etish.

Endi lug'at recap. Eslay olasizmi: Classification nima edi? *(zal bilan birga: Kelgan xatni besh toifadan biriga avtomatik ajratish!)* Schema nima edi? *(zal bilan birga: AI faqat aniq maydonlarni to'ldiradi, erkin matn yozmaydi!)*

Yaxshi. Bu ikki atama o'n beshinchi modulda yakuniy glossary review'ga qaytib chiqadi. Tovushda kuchaytirib aytdik — yodda qoladi.

## Slide 19 — Savol va javob

Endi savollar. Eng ko'p uchraydiganlarini eslatib qo'yaman. "Bot Telegramdan boshqa kanalda ishlaydimi?" — ha, WhatsApp, web, email — Trigger node almashtiriladi. "Mijoz ma'lumoti qaerga boradi?" — bank Sheets'i sizning nazoratingizda plus Gemini API so'rov uchun ishlatiladi, saqlamaydi. Bu 3-modul muvofiqlik bilan ko'prik. "Toifa qo'shish kerak bo'lsa?" — Operators'ga satr qo'shasiz plus system prompt'ga band. Kod tegmaydi. "Botni qanday yangilash mumkin?" — har xato test bilan: o'n xat, sakkiztasi to'g'ri, prompt tuzatamiz, yana o'n xat, to'qqiztasi to'g'ri. "Agentdan farqi nima?" — 10-modulga ko'prik, hozirgi bot statik, agent fikrlay oladi.

Toifalar, n8n, Sheets, Gemini, muvofiqlik — qanday savollar bo'lsa, bemalol. Marhamat. Yozma savollar uchun pochta: murod@mohir.dev. Rahmat.

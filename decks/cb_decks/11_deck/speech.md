# Deck 11 — Bank uchun sun'iy intellekt agenti dizayni (RAG chatbot)

## Slide 1 — Title · 11-modul · RAG chatbot

Hurmatli hamkasblar, tushlikdan keyingi sessiyaga xush kelibsiz. Bugungi modul boshqalardan biroz farq qiladi — bu showcase va dizayn moduli. Siz qurmaysiz, lekin architectural daraja-da tushunasiz. Eslang, to'qqizinchi modulda biz Telegramdan, Geminidan va Sheetsdan foydalanib o'n uch nodedan iborat klassifikator bot qurgan edik. Bot mijozning xabarini toifaga ajratib, mos operatorga yo'naltirardi. Bugun ko'rsatadigan RAG chatbot — aynan shu botning chuqur, manba bilan ishlaydigan versiyasi. Lekin ancha kattaroq: yetmish yetti node, o'n to'rt marshrut, taxminan olti baravar yiriqroq.

Botning ichini ochib ko'rsataman, lug'atni mustahkamlaymiz, va siz pilot canvas to'ldirib chiqasiz. Maqsadim: bo'limingizga qaytib borganingizda qo'lingizda aniq qaror bo'lsin — bizning bo'limga RAG kerakmi yoki yo'q, agar kerak bo'lsa qaysi hujjatlardan boshlaymiz.

## Slide 2 — Yo'l xaritasi · Agenda

Olmish daqiqani biz to'rt fazaga bo'lamiz. Birinchi o'n daqiqa — RAG nima ekanligi: live demo, oddiy LLM bilan RAG farqi, va ikkita yangi atama. Ikkinchi qism, taxminan o'n daqiqa — RAG arxitekturasi, to'rt bosqich va chunking strategiyasi. Uchinchi qism, eng katta — yigirma ikki daqiqa — production botning ichi: korpus tuzilishi, real Q&A misol, audit izi, qachon yaxshi qachon yomon ishlashi va privacy masalasi. To'rtinchi qism — sizning RAG pilotingiz: dizayn mashqi va canvas to'ldirish.

## Slide 3 — Live RAG bot demo · BankRAGBoti

Endi botni ko'ramiz. Ekranda QR turibdi — birinchi modulda va to'qqizinchi modulda ham ko'rgansiz, bu o'sha "bankragbot". Telefoningizdan QRni skanlang, botga kirib bir nechta savol bering. Masalan: "Avtokredit foizi qancha?". Bot avval ichki PDFdan qidiradi, keyin javob beradi: "Tarif uchinchi, to'rtinchi band: yillik o'n sakkiz foiz. Manba: kredit_siyosati.pdf". Eng muhim qism — manba ko'rsatilgan. Bankir bir bosishda PDFga o'tib, bandni qayta o'qishi mumkin.

Bu — kechagi sehr; bugun mexanizmini tushunamiz. To'qqizinchi modulga ko'prik: klassifikator botingiz kim qaysi operatorga tushishini hal qiladi. Bu bot esa endi javobni o'zi qaytaradi, lekin faqat bank PDFidan, manba ko'rsatib.

## Slide 4 — Pure LLM muammosi · uydirma vs manba

Oddiy LLM bilan RAG farqini aniq misolda ko'raylik. Pure LLMga "Avtokredit foizi qancha?" deb so'rasangiz, javob: "Avtokredit foizi taxminan yigirma ikki foiz atrofida bo'lsa kerak". Manba yo'q, gallyutsinatsiya xavfi yuqori, bankir bunga tasdiq qo'ya olmaydi. Bu — uchinchi modulda ko'rgan hallucination muammosi.

RAG esa boshqa yo'l tutadi. Javobdan oldin tasdiqlangan ichki PDFdan tegishli bandni topadi va javobni shu manbaga bog'laydi. "Tarif uchinchi, to'rtinchi band: yillik o'n sakkiz foiz. Manba: avtokredit_nizomi.pdf, o'n ikkinchi bet". Manba bor, joriy hujjat, audit izi mavjud. Va eng muhimi — agar topilmasa, "Ushbu hujjatda ma'lumot topilmadi" deb javob beradi. "Balki" emas, "ehtimol" emas — yo manba bor, yo javob yo'q.

Pure LLM yigirma ikki foiz dedi. Bank PDFda o'n sakkiz foiz yozilgan. Bu gallyutsinatsiya, kelishmovchilik, mijoz oldida bankir uchun jarima xavfi. RAG bu xavfning architectural yechimi — promptdagi qoida emas, butun mexanizm.

## Slide 5 — Lug'at · RAG + Embedding

Endi modulning poydevoriga o'tamiz — ikkita atama. RAG va Embedding. Bularni bir marta to'g'ri tushunsak, qolgan ellik daqiqa yengil o'tadi.

RAG — bu Retrieval-Augmented Generation degani. Bankir tilida: AI avval tasdiqlangan bank hujjatlaridan mos bandni topadi, keyin faqat shu bandga tayanib javob yozadi. Manba topilmasa — javob yo'q. RAG — bu usulning umumiy nomi.

Embedding — bu RAG ichidagi mexanizm. Matnning vektor ko'rinishi. Matnni raqamli vakilga aylantirish jarayoni — shunda "avtokredit foizi" va "mashina krediti stavkasi" bir-biriga yaqin topiladi, ma'no jihatidan. Foydalanuvchi qaysi so'zni ishlatishidan qat'i nazar — bot to'g'ri bandni topadi.

Sodda misol bilan ayting: har matnga AI yetti yuz oltmish sakkizta raqam beradi. Yaqin ma'no — yaqin koordinata. Aytaylik, "avtokredit foizi" matni nuqtai-nazaridan vektor [0.21, 0.84, ...] bo'ladi; "mashina krediti stavkasi" — [0.23, 0.81, ...] — yaqin. "Yangi yil ta'tili" — [-0.40, 0.05, ...] — uzoq. Mana bu — embedding. Modul oxirida birga aytamiz: RAG — avval manbani top, keyin javob yoz. Embedding — matnni ma'no bo'yicha qidirish.

## Slide 6 — RAG arxitekturasi · 4 bosqich

Endi RAG ichini ochaylik. To'rt bosqichdan iborat. Birinchisi — Indexing. Drive folderidagi PDFlar yig'iladi. Hujjat bir joyda, bot ularni biladi. Ikkinchisi — Chunking. Butun PDFni AIga bera olmaymiz — kontekst oynasi to'lib ketadi. Bo'laklarga ajratamiz: sakkiz yuz belgili bo'laklarga, bir yuz yigirma belgi overlap bilan.

Uchinchi bosqich — Embedding. Har bo'lakka Gemini orqali vektor beriladi. Bu yetti yuz oltmish sakkiz raqamlik koordinata, biz hozir ko'rib o'tdik. To'rtinchi — Retrieval plus Generation. Savol kelganda eng yaqin besh bo'lak topiladi (Top-K = 5), va AI Agent shu bo'laklarga tayanib javob tuzadi. Bu yerda muhim narsa: tayyorgarlik bir marta, ishlatish million marta. Indeks bir marta quriladi, har savolga qayta quriladigan emas.

## Slide 7 — Production RAG bot · 77 node · 14 marshrut

Endi production botning hajmiga qaraylik. Yetmish yetti node, o'n to'rt marshrut, ikki eshik. To'qqizinchi modulda klassifikator o'n uch node edi — bu taxminan olti baravar katta. O'n to'rt marshrut: bitta asosiy savol-javob, yetti admin buyrug'i (yordam, hujjat ro'yxati, hujjat qo'shish, o'chirish, qayta indekslash, statistika, bekor qilish), va olti tasdiqlash yoki xato qadami. Ikki eshik: oldindan — Telegram, mijoz savoli kiradi; orqada — Manual Trigger, admin reload qila oladi. Har savolga besh ta eng yaqin bo'lak topiladi, sakkiz yuz belgi, bir yuz yigirma overlap. Botning live workflowi risqaliyevds.app.n8n.cloudda ishlab turibdi. Siz qurmaysiz — ichini ko'rasiz. Kod yo'q, hammasi n8nda.

## Slide 8 — Bank PDF qo'llanma · Drive + Sheets

Bank PDF qo'llanma uchta joyga ajratilgan: Drive, Sheets, vector store. Drive folderda original PDF nusxalari yotadi — kredit_siyosati.pdf, avtokredit_nizomi.pdf, depozit_shartlari, komplaens_qoidalari. Sheets indeksi — to'rt tabdan iborat: Documents tabi (doc_id, fayl nomi, drive_id, faolligi); Admins tabi (qaysi chat_id admin bo'la oladi, allow-list); AdminStates tabi (admin nimani qilayapti, pending operatsiya, bir soat TTL); UsageLog tabi (har savol, javob, "topilmadi" hollari, manba). Bu uchligi ustiga audit qurildi: hujjat bir joyda, indeks ikkinchi joyda, vektor uchinchi joyda.

## Slide 9 — Chunk size + overlap · 800 / 120

Endi chunkingga qaytaylik. Sakkiz yuz belgi, bir yuz yigirma overlap — bu sanoat standartining yaxshi boshlang'ich qiymati. Overlap nima? Ekranda ko'ring: kredit_siyosatining to'rtinchi bo'limi uch chunkga ajralgan, har ikki chunk orasida bir yuz yigirma belgi takrorlanadi. Bu — bandning bog'lovchi qismi. Chegarada qolgan ma'lumot yo'qolmaydi. Yakuniy qoida test bilan topiladi: yigirma-o'ttizta real savol bilan sinab, qaysi chunk hajmi yaxshi javob beradi. O'n ikkinchi modulda semantic chunking va hierarchical chunking strategiyalarini chuqurroq ko'rib chiqamiz.

## Slide 10 — Banking misol · ichki PDF Q&A

Endi real Q&A misol. Mijoz savoli: "Avtokredit foizi qancha?". Embedding: vektor [0.21, 0.84, ...] hosil bo'ladi. Top-K besh chunk topiladi. AI Agent shu besh chunkga tayanib javob tuzadi: "Kredit siyosati to'rtinchi bandiga ko'ra: yangi avto — yillik o'n sakkiz foiz; ikkilamchi bozor — yillik yigirma bir foiz; boshlang'ich to'lov o'ttiz foizdan kam emas; besh yildan eski avto uchun ellik foiz". Manba: kredit_siyosati.pdf, to'rt nuqta bir va to'rt nuqta ikki bandlar. Va oxirida: "Yakuniy qaror — bankir hamkasbim bilan kelishilgan holda bo'ladi". Bot o'zi qaror chiqarmaydi — manba ko'rsatadi.

## Slide 11 — Manba tekshiruvi · har javob = audit izi

RAG botning bank uchun asosiy ustunligi — har javob audit qilinishi mumkin. To'rt audit nuqtasi bor. Birinchisi — manba majburiyati. System prompt aniq aytadi: "Faqat topilgan parchalardan javob ber. Topilmasa — 'Ushbu hujjatda ma'lumot topilmadi'. Internetdan, taxmindan — taqiqlangan". Bu — qattiq qoida.

Ikkinchisi — iqtibos har javobda. "Manba: hujjat nomi, bo'lim". Bankir bir bosishda PDFga o'tib bandni qayta o'qishi mumkin. Uchinchisi — UsageLog jurnali. Sheetsda har savol, har topilgan chunk, har javob, "topilmadi" bayrog'i, latency vaqti yoziladi. "/stats" buyrug'i yetti kunlik ko'rsatkichni qaytaradi. To'rtinchisi — hujjat versiyasi. Documents tabida doc_id, qachon qo'shilgan, kim qo'shgan, faolligi. "/delete_doc" soft-delete qiladi, "/reindex" butun korpusni qayta quradi.

## Slide 12 — RAG qachon yaxshi · qachon yomon

Endi savolingiz bo'lishi mumkin: RAG har joyda ishlaydimi? Yo'q. RAG qachon yaxshi ishlaydi, qachon yomon — buni aniq biling.

Yaxshi ishlaydi quyidagilar uchun: hujjatda aniq yozilgan faktlar — foiz, summa, sana; "qayerda yozilgan?" tipidagi savollar; shartnoma bandlari, qoidalar, tariflar; FAQ tipidagi takrorlanuvchi savollar; besh-ellik betlik bir mavzudagi hujjatlar.

Yomon ishlaydi quyidagilar uchun: bir nechta hujjatni taqqoslash — "qaysi tarif foydaliroq?" — bu agent ishi; hisob-kitob talab qiladigan savollar — agent va calculator tool kerak; muddati o'tgan hujjat — RAG bilmaydi qayta indekslamaguncha; real-time ma'lumot — bugungi kurs uchun API kerak; chunk chegarasiga tushgan band — "retrieval miss" deyiladi, agar muhim ma'lumot ikki chunkga bo'linib qolsa.

Mana shu jadval — qaror nuqtasi. RAG yetmasa, sizga agent yoki pipeline kerak. Bu o'n ikkinchi modulning mavzusi, multi-chain pipeline arxitekturasi.

## Slide 13 — Privacy · bank PDF qayerda saqlanadi

Endi privacy masalasiga o'tamiz. Bank PDFlar qayerda saqlanadi? Bu — har bankir uchun birinchi savol. Birinchidan, saqlash konturi: Drive folder bank tasdiqlangan bulut konturida. Embedding va LLM Gemini API orqali, Vertex AI Workspace, korporativ shartnoma plus opt-out treningdan. Ya'ni bizning hujjatlar Geminini o'qitish uchun ishlatilmaydi.

Ikkinchidan, korporativ shartnoma. DPA hujjati, data residency, zero-training bandi, audit huquqi. Uchinchi modulda Data Masking atamasini ko'rganmiz — bu shu yerda qaytadi. Uchinchidan, audit log. Sheetsda UsageLog tabi. Adminlar — Admins tabidagi allow-list. Telegram IDsi kiritilmagan — admin emas, hujjat qo'sha olmaydi. Eng muhim qoida: tasdiqsiz haqiqiy bank PDF demoga kiritilmaydi. Pilot — sintetik yoki ochiq nizomlardan boshlanadi. Birinchi qadam ehtiyot bo'lib quriladi.

## Slide 14 — Tayyor template · bots/02_rag_chatbot

Endi botning to'liq dizayni qayerdaligini ko'rsataman. Bizda papka bor: bots/02_rag_chatbot. Ichida workflow grafi yetmish yetti node uchun, system prompt, admin command sxemasi, conversation flow, data schema, hammasi yozilgan. Bu — tayyor template. Workflow grafi ASCII shaklida ko'rsatilgan, har node nimani qiladi. Conversation flow — foydalanuvchi va admin state machine. Data schema — Sheets tablari, Drive layout, chunk strategiyasi. Bitta master-prompt fayl bor — uni nusxalab paste qilsangiz, bot tikladi.

## Slide 15 — Dizayn mashqi · 3 ta savol

Tayyor template — bu sizning ish boshlash nuqtangiz. Lekin avval pilotni qaror qilish kerak. Endi men sizdan so'rayman — sizning bo'limingizga RAG kerakmi va qanday hujjatdan boshlaymiz?

O'n daqiqa beraman, stol ichida muhokama qilasiz. Uchta savolga javob yozasiz. Birinchi savol: sizning bo'limingizda qaysi uchta hujjat RAGning birinchi pilot manbasi bo'la oladi? Nizom, qoida, tarif — aniq fayl nomi ayting, "umumiy hujjatlar" emas. Ikkinchi savol: foydalanuvchi kim — mijoz, ichki bankir, yoki audit? Va u qanday savol beradi? Uchta tipik misol keltiring. Uchinchi savol: "topilmadi" javobi qachon to'g'ri, qachon xato? Qaysi savolga RAG umuman javob bermasligi kerak?

## Slide 16 — RAG pilot canvas · 5 qator

Muhokamadan keyin biz canvasni to'ldiramiz. Besh qatorli pilot canvas: use case, manba, test savollar, xavf plus eskalatsiya, qaror. Birinchi qator — use case. Bo'limning qaysi savol oqimi RAG bilan yopiladi? Bir jumla, mas'ul bo'lim ko'rsatiladi.

Ikkinchi qator — manba. Qaysi uchta PDF korpusga tushadi? Hujjat toifasi, yangilanish davri, admin allow-list. Uchinchi qator — test savollar. Yigirmata savol test seti — har javobda manba majburiy, xato javob nol, "topilmadi" hollari alohida ko'rib chiqiladi. To'rtinchi qator — xavf plus eskalatsiya. "Topilmadi" qachon to'g'ri? Eski hujjat ishlatilsa nima bo'ladi? Eskalatsiya egasi kim? Beshinchi qator — qaror. Uch variant: "Hozir boshlamaymiz" — bu ham qaror; "Sintetik hujjat bilan sinaymiz" — xavfsiz pilot; "Cheklangan haqiqiy korpus bilan pilot qilamiz" — to'liq pilot. Qaror egasi va qayta indekslash davri yoziladi.

Sakkiz daqiqa beraman, keyin ikkita stol o'z qarorini auditoriyaga taqdim etadi.

## Slide 17 — Yakun · 3 xulosa + lug'at recap

Bugun o'zimiz bilan olib ketadigan uchta xulosa.

Birinchisi — RAG manbasiz emas, manbaga tayangan AI. Bank uchun yagona to'g'ri javob: ichki PDF plus iqtibos. "Topilmadi" — javob, "balki" emas. Bu — bankir uchun bunday tizimning eng katta yutug'i.

Ikkinchisi — bu showcase, keyingi darajaga andoza. To'qqizinchi modulda o'n uch nodeli klassifikator qurdingiz; bu — uning chuqur, manba bilan ishlaydigan versiyasi, yetmish yetti node, taxminan olti baravar katta. Bugun siz arxitekturani ko'rib, o'z pilotingizga talab yozasiz — qurish emas.

Uchinchisi — pilot qarori bilan chiqamiz. Har stol besh qatorli canvas: use case, manba, test, xavf, qaror. Tayyor template bots/02_rag_chatbot papkasida.

Endi lug'at recap. Birga aytamiz: RAG — avval bank PDFidan top, keyin shu manbaga tayangan javob yoz. Embedding — matnni ma'no bo'yicha qidirish uchun raqamli vektorga aylantirish. Yodda tutib turing — o'n ikkinchi modulda Pipeline va Idempotent atamalari bilan birga qaytadi.

## Slide 18 — Savol-Javob · Q&A

Savol-javob uchun bir necha daqiqa qoldiraman. Eng ko'p uchraydigan savollar: RAGga necha PDF beraman? Pilot uchun uchta yetarli, production uchun minglab. Top-K orqali tezlik nazoratda. Mijoz pasport raqamini so'rasa? System prompt rad qiladi, PII filter ishlaydi. O'n uchinchi modulda Data Masking aynan shu yerda qaytadi. Bot eski hujjatdan javob berib qoldi-chi? "/reindex" orqali korpusni yangilang. CI/CD avtomatlashtirish — o'n to'rtinchi modulda. Va eng qiziq savol: to'qqizinchi modul klassifikator bilan o'n birinchi modul RAG bir botda? Mumkin: avval klassifikator, faqat RAG savol topilsa — yo'naltir. O'n ikkinchi modulda multi-chain pipeline arxitekturasini ko'ramiz.

Rahmat. Tanaffusdan keyin o'n ikkinchi modul — Pipeline va Idempotent design.

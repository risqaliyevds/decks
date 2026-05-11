# Kirish

Salom. Day 1'ning oxirgi mavzusiga keldik. Tongdan beri promt, AI lug'at, platformalar bilan ishladik. Endi savol: bularning hammasi qanday bir-biriga ulanadi? Telegram, Gemini, sizning bank tizimingiz, Sheets — bu xizmatlar bir-biri bilan o'zicha gaplashmaydi. Kimdir bog'lab qo'yishi kerak.

An'anaviy javob: dasturchi yozadi. Yangi javob: bo'lim xodimi sichqoncha bilan yig'adi, 30 daqiqada. Bu shu modulning mavzusi — no-code avtomatlashtirish. Aniq aytsam, kod yozmasdan, lekin haqiqiy ish jarayonini avtomatlashtiradigan vositalar. Zapier, Make va eng asosiysi — n8n. Nima uchun n8n? Chunki u sizning bank serveringizda turishi mumkin. Hech qanday ma'lumot tashqariga chiqmaydi. Va ertaga 9-modulda shu n8n ustida birinchi botingizni qurishni boshlaymiz. Boshlaymiz.

Yo'l xaritamiz to'rt qismdan iborat. Birinchi qismda — nima uchun bu mavzu sizga, bo'lim xodimiga, kerakligini aniqlaymiz. Dasturchi va bo'lim xodimining ikki yo'lini taqqoslaymiz, no-code falsafasini ochib beramiz, va kursning sakkizinchi modulgacha kelgan ikki yangi atamani — Trigger va Webhook'ni — bankir tilida o'rganamiz. Ikkinchi qismda uch platformani solishtiramiz: Zapier, Make va n8n. n8n nega bizning tanlovimiz ekanini ko'rsatamiz. Workflow'ning anatomiyasini ko'ramiz — har qanday avtomatlashtirish besh qadamga bo'linadi. Uchinchi qism — eng konkret qism. Sizning bo'limingizdagi uch real misol: spravka avtomatlashtirish, email shikoyatlarni AI orqali bo'limga yo'naltirish, va muvofiqlik hisobotini har juma avtomatik tuzish. To'rtinchi qism — eng qiziqarlisi. Ekranda men sizning ko'zingiz oldida besh-nodeli mini-workflow yig'aman. Siz savol berasiz, bot javob beradi.

Boshlashdan oldin tezkor savol — 30 soniyada. Tasavvur qiling: har juma Compliance bo'limi Slack'ga avtomatik xabar yuborilishini xohlaydi — yangi anomaliyalar haqida. Buni qanday hal qilasiz? Ekranda uchta variantni ko'rib turibsiz. Birinchi yo'l — dasturchi yollang. Ikki hafta, katta budjet, murakkab. Ikkinchi yo'l — Excel plus qo'l ishi. Ikki soat, lekin har hafta sinadi va charchatadi. Uchinchi yo'l — n8n flow. Besh daqiqa, drag and drop, ishonchli. Ko'pchilik bo'limlar birinchi yoki ikkinchi yo'lni tanlaydi — chunki uchinchi yo'l haqida hali bilmaydi. Bugungi modul aynan shu uchinchi yo'lni ko'rsatadi.

# Bir misol — kim yig'adi?

Har bankda uchraydigan vaziyat: mijoz sizdan spravka so'raydi — hisobida qancha aylanma bor edi o'tgan yilda. Bo'lim xodimi qo'l bilan tayyorlaydi, imzolaydi, mijozga yuboradi — o'n besh-yigirma daqiqa. Kuniga ellik marta. Yiliga o'n ikki ming marta. Avtomatlashtirish kerakligi aniq. Endi savol: kim qiladi?

Eski yo'l: bo'lim xodim IT bo'limga ariza yozadi. Brief tayyor bo'lishi uch-to'rt kun. Texnik talab — yana hafta. Sprint, test, deploy — ikki hafta umumiy, agar yengil bo'lsa. Uch oydan keyin bot ishlay boshlaydi.

Yangi yo'l: bo'lim xodimi o'zi yig'adi. n8n ochadi, Telegram trigger node tashlaydi, sichqoncha bilan ulaydi. O'ttiz daqiqa — bot tayyor. IT bo'limi keyin auditdan o'tkazadi, xavfsizlik tekshiradi, production'ga chiqarishni tasdiqlaydi.

Bu — no-code inqilobi. "Avtomatlashtirish kim qila oladi?" degan savolga javob o'zgardi. Bu sizning kursingizdagi eng amaliy modul. Ertaga bormang, bugungi bilim bilan o'z bo'limingizdagi bitta jarayonni avtomatlashtirishingiz mumkin. Va eng zo'r qismi — IT bo'lim sizdan minnatdor bo'ladi, chunki ularning navbati bo'shaydi.

No-code'ni texnologiya deb tushunish — yarim haqiqat. Asl mohiyati boshqa: ish madaniyati o'zgarishi. Uch yutuq bor. Birinchi — tezlik. Spravka misolida ko'rdik: ikki hafta o'rniga 30 daqiqa. Bu raqam haqiqiy. Sprint planning'siz, brief'siz, TZ'siz, deployment ceremoniya'siz. G'oya tug'ildi — bir kunda ishlaydi.

Ikkinchi yutuq — IT bo'limining yuki. Bilingki, sizning IT bo'limingizning navbati doim to'liq. Kichik avtomatlashtirish so'rovlari kattalarni kechiktiradi. No-code platformalar bu kichik so'rovlarni bo'lim xodimiga qaytaradi. IT esa strategik, murakkab vazifalar bilan shug'ullanadi — kor banking tizimlari, xavfsizlik, integratsiya arxitekturasi. Hammasi yutadi.

Uchinchi yutuq — eng ahamiyatlisi: shaffoflik. Workflow vizual ko'rinadi — node, ulanish, ma'lumot oqimi. Yangi xodim bir soatda tushunadi: "shu node bu yerga ulanadi, AI shu joyda ishlaydi". Eski qora quti tushunchasi yo'qoladi. Bu muvofiqlik va audit uchun katta yutuq. Auditor sizning workflow'ingizni ko'rib, kim qaerda nima qilayotganini bir qarashda tushunadi. Kodli yechimda buni isbotlash juda qiyin — yuzlab satr o'qib chiqish kerak edi.

# Bankir tili — Trigger va Webhook

Endi ikkita kalit so'zni o'rganib olaylik. Bularsiz keyingi 13 ta slayd tushunarsiz bo'ladi, va ertaga 9-modulda ham bu atamalar qaytib chiqadi.

Birinchisi — Trigger. Ingliz tilida "qo'zg'atuvchi" degani. Bankir tilida — workflow'ni boshlatadigan signal. Har bir avtomatlashtirishda birinchi savol: "qachon, qanday hodisa kelsa, bot uyg'onadi?" Misollar: mijoz Telegram'ga /spravka deb yozdi — Telegram trigger. Soat 17:00 bo'ldi va juma — Schedule trigger. Yangi email keldi — Email trigger. Mijoz saytdagi formani to'ldirdi — Form trigger. Bu birinchi atama.

Ikkinchisi — Webhook. Bu maxsus URL, botning eshigi. Boshqa tizim shu URL'ga xabar yuboradi, bizniki uyg'onadi va xabarni qabul qiladi. Misol: bizning n8n'da URL bor — n8n.bank.uz slash webhook slash spravka-arizasi. Bank ichki tizimi shu URL'ga "yangi mijoz keldi" deb yuboradi — bizning workflow boshlanadi.

Webhook — Trigger turining bir turi, eng kuchlisi, chunki har qanday boshqa tizim bilan ulanish imkonini beradi. Lekin bankda eshik *ochiq* emas: token, IP cheklovi, imzo va audit log bilan himoyalanadi.

Esda saqlang: Trigger nima edi? — workflow'ni boshlatuvchi hodisa. Webhook nima edi? — boshqa dasturdan xabar olish nuqtasi, URL.

# Platformalarni taqqoslash

Bozorda asosan uchta platforma bor. Hammasi bir narsani qiladi: turli xizmatlarni bir oqimga ulaydi. Lekin farq katta.

Birinchisi — Zapier. Eng tanilgan, eng oddiy. Yetti mingdan ortiq tayyor ulanish. Yangi boshlovchi uchun ideal — 30 daqiqada birinchi workflow'ni qurasiz. Kamchiligi: serverlar AQShda. Hech qanday tanlov yo'q. Bank uchun bu masala — mijoz ma'lumoti chet elga chiqishi mumkin. Plus, narxi yuqori — vazifa bo'yicha hisob, oyiga 30 dollar dan boshlanadi.

Ikkinchisi — Make. Avval Integromat deb atalardi. Vizual kuchli, murakkab oqimlar uchun yaxshi. If-else, loop, error handling — hammasi bor. Serverlar Yevropada — GDPR muvofiq. Narxi yengilroq, 9 dollar dan. Lekin baribir hosting o'zimizniki emas — bank uchun bu muvofiqlik xavfi.

Uchinchisi — n8n. Bizning tanlovimiz. Open-source, ochiq kod. Eng asosiysi: o'z serveringizda turadi. Bank ma'lumoti chetga bir bayt ham chiqmaydi. Self-hosted versiyasi bepul, bulut variant oyiga 20 dollar atrofida. Bonus: kerak bo'lsa kod ham yozish mumkin — JavaScript node, shuning uchun cheklovlar yo'q. Va eng zo'ri — n8n hozir AI integratsiyasida yetakchi: Gemini, OpenAI, Anthropic — barcha LLM'lar bilan tayyor ulanishlar. Shuning uchun keyingi 11 slayd va ertangi 9-modulda biz n8n bilan ishlaymiz.

n8n nima uchun bizning tanlovimiz — uch aniq sabab bor. Birinchisi, eng muhimi — self-hosted. Bankning o'z serverida turadi. 3-modulda gaplashganimiz "Yopiq kontur" tamoyili shu yerda mukammal ishlaydi. Mijoz ma'lumoti, hujjat, hisob raqami — bularning hech biri n8n.io serveriga yoki AQSh ga chiqmaydi. Bank ichki tarmog'ida turadi, IT bo'limi to'liq nazorat qiladi.

Ikkinchi sabab — open-source. Kodi ochiq. Bank xavfsizlik bo'limi har bir satrini ko'rib chiqishi mumkin. Vendor lock-in yo'q — agar ertaga n8n kompaniyasi yopilsa ham, sizning workflow'laringiz ishlaydi, kod sizda. Va litsenziya: jamoaviy foydalanish bepul.

Uchinchi sabab — ekosistema. Besh yuzdan ortiq tayyor ulanish: Telegram, Email, Google Sheets, Postgres, MySQL, OpenAI, Gemini, Claude, va eng asosiysi — webhook orqali har qanday tizim. Yangi node 30 daqiqada yoziladi. Bu jamoaning kuchli tomoni.

# Workflow anatomiyasi

Workflow'ning anatomiyasini bilsangiz, har qanday avtomatlashtirish sizga tushunarli bo'ladi. Chunki bularning hammasi shu beshlikning kombinatsiyasi.

Birinchi qadam — Trigger. Hozirgina o'rgangan atama: workflow'ni boshlatuvchi hodisa. Mijoz Telegram'ga savol yozdi.

Ikkinchi qadam — Filtr. Har bir kelgan ma'lumot foydali emas. Bo'sh xabar, dublikat, spam — chetga olib tashlanadi. Bu juda muhim, chunki keyingi qadam pulli — AI. Bekor so'rovga AI ishlatish — pul behuda.

Uchinchi qadam — AI. Bu workflow'ning aql qismi: Gemini yoki boshqa LLM mijoz savoliga javob tuzadi. Bu yerda bizning 5-modulda o'rgangan promt shabloni ishlaydi: rol, kontekst, vazifa, format.

To'rtinchi qadam — Saqlash. Har bir savol va javob Google Sheets yoki bank Postgres bazasiga yoziladi. Bu — audit trail. Muvofiqlik uchun kritik: kim, qachon, nima so'radi va bot nima dedi.

Beshinchi qadam — Bildirish. Mijozga Telegram orqali javob qaytaradi, va menejerga "yangi savolga javob bordi" deb xabar yuboradi. Hammasi besh ta n8n node — ekranda besh ta to'rtburchak, sichqoncha bilan ulanadi. Hech qanday kod. Boshqa har qanday murakkab workflow ham — shu beshlikning kengaytirilgan varianti.

Trigger turlari beshta. Bilingki, bank stsenariylarining 95% shu beshlikka tushadi. Birinchisi — Schedule. Vaqt belgilanadi. Har juma 17:00, har kuni 08:00, oyning birinchi kuni. Eng oddiy va eng ko'p ishlatiladigan turi. Misol: muvofiqlik hisoboti har juma 17:00 da avtomatik tuziladi va yuboriladi. Hech kim eslatmaydi.

Ikkinchisi — Webhook. Hozirgina o'rgangan atama. Boshqa tizim bizga URL orqali xabar tashlaydi. Misol: CRM tizimida mijoz holati VIP ga o'zgardi — workflow boshlanadi, mijozga maxsus xat yuboradi.

Uchinchisi — Email. Yangi xat keladi, mavzu yoki yuboruvchi bo'yicha filtr. Misol: shikoyat@bank.uz pochta yashigiga kelgan har bir xat avtomatik tahlil qilinadi.

To'rtinchisi — Telegram. Bu siz uchun tanish: bot xabar oladi yoki maxsus buyruq. Misol: mijoz /spravka yozadi.

Va beshinchisi — Form. Sayt formasi yoki Google Form. Misol: yangi mijoz onlayn ariza yuboradi.

Endi men sizdan so'rayman: sizning bo'limingizdagi avtomatlashtirishlar qaysi trigger bilan boshlanadi? O'ylab ko'ring. Ko'pchiligi Schedule bo'lib chiqadi — har kun, har juma. Yoki Email — mijoz xabari. Aniqlab oling, bu workflow loyihalashning birinchi qadami.

Webhook eng kuchli trigger turi, lekin u ham eng ko'p chalkashtiriladigan tushuncha. Ikki yo'nalishda ishlatiladi. Birinchi yo'nalish: tashqi xizmat bizga xabar tashlaydi. Misol: Telegram bot. Telegram serveri har gal mijoz botga xabar yozsa, bizga URL orqali xabar tashlaydi. Biz cheksiz polling qilib o'tirmaymiz — Telegram o'zi bizga ovoz beradi. Ikkinchi yo'nalish: ichki tizim bizga xabar tashlaydi. Bu yanada kuchli. Misol: bank CRM tizimida mijoz holati o'zgaradi. CRM bizning bank-ichi URL'ga xabar tashlaydi: "client_id 1023, status VIP". Bizning workflow uyg'onadi va kerakli ishni boshlaydi. Webhook bu siyosiy katta narsa: xizmatlar bir-biridan ajralib, lekin bog'lanib turadi.

# Uch real bank misoli

Birinchi misol — boshda gapirgan spravka. Olti qadam. Trigger — Telegram. Mijoz /spravka deb yozadi yoki tugmani bosadi. Birinchi qadam, workflow boshlandi. Ikkinchi qadam — tasdiq. Mijoz JSHIR va telefon raqamini kiritadi, bot bank bazasidan tekshiradi: bu mijozmi? Agar yo'q bo'lsa — ariza to'xtaydi va xato xabari beriladi. Uchinchi qadam — bank API'siga so'rov. Mijoz hisobi, harakatlar tarixi, kerakli davr olinadi. Bu yerda HTTP Request node ishlatiladi. To'rtinchi qadam — PDF tuzish. AI ishlaydi: shablonni oladi, mijoz ma'lumotini joylaydi, balansni hisoblaydi, summani so'z bilan yozadi va PDF generatsiya qiladi. Beshinchi qadam — audit log. Sheets'ga yoziladi: kim, qachon, qanday spravka oldi. Bu muvofiqlik uchun kritik. Oltinchi qadam — yuborish. PDF Telegram'ga yuboriladi, mijoz darrov yuklab olishi mumkin. Yiliga 12 ming spravka so'rovi. Eski tartibda har biri 15 daqiqa — bu uch ming soat operator vaqti. Yangi tartibda — nol. Operator faqat istisno hollar bilan shug'ullanadi. Vaqt strategik vazifalarga ozod bo'ladi.

Ikkinchi misol — har bankda kuniga 100-200 marta uchraydigan vaziyat. Mijoz shikoyat@bank.uz pochtaga email yozadi. Eski tartib: bo'sh xona kotibasi yoki call-center xodimi har birini o'qib chiqadi, qaysi bo'limga tegishli ekanligini aniqlaydi, qo'l bilan tegishli bo'limga yuboradi. Bu kuniga to'rt soat sof saralash ishi. Yangi tartib — AI bilan. Birinchi qadam — Email trigger. Yangi xat keldi — workflow boshlandi. Ikkinchi qadam, eng muhimi — toifalash. AI mavzuni va matnni o'qiydi, va aniq belgilangan toifalardan birini tanlaydi: Karta muammosi, Kredit, Mobile bank, yoki Boshqa. Bizning 5-modulda o'rgangan promt shabloni shu yerda ishlaydi. Few-shot misollari berilgan — har toifadan ikki-uch misol. Aniqlik 90% atrofida. Uchinchi qadam — yo'naltirish. Tegishli bo'lim emailiga: kartalar@bank.uz, kreditlar@bank.uz va hokazo. To'rtinchi qadam — CRM'da yangi tiket ochiladi. Beshinchi qadam — SLA timer. 24 soat ichida javob bo'lmasa, eskalatsiya, bo'lim raisiga avtomatik xabar boradi. Natija: operator vaqti kuniga to'rt soatdan o'ttiz daqiqaga qisqaradi.

Uchinchi misol — Schedule trigger uchun klassik. Muvofiqlik bo'limi har juma haftalik hisobot tayyorlaydi: katta tranzaksiyalar, anomaliyalar, qora ro'yxatdagi mijozlar harakatlari. Eski tartib: muvofiqlik xodim uch-to'rt soat ma'lumotni Postgres'dan, 1C'dan, Sheets'dan qo'l bilan yig'adi, Excel'da tayyorlaydi, xulosa yozadi, PDF qiladi, email qiladi. Yangi tartib — bot qiladi, har juma 17:00 da. Schedule trigger uyg'onadi. SQL so'rovlar Postgres'ga, API'lar 1C'ga, Sheets'dan ma'lumot olinadi. AI tahlili boshlanadi — bu eng qiziqarli qism. AI ma'lumotni ko'rib, anomaliyalarni topadi: "bu mijoz oxirgi haftada 50 ta yangi tranzaksiya qildi, oldingi haftalardan o'n marta ko'p". Va xulosa yozadi — ikki-uch paragrafda, audit komitetiga tushunarli tilda. PDF — tayyor shablonga jadval va xulosa joylanadi. Email — audit komiteti, bo'lim raisi, tegishli mas'ullarga yuboriladi, va arxivga saqlanadi. To'rt soat ish — besh daqiqaga qisqaradi. Muvofiqlik xodim endi tahlil qiladi, saralash bilan emas.

# Live mini-build

Endi eng qiziq qism. Hammasini chala-chala ko'rdik — endi men ekranda haqiqiy workflow yig'aman. Sizning ko'zingiz oldida. Vazifa: bot oladi sizdan savol, Gemini bilan javob beradi, va saqlaydi log'da.

Birinchi node — Telegram Trigger. Bot username'i ekranda turibdi, men hozir nodeni qo'shaman, credentials'ni tanlayman. Tayyor — bot endi har xabarni "eshitadi".

Ikkinchi node — Set. Telegram Trigger juda ko'p ma'lumot beradi: kim yozdi, qachon, qanday chat ID. Bizga faqat matn kerak. Set node bilan kerakli maydonni ajratamiz.

Uchinchi node — Gemini AI. Eng asosiy. Promt shabloni: "Sen bank konsultanti. Foydalanuvchi savoliga professional, lekin tushunarli javob ber. Maksimal uch abzas." Va foydalanuvchi savolini joylaymiz.

To'rtinchi node — Google Sheets. Yangi qator: vaqt, foydalanuvchi, savol, javob. Audit uchun.

Beshinchi node — Telegram Reply. AI javobini foydalanuvchiga qaytaradi. Hammasi. Besh ta node, nol satr kod. Activate tugmasini bosaman, workflow ishga tushdi.

Endi siz savol bering — Telegram bot username'i ekranda. Bittangiz savol yozing — javob ekranda besh sekundda chiqadi. *(Auditoriyadan ikki-uch savol kutamiz, jonli ko'rsatamiz.)*

Bu — bizning oddiy demo. Ertaga shu skeletga PDF, RAG va xotira qo'shamiz.

# Uch katta xato

Workflow'lar bilan ishlaganda eng ko'p uchraydigan uch xatoni aytib beraman.

Birinchisi — loop. Bot ishladi deb xayolingizga keldi-yu, qarab qo'ymadingiz. Loop bo'lib qoldi: bot o'ziga o'zi xat yubordi, mijozga 200 marta bir xil xabar bordi. Yoki AI har besh sekundda yangi versiyani ishlab chiqarib turdi — shu sabab oyiga besh ming dollar hisob kelgan kompaniyalar bor. Yechim: idempotent dizayn — har trigger'ga unikal ID beriladi, ID takror kelsa workflow qayta bajarmaydi. Bu 12-modulda chuqur ko'ramiz. Hozircha shuni esda saqlang: har workflow'da o'ylang — "men buni o'n marta ishga tushirsam, oqibat bir marta ishlatgandagi bilan bir xil bo'ladimi?"

Ikkinchi xato — silent crash. Workflow yarim tunda yiqildi, ertasi kuni bilib qoldik. Mijozlar tushunarsiz xat olishdi. Yechim: error workflow va alert. Har n8n workflow'ga "agar yiqilsa, mana bu workflow ishlasin" deb beriladi — u Telegram'ga xato detallari bilan xabar yuboradi o'ttiz sekundda. Ko'rmasdan qolmaysiz.

Uchinchi xato — AI'ga juda ko'p ishonish. "AI hammasini hal qiladi" deb mijoz arizasini AI o'zi tasdiqlaydi, kredit beradi. Yo'q. AI tayyorlaydi, inson tasdiqlaydi. 4-modulning hand-off tamoyili shu yerda — mas'uliyat hech qachon AI'ga o'tmaydi.

# Xavfsizlik — uch qizil chiziq

No-code qanchalik qulay bo'lsa, shunchalik xavfli — agar to'g'ri qoidalar bo'lmasa. Bo'lim xodimi har xil ma'lumotni har joyga yo'naltirib qo'yishi mumkin. Shuning uchun uch qoida — qizil chiziq, ulardan o'tib bo'lmaydi.

Birinchi qoida — API kalitlar saqlanadi. Telegram, Gemini, CRM, bank API kalitlari workflow ichiga yozilmaydi — n8n'ning credentials bo'limiga joylanadi, shifrlangan holda. Vault'da kim yaratganini, kim qaytarganini ko'rsatadi. Agar xodim ishdan ketsa, kalitlari rotated qilinadi avtomatik. Hech bir kalit kodda yoki ekranda ko'rinmaydi.

Ikkinchi qoida — audit log. Har n8n node ishlashi avtomatik log'lanadi: kim trigger qildi, qachon, qaysi ma'lumot kirdi, qaysi chiqdi. Xato bo'lsa — qaysi qadamda yiqilganini bir ko'rishda topamiz. Bu muvofiqlik uchun havo. Markaziy Bank tekshiruvi kelsa, oxirgi uch yillik har bir avtomatlashtirilgan jarayon logi saqlanadi.

Uchinchi qoida — rolega kirish. Workflow yaratish — bo'lim xodimning huquqi. Lekin uni production'ga chiqarish — IT yoki Compliance tasdig'i shart. Sandbox'da sinab ko'rasiz, audit qilasiz, faqat undan keyin live bo'ladi. Bu 3-modulda gaplashganimiz xavf-xatar boshqaruvi tamoyillarining konkret amali.

# Qaror varaqasi va yakun

Yakuniy savol-javobdan oldin — bugun olib ketadigan bitta artefakt. Bank qaror varaqasi. Har bo'lim 9-modulgacha bo'lgan tanaffusda bitta workflow nomini yozsin. So'ng shu olti savolga "ha" yoki "yo'q" javob bering.

Birinchi savol: Trigger aniqmi? Email yoki Schedule yoki Webhook — qaysi va nega. Ikkinchi: ma'lumot turi qanday — ochiq jamoatchilik bo'limi axboroti emas, mijoz hisob raqami yoki shaxsiy ma'lumot bo'lsa, alohida nazorat shart. Uchinchi: inson qayerda tasdiqlaydi? AI faqat tayyorlasin, yakuniy ha-yo'q javobi — bankir. To'rtinchi: audit log — har qadam yozilishi shart. Beshinchi: test mezoni — pilot oxirida nimani o'lchaysiz: vaqt, xato, SLA, xavfsizlik incidenti. Oltinchi: mas'ul shaxs — uchov: bo'lim rahbari, IT rahbari, komplayens rahbari. Faqat olti "ha" bo'lsa — workflow pilotdan production'ga chiqadi. Aks holda — sandbox'da qoladi. Bu varaqa ertaga 9-modulda RAG bot loyihalashda ham ishlaydi.

Yakun. Bugundan uyga olib ketadigan uch fikr. Birinchisi: no-code — bo'lim xodimining yangi ish vositasi. Spravka misoli edi: ikki hafta sprintdan 30 daqiqali yig'ishga o'tdik. Dasturchi navbatini kutmaymiz — o'zimiz yig'amiz, IT auditdan o'tkazadi. Bu sizning ish kunlik amaliyotingizni o'zgartirishi mumkin bo'lgan eng amaliy bilim.

Ikkinchisi: trigger — workflow'ning yuragi. Schedule, Webhook, Email, Telegram, Form. Bank stsenariylarining 95% shu beshlikka tushadi. Avtomatlashtirishni boshlaganda doim birinchi savol: "qaysi trigger?" Aniq javob bilan qoldirsangiz — qolgan qadamlar oson kelishadi.

Uchinchisi: ertaga 9-modulda biz aynan shu n8n ustida sizning bo'limingiz uchun ishlaydigan birinchi botni quramiz. Bu siz bilan birga qurish — auditoriyadagi har bir ishtirokchi o'z botiga ega bo'ladi.

Endi lug'at recap. Birga aytamiz. Trigger nima edi? *(zal bilan birga: Workflow'ni boshlatuvchi hodisa!)* Webhook nima edi? *(zal bilan birga: Boshqa dasturdan xabar olish nuqtasi, URL!)* Yaxshi. Day 1 yakunlandi. Ertaga to'qqizda kun ikkinchi boshlanadi — kuchni saqlang, 9-modul amaliy va kuchli bo'ladi.

Endi savollar. Eng ko'p uchraydiganlarini eslatib qo'yaman, agar qiziqsangiz — so'rang. "n8n bizning serverimizda qanday joylashtiriladi?" — IT bo'lim bilan keyingi haftada o'tirish kerak, Docker yoki VM versiya tanlanadi. "Qaysi triggerdan boshlash kerak?" — bo'limingizda eng ko'p qaytariladigan jarayonni belgilang, Schedule yoki Email bo'lib chiqadi odatda. "AI'ga ishonchsizman" — AI faqat tayyorlaydi, yakuniy tasdiq bankir imzosi orqali. "Bizning bank bunga tayyormi?" — pilot loyiha, bitta bo'limda, to'rt hafta. 14-modulda MVP loyiha qilamiz.

Boshqa savollar bor — yozing: murod@mohir.dev. Telegram orqali ham javob beraman. Day 1 yakunlandi. Rahmat. Day 2 — agentlar, voice memo, real keyslar. Eng amaliy qism — sizni ertaga kutamiz.

# Deck 7 — AI platformalari bilan ishlash

## Slide 1 — Modul ochilishi

Xayrli kech. Soat 16:15 bo'ldi, bilaman, ko'pchiligingiz charchadingiz, kun davomida juda ko'p ma'lumot oldik. Lekin hozir eng qiziq qismiga keldik. Bilamiz: tongdan beri AI nima, xavfi qanaqa, promt qanday yoziladi — nazariyani yopdik. Endi kapotni ochamiz va asboblarning o'ziga qaraymiz.

Ko'pchiligingiz telefonda ChatGPT ishlatib turasiz, to'g'rimi? Birortangizning telefoningizda Claude bormi? Bir nechtangiz Gemini'ga ham kirgansiz. Yaxshi. Lekin bank ishi uchun "men ChatGPT'ni yaxshi ko'raman, faqat shuni ishlataman" degan gap o'tmaydi. Bu xuddi "men faqat bolg'a ishlataman, hamma narsani shu bilan uraman" deganga o'xshaydi. Hozirgi 60 daqiqada siz muhandis ko'zoynagini taqasiz. Qaysi vazifaga qaysi AI tezroq, arzonroq va xavfsizroq ekanini ajratishni o'rganamiz. Boshladik.

## Slide 2 — Mavzuning yo'l xaritasi

Yo'nalishimiz juda aniq. To'rtta bosqichdan o'tamiz. Birinchi — bozorda o'zi nima bor? Uchta katta platformani yuzma-yuz urishtirib ko'ramiz. Ikkinchi — IT bo'limi bilan qanday tilda gaplashish kerak? Ikkita atama o'rganamiz, shu bilan qaysi AI qancha pul yeyishini tushunasiz. Uchinchi — Markaziy Bank xodimi sifatida bizning tanlash mezonimiz qanaqa bo'ladi? Xavfsizlik va narx. Va oxirida — zaldagi stollarda o'tirib, o'zingiz jonli sinov o'tkazasiz.

## Slide 3 — Har vazifaga qaysi platforma

Boshlashdan oldin men sizdan tezkor savol so'rab olaman, 30 soniyada. Ekranda to'rtta vaziyat ko'rib turibsiz. Birinchi — ko'p oqim, 1000 ta mijoz xatini tasniflash kerak. Ikkinchi — uzun hujjat, 200 betlik huquqiy tahlil. Uchinchi — ijodiy ish, slogan yoki brending matni. To'rtinchi — jonli qidiruv, bugungi yangiliklar. Har bittasiga qaysi modelni tanlaysiz, miyada bir o'tkazib chiqing. Qo'l ko'tarmang — bu rasmiy ovoz emas, bu miyani uyg'otish mashqi. Javoblar har xil bo'ladi, aniqlovchi javob yo'q. Shu noaniqlik o'zi keyingi 17 slaydning poydevori. Bizning bugun yagona mashq qiladigan ramkamiz — *qaysi vazifaga qaysi mos*.

## Slide 4 — Bir savol, uch xil javob

Endi konkret misol. Bizda umumiy, shaxsiy ma'lumotsiz kredit siyosati parchasi bor. Uchta AI'ga aynan bir xil promt yubordik. Qarang, javoblar qanday turlicha bo'ldi.

ChatGPT'dan: "Foiz, valyuta va mijoz to'lov qobiliyati riski bor". To'g'ri, lekin umumiy. Universitet referati darajasida. "Qaysi banddan oldingiz?" degan savolga aniq javob bermaydi.

Claude: "Risk 1 — 3.2-banddagi USD/UZS bog'lanishi. Risk 2 — 75% garov IFRS 9 ga yetmaydi". Aniq band, aniq sitata. Muvofiqlik bo'limi uchun juda qulay. Lekin baribir inson tekshirishi shart — AI to'qib ham qo'yishi mumkin.

Gemini: "Topdim va Drive'dagi 4-hujjat bilan solishtirdim". Workspace integratsiyasi qulay. Lekin bu integratsiya bo'lim ruxsati va audit izi kelishilgandan keyingina yoqilishi kerak.

Endi men sizdan so'rayman: qaysi biri zo'r? Hech qaysi. Aslida, "qaysi biri zo'r?" degan savolning o'zi xato. To'g'ri savol — *"Mening aniq vazifamga qaysi biri mos? Ma'lumot turi qanday, dalil kerakmi, audit izi qayerda?"*. Mana shu savol — bugungi modulning yuragi.

## Slide 5 — Bozorda 5 ta katta o'yinchi

Endi bozorga umumiy nazar tashlaymiz. Har kuni yangiliklarda ko'ramiz: falon kompaniya yana yangi AI chiqardi. Lekin jiddiy bank ishi uchun atigi beshta o'yinchi bor xolos. Birinchisi — OpenAI va uning ChatGPT'si. Hammamiz bilamiz. Ikkinchisi — Anthropic va Claude. Boyagi yuristimiz. Uzun matnlar va muvofiqlik uchun. Uchinchisi — Google va Gemini. Bizning bu kursning miyasi. Bu uchtasi bizning asosiy qurollarimiz. Yana ikkitasini bilib qo'yish kerak. Perplexity — agar sizga internetdan bugungi yangilik yoki real-vaqt ma'lumot kerak bo'lsa. ChatGPT ko'pincha o'tmishda yashaydi — Perplexity bugun nima bo'lganini bilib oladi. Va YandexGPT yoki GigaChat — agar regulyator "ma'lumot umuman O'zbekiston yoki Rossiyadan chiqmasin" deb qattiq talab qo'ysa, alohida variant sifatida ko'rib chiqishimiz mumkin.

## Slide 6 — Bankir tili: Token va Context Window

Endi, keling, IT bo'limi bilan bir tilda gaplashishni o'rganamiz. Bu juda muhim — chunki IT bo'limga AI haqida aytadigan bo'lsangiz, ular sizga "qaysi modelni xohlaysiz, token sarfi qancha?" degan savol berishi mumkin. Va siz bu savolga tayyor bo'lishingiz kerak. AI'ni tekinga ishlatib bo'lmaydi, uning o'z hisob-kitobi bor.

Birinchi atama — Token. Bu AI'ning pul birligi. AI matnni biz odamlarga o'xshab so'zma-so'z emas, bo'g'inlab o'qiydi. Mana shu bo'g'inni token deb ataydi. Masalan, "avtokredit" degan bitta so'z AI uchun uch token bo'lishi mumkin. Siz qancha uzun savol bersangiz, shuncha token sarflanadi va pul shunga qarab to'lanadi.

Ikkinchi atama — Context Window, ya'ni kontekst oynasi. Bu AI'ning operativ xotirasi. Siz unga bir marta o'qishga qancha hujjat bera olasiz? Agar oyna kichik bo'lsa, yuz sahifalik hisobotni tiqolmaysiz, bo'lib-bo'lib berishga to'g'ri keladi.

Shu ikki so'zni eslab qoling. Token — bu siz to'laydigan pul. Context Window — bu sig'im. Bu ikki atama bu kursning keyingi sakkiz modulida ham, sizning kelajakdagi har bir IT muzokarangizda ham qaytib chiqadi.

## Slide 7 — 1 so'z, 1 sahifa — qancha token

Endi misol bilan ko'rsataman. "Avtokredit" degan bitta so'z — o'rtacha uch token atrofida. O'nta so'zdan iborat bitta jumla — taxminan o'n uch token. Bitta to'liq A4 sahifa, masalan, arizamiz — taxminan olti yuz ellik token. Eslab qoling bu raqamlarni.

Aytmoqchi, bu yerda muhim bir nyuans bor. O'zbek tili AI uchun ingliz tiliga qaraganda qimmatroq. Inglizcha "loan" so'zi bitta token bo'lsa, bizning "kredit" ikki-uch token bo'lib ketadi. Inglizcha matnda o'rtacha bitta so'z taxminan 1.3 token; o'zbekcha matnda esa ko'pincha ikki-uch token. AI asosan ingliz tilida o'qitilgan bo'lgani uchun bizning so'zlarni ko'proq maydalaydi. Narx shunga yarasha 30-40% qimmatlashadi. Xulosa nima? AI'ga "menga batafsil besh bet qilib yozib ber" deyishdan oldin o'ylang. Qisqa, aniq promt yozish — bu bankning pulini tejash degani.

## Slide 8 — Kontekst oynasi 1M tokenli

Endi Context Window — xotira — ni solishtiramiz. Ekranga qarang. Eng o'ngdagi mitti ustun — bu sizning to'rt-besh sahifalik odatiy bank shartnomangiz. Atigi besh ming token. Ko'rib turibsiz, uni har qanday platforma bemalol yutib yuboradi. Lekin agar siz yil yakunlari bo'yicha yirik hisobotni yoki AML bo'yicha regulyatorning katta talabnomasini yuklamoqchi bo'lsangiz nima qilamiz?

Yaxshi xabar shu: 2026-yil holatida uchchala frontier model — GPT-5.5, Claude Opus 4.7 va Gemini 3 Pro — endi 1 million tokenli kontekstga ega. Ya'ni 750 sahifalik materialni bir marta tashlab, "shu yerdan menga kerakli qoidani topib ber" deyishingiz mumkin. Bu inqilob. Bir necha oy oldin Claude faqat 200 ming bilan ishlardi, ChatGPT 128 ming bilan. Endi farq yo'q. Demo amaliyotini Gemini'da quramiz — Workspace integratsiyasi va multimodal qulay. Eslatma: arzonroq Mini va Flash variantlari hali 256-400 ming oralig'ida — lekin asosiy frontier modellarda kontekst muammosi yopilgan. Savol endi "qaysi modelni tanlash" emas — "qaysi vazifaga qaysi modelni mos qilib tanlash". Bu juda muhim o'zgarish, IT bilan muzokarada uni esda saqlang.

## Slide 9 — ChatGPT: eng katta ekosistema

Birinchisi — hammamizning eski tanishimiz ChatGPT. Uning eng zo'r joyi — ekotsizmasining kattaligi. Siz Excel faylni shunday tashlaysiz, u ichidagi 2000 qatorni o'zi tahlil qilib, darhol grafik chizib beradi. Yoki Custom GPT qilib, o'z bo'limingiz uchun kichkina yordamchi bot yasab olishingiz mumkin. Qachon ishlatamiz? G'oya kerak bo'lganda. Brainstorm qilish, oddiy xat qoralash, umuman kreativ ishlar uchun birinchi raqamli tanlov. Lekin ehtiyot bo'ling: o'zbek tilida ba'zan Google Translate hidi kelib qoladi. Va xavfsizlik tomondan — agar tekin versiyaga mijoz ma'lumotini yozsangiz, o'zini o'qitishga ishlatib yuborishi mumkin. Bu — qat'iy qoida.

## Slide 10 — Claude: uzun matn ustasi

Ikkinchisi — Claude. Shaxsan men yuridik va muvofiqlik hujjatlari uchun faqat shundan foydalanaman. Nega? Chunki u xato qilishdan qo'rqadi. Agar bilmasa, "men buni topolmadim" deydi. Eng muhimi — u iqtibos beradi. "Buni qayerdan olding?" desangiz, "Shartnomaning 4-bo'lim 3.2-paragrafidan" deb ko'rsatib beradi. Bu bankir uchun juda muhim — auditga chidamli javob. Qachon ishlatamiz? IFRS hujjatlari tahlili, sindikat shartnomalari, umuman aniqlik tezlikdan muhim bo'lgan har qanday joyda. Cheklovi nimada? Internetga ulanmagan. "Bugungi dollar kursi qancha?" desangiz, bilmaydi. Real-vaqt ma'lumoti yo'q — buning uchun Perplexity yoki ChatGPT internet search'i kerak.

## Slide 11 — Gemini: kurs amaliyoti uchun

Uchinchisi — Gemini. Bugungi va ertangi labda biz aynan shundan foydalanamiz. Sabablari oddiy: Workspace integratsiyasi, uzun kontekst va multimodal demo uchun qulay. Lekin men aniq ta'kidlab aytaman — *bu Markaziy Bank uchun yakuniy tanlov degani emas*. Bank tanlovi xavfsizlik, data residency, audit log, narx, integratsiya va aniq use-case bo'yicha alohida baholanadi. Texnik tomondan: birinchi, 1 million tokenli gigant xotira — yirik hisobotni butunligicha berish mumkin. Ikkinchi, multimodal — bitta promtga PDF, Excel va skaner qilingan hujjatni birga tashlasangiz, hammasini birga o'qiydi. Uchinchi, Workspace integratsiyasi — Drive, Gmail, Sheets bilan tug'ishgan. Yana bir bor eslataman: bizning labda Gemini ishlatilishi sizning IT-xaridingiz uchun avtomatik tavsiya emas. Tanlovdan oldin har bir bo'limning use-case'i alohida ko'riladi.

## Slide 12 — Use-case xavfi bilan tanlash

Endi muhim qismga keldik. Bo'lim AI tanlovi — bu IT-xarid emas, bu governance qarori. Mana sizga ertaga ishlatish uchun ramka.

Chap ustun — texnik HA. Birinchi savol: korporativ shartnoma bormi? Zero-Training kafolati, audit log, o'chirish huquqi yozma berilganmi? Ikkinchi: ma'lumot qaysi mintaqada saqlanadi? Bank regulyatori qaroriga mosmi? Uchinchi: kontekst oynasi sizning eng katta hujjatingizni ko'taradimi? To'rtinchi: o'zbek va rus tili sifati bo'limingiz uchun yetarlimi? Beshinchi: narx — pilot va production uchun byudjetga sig'adimi?

O'ng ustun — qattiq YO'Q. Antipattern. Birinchi: "Hamma ChatGPT ishlatyapti, biz ham olamiz" — bu emas. Brendga emas, use-case'ga qarang. Ikkinchi: tekin versiyaga PII, ya'ni mijoz nomi yoki hisob raqami yuborish — mutlaqo taqiqlangan. Uchinchi: bo'lim use-case'isiz "biz AI ishlatamiz" deb litsenziya olish — pulni yelga sovurish. To'rtinchi: audit izi va o'chirish huquqi bo'lmagan kanaldan ishlash. Beshinchi: vendor demosida ko'rilgan natijani production deb hisoblash — vendor demo har doim ideal sharoit.

Pastdagi misol qatoriga e'tibor bering. Muvofiqlik FAQ ichki saytda — PII yo'q, bo'lim rahbari ruxsati, Enterprise kanal, yurist nashrdan oldin tasdiqlaydi, har savol-javob audit logiga tushadi. Sizning bo'limingiz ertaga aynan shu jadvalda uch-besh use-case yozadi — bu pilot uchun seleksiya ramkasi.

## Slide 13 — Narx 3 ta darajada

Endi moliya haqida gaplashamiz. Narx uchta qavatda. Birinchi qavat — Free, ya'ni nol dollar. Bu faqat siz uyda retsept qidirishingiz uchun. Bank ishi uchun qat'iyan man etiladi, chunki ma'lumotlar o'qitish bazasiga ketib qolishi ehtimoli yuqori. Ikkinchi qavat — Plus yoki Pro. Oyiga 20 dollar atrofida. Bu bitta xodimning shaxsiy yordamchisi. Agar siz PII bo'lmagan matnlar bilan ishlasangiz, masalan marketing g'oyalari ustida, yaxshi tanlov. Uchinchi qavat — Enterprise yoki API. Korporativ daraja. Narxini bank IT va xaridlar bo'limi kelishadi. Faqat shu darajada Zero-Training kafolati bor — ya'ni ma'lumotingiz faqat sizniki bo'lib qoladi. Production uchun yagona to'g'ri yo'l shu.

## Slide 14 — Brauzer vs API avtomat

Yana bir muhim farq bor. Endi men sizdan so'rayman: shu zalda kim oxirgi hafta davomida ChatGPT'dan qandaydir matnni nusxalab, Word'ga tashlagan? Qo'l ko'taring. Ko'pchilik. Bu brauzerda ishlash deyiladi. Bir martalik ish. Yaxshi, lekin bu haqiqiy tezlashish emas. Bu shunchaki aqlli stajyor yollash. Haqiqiy ish qachon boshlanadi? Qachonki siz API ishlatsangiz. Tasavvur qiling: mijoz Telegram'dan ariza tashladi — API orqali bu avtomat Gemini'ga bordi — Gemini bazadan javobni topib, mijozga qaytardi va CRM'ga yozib qo'ydi. Hammasi sizning ishtirokingizsiz, soniya ichida. Buning uchun dasturchi bo'lish kerakmi? Yo'q. Ertaga 8-modulda biz buni kod yozmasdan, n8n degan dastur orqali qanday yasashni ko'ramiz.

## Slide 15 — Modern xususiyatlar: Rules, Skills, MCP

Brauzerda chat — bu 2024-yilning klassikasi. 2026-yil uchun siz uchta yangi atama bilan tanish bo'lishingiz kerak. Birinchi — Rules. Platforma sizning bo'lim qoidasini esda tutadi. Masalan, "har javobda PII bo'lmasin, har shartnomada IFRS 9 chegarasini eslat". Bir marta yozasiz, har gal qoidaga rioya qiladi. Ikkinchi — Skills. Bir marta yozilgan vazifa kuyilib qoladi. Aytaylik, "kredit memosini formatla" deganingizda, har gal aynan bir xil shaklda chiqaradi. Uchinchi — MCP, ya'ni Model Context Protocol. Bu eng yangisi. Platforma bank tizimingiz bilan standart eshik orqali gaplashadi. Sanoatda hozir standartlashtirilmoqda. Va to'rtinchi atama — Agent — bu harakatlanuvchi qolip — alohida, 10-modulda ko'ramiz. Lekin bu yerda ham ehtiyot. Bankda Rules, Skills, MCP — bularning hammasi enterprise shartnoma, ruxsat chegarasi va audit log bilan keladi. Aks holda yopiq kontur tamoyili buziladi.

## Slide 16 — Xavfsizlik 3 ta nazorat

Xavfsizlik nafaqat "AI training'ga ketadimi?" degan bitta savol — bu uchta nazoratning birga ishlashi.

Birinchi nazorat: ma'lumotni minimallashtirish. Eng yaxshi xavfsizlik — bu ma'lumotni umuman yubormaslik. Promt yozishdan oldin so'rang: bu so'rovga PII kerakmi? Ko'pincha yo'q. "Mijoz Aliyev" o'rniga "Bir mijoz" deb yozing. Ma'lumot qaerda saqlanadi, qancha saqlanadi, kim ko'radi — javoblar Enterprise shartnomada yozilgan bo'lishi shart.

Ikkinchi nazorat: ruxsat va audit. Kim ishlatishi mumkin? SAML SSO bilan rolega kirish bormi? Har savol-javob log'ga tushadimi? "O'chirish" tugmasi haqiqatda ishlaydimi? Incident bo'lsa, kim javobgar — bu IT, muvofiqlik va yurist bilan oldindan kelishiladi.

Uchinchi nazorat: inson tasdig'i. AI javobi tashqariga, mijozga yoki regulyatorga ketishidan oldin yurist yoki muvofiqlik tekshirishi shart. "AI shunday dedi" — bu chernovoy, javob emas. Bu mavzuni 3-modulda chuqur ko'rib o'tgan edik — qoida oddiy: ishonch hosil qilmaguningizcha, AI'ga mijoz ma'lumotini bermang. Va default sozlama "xavfsiz" degani emas — har vendor shartnomasi har xarid jarayonida qayta tekshiriladi.

## Slide 17 — Eng ko'p uchraydigan 3 xato

Tajribamdan kelib chiqib aytaman, banklarda eng ko'p qilinadigan uchta xato bor. Birinchi xato: bitta modelga yopishib olish. "Men faqat ChatGPT ishlataman" deyish noto'g'ri. Brainstorm bo'lsa ChatGPT, uzun shartnoma bo'lsa Claude, jadvallar bo'lsa Gemini. Ikkinchi xato: "Tekin versiyasi yetadi-ku". Yo'q, yetmaydi. Tekin pishloq qayerda bo'lishini bilasiz — sichqonbo'g'ichda. Bank uchun tekin AI — bu ochiq xavf. Uchinchi xato: "Kecha yangi model chiqibdi, darhol shunga o'tamiz". Yangisi har doim ham ishingiz uchun yaxshisi bo'lmaydi. Balki u o'zbekchani yomonroq tushunar? Avval o'z bo'limingizning beshta odatiy vazifasini berib sinab ko'ring.

## Slide 18 — Stol mashqi

Bo'ldi, men gapirmayman. Endi siz ishlaysiz. Uchta stolga bo'linamiz. Har stolda bitta case kartochkasi bor — kredit, muvofiqlik yoki operatsion murojaat. Hammasi PII'siz, oldindan tayyorlangan.

Noutbukingizda ikkita tab oching: ChatGPT va Claude — yoki istaganlar Gemini. Kartochkadagi promt'ni aynan bir xil ikkala platformaga ham yuboring. To'rt daqiqa vaqtingiz bor. Keyin javoblarni besh mezonli rubric bo'yicha bir-besh ball bering.

Mezonlar bor: birinchi — dalilga tayanish, javob hujjatdagi aniq jumlaga bog'langanmi? Ikkinchi — taxmin qilmaslik, bilmasa "hujjatda yo'q" deydimi yoki to'qiydimi? Uchinchi — bank tili, terminologiya to'g'ri, ohang professional, mijozga jo'natishga yaqinmi? To'rtinchi — amaliy keyingi qadam, "shu qiling, keyin shu qiling" deb aniq harakat beradimi? Beshinchi — xavfsiz ma'lumot ishlatish, javob PII'siz qoldimi, qo'shimcha PII so'ramaydimi?

"Kim chiroyli gapirdi" emas — *dalilga tayandimi, taxmin qildimi, bank tilida gapirdimi, aniq qadam berdimi, xavfsizmi*. Bu farqi muhim. Har stoldan bitta vakil 30 soniyada javob beradi: ikki platformani besh mezon bo'yicha qanday baholagansiz va nima uchun.

Va yana bir bor eslataman: savolga PII qo'shmang. "Mijoz Aliyev" emas, "Bir mijoz" deb yozing. Real ma'lumot kiritmang. Vaqt ketdi!

## Slide 19 — 3 ta asosiy xulosa

Ajoyib natijalar. Stollardagi rubric ko'rsatdi: javoblar har xil, "g'olib platforma" yo'q — g'olib *baholash mezoni* bor. Bu — bugungi modulning eng muhim xulosasi.

Bugungi modulni uchta gap bilan yopamiz.

Birinchi: platforma — bu brend tanlash emas. Use-case xavfi mezon: ma'lumot sezgirligi, hujjat hajmi, aniqlik talabi, audit izi, narx, integratsiya. Bizning labda Gemini ishlatildi — lekin bu sizning bo'limingiz uchun yakuniy tavsiya emas. Aynan use-case bo'yicha alohida baholanadi.

Ikkinchi: IT bilan gaplashganda o'ziga ishongan ovoz bilan gaplashing. Siz endi Token va Context Window'ni bilasiz. Narx va sig'imni mezonlay olasiz. Bu — sizning yangi tilingiz.

Uchinchi: bugun biz brauzerda o'ynadik. Ertaga 8-modulda — n8n plus API bilan birinchi avtomat ish quramiz. Stajyor o'rniga robot.

Keling, birgalikda eslaymiz. Ovoz chiqarib javob berasiz. Token nima edi? *(zal bilan birga: So'z bo'lagi — narx hisob birligi!)* Context Window nima edi? *(zal bilan birga: AI bir martada o'qiy oladigan matn miqdori!)*

## Slide 20 — Savol va javob

Zo'r. Ertaga shu atamalar n8n ichida juda asqotadi. Bizda yana besh daqiqa qoldi. Qaysi platformani sotib olish bo'yicha, o'zbek tilining sifati yoki xavfsizlik bo'yicha qanday savollar bor? Bemalol. Odatda mendan "Yandex GPT yoki GigaChat ishlatsak bo'ladimi?" deb so'rashadi — alohida tahlil kerak, regulyator talabi va data residency masalasi. Kimda savol bor? Marhamat.

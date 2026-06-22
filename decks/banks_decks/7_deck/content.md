<!--
  Humanized by .qa/humanize.mjs
  Source: decks\cb_decks\7_deck/content.md (existing) + index.html + 18 screenshots
  Model: gemini-3-pro-preview
  Generated: 2026-05-10T10:48:37.737Z
  Elapsed: 87.4s
  Tokens: in=63005 out=7176
-->
# 7-modul · SI platformalar bilan ishlash

**Module:** 7-modul · Kun 1 · 16:15–17:15 (60 daqiqa)
**Format:** Platforma taqqoslash + jonli demo
**Audience:** Markaziy Bank xodimlari (operatsiyalar, muvofiqlik, boshqaruv)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Atamalar:** **Token** · **Context Window** — slide 5 da kiritiladi; **Rules · Skills · MCP** — slide 14 da kiritiladi (Agent — 10-modul cross-ref); slide 18 da 5 atamalik interaktiv recap.

> **Asosiy g'oya:** Bankir bitta platforma ishqibozi bo'lib qolmasligi kerak. "Eng zo'r AI" yo'q — vazifaga qarab to'g'ri qurolni tanlay oladigan muhandislik qarori bor. Brauzerdagi tekin chatdan korporativ API'gacha bo'lgan farqni tushunish.

---

## Deck outline

| # | Sarlavha | Format | Vaqt | Faza |
|---|---|---|---|---|
| 1 | SI platformalar bilan ishlash | Title | ~1 daq | — |
| 2 | Mavzuning yo'l xaritasi | Agenda | ~2 daq | — |
| 3 | Har vazifaga qaysi AI? | Vote (interaktiv hook) | ~2 daq | 01 Platformalar |
| 4 | Bir savol — uch xil javob | Hook 3-platforma | ~5 daq | 01 Platformalar |
| 5 | Bozorda 5 ta katta o'yinchi bor | Bozor xaritasi | ~3 daq | 01 Platformalar |
| 6 | Ikki so'z — narx va imkoniyat tili | YANGI lug'at | ~4 daq | 02 Atamalar |
| 7 | 1 so'z, 1 sahifa — qancha token? | Token misol | ~3 daq | 02 Atamalar |
| 8 | Kontekst oynasi — kim qancha sig'diradi? | Bar chart | ~3 daq | 02 Atamalar |
| 9 | ChatGPT — eng katta ekosistema | Deep-dive #1 | ~4 daq | 01 Platformalar |
| 10 | Claude — uzun matn ustasi | Deep-dive #2 | ~4 daq | 01 Platformalar |
| 11 | Gemini — bizning kurs tanlovi | Deep-dive #3 | ~4 daq | 01 Platformalar |
| 12 | Bank uchun tanlash mezoni | HA / YO'Q | ~4 daq | 03 Imkoniyat |
| 13 | Narx — 3 ta darajada | Pricing 3-card | ~3 daq | 03 Imkoniyat |
| 14 | Brauzerda yozish vs API orqali avtomat | Compare | ~3 daq | 03 Imkoniyat |
| 15 | Brauzerdan tashqari — yangi to'rt xususiyat | Rules · Skills · MCP + Agent (cross-ref) | ~5 daq | 02 Atamalar (ikkinchi qism) |
| 16 | Xavfsizlik — 3 ta nazorat | Sec 3-card | ~4 daq | 03 Imkoniyat |
| 17 | Eng ko'p uchraydigan 3 xato | Myth/Reality | ~3 daq | 03 Imkoniyat |
| 18 | 3 stol — 1 keys — 2 platforma | Brainstorm | ~6 daq | 04 Mashq |
| 19 | Bugundan qaytib ketadigan 3 xulosa | Closing + 5 atama recap | ~3 daq | 04 Mashq |
| 20 | Sizning savollaringiz | Q&A | ~5 daq | 04 Mashq |

---

## Slide 1 — Title

**Sarlavha:**
SI platformalari bilan ishlash.

**Lead matn:**
ChatGPT, Claude va Gemini — qaysi platforma qachon to'g'ri keladi.

**Vizual elementlar:**
Katta sarlavha, tepada "Kun 1 · 16:15 — 17:15" chipi.

**Speaker notes:**
Xayrli kech. Soat 17:45 bo'ldi, bilaman, ko'pchilik charchadi. Lekin hozir eng qiziq qismiga keldik. 
(pauza)
Bugun kun davomida AI nima, xavfi qanaqa, promt qanday yoziladi — nazariyani yopdik. Endi kapotni ochamiz. Ko'pchiligingiz telefonda ChatGPT ishlatasiz, to'g'rimi? Lekin bank ishi uchun "men ChatGPT'ni yaxshi ko'raman" degan gap o'tmaydi. Bu xuddi "men faqat bolg'a ishlataman, hamma narsani shu bilan uraman" degandek gap. Hozirgi 60 daqiqada siz muhandis ko'zoynagini taqasiz. Qaysi vazifaga qaysi AI tezroq, arzonroq va xavfsizroq ekanini ajratishni o'rganamiz. Boshladik.

---

## Slide 2 — Agenda

**Sarlavha:**
Mavzuning yo'l xaritasi.

**Lead matn:**
To'rtta asosiy bosqich — platformalar, atamalar, imkoniyat farqi va live mashq.

**Vizual elementlar:**
4 ta faza kartochkasi (2x2 grid). Hover qilinganda ko'tariladi.

**Speaker notes:**
Yo'nalishimiz juda aniq. 
Birinchi — bozorda o'zi nima bor? 3 ta katta platformani yuzma-yuz urishtirib ko'ramiz.
Ikkinchi — IT bo'limi bilan qanday tilda gaplashish kerak? Ikkita atama o'rganamiz, shu bilan qaysi AI qancha pul yeyishini tushunasiz.
Uchinchi — Markaziy Bank xodimi sifatida tanlash mezonimiz qanaqa bo'ladi? Xavfsizlik va narx.
Va oxirida — zaldagi stollarda o'tirib, o'zingiz jonli sinov o'tkazasiz.

---

## Slide 3 — Vote · Har vazifaga qaysi AI?

**Chip:**
Mini-so'rovnoma · 30 soniya.

**Sarlavha:**
Har vazifaga: ChatGPT · Claude · Gemini · Perplexity — qaysi?

**Vizual elementlar:**
4 ta vote-card grid (4 ustun). Har biri katta rasm + label + sub-label:
- 01 · Ko'p oqim — 1000+ xatni tasniflash
- 02 · Uzun hujjat — 200 betlik huquqiy tahlil
- 03 · Ijodiy ish — Slogan, brending, matn
- 04 · Jonli qidiruv — Bugungi yangiliklar, web

**Maqsad:**
Hook'dan oldin auditoriyani "kim qachon nima ishlatadi" degan savol bilan jalb qilish. Har bir card real ish-vazifani aks ettiradi. Auditoriyaning kayfiyati o'lchanadi — keyingi slaydlar shu mantiq ustida quriladi.

**Speaker notes:**
30 soniyalik tezkor savol. Slaydni ko'rsataman va so'rayman: "Ko'p oqim — 1000 ta xatni tasniflash kerak bo'lsa, qaysi modelni tanlaysiz? Uzun huquqiy hujjat tahlilini-chi? Ijodiy yozuvga? Bugungi yangilikni qidirishga?". Qo'l ko'tarishini kutmang — bu rasmiy ovoz emas, bu "miyani uyg'otish" mashqi. Javoblar har xil bo'ladi — aniqlovchi javob yo'q. Shu noaniqlikning o'zi keyingi 17 slaydning poydevori: "qaysi vazifaga qaysi mos" degan ramka.

---

## Slide 4 — Hook · Bir savol, uch xil javob

**Sarlavha:**
Bir savol — uch xil javob.

**Lead matn:**
Bir xil PII'siz hujjat parchasi, bir xil promt — uch xil javob. G'olibi yo'q; har biri boshqacha kuchli.

**Vizual elementlar:**
Uchta ustun (ChatGPT, Claude, Gemini). Har birida qisqa iqtibos va pastida bir qatorli "verdict + ehtiyot" yorlig'i.

**Demo promt (ekranda iqtibos sifatida):**
> "Quyidagi PII'siz kredit siyosati parchasini o'qing. (1) mijozga ta'sir qiladigan 3 riskni toping; (2) har risk uchun hujjatdagi jumlani ko'rsating; (3) muvofiqlik xodimi tekshirishi kerak bo'lgan savolni yozing. Taxmin qilmang; dalil bo'lmasa 'hujjatda yo'q' deb yozing."

**Verdict yorliqlari (har ustun pastida):**
- ChatGPT — *Tez va tushunarli xulosa, lekin har bir gapdan dalil so'rang.*
- Claude — *Bandga tayanish kuchli, lekin natijani inson tekshirishi shart.*
- Gemini — *Workspace integratsiyada qulay, lekin ruxsat va audit avval hal qilinadi.*

**Speaker notes:**
(ekranga ishora qiling)
Demo: bizda umumiy, PII'siz kredit siyosati parchasi. 3 ta AI'ga aynan bir xil promt yubordik — qarang, javoblar qanday turlicha bo'ldi.
ChatGPT'dan: "Foiz, valyuta va mijoz to'lov qobiliyati riski bor". To'g'ri, lekin umumiy. Universitet referati darajasida — "qaysi banddan oldingiz?" degan savolga aniq javob bermaydi.
Claude: "Risk 1 — 3.2-banddagi USD/UZS bog'lanishi. Risk 2 — 75% garov IFRS 9 ga yetmaydi". Aniq band, aniq sitata. Muvofiqlik uchun qulay, lekin baribir inson tekshirishi shart.
Gemini: "Topdim va Drive'dagi 4-hujjat bilan solishtirdim". Workspace integratsiyasi qulay — lekin bu integratsiya bo'lim ruxsati va audit izi kelishilgandan keyingina yoqilishi kerak.
Xo'sh, qaysi biri zo'r? (zalga qarang)
Javob: hech qaysi. "Qaysi biri zo'r?" degan savolning o'zi xato. To'g'ri savol — *"Mening aniq vazifamga qaysi biri mos? Ma'lumot turi nima, dalil kerakmi, audit izi qayerda?"*.

---

## Slide 5 — Bozor xaritasi

**Sarlavha:**
Bozorda 5 ta katta o'yinchi bor.

**Lead matn:**
Mediada 100 ta nom bor — amalda esa o'nga yaqin. Bank ishi uchun beshini bilish kifoya.

**Vizual elementlar:**
5 ta kartochka (2 tasi tepada, 3 tasi pastda). Har birida model nomi, asosiy xususiyati va oylik narxi ko'rsatilgan.

**Speaker notes:**
Har kuni yangiliklarda ko'ramiz: falon kompaniya yangi AI chiqardi. Lekin jiddiy bank ishi uchun atigi 5 ta o'yinchi bor xolos.
Birinchisi — OpenAI va uning ChatGPT'si. Hammamiz bilamiz.
Ikkinchisi — Anthropic (Claude). Boyagi yuristimiz. Uzun matnlar va muvofiqlik uchun.
Uchinchisi — Google (Gemini). Bizning kursning "miyasi".
Bu uchtasi bizning asosiy qurollarimiz. Lekin yana ikkitasini bilib qo'yish kerak: Perplexity — agar sizga internetdan bugungi yangilik yoki real-vaqt ma'lumot kerak bo'lsa (chunki ChatGPT ko'pincha o'tmishda yashaydi). Va Yandex GPT — agar regulyator "ma'lumot umuman O'zbekiston yoki Rossiyadan chiqmasin" deb qattiq talab qo'ysa.

---

## Slide 6 — Lug'at · Token + Context Window

**Sarlavha:**
Ikki so'z — narx va imkoniyat tili.

**Lead matn:**
Bu ikki atama AI'ni narx va sifat bo'yicha solishtirishda eng ko'p ishlatiladi. Bir marta tushunamiz, keyingi 8 modulda yana eshitasiz.

**Vizual elementlar:**
Ikkita katta lug'at kartochkasi. Chapda "Token", o'ngda "Context Window". Har birida qisqa izoh va misol bor.

**Speaker notes:**
Endi, keling, IT bo'limi bilan bir tilda gaplashishni o'rganamiz. AI'ni tekinga ishlatib bo'lmaydi, uning o'z hisob-kitobi bor.
Birinchi atama: **Token**. Bu AI'ning pul birligi. U matnni so'zma-so'z emas, bo'g'inlab o'qiydi. Shuni token deydi. Masalan, "avtokredit" degan so'z AI uchun 3 ta token bo'lishi mumkin. Siz qancha uzun savol bersangiz — shuncha token sarflanadi va pul shunga qarab to'lanadi.
Ikkinchi atama: **Context Window** (Kontekst oynasi). Bu AI'ning "operativ xotirasi". Siz unga bir marta o'qishga qancha hujjat bera olasiz? Agar oyna kichik bo'lsa, 100 sahifalik hisobotni tiqolmaysiz, bo'lib-bo'lib berishga to'g'ri keladi. 
Shu ikki so'zni eslab qoling: Token — bu siz to'laydigan pul. Context Window — bu sig'im.

---

## Slide 7 — Token vs so'z misoli

**Sarlavha:**
1 so'z, 1 sahifa — qancha token?

**Lead matn:**
Token — bu so'z emas, so'z bo'lagi. Bir misol — keyin hech qachon adashmaysiz.

**Vizual elementlar:**
Taqqoslash bloki (3 bosqich): 1 ta so'z → 1 ta jumla → 1 ta A4 sahifa. Pastda o'zbek tiliga xos izoh.

**Speaker notes:**
Buni o'zimizning amaliyotga o'giramiz.
"Avtokredit" degan bitta so'z — o'rtacha 3 token atrofida aylanadi.
10 ta so'zdan iborat bitta jumla — taxminan 13 token.
Bitta to'liq A4 sahifa (masalan, ariza) — taxminan 650 token.
(pauza)
Aytmoqchi, bu yerda muhim bir nyuans bor. O'zbek tili AI uchun ingliz tiliga qaraganda "qimmatroq". Inglizcha "loan" 1 ta token bo'lsa, bizning "kredit" 2–3 token bo'lib ketadi. Inglizcha matnda o'rtacha 1 ta so'z ≈ 1.3 token; o'zbekcha matnda esa 1 ta so'z ko'pincha 2–3 token. AI asosan ingliz tilida o'qitilgani uchun bizning so'zlarni ko'proq maydalaydi — narx shunga yarasha 30–40% qimmatlashadi.
Xulosa nima? AI'ga "batafsil 5 bet qilib yozib ber" deyishdan oldin o'ylang. Qisqa, aniq promt yozish — bu bankning pulini tejash degani.

---

## Slide 8 — Context Window taqqoslash

**Sarlavha:**
Kontekst oynasi — kim qancha sig'diradi?

**Lead matn:**
4 ta orientir. O'rtacha shartnoma hammasiga sig'adi. Lekin 100 sahifalik regulyator hujjati — boshqa hikoya.

**Vizual elementlar:**
4 ta vertikal ustun (bar chart). GPT-5.5 (1M), Claude Opus 4.7 (1M), Gemini 3 Pro (1M) — uch frontier ham 1M ga teng. O'ng tomonda mitti ustun — o'rtacha shartnoma (5k). Pastida kichik mute izoh: *"Holat: 2026-05. Frontier modellar kontekst muammosini hal qilgan — savol 'qaysi modelni tanlash' emas, 'qaysi vazifaga qaysi mos'. Mini/Flash variantlari hali 256k–400k."*

**Speaker notes:**
Endi Context Window (xotira) ni solishtiramiz.
(ekranga ishora qiling)
Eng o'ngdagi mitti ustunga qarang. Bu sizning 4-5 sahifalik odatiy bank shartnomangiz. Ko'rib turibsiz, uni har qanday platforma bemalol "yutib yuboradi".
Lekin... agar siz yil yakunlari bo'yicha yirik hisobotni yoki AML bo'yicha regulyatorning katta talabnomasini yuklamoqchi bo'lsangiz-chi? 2026-yil holatida uchchala frontier model — GPT-5.5, Claude Opus 4.7 va Gemini 3 Pro — endi 1 million tokenli kontekstga ega. Ya'ni 750 sahifalik materialni bir marta tashlab, "shu yerdan menga kerakli qoidani topib ber" deyishingiz mumkin.
Demo amaliyotini Gemini'da quramiz — Workspace integratsiyasi va multimodal qulay. Mini/Flash variantlari (arzonroq tariflar) hali 256k–400k, lekin asosiy frontier modellar bo'yicha kontekst muammosi yopilgan. Savol "qaysi modelni tanlash" emas — "qaysi vazifaga qaysi modelni mos qilib tanlash".

---

## Slide 9 — ChatGPT chuqurlashish

**Sarlavha:**
ChatGPT — eng katta ekosistema.

**Lead matn:**
Eng tanish va eng keng tarqalgan. Plugin'lar, Custom GPT'lar, kod interpretatori — hammasi shu yerda.

**Vizual elementlar:**
Uchta kartochka: Kuchli tomon, Qachon ishlatamiz, Cheklov.

**Speaker notes:**
Endi uchta gigantni alohida "rentgen" qilamiz. Birinchisi — hammamizning eski tanishimiz ChatGPT.
Uning eng zo'r joyi — bozorining kattaligi. Siz Excel faylni shunday tashlaysiz, u ichidagi 2000 qatorni o'zi tahlil qilib, darhol grafik chizib beradi. Yoki "Custom GPT" qilib, o'z bo'limingiz uchun kichkina yordamchi bot yasab olishingiz mumkin.
Qachon ishlatamiz? Qachonki g'oya kerak bo'lsa. Brainstorm qilish, oddiy xat qoralash, umuman kreativ ishlar uchun birinchi raqamli tanlov.
Lekin ehtiyot bo'ling: o'zbek tilida ba'zan "Google Translate" hidi kelib qoladi. Va xavfsizlik... agar tekin versiyasiga mijoz ma'lumotini yozsangiz, o'zini o'qitishga ishlatib yuborishi mumkin.

---

## Slide 10 — Claude chuqurlashish

**Sarlavha:**
Claude — uzun matn ustasi.

**Lead matn:**
Anthropic'ning Claude — bank ishi uchun eng mosi. Aniq, ehtiyotkor, kamroq "o'ylab topadi".

**Vizual elementlar:**
Uchta kartochka: Kuchli tomon, Qachon ishlatamiz, Cheklov.

**Speaker notes:**
Ikkinchisi — Claude. Shaxsan men yuridik va muvofiqlik hujjatlari uchun faqat shundan foydalanaman.
Nega? Chunki u xato qilishdan qo'rqadi. Agar bilmasa, "men buni topolmadim" deydi. Eng muhimi — u iqtibos beradi. "Buni qayerdan olding?" desangiz, "Shartnomaning 4-bo'lim 3.2-paragrafidan" deb ko'rsatib beradi. Bu bankir uchun juda muhim.
Qachon ishlatamiz? IFRS hujjatlari tahlili, sindikat shartnomalari, umuman aniqlik tezlikdan muhim bo'lgan har qanday joyda.
Cheklovi nimada? Internetga ulanmagan. "Bugungi dollar kursi qancha?" desangiz, bilmaydi. Real-vaqt ma'lumoti yo'q.

---

## Slide 11 — Gemini chuqurlashish

**Sarlavha:**
Gemini — kurs amaliyoti uchun.

**Lead matn:**
Workspace + 1M tokenli oyna + multimodal (matn · rasm · ovoz · video). Bugungi labda demo uchun mos. Sizning bankingiz uchun tanlov — alohida baholanadi.

**Vizual elementlar:**
Uchta kartochka: Kuchli tomon, Qachon ishlatamiz, Cheklov. Tepada "Demo uchun" chipi (vendor bias bo'lmasligi uchun "kurs tanlovi" emas).

**Speaker notes:**
Uchinchisi — Gemini. Bugungi va ertangi labda biz aynan shundan foydalanamiz — sabablari oddiy: Workspace integratsiyasi, uzun kontekst va multimodal demo uchun qulay. Lekin **bu Markaziy Bank uchun yakuniy tanlov degani emas**. Bank tanlovi xavfsizlik, data residency, audit log, narx, integratsiya va aniq use-case bo'yicha alohida baholanadi.
Texnik tomondan: birinchi, 1 million tokenli gigant xotira — yiriq hisobotni butunligicha berish mumkin. Ikkinchi, multimodal — bitta promtga PDF, Excel va skaner qilingan hujjatni birga tashlasangiz, hammasini birga o'qiydi. Uchinchi, Workspace integratsiyasi — Drive, Gmail, Sheets bilan tug'ishgan. RAG arxitekturasi (9-modul mavzusi) uchun demo platformasi sifatida qulay zamin.
Eslatma: bizning labda Gemini ishlatilishi sizning IT-xaridingiz uchun tavsiya emas. Tanlovdan oldin har bir bo'limning use-case'i alohida ko'riladi.

---

## Slide 12 — Bank uchun tanlash mezoni

**Sarlavha:**
Tanlovni use-case xavfi bilan tekshiramiz.

**Lead matn:**
Modelni model kuchi bilan emas — ma'lumot turi, ruxsat, audit izi va inson tasdig'i bilan tanlaymiz. Mana bank governance cheklisti.

**Vizual elementlar:**
Ikkita ustun: chapda Yashil (HA — texnik mezon) · o'ngda Qizil (YO'Q — antipattern). Pastida bitta jonli misol qatori (use-case · ma'lumot turi · ruxsat · platforma · inson tasdig'i · audit izi) — bo'limingiz ertaga shu jadvalni to'ldiradi.

**HA — texnik mezon:**
- Korporativ shartnoma bormi? (Zero-Training, audit log, o'chirish huquqi)
- Ma'lumot qaysi mintaqada saqlanadi? Bank regulyatori qaroriga mosmi?
- Kontekst oynasi sizning eng katta hujjatingizni ko'taradimi?
- O'zbek va rus tili sifati bo'limingiz uchun yetarlimi?
- Narx — pilot va production uchun byudjetga sig'adimi?

**YO'Q — antipattern:**
- "Hamma ChatGPT ishlatyapti, biz ham olamiz"
- Tekin versiyaga PII (mijoz nomi, hisob raqami) yuborish
- Bo'lim use-case'isiz "biz AI ishlatamiz" deb litsenziya olish
- Audit izi va o'chirish huquqi bo'lmagan kanaldan ishlash
- Vendor demosida ko'rilgan natijani production deb hisoblash

**Misol qatori (slide pastida, jadval ko'rinishida):**
| Use-case | Ma'lumot turi | Ruxsat | Platforma kanali | Inson tasdig'i | Audit izi |
|---|---|---|---|---|---|
| Muvofiqlik FAQ ichki saytda | Ichki siyosat, PII yo'q | Bo'lim rahbari | Enterprise / API | Yurist/muvofiqlik nashrdan oldin | Promt + javob + versiya logda |

**Speaker notes:**
Bo'lim AI tanlovi — bu IT-xarid emas, bu governance qarori. Mana sizga ertaga ishlataladigan ramka.
Chap ustun — texnik HA: korporativ shartnoma (Zero-Training kafolati), ma'lumot qayerda saqlanadi, kontekst oynasi sizning hujjatingizga yetadimi, til sifati, narx pilotga sig'adimi.
O'ng ustun — qattiq YO'Q: vendor brendiga emas, use-case'ga qarang. Tekinga PII bermang. Audit izi yo'q kanaldan ishlatmang. Demo'ni production deb olmang.
Pastdagi qatorga e'tibor bering — bu jonli misol. Muvofiqlik FAQ ichki ro'yxat: PII yo'q, bo'lim rahbari ruxsati, Enterprise kanal, yurist nashrdan oldin tasdiqlaydi, har savol-javob audit logiga tushadi. Sizning bo'limingiz ertaga aynan shu jadvalda 3-5 use-case yozadi — bu pilot uchun seleksiya ramkasi.

---

## Slide 13 — Narx va litsenziya

**Sarlavha:**
Narx — 3 ta darajada.

**Lead matn:**
Shaxsiy tajriba vs jamoaviy ish vs to'liq korporativ integratsiya. Har birining narxi va imkoniyati boshqacha.

**Vizual elementlar:**
Uchta narx kartochkasi: Free ($0), Pro/Plus (~$20-30), Enterprise/API (Shartnoma). Pastda mute izoh: *"Holat: 2026-05. Aniq narx tarif, region va shartnoma turiga qarab o'zgaradi. Free / consumer kanali bank ma'lumoti uchun taqiqlangan."*

**Speaker notes:**
Endi moliya haqida gaplashamiz. Uchta qavat bor.
Birinchi qavat — Free ($0). Bu faqat siz uyda retsept qidirishingiz uchun. Bank ishi uchun qat'iyan man etiladi, chunki ma'lumotlar o'qitish bazasiga (training) ketib qolishi ehtimoli yuqori.
Ikkinchi qavat — Plus yoki Pro. Oyiga 20 dollar. Bu bitta xodimning shaxsiy yordamchisi. Agar siz PII bo'lmagan matnlar bilan ishlasangiz, masalan, marketing g'oyalari ustida — yaxshi tanlov.
Uchinchi qavat — Enterprise yoki API. Korporativ daraja. Narxini bank IT va xaridlar bo'limi kelishadi. Faqat mana shu darajada "Zero-Training" kafolati bor. Ya'ni ma'lumotingiz faqat sizniki bo'lib qoladi. Production uchun yagona to'g'ri yo'l shu.

---

## Slide 14 — Web vs API

**Sarlavha:**
Brauzerda yozish vs API orqali avtomat.

**Lead matn:**
Bir xil model — ikki xil ishlatish. Birinchisi — qo'lda. Ikkinchisi — n8n orqali, soatiga 1000 marotaba.

**Vizual elementlar:**
Chap tomonda "Brauzer" (qo'lda ishlash) va o'ng tomonda "API + n8n" (avtomat ishlash) taqqoslangan vizual o'q.

**Speaker notes:**
Yana bir muhim farq bor. 
Shu zalda kim oxirgi hafta davomida ChatGPT'dan qandaydir matnni nusxalab (copy), Word'ga tashlagan (paste)? 
(qo'l ko'tarishlarini kuting)
Bu brauzerda ishlash deyiladi. Bir martalik ish. Yaxshi, lekin bu haqiqiy tezlashish emas, bu shunchaki aqlli stajyor yollash.
Haqiqiy ish qachon boshlanadi? Qachonki siz API ishlatsangiz. Tasavvur qiling: mijoz Telegram'dan ariza tashladi → API orqali bu avtomat Gemini'ga bordi → Gemini bazadan javobni topib, mijozga qaytardi va CRM'ga yozib qo'ydi. Hammasi sizning ishtirokingizsiz, soniya ichida.
Buning uchun dasturchi bo'lish kerakmi? Yo'q. Ertaga 8-modulda biz buni kod yozmasdan, n8n degan dastur orqali qanday yasashni ko'ramiz.

---

## Slide 15 — Modern xususiyatlar · Rules · Skills · MCP

**Chip:**
Bankir uchun AI lug'ati · 7-modul · ikkinchi qism.

**Sarlavha:**
Brauzerdan tashqari — yangi imkoniyatlar.

**Lead matn:**
ChatGPT, Claude, Gemini — faqat chat oynasi emas. Rules, Skills va MCP bo'lim ishini standartlashtiradi; bankda faqat korporativ shartnoma, ruxsat chegarasi va audit log bilan ulanadi. Agent atamasi — alohida 10-modulda.

**Vizual elementlar:**
4 ta blokli grid: Rules + Skills + MCP (dict-card) + Agent (cross-ref card 10-modulga). Pastda mute izoh — bankda enterprise shartnomasi va audit log bilan ulanadi.

**Speaker notes:**
Brauzerda chat — bu 2024-yilning klassikasi. 2026-yil uchun siz uchta yangi atama bilim olib chiqishingiz kerak. Birinchi — Rules: platforma sizning bo'lim qoidasini "es"da tutadi. Masalan, "har javobda PII bo'lmasin, har shartnomada IFRS 9 chegarasini eslat". Ikkinchi — Skills: bir marta yozilgan vazifa kuyilib qoladi. Aytaylik, "kredit memosini formatla" deganda — har gal bir xil shaklda chiqaradi. Uchinchi — MCP (Model Context Protocol): platforma bank tizimingiz bilan standart eshik orqali gaplashadi. Bu yangi, sanoatda standartlashtirilmoqda. Lekin bankda bularning hammasi enterprise shartnoma, ruxsat chegarasi va audit log bilan keladi — aks holda yopiq kontur buziladi. Agent — bunday "harakatlanuvchi qolip" — alohida, 10-modulda ko'ramiz.

---

## Slide 16 — Xavfsizlik mezoni

**Sarlavha:**
Xavfsizlik — 3 ta savol emas, 3 ta nazorat.

**Lead matn:**
Ma'lumotni minimallashtirish · Ruxsat va audit izi · Inson tasdig'i. Har platforma bilan ish boshlashdan oldin uchchovi ham yozma kelishilgan bo'lishi shart.

**Vizual elementlar:**
Uchta nazorat bloki (Qulf, Qalqon, Shartnoma ikonkalari). Pastda mute izoh: *"Default sozlama 'xavfsiz' degani emas. Holat: 2026-05 — vendor sozlamalari va shartnomasi o'zgaradi, har xarid jarayonida qayta tekshiriladi."*

**3 ta nazorat (kartochkalar matni):**
- **🔒 Ma'lumotni minimallashtirish** — bu so'rovga PII (mijoz nomi, hisob raqami, telefon) kerakmi? Yo'q bo'lsa olib tashlanadi. Server qaerda saqlanadi, qancha saqlanadi, kim ko'radi — javoblar shartnomada yozilgan.
- **🛡️ Ruxsat va audit izi** — kim ishlatishi mumkin (SAML SSO, role-based)? Har promt va javob log'ga tushadimi? "O'chirish" tugmasi (right to erasure) ishlaydimi? Incident bo'lsa kim javobgar?
- **📜 Inson tasdig'i** — javob tashqariga (mijozga, regulyatorga) ketishidan oldin yurist/muvofiqlik tekshiradimi? "AI shunday dedi" — bu javob emas, bu chernovoy.

**Speaker notes:**
Xavfsizlik nafaqat "AI training'ga ketadimi?" degan bitta savol — bu uchta nazoratning birga ishlashi.
Birinchi nazorat: **ma'lumotni minimallashtirish**. Eng yaxshi xavfsizlik — bu ma'lumotni umuman yubormaslik. Promt yozishdan oldin so'rang: bu so'rovga PII kerakmi? Ko'pincha yo'q. Ma'lumot qaerda saqlanadi (region), qancha saqlanadi (retention), kim ko'radi — javoblar Enterprise shartnomada yozilgan bo'lishi shart.
Ikkinchi nazorat: **ruxsat va audit**. Kim ishlatishi mumkin? Har savol-javob log'ga tushadimi? Incident bo'lsa, kim javobgar — bu IT, muvofiqlik va yurist bilan oldindan kelishiladi.
Uchinchi nazorat: **inson tasdig'i**. AI javobi tashqariga ketishidan oldin yurist yoki muvofiqlik tekshirishi shart. "AI shunday dedi" — bu chernovoy, javob emas. Bu mavzuni 3-modulda chuqur ko'rib o'tgan edik — qoida oddiy: ishonch hosil qilmaguningizcha, AI'ga mijoz ma'lumotini bermang.

---

## Slide 17 — Eng ko'p uchraydigan 3 xato

**Sarlavha:**
Eng ko'p uchraydigan 3 xato.

**Lead matn:**
(Afsona va haqiqat taqqoslangan uchta qator).

**Vizual elementlar:**
Qizil (Afsona) va ko'k (Haqiqat) yorliqlar bilan qatorlar.

**Speaker notes:**
Tajribamizdan kelib chiqib aytaman, banklarda eng ko'p qilinadigan 3 ta xato bor.
Birinchi xato: "Bitta modelga yopishib olish". "Men faqat ChatGPT ishlataman" deyish noto'g'ri. Brainstorm bo'lsa ChatGPT, uzun shartnoma bo'lsa Claude, jadvallar bo'lsa Gemini.
Ikkinchi xato: "Tekin versiyasi yetadi-ku". Yo'q, yetmaydi. Tekin pishloq qayerda bo'lishini bilasiz. Bank uchun tekin AI — bu ochiq xavf.
Uchinchi xato: "Kecha yangi model chiqibdi, darhol shunga o'tamiz". Yangisi har doim ham ishingiz uchun yaxshisi bo'lmaydi. Balki u o'zbekchani yomonroq tushunar? Avval o'z bo'limingizning 5 ta odatiy vazifasini berib sinab ko'ring.

---

## Slide 18 — Live mashq · Stol bo'yicha

**Sarlavha:**
3 stol — 1 case — 2 platforma — 5 mezonli rubric.

**Lead matn:**
G'olib platforma emas, g'olib javob mezoni muhim. Bankda "chiroyli javob" emas — tekshiriladigan, auditga chidamli javob ishlatiladi.

**Vizual elementlar:**
3 ta qadam kartochkasi (case olish · ikki platformaga yuborish · 5 mezonli baho). Pastda 5 mezonli scoring rubric (1–5 ball).

**Case kartochkalari (oldindan tarqatiladi, PII'siz):**
- **01 — Kredit:** "Avtokredit arizasida yetishmayotgan hujjatlar ro'yxati va mijozga yuboriladigan xat"
- **02 — Muvofiqlik FAQ:** "Filial xodimi uchun anti-fraud signal turlari va qaysi holatda eskalatsiya qilish kerakligi"
- **03 — Operatsion murojaat:** "Online bank ilovasiga kira olmayotgan mijozga 1-darajali javob va keyingi qadam"

**5 mezonli rubric (har platformaga 1–5 ball):**
1. **Dalilga tayanish** — javob hujjatdagi aniq jumlaga bog'langanmi?
2. **Taxmin qilmaslik** — bilmasa "hujjatda yo'q" deydimi yoki to'qiydimi?
3. **Bank tili** — terminologiya to'g'ri, ohang professional, mijozga jo'natishga yaqinmi?
4. **Amaliy keyingi qadam** — "shu qiling, keyin shu qiling" deb aniq harakat beradimi?
5. **Xavfsiz ma'lumot ishlatish** — javob PII'siz qoldimi, qo'shimcha PII so'ramaydimi?

**Speaker notes:**
Bo'ldi, men gapirmayman. Endi siz ishlaysiz.
3 stolga bo'linamiz. Har stolda bitta case kartochkasi bor — kredit, muvofiqlik yoki operatsion murojaat. Hammasi PII'siz, oldindan tayyorlangan.
(zalga ko'rsatma bering)
Noutbukingizda ikkita tab oching: ChatGPT va Claude (yoki Gemini). Kartochkadagi promt'ni AYNAN bir xil ikkala platformaga ham yuboring. 4 daqiqa vaqtingiz bor.
Keyin javoblarni 5 mezonli rubric bo'yicha 1–5 ball bering. "Kim chiroyli gapirdi" emas — *dalilga tayandimi, taxmin qildimi, bank tilida gapirdimi, aniq qadam berdimi, xavfsizmi*.
Har stoldan bitta vakil 30 soniyada javob beradi: ikki platformani 5 mezon bo'yicha qanday baholagansiz va NIMA UCHUN.
Va yana bir bor eslataman: savolga PII qo'shmang! "Mijoz Aliyev" emas, "Bir mijoz" deb yozing. Real ma'lumot kiritmang. Vaqt ketdi!
(4 daqiqa kuting, stollar orasida yurib, mezon bo'yicha javob berishni eslating, so'ngra xulosalarni tinglang)

---

## Slide 19 — Closing + recap

**Sarlavha:**
Bugundan qaytib ketadigan 3 xulosa.

**Lead matn:**
Platforma — brend tanlash emas · Use-case xavfi bo'yicha tanlanadi · Ertaga: n8n + API.

**Vizual elementlar:**
3 ta xulosa qatori. Pastda lug'at recap bloki (Token + Context Window).

**3 ta xulosa (kartochkalar matni):**
- 💡 **Platforma — brend tanlash emas.** Har use-case uchun mezon: ma'lumot sezgirligi, hujjat hajmi, aniqlik talabi, audit izi, narx, integratsiya. Brendga emas — vazifaga qarab.
- 💡 **Token va Context Window — endi sizning tilingiz.** IT-xarid va vendor bilan gaplashganda narx va sig'imni mezonlab so'rashga tayyorsiz.
- 💡 **Bugun brauzerda — ertaga avtomatda.** 8-modul: n8n + API bilan birinchi avtomat ish. Brauzerdan production'ga.

**Speaker notes:**
Ajoyib natijalar. Stollardagi rubric ko'rsatdi: javoblar har xil, "g'olib platforma" yo'q — g'olib *baholash mezoni* bor.
Bugungi modulni 3 ta gap bilan yopamiz:
1. Platforma — bu brend tanlash emas. Use-case xavfi mezon: ma'lumot sezgirligi, hujjat hajmi, aniqlik talabi, audit izi, narx, integratsiya. Bizning labda Gemini ishlatildi — bu sizning bo'limingiz uchun yakuniy tavsiya emas, aynan use-case bo'yicha alohida baholanadi.
2. IT bilan gaplashganda o'ziga ishongan ovoz bilan gaplashing — siz endi Token va Context Window'ni bilasiz, narx va sig'imni mezonlay olasiz.
3. Bugun biz brauzerda o'ynadik. Ertaga 8-modulda — n8n + API bilan birinchi avtomat ish. Stajyor o'rniga robot.

Keling, birgalikda eslaymiz. Ovoz chiqarib javob berasiz.
Token nima edi?
(zal bilan birga: "So'z bo'lagi — narx hisob birligi!")
Context Window nima edi?
(zal bilan birga: "AI bir martada o'qiy oladigan matn miqdori!")
Zo'r. Ertaga shu atamalar n8n ichida juda asqotadi.

---

## Slide 20 — Q&A

**Sarlavha:**
Sizning savollaringiz.

**Lead matn:**

**Vizual elementlar:**
Katta ko'k so'roq belgisi. Pastda speaker elektron pochtasi.

**Speaker notes:**
Bizda yana 5 daqiqa qoldi. 
Qaysi platformani sotib olish bo'yicha, o'zbek tilining sifati yoki xavfsizlik bo'yicha qanday savollar bor? Bemalol.
(Zaldan savollar kuting. Agar sukut bo'lsa, o'zingiz boshlang: "Odatda mendan Yandex GPT ishlatsak bo'ladimi deb so'rashadi...")
Kimda savol bor? Marhamat.
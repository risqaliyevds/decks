<!--
  Humanized by .qa/humanize.mjs
  Source: decks\cb_decks\6_deck/content.md (existing) + index.html + 14 screenshots
  Model: gemini-3-pro-preview
  Generated: 2026-05-10T10:47:57.724Z
  Elapsed: 80.4s
  Tokens: in=53559 out=6971
-->
# 6-modul · Bank uchun tayyor promt kutubxonasi

**Module:** 6-modul · Kun 1 · 15:15–16:15 (60 daqiqa)
**Format:** Tayyor kutubxona walkthrough — namoyish + amaliy moslash
**Audience:** Markaziy Bank xodimlari (non-technical: operations, compliance, management)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Gemini + n8n + tashkiliy promt kutubxonasi (Notion / Confluence)
**Slaydlar soni:** 14 ta · 4 ta faza
**Atamalar:** **System Prompt**, **Template Prompt** — slayd 5 da kiritiladi, slayd 13 da recap

> **Asosiy g'oya:** 5-modulda biz promt yozish mexanikasini ko'rdik. Lekin to'g'risini aytaylik — bankir har kuni ertalab kelib noldan zo'r promt o'ylab topishga vaqti yo'q. Bu modulning maqsadi bitta: sizga tayyor, Markaziy Bank standartlariga javob beradigan 50+ shablonli "ish quroli"ni topshirish. "Qanday yozishni" o'rgandik, endi "qayerdan tayyorini olishni" ko'ramiz. Ertaga ertalab ishga kelasiz va birinchi hujjatni shu yerdan olasiz.

---

## Deck outline

| # | Sarlavha | Format / urg'u | Vaqt | Faza |
|---|---|---|---|---|
| 1 | Bank uchun tayyor promt kutubxonasi | Title | ~1.5 daq | — |
| 2 | Mavzuning yo'l xaritasi | Agenda — 4 faza | ~1.5 daq | — |
| 3 | Ish haqi promti — qaysi yo'lni tanlaysiz? | Vote-hook — `.s-vote` · 3 karta | ~1 daq | 01 Kutubxona |
| 4 | Noldan yozma — kutubxonadan ol | Hook — Live demo | ~5 daq | 01 Kutubxona |
| 4 | Ikki xil promt — ikki xil ish | Compare: System vs Template | ~3 daq | 01 Kutubxona |
| 5 | Ikki atama — kutubxonaning poydevori | System Prompt · Template Prompt | ~4 daq | 01 Kutubxona |
| 6 | Kutubxona — 5 ta yo'nalish, 50+ shablon | Library overview · 5-grid | ~5 daq | 02 Kategoriyalar |
| 7 | 1 betlik kredit memo tuzish | Shablon #KR-04 | ~6 daq | 02 Kategoriyalar |
| 8 | Shikoyatga rasmiy javob tayyorlash | Shablon #MX-07 | ~6 daq | 02 Kategoriyalar |
| 9 | Tijorat banki hisobotini tahlil qilish | Shablon #KP-02 | ~5 daq | 02 Kategoriyalar |
| 10 | Shablonni o'z bo'limingizga — 4 qadamda moslang | Sozlash · 4 qadam | ~5 daq | 03 Sozlash |
| 11 | Birgalikda qayta yozamiz — Kredit memo → Tijorat bankiga normativni tushuntirish | Live workshop | ~9 daq | 03 Sozlash |
| 12 | Yuborishdan oldin — sifat tekshiruvi | Cando · 5+5 belgi | ~3 daq | 04 Sifat tekshiruvi |
| 13 | Bugundan qaytib ketadigan 3 xulosa | Closing | ~2 daq | 04 Sifat tekshiruvi |
| 14 | Sizning savollaringiz | Q&A | ~5 daq | 04 Sifat tekshiruvi |

---

## Slide 1 — Title

**Sarlavha:**
Bank uchun **tayyor promt** kutubxonasi.

**Lead matn:**
Noldan yozma — kutubxonadan ol. Ertangi ish kunidanoq ishlatiladigan promtlar to'plami.

**Vizual elementlar:**
To'q ko'k fon, gridli yuza. "tayyor promt" yozuvi yorqin ko'k fonda ajratilgan. Yuqorida vazirlik logotiplari.

**Speaker notes:**
Xo'sh, kunning oxirgi, lekin eng amaliy qismiga keldik. 

Oldingi modulda biz promt qanday ishlashini "ichidan" ko'rdik. Lekin keling, rosti — ertaga ertalab soat 9:00 da oldingizga 47 sahifalik muvofiqlik hisoboti tushganda, o'tirib olib "men qanday qilib ideal promt yozsam ekan" demaysiz. Bunga vaqtingiz ham, xohishingiz ham yo'q. 

Sizga tayyor asbob kerak. 

Shu sababli, biz Markaziy Bank va tijorat banklari ehtiyojlariga moslangan 50 dan ortiq tayyor shablonlar kutubxonasini yig'dik. Bu darslik emas — bu ertaga ish kuni boshlanganida ishlatishingiz uchun tayyor yo'riqnomalar to'plami. Bugungi moduldan bitta asosiy qoida bilan chiqib ketamiz: "Noldan yozma — kutubxonadan ol."

---

## Slide 2 — Agenda

**Sarlavha:**
Mavzuning **yo'l xaritasi**.

**Lead matn:**
Agenda

**Vizual elementlar:**
4 ta faza (2×2 grid, klik qilsa bo'ladigan kartalar):
01 Kutubxona, 02 Kategoriyalar, 03 Sozlash, 04 Sifat tekshiruvi.

**Speaker notes:**
Oldimizda roppa-rosa 60 daqiqa bor. Qanday ishlatamiz?

Avvaliga, nega "bo'sh varaqqa qarab o'tirish" odatini unutishimiz kerakligini ko'ramiz. Ikki muhim AI atamasini shu yerda yechib olamiz.

Keyin — asosiy qism. 5 ta yo'nalish bo'yicha shablonlar "tokchasi"ni ochamiz. Kredit, Muvofiqlik, Mijozlarga xizmat ko'rsatish — ichiga kirib, 3 ta haqiqiy promtni o'qiymiz.

Uchinchi blokda qo'llarni shimarib, bitta shablonni sizning bo'limingiz uchun birgalikda, jonli efirda qayta yozib chiqamiz. Bu eng qiziq joyi bo'ladi.

Oxirida esa — xavfsizlik. AI yozgan narsani ko'r-ko'rona imzolab yubormaslik uchun 30 soniyalik tekshiruv qoidasini o'rganamiz. Qani, ketdik.

---

## Slide 3 — Vote-hook · Ish haqi promti — qaysi yo'lni tanlaysiz?

**Format:** 30 soniyalik mini-so'rovnoma. 3 ta vote-card (`.vote-grid--3`): "01 · O'zim yozaman" (har safar noldan), "02 · Kutubxonadan" (sinalgan promt, edge case'lar tutilgan), "03 · Default ilova" (ChatGPT'ga ko'taraman). Spiker zaldan ovoz oladi — kutubxona varianti (02) bugungi modulning markaziy taklifi.

---

## Slide 4 — Hook (Live template demo)

**Sarlavha:**
Noldan yozma — **kutubxonadan** ol.

**Lead matn:**
Kutubxonada 50+ tayyor shablon. Nusxa ol, 3 ta maydonni to'ldir, yubor. Mijozga javob — 1 daqiqada, sifat — bosh boshqaruvchi imzolagan darajada.

**Vizual elementlar:**
Chap tomonda katta QR kod. O'ng tomonda misol: "Mijoz F.I.Sh.: Karimov Sherzod...". Pastda: "→ Bo'sh varaq emas — to'ldiriladigan blanka".

**Speaker notes:**
*(Zalga qarab savol bering)* Zalda kim oxirgi marta qo'mitaga yozma memo yoki rahbariyatga xizmat xati tayyorladi? Qo'llarni ko'ray... 

*(Pauza)* Yaxshi. O'sha memoni noldan boshlab o'ylash, formatlash, qoidalarni eslash uchun qancha vaqt ketadi? O'rtacha 30-40 daqiqa, to'g'rimi? 

*(Ekranga ishora qiling)* Ekranda QR kod turibdi. Telefonlaringizni oling-da, skaner qiling. Bu sizning yangi kutubxonangiz. U yerda "bo'sh varaq" yo'q. 

Qarang, men hozir bitta memoni jonli yozaman. *(Demo botni oching, matnni kiriting)*. Men faqat 3 ta narsani kiritdim: Ism, Summa, Maqsad. Qolganini — ohangni, formatni, qaysi banddan keyin qaysi kelishini shablon o'zi biladi. 

Natija? 40 daqiqa emas, 90 soniya. Sifat qanday? Xuddi shu ishni 10 yildan beri qilayotgan tajribali bankir yozgandek. Bu sehr emas — bu standartizatsiya.

**Tayyorgarlik:**
- QR kod kutubxona sahifasiga (Notion/Confluence) yo'naltirilgan bo'lishi shart.
- Demo bot ochiq va tayyor turishi kerak.

---

## Slide 4 — Compare: System vs Template

**Sarlavha:**
Ikki xil promt —
**ikki xil ish** qiladi.

**Lead matn:**
System Prompt — botning xarakteri va qoidalari. Template Prompt — har safar to'ldiriladigan blanka. Birga ishlaganda — natija mustahkam.

**Vizual elementlar:**
Ikki ustunli taqqoslash. Chapda: System Prompt ("Doimiy roli"). O'rtada "+". O'ngda: Template Prompt ("To'ldiriladigan blanka"). O'ng ustun ko'k rangda ajratilgan.

**Speaker notes:**
Kutubxonaga kirishdan oldin, bitta narsani aniqlab olaylik. Promtlar poydevori ikki qismdan iborat. Bu xuddi xodimni ishga olishga o'xshaydi.

Chap tomondagisi — **System Prompt**. Bu botning lavozim yo'riqnomasi. Unga bir marta aytasiz: "Sen Markaziy Bankning muvofiqlik xodimisan. Jiddiy gapir. Shaxsiy ma'lumotni hech qachon ko'rsatma". Bo'ldi. Buni har kuni yozmaysiz. 

O'ng tomondagisi esa — **Template Prompt**. Bu sizning har kungi blankangiz. E'tibor bering, o'rtada "VS" (qarshi) emas, "+" belgisi turibdi. Ular birga ishlaydi.

System prompt botga *kimligini* uqtiradi, Template prompt esa *bugun nima qilish kerakligini* aytadi. Siz kutubxonadan asosan mana shu o'ng tomondagi blankalarni olasiz.

---

## Slide 5 — Dictionary

**Sarlavha:**
Ikki atama —
kutubxonaning **poydevori**.

**Lead matn:**
Bu ikki atama yozma blankadek tushunarli. Birini bir marta yozasiz, ikkinchisini har kuni to'ldirasiz.

**Vizual elementlar:**
2 ta keng dict-card. System Prompt (Botning doimiy roli) va Template Prompt (To'ldiriladigan blanka). Har birida izoh va kod ko'rinishidagi misollar.

**Speaker notes:**
Bizning an'anaviy lug'at slaydiga keldik. Kurs oxirigacha biz siz bilan AI tilida ravon gaplashishimiz kerak. Bugungi ikkita so'zni yodlab olamiz.

**System Prompt** — bu botning doimiy roli. "Sen kimsan" degan savolga javob. Masalan, "Sen kredit bo'limi xodimisan. Foiz stavkalarini taxmin qilma". Bu botning miyasiga quyib qo'yilgan qoida.

**Template Prompt** — bu to'ldiriladigan blanka. Ichida kvadrat qavslar bor: `[MIJOZ_ISMI]`, `[SUMMA]`. Siz faqat shu qavslar o'rniga bugungi mijoz ma'lumotini yozasiz.

*(Zalga qarab)* Slayd oxirida buni so'rayman, tayyor turinglar. System prompt — yo'riqnoma. Template prompt — blanka.

---

## Slide 6 — Library Overview

**Sarlavha:**
Kutubxona —
5 ta yo'nalish, **50+ shablon**.

**Lead matn:**
Har shablonda egasi, versiyasi, tasdiqlovchisi va qo'llash sohasi qayd etilgan — bu nafaqat ro'yxat, balki tasdiqlangan ish reyestri.

**Vizual elementlar:**
5 ta karta (2 ta yuqorida, 3 ta pastda). Kredit, Muvofiqlik, Mijoz xizmati, HR, Marketing. Har birida ichidagi shablonlar soni yozilgan. Kredit va Muvofiqlik yorqinroq ajratilgan.

**Speaker notes:**
Ko'p joylarda "100 ta zo'r promt" deb internetdan olingan aralash ro'yxatni berishadi. Biz unday qilmadik. Markaziy Bank kundalik amaliyotidan kelib chiqib, kutubxonani 5 ta "tokchaga" bo'ldik.

Bank nazorati (supervision) bo'limi uchun — 14 ta shablon. Muvofiqlik va PFFOA uchun — 11 ta. Tashqi va ichki kommunikatsiya — 12 ta.
Har biringiz o'z tokchangizdan kerakli papkani olasiz.

Aytmoqchi, qaysi bo'lim shablonlardan eng ko'p foydalanadi? *(Pauza)* Hujjatlar va kommunikatsiya bo'limi — chunki ularga kuniga o'nlab tijorat banklari va fuqarolardan murojaat tushadi. Lekin eng katta xavfni oldini oladigan bo'lim — Muvofiqlik va Bank nazorati: bu yerda noto'g'ri xulosa regulyator obro'siga to'g'ridan-to'g'ri urinadi.

Keling, quruq gapirmay, keyingi uchta slaydda 3 ta haqiqiy shablonni ochib, ichini o'qiymiz — ularning ikkitasi to'g'ridan-to'g'ri Markaziy Bank ish yuritish maqsadida tuzilgan.

---

## Slide 7 — Shablon #1: Kredit memo

**Sarlavha:**
1 betlik **kredit memo** tuzish.

**Lead matn:**
Shablon · Kredit · #KR-04 · illyustrativ statistika

**Vizual elementlar:**
Qora kod blokida shablon matni. `[ROL]`, `[VAZIFA]`, `[KIRISH MA'LUMOTLARI]`, `[FORMAT]` qismlari ajratilgan. Qavs ichidagi joylar ko'k rangda yoritilgan.

**Speaker notes:**
Birinchi namuna. #KR-04 shabloni. O'tgan oyda bank filiallarida 312 marta ishlatilgan. 

Qarang, bu oddiy matn emas. Bu mashina tushunadigan aniq strukturaga ega.
Tepada **`[ROL]`** — "Sen tijorat krediti bo'limisan. Foizni taxmin qilma". Qat'iy chegara.
Keyin **`[VAZIFA]`** — "350 so'zdan oshmasin". Agar buni yozmasak, bot bizga doston yozib beradi, komitet a'zolari uni o'qimaydi.

Eng asosiysi — **`[KIRISH MA'LUMOTLARI]`**. Ko'k rangdagi qavslarni ko'ryapsizmi? `[MIJOZ_ISMI]`, `[SUMMA]`, `[SKORING_BALI]`. Sizdan talab qilinadigan yagona ish — shularni o'rniga bugungi raqamlarni yozish.

Shu shablon orqali Jizzaxdagi filial ham, Toshkentdagi bosh ofis ham bir xil, standartlashtirilgan, sifatli memo yozadi.

---

## Slide 8 — Shablon #2: Mijoz xizmati javobi

**Sarlavha:**
Shikoyatga **rasmiy javob** tayyorlash.

**Lead matn:**
Shablon · Mijoz xizmati · #MX-07 · illyustrativ statistika

**Vizual elementlar:**
Yana bir qora kod bloki. `[SHIKOYAT_MAZMUNI]`, `[TEKSHIRUV_NATIJASI]` qavslari bilan. Eng pastida `// Taqiqlangan` qismi bor.

**Speaker notes:**
Ikkinchisi — Mijoz xizmati. #MX-07. O'tgan oyda naq 1240 marta ishlatildi.

Hammangiz bilasiz, mijoz tungi 3:00 da Telegramdan asabiy xat yozadi va ertalabgacha javob kutadi. Operatorning o'zi ham charchagan. Bunday paytda hissiyotga berilib javob yozish xavfi juda katta.

Bu shablon — qutqaruvchi. Siz unga shikoyat mazmuni va tekshiruv natijasini qisqacha berasiz. U rasmiy, odobli, lekin qat'iy javob xati qilib beradi.

Eng muhim joyiga qarang — eng pastdagi izoh: `// Taqiqlangan: "biz uddalay olmadik", "afsus", "kechiring"`. 
Nega? Chunki rasmiy bank javobida "kechiring" so'zi yuridik jihatdan mas'uliyatni bo'yinga olishni bildiradi. Xavfsizlik shablonning o'ziga tikilgan.

---

## Slide 9 — Shablon #3: Tijorat banki hisoboti tahlili

**Sarlavha:**
Tijorat banki **hisobotini** tahlil qilish.

**Lead matn:**
Shablon · Bank nazorati · #KP-02 · illyustrativ statistika

**Vizual elementlar:**
Qora kod blokida audit shabloni. `[NAZORAT NUQTALARI]` ro'yxati (likvidlik koeffitsienti, kapital yetarliligi, AML signallari). `// Diqqat:` qismi bor.

**Speaker notes:**
Uchinchisi — Markaziy Bank uchun eng "og'ir" va mas'uliyatli shablon. Bank nazorati bo'limining KP-02 nomerli shabloni — tijorat banki choraklik hisobotidagi anomaliyalarni topish uchun.

Bu yerda hazil ketmaydi. Xulosa to'g'ridan-to'g'ri Boshqaruv yig'ilishiga taqdim etiladi. Shuning uchun `[ROL]` qismiga qarang: "Sen Markaziy Bankning Bank nazorati bo'limi tahlilchisisan. Hech qanday taxmin qilmaysan. Markaziy Bank reglamentiga ishora qila olmasang, 'reglament topilmadi' deb yoz."

3-modulda **gallyutsinatsiya** haqida gaplashgan edik — AI bilmasa ham to'qib yozishga moyil. Biz mana shu bitta jumla bilan uni jilovlaymiz. Bank nazoratida noto'g'ri xulosa — tartibga solish qarori xato chiqishi degani.

Va yana bir muhim himoya: eng pastda `// Diqqat: tijorat banki nomi yoki shaxsiy ma'lumotni xulosaga ko'chirma — faqat hisobot raqami va koeffitsiyent`. Bu **Data Masking**. Biz faqat raqamlar orqali ishlaymiz, ism orqali emas.

Bu shablon bilan nazoratchi xodim bitta hisobotni 2 soat o'rniga 15 daqiqada tahlil qiladi — qolgan vaqt o'sha tahlilni tekshirishga ketadi.

---

## Slide 10 — Sozlash · 4 qadam

**Sarlavha:**
Shablonni o'z bo'limingizga —
**4 qadamda** moslang.

**Lead matn:**
Tayyor shablon 80% ish. Qolgan 20% — sizga moslash. Mana 4 ta qadam:

**Vizual elementlar:**
4 ta qadam (kartochkalar): 01 Rolni o'zgartir, 02 Misol qo'sh, 03 Format aniq, 04 Sinab ko'r.

**Speaker notes:**
Xo'sh, shablonlarni ko'rdik. Lekin har bir bo'limning o'z "shevasi", o'z uslubi bor. Tayyor shablon ishingizning 80 foizini yopadi. Qolgan 20 foizi — uni sizning bo'limingizga moslash. Buni qanday qilamiz? 4 ta oddiy qadamda.

**Bir:** Rolni o'zgartiring. "Kredit xodimi"ni "HR menejer"ga almashtirsangiz, bot tamoman boshqacha fikrlashni boshlaydi.
**Ikki:** O'z bo'limingiz yozgan bitta ideal misolni shablon ichiga qo'shing. Bot ohangni o'shandan "o'g'irlaydi".
**Uch:** Formatni aniq bering. "Menga 5 ta banddan iborat ro'yxat kerak" deb.
**To'rt:** Birdaniga ishga tushirmang. 3 xil real ma'lumotda sinab ko'ring. O'xshadimi? Saqlab qo'ying, endi bu sizning shaxsiy shabloningiz.

---

## Slide 11 — Live Workshop

**Sarlavha:**
Birgalikda **qayta yozamiz** — Kredit memo → Tijorat banki normativi tushuntirishi.

**Lead matn:**
Live workshop · 8 daqiqa

**Vizual elementlar:**
3 ta savol ketma-ket chiqadi:
01 — Qaysi maydonlarni olib tashlaymiz? (mijoz/skoring — kerak emas)
02 — Yangi maydonlar — qaysi 4 tasi muhim? (normativ raqami, sana, bandlar, ta'sir)
03 — Format qismida tushuntirish strukturasi qanday bo'ladi?

**Speaker notes:**
Nazariya yetadi. Qo'llarni shimarib, hozir hammamiz birgalikda ishlaymiz. Ekrandagi Kredit memo shablonini olamiz-da, uni Markaziy Bank ish jarayoniga moslab — tijorat banki uchun yangi normativni rasman tushuntiruvchi xat shabloniga aylantiramiz.

*(1-savolni oching)* Zal, diqqat qiling. Biz endi tashqi xat tayyorlayapmiz, ichki memo emas. Oldingi shablondagi `[MIJOZ_ISMI]`, `[OYLIK_AYLANMA]`, `[SKORING_BALI]` bizga kerakmi? Yo'q — bular tijorat banki ichki ishi. Ularni o'chiramiz.

*(2-savolni oching)* Endi nima kerak? Tijorat banklariga normativni tushuntirish uchun qaysi maydonlarni kiritishimiz shart? Kim aytadi?
*(Zaldan javob kuting)* Ha, to'g'ri, `[NORMATIV_RAQAMI]` va `[KUCHGA_KIRGAN_SANA]`. Yana? `[O'ZGARGAN_BANDLAR]`. Ajoyib. Yana bittasi muhim — `[AMALIYOTGA_TA'SIRI]`. Men bularni qo'shib boryapman.

*(3-savolni oching)* Va oxirida Format. Biz banklarga "shu qoidaga rioya qil" demaymiz, biz tushuntiramiz: "Eski tartib qanday edi → Yangi tartib qanday → Qachondan boshlab → Kim bilan bog'lansa bo'ladi". 4-bo'limli aniq struktura.

*(Jonli yozilgan matnni ko'rsatib)* Mana, 8 daqiqa vaqt ketdi. Siz hozir o'z bo'limingiz uchun yangi, ishlaydigan shablon yaratdingiz — ertaga shu shablon orqali normativ xatlar 30 daqiqa o'rniga 5 daqiqada tayyorlanadi.

**Tayyorgarlik:**
- Matn muharririda ekranni ulashib, jonli ravishda shablonni tahrirlash.

---

## Slide 12 — Sifat tekshiruvi

**Sarlavha:**
Yuborishdan oldin —
**sifat tekshiruvi**.

**Lead matn:**
AI yozdi — siz imzolaysiz. Mas'uliyat sizda. Quyidagi 5+5 belgi — 30 soniyalik majburiy darvoza, har yuborishdan oldin bajariladi va shablon ID + versiya audit iziga yoziladi.

**Vizual elementlar:**
Ikki ustun. Chapda: ✓ Yuborsa bo'ladi. O'ngda: ✗ Bu xatolar bo'lsa — qayta yoz.

**Speaker notes:**
Slaydning eng tepadagi kichik matniga e'tibor bering: **"AI yozdi — siz imzolaysiz."**

Hech qaysi rahbar "Menga buni AI shunday yozib berdi" degan bahonani qabul qilmaydi. Yakuniy mas'uliyat — bankirda. Shuning uchun, tugmani bosishdan oldin mana bu 30 soniyalik qoidani odat qiling.

Qachon yubormaymiz? *(O'ng ustunga ishora)* Agar matnda `[bo'sh kvadrat qavs]` qolib ketgan bo'lsa — demak siz e'tiborsizlik qilgansiz. 
Agar "albatta" yoki "kafolat beramiz" degan so'zlar bo'lsa — qayta yozing. Bank kafolat bermaydi.
Yoki siz 200 so'z so'ragansizu, u sizga 600 so'zlik insho yozib bergan bo'lsa. 

O'qib chiqing. Raqamlar manbaga mosmi? Ohang joyidami? Hammasi to'g'ri bo'lsa, keyin yuboring. Bu sizning xavfsizlik yostiqchangiz.

---

## Slide 13 — Closing + Recap

**Sarlavha:**
Bugundan **olib ketiladigan** 3 xulosa.

**Vizual elementlar:**
3 ta xulosa ro'yxati. Eng pastda "Lug'at recap" bloki.

**Speaker notes:**
Yakunlaymiz. Bugun siz bilan ketadigan 3 ta asosiy narsa:

Birinchisi: Noldan yozma — kutubxonadan ol. 50 ta tayyor shablon sizni kutyapti.
Ikkinchisi: Uni o'zingizga moslang. 4 ta qadamni eslang (Rol, Misol, Format, Sinov).
Uchinchisi: AI yozadi, lekin mas'uliyat sizning zimmangizda. 30 soniyalik tekshiruvni unutmang.

Endi, boshida kelishganimizdek, xotirani tekshiramiz. Men atamani aytaman, siz qisqacha ma'nosini. Tayyormisiz?
**System Prompt** nima edi? *(Zaldan javob kuting: "Botning doimiy roli / yo'riqnoma")* Yaxshi!
**Template Prompt** nima edi? *(Zaldan javob kuting: "To'ldiriladigan blanka")* Ajoyib.

Ertaga ishga keling va kutubxonani ochiq holda ishni boshlang.

---

## Slide 14 — Q&A

**Sarlavha:**
Sizning **savollaringiz**.

**Lead matn:**
Shablonlarni qayerdan olish, qanday saqlash, qaysi yo'nalishni birinchi sinash — marhamat.

**Vizual elementlar:**
Katta "?" belgisi. Ostida kontakt: murod@mohir.dev

**Speaker notes:**
Bizda yana 5 daqiqa vaqt qoldi. 

Bu shablonlarni qayerda saqlash qulay? Qaysi bo'lim shablonini birinchi bo'lib sinab ko'rmoqchisiz? Yoki shaxsiy ma'lumotlar bo'yicha xavotirlar bormi? 

Marhamat, savollar bo'lsa eshitaman.

*(Agar zal jim bo'lsa, o'zingiz savol tashlang: "Oramizda HR bo'limidan kim bor? Siz ertaga birinchi bo'lib qaysi shablonni sinab ko'rgan bo'lardingiz?")*

---

## Series-wide bog'lanish

- **Avvalgi modul:** 5-modul — Promt muhandisligi. U yerda qanday yozishni o'rgandik, bu yerda kutubxonadan tayyorini olishni.
- **Keyingi modul:** 7-modul — SI platformalar (ChatGPT, Claude). U yerda System Prompt aynan qaysi oynaga yozilishini amalda ko'ramiz.
- **Terminologiya:** System Prompt va Template Prompt tushunchalari 11-modulda (Agent dizayni) yana qaytib keladi.

## Tayyorgarlik checklist

- [ ] QR kod slide 3 da haqiqiy Notion/Confluence kutubxonasiga ochilishini tekshirish.
- [ ] Demo bot (n8n + Gemini) slide 3 dagi jonli namoyish uchun tayyor va ochiq turishi.
- [ ] Workshop (slide 11) uchun ekranda matn muharriri (yoki Notion sahifa) tayyorlab qo'yish.
- [ ] Internet uzilib qolsa, 3 ta asosiy shablon matnini lokal faylda saqlash.

## Vaqt rejimi

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Kirish va Hook | 1–5 | ~15 daq |
| Kategoriyalar va Shablonlar | 6–9 | ~22 daq |
| Sozlash va Workshop | 10–11 | ~14 daq |
| Sifat tekshiruvi va Yakun | 12–14 | ~9 daq |
<!--
  Humanized by .qa/humanize.mjs
  Source: decks\cb_decks\4_deck/content.md (existing) + index.html + 13 screenshots
  Model: gemini-3-pro-preview
  Generated: 2026-05-10T10:47:44.844Z
  Elapsed: 81.3s
  Tokens: in=50299 out=6621
-->
# 4-modul · Sun'iy intellekt uchun jarayonlarni strukturalashtirish

**Module:** 4-modul · Kun 1 · 14:00–15:00 (60 daqiqa)
**Format:** Amaliy mashq (practical exercise)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Slaydlar soni:** 13 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** Workflow (jarayon zanjiri), Task Decomposition — slayd 5 da kiritiladi, slayd 12 da recap

> **Asosiy g'oya:** Tartibsizlikni SIga bersangiz, u sizga tartibsizlikni 10 baravar tezroq qilib qaytaradi. SI bankda mo''jiza yaratmaydi, u faqat to'g'ri bo'laklarga ajratilgan aniq jarayon (workflow) ichidagina ishlaydi. Bu modulda biz nazariyani yig'ishtirib, har bir ishtirokchi o'z bo'limidagi eng og'riqli ishni 5–7 ta aniq qadamga bo'lishni mashq qiladi.

---

## Deck outline

| # | Sarlavha | Format / urg'u | Vaqt | Faza |
|---|---|---|---|---|
| 1 | SI uchun jarayonlarni strukturalashtirish | Title | ~2 daq | — |
| 2 | Mavzuning yo'l xaritasi | Agenda — 4 faza | ~1 daq | — |
| 3 | Tartibsiz ish — yoki strukturalangan zanjir | Hook — `.compare` | ~4 daq | 01 Nima uchun |
| 4 | Nima uchun strukturalash kerak | 3 sabab + proof | ~6 daq | 01 Nima uchun |
| 5 | Ikki atama — bugungi poydevor | `.dict` (2 cards) | ~5 daq | 02 Workflow |
| 6 | Workflow anatomiyasi · 5 qadam | `.flow` | ~7 daq | 02 Workflow |
| 7 | Bitta katta vazifa — uchta aniq qadam | Fan diagram | ~5 daq | 03 Vazifani bo'lish |
| 8 | Boshidan oxirigacha · 5 qadam, 2 tasida SI yordam beradi | `.flow` + SI badges | ~5 daq | 03 Vazifani bo'lish |
| 9 | Hand-off nuqtalari · kim nimani qiladi | `.cando` | ~3 daq | 03 Vazifani bo'lish |
| 10 | O'z ishingizni 5–7 qadamga bo'ling | `.s-brain` + stollarda 12 daq | ~12 daq | 04 Mashq |
| 11 | Tez-tez uchraydigan xatolar · va to'g'ri yechimlar | `.myth` 2 juft | ~3 daq | 04 Mashq |
| 12 | Bugundan olib ketadigan 3 xulosa | Closing | ~3 daq | 04 Mashq |
| 13 | Sizning savollaringiz | Q&A | ~4 daq | 04 Mashq |

---

## Slide 1 — Title

**Sarlavha / chip:**
Kun 1 · 14:00 — 15:00 · Amaliy mashq
SI UCHUN JARAYONLARNI **STRUKTURALASHTIRISH.**

**Lead matn:**
SI ishni to'g'ri bajarishi uchun ishni to'g'ri bo'laklarga bo'lish kerak — qadam, ma'lumot, qaror.

**Vizual elementlar:**
To'q ko'k gradient fon, gridli yuza. "STRUKTURALASHTIRISH" so'zi yorqin ko'k glow effekti bilan ajratilgan.

**Speaker notes:**
*(Sahnaga chiqing. Tushlikdan keyingi birinchi modul — auditoriyani darhol uyg'otish kerak. Bir necha soniya jim turing.)*

"Tushlik yaxshi o'tdimi? Ajoyib. Endi yeng shimaradigan vaqt keldi. 

Shu paytgacha biz SI nima ekanligi, uning xavflari haqida ko'p gaplashdik. Lekin hozirgi 60 daqiqada biz gaplashishni to'xtatamiz. Qo'limiz bilan ishlaymiz. 

Agar siz SIga shunchaki 'menga hisobot yozib ber' desangiz — u sizga chiroyli, lekin mutlaqo yaroqsiz matn beradi. Nima uchun? Chunki ishning strukturasi yo'q. SI ishni to'g'ri bajarishi uchun, avval siz o'sha ishni to'g'ri bo'laklarga bo'lishingiz kerak. Qani, ketdik."

---

## Slide 2 — Mavzuning yo'l xaritasi

**Sarlavha / chip:**
Agenda
MAVZUNING **YO'L XARITASI**.

**Lead matn:**
Yo'q (to'g'ridan-to'g'ri 4 ta faza).

**Vizual elementlar:**
2x2 grid shaklida 4 ta bosqich. Har biri alohida bosish orqali ochiladi (`.fragment`).
01 Nima uchun, 02 Workflow, 03 Vazifani bo'lish, 04 Amaliy mashq.

**Speaker notes:**
"Reja juda oddiy va amaliy. 

*(1-karta)* Avval nega buni qilyotganimizni tushunamiz. Tartibsizlik qayerdan keladi?
*(2-karta)* Keyin bankdagi istalgan ishni 5 ta qadamga qanday joylashni ko'ramiz. 
*(3-karta)* Eng muhimi — qanday qilib katta vazifani SI tushunadigan kichik bo'laklarga ajratishni o'rganamiz.
*(4-karta)* Va oxirgi 25 daqiqani stollarda o'tkazamiz. Har biringiz o'z bo'limingizdagi bitta ishni qog'ozga tushirasiz va uni SI uchun tayyorlaysiz.

Birinchi savoldan boshlaymiz."

---

## Slide 3 — Tartibsiz ish — yoki strukturalangan zanjir

**Sarlavha / chip:**
TARTIBSIZ ISH — YOKI **STRUKTURALANGAN ZANJIR**.

**Lead matn:**
SI sizga yordam beradimi yoki adashtiradimi — buni siz bergan jarayon hal qiladi. Tartibsiz topshiriq → tartibsiz javob. Aniq qadam → aniq javob.

**Vizual elementlar:**
Katta vizual taqqoslash (`.compare`). 
Chapda: qorong'u, tartibsiz ikonalar (inbox, telefon, grafik, xat) va *"Hammasini birdaniga qil"* yozuvi.
O'ngda: yorqin ko'k (win) karta, 1 dan 5 gacha tartiblangan raqamlar va *Kirish → Tekshiruv → Tahlil → Xulosa → Yetkazib berish*.

**Speaker notes:**
"Zalda kim juma kuni soat 17:00 da birdaniga 4 ta turli xil topshiriq olgan? Qo'l ko'taring. Hammamizda bo'lgan. O'sha paytda miyangiz qanday ishlaydi? Xuddi chap tomondagidek — hamma narsa aralashib ketgan.

SI ham xuddi shunday. Agar siz unga 47 betlik mijoz arizasini tashlab, 'shu bo'yicha qaror chiqar, xat yoz va hisobotga tushir' desangiz — u adashadi. U sizga chiroyli yolg'onlarni to'qib berishni boshlaydi.

Bizning maqsadimiz — chap tomondagi vahimani o'ng tomondagi aniq konveyerga aylantirish. SI bitta vaqtda bitta qadamni ko'rishi kerak. Bitta kirish ma'lumoti. Bitta vazifa. Bitta aniq javob."

---

## Slide 4 — Nima uchun strukturalash kerak

**Sarlavha / chip:**
NIMA UCHUN **STRUKTURALASH** KERAK.

**Lead matn:**
Bir promtga "kredit memo yoz" deb yozsangiz — har safar boshqa natija. Bir marta zanjir tuzilsa — har safar bir xil sifat.

**Vizual elementlar:**
3 ta ustunli `.benefits` kartalari.
1. **KAMROQ QAYTA ISHLASH** — vazifa kichik bo'lsa, xatoni topish va tuzatish oson.
2. **TEKSHIRISH OSON** — har qadamda kirish, natija va mas'ul shaxs ko'rinadi.
3. **QAYTA ISHLATILADIGAN** — bir xil hisobot yoki murojaat uchun bir xil zanjir.

**Speaker notes:**
"Nega shunchaki bitta katta promt yozib ketaversak bo'lmaydi? Uchta sababi bor:

*(1-karta)* Birinchisi — kamroq qayta ishlash. SI sizga yozib bergan xulosa 'sal g'alati' chiqsa, uni to'g'rilashga noldan yozgandan ko'proq vaqt ketadi. Kichik qadamlar buni yo'q qiladi.

*(2-karta)* Ikkinchisi — tekshirish osonligi. Bu Markaziy Bank. Bizga 'qora quti' kerak emas. Agar SI xato qilsa, qaysi qadamda xato qilganini ko'ra olishimiz kerak. Audit so'rasa, ko'rsatib bera olishimiz shart.

*(3-karta)* Va asosiysi — qayta ishlatish. Zanjirni bir marta qurasiz. Ertasi kuni faqat yangi hujjatni kiritasiz. Tizim avtomat ishlayveradi."

---

## Slide 5 — Ikki atama — bugungi poydevor

**Sarlavha / chip:**
BANKIR UCHUN SI LUG'ATI
IKKI ATAMA — BUGUNGI **POYDEVOR**.

**Lead matn:**
Bu modulning hammasi shu ikki so'z atrofida aylanadi. Hozir bir marta tushunsak — keyingi 8 slayd silliq o'tadi.

**Vizual elementlar:**
2 ta kengaytirilgan lug'at kartasi (`.dict`).
Chapda: **WORKFLOW** (Jarayon zanjiri). O'ngda: **TASK DECOMPOSITION** (Vazifani bo'lish). Har birida qisqacha ta'rif va bank misoli bor.

**Speaker notes:**
"Biz kelishib olgan edik: kurs davomida SI lug'atimizni yig'ib boramiz. Bugun menyuda ikkita so'z bor.

Birinchisi — **Workflow**. O'zbekchasiga 'jarayon zanjiri'. Bu ishning boshidan oxirigacha bo'lgan yo'li. Masalan, ariza kirdi, kimdir tekshirdi, xulosa yozildi, imzo qo'yildi. Bu sizning konveyeringiz.

Ikkinchisi — **Task Decomposition** (vazifani bo'laklash). Katta, mavhum vazifani olib, uni 3 ta kichik, oddiy vazifaga bo'lish. 'Menga xulosa yoz' deyish o'rniga — '1. Faktni yig', 2. Riskni top, 3. Yakun yoz' deyish.

SI super-aqlli bo'lishi mumkin, lekin u diqqatni jamlashda yosh bolaga o'xshaydi. Unga kichik, aniq luqmalar berish kerak. Shu — vazifani bo'laklash."

---

## Slide 6 — Workflow anatomiyasi · 5 qadam

**Sarlavha / chip:**
**WORKFLOW** ANATOMIYASI · 5 QADAM.

**Lead matn:**
Ko'p bank jarayonlari — ariza, shikoyat, hisobot — shu 5 qadamga tushadi. SI odatda 3-qadamga (Tahlil) qoralama tayyorlashda yordam beradi.

**Vizual elementlar:**
5 qadamli gorizontal flow diagrammasi (`.flow`).
Kirish → Tekshiruv → **TAHLIL** (yorqin ko'k rangda, SI miya ikonasi bilan) → Xulosa → Yetkazish.

**Speaker notes:**
"Endi Markaziy Bankdagi ishingizga qaraylik. Xoh tijorat banki hisobotini ko'ring, xoh fuqaro murojaatiga javob bering, xoh tekshiruv materialini tahlil qiling — ko'p hollarda ish shu 5 ta qadamga tushadi.

*(Ekranga ishora qiling)*
Kirish — hujjat keldi. Tekshiruv — maydonlar joyidami? Tahlil — mantiqni qidiramiz, raqamlarni solishtiramiz. Xulosa — ha yoki yo'q deymiz. Va oxirida Yetkazish — javob xatini jo'natamiz.

E'tibor bering, faqat bitta qadam yorqin ko'k rangda. **Tahlil**.
SI sizning o'rningizga tijorat banki vakili bilan gaplashmaydi, SI sizning o'rningizga hujjatga muhr bosmaydi. Lekin uzun hisobotni o'qib, ichidan tekshiruv talab qiladigan joylarni topib berish — mana buni SI sizdan oldin qila oladi. Yakuniy gap baribir sizniki."

---

## Slide 7 — Bitta katta vazifa — uchta aniq qadam

**Sarlavha / chip:**
BITTA KATTA VAZIFA — **UCHTA ANIQ QADAM**.

**Lead matn:**
"Kredit memo yoz" — SI uchun juda katta. Uni 3 ta kichik vazifaga bo'lsak, har biri 1 ta aniq natijani beradi.

**Vizual elementlar:**
Yangi motif: "Fan" diagrammasi (`.fan`). Yuqorida bitta katta pill ("KREDIT MEMO"). Undan pastga 3 ta chiziq tushib, 3 ta kichik kartani ochadi: 01 YIG' (Faktlar), 02 TOP (Risklar), 03 YOZ (Yakun).

**Speaker notes:**
"Boyagi ikkinchi atamamizni eslaysizmi? Task Decomposition. Keling uni amalda ko'ramiz.

Tasavvur qiling, siz SIga 'Mijoz uchun kredit memo yoz' dedingiz. Bu bitta katta vazifa. SI nima qiladi? Shablon bo'yicha nimadir to'qiydi. Natija yuzaki bo'ladi.

Endi buni 3 ga bo'lamiz.
*(1-karta)* SIga aytamiz: Faqat faktlarni yig'. Daromadi qancha, qarzi qancha? Boshqa narsa qo'shma.
*(2-karta)* Keyin: Faqat risklarni top. Qayerda muammo bor?
*(3-karta)* Va oxirida: Endi shu fakt va risklarga qarab, 5 jumlalik qaror loyihasini yoz.

Siz bitta katta aralashma o'rniga, uchta sifatli, tekshirish mumkin bo'lgan qadam oldingiz. Aynan shu usul ishlarni tezlashtiradi."

---

## Slide 8 — Boshidan oxirigacha · 5 qadam, 2 tasida SI yordam beradi

**Sarlavha / chip:**
BANK MISOLI · TIJORAT BANKI HISOBOTI
BOSHIDAN OXIRIGACHA · 5 QADAM, **2 TASIDA SI YORDAM BERADI**.

**Lead matn:**
SI raqamlarni ajratadi va savollar qoralamasini tayyorlaydi. Yakuniy qaror va imzo — mas'ul xodimda.

**Vizual elementlar:**
Gorizontal 5 bosqichli flow.
1. Hisobot qabul, 2. **Raqam va jadval ajratish** (SI chipi), 3. Normativ tekshiruv, 4. **Risk va savollar qoralamasi** (SI chipi), 5. Yakuniy xulosa va imzo.

**Speaker notes:**
"Mana bu slayd — bugungi kungi eng muhim slayd. Agar ertaga kimdir sizdan 'SI Markaziy Bankda qanday ishlaydi?' deb so'rasa, shu rasmni ko'rsating.

Bu — tijorat bankidan kelgan hisobotni ko'rib chiqish jarayoni. Ko'rib turibsizmi, SI hamma joyni egallab olgani yo'q. U faqat o'ziga tegishli 2 ta joyda yordam beradi.

2-qadamda: U yuzlab betlik hisobot va ilovalardan asosiy raqamlar va jadvallarni ajratib chiqaryapti. Bo'sh sahifadan boshlamaslik — siz uchun katta yutuq.
4-qadamda: U normativ talqinga moslikni baholab, savollar va potensial risklar ro'yxatini qoralama qiladi.

Lekin 3-qadam — normativ tekshiruv — inson ko'zi. 5-qadam yakuniy xulosa va rasmiy javob — mas'ul xodim imzosi. Mas'uliyat odamda qoladi, qora mehnat SIga o'tadi.

Bu pattern hisobotda ham, murojaatga javobda ham, tekshiruv dalolatnomasida ham bir xil ishlaydi."

---

## Slide 9 — Topshirish nuqtalari · kim nimani qiladi

**Sarlavha / chip:**
TOPSHIRISH NUQTALARI · **KIM NIMANI QILADI**.

**Lead matn:**
Workflow tuzilganda eng birinchi savol — har qadamda kim ishlaydi. Mas'uliyat hech qachon yo'qolmasin.

**Vizual elementlar:**
Ikkita ustunli taqqoslash (`.cando`).
Chapda (ko'k): **✓ SI QILADI** — matndan fakt ajratadi, jadvalni solishtiradi, savollar ro'yxatini tuzadi, xat va memo qoralamasini beradi.
O'ngda (qizil): **→ INSON QILADI** — maxfiy ma'lumot chegarasini belgilaydi, normativ talqinni tekshiradi, istisno holatlarni baholaydi, yakuniy xulosa va imzoni beradi, audit uchun izoh qoldiradi.

**Speaker notes:**
"Jarayonni quryapmiz. Kim nima qilishini aniq chizib olishimiz kerak. Buni biz 'topshirish nuqtasi' deymiz. SI qayergacha boradi, qayerdan siz olasiz?

Chap tomonga qarang — bularning hammasi vaqt o'g'irlaydigan ishlar. Hujjatdan ma'lumot qidirish, jadvalni solishtirish, xatning qoralamasini yozish. Buni SIga beramiz.

Lekin o'ng tomonga qarang. Bu yerda 3 ta majburiy nazorat bor: birinchi — qaysi ma'lumotni SIga umuman bermaymiz (maxfiylik chegarasi). Ikkinchi — SI bergan natijani normativga moslab tekshirish. Uchinchi — har bir SI qadami uchun aniq mas'ul shaxs va audit izi.

Eng pastki qator — **istisno hollar**. Markaziy Bankda har kuni shunday holat keladiki, qog'ozdagi qoida ishlamaydi. Tijorat bankining holatini tushunish, regulyator sifatida qaror qabul qilish kerak. SI buni eplayolmaydi. Uning uchun hammasi oq yoki qora. Kulrang zonani faqat siz hal qilasiz."

---

## Slide 10 — O'z ishingizni 5–7 qadamga bo'ling

**Sarlavha / chip:**
AMALIY MASHQ · 12 DAQ · STOLLARDA
O'Z ISHINGIZNI **5–7 QADAMGA** BO'LING.

**Lead matn:**
Yo'q (faqat 3 ta aniq ko'rsatma).

**Vizual elementlar:**
Katta shriftda 3 ta bosqich (`.s-brain`):
01 Pilotga mos ishni tanlang: tez-tez takrorlanadi · vaqt oladi · natijasi tekshiriladi · yakuniy qaror insonda. Uni 5–7 ta qadamga ajratib yozing.
02 Har qadamga mas'ul belgisini qo'ying: **xodim · rahbar · SI yordamchi**.
03 SI yordam beradigan 1–2 qadamni belgilang. Yoniga uch narsani yozing: SIga **berilmaydigan** ma'lumot · tekshiruv manbasi · natija mezoni.

**Speaker notes:**
*(Ohangni o'zgartiring, harakatga chaqiruvchi ovoz)*
"Bo'ldi. Men yetarlicha gapirdim. Endi navbat sizga.

Stollaringizda katta plakatlar va markerlar bor. Hozir har bir stol o'z bo'limidan bitta ishni tanlaydi: hisobot ko'rib chiqish, murojaatga javob, tekshiruv materialini tahlil qilish yoki rahbariyat uchun ma'lumotnoma. Pilotga mos ishni oling — tez-tez takrorlanadi, vaqt oladi, natijasi tekshiriladi va yakuniy qaror insonda qoladi.

12 daqiqada stolingiz bitta pilot xaritasini topshiradi. Aniq shakl:
1. Jarayon nomi (1 qator).
2. 5–7 ta qadam.
3. Har qadamda mas'ul: xodim, rahbar yoki SI yordamchi.
4. SI yordam beradigan 1–2 qadam.
5. SIga **berilmaydigan** ma'lumot yoki qaror (maxfiylik chegarasi).
6. Tekshiruv manbasi — natijani qaysi norma yoki hujjat bilan solishtirasiz?
7. Natija mezoni — vaqt qisqarishi, qayta ishlash kamayishi yoki xato ulushi.
8. Eng yuqori ta'sirli bitta qadam — yulduzcha bilan belgilang.

Bu shunchaki o'yin emas. Yulduzcha qo'ygan qadamingiz — bo'limingiz uchun pilotga eng yaqin nuqta.

Sizda 12 daqiqa bor. Vaqt ketdi! Men stollar orasida yuraman."

*(Sahnadan tushing, stollar orasiga kiring. Slaydni ekranda qoldiring).*

---

## Slide 11 — Tez-tez uchraydigan xatolar · va to'g'ri yechimlar

**Sarlavha / chip:**
TEZ-TEZ UCHRAYDIGAN **XATO** · VA TO'G'RISI.

**Lead matn:**
Yo'q.

**Vizual elementlar:**
2 ta juftlikdan iborat kartalar (`.myth`).
Xato: "Bir promtda hammasini qil" / To'g'ri: "Aniq vazifa, aniq qadam".
Xato: "SI aytdi, demak to'g'ri" / To'g'ri: "SI javobi — qoralama. Manba, norma va mas'ul xodim tekshiruvi kerak".

**Speaker notes:**
*(Mashq tugagach, e'tiborni yana ekranga torting)*
"Ajoyib ish bo'ldi. Ba'zi jamoalar shunday jarayonlarni chizishdiki, ularni ertagayoq amaliyotga kiritish mumkin. Plakatlarni saqlab qo'ying.

Endi, o'rganganlarimizni buzib qo'ymaslik uchun ikkita eng katta xatoni eslatib o'taman.

Birinchisi — Excel'da 2000 satrni SIga berib, 'menga hammasini qilib ber' deyish. SI adashadi, sizning asabingiz buziladi. Bitta promt — bitta natija. Katta vazifani qadamlarga bo'lib, SIdan bir nafasda kredit memo, javob xati va hisobotni so'ramaslik kerak.

Ikkinchisi — huquqiy xato. SI javobini hujjatga aylantirib qo'yish. Hech qachon 'SI aytdi, demak to'g'ri' degan gap Markaziy Bankda yangramasligi kerak. SI har doim faqat qoralama beradi. Qaror uchun manba, norma va mas'ul xodim tekshiruvi shart. Imzo — sizniki, javobgarlik — tashkilotniki."

---

## Slide 12 — Bugundan olib ketadigan 3 xulosa

**Sarlavha / chip:**
BUGUNDAN **OLIB KETADIGAN** 3 XULOSA.

**Lead matn:**
Yo'q.

**Vizual elementlar:**
Uchta xulosa qatori.
1. **Strukturalanmagan jarayonni SI tuzatmaydi** — u faqat tartibsiz natijani tezroq beradi.
2. **5 ta qadam · 2 tasida SI yordam beradi** — bank jarayoni shunchalik sodda. SI qoralama beradi, xodim tekshiradi, tashkilot javobgar bo'ladi.
3. **Katta vazifa = kichik, tekshiriladigan qadamlar**. Bo'laklash bo'lmasa — sifat har safar boshqa.
Pastda: Lug'at recap qatori (Workflow + Task Decomposition).

**Speaker notes:**
"Yakunlaymiz. Agar bugungi 60 daqiqadan faqat uchta narsani yodda saqlasangiz, shular bo'lsin:

Birinchisi: Strukturalanmagan jarayonni SI tuzatmaydi. 
Ikkinchisi: Jarayonlar vahimali emas. 5 ta qadam, atigi 2 tasida SI yordam beradi.
Uchinchisi: Katta vazifani kichik, tekshiriladigan qadamlarga bo'ling. 

Endi, an'anamizga ko'ra, bugungi lug'atimizni birga qaytaramiz. Men atamani aytaman, siz ma'nosini. Tayyormisiz?

Workflow nima edi? 
*(Zal bilan birga: "Jarayon zanjiri · kirish → tahlil → xulosa")*

Task Decomposition nima edi?
*(Zal bilan birga: "Katta vazifani kichik, tekshiriladigan qadamlarga bo'lish")*

Ajoyib."

---

## Slide 13 — Sizning savollaringiz

**Sarlavha / chip:**
SIZNING **SAVOLLARINGIZ**.


**Vizual elementlar:**
Markazda ulkan, yorqin ko'k **"?"** belgisi. Pastda murojaat uchun email: `murod@mohir.dev`.

**Speaker notes:**
"Bizda yana bir necha daqiqa vaqt bor. Mashq davomida ba'zi stollarda qizg'in bahslar bo'lganini ko'rdim.

Asosiy savol: o'z bo'limingizda qaysi qadam SIga mos keladi, qaysi qadamda mas'uliyat insonda qolishi shart? 'Bizda 5 ta emas, 12 ta qadam-ku' deydiganlar bormi? Marhamat, eshitaman."

*(Savollarga javob berishda aniq bo'ling. Ertangi kunga qiziqish uyg'otib yoping: "Ertaga shu chizgan sxemalaringizga jon kiritamiz — promt yozishni o'rganamiz".)*

---

## Series-wide bog'lanish

- **Avvalgi modul:** `3_deck/` — Sun'iy intellekt xavflari, muvofiqlik va boshqaruv.
- **Keyingi modul:** `5_deck/` — Promt muhandisligi · professional daraja. (Plakatlar 5-modul uchun xom-ashyo bo'ladi).
- **Atama qaytishi:** *Workflow* — 8-modul (no-code), 9-modul (RAG) va 12-modulda amaliyotga ko'chadi. *Task Decomposition* — 5-modulda (Chain-of-Thought) va 10–11-modullarda (Agentlar) to'liq qo'llaniladi.

## Tayyorgarlik checklist (deck'dan tashqari)

- [ ] A4 bo'sh plakat blankasi har stolga (5–7 katakcha + SI/INSON ustun) — 10-slayd mashqi uchun oldindan tayyorlab qo'yilishi shart.
- [ ] Qalin marker har bir stolga (zaxirasi bilan).
- [ ] Speakerlik joyidan stollar orasiga harakatlana olish erkinligini tekshirish (simlar xalaqit bermasligi kerak).
- [ ] Slayd 8 (tijorat banki hisoboti) — agar zalda HR/marketing xodimi ko'p bo'lsa, ular uchun ekvivalent misol yodda tayyor turishi kerak (Masalan HR: ariza kelishi → SI rezyumeni tahlil qilishi → suhbat → SI taklif matnini yozishi → imzo).

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Nima uchun | 3–4 | ~10 daq |
| 02 · Workflow | 5–6 | ~12 daq |
| 03 · Vazifani bo'lish | 7–9 | ~13 daq |
| 04 · Amaliy mashq + Q&A | 10–13 | ~22 daq |
| **Jami** | **13** | **~60 daq** |
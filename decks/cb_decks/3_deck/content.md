<!--
  Humanized by .qa/humanize.mjs
  Source: decks\cb_decks\3_deck/content.md (existing) + index.html + 14 screenshots
  Model: gemini-3-pro-preview
  Generated: 2026-05-10T10:47:41.039Z
  Elapsed: 79.8s
  Tokens: in=52566 out=6300
-->
# 3-modul · Sun'iy intellekt xavflari, muvofiqlik va boshqaruv — to'liq kontent

**Module:** 3-modul · Kun 1 · 11:45–12:45 (60 daqiqa)
**Format:** Interaktiv muhokama
**Audience:** Markaziy Bank xodimlari (muvofiqlik, ichki audit, operatsiya)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Gemini + RAG + Masking gateway + Audit log
**Slaydlar soni:** 14 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Hallucination** (gallyutsinatsiya), **Data Masking** — slide 5 da kiritiladi, slide 13 da recap

> **Asosiy g'oya:** Muvofiqlik — bu AI proyektlarini o'ldiradigan "qizil chiziq" emas. Agar arxitekturani boshidan to'g'ri qursak (RAG + Masking + Audit log), u xavfsiz koridorga aylanadi. Inspektor kelganda qo'limizda aniq isbotlar bo'lishi kerak, "bu AI'ning xatosi" degan bahona bankda o'tmaydi.

---

## Deck outline

| # | Sarlavha | Format / urg'u | Vaqt | Faza |
|---|---|---|---|---|
| 1 | AI xavflari, muvofiqlik va boshqaruv | Title | ~2 daq | — |
| 2 | Mavzuning yo'l xaritasi | Agenda — 4 faza | ~2 daq | — |
| 3 | AI ishonch bilan yolg'on gapiradi | Live hallucination demo | ~5 daq | 01 Xavflar |
| 4 | Bankda AI 4 ta xavf tug'diradi | Risk taxonomy | ~5 daq | 01 Xavflar |
| 5 | Ikki so'z — muvofiqlikning poydevori | Atama dictionary | ~5 daq | 02 Gallyutsinatsiya |
| 6 | Gallyutsinatsiyani RAG nolga tushiradi | Compare — Internet vs RAG | ~5 daq | 02 Gallyutsinatsiya |
| 7 | Data Masking — AI shaxsiy ma'lumotlarni ko'rmaydi | Before/After deep-dive | ~5 daq | 03 Ma'lumot himoyasi |
| 8 | Muvofiqlikning 3 qatlami | Stack — MB · ichki · GDPR | ~5 daq | 03 Ma'lumot himoyasi |
| 9 | Yopiq kontur arxitekturasi | Flow — User → Mask → AI → Log | ~6 daq | 03 Ma'lumot himoyasi |
| 10 | Boshqaruv — kim javob beradi? | Governance — 4 rol | ~4 daq | 04 Boshqaruv |
| 11 | Xavfni birga baholaymiz — L · M · H? | Risk-rating mashq | ~6 daq | 04 Boshqaruv |
| 12 | Eng ko'p uchraydigan tuzoqlar | Myth vs Reality (3 row) | ~3 daq | 04 Boshqaruv |
| 13 | Muvofiqlik — qizil chiziq emas, xavfsiz koridor | Closing + lug'at recap | ~3 daq | 04 Boshqaruv |
| 14 | Sizning savollaringiz | Q&A | ~5 daq | — |

---

## Slide 1 — Title

**Sarlavha:** SI **XAVFLARI**, MUVOFIQLIK VA BOSHQARUV.
**Chip:** Kun 1 · 11:45 — 12:45
**Lead matn:** Qizil chiziqdan xavfsiz koridorgacha — bankir tilida.

**Vizual elementlar:**
To'q ko'k fon, grid. "XAVFLARI" so'zi yorqin ko'k fonda ajratilgan.

**Speaker notes:**
Zalda muvofiqlik va ichki audit xodimlari bormi? Qo'lingizni ko'taringchi. (pauza, jilmayib) Ha, demak, bugun sizning eng sevimli — va IT bo'limi uchun eng asabiy — mavzuga keldik.

Birinchi modulda xavfsizlikni "qizil chiziq" degandim. Lekin aytmoqchimanki, muvofiqlik proyektni to'xtatadigan devor emas. Agar biz uni to'g'ri qursak, u xavfsiz koridorga aylanadi. 

Bugun IT jargonlarini yig'ishtiramiz. Faqat bankir tilida gaplashamiz: MB tekshiruvida nima so'raladi va unga qanday texnik javob beramiz?

---

## Slide 2 — Agenda

**Sarlavha:** MAVZUNING **YO'L XARITASI**.
**Lead matn:** Agenda

**Vizual elementlar:**
4 ta faza kartasi (2x2 grid). Bosilganda ketma-ket ochiladi.

**Speaker notes:**
Roppa-rosa bir soat vaqtimiz bor. Yo'limiz 4 ta bekatdan iborat.

(1-kartani oching) Avval dushmanni taniymiz. AI qanday qilib yuzimizga qarab yolg'on gapirishini jonli ko'ramiz.
(2-karta) Keyin shu yolg'onni (gallyutsinatsiyani) RAG yordamida qanday bo'g'ishni o'rganamiz.
(3-karta) Uchinchi qadam eng noziki — mijoz ma'lumotlarini AI'dan qanday yashiramiz?
(4-karta) Va oxirida, "bunga kim javob beradi?" degan abadiy savolga 4 ta aniq rol bilan nuqta qo'yamiz.

Qani, ketdik.

---

## Slide 3 — Hook (Live hallucination demo)

**Sarlavha:** AI ISHONCH BILAN **YOLG'ON GAPIRADI**.
**Chip:** LIVE DEMO · GALLYUTSINATSIYA
**Lead matn:** Savol: *"Markaziy Bank №427-sonli qarorida yuridik shaxslar uchun yangi rezerv koeffitsiyenti necha foiz?"*

**Vizual elementlar:**
AI bergan soxta javob (14,5%) to'q-qizil kartada. Pastda qizil banner: "✗ BUNDAY QAROR UMUMAN MAVJUD EMAS. AI O'YLAB TOPDI."

**Speaker notes:**
(ekranga qarab) Tasavvur qiling, kredit bo'limi xodimi chat-botdan shunday savol so'radi. Bot nima deydi? 

O'qiymiz: *"Markaziy Bank №427-sonli qarori bo'yicha... koeffitsiyent 14,5% ga oshirildi. 1-iyundan kuchga kiradi."*

Qanday jaranglayapti? Juda ishonarli. Hujjat raqami, sana, aniq foiz bor. Hatto byurokratik tilda chiroyli yozilgan.

(zaldagilarga qarab) Faqat bitta muammo bor. (tugmani bosing, xato banneri chiqsin) Bunday qaror tabiatda yo'q. Uni AI hozirgina o'ylab topdi. Uyalmasdan. Agar shu ma'lumot mijozga ketsa yoki kredit xulosasiga kirib qolsa nima bo'ladi? Mana shu — bizning eng katta xavfimiz.

---

## Slide 4 — Risk taxonomy

**Sarlavha:** BANKDA AI **4 TA XAVF** TUG'DIRADI.
**Lead matn:** Ko'rinmaydigan xavf — boshqarib bo'lmaydigan xavf. Avval ularni nomlay olish kerak.

**Vizual elementlar:**
4 ta xavf kartasi: Ma'lumot oqishi, Gallyutsinatsiya, Bias, Regulyator buzilishi.

**Speaker notes:**
Xavfni yengish uchun avval uni nomlash kerak. AI bankka kelganda 4 xil bosh og'rig'i olib keladi.

1. **Ma'lumot oqishi.** Mijoz ismini himoyalanmagan kanal orqali to'g'ridan-to'g'ri OpenAI'ga yuborsak nima bo'ladi? Bank siri buziladi. Ertasi kuni muammo.
2. **Gallyutsinatsiya.** Boyagi ko'rganimiz. AI'ning qonun to'qib chiqarishi.
3. **Bias (noxolislik).** Skoring modelimiz nega aynan shu mijozga "yo'q" dedi? Misol: AQShda bir bank kartasi xotin-qizlarga erlariga qaraganda 10 baravar past limit bergan — sabab tushuntirib berolmadi. AI o'zi bilmagan namunani o'rganib qoladi.
4. **Regulyator buzilishi.** MB inspektori kelib qanday qaror qilganingizni so'rasa, "AI shunday dedi" deb qutulolmaysiz. Audit izi yo'qmi — jarima.

Bugun asosan birinchi va ikkinchi xavfni texnik jihatdan qanday yopishni ko'ramiz.

---

## Slide 5 — Dictionary (Hallucination + Data Masking)

**Sarlavha:** IKKI SO'Z — MUVOFIQLIKNING **POYDEVORI**.
**Chip:** BANKIR UCHUN AI LUG'ATI · 3-MODUL
**Lead matn:** Bu ikki atama keyingi slaydlarda qayta-qayta uchraydi. Bir marta tushunsak — yengil bo'ladi.

**Vizual elementlar:**
Ikkita lug'at kartasi: HALLUCINATION va DATA MASKING.

**Speaker notes:**
Har modulda lug'atimizni boyitib boryapmiz. Bugun muvofiqlik uchun eng muhim ikkita so'zni qo'shamiz. Bularni yodlab oling.

Birinchisi — **Hallucination**. Gallyutsinatsiya. Bu AI bilmagan narsasini "bilmayman" demay, ishonch bilan o'ylab topishi. Fakt yo'q. Bank uchun bu eng qimmat xato.

Ikkinchisi — **Data Masking**. Bu bizning qalqonimiz. Ism, karta, telefon, hisob, INN — AI'ga yetib borguncha yo'lda avtomatik tokenlarga ([ISM], [KARTA]) almashadi. Lekin muhim eslatma: masking qoidalari muntazam test qilinadi, chunki noto'g'ri sozlash bank sirini ochib yuborishi mumkin.

Shu ikki so'zni dars oxirida yana so'rayman.

---

## Slide 6 — Hallucination anatomy

**Sarlavha:** GALLYUTSINATSIYANI **RAG** SEZILARLI KAMAYTIRADI.
**Lead matn:** AI javobi tasdiqlangan manbalarga bog'lanadi. Manba topilmasa — tizim "bilmayman" deydi yoki inson tekshiruviga yuboradi. RAG nazoratni almashtirmaydi.

**Vizual elementlar:**
Solishtirish bloki. Chapda "Internet bilimi" (qizil), o'ngda "RAG bilan cheklangan" (ko'k).

**Speaker notes:**
Xo'sh, gallyutsinatsiyani qanday davolaymiz? 

Agar AI'ni o'z holiga tashlab qo'ysak, u ochiq manbalardagi noto'liq, eskirgan yoki kontekstsiz ma'lumotlarga tayanib javob berishi mumkin. MB qarorlari uchun bu umuman to'g'ri kelmaydi.

Biz o'rtaga **RAG** qo'yamiz. RAG nima? Biz AI'ga aytamiz: "Sen aqlli emassan, sen shunchaki tez o'qiydigan xodimsan. Mana senga bankning tasdiqlangan PDF hujjati. Faqat shuning ichidan ko'chirasan."

Natija? Agar mijoz yo'q qarorni so'rasa, AI hujjatdan qidiradi, topolmaydi va "Uzr, menda bu haqida ma'lumot yo'q" deydi. Yolg'on gapirish o'rniga "bilmayman" deyishni o'rgatdik.

---

## Slide 7 — Data Masking deep-dive

**Sarlavha:** DATA MASKING — AI **SHAXSIY MA'LUMOTLARNI KO'RMAYDI**.
**Lead matn:** Mijoz xabari → maskalovchi gateway → AI. Tokenlar javobda yana to'ldiriladi. AI'da hech qanday haqiqiy ma'lumot qolmaydi.

**Vizual elementlar:**
Before/After vizuali. Chapda qizil bilan belgilangan xom matn (Akmal Karimov, 8600...). O'ngda ko'k tokenlarga almashgan matn ([ISM], [KARTA_4]).

**Speaker notes:**
Endi eng nozik masala — mijoz shaxsiy ma'lumotlari.

(chapga ishora qiling) Mijoz yozdi: "Men Akmal Karimovman, 8600 bilan boshlanuvchi kartam ushlanib qoldi." Agar shuni ochiq holda tashqi AI provayderga yuborsak, qonunni buzgan bo'lamiz.

Nima qilamiz? O'rtaga "gateway" (darvoza) qo'yamiz. Bu darvoza xabarni oladi va barcha nozik joylarni tokenlarga almashtiradi. AI'ga nima boradi? (o'ngga qarang) "Salom, men [ISM], [KARTA_4] kartam ushlanib qoldi."

AI'ga mantiq kerak, u karta bloklanganini tushunadi va javob tayyorlaydi. Qaytayotganda darvoza yana ismni joyiga qo'yib mijozga beradi. Masking shaxsni aniqlovchi ma'lumotlarni AI'ga tushishdan saqlaydi — lekin qoidalar muntazam test qilinishi shart.

---

## Slide 8 — Compliance layers

**Sarlavha:** MUVOFIQLIKNING **3 QATLAMI**.
**Lead matn:** Bank AI yechimi har 3 qatlamga bir vaqtda javob berishi shart. Bitta talab bajarilmasa — proyekt to'xtaydi.

**Vizual elementlar:**
3 ta ustun: Markaziy Bank, Ichki siyosat, Xalqaro standartlar.

**Speaker notes:**
Har qanday bot yoki model ishga tushishidan oldin uchta elakdan o'tishi kerak.

Birinchisi — Markaziy Bank talablari. Bank siri qonuni, axborot xavfsizligi standartlari.
Ikkinchisi — o'zimizning ichki siyosat. Kengash tasdiqlagan qoidalar, javobgarlik matritsasi.
Uchinchisi — Xalqaro standartlar. "Bizga GDPR nima kerak" demang. Agar xalqaro kartalar (Visa/Mastercard) bilan ishlasangiz, chet el bankida vakillik hisobingiz bo'lsa yoki tashqi audit kelsa, hamkor talabi sifatida ko'tarilishi mumkin.

Bittasidan o'tolmadikmi — proyekt to'xtaydi. Shuning uchun buni arxitektura bosqichida o'ylash kerak.

---

## Slide 9 — Closed Loop Architecture

**Sarlavha:** **YOPIQ KONTUR** ARXITEKTURASI.
**Lead matn:** Foydalanuvchi xabari to'g'ridan-to'g'ri AI'ga tushmaydi. O'rtada — masking gateway, oxirida — audit log.

**Vizual elementlar:**
Jarayon chizmasi: Foydalanuvchi → Masking Gateway → AI → Audit Log.

**Speaker notes:**
Mana endi hammasini bitta rasmga yig'amiz. Buni "Yopiq kontur" deymiz.

Xodim savol yozdi. U to'g'ridan-to'g'ri AI'ga bormaydi. Avval Masking Gateway'ga kiradi — ismlar yashiriladi. Keyin toza holatda AI'ga boradi.

Lekin oxirgi qadamga e'tibor bering: **Audit Log**. Bu muvofiqlikning yuragi. Kim, qachon, nima deb so'radi va AI qanday javob berdi — hammasi yozib boriladi.

Agar 6 oydan keyin inspektor kelib "Nega bu kredit rad etilgan?" desa, "AI shunday debdi" degan gap o'tmaydi. Audit logni ochib, aniq manbani ko'rsatamiz.

---

## Slide 10 — Governance

**Sarlavha:** BOSHQARUV — KIM **JAVOB BERADI**?
**Lead matn:** "Hammamiz" degani — hech kim degani. Har AI vositasiga 4 ta aniq rol biriktiriladi.

**Vizual elementlar:**
4 ta rol kartasi: Biznes Egasi, Tasdiqlovchi, Ishlovchi, Auditor.

**Speaker notes:**
Eng katta xato — "bu IT'ning ishi" deb tashlab qo'yish. Yo'q. Har bir bot uchun 4 ta aniq odam javobgar bo'lishi shart.

1. **Egasi** — Biznes. Kredit yoki chakana xizmatlar boshlig'i. U byudjet beradi va riskni bo'yniga oladi.
2. **Tasdiqlovchi** — Risk qo'mitasi. Ular "yashil chiroq" yoqmaguncha hech narsa mijozga chiqmaydi.
3. **Ishlovchi** — Mahsulot jamoasi. Ular promt yozadi, xatolarni to'g'rilaydi.
4. **Auditor** — Ichki audit. Sizlar. Tizimni chetdan kuzatib, loglarni tekshirasiz.

Shu rollardan biri aniq belgilanmasa, loyiha bo'yicha javobgarlik, audit izi va qaror sifati zaiflashadi.

---

## Slide 11 — Risk-rating mashq

**Sarlavha:** XAVFNI **BIRGA BAHOLAYMIZ** — PAST · O'RTA · YUQORI?
**Chip:** INTERAKTIV MASHQ · ZAL OVOZ BERADI
**Lead matn:** Har senariyga zal qo'l bilan ovoz beradi: yashil — past xavf, sariq — o'rta, qizil — yuqori.

**Vizual elementlar:**
3 ta senariy kartasi. Tagida Past, O'rta, Yuqori tugmalari.

**Speaker notes:**
Endi ozgina uyg'onamiz. Men senariyni o'qiyman, siz qo'l ko'tarib ovoz berasiz: yashil — past xavf, sariq — o'rta, qizil — yuqori. Tayyormisiz?

**Senariy 1:** Operator chat-botdan yangi kredit mahsuloti shartlari haqida so'radi, bot ichki PDF qoidasidan javob berdi, mijoz ismi maskalandi.
Kim yashil deydi? Qo'llarni ko'ray. (pauza) To'g'ri, yashil. RAG bor, masking bor.

**Senariy 2:** Skoring modeli kreditni rad etdi. Lekin sababini tushuntirib bera olmadi. Qora quti.
Nima deysiz? (pauza) Ha, bu sariq-qizil. Mijoz e'tiroz qilsa, asoslab berolmaysiz.

**Senariy 3:** Marketing bo'limi mijozlar bazasini ChatGPT'ga yukladi va "segmentatsiya qilib ber" dedi. Maskalashsiz, audit logsiz.
Qani... Qizillar qo'lini ko'tarsin. (kuladi) Aynan! Bu to'liq qizil. Bank sirini ochiqchasiga buzish.

---

## Slide 12 — Common pitfalls

**Sarlavha:** ENG KO'P UCHRAYDIGAN **TUZOQLAR**.
**Vizual elementlar:**
3 ta afsona va haqiqat qatori.

**Speaker notes:**
Odamlar AI haqida ko'p afsonalarga ishonishadi. Keling, ularni tezda yo'q qilamiz.

**1-afsona:** "AI kompyuter, u hech qachon adashmaydi." 
**Haqiqat:** RAGsiz AI har kuni adashadi va yolg'on gapiradi.

**2-afsona:** "Mijoz ma'lumotini AI'ga bersak ham mayli, bu o'zimizning ichki ishimiz-ku."
**Haqiqat:** Yo'q. Mijoz ma'lumotini tashqi provayderga maskingsiz berish — bank siri qonunini buzish degani.

**3-afsona:** "Botni hozir ishga tushirib turaylik, audit logni keyin qo'shib ketamiz."
**Haqiqat:** "Keyin" degan vaqt kelmaydi. Audit log birinchi kundan ishlashi shart. Bo'lmasa inspektorga nima ko'rsatasiz?

---

## Slide 13 — Closing + Recap

**Sarlavha:** MUVOFIQLIK — **QIZIL CHIZIQ EMAS**, XAVFSIZ KORIDOR.
**Vizual elementlar:**
3 ta xulosa qatori. Pastda lug'at recap bloki.

**Speaker notes:**
Xulosa qilamiz. Muvofiqlik — texnologiyani bo'g'ish uchun emas, xavfsiz ishlatish uchun. Bizning 3 ta tayanchimiz bor:
1. Gallyutsinatsiyaga qarshi — **RAG** (hujjatdan ko'chirish).
2. Shaxsiy ma'lumot oqishiga qarshi — **Data Masking** (ism/karta/INNni yashirish, qoidalar test qilinadi).
3. Boshboshdoqlikka qarshi — **4 rol + audit log + qaror kartasi** (Go/No-Go hujjatlashtiriladi).

Endi, odatimizga ko'ra, dars boshidagi lug'atni birga qaytaramiz. Qani, zal:

**Hallucination** nima edi?
(Zal bilan birga): *AI ishonch bilan o'ylab topgan, mavjud bo'lmagan javob!*

**Data Masking** nima?
(Zal bilan birga): *Shaxsiy va bank siri ma'lumotlarni AI'ga ketishidan oldin tokenlarga almashtirish!*

Ajoyib. Arxitekturani tushundik. Endi savollar.

---

## Slide 14 — Q&A

**Sarlavha:** SIZNING **SAVOLLARINGIZ**.

**Vizual elementlar:**
Katta ko'k "?" belgisi. Pastda email: murod@mohir.dev.

**Speaker notes:**
Bizda yana 5 daqiqa qoldi. Muvofiqlik, audit loglar yoki ma'lumotlarni maskalash bo'yicha kimda qanday savollar bor? Eng qiyin savollarni hozir bering. 

(pauza, zalni kuzating)
Agar sizda "Markaziy Bank bunga qanday qaraydi?" degan savol bo'lsa — hozircha maxsus AI qoidasi yo'q, lekin standart axborot xavfsizligi bo'yicha tekshirishadi. Shuning uchun biz yopiq kontur qurdik.

Yana savollar? (javob bering)

Rahmat! Kichik tanaffusdan so'ng 4-modulda ko'rishamiz.

---

## Series-wide bog'lanish

- **Avvalgi modul:** `2_deck/` — Use case discovery (xavflar qayerdan kelib chiqishi ko'rildi).
- **Keyingi modul:** `4_deck/` — Process structuring.
- **Bog'liq:** `1_deck/` slide 11 (Security teaser) — bugun to'liq ochib berildi.
- **Bog'liq:** `9_deck/` (RAG amaliyoti) — bugun nazariy ko'rilgan RAG 9-modulda amalda quriladi.

## Tayyorgarlik checklist

- [ ] Live hallucination demo (slide 3) ishlashini tekshirish — agar jonli ko'rsatilsa, promt tayyor bo'lishi kerak.
- [ ] Risk-rating mashqidagi 3 ta senariyni yodda saqlash (slide 11).
- [ ] Zaldan ISO 27001 yoki GDPR bo'yicha savol kelsa, qisqa javob tayyorlab qo'yish (slide 8).
- [ ] QA: `screenshot.mjs` va `slide-reviewer` orqali barcha slaydlar ko'rinishini tekshirish.

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~4 daq |
| 01 · Xavflar xaritasi | 3–4 | ~10 daq |
| 02 · Gallyutsinatsiya | 5–6 | ~10 daq |
| 03 · Ma'lumot himoyasi | 7–9 | ~16 daq |
| 04 · Boshqaruv | 10–12 | ~13 daq |
| Closing + Q&A | 13–14 | ~7 daq |
| **Jami** | **14** | **~60 daq** |

## Restructure tarixi

**v2 (2026-05-10):**
- Speaker ovozi to'liq insoniylashtirildi, rasmiyatchilik kamaytirildi.
- "Samaradorlik", "optimizatsiya" kabi AI shablonlari olib tashlandi, o'rniga bankir tili (inspektor, kredit xulosasi, bank siri) kiritildi.
- Live demo va Mashq slaydlari (3 va 11) uchun zal bilan ishlash bo'yicha aniq ko'rsatmalar (beat/pause) qo'shildi.
- Slayd matnlari jonli HTML deck (`index.html`) dagi vizual va matnlarga 100% moslashtirildi.
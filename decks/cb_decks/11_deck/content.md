# 11-modul · Bank uchun sun'iy intellekt agenti dizayni — to'liq kontent

**Module:** 11-modul · Kun 2 · 14:00–15:00 (60 daqiqa)
**Format:** Dizayn seminar (design workshop)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Stack:** Telegram + Gemini audio + n8n + Google Sheets/Drive
**Paired bot:** [`bots/02_voice_memo/`](../bots/02_voice_memo/) — voice memo → CRM
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **STT**, **Function Calling / Schema** — slide 5 da kiritiladi, slide 17 da recap

> Asosiy g'oya: bankir 15 sekundlik ovoz yozadi — bot uni transkript qiladi, schemaga moslab CRM'ga yozadi. Bugun pipelineni paper'da loyihalaymiz; ertaga (12-modul) kodga aylantiramiz.

---

## Slide 1 — Title

**Sarlavha:**
Bank uchun **AI agenti dizayni.**

**Chip:**
Kun 2 · 14:00 — 15:00

**Tagline:**
Voice memo → CRM. Bankir gapiradi — bot to'ldirib qo'yadi.

**Speaker notes:**
Tushlikdan keyingi sessiya — energiyasini ko'taring. Ayting: "Bugungi modul ma'ruza emas, dizayn seminari. Siz ekranda yozasiz, men yozdiraman. 60 daqiqadan so'ng siz o'z bo'limingiz uchun voice bot schemasini olib chiqasiz." 10-modulda agent tushunchasini ko'rgandik (Agent + Tool Use), endi aniq use case ustida ishlaymiz: **voice memo → CRM**. Shu bot 12-modulda kod bilan terib chiqiladi.

---

## Slide 2 — Agenda

**Sarlavha:**
Mavzuning **yo'l xaritasi**.

**Eyebrow:**
Agenda

**4 faza (2×2 grid):**

1. **01 — Voice bot** · ~9 daq · slaydlar 3–4
   Nima uchun voice memo? Live demo bilan boshlaymiz, qog'oz forma vs ovoz farqini ko'ramiz.

2. **02 — STT** · ~10 daq · slaydlar 5–6
   Ovoz qanday matnga aylanadi? Whisper, Gemini, ElevenLabs — tanlov mezonlari.

3. **03 — Schema** · ~17 daq · slaydlar 7–11
   AI'ga aniq formatdagi JSON yozishga majbur qilish. 4 ta qoida, real bank misol.

4. **04 — Birga loyihalash** · ~24 daq · slaydlar 12–18
   Sifat, privacy, va eng asosiysi: stol bo'yicha o'z bo'limingizga moslab schema yasash.

**Speaker notes:**
4 fazani 30 soniyada o'tib keting. Auditoriyaga ayting: "Eng katta blok — schema. Bu modulning ruhi shu yerda." Card'larni bossangiz keyingisiga o'tadi.

---

## Slide 3 — Hook · Live voice memo demo

**Sarlavha:**
Bankir gapiradi — **bot eslab qoladi**.

**Chip:**
Live demo · 15 sek

**Vizual:**
Chap tomonda Telegram voice waveform mockupi (siniqdagi to'lqin). O'ng tomonda transkript va CRM rowi paydo bo'ladi.

**Demo skripti (italik, accent border):**
> "Aliyev Vali bilan uchrashdim. Avtokredit so'ramoqda, 200 million so'm, 12 oy. Garov sifatida o'z kvartirasini taklif qildi. Hujjatlarni ertaga olib keladi. Mijoz xushmuomala, qiziqishi yuqori."

**Bot javobi (kichik dark card):**
```
✓ Saqlandi · Meeting #M-20260508-A4
Mijoz: Aliyev Vali
Qaror: avtokredit so'rovi (200M / 12 oy / kvartira garov)
Keyingi qadam: hujjatlarni qabul (2026-05-09)
Kayfiyat: qiziqish yuqori
```

**Speaker notes:**
Modulning emotsional cho'qqisi — auditoriyaga ko'zlari bilan ko'rsating. Telefoningizdan voice yuboring. 15 soniya kuting. Sheetda yangi qator paydo bo'ladi. Ayting: "Bankir uyga qaytayotib gapirdi — qaytib forma to'ldirmadi. Mana, butun pipelineni keyingi 50 daqiqada paper'da quramiz." 9-modulda RAG matn ustida ishladi; bu bot esa **ovoz ustida** ishlaydi — kursning yagona audio modaliyati.

---

## Slide 4 — Voice memo muammosi

**Sarlavha:**
Avval **15 daqiqa**.<br>Hozir **15 sekund**.

**Lead:**
Ko'pchilik bankir uchrashuvdan keyin stoliga qaytib, formani xotirasidan tiklab yozadi. Yo'lda kelgan paytdagi tafsilotlar — yo'qoladi yoki tartibsiz tushadi.

**Compare 2-ustun:**

| Avval (qog'oz forma) | → | Hozir (voice memo) |
|---|---|---|
| 📋 Stolda 15 daq yozish | | 🎙 Yo'lda 15 sek gapirish |
| Esdan chiqqan tafsilot | | Real vaqtda yodga keladi |
| 1 hafta kechikib kiritish | | Shu daqiqada CRM'da |

**Speaker notes:**
Pain point'ni og'riqlik bilan ayting — bu sizning bo'limingizdagi haqiqat. Sukunatda 5 sekund kuting. Keyin: "Voice memo o'zi yangilik emas — Telegram, WhatsApp'da uzoq vaqtdan beri bor. Yangilik shundaki, AI bu ovozni endi **strukturali ma'lumotga** aylantirib bera oladi. Mana shu farqdan boshlaymiz."

---

## Slide 5 — Lug'at · STT + Function Calling/Schema

**Chip:**
Bankir uchun AI lug'ati · 11-modul

**Sarlavha:**
Ikki so'z — agentning **eshituv va xotirasi**.

**Lead:**
Bu modulda yangi 2 atama. Voice bot ularsiz qurilmaydi. Hozir bir marta tushunsak — keyingi 13 slayd silliq o'tadi.

**2 ta dict-card (`.dict.dict-2`):**

- **STT** — *Speech-to-Text · Ovozni matnga aylantirish*
  Telegramdagi 15 sekundlik ovozni 2 jumla **matnga** aylantiradigan AI modeli. Misol: **Whisper** (OpenAI), **Gemini Flash** (Google).

- **Schema + Function Calling** — *forma qoidasi + model JSON qaytarish usuli*
  **Schema** — CRM uchun maydonlar ro'yxati va qoidasi. **Function Calling** — model shu qoidaga mos JSON qaytarishi uchun ishlatiladigan texnik usul. Validatsiya bo'sh yoki noto'g'ri maydonni aniqlaydi.

**Speaker notes:**
STT — "speech to text"ning qisqartmasi. "Stitch" deb o'qiladi. Sodda misol: "Telegram'dagi mikrofon tugmachasini bossangiz, 'aslida menga shunday deding' degan yozuv chiqadi — STT shu vazifani bajaradi."

Schema — bu eng muhim atama. Aytib bering: "AI'ga 'fikrlangan javob ber' deyishimiz mumkin, lekin biz bank ekanmiz, **aniq forma kerak**. 'Mijoz F.I.SH., qaror, keyingi qadam' — har biri alohida ustun. Schema — shu formaning qoidasi. AI undan chiqib keta olmaydi."

17-slaydda (closing) jamoa bilan birga aytamiz: "STT — ovoz → matn. Schema — AI'ga forma majburligi."

---

## Slide 6 — STT modellari

**Sarlavha:**
Qaysi quloqni **tanlaymiz**?

**Lead:**
3 ta yetakchi STT modeli. Har birining kuchli tomoni va narxi bor. Bank uchun tavsiya — pastda.

**3 ta `.sec` item:**

- 🎙 **Whisper** (OpenAI)
  Ochiq kodli, eng keng tarqalgan. O'zbek tilini o'rta darajada tushunadi. Self-host mumkin — yopiq konturda saqlanadi.

- ✨ **Gemini Flash** (Google)
  Audio formatni to'g'ridan-to'g'ri tushunadi. Bugungi seminar demosi shu model ustida ko'rsatiladi. n8n bilan tabiiy bog'lanadi.

- 🎯 **ElevenLabs Scribe** (premium)
  Premium yo'l. Speaker diarization (kim gapirganini ajratish) imkoniyati. Murakkab uchrashuvlar uchun.

**Yakuniy qator (italik, mute):**
→ Bank tanlovi 4 mezon bilan: o'zbek nutq sifati, ma'lumot qayerda qayta ishlanadi, treningga kirmaslik bandi, ichki tizimga ulash qulayligi.

**Speaker notes:**
Avval Whisperdan boshlang — bu sohaga kirgan har kim eshitgan. Keyin Gemini'ning ustunligini ayting: lahja, banking terminlari, n8n native node. ElevenLabs — premium, kerak emas (lekin nomi eshitildi). Aniq tavsiya bering: **Gemini Flash**. Sababi 3 ta: arzon, Uzbek tushunadi, kursda biz Gemini stack ustida ishlaymiz (1-modul slide 9 — Stack). 1 daqiqalik ovoz Gemini'da ~0.6 tiyin turadi.

---

## Slide 7 — Voice bot arxitekturasi

**Sarlavha:**
**5 bosqich** — Telegramdan CRM'gacha.

**Lead:**
Foydalanuvchi 1 ta tugmacha bosadi. Pastda — 5 ta avtomatik bosqich. Hech qaysisi tashlab ketilmaydi.

**`.flow` 5-step (markazgisi `.brain`):**

1. 📱 **Telegram** — bankir ovozli xabar yuboradi
2. → 🎙 **STT** — Gemini ovozni o'zbekcha matnga aylantiradi
3. → 🧠 **Ma'lumot ajratish (Ekstraksiya)** — Gemini schema asosida JSON ajratib oladi
4. → ✓ **Validatsiya** — ma'lumot turi va majburiyligi tekshiriladi
5. → 📊 **CRM** — Sheets'ga yoziladi, bankirga tasdiq keladi

**Speaker notes:**
Diagrammani chap → o'ng o'qib bering. Har bosqichda nima xato bo'lishi mumkinligini eslating: STT noto'g'ri eshitsa, ekstrakt bo'sh maydon qaytarsa, validatsiya tushib ketsa. Lekin bu 12-modul mavzusi (debugging). Bugun: "**bizning ishimiz schemani to'g'ri loyihalashdir**. Qolgan bosqichlar uning ustiga turadi."

3-bosqich (Ma'lumot ajratish / Ekstraksiya) — bu Function Calling. AI'dan matn emas, **JSON** so'raymiz. Schema'siz bo'lsa, AI bo'sh erkin matn qaytaradi — CRM'ga tushmaydi.

---

## Slide 8 — Schema dizayn · JSON shabloni

**Sarlavha:**
Schema — AI uchun **forma chizig'i**.

**Lead:**
Bu 8 ta maydon — kredit bo'limining uchrashuv hisoboti. AI har birini majburiy to'ldiradi yoki "null" qaytaradi.

**`.template-box` (JSON):**
```
{
  "customer_name": "<F.I.SH yoki kompaniya>",
  "customer_id_hint": "<STIR / pasport / telefon yoki null>",
  "decision": "<1 jumla, uchrashuv natijasi>",
  "follow_up": "<1 jumla, keyingi harakat>",
  "next_step_date": "<ertaga | kelasi hafta | YYYY-MM-DD | null>",
  "sentiment": "<positive | neutral | negative>",
  "tags": ["kredit", "avtokredit", "garov-kvartira"],
  "notes_extra": "<1-2 jumla, qo'shimcha eslatma>"
}
```

**Tpl-hint:**
→ Har maydon **majburiy** yoki **null**. AI hech qachon "tushunmadim" deb gapni qoldirib keta olmaydi.

**Speaker notes:**
JSON ko'rinishidan qo'rqitmang — 5-modulda promt strukturasini ko'rgandik, 6-modulda template'larni. Bu — agent uchun template. Har qatorni o'qib bering:

- `customer_name` — "F.I.SH **yoki** kompaniya nomi". Yumshoq.
- `customer_id_hint` — "agar ovozda STIR yoki pasport aytilgan bo'lsa, qo'shadi. Aytilmasa — null". Hech qachon o'ylab topmaydi.
- `decision` va `follow_up` — har biri 1 jumla. Qattiq cheklov: AI 3 paragraf yozsa — schema rad qiladi.
- `next_step_date` — qiziqarli: AI "ertaga" yoki ISO sana qaytaradi. Keyin code 9V ("ertaga" → 2026-05-09) hisoblaydi. Bu — 12-modulda chuqur ko'riladigan **deterministic post-processing**.
- `sentiment` — uchta variantdan biri. Boshqa hech narsa.
- `tags` — bo'sh array yoki ro'yxat.

8 ta maydon — bizning kredit team. Boshqa bo'limlar uchun maydonlar boshqacha — slide 10 da.

---

## Slide 9 — Schema dizayn · 4 ta qoida

**Sarlavha:**
Schema yozishning **4 ta qoidasi**.

**Lead:**
Yaxshi schema — yaxshi bot. 4 ta qadamni izchil bajaring, keyin AI hech qayerga sirg'alib chiqmaydi.

**`.road.road-4`:**

1. **Maydonni nomlash** · `snake_case`
   Inglizcha, qisqa, aniq. `customerName` emas, `customer_name`. JSON standart.

2. **Tipni belgilash** · string · int · enum · array · date
   Har maydon **bitta** tipga tegishli. Aralashtirib bo'lmaydi. `sentiment` faqat enum (3 qiymat).

3. **Required vs optional** · majburiy yoki nullable
   Hech qaysi maydon shunchaki "balki" bo'lmaydi. Yo majburiy, yo `null` qabul qiladi. Ko'pchilik xato shu yerda bo'ladi.

4. **Misol berish** · har maydon uchun 1 ta misol
   AI misoldan o'rganadi. Promt'da 2–3 to'liq JSON misoli bering — model shu shablonni asos qilib, mos qaytaradi.

**Speaker notes:**
4 ta qoida — yodda saqlash uchun. Nomi/Tipi/Majburiy/Misol. Har qoida uchun 30 soniya:

- **Nom**: snake_case nima ekanligini ayting. Inglizcha bo'ladi sababi: AI modellari ko'pi inglizchada o'qitilgan, snake_case ularga "tabiiy" tuyuladi.
- **Tip**: `sentiment` faqat 3 qiymat — bu enum. AI "ehtimol salbiy" deb bo'sh javob qaytarsa, validatsiya rad qiladi.
- **Required**: bankirlar uchun yo'l xaritasi — har maydonda "bu majburiymi?" degan savolni bering.
- **Misol**: 5-modul (few-shot prompting)ning to'g'ridan-to'g'ri davomi. AI primer'siz yomon ishlaydi.

---

## Slide 10 — Banking misol · Kredit bo'limi

**Sarlavha:**
Real misol — **kredit uchrashuvi**.

**Lead:**
Aliyev Vali ovozi → 8 maydonli JSON. Har maydon ovozda qaysi so'zdan keladi — pastda.

**`.benefits-4` 8 cell — 2 row x 4 (lekin 4-card grid bilan 8 ta yopib chiqamiz, har biri kichik). Yoki 2-column compare format:**

Chap (audio quote, italik):
> "**Aliyev Vali** bilan uchrashdim. **Avtokredit** so'ramoqda, **200 million so'm, 12 oy**. **Garov sifatida o'z kvartirasini** taklif qildi. **Hujjatlarni ertaga** olib keladi. Mijoz **xushmuomala, qiziqishi yuqori**."

O'ng (4 ta benefit-card grid: maydon → qiymat):
- `customer_name` → "Aliyev Vali"
- `decision` → "avtokredit 200M / 12 oy / kvartira garov"
- `follow_up` → "ertaga hujjatlarni qabul qilish"
- `next_step_date` → "ertaga" → 2026-05-09 (tizim aniq sanani hisoblaydi)
- `sentiment` → "positive"
- `tags` → ["kredit", "avtokredit", "garov-kvartira"]
- `customer_id_hint` → null (aytilmagan)
- `notes_extra` → "mijozning qiziqishi yuqori"

**Speaker notes:**
Bu slayd schemaning real qiymatini ko'rsatadi. Audio quote'ni o'qib bering, har bo'rttirilgan so'z qaysi maydonga tushishini ko'rsating. **`customer_id_hint` = null** — bu muhim: AI "aytilmagan" deb tan oladi, **hech narsa o'ylab topmaydi**. 1-modul slayd 7 (Can/Cannot)ni eslating: AI o'ylab topmaydi, **ko'chiradi**.

Boshqa bo'limlar uchun schema o'zgaradi:
- **Depozit**: `deposit_amount_hinted`, `currency_hinted` qo'shiladi
- **HR**: `customer_name` o'rniga `candidate_name`, `position_discussed`, `salary_hinted`
- **Muvofiqlik**: `incident_summary`, `severity`, `parties_involved`

5 ta universal maydon (`customer_name`, `decision`, `follow_up`, `next_step_date`, `sentiment`) hamma bo'limda saqlanadi. Qolganlari moslanadi. Bu — slide 15-16'dagi mashqning poydevori.

---

## Slide 11 — Schema validatsiya

**Sarlavha:**
Schema'siz — **chala ma'lumot**. Schema bilan — **toza CRM**.

(Sarlavha-da "kirish" emas, "ma'lumot" — bankir tilida tabiiyroq.)

**Lead:**
Validatsiya — bot va CRM o'rtasidagi qattiq filtr. Schema'ga tushmagan ma'lumot CRM'ga yetib bormaydi.

**`.compare` 2-ustun:**

| Schema'siz (xato yo'l) | → | Schema bilan (to'g'ri yo'l) |
|---|---|---|
| AI erkin matn qaytaradi | | AI qat'iy JSON qaytaradi | 
| "Mijoz nomi: ehtimol Aliyev" | | `customer_name: "Aliyev Vali"` |
| `decision` bo'sh, sentiment "yaxshi" | | Validatsiya rad qiladi, inson tasdig'iga |
| Qo'lda tozalash ko'p | | Bir xil format, audit oson |

**Speaker notes:**
Schema'siz pipeline 1 hafta yaxshi ishlaydi, keyin chalkashlik boshlanadi: "Mijoz Aliyev mi, Aliyev Vali mi, V. Aliyev mi?" — har xil yoziladi. CRM'da qidirib bo'lmaydi. Schema bilan: AI maydonni majburan to'ldiradi yoki `null` qaytaradi. **null — bu axborot**, bo'sh joy emas. Operator ko'radi va tuzatadi.

Foiz raqamlar slaydga qo'yilmaydi — pilot natijasidan keyin o'lchanadi va aytiladi.

---

## Slide 12 — STT xato turlari

**Sarlavha:**
STT qachon **to'g'ri**, qachon **adashadi**?

**Lead:**
Avtomat sistema sehrli emas. Kuchli tomoni va chegarasini bilmasak — ishonch buziladi.

**`.cando` 2-ustun:**

✓ **To'g'ri eshitadi:**
- Tinch xonadan 5–60 sek aniq nutq
- Adabiy o'zbek tili (rasmiy uchrashuv)
- Bank terminlari (kredit, foiz, garov, depozit)
- Ko'p ishlatiladigan ism-familiyalar
- Pauzali, tartibli gap

✗ **Xato qiladi:**
- Shovqinli muhit (ko'cha, mashina ichi)
- Ikki kishi bir paytda gapirganda
- Pasport seriyasi yoki hisob raqami harf-harf aytilganda
- Lahja yoki sheva — qishloq nutqi
- 60 sekunddan uzun nutq, mavzu tarqoq bo'lganda

**Speaker notes:**
Bu slayd 1-modul slide 7 (Can/Cannot)ning davomi. Banking terminlari aslida **yaxshi ishlaydi** — Gemini ko'p o'qigan. Lekin **raqamli identifikatorlar** (pasport seriyasi: AB1234567) — yomon. Sababi: AI ovozni harf-harf eshitishni bilmaydi, u "kontekstual" eshitiydi.

Praktik tavsiya: **muhim raqamlarni ovozga aytmang**. Uchrashuvdan keyin alohida tugmachada qo'l bilan kiriting. Voice memo — kontekst + qaror; raqamlar — operator panelda.

---

## Slide 13 — Privacy & compliance

**Sarlavha:**
Mijoz ovozi — **bank siri**.

**Lead:**
Voice memoda mijoz nomi, ehtimol pasport raqami, foiz miqdori bor. Qayerda saqlanadi, qancha vaqt, kim eshita oladi — har savolga aniq javob.

**`.sec` 3-card:**

- 🔒 **Saqlash konturi**
  Audio va transkript bankning tasdiqlangan bulut konturida saqlanadi. Tashqi API ishlatilsa — DPA, ma'lumot qayerda saqlanishi (data residency) va ruxsatli rollar alohida hujjat bilan tasdiqlanadi.

- ⏱ **Saqlash muddati**
  Audio, transkript va CRM qatori uchun retention muddati bank siyosatida belgilanadi. Avtomat o'chirish — alohida jarayon.

- 👤 **Kim eshitadi**
  Faqat ruxsatli rollar. Inson eshitishi audit so'rovi orqali, har bir kirish log'ga yoziladi. Modelni o'qitish (trening) uchun yuborilmaydi (opt-out).

**Yakuniy qator (italik, mute):**
→ 3-modul (muvofiqlik) Data Masking texnikasini batafsil ko'rib chiqgan — shu qoida voice memo'ga ham tushadi.

**Speaker notes:**
Muvofiqlik xodimini bu slaydda **ko'zga qarang** — sizning savollaringizni kuting. Aniq raqamlar: 90 kun audio, 1 yil transkript, indefinite CRM (mijoz munosabati davomida). 

3-modul slide 11 (Yopiq Kontur, Zero-Training, Data Masking) — shu yerda qaytib chiqadi. Voice memo CRM'ga tushgandan so'ng PII (mijoz nomi, pasport raqami) avtomat masking bilan tozalanishi mumkin — bank ichki siyosatiga qarab.

Eng muhim: "Audio bank tenant'idan **chiqmaydi**. Gemini API o'sha tenant ichida ishlaydi (Vertex AI Workspace). Tashqi OpenAI / Whisper API ishlatmaymiz — chunki ular bank kontur'idan tashqarida."

---

## Slide 14 — Tayyor template · bot folder

**Sarlavha:**
**Tayyor pipeline** — tayyor loyiha papkasi.

**Lead:**
Bu botning to'liq dizayni allaqachon yozilgan: workflow grafi, schema, prompt, conversation flow. Kursning "bots" papkasida — siz ko'rib, keyin moslab olasiz.

**Vizual:** terminal-styled `.template-box` yoki schematic:

```
bots/02_voice_memo/
  ├─ README.md                  ← bu bot nima qiladi
  ├─ design/
  │   ├─ conversation-flow.md   ← user → bot dialog
  │   ├─ workflow-graph.md      ← n8n 11 node graph
  │   └─ data-schema.md         ← Sheets layout, JSON
  └─ prompts/
      └─ extraction-prompt.md   ← Gemini system prompt
```

**Tpl-hint:**
→ 12-modulda biz shu folder'ni ochib, n8n'da node-by-node quramiz.

**Speaker notes:**
Auditoriyaga ayting: "Sizning vazifangiz **noldan o'ylab topish emas**. Kursning ekipazhi sizga to'liq dizayn berdi — siz uni o'z bo'limingizga moslaysiz." Folder yo'lini ekranda ko'rsating: `decks/cb_decks/bots/02_voice_memo/`. README + 4 ta dizayn fayli + prompt — hammasi bor. 12-modul (ertangi) bu folder'ni yopiq tizimga aylantiradi.

Bu slayd 15-16'gacha bo'lgan ko'prik: "Endi siz o'z stol uchun dizayni boshlaysiz. Tayyor schema'ni boshlang'ich nuqta sifatida ishlatishingiz mumkin."

---

## Slide 15 — Dizayn mashqi · 3 ta savol

**Chip:**
Dizayn mashqi · stol bo'yicha · 12 daq

**Sarlavha:**
Sizning bo'limingiz uchun **voice bot**.

**3 ta savol (`.q` raqamli):**

1. **01** — Sizning bo'limingizda **qanday voice memo** ko'p uchraydi? (kim, qachon, qaysi vaziyatda gapiradi?)
2. **02** — Schema'da **qaysi 5 ta maydon** majburiy? (bo'limga moslab — kredit / depozit / HR / muvofiqlikka)
3. **03** — Ma'lumot qachon to'g'ridan-to'g'ri **CRM'ga**, qachon avval **menejerga** tushadi? (validatsiya yoki eskalatsiya qoidalari)

**Yakuniy qator:**
→ 12 daqiqa stol ichida muhokama. Keyingi slaydda canvas to'ldiramiz.

**Speaker notes:**
3 ta savol — har stol uchun. Stollarni 4–5 odamli guruhlarga taqsimlang (oldindan tayyorlangan): Kredit / Depozit / HR / Muvofiqlik / Operatsion. Har stol o'z bo'limidan kelib chiqib javob beradi. 12 daqiqa — qatiy.

Birinchi savol — use case'ni topish. "Uchrashuv hisoboti — bu kredit team uchun. HR uchun ehtimol intervyu summary. Muvofiqlik uchun — incident report."

Ikkinchi — schema. 5 ta universal maydondan boshlash mumkin (slide 10), keyin 1-2 ta o'z maydonini qo'shish.

Uchinchi — bu slide 11 (validatsiya)ning kengaytmasi. **Sentiment "negative"** + **tag "shikoyat"** — to'g'ridan-to'g'ri menejerga. Boshqa hollarda CRM.

---

## Slide 16 — Schema canvas · worksheet

**Chip:**
Stol bo'yicha · 8 daq · canvas to'ldirish

**Sarlavha:**
**Schema canvas** — 4 katak, 2 jumla.

**`.canvas-grid` 2x2:**

- 🎙 **Use case** — Sizning bo'limda qaysi voice memo? (1 jumla)
- 📋 **5 maydon** — Kerakli 5 ta JSON maydoni (har biri bitta so'z)
- ⚙️ **Validatsiya** — Qaysi maydon majburiy, qaysi nullable? (qisqa)
- 🚨 **Eskalatsiya** — Qachon menejerga jo'natiladi? (1 shart)

**Yakuniy qator (italik):**
→ 8 daqiqadan so'ng 2 ta stol o'z canvas'ini auditoriyaga taqdim etadi.

**Speaker notes:**
Canvasni A4 qog'ozda zalda tarqating (yoki ekranda ko'rsating). Stollar to'ldirib bo'lgach, **2 ta stolni** taklif qiling — biri eng ko'p kutilgan use case, biri eng kam kutilgan. Har biri 90 sekund — qisqartiring.

Auditoriya yodga olib qolish kerak: schema **bitta to'g'ri javob emas** — bu sizning bo'limingiz uchun moslangan vosita. Mahsulot menejerlik mahorati (use case → spec) shu yerda ishlaydi.

12-modulda guruh (yoki bitta volunteer) shu canvas'ni n8n workflowga aylantirishni ko'radi. Bugun — kog'oz; ertaga — ishlaydigan tizim.

**Tayyorgarlik:**
- 5 ta bo'sh canvas A4 (4 katakli) zalda
- Markerlar
- Backup: ekranda raqamli versiya (FigJam / Miro) agar qog'ozsiz bo'lsa

---

## Slide 17 — Closing · 3 xulosa + lug'at recap

**Sarlavha:**
O'zimiz bilan **olib ketadigan** 3 xulosa.

**3 ta xulosa (close-row):**

- 💡 **Voice memo — bu pipeline**, bitta promt emas. Telegram → STT → ekstraksiya → schema → CRM. Har bir bo'g'in — dizayn qarori.
- 💡 **Schema — agentning ruhi**. Yaxshi schema CRM yozuvini bir xil formatda saqlaydi; shubhali holat inson tasdig'iga ketadi.
- 💡 **Pilot qarori bilan chiqamiz** — har stol 1 betlik hujjat: use case, 5 maydon, retention, menejer tasdig'i. Tayyor template `bots/02_voice_memo` papkasida.

**Lug'at recap (interaktiv, 30–60 sek):**
> "Eslay olasizmi?"
- **STT** = … (jamoa: "Speech-to-Text — ovozni matnga aylantirish")
- **Schema / Function Calling** = … (jamoa: "model JSON formatdagi maydonlarni qoidaga mos qaytarishi")

**Speaker notes:**
3 xulosa — bugungi modulning emotsional yopilishi. Har biriga 10–15 sekund. Lug'at recap — `cb_decks/CLAUDE.md`ning qattiq talabi. Auditoriyaga so'rang, ulardan javob keling, jamoa bilan birga aytamiz. Kursning oxirida 15-modulda 30+ atamani recap qilamiz — har modul uchun shu pattern.

12-modul ko'prik tashlang: "Ertaga shu botni n8n'da hard-build qilamiz. Sizning canvas'lar — boshlang'ich nuqta bo'ladi."

---

## Slide 18 — Q&A

**Sarlavha (markazlashgan):**
Sizning **savollaringiz**.

**Tagline:**
Schema, STT, privacy, validatsiya — marhamat.

**Kontakt:**
murod@mohir.dev

**Speaker notes:**
3–5 daqiqa. Tipik savollar:

- "STT'da Russian + Uzbek aralash gap — ishlaydimi?" → Gemini ha, Whisper murakkab.
- "Voice memo uzun bo'lsa-chi (3–5 daqiqa)?" → Pipeline'da chunking — mavzu 12-modul.
- "Mijoz pasport raqamini aytsa, schema'ga tushadimi?" → `customer_id_hint` maydoni hint sifatida; PII masking bilan keyingi qadam.
- "Schema'ni o'zgartirish kerak bo'lsa, butun bot qayta yoziladi?" → Yo'q, faqat prompt + Sheet column. Iteration — 14-modulda.

Muvofiqlik savoli kelsa — slide 13'ga qaytib, Vertex AI Workspace + Zero-Training shartnomasini eslating. 3-modulga ko'prik tashlang.

---

## Series-wide bog'lanish

- **Avvalgi modul:** [`10_deck/`](../10_deck/) — Agentlar tushunchasi (Tool Use, ReAct)
- **Keyingi modul:** [`12_deck/`](../12_deck/) — Pipeline va Idempotent design (shu bot debugging)
- **Muvofiqlik:** [`3_deck/`](../3_deck/) — Data Masking, Hallucination
- **RAG bilan farqi:** [`9_deck/`](../9_deck/) — RAG matn ustida; voice bot ovoz ustida
- **Promt engineering:** [`5_deck/`](../5_deck/) — few-shot, schema misol, CoT

## Series-wide terminologiya talab

`cb_decks/CLAUDE.md` ga qarang. 11-modulning hissasi: **STT, Function Calling/Schema** (slide 5 da kiritildi, slide 17 da recap). 12-modul: Pipeline + Idempotent design.

## Tayyorgarlik checklist (deck'dan tashqari)

- [ ] Voice memo demo bot ishlab turibdi (Telegram + Gemini Flash + n8n + Sheets + Drive)
- [ ] Demo audio: Aliyev Vali / avtokredit / 200M / 12 oy / kvartira garov / ertaga
- [ ] Backup: agar audio o'tmasa, ekrandan transcript + JSONni o'qib ko'rsatish
- [ ] 5 ta bosh canvas worksheet (A4) — slide 16
- [ ] Markerlar zalda
- [ ] `bots/02_voice_memo/design/data-schema.md` ochiq tab — slide 10 va 14 uchun
- [ ] Vazirlik logotiplari `_shared/` da
- [ ] QA: orchestrator screenshot.mjs run qiladi (ishtirokchi ham emas)

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Voice bot | 3–4 | ~9 daq |
| 02 · STT | 5–6 | ~10 daq |
| 03 · Schema | 7–11 | ~17 daq |
| 04 · Sifat va privacy | 12–13 | ~6 daq |
| 05 · Birga loyihalash | 14–18 | ~15 daq |
| **Jami** | **18** | **~60 daq** |

# 12-modul · Murakkab sun'iy intellekt jarayonlari — to'liq kontent

**Module:** 12-modul · Kun 2 · 13:00–14:00 (60 daqiqa)
**Format:** Namoyish + tahlil
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar:** **Pipeline**, **Idempotent design** — slayd 5 da kiritiladi, slayd 17 da recap
**Paired bot:** [`bots/01_classifier_bot/`](../bots/01_classifier_bot/) — 9-modulda qurilgan klassifikator bot

> Asosiy g'oya: 9-modulda biz klassifikator botni qurdik (Telegram + Gemini + Sheets, 7 ta node). 12-modul shu botni **production darajasiga ko'tarish** uchun nima kerakligini ko'rsatadi — bitta promtga emas, ko'p bosqichli pipeline'ga aylantiramiz; har bosqichni log qiladigan, qayta ishga tushirilsa ham xato qilmaydigan tizim yaratamiz.

---

## Deck outline (18 slide)

| # | Sarlavha | Format / urg'u | Vaqt | Faza |
|---|---|---|---|---|
| 1 | Murakkab AI jarayonlari — pipeline va debug | Title | ~1.5 daq | — |
| 2 | Mavzuning yo'l xaritasi | Agenda — 4 faza | ~1.5 daq | — |
| 3 | Bitta promt yetmaydi | Hook · compare-rich | ~4 daq | 01 Pipeline |
| 4 | Nima uchun pipeline — uch sabab | benefits 3-card | ~3 daq | 01 Pipeline |
| 5 | **YANGI:** Pipeline + Idempotent design | dict.dict-2 | ~3 daq | 01 Pipeline |
| 6 | "2 marta xat" muammosi | compare-rich | ~3 daq | 01 Pipeline |
| 7 | Klassifikator bot — 7 bosqichli pipeline | flow flow-6 (7 step) | ~5 daq | 02 Klassifikator tahlili |
| 8 | Har bosqich — o'zining xato turi | benefits-4 | ~4 daq | 02 Klassifikator tahlili |
| 9 | Logging — qora qutini oydinlashtirish | template-box log | ~4 daq | 03 Debugging |
| 10 | Replay — to'xtagan joydan davom | compare | ~3 daq | 03 Debugging |
| 11 | Pipeline + narx — uch qoida | benefits 3-card | ~3 daq | 03 Debugging |
| 12 | Branching — shoshilinch vs oddiy | branch diagram | ~4 daq | 03 Debugging |
| 13 | Eng tipik xatolar | myth 4-row | ~4 daq | 03 Debugging |
| 14 | Bug-hunt mashq — log topamiz | s-brain + log | ~6 daq | 04 Amaliyot |
| 15 | Debug checklist · 6 ta savol | canvas-grid 2x3 | ~3 daq | 04 Amaliyot |
| 16 | Production tayyor — yoki tayyor emas | cando | ~3 daq | 04 Amaliyot |
| 17 | 3 xulosa + lug'at recap | s-close + recap | ~2 daq | 04 Amaliyot |
| 18 | Sizning savollaringiz | Q&A | ~5 daq | 04 Amaliyot |

---

## Slide 1 — Title

**Sarlavha:**
Murakkab **AI jarayonlari** — pipeline va debug.

**Chip:** Kun 2 · 13:00 — 14:00

**Tagline:**
Bitta promtdan ko'p bosqichli, qayta ishga tushirsa ham xato qilmaydigan tizimga.

**Speaker notes:**
Salomlashing va auditoriyani 9-modul bilan bog'lang. "9-modulda biz klassifikator botni o'z qo'limiz bilan qurdik — Telegram, Gemini, Sheets. Endi savol: bu botni qanday qilib 'doim ishlaydigan' tizimga aylantirish mumkin?" 12-modulning o'ziga xosligi: birinchi modul bo'lib, biz **xato qilishni va xatoni topishni** maxsus o'rganamiz. Bu modul "tayyor mahsulot" ko'rsatish uchun emas, "buzilgan tizim" tushunchasi uchun. Bankirlar uchun bu juda muhim — chunki real ish jarayonida xato yuz beradi, va biz uni topib, tuzata olishimiz kerak. Pauza: "60 daqiqa pipeline ham, debug ham — tayyormisiz?"

---

## Slide 2 — Agenda · "Mavzuning yo'l xaritasi"

**Sarlavha:** Mavzuning **yo'l xaritasi**.

**4 faza (2×2 grid):**

1. **01 — Pipeline** · ~13 daq
   Nima uchun bitta promt yetmaydi. Bosqichlarga bo'lish — aniqlik, tekshiruv va idempotent dizayn manbai. (slaydlar 3–6)
2. **02 — Klassifikator bot tahlili** · ~9 daq
   9-modulda qurgan klassifikator botni endi production'ga olib chiqamiz — 7 ta bosqichni bittama-bitta ochib, har birida nimani kutishni belgilaymiz. (slaydlar 7–8)
3. **03 — Debugging** · ~18 daq
   Logging, replay, idempotency, narx optimizatsiyasi va branching. Pipeline buzilsa qanday topish va qayta ishga tushirish. (slaydlar 9–13)
4. **04 — Amaliyot** · ~17 daq
   Real bug-hunt mashqi, debug checklist, production tayyorligi, yakun va Q&A. (slaydlar 14–18)

**Speaker notes:**
60 daqiqani 4 ga bo'lib ko'rsating. Bu modul boshqa modullardan biroz farq qiladi — nazariya kam, real misollar va debugging ko'p. Dasturchilar buni "ops" qismi deb atashadi; bizda — **bankirlar uchun ish jarayoni boshqaruvi**. Phase card'lar interaktiv. 60–90 soniya, ko'p turib qolmang.

---

## Slide 3 — Hook · "Bitta promt vs Pipeline"

**Sarlavha:** Bitta promt yetmaydi — chunki **bir nechta ish** qiladi.

**Chip:** Hook · 9-moduldan davom

**Lead:**
Klassifikator botingizga "matnni o'qi, tasnifla, operator tanla, Sheets'ga yoz, mijozga javob ber" deb bitta promt yozsangiz — debug qila olmaysiz. Xato qayerda ekanini bilmaysiz. Qayta ishga tushirsangiz mijozga 2 ta xat yuboradi.

**Compare-rich (2 ustun):**

- ✗ **Bitta promtli bot** · "Hammasi bir oynada"
  Xabar kirdi → Gemini "tushun, tasnifla, operator top, ariza yoz, mijozga javob ber" — bitta uzun promt. Xato yuz berdi. Qaysi bosqichda? Bilmaymiz. Qayta yuborsak, takrorlanadi.
  → Qora quti · debug imkonsiz

- ✓ **7-bosqichli pipeline** · "Har bosqich — alohida"
  Xabar → tasniflash → operatorlar ro'yxatini o'qish → operator tanlash → ariza yozish → javob shakllantirish → yuborish. Har bosqich log qoldiradi, alohida qayta ishga tushadi. Xato 5-bosqichda — faqat shu bosqichdan qaytadan ishlatamiz, oldingi natijalar saqlanib qoladi.
  → Tekshiruvchan · idempotent

**Speaker notes:**
Bu — modulning hisli boshlanishi. Bankirlarga aniq aytish: "Birinchi yondashuv ko'p texnologik kompaniyalarning xatosi — bizda xatosi qimmat. Mijozga 2 ta tasdiq xati ketishi — muvofiqlik muammosi, ishonch yo'qoladi." 9-modulda biz qurgan bot allaqachon 7 ta nodedan iborat — bu tasodif emas. Endi tushuntiramiz, **nima uchun shunday qildik**. Auditoriyaga qarang: kim "men ham bitta promtda yozardim" der ekan, kim "yo'q, bo'laklash kerak" der ekan? Reaksiyani tekshirib turing.

---

## Slide 4 — Why pipeline · "3 amaliy sabab"

**Sarlavha:** Nima uchun pipeline — uch **amaliy sabab**.

**Lead:**
Pipeline — bu shunchaki moda emas, mas'uliyatli yechim. Bank uchun har bosqich nima uchun kerakligini aniq tushunish shart.

**3 ta benefit:**

1. **Aniqroq** — har bosqich bitta vazifa qiladi. LLM faqat tasniflaydi, Code faqat operator tanlaydi. Promtlar qisqaradi, sifat ortadi. *Misol:* LLM'da xato bo'lsa — to'xtatamiz, Sheets'da xato bo'lsa — qayta urinib ko'ramiz.
2. **Tekshiruvchan** — har bosqichdan keyin natija saqlanadi. Buzilgan joyni logdan topish mumkin. Audit uchun zarur. *Misol:* muvofiqlik auditori "qaysi qadamda toifa aniqlandi?" — 5 sekundda javob.
3. **Takrorlansa ham xavfsiz** — bir mijoz xabari qayta kelsa ham Applications'da bitta yozuv qoladi, mijozga ortiqcha xat ketmaydi. Keyingi slaydda buni rasmiy atama bilan nomlaymiz. *Misol:* message_id orqali tekshiruv · keyingi slaydda batafsil.

**Speaker notes:**
Har sababga 1 daqiqa. Aniqroq — promt qisqaroq bo'lganda LLM yaxshiroq javob beradi (5-modul, prompt engineering). Tekshiruvchan — bu so'z bankirlar uchun magic word. Muvofiqlik, audit, "kim nima qildi" savollari ish jarayonining ajralmas qismi. Idempotent — yangi atama, hozirgi slaydda atalmaydi, slayd 5 da kiriladi. "Idempotent" deganingda auditoriya allaqachon savol bermoqchi bo'lsa, ayting: "Keyingi slaydda lug'at, sabr qiling."

---

## Slide 5 — Lug'at · "Pipeline + Idempotent design"

**Chip:** Bankir uchun AI lug'ati

**Sarlavha:** Ikki atama — modulning **poydevori**.

**Lead:**
Bu atamalar 12-modulda kiritiladi va keyingi modullarda qayta-qayta uchraydi. Bir marta tushunsak — qolgani osonroq.

**2 ta dict-card (dict.dict-2):**

- **Pipeline** — *Ko'p bosqichli AI zanjiri*
  Bir vazifani **bir nechta ketma-ket bosqich**ga bo'lish. Har bosqich alohida promt yoki dastur, har bosqich log qoldiradi.
  *Bank misol:* Klassifikator: Telegram → LLM → Sheets read → operator tanlash → ariza yozish → javob (7 bosqich)

- **Idempotent design** — *Qayta ishga tushirilsa ham xatosiz*
  Bir xil kirish — **bir xil chiqish**. Bir mijoz xabarini 10 marta yuborsangiz, Applications'da bitta ariza yoziladi. Mijozga bitta xat ketadi.
  *Mexanizm:* har xabarga unique message_id beriladi, ishlangan ID'lar saqlanadi.

**Speaker notes:**
Bu modulning markazi. 30 sekund bilan har birini sodda ayting:

- "Pipeline — bu zanjir. Suv quvuri kabi: kran ochildi, suv 5 ta filtrdan o'tib, kranga keladi. Har filtri o'z ishini qiladi."
- "Idempotent — bu so'z lotinchadan: 'idem' = bir xil, 'potens' = kuch. Ya'ni: 1 marta bossangiz ham, 10 marta bossangiz ham — natija bir xil. Liftning '10' tugmasini 5 marta bossangiz, 50-qavatga chiqmaysiz."

Closing slaydda (slayd 17) bu 2 atamani recap qilamiz. Hozirdan auditoriyani ogohlantiring: "Yodda tutib turing — oxirida birga aytamiz."

---

## Slide 6 — Idempotency real misol · "2 marta xat"

**Sarlavha:** Idempotency real misolda — **"2 marta xat"** muammosi.

**Lead:**
Mijoz Telegram'ga "Avtokredit kerak" deb yubordi, tarmoq uzildi. Telegram "kelmadi" deb o'yladi va qayta yubordi. Endi tasavvur qiling: nima bo'ladi?

**Compare-rich (2 ustun):**

- ✗ **Idempotent emas** · Hech qanday tekshiruv yo'q
  - 14:02 · Xabar #1 keldi → Applications #A-001 + operatorga bildirishnoma → mijozga "qabul qilindi" xati
  - 14:02 · Xabar #1 yana keldi (retry) → Applications #A-002 + ikkinchi operatorga bildirishnoma → mijozga yana "qabul qilindi" xati
  → 2 ta ariza · 2 ta xat · ishonch yo'qolishi

- ✓ **Idempotent dizayn** · chat_id + message_id bilan tekshiruv
  - 14:02 · Xabar id=A4F2 keldi → tekshirildi: yangi → Applications #A-001 → xat ketdi
  - 14:02 · id=A4F2 yana keldi → tekshirildi: *allaqachon ishlangan* → eski natija qaytariladi
  → 1 ta ariza · 1 ta xat · ishonch saqlandi

**Speaker notes:**
Hozir qisqa hikoya — "Tasavvur qiling, mijoz 'avtokredit' deb yozdi, internet shovqinli. Telegram klienti tugmani 3 marta yubordi, chunki 'kelmadi' deb o'yladi. Idempotency yo'q bo'lsa — Applications'da 3 ta ariza yoziladi, 3 ta operator habardor qilinadi, mijozga 3 ta xat ketadi." Bankirlar shu yerda darhol tushunishadi. Idempotent design — bu **mas'uliyatli yechim**, "ishlasa bo'ldi" emas. Ko'pchilik developer'lar buni keyinroq qo'shaman deb o'ylashadi — keyin esa muammo paydo bo'lganda kech bo'ladi. Birinchi kundan idempotent.

Vaqt: 3 daqiqa. Ko'p turib qolmang — keyingi slaydda klassifikator bot pipelineining real bosqichlari.

---

## Slide 7 — Klassifikator bot pipeline · 7-step flow

**Chip:** 9-moduldan davom · bots/01_classifier_bot

**Sarlavha:** Klassifikator bot — **7 bosqichli** pipeline.

**Lead:**
Mijoz Telegram'ga xabar yozdi. Foydalanuvchi uchun bitta amal — ichida 7 bosqich. 9-modulda bu demo flow edi; production versiyada har bosqich log qoldirishi, xato bo'lsa shu joydan qayta davom etishi kerak.

**7 bosqichli flow (02 va 04 — qaror chiqaruvchi step):**

1. **Telegram** 📨 — Xabar trigger'ga keldi
2. **LLM Chain** 🧠 — Gemini → toifa + JSON *(Gemini chaqiruv · xarajat)*
3. **Sheets Read** 📋 — Operators · faol filtr
4. **Pick Operator** 🎯 — Code · birinchi mos *(qaror)*
5. **Sheets Append** 📊 — Applications · ariza
6. **Format** ✍️ — Set · o'zbek matni
7. **Send** 📤 — Telegram javobi

**Yakuniy qator:**
→ 02 va 04 — qaror chiqaruvchi bosqichlar (02 Gemini — pullik, 04 Code — logika). 01, 03, 05, 06, 07 — integratsiya va tezkor logika.

**Speaker notes:**
Bu modulning markaziy diagrammasi. Ekrandagi 7 ta blokni bittama-bitta ko'rsating. Ayniqsa "brain" deb belgilangan 02 (Gemini) va 04 (Code) — qaror chiqaruvchi bosqichlar. Qolgan 5 ta bosqich — integratsiya yoki sodda kod. Bu muhim, chunki:

- 02 (Gemini) chaqiruv = pul + vaqt
- Boshqalar = arzon + tezkor

"9-modulda siz aynan shu botni qurgansiz — biroq ehtimol 'bitta promt'ga yaqin yondashuv bilan. Bu yerda biz har bosqichni alohida ko'rib, har birida xato turini va yechimni belgilaymiz."

Vaqt: 5 daqiqa. Ehtiyot bo'ling — bu slayd ko'p ma'lumot beradi, sekinroq gapiring.

---

## Slide 8 — 4 turdagi xato · "har bosqich o'z xatosini chaqiradi"

**Sarlavha:** Har bosqich — o'zining **xato turi**.

**Lead:**
Pipeline'ning qadri shu — biz xatoning *turini* aniq biladigan bo'lamiz. Har turi uchun alohida yechim.

**4 ta benefit (benefits-4):**

1. **LLM xatosi** 🧠 — Gemini noto'g'ri toifa berdi yoki JSON sxemaga mos bo'lmagan javob qaytardi. *Yechim:* Output Parser sxemani qattiq tekshiradi · qayta urinish + temperature 0.2.
2. **Sheets mavjud emas** 📋 — Google Sheets API kechikdi (5xx) yoki rate-limit'ga tushdi (429). *Yechim:* 3 marta qayta urinish (kutish bilan) · oxirida fallback "operator keyinroq".
3. **Mos operator yo'q** 🎯 — Toifa uchun faol operator topilmadi (active=FALSE yoki qator yo'q). *Yechim:* Code'da "Tayinlanmagan" fallback · administratorga avtomatik xabar.
4. **Telegram timeout** 📤 — Mijozga javob yuborishda tarmoq xatosi (network · 503 · 429). *Yechim:* ariza saqlangan · javob retry navbatga qo'yiladi · idempotent send.

**Speaker notes:**
Bu slayd auditoriyani "AI mukammal" tushunchasidan qutqaradi. Ayting: "AI xato qilmaydi degan eshikni yopamiz — AI xato qiladi, va biz xatoga tayyormiz." Har xato turi — alohida yechim. Bu pedagogik jihatdan muhim: ishtirokchilar "xato yuz berdi → mahsulot ishlamaydi" emas, "xato yuz berdi → tegishli yechim" deb o'ylashlari kerak.

9-modul'dan eslatma: Schema atamasi — bu yerda 1-xato turi ("LLM noto'g'ri JSON"). Output Parser — sxemani qattiq tekshiradi. Few-shot — 5-modulda kiritilgan, klassifikator promt'iga qo'shilishi mumkin.

Vaqt: 4 daqiqa.

---

## Slide 9 — Debug strategy 1 · Logging

**Chip:** Debug strategy 1

**Sarlavha:** Logging — **qora qutini** oydinlashtirish.

**Lead:**
Har bosqich uchun 3 narsani yozib qo'yish: kirish, oraliq natija, xato konteksti. n8n'ning "Sheets log" node'i — yetarli boshlang'ich.

**Template-box (log misoli):**
```
[2026-05-08 14:02:11] message_id=A4F2  chat_id=123456789  user=Murad
step=01  telegram_received    text="Avtokredit olmoqchiman, 50 mln, 5 yilga"
step=02  llm_classify         ok     model=gemini-1.5-flash  temp=0.2  tokens_in=64  tokens_out=58
                                  json={category:"kredit", subject:"Avtokredit so'rovi", urgency:"medium"}
step=03  sheets_read_ops      ok     filter=category=kredit,active=TRUE  rows=2
step=04  pick_operator        ok     chosen="Aziza Karimova"  contact="+998 90 ..."
step=05  sheets_append_app    warn   row=#A-318 yozildi  duration=2.4s (sekin)
step=06  format_reply         ok     reply_len=187
step=07  telegram_send        FAIL  http=429 rate_limit  retry_after=30s
                                  // → ariza saqlangan, 30s dan keyin retry
```

**Tagline:** → Auditor 2 daqiqa ichida topadi: xato 7-bosqichda · sabab — Telegram rate-limit · ariza 5-bosqichda saqlanib qoldi.

**Speaker notes:**
Real log misol bilan ko'rsating. Auditoriyaga: "Logni o'qish bankirlar uchun ham qiyin emas — har qator bitta narsani aytadi." Bo'rttirib ko'rsating: 1) **message_id + chat_id** — har xabar uchun unique, debug uchun zarur; 2) **step** — har bosqich aniq raqam bilan; 3) **status** — ok / warn / FAIL — rangli; 4) **token va xarajat** — auditga.

9-modulda atamalarni eslating: "step=02 — Classification bosqichi, 9-modulda kiritgan edik. step=05 — Schema bo'yicha autoMapInputData." Bog'lash retentsiyaga foyda.

Vaqt: 4 daqiqa.

---

## Slide 10 — Debug strategy 2 · Replay

**Chip:** Debug strategy 2

**Sarlavha:** Replay — **to'xtagan joydan** davom.

**Lead:**
Pipeline 5-bosqichda buzildi. Boshidan boshlash kerakmi? Yo'q — agar har bosqich natijani saqlasak va idempotent bo'lsa, biz to'xtagan joydan davom etamiz.

**Compare-rich (2 ustun):**

- ✗ **Replay strategiyasi yo'q** · Boshidan qayta boshlash
  Xatolik yuz berganda barcha bosqichlar 1-dan boshlanadi. Telegram qayta o'qiladi, LLM qayta chaqiriladi.
  → Gemini narxi 2 marta · sekin

- ✓ **Idempotent + replay** · To'xtagan joydan davom
  5-bosqichdan davom etamiz. message_id bo'yicha eski tasniflash o'qiladi, LLM qayta chaqirilmaydi.
  → Arzon · tezkor · qaytarilmas

**Yakuniy qator:** → Texnik amaliyot: message_id bo'yicha (kirish, chiqish) juftligi Sheets'ga yoziladi. Replay shu ID bo'yicha eski natijani topadi — LLM chaqiruvi takrorlanmaydi.

**Speaker notes:**
Bu slayd idempotency va logging kombinatsiyasi. Sodda hayotiy misol bering: "Liftga kirdingiz, 12 ta tugma bosdingiz, oxirgisi yopilmadi. Liftdan tushib, yana 12 marta bosish kerakmi? Yo'q — 12-tugmani bossangiz yetarli." Pipeline ham shunday — to'xtagan joydan davom.

LLM chaqiruvi narx jihatidan eng qimmat — agar replay yo'q bo'lsa, har crash'da Gemini'ga 2-marta to'laymiz. Idempotent + replay = bitta to'lov.

Vaqt: 3 daqiqa.

---

## Slide 11 — Cost optimizatsiya · 3 qoida

**Sarlavha:** Pipeline + **narx** — uch qoida.

**Lead:**
Bitta promtli botda har so'rov bir xil narx. Pipeline — narxni 5–10 baravar tushiradi, agar 3 ta sodda qoidaga rioya qilsak.

**3 ta benefit:**

1. **Kichik model birinchi** — 5 toifaga tasniflash uchun Gemini Flash kifoya (10× arzon). Pro model faqat noaniq holatlar yoki sentiment tahlili kerak bo'lsa ishlatiladi. *Misol:* klassifikator default — Flash · "shikoyat" toifasida sentiment uchun Pro.
2. **Jadvalni xotirada saqlash** — Operatorlar jadvali har xabarda qayta o'qilmasin — n8n'da 5 daqiqaga keshlanadi. Daqiqasiga 100 ta xabar kelganda, Sheets API chaqiruvi 95% ga kamayadi. 100 xabar/min'da Sheets API chaqiruvi 95% kam. *Misol:* Sheets Read · kesh=5 daq · operator yangilanishi 5 daq kechikadi (qabul qilinishi mumkin).
3. **Zaxira modelga o'tish** — Agar Pro javob bermasa yoki kechiksa — Flash'ga avtomatik o'tish. Klassifikatsiya doim ishlaydi. *Misol:* n8n'da "agar 5 sek'da javob yo'q → Flash" sharti · mijoz farqini sezmaydi.

**Speaker notes:**
Narx — bankirlar uchun muhim. Aniq raqam: "Gemini Pro 1 ta klassifikatsiya uchun ~$0.005; Flash — ~$0.0005. Kuniga 1000 ta xabar bo'lsa, oyiga $150 vs $15. Pipeline pul tejaydi."

Sheet cache — 9-modulda biz Sheets'ni har xabarda o'qib turardik. Production'da cache zarur. Tushuntirish: "Operators jadval kunda 1-2 marta o'zgaradi — har xabarda o'qish behuda."

Fallback — production reliability. "Bizning vazifa — bot doim ishlasin. Pro'dan kechikdi → Flash'ga o'tdi → mijoz farqini sezmaydi."

Vaqt: 3 daqiqa.

---

## Slide 12 — Pipeline branching · shoshilinch vs oddiy

**Sarlavha:** Branching — **shoshilinch** vs oddiy ariza.

**Lead:**
Pipeline har doim bir xil yo'l bilan ketmaydi. Klassifikator muhimlik darajasini (urgency) allaqachon aniqlaydi — biz shu bo'yicha yo'l ajratamiz.

**Branch diagrammasi:**
- **01 · Telegram** → **02 · LLM Chain (Flash · toifa + urgency)** → **agar urgency = high bo'lsa?**
  - Ha · high → **03–07 · Tez yo'l** · Birinchi faol operator · darhol bildirishnoma · 5 daqiqada javob
  - Yo'q · low/medium → **03–07 · Standart** · Toifa bo'yicha operator · email · 24 soat ichida

**Yakuniy qator:** → Misol: "kartam yo'qoldi" → urgency=high → Risk Officer'ga darhol SMS. "filial soat nechagacha?" → urgency=low → standart yo'l.

**Speaker notes:**
Branching — pipeline murakkabligi. Ayting: "Bu — biznes mantig'i. Klassifikator urgency'ni LLM bosqichida allaqachon aniqlaydi (low/medium/high). Biz uni 'kartam yo'qoldi → high → tez yo'l' shaklida ishlatamiz. AI o'zi qaror qilmaydi — biz qoida yozamiz, AI bajaraydi."

Misol berish: "'Kartam o'g'irlangan' — high urgency, 'omonat foizi qancha?' — low urgency. Bunday tafovut klassifikator bosqichidayoq aniq bo'ladi. Pipeline keyin shu bo'yicha branch qiladi."

n8n'da "If" node'ini eslatish: 8-modulda kiritilgan. "Trigger — LLM — If — branch1 / branch2." Tanish struktura.

Vaqt: 4 daqiqa.

---

## Slide 13 — Eng tipik xatolar · myth 4-row

**Sarlavha:** Pipeline qurishda **eng tipik** xatolar.

**4 ta juftlik:**

| Tag | Matn |
|---|---|
| ✗ Afsona | "**Bitta promtga** hammasini sig'dirsam, sodda bo'ladi." |
| ✓ Haqiqat | **Sodda emas, qora quti.** Aniq bosqichlar — debug, audit va xarajat uchun zarur. |
| ✗ Afsona | "**Logging sekinlatadi**, production'da o'chirib qo'yamiz." |
| ✓ Haqiqat | **Logging — asosiy sarmoya.** Bankda o'chiq log = audit yo'q = muvofiqlik muammosi. |
| ✗ Afsona | "**Idempotency keyinroq** qo'shamiz, hozir ishlasa bo'ldi." |
| ✓ Haqiqat | **Birinchi kundan kerak.** Mijozga 2 ta xat ketishi sotsial xato — ishonchni qaytarib bo'lmaydi. |
| ✗ Afsona | "**Pro modelni** har joyda ishlatamiz — sifat muhim." |
| ✓ Haqiqat | **10 baravar qimmat** — ko'p bosqich Flash'da ham ishlaydi. Pro — faqat fikrlash kerak bo'lganda. |

**Speaker notes:**
4 juftlikni birin-ketin oching. Har biri 30–45 sek. Audit'oriyaga savol bering: "Sizdan kim 'logging sekinlatadi' deb o'ylagandi?" Reaksiyani tekshiring. Bankirlar uchun muvofiqlik — qattiq mavzu, "log yo'q = audit yo'q" tezisi mustahkam o'tadi.

3-modul (muvofiqlik) bilan bog'lang: "Data Masking, Yopiq Kontur — buni 3-modulda ko'rgan edik. Logging shu lentaning davomi: kim, qachon, qaysi natijani oldi — barchasi qayd etilishi shart."

Vaqt: 4 daqiqa.

---

## Slide 14 — Bug-hunt mashq · "log o'qib topamiz"

**Chip:** Interaktiv · Bug-hunt · 6 daq

**Sarlavha:** Loglarda **xato**ni topamiz.

**Template-box (mashq uchun log):**
```
[14:47:02] message_id=B7C9  chat_id=987654321  user=Sherzod
step=01 telegram_received  text="Depozit ochmoqchiman, 50 mln so'm, 2 yilga"
step=02 llm_classify       ok   model=flash  json={category:"depozit", subject:"Depozit ochish", urgency:"medium"}
step=03 sheets_read_ops    ok   filter=category=depozit,active=TRUE  rows=1
step=04 pick_operator      ok   chosen="Dilfuza Nazarova"
step=05 sheets_append_app  FAIL http=500  retry=1
step=05 sheets_append_app  FAIL http=500  retry=2
step=05 sheets_append_app  ok   row=#A-3318
step=06 format_reply       ok   reply_len=192
step=07 telegram_send      ok   sent_count=3 ←  !
```

**2 ta savol:**
1. Xato qaysi bosqichda ko'rinadi va **asl sababi** nima?
2. Mijoz 3 ta tasdiq xati oldi. **Idempotency** qaysi bosqichda kerak edi?

**Speaker notes:**
Bu — modulning eng interaktiv qismi. 6 daqiqa, 3 stol bilan ishlash:
- Stol 1 — birinchi savol bo'yicha
- Stol 2 — ikkinchi savol bo'yicha
- Stol 3 — ikkala savolga qaytib, yechim taklif qiladi

**Kutilgan javoblar:**
- 1-savol: Xato 5-bosqichda (Sheets append), lekin asl sabab — 1) Sheets API 5xx (vaqtinchalik), 2) retry qildi va oxirida muvaffaqiyat. Ammo step=07 da `sent_count=3` — bu asl muammo: telegram_send idempotent emas, har retry'da xat ketgan.
- 2-savol: Idempotency 5-bosqichga (sheets_append_app) — message_id bo'yicha dedup. Va 7-bosqichga (telegram_send) — bir xil reply har retry'da takror yuborilmasligi uchun.

Auditoriya bilan birga olib kelinglar: "Real production'da shu xato — eng tipik. Endi siz tahlil qilolasiz."

Vaqt: 6 daqiqa.

---

## Slide 15 — Debug checklist · "6 ta savol"

**Sarlavha:** Debug checklist — **6 ta savol**.

**Lead:**
Pipeline buzilganda boshqa savol bermang. Aynan shu 6 ta — tartib bilan. Birinchi 2 daqiqada javobi topilmasa, undan keyin chuqurroq ketamiz.

**6 ta savol (canvas-grid 2x3):**
1. **Qaysi bosqich?** Avval log'ni o'qing. Step raqami bilan FAIL qatorini toping. Boshqa bosqichlarda muammo izlamang.
2. **Kirish to'g'rimi?** Oldingi bosqichning chiqishi shu bosqichga to'g'ri keldimi? Format, ma'lumot tipi, til mosligi.
3. **Birinchi marta xatomi?** Retry tarixi. Ikkinchi urinishda o'tdimi? Vaqtinchalik (network) yoki doimiy xato.
4. **Idempotent bo'ldimi?** Mijozga ortiqcha xat ketdimi? Applications'da takroriy yozuv bormi? message_id tekshiruvi to'g'rimi?
5. **Promt o'zgardimi?** Yaqinda yangilash bo'ldimi? Schema yangilandimi? Few-shot misollar to'g'rimi? Versiyani solishtirish.
6. **Replay imkoni bormi?** Eski natijalarni yangidan ishlatib bo'ladimi? Yo'q bo'lsa — keyingi pipeline'da bu imkonni qo'ying.

**Speaker notes:**
Bu slayd — auditoriya uydan olib ketadigan checklist. Aytib qo'ying: "Bu 6 ta savolni telefonga yozib oling yoki rasmga oling. Production buzilsa — birinchi 2 daqiqa shu ro'yxat bilan ishlang."

Tartibi muhim: avval **qayerda**, keyin **qaysi bosqich**, keyin **nima sababdan**. Boshqacha ketma-ketlik — vaqt yo'qotish.

Vaqt: 3 daqiqa.

---

## Slide 16 — Production tayyor — yoki tayyor emas

**Sarlavha:** Production'ga tayyor — yoki **tayyor emas**.

**Lead:**
Bu ro'yxatni 9-modulda qurgan klassifikator botga (yoki har qanday boshqa botga) tatbiq eting. 5 ta "Ha" bo'lmasa — pilot rejimida qoldiring.

**Cando (2 ustun):**

✓ **Tayyor — qo'yib yuborsa bo'ladi:**
- Har bosqich alohida log qoldiradi (message_id + chat_id bilan)
- message_id orqali idempotency tekshiruvi bor (Sheets'da dublikatlarni tozalash)
- Output Parser orqali sxemani qat'iy tekshirish · 5 ta toifa bo'yicha
- Fallback model (Pro → Flash) va Sheets retry sozlangan
- Bankir uchun "qaysi bosqichda nima bo'ldi" hisoboti oson topiladi

✗ **Tayyor emas — pilotda qoling:**
- Bitta uzun promt — bosqichlar yo'q
- Log faqat error'da yoziladi, oraliq natija yo'q
- Retry yo'q yoki idempotency'siz retry — mijozga takror xat
- Har bir so'rov Pro modelda — 5–10× ortiqcha xarajat shart emas
- Schema yo'q — "har xil maydonlar" Applications'ga tushadi

**Speaker notes:**
Bu — modulning yakuniy aksent. Bankirlar bu slayd bilan ish boshlovchilar bilan suhbatlashishi mumkin: "Loyihangiz pilotmi, productionmi?" 5 nuqta — aniq ro'yxat. Ko'pchilik bot pilotda turishi normal — production talabi qattiq.

9-modulda qurgan klassifikator bot demo darajada — production'ga ko'tarish uchun yuqoridagi 5 ta nuqta kerak. 14-modulda guruh loyihangizda shu ro'yxatni qo'llaysiz.

Vaqt: 3 daqiqa.

---

## Slide 17 — Closing · "3 xulosa + lug'at recap"

**Sarlavha:** Bugungi darsdan **3 ta asosiy** xulosa.

**3 ta xulosa:**
- 💡 **9-modulda qurdingiz — endi production'ga.** Klassifikator botingiz "ishlaydi" dan "doim ishlaydi" ga o'tishi uchun pipeline + log + idempotency kerak.
- 💡 **Idempotency — birinchi kundan.** message_id orqali tekshiruv. Mijozga 2 ta xat ketishi — mijoz ishonchini butunlay yo'qotish.
- 💡 **13-modulda — shu checklist bilan.** Real bank keyslarini o'qiymiz: qayerda pipeline bor, qayerda log bor, retry idempotentmi, branch biznes qoidasiga bo'ysunadimi, xarajat nazoratdami? 14-modulda — guruh loyihangiz.

**Lug'at recap (interaktiv, 30–60 sek):**
Auditoriyaga so'rang: "Eslay olasizmi?"
- **Pipeline** = … (jamoa: "Ko'p bosqichli AI ish zanjiri")
- **Idempotent design** = … (jamoa: "Qayta ishga tushsa ham bitta natija")

**Speaker notes:**
Bu yakuniy aksent — 3 xulosa qisqa, takror aytsa bo'ladi. Har biriga 15 soniya. Auditoriya bittasini ham bo'lsa eslab qolishi kerak — eng muhimi: **idempotency birinchi kundan**.

Lug'at recap — 30–60 sek. Birga aytamiz, jamoa ovozi bilan. Bu retentsiyani sezilarli oshiradi. 15-modulda yakuniy glossary review da Pipeline va Idempotent design qaytib chiqadi.

Vaqt: 2 daqiqa.

---

## Slide 18 — Q&A

**Vizual:** Markaziy joyda katta "?" belgisi (blue accent), ostida sarlavha va kontakt.

**Sarlavha (markazlashgan):** Sizning **savollaringiz**.

**Tagline:** Pipeline arxitekturasi, idempotency, debug, narx — marhamat.

**Kontakt:** murod@mohir.dev

**Speaker notes:**
5 daqiqa. Ko'p kelishi mumkin bo'lgan savollar:
- "Pipeline qancha bosqichdan iborat bo'lishi kerak?" — javobing: "Eng kam — vazifa talab qiladigan miqdor. Klassifikator — 7. RAG bot — 4–5. Lekin har bosqich bitta vazifa qilishi kerak."
- "Idempotency bizning 1C tizimida qanday ishlaydi?" — bog'lang: "1C — backend, biz n8n orqali ulansak, message_id'ni n8n yozadi. 1C tomonida ham unique constraint qo'shish kerak."
- "Bu hammasi qancha vaqt oladi?" — javob: "Birinchi pilot — 2 hafta. Production-ga 4–6 hafta, agar siz 5 ta 'Ha' ni qo'lga kiritsangiz."

Muvofiqlik savoli kelsa — 3-modulga ko'prik. Production savoli — 13-modulga.

---

## Series-wide bog'lanish

- **Avvalgi modul:** [`11_deck/`](../11_deck/) — Agent design (RAG chatbot)
- **Keyingi modul:** [`13_deck/`](../13_deck/) — Bank amaliyotidagi real keyslar
- **Atamalar bog'liqligi:**
  - 9-modul'dan: Classification (slayd 7, step 02), Schema (slayd 8 — LLM xato yechimi · Output Parser)
  - 11-modul'dan: RAG, Embedding (slayd 11 — sheet cache analogiyasi)
  - 8-modul'dan: Trigger, Webhook (slayd 12 — n8n branching)
  - 5-modul'dan: Few-shot (slayd 8 — LLM xato yechimi)
- **Bog'liq:** [`bots/01_classifier_bot/`](../bots/01_classifier_bot/) — 9-modulda qurilgan, 12-modulda production tahlil

## Series-wide terminologiya talab

`cb_decks/CLAUDE.md` ga qarang. 12-modul hissasi: **Pipeline, Idempotent design** — slayd 5 da kiritilgan, slayd 17 da recap. 15-modul yakuniy glossary review'da har ikkalasi qaytib chiqadi.

## Tayyorgarlik checklist (deck'dan tashqari)

- [ ] 9-modul klassifikator bot yodda — auditoriya 9-modul'dan keladi (uzoq bo'lsa, qisqa eslatma kerak)
- [ ] Bug-hunt slaydidagi log namunasi — auditoriya o'qib tushuna oladigan
- [ ] Branching slaydidagi if/else — n8n misol bilan tayyorlangan
- [ ] Idempotency atamasi uchun "lift tugmasi" yoki "qayta to'lov" misoli yodda
- [ ] Vazirlik logotiplari `_shared/` da turibdi

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Pipeline tushunchasi | 3–6 | ~13 daq |
| 02 · Klassifikator bot pipeline tahlili | 7–8 | ~9 daq |
| 03 · Debugging | 9–13 | ~18 daq |
| 04 · Amaliyot (Bug-hunt → Closing → Q&A) | 14–18 | ~17 daq |
| **Jami** | **18** | **~60 daq** |

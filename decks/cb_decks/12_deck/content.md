# 12-modul · Murakkab sun'iy intellekt jarayonlari — to'liq kontent

**Module:** 12-modul · Kun 2 · 13:00–14:00 (60 daqiqa)
**Format:** Namoyish + tahlil
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar:** **Pipeline**, **Idempotent design** — slayd 5 da kiritiladi, slayd 17 da recap
**Paired bot:** [`bots/02_voice_memo/`](../bots/02_voice_memo/)

> Asosiy g'oya: 11-modulda biz voice memo botning dizaynini chizdik. 12-modul bu dizaynni **ish jarayoni sifatida** ko'rib chiqadi — bitta promtga emas, ko'p bosqichli pipeline'ga aylantiramiz; har bosqichni log qiladigan, qayta ishga tushirilsa ham xato qilmaydigan tizim yaratamiz.

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
| 7 | Voice bot — 6 bosqichli pipeline | flow flow-6 | ~5 daq | 02 Voice tahlili |
| 8 | Har bosqich — o'zining xato turi | benefits-4 | ~4 daq | 02 Voice tahlili |
| 9 | Logging — qora qutini oydinlashtirish | template-box log | ~4 daq | 03 Debugging |
| 10 | Replay — to'xtagan joydan davom | compare | ~3 daq | 03 Debugging |
| 11 | Pipeline + narx — uch qoida | benefits 3-card | ~3 daq | 03 Debugging |
| 12 | Branching — VIP vs oddiy | branch diagram | ~4 daq | 03 Debugging |
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
Salomlashing va auditoriyani 11-modul bilan bog'lang. "Avval biz voice memo bot dizaynini chizgan edik — endi shu dizaynni 'ish jarayoni' deb ko'rib chiqamiz." 12-modulning o'ziga xosligi: birinchi modul bo'lib, biz **xato qilishni va xatoni topishni** maxsus o'rganamiz. Bu modul "tayyor mahsulot" ko'rsatish uchun emas, "buzilgan tizim" tushunchasi uchun. Bankirlar uchun bu juda muhim — chunki real ish jarayonida xato yuz beradi, va biz uni topib, tuzata olishimiz kerak. Pauza: "60 daqiqa pipeline ham, debug ham — tayyormisiz?"

---

## Slide 2 — Agenda · "Mavzuning yo'l xaritasi"

**Sarlavha:** Mavzuning **yo'l xaritasi**.

**4 faza (2×2 grid):**

1. **01 — Pipeline** · ~13 daq
   Nima uchun bitta promt yetmaydi. Bosqichlarga bo'lish — aniqlik, tekshiruv va idempotent dizayn manbai. (slaydlar 3–6)
2. **02 — Voice bot tahlili** · ~9 daq
   11-modulda chizgan voice memo bot — endi 6 ta bosqichni bittama-bitta ochamiz va har birida nimani kutishni belgilaymiz. (slaydlar 7–8)
3. **03 — Debugging** · ~18 daq
   Logging, replay, idempotency, narx optimizatsiyasi va branching. Pipeline buzilsa qanday topish va qayta ishga tushirish. (slaydlar 9–13)
4. **04 — Amaliyot** · ~17 daq
   Real bug-hunt mashqi, debug checklist, production tayyorligi, yakun va Q&A. (slaydlar 14–18)

**Speaker notes:**
60 daqiqani 4 ga bo'lib ko'rsating. Bu modul boshqa modullardan biroz farq qiladi — nazariya kam, real misollar va debugging ko'p. Dasturchilar buni "ops" qismi deb atashadi; bizda — **bankirlar uchun ish jarayoni boshqaruvi**. Phase card'lar interaktiv. 60–90 soniya, ko'p turib qolmang.

---

## Slide 3 — Hook · "Bitta promt vs Pipeline"

**Sarlavha:** Bitta promt yetmaydi — chunki **bir nechta ish** qiladi.

**Chip:** Hook · 11-moduldan davom

**Lead:**
Voice memo botiga "audio'ni eshit, ekstrakt qil, CRM'ga yoz" deb bitta promt yozsangiz — debug qilolmaysiz, xato qayerda ekanini bilmaysiz, qayta ishga tushirsangiz mijozga 2 ta xat yuboradi.

**Compare-rich (2 ustun):**

- ✗ **Bitta promtli bot** · "Hammasi bir oynada"
  Audio kirdi → Gemini "eshit, tushun, ekstrakt qil, CRM'ga yoz, foydalanuvchiga javob ber" — bitta uzun promt. Xato yuz berdi. Qaysi bosqichda? Bilmaymiz. Qayta yuborsak, takrorlanadi.
  → Qora quti · debug imkonsiz

- ✓ **6-bosqichli pipeline** · "Har bosqich — alohida"
  Audio → STT → bo'lish → ekstrakt → schema validatsiya → CRM. Har bosqich log qoldiradi, alohida qayta ishga tushadi. Xato 4-bosqichda — uchinchi va to'rtinchini qaytadan ishlatamiz, qolgani saqlanib qoladi.
  → Tekshiruvchan · idempotent

**Speaker notes:**
Bu — modulning hisli boshlanishi. Bankirlarga aniq aytish: "Birinchi yondashuv ko'p texnologik kompaniyalarning xatosi — bizda xatosi qimmat. Mijozga 2 ta tasdiq xati ketishi — muvofiqlik muammosi, ishonch yo'qoladi." 11-modulda dizaynda bizda 5–6 bosqich bor edi — endi tushuntiramiz, **nima uchun shunday qildik**. Auditoriyaga qarang: kim "men ham bitta promtda yozardim" der ekan, kim "yo'q, bo'laklash kerak" der ekan? Reaksiyani tekshirib turing.

---

## Slide 4 — Why pipeline · "3 amaliy sabab"

**Sarlavha:** Nima uchun pipeline — uch **amaliy sabab**.

**Lead:**
Pipeline — bu modaning emas, mas'uliyatning yechimi. Bank uchun har bosqich nima uchun keraklini aniq tushunish shart.

**3 ta benefit:**

1. **Aniqroq** — har bosqich bitta vazifa qiladi. STT faqat eshitadi, ekstrakt faqat ajratadi. Promtlar qisqaroq, sifat ortadi. *Misol:* STT'da xato bo'lsa — tark qilamiz, ekstrakt'da xato bo'lsa — qayta urinib ko'ramiz.
2. **Tekshiruvchan** — har bosqichdan keyin natija saqlanadi. Buzilgan joyni log'dan topib bo'ladi. Audit uchun zarur. *Misol:* muvofiqlik auditori "qaysi qadamda mijoz nomi paydo bo'ldi?" — 5 sekundda javob.
3. **Idempotent** — bir voice memo'ni 2 marta yuborsa ham — bitta yozuv. Qayta ishga tushirilganda mijozga ortiqcha xat yo'q. *Misol:* request_id orqali tekshiruv.

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
  *Bank misol:* Voice memo: audio → STT → ekstrakt → schema → CRM (5 bosqich)

- **Idempotent design** — *Qayta ishlatilsa ham xatosiz*
  Bir xil kirish — **bir xil chiqish**. Bir voice memo'ni 10 marta yuborsangiz, CRM'da bitta yozuv hosil bo'ladi. Mijozga bitta xat ketadi.
  *Mexanizm:* har so'rovga unique request_id beriladi, ishlangan ID'lar saqlanadi.

**Speaker notes:**
Bu modulning markazi. 30 sekund bilan har birini sodda ayting:

- "Pipeline — bu zanjir. Suv quvuri kabi: kran ochildi, suv 5 ta filtrdan o'tib, kranga keladi. Har filtri o'z ishini qiladi."
- "Idempotent — bu so'z lotinchadan: 'idem' = bir xil, 'potens' = kuch. Ya'ni: 1 marta bossangiz ham, 10 marta bossangiz ham — natija bir xil. Liftning '10' tugmasini 5 marta bossangiz, 50-qavatga chiqmaysiz."

Closing slaydda (slayd 17) bu 2 atamani recap qilamiz. Hozirdan auditoriyani ogohlantiring: "Yodda tutib turing — oxirida birga aytamiz."

---

## Slide 6 — Idempotency real misol · "2 marta xat"

**Sarlavha:** Idempotency real misolda — **"2 marta xat"** muammosi.

**Lead:**
Bankir voice memo yubordi, internet uzildi. Tizim "kelmadi" deb o'yladi va qayta yubordi. Endi tasavvur qiling: nima bo'ladi?

**Compare-rich (2 ustun):**

- ✗ **Idempotent emas** · Hech qanday tekshiruv yo'q
  - 14:02 · Memo #1 keldi → CRM yangi yozuv #M-001 → mijozga "saqlandi" xati
  - 14:02 · Memo #1 yana keldi (retry) → CRM yangi yozuv #M-002 → mijozga yana "saqlandi" xati
  → 2 ta yozuv · 2 ta xat · ishonch yo'qolishi

- ✓ **Idempotent dizayn** · request_id bilan tekshiruv
  - 14:02 · Memo #1 keldi (id=A4F2) → tekshirildi: yangi → CRM #M-001 → xat ketdi
  - 14:02 · id=A4F2 yana keldi → tekshirildi: *allaqachon ishlangan* → eski natija qaytariladi
  → 1 ta yozuv · 1 ta xat · ishonch saqlandi

**Speaker notes:**
Hozir qisqa hikoya — "Tasavvur qiling, mijoz operatsiya qilmoqchi, internet shovqinli. Tugmani 3 marta bosgan, chunki ishlamayapti deb o'yladi. Idempotency yo'q bo'lsa — hisobidan 3 marta pul yechiladi." Bankirlar shu yerda darhol tushunishadi. Idempotent design — bu **mas'uliyatli yechim**, "ishlasa bo'ldi" emas. Ko'pchilik developer'lar buni keyinroq qo'shaman deb o'ylashadi — keyin esa muammo paydo bo'lganda kech bo'ladi. Birinchi kundan idempotent.

Vaqt: 3 daqiqa. Ko'p turib qolmang — keyingi slaydda voice bot pipelineining real bosqichlari.

---

## Slide 7 — Voice bot pipeline · 6-step flow

**Chip:** 11-moduldan davom · bots/02_voice_memo

**Sarlavha:** Voice memo bot — **6 bosqichli** pipeline.

**Lead:**
Bankir 15 sekund gapirdi. Foydalanuvchi uchun bitta amal — ichida 6 bosqich. Har biri alohida log qoldiradi, alohida qayta ishga tushadi.

**6 bosqichli flow (02 va 04 — brain step):**

1. **Audio kelishi** 🎙️ — Telegram'dan ovoz fayli
2. **STT** 📝 — Gemini audio → o'zbek matni *(LLM chaqiruv)*
3. **Bo'lish** ✂️ — Mijoz, qaror, izoh — qism
4. **Ekstrakt** 🎯 — Gemini → JSON maydonlar *(LLM chaqiruv)*
5. **Schema** ✅ — Tip va majburiy maydon tekshiruvi
6. **CRM** 📊 — Sheets'ga yozuv + tasdiq

**Yakuniy qator:**
→ 02 va 04 — Gemini chaqiruvi (xarajat). 03, 05, 06 — kodli logika (tezkor).

**Speaker notes:**
Bu modulning markaziy diagrammasi. Ekrandagi 6 ta blokni bittama-bitta ko'rsating. Ayniqsa "brain" deb belgilangan 02 va 04 — ya'ni LLM chaqiriladigan bosqichlar. Qolgan 4 ta bosqich — sodda kod yoki shartlar. Bu muhim, chunki:

- LLM chaqiruv = pul + vaqt
- Kod = arzon + tezkor

"Ekstrakt" bosqichini 11-modulda chizdik — mana shu yerda Function Calling / Schema atamasi qaytib chiqadi. Bog'lang: "11-modulda Schema atamani kiritgan edik. Mana bu yerda — schema validatsiya 5-bosqich. Schema bo'lmasa, validatsiya qila olmaymiz."

Vaqt: 5 daqiqa. Ehtiyot bo'ling — bu slayd ko'p ma'lumot beradi, sekinroq gapiring.

---

## Slide 8 — 4 turdagi xato · "har bosqich o'z xatosini chaqiradi"

**Sarlavha:** Har bosqich — o'zining **xato turi**.

**Lead:**
Pipeline'ning qadri shu — biz xatoning *turini* aniq biladigan bo'lamiz. Har turi uchun alohida yechim.

**4 ta benefit (benefits-4):**

1. **Audio sifati** 🎙️ — Shovqin baland, ovoz qisqa, shu jumladan tinch yozuv. *Yechim:* 3 sek'dan qisqa bo'lsa rad et, foydalanuvchidan qayta so'ra.
2. **STT xatosi** 📝 — Lahja, maxsus terminlar, aralash til (o'zbek + rus). *Yechim:* prompt'ga "bank atamalari uchraydi" eslatma · pastki ishonch — auditga.
3. **Ekstrakt xatosi** 🎯 — "Ertaga" — qaysi sana? Mijoz ismi noto'g'ri yozildi. *Yechim:* few-shot misollar · sana hisoblash uchun aniq qoida.
4. **Validatsiya** ✅ — Majburiy maydon yo'q, tip noto'g'ri, qiymat ro'yxatdan tashqari. *Yechim:* schema xato → bankirga "qaysi maydonni qo'shish" so'rovi.

**Speaker notes:**
Bu slayd auditoriyani "AI mukammal" tushunchasidan qutqaradi. Ayting: "AI xato qilmaydi degan eshikni yopamiz — AI xato qiladi, va biz xatoga tayyormiz." Har xato turi — alohida yechim. Bu pedagogik jihatdan muhim: ishtirokchilar "xato yuz berdi → mahsulot ishlamaydi" emas, "xato yuz berdi → tegishli yechim" deb o'ylashlari kerak.

11-modul'dan eslatma: STT atamasi — bu yerda 2-bosqich. Few-shot — 5-modulda kiritilgan, ekstrakt bosqichida ishlatamiz. Bog'lanishlarni ko'rsating.

Vaqt: 4 daqiqa.

---

## Slide 9 — Debug strategy 1 · Logging

**Chip:** Debug strategy 1

**Sarlavha:** Logging — **qora qutini** oydinlashtirish.

**Lead:**
Har bosqich uchun 3 narsani yozib qo'yish: kirish, oraliq natija, xato konteksti. n8n'ning "Sheets log" node'i — yetarli boshlang'ich.

**Template-box (log misoli):**
```
[2026-05-08 14:02:11] request_id=A4F2  user=bankir_aliyev
step=01  audio_received       size=247KB  duration=18.3s
step=02  stt_complete         ok     model=gemini-1.5-flash  tokens_in=audio  tokens_out=142
                                  text="Aliyev Vali bilan uchrashdim. Avtokredit so'ramoqda..."
step=03  split_sections       ok     sections=4  (mijoz, qaror, izoh, sana)
step=04  extract_fields       ok     model=gemini-1.5-pro  tokens_out=89
                                  fields={customer:"Aliyev V.", amount:200000000, term:12, ...}
step=05  schema_validate      warn   missing=next_step_date · "ertaga" → ?
step=06  crm_write            FAIL  reason="next_step_date majburiy"
                                  // → bankirga qayta so'rov: "Ertaga = 2026-05-09 deb tushunsam, to'g'rimi?"
```

**Tagline:** → Auditor 2 daqiqa ichida topadi: xato 5-bosqichda · sabab — sana noaniq · oldingi bosqichlar saqlanib qoldi.

**Speaker notes:**
Real log misol bilan ko'rsating. Auditoriyaga: "Logni o'qish bankirlar uchun ham qiyin emas — har qator bitta narsani aytadi." Bo'rttirib ko'rsating: 1) **request_id** — har so'rov uchun unique, debug uchun zarur; 2) **step** — har bosqich aniq raqam bilan; 3) **status** — ok / warn / FAIL — rangli; 4) **token va xarajat** — auditga.

11-modulda atamalarni eslating: "step=02 — STT bosqichi, 11-modulda kiritgan edik. Step=04 — schema bilan ekstrakt." Bog'lash retentsiyaga foyda.

Vaqt: 4 daqiqa.

---

## Slide 10 — Debug strategy 2 · Replay

**Chip:** Debug strategy 2

**Sarlavha:** Replay — **to'xtagan joydan** davom.

**Lead:**
Pipeline 5-bosqichda buzildi. Boshidan boshlash kerakmi? Yo'q — agar har bosqich natijani saqlasak va idempotent bo'lsa, biz to'xtagan joydan davom etamiz.

**Compare:**
- **Replay strategiyasi yo'q:** Crash → 1-bosqichdan qayta. Audio yana yuklanadi · STT yana chaqiriladi · narx 2 marta · sekin.
- **Idempotent + replay:** Crash → 5-bosqichdan davom. Oldingi natijalar bazadan o'qiladi · faqat 5 va 6 ishlatiladi · arzon · tezkor.

**Yakuniy qator:** → Texnik amaliyot: har bosqich (input_hash, output) juftligini Sheets/DB'ga yozadi. Replay shu hash bo'yicha tekshiradi.

**Speaker notes:**
Bu slayd idempotency va logging kombinatsiyasi. Sodda hayotiy misol bering: "Liftga kirdingiz, 12 ta tugma bosdingiz, oxirgisi yopilmadi. Liftdan tushib, yana 12 marta bosish kerakmi? Yo'q — 12-tugmani bossangiz yetarli." Pipeline ham shunday — to'xtagan joydan davom.

Texnik amaliyot — "input_hash" so'zini ehtiyot bilan ishlating, ortiqcha jargon bermang. Ayting: "Har bosqich kirishini bir xil kalitga aylantiramiz. Agar shu kalit oldin ko'rilgan bo'lsa, eski natijani ishlatamiz."

Vaqt: 3 daqiqa.

---

## Slide 11 — Cost optimizatsiya · 3 qoida

**Sarlavha:** Pipeline + **narx** — uch qoida.

**Lead:**
Bitta promtli botda har so'rov bir xil narx. Pipeline — narxni 5–10 baravar tushiradi, agar 3 ta sodda qoidaga rioya qilsak.

**3 ta benefit:**

1. **Kichik model birinchi** — Sodda bosqichlarni Gemini Flash bajaradi (10× arzon). Faqat ekstrakt va murakkab fikrlash uchun Pro. *Misol:* STT va bo'lish — Flash · ekstrakt — Pro.
2. **Cache uy** — Bir xil hujjat 100 mijoz uchun ishlatilsa — bir marta embed qilamiz, qolgani cache'dan. Narx ~95% kam. *Misol:* tarif PDF, qoidalar bazasi · request_hash bilan.
3. **Fallback to small** — Agar Pro ishlamasa yoki sekin javob bersa — Flash'ga avtomatik o'tish. Qulaylik kafolatlangan. *Misol:* n8n'da "if timeout > 5s → use flash" sharti.

**Speaker notes:**
Narx — bankirlar uchun muhim. Aniq raqam: "Gemini Pro 1 ta voice memo uchun ~$0.02; Flash — ~$0.002. Kuniga 1000 ta memo bo'lsa, oyiga $600 vs $60. Pipeline pul tejaydi."

Cache uy — 9-modulda RAG kontekstida ko'rgan edik. Bog'lang: "RAG'da hujjatni embed qilganmiz — natija saqlandi. Pipeline'da ham xuddi shunday — natija ishlatilgan bo'lsa, qaytadan hisoblamaymiz."

Fallback — production reliability. "Bizning vazifa — bot doim ishlasin. Pro'dan kechikdi → Flash'ga o'tdi → mijoz farqini sezmaydi."

Vaqt: 3 daqiqa.

---

## Slide 12 — Pipeline branching · VIP vs oddiy

**Sarlavha:** Branching — **premium** vs oddiy mijoz.

**Lead:**
Pipeline har doim bir xil yo'l bilan ketmaydi. Mijoz turi bo'yicha biz qimmat modelni faqat kerakli holatlarda ishlatamiz.

**Branch diagrammasi:**
- **01 · Audio** → **02 · STT (Flash · arzon)** → **agar mijoz VIP bo'lsa?**
  - Ha · VIP → **03–05 · Pro** · Murakkab ekstrakt · sentiment · Risk Officer'ga eskartma
  - Yo'q · Oddiy → **03–05 · Flash** · Standart ekstrakt · CRM'ga to'g'ridan-to'g'ri

**Yakuniy qator:** → Misol: mijoz balansi > 1 mlrd so'm yoki yopiq shartnoma summasi katta bo'lsa — Pro yo'naltiriladi.

**Speaker notes:**
Branching — pipeline murakkabligi. Ayting: "Bu — biznes mantig'i. Premier mijoz uchun ko'proq diqqat, oddiy mijoz uchun standart yo'l. AI o'zi qaror qilmaydi — biz qoida yozamiz, AI bajaraydi."

Misol berish: "Aytaylik, '1 mlrd so'm balans' yoki 'top 100 mijoz ichida' — bu VIP signali. Bunday memo'da Pro modelga o'tamiz. Sentiment tahlili (mijoz norozimi?) qilinadi va Risk Officer'ga avtomatik xabar boradi. Oddiy mijozda — standart yo'l."

n8n'da "If" node'ini eslatish: 8-modulda kiritilgan. "Trigger — Webhook — If — branch1 / branch2." Tanish struktura.

Vaqt: 4 daqiqa.

---

## Slide 13 — Eng tipik xatolar · myth 4-row

**Sarlavha:** Pipeline qurishda **eng tipik** xatolar.

**4 ta juftlik:**

| Tag | Matn |
|---|---|
| ✗ Afsona | "**Bir promtga** hammasini sig'dirsam, sodda bo'ladi." |
| ✓ Haqiqat | **Sodda emas, qora quti.** Aniq bosqichlar — debug, audit va xarajat uchun zarur. |
| ✗ Afsona | "**Logging sekinlatadi**, production'da o'chirib qo'yamiz." |
| ✓ Haqiqat | **Logging — asosiy sarmoya.** Bankda o'chiq log = audit yo'q = muvofiqlik muammosi. |
| ✗ Afsona | "**Idempotency keyinroq** qo'shamiz, hozir ishlasa bo'ldi." |
| ✓ Haqiqat | **Birinchi kun'dan kerak.** Mijozga 2 ta xat ketishi sotsial xato — ishonchni qaytarib bo'lmaydi. |
| ✗ Afsona | "**Pro modelni** har joyda ishlatamiz — sifat muhim." |
| ✓ Haqiqat | **10× ortiq narx** — ko'p bosqich Flash'da ham ishlaydi. Pro — faqat fikrlash kerak bo'lganda. |

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
[14:47:02] request_id=B7C9
step=01 audio_received  size=412KB  duration=24.1s
step=02 stt_complete    ok   text="Karimov Sherzod bilan gaplashdim, depozit ochishni xohladi, 50 million..."
step=03 split_sections  ok   sections=3
step=04 extract_fields  ok   {customer:"Karimov Sh.", product:"depozit", amount:50000000, term:null, ...}
step=05 schema_validate ok
step=06 crm_write       FAIL http=500  retry=1
step=06 crm_write       FAIL http=500  retry=2
step=06 crm_write       ok   row=#M-3318
step=07 notify_user     ok   sent_count=3 ←  !
```

**2 ta savol:**
1. Xato qaysi bosqichda ko'rinadi va **asl sabab** qaysi?
2. Bankir 3 ta tasdiq xati oldi. **Idempotency** qaysi bosqichga kerak edi?

**Speaker notes:**
Bu — modulning eng interaktiv qismi. 6 daqiqa, 3 stol bilan ishlash:
- Stol 1 — birinchi savol bo'yicha
- Stol 2 — ikkinchi savol bo'yicha
- Stol 3 — ikkala savolga qaytib, yechim taklif qiladi

**Kutilgan javoblar:**
- 1-savol: Xato 6-bosqichda (CRM yozish), lekin asl sabab — 1) tarmoq xatosi (http=500), 2) retry qildi va oxirida muvaffaqiyat. Ammo step=07 da `sent_count=3` — bu asl muammo: notify_user idempotent emas, har retry'da xat ketgan.
- 2-savol: Idempotency 7-bosqichga (notify_user) kerak edi. CRM yozish idempotent qilingan — `row=#M-3318` (1 ta yozuv). Lekin notify_user har chaqiruvda xat yuborgan.

Auditoriya bilan birga olib kelinglar: "Real production'da shu xato — eng tipik. Endi siz tahlil qilolasiz."

Vaqt: 6 daqiqa.

---

## Slide 15 — Debug checklist · "6 ta savol"

**Sarlavha:** Debug checklist — **6 ta savol**.

**Lead:**
Pipeline buzilganda boshqa savol bermang. Aynan shu 6 ta — tartib bilan. Birinchi 2 daqiqada javobi topilmasa, undan keyin chuqurroq ketamiz.

**6 ta savol (canvas-grid 2x3):**
1. **Qaysi bosqich?** Avval log'ni o'qing. Step raqami bilan FAIL qatorini toping. Boshqa bosqichlarda muammo izlamang.
2. **Kirish to'g'rimi?** Oldingi bosqichning chiqishi shu bosqichga to'g'ri keldimi? Format, tip, tilning kelishuvi.
3. **Birinchi marta xatomi?** Retry tarixi. Ikkinchi urinishda o'tdimi? Vaqtinchalik (network) yoki doimiy xato.
4. **Idempotent bo'ldimi?** Mijozga ortiqcha xat ketdimi? CRM'da takror yozuv bormi? request_id tekshiruvi to'g'rimi.
5. **Promt o'zgardi?** Yaqinda yangilash bo'ldimi? Schema yangilandimi? Few-shot misollar to'g'rimi. Versiyani solishtirish.
6. **Replay imkonimi?** Eski natijalarni yangidan ishlatib bo'ladimi? Yo'q bo'lsa — keyingi pipeline'da bu imkonni qo'ying.

**Speaker notes:**
Bu slayd — auditoriya uydan olib ketadigan checklist. Aytib qo'ying: "Bu 6 ta savolni telefonga yozib oling yoki rasmga oling. Production buzilsa — birinchi 2 daqiqa shu ro'yxat bilan ishlang."

Tartibi muhim: avval **qayerda**, keyin **qaysi bosqich**, keyin **nima sababdan**. Boshqacha ketma-ketlik — vaqt yo'qotish.

Vaqt: 3 daqiqa.

---

## Slide 16 — Production tayyor — yoki tayyor emas

**Sarlavha:** Production'ga tayyor — yoki **tayyor emas**.

**Lead:**
Bu ro'yxatni 11–12-modullarda qurilgan har qanday botga tatbiq eting. 5 ta "Ha" bo'lmasa — pilot rejimida qoldiring.

**Cando (2 ustun):**

✓ **Tayyor — qo'yib yuborsa bo'ladi:**
- Har bosqich alohida log qoldiradi (request_id bilan)
- request_id orqali idempotency tekshiruvi bor
- Schema validatsiyasi va majburiy maydonlar tekshiruvi
- Fallback model (Pro → Flash) sozlangan
- Bankir uchun "qaysi bosqichda nima bo'ldi" hisobot oson topiladi

✗ **Tayyor emas — pilotda qoling:**
- Bitta uzun promt — bosqichlar yo'q
- Log faqat error'da yoziladi, oraliq natija yo'q
- Retry yo'q yoki idempotency'siz retry — mijozga takror xat
- Har so'rov Pro modelda — narx 5–10× shart emas
- Schema yo'q — "har xil maydonlar" CRM'ga tushadi

**Speaker notes:**
Bu — modulning yakuniy aksent. Bankirlar bu slayd bilan ish boshlovchilar bilan suhbatlashishi mumkin: "Loyihangiz pilotmi, productionmi?" 5 nuqta — aniq ro'yxat. Ko'pchilik bot pilotda turishi normal — production talabi qattiq.


Vaqt: 3 daqiqa.

---

## Slide 17 — Closing · "3 xulosa + lug'at recap"

**Sarlavha:** Bugundan **qaytib ketadigan** 3 xulosa.

**3 ta xulosa:**
- 💡 **Bitta promt — qora quti.** Pipeline — aniq bosqichlar, har biri log qoldiradi va alohida qayta ishga tushadi.
- 💡 **Idempotency — birinchi kun'dan.** request_id orqali tekshiruv. Mijozga 2 ta xat ketishi — qaytarib bo'lmaydigan ishonch zarari.
- 💡 **Keyingi modul:** 13-modulda biz JPMorgan, Morgan Stanley, DBS va O'zbekiston banklarining real production keyslarini tahlil qilamiz.

**Lug'at recap (interaktiv, 30–60 sek):**
Auditoriyaga so'rang: "Eslay olasizmi?"
- **Pipeline** = … (jamoa: "Ko'p bosqichli AI ish zanjiri")
- **Idempotent design** = … (jamoa: "Qayta ishga tushsa ham bitta natija")

**Speaker notes:**
Bu yakuniy aksent — 3 xulosa qisqa, takror aytsa bo'ladi. Har biriga 15 soniya. Auditoriya bittasini ham bo'lsa eslab qolishi kerak — eng muhimi: **idempotency birinchi kun'dan**.

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
- "Pipeline qancha bosqichdan iborat bo'lishi kerak?" — javobing: "Eng kam — vazifa talab qiladigan miqdor. Voice bot — 6. RAG bot — 4. Lekin har bosqich bitta vazifa qilishi kerak."
- "Idempotency bizning 1C tizimida qanday ishlaydi?" — bog'lang: "1C — backend, biz n8n orqali ulansak, request_id'ni n8n yozadi. 1C tomonida ham unique constraint qo'shish kerak."
- "Bu hammasi qancha vaqt oladi?" — javob: "Birinchi pilot — 2 hafta. Production-ga 4–6 hafta, agar siz 5 ta 'Ha' ni qo'lga kiritsangiz."

Muvofiqlik savoli kelsa — 3-modulga ko'prik. Production savoli — 13-modulga.

---

## Series-wide bog'lanish

- **Avvalgi modul:** [`11_deck/`](../11_deck/) — Voice memo bot dizayni · STT, Function Calling
- **Keyingi modul:** [`13_deck/`](../13_deck/) — Bank amaliyotidagi real keyslar
- **Atamalar bog'liqligi:**
  - 11-modul'dan: STT (slayd 7, step 02), Function Calling/Schema (slayd 7, step 04–05)
  - 9-modul'dan: RAG, Embedding (slayd 11 — cache uy)
  - 8-modul'dan: Trigger, Webhook (slayd 12 — n8n branching)
  - 5-modul'dan: Few-shot (slayd 8 — ekstrakt yechimi)
- **Bog'liq:** [`bots/02_voice_memo/`](../bots/02_voice_memo/) — bu modulda biz uni tahlil qilamiz va debug qilamiz

## Series-wide terminologiya talab

`cb_decks/CLAUDE.md` ga qarang. 12-modul hissasi: **Pipeline, Idempotent design** — slayd 5 da kiritilgan, slayd 17 da recap. 15-modul yakuniy glossary review'da har ikkalasi qaytib chiqadi.

## Tayyorgarlik checklist (deck'dan tashqari)

- [ ] 11-modul voice bot dizayni yodda — auditoriya 11-modul'dan keladi
- [ ] Bug-hunt slaydidagi log namunasi — auditoriya o'qib tushuna oladigan
- [ ] Branching slaydidagi if/else — n8n misol bilan tayyorlangan
- [ ] Idempotency atamasi uchun "lift tugmasi" yoki "qayta to'lov" misoli yodda
- [ ] Vazirlik logotiplari `_shared/` da turibdi

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Pipeline tushunchasi | 3–6 | ~13 daq |
| 02 · Voice bot pipeline tahlili | 7–8 | ~9 daq |
| 03 · Debugging | 9–13 | ~18 daq |
| 04 · Amaliyot (Bug-hunt → Closing → Q&A) | 14–18 | ~17 daq |
| **Jami** | **18** | **~60 daq** |

# Verdict + Score 6/10

Deck seminar skeleti bo'yicha ishlaydi: voice memo -> STT -> schema -> CRM oqimi tushunarli, STT va Function Calling/Schema atamalari slide 5 da kiritilgan, slide 17 da recap bor, va paired student-build `bots/02_voice_memo/` slide 14 hamda closingda ko'rsatilgan. Repo tekshiruvi: real papka `decks/cb_decks/bots/02_voice_memo/`; `bots/02_voice_memo/` nomi `cb_decks` kontekstida to'g'ri, workspace rootida esa bunday papka yo'q.

Markaziy Bank auditoriyasi uchun asosiy muammo: deck demo ishonchini governance qarori bilan aralashtirib yuborgan. Vendor absolyutlari, manbasiz foizlar, "tashqi cloud'ga chiqmaydi" kabi qat'iy da'volar va "AI majburlaydi/hech qachon o'ylab topmaydi" tili bank boshqaruvi uchun xavfli. Closing ham mashq bilan tugaydi, bank qaror artefakti bilan emas.

## Top 5 Rewrites in Uzbek

1. **Slide 6 - vendor tavsiyasi**

   Hozirgi: "Gemini Flash - bizning tavsiyamiz. Eng yangi audio model. Uzbekni yaxshi tushunadi."

   Taklif: "Seminar demosi Gemini Flash bilan ko'rsatiladi. Bank tanlovi esa 4 mezon bilan qilinadi: o'zbekcha nutq sifati, ma'lumot qayerda qayta ishlanishi, model treningiga kiritmaslik sharti, va ichki tizimlarga ulash qulayligi."

2. **Slide 9/11/17 - foizlarni olib tashlash**

   Hozirgi: "ekstraksiya aniqligi +30%", "30% kirish to'g'ri", "95%+ kirish to'g'ri".

   Taklif: "Schema bo'lmasa CRM yozuvlari turlicha chiqadi va qo'lda tozalash ko'payadi. Schema bilan bot maydonlarni bir xil formatda qaytaradi; xato bo'lsa validatsiya ushlaydi va inson tasdig'iga yuboradi. Aniq foiz faqat pilot natijasidan keyin aytiladi."

3. **Slide 13 - maxfiylik va muvofiqlik**

   Hozirgi: "Audio bank Google Workspace tenant'da. Tashqi cloud'ga chiqmaydi. Vertex AI Workspace Zero-Training bilan."

   Taklif: "Audio va transkript bank tasdiqlagan konturda saqlanadi. Agar tashqi model API ishlatilsa, data residency, DPA, retention, audit log, ruxsatli rollar va model treningiga kiritmaslik bandi alohida tasdiqlanadi. Tasdiqsiz real mijoz ovozi demo yoki pilotga kiritilmaydi."

4. **Slide 5/8/17 - Schema va Function Callingni ajratish**

   Hozirgi: "Schema / Function Calling - AI'ga aniq formatda yozishga majburlash."

   Taklif: "Schema - CRM uchun kerak bo'lgan maydonlar va qoidalar ro'yxati. Function Calling - modeldan shu qoidaga mos JSON olish usuli. Schema tartib beradi; validatsiya noto'g'ri yoki bo'sh maydonni ushlaydi."

5. **Slide 17 - bank qaror artefakti**

   Hozirgi: "3 xulosa + lug'at recap."

   Taklif: "Yakuniy artefakt: Voice Bot Pilot Qarori. Har stol 1 betlik qaror bilan chiqadi: use case, 5 majburiy maydon, ovozda aytish taqiqlangan ma'lumotlar, qachon menejer tasdiqlaydi, retention muddati, pilot success metric, va qaror: pilot / qayta ishlash / to'xtatish."

## Punch List

- **Content accuracy:** "AI majburiy to'ldiradi", "AI hech qaerga sirg'alib chiqmaydi", "hech narsa o'ylab topmaydi" jumlalarini governance-safe qilib yozing: model schema'ga mos qaytarishga yo'naltiriladi, validatsiya xatoni ushlaydi, noaniqlik inson tasdig'iga ketadi.
- **Governance fit:** Slide 13 bank siyosati kabi emas, qaror checklisti kabi bo'lsin: data classification, PII masking, audit log, access control, retention, DPA, data residency, model training opt-out, incident response.
- **Atamalar coverage:** STT yaxshi kiritilgan. Function Calling va Schema esa bitta tushunchaga qo'shilib ketgan; closingda "Schema / Function Calling" nomi to'liq aytilsin va ikkalasining farqi takrorlansin.
- **Uzbek quality:** "Uzbek" -> "o'zbek", "privacy" -> "maxfiylik", "workflow" -> "jarayon", "tenant" -> "tasdiqlangan bulut konturi", "komplaens" -> "muvofiqlik". "Ekipajingiz" o'rniga "tayyor andoza" yoki "tayyor loyiha papkasi" tabiiyroq.
- **Vendor absolutism:** "eng yangi", "eng aniq", "bizning tavsiyamiz", "tashqi cloud'ga chiqmaydi" kabi absolyutlarni vendor-neutral mezonlarga almashtiring. Demo stack va bank procurement qarori alohida turishi kerak.
- **Numeric precision:** Narxlar, "0.6 tiyin", "+30%", "95%+" kabi raqamlar manbasiz. "Vendor narxi o'zgaradi", "pilotda o'lchanadi", "ichki benchmarkdan keyin tanlanadi" formulasi xavfsizroq.
- **Audience tone:** "Yo'lda gapirdi - shu daqiqada CRM'da" Markaziy Bank uchun nazoratsiz avtomatlashtirishdek eshitiladi. "Draft sifatida tushadi; muhim maydonlar tasdiqdan keyin CRM'ga o'tadi" framingini qo'shing.
- **Screenshots:** Slide 6, 11, 13, 17 vizual ravishda o'qiladi, lekin screen holatlarida fragment matnlari juda xira ko'rinadi. Agar QA screenshots yakuniy reveal emas, birinchi revealni olayotgan bo'lsa, review uchun final-state screenshot ham kerak.
- **Student-build verification:** Deck `decks/cb_decks/bots/02_voice_memo/` papkasini ko'rsatadi; papkada `README.md`, `design/conversation-flow.md`, `design/workflow-graph.md`, `design/data-schema.md`, `prompts/extraction-prompt.md` mavjud. Slide 14 da "bots/02_voice_memo" yorlig'i saqlansin, lekin speaker note real repo pathni aniq aytsin.

## Closing Artifact

**Voice Bot Pilot Qarori (1 bet):**

- Use case: qaysi bo'lim, qaysi vaziyat, kim voice memo yuboradi.
- Schema: 5 majburiy maydon + nullable maydonlar.
- Data boundary: ovozda aytish taqiqlangan ma'lumotlar va masking qoidasi.
- Approval gate: qaysi holatda CRM'ga avtomatik, qaysi holatda menejerga.
- Retention: audio, transkript, CRM yozuvi qancha saqlanadi.
- Pilot metric: vaqt tejalishi, xato kamayishi, manual correction ulushi.
- Qaror: pilotga o'tadi / qayta ishlanadi / hozircha to'xtatiladi.

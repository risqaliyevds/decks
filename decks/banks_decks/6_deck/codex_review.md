Verdict: **Shartli o'tadi, lekin Markaziy Bank auditoriyasi uchun hali governance-first emas.** Deck "50+ shablon, nusxa ol, to'ldir, yubor" kayfiyatida qolgan; regulator seminarida asosiy xabar "tasdiqlangan shablon, inson tekshiruvi, audit izi, vakolat chegarasi" bo'lishi kerak. Atamalar talabi bajarilgan, ammo System Prompt / Template Prompt intro va recap yanada aniqroq, interaktivroq bo'lishi lozim.

Score: **6/10**

## Punch-list

1. **Content accuracy:** Kredit memo, HR, Marketing va "mijozga javob" misollari tijorat banki ichki amaliyotiga yaqin; Markaziy Bank uchun asosiy tokchalar bank nazorati, prudensial tahlil, normativ tushuntirish, murojaatlar va AML/CFT bo'lishi kerak. "Bosh boshqaruvchi imzolagan darajada", "10 yillik bankir yozgandek", "1 daqiqada yubor" kabi da'volar haddan tashqari absolut.

2. **Governance fit:** Slide 6 va 12 governance ni eslatadi, lekin yetarli darajada formal qilmaydi. Har template uchun egasi, versiya, tasdiqlovchi, ma'lumot tasnifi, ruxsatli platforma, eskalatsiya sharti, audit izi va qayta ko'rib chiqish sanasi majburiy maydon sifatida ko'rinishi kerak.

3. **Atamalar:** System Prompt va Template Prompt rasmiy kiritilgan, recap bor. Muammo: slide 4 atamalarni slide 5 dan oldin to'liq ishlatib yuboradi; slide 13 esa javoblarni darhol ko'rsatadi, interaktiv "Eslay olasizmi?" shakli zaif. Slide 5 dagi "botning miyasi" iborasi non-technical auditoriya uchun tushunarli, lekin regulator kontekstida "doimiy yo'riqnoma" aniqroq.

4. **Uzbek quality:** Umumiy til yaxshi, lekin bir nechta joyda o'zbekcha ish yuritish uslubi marketing ohangiga o'tib ketadi: "zo'r promt", "qutqaruvchi", "sehr emas", "aksiya olgan", "doston yozib beradi". Xatolar: `smendayoq/smenadayoq`, `qollarni` -> `qo'llarni`, `to'g'irlaymiz` -> `to'g'rilaymiz`, `instruktsiya` -> `yo'riqnoma`.

5. **Vendor absolutism:** Notes/content "Gemini + n8n + Notion/Confluence"ni stack sifatida qulflab qo'ygan. Markaziy Bank deckida bu "tasdiqlangan SI platformasi + tasdiqlangan avtomatlashtirish vositasi + ichki bilim bazasi" deb vendor-neutral berilishi kerak; Gemini/n8n faqat demo varianti sifatida aytilsin.

## Top 5 Uzbek Rewrites

1. **Slide 3 hook**

Current tone: "Nusxa ol, 3 ta maydonni to'ldir, yubor."

Rewrite:
> **Noldan yozma — tasdiqlangan shablondan boshlang.**  
> Shablon hujjat tuzilmasi, ohangi va majburiy nazorat nuqtalarini bir xil ushlab turadi. Xodim ma'lumotni kiritadi, SI loyiha matnini tayyorlaydi, yakuniy tekshiruv va imzo mas'ul xodimda qoladi.

2. **Slide 5 System Prompt intro**

Rewrite:
> **System Prompt — doimiy yo'riqnoma.**  
> U SI yordamchisiga rol, ohang, ruxsat etilgan manbalar va taqiqlangan harakatlarni belgilab beradi. Masalan: "Faqat kiritilgan hujjat va ko'rsatilgan normativ bandlarga tayan. Manba topilmasa, taxmin qilma."

3. **Slide 5 Template Prompt intro**

Rewrite:
> **Template Prompt — to'ldiriladigan ish blankasi.**  
> Unda doimiy tuzilma va bo'sh maydonlar bo'ladi: `[HUJJAT_RAQAMI]`, `[SANA]`, `[NORMATIV_BAND]`, `[TEKSHIRUV_NATIJASI]`. Xodim faqat bugungi ishga tegishli ma'lumotlarni kiritadi.

4. **Slide 6 categories**

Rewrite:
> **Kutubxona — Markaziy Bank ish jarayonlari bo'yicha 5 yo'nalish:**  
> Bank nazorati; prudensial ko'rsatkichlar tahlili; AML/CFT va muvofiqlik; normativ-huquqiy tushuntirish; fuqarolar va tashkilotlar murojaatlari. Har shablonda egasi, versiyasi, tasdiqlovchisi va qo'llash chegarasi ko'rsatiladi.

5. **Slide 12 + recap**

Rewrite:
> **Yuborishdan oldin 4 darvoza:** faktlar manba bilan solishtirildi; ortiqcha shaxsiy yoki maxfiy ma'lumot olib tashlandi; matn vakolatdan oshib qaror bermayapti; shablon ID, versiya, foydalanuvchi, sana va tasdiqlovchi audit iziga yozildi.  
> **Recap:** "System Prompt nima?" — doimiy yo'riqnoma. "Template Prompt nima?" — to'ldiriladigan ish blankasi.

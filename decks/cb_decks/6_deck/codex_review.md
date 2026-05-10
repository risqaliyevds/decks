Verdict: Deck is usable as a generic bank prompt-template demo, but not yet “Markaziy Bank-ready”; governance, data controls, approval workflow, and regulator-specific language are too soft.

Score: **5/10**

## Top 5 Content Improvements

1. **Kutubxona “tayyor promtlar ro‘yxati” emas, boshqariladigan reyestr bo‘lishi kerak.**

Current framing: “50+ shablon, nusxa ol, to‘ldir, yubor” sounds risky for a regulator.

Rewrite:
> **Promt kutubxonasi — bu tasdiqlangan ish shablonlari reyestri.**  
> Har bir shablonda egasi, versiyasi, tasdiqlovchisi, qo‘llash sohasi, taqiqlangan holatlar va oxirgi ko‘rib chiqilgan sana bo‘ladi. Xodim shablonni o‘zgartirsa, yangi versiya sifatida muvofiqlik va axborot xavfsizligi ko‘rigidan o‘tadi.

2. **Slide 3 hook haddan tashqari “tezlik”ka sotyapti; Markaziy Bank auditoriyasiga “nazorat + izchillik” sotilishi kerak.**

“3 ta maydonni to‘ldir, yubor” regulator uchun yomon signal. “Yuborish”dan oldin inson tekshiruvi shart.

Rewrite:
> **Noldan yozma — tasdiqlangan shablondan boshlang.**  
> Shablon hujjat tuzilmasini, ohangni va majburiy nazorat nuqtalarini bir xil qiladi. Xodim ma’lumotni kiritadi, AI loyiha matnini tayyorlaydi, yakuniy qaror va imzo mas’ul xodimda qoladi.

3. **Promptlarning o‘zida governance yetishmaydi: ma’lumot sinfi, manba, eskalatsiya, audit izi yo‘q.**

Har bir template ichiga `[MA’LUMOT_TASNIFI]`, `[MANBA_HUJJAT]`, `[TASDIQLOVCHI]`, `[ESKALATSIYA_SHARTI]` kiritish kerak.

Rewrite template block:
```text
[NAZORAT QOIDALARI]
- Faqat kiritilgan hujjat va ko‘rsatilgan normativ manbalarga tayan.
- Normativ band topilmasa: “Normativ asos ko‘rsatilmagan” deb yoz.
- Shaxsiy ma’lumotlarni yakuniy xulosaga ko‘chirma.
- Qaror qabul qilma; faqat loyiha xulosa va tekshiruv savollarini tayyorla.

[KIRISH MA’LUMOTLARI]
- Ma’lumot tasnifi: [OCHIQ / ICHKI / MAXFIY]
- Manba hujjat: [HUJJAT_NOMI_RAҚAMI_SANASI]
- Tekshiruvchi xodim: [FIO_LAVOZIM]
- Tasdiqlovchi: [BOLIM_RAHBARI]
```

4. **Markaziy Bank specificity zaif: Kredit, HR, Marketing tijorat bankiga o‘xshaydi.**

Audience Markaziy Bank bo‘lsa, asosiy “tokchalar” bank nazorati, prudensial tahlil, murojaatlar, normativ-huquqiy tushuntirish, muvofiqlik/AML bo‘lishi kerak.

Rewrite slide 6 categories:
> **Kutubxona — Markaziy Bank ish jarayonlari bo‘yicha 5 yo‘nalish:**  
> 1. **Bank nazorati:** kapital, likvidlik, prudensial ko‘rsatkichlar bo‘yicha tahlil  
> 2. **Muvofiqlik va AML/CFT:** shubhali belgilar, sanksiya riski, ichki nazorat savollari  
> 3. **Normativ tushuntirish:** tijorat banklariga rasmiy izoh va qo‘llash bo‘yicha xat  
> 4. **Murojaatlar:** fuqarolar va tashkilotlardan kelgan murojaatlarga javob loyihasi  
> 5. **Boshqaruv axboroti:** rahbariyat uchun qisqa brif, xulosa va qaror variantlari

5. **Slide 12 sifat tekshiruvi yaxshi, lekin bank-ready emas: “5+5 belgi” o‘rniga approval gate kerak.**

Current checklist individual hushyorlikka tayanadi. Regulator uchun formal gate bo‘lishi kerak.

Rewrite:
> **Yuborishdan oldin 4 ta majburiy darvoza:**  
> **1. Fakt tekshiruvi:** raqam, sana, bank nomi va normativ band manba bilan solishtirildi.  
> **2. Ma’lumot xavfsizligi:** ortiqcha shaxsiy yoki maxfiy ma’lumot olib tashlandi.  
> **3. Muvofiqlik ko‘rigi:** xulosa vakolatdan oshmaydi, qaror sifatida yozilmagan.  
> **4. Audit izi:** shablon ID, versiya, foydalanuvchi, sana va tasdiqlovchi qayd etildi.

Brutal bottom line: deck “AI bilan tezroq yozamiz” kayfiyatida qolib ketgan. Markaziy Bank uchun uni “tasdiqlangan shablonlar orqali izchil, tekshiriladigan va javobgarligi aniq ish yuritamiz” degan pozitsiyaga burish kerak.

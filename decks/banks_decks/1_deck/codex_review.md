# Verdict + Score 7/10

Deck kuchli ochiladi: non-technical auditoriyaga AI'ni sodda metafora, jonli demo va 3 ta asosiy atama orqali tushuntiradi. Lekin Markaziy Bank auditoriyasi uchun governance tili hali yetarli darajada "regulyatorcha" emas: demo xavfsizligi, AI qaror qabul qilmasligi, manba chegarasi, shartnoma/audit talablari va yakuniy qaror artefakti aniqroq yopilishi kerak.

Score: 7/10. Tuzatilsa 8.5/10 ga chiqadi.

## Punch List

1. **Content accuracy + Markaziy Bank fit**
   - Spherical Insights raqamlari mos: $20.87B (2023) -> $310.79B (2033), CAGR 31.01%, APAC fastest growth deb berilgan. Lekin slide 13 dagi "O'zbekiston aynan shu mintaqada" jumlasi ehtiyotkor emas: O'zbekiston odatda Central Asia deb yuritiladi, APAC forecast'ini to'g'ridan-to'g'ri O'zbekistonga bog'lamang.
   - "Har stol shu botni o'z PDF'i bilan qura oladi", "har biringiz bot yasab ketasiz" kabi va'dalar Markaziy Bank kontekstida kuchli eshitiladi. "Prototip mantig'ini tushunamiz / past xavfli use case tanlaymiz" deb yumshating.
   - "Google bilan Zero-Training kelishuvi bor" fakt sifatida aytilmasin, agar aynan shartnoma yo'q bo'lsa. "Faqat korporativ shartnoma va zero-training sharti tasdiqlangandan keyin" deyish kerak.
   - Markaziy Bank uchun "mijozlarga xizmat / avtokredit" misoli tijorat bankiga yaqin. Regulyatorga mosroq misollar qo'shing: normativ hujjat qidiruvi, banklardan kelgan hisobotlarni dastlabki tekshirish, murojaatlarni yo'naltirish, ichki FAQ.
   - Slide 11/17 dagi human-in-loop yaxshi, lekin "audit log", "ma'lumot klassifikatsiyasi", "vakolat", "model javobi tavsiya xolos" kabi governance markerlar yetishmaydi.

2. **Atamalar coverage: LLM + Promt + API**
   - Slide 8 lug'at mavjud va series rule'ga mos: LLM, Promt, API dict-card sifatida kiritilgan.
   - Slide 19 closing recap ham mavjud, lekin screenshotda juda mayda va "LLM = miya / Promt = buyruq / API = avtomat ulash" juda qisqa. Speaker notes yaxshi, lekin slaydning o'zida bank misoli yetishmaydi.
   - "Promt" atamasi kurs mapping'ida shunday berilgan, lekin professional auditoriya uchun bir marta "prompt/promt" yozilishi haqida izoh berish mumkin. Aks holda "Promt" imlo xatosidek ko'rinadi.
   - RAG slide 15-16 da qayta ta'rifga yaqin keladi. CLAUDE rule bo'yicha RAG rasmiy atama sifatida deck 11 ga tegishli; bu yerda "hujjatga tayangan javob mexanizmi" deb yuritib, RAG'ni faqat nom sifatida qoldiring.

3. **Uzbek language quality**
   - Umumiy til jonli, lekin ayrim joylari og'zaki va keskin: "poyezdga sakrab chiqish", "aqldan ozdiradigan", "bir tiyinlik qadri yo'q", "o'rnini egallaydi". Markaziy Bank seminarida bularni aniq, sokin, professional gaplarga almashtiring.
   - "AI", "No-code", "production-grade", "data labeling", "MVP" kabi inglizcha qatlam ko'p. Kerakli joyda qavsli izoh bering yoki soddalashtiring.
   - "ssilka", "klishe", "printsip" o'rniga "havola", "andoza gap", "tamoyil" ishlating.
   - "Markaziy Bank" bilan gapirganda "bankingiz" o'rniga ko'proq "bo'limingiz", "tashkilotingiz", "nazorat jarayoni", "ichki ish oqimi" ishlasin.

4. **New Tanishuv slide 3**
   - Slide yaxshi ko'rinadi va ishonch beradi, lekin "10+ AI loyiha va prototip", "5+ startup va MVP", "2 kun real loyihalardan olingan darslar" kabi formulirovka "10+ production AI mahsulotlar"dan ishonchliroq.
   - Bank/regulyator auditoriyasi uchun eng kuchli signal loyiha nomlari emas, risk-aware delivery: "o'zbek tilidagi AI, hujjat bilan ishlash, demo/prototip, xavfsizlik cheklovlari bilan ishlash tajribasi".
   - "Bugun sizga shu tajribani topshiraman" o'rniga "shu tajribadan amaliy ish tartibini chiqarib beraman" deyish kerak. Bu kamroq oversell.

5. **Closing bank decision artifact**
   - Slide 19 yaxshi recap, ammo qaror artefakti yo'q. Modul oxirida ishtirokchi qo'lida bitta bankcha artefakt qolishi kerak: "AI tashabbusi uchun 1 betlik qaror kartasi".
   - Closingda 3 savol bo'lsin: qaysi jarayon, qaysi ma'lumot, qaysi nazorat? Bu 2-deck use-case discovery'ga tabiiy ko'prik bo'ladi.
   - Artefakt Markaziy Bank governance tilida bo'lsin: maqsad, ma'lumot turi, risk darajasi, inson tasdig'i, audit izi, pilot mezoni, go/no-go qarori.

## Top 5 Rewrites In Uzbek

1. **Slide 3 Tanishuv - credibility without oversell**
   - Hozirgi yo'nalish: "10+ production AI mahsulotlar / 2 kun - tajribani topshiraman"
   - Rewrite:
   > 3+ yildan beri o'zbek tilida ishlaydigan AI yechimlar, hujjat bilan ishlaydigan yordamchilar va prototiplar ustida ishlayman. Bu 2 kunda sizga model nomlarini emas, bank jarayonida AI'ni xavfsiz sinash tartibini ko'rsataman.

2. **Slide 6 demo - governance-safe claim**
   - Hozirgi yo'nalish: "Modul oxirida har stol shu botni o'z PDF'i bilan qura oladi"
   - Rewrite:
   > Bugun biz botning ishlash mantiqini ko'ramiz: savol keladi, tasdiqlangan hujjatdan dalil topiladi, javob qoralamasi tayyorlanadi. Real joriy etish faqat ma'lumot xavfsizligi, vakolat va inson tasdig'i belgilangandan keyin ko'rib chiqiladi.

3. **Slide 8 lug'at - stronger bank examples**
   - Rewrite:
   > LLM - matnni tushunadigan til modeli: nizom, xat va murojaat matnini o'qiydi.  
   > Promt - AI'ga beriladigan aniq topshiriq: "shu hujjatdan 3 ta riskni top va band raqamini ko'rsat".  
   > API - AI'ni ichki tizimga ulash yo'li: xat, bot yoki CRM'dan kelgan so'rov avtomatik qayta ishlanadi.

4. **Slide 13 regional stat - avoid overclaim**
   - Hozirgi yo'nalish: "O'zbekiston aynan shu mintaqada"
   - Rewrite:
   > Bu raqamlar O'zbekiston bo'yicha alohida prognoz emas, lekin bank sektorida AI tezlashayotganini ko'rsatadigan global signal. Biz uchun muhim xulosa: texnologiyani shoshilmasdan, nazorat va pilot mezonlari bilan sinash kerak.

5. **Slide 19 closing - add decision artifact**
   - Rewrite:
   > Bugungi yakuniy natija: har bir guruh bitta "AI qaror kartasi"ni to'ldiradi. 1) Qaysi jarayon takrorlanadi? 2) Qaysi tasdiqlangan hujjatga tayanadi? 3) Qaysi joyda inson tasdig'i shart? Shu karta 2-moduldagi use-case tanlovimizga kirish nuqtasi bo'ladi.

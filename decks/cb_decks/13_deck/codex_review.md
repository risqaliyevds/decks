# Verdict

**Score: 6.5/10.** Deck yaxshi hikoya qiladi va 13-modul uchun kerakli ikki atamani (`AI Adoption`, `Production-grade`) toza kiritib, closing slaydda qaytaradi. Lekin Markaziy Bank auditoriyasi uchun hali "case inspiration" og'ir, "supervisory decision artifact" yengil. Eng katta risklar: manbasi noaniq yoki aralash raqamlar, vendor/yo'l bo'yicha absolut gaplar, regional keyslar dalilsiz umumlashtirilgani, va yakunda bank nimani qaror qilishi kerakligi hujjat ko'rinishida yopilmagani.

## Punch List

1. **McKinsey 70/14 hook'ni bank-specific deb aytmang.** Slayd 3 va speaker textda "dunyo bo'ylab banklarning 70 foizi / 14 foizi" deyiladi, lekin buni aniq bank sektori metrikasi sifatida ishlatish xavfli. Agar manba umumiy AI survey bo'lsa, "global tashkilotlar bo'yicha" yoki "banklarda ham ko'rinadigan muammo" deb yumshating. Manba nomi va yilini slayd footnote'iga qo'ying.

2. **DBS raqamlari aralashgan.** Slayd 9/notes 600+ use case deydi; DBS 2023 annual report kontekstida ko'proq "800+ models, 350 use cases, SGD 370M economic benefit" shakli uchraydi. "600+ use case"ni "350+ use case / 800+ model"ga to'g'rilang yoki eski 2022/2023 manbasini alohida ko'rsating.

3. **Morgan Stanley va JPMorgan natija claimlarini ehtiyotlang.** "30-40 daqiqadan 1 daqiqaga" va "xato darajasi yurist bilan teng yoki yaxshiroq" kabi gaplar kuchli, lekin slaydda manba yo'q. Rasmiy ochiqlanmagan joylarda "reported / bank oshkor qilmagan / taxminiy" deb ayting. Markaziy Bank auditoriyasi bunday metrikaga darhol "qanday o'lchangan?" deb qaraydi.

4. **BofA Erica raqamlariga sana qo'shing.** "2 mlrd+ interaksiya, 42 mln+ aktiv foydalanuvchi" yaxshi hook, lekin vaqt kesimi kerak: qaysi annual report, qaysi yil oxiri, "active users" Erica uchunmi yoki digital banking uchunmi. Slaydda "BofA annual report, 2023/2024" kabi aniq izoh bo'lsin.

5. **Sberbank slaydi vendor absolutizmga yaqin.** "O'zbekiston uchun erta" va "mavjud xavfsiz API'lardan foydalanish to'g'ri qaror" Markaziy Bank uchun haddan tashqari normativ. Regulyator auditoriyasida to'g'ri savol: build/buy/hosted API/on-prem open model tanlovining risk mezonlari. "To'g'ri qaror" o'rniga "past xavfli pilot uchun boshqariladigan API yoki lokal deployment variantlari solishtiriladi" deb yozing.

6. **"OpenAI/Anthropic/Yandex API'lari" qatori governance jihatdan nozik.** Markaziy Bank auditoriyasida vendor nomi emas, data residency, audit log, shartnoma, model monitoring, PII masking, incident response mezonlari muhim. Vendorlar ro'yxatini "sertifikatlangan / shartnomaviy nazorat ostidagi vendor"ga aylantiring.

7. **Mintaqaviy keyslar dalilga muhtoj.** Halyk, Forte, Uzum, Anorbank, Kapital Bank bo'yicha "core stack", "millionlab foydalanuvchi", "2024 dan AI" kabi jumlalar manbasiz turibdi. Rasmiy press release yoki annual report bo'lmasa, "e'lon qilingan raqamlar cheklangan; kuzatilayotgan yo'nalishlar" deb ayting.

8. **Governance fit kuchaytirilishi kerak.** Success factors ichida risk/compliance bor, lekin Markaziy Bank uchun alohida "qaror oldidan 6 savol" kerak: ma'lumot qayerda saqlanadi, PII qanday maskalanadi, model qarorini kim imzolaydi, audit log qayerda, fallback nima, model drift qanday kuzatiladi.

9. **Production-grade ta'rifi yaxshi, lekin bank standarti bilan yopilmagan.** Slayd 5 99% uptime, log, fallback, monitoring deydi. Bank auditoriyasi uchun bunga SLA, RTO/RPO, access control, change management, audit trail, model validation, complaint handling qo'shilsa atama realroq bo'ladi.

10. **AI Adoption uchun "70+ foiz xodim" juda aniq threshold bo'lib qolgan.** Bu universal standart emas. "Adoption = belgilangan foydalanuvchi guruhida muntazam foydalanish va ish natijasiga ta'sir" deb bering; thresholdni har loyiha KPI sifatida belgilaydi.

11. **Uzbek tili umumiy yaxshi, lekin aralash register ko'p.** "technical", "comply", "production", "core stack", "drift", "use case" ishlatiladi. Ba'zilari kurs atamalari sifatida qolishi mumkin, lekin birinchi ishlatilganda o'zbekcha tayanch qo'shing: "drift - mos kelmaslik nuqtasi", "use case - aniq qo'llash holati", "compliance - muvofiqlik".

12. **Ba'zi iboralar davlat auditoriyasi uchun keskin.** "eng ommabop qabr", "cho'kadi", "taxtga qo'yiladi" og'zaki energiya beradi, lekin Markaziy Bank seminarida biroz silliqlash kerak. "eng ko'p uchraydigan tugallanmagan holat", "shu bosqichda to'xtab qoladi", "arxivda qoladi" yetarli.

13. **Ending qaror artefakti bilan tugamayapti.** Slayd 17 mashq yaxshi, lekin slayd 18 closing faqat xulosa. Oxirida "AI pilot readiness one-pager" yoki "Production gate checklist" berilishi kerak. Auditoriya bo'limga qaytganda bitta qaror hujjatini to'ldira olsin.

14. **Screenshots bo'yicha vizual holat yaxshi, lekin dense slaydlar bor.** 14, 16, 17-slaydlar 60 daqiqalik live delivery uchun o'qilishi mumkin, lekin auditoriya yoshi/aralashligi hisobga olinsa matnni 15-20% qisqartirish foydali. 17-slaydda jadvalni "topshiriq qog'ozi" sifatida alohida printable artifact qilish ham yaxshi.

15. **Atamalar coverage series rule'ga mos.** Slayd 5 da rasmiy kiritilgan, 13-16 da kontekstda ishlatilgan, 18 da recap bor. Faqat `Production-grade` avval deck 11 notesida "production-grade RAG" deb ishlatilgani bor; bu yerda rasmiy ta'rif 13-modulniki bo'lib qolishi uchun boshqa decklarda qayta ta'riflanmaganini tekshirish kerak.

## Top 5 Rewrites In Uzbek

1. **Slayd 3 hook**

   Hozirgi: "70% bankda AI bor. Faqat 14% production'da ishlaydi."

   Taklif: "AI pilotlari ko'p, production kam. McKinsey 2024 so'rovi shuni ko'rsatadi: tashkilotlar AI'ni tez sinayapti, lekin kundalik ishga chiqarish ancha qiyin. Bugungi savol: bankda pilotdan production'ga o'tish uchun qaysi shartlar kerak?"

2. **Slayd 5 AI Adoption**

   Hozirgi: "kunlik ishda 70+ foiz xodim shu vositadan foydalanyapti."

   Taklif: "AI Adoption - tizim borligi emas, belgilangan foydalanuvchi guruhi uni muntazam ishlatishi va bu ish natijasida ko'rinishi. Masalan: 50 nafar operatorning ko'p so'rovlari yangi yordamchi orqali o'tadi, vaqt va xato metrikasi o'lchanadi."

3. **Slayd 10 Sberbank / build-vs-buy saboq**

   Hozirgi: "O'zbekiston uchun hozircha bu yo'l erta - mavjud xavfsiz API'lardan foydalanish to'g'ri qaror."

   Taklif: "Biz uchun saboq: 'o'z modelimiz' va 'tashqi vendor' ikki ekstremal tanlov emas. Har pilot uchun 4 mezon solishtiriladi: ma'lumot qayerda qoladi, audit log bormi, xarajat qancha, fallback qanday. Shundan keyin API, lokal model yoki ichki platforma tanlanadi."

4. **Slayd 13 governance factor**

   Hozirgi: "Muvofiqlik hamkor: Risk va comply'dan keyin emas - ular bilan birgalikda boshlash."

   Taklif: "Muvofiqlik boshidan stol atrofida bo'ladi: qaysi ma'lumot ishlatiladi, kim tasdiqlaydi, audit izi qayerda saqlanadi, mijozga noto'g'ri javob berilsa kim javobgar - bular pilotdan oldin yoziladi."

5. **Slayd 18 closing / bank decision artifact**

   Hozirgi: "Bugundan qaytib ketadigan 3 xulosa."

   Taklif: "Bugundan olib ketiladigan hujjat: AI pilot readiness varaqasi. 1) use case va foydalanuvchi guruhi, 2) ma'lumot manbasi va PII nazorati, 3) inson tasdig'i va fallback, 4) adoption KPI, 5) production gate: SLA, log, monitoring, egasi. Shu 5 qatordan o'tmagan pilot production'ga chiqmaydi."

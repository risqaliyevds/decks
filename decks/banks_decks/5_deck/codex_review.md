Verdict: **Score 6/10**. Deck struktura jihatdan tayyor: 13 slayd, Few-shot + Chain-of-Thought slide 5 da kiritilgan, slide 12 da recap bor, maxfiylik haqida ogohlantirish qo'shilgan. Lekin mazmun hali "Markaziy Bank xodimlari uchun professional promt muhandisligi" darajasiga to'liq chiqmagan: misollar retail kredit/avtokreditga og'ib ketgan, CoT ichki fikrlashni ochishga chaqirgandek berilgan, governance qismi public AI va bank siri bo'yicha yetarlicha qat'iy emas, ayrim jumlalar vendor/AI absolutizmiga yaqin.

## Punch-list

1. **Content accuracy: Chain-of-Thought xavfsiz berilmagan.**  
   Slide 5/7/12 da "qadamma-qadam o'yla", "fikrla, keyin javob ber", "fikr zanjiri" iboralari professional muhitda noto'g'ri signal beradi. Regulyator auditoriyasi uchun kerak narsa modelning ichki fikrini chiqarish emas, balki tekshiriladigan asos: faktlar, mezon, hisob-kitob, noaniqlik, inson tasdig'i.

2. **Governance fit: MB konteksti zaif.**  
   Slide 3/7/9 dagi "80 mln avtokredit", "DTI < 45%", "kredit tasdiqlanadimi" misollari tijorat banki front-office ishiga o'xshaydi. Markaziy Bank uchun nazorat xati, AML/CFT hisobot, prudensial ko'rsatkichlar, normativ hujjat solishtirish, rahbariyat brifi kabi regulyator vazifalari ustun bo'lishi kerak.

3. **Atamalar: Few-shot yaxshi, CoT intro va recap qayta yozilishi kerak.**  
   Few-shot "namuna bilan o'rgatish" sifatida tushunarli. Chain-of-Thought esa "ichki fikrni yozdirish" emas, "asoslangan javob formati" sifatida berilsin. Recap ham "qadamma-qadam o'yla" emas, "asos, hisob va tekshiruv bandlarini ko'rsat" deb yopilishi kerak.

4. **Uzbek quality: ayrim iboralar sun'iy yoki og'zaki haddan tashqari.**  
   "AI sizning ovozingizni oladi", "oltin standart", "AI ahmoqona javob beradi", "mo''jizaviy promt", "doston yozib beradi" kabi iboralar seminarni jonlantiradi, lekin Markaziy Bank auditoriyasida bir oz arzon eshitilishi mumkin. Ton: sodda, lekin institutsional bo'lsin.

5. **Vendor absolutism / AI absolutism: haddan tashqari ishonch kamaytirilsin.**  
   "Shablon ishingizni kamida 30 daqiqaga qisqartiradi", "xato keskin kamayadi", "sifatli javob", "AI auditga bemalol tushuntirib beradi", "natijaning yomon chiqishi AI xatosi emas" kabi tezislar yumshatilsin. To'g'ri ramka: promt xatoni kamaytiradi, lekin yo'q qilmaydi; yakuniy qaror va javobgarlik xodimda qoladi.

## Top 5 Uzbek Rewrites

1. **Slide 7 CoT lead / atama izohi**

   Eski yo'nalish: "AI'ni fikrla, keyin javob ber deb yo'naltirsangiz..."  
   Rewrite:
   > Chain-of-Thought bu AI'ning ichki fikrini yozdirish emas. Amaliy ishda undan maqsad: javobda faktlar, hisob-kitob, qaror mezoni va tekshirilishi kerak bo'lgan joylarni alohida ko'rsatish.

2. **Slide 7 promt namunasi**

   Rewrite:
   > Quyidagi ma'lumot asosida qisqa nazorat xulosasi tayyorla. Faqat berilgan faktlarga tayan. Javob formatini saqla: 1) asosiy faktlar, 2) qo'llangan mezon, 3) hisob-kitob, 4) nomuvofiqlik yoki risk, 5) inson tekshirishi kerak bo'lgan bandlar. Yetishmagan ma'lumot bo'lsa, taxmin qilma.

3. **Slide 3/7 retail kredit misolini MB kontekstiga almashtirish**

   Rewrite:
   > Tijorat bankidan kelgan AML/CFT hisobotida 3 ta yuqori riskli operatsiya ko'rsatilgan. Vazifa: rahbariyat uchun 1 betlik xulosa tayyorla: faktlar, risk sababi, qaysi talabga bog'liqligi, ochiq savollar va keyingi nazorat qadami.

4. **Slide 10 maxfiylik/governance qoidasi**

   Rewrite:
   > Public AI servisiga mijoz F.I.Sh., hisob raqami, STIR/JShShIR, tranzaksiya ID, ichki tekshiruv xulosasi, nazorat yozishmalari yoki bank siri bo'lgan matn kiritilmaydi. Faqat tasdiqlangan korporativ muhitda, minimal zarur kontekst bilan ishlang. Shaxsiy identifikatorlarni olib tashlang, raqamlarni agregatsiya qiling, yakuniy xulosani mas'ul xodim tekshirsin.

5. **Slide 12 recap va yakuniy tezis**

   Rewrite:
   > Few-shot Prompting = AI'ga tasdiqlangan 2-3 ta namuna berib, kerakli format va ohangni ko'rsatish.  
   > Chain-of-Thought = yakuniy javobda asos, mezon, hisob-kitob va tekshiruv bandlarini ko'rsatishni so'rash.  
   > Yaxshi promt xatoni kamaytiradi, lekin javobgarlikni AI'ga o'tkazmaydi.

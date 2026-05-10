Verdict: **6/10**. Muvofiqlik swap qilingan, lekin deck hali ham “Markaziy Bank professional prompt engineering” emas, ko‘proq retail-bank xodimlari uchun basic ChatGPT treningga o‘xshaydi.

**Top 5 remaining content fixes**

1. **Markaziy Bank konteksti noto‘g‘ri: kredit/avtokredit approval juda retail-bank.**  
Slide 3/7/9 dagi “80 mln avtokredit, DTI, tasdiqlanadimi” misollari MB xodimi uchun begona va hatto vakolat jihatdan chalkash. Operatsion/muvofiqlik/management uchun regulyator ishlariga burish kerak.

Rewrite:
> “Tijorat bankidan kelgan AML hisobotida 3 ta yuqori riskli tranzaksiya bor. Me’yoriy talab: shubhali operatsiyalar bo‘yicha izoh, manba va keyingi nazorat chorasi ko‘rsatilishi kerak. 1 betlik rahbariyat xulosasini tayyorla: faktlar, risk, ochiq savollar, tavsiya.”

2. **Chain-of-Thought “qadamma-qadam o‘yla / fikrni ko‘rsat” deb o‘rgatilgan, bu professional darajada xavfli.**  
Audit izi kerak, lekin “modelning ichki fikr zanjiri” emas. Professional prompt: hisob-kitob, dalil, taxmin, manba, qaror mezoni ko‘rsatiladi.

Rewrite:
> “Ichki fikrlash jarayonini yozma. Natijani quyidagi formatda ber: 1) ishlatilgan faktlar, 2) hisob-kitob yoki tekshiruv mezoni, 3) topilgan nomuvofiqliklar, 4) ishonch darajasi, 5) inson tekshirishi kerak bo‘lgan joylar.”

3. **Maxfiylik qoidasi juda sodda: “ismni Mijoz X qiling” yetmaydi.**  
Muvofiqlik auditoriyasida PII, bank siri, ichki nazorat hujjatlari, tergov/tekshiruv materiallari, regulator yozishmalari bor. “Anonimlashtirib yuboring” degan gap public AI uchun yetarli siyosat emas.

Rewrite:
> “AI’ga faqat tasdiqlangan korporativ muhitda ma’lumot kiriting. Public servisga mijoz F.I.Sh., hisob raqami, STIR/JShShIR, tranzaksiya ID, ichki tekshiruv xulosasi yoki bank siri bo‘lgan matn kiritilmaydi. Zarur bo‘lsa: agregatsiya qiling, identifikatorlarni olib tashlang, minimal kontekst bering.”

4. **“Yomon natija AI xatosi emas, bizning qolip bermaganimiz” degan tezis noto‘g‘ri va xavfli.**  
Professional auditoriya uchun AI har doim tekshiriladigan yordamchi. Prompt yaxshi bo‘lsa ham model xato qiladi, manba to‘qiydi, siyosatni noto‘g‘ri talqin qiladi.

Rewrite:
> “Yaxshi promt xatoni kamaytiradi, lekin yo‘q qilmaydi. Yakuniy qaror AI’da emas, mas’ul xodimda qoladi. Har bir javobda manba, taxmin, noaniqlik va tekshirish kerak bo‘lgan bandlar alohida ko‘rsatiladi.”

5. **Professional daraja yetishmayapti: 5 element + few-shot + CoT basic daraja.**  
Module 5 “professional level” bo‘lsa, kamida output criteria, source grounding, red-team check, escalation, reusable template governance bo‘lishi kerak.

Rewrite slide/checklist:
> “Professional promt checklist:  
> 1) Maqsad: qaror, xulosa yoki loyiha matnimi?  
> 2) Manba: faqat berilgan hujjatlarga tayan.  
> 3) Chegara: yetishmagan ma’lumotni taxmin qilma.  
> 4) Format: rahbariyat xulosasi / jadval / risk reyestri.  
> 5) Nazorat: noaniqliklar va inson tasdiqlashi kerak bo‘lgan bandlarni chiqar.  
> 6) Maxfiylik: shaxsiy va bank sirini kiritma.”

Most urgent rewrite: replace retail credit examples with **regulatory supervision, AML/CFT, internal memo, policy comparison, management briefing** examples. Otherwise the muvofiqlik terminology is fixed, but the substance still smells like commercial-bank customer service training.

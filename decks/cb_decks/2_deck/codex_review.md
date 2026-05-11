# Codex Review · 2-deck

## Verdict + Score

**Verdict:** Shipga yaqin, lekin Markaziy Bank auditoriyasi uchun hali **governance-ready** emas. Workshop energiyasi yaxshi, Use Case/Pilot skeleti bor, canvas ham ishlaydi. Lekin 5 joyni silliqlash kerak: Markaziy Bank mandati, atamalarni Uzbek-first kiritish, texnik aniqlik, vendor/AI absolutizmini yumshatish, va yakunda bank qaror artefaktini aniq chiqarish.

**Score:** **7/10**

## Punch List

1. **Content accuracy + governance fit**
   - Slide 5 Markaziy Bankga moslashgan, lekin ayrim misollar hali tijorat banki ijrosiga tortadi: `avtokredit`, `kredit memo`, `filial`, `core banking`. Bularni faqat "tijorat banki misoli" deb alohida belgilash yoki CB nazorat/muvofiqlik artefaktlariga almashtirish kerak.
   - Slide 7 dagi qizil zona `To'liq avtomatik kredit qarori` yaxshi anti-pattern, lekin CB xodimi uchun kuchliroq risk: AI asosida avtomatik sanksiya, majburiy ko'rsatma, inspeksiya xulosasi yoki supervisory action chiqarish.
   - Slide 8 da `50 ta namuna modelni o'rgatish uchun` degan fikr noaniq. 50 ta tarixiy holat odatda model o'rgatish emas, balki pilotni baholash, xatolarni ko'rish va xodim tasdig'i jarayonini tekshirish uchun kerak.

2. **Atamalar coverage**
   - Talab bajarilgan: `Use Case` va `Pilot Loyiha` Slide 6 da kiritilgan, Slide 11 da recap bor.
   - Lekin auditoriya Uzbek-first bo'lishi kerak: `Qo'llash holati (Use Case)` va `Pilot loyiha` deb berish yaxshiroq. Hozir inglizcha label birinchi turibdi.
   - Closing recap yaxshi, ammo javoblar biroz tor: Use Case faqat "qancha tejaydi" emas, balki "qaysi o'lchanadigan natija beradi" bo'lishi kerak. Bankda natija faqat vaqt emas: xato kamayishi, SLA, audit izining to'liqligi, navbat qisqarishi ham bo'lishi mumkin.

3. **Uzbek language quality**
   - `klassifikatsiya` o'rniga ko'p joyda `tasniflash` yoki `saralash` yetadi.
   - `skreaningi` noto'g'ri/og'ir: `skrinning` yoki undan ham yaxshisi `dastlabki tekshiruv`.
   - `metric` emas, `metrika`.
   - `qayerga tushadi` og'zaki va biroz g'alati; Markaziy Bank ohangi uchun `qayerga mos tushadi` yoki `qaysi jarayonga qo'llanadi`.
   - `shafqatsizlarcha qisqartiring` workshopda kulgili bo'lishi mumkin, lekin rasmiy auditoriyada `keskin toraytiring` yaxshiroq.

4. **Vendor absolutism / AI absolutism**
   - Deck vendor nomlariga bog'lanmagan, bu yaxshi. Lekin `AI 30 soniyada qilib beradi`, `bor model + bizning ma'lumot`, `doim yuqori-chap`, `hech qachon` kabi iboralar absolutistik eshitiladi.
   - Governance auditoriyasi uchun formulani yumshating: `pilotda tekshiramiz`, `ma'lumot sifati va ruxsatga bog'liq`, `odatda`, `birinchi nomzod sifatida`, `yuqori riskli holatlarda ruxsatli qaror jarayoni kerak`.
   - Slide 9 dagi `Strategiya keyin yoziladi` ham haddan tashqari keskin. Markaziy Bankda strategik ramka, ma'lumot siyosati va javobgarlik chizig'i parallel yurishi kerak.

5. **Bank decision artifact at closing**
   - Hozir Slide 12 savol-javob bilan tugaydi. Workshop natijasi esa bankda qaror hujjatiga aylanishi kerak.
   - Yakunda har stol topshiradigan artefaktni nomlang: `Pilot nomzod varaqasi` yoki `Pilot qaror kartasi`.
   - Minimal maydonlar: jarayon nomi, bo'lim egasi, ma'lumot manbasi, metrika, risk/nazorat chegarasi, mas'ul tasdiqlovchi, audit izi, Go/No-Go/Revise qarori.

## Top 5 Rewrites in Uzbek

1. **Slide 6 · Atamalarni Uzbek-first kiritish**

   Current:
   `Use Case / Qo'llash Holati`

   Rewrite:
   `Qo'llash holati (Use Case)`

   Body:
   `Qaysi jarayonda, qaysi xodimga, qaysi o'lchanadigan natijani beradi?`

   Example:
   `Banklardan kelgan prudensial hisobotlarda keskin o'zgarishlarni 2 soat emas, 20 daqiqada dastlabki ro'yxatga chiqarish. Yakuniy baho inspektorda qoladi.`

2. **Slide 6 · Pilot Loyiha ta'rifini texnik jihatdan tozalash**

   Current:
   `50 ta tarixiy namuna ustida sinab ko'rish. 4-6 hafta.`

   Rewrite:
   `Pilot loyiha - qo'llash holatini kichik, nazoratli muhitda tekshirish: 1 bo'lim, 1 jarayon, 1 hujjat turi, kamida 50 ta tarixiy holat, 4-6 hafta, 1-2 ta aniq metrika. Natija chiqsa - kengaytirish ko'rib chiqiladi; chiqmasa - yopiladi va xulosa hujjatlashtiriladi.`

3. **Slide 7 · Qizil zona misolini Markaziy Bankka moslash**

   Current:
   `To'liq avtomatik kredit qarori`

   Rewrite:
   `AI asosida avtomatik sanksiya yoki majburiy ko'rsatma chiqarish`

   Support line:
   `SI signal, dalil paketi va qoralama tayyorlashi mumkin. Rasmiy qaror, ko'rsatma, imzo va javobgarlik vakolatli xodimda qoladi.`

4. **Slide 8 · 50 namuna haqidagi noaniqlikni tuzatish**

   Current:
   `Bu raqamga yetmasangiz, modelni o'rgatib bo'lmaydi va natija aniq bo'lmaydi.`

   Rewrite:
   `50 ta tarixiy holat modelni o'rgatish uchun emas, pilotni tekshirish uchun kerak: eski natija bilan solishtiramiz, xato turlarini ko'ramiz, xodim tasdig'i qancha vaqt olishini o'lchaymiz.`

5. **Slide 11-12 · Closingni bank qaror artefakti bilan yopish**

   Add before Q&A:
   `Har stol yakunda bitta "Pilot qaror kartasi" topshiradi:`

   Card fields:
   `1) Jarayon nomi`
   `2) Bo'lim egasi`
   `3) Ma'lumot manbasi`
   `4) Pilot metrikasi`
   `5) Nazorat chegarasi: SI nima tayyorlaydi, kim tekshiradi, kim tasdiqlaydi`
   `6) Audit izi: manbalar, versiya, qaror sababi qayerda saqlanadi`
   `7) Qaror: Go / Revise / No-Go`

   Closing line:
   `Bugun maqsad "AI g'oya" topish emas. Maqsad - rahbariyat va muvofiqlik ko'rib chiqa oladigan bitta o'lchanadigan pilot qaror kartasini chiqarish.`

## Small Cleanup

- `notes.md` stale: 13 slayd timing va eski department misollari qolgan. Uni `content.md` va `index.html` bilan sinxronlang.
- `SI` va `AI` aralash ishlatilgan. Public-facing slaydlarda `SI`, atama yoki inglizcha ibora ichida `AI` ishlatsin.
- Slide 10 `Pilot metrikasi` qatorini soddalashtiring: `Vaqt -%, xato -%, SLA +% yoki yopilish vaqti`.
- Slide 11 birinchi xulosani yumshating: `SI loyihasi shunchaki qiziq g'oya emas - u o'lchanadigan jarayon muammosi.`

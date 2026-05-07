# 1-modul · Bank sektori uchun sun'iy intellekt asoslari — to'liq kontent

**Module:** 1-modul · Kun 1 · 9:15–10:15 (60 daqiqa)
**Format:** Ma'ruza + muhokama
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Slaydlar soni:** 13 ta · har biriga o'rtacha 4–5 daqiqa

> Asosiy g'oya: kursning oxirida har bir ishtirokchi o'z bo'limi uchun (kredit, komplaens, mijozlarga xizmat) ishlaydigan Telegram bot yasab ketadi — kod yozmasdan.

---

## Deck outline (13 slide)

| # | Sarlavha | Format / urg'u | Vaqt |
|---|---|---|---|
| 1 | Bank sektori uchun SI asoslari: Nazariyadan amaliyotga | Title — kirish | ~3 daq |
| 2 | Keling, kelajakni hozir sinab ko'ramiz! | Hook — QR demo | ~5 daq |
| 3 | SI o'zi nima? (Bankir tilida) | Tushuncha — analogiya | ~4 daq |
| 4 | Afsona va Haqiqat (miflarni yo'q qilamiz) | Taqqoslash — qo'rquvni yo'qotish | ~4 daq |
| 5 | Nima uchun banklarga aynan hozir SI kerak? | 3 ta foyda | ~4 daq |
| 6 | Jahon banklari tajribasi | Case study — JPMorgan, Morgan Stanley | ~5 daq |
| 7 | Bizning vositalarimiz: "Lego" + "Miya" | Stack: Claude · n8n · MCP | ~4 daq |
| 8 | Qanday qilib kodsiz bot ishlaydi? | Sxema — jarayon arxitekturasi | ~5 daq |
| 9 | Bizning yo'l xaritamiz | Roadmap — 3 ta bot | ~4 daq |
| 10 | Ma'lumotlar xavfsizligi | Bank siri va komplaens | ~5 daq |
| 11 | Aqliy hujum (interaktiv muhokama) | Brainstorm — flipchart | ~7 daq |
| 12 | Yakun va keyingi qadam | Transition → 2-modul | ~3 daq |
| 13 | Savol-Javob (Q&A) | Open Q&A | ~7 daq |

---

## Slide 1 — Title

**Sarlavha:**
Bank sektori uchun **Sun'iy Intellekt asoslari**: Nazariyadan amaliyotga qadam

**Kichik sarlavha:**
Qanday qilib kod yozmasdan o'z shaxsiy AI-yordamchimizni (Telegram bot) yaratamiz?

**Vizual:**
Zamonaviy bank ofisi va raqamli neyron tarmoqlarining abstrakt vizualizatsiyasi.

**Speaker notes:**
Auditoriya bilan salomlashing. Ularga bu odatiy, zerikarli IT-ma'ruza emasligini, aksincha — kurs oxirida har biri o'zi ishlaydigan bo'lim (kredit, komplaens, mijozlarga xizmat) uchun tayyor, ishlaydigan Telegram bot yaratib ketishini ayting.

---

## Slide 2 — Hook · "Muzni yorish"

**Sarlavha:**
Keling, kelajakni hozir sinab ko'ramiz!

**Ekrandagi matn:**
- **Maqsad:** Mijozning kredit layoqatini birlamchi baholash boti.
- Ekranda QR kod va Telegram bot manzili.

**Interaktiv harakat:**
Ishtirokchilarga telefonlarini olib, ekrandagi QR kodni skaner qilishlarini so'rang. Ular oldindan tayyorlangan demo botga (n8n + Claude orqali sozlangan) shunday yozib ko'rishadi:
> "Salom, men 50 mln so'm mikroqarz olmoqchiman, maoshim 7 mln."

**Speaker notes:**
Ishtirokchilar botning qanchalik tez va aqlli javob berishini o'z ko'zlari bilan ko'rishlari kerak. Keyin ayting: *"Mana shu botni kursimiz oxirida siz o'zingiz yasaysiz. Hech qanday dasturlash tilini bilmasdan!"*

**Tayyorgarlik (deck'dan tashqari):**
- Demo bot oldindan ishlab qo'yilgan bo'lishi kerak (n8n workflow + Claude API).
- QR kod slaydga PNG sifatida joylashtiriladi.
- Telegram bot manzili va QR — ishtirokchilar tez ulansin.

---

## Slide 3 — SI o'zi nima? (Bankir tilida)

**Sarlavha:**
Sun'iy intellekt — bu terminator emas, bu sizning **super-aqlli stajyoringiz**.

**Ekrandagi matn:**
- **Generativ AI (ChatGPT, Claude):** matnni o'qiydi, tahlil qiladi, yangi matn (yoki qaror) yaratadi.
- **U qanday ishlaydi?** Internetdagi ulkan ma'lumotlar ustida o'qigan. Siz to'g'ri savol (promt) bersangiz, u kerakli javobni taxmin qilib yig'ib beradi.

**Vizual:**
Ikki tomonlama qiyoslash — bir tomonda yuzlab qalin qog'oz jildlar (an'anaviy usul), ikkinchi tomonda bitta aqlli kompyuter/robot tezda xulosa qog'ozini uzatmoqda.

**Speaker notes:**
Bankirlarga kompyuter ichi qanday ishlashini tushuntirish shart emas. Asosiy fikr — AI bu sizga shablonlarni to'ldirib beradigan, mijoz shikoyatini tahlil qiladigan, hujjatdagi xatolarni topadigan **charchamas xodim**.

---

## Slide 4 — Afsona va Haqiqat (miflarni yo'q qilamiz)

**Sarlavha:**
"AI mening ishimni tortib oladimi?" — **Afsonalar va Haqiqatlar**

**Ekrandagi taqqoslash jadvali:**

| ❌ Afsona | ✅ Haqiqat |
|---|---|
| SI odamlarning o'rnini egallaydi va ish o'rinlarini yo'q qiladi. | SI faqat monoton (zerikarli, qaytariluvchi) ishlarni oladi. **SIdan foydalana oladigan xodimlar — foydalana olmaydigan xodimlarning o'rnini egallaydi.** |
| SIni ishlatish uchun dasturlashni bilish shart. | Bugungi kunda (n8n kabi vositalar yordamida) **"No-code"** integratsiya odatiy holatga aylangan. |

**Speaker notes:**
Bank xodimlarida har doim "bu texnologiya men uchun xavf" degan yashirin qo'rquv bo'ladi. Shu slaydda ularni tinchlantiring. AI bu **raqobatchi emas, bu qurol** ekanligini uqtiring. Ovozingizni tinchlantirib gapiring — bu slayd informatsiyani uzatish emas, **emotsiyani boshqarish** uchun.

---

## Slide 5 — Nima uchun banklarga aynan hozir SI kerak?

**Sarlavha:**
Nega bu muhim? *(Raqamlar gapirganda.)*

**3 ta foyda:**
- ✅ **Vaqtni tejash** — hujjatlarni o'qish va tahlil qilish (skoring, komplaens) **10 barobar** tezlashadi.
- ✅ **Xatolarni kamaytirish** — inson omili (charchoq, e'tiborsizlik) tufayli yuzaga keladigan xatolar nolga yaqinlashadi.
- ✅ **Mijozlarga xizmat** — 24/7, kutishsiz javob.

**Interaktiv savol (auditoriyaga):**
> "Kuningizning qancha qismi bir xil turdagi shartnomalarni tekshirish yoki takrorlanuvchi savollarga javob berish bilan o'tadi?"

**Speaker notes:**
Bu yerda 30–45 soniya javob kuting, bir-ikki ishtirokchidan eshiting. Aniq raqam aytsalar, uni 6-slaydga ko'prik sifatida ishlating ("mana shunday vaqtni qanday qaytarib olish mumkinligini ko'ramiz").

---

## Slide 6 — Jahon banklari tajribasi (Case Study)

**Sarlavha:**
Jahon banklari SIdan qanday foydalanmoqda?

**Ekrandagi raqamlar va logotiplar:**

- 🏦 **JPMorgan Chase — COIN dasturi**
  Yuristlarning **360,000 soatlik** ishini soniyalarda amalga oshiradi (kredit shartnomalarini tekshirish).

- 🏦 **Morgan Stanley — OpenAI asosida yordamchi**
  Moliyaviy maslahatchilar mijozga xizmat ko'rsatayotgan vaqtda bot kerakli qoidalarni topib beradi.

**Speaker notes:**
Haqiqiy raqamlar va mashhur banklar nomini keltirish auditoriyada ishonch uyg'otadi. Asosiy fikr: *"Ular buni allaqachon qilyapti — biz esa endi boshlayapmiz."*

Agar vaqt qolsa, qisqa qo'shimcha misollar:
- **Bank of America — Erica** (mobil ilova ichidagi AI yordamchi, 1+ milliard so'rov).
- **HSBC** — tranzaksiya monitoringida AI orqali firibgarlikni aniqlash.

---

## Slide 7 — Bizning vositalarimiz · "Lego" konstruktori va "Miya"

**Sarlavha:**
Biz qanday qilib **kodsiz bot** yaratamiz? Bizning arsenal.

**Stack (3 ta blok):**

- 🧠 **Claude (Anthropic) — bizning "Miya".**
  Matnlarni tushunadi, mantiqiy fikrlaydi, qaror qabul qiladi.

- 🔌 **n8n — bizning "Qo'llarimiz" (Lego konstruktori).**
  Telegramdan xabarni oladi, Claude'ga beradi, javobni qaytaradi. **Hech qanday kod kerak emas.**

- 🤖 **Claude Code (MCP) — xavfsiz ko'prik.**
  "Miya" va bank tizimlari o'rtasidagi rasmiy aloqa kanali. Claude'ga ma'lumotlar bazasidan xavfsiz foydalanish imkonini beradi.

**Speaker notes:**
MCP (Model Context Protocol) so'zi murakkab eshitilishi mumkin. Oddiy tushuntiring:
> "Claude juda aqlli, lekin uning qo'li yo'q. U sizning Excel faylingizni o'zicha o'qiy olmaydi. MCP — bu Claude'ga **ko'z va qo'l** beradigan tizim."

---

## Slide 8 — Qanday qilib kodsiz bot ishlaydi? (Sodda vizualizatsiya)

**Sarlavha:**
Parda ortida nima ro'y beradi? *(Jarayon arxitekturasi.)*

**Vizual — zamonaviy chizma/sxema (4 ta qadam):**

1. 📱 **Mijoz (Telegram)** — yozadi: *"Kredit shartlari qanday?"*
2. ➡️ **n8n (Kuryer)** — savolni ushlab olib, darhol Claude'ga eltadi.
3. 🧠 **Claude + MCP (Miya)** — savolni tushunadi, bankning ichki Word/PDF faylidan qoidalarni qidiradi va javob tuzadi.
4. ⬅️ **n8n (Kuryer)** — tayyor javobni olib, Telegramga qaytaradi.

**Speaker notes:**
Shu joyda ayting: *"Mana shu sxemani sizlar chizasizlar, va u ishlaydi."* Sxema qanchalik sodda va chiroyli (modern UI/UX) bo'lsa, ularga shuncha oson yetib boradi. Strelkalar va ikonlar yordamida vizual ravishda olib boring — har bir bosqichda 5–10 soniya to'xtab, audiens bilan ko'z bilan kuzatib boring.

**Vizual eslatma (designer'ga):**
- Chap → o'ng oqim (bosqichli flow diagram).
- Har bir blok rangli, animatsiya bilan birin-ketin paydo bo'lishi mumkin.
- Strelkalar — bir tomonlama emas, tsikl ekanligini ko'rsatuvchi (so'rov ↔ javob).

---

## Slide 9 — Bizning yo'l xaritamiz

**Sarlavha:**
Kelgusi 2 kunda qanday botlarni 0 dan yig'amiz?

**3 ta qadam:**
1. **FAQ boti** — mijozlarning eng ko'p beradigan savollariga javob beruvchi.
2. **Hujjat tahlilchisi** — PDF shartnomani o'qib, undagi xatolarni topuvchi bot.
3. **Kredit maslahatchisi** — mijoz ma'lumotlarini so'rab olib, dastlabki qarorni chiqaruvchi aqlli agent.

**Speaker notes:**
Darslar bosqichma-bosqich qiyinlashib boradi, lekin hammasi amaliy. Maqsadni aniq ko'rsating: "2 kun ichida 3 ta ishlaydigan bot."

---

## Slide 10 — Ma'lumotlar xavfsizligi (Eng muhim savol!)

**Sarlavha:**
Bank siri va Mijoz ma'lumotlari: **AI bularni o'g'irlamaydimi?**

**Ekrandagi matn (3 nuqta):**

- 🔒 **Yopiq kontur:** biz yaratadigan tizimlar **API orqali himoyalangan** usulda ishlaydi.
- 🛡️ **Maxfiylik (Privacy):** Claude tijorat versiyalarida mijoz ma'lumotlari **modellarni o'rgatish (train qilish) uchun ishlatilmaydi**.
- 🎭 **Anonimlashtirish:** Shaxsiy ma'lumotlarni (pasport, ism) AIdan yashirib, **faqat raqamlarni** tahlilga berish usullari mavjud.

**Speaker notes:**
Bankirlar uchun eng og'riqli nuqta — xavfsizlik va komplaens. Bu yerda ikki narsani aniq qiling:
1. Bu mavzu **3-modulda chuqur** o'tiladi — hozir batafsil kirmaymiz.
2. Lekin **xavotirga o'rin yo'q** — texnik yechimlar mavjud, biz ularni amalda ko'ramiz.

Agar zalda komplaens xodimi bo'lsa, uning ko'ziga qarab gapiring — bu slaydda **uning ishonchini** qozonish kerak.

---

## Slide 11 — Interaktiv muhokama · "Aqliy hujum"

**Sarlavha:**
Keling, **sizning ishingizni** yengillashtiramiz!

**Ekrandagi 2 ta savol:**
1. Sizning bo'limingizda kuniga kamida 1 soat vaqt oladigan eng zerikarli ish qaysi?
2. Sizningcha, uni qanday avtomatlashtirish mumkin?

**Interaktiv harakat:**
Oq doska (flipchart) ga ishtirokchilar aytgan **eng ko'p uchraydigan 3 ta muammoni** yozing. So'ng va'da bering:
> "Ajoyib — mana shu muammolardan birini ertangi darsda n8n yordamida botga aylantiramiz."

**Speaker notes:**
Bu qism juda muhim. Ishtirokchilar ishonch hosil qilishlari kerak: AI **ishni tortib oluvchi yovuz kuch emas**, balki ularni **zerikarli rutinalardan qutqaruvchi vosita**. Salbiy reaktsiya (qo'rquv) sezilsa, darhol misol bilan tinchlantiring — masalan: "siz operatsion xodim bo'lsangiz, AI sizning hisobotingizni o'rniga yozmaydi, balki uni 1 soatdan 5 daqiqaga qisqartiradi."

**Tayyorgarlik:**
- Flipchart + qalin marker.
- Yoki ekran ulashish + raqamli whiteboard (FigJam, Miro), agar zal jihozlangan bo'lsa.

---

## Slide 12 — Yakun va keyingi qadam

**Sarlavha:**
Bugungi darsdan xulosa va keyingi qadam.

**3 ta xulosa:**
- SIdan **qochish** kerak emas — uni **boshqarishni** o'rganish kerak.
- **Kodsiz (no-code) texnologiyalar** bilan har bir bank xodimi o'z IT mahsulotini yarata oladi.
- **Keyingi modul (2-modul):** Bank jarayonlarida SI qo'llash imkoniyatlarini chuqurroq aniqlash — guruhli tahlil formati.

**Speaker notes:**
> "Agar tayyor bo'lsangiz, keyingi modulda ushbu g'oyalar qaysi qoliplarga tushishini va xavfsizlik (komplaens) masalalarini ko'rib chiqamiz."

---

## Slide 13 — Savol-Javob (Q&A)

**Sarlavha:**
**Sizning savollaringiz.**

**Ekrandagi matn:**
> "Har qanday savolni bering: xoh texnik, xoh shaxsiy."

**Vizual:**
Sodda, bo'sh slayd — fokus **ma'ruzachiga va auditoriyaga**, ekranga emas. Pastda kichik QR kod (1-modul slaydlari uchun yoki kursning kanal manzili) qoldirish mumkin.

**Speaker notes:**
Ishtirokchilardan savollar kuting. Bu qism **5–10 daqiqa** vaqtni oladi va 1 soatlik normani to'ldirishga xizmat qiladi. Agar savol kelmasa — siz o'zingiz savol bering: *"Sizdan kim 'menga aynan shu bot kerak' deb hisoblayapti?"* yoki *"Eng ko'p qaysi muammo qiyin tuyulyapti?"*.

Agar texnik savol kelsa — javobni qisqa bering, lekin: *"Bu masalani 5-modul (promt muhandisligi) yoki 10-modul (agentlar)da chuqur ko'ramiz"* deb ko'prik tashlang.

---

## Series-wide bog'lanish

- **Avvalgi modul:** — *(yo'q — bu kursning birinchi moduli)*
- **Keyingi modul:** [`2_deck/`](../2_deck/) — Bank jarayonlarida SI qo'llash imkoniyatlarini aniqlash · *Guruhli tahlil*

## Tayyorgarlik checklist (deck'dan tashqari)

- [ ] Demo Telegram bot ishlayapti (n8n workflow + Claude API + kredit-skoring promti)
- [ ] QR kod slaydga eksport qilingan (slide 2 va slide 13)
- [ ] Flipchart + markerlar zalda mavjud (slide 11)
- [ ] Bot manzili / QR ekranga yaqqol ko'rinadigan o'lchamda
- [ ] Backup: agar ishtirokchilarda telefon bilan muammo bo'lsa, ekrandan o'zingiz demo qilib ko'rsating
- [ ] JPMorgan / Morgan Stanley logotiplari yoki ularning rasmiy press iqtiboslari (slide 6)
- [ ] Slide 8 sxemasi — chizma sifatida tayyorlangan (animatsion bo'lsa yana yaxshi)

## Vaqt rejimi (60 daqiqa)

| Bloklar | Slaydlar | Vaqt |
|---|---|---|
| Kirish + hook | 1–2 | ~8 daq |
| Tushuncha | 3–4 | ~8 daq |
| Foyda + dunyo tajribasi | 5–6 | ~9 daq |
| Texnik blok | 7–8 | ~9 daq |
| Yo'l xaritasi + xavfsizlik | 9–10 | ~9 daq |
| Interaktiv | 11 | ~7 daq |
| Yopilish + Q&A | 12–13 | ~10 daq |
| **Jami** | **13** | **~60 daq** |

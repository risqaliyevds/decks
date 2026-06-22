# 3-modul — Claude va Gemini · boshqa kuchli SI yordamchilar (to'liq kontent)

- **Modul:** 3-modul · Kun 1 · 16:00–16:50 (50 daqiqa)
- **Format:** Namoyish + jonli vazifa
- **Auditoriya:** Markaziy Bank xodimlari (texnik bo'lmagan)
- **Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
- **Framework:** Custom HTML (banks_decks STANDARDS.md)
- **Slaydlar soni:** 16
- **Atamalar:** Multimodal · "To'g'ri ish — to'g'ri vosita"
- **Speaker skript:** [speech.md](speech.md) · **Outline:** [notes.md](notes.md)

## Deck outline

| # | Sarlavha | Format | Vaqt | Faza |
|---|---|---|---|---|
| 1 | Claude va Gemini (sarlavha) | Title hero | ~1 daq | Kirish |
| 2 | SI faqat ChatGPT emas | 3-ustun stack | ~5 daq | Kengroq qarash |
| 3 | Claude — bu nima? | Ro'yxat + karta | ~4 daq | Claude tanishuv |
| 4 | Uzun hujjatni tahlil | Vaziyat + 3 karta | ~4 daq | Claude demo |
| 5 | Ikki hujjatni solishtirish | Vaziyat + jadval | ~4 daq | Claude demo |
| 6 | Zaldan jonli vazifa | Raqamli ro'yxat | ~7 daq | WOW lahza |
| 7 | Gemini — bu nima? | Ro'yxat + karta | ~4 daq | Gemini tanishuv |
| 8 | "Multimodal" nima degani? | dict-card + 4 modallik | ~4 daq | Terminologiya |
| 9 | Telefonda: ovoz, rasm, video | Vaziyat + 3 karta | ~4 daq | Gemini demo |
| 10 | Qaysi ish, qaysi vosita? | 3-ustun bullet | ~3 daq | Tanlov |
| 11 | Uch gigant — kuchli·qachon·cheklov | 3-ustun compare | ~3 daq | Chuqurroq |
| 12 | Bitta ish oqimi | 4-qadamli flow | ~3 daq | Amaliyot |
| 13 | Umumiy qoidalar | 4-karta sec | ~3 daq | Muhim |
| 14 | Asosiy xulosalar | Close-list + recap | ~2 daq | Yakun |
| 15 | Rahmat! (1-kun yakuni) | Title + pill flow | ~1 daq | Yakun |
| 16 | Savol-javob | Q&A | ~1 daq | Q&A |

---

## Slide 1 — Sarlavha

**Chip:** 1-kun · 3-sessiya · 16:00 — 16:50
**Sarlavha:** Claude va **Gemini** — Boshqa kuchli SI yordamchilar
**Tagline:** Chuqur tahlil · WOW lahza · ovoz, rasm, video — ikki vosita, ikki kuchli tomon.

## Slide 2 — Kengroq qarash

**Chip:** Kengroq qarash
**Sarlavha:** SI dunyosi faqat ChatGPT'dan iborat emas.
**Lead:** ChatGPT — ajoyib, lekin yagona emas. Har bir vositaning o'z kuchli tomoni bor. Yaxshi mutaxassis to'g'ri ish uchun to'g'ri vositani tanlaydi.

- **ChatGPT** (Universal) — Kundalik ishlar, matn yozish, savol-javob. Eng birinchi tanlov.
- **Claude** (Tahlil + matn, ajratilgan) — Uzun hujjatlar, sifatli yozish, puxta va chuqur mulohaza.
- **Gemini** (Multimodal) — Rasm, ovoz va video. Google xizmatlari bilan birga ishlaydi.

## Slide 3 — Claude — bu nima?

**Chip:** Tanishuv · **Claude Opus 4.7 · 1M token**
**Sarlavha:** Claude — bu nima?

Chap ustun:
- 🏢 Anthropic kompaniyasi — xavfsizlikka alohida e'tibor beradigan SI laboratoriyasi ("Constitutional AI" tamoyillari asosida).
- 📌 Iqtibos beradi — "Buni qayerdan olding?" desangiz: "Shartnomaning 4-bo'lim 3.2-paragrafidan" deb ko'rsatadi.
- 🎯 Kamroq "o'ylab topadi" — kam gallyutsinatsiya; bilmasa "topolmadim" deydi, to'qib tashlamaydi.

O'ng karta — **Nimada eng kuchli?**
- Uzun hujjatlar (yuzlab sahifa) · chuqur mulohaza
- Sifatli, rasmiy va tabiiy matn yozish
- Bank/yuridik/muvofiqlik uchun eng mos — IFRS hujjatlari, sindikat shartnomalari: aniqlik tezlikdan muhim joyda
- **Cheklov:** internetga ulanmagan — "bugungi dollar kursi qancha?" kabi real-vaqt ma'lumotni bilmaydi.

## Slide 4 — Claude Demo 1: uzun hujjatni chuqur tahlil

**Chip:** Claude · Demo 1
**Sarlavha:** Uzun hujjatni chuqur tahlil qilish.
**Vaziyat:** 40 sahifalik murakkab hisobot yoki shartnoma keldi. To'liq o'qishga vaqt yo'q, lekin muhim joylarni o'tkazib yubormaslik kerak.

- 🎯 **Asosiy fikrlar** — butun hujjat → qisqa va aniq xulosa.
- ⚠️ **Xavf va ziddiyatlar** — e'tibor talab qiladigan bandlarni ajratadi.
- ❓ **Savol berasiz** — "5-bandda nima yozilgan?" — topib javob beradi.

**Asosiy fikr:** 40 sahifa → bir necha daqiqada xulosa.

## Slide 5 — Claude Demo 2: ikki hujjatni solishtirish

**Chip:** Claude · Demo 2
**Sarlavha:** Ikki hujjatni solishtirish.
**Vaziyat:** Eski va yangi versiya, yoki ikkita taklif. Farqlarni qo'lda qidirish — uzoq va xato ehtimoli yuqori.

| Mezon | Hujjat A | Hujjat B (ajratilgan) |
|---|---|---|
| To'lov muddati | 30 kun | 45 kun |
| Komissiya | 1.5% | 1.2% |
| Javobgarlik | Cheklangan | To'liq |

Claude ikkala hujjatni o'qib, farqlarni jadval ko'rinishida ajratib beradi — o'zgargan ustun ko'kda ajratiladi.
**Asosiy fikr:** Farqlar bir qarashda ko'rinadi.

## Slide 6 — WOW lahza: zaldan jonli vazifa

**Chip:** WOW lahza
**Sarlavha:** Zaldan jonli vazifa.
**Lead:** Hoziroq — sizning haqiqiy ishingiz bilan sinab ko'ramiz. Auditoriyadan bitta misol olamiz.

1. **Hujjatingizni bering** — haqiqiy hisobot yoki maktub, birga tahlil qilamiz.
2. **Ikki matnni solishtiring** — farqlarni jonli, shu yerda ajratamiz.
3. **Murakkab atamani so'rang** — oddiy tilda, bir zumda tushuntiramiz.

**Urg'u:** Eng ishonchli isbot — o'z ishingizda, o'z ko'zingiz bilan ko'rish.

## Slide 7 — Gemini — bu nima?

**Chip:** Tanishuv · **Gemini 3 Pro · 1M token · multimodal**
**Sarlavha:** Gemini — bu nima?

Chap ustun:
- 🌐 Google · 900 mln+ foydalanuvchi — har oyda; Qidiruv, Gmail va Xaritalar ortidagi kompaniya.
- 🔗 Workspace integratsiyasi — Drive, Gmail, Sheets bilan tug'ishgan, joyida ishlaydi.
- 🎛️ Multimodal — bitta promtga PDF, Excel va skaner qilingan hujjatni birga tashlasangiz, hammasini birga o'qiydi.

O'ng karta — **Nimada eng kuchli?**
- Rasm, ovoz va video — birga tushunadi (ayniqsa mobilda)
- Google ilovalariga yaqin integratsiya
- RAG (o'z hujjatingdan javob) arxitekturasi uchun qulay demo zamin
- **Eslatma:** bu Markaziy Bank uchun yakuniy tanlov degani emas — bank tanlovi xavfsizlik, data residency, audit log va narx bo'yicha alohida baholanadi.

## Slide 8 — "Multimodal" — bu nima degani? (Terminologiya)

**Chip:** Asosiy tushuncha · 3-modul
**Sarlavha:** "Multimodal" — bu nima degani?

**dict-card · Multimodal = matn + rasm + ovoz + video — birga.**
Ko'pchilik SI faqat matn bilan ishlaydi. Multimodal SI bir vaqtning o'zida turli ko'rinishdagi ma'lumotni tushunadi.

4 modallik:
- 📷 **Rasm** — rasm yoki skanni ko'rsatasiz, o'qiydi va tushuntiradi.
- 🎙️ **Ovoz** — gapirasiz, eshitadi va ovozda javob beradi.
- 🎬 **Video** — qisqa videoni ko'rib, mazmunini tahlil qiladi.
- ⌨️ **Matn** — odatdagidek yozib ham so'rashingiz mumkin.

## Slide 9 — Gemini Demo: telefonda

**Chip:** Gemini · Demo
**Sarlavha:** Telefonda: ovoz, rasm va video.
**Vaziyat:** Yo'lda yoki uchrashuvda — kompyutersiz, faqat telefon bilan ishlash kerak.

- 📷 **Rasmga oling** — hujjat yoki jadvalni suratga olib: "Bu nima haqida?"
- 🎙️ **Ovoz bilan so'rang** — yozish shart emas, shunchaki gapirasiz.
- 📱 **Har joyda** — telefon ilovasida, cho'ntakda.

**Asosiy fikr:** SI endi cho'ntakda.

## Slide 10 — Tanlov: qaysi ish uchun qaysi vosita?

**Chip:** Tanlov
**Sarlavha:** Qaysi ish uchun qaysi vosita?

- **ChatGPT** — kundalik savollar · tez matn va g'oyalar · umumiy yordamchi · birinchi tanlov.
- **Claude** — uzun hujjatlar · sifatli rasmiy matn · chuqur mulohaza · solishtirish va tahlil.
- **Gemini** — rasm va ovoz · mobil (telefon) ish · Google xizmatlari · video tahlili.

**Foot:** Aniq chegara yo'q — ko'pincha bir ishda bir nechtasini birga ishlatasiz.
**Izoh (mute):** Yana: **Perplexity** — real-vaqt/internet ma'lumot uchun · **Yandex GPT** — data residency (ma'lumot RU/UZ'dan chiqmasin) talab qilinsa.

## Slide 11 — Uch gigant: kuchli · qachon · cheklov

**Chip:** Chuqurroq
**Sarlavha:** Uch gigant — kuchli · qachon · cheklov.

- **ChatGPT** (Universal) — Kuchli: eng keng ekosistema, Excel/grafik, g'oyalar · Qachon: brainstorm, qoralama, kundalik ish · Cheklov: dalil so'rang, har gapni tekshiring.
- **Claude** (Tahlil, ajratilgan) — Kuchli: uzun hujjat, iqtibos, kam gallyutsinatsiya · Qachon: IFRS, shartnoma, muvofiqlik (aniqlik muhim) · Cheklov: internetga ulanmagan, real-vaqt yo'q.
- **Gemini** (Multimodal) — Kuchli: PDF+Excel+skan birga, Workspace, RAG zamin · Qachon: rasm/ovoz/video, mobil, Google ishi · Cheklov: bank tanlovi alohida baholanadi.

**Foot:** Uchchala frontier model endi ~**1M token** kontekstga ega — savol "qaysi model" emas, "qaysi vazifaga qaysi mos".

## Slide 12 — Bitta ish oqimi

**Chip:** Amaliyot
**Sarlavha:** Hammasini birga — bitta ish oqimi.
**Lead:** Real misol: bitta vazifada uchala vosita va inson birga ishlaydi.

1. **Suratga oling** (Gemini) — qog'oz hujjatni telefon bilan rasmga olib, matnga aylantirasiz.
2. **Chuqur tahlil** (Claude) — uzun matnni o'qib, asosiy fikr va xavflarni ajratadi.
3. **Rasmiy javob** (ChatGPT) — tayyor xulosa asosida rasmiy xat yoki javob yozasiz.
4. **Tekshiruv va qaror** (Inson) — hammasini siz tekshirasiz va yakuniy qarorni qabul qilasiz.

## Slide 13 — Umumiy qoidalar

**Chip:** Muhim
**Sarlavha:** Uchala vosita uchun umumiy qoidalar.

- 🔒 **Maxfiy ma'lumot kiritilmaydi** — bank siri va shaxsiy ma'lumot ommaviy SI vositalariga berilmaydi.
- ✅ **Har doim tekshiring** — raqam, fakt va huquqiy xulosa mustaqil tasdiqlanishi shart.
- 🧑‍⚖️ **Yakuniy qaror insonniki** — SI yordamchi; javobgarlik va qaror sizda.
- 🔀 **Bir vositaga bog'lanmang** — ish uchun eng mosini tanlang; kerak bo'lsa solishtiring.

**Foot:** To'g'ri va ehtiyot ishlatilsa — uchchovi ham ishonchli yordamchi.

## Slide 14 — Asosiy xulosalar + lug'at recap

**Chip:** Yakun
**Sarlavha:** 1-kundan asosiy xulosalar.

1. **SI — vosita, sehr emas** — endi u gaplashadi, yozadi va yangi narsa yaratadi.
2. **Uchta yordamchi** — ChatGPT (universal) · Claude (tahlil) · Gemini (multimodal).
3. **To'g'ri ish — to'g'ri vosita** — har birining kuchli tomoni bor; ko'pincha birga ishlaydi.
4. **Odam markazda** — maxfiylik, tekshiruv va yakuniy qaror har doim insonniki.

**Lug'at recap (birga aytamiz):**
- **Multimodal** = matn + rasm + ovoz + video — birga.
- **To'g'ri vosita** = har ishga mos vositani tanlash.

**Iqtibos:** "SI bilan ish — hamkorlik: u tezlashtiradi, inson yo'naltiradi va qaror qiladi."

## Slide 15 — 1-kun yakuni: Rahmat!

**Chip:** 1-kun yakuni
**Sarlavha:** Rahmat!
**Lead:** Bugun SI dunyosi bilan tanishdik — endi navbat amaliyotda.
**Yo'l xaritasi:** SI landshafti → ChatGPT → Claude va Gemini.
**Yakun:** Sinab ko'ring, savol bering, kashf qiling. Ko'rishguncha!

## Slide 16 — Savol-javob

**?** · Savol-javob
- ✉️ murod@mohir.dev
- ✈️ @crea7iveai (https://t.me/crea7iveai)

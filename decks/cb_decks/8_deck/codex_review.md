# Verdict: NEEDS-FIXES

**Score: 8/10**

HTML deck va screenshotlar delivery uchun deyarli tayyor: Trigger + Webhook slide 5 da aniq kiritilgan, slide 17 da recap bor, slide 18 esa Markaziy Bank auditoriyasiga mos qaror varaqasi beradi. Asosiy muammo: `content.md` va `notes.md` HTML'dan ortda qolgan. Shu sabab speaker matni hali ham n8n absolutizmi, isbotlanmagan raqamlar va "bo'lim xodimi o'zi qiladi" ohangini kuchliroq saqlab turibdi. Deckni topshirishdan oldin manba kontentni HTML bilan sinxronlash va vendor/jarayon claims'larini ehtiyotkorroq qilish kerak.

## Punch-List

### 1. Content accuracy

- `notes.md` hali **18 ta slayd** deydi, lekin `index.html`, screenshotlar va `content.md` **19 ta slayd**. Bu QA va speaker prep uchun chalkashlik beradi.
- `content.md` boshida mini-workflow **4-nodeli** deb yozilgan, deck esa 5 node ko'rsatadi: Telegram Trigger -> Set -> Gemini -> Sheets -> Reply.
- Speaker textda "hech qanday ma'lumot tashqariga chiqmaydi", "bir bayt ham chiqmaydi", "Markaziy Bank talablariga to'liq mos", "vendor lock-in yo'q" kabi absolyut iboralar qolgan. Self-hosted n8n buni avtomatik kafolatlamaydi: LLM chaqiruvlari, connectorlar, loglar, backup, update va credential siyosati alohida audit qilinadi.
- "2 hafta -> 30 daqiqa", "90% aniqlik", "95%", "operator vaqti 0", "4 soat -> 5 daqiqa" kabi raqamlar manbasiz aniq va'da bo'lib eshitiladi. HTML ba'zi joylarda "pilot bilan o'lchanadi" deb tuzatgan, lekin speaker text hali eski ohangda.

### 2. Governance fit

- Slide 16 va 18 kuchli, lekin governance framing slide 3-4 speaker matniga ham ko'chishi kerak. "IT navbatini kutmaymiz; o'zimiz yig'amiz" degan asosiy tezis Markaziy Bank kontekstida "sandbox prototip qilamiz; IT va komplayens production'ni tasdiqlaydi" shaklida aytilishi kerak.
- Slide 18 qaror varaqasi yaxshi: trigger, ma'lumot turi, inson tasdig'i, audit log, test mezoni, mas'ul shaxs. Uni speaker textda "pilotga chiqadimi?" deb atash to'g'riroq; hozir ba'zi joylarda "production yoki sandbox" keskinroq chiqadi.
- "Bo'lim xodimi workflow yaratadi" deganda vakolat chegarasi kerak: kim sandbox ochadi, kim credential beradi, kim webhook URL'ni tashqi/ichki tizimga ulaydi, kim production activate qiladi.

### 3. Atamalar: Trigger + Webhook intro + recap

- Talab bajarilgan: rasmiy kiritish slide 5 da, recap slide 17 da. Atama uniqueness rule buzilmagan.
- Trigger izohi sodda va bankir tilida. "Qo'zg'atuvchi hodisa" ishlaydi, lekin recapda "workflow'ni boshlatuvchi hodisa" yodda qoladi.
- Webhook intro yaxshi, lekin xavfsizlik ro'yxatini to'liqroq va bir xil qilish kerak: token, IP cheklovi, imzo tekshiruvi, rate limit, audit log, mas'ul egasi. Hozir slide 5 "token + IP + imzo + audit log", slide 17 "token + IP + audit log", recap pastida esa "token + log" deb qisqaradi.

### 4. Uzbek quality

- "komplaens" o'rniga bir xil "komplayens" ishlating. HTML va screenshotlarda hali "Komplaens" bor.
- "qaerda/qayerda" aralash. Bir variantni tanlang; tavsiya: "qayerda".
- "use-case ga" -> "use-case'ga"; slide 17 HTML'da hali apostrof tushgan.
- "Bizda hozir ekranda quriladi" g'alati passiv: "Biz uni hozir ekranda quramiz".
- "uy ga", "kun ikkita", "quriganini ko'radi", "Mas'ul ega" kabi speaker text xatolarini tozalash kerak. Screenshotlarda ko'rinmaydi, lekin delivery paytida bilinadi.

### 5. Vendor absolutism: no-code tools comparison

- Zapier uchun "faqat AQSh serveri" va "bank ma'lumoti chetga chiqadi" juda keskin. To'g'riroq framing: "cloud xizmat; ma'lumot qayerda qayta ishlanishi, subprocessorlar, data residency va enterprise controls xarid/IT tekshiruvini talab qiladi."
- Make uchun "Yevropa serveri (GDPR)" yetarli emas. Make rasmiy security sahifasida AWS EC2 private instances, GDPR, SOC 2 Type II/SOC 3 va log retention haqida gapiradi; deck buni "baribir xavf" emas, "cloud governance tekshiruvi kerak" deb berishi kerak.
- n8n uchun "open-source" o'rniga "source-available / fair-code litsenziya" deb aniqroq aytish kerak. Free self-hosted community edition bor, lekin community edition enterprise funksiyalarining hammasini bermaydi: SSO, external secrets, log streaming, version control, workflow/credential sharing kabi cheklovlar bor.
- "500+ ulanish" va narxlar tez eskiradi. Slide speaker matnida "rasmiy sahifada yangilanadigan connector/pricing ro'yxati" deb yumshating.

## Top 5 Uzbek Rewrites

### 1. Slide 1 / opening: vendor va data absolutizmini yumshatish

**Replace speaker line:**

> Nima uchun n8n? Chunki u self-hosted joylashtirilsa, workflow ijrosi va loglarni bank nazoratidagi muhitda ushlash mumkin. Lekin bu "hammasi avtomatik xavfsiz" degani emas: LLM chaqiruvlari, connectorlar, credentiallar va backup alohida tekshiriladi. Bugun n8n'ni pilot uchun qulay variant sifatida ko'ramiz.

### 2. Slide 3-4: governance modelni asosiy g'oyaga qo'shish

**Replace "bo'lim xodimi o'zi yig'adi" framing:**

> Bankdagi to'g'ri model shunday: bo'lim xodimi jarayonni chizadi va sandbox'da prototip yig'adi. IT xavfsizlik ulanishlar, credentiallar, webhook va loglarni tekshiradi. Komplayens ma'lumot turi, mijozga ta'sir va audit izini tasdiqlaydi. Faqat shundan keyin workflow pilotga, keyin production'ga chiqadi.

### 3. Slide 5 / 17: Webhook xavfsizlik recapini bir xil qilish

**Replace Webhook definition + recap:**

> **Webhook** - boshqa tizim xabar yuboradigan maxsus URL. Bankda webhook ochiq eshik emas: token, IP cheklovi, imzo tekshiruvi, rate limit, audit log va mas'ul egasi bilan ishlaydi.

**Recap line:**

> **Webhook nima?** Boshqa tizim xabar yuboradigan maxsus URL. **Bankda qachon ruxsat?** Token/IP/imzo, rate limit, audit log va mas'ul egasi bo'lsa.

### 4. Slide 6-7: no-code platformalar comparisonini neytral qilish

**Replace platform comparison block:**

> Savol "qaysi platforma eng zo'r?" emas, "qaysi jarayon qaysi nazorat bilan ishlaydi?" Zapier juda tez start beradi va ko'p tayyor integratsiyaga ega, lekin cloud data governance tekshiruvi kerak. Make vizual oqimlar va error handling uchun qulay, enterprise xavfsizlik imkoniyatlari bor, lekin baribir cloud/subprocessor nazorati ko'riladi. n8n self-hosted joylashtirilsa, ijro muhiti bank nazoratiga yaqinlashadi; shunga qaramay connectorlar, LLM chaqiruvlari, loglar, backup va enterprise funksiyalar alohida audit qilinadi.

### 5. Slide 11-13 / examples: aniq raqamlarni pilot o'lchoviga almashtirish

**Replace benefits paragraph:**

> Bu yerda raqamni va'da qilmaymiz, o'lchaymiz. Avval baseline olinadi: bitta spravka yoki shikoyat qancha vaqt oladi, nechta xato chiqadi, nechta holat inson aralashuvini talab qiladi. Pilotda test oqimi yuradi. Keyin qaror beriladi: vaqt tejalishi, xato kamayishi, SLA, eskalatsiya va audit sifati yetarlimi yoki workflow sandbox'da qayta ishlanadimi.

## Sources Checked For Vendor Claims

- Zapier official docs: task usage, limits, pay-per-task billing, integrations count.
- Make official pricing and security pages: credits/pricing, GDPR/SOC controls, AWS hosting, default log retention.
- n8n official docs/pricing: free self-hosted community edition, hosted/self-hosted data location, community edition limitations.

# Verdict: NEEDS-FIXES

**Score: 7/10**

Deck yaxshi strukturaga ega: Trigger va Webhook slide 5 da kiritilgan, slide 17 da recap bor, bank workflow misollari auditoriyaga yaqin. Lekin Markaziy Bank auditoriyasi uchun hozirgi matnda vendor tarafkashligi, isbotlanmagan aniq raqamlar va "bo'lim xodimi o'zi qiladi" degan boshqaruvga xavfli ohang kuchli. Ship qilishdan oldin governance tilini kuchaytirish, raqamlarni test intizomiga almashtirish va yakunni bank qaror artefakti bilan tugatish kerak.

## Top 5 Content Improvements

### 1. Vendor absolutizmini kamaytiring: n8n "bizning tanlov" emas, "pilot uchun tavsiya etiladigan variant"

**Muammo:** Slide 6-7 Zapier/Make/n8n taqqoslashida n8n deyarli shartsiz g'olib sifatida berilgan: "hech narsa chetga chiqmaydi", "Vendor lock-in yo'q", "to'liq mos", "bepul". Bu Central Bank auditoriyasi uchun juda absolyut. Self-hosted bo'lsa ham LLM provayderi, loglar, connector konfiguratsiyasi, backup, update va credential siyosati alohida boshqariladi.

**Rewrite (Slide 6/7):**

> Bank uchun platforma tanlashda savol "qaysi biri zo'r?" emas, "qaysi biri qaysi nazorat bilan ishlatiladi?" bo'ladi. Zapier va Make tez prototip uchun qulay, lekin regulyator ma'lumotlari va mijoz ma'lumotlari bo'yicha cheklovlar bor. n8n self-hosted joylashtirilsa, ma'lumot oqimini bank ichida boshqarish osonlashadi. Shuning uchun ushbu modulda n8n'ni pilot uchun asosiy variant sifatida ko'ramiz. Yakuniy tanlov esa IT xavfsizlik, komplaens, ma'lumot egalari va xarid siyosati tasdig'idan keyin qilinadi.

**Slide text replacement:**

> **n8n - pilot uchun mos variant:** self-hosted joylashtirish mumkin, ma'lumot oqimini bank nazoratida ushlash osonroq, lekin connectorlar, LLM chaqiruvlari, loglar va backup alohida audit qilinadi.

### 2. Aniq raqamlarni "testing discipline" bilan almashtiring

**Muammo:** "2 hafta yoki 30 daqiqa", "10x", "95%", "operator vaqti 0", "90% aniqlik", "4 soat -> 5 daqiqa" kabi raqamlar ishonchli manbasiz juda aniq eshitiladi. Bank auditoriyasi bunday slaydlarda metodika kutadi: baseline, pilot, test dataset, acceptance threshold, monitoring.

**Rewrite (Slide 3/4/11/12/13/17):**

> Raqamni va'da qilmaymiz, o'lchaymiz. Pilotdan oldin baseline olinadi: bir spravka qancha vaqt oladi, nechta xato chiqadi, nechta murojaat inson aralashuvini talab qiladi. Pilotda 2 hafta davomida test oqimi yuritiladi. Keyin qaror jadvali to'ldiriladi: vaqt tejalishi, xato kamayishi, SLA buzilishi, xavfsizlik incidenti, foydalanuvchi shikoyati. Shundan keyin workflow production'ga chiqishi yoki qayta ishlanishi hal qilinadi.

**Slide text replacement:**

> **Tezlik - va'da emas, o'lchov:** baseline -> pilot -> test natijasi -> production qarori.

> **Spravka misoli:** avval 2 haftalik pilotda 100 ta test ariza o'tkaziladi. Maqsad: vaqt, xato, eskalatsiya va audit log sifati bo'yicha o'lchangan natija olish.

### 3. Governance fit: "bo'lim xodimi o'zi yig'adi" modelini uch bosqichli nazoratga o'tkazing

**Muammo:** Deckning asosiy g'oyasi "IT navbatini kutmaymiz; o'zimiz yig'amiz" deb kuchli berilgan. Bu energiya beradi, lekin Central Bank kontekstida noto'g'ri xulosa tug'dirishi mumkin: istalgan xodim istalgan avtomatlashtirishni ishga tushiradi. Slide 16 xavfsizlik bor, lekin boshqaruv modeli oldinroq va aniqroq chiqishi kerak.

**Rewrite (Slide 3 yoki Slide 4 ga qo'shish):**

> No-code bankda "xohlagan odam xohlagan workflow qiladi" degani emas. To'g'ri model uch bosqichli: bo'lim xodimi jarayonni chizadi va sandbox'da prototip yig'adi; IT xavfsizlik integratsiya, credential, log va tarmoq chegarasini tekshiradi; komplaens ma'lumot turi, mijozga ta'sir va audit izini tasdiqlaydi. Faqat shundan keyin workflow production'ga chiqadi.

**Slide text replacement:**

> **Bank modeli:** bo'lim prototip qiladi -> IT xavfsizlik tekshiradi -> komplaens tasdiqlaydi -> production.

### 4. Atamalar yaxshi kiritilgan, lekin Webhook xavfsizlik chegarasi bilan recapped bo'lishi kerak

**Muammo:** Trigger va Webhook kiritilishi talabga mos. Lekin Webhook "URL-eshik" sifatida aytilganda bank auditoriyasi darhol xavfsizlik savolini kutadi: kim yubora oladi, autentifikatsiya bormi, imzo/token bormi, rate limit bormi, loglanadimi? Closing recap ham faqat izoh beradi, governance xotirasini mustahkamlamaydi.

**Rewrite (Slide 5):**

> **Trigger** - workflow'ni boshlatadigan hodisa. Misol: yangi email keldi, juma 17:00 bo'ldi, Telegram botga /spravka yozildi.
>
> **Webhook** - boshqa tizim xabar yuboradigan maxsus URL. Bankda webhook ochilsa, u ochiq eshik emas: token, IP cheklovi, imzo tekshiruvi, rate limit va audit log bilan himoyalanadi.

**Rewrite (Slide 17 recap):**

> Lug'at recap - birga aytamiz:
>
> **Trigger nima?** Workflow'ni boshlatadigan hodisa.
>
> **Webhook nima?** Boshqa tizim xabar yuboradigan maxsus URL.
>
> **Bankda webhook qachon ruxsat?** Token/IP cheklovi, log va mas'ul egasi bor bo'lsa.

### 5. Yakun Q&A emas, bank qaror artefakti bilan tugasin

**Muammo:** Slide 17 yaxshi recap qiladi, lekin modul oxirida auditoriya qo'lida qaror chiqarish vositasi qolmaydi. Markaziy Bank xodimlari uchun eng foydali yakun: qaysi workflow pilotga chiqishi mumkinligini baholaydigan mini decision sheet.

**Rewrite (Slide 17 ni kuchaytirish yoki Slide 18 Q&A oldidan qo'shish):**

> **Bank qaror varaqasi: workflow pilotga chiqadimi?**
>
> 1. Trigger aniqmi? Email, Schedule, Telegram, Form yoki Webhook.
> 2. Ma'lumot turi aniqlanganmi? Ochiq, ichki, maxfiy yoki mijozga oid.
> 3. Inson tasdig'i qayerda turadi? AI faqat tayyorlaydimi yoki qaror ham qilyaptimi?
> 4. Audit log bormi? Kim, qachon, nima kiritdi, nima chiqdi.
> 5. Test mezoni bormi? Vaqt, xato, SLA, eskalatsiya va xavfsizlik bo'yicha o'lchov.
> 6. Mas'ul egasi bormi? Bo'lim egasi, IT egasi, komplaens egasi.
>
> Shu 6 savolga javob bo'lmasa, workflow hali production emas, faqat sandbox prototip.

**Closing replacement:**

> Bugungi qaror artefakti: har bir bo'lim bitta workflow nomini yozadi va 6 savol bo'yicha baholaydi. Ertaga 9-modulda RAG bot qurishdan oldin aynan shu varaqaga qaytamiz.


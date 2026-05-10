# Deck Review

**Verdict:** Kuchli energiya bor, lekin Markaziy Bank auditoriyasi uchun hozircha juda “AI-trener/hype” kayfiyatida; ishonch, nazorat va real bank jarayonlari yetarli og‘irlikda emas.

**Current content score:** **6/10**

## 5 Eng Muhim Tuzatish

### 1. Slayd 3-4: “soch qo‘shish / raqsga tushgan it”ni kesing
Bu CB xodimlari oldida past darajali hook. Kuldiradi, lekin mavzuni yengillashtirib yuboradi.

**O‘rniga real bank og‘rig‘i bilan oching:**

**Slayd 3 yangi sarlavha:**
> Har kuni takrorlanadigan ish: hujjat qidirish, solishtirish, javob tayyorlash

**Lead:**
> AI’ning qiymati rasm yasashda emas. Qiymat — 80 betlik hujjatdan kerakli bandni topish, xulosalash va xatoni kamaytirishda.

**Slayd 4 yangi matn:**
> Bugungi savol: AI bankda kimning o‘rnini bosadi emas.  
> To‘g‘ri savol: qaysi takroriy ishni tezroq, izchilroq va nazorat ostida bajarishga yordam beradi?

---

### 2. Slayd 5: Demo uchun “ishonch shartlari” yo‘q
Live bot yaxshi, lekin “Bu Google emas” yetmaydi. Auditoriya darhol so‘raydi: qaysi hujjat? real ma’lumot bormi? javob topilmasa nima qiladi?

**Slayd 5 ga qo‘shing:**

> Demo qoidasi: bot faqat oldindan yuklangan test PDF korpusidan javob beradi.  
> Real mijoz ma’lumotlari ishlatilmaydi.  
> Hujjatda javob bo‘lmasa, bot “ma’lumot topilmadi” deb aytishi kerak.  
> Yakuniy qaror baribir mas’ul xodimda qoladi.

**Chat javobini ham shunday qiling:**
> “Men bu javobni `kredit_siyosati.pdf`, 4.2-band asosida tayyorladim. Agar bankning amaldagi ichki qarori yangilangan bo‘lsa, mas’ul xodim tasdiqlashi kerak.”

---

### 3. Slayd 16: Xavfsizlik bo‘yicha da’volar xavfli darajada qat’iy
“Bizning arxitekturamiz xavfsizlik talablariga to‘liq javob beradi” degan gapni kesing. Bu muvofiqlik auditoriyasi oldida himoyasiz da’vo.

**Almashtiring:**

> AI yechim bankda faqat nazoratlar to‘liq bo‘lsa ishlatiladi.

**3 blokni shunday yozing:**

> **Ma’lumot tasnifi**  
> Bank siri, shaxsiy ma’lumot va ochiq ma’lumot alohida ishlanadi.

> **Kirish va audit**  
> Kim qanday savol berdi, qaysi hujjatdan javob olindi — loglanadi.

> **Inson tasdig‘i**  
> Kredit, AML, muvofiqlik va mijozga ta’sir qiluvchi qarorlar AI tomonidan yakunlanmaydi.

**Kesiladigan ibora:**
> “xavfsizlik talablariga to‘liq javob beradi”

**Sabab:** “to‘liq” deyish uchun huquqiy asos, data residency, DPA, access control, logging, retention, model provider shartlari ko‘rsatilishi kerak.

---

### 4. Slayd 11-13: Global bozor statistikasi ko‘p, CB uchun “nima qilish kerak” kam
Spherical Insights raqamlari mos: $20.87B → $310.79B, 31.01% CAGR, Asia-Pacific fastest growth deb berilgan. Manba: https://www.sphericalinsights.com/reports/ai-in-banking-market

Lekin 3 slayd global market hype uchun ko‘p. CB auditoriyasi uchun buni 1 slaydga tushiring, qolgan joyni regulyatorlik va operatsion foydaga bering.

**Slayd 11 rewrite:**
> Dunyo banklari AI’ni moda uchun emas, xarajat, tezlik va nazorat uchun joriy qilyapti.

**Slayd 12 o‘rniga yangi slayd:**
> Markaziy Bank uchun 3 ustuvor savol:  
> 1. AI bank operatsion riskini kamaytiradimi?  
> 2. Mijozga noto‘g‘ri javob berish xavfini oshirmaydimi?  
> 3. Qarorlar izohlanadigan va audit qilinadigan bo‘ladimi?

**Slayd 13 lead:**
> Biz AI’ni “qiziq texnologiya” sifatida emas, nazorat qilinadigan ish jarayoni sifatida ko‘ramiz.

---

### 5. Slayd 17: Wordcloud yetarli emas; amaliy natija chiqmaydi
“Eng zerikarli ish qaysi?” yaxshi savol, lekin boshqaruv/muvofiqlik auditoriyasi uchun bu juda yumshoq. Mashg‘ulot oxirida tanlanadigan use-case mezoni bo‘lishi kerak.

**Slayd 17 ni scoring jadvalga aylantiring:**

> Bugun bitta use-case tanlaymiz. Mezonlar:  
> Takrorlanadimi?  
> Hujjatga tayanadimi?  
> Xavfi pastmi?  
> Inson tasdig‘i saqlanadimi?  
> 2 kunda prototip qilish mumkinmi?

**Concrete Uzbek prompt:**
> Bo‘limingizdagi bitta ishni tanlang:  
> “Har hafta/har kuni takrorlanadi, hujjatga tayanadi, yakuniy qaror insonda qoladi.”  
> Shunday ish AI uchun yaxshi nomzod.

**Misollarni qo‘shing:**
> Mijoz shikoyatini tasniflash  
> Ichki yo‘riqnomadan javob topish  
> Hisobot matnini qisqartirish  
> Tekshiruv checklistini oldindan to‘ldirish  
> AML signalini izohlash, lekin qaror bermaslik

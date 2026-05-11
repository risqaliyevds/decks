**Verdict:** Deck mavzuga mos va auditoriya uchun tushunarli: xavf -> nazorat -> boshqaruv zanjiri bor, Hallucination/Data Masking kiritilgan va recap qilingan. Lekin Markaziy Bank auditoriyasi uchun ayrim gaplar hali ham absolyut: RAG, masking va audit log "kafolat" emas, nazorat chorasi sifatida aytilishi kerak. Eng katta bo'shliq: bank ishga tushirishdan oldin qanday qaror hujjati bilan "go/no-go" qiladi, shu artifact slaydda yo'q.

**Score:** 7/10

## Top 5 Rewrites In Uzbek

1. **Vendor absolutism va texnik kafolatlarni yumshatish**

Hozirgi ruh: `AI hech qachon haqiqiy mijoz nomini bilmaydi`, `har qanday xavfni boshqarsa bo'ladi`, `har qaror manbasi loglanadi`.

**Rewrite:**  
`Masking va RAG xavfni kamaytiradi, lekin uni yo'q qilmaydi. Shuning uchun har bir AI yechimida cheklangan ma'lumot, inson nazorati, test natijalari va audit izi birga talab qilinadi. Provayder tanlashda ham "ishonamiz" emas, shartnoma, data residency, retention va log siyosati tekshiriladi.`

2. **Data Masking intro + recapni aniqroq qilish**

Hozir yaxshi boshlangan, lekin masking "AI hech narsa ko'rmaydi" degan mutlaq va'daga yaqinlashib qolgan. Masking qaysi ma'lumot turlarini yopishi va qayta identifikatsiya xavfi borligi aytilsin.

**Rewrite:**  
`Data Masking - mijozni tanitadigan ma'lumotlarni AI'ga yuborishdan oldin tokenlarga almashtirish: ism, telefon, karta raqami, hisob raqami, INN, manzil. AI matn vazifasini ko'radi, lekin shaxsni aniqlovchi asl qiymatlarni ko'rmasligi kerak. Muhim eslatma: masking qoidalari test qilinadi, chunki noto'g'ri sozlangan masking bank sirini baribir ochib yuborishi mumkin.`

**Recap rewrite:**  
`Data Masking nima? - Shaxsiy va bank siriga oid ma'lumotlarni AI'ga ketishidan oldin tokenlarga almashtirish; keyin javob bankning nazoratli tizimida qayta tiklanadi.`

3. **Hallucination + RAGni governance-safe qilib aytish**

Hozir RAG yechimi yaxshi tushuntirilgan, lekin "manbadan ko'chiradi" juda soddalashtirilgan. RAG noto'g'ri hujjat, eskirgan hujjat yoki noto'g'ri retrieval bilan xato qilishi mumkin.

**Rewrite:**  
`Hallucination - AI fakt yo'q joyda ishonchli javob yasab berishi. RAG bu xavfni kamaytiradi: model javobni tasdiqlangan hujjatlar bazasidan qidiradi, manbani ko'rsatadi va manba topilmasa javobni to'xtatadi yoki inson tekshiruviga yuboradi. Lekin RAG ham nazorat o'rnini bosmaydi: hujjat bazasi yangiligi, manba sifati va javob formati doim tekshiriladi.`

4. **Muvofiqlik qatlamlarini aniq yurisdiksiya bilan berish**

Slide 8 dagi GDPR/EU AI Act foydali orientir, lekin "hamma bankka bevosita majburiy" kabi eshitilmasin. O'zbekiston banki uchun asosiy tayanch - mahalliy regulyator, bank siri, shaxsiy ma'lumotlar, axborot xavfsizligi va ichki siyosat.

**Rewrite:**  
`AI yechimi uch turdagi talabdan o'tadi: 1) O'zbekiston regulyator talablari - bank siri, shaxsiy ma'lumotlar va axborot xavfsizligi; 2) bankning ichki siyosati - risk appetite, javobgarlik, model nazorati va audit; 3) tashqi hamkorlar va xalqaro amaliyot - ISO 27001, GDPR andozasi, yuqori xavfli AI uchun izohlanuvchanlik talablari. Xalqaro standartlar har doim ham bevosita qonun emas, lekin hamkor va audit talabida paydo bo'lishi mumkin.`

5. **Bank decision artifact qo'shish**

Deck boshqaruv rollarini beradi, ammo qaror qanday rasmiylashtirilishini bermaydi. Markaziy Bank xodimlari uchun eng kerakli narsa - "qaysi hujjatni so'raymiz?" degan javob.

**Rewrite:**  
`Har AI vositasi ishga tushishidan oldin bitta qaror kartasi to'ldiriladi: use case nomi, biznes egasi, ishlatiladigan ma'lumot turi, provayder/model, masking talabi, RAG manbalari, human-in-the-loop nuqtasi, audit log tarkibi, log saqlash muddati, qoldiq xavf bahosi va tasdiqlagan qo'mita. Shu karta bo'lmasa, "AI tayyor" degan gap boshqaruv qarori hisoblanmaydi.`

**Suggested slide insert:**  
`Slide 10 dan keyin yoki Slide 13 recapda kichik blok: "Bank qaror kartasi: Egasi -> Ma'lumot -> Nazorat -> Qoldiq xavf -> Go/No-Go".`

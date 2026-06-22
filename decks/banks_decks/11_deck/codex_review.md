# Verdict + Score: 7/10

Deckning umumiy yo'nalishi to'g'ri: bu build-along emas, RAG showcase + dizayn seminari ekanini ochiq aytadi; RAG va Embedding atamalari slide 5 da kiritilgan, slide 17 da qaytarilgan; slide 16 esa bank muhokamasi uchun yaxshi qaror artefakti bo'la oladi. Lekin chiqarishdan oldin 5 ta joyni tuzatish kerak: bot statistikasi kontekst bilan mos emas, privacy/governance matni haddan tashqari qat'iy, "production-grade" da In-Memory vector store xavfi yumshatilgan, ayrim joylar "quramiz" ohangiga qaytib ketadi, Uzbek matnida inglizcha ishchi atamalar ko'p.

## Punch-List

1. **Content accuracy + governance fit**
   - Slide 7, notes va content.md `77 node / 14 marshrut` deydi, lekin `bots/02_rag_chatbot/README.md` `73 nodes, 2 trigger chains`, `Switch (13 outputs)` va admin commandlar bo'yicha boshqa hisobni beradi. Bitta raqamga keltiring yoki "taxminan 70+ node" deb xavfsizlang.
   - README ichida sarlavha `01 - RAG Asoslari` va pastda "bot 01" degan iboralar bor, deck esa `bots/02_rag_chatbot` deydi. Slide 14 da bot folder pointer berilayotgan bo'lsa, bu nomlash chalkashligi oldindan tozalanishi kerak.
   - Slide 13 "Bank PDF - bank ichida" deydi, lekin Gemini API/Vertex orqali tashqi model chaqiruvi bor. Governance uchun to'g'riroq ifoda: "bank tasdiqlagan konturda, tasdiqlangan API shartlari bilan". Aks holda compliance auditoriyasi "haqiqatan ham bank ichidami?" deb ushlab qoladi.
   - "Production grade" yorlig'i In-Memory Vector Store bilan keskin eshitiladi. In-memory restart, reindex va persistence riskini ochiq ayting yoki "showcase production-shape" deb yumshating.

2. **Atamalar coverage**
   - Slide 5 kiritish yaxshi: RAG va Embedding farqi bankir tilida tushunarli.
   - Slide 17 recap bor, lekin screenshotda pastdagi recap juda mayda va kontrasti past. Bu series rule uchun kritik qism, shuning uchun uni 30-60 soniyalik interaktiv blok sifatida ko'proq ko'rinadigan qiling.
   - Embedding izohida "raqamli vakil" o'rniga "ma'noni raqamli vektorga aylantirish" barqarorroq. RAG izohida "faqat bank PDF" deyishdan oldin "korpusga kiritilgan tasdiqlangan hujjatlar" deb aytish governancega mosroq.

3. **Showcase tone**
   - Deck ko'p joyda "siz qurmaysiz - ichini ko'rasiz" deydi, bu to'g'ri.
   - Slide 14 dagi "bitta paste - bot tikladi", slide 17 dagi "shu yo'ldan o'tish mumkin" iboralari build-along ohangini qaytaradi. "Instructor reference" va "keyin production reja uchun andoza" deb yozing.
   - Slide 3 "1-modulda ishlatilgan bot" hook yaxshi, ammo "bugun ichini ochamiz" demoda qolishi kerak; talabalar live RAG qurmaydi.

4. **Uzbek language quality**
   - Umumiy Uzbek tushunarli, ammo "canvas", "allow-list", "workflow", "node", "Top-K", "UsageLog", "production grade" kabi so'zlar ko'p. Texnik nomlar kerak bo'lgan joyda qolaversin, lekin sarlavha va qaror matnlarida bankcha Uzbekni kuchaytiring.
   - "Marshrut" yaxshi lokalizatsiya, lekin `/help /list_docs...` soni bilan mos kelmasa chalkashadi.
   - "Topilmadi" iborasi yaxshi ishlatilgan; uni governance signal sifatida kuchaytirish kerak: bu xato emas, nazoratli rad javobi.

5. **Bank decision artifact - slide 16**
   - 5 qatorli canvas yaxshi, lekin bank qarori uchun hali yetarli emas. Kamida quyidagilar qo'shilsin: owner/mas'ul bo'lim, ma'lumot toifasi, hujjat yangilash davri, success threshold, eskalatsiya egasi.
   - "20 ta real savol - bot to'g'ri javob va to'g'ri manba bermasa, pilot rad qilinadi" juda keskin. Bank pilotida yaxshiroq mezon: 20 savol test seti, har javobda manba, xato javob 0, topilmadi holatlari alohida ko'rib chiqiladi.
   - Qaror variantlari yaxshi, lekin "Bormaymiz" o'rniga "Hozir boshlamaymiz" yumshoqroq va boshqaruv tiliga mosroq.

## Top 5 Rewrites In Uzbek

1. **Slide 7 - statistika aniqligi**
   - Hozir: "Real bot - 77 node, 14 marshrut, ikki eshik."
   - Taklif: "Real bot - 70+ node, 2 trigger zanjiri, admin buyruqlar bilan."
   - Pastki izoh: "Aniq node soni workflow versiyasiga qarab o'zgaradi; asosiy model - Telegram savol eshigi + admin hujjat eshigi."

2. **Slide 13 - governance wording**
   - Hozir: "Bank PDF - bank ichida."
   - Taklif: "Bank PDF - bank tasdiqlagan konturda."
   - Matn: "Drive papkasi, embedding va LLM chaqiruvi faqat tasdiqlangan korporativ shartnoma, DPA, data residency va zero-training bandlari tekshirilgandan keyin ishlatiladi."

3. **Slide 5 - RAG ta'rifi**
   - Hozir: "AI internetdan emas, faqat sizning bank PDF'idan o'qib javob beradi."
   - Taklif: "AI avval tasdiqlangan bank hujjatlaridan mos bandni topadi, keyin faqat shu bandga tayanib javob yozadi. Manba topilmasa - javob bermaydi."

4. **Slide 14 - showcase tone**
   - Hozir: "00-MASTER-PROMPT.md - bitta paste - bot tikladi"
   - Taklif: "00-MASTER-PROMPT.md - instructor reference: bot dizayni qanday yig'ilganini ko'rish uchun"
   - Qo'shimcha: "Bugun rebuild emas; arxitekturani o'qiymiz va o'z pilotimizga talab yozamiz."

5. **Slide 16 - pilot qarori**
   - Hozir: `"Bormaymiz / sintetik PDF bilan boshlaymiz / haqiqiy korpus bilan boshlaymiz". Yakuniy.`
   - Taklif: `"Hozir boshlamaymiz / sintetik hujjat bilan sinaymiz / cheklangan haqiqiy korpus bilan pilot qilamiz". Qaror egasi, mas'ul bo'lim va qayta indekslash davri yoziladi.`

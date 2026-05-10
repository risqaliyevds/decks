Verdict: NEEDS-FIXES
Score: 7/10

The deck has a useful step-by-step RAG story and it satisfies the series rule of introducing RAG and Embedding on slide 5 and recapping them on slide 18. It is close to usable for a Markaziy Bank audience, but it needs governance tightening before delivery: remove vendor certainty, replace shaky numeric precision with test discipline, and end with a bank decision artifact instead of only Q&A.

Verification note: the deck references the paired student-build as `bots/01_rag_basics/` in `content.md`, `notes.md`, and slide 13 of `index.html`, but `C:\projects\slides\bots\01_rag_basics` does not exist in the workspace. Fix the path or add the missing bot folder before shipping.

Top 5 Content Improvements

1. Replace "RAG = hallucination minimum" with a governance-safe claim.

Current issue: slide 4 and slide 18 imply RAG largely solves hallucination. For a bank audience, that is too absolute. RAG reduces unsupported answers only when source quality, retrieval, prompt rules, and testing are controlled.

Concrete rewrite in Uzbek:

Slide 4 lead:
Oddiy LLM umumiy bilimga tayanadi va manbasiz javob berishi mumkin. RAG esa javobdan oldin bank hujjatidan tegishli bo'lakni topadi va javobni shu manbaga bog'laydi. Bu xato xavfini kamaytiradi, lekin manba sifati va test natijasi bilan tekshirilishi shart.

Slide 18 first takeaway:
RAG - "qidir + manbaga tayanib javob ber". U gallyutsinatsiya xavfini kamaytiradi, lekin nolga tushirmaydi. Bankda har bir RAG bot test savollari va manba havolasi bilan qabul qilinadi.

2. Tighten RAG and Embedding definitions so terms are clean, bank-safe, and technically accurate.

Current issue: "qidir + javob bil" is memorable but imprecise. "AI hujjatdan ko'chirib javob beradi" in notes is risky because generation is not copying. Embedding examples use exact-looking dimensions and similarity scores without explaining they are illustrative.

Concrete rewrite in Uzbek:

Slide 5 RAG card:
RAG - Retrieval-Augmented Generation. Bankir tilida: "avval manbani top, keyin javob yoz". Bot savolga javob berishdan oldin tasdiqlangan ichki hujjatdan tegishli bo'laklarni topadi, keyin javobni faqat shu bo'laklarga tayangan holda tuzadi.

Slide 5 Embedding card:
Embedding - matnning ma'no izi. Matn raqamli vektorga aylantiriladi, shunda "avtokredit foizi" va "mashina krediti stavkasi" kabi yaqin ma'noli iboralar bir-biriga yaqin topiladi. Raqamlar modelga bog'liq; slayddagi qiymatlar soddalashtirilgan misol.

Slide 18 recap:
RAG = avval manbani topish, keyin shu manbaga tayangan javob yozish.
Embedding = matnni ma'nosi bo'yicha qidirish uchun raqamli vektorga aylantirish.

3. Replace vendor absolutism and product recommendations with selection criteria.

Current issue: Gemini is positioned as the center/brain, `gemini-embedding-001` is treated as the expected model, and Supabase pgvector is called "bank uchun eng yaxshisi". For Markaziy Bank, the deck should teach a decision framework, not imply one vendor or database is institutionally correct.

Concrete rewrite in Uzbek:

Slide 7 lead:
Markazda bitta aniq vendor emas, LLM xizmati turadi. Mashqda Gemini ishlatamiz; bank muhitida model va infratuzilma axborot xavfsizligi, ma'lumot joylashuvi, audit talabi va xarajat bo'yicha tanlanadi.

Slide 10 flow:
Embedding modeli -> matn vektori. Muhim qoida: hujjatni saqlashda ham, savolni qidirishda ham bir xil embedding modeli ishlatiladi.

Slide 12 lead:
Vector DB tanlovi "eng yaxshi" degan bitta javobga ega emas. Qaror 4 mezon bilan olinadi: ma'lumot qayerda saqlanadi, audit log bormi, jamoa qaysi texnologiyani qo'llab-quvvatlay oladi, yuklama va xarajat qanday.

Slide 12 card labels:
Supabase pgvector -> Postgres ekotizimi bor jamoalar uchun nomzod.
Pinecone -> boshqariladigan servis kerak bo'lsa, komplaens tekshiruvidan keyin.
Chroma / In-Memory -> o'quv mashqi va prototip uchun, production qarori emas.

4. Replace shaky numeric precision with testing discipline.

Current issue: 800/120 chunking, Top-3, 300 ms, 200 ms, 1.5 seconds, 80% questions, and Pinecone price are framed too precisely. These numbers will vary by document, language, model, network, database, and deployment. A bank audience needs a test harness mindset.

Concrete rewrite in Uzbek:

Slide 9:
Boshlang'ich sozlama: 500-800 belgi atrofida chunk, kichik overlap bilan. Lekin yakuniy sozlama test orqali tanlanadi: 20-30 real savol beriladi, bot topgan manba va javob to'g'riligi tekshiriladi.

Slide 11:
Savol kelganda 4 harakat bo'ladi: savol vektorga aylanadi, yaqin chunklar topiladi, javob yoziladi, manba ko'rsatiladi. Tezlik deploymentga bog'liq; bank uchun asosiy metrika - javob va manba to'g'riligi.

Slide 16:
Top-K ni Top-3 dan boshlang, keyin test qiling. Agar javob manbani o'tkazib yuborsa - Top-K yoki chunk hajmini o'zgartiring. Agar javobda ortiqcha shovqin bo'lsa - Top-K ni kamaytiring yoki hujjatni yaxshiroq bo'ling.

Slide 17:
"80% savollar" o'rniga: Bo'limdagi takrorlanuvchi savollarning qaysi qismi RAGga mos kelishini test savollari orqali o'lchaysiz.

5. End with a bank decision artifact, not just "you built a bot".

Current issue: the ending motivates the next module, but it does not leave participants with a governance-ready artifact. For Markaziy Bank, the output should be a short decision sheet: can this bot move from exercise to pilot, under what controls, and who approves?

Concrete rewrite in Uzbek:

Replace slide 18 third takeaway:
Bugungi yakun - ishlagan bot emas, qaror varaqasi. Har stol quyidagini topshiradi: hujjat nomi, 5 ta test savol, javob/manba natijasi, topilgan xavflar, keyingi qaror.

Add closing artifact block:
RAG pilot qaror varaqasi:
1. Use case: qaysi bo'lim va qaysi savollar?
2. Manba: qaysi hujjat, versiya sanasi, egasi kim?
3. Test: nechta savoldan nechtasi to'g'ri manbani topdi?
4. Xavf: maxfiy ma'lumot, noto'g'ri javob, eskirgan hujjat xavfi.
5. Qaror: pilotga ruxsat / qayta ishlash / rad etish.

Slide 19 Q&A prompt:
Savollar: RAG, n8n, vector DB tanlovi, komplaens va pilot qarori bo'yicha.

Additional Punch List

- Uzbek language cleanup: use one spelling consistently. Prefer "komplaens" or "muvofiqlik", not both randomly; "vektor bazasi" may be clearer than "Vector DB" for first mention; "xatboshi" is not always equal to "chunk", so define "bo'lak/chunk" once.
- Fix module bridge inconsistency: slide 17 says "12-modul - ertaga", while notes also mention 10-modul. Day 2 sequence says module 10 follows module 9; use "10-modulda agent tushunchasi" and reserve 12-modul for multi-step pipeline.
- Slide 14 content is good, but add an explicit "RAG ishlamaydi -> agent/pipeline yoki qoida dvigateli kerak" line for calculation and comparison tasks.
- Slide 13 path must be clickable/usable in the workshop. Since the paired bot folder is missing, participants cannot follow the build as written.
- Closing recap meets the atamalar rule, but pair it with the decision artifact so the last business memory is "qaysi shart bilan pilot qilamiz?", not only vocabulary.

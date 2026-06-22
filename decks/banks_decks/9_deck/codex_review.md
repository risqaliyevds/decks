Verdict: SHIP AFTER SMALL FIXES
Score: 8/10

This deck is now pointed at the right module goal: a first, simple AI workflow that bankers can build live. The Classification + Schema atamalar are introduced on slide 5, reused in the user journey, and recapped on slide 18. RAG/Embedding are only forward references to modules 10-11, not re-taught here, which fits the series terminology rule.

The main fixes are precision and governance tone. The deck repeatedly says "no code", but the paired bot README has a Code node with an 8-line JS snippet. For a live 15-30 minute build, call this "tayyor kod bo'lagi copy-paste qilinadi" instead of "kod yo'q". Also tighten the data/privacy language: Telegram text is sent to Gemini, and customer/operator rows are stored in Google Sheets, so the bank story must be "demo uchun, productionda PII masking, access control, audit, and approval needed", not "ma'lumot tashqariga chiqmaydi".

Top 5 Uzbek Rewrites

1. Slide 7 / 15 / 18: replace absolute "no code" with build-along-accurate wording.

Current risk: "kod yo'q" conflicts with the paired bot's Pick Operator Code node.

Rewrite:
7 ta asosiy node bilan quramiz. Murakkab dasturlash yo'q: faqat bitta tayyor Pick Operator skriptini copy-paste qilamiz, qolgan sozlamalar n8n oynasida tanlanadi.

2. Slide 12 speaker notes: fix the governance/privacy claim.

Current risk: "Mijoz ma'lumoti tashqi serverga chiqmaydi (faqat Gemini API...)" is internally contradictory and too soft for a Central Bank audience.

Rewrite:
Demo rejimida mijoz xati Gemini API'ga tasniflash uchun yuboriladi, natija esa bank boshqaradigan Google Sheets jadvaliga yoziladi. Production uchun alohida qaror kerak: PII masking, token va Sheets huquqlari, audit log, ma'lumot saqlash muddati va komplaens roziligi.

3. Slide 5: make Schema more Uzbek and less "JSON-first".

Current risk: non-technical audience may remember JSON syntax but miss the business reason.

Rewrite:
Schema - botning javobi uchun qat'iy shakl. Bankir tilida: AI erkin matn yozmaydi, faqat kelishilgan kataklarni to'ldiradi: toifa, mavzu, tafsilot, shoshilinchlik. Shu sabab Sheets ustunlari adashmaydi va operator avtomatik topiladi.

4. Slide 14: clarify classifier boundaries without teaching RAG/Embedding.

Current risk: "RAG kerak" is acceptable as a forward reference, but do not define it here.

Rewrite:
Agar mijoz "foiz stavkasi qancha?" deb aniq javob so'rasa, bu classifier vazifasi emas. Bugungi bot xatni yo'naltiradi. Hujjatdan javob beradigan botni 11-modulda ko'ramiz.

5. Slide 18: strengthen the bank decision artifact as the output of the live exercise.

Current risk: the artifact exists, but it should be framed as the thing every table submits, not a decorative closing block.

Rewrite:
Mashg'ulot yakuni - faqat ishlagan bot emas, pilot qaror varaqasi. Har stol 5 bandni topshiradi: bo'lim, toifalar, 10 ta test xat natijasi, asosiy xavflar, va qaror - pilotga ruxsat / qayta ishlash / rad etish.

Punch List

- Content accuracy: update all "no code" claims to "no complex coding" or "tayyor skript copy-paste". The bot README explicitly includes a Code node, so the current wording can break trust during the build.
- Governance fit: add one visible production caveat on slide 12 or 18: PII masking, access control, audit, and approval. This is a Central Bank deck; the audience should leave with controls, not only a working demo.
- Atamalar: keep Classification + Schema as the only official terms for this module. Do not expand RAG or Embedding definitions here; slide 17 can keep them as module 11 forward refs.
- Build-along tone: slide 15 is strong. Add "instructor shablonidan boshlaymiz" or "har stolga tayyor Sheets template beriladi" so the 15-30 minute promise sounds credible.
- Uzbek quality: prefer "tasniflagich" or "classifier" consistently. Right now both are fine, but slide titles lean English. For bank audience, use "classifier (tasniflagich)" once, then mostly "tasniflagich".
- Bank decision artifact: slide 18 is the right artifact. Make it operational: every table must submit the decision sheet, and the facilitator collects it before Q&A.
- Visual/screenshots: rendered deck is clean overall. Slide 3's QR dominates while the RAG-to-classifier message is dim; increase contrast or simplify that slide if time permits.
- Link note: user-requested `bots/01_classifier_bot/README.md` is not at repo root. Actual path read for this review: `decks/cb_decks/bots/01_classifier_bot/README.md`. The deck's `../bots/01_classifier_bot` link is correct from `9_deck`.

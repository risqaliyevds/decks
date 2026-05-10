# Verdict

**Score: 7/10.** Deck 14 is structurally strong for a final group project: MVP and Iteration are introduced on slide 5, used through the practical tasks, and recapped on slide 18. The bank governance message is present ("yakuniy qaror odam/bankir zimmasida"), and the module fits `CLAUDE.md` expectations for non-technical Central Bank staff.

Main fixes before delivery: remove shaky precision where it sounds like a promise, soften vendor lock-in language, repair Uzbek phrasing, align slide 16 with the speaker text, and end with a tangible bank decision artifact instead of only "we saw one agent."

## Punch-List Review

### Content Accuracy

- **Slide 16 mismatch:** heading says "5 test", `content.md` lists 5 tests, but `index.html`/screenshot show only 4. Add the missing "chetga chiqish" test or rename to "4 test". Best fix: keep 5 and add "mavzudan tashqari savol -> bankirga yo'naltirish".
- **`bots/03_complex_agent` path is relative to `decks/cb_decks/`, not repo root.** In speaker text/slide labels this is fine inside the seminar folder, but if mentioned orally say "`cb_decks/bots/03_complex_agent` shabloni".
- **"13 nodali n8n shablon" is partly true but too exact for the slide.** Bot docs say simplified ~13-node template, 13 text-only / 17 with file branch, while the TS workflow currently has the file branch left for v2. Replace with "soddalashtirilgan n8n shablon" or "taxminan 13 nodali asosiy oqim".
- **"50 ta xabar" should be "50 ta turn/xabar oynasi" or less precise.** The bot docs use memory window 50 turns; saying "so'nggi 50 ta xabar" may be technically off.
- **"4 hafta" / "1-2 hafta" / "85%" / "30 daqiqa" are good teaching anchors but read like guaranteed outcomes.** Keep them as examples: "masalan", "odatda", "pilot mezoni sifatida".

### Governance Fit

- Strong: slide 11, 12, 16, 18 keep final decision with the human banker. This fits Central Bank/compliance audience.
- Add one explicit governance artifact near the end: **"MVP qaror varaqasi"** or **"Pilotga chiqarish qarori"** with fields: owner, scope, excluded decisions, success metric, data boundary, escalation rule, next iteration date.
- Slide 12 says the bot must state the banker decides. Good, but it should also say **bot does not assess creditworthiness or approve/reject**. That closes the biggest banking-risk gap.
- Slide 14 knowledge-base update strategy should include an owner: "tarif o'zgarsa kim tasdiqlaydi?" Without owner, governance is incomplete.

### Atamalar Coverage

- Meets the `CLAUDE.md` rule: **MVP** and **Iteration** are introduced on slide 5 and recapped on slide 18.
- The deck correctly uses prior terms as cross-references: RAG, Schema, Agent, Prompt, Knowledge Base are contextual, not reintroduced as official new terms.
- Tighten the Uzbek for MVP: "Minimum Mahsulot" is understandable, but **"eng kichik ishlaydigan versiya"** should be the phrase repeated most often. "Minimum Mahsulot" alone sounds unnatural.
- Use one spelling consistently: **"iteratsiya"** in Uzbek prose, **"Iteration"** only as the official English term on the glossary card.

### Uzbek Quality

- Fix typos and awkward forms in `content.md`: `kog'ozga` -> `qog'ozga`, `qoshib` -> `qo'shib`, `siklasi` -> `sikli`, `to'g'rladik` -> `to'g'riladik`, `beresizlar` -> `berasizlar` or `berishingiz`, `ayatamiz` -> `aytamiz`.
- "kommentariya beraman" -> **"izoh beraman"**.
- "naturaliklik muhim" -> **"tabiiy chiqishi muhim"**.
- "stol bo'yicha" is overused and sometimes unclear. Use **"har stol"**, **"stolda"**, or **"guruhingiz"** depending on sentence.
- "Banker'lar" in notes should be **"bankirlar"**.

### Vendor Absolutism

- Vendor lock-in is mostly not absolutist, but slide 11 still reads like the architecture must be **Gemini + n8n + Telegram + Sheets/Drive**.
- Keep the concrete demo stack, but phrase it as an example: **"bugungi demo stack"**, **"masalan, Gemini modeli"**, **"Sheets o'rnida ichki reyestr bo'lishi mumkin"**.
- Replace "Agent (Gemini)" with **"Agent (LLM modeli; demoda Gemini)"** if the goal is governance-neutral bank training.
- Replace "Telegramdan Sheetsgacha" with **"kanaldan reyestrgacha"** in one place, then mention Telegram/Sheets as the demo implementation.

### Replace Shaky Numeric Precision

- "6 oy mukammal -> rad etiladi" is a useful hook, but too absolute. Better: **"6 oy mukammal deb qurilgan loyiha ko'pincha real bo'lim sinovidan o'tmaydi."**
- "4 hafta MVP" should become **"4 haftalik MVP maqsadi"** or **"4 hafta ichida sinovga chiqadigan V1"**.
- "85% holatda to'g'ri" should be example-only: **"[masalan: 10 holatdan kamida 8 tasida to'g'ri tushunadi]"**.
- "13 nodali", "50 ta xabar", "24 soat" should be framed as template defaults, not bank policy.

### Ending: Bank Decision Artifact

- Current ending is motivational and recap-heavy; it does not leave participants with a bank-ready artifact.
- Add or rewrite the final closing so the output is: **"Har stol yakunda 1 betlik MVP qaror varaqasini topshiradi."**
- Minimum artifact fields:
  - Muammo va foydalanuvchi
  - MVP doirasi va doiradan tashqari ishlar
  - Bot nimalarni qila olmaydi
  - Muvaffaqiyat mezoni
  - Ma'lumot manbasi va mas'ul egasi
  - Bankirga eskalatsiya qoidasi
  - Keyingi iteratsiya sanasi

## Top 5 Uzbek Rewrites

1. **Current:** `"6 oy mukammal" yoki "4 hafta ishlaydigan" -- qaysi loyiha omon qoldi?`  
   **Rewrite:** `"6 oyda mukammal"mi yoki "4 haftada sinovga tayyor V1"mi -- bankda qaysi biri yashab ketadi?`

2. **Current:** `MVP -- Minimum Mahsulot`  
   **Rewrite:** `MVP -- eng kichik ishlaydigan versiya. Demo emas: bankir bir hafta sinab ko'radigan V1.`

3. **Current:** `13 nodali n8n shablon. Mijozdan ma'lumot va hujjat yig'adi...`  
   **Rewrite:** `Bugungi demo -- n8n asosidagi soddalashtirilgan agent shabloni. U mijozdan ma'lumot va hujjat yig'adi, yakunda bankir ko'radigan qator tayyorlaydi.`

4. **Current:** `Iteration -- kichik o'zgarish, qayta sinash.`  
   **Rewrite:** `Iteratsiya -- hammasini qayta qurish emas; bitta o'zgarishni kiritib, real holatda qayta sinash.`

5. **Current:** `Oxirida -- biz 5 ta bo'lakni qo'shib, bitta to'liq agentni ko'ramiz.`  
   **Rewrite:** `Oxirida har stol 1 betlik MVP qaror varaqasini beradi: nima quriladi, nima qurilmaydi, kim tasdiqlaydi va keyingi iteratsiya qachon.`

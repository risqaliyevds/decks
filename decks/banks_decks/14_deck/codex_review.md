# Verdict

**Score: 8/10.** Deck 14 is close to delivery-ready: it fits the group-project slot, introduces **MVP** and **Iteration** on slide 5, recaps them on slide 18, and keeps the most important governance line visible: the agent gathers information, but final decisions stay with a bankir. Screenshots confirm the visual flow is readable and the closing now includes a **1 betlik MVP qaror varaqasi**.

Main remaining work: align speaker text with the improved HTML, soften absolute claims, remove a few shaky technical references, and make the closing artifact more operational for a Central Bank audience.

## Punch-List

### 1. Content Accuracy

- **Speaker text is behind the HTML.** `content.md` still says slide 11 has "13 ta n8n node", "Agent (Gemini)", and "so'nggi 50 ta xabar"; the current slide wisely says "soddalashtirilgan n8n shabloni" and "LLM (demoda Gemini)". Update speaker text to the slide wording.
- **RAG reference likely wrong:** `content.md` slide 6 says "9-modulda biz RAG botni qurgan edik", but `CLAUDE.md` maps deck 9 to classifier bot and deck 11 to RAG chatbot. Rewrite as "11-moduldagi RAG chatbot misolida..." or keep it generic.
- **Schema reference is wrong:** `content.md` slide 13 says "11-modulda Schema atamasini gaplashgan edik"; `CLAUDE.md` maps **Schema** to deck 9. Fix to "9-moduldagi Schema atamasi".
- **Avoid hard promises:** "4 hafta", "1-2 hafta", "85%", "30 daqiqa", "24 soat" work as examples, but should be framed as demo/pilot assumptions: "masalan", "pilot mezoni sifatida", "bugungi shablonda".
- **Slide 16 is now fixed.** Earlier mismatch is gone: screenshot and HTML both show 5 tests, including "chetga chiqish".

### 2. Governance Fit

- Strong fit: slides 11, 12, 16, and 18 repeatedly say the agent does not make the final banking decision.
- Slide 12 should explicitly add: **bot kreditga layoqatni baholamaydi, foiz/stavka va tasdiq/rad qarorini bermaydi**. Current "ha/yo'q demaydi" is good, but creditworthiness needs to be named.
- Slide 14 is governance-aware because it asks who confirms tariff changes. Keep that in speaker text too: **ma'lumot egasi bo'lmasa, RAG bazasi governance'dan o'tmagan hisoblanadi**.
- Closing artifact is the right direction. Add one line orally: **"Bu varaqa pilotga ruxsat emas; bu pilotni muhokama qilish uchun qaror materiali."** That fits Central Bank tone better.

### 3. Atamalar: MVP + Iteration Intro + Recap

- Meets `CLAUDE.md`: official new terms are **MVP** and **Iteration**, introduced on slide 5 and recapped on slide 18.
- Good: other terms (RAG, Schema, Agent, LLM, prompt, knowledge base) are used as prior-course context rather than new glossary entries.
- Uzbek prose should prefer **iteratsiya** after the glossary slide; keep **Iteration** only as the English term label.
- "Minimum Mahsulot" is usable as a translation, but the phrase participants should remember is **eng kichik ishlaydigan versiya**. Repeat that more than "Minimum Mahsulot".

### 4. Group-Project Tone

- The deck correctly shifts from lecture to table work after slide 11. The 5-stol split is clear and practical.
- Watch ownership language: "biz taqdim qilamiz" in `content.md` slide 17 weakens the participant ownership. Better: **"siz taqdim qilasiz, men qisqa izoh beraman."**
- Slide 17/18 should make output expectations concrete: each table leaves with one filled decision sheet, not only a verbal demo.
- The tone should be collaborative, not heroic. Avoid "bugun bitta tayyor agentni ko'ramiz" if the room is only designing components; say **"bitta agent dizaynini yig'amiz."**

### 5. Uzbek Quality

- Fix typos in `content.md`: `kog'ozga` -> `qog'ozga`, `qoshib` -> `qo'shib`, `siklasi` -> `sikli`, `to'g'rladik` -> `to'g'riladik`, `beresizlar` -> `berasizlar` or `berishingiz`, `ayatamiz` -> `aytamiz`.
- Replace awkward words: `kommentariya beraman` -> **izoh beraman**, `prezentatsiya` -> **taqdimot**, `komanda` -> **jamoa**.
- Standardize spelling: **stsenariy** or **senariy**, but do not mix both.
- `notes.md`: `Banker'lar` -> **bankirlar**.
- Current screenshots are visually readable, but some body text is low-contrast by design. Do not add more text to slides 5, 16, or 18 without reducing elsewhere.

### 6. MVP Qaror Varaqasi at Closing

- Slide 18 already includes the right fields: muammo, doira, doiradan tashqari, bot nima qilolmaydi, muvaffaqiyat mezoni, ma'lumot egasi, eskalatsiya, keyingi iteratsiya sanasi.
- Make it the actual close, not a side note. Say: **"Bugungi topshiriq shu varaqani to'ldirish bilan yopiladi."**
- Add two missing bank-governance fields if space allows in handout/speaker text: **risk egasi** and **pilotni to'xtatish sharti**.

## Top 5 Uzbek Rewrites

1. **Current:** "Bugun xayolingizdagi loyihani 6 oydan keyinga qoldirmaysiz."  
   **Rewrite:** "Bugun katta g'oyani 6 oyga cho'zmaymiz; uni 4 haftada sinovga chiqadigan V1 ko'rinishiga tushiramiz."

2. **Current:** "MVP - Minimum Mahsulot."  
   **Rewrite:** "MVP - eng kichik ishlaydigan versiya: demo emas, bankir bir hafta sinab ko'radigan V1."

3. **Current:** "13 ta n8n nodedan iborat, Telegram'dan kelgan..."  
   **Rewrite:** "Bugungi demo - n8n asosidagi soddalashtirilgan agent shabloni: kanaldan kelgan murojaatni reyestrga tayyor qatorga aylantiradi."

4. **Current:** "Iteration - Build, Test, Measure, Learn - qayta-qayta yaxshilash sikli."  
   **Rewrite:** "Iteratsiya - hammasini qayta qurish emas; bitta o'zgarishni kiritib, real holatda qayta sinash."

5. **Current:** "Oxirida biz 5 ta bo'lakni qo'shib, bitta to'liq agentni ko'ramiz."  
   **Rewrite:** "Oxirida har stol 1 betlik MVP qaror varaqasini beradi: nima quriladi, nima qurilmaydi, kim javobgar va keyingi iteratsiya qachon."

# Verdict: SHIP WITH LIGHT FIXES · Score 8/10

Deck 10 now fits the seminar arc: **Agent** and **Tool Use** are introduced on slide 5, recapped on slide 16, and converted into a bank decision artifact on slide 17. Governance posture is much stronger than the earlier version: Agent is framed as a controlled helper, read/write tool split is explicit, and pilot readiness depends on owner, limits, approval and audit.

Still, for Markaziy Bank staff, several speaker-note phrases remain too autonomous or too absolute. The live slides are mostly safe; the notes need tightening so the presenter does not accidentally imply that agent mode can independently decide, disclose account data, send messages, or replace compliance judgment.

## Punch-list

- **Content accuracy:** Replace anthropomorphic wording like "agent fikrlaydi", "o'zi o'ylab topadi", "agent ish bajaradi", and "LLMning nutqi" with operational language: "model keyingi qadamni tanlaydi", "orchestrator ruxsatli tool chaqiradi", "natija foydalanuvchiga mos matnga aylantiriladi". ReAct is useful, but do not imply transparent human-like reasoning; in regulated systems the observable evidence is tool call, input/output, policy check and audit record.
- **Governance fit (Agent rejimi for banks):** Slide 5 and 17 are good, but slide 3, 7, 10 and speaker notes should put authentication, authorization, data class, channel safety, limit, approval and audit before "ish bajarish". "Mijoz balansi" examples are sensitive; every such example should say demo/sandbox and "faqat ruxsat tekshirilgandan keyin".
- **Atamalar:** Agent + Tool Use satisfy the deck rule. Intro is strong on slide 5, recap exists on slide 16, and slide 17 makes them actionable. Minor issue: notes reuse adjacent terms (`ReAct`, `function calling`, `schema`, `RAG`, `LLM`) quite heavily. Keep them as cross-references, not new definitions, to avoid glossary drift.
- **Uzbek quality:** The deck is understandable, but notes still contain rough or unnatural phrases: "Hisobimda nechta pul?", "qaerda", "engil", "bilolmaydi", "halok bo'ladi", "ulashlarini to'la", "ayttsa", "ikkalovchi qaror". Replace with standard Uzbek: "qancha mablag'", "qayerda", "yengil", "qamrab ololmaydi", "ishonchliligi pasayadi", "postlarga to'la", "aytsa", "ikki tomonlama qaror".
- **Vendor absolutism:** Slide 6 visual text is fixed well: vendor is chosen later based on data residency, audit, access control, price and integration. But speaker notes still say "Bu LLM (Gemini, GPT, Claude)". Remove named vendors from the spoken explanation or make them parenthetical and secondary.
- **Numeric claims:** "100+ savol", "8 soat", "30 daq -> 5 daq", "24/7 bajara oladi", "production-grade" sound like verified benchmarks. Use "pilotda o'lchanadi", "taxminiy misol", and "productionga yaqin dizayn" unless there is a cited internal measurement.
- **Risk framing:** "Calculator tool = read tool" is debatable: calculation is non-mutating, but not "read" in the same sense as DB/API/file reads. Call it "non-write tool" or "hisob-kitob tooli" to avoid category confusion.
- **Visual/screenshots:** Screenshots are generally clean. Slide 16 recap is present but visually low-priority; acceptable for closing, though increasing contrast would help retention. Slide 13 uses a ghost icon for hallucinated tool call; fine visually, but for an institutional bank audience a neutral warning/tool icon would feel less playful.

## Top 5 Uzbek rewrites

1. **Slide 3 title and hook**

   Replace:
   > "Hisobimda nechta pul?" — bot va agent bir xil emas.

   With:
   > "Hisobimda qancha mablag' bor?" — bot va agent bir xil ishlamaydi.

   Speaker line:
   > Agent javobni o'zi "taxmin qilmaydi"; avval foydalanuvchi ruxsatini tekshiradi, keyin faqat ruxsat berilgan `balance_check` read tool orqali demo ma'lumotni oladi.

2. **Agent behavior, without over-autonomy**

   Replace:
   > Agent o'zi o'ylab topadi.

   With:
   > Agent orkestratori vazifani tahlil qiladi va ruxsat berilgan tool ro'yxatidan keyingi qadamni tanlaydi. Qadam siyosatga mos kelmasa, jarayon to'xtaydi yoki insonga uzatiladi.

3. **Bank governance frame**

   Add early in slide 3 or 7 notes:
   > Bankda agent rejimi "avtonom qaror" degani emas. Har bir tool chaqiruvi oldidan uch savol tekshiriladi: foydalanuvchi kim, bu ma'lumotni ko'rishga huquqi bormi, natija audit log'da qoladimi?

4. **Vendor-neutral LLM explanation**

   Replace:
   > Bu LLM (Gemini, GPT, Claude).

   With:
   > Bu til modeli. Qaysi vendor ishlatilishi keyin tanlanadi: ma'lumot qayerda saqlanishi, audit izi, ruxsat nazorati, narx va bank tizimlariga ulanish talablari bo'yicha.

5. **Multi-agent caution, less absolute**

   Replace:
   > Tool 15+ bo'lsa — agent qaysi toolni qachon ishlatishni unutadi va xato ko'paya boshlaydi.

   With:
   > Tool soni juda ko'paysa, agentning qadam tanlashi murakkablashadi: noto'g'ri tool tanlash, ortiqcha chaqiruv va auditni tushuntirish qiyinlashadi. Shuning uchun birinchi pilot tor doirada boshlanadi.

Updated [codex_review.md](C:/projects/slides/decks/cb_decks/2_deck/codex_review.md) with the requested Markdown review.

Verdict: usable, but not ready as-is for Markaziy Bank staff. Score: `6/10`.

Main fixes called out:
- Reframe Slide 5 around CB workflows, not commercial bank execution.
- Put Uzbek term first: `Qo'llash holati (Use Case)`.
- Replace the Slide 7 red-zone example with regulator-relevant automated sanction/decision risk.
- Fix Slide 8’s misleading “50 samples to train model” claim.
- Strengthen Slide 10 with owner/approval/audit trail, not just “risk boundary”.

Also flagged the stale `notes.md`, the Slide 10 typo, and the need to standardize `SI` vs `AI`.
mi: Banklardan kelgan prudensial hisobotlarda keskin o'zgarishlarni aniqlash va inspektorga tekshiruv ro'yxatini tayyorlash.`
   - `Iste'molchi huquqlari: Murojaatlarni bank, hudud, mavzu va jiddiylik bo'yicha saralash; xodim faqat tasdiqlaydi va murakkab holatga kiradi.`
   - `Muvofiqlik / Huquq: Yangi normativ hujjat qaysi ichki tartib, yo'riqnoma yoki nazorat chek-listiga ta'sir qilishini ko'rsatish.`
   - `Ichki yordam: Xodim savollariga faqat tasdiqlangan ichki hujjatlar asosida javob qoralamasi tayyorlash.`

2. **Slide 6 — “Use Case” definition is too startup-ish; Uzbek first, English second.**
   Non-technical management should not be forced to think in English terms. Keep the term for course continuity, but lead with the Uzbek business meaning.

   **Rewrite:**
   - Current: `Use Case / Qo'llash Holati`
   - Better: `Qo'llash holati (Use Case)`
   - Current body: `Qaysi muammoni, qaysi bo'limda, qancha vaqtni tejab hal qilamiz?`
   - Better body: `Qaysi jarayonda, qaysi xodimga, qaysi o'lchanadigan natijani beradi?`
   - Better example: `Banklardan kelgan hisobotlarda anomal o'zgarishlarni 2 soat emas, 20 daqiqada dastlabki ro'yxatga chiqarish.`

3. **Slide 7 — “to'liq avtomatik kredit qarori” is the wrong red-zone example for this audience.**
   It is vivid, but it pulls the room toward commercial lending and away from CB governance. Use a regulator-relevant “never” example.

   **Rewrite red quadrant:**
   - Current: `To'liq avtomatik kredit qarori`
   - Better: `AI asosida avtomatik sanksiya / majburiy ko'rsatma chiqarish`
   - Add line: `AI faqat signal va dalil paketini tayyorlaydi; rasmiy qaror, ko'rsatma va imzo vakolatli xodimda qoladi.`

4. **Slide 8 — “50 ta namuna modelni o'rgatish uchun” is technically sloppy and risky.**
   For modern AI pilots, 50 examples often validate a workflow, prompt, checklist, and measurement method; it usually does not “train a model”. This matters because non-technical management may leave with the wrong procurement/data expectation.

   **Rewrite condition 02:**
   - Current: `Kamida 50 ta tarixiy namuna kerak. Bu raqamga yetmasangiz, modelni o'rgatib bo'lmaydi...`
   - Better: `Kamida 50 ta tarixiy holat kerak: natijani solishtirish, xatolarni ko'rish va xodim tasdig'i jarayonini tekshirish uchun. Bu hali model o'rgatish degani emas.`

5. **Slide 10 — canvas lacks an owner/approval field; “risk boundary” alone is not enough for muvofiqlik.**
   For CB operations and management, the question is not only “AI nima qilmaydi?”, but also “kim tekshiradi, kim tasdiqlaydi, audit izi qayerda qoladi?” Add this now, even if it compresses another field.

   **Rewrite the 5th canvas cell:**
   - Current: `Xavf chegarasi — Qaysi qaror AI'ga berilmaydi?`
   - Better: `Nazorat chegarasi — AI nima tayyorlaydi, kim tekshiradi, kim tasdiqlaydi, audit izi qayerda qoladi?`
   - Example answer: `AI anomal holatlar ro'yxatini va dalil paketini tayyorlaydi. Inspektor tekshiradi, bo'lim rahbari tasdiqlaydi, versiya va manbalar jurnalga yoziladi.`

## Other Must-Fix Notes

- **Slide 10 typo in `content.md`:** `Vag'a qilingan bo'lsa` is broken. Use `Mavhum yozilgan bo'lsa — bu qo'llash holati emas.`
- **`notes.md` is stale:** it still says 13 total in the timing table and old slide-5 examples like `Kredit · Muvofiqlik · Mijoz xizmati · HR`. Update it or delete it from handoff; it will mislead the presenter.
- **Terminology swap looks complete for `komplaens`, but “muvofiqlik” now needs sharper governance framing.** Replace vague safety language with concrete phrases: `vakolatli xodim`, `tasdiqlash`, `audit izi`, `manba ko'rsatkichi`, `nazorat chegarasi`.
- **Reduce “AI” where “SI” is used in the title.** Pick one public-facing convention. For this Uzbek deck, prefer `SI`; keep `AI` only where explaining borrowed terms.

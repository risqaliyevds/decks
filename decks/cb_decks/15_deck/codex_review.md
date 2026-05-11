# Verdict + Score 7/10

**Verdict:** Revise before delivery. The rendered deck has the right closing arc for a Central Bank certificate event: journey recap, glossary quiz, "what next", resources, thanks, final glossary, Q&A. The tone is warm and mostly ceremony-safe.

The main blocker is ceremony fit: `content.md` and `notes.md` promise 17 slides with a dedicated certificate mockup, but `index.html` renders only 16 slides and the `screenshots/` folder has only `slide-01.png` through `slide-16.png`. The certificate CSS exists, but there is no `.s-cert` section in the delivered HTML. For a deck whose title is "Sertifikat", that missing ceremony slide is a ship risk.

## Punch List

1. **Restore the certificate slide.**  
   Add the missing certificate section before `Rahmat`, or update all source docs if the ceremony is intentionally handled off-deck. Current `content.md` says slide 14 is `Sertifikat`, `notes.md` says 17 slides, but screenshots show slide 14 is `Rahmat` and the deck ends at `16 / 16`.

2. **Align slide count and navigation labels.**  
   `notes.md`, `content.md`, `qa-report.md`, and the JS `TITLES` array do not describe the same deck. Pick one final structure. Recommended: keep 17 slides and insert `Sertifikat`; then `Rahmat` becomes 15, `29 atama` becomes 16, `Q&A` becomes 17.

3. **Glossary completeness is mostly correct in HTML, but labels need official names.**  
   The rendered glossary includes all 29 requested atamalar: LLM, Promt, API, Use Case, Pilot Loyiha, Hallucination, Data Masking, Workflow, Task Decomposition, Few-shot, Chain-of-Thought, System Prompt, Template Prompt, Token, Context Window, Trigger, Webhook, Classification, Schema, Agent, Tool Use, RAG, Embedding, Pipeline, Idempotent, AI Adoption, Production-grade, MVP, Iteration.  
   However quiz cards shorten official terms: `CoT`, `System`, `Template`, `Context`. Use the full names on-card: `Chain-of-Thought`, `System Prompt`, `Template Prompt`, `Context Window`. Abbreviations can stay in the definition line.

4. **Fix stale Markdown glossary mapping.**  
   `content.md` and `notes.md` still contain the old `STT` / `Function Calling` mapping in several places. `CLAUDE.md` says those were removed on 2026-05-10 and replaced by `Classification` / `Schema`. HTML is mostly updated; source docs should match so future regeneration does not reintroduce drift.

5. **Quiz accuracy: keep the new modules 7-12 sequence.**  
   Rendered HTML is correct: slide 8 covers Token, Context Window, Trigger, Webhook, Classification, Schema; slide 9 covers Agent, Tool Use, RAG, Embedding, Pipeline, Idempotent. Preserve this. Also avoid saying RAG "yo'q qiladi" hallucination; safer: "kamaytiradi" or "tekshirishni osonlashtiradi".

6. **Add one regulator-grade guardrail.**  
   Slides 11-12 already say not to send customer data to external AI and not to deploy untested production systems. Add one line for Central Bank fit: `Ichki siyosat, ma'lumot tasnifi va ruxsat darajasi tasdiqlanmaguncha production yo'q.`

7. **Improve screenshot readability.**  
   Slides 13-16 look polished but low-contrast in screenshots, especially resources, final glossary, and Q&A contact text. The final glossary is intended for phone photos, so increase text opacity/contrast and card background opacity.

8. **Uzbek farewell tone: replace "yo'lda ko'rishguncha".**  
   It reads like a literal English calque. For a professional Uzbek closing, use `Yana ko'rishguncha`, `Kelgusida ko'rishguncha`, or `Aloqada bo'lamiz`.

9. **Certificate ceremony sequencing.**  
   Best flow: Q&A before certificate, then certificate, then short thanks/contact. If Q&A must stay last, make it softer: not "Savollar kutib turibdi" after the emotional close, but `Savollar bo'lsa, shu yerda davom etamiz.`

10. **Contact consistency.**  
   `content.md` lists `@riskaliev`; rendered slides use `@crea7iveai`. Decide which one participants should actually use. For ceremony and follow-up, one Telegram handle is cleaner.

## Top 5 Uzbek Rewrites

1. **Current:** `Sertifikat va yo'lda ko'rishguncha.`  
   **Rewrite:** `Sertifikat va yana ko'rishguncha.`

2. **Current:** `Yo'lda ko'rishguncha - Telegram guruhida, ofisda, keyingi seminarda.`  
   **Rewrite:** `Aloqada bo'lamiz - Telegram guruhida, ishda va keyingi uchrashuvlarda.`

3. **Current:** `AI o'ylab topgan ma'lumot. RAG bu xatoni yo'q qiladi.`  
   **Rewrite:** `AI o'ylab topgan javob. RAG bu xatoni kamaytiradi va tekshirishni osonlashtiradi.`

4. **Current:** `Savollar kutib turibdi.`  
   **Rewrite:** `Savollaringiz bo'lsa, shu yerda davom etamiz.`

5. **Current:** `Telefoningizga saqlab qo'ying - bu kursdan keyingi qisqa lug'atingiz.`  
   **Rewrite:** `Telefoningizga saqlab qo'ying: bu 2 kunlik kursning qisqa lug'ati.`

## Final Note

Once the certificate slide is restored and source docs are synchronized with the rendered HTML, this can move to **9/10**. The concept is strong; the delivery artifact just needs to match the ceremony promise.

# Verdict + Score 6/10

Deck 15 has the right closing shape: retrospective -> glossary quiz -> "what now" -> certificate -> farewell. It fits a certificate ceremony better than a technical lecture, and the governance guardrails on slides 11-12 are directionally appropriate for Central Bank staff.

The blocker is glossary drift. `CLAUDE.md` says the course glossary was updated on 2026-05-10: STT/Function Calling were removed, and Classification/Schema were added for the deck 9 classifier bot. This deck still follows the older voice-bot mapping in `content.md`, `notes.md`, `index.html`, and screenshots. Until that is fixed, the final quiz teaches the wrong course map.

## Punch List

1. **Fix glossary completeness to the current 29 atamalar across modules 1-14.**  
   Current deck claims "30+", "30 ta", and adds `Glossary` as a pseudo-term. The active mapping in `CLAUDE.md` lists 29 terms: LLM, Promt, API, Use Case, Pilot Loyiha, Hallucination, Data Masking, Workflow, Task Decomposition, Few-shot, Chain-of-Thought, System Prompt, Template Prompt, Token, Context Window, Trigger, Webhook, Classification, Schema, Agent, Tool Use, RAG, Embedding, Pipeline, Idempotent, AI Adoption, Production-grade, MVP, Iteration. Use "29 atama" or "asosiy atamalar", not "30+".

2. **Correct modules 7-12 quiz sequencing.**  
   Slide 8 should be modules 7-9: Token, Context Window, Trigger, Webhook, Classification, Schema.  
   Slide 9 should be modules 10-12: Agent, Tool Use, RAG, Embedding, Pipeline, Idempotent.  
   Remove STT and Function Calling from quiz, notes, final recap, module cards, and speaker notes. The user-facing quiz for modules 10-12 must point to Agent/RAG/Pipeline, not STT.

3. **Update retrospective and module cards to match the new course path.**  
   Replace "voice memo", "Voice bot", "RAG qurish", and "Embedding" as module 9 labels. Current source has module 9 as First AI workflow with Classification/Schema, module 11 as Agent design/RAG chatbot with RAG/Embedding. Suggested mapping:  
   09: `Oddiy AI workflow` -> `Classification`  
   10: `Agentlar` -> `Tool Use`  
   11: `RAG chatbot dizayni` -> `Embedding`  
   12: `Pipeline` -> `Idempotent`

4. **Make the final glossary screenshot-worthy.**  
   Screenshot slide 16 is too dim; the cards and text are barely readable. If this is meant for phone photos, increase card opacity, text contrast, and term size. Also remove abbreviations that hide official terms: `Decompose` should be `Task Decomposition`, `CoT` should be `Chain-of-Thought`, `Template` should be `Template Prompt`, `Context` should be `Context Window`, `Production` should be `Production-grade`, `Pilot` should be `Pilot Loyiha`.

5. **Governance fit is good but needs one Central Bank nuance.**  
   Slides 11-12 correctly say not to put customer data into external AI, not to deploy untested production agents, and to involve compliance/IT/security. Add one explicit line: "Ichki siyosat, ma'lumot tasnifi va ruxsat darajasi tasdiqlanmaguncha production yo'q." This makes the ending more regulator-appropriate.

6. **Certificate ceremony ending mostly works; reorder or soften Q&A.**  
   Slide 14 is a strong ceremony start, slide 15 is a warm thank-you, slide 17 is visually clean. But ending with "Savollar kutib turibdi" after certificate can dilute the ceremony. Better: put Q&A before certificate, or make slide 17 say "Sertifikat marosimiga o'tamiz" / "Yo'lda ko'rishguncha" and keep contact details below.

7. **Screenshot slide 14 needs minor layout cleanup.**  
   The certificate looks appropriate, but the seal/date area is crowded. Move the date left or make the seal smaller so the printed certificate mockup feels official, not decorative.

8. **Uzbek quality: strong intent, uneven surface.**  
   The tone is generally warm and bank-friendly, but there are several non-native or typo-like phrases: `eslayb`, `hech qisi`, `AI hisoblayd`, `asbob bermak`, `Boshlig'ingiz tezligini farqlatadi`, `hurmat-li`, `o'rtanadi`. These should be cleaned before ceremony use.

## Top 5 Uzbek Rewrites

1. **Current:** `30+ atama — birga eslayb chiqamiz.`  
   **Rewrite:** `29 ta asosiy atamani birga eslab chiqamiz.`

2. **Current:** `Eslamadingiz? Hech qisi yo'q — yakuniy slaydda hammasi yana bir marta.`  
   **Rewrite:** `Eslolmasangiz, muammo emas — yakuniy slaydda hammasini yana bir bor ko'ramiz.`

3. **Current:** `AI'ga asbob bermak — API, DB, hisoblash`  
   **Rewrite:** `AI'ga asbob ulash: API, ma'lumotlar bazasi yoki hisob-kitob vositasi.`

4. **Current:** `Aniq, qo'lga tushadigan rejim. Boshlig'ingiz tezligini farqlatadi.`  
   **Rewrite:** `Aniq, amalda bajariladigan reja. Tezlik bo'limingiz, rahbaringiz va muvofiqlik talablariga bog'liq.`

5. **Current:** `Telefoningizdan rasm oling. Bu — sizning kichik lug'atingiz.`  
   **Rewrite:** `Telefoningizga saqlab qo'ying: bu kursdan keyingi qisqa lug'atingiz.`

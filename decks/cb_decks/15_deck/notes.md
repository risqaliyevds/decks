# 15-deck — Taqdimot va yakuniy qism (final + sertifikat)

**Module:** 15-modul · Kun 2 · 17:15–17:45 (30 daqiqa) + sertifikat marosimi (~30 daq)
**Format:** Yakuniy taqdimot + sertifikat marosimi
**Audience:** Markaziy Bank xodimlari (kursni to'liq o'tgan ishtirokchilar)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Framework:** Custom HTML (single-file, `index.html`) — Style A locked tokens
**Slaydlar soni:** 16 ta · 4 ta faza (sertifikat marosimi off-deck — bosma sertifikat orqali)
**Atamalar:** **Glossary review** (barcha 29 atama 5 ta quiz slaydda) · **Q&A**
**To'liq kontent:** [`content.md`](./content.md)

---

## Asosiy g'oya

Bu — kursning oxirgi taqdimoti. Maqsad uch xil:

1. **Sayohatni eslatish** — 15 modul, 2 kun, 29 atama. Jamoa qanday yo'lni bosib o'tdi.
2. **Lug'atni mustahkamlash** — barcha 29 atamani 5 ta quiz slayd orqali jonli ravishda eslab chiqamiz. Ishtirokchi atama eshitganda yo'qolib qolmaydi.
3. **Hayajonli xayrlashuv** — sertifikat, davomi va resurslar. Ishtirokchi "men endi qila olaman" his qiladi.

Tonlama: yumshoq, hurmat-li, "siz harakat qildingiz, biz bu yerdamiz" tarzida.

---

## Outline (one bullet = one slide)

1. **Title** — "Sertifikat va yana ko'rishguncha" (Kun 2 chip)
2. **Agenda** — 4 faza (Sayohat · Lug'at quiz · Bugundan keyin · Sertifikat)
3. **Sayohat retrospective** — `.flow` 4-step: Day 1 AM → Day 1 PM → Day 2 AM → Day 2 PM
4. **15 modul ko'rinishida** — `.modules-grid` 5×3 (15 ta card, har biri modul nomi + bitta kalit so'z)
5. **Lug'at challenge intro** — `.s-brain` "Eslay olasizmi?" — birgalikda aytamiz qoidasi
6. **Lug'at quiz #1 (modullar 1–3)** — 7 atama: LLM · Promt · System Prompt · Use Case · Pilot Loyiha · Hallucination · Data Masking
7. **Lug'at quiz #2 (modullar 4–6)** — 5 atama: Workflow · Task Decomposition · Few-shot · CoT · Template Prompt _(deck 6 ikkinchi atama hozircha belgilanmagan — System Prompt 1-modulga ko'chgan)_
8. **Lug'at quiz #3 (modullar 7–9)** — Token · Context Window · Trigger · Webhook · Classification · Schema
9. **Lug'at quiz #4 (modullar 10–12)** — Agent · Tool Use · RAG · Embedding · Pipeline · Idempotent
10. **Lug'at quiz #5 (modullar 13–14)** — AI Adoption · Production-grade · MVP · Iteration
11. **Sizdan kutilgan natija** — `.cando` "Bugundan boshlay olasiz" / "Hali shoshilmaslik kerak"
12. **30 kun keyin** — `.road` 3-step (Hafta 1 · Hafta 2–3 · Hafta 4)
13. **Davomi va resurslar** — `.sec` 3-card (Promt kutubxonasi · Telegram yordam guruhi · Mohirdev kursi)
14. **Lug'at recap (yakuniy)** — barcha 29 atama bitta katta `.gloss-grid` da
15. **Auditoriyaga rahmat** — `.s-close` style yumshoq xayrlashuv + speaker kontakt
16. **Q&A va xayrlashuv** — `.s-qa` "Sayohat tugadi, savollaringiz bo'lsa shu yerda davom etamiz"

---

## Vaqt rejimi (~60 daq, sertifikat marosimi qo'shilgan)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Sayohat | 3–4 | ~5 daq |
| 02 · Lug'at quiz | 5–10 | ~12 daq |
| 03 · Bugundan keyin | 11–13 | ~7 daq |
| 04 · 29 atama + Rahmat + Q&A | 14–16 | ~30+ daq (off-deck sertifikat marosimi) |

---

## Atamalar mapping (kursning butun glossary'si — 29 ta)

| # | Modul | Atama 1 | Atama 2 |
|---|---|---|---|
| 1 | AI asoslari | LLM | Promt |
| 1 | (qo'shimcha) | System Prompt | — |
| 2 | Use case discovery | Use Case | Pilot Loyiha |
| 3 | Risks / compliance | Hallucination | Data Masking |
| 4 | Process structuring | Workflow | Task Decomposition |
| 5 | Prompt engineering | Few-shot | Chain-of-Thought (CoT) |
| 6 | Prompt library | Template Prompt | _(TBD — System Prompt 1-modulga ko'chgan)_ |
| 7 | AI platforms | Token | Context Window |
| 8 | No-code | Trigger | Webhook |
| 9 | First AI workflow | Classification | Schema |
| 10 | Agents intro | Agent | Tool Use |
| 11 | RAG chatbot design | RAG | Embedding |
| 12 | Complex pipelines | Pipeline | Idempotent design |
| 13 | Real cases | AI Adoption | Production-grade |
| 14 | Solution development | MVP | Iteration |

**Jami:** 28 ta atama (1-modul: LLM, Promt, System Prompt; 6-modul: Template Prompt (ikkinchisi belgilanmagan); qolgan har modul — 2 ta).

---

## Tonlama eslatmalari

- **Bu — texnika dars emas.** Bu — kurs nihoyasi. Slaydlar zich, ammo gapirish ohangi yumshoq.
- **"Siz" emas, "biz".** "Biz birga 2 kun yurib chiqdik" — emotsional bog'lanish.
- **Quiz slaydlarida** — atama ko'rsatildi, pauza, javob (jamoa bilan). Qo'rqitmaslik uchun yengil tonus, "qarsak chalishni" eshittirish.
- **Sertifikat slaydida** — qoldirib qo'yib ovozni baland qilmang. Bu marosim, nutq emas.
- **"Yo'lda ko'rishguncha"** — kursning rasmiy yopilishi emas, ishtirokchilar orasidagi munosabat boshlanishi.

---

## Tayyorgarlik checklist

- [ ] Sertifikat shabloni (PDF) chop etilgan, ishtirokchi ismi yozilgan
- [ ] Vazirlik va Markaz logotiplari `_shared/` papkasida tayyor
- [ ] Mikrofon, sertifikat marosimi uchun foto-zona
- [ ] Telegram yordam guruhi linki tayyor (slide 13)
- [ ] Promt kutubxonasi linki (Notion yoki Confluence) tayyor
- [ ] Mohirdev kursi promo-kod tayyor (agar bor bo'lsa)
- [ ] Speaker kontakt: murod@mohir.dev · @riskaliev

---

## Critical avoid-bug

- Slaydlarda 2 ta blokdan keyingi kontent uchun `.reveal r3` ishlatilgan (yoki reveal class yo'q). `.reveal r4` clipping bug'ini ushlamaslik uchun.
- Brand strip har slaydda. Agenda 2x2, atama quiz fragment-reveal, sertifikat slaydining kompozitsiyasi 100vh ichida.

---

## Series-wide bog'lanish

- **Avvalgi modul:** [`14_deck/`](../14_deck/) — Sun'iy intellekt yechimini ishlab chiqish
- **Keyingi modul:** — *(yo'q — bu kursning oxirgi moduli)*
- **Boshlangan:** [`1_deck/`](../1_deck/) — Bank sektori uchun SI asoslari

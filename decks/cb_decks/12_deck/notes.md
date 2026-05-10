# 12-deck — Murakkab sun'iy intellekt jarayonlari

**Module:** 12-modul · Kun 2 · 13:00–14:00 (60 daqiqa)
**Format:** Namoyish + tahlil (demo + analysis)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Framework:** Custom HTML (single-file, `index.html`) — Style A locked tokens
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Pipeline** (ko'p bosqichli LLM zanjiri), **Idempotent design** (qayta ishga tushirilsa ham xato qilmaydigan dizayn) — slayd 5 da kiritiladi, slayd 17 da recap
**Paired bot:** [`bots/01_classifier_bot/`](../bots/01_classifier_bot/) — 9-modulda qurilgan klassifikator botni production tahlil qilamiz
**To'liq kontent:** [`content.md`](./content.md)

---

## Outline (one bullet = one slide)

1. **Title** — "Murakkab AI jarayonlari" · Kun 2 chip
2. **Agenda** — 4 faza (Pipeline · Klassifikator tahlili · Debugging · Amaliyot)
3. **Hook** — Bitta promtli klassifikator vs 7-bosqichli pipeline (.compare-rich)
4. **Why pipeline** — Aniqroq · Tekshiruvchan · Idempotent (.benefits 3-card)
5. **YANGI: Lug'at** — **Pipeline** + **Idempotent design** (.dict.dict-2)
6. **Idempotency misol** — Idempotent emas vs Idempotent (.compare-rich)
7. **Klassifikator bot pipeline tahlili** — 7 bosqich oqim (.flow flow-6, brain step 02 + 04)
8. **4 turdagi xato** — har bosqichda nima sinishi mumkin (.benefits-4)
9. **Debug strategy 1** — Logging va observability (.template-box log misoli)
10. **Debug strategy 2** — Replay vs Idempotency (.compare)
11. **Cost va token optimizatsiya** — kichik model birinchi · sheet cache · fallback (.benefits 3-card)
12. **Pipeline branching** — shoshilinch (urgency=high) vs oddiy (.flow + if/else)
13. **Eng ko'p uchraydigan xato** — 4 ta afsona/haqiqat juftligi (.myth 4-row)
14. **Real bug-hunt mashqi** — log o'qib, qaysi bosqich xato qildi? (.s-brain + log)
15. **Debug checklist worksheet** — 6 ta savol 2x3 grid (.canvas-grid)
16. **Production tayyor pipeline belgilari** — Tayyor / Tayyor emas (.cando)
17. **Closing** — 3 xulosa + lug'at recap (Pipeline / Idempotent design)
18. **Q&A** — ochiq savol-javob, murod@mohir.dev

---

## Asosiy g'oya

9-modulda biz klassifikator botni o'z qo'limiz bilan qurdik (Telegram + Gemini + Sheets, 7 ta node). Endi 12-modulda — uni **production darajasiga ko'tarish** uchun nima kerakligini ko'rib chiqamiz. Bitta promt bilan emas, **7 ta aniq bosqich** bilan. Har bosqichda nimani kutamiz, nima sindi — log orqali ko'ramiz, qayta ishga tushirsak (`message_id` orqali) **mijozga 2-marta xat ketmaydi**.

Bu modul auditoriyaga 2 ta savolga aniq javob beradi:

1. **Nima uchun bitta promt yetmaydi?** — Pipeline'ning zaruriyati.
2. **Pipeline buzilsa nima qilamiz?** — Logging, replay, idempotency.

Pedagogik narrative: *"9-modulda siz qurdingiz. Endi savol — uni qanday qilib production'ga olib chiqamiz?"*

---

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Pipeline tushunchasi (Hook → Why → Lug'at → Idempotent misol) | 3–6 | ~13 daq |
| 02 · Klassifikator bot pipeline tahlili (Flow → 4 xato turi) | 7–8 | ~9 daq |
| 03 · Debugging (Logging → Replay → Cost → Branching → Mistakes) | 9–13 | ~18 daq |
| 04 · Amaliyot (Bug-hunt → Checklist → Tayyor belgilari → Closing → Q&A) | 14–18 | ~17 daq |
| **Jami** | **18** | **~60 daq** |

---

## Series-wide bog'lanish

- **Avvalgi modul:** [`11_deck/`](../11_deck/) — Agent design (RAG chatbot)
- **Keyingi modul:** [`13_deck/`](../13_deck/) — Bank amaliyotidagi real keyslar
- **Bog'liq:** [`bots/01_classifier_bot/`](../bots/01_classifier_bot/) — 9-modulda qurilgan, 12-modulda production tahlil
- **Atama eslatish:** Classification, Schema (9-modul), RAG (11-modul) qaytib chiqadi

## Atama recap qoidasi

Closing slayd (slayd 17) — `.recap` row bilan:

- **Pipeline** — *ko'p bosqichli AI ish zanjiri (Telegram → LLM → Sheets read → Pick → Append → Format → Send)*
- **Idempotent design** — *bir mijoz xabarini 2 marta yuborsa ham bitta ariza yoziladi*

Auditoriya bilan birga aytamiz — 30–60 sek.

## Tayyorgarlik (deck'dan tashqari)

- 9-modulda qurilgan klassifikator bot pipeline — yodda
- 14-slayd uchun "buzilgan" log namunasi — slaydda template-box ichida
- Slayd 12 ning branch'i — urgency=high vs low/medium yo'l ajratish mantig'i
- Auditoriya 9-modul atamalarini eslay olishi (Classification, Schema)

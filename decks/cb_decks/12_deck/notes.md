# 12-deck — Murakkab sun'iy intellekt jarayonlari

**Module:** 12-modul · Kun 2 · 13:00–14:00 (60 daqiqa)
**Format:** Namoyish + tahlil (demo + analysis)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Framework:** Custom HTML (single-file, `index.html`) — Style A locked tokens
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Pipeline** (ko'p bosqichli LLM zanjiri), **Idempotent design** (qayta ishga tushirilsa ham xato qilmaydigan dizayn) — slayd 5 da kiritiladi, slayd 17 da recap
**Paired bot:** [`bots/02_voice_memo/`](../bots/02_voice_memo/) — bu modulda biz uni tahlil qilamiz va debug qilamiz
**To'liq kontent:** [`content.md`](./content.md)

---

## Outline (one bullet = one slide)

1. **Title** — "Murakkab AI jarayonlari" · Kun 2 chip
2. **Agenda** — 4 faza (Pipeline · Atamalar · Debugging · Real misol tahlili)
3. **Hook** — Bitta promtli bot vs 5-bosqichli pipeline (.compare)
4. **Why pipeline** — Aniqroq · Tekshiruvchan · Idempotent (.benefits 3-card)
5. **YANGI: Lug'at** — **Pipeline** + **Idempotent design** (.dict.dict-2)
6. **Idempotency misol** — Idempotent emas vs Idempotent (.compare-rich style)
7. **Voice bot pipeline tahlili** — 6 bosqich oqim (.flow 6-step, brain step)
8. **4 turdagi xato** — har bosqichda nima sinishi mumkin (.benefits-4)
9. **Debug strategy 1** — Logging va observability (.template-box log misoli)
10. **Debug strategy 2** — Replay vs Idempotency (.compare)
11. **Cost va token optimizatsiya** — kichik model birinchi · cache · fallback (.benefits 3-card)
12. **Pipeline branching** — premium mijoz vs oddiy mijoz dallari (.flow 5-step + if/else)
13. **Eng ko'p uchraydigan xato** — 4 ta afsona/haqiqat juftligi (.myth 4-row)
14. **Real bug-hunt mashqi** — log o'qib, qaysi bosqich xato qildi? (.s-brain + log)
15. **Debug checklist worksheet** — 6 ta savol 2x3 grid (.canvas-grid)
16. **Production tayyor pipeline belgilari** — Tayyor / Tayyor emas (.cando)
17. **Closing** — 3 xulosa + lug'at recap (Pipeline / Idempotent design)
18. **Q&A** — ochiq savol-javob, murod@mohir.dev

---

## Asosiy g'oya

11-modulda biz voice memo bot dizaynini chizdik. Endi 12-modulda — uni **ish jarayoni sifatida ko'rib chiqamiz**. Bitta promt bilan emas, **6 ta aniq bosqich** bilan. Har bosqichda nimani kutamiz, nima sindi — log orqali ko'ramiz, qayta ishga tushirsak (`request_id` orqali) **mijozga 2-marta xat ketmaydi**.

Bu modul auditoriyaga 2 ta savolga aniq javob beradi:

1. **Nima uchun bitta promt yetmaydi?** — Pipeline'ning zaruriyati.
2. **Pipeline buzilsa nima qilamiz?** — Logging, replay, idempotency.

---

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Pipeline tushunchasi (Hook → Why → Lug'at → Idempotent misol) | 3–6 | ~13 daq |
| 02 · Voice bot pipeline tahlili (Flow → 4 xato turi) | 7–8 | ~9 daq |
| 03 · Debugging (Logging → Replay → Cost → Branching → Mistakes) | 9–13 | ~18 daq |
| 04 · Amaliyot (Bug-hunt → Checklist → Tayyor belgilari → Closing → Q&A) | 14–18 | ~17 daq |
| **Jami** | **18** | **~60 daq** |

---

## Series-wide bog'lanish

- **Avvalgi modul:** [`11_deck/`](../11_deck/) — Voice memo bot dizayni · STT, Function Calling
- **Keyingi modul:** [`13_deck/`](../13_deck/) — Bank amaliyotidagi real keyslar
- **Bog'liq:** [`bots/02_voice_memo/`](../bots/02_voice_memo/) — 11-modulda dizayn qilingan, 12-modulda tahlil
- **Atama eslatish:** RAG (9-modul) · STT, Function Calling (11-modul) qaytib chiqadi

## Atama recap qoidasi

Closing slayd (slayd 17) — `.recap` row bilan:

- **Pipeline** — *ko'p bosqichli AI ish zanjiri (audio → STT → ekstrakt → schema → CRM)*
- **Idempotent design** — *bir voice memo'ni 2 marta yuborsa ham bitta yozuv hosil bo'ladi*

Auditoriya bilan birga aytamiz — 30–60 sek.

## Tayyorgarlik (deck'dan tashqari)

- 11-modulda chizilgan voice bot pipeline — yodda
- 14-slayd uchun "buzilgan" log namunasi — slaydda template-box ichida
- Slayd 12 ning `.flow` da if/else dali — Gemini Flash vs Gemini Pro tanlashning aniq mantiqi
- Auditoriya 11-modul atamalarini eslay olishi (STT, Schema)

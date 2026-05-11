# 5-deck — Promt muhandisligi · professional daraja

**Module:** 5-modul · Kun 1 · 14:15–15:15 (60 daqiqa)
**Format:** Namoyish + mashq (demo + exercise)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`)
**Stack:** Gemini · ChatGPT · har qanday LLM (promt — universal vosita)
**Slaydlar soni:** 13 ta · 4 ta faza
**Atamalar (≥2/modul talab):** Few-shot Prompting, Chain-of-Thought (CoT) — slide 5 da, slide 12 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "Promt muhandisligi — professional daraja"
2. **Agenda** — 4 faza (Asoslar · Texnikalar · Bank misollari · Mashq)
3. **Hook · BAD vs GOOD** — bir xil vazifa, ikki xil promt, ikki xil natija. Modulning eng muhim slaydi
4. **Anatomy of a prompt** — 5 element (Rol · Kontekst · Vazifa · Format · Misollar)
5. **YANGI: Lug'at** — Few-shot Prompting + Chain-of-Thought
6. **Few-shot demo** — 0-shot → 1-shot → Few-shot (uch bosqich, har birida natija)
7. **Chain-of-Thought** — to'g'ridan-to'g'ri javob vs qadamma-qadam fikrlash
8. **Banking promt shablonlari** — Kredit memo · Mijoz javobi · KYC qisqa xulosa
9. **Live workshop** — `<pre>` promt-box, jamoa qadamma-qadam to'ldiradi
10. **Common mistakes** — 3 ta afsona vs aniq qoida
11. **Quality checklist** — Yaxshi promt vs Yomon promt belgilari (5 ta / 5 ta)
12. **Closing** — 3 xulosa + lug'at recap (Few-shot, CoT)
13. **Q&A** — savol-javob, murod@mohir.dev

## Asosiy g'oya

Promt — bu AI bilan ishlashning **kalit ko'nikma**. Modul oxirida har bir ishtirokchi 5 ta element shabloni (Rol · Kontekst · Vazifa · Format · Misollar) bo'yicha o'z bo'limi uchun sifatli promt yozib chiqadi. Few-shot va Chain-of-Thought — ikki professional texnika sifatida amalda ko'riladi.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Asoslar (Hook → Anatomy → Lug'at) | 3–5 | ~14 daq |
| 02 · Texnikalar (Few-shot → CoT) | 6–7 | ~12 daq |
| 03 · Bank misollari (3 shablon) | 8 | ~6 daq |
| 04 · Mashq (Workshop → Mistakes → Checklist → Closing → Q&A) | 9–13 | ~25 daq |

## Speaker cues — modulning ikki "shou" momenti

**Slide 3 — Hook (BAD vs GOOD):**
Bu slaydda ekrandagi matn jonli o'qiladi. "Mijozga javob yoz" — auditoriyaga so'rayman: "Sizningcha bot nima yozadi?" Keyin yomon javobni ko'rsatamiz. So'ng yaxshi promtni o'qiymiz, "endi qarang" — sifatli javobni ko'rsatamiz. **Bu slayd modulning o'qini belgilaydi.**

**Slide 9 — Live workshop:**
`<pre>` ichidagi promt-box bo'sh shabloni bilan boshlanadi. Auditoriya bilan birga to'ldiraman:
1. "Rol nima bo'ladi?" — javobni yozaman.
2. "Kontekst?" — yozaman.
3. "Vazifa? Format?" — yozaman.
Nihoyasida tugagan promtni o'qib, "ana endi tayyor" deyman. **10 daqiqalik ushbu mashq — modulning amaliy yakuni.**

## Atama tanlash izohi

- **Few-shot Prompting** — 5-modul markaziy texnikasi. AI'ga 2–3 misol berib, naqshni "ko'rsatib o'rgatish". Bankir tilida: "namuna bilan tushuntirish".
- **Chain-of-Thought (CoT)** — fikr zanjiri. AI'ni "qadamma-qadam o'yla" deb yo'naltirish — murakkab vazifalarda aniqlikni keskin oshiradi. Bankir tilida: "ovoz chiqarib hisoblash".

Ikkala atama 6 va 7-modullarda (Promt kutubxonasi, AI platformalari) qaytib chiqadi — bu yerda chuqur o'rgatamiz.

## Tayyorgarlik (deck'dan tashqari)

- Slide 3 BAD/GOOD matnlari yodda — promt va natija juftliklarini o'qib chiqishga tayyor
- Slide 9 uchun ekran yonida ChatGPT yoki Gemini ochilgan (real demo opsiyasi — agar zal ulansa)
- Marker + flipchart slide 9 uchun (raqamli alternativa: ekranda live yozish)
- Vazirlik logotiplari `_shared/` da turibdi
- QA: orchestrator screenshot.mjs + slide-reviewer ishlatadi

## Design lock-in

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk (1-modul bilan bir xil)
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa)
- **Yangi qo'shilgan minimal CSS:** `.benefits-5` (5-card grid, 2+3 layout) va `.prompt-box` (monospace, dark card, accent-2 placeholders) — `<style>` blokining oxiriga
- **Series consistency:** 1, 2, 3, 4-modul bilan bir xil tokenlar, hech bir locked tokenga tegmagan

## Series-wide bog'lanish

- **Avvalgi modul:** [`4_deck/`](../4_deck/) — Jarayonlarni strukturalashtirish (Workflow + Task Decomposition)
- **Keyingi modul:** [`6_deck/`](../6_deck/) — Bank uchun tayyor promt kutubxonasi (System Prompt + Template Prompt)
- **Few-shot va CoT qaytib chiqadigan joylar:** 6-modul (kutubxona shablonlari), 7-modul (platformalar), 11-modul (agent dizayni)

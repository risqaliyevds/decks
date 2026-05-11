# 6-deck — Bank uchun tayyor promt kutubxonasi

**Module:** 6-modul · Kun 1 · 16:30–17:30 (60 daqiqa)
**Format:** Tayyor kutubxona walkthrough — namoyish + amaliy moslash
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`) — Style A · Bold Signal
**Stack:** Gemini + n8n + tashkiliy promt kutubxonasi (Notion/Confluence asosli)
**Slaydlar soni:** 14 ta · 4 ta faza
**Atamalar (≥2/modul talab):** **System Prompt**, **Template Prompt** — slide 5 da kiritiladi, slide 13 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "Bank uchun tayyor promt kutubxonasi · noldan yozma — kutubxonadan ol"
2. **Agenda** — 4 faza (Kutubxona · Kategoriyalar · Sozlash · Sifat tekshiruvi)
3. **Hook** — Live demo: kredit memo shabloni 1 daqiqada to'ldiriladi
4. **Compare** — System Prompt vs Template Prompt (rolda farq)
5. **Lug'at** — **System Prompt** + **Template Prompt** (`.dict` 2 ta keng kart)
6. **Kutubxona** — 5 ta yo'nalish (Kredit · Muvofiqlik · Mijoz xizmati · HR · Marketing)
7. **Shablon #KR-04** — Kredit memo (full template + placeholderlar)
8. **Shablon #MX-07** — Mijoz xizmati javobi (full template)
9. **Shablon #KP-02** — Muvofiqlik tekshiruvi (full template)
10. **Sozlash** — 4 qadam (Rolni · Misol · Format · Sina)
11. **Live workshop** — birgalikda Kredit memoni "Tijorat bankiga normativni tushuntirish"ga qayta yozamiz
12. **Sifat tekshiruvi** — `.cando` 5+5 belgi (yuborsa bo'ladi · qayta yoz)
13. **Closing** — 3 xulosa + lug'at recap (System Prompt / Template Prompt)
14. **Q&A** — ochiq savol-javob, murod@mohir.dev

## Asosiy g'oya

Modul oxirida har bir ishtirokchi **ertangi smendayoq ishlatadigan 3 ta tayyor shablon**ni nusxa qilib oladi va o'z bo'limiga moslash usulini biladi. Auditoriya "darslik o'qigan" emas, **kutubxonaga aktsiya olgan** holatda ketadi.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Kutubxona (Hook → Compare → Lug'at) | 3–5 | ~12 daq |
| 02 · Kategoriyalar (Library overview + 3 ta shablon) | 6–9 | ~22 daq |
| 03 · Sozlash (4-qadam + Live workshop) | 10–11 | ~16 daq |
| 04 · Sifat tekshiruvi + Closing + Q&A | 12–14 | ~10 daq |

## Speaker cues — slayd bo'yicha

- **3 (Hook):** Bir mijoz holatini aytib, "agar shu memoni qo'lda yozsangiz — 35 daqiqa, shablon orqali — 90 soniya" deb timer ko'rsating. Demo botda jonli sinash.
- **4 (Compare):** "System Prompt — bir marta yoziladi, har bot uchun bir xil. Template Prompt — har kuni nusxalanadi." Bu farqni 1-modul "API = ko'prik" analogiyasidagi kabi qattiq mahkamlang.
- **5 (Lug'at):** Ikki atamani sodda izoh + 1 ta misol bilan kiriting. 13-slaydda recap qilamiz — auditoriyaga ogohlantiring.
- **6 (Kutubxona):** Har bir kategoriya ostida shablon soni — "kerak bo'lganda manzilni eslab qoling" deb oching. Featured 2 ta (Kredit + Muvofiqlik) — eng keng ishlatiladigan.
- **7–9 (3 ta shablon):** Har shablonga ~5 daqiqa. Birinchi marta o'qib bering — placeholderlar yoritilganini ko'rsating. Foydalanish statistikasini eslang ("bu oyda X marta") — auditoriya bu shablonlar haqiqatda ishlatilayotganini sezadi.
- **10 (Sozlash):** 4 qadamni qo'l ko'rsatib o'ting — har biri qisqa. "Bu 80/20 qoidasi" — tayyor shablon 80%, sizga moslash 20%.
- **11 (Workshop):** **Eng muhim slayd.** Kredit memoni "Tijorat bankiga normativni tushuntirish"ga aylantiramiz. Auditoriyadan 4-5 ta maydonni so'rang, jonli yozib boring. Maydonlar `[NORMATIV_RAQAMI]`, `[KUCHGA_KIRGAN_SANA]`, `[O'ZGARGAN_BANDLAR]`, `[AMALIYOTGA_TA'SIRI]`. Format — 4 qismli aniq struktura: Eski tartib → Yangi tartib → Qachondan → Kim bilan bog'lansa. Vaqt: ~8 daqiqa.
- **12 (Sifat tekshiruvi):** "AI yozdi — siz imzolaysiz." Mas'uliyat baribir bankirda. 5+5 belgini auditoriya bilan birga o'qing.
- **13 (Closing):** 3 xulosa qisqa, recap interaktiv: "Eslay olasizmi: System Prompt nima edi?" — jamoa bilan birga ayting.

## Atama tanlash izohi

- **System Prompt** — bot xarakterini bir marta yozish atamasi. 5-modul (promt muhandisligi)dan farqi: bu yerda "kutubxona" perspektivasi — har bot uchun bir xil System, har vazifa uchun boshqa Template.
- **Template Prompt** — ko'p marta nusxalanadigan blanka. Few-shot/CoT (5-modul) bilan farqi: bu narsa **strukturali, [placeholder]'lar bilan**, "sozlash + sinash" workflowiga yo'naltirilgan.

Kelgusi modullarda qaytib chiqadi: 7-modul (ChatGPT/Claude — System Prompt qayerda yoziladi), 11-modul (Function Calling — Template'ning "schema" qarindoshi), 14-modul (MVP — kutubxonadan boshlab o'z shablonlaringizni qo'shish).

## Design lock-in

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa)
- **Yangi pattern (faqat shu deck):**
  - `.lib-grid` — 5-card 2+3 layout (6-col grid orqali, 1+1+empty / 1+1+1)
  - `.template-box` — monospace dark card, `--ink` fon, `--accent-2` placeholder yoritmasi
  - `.dict.dict-2` — 2 ta keng kart variant
  - `.road.road-4` — 4-step variant
- Locked tokens (`:root` block) — o'zgartirilmagan.

## Tayyorgarlik (deck'dan tashqari)

- [ ] Demo bot ishlayapti: `n8n + Gemini + Kredit memo shabloni` — Hook slaydidagi misolni jonli ko'rsatish uchun
- [ ] QR kod slide 3 ga PNG sifatida joylashtirilgan (placeholder pattern o'rniga) — kutubxonaga link / Notion sahifa
- [ ] Promt kutubxonasi sahifa tayyor (Notion / Confluence / pdf) — workshopda link tarqatish uchun
- [ ] Workshop uchun ekran ulashish: matn muharriri yoki ekrandagi `<pre>` element bilan jonli yozish
- [ ] Backup: agar internet sekin bo'lsa, 3 ta shablon mahalliy fayl sifatida tayyor
- [ ] 7-9 slaydlardagi statistik raqamlar yodda ("312 marta", "1240 marta", "198 marta") — agar so'rashsa
- [ ] Vazirlik logotiplari `_shared/` da turibdi
- [ ] QA: orchestrator screenshot.mjs + slide-reviewer ishlatadi (deck mualifi yugurtirmaydi)

## Series-wide bog'lanish

- **Avvalgi modul:** [`5_deck/`](../5_deck/) — Promt muhandisligi (Few-shot, CoT) — bu yerda **kutubxona** perspektivasiga o'tamiz
- **Keyingi modul:** [`7_deck/`](../7_deck/) — SI platformalar (ChatGPT, Claude) — System Prompt qayerda yoziladi
- **Workshop davom etmasi:** [`14_deck/`](../14_deck/) — MVP — o'z bo'limingiz uchun kutubxonani kengaytirish

# 8-deck — No-code avtomatlashtirish (Zapier, n8n, Make)

**Module:** 8-modul · Kun 1 · 17:15–18:15 — Day 1 closing slot (60 daqiqa)
**Format:** Workflow building demos + audience exercise
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Framework:** Custom HTML (single-file, `index.html`)
**Stack koryazasi:** Telegram + n8n (self-hosted) + Gemini + Google Sheets
**Slaydlar soni:** 19 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Trigger** · **Webhook** — slide 5 da kiritiladi, slide 17 da recap
**To'liq kontent:** [`content.md`](./content.md)

> Asosiy g'oya: "Workflow yig'ish" — bo'lim xodimining yangi ko'nikmasi. IT navbatini kutmaymiz; o'zimiz yig'amiz, IT auditdan o'tkazadi. Modul oxirida har ishtirokchi 5-nodeli mini-workflow'ni o'z ko'zi bilan ekranda quriganini ko'radi.

---

## Outline (one bullet = one slide)

1. **Title** — "No-code avtomatlashtirish" (Kun 1 · 17:15 — 18:15 chip)
2. **Agenda** — 4 faza (Nima uchun no-code · Platformalar · Bank misollari · Mini-build & mashq)
3. **Hook** — Programmer 2 hafta vs Bo'lim xodimi 30 daqiqa (`.compare`)
4. **No-code falsafasi** — 3-card benefits (Tezroq · IT yukini kamaytiradi · Tushunish oson)
5. **YANGI: Atama lug'ati** — Trigger + Webhook (`.dict.dict-2`)
6. **3 ta platforma taqqoslash** — Zapier · Make · n8n (`.sec` 3-card, n8n featured)
7. **Nima uchun n8n** — Self-hosted · Open-source · 500+ ulanish (`.benefits` 3-card)
8. **Workflow anatomiyasi** — 5 qadam: Trigger → Filtr → AI → Saqlash → Bildirish (`.flow`)
9. **5 turdagi Trigger** — Schedule · Webhook · Email · Telegram · Form (`.benefits-5`)
10. **Webhook chuqurroq** — Tashqi xizmat vs Ichki tizim, URL misollari (`.compare-rich`)
11. **Bank misoli #1** — Spravka avtomatlashtirish, Telegram trigger, 6-step (`.flow.flow-6`)
12. **Bank misoli #2** — Email shikoyat toifalash, Email trigger + AI, 5-step (`.flow`)
13. **Bank misoli #3** — Muvofiqlik hisobot har juma, Schedule trigger, 5-step (`.flow`)
14. **Live mini-build** — 5-nodeli workflow ekranda quriladi (Telegram→Set→Gemini→Sheets→Reply) (`.s-brain` + `.wf-build`)
15. **3 ta katta xato** — Loop · Crash silently · AI o'zi qaror qilsin (`.myth.myth-tight`)
16. **Xavfsizlik** — API key · Audit log · Rolega kirish (`.sec` 3-card)
17. **Closing** — 3 xulosa + lug'at recap (Trigger · Webhook)
18. **Q&A** — murod@mohir.dev

---

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt | Mazmun |
|---|---|---|---|
| Title + Agenda | 1–2 | ~3 daq | Kursning so'nggi modul Day 1 da · ish ohirida zalni o'ziga jalb |
| 01 · Nima uchun no-code | 3–5 | ~14 daq | Hook, falsafa, atama lug'ati |
| 02 · Platformalar | 6–8 | ~13 daq | Zapier/Make/n8n farqi · n8n tanlovi · workflow 5 qadam |
| 03 · Bank misollari | 9–13 | ~17 daq | 5 trigger + Webhook + 3 ta real bank workflow |
| 04 · Mini-build · mashq | 14–18 | ~13 daq | Live build · xato · xavfsizlik · recap · Q&A |

---

## Atamalar (8-modul)

| Atama | Bankir tilida izoh | Slide kiritish | Slide recap |
|---|---|---|---|
| **Trigger** | "Workflow'ni boshlatadigan signal" — kim, qachon, qanday hodisa kelsa bot uyg'onadi | 5 (`.dict-card`) | 17 (`.recap`) |
| **Webhook** | "Boshqa dasturdan xabar olish uchun maxsus URL-eshik" | 5 (`.dict-card`) | 17 (`.recap`) |

Recap slaydda har ikkala atama auditoriya bilan birga aytiladi (~30 sek):
- "Trigger nima edi?" — *jamoa: workflow'ni boshlatuvchi hodisa*
- "Webhook nima edi?" — *jamoa: boshqa dasturdan xabar olish nuqtasi (URL)*

---

## Design lock-in (locked tokens — series-wide)

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (`#020A24` / `#06173B`) + accent blue (`#2563eb` / `#60a5fa`)
- **Motif:** subtle grid background, blue-gradient highlights, blur-on-transition
- **Hujjat:** brand-strip (har slaydda) · `Kun 1` chip (slide 1)
- **Yangi qo'shilgan minimal CSS:** `.dict.dict-2`, `.cando`, `.benefits-5`, `.compare-rich`, `.wf-build`, `.s-close .recap`, `.flow.flow-6`, `.myth.myth-tight` — `<style>` blokining oxirida (`/* === 8-DECK ADDITIONS === */`). Locked tokens (`:root`) tegilmagan.
- **Series consistency:** 1–7-modul bilan bir xil tokenlar.

---

## Cross-module references

- 3-modul "Yopiq kontur · Data Masking" — n8n self-hosted bog'liq (slide 7 va 16)
- 4-modul "Workflow zanjiri · hand-off" — workflow anatomiyasi (slide 8) va xato slayd (15)
- 5–6-modul "Promt · Template" — AI node ichidagi promt (slide 8 va 14)
- 9-modul "RAG · n8n bilan qurish" — bugungi n8n ustida ertaga RAG quriladi (slide 17)
- 12-modul "Idempotent design · Pipeline" — slide 15 da forward-reference

---

## Tayyorgarlik (deck'dan tashqari)

- **Slide 14 live mini-build** uchun n8n self-hosted instance ishlayotgan, Telegram bot tayyor, Gemini API kalit credentials'da turibdi
- Telegram bot username — auditoriya skanerlash uchun ekranda ko'rsatiladi
- Google Sheets shabloni 2 ustun (savol · javob) bilan tayyor
- Mini-buildni 8 daq ichida quriladi · ortiqcha 2 daq — auditoriyadan kelgan savol botga yuboriladi
- Vazirlik logotiplari `_shared/` da turibdi (logo-ministry.png · logo-digital-ed.png)
- QA: orchestrator bajaradi (`screenshot.mjs` mustaqil ishga tushirilmaydi)

---

## Self-check (build complete)

- [x] Slaydlar soni 18 — target oraliqda (16–20)
- [x] Har slayd 100vh ichida sig'adi, hammasi `clamp()`
- [x] Closing slayd `.recap` row bilan, ikkala atama `<strong>...</strong> <span class="ans">...</span>` formatida
- [x] `TITLES` arr uzunligi = 18 = `<section class="slide">` soni
- [x] Brand-strip ikkala logo bilan har slaydda
- [x] Atama dictionary `.dict.dict-2` bilan (slide 5) — 2 ta atama
- [x] `.s-brain` mashq (slide 14)
- [x] `.flow` 3 marta — har biri turli trigger turi (Telegram · Email · Schedule)
- [x] Title chipida `Kun 1 · 17:15 — 18:15`
- [x] No accent line under titles
- [x] No `r4` reveal class — eng uzog'i `r3` (screenshot bug oldi)
- [x] Locked CSS tokens tegilmagan — qo'shilganlari `<style>` oxirida

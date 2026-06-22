# 14-deck — Sun'iy intellekt yechimini ishlab chiqish

**Module:** 14-modul · Kun 2 · 15:00 — 16:30 (60 daqiqa room time, biroz uzaytirilgan slot)
**Format:** Guruhli loyiha (group project)
**Audience:** Markaziy Bank xodimlari (non-technical) · 5 stol × 3–4 kishi
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html`) — Style A (Bold Signal)
**Stack:** Gemini + n8n + Telegram + Google Sheets/Drive (paired bot: `bots/03_complex_agent/`)
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talab):** **MVP**, **Iteration** — slide 5 da kiritiladi · slide 18 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Asosiy g'oya

Bu — seminarning **eng katta amaliyoti**. 13 modul davomida olgan bilim shu yerga keladi: har bir stol o'z guruhi uchun bitta murakkab AI agentini birga qurib chiqadi (`bots/03_complex_agent/` shablonidan kelib chiqib). Mukammal yechimni 6 oyga qoldirmaymiz — **4 hafta MVP** bilan boshlaymiz, real foydalanuvchida sinab ko'ramiz, keyin iteratsiya qilamiz. Slide 11 dan boshlab — speaker-tomondan **vizual scaffold**: stol bitta-bitta vazifa ustida ishlayotganda, ekrandagi slayd qaysi stolda nima borishini eslatib turadi.

## Outline (one bullet = one slide)

1. **Title** — "SI yechimini ishlab chiqamiz." (Kun 2 chip)
2. **Agenda** — 4 faza (Muammo · Reja · Yig'ish · Demo)
3. **Hook** — `.compare`: "6 oyda mukammal" vs "4 haftada MVP" — qaysi loyiha omon qoldi?
4. **MVP falsafasi** — `.benefits` 3-card (Tor doiradagi muammo / Eng kichik ishlaydigan yechim / Real foydalanuvchi sinashi)
5. **YANGI: Lug'at** — MVP + Iteration (`.dict.dict-2`)
6. **MVP misoli #1: RAG bot** — `.flow` 3-step ramp (v1: FAQ → v2: + hujjat → v3: agent)
7. **MVP misoli #2: Classifier bot** — `.flow` 3-step ramp (v1: n8n workflow · 13 nodes → v2: + chat_id/message_id dedup → v3: + multi-turn memory + per-bank categories + urgency routing + operator webhook)
8. **Iteration sikli** — `.flow` 4-step (Build → Test → Measure → Learn) — Plan/Do/Check/Act bankir uslubida
9. **Loyiha brief shabloni** — `.template-box` (Muammo / MVP doirasi / Foydalanuvchi / Muvaffaqiyat mezoni / Vaqt)
10. **Bo'lim ichidagi loyiha turlari** — `.benefits-4` 4-grid (Hujjat · Mijoz xizmati · Muvofiqlik · HR)
11. **Bugungi guruhli loyiha** — `bots/03_complex_agent/` taqdim, `.flow` 5-step (Telegram → Agent → Memory → Sheets → Bankir)
12. **Stol 1 vazifasi** — Agent dizayni (system prompt + tool list)
13. **Stol 2 vazifasi** — Schema dizayni (Sheet ustunlari)
14. **Stol 3 vazifasi** — Bilim bazasi (PDF + chunking)
15. **Stol 4 vazifasi** — Suhbat oqimi (3 senariy)
16. **Stol 5 vazifasi** — Test mashqlari (5 ta savol)
17. **Mashq formati** — `.s-brain` + `.canvas-grid` (2×2 worksheet: Muammo / Foydalanuvchi / MVP doirasi / Muvaffaqiyat)
18. **Closing + recap** — 3 xulosa + lug'at recap (MVP / Iteration). Q&A guruh taqdimotiga qo'shilgan.

## Vaqt rejimi (60 daq room + 30 daq guruh ishi taqdim etish)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| 01 · Muammo (kirish + MVP fikri) | 1–5 | ~12 daq |
| 02 · Reja (misollar + iteratsiya + brief shabloni + turlar) | 6–10 | ~18 daq |
| 03 · Yig'ish (loyiha intro + 5 stol vazifalari) | 11–16 | ~15 daq |
| 04 · Demo va mashq (canvas + closing + guruh taqdimotlari) | 17–18 | ~15 daq qatorda · keyin 30 daq stol ichi ishi · 30 daq taqdim |

## Atama tanlash sababi

- **MVP (Minimum Mahsulot)** — bu modul bo'yicha eng dolzarb tushuncha. Bankda "AI loyihasi 6 oyda" yondashuvini "4 haftada ishlaydigan birinchi versiya" yondashuviga o'zgartiramiz. Kelajakdagi Pilot Loyiha (2-modul atama) bilan bog'lanadi: pilot **doira** + MVP **dizayn falsafasi**.
- **Iteration (takrorlash)** — Build/Test/Measure/Learn sikli. Bu oddiy loyiha boshqaruvi emas — AI loyihasida har Iteration **prompt**, **schema**, **knowledge base** ni qayta sozlashni anglatadi. Bankirlar uchun yangi mental model.

## Speaker prep checklist (deck'dan tashqari)

- [ ] `bots/03_complex_agent/` README va `prompts/system-prompt.md` qayta ko'rib chiqilgan
- [ ] 5 ta stolga 5 ta yozma topshiriq cheat-sheet tarqatilgan (har biri slide 12–16 ning A4 nashri)
- [ ] Flipchart + markerlar har stolda
- [ ] A4 worksheet — slide 17 dagi `.canvas-grid` 4 katakli versiya
- [ ] Kredit / Depozit / HR / Muvofiqlik / Shikoyat — 5 ta stsenariy ro'yxati ekranda tayyor
- [ ] n8n laptop demo — instructor demo build (1 ta stol uchun)
- [ ] Vazirlik logotiplari `_shared/` da turibdi
- [ ] Day 2 chip: `Kun 2 · 15:00 — 16:30` (slot biroz uzaytirilgan, guruh demolari uchun)

## Design lock-in

- **Style:** Bold Signal (Style A) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa)
- **Motif:** subtle grid background, blue-gradient `.hl` highlights, blur-on-transition
- **Slide 11–16 — speaker scaffold:** har slayd guruhga A4 cheat-sheet bilan bir xil mazmun, lekin proyeksiyada katta sarlavha + 3 kalit savol. Speaker ekranga ishora qilib stolga vazifa beradi.
- **Slidet `.reveal r3` ishlatadi** — `.r4` ekrandan tushib qolish bug'idan saqlanish uchun.

## Hard rules

- Uzbek (Latin alfaviti), bankir-do'st, mahalliy misollar
- Har slaydda visual element (icon, .flow, .compare, .template-box, .canvas-grid, .benefits-4)
- 100vh fit, barcha o'lchov `clamp()` da
- Brand strip har slaydda — `../_shared/logo-ministry.png` va `../_shared/logo-digital-ed.png`
- Day 2 chip title slaydda
- Sarlavha ostida accent line yo'q (faqat .hl span ichida h2)

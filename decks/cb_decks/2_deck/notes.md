# 2-deck — Bank jarayonlarida SI qo'llash imkoniyatlarini aniqlash

**Module:** 2-modul · Kun 1 · 10:30–11:30 (60 daqiqa)
**Format:** Guruhli tahlil (workshop-style)
**Audience:** Markaziy Bank xodimlari (non-technical · operatsion · muvofiqlik · IT-coordination)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Framework:** Custom HTML (single-file, `index.html` — Style A "Bold Signal" series)
**Slaydlar soni:** 12 ta · 4 ta faza
**Atamalar (≥2/modul talab):** **Use Case** (qo'llash holati) · **Pilot Loyiha** — slide 6 da kiritildi, slide 12 da recap
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "Bank jarayonlarida SI qo'llash imkoniyatlari"
2. **Agenda** — 4 faza (Tushunish · Bo'limlar · Saralash · Amaliyot)
3. **Hook** — "Sizning bo'limingizda AI qayerga to'g'ri kelishi mumkin?" 3 ta savol + fragment-reveal javoblar
4. **Use Case taksonomiyasi** — 4 bucket (Hujjat · Mijoz xizmati · Avtomatlashtirish · Qaror qo'llab-quvvatlash)
5. **Department deep-dive** — Kredit · Muvofiqlik · Mijoz xizmati · HR (har biriga 1 ta aniq misol)
6. **YANGI: Lug'at** — Use Case + Pilot Loyiha (`.dict` 2 keng kartochka)
7. **YANGI motif: Saralash matritsasi** — Foyda × Murakkablik 2×2 quadrant, 4 ta misol
8. **Yaxshi pilot loyiha mezonlari** — `.road` 3 qadam (Tor doira · O'lchanadigan natija · 4–6 hafta)
9. **Anti-patterns** — `.myth` 2 qator (afsona/haqiqat)
10. **Group exercise** — `.s-brain` Use Case Canvas: Muammo · Vaqt · Ma'lumot · Foyda
11. **Closing** — 3 xulosa + lug'at recap (Use Case / Pilot Loyiha)
12. **Q&A** — ochiq savol-javob, murod@mohir.dev

> Eslatma: brief 12 slayd taklif qilgan, deck shu raqamga rioya qiladi — Title + Agenda + 8 ta tushunish/saralash slaydi + Brainstorm + Closing + Q&A.

## Asosiy g'oya

1-modulda biz "AI nima va qanday ishlaydi"ni o'tdik. Bu modul **AI'ni qayerga qo'yish kerakligi** haqida. Auditoriya darsdan o'z bo'limidan kamida bitta sifatli **Use Case** va uni qanday **Pilot Loyiha** sifatida ishga tushirishni bilib chiqishi kerak. Kam saviya, lekin amaliy.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Tushunish (Hook → Taksonomiya) | 3–4 | ~10 daq |
| 02 · Bo'limlar (Department deep-dive → Lug'at) | 5–6 | ~12 daq |
| 03 · Saralash (Matritsa → Mezonlar → Anti-patterns) | 7–9 | ~15 daq |
| 04 · Amaliyot (Group exercise → Closing → Q&A) | 10–12 + 13 | ~20 daq |
| **Jami** | **13** | **~60 daq** |

## Atama tanlash mantig'i

- **Use Case** — bu modulning markaziy konsepti. Auditoriya bu so'zni hozirdan boshlab har modulda eshitadi (3, 4, 9, 13). Bankir tilida: "AI'ning aniq vazifasi — qaysi muammoni hal qiladi, qaysi bo'limda, qancha tejaydi".
- **Pilot Loyiha** — Use Case'ni qog'ozdan olib chiqishning birinchi qadami. 4–6 hafta, tor doira, o'lchanadigan natija. Bu atama 13- va 14-modullarda real loyiha qurishda qaytib chiqadi.

Ikkalasi ham 6-slayddagi `.dict` da kiritiladi, 11-slayddagi `.recap` qatorida jamoa bilan birga aytiladi.

## Vizual qarorlar

- **YANGI motif: 2×2 quadrant matritsa** — slide 7 (Saralash). CSS `<style>` blokining oxirida (`.matrix`, `.matrix-axis-x`, `.matrix-axis-y`, `.matrix-dot`). Locked tokenlar (`:root`) tegilmaydi.
- **Department deep-dive** (slide 5) — 4 ta kartochka, `.sec` patterni 4-grid sifatida moslashtirildi (custom CSS oxirida `.sec-4` modifier).
- **Use Case taksonomiyasi** (slide 4) — `.benefits` 4 ta kartochkaga kengaytirildi (`.benefits-4` modifier).
- **Brainstorm canvas** (slide 10) — `.q` blok ichida 2×2 worksheet preview (`.canvas-grid`).

## Interaktivlik (loyiha qoidasi: kamida 1 fragment + 1 brainstorm)

- **Fragment reveal:** slide 3 (Hook) — 3 ta savol, har biri ostida fragment sifatida tipik javob. Slide 4 (Taksonomiya) — har bucket fragment. Slide 5 (Department) — har bo'lim fragment. Slide 7 (Matritsa) — 4 ta nuqta birin-ketin paydo bo'ladi. Slide 9 (Myth) — afsona/haqiqat juftligi.
- **Brainstorm:** slide 10 (Group exercise) — Use Case Canvas. Har stol 1 ta Use Case oladi va 4 ta katakni to'ldiradi.
- **Hover lift:** barcha kartochka tipidagi elementlarda avtomatik (1-deckdan ko'chirilgan CSS).

## Speaker rejimi

- Slide 5 va 10 — speaker stollar orasida yuradi.
- Slide 7 (matritsa) — eng vizual moment. 4 ta misolni proyektorda ko'rsatib, qaysi kvadrantda bo'lishini auditoriyadan so'rayman ("Bu sizningcha qaysi tomonda?").
- Slide 10 — 8–10 daqiqa ish vaqti, oxirida 1–2 ta stol o'z canvas'ini auditoriyaga aytadi.

## Design lock-in

- **Style:** Bold Signal (Style A) — kursning 15 deck'i bo'yicha bir xil
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa) — locked
- **Type:** Archivo Black (display) + Space Grotesk (body) — locked
- **Brand strip:** `_shared/logo-ministry.png` + `_shared/logo-digital-ed.png` har slaydda

## Tayyorgarlik checklist

- [ ] Use Case Canvas A4 chop etilgan (har stol uchun 1 nusxa) — slide 10 uchun
- [ ] Markerlar va stikerlar stollarda
- [ ] 4 ta department misoli yodda (slide 5): Kredit · Muvofiqlik · Mijoz xizmati · HR
- [ ] Matritsadagi 4 ta misol Use Case yodda (slide 7): masalan, "Mijoz savollarining FAQ-bot bilan javob berilishi", "Kredit memo qoralamasi", "Muvofiqlik hujjati to'liq qayta ishlash", "Bashorat qiluvchi skoring modeli"
- [ ] 1-modulda yig'ilgan brainstorm "og'riq"lari yodda — bu yerda Use Case'ga aylantiriladi
- [ ] QA: orchestrator screenshot.mjs ni o'zi ishga tushiradi — men ishga tushirmayman

## Series-wide bog'lanish

- **Avvalgi modul:** [`1_deck/`](../1_deck/) — Bank sektori uchun SI asoslari · *Ma'ruza + muhokama*
- **Keyingi modul:** [`3_deck/`](../3_deck/) — Sun'iy intellekt xavflari, muvofiqlik va boshqaruv
- **Pilot Loyiha qaytib chiqadi:** 13- va 14-modullarda (real keys + group loyiha)
- **Use Case taksonomiyasi qaytib chiqadi:** 4-modulda (workflow strukturalash) va 13-modulda (real keys)

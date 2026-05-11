# 1-deck — Bank sektori uchun sun'iy intellekt asoslari

**Module:** 1-modul · Kun 1 · 9:15–10:15 (60 daqiqa)
**Format:** Ma'ruza + jonli demo + interaktiv brainstorm
**Audience:** Markaziy Bank xodimlari (texnik bo'lmagan — operatsion / muvofiqlik / boshqaruv)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Framework:** Custom HTML (single-file `index.html`)
**Stack o'rgatiladi:** Gemini (LLM) + RAG (xotira) + n8n (orkestratsiya) — kodsiz
**Slaydlar soni:** 20 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** LLM, Promt, API — slayd 8 da kiritiladi, slayd 19 da interaktiv recap (auditoriya bilan birga aytamiz) + AI qaror kartasi ko'prigi
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — Bank sektori uchun sun'iy intellekt asoslari · "Kodsiz AI yechim"
2. **Agenda** — 4 faza: AI aslida nima · Raqamlar nima deyapti · Bot ichida nima bor · Sizning bankingizda nimalar qilsak bo'ladi
3. **Tanishuv** — Riskaliev Murad · Mohirdev · crea7iveai · 3+ yil AI/NLP · 60 soniya bio + loyihalar + LinkedIn
4. **WOW hook · suratda** — kal odamga AI sochi qo'shgan ("avval / keyin"), pattern interrupt
5. **WOW hook · videoda** — kuchuk videosi, "bu — o'yin, endi — ish" tranzisi
6. **Live demo · bank bot** — QR + chat bubble, audience telefonida bot bilan muloqot (demo qoidasi: tasdiqlangan PDF, real ma'lumot yo'q, javob topilmasa "ma'lumot yo'q")
7. **Stajyor metafora** — 17 tab ochilgan vs AI'ning tartiblangan ish oqimi (Gemini panel)
8. **Bankir uchun AI lug'ati** — LLM · Promt · API (3 ta dict-card)
9. **AI ishimni olib qo'yadimi?** — qizil "YO'Q" stamp, dramatic answer
10. **Miflarga qarshi zarba** — 4 ta afsona ↔ haqiqat juftligi (jobs · programming · know-it-all · ChatGPT=AI)
11. **AI — bu vosita. Sehr emas** — Can/Cannot ikki ustun: real bank misollari ↔ AI'ga yolg'iz topshirilmaydigan ishlar
12. **AI banking · global bozor** — $20.87B → $310.79B, 10 yilda 15× o'sish (Spherical Insights 2024)
13. **Mintaqaviy o'sish** — Osiyo-Tinch okeani eng tez o'sadigan mintaqa (4 ta region bar) · O'zbekiston bo'yicha alohida prognoz emas
14. **Bankda AI · qo'llash sohalari** — 4 ta segment: Risk menejmenti · Mijozlarga xizmat · Virtual yordamchi · Moliyaviy maslahat
15. **Tizim rollari** — Botni 3 rol bilan eslab qolamiz: Miya (Gemini) · Xotira (RAG) · Ishchi (n8n)
16. **Demo bot ish oqimi** — Savol → Qidiruv → PDF'dan topish → Tahlil → Javob (5 ta pill + terminal)
17. **Xavfsizlik** — Yopiq Kontur · O'qitilmaydi (zero-training) · Ma'lumot yashirish (3 ta item)
18. **Wordcloud — eng zerikarli ish** — interaktiv brainstorm · 4 ta mezon-pill
19. **Closing · 2 kundan keyin** — "AI bilan ishlaydigan bankirga aylanasiz" + lug'at recap (LLM = miya · Promt = buyruq · API = avtomat ulash) + AI qaror kartasi ko'prigi (jarayon · hujjat · inson tasdig'i)
20. **Q&A** — katta `?` belgisi · `murod@mohir.dev` + Telegram @crea7iveai

## Asosiy g'oya (thesis)

AI sehr yoki dushman emas. Bu sizning **super-aqlli stajyoringiz** — kod yozmasdan, ichki PDF'lardan javob beradigan, charchamaydigan, faqat sizning nazoratingizda ishlaydigan vosita. Markaziy Bank uchun aynan bu xavfsiz va amaliy yondashuv.

## Vaqt rejimi (60 daqiqa)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda + Tanishuv | 1–3 | ~3 daq |
| 01 · AI aslida nima | 4–11 | ~22 daq |
| 02 · Raqamlar nima deyapti | 12–14 | ~5 daq |
| 03 · Bot ichida nima bor | 15–17 | ~12 daq |
| 04 · Sizning bankingizda nimalar qilsak bo'ladi | 18–20 | ~18 daq |
| **Jami** | **20** | **~60 daq** |

## Design lock-in (cb_decks series-wide)

- **Style:** Bold Signal (style-a) — Archivo Black + Space Grotesk
- **Palette:** to'q ko'k (#020A24 / #06173B) + accent blue (#2563eb / #60a5fa) + accent-2 cyan + occasional red stamp (#ff5555)
- **Motif:** subtle grid background, blue-gradient highlights (`.hl`), blur-on-transition, fragment reveals
- **Series consistency:** qolgan 14 deck ham shu palette + type pairing'da bo'lishi kerak

## Tayyorgarlik checklist

- [ ] Demo Telegram bot ishlayapti (`bots/01_rag_basics/` — n8n + Gemini + Ipakyuli Bank PDF korpus) — slide 5
- [ ] QR `images/https_t_me_bankragbot.png` ekranda yaqqol ko'rinadi — slide 5
- [ ] Backup: agar tarmoq tushsa, screen-recording reza
- [ ] WOW image (`images/avval.png` + `images/keyin.png`) yuklangan — slide 3
- [ ] WOW video (`videos/hook-FEukcVbEO1o.mp4`, autoplay muted loop) ishlamoqda — slide 4
- [ ] Spherical Insights raqamlari ($20.87B → $310.79B, 31% CAGR) yodda — slides 11-13
- [ ] JPMorgan COIN va Morgan Stanley misollari yodda — slide 10 (agar savol kelsa chuqur)
- [ ] Vazirlik logotiplari `_shared/` da
- [ ] QA: `.\.qa\review.ps1 decks\cb_decks\1_deck` (Gemini-powered review)
- [ ] Slide 18 lug'at recap fragmentlari ishlashi tasdiqlangan (ArrowRight bilan birma-bir ochiladi)

## Series-wide bog'lanish

- **Keyingi modul:** [`2_deck/`](../2_deck/) — Bank jarayonlarida SI qo'llash imkoniyatlarini aniqlash
- **Muvofiqlik chuqur:** [`3_deck/`](../3_deck/)
- **Promt chuqur:** [`5_deck/`](../5_deck/)
- **RAG chuqur (showcase):** [`11_deck/`](../11_deck/) — kechagi demo botning chuqur arxitekturasi (RAG + Embedding atamalari deck 11 da)
- **Yakuniy glossary review:** [`15_deck/`](../15_deck/) — barcha 30+ atama interaktiv quizda

## Restructure tarixi

- **v4 (2026-05-10):** 14 → 19 slayd. Wow hook ikkilik (image + video), Spherical Insights stat trio, stamp "YO'Q", interaktiv lug'at recap, kicker'lar to'liq o'zbekchaga, content.md / notes.md sinxronlandi.
- **v3 (2026-05-07):** Lug'at slayd qo'shildi (LLM/Promt/API → keyinchalik RAG'ga), Can/Cannot kiritildi, Wall Street + Benefits birlashtirildi.
- **v2:** Stack: Claude + MCP → Gemini + RAG + n8n.

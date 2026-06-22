# 13-modul · Bank amaliyotidagi real keyslar

**Kun 2 · 14:00 — 15:00 · 60 daq · Keys-stadi**
Spiker: Riskaliev Murad · NLP Engineer · Mohirdev

## Maqsad

Auditoriya 60 daqiqada 5 ta global va bir nechta mintaqaviy AI implementatsiya keyslarini ko'rib chiqadi va o'z bo'limiga taqqoslab ko'radi. Maqsad — pilotda qolib ketish ehtimolini kamaytirish va "production-grade" deganda nimani tushunish kerakligini ko'rsatish.

## Atamalar (≥2)

- **AI Adoption** — kunlik haqiqiy foydalanish darajasi (yaratilgan emas, ishlatilayotgan)
- **Production-grade** — test stadiyasidan chiqqan, bank standartlarida ishonchli ishlaydigan tizim

## Time budget (60 daq, 19 slayd)

- Faza 1 — Hook + metodologiya + atamalar (slaydlar 1–5): **~10 daq**
- Faza 2 — 5 ta global keys (slaydlar 6–10): **~20 daq** (har biri ~4 daq)
- Faza 3 — Mintaqaviy keys (slaydlar 11–12): **~7 daq**
- Faza 4 — Saboq + mashq + yopilish (slaydlar 13–19): **~23 daq**

## Slaydlar bo'yicha outline

1. **Title** — "Bank amaliyotidagi real keyslar"; Kun 2 chip; tagline: O'zbek va jahon banklaridan amaliy AI implementatsiya keyslari.
2. **Agenda** — 4 ta faza karta: Kontekst · Global keys · Mintaqaviy · Saboq.
3. **Hook** — McKinsey "State of AI 2024": 70% banklarda AI piloti bor, faqat 14%da production AI. *Compare* layout (Pilot 70% vs Production 14%). Speaker cue: "Bu farq qayerdan kelyapti? Bugun shuni ko'ramiz."
4. **Metodologiya** — Har keys 3 ta savolga javob beradi: Kontekst / Yechim / Natija va saboq. *Benefits* 3-card.
5. **Atama** — *AI Adoption* + *Production-grade* (`.dict.dict-2`). Speaker cue: "Bu ikki so'z butun darsning lakmus qog'ozi."
6. **Keys 1 — JPMorgan COIN** (Contract Intelligence). Stats: 12,000 ta yillik kommertsial kredit shartnomalari, 360,000 yurist soat tejagan, 2017 da boshlangan. *Benefits* 3-card stat (vaqt / sifat / hajm) + proof.
7. **Keys 2 — Morgan Stanley AI Assistant** (OpenAI GPT-4 ustida). 16,000+ moliyaviy maslahatchi 100,000+ ichki tadqiqot hujjatiga RAG orqali kirish. *Flow* 4-step (savol → RAG → tasdiqlash → javob).
8. **Keys 3 — Bank of America Erica**. Virtual assistant, 2018 dan beri 2 mlrd+ mijoz interaksiya, 42 mln+ aktiv foydalanuvchi (BofA hisoboti). *Benefits* 3-card.
9. **Keys 4 — DBS Singapore**. AI risk + agent assist. 600+ AI use case ishga tushgan, ~$370M ekonomik foyda 2023da (DBS yillik hisobot). *Compare* before/after.
10. **Keys 5 — Sberbank GigaChat**. Korporativ LLM, 1M+ kunlik so'rovlar (Sberbank ma'lumoti). Nima uchun ehtiyotkor: ma'lumot suvereniteti masalalari. *Sec* 3-card (Kuchli / Ehtiyot / Saboq).
11. **Mintaqaviy — Qozog'iston: Halyk + Forte**. AI bilan kredit skoring, mijoz xizmati. *Sec* 2-card.
12. **Mintaqaviy — O'zbekiston**. Uzum Bank, Anorbank, Kapital Bank — 2024 dan AI joriy qilish. Aniq raqamlar yo'q, regional frame: "trend boshlangan". *Sec* 3-card.
13. **Muvaffaqiyat omillari** — Boshlik qo'llab-quvvatlashi / Aniq use case / Ma'lumot tayyor / Muvofiqlik hamkorligi. *Benefits-4* 4-grid.
14. **Failure 1** — "Pilotda qolish". *Myth* 3 row: Pilot ko'rgazma uchun vs Pilot ishga olib chiqish uchun.
15. **Failure 2** — "Texnologiya bor, ish jarayoni yo'q". *Myth* 2 row: Bot bor lekin xodimlar ishlatmaydi vs Jarayon ichiga singdirilgan.
16. **Saboq — bunday qil/qilma** — *Cando* 6+6 element. 6 ta nima qilish kerak, 6 ta nima qilmaslik kerak.
17. **Mashq** — *S-brain* table layout: 3 stol, har biri o'z bo'limini global keysga taqqoslab, 3 ta drift (uzilish nuqtasi) topadi. Jadval shabloni ekranda.
18. **Closing + recap** — 3 takeaway + recap row (`AI Adoption` + `Production-grade`).
19. **Q&A** — savollar.

## Speaker cues (umumiy)

- **Tonlama:** keys-stadi — har bir keys haqida hikoya qil, raqamlardan boshla, lekin "nima uchun ishladi" bilan tugat.
- **Voqea:** Bu modul Kun 2 ning markazida — auditoriya allaqachon RAG, agent, pipeline tushunchalarini ko'rgan. Endi ularni real banklarda qanday ishlatilganini ko'rsatamiz.
- **Hujjat:** Stats keltirsangiz — manbasini bir og'iz aytib o'ting (JPMorgan 2017 press, BofA yillik hisobot, McKinsey "The State of AI" 2024). Aniq son yoddan tushib qolsa, "yuqori darajada" yoki "yillik hisobotlarga ko'ra" deb ifoda eting.
- **O'zbekiston banklari:** Aniq raqam yodda bo'lmasa, regional frame — "O'zbekistonda banklar AI'ni 2024 dan boshlab joriy qilmoqda, ammo hozircha hammasi pilot bosqichida". Bu sezgir.
- **Mashq:** 17-slaydda 8 daq ajrating. Jadval ekranda, har stol o'z bo'limini tanlaydi (kredit, KYC, mijoz xizmati), keys taqqoslab "biz qaysi joyida cho'kib qolishimiz mumkin"ni topadi.

## Atama placement check

- Slayd 5 — kiritish (`.dict.dict-2`)
- Slayd 13–14–16 — kontekstda qaytib chiqadi (failure va success faktorlarda)
- Slayd 18 — recap (`.recap-term` × 2)

## Avoid-bug

Hech qaysi slaydda r4 reveal-class ortidagi muhim kontent yo'q. Ko'pi r3 da to'xtaydi, ba'zilarida r4 faqat kichik fusnoot (italic muted line) sifatida ishlatiladi.

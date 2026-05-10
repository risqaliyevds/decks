# cb_decks — Central Bank seminar series

This folder holds all decks for a 2-day, 15-module seminar on AI in banking, delivered to Central Bank of Uzbekistan staff. Each module gets its own deck under `N_deck/`.

Project-wide rules in `C:\projects\slides\CLAUDE.md` still apply — this file only adds context specific to this seminar.

## Audience & voice

- **Audience:** Central Bank of Uzbekistan staff. Non-technical (operations, compliance, management). NOT developers, NOT data scientists.
- **Language:** Uzbek (primary). Avoid translated marketing speak ("amaliy yechimlar", "qayta tasavvur qilish") — concrete, conversational Uzbek with relatable analogies before any abstract concept.
- **Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
- **Brand on slides:** crea7iveai
- **Tone:** business/workflow framing — time saved, fewer errors, faster customer responses, compliance-aware. Never lead with model names or ML terminology.

## Schedule (15 modules across 2 days, 60 min each)

### Day 1 — 9:00–18:15 (8 modules)
| # | Folder | Module title (Uzbek) | Format |
|---|---|---|---|
| 1 | `1_deck/` | Bank sektori uchun sun'iy intellekt asoslari | Ma'ruza + muhokama |
| 2 | `2_deck/` | Bank jarayonlarida SI qo'llash imkoniyatlarini aniqlash | Guruhli tahlil |
| 3 | `3_deck/` | Sun'iy intellekt xavflari, muvofiqlik va boshqaruv | Interaktiv muhokama |
| 4 | `4_deck/` | Sun'iy intellekt uchun jarayonlarni strukturalashtirish | Amaliy mashq |
| 5 | `5_deck/` | Promt muhandisligi — professional daraja | Namoyish + mashq |
| 6 | `6_deck/` | Bank uchun tayyor promt kutubxonasi | — |
| 7 | `7_deck/` | SI platformalar bilan ishlash (ChatGPT, Claude) | — |
| 8 | `8_deck/` | No-code avtomatlashtirish (Zapier, n8n, Make) | — |

### Day 2 — 9:00–17:45 (7 modules)
| # | Folder | Module title (Uzbek) | Format |
|---|---|---|---|
| 9 | `9_deck/` | Oddiy sun'iy intellekt ish tizimini yaratish | Bosqichli qurish |
| 10 | `10_deck/` | Sun'iy intellekt agentlari tushunchasi | Ma'ruza + muhokama |
| 11 | `11_deck/` | Bank uchun sun'iy intellekt agenti dizayni | Dizayn seminar |
| 12 | `12_deck/` | Murakkab sun'iy intellekt jarayonlari | Namoyish + tahlil |
| 13 | `13_deck/` | Bank amaliyotidagi real keyslar | Keys-stadi |
| 14 | `14_deck/` | Sun'iy intellekt yechimini ishlab chiqish | Guruhli loyiha |
| 15 | `15_deck/` | Taqdimot va yakuniy qism | Taqdimot |

Day 2 closes with a certificate ceremony (17:15–17:45) — accommodate in deck 15.

## Terminologiya qoidasi (≥2 ta AI atama / modul)

Auditoriya texnik bo'lmagan bank xodimlari, lekin kurs davomida "LLM", "promt", "API", "RAG", "agent" kabi atamalar muqarrar uchraydi. Tasodifiy uchratib qoldirish yo'q — har modul **kamida 2 ta yangi AI atamasini** maqsadli o'rgatadi. 15 modul × ≥2 atama = ~30+ ta atamalik glossary.

**Maqsad:** kurs oxirida har bir ishtirokchi AI tilini eshitganda yo'qolib qolmasligi kerak. Atama eshitildi → izoh yodda → o'z bo'limiga qo'llay olishi.

### Bajarilish — har deck'da 3 nuqta

1. **Kiritish (modul ichida):** atama bankir tilida, sodda izoh + 1 misol bilan beriladi. Alohida "lug'at" slaydi (1-modul slide 5 ga o'xshash, 2–3 ta atama bir oynada) yoki kontekst ichida ravon kiritiladi. Hech bir atama izohsiz qoldirilmaydi.
2. **Recap (closing slaydda):** auditoriyaga *"Eslay olasizmi: X nima edi?"* tarzida savol bering, javobni jamoa bilan birga ayting. ~30–60 soniya. Bu retentsiya uchun kritik — quruq ma'lumot uzatish emas, **birga aytish**.
3. **15-modul (yakuniy):** butun kurs glossary review — barcha 30+ atama interaktiv quizda yoki tezkor flash-card formatida. Bu yakuniy taqdimot tarkibida bo'ladi.

### Atamalar mapping (har deck'da kamida 2 ta — kurs glossary'si)

| # | Modul | Atama 1 | Atama 2 | Atama 3 | Holat |
|---|---|---|---|---|---|
| 1 | AI asoslari | **LLM** (Katta Til Modeli) | **Promt** (To'g'ri Buyruq) | **API** (AI'ni avtomat ulash) | ✅ slide 5 dict-card · slide 18 closing pill recap |
| 2 | Use case discovery | **Use Case** (qo'llash holati) | **Pilot Loyiha** | — | ✅ slide 5 dict-card · closing recap |
| 3 | Risks / muvofiqlik | **Hallucination** (gallyutsinatsiya) | **Data Masking** | — | ✅ slide 5 dict-card · slide 13 recap |
| 4 | Process structuring | **Workflow** (jarayon zanjiri) | **Task Decomposition** | — | ✅ slide 5 dict-card · closing recap-term |
| 5 | Prompt engineering | **Few-shot Prompting** | **Chain-of-Thought** (fikr zanjiri) | — | ✅ slide 5 dict-card · closing recap-term |
| 6 | Prompt library | **System Prompt** | **Template Prompt** | — | ✅ slide 5 dict-card · closing recap-term |
| 7 | AI platforms | **Token** | **Context Window** (kontekst oynasi) | **+ Rules · Skills · MCP** (slide 14 · ikkinchi qism); Agent — cross-ref to deck 10 | ✅ slide 5 dict-card (Token + Context) · slide 14 dict-card (Rules + Skills + MCP) + Agent cross-ref-card · slide 18 closing recap (5 atamalar) |
| 8 | No-code | **Trigger** | **Webhook** | — | ✅ slide 5 dict-card · closing recap-term |
| 9 | First AI workflow | **Classification** (Tasniflash) | **Schema** (sxema-bo'yicha javob · structured output) | — | ✅ slide 5 dict-card · closing recap-term · paired with [`bots/01_classifier_bot/`](bots/01_classifier_bot/) — **demo bot** (simplest, 7 nodes, classifier + operator match) |
| 10 | Agents intro | **Agent** | **Tool Use** (asbobdan foydalanish) | — | ✅ slide 5 dict-card · closing recap-term |
| 11 | Agent design (RAG chatbot) | **RAG** (Retrieval-Augmented Generation) | **Embedding** (vektor ko'rinishi) | — | ✅ slide 5 dict-card · closing recap-term · paired with [`bots/02_rag_chatbot/`](bots/02_rag_chatbot/) — **production-grade** RAG with admin commands |
| 12 | Complex workflows | **Pipeline** (multi-step LLM) | **Idempotent design** | — | ✅ slide 5 dict-card · closing recap-term · uses the **classifier bot** (deck 9's build) as the pipeline analysis target — students reason about "how do I take MY bot to production?" |
| 13 | Real cases | **AI Adoption** | **Production-grade** | — | ✅ slide 5 dict-card · closing recap-term |
| 14 | Solution development | **MVP** (Minimum Mahsulot) | **Iteration** (takrorlash) | — | ✅ slide 5 dict-card · closing recap-term · paired with [`bots/03_complex_agent/`](bots/03_complex_agent/) |
| 15 | Yakuniy | **Glossary review** — barcha asosiy atamalar (LLM/Promt/API … RAG/Embedding … MVP/Iteration) | Q&A | — | ✅ slide 5 to'liq glossary jadvali — **note:** atamalar list was updated 2026-05-10 (STT/Function Calling removed; Classification/Schema added for new deck 9 classifier bot) |

### Atamalar uniqueness rule (qat'iy)

Har bir atama **faqat bitta deck'da rasmiy ravishda kiritiladi** (`<span class="dict-tag">{atama}</span>` dict-card yoki `<strong>{atama}</strong>` recap-pill orqali). Boshqa decklarda u faqat **kontekst sifatida tilga olinishi mumkin** — lekin qayta ta'riflanmasligi kerak.

- ✅ **OK (cross-reference):** deck 10 ning Agent ta'rifi: *"ruxsatli yordamchi tizim — **LLM** + xotira + asboblar"*. LLM tilga olindi, lekin qayta ta'riflanmadi (LLM — deck 1 ning atamasi).
- ❌ **DRIFT (duplicate):** deck 1 ning slayd 5 da RAG atamasini "O'z hujjatingdan javob" deb ta'riflab, dict-card ko'rsatish. RAG — deck 11 ning atamasi; deck 1 da faqat demo botning ishlash printsipi sifatida tilga olinishi mumkin (ta'rifsiz).

**Drift'ni topish (PowerShell):**

```powershell
# Har bir atama uchun: necha deck dict-tag yoki recap-strong qiladi?
# Natijada har atama uchun [DECK 15 + bitta sub-deck] ko'rinishi kerak.
$terms = "LLM","Promt","API","Use Case","Pilot Loyiha","Hallucination","Data Masking","Workflow","Task Decomposition","Few-shot","Chain-of-Thought","System Prompt","Template Prompt","Token","Context Window","Trigger","Webhook","Classification","Schema","Agent","Tool Use","RAG","Embedding","Pipeline","Idempotent","AI Adoption","Production-grade","MVP","Iteration"
foreach ($t in $terms) {
  $hits = @()
  foreach ($n in 1..15) {
    $f = "decks\cb_decks\${n}_deck\index.html"
    $found = Select-String -Path $f -Pattern "dict-tag[^>]*>$([regex]::Escape($t))<|recap-term[^>]*><strong>$([regex]::Escape($t))<\/strong>|class=`"pill`"><strong>$([regex]::Escape($t))<\/strong>"
    if ($found) { $hits += "d$n" }
  }
  "{0,-22} {1}" -f $t, ($hits -join ' ')
}
```

Har atama uchun **`d15` + bitta deck'dan boshqa joyda chiqsa — drift**. Tuzatish: chetdagi dict-card'ni cross-reference matniga aylantiring (qayta ta'rif emas).

**Eslatma:** mapping qattiq emas — har deck yaratilganda atama tanlovi dolzarblashishi mumkin (modulning aniq mazmuniga qarab). Lekin uchta qoida qat'iy:
1. **kamida 2 ta yangi AI atamasi + closing recap** har deck'da
2. **uniqueness** — har atama bitta deck'da rasmiy kiritiladi (deck 15 — universal recap)
3. **bankir tilida** — har atama analogiya yoki real misol bilan beriladi (texnik ta'rif emas)

### Closing slayd shabloni

Har deck'ning oxirgi xulosa slaydida (Q&A'dan oldingi) lug'at recap qismi bo'lsin:

```
Lug'at recap (interaktiv, 30–60 sek):
- [Atama 1] = … (jamoa: "[sodda izoh]")
- [Atama 2] = … (jamoa: "[sodda izoh]")
```

1-deck (`decks/cb_decks/1_deck/index.html` slide 13) bu shablonning birinchi namunasi — qolgan 14 deck shu pattern'ga ergashadi.

### Atama tanlash mezoni

Modulingizdagi atamani tanlashda quyidagilarni tekshiring:

- ✅ **AI/ML kontekstida ishlatiladigan** atama (umumiy biznes atamasi emas).
- ✅ Modulning markaziy mavzusi bilan **bog'liq** (chetdagi atama emas, ish ichida bot ishlatadigan tushuncha).
- ✅ Bankir tiliga **soda tarjima qilinadi** (analogiya, real misol bilan).
- ✅ Keyingi modullarda **qaytib chiqadi** (1-modulda kiritilsa, 5-modulda chuqur — bog'lanish bo'lsin).

## Per-deck convention

Each `N_deck/` folder follows the standard html-slides layout:

```
N_deck/
  notes.md         outline first (one bullet = one slide), speaker cues
  index.html       (Reveal.js or Custom) or slides.md (Slidev)
  style.css        if Custom HTML
  assets/          images, fonts, video
  screenshots/     QA output (gitignored)
```

Pick one framework per deck (don't mix). The seminar style favors **Custom HTML** for showcase modules (1, 13, 15) and **Reveal.js** for content-dense lecture modules — but make the call per deck against the framework decision table in `.claude/skills/html-slides/SKILL.md`.

## Series-level design consistency

Every deck in this series shares the **same palette, type pairing, and motif** so the 15 decks read as one course, not 15 unrelated talks.

**Canonical style spec → [`STANDARDS.md`](./STANDARDS.md)** (font stack, CSS variables, base classes, drop-in header block). Read it before editing any deck's `<style>` block. The four base selectors `body,p,li,.lead{letter-spacing:0.018em}` and the nine `:root` variables are non-negotiable — every deck must have them verbatim. Per-slide layout classes are free.

Reference images for the syllabus live in `images/` (the official schedule sheets). Don't delete — they're the source of truth for module titles and timing.

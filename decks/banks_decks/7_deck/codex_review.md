# Codex Review - 7-deck punch-list

**Verdict:** NEEDS-FIXES  
**Score:** 7/10

Deckning asosiy yo'nalishi to'g'ri: platformani brend bo'yicha emas, use-case, ma'lumot sezgirligi, audit izi va narx bo'yicha tanlash kerakligi yaxshi ochilgan. `index.html`dagi joriy versiya CLAUDE.md talabiga yaqin: slide 5 Token + Context Window, slide 14 Rules + Skills + MCP, Agent esa cross-ref, slide 18 esa 5 atama recap qiladi.

Lekin hali punch-list bor:

- **Content sync:** `content.md` va `notes.md` eskirgan. Ikkalasi 18 slayd va faqat Token/Context Window deydi; `index.html` va screenshots esa 19 slayd, slide 14 yangi atamalar, slide 18 besh atama recap. Notes/source yangilanmasa keyingi QA noto'g'ri deckni tekshiradi.
- **Content accuracy:** platforma raqamlari bir xil mahsulot yuzasidan berilmagan. ChatGPT app, OpenAI API, Gemini API/Workspace, Claude web/API alohida kanallar; context window, narx, data-retention va tool access kanaldan kanalga o'zgaradi. Slaydlarda "Holat: 2026-05" bor, lekin jadval buni amalda ajratmayapti.
- **Governance fit:** slide 11 va 15 kuchli. Slide 14da ham korporativ shartnoma + audit log bor, lekin "AI'ni bo'lim ish jarayoniga avtomat ulashga imkon beradi" juda keng eshitiladi. "Imkon beradi" o'rniga "faqat ruxsatli kanal orqali ulanishi mumkin" framing kerak.
- **Atamalar:** rasmiy mapping bajarilgan: Token, Context Window, Rules, Skills, MCP. Agent `dict-tag` emas va cross-ref bo'lib turibdi - yaxshi. Closingda ikkinchi xulosa "Context" deb qisqartirgan; rasmiy nom **Context Window** bo'lishi kerak.
- **Uzbek quality:** umumiy til auditoriyaga mos. Ammo "vendor", "production", "API/Web rejimi", "Persona", "training", "right to erasure" kabi joylarda yoki o'zbekcha izoh qo'shish, yoki bir xil uslubda qoldirish kerak. "YandexGPT / GigaChat - RU lokal hosting" Markaziy Bank auditoriyasi uchun juda qo'pol va siyosiy/huquqiy jihatdan ehtiyotliroq yozilishi kerak.
- **Vendor absolutism:** ChatGPT/Claude/Gemini solishtiruvida "eng katta ekosistema", "uzun matn ustasi", "eng keng", "kamroq xato", "kursimizning tanlovi" kabi mutlaq ohanglar bor. Buni "ko'pincha", "shu demo uchun", "rasmiy limit va shartnomaga qarab" bilan yumshatish kerak. Ayniqsa Claude uchun "real-vaqtda internetga ulanmagan" va ChatGPT uchun "GPT-4o 128k" kabi jumlalar tez eskiradi va mahsulot kanaliga bog'liq.

**Top 5 Uzbek Rewrites**

1. Slide 4 - 5 platforma kartasi vendor-absolutismni kamaytirsin:

> **Bozorda bir nechta yirik yo'nalish bor.** Bank uchun nomdan oldin kanalni ajratamiz: chat ilova, korporativ workspace yoki API. Raqamlar va imkoniyatlar tarif, region, shartnoma va ruxsat sozlamasiga qarab o'zgaradi.

2. Slide 7 - context window jadvali aniqroq governance disclaimer bilan:

> **Kontekst oynasi - orientir, xarid qarori emas.** Bu raqamlar model/API/Web kanaliga qarab farq qiladi. Pilotdan oldin vendorning rasmiy hujjati, data-residency sharti, retention siyosati va yuridik xulosa alohida tekshiriladi.

3. Slide 10 - Gemini framingni demo tanlov sifatida qoldirish:

> **Gemini - bugungi lab uchun qulay demo muhiti.** Uzun kontekst, multimodal input va Workspace integratsiyasi mashqni tez ko'rsatishga yordam beradi. Bu Markaziy Bank uchun yakuniy tavsiya emas; real tanlov use-case, xavfsizlik, audit izi, narx va data-residency bo'yicha alohida baholanadi.

4. Slide 14 - lead matn governance-fit bo'lsin:

> ChatGPT, Claude va Gemini faqat chat oynasi emas. Rules, Skills va MCP bo'lim ishini standartlashtirishga yordam beradi, lekin bankda ular faqat korporativ shartnoma, ruxsat chegarasi, audit log va inson tasdig'i bilan ishlatiladi. Agent rejimi esa 10-modulda alohida ochiladi.

5. Slide 18 - closing recapdagi rasmiy 5 atama:

> **Token, Context Window, Rules, Skills, MCP - endi sizning ish tilingiz.** IT-xarid va vendor bilan gaplashganda narx, sig'im, doimiy qoida, qayta ishlatiladigan paket va ruxsatli integratsiya talablarini aniq so'raysiz.

**Source-check notes**

- OpenAI docs/product pages currently separate ChatGPT Business/Enterprise limits from API model limits; deck should not mix them in one hard number.
- Anthropic docs present Claude model context mostly as 200K, with 1M long context as a channel/model-specific beta for Sonnet/API.
- Google Gemini docs list Gemini 2.5 Pro with 1,048,576 input tokens and pricing changes above 200K-token prompts; the deck should mention long-context cost tiers when using 1M as the headline.

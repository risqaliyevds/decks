# Codex Review - Slide 14 atamalar

**Verdict:** NEEDS-FIXES
**Score:** 7/10

Slide 14 is useful and mostly understandable for a non-technical Markaziy Bank audience, but it currently breaks the atamalar uniqueness rule for **Agent**: deck 10 already introduces Agent officially, while slide 14 uses `dict-tag` and gives a fresh definition. Rules, Skills, and MCP are generally clear, but MCP and Agent need stronger governance framing: platform features must be treated as contract-controlled capabilities, not default permissions.

Closing slide 18 correctly recaps all 5 target atamalar: **Token + Context Window + Rules + Skills + MCP**. The only small cleanup is the summary line saying "Context" while the official term is **Context Window**.

## Top 5 Concrete Uzbek Rewrites

### 1. Agent card must become cross-reference only

Current phrasing redefines Agent. Replace the full Agent card body with:

> **Agent - 10-modulda alohida o'rganamiz**  
> Bu yerda faqat nomini eslab qolamiz: ayrim platformalarda AI vazifani bir necha qadamga bo'lib, ruxsat berilgan asboblardan foydalanishi mumkin. Batafsil ta'rif, chegaralar va nazoratlar - 10-modulda.

### 2. MCP definition should be less absolute and more governance-fit

Current "qo'shimcha kod yozmasdan" can sound like risk-free integration. Rewrite:

> **MCP** - AI platformani tashqi tizimlar bilan bog'lash uchun standart protokol. Bankda bu faqat tasdiqlangan serverlar, ruxsat chegarasi, audit log va korporativ shartnoma bilan ishlatiladi.

### 3. MCP example should avoid implying direct access is automatically allowed

Current example names external services as if connection is immediate. Rewrite:

> **Misol:** tasdiqlangan MCP ulagichi orqali AI faqat ruxsat berilgan jadval yoki hujjatni o'qiydi; yozish, yuborish yoki o'chirish amallari alohida ruxsat va audit izi bilan boshqariladi.

### 4. Rules definition should say "policy guardrail," not just writing style

Current Rules text is clear, but too much like tone settings. Rewrite:

> **Rules** - AI uchun doimiy ish qoidasi: qaysi rol, qaysi uslub, qaysi manba, qaysi ma'lumot taqiqlangan. Bir marta sozlanadi, har javobda eslatib turiladi.

### 5. Skills should avoid "butun bo'lim ishlatadi" without ownership controls

Current Skills text is easy, but needs owner/version framing. Rewrite:

> **Skills** - bo'lim uchun qayta ishlatiladigan AI paketi: ko'rsatma, namuna, tekshiruv mezoni va ruxsat chegarasi bir joyda. Egasi, versiyasi va tasdiqlash tartibi aniq bo'lsa, jamoa bir xil standartda ishlaydi.

## Minor Closing Cleanup

Slide 18 summary line should use the official term:

> **Token, Context Window, Rules, Skills, MCP - endi sizning tilingiz.**

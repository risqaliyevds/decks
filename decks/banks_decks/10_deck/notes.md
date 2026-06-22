# 10-deck — Sun'iy intellekt agentlari tushunchasi

**Module:** 10-modul · Kun 2 · 10:00–11:00 (60 daqiqa)
**Format:** Ma'ruza + muhokama (lecture + discussion)
**Audience:** Markaziy Bank xodimlari (non-technical)
**Speaker:** Riskaliev Murad — NLP Engineer · Mohirdev
**Brand:** crea7iveai
**Framework:** Custom HTML (single-file, `index.html`)
**Slaydlar soni:** 18 ta · 4 ta faza
**Atamalar (≥2/modul talabi):** **Agent**, **Tool Use** — slayd 5 da kiritiladi, slayd 16 da recap, slayd 17 da bank qaror artefakti
**To'liq kontent:** [`content.md`](./content.md)

## Outline (one bullet = one slide)

1. **Title** — "Sun'iy intellekt agentlari tushunchasi" (Kun 2 chip)
2. **Agenda** — 4 faza (Bot vs Agent · Atamalar · Misol · Muhokama)
3. **Hook** — Bot vs Agent compare (`.compare`): "savol → javob" vs "savol → fikrlash → asbob → ish → javob"
4. **Botdan agentga evolyutsiya** — `.flow` 4-step: Static FAQ → RAG bot → Tool-using bot → Multi-step agent
5. **YANGI: Lug'at** — **Agent** + **Tool Use** (`.dict.dict-2`)
6. **Agent anatomiyasi** — `.stack` 3-card: Miya (LLM) · Xotira (RAG/state) · Asboblar (Tool list)
7. **Tool Use mashq** — `.flow` 4-step ReAct cycle: User savol → Agent fikrlaydi → Tool chaqiradi → Javobga qo'shadi
8. **5 turdagi tool** — `.benefits-5` grid: API · DB query · File read · Email · Hisob-kitob
9. **ReAct pattern** — `.compare`: oddiy LLM javobi vs ReAct (Reasoning + Action + Observation) sikli
10. **Bank misoli #1** — Operator yordamchi agent (3 ta tool): `.flow` 5-step
11. **Bank misoli #2** — Muvofiqlik agent (4 ta tool): `.flow` 5-step
12. **Multi-agent xavfi** — `.cando` "Bitta agent uchun yaxshi" / "Bitta agent uchun yomon" 5+5 element
13. **Cheklov va xavf** — `.sec` 3-card: hallucinated tool call · infinite loop · security boundary
14. **Mini-recap** — Chatbot vs RAG bot vs Agent quick chart (`.benefits` 3-card)
15. **Muhokama** — `.s-brain` 3 ta savol: bo'limda qanday agent foydali · qaysi tool kerak · nima xavfli
16. **Closing + lug'at recap** — 3 xulosa + `.recap` (Agent + Tool Use)
17. **Bank qaror artefakti** — `.artifact` 8-row pilot qaror varaqasi (vazifa, owner, tool, chegara, tasdiq, audit, metrik, qaror)
18. **Q&A** — ochiq savol-javob, murod@mohir.dev

## Asosiy g'oya

Agent — bu shunchaki "yana bir bot" emas. Bu LLM'ning "fikrlash + asbobdan foydalanish" qobiliyati bilan birga ishlaydigan tizim. Modul oxirida ishtirokchilar: (1) bot va agent farqini aniq biladi, (2) qaysi vazifa uchun agent kerakligini ajrata oladi, (3) tool use'ning xavf nuqtalarini biladi.

## Vaqt rejimi (60 daq)

| Faza | Slaydlar | Vaqt |
|---|---|---|
| Title + Agenda | 1–2 | ~3 daq |
| 01 · Bot vs Agent | 3–5 | ~12 daq |
| 02 · Anatomiya · Tool Use | 6–9 | ~16 daq |
| 03 · Misollar · Cheklovlar | 10–14 | ~17 daq |
| 04 · Muhokama · Closing · Artefakt · Q&A | 15–18 | ~12 daq |

## Atamalar — kursning glossariyasiga qo'shimcha

| Atama | Bankir tilida | Birinchi marta qayerda |
|---|---|---|
| **Agent** | Fikrlash + ish qila oladigan AI — savol oladi, mantiq yuritadi, asbob ishlatadi, natija beradi | Slayd 5 (`.dict.dict-2`) |
| **Tool Use** | AI'ni asboblar bilan ta'minlash — DB so'rov, API chaqiruv, hisob-kitob, fayl o'qish | Slayd 5 (`.dict.dict-2`) |

Tool Use ko'p modulga ulanib ketadi:
- 11-modulda function calling / schema bilan birga;
- 12-modulda pipeline va idempotent design bilan birga;
- 14-modulda guruhli loyiha shu fundament asosida quriladi.

## Design lock-in

- **Style:** Bold Signal (style-a) — `1_deck` palette / type / motif
- **Day chip:** `Kun 2 · 10:00 — 11:00`
- **Reveal classes:** body content — `r3`. `r4` ishlatilmaydi (screenshot bug oldini olish).
- **Brand strip:** har slaydda — `_shared/logo-ministry.png` + `_shared/logo-digital-ed.png`
- **No accent line under titles** — `.hl` bilan urg'u beriladi.

## Tayyorgarlik (deck'dan tashqari)

- 9-modulda qurilgan RAG botni eslatish (slayd 4 — evolyutsiya)
- 11-modulga ko'prik (slayd 13 — function calling havolasi)
- Real banking misol — operator yordamchi va muvofiqlik agentlar (slayd 10–11)
- Auditoriya muhokamasi uchun flipchart (slayd 15)

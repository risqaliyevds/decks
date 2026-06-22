# 03 · Murakkab agent — multi-turn document/data collector · 14-deck

**Status:** design phase complete · workflow build pending.
**Built by:** participants in groups of 3–4. This is the capstone bot for module 14 (Guruhli loyiha).
**Modeled on:** [`Bank_Kredit_Boti`](https://risqaliyevds.app.n8n.cloud/workflow/omxBphE1GUTVgFOw) — instructor's existing 27-node production workflow. We're building a simplified ~13-node template that student groups specialize per banking scenario.

## Design artifacts

The bot is fully designed before implementation. Read these in order:

1. [`design/conversation-flow.md`](./design/conversation-flow.md) — 6-stage state machine, validation rules, branch points, state persistence (3 layers)
2. [`design/workflow-graph.md`](./design/workflow-graph.md) — 13-node n8n graph (ASCII diagram), connections, complexity estimate, `ai_*` connection wiring
3. [`design/data-schema.md`](./design/data-schema.md) — Google Sheets schema (3 sheets), Drive folder layout, customization points per group
4. [`prompts/system-prompt.md`](./prompts/system-prompt.md) — full system prompt skeleton with `{PLACEHOLDERS}` + 3 example fills (kredit · depozit · HR onboarding)

## What it does

Multi-turn Telegram agent that collects banking application data + documents from a customer and hands off a structured row to a human banker.

**Generic template** — student groups in module 14 specialize for their scenario:
- **Kredit** (instructor's reference scenario, modeled on `Bank_Kredit_Boti`)
- **Depozit**
- **HR onboarding**
- **Komplaens / shikoyat**
- *(any banking workflow that needs data + documents → human handoff)*

## Architecture summary

```
Telegram → n8n → Gemini Agent (with memory) → Google Sheets + Drive
                       ↑
                       │
            Inline JSON state pattern
            (every reply ends with ---JSON_START---{...}---JSON_END---)
```

13 nodes for the text-only flow, +4 nodes for the file/Vision branch. See [`design/workflow-graph.md`](./design/workflow-graph.md) for the full node graph.

**State lives in 3 layers:**
1. LangChain Window Buffer Memory (last 50 turns, in-memory)
2. Inline JSON in every agent reply (working scratchpad)
3. Google Sheet row (durable, source of truth, upsert by Telegram_ID)

If n8n redeploys → layer 1 is lost, but Sheet row survives. On next user message, Lookup History reads the row and the agent picks up where it left off.

## Why this design (vs. simpler alternatives)

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| Single LLM call per message, no memory | Simplest | No multi-turn coherence | ❌ — won't work for data collection |
| Memory only, no Sheet | Simple state | State lost on redeploy; no human handoff | ❌ — doesn't satisfy "handoff" requirement |
| Structured output (`ai_outputParser`) | Schema enforced | Provider-specific, more brittle for students | Save for v2 |
| Tool calling (`ai_tool` for save_state) | Clean separation | More connections, more places to make mistakes | Save for v2 |
| **Inline JSON + memory + Sheet** | Pedagogically clear, debuggable, works on any LLM | Brittle if agent forgets JSON block (mitigated by 3× repeated rule in prompt) | ✅ **chosen** |

## Module 14 group-project flow (60 min × 4 groups)

Each group:

1. **Pick scenario** (5 min) — kredit / depozit / HR / komplaens / their own
2. **Fill placeholders** (10 min) — fork `prompts/system-prompt.md`, fill `{DEPARTMENT}`, `{USE_CASE}`, `{ENTITY_TYPES}`, `{STAGE_3_FIELDS}`, `{REQUIRED_DOCS}`
3. **Customize Sheet schema** (5 min) — rename `field_1`...`field_6` to scenario-specific column names
4. **Build the workflow** (30 min) — instructor demos one group's build live; others follow on the same template
5. **Test with mock customer** (5 min) — run 5+ test conversations, verify Sheet row, verify validations
6. **Showcase** (5 min) — each group demos their bot in the final 5 min

For module 15 (Taqdimot): each group demos their agent live for 10 min + Q&A.

## Mas'uliyat chegarasi (compliance — must be in every group's bot)

Bot **never** finalizes a banking decision. Every flow ends with:
> *"Bu masala bo'yicha yakuniy qarorni bizning bankir hamkasbim qabul qiladi. Men shu uchun ma'lumotlarni yig'aman."*

This is the compliance line from [`1_deck`](../../1_deck/) slide 7 (Can/Cannot) and slide 11 (Security), made operational at every conversation turn. Hard-coded in the system prompt; not optional.

## Implementation TBD

Once design is signed off:

- [ ] `workflow.example.json` — n8n export (text-only flow, 13 nodes)
- [ ] `workflow-with-vision.example.json` — extended export (17 nodes, file branch)
- [ ] `prompts/examples.md` — 3 sample full conversations (one per scenario) for grading rubric
- [ ] `templates/schema-customizer.md` — fill-in-the-blanks template for student groups
- [ ] `docs/test-fixtures/` — synthetic customer profiles for testing (NOT real)

## Series terminology hooks

Module 14 closing slide should recap:
- **MVP** (Minimum Mahsulot) — "we built the smallest thing that proves the value"
- **Iteration** — "v1 has rough edges; we'll iterate after pilot"

Module 15 (Taqdimot) closes with the **full course glossary review** — all 30+ atama from modules 1–14 (see [`cb_decks/CLAUDE.md`](../../CLAUDE.md) Terminologiya qoidasi).

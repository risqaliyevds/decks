# Bot 03 · n8n Workflow Graph

13 nodes, 1 entry, 1 main loop, 2 branches (text vs file). Built on the **AI Agent Workflow** pattern (n8n-workflow-patterns skill).

## Full graph (ASCII)

```
                        ┌────────────────────────┐
                        │  Telegram Trigger      │  (1)
                        │  events: message,      │
                        │          callback_query│
                        └───────────┬────────────┘
                                    ↓
                        ┌────────────────────────┐
                        │  Parse Input  (Set)    │  (2)
                        │  → chat_id             │
                        │  → user_message        │
                        │  → has_file (bool)     │
                        │  → callback_data       │
                        └───────────┬────────────┘
                                    ↓
                        ┌────────────────────────┐
                        │  Branch: Text / File ? │  (3)
                        │       (Switch)         │
                        └─────┬──────────────┬───┘
                              │              │
                       TEXT  ↓              ↓  FILE
                ┌─────────────────┐    ┌──────────────────┐
                │ Lookup History  │(4) │ Download File    │ (4F)
                │ (Sheet · Read)  │    │ (Telegram · GET) │
                │ get current     │    └────────┬─────────┘
                │ ariza row       │             ↓
                └────────┬────────┘    ┌──────────────────┐
                         ↓             │ Save to Drive    │ (5F)
                ┌─────────────────┐    │ (Drive · Upload) │
                │ Format Context  │(5) └────────┬─────────┘
                │   (Code)        │             ↓
                │ build prompt    │    ┌──────────────────┐
                │ injection with  │    │ Vision Analysis  │ (6F)
                │ existing state  │    │ (Gemini Vision · │
                └────────┬────────┘    │  image/analyze)  │
                         ↓             │ → quality_score  │
                ┌─────────────────┐    │ → fields         │
                │   AI AGENT      │(6) │ → verdict        │
                │ ┌─────────────┐ │    └────────┬─────────┘
                │ │ Gemini Chat │ │             ↓
                │ │ Model (LM)  │ │    ┌──────────────────┐
                │ └─────────────┘ │    │ Save Hujjat row  │ (7F)
                │ ┌─────────────┐ │    │ (Sheet · Append) │
                │ │ Window Buf. │ │    └────────┬─────────┘
                │ │ Memory      │ │             │
                │ │ key=chat_id │ │             │
                │ │ window=50   │ │             │
                │ └─────────────┘ │             │
                │ NO TOOLS —      │             │
                │ uses inline     │             │
                │ JSON state      │             │
                └────────┬────────┘             │
                         ↓                       │
                ┌─────────────────┐              │
                │ Parse JSON      │ (7)          │
                │ Block (Code)    │              │
                │ extract state   │              │
                │ from markers    │              │
                └────────┬────────┘              │
                         ↓                       │
                ┌─────────────────┐              │
                │ Save Ariza Row  │ (8)          │
                │ (Sheet ·        │              │
                │  appendOrUpdate │              │
                │  by chat_id)    │              │
                └────────┬────────┘              │
                         ↓                       │
                         │ ←───────── Merge ─────┘
                         ↓
                ┌─────────────────┐
                │ Send Reply      │ (9)
                │ (Telegram)      │
                │ + buttons if S1 │
                │   or S5         │
                └────────┬────────┘
                         ↓
                       [END]
```

## Node inventory (13 nodes minimum)

| # | Node | Type | Purpose |
|---|---|---|---|
| 1 | Telegram Trigger | `n8n-nodes-base.telegramTrigger` | Receive message + callback_query |
| 2 | Parse Input | `n8n-nodes-base.set` | Normalize text/file/callback into uniform fields |
| 3 | Branch: Text/File | `n8n-nodes-base.switch` | Route on `has_file` boolean |
| 4 | Lookup History | `n8n-nodes-base.googleSheets` | Read existing ariza row by chat_id |
| 5 | Format Context | `n8n-nodes-base.code` | Build `[TIZIM: …]` injection telling agent which fields filled, which docs uploaded |
| 6 | AI Agent | `@n8n/n8n-nodes-langchain.agent` | Orchestrate dialogue |
| 6a | Gemini Chat Model | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | LLM (connected via `ai_languageModel`) |
| 6b | Window Buffer Memory | `@n8n/n8n-nodes-langchain.memoryBufferWindow` | last 50 turns (connected via `ai_memory`) |
| 7 | Parse JSON Block | `n8n-nodes-base.code` | Extract `---JSON_START---…---JSON_END---` from agent reply |
| 8 | Save Ariza Row | `n8n-nodes-base.googleSheets` | `appendOrUpdate` by Telegram_ID |
| 9 | Send Reply | `n8n-nodes-base.telegram` | Send agent's text reply (without JSON block) |

## File branch (4F–7F, +4 nodes)

| # | Node | Type | Purpose |
|---|---|---|---|
| 4F | Download File | `n8n-nodes-base.telegram` (file_id) | Download user's PDF/image |
| 5F | Save to Drive | `n8n-nodes-base.googleDrive` | Persist file with metadata |
| 6F | Vision Analysis | `@n8n/n8n-nodes-langchain.googleGemini` (resource: image, op: analyze) | OCR + quality check |
| 7F | Save Hujjat row | `n8n-nodes-base.googleSheets` | Append to Hujjatlar sheet |

After 7F, merge back into the main flow at node 5 (Format Context) so the agent sees the new file in next turn.

## Connections (n8n connection syntax)

Main connections (`main` ports):
```
1 → 2 → 3
3.true (text) → 4 → 5 → 6 → 7 → 8 → 9
3.false (file) → 4F → 5F → 6F → 7F → 5  (loop back to text branch)
```

AI connections (`ai_languageModel`, `ai_memory` ports):
```
6a → 6 (ai_languageModel)
6b → 6 (ai_memory)
```

No `ai_tool` connections in v1 — agent uses inline JSON state instead of tool calls. Simpler for students; can add tools later.

## Why no tools in v1?

The pattern guide says ANY node can be an `ai_tool`. We could give the agent:
- A `Sheet write tool` (let agent save state itself)
- A `RAG search tool` (look up reference info — bank tariffs, internal policies)

But for module 14 (group project, 60 min), each tool adds complexity. Inline JSON pattern lets students build something working faster, and the same retrieval/save logic happens in deterministic nodes around the agent.

**v2 (advanced groups, optional):** add a RAG search tool over the bank's tariff PDF. Then the agent can recommend products in the final S5 confirmation. But not required for the base build.

## Validation gates (before activate)

Use `n8n-validation-expert` skill. Common checks:
- All `ai_*` connections terminate at correct port indices
- Telegram credentials present, not in parameters
- Google Sheets `appendOrUpdate` has `matchColumn: Telegram_ID` configured
- Code nodes have proper `return [{ json: ... }]` shape
- Sheet IDs in node configs match the spreadsheet schema (see `data-schema.md`)
- Gemini model name is current (avoid `gemini-pro` which is deprecated; use `gemini-2.5-flash` or `gemini-2.5-pro`)

## Estimated complexity

| Metric | Value |
|---|---|
| Total nodes | 13 (text-only) / 17 (with file branch) |
| AI sub-nodes | 2 (Gemini Chat Model, Window Buffer Memory) |
| Code nodes | 2 (Format Context, Parse JSON) |
| Estimated build time (instructor) | 90 min |
| Estimated build time (student group, simplified) | 60 min |

For comparison: Bank_Kredit_Boti has 27 nodes (with captcha gate, 2 Vision branches, more Code logic). Our simplified version drops captcha (not needed for internal CB use) and keeps file branch optional.

# Bot 02 · n8n Workflow Graph

11 nodes on the voice path, 4 on the text-command branch. Built on the **AI Agent Workflow** + **Webhook Processing** patterns (no agent loop — single-shot pipeline). Pattern document: `~/.claude/skills/n8n-workflow-patterns/ai_agent_workflow.md`.

## Full graph (ASCII)

```
                       ┌──────────────────────────┐
                       │  Telegram Trigger        │  (1)
                       │  events: message,        │
                       │          callback_query  │
                       │  receive: voice ∪ text   │
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  Parse Input  (Set)      │  (2)
                       │  → chat_id               │
                       │  → input_type            │
                       │    voice | text | callback│
                       │  → file_id (if voice)    │
                       │  → text (if text)        │
                       │  → callback_data         │
                       │  → ts (server timestamp) │
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  Switch · input_type     │  (3)
                       └──┬─────────┬─────────┬───┘
                          │         │         │
                   VOICE  ↓   TEXT  ↓ CALLBACK↓
                  ┌──────────┐ ┌──────────┐ ┌────────────┐
                  │ Download │ │ Switch:  │ │ Handle     │
                  │ Voice    │ │ command  │ │ Callback   │
                  │   (4V)   │ │   (4T)   │ │   (4C)     │
                  └─────┬────┘ └─┬──┬──┬─┘ └──────┬─────┘
                        ↓        │  │  │           │
                  ┌──────────┐  /recent /search /help│
                  │ Save to  │   │  │  │           │
                  │ Drive    │   ↓  ↓  ↓           │
                  │ (audio)  │  ┌────────────┐     │
                  │   (5V)   │  │ Sheet read │     │
                  └─────┬────┘  │ + format   │     │
                        ↓       │   (5T)     │     │
                  ┌──────────┐  └─────┬──────┘     │
                  │ Gemini   │        │            │
                  │ Audio    │        ↓            │
                  │ Transcribe│  ┌────────────┐    │
                  │   (6V)   │  │ Send Reply │    │
                  └─────┬────┘  │   (6T)     │    │
                        ↓       └────────────┘    │
                  ┌──────────┐                     │
                  │ Save     │ ← (Sheet:           │
                  │ Transcript│   Transcripts,     │
                  │ Draft(7V)│    append)          │
                  └─────┬────┘                     │
                        ↓                           │
                  ┌──────────┐                     │
                  │ Extract  │ (Gemini Chat —      │
                  │ Fields   │  single LLM call,   │
                  │   (8V)   │  emits JSON only)   │
                  └─────┬────┘                     │
                        ↓                           │
                  ┌──────────┐                     │
                  │ Parse    │ (Code — validate    │
                  │ JSON     │  schema, compute    │
                  │   (9V)   │  next_step_date)    │
                  └─────┬────┘                     │
                        ↓                           │
                  ┌──────────┐                     │
                  │ Save     │ (Sheet: Meetings,   │
                  │ Meeting  │  append)            │
                  │  (10V)   │                     │
                  └─────┬────┘                     │
                        ↓                           │
                  ┌──────────┐                     │
                  │ Send     │ (Telegram —         │
                  │ Confirm  │  formatted reply)   │
                  │  (11V)   │                     │
                  └─────┬────┘                     │
                        ↓ ←───────────────────────┘
                      [END]
```

## Node inventory · main voice path (11 nodes)

| # | Node | n8n type | Purpose |
|---|---|---|---|
| 1 | Telegram Trigger | `n8n-nodes-base.telegramTrigger` | Receive voice + text + callback_query |
| 2 | Parse Input | `n8n-nodes-base.set` | Detect input type, normalize fields |
| 3 | Switch input_type | `n8n-nodes-base.switch` | Route to V / T / C branch |
| 4V | Download Voice | `n8n-nodes-base.telegram` (op: getFile) | Pull voice binary |
| 5V | Save to Drive | `n8n-nodes-base.googleDrive` | Archive `voice/{chat_id}/{ts}.ogg` |
| 6V | Gemini Audio Transcribe | `@n8n/n8n-nodes-langchain.googleGemini` (resource: audio, op: transcribe) | OGG → Uzbek text |
| 7V | Save Transcript Draft | `n8n-nodes-base.googleSheets` (append) | Sheet: `Transcripts`, status: `draft` |
| 8V | Extract Fields | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` + structured prompt | LLM call, returns JSON-only |
| 9V | Parse JSON | `n8n-nodes-base.code` | Validate schema, normalize date strings (`ertaga` → ISO) |
| 10V | Save Meeting | `n8n-nodes-base.googleSheets` (append) | Sheet: `Meetings`, structured row |
| 11V | Send Confirmation | `n8n-nodes-base.telegram` (op: sendMessage) | Formatted reply with all fields + meeting_id |

## Node inventory · text command branch (3 nodes)

| # | Node | Purpose |
|---|---|---|
| 4T | Switch · command | Route on `/recent`, `/search`, `/help` |
| 5T | Sheet Read + Format | Query `Meetings` sheet (last 5 / by query / static help) |
| 6T | Send Reply | Telegram message |

## Node inventory · callback branch (1 node, simple v1)

| # | Node | Purpose |
|---|---|---|
| 4C | Handle Callback | Parse `callback_data`, ack via Telegram, route to action (e.g. delete meeting, mark wrong) |

In v1, callbacks are minimal — just ack + delete. Richer callback handling (edit transcript, re-run extraction with hint) is v2.

## Connections (n8n syntax)

Main connections (`main` ports):
```
1 → 2 → 3
3.output[0] (voice)    → 4V → 5V → 6V → 7V → 8V → 9V → 10V → 11V
3.output[1] (text)     → 4T → 5T → 6T
3.output[2] (callback) → 4C → 11V (reuses confirm node, with adapted params)
```

No `ai_*` connections in v1 — both LLM calls (audio transcribe + field extract) are direct googleGemini node calls, not Agent-with-tools. Simpler for students.

## Why a single LLM call for extraction (no Agent loop)?

Bot 02 is a **deterministic pipeline**, not an agent.

| Pattern | Bot uses it? | Why / why not |
|---|---|---|
| AI Agent (LM + tools + memory) | ❌ | No tools needed — extraction is one shot. No memory needed — single-turn. |
| `ai_outputParser` for schema | ⚠️ optional | Could enforce JSON schema. v1 uses plain prompt; v2 add parser. |
| Window Buffer Memory | ❌ | Single-turn — no conversation context |
| Inline JSON state | ❌ | No multi-turn state to track |
| **Direct Gemini Chat call** | ✅ | One prompt, transcript in, JSON out. Code node parses. |

This is intentional — bot 02 teaches **pipeline composition** (multi-step processing of one input), bot 03 teaches **stateful agent loops**. Different patterns.

## Validation gates (before activate)

Use `n8n-validation-expert` skill:
- Telegram Trigger has both `message` AND `callback_query` events enabled
- Switch node has 3 outputs configured (voice/text/callback)
- Drive folder ID exists and bot's service account has write
- Audio transcribe resource is `audio`, not `image` (common copy-paste mistake from doc analyzer)
- Extraction prompt template uses `{{$json.transcript_text}}` (n8n-expression-syntax)
- Code node returns `[{ json: ... }]` shape (single item array)
- Sheet `appendRow` has correct column → field mapping (drift-prone if Sheet schema changes)
- Gemini model is current — `gemini-2.5-flash` or `gemini-2.5-pro` (avoid deprecated `gemini-pro`)

## Idempotency note

Telegram occasionally re-delivers messages on network blips. Bot must not double-save.

Approach: in node 7V (Save Transcript Draft), include a unique key combining `chat_id + voice file_id + ts`. The Sheet `appendRow` becomes `appendOrUpdate` matched on that key. If the same voice memo is re-delivered, the Sheet row is updated, not duplicated.

This is the **idempotent design** terminology hook for module 12 (cb_decks/CLAUDE.md ≥2 atama qoidasi).

## Estimated complexity

| Metric | Value |
|---|---|
| Total nodes (voice path only) | 11 |
| Total nodes (with text commands) | 14 |
| LLM calls per voice memo | 2 (transcribe + extract) |
| Approx Gemini cost per memo | ~$0.005 (cheap) |
| Build time (instructor demo) | ~75 min |
| Build time (student in module 12) | ~50 min following the live build |

Compared to Bot 03 (Bank_Kredit_Boti's 27-node workflow) and Bot 01 (~6 nodes baseline), Bot 02 sits at the middle complexity — appropriate for module 11–12 positioning.

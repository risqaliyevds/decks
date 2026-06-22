# 01 — Classifier bot (BankYordamchi)

The simplest possible AI agent for bankers. **3 services, 7 nodes, no code.**

> Used in module 9 (`9_deck/`) as the live student-build target. Replaces the earlier voice-memo bot (deprecated 2026-05-10) — bankers can grasp this end-to-end in 15 minutes.

## What it does

Customer sends a Telegram message describing a bank-related need. The bot:

1. Classifies the message into one of 5 categories (`kredit`, `karta`, `depozit`, `shikoyat`, `info`).
2. Extracts a clean subject line + the full details + an urgency flag.
3. Looks up the `Operators` sheet for an active operator in the matching category.
4. Saves a complete row to the `Applications` sheet (with the matched operator's name + contact).
5. Replies to the customer in Uzbek: *"Arizangiz qabul qilindi (ID: 12). Sizning operator: Aziza Karimova. Kontakt: +998 90 ... 24 soat ichida bog'lanadi."*

## Why it's the demo bot

- **3 integrations only:** Telegram + Gemini + Google Sheets. Nothing else.
- **7 nodes total.** No state machine, no admin commands, no vector store. Pure flow.
- **Operators sheet is filled by the user** (the bank). Application sheet is filled by the bot. Match is automatic by category.
- **Demonstrably useful** — even at 7 nodes, the bot does real work: triages incoming customer requests, attaches an operator, and tells the customer who's handling them.
- **No code.** Every node is configured via the n8n UI. The only "code" is the system prompt for the AI.

## Architecture (one diagram, all you need)

```
[Telegram Trigger]
        ↓
[Basic LLM Chain]      ← attached: Gemini Chat Model (temperature 0.2)
        ↓                  outputs JSON: {category, subject, details, urgency}
[Sheets: Read Operators] ← filter: category={{$json.category}}, active=TRUE
        ↓
[Code: Pick Operator]    ← first active operator (or "unassigned" placeholder)
        ↓
[Sheets: Append Application] ← row with timestamp, user, category, subject, details, urgency, operator_*
        ↓
[Set: Format Reply]      ← Uzbek confirmation text
        ↓
[Telegram: Send Reply]
```

That's the entire bot.

## Folder map

```
01_classifier_bot/
  README.md                          ← you are here
  design/
    workflow-graph.md                ← 7-node graph in detail
    data-schema.md                   ← Applications + Operators sheet schema
    conversation-flow.md             ← 5 example end-to-end conversations
  prompts/
    system-prompt.md                 ← the Uzbek classifier prompt for Gemini
  workflow/
    classifier_bot.workflow.js       ← (optional) n8n SDK code, equivalent to UI build
  prompt/                            ← AI-recreation prompts (for rebuilding from scratch)
    README.md
    00-MASTER-PROMPT.md              ← single-shot prompt for an MCP-equipped AI
    01-overview.md
    02-credentials-and-sheets.md
    03-workflow-spec.md
    04-system-prompt.md
    05-validation.md
```

## How to use this folder

| Goal | Read |
|---|---|
| **Understand the bot in 5 min** | This README |
| **Build it in n8n by hand** | `design/workflow-graph.md` + `design/data-schema.md` + `prompts/system-prompt.md` |
| **Have an AI rebuild it** | `prompt/00-MASTER-PROMPT.md` |
| **See sample customer conversations** | `design/conversation-flow.md` |
| **Verify a fresh build** | `prompt/05-validation.md` |

## Non-goals (deliberately not in this bot)

- **No multi-turn memory.** Each user message = one new application. (For multi-turn, see module 12 on Pipelines.)
- **No admin slash-commands.** No `/list`, `/delete`, `/reindex`. Operators are managed by editing the Sheets directly.
- **No RAG.** The bot doesn't read PDFs. (For RAG, see module 11 with `02_rag_chatbot/`.)
- **No vector store.** Pure classification + lookup.

When the seminar audience graduates from this bot, modules 10–14 add: agents, RAG, multi-step pipelines, complex agents.

## Comparison to the RAG bot

| Aspect | `01_classifier_bot/` (this) | `02_rag_chatbot/` (deck 11) |
|---|---|---|
| Nodes | 7 | 77 |
| Integrations | 3 (Telegram, Gemini, Sheets) | 5 (+ Drive, Vector Store) |
| State | none | 5-state machine |
| AI pattern | structured-output classifier | RAG agent with tool use |
| Bankir build time | ~15 min | ~2 hours guided |
| Module pairing | deck 9 (first AI workflow) | deck 11 (agent design) |

The classifier is the *"hello world"* of AI agents. The RAG bot is what bankers graduate to.

# cb_decks · bots

Working bots and bot-blueprints for the Central Bank seminar series. **Three bots total**, ordered from simplest to most complex. Each teaches a distinct AI capability.

> **Common stack:** Telegram (chat surface) → **n8n** (orchestration · qo'llar) → **Gemini** (LLM · miya) → **Google Sheets** / Drive / RAG (korporativ xotira). No code is written by users.

## Mapping to modules (updated 2026-05-10)

| # | Folder | Bot | Mental model | Built by | Used in module(s) | Complexity |
|---|---|---|---|---|---|---|
| 1 | `01_classifier_bot/` | **BankYordamchi** — message classifier + operator matcher | *AI tushunadi va to'g'ri operatorga yo'naltiradi* | Students (in module 9) — **demo bot** | 9-deck (student build, primary demo) | **7 nodes** — easiest |
| 2 | `02_rag_chatbot/` | **BankRAGBoti** — multi-document Q&A with admin commands | *AI o'qiydi va manbasi bilan javob beradi* | Instructor (live demo) **and** students (in module 11) | 1-deck slide 5 (Live demo) · 11-deck (RAG chatbot deep dive) | **77 nodes** — production grade |
| 3 | `03_complex_agent/` | **Murakkab agent** — multi-turn data + document collector with handoff | *AI suhbat o'tkazadi va ish bajaradi* | Students (group project) | 14-deck (Guruhli loyiha) | Production-plus |

**Progression:** classifier (7 nodes, 1 day) → RAG (77 nodes, 2 days guided) → complex agent (group project).

## Renaming history (2026-05-10)

The folder layout was reorganized to match the seminar's pedagogical progression:

| Old folder | New folder | Reason |
|---|---|---|
| `01_rag_basics/` | `02_rag_chatbot/` | Originally pair for module 9; moved to module 11 since the simpler classifier replaces it as module 9's demo |
| `02_voice_memo/` | (deleted) | The voice-memo bot was too complex to demo cleanly. Module 11 now teaches RAG instead of voice. |
| (new) | `01_classifier_bot/` | Brand-new bot designed for module 9 — the simplest possible AI agent (3 services, 7 nodes, no code) |
| `03_complex_agent/` | unchanged | Still pairs with module 14 |

## Live n8n workflows (in user's cloud)

| Workflow | ID | Purpose | Status |
|---|---|---|---|
| `BankYordamchi` | (TBD — to be created) | Bot 01 — **7 nodes**, classifier + operator matcher. Uses Gemini + Telegram + Google Sheets. | Not yet built |
| `BankRAGBoti` | `kLcPx1CZX9RwH1z8` | Bot 02 — **77 nodes, 75 connections.** Telegram trigger drives Q&A + admin paths; Manual Trigger handles ingestion. | Active |
| `BankAgentBoti` | `LgTS2iOkARv4B1cL` | Bot 03 — multi-turn agent | Not active |
| ~~`BankVoiceBoti`~~ | ~~`qVHTRhFThYa8F8cV`~~ | (deprecated 2026-05-10 — voice bot dropped from curriculum) | Archive only |

## Models in use

- **Chat / agent:** `models/gemini-3-flash-preview` (all bots).
- **Embeddings (RAG bot only):** `models/gemini-embedding-001` (Bot 02 query + ingestion — must match).
- ⚠ **Don't use:** `text-embedding-004` (retired Q1 2026, returns 404), bare `gemini-3-flash` (no `-preview`, 404).

Three distinct AI capabilities — **classify · retrieve · act**. Clean progression.

## Folder convention (per bot)

```
NN_botname/
  README.md                  ← what it does, setup steps, demo flow
  design/                    ← workflow graph + data schema + sample conversations
    workflow-graph.md
    data-schema.md
    conversation-flow.md
  prompts/                   ← Gemini system prompts (Uzbek)
    system-prompt.md
  workflow/                  ← (optional) n8n SDK code, equivalent to UI build
  prompt/                    ← AI-recreation prompts for rebuilding from scratch
    README.md
    00-MASTER-PROMPT.md      ← single-shot for an MCP-equipped AI
    [01..NN]-chain-*.md      ← per-chain spec (only for complex bots)
```

The classifier (Bot 01, 7 nodes) keeps a tiny `prompt/` (just README + master). The RAG bot (Bot 02, 77 nodes) has 14 files in `prompt/` because the complexity warrants chunking.

## Secrets handling

**Never commit:**
- API keys (Gemini, OpenAI, Telegram bot tokens)
- Real bank PDFs with client data, internal pricing, or sensitive policies
- Customer messages from production bots

**OK to commit:**
- Synthetic / public-domain PDFs
- n8n workflows with credentials replaced by `{{credential_id}}` placeholders
- System prompts and example Q&A in Uzbek
- Setup READMEs

For local dev, put real keys in `decks/cb_decks/bots/.env` (already in `.gitignore`):

```
GEMINI_API_KEY=...
TELEGRAM_BOT_TOKEN_CLASSIFIER=...
TELEGRAM_BOT_TOKEN_RAG=...
N8N_HOST=https://your-n8n.example.com
```

## Series-wide design notes

- All bots answer in **Uzbek** by default. System prompts enforce this and adapt to the user's alphabet (latin/cyrillic).
- The **classifier bot** (Bot 01) doesn't use RAG at all — it just classifies + lookups. RAG is taught in module 11 with Bot 02.
- The **RAG bot** (Bot 02) and **complex agent** (Bot 03) both stay grounded in instructor-provided PDFs — no web search, no general-knowledge fallback.
- Compliance line consistent across all 3 bots: *"Bot — yordamchi, yakuniy qaror bankir zimmasida."* Ties directly to `1_deck` slide 16 (security) and `cb_decks/CLAUDE.md` Terminologiya qoidasi.
- Each bot's curriculum module recaps ≥2 AI atama in its closing slide. See `cb_decks/CLAUDE.md` for the canonical 28-atamalar mapping.

## Why three bots, not one

The seminar's structure requires bankers to graduate from "this is just AI in a chat" to "AI is a workflow node":

- **Bot 01 (classifier)** proves AI can take a free-form message and produce **structured data**. Banker insight: *"Oh, this could replace 80% of my email triage."*
- **Bot 02 (RAG)** proves AI can stay grounded in **the bank's own documents** with cited sources. Banker insight: *"Compliance + audit are achievable with AI."*
- **Bot 03 (complex agent)** proves AI can run **multi-step processes** with handoffs to humans. Banker insight: *"This is more than chat — this is an automation backbone."*

Each bot answers a different concern bankers actually have.

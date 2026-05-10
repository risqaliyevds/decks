# cb_decks · bots

Working bots and bot-blueprints for the Central Bank seminar series. **Three bots total**, each teaching a distinct AI capability. Three modalities: read · listen · converse.

> **Common stack across all 3:** Telegram (chat surface) → **n8n** (orchestration · qo'llar) → **Gemini** (LLM · miya) → **RAG** / Sheets / Drive (korporativ xotira). No code is written by users.

## Mapping to modules

| # | Folder | Bot | Mental model | Built by | Used in module(s) |
|---|---|---|---|---|---|
| 1 | `01_rag_basics/` | **RAG asoslari** — single PDF Q&A, USER + ADMIN roles | *AI o'qiydi va javob beradi* | Instructor (demo) **and** students (in module 9) | 1-deck slide 3 (Hook · live demo) · 9-deck (student build) |
| 2 | `02_voice_memo/` | **Voice memo → CRM** — bankir voice → transcribe → extract → log | *AI eshitadi va yozib qoldiradi* | Students | 11-deck, 12-deck |
| 3 | `03_complex_agent/` | **Murakkab agent** — multi-turn data + document collector with handoff | *AI suhbat o'tkazadi va ish bajaradi* | Students (group project) | 14-deck (Guruhli loyiha) |

## Live n8n workflows (in user's cloud)

| Workflow | ID | Purpose |
|---|---|---|
| `BankRAGBoti` | `kLcPx1CZX9RwH1z8` | Bot 01 — **24 nodes, 2 chains.** Telegram trigger drives the Q&A path; Manual Trigger ("Hujjat indeksini yangilash") drives the ingest path. Both share `memoryKey: bank_pdf_corpus`. |
| `BankVoiceBoti` | `qVHTRhFThYa8F8cV` | Bot 02 — voice memo → CRM |
| `BankAgentBoti` | `LgTS2iOkARv4B1cL` | Bot 03 — multi-turn agent |

Three workflows, all inactive. Each uses the user's existing Google Drive / Sheets / Gemini credentials, plus per-workflow Telegram credentials (`BankRAGBoti`, `BankVoiceBoti`, `BankAgentBoti`).

**Note:** Bot 01 was originally split across two workflows (`BankRAGBoti` + `BankRAGBotiIngest`). On 2026-05-08 they were merged into a single workflow with two parallel chains so non-technical bank staff see one cohesive bot. `BankRAGBotiIngest` has been archived.

## Models in use (verified live, 2026-05-08)

- **Chat / agent:** `models/gemini-3-flash-preview` (Bot 01, Bot 03), `models/gemini-3-flash-preview` (Bot 02 chat + audio transcribe).
- **Embeddings:** `models/gemini-embedding-001` (Bot 01 query + Ingest insert — must match).
- ⚠ **Don't use:** `text-embedding-004` (retired Q1 2026, returns 404), bare `gemini-3-flash` (no `-preview`, also 404).

Three distinct AI capabilities — **read · listen · act**. Clean progression.

Bot 01 has two contexts (instructor demo for module 1, student build for module 9) but is the **same workflow** — see its README. It also has two roles: USER (asks questions) and ADMIN (manages corpus via `/add_doc`, `/delete_doc`, `/reindex`).

## Folder convention (per bot)

```
NN_botname/
  README.md                what it does, setup steps, demo flow
  workflow.example.json    n8n workflow export (with placeholder credentials)
  prompts/
    system.md              Gemini system prompt
    examples.md            sample Q&A pairs / few-shot
  docs/                    sample PDFs the bot queries (synthetic / public — never real client data)
```

`workflow.example.json` is the n8n template — credentials/API keys stripped. To run, import into n8n and add your own Gemini API key + Telegram bot token via n8n credentials, then activate.

## Secrets handling

**Never commit:**
- API keys (Gemini, OpenAI, Telegram bot tokens)
- Real bank PDFs containing client data, internal pricing, or sensitive policies
- Customer messages from production bots

**OK to commit:**
- Synthetic / public-domain PDFs (e.g. publicly available bank product brochures, generic templates)
- n8n workflows with credentials replaced by `{{credential_id}}` placeholders
- System prompts and example Q&A in Uzbek
- Setup READMEs

For local dev, put real keys in a `.env` file at the project root (already in `.gitignore`):

```
GEMINI_API_KEY=...
TELEGRAM_BOT_TOKEN=...
N8N_HOST=https://your-n8n.example.com
```

## Series-wide design notes

- All bots answer in **Uzbek** by default. System prompts enforce this and adapt to the user's alphabet (latin/cyrillic).
- All bots run on **RAG over instructor-provided PDFs** — no live web search, no general-knowledge fallback. If the PDF doesn't contain the answer → *"Ushbu hujjatda ma'lumot topilmadi"*.
- Compliance line is consistent across all 3 bots: *"Bot — yordamchi, yakuniy qaror bankir zimmasida."* Ties directly to `1_deck` slide 7 (AI Can/Cannot) and slide 11 (Security).
- Each bot's `prompts/system.md` explicitly states the no-hallucination rule and the answer language.
- Each bot's curriculum module recaps ≥2 AI atama in its closing slide (see `cb_decks/CLAUDE.md` Terminologiya qoidasi).

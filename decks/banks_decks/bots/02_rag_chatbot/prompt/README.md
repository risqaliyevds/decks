# BankRAGBoti — n8n recreation prompts

These prompts let any AI agent (with n8n MCP access — or a human following step-by-step) recreate the **BankRAGBoti** workflow exactly, producing a bit-for-bit identical n8n workflow on n8n.cloud or self-hosted.

The original lives at `https://risqaliyevds.app.n8n.cloud/workflow/kLcPx1CZX9RwH1z8` (workflow ID `kLcPx1CZX9RwH1z8`). It has **77 nodes / 75 connections** and powers the live demo bot in module 1 + the student-build target in module 9 of the Central Bank seminar series.

## What the bot does (one-line)

Telegram-based RAG chatbot for **Ipak Yo'li Bank** credit info: customers ask questions in Uzbek; bot answers strictly from indexed bank PDFs with a source citation. Admins can add, list, delete, reindex documents through slash commands.

## Files in this folder

| File | Purpose | When to read |
|---|---|---|
| **`00-MASTER-PROMPT.md`** | Single self-contained prompt covering everything below | One-shot recreation by an MCP-equipped AI agent |
| `01-overview-and-mental-model.md` | What the bot does, audience, command map, behavior, mental model | Read first — explains "why" |
| `02-credentials-and-sheets.md` | All credentials needed + Google Sheets schema + Drive folder | Before building anything |
| `03-chain-spine.md` | **Chain 1**: Telegram trigger → Parse → Lookup → Compute Route → Switch (6 nodes) | Build first — every other chain depends on Switch outputs |
| `04-chain-qa-rag.md` | **Chain 2**: Q&A AI Agent + Gemini Chat + Bank PDF Search + Vector Store + Embeddings (7 nodes) | The user-facing answer path |
| `05-chain-admin-simple.md` | **Chain 3**: Help / List / Stats / Cancel (7 nodes — short paths) | Quick admin paths |
| `06-chain-admin-add-doc.md` | **Chain 4**: Add Doc — file upload + Drive + index + sheet append (13 nodes) | Most complex admin chain |
| `07-chain-admin-delete.md` | **Chain 5**: Delete Doc — list, pick, confirm, soft-delete (13 nodes) | Two-step admin chain |
| `08-chain-admin-reindex.md` | **Chain 6**: Reindex — re-embed all active docs in a loop (17 nodes) | Largest admin chain |
| `09-chain-egress.md` | **Chain 7**: Send Reply (1 node — convergence point for ALL chains) | Build last in the live workflow |
| `10-chain-initial-ingestion.md` | **Chain 8**: Manual Trigger bootstrap workflow (13 nodes — separate from Telegram) | Build last; standalone |
| `11-system-prompts.md` | Full text of the Q&A Agent system prompt + Bank PDF Search tool description | Embedded inside chain 04 — quoted here for review/translation |
| `12-validation.md` | Post-build smoke tests: send `/help`, ask a question, upload a file | After everything is built |

## Two ways to use these prompts

### Way 1 — One-shot, MCP-equipped AI

Paste **`00-MASTER-PROMPT.md`** into a session with an AI that has n8n MCP tools (`search_nodes`, `get_node_types`, `validate_workflow`, `create_workflow_from_code`). The AI builds the entire workflow in one go.

### Way 2 — Step-by-step, human-supervised

1. Read `01-overview-and-mental-model.md` to align on intent.
2. Set up everything in `02-credentials-and-sheets.md` (creds + Sheets tabs + Drive folder).
3. Build chains in this order: `03` → `04` → `09` → `05` → `06` → `07` → `08` → `10`.
   - The spine (`03`) is the foundation — Switch outputs reference all other chains.
   - The egress (`09`) — `Send Reply` — is the convergence point; build it before the chains that feed into it.
4. Run validation (`12`).

### Why the chains are split

- Each chain is independently testable.
- The Q&A path and admin paths share only Switch (input) and Send Reply (output) — clean modularity.
- The initial-ingestion workflow is logically separate (manual trigger, no Telegram dependency) and intentionally lives in the same n8n workflow file but with no flow connection to the Telegram trigger.

## What's NOT in these prompts

- **Actual credential values** — Telegram bot token, Google OAuth tokens, Gemini API key. The prompts tell you which credentials to create, not what their values are.
- **Real bank documents** — the live bot uses synthetic Ipak Yo'li Bank credit policy PDFs. Drop your own PDFs in the Drive folder.
- **The Telegram bot username** — `@bankragbot` is the original. Create your own bot with `@BotFather` and use that bot's token.

## Verification

After running through all chains, the workflow should match the original on these dimensions:

- **Node count:** exactly 77
- **Connection count:** 75 (including langchain `ai_languageModel`, `ai_tool`, `ai_vectorStore`, `ai_embedding` typed connections)
- **Trigger count:** 2 (Telegram trigger + Manual trigger for initial ingestion)
- **Behavior:** non-admin sends a question → answer cites a PDF source. Admin sends `/list_docs` → list of indexed docs.

See `12-validation.md` for the full checklist.

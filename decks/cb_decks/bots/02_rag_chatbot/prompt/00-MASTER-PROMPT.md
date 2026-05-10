# 00 — MASTER PROMPT (single self-contained spec)

Paste this entire file into one AI session that has n8n MCP tools. The AI will build the BankRAGBoti workflow end-to-end from this spec.

---

## Task

Recreate the BankRAGBoti n8n workflow, originally at `https://risqaliyevds.app.n8n.cloud/workflow/kLcPx1CZX9RwH1z8`. The output must be **functionally bit-for-bit identical**: 77 nodes, 75 connections (including 4 langchain typed connections — `ai_languageModel`, `ai_tool`, `ai_vectorStore`, `ai_embedding`), 2 triggers (Telegram + Manual), routing through a 14-output Switch, and a single converging `Send Reply` Telegram egress.

## What the bot does

A Telegram-based RAG chatbot for **Ipak Yo'li Bank** credit information.

- **Customers** (chat_id NOT in `Admins` sheet) ask credit questions in Uzbek (Latin or Cyrillic). Bot answers strictly from indexed PDFs in a Google Drive folder, citing the source. Never invents, never uses the internet.
- **Admins** (chat_id in `Admins` sheet) use slash commands to manage the document corpus: `/help /list_docs /stats /add_doc /delete_doc /reindex /cancel`.
- A separate **manual-trigger** workflow bootstraps the corpus from the Drive folder.

## Method (use the n8n MCP tools)

1. Call `get_sdk_reference` (or read `n8n://workflow-sdk/reference`) for SDK syntax.
2. Call `search_nodes` for these nodes you'll need: `telegramTrigger`, `telegram`, `set`, `code`, `googleSheets`, `googleDrive`, `switch`, `if`, `splitInBatches`, `manualTrigger`, `noOp`, `limit`, `agent` (langchain), `lmChatGoogleGemini`, `embeddingsGoogleGemini`, `vectorStoreInMemory`, `toolVectorStore`, `documentDefaultDataLoader`, `textSplitterRecursiveCharacterTextSplitter`.
3. Call `get_node_types` for ALL of the above to get exact parameter definitions.
4. Build the workflow code following the SDK reference + the spec below.
5. Call `validate_workflow` and fix any errors.
6. Call `create_workflow_from_code`.

## Prerequisites — set up before building

- Telegram bot via `@BotFather` → save token as `Telegram API` credential in n8n.
- Google Sheets spreadsheet with three tabs:
  - **`Admins`** (gid=0): columns `chat_id, name, added_at`. Pre-populate with your test admin chat_id.
  - **`AdminStates`**: columns `chat_id, state, entered_at, stash`. Empty.
  - **`Documents`**: columns `doc_id, file_name, drive_file_id, summary, added_at, is_active`. Empty.
- Google Drive folder for documents (empty or with synthetic PDFs).
- Google identity (OAuth2 or Service Account) with edit access to BOTH the spreadsheet and the folder → save as `Google Sheets OAuth2 API` and `Google Drive OAuth2 API` credentials.
- Gemini API key from `https://aistudio.google.com/apikey` → save as `Google PaLM` credential (or whatever n8n's current name is for Gemini).

## Constants (use as placeholders — replace with your IDs)

```
TELEGRAM_BOT_USER:    @your_bot_username  (the bot you created via @BotFather)
SHEETS_ID:            <your_spreadsheet_id>
DRIVE_FOLDER_ID:      <your_drive_folder_id>
GEMINI_EMBED_MODEL:   models/gemini-embedding-001
CHUNK_SIZE:           800
CHUNK_OVERLAP:        120
TOPK:                 5
LLM_TEMPERATURE:      0.3
AGENT_MAX_ITER:       5
STATE_EXPIRY_SECONDS: 3600
TELEGRAM_REPLY_CAP:   3500 chars (system prompt enforces)
```

---

## Architecture — the chain map

The workflow is a **routing spine** with **8 branches** that converge on a single Telegram egress, plus a **separate manual-trigger ingestion** workflow:

```
TELEGRAM TRIGGER → SPINE (chain 1) → SWITCH → ┐
                                              ├── chain 2: Q&A RAG (7 nodes)
                                              ├── chain 3: Admin simple — Help / List / Stats / Cancel (7 nodes)
                                              ├── chain 4: Admin Add Doc (13 nodes)
                                              ├── chain 5: Admin Delete (13 nodes)
                                              ├── chain 6: Admin Reindex (17 nodes)
                                              └── all converge on EGRESS (chain 7: Send Reply, 1 node)

MANUAL TRIGGER → chain 8: Initial ingestion (13 nodes, no Telegram involvement)
```

Total: 6 + 7 + 7 + 13 + 13 + 17 + 1 + 13 = **77 nodes**.

---

## Chain 1 — Spine (Telegram trigger → switch routing)

6 nodes that receive every Telegram message, look up admin status + pending state, decide a `route_key`, and Switch on it.

Build order:

1. **`Telegram Trigger`** (`n8n-nodes-base.telegramTrigger`, version 1.2) — receives all updates.
2. **`Parse Input`** (`n8n-nodes-base.set`) — extracts `chat_id`, `text`, `command`, `file_name`, `has_file`, `file_id` from the Telegram message into a flat object.
3. **`Lookup Admins`** (`n8n-nodes-base.googleSheets`, operation `read`) — read `Admins` tab, filter where `chat_id` equals `={{ $json.chat_id }}`. Returns 0 or 1 row.
4. **`Lookup AdminStates`** (`n8n-nodes-base.googleSheets`, operation `read`) — read `AdminStates` tab, filter same way. Returns 0 or 1 row with `state, entered_at, stash`.
5. **`Compute Route`** (`n8n-nodes-base.code`) — JS code that:
   - Determines `isAdmin` from Lookup Admins row presence.
   - Reads `pendingState`, `enteredAt`, `stash` from Lookup AdminStates.
   - Computes `stateExpired` if `Date.now() - new Date(enteredAt).getTime() > 3600 * 1000`.
   - If expired, treats state as `IDLE`.
   - Decides `routeKey`:
     - Non-admin → `qa`
     - `/cancel` → `admin_cancel`
     - `AWAITING_DOC` + `hasFile` → `admin_add_doc_file`
     - `AWAITING_DOC` (no file) → `admin_add_doc_waiting`
     - `AWAITING_DELETE_NUM` → `admin_delete_doc_num`
     - `AWAITING_DELETE_CONFIRM` → `admin_delete_doc_confirm`
     - `REINDEX_CONFIRM` → `admin_reindex_confirm`
     - `/help` → `admin_help`
     - `/list_docs` → `admin_list_docs`
     - `/add_doc` → `admin_add_doc_init`
     - `/delete_doc` → `admin_delete_doc_init`
     - `/reindex` → `admin_reindex_init`
     - `/stats` → `admin_stats`
     - default → `qa`
   - Returns `{ ...parsed, route_key, is_admin, pending_state, raw_state, state_expired, stash }`.
6. **`Route Request`** (`n8n-nodes-base.switch`, mode rules, version 3.2) — switches on `={{ $json.route_key }}` to 14 outputs:
   1. `qa`, 2. `admin_help`, 3. `admin_list_docs`, 4. `admin_add_doc_init`, 5. `admin_add_doc_waiting`, 6. `admin_add_doc_file`, 7. `admin_delete_doc_init`, 8. `admin_delete_doc_num`, 9. `admin_delete_doc_confirm`, 10. `admin_reindex_init`, 11. `admin_reindex_confirm`, 12. `admin_stats`, 13. `admin_cancel`, 14. fallback (unused — defaults handled in Compute Route).

   Each rule: `leftValue: "={{ $json.route_key }}"`, `rightValue: "<key>"`, `operator: { type: 'string', operation: 'equals' }`. Use `renameOutput: true` and `outputKey: <key>` so each output is named.

For exact parameter shapes, see the per-chain spec in `03-chain-spine.md`.

---

## Chain 2 — Q&A RAG (the user-facing answer path)

7 nodes (1 main path + 6 sub-attached via langchain typed connections).

Build order:

1. **`Q&A AI Agent`** (`@n8n/n8n-nodes-langchain.agent`):
   - `promptType: "define"`
   - `text: "={{ $('Parse Input').item.json.text || $('Parse Input').item.json.file_name || 'Salom' }}"`
   - `options.systemMessage`: the long Uzbek system prompt — see **`11-system-prompts.md`** for the exact text. It's an n8n expression starting with `=` because of `{{$now.toFormat('yyyy-MM-dd')}}`.
   - `options.maxIterations: 5`

2. **`Gemini Chat Model`** (`@n8n/n8n-nodes-langchain.lmChatGoogleGemini`):
   - `options.temperature: 0.3`
   - Connect to `Q&A AI Agent` via `ai_languageModel` channel.

3. **`Bank PDF Search`** (`@n8n/n8n-nodes-langchain.toolVectorStore`):
   - `description: "Bank PDFlaridagi ma'lumotni qidirish uchun bu vositadan foydalan. Faqat indekslangan hujjatlardan javob qaytaradi - internetdan emas."`
   - `topK: 5`
   - Connect to `Q&A AI Agent` via `ai_tool` channel.

4. **`Vector Store Tool Model`** (`@n8n/n8n-nodes-langchain.lmChatGoogleGemini`):
   - Same params as Gemini Chat Model (`options.temperature: 0.3`).
   - Connect to `Bank PDF Search` via `ai_languageModel` channel — this is the langchain pattern where the tool has its own LLM for query refinement.

5. **`Simple Vector Store`** (`@n8n/n8n-nodes-langchain.vectorStoreInMemory`):
   - In-memory mode (no persistence; reindex repopulates).
   - Connect to `Bank PDF Search` via `ai_vectorStore` channel.

6. **`Gemini Embeddings`** (`@n8n/n8n-nodes-langchain.embeddingsGoogleGemini`):
   - `modelName: "models/gemini-embedding-001"`
   - Connect to `Simple Vector Store` via `ai_embedding` channel.

7. **`QA Format Reply`** (`n8n-nodes-base.set`) — formats the agent's `output` field into a Telegram-ready reply text. Connects from `Q&A AI Agent` (main output 0) to `Send Reply` (chain 7).

For exact JSON params, see `04-chain-qa-rag.md`.

---

## Chain 3 — Admin simple paths (Help / List / Stats / Cancel)

7 nodes covering 4 short admin paths.

| Path | Nodes | Logic |
|---|---|---|
| Help | 1 — `Admin Help Reply` (Set) | Static help text. |
| List | 2 — `List Docs Read Documents` (Sheets) → `List Docs Format` (Code) | Read active rows, format as numbered list. |
| Stats | 2 — `Stats Read Docs` (Sheets) → `Stats Format` (Code) | Count total/active/deleted. |
| Cancel | 2 — `Cancel Clear State` (Sheets update/delete state row) → `Cancel Reply` (Set) | Clear state + reply. |

All terminate in `Send Reply` (chain 7).

See `05-chain-admin-simple.md` for parameter details.

---

## Chain 4 — Admin Add Doc

13 nodes for `/add_doc`. Three sub-paths off the Switch (`admin_add_doc_init`, `admin_add_doc_waiting`, `admin_add_doc_file`):

- **init**: `Add Doc Init Set State` (write `AWAITING_DOC`) → `Add Doc Init Reply` (Set: "send a file").
- **waiting**: `Add Doc Waiting Reply` (Set: "still waiting for file").
- **file** (the heavy path):
  - `Add Doc File Get File` (Telegram: download file by file_id) →
  - `Add Doc File Upload to Drive` (Drive upload, returns drive_file_id) →
  - `Add Doc Insert Vector Store` (langchain vectorStoreInMemory, mode `insert`) — sub-attaches:
    - `Add Doc Gemini Embeddings` via `ai_embedding`
    - `Add Doc Data Loader` (langchain documentDefaultDataLoader) via `ai_document` channel
    - `Add Doc Text Splitter` (langchain recursive splitter, chunkSize 800 / overlap 120) via `ai_textSplitter` channel
  - then main path: `Add Doc Build Row` (Set: build {doc_id, file_name, drive_file_id, summary, added_at, is_active: TRUE}) →
  - `Add Doc Append to Documents` (Sheets append, autoMapInputData) →
  - `Add Doc Clear State` (Sheets update state row to IDLE) →
  - `Add Doc File Reply` (Set: "added & indexed").

All three sub-paths terminate in `Send Reply` (chain 7).

See `06-chain-admin-add-doc.md`.

---

## Chain 5 — Admin Delete Doc

13 nodes for `/delete_doc`. Three sub-paths (`admin_delete_doc_init`, `admin_delete_doc_num`, `admin_delete_doc_confirm`):

- **init**: `Delete Init Read Docs` (Sheets read active docs) → `Delete Init Format Stash` (Code: build numbered list, store as JSON in stash) → `Delete Init Set State` (write `AWAITING_DELETE_NUM` + stash).
- **num**: `Delete Num Pick` (Code: parse user's number, find doc in stash) → `Delete Num Set State` (update to `AWAITING_DELETE_CONFIRM`, stash includes selected doc).
- **confirm**: `Delete Confirm Decide` (Code: parse "ha"/"yo'q") → `Delete Confirm If Yes` (If):
  - true → `Delete Confirm Yes Mark Doc Deleted` (Sheets update is_active=FALSE) → `Delete Confirm Yes Trash Drive File` (Drive trash) → `Delete Confirm Yes Clear State` (Sheets update state IDLE) → `Delete Confirm Yes Reply` (Set: "deleted").
  - false → `Delete Confirm No Clear State` → `Delete Confirm No Reply` (Set: "kept").

All sub-paths terminate in `Send Reply`.

See `07-chain-admin-delete.md`.

---

## Chain 6 — Admin Reindex

17 nodes for `/reindex`. Two sub-paths (`admin_reindex_init`, `admin_reindex_confirm`):

- **init**: `Reindex Init Read Docs` (Sheets read active) → `Reindex Init Build Prompt` (Code: build "you're about to reindex N docs, confirm?") → `Reindex Init Set State` (write `REINDEX_CONFIRM`).
- **confirm**: `Reindex Confirm Decide` (Code) → `Reindex Confirm If Yes` (If):
  - true:
    - `Reindex Yes Read Docs` (Sheets read active) → `Reindex Yes Loop` (splitInBatches, batch 1):
      - per iteration: `Reindex Yes Download` (Drive get file by drive_file_id) → `Reindex Insert Vector Store` (vectorStoreInMemory insert with `Reindex Gemini Embeddings`/`Reindex Data Loader`/`Reindex Text Splitter` sub-attached the same way as Add Doc).
      - loop-back to `Reindex Yes Loop`.
    - After loop done: `Reindex Done Count` (Set: count) → `Reindex Done Clear State` → `Reindex Done Reply`.
  - false: `Reindex No Clear State` → `Reindex No Reply`.

See `08-chain-admin-reindex.md`.

---

## Chain 7 — Egress (Send Reply)

1 node. Every chain's terminal Set node (or Code node for List/Stats) feeds into:

**`Send Reply`** (`n8n-nodes-base.telegram`, operation `sendMessage`):
- `chatId: "={{ $('Parse Input').item.json.chat_id }}"` — note: reference Parse Input directly, not `$json.chat_id`, because mid-pipeline `chat_id` may have been overwritten.
- `text: "={{ $json.reply_text }}"` (or whatever the upstream Set/Code node populated as the reply).
- Other params per Telegram defaults.

See `09-chain-egress.md`.

---

## Chain 8 — Initial ingestion (manual trigger)

13 nodes in a separate, disconnected workflow path:

1. **`Hujjat indeksini yangilash`** (`manualTrigger`) — kick off manually from n8n.
2. **`List Drive Files`** (Drive list folder contents).
3. **`Loop Over Files`** (`splitInBatches`, batch 1):
   - per file: `Download File` (Drive download) → `Insert into Vector Store` (vectorStoreInMemory insert with `Ingest Gemini Embeddings`/`Default Data Loader`/`Recursive Character Text Splitter` sub-attached) → `Build Summary Row` (Set) → `Append to Documents Sheet` (Sheets append) → loop-back.
4. After loop: `Limit to One Summary` → `Build Aggregate Summary` (Set) → `Ingest Complete` (NoOp, terminator).

See `10-chain-initial-ingestion.md`.

---

## Per-chain detail files

For exact parameter JSON, position coordinates, type versions, and all 75 connections, refer to:

- `03-chain-spine.md` — 6 nodes
- `04-chain-qa-rag.md` — 7 nodes
- `05-chain-admin-simple.md` — 7 nodes
- `06-chain-admin-add-doc.md` — 13 nodes
- `07-chain-admin-delete.md` — 13 nodes
- `08-chain-admin-reindex.md` — 17 nodes
- `09-chain-egress.md` — 1 node
- `10-chain-initial-ingestion.md` — 13 nodes
- `11-system-prompts.md` — full Q&A Agent system prompt + Bank PDF Search tool description

Each chain file lists every node with: type, typeVersion, position, full parameters JSON, inbound connections, outbound connections (including langchain `ai_*` types).

---

## Build order (recommended)

1. `02-credentials-and-sheets.md` — set up Telegram, Sheets, Drive, Gemini.
2. `03-chain-spine.md` — build the 6-node spine. Test by sending Telegram messages and verifying Switch routes (use n8n execution log).
3. `09-chain-egress.md` — build `Send Reply`. Hook a test Set node directly to it to verify Telegram replies work.
4. `04-chain-qa-rag.md` — build the Q&A path. Connect Switch output `qa` → `Q&A AI Agent` → `QA Format Reply` → `Send Reply`. Test with a customer message.
5. `05-chain-admin-simple.md` — build the four short admin paths. Connect Switch outputs.
6. `06-chain-admin-add-doc.md` — build Add Doc.
7. `07-chain-admin-delete.md` — build Delete Doc.
8. `08-chain-admin-reindex.md` — build Reindex.
9. `10-chain-initial-ingestion.md` — build the manual-trigger ingestion workflow (separate path in the same workflow).
10. `12-validation.md` — run all the smoke tests.

## Final acceptance

- 77 nodes, 75 connections, 2 triggers.
- `validate_workflow` returns no errors.
- Customer Q&A test: question → answer with `Manba: <doc>` citation.
- Admin `/list_docs` test: numbered list of active docs.
- Admin `/add_doc` test: file uploaded → searchable in Q&A.
- Admin `/delete_doc` test: doc soft-deleted, Drive file in trash.
- Admin `/reindex` test: docs re-embedded, Q&A still works.

When all of the above pass, the rebuild is complete.

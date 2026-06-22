# 02 — Credentials and Google Sheets schema

Set this up **before** building any node. Every chain depends on these.

## Credentials to create in n8n

The MCP API strips credential values, so the workflow JSON only contains node references. Create these credentials manually in n8n (Settings → Credentials):

| Credential type | Used by | What you need |
|---|---|---|
| **Telegram API** | `Telegram Trigger`, `Send Reply`, `Add Doc File Get File` | Bot token from `@BotFather` (create a new bot for your instance — do **not** reuse `@bankragbot`) |
| **Google Sheets OAuth2 API** *or* **Google Service Account** | All 20 `googleSheets` nodes | OAuth credentials for a Google account (or service account) that has edit access to the spreadsheet |
| **Google Drive OAuth2 API** *or* **Google Service Account** | All 5 `googleDrive` nodes | Same Google identity — must have edit access to the documents Drive folder |
| **Google Gemini (PaLM) API** | All 4 `embeddingsGoogleGemini` nodes + 2 `lmChatGoogleGemini` nodes | Gemini API key from `https://aistudio.google.com/apikey` |

**Recommendation:** for production use the same Google Service Account for Sheets + Drive, and grant it explicit access to the spreadsheet + folder. For demo/test use OAuth2 with your personal Google account.

## Google Sheets — the bot's state store

Create **one** Google Sheets spreadsheet with **three tabs**. The original spreadsheet ID in the workflow is `1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c` — you'll create your own and replace this ID in every `googleSheets` node parameter.

### Tab 1 — `Admins` (gid=0, the default first tab)

Stores the allow-list of admin chat_ids. Customers' chat_ids are not in this tab.

| Column | Type | Example | Purpose |
|---|---|---|---|
| `chat_id` | string | `123456789` | Telegram chat_id (numeric, sometimes negative for groups) |
| `name` | string | `Murad` | Friendly name (optional, for display only) |
| `added_at` | datetime | `2026-05-08 09:00:00` | When this admin was added |

The bot **only reads** from this tab (`Lookup Admins` filters by `chat_id`). Admins are added/removed manually by you — no admin-add command in the bot.

### Tab 2 — `AdminStates`

Stores per-chat pending state for multi-step admin operations.

| Column | Type | Example | Purpose |
|---|---|---|---|
| `chat_id` | string | `123456789` | Same as Admins |
| `state` | string | `AWAITING_DOC` | One of: `IDLE`, `AWAITING_DOC`, `AWAITING_DELETE_NUM`, `AWAITING_DELETE_CONFIRM`, `REINDEX_CONFIRM` |
| `entered_at` | datetime | `2026-05-10 14:32:00` | When this state was set (used for 1-hour expiry) |
| `stash` | string (JSON) | `{"docs": [{"id":"...", "name":"..."}]}` | Free-form JSON for state-specific data (e.g., the numbered list during a delete flow) |

Multiple nodes WRITE to this tab (`Add Doc Init Set State`, `Delete Init Set State`, `Reindex Init Set State`, `Delete Num Set State`) and `Compute Route` reads it.

### Tab 3 — `Documents`

Stores metadata for every indexed document.

| Column | Type | Example | Purpose |
|---|---|---|---|
| `doc_id` | string | `doc_001` or a UUID | Stable internal identifier |
| `file_name` | string | `kredit_siyosati.pdf` | Display name |
| `drive_file_id` | string | `1abc...XYZ` | Google Drive file ID for download / trash |
| `summary` | string | "Avtokredit shartlari va talablari" | Short description used by `Bank PDF Search` tool to decide if this doc is relevant |
| `added_at` | datetime | `2026-05-10 09:00:00` | When indexed |
| `is_active` | boolean | `TRUE` | `FALSE` for soft-deleted docs (the bot ignores them) |

`Add Doc Append to Documents` uses `mappingMode: "autoMapInputData"` — so the columns above must exactly match the keys produced by `Add Doc Build Row` (chain 06).

## Google Drive — the file store

Create one Drive folder for the bot's documents. The original workflow has folder ID `1cPPP9FSi3Znoetgth69RA-2gvxbYdHjR` — replace with your own.

The bot:
- **Uploads** new docs to this folder (`Add Doc File Upload to Drive`).
- **Reads** files from this folder during reindex (`Reindex Yes Download`).
- **Trashes** files on soft-delete (`Delete Confirm Yes Trash Drive File` — moves to Drive trash, doesn't permanent-delete).
- **Lists + downloads** for initial bootstrap (`List Drive Files` + `Download File` in chain 10).

Permissions: the Google identity used by the credentials must have **edit** access to the folder.

## Vector store

The workflow uses **`vectorStoreInMemory`** — an n8n-native, ephemeral in-memory vector store. Notes:

- It's **not persistent across n8n restarts**. The `/reindex` command re-populates it from Drive + Sheets metadata.
- Suitable for demo/seminar use. For production, swap to `vectorStorePinecone`, `vectorStoreSupabase` (pgvector), or `vectorStoreQdrant` — but that's a non-trivial change to four `vectorStoreInMemory` nodes (Q&A reads, Add Doc inserts, Reindex inserts, initial ingestion inserts).

## Sanity check before building chains

When you're done with this section, you should have:

- [ ] A Telegram bot created via `@BotFather` and the token saved as a credential in n8n
- [ ] A Google Sheets spreadsheet with three tabs (`Admins`, `AdminStates`, `Documents`) with the columns above
- [ ] Your own `chat_id` added to `Admins` (find your chat_id by sending any message to your bot, then checking `https://api.telegram.org/bot<TOKEN>/getUpdates`)
- [ ] A Google Drive folder for documents
- [ ] A Gemini API key saved as a credential
- [ ] Google OAuth2 (or Service Account) credentials saved with access to both the Sheet and the Drive folder

Now you're ready for the chain files (03-10).

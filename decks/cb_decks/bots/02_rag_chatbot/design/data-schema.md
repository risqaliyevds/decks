# Bot 01 · Data Schema

The bot is **stateless for users** (every Q is independent) and **stateful for admins** (multi-step commands). Persistence layout below.

## Spreadsheet structure

One spreadsheet, 4 sheets.

### Sheet 1: `Documents` — document registry

One row per indexed PDF. Source of truth for what's in the vector store.

| Column | Type | Description |
|---|---|---|
| `doc_id` | string | `T-{YYYYMMDD}-{4-char-random}` |
| `title` | string | Human-readable doc title (admin sets at upload, or extracted from PDF metadata) |
| `original_filename` | string | What admin uploaded |
| `drive_url` | string | Google Drive view link |
| `drive_file_id` | string | Drive file ID (for trash/restore operations) |
| `chunk_count` | int | how many vector chunks were created |
| `embedding_model` | string | e.g. `text-embedding-004` — must match query-time model |
| `vector_store_namespace` | string | Pinecone namespace OR PGVector tablename |
| `added_at` | datetime | upload timestamp |
| `added_by` | string | admin chat_id |
| `status` | enum | `active \| deleted \| archived` |
| `deleted_at` | datetime | nullable, set when admin runs /delete_doc |

When admin runs `/delete_doc`, the row's `status` flips to `deleted` and the Drive file goes to trash. Vector chunks are deleted from the store. After 30 days, a separate scheduled workflow hard-deletes the row.

### Sheet 2: `Admins` — allowlist (READ-ONLY in production)

| Column | Type | Description |
|---|---|---|
| `chat_id` | string | Telegram chat_id (the **key** — looked up on every message) |
| `name` | string | for display in `/stats` |
| `role` | enum | `super_admin \| admin \| read_only_admin` (v1: only `admin`) |
| `added_at` | datetime | provisioning time |
| `added_by` | string | who added them (super_admin) |

**Editing this sheet is the ONLY way to grant admin privileges.** The bot reads it on every message — no caching. Sheet is shared with `viewer` role to bot's service account; only the deployer has edit access.

### Sheet 3: `AdminStates` — pending state machine

One row per admin who has an in-flight multi-step command.

| Column | Type | Description |
|---|---|---|
| `chat_id` | string | the **key** — upsert by this |
| `state` | enum | `IDLE \| AWAITING_DOC \| AWAITING_DELETE_NUM \| AWAITING_DELETE_CONFIRM \| REINDEX_CONFIRM` |
| `stash` | string (JSON) | command-specific data, e.g. `{"doc_id_to_delete": "T-...AB12"}` |
| `entered_at` | datetime | for TTL — abandoned states auto-cleared after 1 hour |
| `entered_via` | string | the command that put admin into this state |

Auto-cleanup: a separate scheduled workflow runs every 15 minutes and deletes rows where `entered_at < now - 1h`. Prevents stale state blocking admins.

### Sheet 4: `UsageLog` — Q&A usage stats

Append-only. One row per user question.

| Column | Type | Description |
|---|---|---|
| `log_id` | string | auto |
| `chat_id` | string | who asked |
| `question_text` | string | (truncated to 200 chars; full transcripts NOT stored — privacy) |
| `answered` | bool | did the bot find a relevant chunk? |
| `top_doc_id` | string | which doc the answer came from (null if not answered) |
| `latency_ms` | int | end-to-end response time |
| `created_at` | datetime | |

Used for `/stats` admin command, plus weekly health checks.

**Privacy note:** `question_text` is truncated and **never includes user-uploaded content** (since users can't upload to bot 01). Bank's compliance team can audit this column without seeing PII.

## Vector store layout

n8n's Vector Store options for v1:
- **In-memory** — easy for dev, lost on n8n restart. Bad for production.
- **PostgreSQL with pgvector** — open source, runs in bank's own infra. Recommended.
- **Pinecone** — managed, fast, but external SaaS (compliance check needed first).

For pedagogy in module 9, **In-Memory** is fine — students rebuild on each session.
For instructor demo / production, **PGVector** preferred.

### PGVector schema

```sql
CREATE TABLE bank_corpus_chunks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_id          TEXT NOT NULL,            -- FK to Documents sheet's doc_id
  chunk_index     INT NOT NULL,             -- 0-based position within doc
  content         TEXT NOT NULL,            -- the actual chunk text
  embedding       vector(768) NOT NULL,     -- text-embedding-004 outputs 768 dims
  metadata        JSONB,                    -- {page_num, section_title, ...}
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX bank_corpus_chunks_embed_idx ON bank_corpus_chunks
  USING ivfflat (embedding vector_cosine_ops);

CREATE INDEX bank_corpus_chunks_doc_id_idx ON bank_corpus_chunks(doc_id);
```

**Why doc_id index:** `/delete_doc` needs to drop all chunks for a given `doc_id` quickly. Without this index, deletion is a full-table scan.

### Chunking strategy

Use the LangChain `RecursiveCharacterTextSplitter` (langchain-rag skill):
- chunk_size: **800 chars**
- chunk_overlap: **120 chars**
- separators: `["\n\n", "\n", ". ", " ", ""]`

Why 800/120: bank PDFs (nizom, tarif) have section structure. 800 chars ≈ 1 paragraph. 120-char overlap ensures context across chunk boundaries. Smaller chunks → more precise retrieval, but more API calls; larger → cheaper but less precise.

Per `langchain-rag` skill recommendations.

### Embedding model

Use **`models/gemini-embedding-001`** — Gemini's current stable embedding model. Trained on multilingual text (handles Uzbek well). Free tier generous.

**Migration history:**
- `text-embedding-004` was the original choice — **deprecated** by Google as of 2026-Q1, returns HTTP 404 from `/v1beta/models`. Do not use.
- `gemini-embedding-001` replaced it — same use case, available in the same API surface.
- `gemini-embedding-2` and `gemini-embedding-2-preview` also exist (newer architecture, possibly different dim count) — only switch if you've benchmarked them against your corpus.

**Critical invariant:** the embedding model used at INDEXING time (BankRAGBotiIngest workflow) MUST be the same as at QUERY time (BankRAGBoti's Vector Store Tool). Different models produce incompatible vector spaces — your similarity search returns nothing.

**Where the model name lives:**
- `BankRAGBotiIngest` → Gemini Embeddings sub-node → `modelName: 'models/gemini-embedding-001'`
- `BankRAGBoti` → Gemini Embeddings sub-node (under Vector Store Tool) → `modelName: 'models/gemini-embedding-001'`

If you ever switch models, run a full reindex (re-trigger BankRAGBotiIngest after clearing the In-Memory store via n8n redeploy). The `Documents.embedding_model` column tracks which model each doc was indexed with — drift is detectable.

## Drive folder structure

```
{root}/bank-corpus/
  active/
    T-20260501-AB12 - Avtokredit nizomi.pdf
    T-20260502-CD34 - Depozit shartlari Q2.pdf
    T-20260503-EF56 - Karta tariflar 2026.pdf
    T-20260504-GH78 - Komplaens qoidalari.pdf
  trash/                              ← /delete_doc moves files here
    T-20260420-XX99 - Old kredit nizom.pdf
```

After 30 days in `trash/`, files are hard-deleted by a scheduled cleanup workflow. Until then, admin can restore via Drive UI if needed.

## Compliance hooks

- **`UsageLog.question_text`** is truncated; never logs full content of bank PDFs that ended up in answers — only the question.
- **`AdminStates.stash`** contains operational data only (doc_ids), never PII.
- **`Documents.added_by`** provides audit trail of who uploaded what.
- **Vector store** is in bank's own infra (pgvector on bank Postgres) for zero-egress option. Pinecone variant requires legal review.
- **Drive folder** is private; only bank's bankir-bo'lim Google group has access.

This ties to `1_deck` slide 11 (Yopiq Kontur, Zero-Training, Data Masking) and module 3 (compliance chuqur).

## Per-deployment customization

Each instance of this bot (kredit dept, depozit dept, komplaens dept) gets its own:
- Spreadsheet (separate Documents/Admins/etc.)
- Drive folder (separate root)
- Vector store namespace (`pinecone` namespace, or separate PG schema)
- Telegram bot (separate token)

This **per-department isolation** is intentional: kredit's Q&A bot shouldn't see komplaens's policies (and vice versa) without explicit cross-permission.

For module 9 student build, each student configures their own minimal version:
- 1 PDF in their own Drive folder
- 1 Sheet (just `Documents` is enough — skip `Admins`/`AdminStates` if not adding admin features)
- In-memory vector store
- Their own Telegram bot

Setup time: ~10 min once they have a Gemini API key + Telegram bot token.

# Bot 01 · n8n Workflow Graph

Two roles: **USER** (asks questions) and **ADMIN** (manages the document corpus). Same Telegram bot, same workflow, role determined at runtime by lookup against an `Admins` allowlist sheet.

Pattern: **AI Agent Workflow** for the Q&A path; admin commands run through deterministic node chains. Reference: `~/.claude/skills/n8n-workflow-patterns/ai_agent_workflow.md`.

## Full graph (ASCII)

```
                    ┌──────────────────────────┐
                    │  Telegram Trigger        │  (1)
                    │  events: message + file  │
                    └────────────┬─────────────┘
                                 ↓
                    ┌──────────────────────────┐
                    │  Parse Input  (Set)      │  (2)
                    │  → chat_id               │
                    │  → text                  │
                    │  → file_id (if file)     │
                    │  → command (parsed /…)   │
                    │  → callback_data         │
                    └────────────┬─────────────┘
                                 ↓
                    ┌──────────────────────────┐
                    │  Lookup Role + State     │  (3)
                    │  Sheet read 2x:          │
                    │    Admins  → is_admin    │
                    │    AdminStates           │
                    │      → pending_action    │
                    │       (none|ADD|DELETE)  │
                    └────────────┬─────────────┘
                                 ↓
                    ┌──────────────────────────┐
                    │  Switch · route          │  (4)
                    │  4 outputs:              │
                    │    a. admin + pending    │
                    │    b. admin + command    │
                    │    c. admin + free text  │
                    │    d. user (anyone)      │
                    └─┬────┬────┬────┬─────────┘
                      │    │    │    │
                  (a)↓ (b)↓ (c)↓ (d)↓
              ┌────────┐┌────────┐┌──────┐┌─────────────┐
              │ RESUME ││ ADMIN  ││ → fallthrough to (d) ││
              │ pending││ COMMAND││  (admin without cmd) ││
              │   (5a) ││   (5b) ││  treated as user     ││
              └────┬───┘└───┬────┘└──────┘  ↓             │
                   ↓        ↓                ↓             ↓
                   ↓        ↓        ┌────────────────────────────────┐
                   ↓        ↓        │  USER Q&A — RAG path           │
                   ↓        ↓        │  (5d) Q&A AI Agent             │
                   ↓        ↓        │   ├─ Gemini Chat Model         │
                   ↓        ↓        │   └─ Vector Store Tool         │
                   ↓        ↓        │      (search PDF chunks)       │
                   ↓        ↓        └────────────┬───────────────────┘
                   ↓        ↓                     ↓
                   ↓        ↓        ┌────────────────────────────────┐
                   ↓        ↓        │ Send Reply (6d) Telegram       │
                   ↓        ↓        │  ↳ "Ushbu hujjatda ma'lumot    │
                   ↓        ↓        │     topilmadi" if no match     │
                   ↓        ↓        └────────────┬───────────────────┘
                   ↓        ↓                     ↓
                   ↓        ↓                  [END user]
                   ↓        ↓
                   ↓   [admin command branches] (see below)
                   ↓
              [pending state branches] (see below)
```

## Admin command branches (5b — flowing out of the Switch)

Each admin command runs its own short chain.

### `/list_docs` — list all indexed documents

```
5b → Lookup Documents (Sheet: Documents) → Format List (Code) → Send Reply
```

Reply format:
```
📚 Indekslangan hujjatlar (4):
1. Avtokredit nizomi (T-20260501-AB12) — added 2026-05-01
2. Depozit shartlari Q2 (T-20260502-CD34) — added 2026-05-02
3. Karta tariflar 2026 (T-20260503-EF56)
4. Komplaens qoidalari (T-20260504-GH78)

/delete_doc raqamni kiriting yoki /add_doc yangi hujjat qo'shish.
```

### `/add_doc` — start the upload flow

```
5b /add_doc → Set State: ADD (AdminStates upsert)
            → Send Reply: "Iltimos, indekslash uchun PDF yuboring."
```

Then on the next message from this admin, route (a) RESUME picks it up:

```
5a (pending=ADD)
  → IF (input has file?)
    ├─ YES: 
    │   Download File → Save to Drive → Text Splitter (RecursiveCharacter)
    │     → Embed (Gemini Embeddings) → Upsert Vector Store
    │     → Append to Documents Sheet → Clear AdminState
    │     → Send: "✓ Hujjat indekslandi: '<title>' (T-...)"
    └─ NO (text):
        Send: "PDF yuboring yoki /cancel"
```

### `/delete_doc` — start the delete flow

```
5b /delete_doc → Lookup Documents → Format Numbered List
              → Set State: DELETE (AdminStates upsert)
              → Send Reply: "Qaysi raqamli hujjatni o'chirish kerak?"
```

Resume on next admin message:

```
5a (pending=DELETE)
  → Parse number → Confirm with title:
     "Tasdiqlaysizmi: '<title>'? (/yes yoki /no)"
  → Set state: DELETE_CONFIRM
  → Send Reply

5a (pending=DELETE_CONFIRM)
  → IF /yes:
      Vector Store Delete (filter by transcript_id) →
      Drive Trash File → Documents Sheet Update (status: deleted) →
      Clear AdminState → Send: "🗑 O'chirildi."
  → IF /no:
      Clear AdminState → Send: "Bekor qilindi."
```

### `/reindex` — rebuild the entire index from current docs

```
5b /reindex → Confirm "Tasdiqlaysizmi? Bu vaqt oladi (~30 sek)."
           → Set state: REINDEX_CONFIRM
           → Send Reply

5a (pending=REINDEX_CONFIRM, /yes)
  → Vector Store Clear → Documents Sheet Read (status=active)
  → For each doc: Download from Drive → Split → Embed → Upsert
  → Send: "✓ Reindex tugadi: <N> hujjat, <M> chunks."
```

### `/stats` — usage statistics

```
5b /stats → Sheet Read (Documents + UsageLog) → Format → Send Reply
```

```
📊 Stats (so'nggi 7 kun):
- Hujjatlar: 4 ta active
- Savollar: 87 ta
- "Topilmadi" javoblari: 12 ta (14%)
- Eng faol foydalanuvchi: chat_id 12345 (23 savol)
- O'rtacha javob vaqti: 1.4 sek
```

## Node inventory · USER Q&A path (~7 nodes)

| # | Node | n8n type | Purpose |
|---|---|---|---|
| 1 | Telegram Trigger | `n8n-nodes-base.telegramTrigger` | Receive text + file |
| 2 | Parse Input | `n8n-nodes-base.set` | Normalize chat_id, text, command |
| 3 | Lookup Role + State | `n8n-nodes-base.googleSheets` (read x2) | is_admin? pending_action? |
| 4 | Switch · route | `n8n-nodes-base.switch` | 4 outputs |
| 5d | Q&A AI Agent | `@n8n/n8n-nodes-langchain.agent` | RAG question answering |
| 5d.1 | Gemini Chat Model | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | LM via `ai_languageModel` |
| 5d.2 | Vector Store Tool | `@n8n/n8n-nodes-langchain.toolVectorStore` | RAG retrieval via `ai_tool` |
| 5d.3 | Vector Store backing | `@n8n/n8n-nodes-langchain.vectorStorePinecone` (or PGVector / In-Memory) | underlying store |
| 5d.4 | Embeddings | `@n8n/n8n-nodes-langchain.embeddingsGoogleGemini` | Gemini `models/gemini-embedding-001` |
| 6d | Send Reply | `n8n-nodes-base.telegram` | reply with answer or "topilmadi" |

## Node inventory · ADMIN paths (varies by command)

| Common nodes (used across admin commands) |
|---|
| `Sheet · Admins` (read) — verify allowlist |
| `Sheet · AdminStates` (read/write) — pending state machine |
| `Sheet · Documents` (read/write) — doc registry |
| `Drive · upload/trash` — file management |
| `Vector Store upsert/delete` — index management |
| `Text Splitter` — RecursiveCharacterTextSplitter |
| `Embeddings` — same Gemini embeddings as USER path |

Total nodes for full bot (USER + ADMIN combined): **~22 nodes**. Reasonable for an instructor-built admin-capable bot. Students in module 9 can build only the USER path (~7 nodes) for their version.

## Connections

Main connections:
```
1 → 2 → 3 → 4
4.output[0] (admin+pending)  → 5a → ... (varies by pending action)
4.output[1] (admin+command)  → 5b → ... (varies by command)
4.output[2] (admin+freetext) → 5d (fallthrough to user path)
4.output[3] (user)           → 5d → 6d
```

AI sub-connections (only on the user Q&A path):
```
5d.1 → 5d (ai_languageModel)
5d.2 → 5d (ai_tool)
5d.3 → 5d.2 (ai_vectorStore — connects vector store to the search tool)
5d.4 → 5d.3 (ai_embedding — embeddings feed into vector store)
```

## Why split admin and user roles in one bot (vs two bots)?

Tradeoffs:

| Approach | Pros | Cons |
|---|---|---|
| Single bot, role-based routing | One Telegram bot to manage; admin can also ask questions; corpus stays consistent | More complex workflow; Sheet access required |
| Two separate Telegram bots | Cleaner separation; admin bot can be private | Two bots to deploy + monitor; risk of corpus drift between them |

Single-bot wins for **simplicity in module 9 student build** — students see one workflow that handles everything. Admin features are clearly gated and don't interfere with the user Q&A path.

## Security: admin allowlist

The `Admins` Sheet is the source of truth. Adding a Telegram_ID to that sheet is the **only way** to grant admin privileges. Bot's logic never trusts any client-side flag — every admin command is validated by re-reading the sheet at message time (node 3).

Protection in node 3:
- Sheet read filtered by `chat_id == $('Parse Input').item.json.chat_id`
- If 0 rows → user role
- If 1+ rows → admin role
- Sheet `Admins` is read-only via Google Sheets sharing (only initial bot deployer has edit access)

In v2: add 2-factor admin commands (sensitive ops like `/reindex` require an extra confirmation token sent to a separate admin Telegram channel).

## Validation gates (n8n-validation-expert)

Before activating:
- Switch node 4 has exactly 4 outputs configured (admin+pending / admin+cmd / admin+freetext / user)
- Vector Store Tool description is specific: *"Bu vositadan **faqat** bank hujjatlaridan ma'lumot izlash uchun foydalan. Internetdan emas, faqat indekslangan PDFlardan."*
- Embeddings model matches between indexing time (admin /add_doc) and query time (user Q&A) — must be the **same** model (e.g., `text-embedding-004`) or vectors are incompatible
- All Sheet nodes have credentials set (not in parameters)
- Telegram bot token credential set, not hardcoded
- Vector store credential (Pinecone API key / PG connection string) set
- AdminStates Sheet has TTL: rows older than 1 hour are auto-cleared (separate scheduled workflow) so abandoned admin flows don't block future commands

## Estimated complexity

| Variant | Nodes | Build time |
|---|---|---|
| **USER-only** (module 9 base) | ~7 | ~45 min |
| **USER + 1 admin command** (`/add_doc`) | ~12 | ~75 min |
| **Full ADMIN suite** (5 commands) | ~22 | ~2 hours |

For module 1 demo: instructor builds the USER path only (admin happens externally / before the talk). For module 9 student build: USER path with optional admin extension if time permits.

---

## Companion path: ADMIN ingest chain (in same workflow)

> **Note (2026-05-08):** previously this was a separate workflow (`BankRAGBotiIngest`). Merged into `BankRAGBoti` as a parallel chain so non-technical bank staff see ONE workflow with two clear "doors" (front = Telegram, back = Manual button). The standalone ingest workflow has been archived.

This chain lives inside `BankRAGBoti` (same workflow ID `kLcPx1CZX9RwH1z8`) but is **completely disconnected** from the USER chain — they share only the in-memory vector store via `memoryKey: bank_pdf_corpus`. The Manual Trigger only fires this admin chain; Telegram messages only fire the user chain.

### ASCII graph

```
                       ┌──────────────────────────┐
                       │  Manual Trigger          │  (1)
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  List Drive Files        │  (2)
                       │  parent: 1cPPP9FSi3...   │
                       │  mimeType: md / txt / pdf│
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  Loop Over Files         │  (3)
                       │  SplitInBatches(size=1)  │
                       └────────────┬─────────────┘
                                    ↓ main[1] = each file
                       ┌──────────────────────────┐
                       │  Download File           │  (4)
                       │  (Drive · binary)        │
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  Insert into Vector Store│  (5)
                       │  Simple Vector Store     │
                       │  mode: insert            │
                       │  memoryKey:              │
                       │   bank_pdf_corpus  ←──── shared with BankRAGBoti
                       │                          │
                       │  ai_document:            │
                       │   Default Data Loader  ──┐
                       │     mode: binary         │
                       │     ai_textSplitter:     │
                       │      Recursive Char.     │
                       │      Text Splitter       │
                       │      chunkSize: 800      │
                       │      chunkOverlap: 120   │
                       │                          │
                       │  ai_embedding:           │
                       │   Gemini Embeddings      │
                       │   gemini-embedding-001   │
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  Build Summary Row (Set) │  (6)
                       │  → doc_id, title,        │
                       │    chunk_count,          │
                       │    embedding_model,      │
                       │    drive_url, added_at   │
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  Append to Documents     │  (7)
                       │  Sheet (Sheets · append) │
                       └────────────┬─────────────┘
                                    ↑ loops back to (3)
                                    ↓ main[0] = done (fires once)
                       ┌──────────────────────────┐
                       │  Limit 1                 │  (8)
                       └────────────┬─────────────┘
                                    ↓
                       ┌──────────────────────────┐
                       │  Aggregate Summary (Set) │  (9)
                       │  total_files, total_chunks│
                       └────────────┬─────────────┘
                                    ↓
                                  [End]
```

### Node inventory (13 nodes)

| # | Node | n8n type | Purpose |
|---|---|---|---|
| 1 | Manual Trigger | `n8n-nodes-base.manualTrigger` | Admin clicks Run |
| 2 | List Drive Files | `n8n-nodes-base.googleDrive` (list) | Find all md/txt/pdf in folder |
| 3 | Loop Over Files | `n8n-nodes-base.splitInBatches` | One file per iteration |
| 4 | Download File | `n8n-nodes-base.googleDrive` (download) | Pull binary |
| 5 | Insert into Vector Store | `@n8n/n8n-nodes-langchain.vectorStoreInMemory` (mode: insert, memoryKey: bank_pdf_corpus) | Insert chunks + embeddings |
| 5a | Default Data Loader | `@n8n/n8n-nodes-langchain.documentDefaultDataLoader` (mode: binary) | Reads binary, applies splitter |
| 5b | Recursive Character Text Splitter | `@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter` (chunkSize: 800, chunkOverlap: 120) | The chunker |
| 5c | Gemini Embeddings | `@n8n/n8n-nodes-langchain.embeddingsGoogleGemini` (model: `models/gemini-embedding-001`) | Vectorize chunks |
| 6 | Build Summary Row | `n8n-nodes-base.set` | Compose Documents-sheet row |
| 7 | Append to Documents Sheet | `n8n-nodes-base.googleSheets` (append) | Persistent registry |
| 8 | Limit 1 | `n8n-nodes-base.limit` | Required after SplitInBatches done output |
| 9 | Aggregate Summary | `n8n-nodes-base.set` | Final totals |

### Connections

```
1 → 2 → 3
3.main[1] (each batch) → 4 → 5 → 6 → 7 → 3   (loops back)
3.main[0] (done)        → 8 → 9 → END
```

AI sub-connections inside Vector Store node 5:
```
5a → 5 (ai_document)
5b → 5a (ai_textSplitter — sub-node of Document Loader)
5c → 5 (ai_embedding)
```

### Why a separate workflow

- **Different lifecycles:** ingest fires occasionally (admin-triggered, ~10–60 sec runtime); query fires constantly (per-message, <2 sec). Bundling them would slow query path with sub-node loading on every message.
- **Easier debugging:** one workflow does one thing.
- **Pedagogy:** module 9 students see the canonical RAG ingest pattern as its own artifact.

### Shared state (the critical wiring)

`BankRAGBoti` (retrieve, memoryKey=`bank_pdf_corpus`) and `BankRAGBotiIngest` (insert, memoryKey=`bank_pdf_corpus`) **must use the same memoryKey**. They share the in-memory store via this key. If they don't match, ingest writes to one store, query reads from another empty store → "topilmadi" forever.

### When n8n cloud restarts

In-Memory vector store is wiped. User re-runs `BankRAGBotiIngest` to repopulate. The `Documents` sheet survives (durable), so the registry is intact — only the vectors need rebuilding.

For production-grade persistence, swap `vectorStoreInMemory` → `vectorStorePinecone` or `vectorStorePGVector` in BOTH workflows. Documented in `data-schema.md` under PGVector schema.

### Build time

~75 min for the instructor (this was built via n8n MCP in ~5 min). Students don't build the ingest workflow themselves — they fork the template if they want corpus management.

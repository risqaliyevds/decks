# 01 · RAG Asoslari — Single-PDF Q&A bot (with admin role)

## Live workflow (n8n cloud)

> **One workflow, two doors** — the front door (Telegram) lets users ask questions; the back door (Manual Run button in n8n) lets the admin load new documents into the corpus.

| Workflow | ID | What's inside |
|---|---|---|
| `BankRAGBoti` | `kLcPx1CZX9RwH1z8` | **73 nodes, 2 trigger chains.** USER chain: Telegram → Parse → Lookup (Admins + AdminStates) → Compute Route → Switch (13 outputs) → 13 sub-flows (Q&A + 12 admin command handlers) → Send Reply. ADMIN chain (Manual Trigger): bulk-reload Drive folder → chunk → embed → insert. Both share in-memory vector store via `memoryKey: bank_pdf_corpus`. |

The two chains have **no connections between them** — Telegram messages only fire the USER chain, the Manual Run button only fires the ADMIN chain.

### Two-doors mental model

```
┌─────────────────────┐         ┌─────────────────────┐
│  FRONT DOOR         │         │  BACK DOOR          │
│  Telegram Trigger   │         │  Manual Trigger     │
│  (visitors / users) │         │  (admin / librarian)│
└──────────┬──────────┘         └──────────┬──────────┘
           ↓                                ↓
   [Q&A pipeline]                  [Ingest pipeline]
       answer                          add to shelf
           ↓                                ↓
┌─────────────────────────────────────────────────────┐
│       Shared library shelf (In-Memory)             │
│       memoryKey: bank_pdf_corpus                   │
└─────────────────────────────────────────────────────┘
```

For non-technical bank staff: this maps cleanly to bank operations. Front door = customer-facing teller window. Back door = back-office stocker. Both reach the same library; used by different people at different times.

## Recent change history

- **2026-05-08** — **Full Telegram-side admin commands implemented.** Workflow grew 24 → 73 nodes. New routes: `/help`, `/list_docs`, `/add_doc` (multi-step with file upload), `/delete_doc` (multi-step soft-delete), `/reindex` (rebuild in-memory store from sheet active docs), `/stats`, `/cancel`. State machine via `AdminStates` sheet with 1-hour TTL. Bankir admins now manage corpus entirely from Telegram — no n8n UI needed for routine ops. Manual Trigger chain stays as bulk-reload backup. `/delete_doc` is soft-delete only (chunks remain until /reindex). Per-flow ingest sub-node sets: existing Manual chain + new "Add Doc" sub-nodes + new "Reindex" sub-nodes (3 sets total).
- **2026-05-08** — **System prompt rewritten** for Ipak Yo'li Bank specifically (replaced placeholder "Central Bank of Uzbekistan" fill). The "redirect to admin paneli" wording for `/add_doc` is now obsolete (commands actually work) but the system prompt still has it as fallback for safety.
- **2026-05-08** — **Workflows merged.** `BankRAGBotiIngest` archived; its 13-node ingest chain moved into `BankRAGBoti` as a parallel chain triggered by a Manual Trigger ("Hujjat indeksini yangilash"). Final structure: one workflow, two triggers, two chains, shared vector store via `memoryKey: bank_pdf_corpus`.
- **2026-05-08** — `text-embedding-004` retired by Google → migrated to **`models/gemini-embedding-001`** in both retrieve (USER chain) and insert (ADMIN chain) embedding nodes. Same model on both sides is critical — different models produce incompatible vectors.
- **2026-05-08** — `gemini-2.5-flash` chat model upgraded to **`models/gemini-3-flash-preview`** (Gemini 3 Flash; the bare `gemini-3-flash` 404s — preview suffix required).
- **2026-05-08** — Telegram nodes rebound from auto-mapped `Telegram account` → workflow-specific credential `BankRAGBoti`.
- **2026-05-08** — Initial scaffold created via n8n MCP (USER + ADMIN chains, RecursiveCharacterTextSplitter @ 800/120, Gemini embeddings + In-Memory vector store).

## ⚠ Activating the merged workflow (n8n versioning quirk)

After the merge, n8n saved a new workflow version but the **active runtime version is still the old (pre-merge) version**. Telegram messages will continue hitting the old USER-only definition until you republish.

**To activate the merged version:**
1. Open `BankRAGBoti` in n8n UI
2. Toggle Active OFF, then ON again (or click "Save" / "Publish" depending on n8n version)
3. Confirm the canvas shows BOTH chains (USER chain at top, ADMIN chain below)

After republish, the Manual Trigger ("Hujjat indeksini yangilash") becomes clickable and the Telegram bot serves from the merged definition.


> **One workflow, two roles, two contexts.**
> - **USER role** asks questions, gets answers grounded in the indexed PDF corpus.
> - **ADMIN role** manages the corpus: `/add_doc`, `/delete_doc`, `/reindex`, `/list_docs`, `/stats`.
> - **Module 1 context:** instructor's pre-built bot, audience scans QR and asks (USER only).
> - **Module 9 context:** each participant builds their own — USER path baseline, ADMIN as stretch goal.

## Design artifacts

Read in order:

1. [`design/conversation-flow.md`](./design/conversation-flow.md) — USER Q&A flow + ADMIN state machine (4 states: IDLE / AWAITING_DOC / AWAITING_DELETE_NUM / AWAITING_DELETE_CONFIRM / REINDEX_CONFIRM)
2. [`design/workflow-graph.md`](./design/workflow-graph.md) — full n8n graph: USER path (~7 nodes) + ADMIN suite (~22 nodes total)
3. [`design/data-schema.md`](./design/data-schema.md) — 4 sheets (Documents, Admins, AdminStates, UsageLog) + PGVector schema + Drive layout + chunking strategy
4. [`prompts/system-prompt.md`](./prompts/system-prompt.md) — Q&A AI Agent prompt + admin command response templates

## Architecture summary

```
                    Telegram message
                          │
                          ↓
                  Lookup role (Sheet)
                  ├── ADMIN → command? → run admin handler
                  │           │
                  │           pending state → resume admin flow
                  │
                  └── USER → AI Agent (Gemini Chat + Vector Store Tool)
                              ↓
                            Answer grounded in PDF corpus
                            (or "topilmadi" if not in corpus)
```

**USER path** (~7 nodes): Telegram → Parse → Lookup → Switch → AI Agent (Gemini + Vector Store) → Send Reply.
**ADMIN path** (~15 additional nodes across 5 commands): file upload + indexing, delete + cleanup, reindex, list, stats.

## Why admin role inside bot 01

The instructor's demo bot needs documents loaded **before** module 1 starts. The student build in module 9 also needs each participant to load their own department's PDF. Admin commands are the bot's own UX for both — no separate admin tool, no Drive-then-import-to-n8n workflow.

Trade-off vs. external doc management:
- ✅ Self-contained — only Telegram needed to manage corpus
- ✅ Auditable — every doc has `added_by` (chat_id) in Sheet
- ✅ Reproducible — students see the full lifecycle, not just query side
- ⚠️ More nodes than pure Q&A — but admin nodes only fire for admin chat_ids, never for users

## USER flow contexts (unchanged from previous design)

### Context A — Instructor demo (1-deck slide 3 · Hook)

Audience scans QR, asks questions, sees RAG live. Demo question target:
> *"Ikkilamchi bozordan avtomobil olish uchun boshlang'ich to'lov qancha va qanday hujjatlar kerak?"*

Setup: instructor adds themselves to `Admins` sheet, runs `/add_doc` to upload avtokredit nizomi PDF, tests, then audience uses USER path during the talk. Instructor backup: pre-recorded 30-sec screen capture if Telegram/wifi fails.

### Context B — Student build (9-deck · Bosqichli qurish)

Each participant builds a working USER path (~45 min). Stretch goal: add `/add_doc` admin command (~30 min more) so they can manage their own department's docs. Skip the full admin suite (`/delete_doc`, `/reindex`, `/stats`) for module 9 — that's advanced track or instructor reference only.

What students customize per their department:
- Telegram bot token (their own bot)
- Initial PDF (uploaded via /add_doc once they're admin)
- System prompt: `{DEPARTMENT}` placeholder
- (Optional) Multi-doc — upload 2-3 PDFs after first is working

## System prompt template (USER path)

The AI Agent's persona enforces RAG-only behavior. See `prompts/system-prompt.md` for the full prompt + 5 admin command response templates.

Skeleton:
```
Sen — {BANK_NAME} ning {DEPARTMENT} bo'limining rasmiy AI yordamchisisan.
Sening manbang — vector_store_search vositasi orqali {BANK_NAME} ning indekslangan PDFlari.

Qoidalar:
1. Til: o'zbek (mijoz alifbosida)
2. Murojaat: doim "Siz"
3. Faqat manbadagi ma'lumot. Taxmin yo'q. Internet yo'q.
4. Manbada javob bo'lmasa: "Ushbu hujjatda ma'lumot topilmadi..."
5. Yakuniy qaror — bankir zimmasida
```

The compliance line at the end matches the message in `1_deck` slide 7 (AI Can/Cannot) and slide 11 (Security).

## Implementation TBD

- [ ] `workflow.example.json` — USER path only (~7 nodes), for module 9 student build
- [ ] `workflow-with-admin.example.json` — full bot (~22 nodes), instructor reference
- [ ] `prompts/admin-commands.md` — already drafted in `prompts/system-prompt.md` as templates section
- [ ] `docs/avtokredit-nizomi-sample.pdf` — synthetic PDF for the instructor demo (NOT real)
- [ ] `qr-code.png` — final QR for `1_deck/index.html` slide 3 (after demo bot URL is finalized)
- [ ] `examples/student-walkthrough.md` — step-by-step rebuild instructions for module 9

## Series terminology hooks

Module 9 closing slide should recap **RAG** and **Embedding** with the audience (cb_decks/CLAUDE.md ≥2 atama qoidasi). The `system-prompt.md` already names these atamalar in context.

## Comparison with bots 02 and 03

| | Bot 01 | Bot 02 | Bot 03 |
|---|---|---|---|
| Input | Text | Voice | Multi-turn text + files |
| Roles | USER + ADMIN | Single role | Multi-turn user |
| Mental model | *AI o'qiydi va javob beradi* | *AI eshitadi va yozib qoldiradi* | *AI suhbat o'tkazadi va ish bajaradi* |
| State | None (per-Q) for users; sheet-based for admins | None (single-turn pipeline) | LangChain memory + inline JSON + Sheet upsert |
| LLM calls | 1 (agent + tool) | 2 (transcribe + extract) | N (per turn until completion) |
| Nodes | ~7 USER / ~22 with admin | ~11 voice path | ~13 text-only / ~17 with file branch |

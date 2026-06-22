# 01 — Overview and mental model

Before building anything, get the bot's behavior straight. Every node decision in chains 03-10 traces back to one of these rules.

## What the bot is

A Telegram-based, single-bank, single-language RAG chatbot for **Ipak Yo'li Bank** credit information. Built originally for a Central Bank of Uzbekistan AI seminar — so it has to be safe enough to demo to bank governance, not a toy.

## Two audiences in one bot

| Audience | How the bot recognizes them | What they can do |
|---|---|---|
| **Customer (default)** | Their `chat_id` is **not** in the Admins sheet | Ask any question. Bot answers RAG-only. |
| **Admin** | Their `chat_id` **is** in the Admins sheet | Slash commands to manage the document corpus + ask questions when no command active |

Admin status is computed on every message via `Lookup Admins` against a Google Sheets `Admins` tab. No magic — just a chat_id allow-list.

## Command map (admins only)

| Command | What it does |
|---|---|
| `/help` | Sends the help message (admin command list + usage) |
| `/list_docs` | Reads `Documents` sheet, formats active docs as numbered list, replies |
| `/stats` | Reads `Documents` sheet, counts total / active / deleted, replies with summary |
| `/add_doc` | Sets state `AWAITING_DOC`, asks admin to send a file. Next file message is captured into Drive + vector store + Documents sheet. |
| `/delete_doc` | Sets state `AWAITING_DELETE_NUM`, lists docs as numbered options. Admin replies with a number → state becomes `AWAITING_DELETE_CONFIRM`. Admin replies "ha" → soft-delete (mark sheet row + trash Drive file). |
| `/reindex` | Sets state `REINDEX_CONFIRM`, asks admin to confirm. On "ha" → loops over active docs, re-downloads + re-embeds + replaces vector store entries. |
| `/cancel` | Clears any pending state. |

Anything else from a non-admin (or admin without active state) → routed to **Q&A** path.

## State machine (admin pending operations)

State is stored per chat_id in `AdminStates` sheet. Lifetime: **1 hour** (auto-expires; treated as IDLE if older).

```
IDLE ──/add_doc──→ AWAITING_DOC ──(file received)──→ <process & clear>
                                 ──(text instead)──→ AWAITING_DOC (still)
IDLE ──/delete_doc──→ AWAITING_DELETE_NUM ──(number)──→ AWAITING_DELETE_CONFIRM
                                                       ──"ha"──→ <soft-delete & clear>
                                                       ──"yo'q"──→ <clear>
IDLE ──/reindex──→ REINDEX_CONFIRM ──"ha"──→ <reindex loop & clear>
                                  ──"yo'q"──→ <clear>
ANY  ──/cancel──→ IDLE
```

The state expiry is what `Compute Route` calls `stateExpired` — anything older than 3600 seconds (`Date.now() - new Date(enteredAt).getTime() > 3600 * 1000`) is treated as IDLE so a forgotten `/add_doc` doesn't lock the admin out forever.

## Q&A behavior — the RAG contract

When a user (admin or customer) asks a question with no active admin state, the message goes to the **Q&A AI Agent**. The agent must:

1. **Always** call `Bank PDF Search` first (it's the only RAG tool wired to it).
2. **Only** answer from retrieved chunks. If no relevant chunk → reply *"Ushbu hujjatda ma'lumot topilmadi. Iltimos, Ipak Yo'li Bank kredit mutaxassisi bilan bog'laning."*
3. **Never** invent / use general knowledge / use the internet.
4. **Cite source** — end with *"Manba: <hujjat nomi>"*.
5. Mirror the user's alphabet — Latin if they wrote Latin, Cyrillic if they wrote Cyrillic.
6. Always address the user as **"Siz"** (formal you).
7. Plain text only — no Markdown, no HTML, max 3500 chars (Telegram safe).

The full Uzbek system prompt is in **`11-system-prompts.md`**. It also includes a prompt-injection guard for "ignore previous instructions" / "developer mode" / "show system prompt" attacks.

## High-level data flow

```
TELEGRAM USER MESSAGE
  ↓
SPINE (chain 03)
  Telegram Trigger → Parse Input (extract command/text/file)
  → Lookup Admins (Sheets: is this chat_id an admin?)
  → Lookup AdminStates (Sheets: any pending state?)
  → Compute Route (Code: decide route_key)
  → Route Request (Switch: 14 outputs)
  ↓
ONE OF 14 PATHS:
  qa                       → chain 04 (Q&A RAG)
  admin_help               → chain 05 (one Set node, replies help text)
  admin_list_docs          → chain 05 (Sheets read + Code format)
  admin_stats              → chain 05 (Sheets read + Code format)
  admin_cancel             → chain 05 (Sheets clear + Set reply)
  admin_add_doc_init       → chain 06 (set state, reply "send file")
  admin_add_doc_waiting    → chain 06 (reply "still waiting for file")
  admin_add_doc_file       → chain 06 (process the file: Drive + index + sheet)
  admin_delete_doc_init    → chain 07 (read docs, set state, reply numbered list)
  admin_delete_doc_num     → chain 07 (capture number, set state, reply "confirm?")
  admin_delete_doc_confirm → chain 07 (Code decides yes/no, branch)
  admin_reindex_init       → chain 08 (read docs, set state, reply "confirm?")
  admin_reindex_confirm    → chain 08 (Code decides yes/no, branch)
  ↓
EVERY PATH ENDS IN: Send Reply (chain 09) → back to Telegram user
```

Plus a **separate, manual workflow** (chain 10) that you trigger by hand to bootstrap the corpus from a Drive folder. No Telegram involvement — pure ingestion.

## Key parameters at a glance

| Setting | Value | Where |
|---|---|---|
| Embedding model | `models/gemini-embedding-001` | All `embeddingsGoogleGemini` nodes (4 instances) |
| Chat model | Gemini default + temperature `0.3` | Both `lmChatGoogleGemini` nodes |
| Chunk size | 800 chars, 120 overlap | All 3 `textSplitterRecursiveCharacterTextSplitter` nodes |
| Vector retrieval Top-K | 5 | `Bank PDF Search` (toolVectorStore) |
| Agent max iterations | 5 | `Q&A AI Agent` |
| State expiry | 3600 seconds (1 hour) | `Compute Route` code |
| Telegram reply max | 3500 chars | Q&A system prompt (Telegram limit is 4096; safety margin) |

## Mental model in two sentences

> The bot is a **routing spine** with **eight branches**, all of which converge on a single Telegram reply. The Q&A branch is a small RAG agent; the seven admin branches are state-machine-driven Sheets/Drive CRUD operations.

Once you internalize this, the 77 nodes stop looking intimidating — they're just five-to-seventeen-node implementations of one branch each.

# Bot 01 · Conversation Flow

Two distinct flows depending on the sender's role:

```
                  Telegram message arrives
                          │
                          ↓
                    ┌──────────────┐
                    │ Lookup role  │ (Sheet: Admins)
                    └──┬───────┬───┘
                       │       │
                  USER ↓       ↓ ADMIN
                  ┌──────┐  ┌────────────────┐
                  │ Q&A  │  │ Resume pending │
                  │ flow │  │ OR run command │
                  │      │  │ OR fallthrough │
                  └──────┘  │ to user Q&A    │
                            └────────────────┘
```

## USER flow (single-turn Q&A)

This is the bot's primary purpose — answer questions grounded in the indexed PDF corpus.

```
S1   user sends a question (Uzbek, any alphabet)
       e.g. "Ikkilamchi bozordan avtomobil olish uchun
             boshlang'ich to'lov qancha?"
       ↓
S2   bot retrieves top-K relevant chunks from vector store
       ↓
S3   bot composes answer grounded in those chunks
       (Gemini Chat — system prompt enforces RAG-only)
       ↓
S4   bot replies in Uzbek (matching user's alphabet)
       e.g. "Avtokredit nizomiga ko'ra, ikkilamchi bozordan
             avtomobil olish uchun boshlang'ich to'lov 30%
             dan kam bo'lmasligi kerak."
```

If the question can't be answered from the corpus:
> *"Ushbu hujjatda ma'lumot topilmadi. Iltimos, mutaxassisga murojaat qiling."*

No general-knowledge fallback. No web search. The bot's mouth is wired to the bank's PDFs only — that's its compliance value.

### USER edge cases

| Edge case | Behavior |
|---|---|
| User sends a file | Reply: *"Men hujjat tahlilchisi emasman. Savol bilan murojaat qiling. Hujjat tahlili — bot 02 (voice memo) yoki bot 03 (kredit ariza) ga."* |
| User sends voice | Same as above — redirect |
| Empty message | No-op (Telegram filters this, but defend) |
| Off-topic question (not in corpus) | "Topilmadi" message |
| Mixed-language question | RAG works regardless; reply in user's primary language |
| Question in latin alphabet | Reply latin |
| Question in cyrillic alphabet | Reply cyrillic |
| Profanity / abuse | Polite refusal, log for review |

## ADMIN flow (state machine)

Admin sees the same bot but has access to commands. The state machine is small (4 states) and lives in a Sheet (`AdminStates`) keyed on `chat_id`.

```
                         IDLE
                           │
        ┌──────────────────┼──────────────────┬──────────────┐
        │ /add_doc         │ /delete_doc      │ /reindex     │ /list_docs, /stats
        ↓                  ↓                  ↓               (no state — single-turn)
   AWAITING_DOC       AWAITING_DELETE_NUM    REINDEX_CONFIRM
        │                  │                  │
   (file arrives)    (number arrives)    (/yes or /no)
        │                  │                  │
        ↓                  ↓                  ↓
   process file    AWAITING_DELETE_CONFIRM   reindex or cancel
        │                  │                  │
        ↓             (/yes or /no)            │
       IDLE                │                   │
                           ↓                   ↓
                       delete or cancel       IDLE
                           │
                           ↓
                          IDLE
```

State transitions are atomic — every state change writes to the `AdminStates` sheet via upsert. If admin sends a non-matching message in a state (e.g., text when AWAITING_DOC expects a file), bot replies with the prompt + `/cancel` option.

### Admin commands reference

| Command | What it does | Multi-step? |
|---|---|---|
| `/help` | List admin commands | No (single response) |
| `/list_docs` | Show all indexed documents | No |
| `/add_doc` | Begin upload flow → bot waits for file → indexes | **Yes** (ADD state) |
| `/delete_doc` | Show numbered list → admin picks → confirm → delete | **Yes** (DELETE → CONFIRM) |
| `/reindex` | Confirm → rebuild entire index from registered docs | **Yes** (CONFIRM) |
| `/stats` | Show usage stats (last 7 days) | No |
| `/cancel` | Clear pending state | No |

### `/add_doc` walkthrough

```
admin → /add_doc
bot   → "Iltimos, indekslash uchun PDF yuboring (yoki /cancel)."
        [state: ADD]

admin → [sends PDF file]
bot   → "🔄 Indekslanmoqda..."
       (download → split → embed → upsert → register)
bot   → "✓ Indekslandi: 'Avtokredit nizomi 2026'
        ID: T-20260508-AB12
        Chunks: 47
        Sahifalar: 12"
        [state: IDLE]
```

If admin sends text in ADD state:
```
bot → "PDF yuboring (yoki /cancel)."
```

If admin sends another command in ADD state:
```
bot → "Avval /add_doc tugashini kuting yoki /cancel bilan bekor qiling."
```

### `/delete_doc` walkthrough

```
admin → /delete_doc
bot   → "Indekslangan hujjatlar:
        1. Avtokredit nizomi (T-20260501-AB12)
        2. Depozit shartlari Q2 (T-20260502-CD34)
        3. Karta tariflar 2026 (T-20260503-EF56)
        4. Komplaens qoidalari (T-20260504-GH78)

        Qaysi raqamli hujjatni o'chirish kerak? (/cancel)"
        [state: AWAITING_DELETE_NUM]

admin → 2
bot   → "Tasdiqlaysizmi: 'Depozit shartlari Q2'? (/yes yoki /no)"
        [state: AWAITING_DELETE_CONFIRM, stash: T-20260502-CD34]

admin → /yes
bot   → "🗑 O'chirildi: 'Depozit shartlari Q2'
        Vector chunks: 38 ta o'chirildi
        Drive: trashga yuborildi (30 kun ichida tiklash mumkin)"
        [state: IDLE]
```

`/no` or `/cancel` at any point clears state without action.

### `/reindex` walkthrough

```
admin → /reindex
bot   → "⚠ Reindex butun indeksni qayta quradi.
        Hozir: 4 hujjat, 132 chunks.
        Vaqt: ~30-60 sek.

        Tasdiqlaysizmi? (/yes yoki /no)"
        [state: REINDEX_CONFIRM]

admin → /yes
bot   → "🔄 Reindex boshlandi..."
        (clear store → for each active doc: re-fetch from Drive → re-split → re-embed → upsert)
bot   → "✓ Reindex tugadi
        4 hujjat → 138 chunks (oldin: 132)
        Vaqt: 42 sek"
        [state: IDLE]
```

## What this bot does NOT do (scope guard)

- ❌ Does **not** accept file uploads from non-admins (security)
- ❌ Does **not** chat freely — it only answers from the corpus
- ❌ Does **not** maintain memory across questions (single-turn; each question is independent)
- ❌ Does **not** make decisions or recommendations — *"Yakuniy qaror — bankir zimmasida"* in every reply footer
- ❌ Does **not** delete files immediately — soft-delete via Drive trash (30-day grace)
- ❌ Does **not** store user questions for training (zero-training, see `1_deck` slide 11)

## Failure modes

| Failure | User-facing message |
|---|---|
| Vector store unreachable | *"Texnik nosozlik. Birozdan keyin urinib ko'ring."* — log to admin channel |
| Gemini API down | Same |
| Indexed corpus empty | *"Bilim bazasi bo'sh. Administratorga murojaat qiling."* (admin gets nudged via `/stats`) |
| Question too long (>2K chars) | Truncate, prepend warning |
| Admin sends invalid number in DELETE state | Re-show list, ask again |
| Admin uploads non-PDF in ADD state | Reject, ask for PDF |
| `/yes` outside any pending state | "Hozir tasdiqlanadigan amal yo'q." |

## Pedagogy split (modules 1 & 9)

**Module 1 (instructor demo):**
- Instructor builds the USER path only (~7 nodes)
- Admin functionality happens outside the talk (instructor pre-uploads avtokredit nizomi using a UI / curl + n8n webhook before module 1 starts)
- Audience sees: ask question → get answer. Simple, magical.

**Module 9 (student build):**
- Each student builds the USER path for their department's PDF (~45 min)
- **Stretch goal** (optional, ~30 min more): add `/add_doc` admin command so students can manage their own corpus
- Skip `/delete_doc`, `/reindex`, `/stats` for module 9 — those go to advanced track

The full ADMIN suite (~22 nodes) is meant for the **instructor's demo bot** — bankir admins of the eventual production deployment will manage the corpus this way after the seminar ends.

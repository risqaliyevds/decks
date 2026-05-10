# Bot 02 · Conversation Flow

Bot 02 is **single-turn from the user**, but a **multi-step pipeline** under the hood. There's no state machine, no memory across messages — each voice memo is processed independently.

## Three input types

```
       Telegram message
              │
              ↓
   ┌────────────────────────┐
   │  Switch on input type  │
   └─┬────────┬─────────┬───┘
     │        │          │
  VOICE     TEXT      CALLBACK
     │        │          │
     ↓        ↓          ↓
   [main    [command  [button
    voice    handler]  ack]
    flow]
```

## VOICE flow (the main use case)

```
S1   user holds Telegram voice button, speaks ≤2 minutes (Uzbek)
       ↓
S2   bot acks immediately:
       "🎙 Eshitayapman, qayta ishlamoqdaman..."
       ↓ (asynchronous: download → transcribe → extract → save)
S3   bot sends final structured confirmation:
       "✓ Saqlandi (Meeting #M-20260508-A4)
        Mijoz: <name>
        Qaror: <decision>
        Keyingi qadam: <follow_up> (<next_step_date>)
        Kayfiyat: <sentiment>"
```

Total elapsed: ~10–20 seconds depending on voice length and Gemini latency.

### Why an immediate ack (S2)?

Telegram users see a "Sending..." spinner unless we send something quickly. With Gemini transcription taking 5–10 seconds for a long voice, no ack feels broken. The ack-then-update pattern is from the n8n-workflow-patterns AI Agent guide: "use streaming or progressive responses for slow LLM operations".

In v1: ack is a separate Telegram send. In v2: use Telegram `editMessageText` to update the same message in place (cleaner UX).

### Edge cases on the voice path

| Edge case | Handling |
|---|---|
| Voice <2 sec (button slip) | Reject in node 4V (file size check) → "Juda qisqa, qayta urinib ko'ring." |
| Voice >2 min | Truncate or reject (Gemini audio has ~10 min hard limit) — for v1 reject >5 min |
| Silent / no speech | Gemini returns empty transcript → bot replies "Ovozni ololmadim. Iltimos, balandroq gapiring." |
| Background noise dominates | Gemini still transcribes, but quality_score may be low — flag in confirmation |
| Mixed language (Uzbek + Russian + English banking terms) | Gemini handles natively; output stays in Uzbek (mention foreign terms in quotes) |
| Multiple speakers (bankir + mijoz both audible) | Gemini transcribes both; extraction prompt instructs to identify "bankir's notes" perspective |
| Sensitive content (PII, account numbers spoken aloud) | Mask in Sheet column `transcript_text` — replace with `[REDACTED]` via Code node 9V |

## TEXT flow

The bot also accepts a few text commands for review/management of stored meetings.

```
/recent          → show last 5 meetings (this user's) as a numbered list
/search <query>  → search across decisions/follow-ups, return top 5 matches
/help            → static help text
/cancel          → cancel any pending action (no-op in v1)
```

| Command | Path | Notes |
|---|---|---|
| `/recent` | Sheet read where `created_by_chat_id == $chat_id`, last 5 rows by `created_at` | Format: numbered list with truncated decision text |
| `/search foo` | Sheet read with text filter, last 5 matches | Simple substring match on `decision` and `follow_up` columns |
| `/help` | Static text | Lists commands + 1-line description |

No multi-turn pagination in v1. If user wants more results, they should use a different search query.

### Anything else (random text)

If the message is not a recognized command and not a voice, bot replies:

> *"Iltimos, ovoz xabar yuboring yoki /help ni bosing."*

No fallback to LLM — this bot is voice-first, not chat.

## CALLBACK flow

Inline buttons appear on the confirmation message (S3 of voice flow). Buttons:

| Button | callback_data | Action |
|---|---|---|
| 🗑 O'chirish | `delete_<meeting_id>` | Delete the Sheet row (soft delete: set `status: deleted`) + edit confirmation message |
| ✎ Tuzatish | `edit_<meeting_id>` | v1: reply "Iltimos, tuzatish uchun yangi voice xabar yuboring va eski Meeting ID ni qo'shing." (manual). v2: proper edit flow |

Callbacks ack within 100ms (n8n Telegram answerCallbackQuery node) to prevent the loading spinner stuck on the user's button.

## What this bot does NOT do (scope guard)

- ❌ Does **not** chat or answer questions (use Bot 01 for that)
- ❌ Does **not** maintain conversation memory across voice memos (each memo is independent)
- ❌ Does **not** call the customer back (no outbound)
- ❌ Does **not** make decisions — it's a note-taker. *"Yakuniy qaror — bankir zimmasida"* in confirmation footer.
- ❌ Does **not** schedule reminders in v1 — `next_step_date` is just stored. v2: separate scheduled workflow polls `Meetings` sheet daily, sends reminders for `next_step_date == today`.

## Failure modes & user-facing messages

| Failure | Message to user |
|---|---|
| Gemini API down | *"Texnik nosozlik. Voice xabar yuborilmadi. Birozdan keyin qayta urinib ko'ring."* |
| Sheet write fails | *"Saqlash xatoligi. Voice xabar Drive da saqlandi (URL: ...). Bankir bilan bog'laning."* |
| Drive write fails | *"Voice xabar saqlanmadi. Iltimos, qayta yuboring."* |
| Transcript empty | *"Ovozni ololmadim. Iltimos, mikrofon yaqiniroq tuting va qayta urinib ko'ring."* |
| Extracted JSON invalid | Save raw transcript anyway; reply *"Saqlandi, lekin avtomatik xulosalash bo'lmadi. Bankir qo'lda ko'rib chiqadi."* |

Resilience principle: **never lose data**. If anything downstream fails, at minimum the audio file lands in Drive and the transcript lands in `Transcripts` sheet (status `error`). Bankir can reconstruct manually.

## Pedagogy notes (modules 11 + 12)

In **module 11 (dizayn)**, each group sketches their version on paper:
- What 4–6 fields matter for *their* department's meetings? (kredit follow-ups vs depozit checkbacks vs HR onboarding follow-ups)
- What's the failure mode if extraction is wrong? Cost of a missed follow-up vs cost of a wrong extraction?
- Should `sentiment` be tracked? (Some teams say no — too subjective. Some say yes — flags churn risk.)

In **module 12 (namoyish)**, instructor builds the kredit-version live, then asks each group:
- Run a test voice memo. Did extraction work?
- What edge case broke it? (silent first 5 sec, mixed languages, "ertaga" date parsing...)
- How would you fix it in the prompt vs in the workflow?

Goal: students leave with a working voice → CRM bot for their department by end of module 12.

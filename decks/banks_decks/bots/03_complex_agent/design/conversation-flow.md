# Bot 03 · Conversation Flow

State machine for the multi-turn data + document collector. Generic template; each student group in module 14 specializes the categorical branches and field lists.

## Stages (6 total)

```
[ENTRY: /start]
       ↓
   ┌───────────────┐
   │ S0  Verify    │  optional, skip for internal Central Bank use
   │ (captcha gate)│  KEPT in template for completeness
   └───────┬───────┘
           ↓
   ┌───────────────┐
   │ S1  Type      │  CATEGORICAL — first decision
   │               │  e.g. kredit · depozit · onboarding · shikoyat
   │               │  Branches the rest of the flow.
   └───────┬───────┘
           ↓
   ┌───────────────┐
   │ S2  Identity  │  4 fields: ism · telefon · ID/STIR · lavozim
   │               │  Always required, regardless of S1 choice.
   └───────┬───────┘
           ↓
   ┌───────────────┐
   │ S3  Domain    │  3–6 fields, vary by S1 choice
   │               │  e.g. kredit: oylik daromad / summa / muddat / maqsad / garov
   │               │  e.g. depozit: summa / muddat / valyuta
   └───────┬───────┘
           ↓
   ┌───────────────┐
   │ S4  Documents │  N file uploads, vary by S1 choice
   │               │  Each file → Vision check (advanced; can skip in template)
   │               │  Reject quality score <30, ask reupload <70
   └───────┬───────┘
           ↓
   ┌───────────────┐
   │ S5  Confirm   │  Show all collected fields back to user
   │               │  "Tasdiqlaysizmi?" with inline buttons (HA / TUZATISH)
   │               │  TUZATISH → return to specific field
   └───────┬───────┘
           ↓ (HA)
   ┌───────────────┐
   │ S6  Submit    │  Append final row → Sheet (status: SUBMITTED)
   │               │  Notify human banker
   │               │  Reply: "Arizangiz #N qabul qilindi. Bankir 24 soat ichida bog'lanadi."
   │               │  ⚠️ "Yakuniy qaror — bankir zimmasida."
   └───────────────┘
                END
```

## Per-stage validation rules

| Stage | Field | Validation |
|---|---|---|
| S2 | ism | non-empty, ≤80 chars |
| S2 | telefon | regex `^\+998[0-9]{9}$` |
| S2 | STIR | regex `^[0-9]{9}$` |
| S3 | summa | numeric, > 0, ≤ MAX (varies) |
| S3 | muddat | integer 1–60 (months) |
| S4 | file | size ≤ 10MB, type ∈ {pdf, jpg, png} |

If validation fails, agent re-asks the same field with the error reason. **Never advance past a failed validation.**

## Branch points

Branch 1 — **after S1**: determines S3 field set + S4 doc list. Implemented inline in the system prompt (agent reads `entity_type` from JSON state and asks the matching field set). No separate workflow branches.

Branch 2 — **after S5 (TUZATISH)**: agent jumps back to the specified field. Implemented in the system prompt: agent looks at JSON state, sees which field user wants to fix, asks just that field, then returns to S5.

Branch 3 — **callback buttons** at S1, S5: handled in n8n by `Parse Input` capturing both `message.text` AND `callback_query.data`. No separate flow branch needed inside the agent.

## State persistence (3 layers)

Same pattern as `Bank_Kredit_Boti`:

1. **LangChain Window Buffer Memory** — last 50 turns, keyed on `chat_id`. In-memory.
2. **Inline JSON in every agent reply** — `---JSON_START---{...}---JSON_END---`. Code node parses, Sheet upserts.
3. **Google Sheet row** — durable, source of truth. Upsert by `Telegram_ID`. Resume on next message.

If the bot restarts (n8n redeploy), layer 1 is lost but layer 3 is intact — on the next user message, `Lookup History` reads the existing row and the agent picks up where it left off via injected context.

## Conversation timing

Average successful path (S0–S6): **~8–12 minutes** for kredit scenario, **~3–5 min** for simple cases (depozit, shikoyat).

Drop-off mitigation:
- After 24h of inactivity, send a polite nudge ("Davom etamizmi? Ariza saqlangan.")
- Allow `/yangidan` to reset (clears Sheet row, S0 again)
- Allow `/qoldirish` to abandon — Sheet row marked `ABANDONED`

## Pedagogy notes (module 14)

For the group project, **each group simplifies this template**:
- Skip S0 (captcha) — internal use
- S1 categorical: only their scenario type (no branching)
- S3: 3 fields max
- S4: 1–2 documents OR skip entirely
- S5/S6: keep as-is (this is the handoff value)

Goal: working bot in 60 minutes per group. Keep S1+S2+S3+S6 as the minimum viable path.

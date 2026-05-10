# Bot 02 · Data Schema

Two Sheets in one spreadsheet (CRM database). Audio files in Google Drive folder, indexed by chat_id and timestamp.

## Spreadsheet structure

### Sheet 1: `Transcripts` — raw voice → text log

One row per voice memo. **Append only** (never updated; immutable audit trail).

| Column | Type | Description |
|---|---|---|
| `transcript_id` | string | `T-{YYYYMMDD}-{4-char-random}` |
| `idempotency_key` | string | `{chat_id}:{file_id}:{ts}` — unique, prevents double-save on Telegram retries |
| `chat_id` | string | Telegram chat_id of bankir who sent the voice |
| `bankir_name` | string | denormalized from Telegram user profile |
| `audio_drive_url` | string | Google Drive view link of the .ogg file |
| `audio_duration_sec` | int | from Telegram metadata |
| `transcript_text` | string | Gemini transcription output (Uzbek) |
| `transcribe_quality` | float | Gemini's confidence/quality, if available; else null |
| `created_at` | datetime | ts of voice arrival |
| `status` | enum | `transcribed \| extraction_failed \| processed \| deleted` |

### Sheet 2: `Meetings` — structured CRM rows

One row per processed voice memo (after extraction succeeds). **Append + soft-delete** (no hard delete; `status` flag).

| Column | Type | Filled by | Description |
|---|---|---|---|
| `meeting_id` | string | node 10V | `M-{YYYYMMDD}-{4-char-random}` |
| `transcript_id` | string | node 10V | FK → Transcripts row |
| `created_at` | datetime | node 10V | extraction completion time |
| `chat_id` | string | node 10V | bankir's chat_id |
| `bankir_name` | string | node 10V | from Telegram profile |
| `customer_name` | string | LLM extract | F.I.SH or kompaniya nomi (from voice) |
| `customer_id_hint` | string | LLM extract | STIR / pasport / phone if mentioned, else null |
| `decision` | string | LLM extract | the main decision/outcome of the meeting (1 sentence) |
| `follow_up` | string | LLM extract | the next action bankir needs to take (1 sentence) |
| `next_step_date` | date | LLM extract → Code normalize | ISO date or null. "Ertaga" → today+1d. Computed in node 9V. |
| `sentiment` | enum | LLM extract | `positive \| neutral \| negative` |
| `priority` | enum | derived (Code) | `urgent \| normal \| low` — heuristic from sentiment + date proximity |
| `tags` | string | LLM extract | comma-separated, e.g. `kredit,avtokredit,garov-kvartira` |
| `notes_extra` | string | LLM extract | anything else worth keeping (1-2 sentences) |
| `reminder_sent` | bool | reminder workflow | true after follow-up reminder fires |
| `status` | enum | every update | `active \| deleted \| superseded \| done` |

### Why two sheets?

`Transcripts` is the **immutable raw layer**. `Meetings` is the **structured layer** that humans interact with. Separation lets us:
- Re-run extraction on a transcript if the prompt improves (without losing original audio/text)
- Audit what voice memo produced what meeting row
- Soft-delete a meeting without losing the underlying transcript

## Drive folder structure

```
{root}/voice-memos/
  {chat_id_or_bankir_username}/
    20260508/
      14h32-T-20260508-AB12.ogg    ← voice file
      14h45-T-20260508-CD34.ogg
    20260509/
      ...
```

One file per voice memo, named with timestamp + transcript_id for traceability. Folder per bankir (chat_id-keyed). Folder per day for browsing.

## File retention policy

| Asset | Retention | Where defined |
|---|---|---|
| `voice-memos/*.ogg` files | 90 days | separate scheduled workflow deletes old files |
| `Transcripts` rows | 1 year | manual archival or scheduled trim |
| `Meetings` rows (status `active`) | indefinite (until customer relationship ends) | bank's standard CRM retention |
| `Meetings` rows (status `deleted`) | 30 days then hard-delete | soft-delete grace period |

Compliance note: voice files contain PII (customer names, sometimes ID numbers spoken aloud). Drive folder is private; only bank's bankir-bo'lim Google group has access. Bot's service account has write-only.

## Key fields the LLM must produce reliably

The Extract Fields node (8V) returns this JSON. Schema enforced by the prompt + Parse JSON node (9V).

```json
{
  "customer_name": "<string or null>",
  "customer_id_hint": "<string or null>",
  "decision": "<string, 1 sentence in Uzbek>",
  "follow_up": "<string, 1 sentence in Uzbek>",
  "next_step_date_relative": "<'ertaga' | 'kelasi hafta' | '2 hafta ichida' | '<YYYY-MM-DD>' | null>",
  "sentiment": "<'positive' | 'neutral' | 'negative'>",
  "tags": ["<tag1>", "<tag2>", ...],
  "notes_extra": "<string or null>"
}
```

The `next_step_date_relative` is **deliberately fuzzy** — bankers say "ertaga" or "bir hafta ichida", not absolute dates. Node 9V (Parse JSON, Code) normalizes:

```js
// In node 9V Code
const today = DateTime.now().setZone('Asia/Tashkent');
const rel = $json.next_step_date_relative;

let nextStepDate = null;
if (rel === 'ertaga' || rel === 'erta') nextStepDate = today.plus({ days: 1 }).toISODate();
else if (rel === 'kelasi hafta') nextStepDate = today.plus({ weeks: 1 }).startOf('week').toISODate();
else if (/^\d{4}-\d{2}-\d{2}$/.test(rel)) nextStepDate = rel;  // already ISO
else if (rel?.match(/(\d+)\s*kun/)) {
  const n = parseInt(rel.match(/(\d+)/)[1], 10);
  nextStepDate = today.plus({ days: n }).toISODate();
}
// ... add more patterns as needed (n8n-code-javascript skill)

return [{ json: { ...$json, next_step_date: nextStepDate } }];
```

This is a clear pedagogical example of **deterministic post-processing of LLM output** (module 12: AI eplay olmaydi → kelajakni hisoblash, deterministic code does it).

## Schema customization per group (module 11)

Each group fills in their column choices for `Meetings`:

- **Kredit team:** `customer_name`, `decision`, `follow_up`, `loan_amount_hinted`, `next_step_date`, `sentiment`, `tags`
- **Depozit team:** `customer_name`, `decision`, `follow_up`, `deposit_amount_hinted`, `currency_hinted`, `next_step_date`
- **HR team:** `candidate_name`, `position_discussed`, `decision`, `follow_up`, `salary_hinted`, `start_date_hinted`
- **Komplaens team:** `incident_summary`, `severity`, `parties_involved`, `next_step`, `escalation_needed`

The 4–5 universal fields (`customer_name`, `decision`, `follow_up`, `next_step_date`, `sentiment`) stay across all variants. Group-specific fields are added.

## PII / compliance hooks

This is the same compliance posture as Bot 03:

- Synthetic test voices for development; real voices only in production tenant
- Bot's Google service account scoped to **only** this CRM spreadsheet + this Drive folder
- Sheet history (Google's automatic versioning) provides audit trail for compliance
- Voice files NEVER shared outside bank's Google Workspace tenant

This ties to `1_deck` slide 11 (Yopiq Kontur, Zero-Training, Data Masking) and module 3 (komplaens chuqur).

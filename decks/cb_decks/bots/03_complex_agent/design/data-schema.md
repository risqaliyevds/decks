# Bot 03 · Data Schema

Persistent storage layout. **Google Sheets** for handoff (matches Bank_Kredit_Boti — easy for non-technical bankers to read). **Google Drive** for files.

## Spreadsheet structure

One spreadsheet, 3 sheets:

### Sheet 1: `Arizalar` — application form data

One row per Telegram user / ariza. Upsert key: `Telegram_ID`.

| Column | Type | Filled at | Description |
|---|---|---|---|
| `ariza_id` | string | S6 (Submit) | `ARIZA-{YYYYMMDD}-{4-char-random}` |
| `created_at` | datetime | S0/S1 | First message timestamp |
| `updated_at` | datetime | every turn | Last upsert |
| `Telegram_ID` | string | S0 | Chat ID — **the upsert key** |
| `stage` | string | every turn | Current stage code (S0..S6) |
| `entity_type` | string | S1 | Categorical (varies by group) |
| `name` | string | S2 | F.I.SH or kompaniya nomi |
| `phone` | string | S2 | `+998XXXXXXXXX` |
| `id_number` | string | S2 | STIR or pasport |
| `position` | string | S2 | Lavozim (only if MChJ/OK) — nullable |
| `field_1` … `field_6` | varies | S3 | Domain-specific, named per group's scenario |
| `documents_uploaded` | string (JSON array) | S4 | List of `hujjat_id`s |
| `confirmed` | bool | S5 | User pressed HA |
| `submitted_at` | datetime | S6 | Final submission |
| `status` | enum | every turn | `DRAFT \| SUBMITTED \| ABANDONED \| PROCESSED` |

**Why upsert (not append):** the row is the source of truth. Across turns, the same row is updated — no duplicate rows for one applicant.

### Sheet 2: `Hujjatlar` — uploaded file log

One row per file. Append-only.

| Column | Type | Description |
|---|---|---|
| `hujjat_id` | string | `HUJJAT-{YYYYMMDD}-{4-char-random}` |
| `ariza_id` | string | FK — links back to Arizalar row |
| `Telegram_ID` | string | denormalized for easy filtering |
| `file_name` | string | original Telegram filename |
| `file_type` | string | classified by Vision node: `pasport`, `stir-guvohnoma`, `balans`, `garov-hujjat`, … |
| `drive_url` | string | Google Drive view link |
| `vision_quality_score` | int 0–100 | from Vision Analysis node |
| `vision_verdict` | enum | `qabul_qilindi \| qayta_yuklang \| rad_etildi` |
| `vision_fields_extracted` | string (JSON) | OCR'd field values |
| `uploaded_at` | datetime | |

### Sheet 3: `Verified` — captcha pass log (S0, optional)

| Column | Type | Description |
|---|---|---|
| `Telegram_ID` | string | |
| `verified_at` | datetime | |
| `captcha_method` | string | e.g. `simple_math`, `image` |

Skip this entire sheet for the simplified internal version.

## File storage (Google Drive)

```
/{root_folder}/
  ARIZA-20260507-AB12/
    pasport.jpg
    stir-guvohnoma.pdf
    balans-2025-Q1.pdf
    garov-hujjat.pdf
  ARIZA-20260507-CD34/
    ...
```

One folder per ariza. File names normalized by Vision Analysis (it classifies and renames).

**Permissions:** folder is private, only the bank's bankir-bo'lim group has access. Bot's service account has write access to root_folder; readers are added per-bank-process.

## Sheet column data flow

```
USER MESSAGE → AGENT REPLY (with inline JSON) → PARSE → UPSERT
                                                          │
                                                          ↓
                                              Sheet row updated for chat_id
```

The inline JSON in every agent reply contains the *cumulative* state:

```json
{
  "stage": "S3",
  "entity_type": "MChJ",
  "name": "Aliyev Vali Akmaljonovich",
  "phone": "+998901234567",
  "id_number": "300123456",
  "position": "Direktor",
  "field_1_oylik_aylanma": 50000000,
  "field_2_kredit_summa": 200000000,
  "field_3_kredit_muddat": 12,
  "field_4_kredit_maqsad": null,
  "documents_uploaded": [],
  "confirmed": false,
  "is_complete": false
}
```

Code node 7 strips this block, maps keys → Sheet columns, and the Sheet write performs upsert.

## Schema customization per group (module 14)

Each group fills in:

1. **Spreadsheet name** — e.g. `Kredit Arizalari Q2 2026`
2. **`entity_type` allowed values** — e.g. for kredit: `[YaTT, MChJ, OK]`; for HR: `[OD, KU, IT]`
3. **`field_1` … `field_N` mapping** — rename to scenario-specific columns:
   - Kredit: `oylik_aylanma`, `kredit_summa`, `kredit_muddat`, `kredit_maqsad`, `garov_turi`
   - Depozit: `summa`, `valyuta`, `muddat`, `kapitallashtirish`
   - HR onboarding: `lavozim`, `boshlanish_sanasi`, `ish_haqi`, `sho''ba`
4. **Required documents list** — drives Vision Analysis verdict thresholds:
   - Kredit MChJ: pasport, STIR, ustav, balans, soliq dekl., garov hujjati
   - Kredit YaTT: pasport, STIR guvohnomasi, daromad ma'lumotnomasi
   - HR onboarding: pasport, diplom, mehnat daftari (ixtiyoriy)

Template in `templates/schema-customizer.md` (TBD — generated per group during module 11/14).

## Backups & retention

- **Sheets:** Google's automatic version history (180 days)
- **Drive files:** Trash for 30 days after delete
- **Audit log:** All Sheet writes go to a `audit_log` sheet (one row per write) for compliance traceability — required by 3-modul (Komplaens) policy.

## PII / compliance note

**This is real customer data.** When students build their version in module 14:
- Use **synthetic test data only** for demos
- Real PII goes only into the production instance with proper credentials
- Sheet must be in the bank's Google Workspace tenant, never personal Gmail
- Retention policy: drafts >30 days old → auto-delete via separate scheduled workflow (not in this bot's scope)

This ties to `1_deck` slide 11 (Security: Yopiq Kontur, Zero-Training, Data Masking). Students see the architecture HERE; the deeper compliance discussion happens in module 3.

# Data schema — two Google Sheets tabs

The bot's entire state lives in **one Google Sheets spreadsheet** with **two tabs**. No database, no Drive folder, no external storage.

## Tab 1 — `Operators` (filled by you, the bank admin)

This is the only sheet a human touches. Add operators here as your team grows.

| Column | Type | Example | Required |
|---|---|---|---|
| `operator_id` | string | `OP01` | yes — unique key |
| `name` | string | `Aziza Karimova` | yes |
| `category` | enum | `kredit` | yes — must match one of the 5 bot categories |
| `contact` | string | `+998 90 123 45 67` | yes — phone, email, or Telegram username |
| `active` | boolean text | `TRUE` | yes — `TRUE` to receive new applications, `FALSE` to pause |
| `notes` | string | `Avtokredit + ipoteka uchun mas'ul` | no — for your own reference |

### Sample seed data

| operator_id | name | category | contact | active | notes |
|---|---|---|---|---|---|
| OP01 | Aziza Karimova | kredit | +998 90 123 45 67 | TRUE | Avtokredit + ipoteka |
| OP02 | Bekzod Rahimov | karta | +998 91 234 56 78 | TRUE | Debit + kredit kartalari |
| OP03 | Dilfuza Nazarova | depozit | +998 93 345 67 89 | TRUE | Omonat + jamg'arma |
| OP04 | Sherzod Yusupov | shikoyat | +998 94 456 78 90 | TRUE | Mijoz xizmati boshlig'i |
| OP05 | Murod Riskaliyev | info | murod@mohir.dev | TRUE | Umumiy savollar |

**Rule:** every category should have at least one `active = TRUE` operator. If none, the bot will set `operator_name = "Tayinlanmagan"` in the application row, and the customer gets a "no operator available — contact administrator" reply.

## Tab 2 — `Applications` (filled by the bot, every customer message)

The bot writes one row per incoming Telegram message. **Don't edit during a demo** — the bot writes here continuously.

| Column | Type | Example | Filled by |
|---|---|---|---|
| `application_id` | formula | `=ROW()-1` | Spreadsheet formula (auto-increment) |
| `timestamp` | datetime ISO | `2026-05-10T14:30:15.123Z` | Code: Pick Operator (`new Date().toISOString()`) |
| `chat_id` | string | `123456789` | Telegram Trigger via Code |
| `user_name` | string | `Murad` | Telegram Trigger (chat.first_name) via Code |
| `category` | enum | `kredit` | Basic LLM Chain (Gemini) |
| `subject` | string | `Avtokredit so'rovi` | Basic LLM Chain (max 80 chars) |
| `details` | string | `Volkswagen Golf, 50 mln so'm, 5 yilga` | Basic LLM Chain |
| `urgency` | enum | `medium` | Basic LLM Chain |
| `status` | enum | `new` | Code: Pick Operator (always `new` initially) |
| `operator_name` | string | `Aziza Karimova` | Sheets: Read Operators → Code |
| `operator_contact` | string | `+998 90 123 45 67` | Sheets: Read Operators → Code |

### Setting up `application_id` formula

After creating the sheet with header row, in cell `A2`, paste:

```
=ROW()-1
```

Then drag down or fill the formula for as many rows as you expect (or use ARRAYFORMULA for unbounded growth):

```
=ARRAYFORMULA(IF(ROW(A2:A)<=COUNTA(B2:B)+1, ROW(A2:A)-1, ""))
```

This auto-increments as the bot appends rows. The bot's append doesn't write to column A — it only writes columns B onward.

## Categories — the controlled vocabulary

Both the LLM and the lookup use these exact strings. Don't translate or alias.

| Category | Use for |
|---|---|
| `kredit` | All loan inquiries — auto loan, mortgage, microloan, business loan |
| `karta` | All bank cards — debit, credit, virtual, lost/stolen card |
| `depozit` | Savings accounts, term deposits, savings rates |
| `shikoyat` | Service complaints, errors, dissatisfaction |
| `info` | Catch-all — branch hours, bank info, general questions |

If you want to add a category (e.g., `valyuta` for currency exchange):

1. Add it to the **system prompt** in `prompts/system-prompt.md` (the LLM's category list).
2. Add at least one operator with `category = valyuta` in the Operators sheet.

That's it. No code changes needed.

## Spreadsheet setup cheat sheet

1. Create a new Google Sheets spreadsheet (any name).
2. Rename the default sheet to `Operators`. Add the 6 columns above as the header row.
3. Click `+` to add a second tab. Rename it to `Applications`. Add the 11 columns above as the header row.
4. (Optional) In `Applications` cell `A2`, paste the ARRAYFORMULA above.
5. Pre-populate `Operators` with at least 5 rows (one per category). You can use the sample seed data above.
6. Share the spreadsheet with edit access to the Google account (or service account) you'll use in n8n credentials.
7. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`) — you'll plug it into the two `googleSheets` nodes.

## What the bot writes (example after one message)

User sends: *"Avtokredit olmoqchiman, mashina uchun 50 mln so'm kerak, 5 yilga"*

LLM extracts:
```json
{
  "category": "kredit",
  "subject": "Avtokredit so'rovi",
  "details": "Avtokredit olmoqchiman, mashina uchun 50 mln so'm kerak, 5 yilga",
  "urgency": "medium"
}
```

Operators read filters to: `OP01 Aziza Karimova / kredit / +998 90 123 45 67 / TRUE`

Final row appended to `Applications`:

| application_id | timestamp | chat_id | user_name | category | subject | details | urgency | status | operator_name | operator_contact |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-05-10T14:30:15Z | 123456789 | Murad | kredit | Avtokredit so'rovi | Avtokredit olmoqchiman... | medium | new | Aziza Karimova | +998 90 123 45 67 |

Customer receives:
> Salom, Murad!
>
> Arizangiz qabul qilindi.
> Toifa: kredit
> Mavzu: Avtokredit so'rovi
>
> Sizning operator: Aziza Karimova
> Kontakt: +998 90 123 45 67
>
> 24 soat ichida sizga bog'lanamiz. Rahmat!

That's the entire bot.

# Workflow graph — 7 nodes, top to bottom

## ASCII diagram

```
┌──────────────────────────────────────────────────┐
│  1. Telegram Trigger                             │
│     n8n-nodes-base.telegramTrigger               │
│     updates: ["message"]                         │
└─────────────────────┬────────────────────────────┘
                      │ main
                      ▼
┌──────────────────────────────────────────────────┐
│  2. Basic LLM Chain                              │
│     @n8n/n8n-nodes-langchain.chainLlm            │
│     promptType: define                           │
│     systemMessage: <see prompts/system-prompt.md>│
│     hasOutputParser: true (JSON output)          │
└─────────────────────┬────────────────────────────┘
                      │ main           ▲ ai_languageModel
                      │                │
                      │     ┌──────────┴───────────────┐
                      │     │  Gemini Chat Model       │
                      │     │  @n8n/n8n-nodes-         │
                      │     │  langchain.lmChatGoogle  │
                      │     │  Gemini                  │
                      │     │  options.temperature: 0.2│
                      │     └──────────────────────────┘
                      ▼
┌──────────────────────────────────────────────────┐
│  3. Sheets: Read Operators                       │
│     n8n-nodes-base.googleSheets                  │
│     operation: read                              │
│     sheetName: "Operators"                       │
│     filtersUI:                                   │
│       category = ={{ $json.category }}           │
│       active = TRUE                              │
└─────────────────────┬────────────────────────────┘
                      │ main
                      ▼
┌──────────────────────────────────────────────────┐
│  4. Code: Pick Operator                          │
│     n8n-nodes-base.code                          │
│     mode: runOnceForAllItems                     │
│     <picks first row, or fallback if no match>   │
└─────────────────────┬────────────────────────────┘
                      │ main (carries application + operator)
                      ▼
┌──────────────────────────────────────────────────┐
│  5. Sheets: Append Application                   │
│     n8n-nodes-base.googleSheets                  │
│     operation: append                            │
│     sheetName: "Applications"                    │
│     mappingMode: autoMapInputData                │
└─────────────────────┬────────────────────────────┘
                      │ main
                      ▼
┌──────────────────────────────────────────────────┐
│  6. Set: Format Reply                            │
│     n8n-nodes-base.set                           │
│     <builds Uzbek confirmation text>             │
└─────────────────────┬────────────────────────────┘
                      │ main
                      ▼
┌──────────────────────────────────────────────────┐
│  7. Telegram: Send Reply                         │
│     n8n-nodes-base.telegram                      │
│     operation: sendMessage                       │
│     chatId: ={{ $('Telegram Trigger').item       │
│              .json.message.chat.id }}            │
│     text: ={{ $json.reply_text }}                │
└──────────────────────────────────────────────────┘
```

## Node-by-node details

### 1. Telegram Trigger (`telegramTrigger`)

- Listens for new Telegram messages.
- Parameters: `updates: ["message"]`. No additional fields.
- Credential: **Telegram API** (bot token from `@BotFather`).
- Output: Telegram message object — `{message: {chat: {id, first_name, username}, text, ...}}`.

### 2. Basic LLM Chain (`chainLlm`)

- The classifier brain. Single LLM call, no agent loops.
- Parameters:
  - `promptType: "define"`
  - `text: "={{ $json.message.text || $json.message.caption || $json.text || '' }}"` — the user's message
  - `messages.messageValues[0].message: <system prompt — see prompts/system-prompt.md>`
  - `hasOutputParser: true`
- Attached **Gemini Chat Model** node (sub-attached via `ai_languageModel` channel):
  - Type: `@n8n/n8n-nodes-langchain.lmChatGoogleGemini`
  - `options.temperature: 0.2` (low temperature for consistent classification)
  - Credential: **Google Gemini (PaLM) API**.
- Attached **Structured Output Parser** (sub-attached via `ai_outputParser` channel) — see prompt/03-workflow-spec.md for the JSON schema.
- Output: parsed object — `{category, subject, details, urgency}`.

### 3. Google Sheets: Read Operators (`googleSheets`)

- Reads the `Operators` tab, filtered by category + active.
- Parameters:
  - `operation: "read"` (lookup)
  - `documentId.value: <your_spreadsheet_id>`
  - `sheetName.value: "Operators"`
  - `filtersUI.values: [{lookupColumn: "category", lookupValue: "={{ $json.category }}"}, {lookupColumn: "active", lookupValue: "TRUE"}]`
- Credential: **Google Sheets OAuth2 API**.
- Output: 0..N rows of operators matching the filter.

### 4. Code: Pick Operator (`code`)

- Picks the first active operator from the read step. Falls back to "unassigned" if none.
- `mode: "runOnceForAllItems"`
- `jsCode`:
  ```js
  // Grab the LLM output (last classification) and the operator rows
  const llm = $('Basic LLM Chain').item.json;
  const operators = $input.all();

  let operator_name = 'Tayinlanmagan';
  let operator_contact = 'Operator topilmadi — administratorga murojaat qiling.';
  if (operators.length > 0 && operators[0].json) {
    operator_name = operators[0].json.name || operator_name;
    operator_contact = operators[0].json.contact || operator_contact;
  }

  return [{
    json: {
      timestamp: new Date().toISOString(),
      chat_id: String($('Telegram Trigger').item.json.message.chat.id),
      user_name: $('Telegram Trigger').item.json.message.chat.first_name || 'Mehmon',
      category: llm.category,
      subject: llm.subject,
      details: llm.details,
      urgency: llm.urgency,
      status: 'new',
      operator_name,
      operator_contact,
    }
  }];
  ```
- Output: a single object with all fields ready for the Sheets append.

### 5. Google Sheets: Append Application (`googleSheets`)

- Appends a row to `Applications` with all the fields from step 4.
- Parameters:
  - `operation: "append"`
  - `documentId.value: <your_spreadsheet_id>`
  - `sheetName.value: "Applications"`
  - `columns.mappingMode: "autoMapInputData"` — keys in the input object map directly to columns. Column headers in the sheet must match the JSON keys exactly (`timestamp, chat_id, user_name, category, subject, details, urgency, status, operator_name, operator_contact`).
- Output: the appended row (with sheet's auto-generated `application_id` if you've set one up via `=ROW()-1` formula in the spreadsheet).

### 6. Set: Format Reply (`set`)

- Builds the Telegram reply text in Uzbek.
- Parameters:
  - `mode: "manual"`
  - One assignment: `reply_text` = expression below
  ```
  =Salom, {{ $json.user_name }}!

  Arizangiz qabul qilindi.
  Toifa: {{ $json.category }}
  Mavzu: {{ $json.subject }}

  Sizning operator: {{ $json.operator_name }}
  Kontakt: {{ $json.operator_contact }}

  24 soat ichida sizga bog'lanamiz. Rahmat!
  ```
- Output: object with `reply_text` field.

### 7. Telegram: Send Reply (`telegram`)

- Sends the formatted reply back to the user.
- Parameters:
  - `operation: "sendMessage"`
  - `chatId: "={{ $('Telegram Trigger').item.json.message.chat.id }}"` (NOTE: reference Telegram Trigger directly, not `$json.chat_id`, because the field doesn't exist on `$json` after the Set node)
  - `text: "={{ $json.reply_text }}"`
- Credential: same Telegram API credential as the trigger.

## Connections summary

| From | Output type | To | Input |
|---|---|---|---|
| Telegram Trigger | main | Basic LLM Chain | 0 |
| Gemini Chat Model | ai_languageModel | Basic LLM Chain | 0 |
| Structured Output Parser | ai_outputParser | Basic LLM Chain | 0 |
| Basic LLM Chain | main | Sheets: Read Operators | 0 |
| Sheets: Read Operators | main | Code: Pick Operator | 0 |
| Code: Pick Operator | main | Sheets: Append Application | 0 |
| Sheets: Append Application | main | Set: Format Reply | 0 |
| Set: Format Reply | main | Telegram: Send Reply | 0 |

7 main-flow nodes + 2 sub-attached (Gemini + Output Parser) = 9 total entries on the canvas. The 7-node count refers to the main pipeline.

## Why this is "no-code"

- All 7 nodes are configured via dropdowns and field inputs in the n8n UI.
- The only TEXT a builder writes:
  1. The system prompt (copy from `prompts/system-prompt.md`).
  2. The 8-line JS in step 4 (copy from above).
  3. The reply template in step 6 (copy from above).

No JavaScript files. No Docker. No deployment scripts. The whole thing lives inside one n8n workflow.

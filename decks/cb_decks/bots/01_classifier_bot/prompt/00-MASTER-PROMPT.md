# 00 — MASTER PROMPT (single self-contained spec)

Paste this entire file into one AI session that has n8n MCP tools. The AI will build the BankYordamchi classifier bot end-to-end.

---

## Task

Build a 7-node n8n workflow for **BankYordamchi**, a Telegram bot for Ipak Yo'li Bank that classifies incoming customer messages into 5 categories, looks up an active operator from a Google Sheets `Operators` tab, saves a row to an `Applications` tab, and replies to the customer with the operator's contact.

Output: an active n8n workflow with exactly 7 main-pipeline nodes + 2 sub-attached nodes (Gemini Chat Model + Structured Output Parser), 9 nodes total on the canvas.

## What the bot does (one paragraph)

A customer sends a Telegram message. The bot uses Gemini to classify it into one of 5 categories (`kredit`, `karta`, `depozit`, `shikoyat`, `info`) and extract a `subject`, `details`, and `urgency`. It then reads the `Operators` tab filtered by the category + `active=TRUE`, picks the first match, appends a complete row to the `Applications` tab (timestamp, chat_id, user, classification fields, status `new`, operator name + contact), and replies to the user in Uzbek with the application confirmation. Everything happens in seconds. No multi-turn state, no admin commands, no vector store.

## Method (use the n8n MCP tools)

1. Call `get_sdk_reference` for SDK syntax.
2. Call `search_nodes` for: `telegramTrigger`, `telegram`, `chainLlm`, `lmChatGoogleGemini`, `outputParserStructured`, `googleSheets`, `code`, `set`.
3. Call `get_node_types` for ALL 8 of the above.
4. Build the workflow per the spec below.
5. Call `validate_workflow`. Fix errors.
6. Call `create_workflow_from_code`.

## Prerequisites — set up before building

- **Telegram Bot:** create one via `@BotFather` → save token as `Telegram API` credential.
- **Google Sheets:** create one spreadsheet with two tabs:
  - **`Operators`** — columns `operator_id, name, category, contact, active, notes`. Pre-populate with at least one operator per category (kredit/karta/depozit/shikoyat/info), all with `active = TRUE`.
  - **`Applications`** — columns `application_id, timestamp, chat_id, user_name, category, subject, details, urgency, status, operator_name, operator_contact`. Empty.
  - Optional: in `Applications` cell `A2` add formula `=ARRAYFORMULA(IF(ROW(A2:A)<=COUNTA(B2:B)+1, ROW(A2:A)-1, ""))` for auto-incrementing `application_id`.
- **Google credential:** OAuth2 or Service Account with edit access to the spreadsheet → save as `Google Sheets OAuth2 API` credential.
- **Gemini API key:** from `https://aistudio.google.com/apikey` → save as `Google PaLM` credential.

## Constants

```
SPREADSHEET_ID:        <your_spreadsheet_id>
TELEGRAM_BOT_USER:     @your_bot_username
LLM_TEMPERATURE:       0.2
CATEGORIES:            kredit, karta, depozit, shikoyat, info
URGENCY_LEVELS:        low, medium, high
```

---

## The 7-node workflow

### Node 1 — Telegram Trigger

```
Type:           n8n-nodes-base.telegramTrigger
Type version:   1.2
Position:       [240, 240]
Credential:     Telegram API (your bot token)

Parameters:
  updates:           ["message"]
  additionalFields:  {}
```

### Node 2 — Basic LLM Chain (with Gemini + Output Parser sub-attached)

```
Type:           @n8n/n8n-nodes-langchain.chainLlm
Type version:   1.7
Position:       [480, 240]

Parameters:
  promptType:        "define"
  text:              "={{ $json.message.text || $json.message.caption || 'Salom' }}"
  hasOutputParser:   true
  messages:
    messageValues:
      - type:  "system"
        message: |
          Sen BankYordamchi - Ipak Yo'li Bank ning mijozlar uchun yordamchi botisiz.

          VAZIFA: Foydalanuvchi yozgan xabarni o'qing va uni quyidagi 5 toifadan biriga ajrating:
          - kredit (har qanday kredit so'rovi: avtokredit, ipoteka, mikrokredit, biznes krediti)
          - karta (bank kartasi: debit, kredit, virtual, yo'qolgan/o'g'irlangan karta)
          - depozit (jamg'arma hisobi, omonat, foiz stavkalari)
          - shikoyat (xizmat sifati, xato, noroziliklik)
          - info (umumiy savollar, bank haqida — yuqoridagi 4 toifaga to'g'ri kelmaydiganlar)

          Foydalanuvchi xabaridan quyidagilarni ajrating:
          - subject: 1 jumlali qisqa mavzu (max 80 belgi)
          - details: foydalanuvchi yozgan to'liq matn (uni o'zgartirmang)
          - urgency: low / medium / high (high = shoshilinch holat)

          CHIQARISH FORMATI: faqat sof JSON, hech qanday boshqa matn:
          {"category":"kredit","subject":"Avtokredit so'rovi","details":"...","urgency":"medium"}

          QOIDALAR:
          1. Kategoriyani aniq tanlang. Shubha bo'lsa "info".
          2. urgency aniqlanmasa "medium".
          3. Foydalanuvchi alifbosini saqlang (latin/cyrillic).
          4. Hech qachon JSON dan tashqari matn yozmang.
          5. JSON kalitlari aniq: category, subject, details, urgency.
```

### Node 2a (sub-attached) — Gemini Chat Model

```
Type:           @n8n/n8n-nodes-langchain.lmChatGoogleGemini
Type version:   1
Position:       [480, 420]
Credential:     Google PaLM (your Gemini API key)

Parameters:
  options:
    temperature:  0.2

Connection: ai_languageModel → Basic LLM Chain
```

### Node 2b (sub-attached) — Structured Output Parser

```
Type:           @n8n/n8n-nodes-langchain.outputParserStructured
Type version:   1.2
Position:       [620, 420]

Parameters:
  schemaType:    "manual"
  inputSchema:   |
    {
      "type": "object",
      "properties": {
        "category": {
          "type": "string",
          "enum": ["kredit", "karta", "depozit", "shikoyat", "info"]
        },
        "subject": {
          "type": "string",
          "maxLength": 80
        },
        "details": {
          "type": "string"
        },
        "urgency": {
          "type": "string",
          "enum": ["low", "medium", "high"]
        }
      },
      "required": ["category", "subject", "details", "urgency"]
    }

Connection: ai_outputParser → Basic LLM Chain
```

### Node 3 — Sheets: Read Operators

```
Type:           n8n-nodes-base.googleSheets
Type version:   4.5
Position:       [720, 240]
Credential:     Google Sheets OAuth2 API

Parameters:
  operation:  "read"
  documentId:
    __rl:    true
    mode:    "id"
    value:   "{{SPREADSHEET_ID}}"
  sheetName:
    __rl:    true
    mode:    "name"
    value:   "Operators"
  filtersUI:
    values:
      - lookupColumn: "category"
        lookupValue:  "={{ $json.category }}"
      - lookupColumn: "active"
        lookupValue:  "TRUE"
  options: {}
```

### Node 4 — Code: Pick Operator

```
Type:           n8n-nodes-base.code
Type version:   2
Position:       [960, 240]

Parameters:
  mode:    "runOnceForAllItems"
  jsCode:  |
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
        timestamp:        new Date().toISOString(),
        chat_id:          String($('Telegram Trigger').item.json.message.chat.id),
        user_name:        $('Telegram Trigger').item.json.message.chat.first_name || 'Mehmon',
        category:         llm.category,
        subject:          llm.subject,
        details:          llm.details,
        urgency:          llm.urgency,
        status:           'new',
        operator_name,
        operator_contact,
      }
    }];
```

### Node 5 — Sheets: Append Application

```
Type:           n8n-nodes-base.googleSheets
Type version:   4.5
Position:       [1200, 240]
Credential:     Google Sheets OAuth2 API (same as Read Operators)

Parameters:
  operation:  "append"
  documentId:
    __rl:    true
    mode:    "id"
    value:   "{{SPREADSHEET_ID}}"
  sheetName:
    __rl:    true
    mode:    "name"
    value:   "Applications"
  columns:
    mappingMode:    "autoMapInputData"
    value:          {}
    matchingColumns: []
    schema:         []
  options:
    cellFormat:  "USER_ENTERED"
    useAppend:   true
```

### Node 6 — Set: Format Reply

```
Type:           n8n-nodes-base.set
Type version:   3.4
Position:       [1440, 240]

Parameters:
  mode:    "manual"
  assignments:
    assignments:
      - id:     "1"
        name:   "reply_text"
        type:   "string"
        value:  |
          =Salom, {{ $json.user_name }}!

          Arizangiz qabul qilindi.
          Toifa: {{ $json.category }}
          Mavzu: {{ $json.subject }}

          Sizning operator: {{ $json.operator_name }}
          Kontakt: {{ $json.operator_contact }}

          24 soat ichida sizga bog'lanamiz. Rahmat!
  options: {}
```

### Node 7 — Telegram: Send Reply

```
Type:           n8n-nodes-base.telegram
Type version:   1.2
Position:       [1680, 240]
Credential:     Telegram API (same as Trigger)

Parameters:
  operation:  "sendMessage"
  chatId:     "={{ $('Telegram Trigger').item.json.message.chat.id }}"
  text:       "={{ $json.reply_text }}"
  additionalFields:
    appendAttribution: false
```

---

## Connections

```
Telegram Trigger          --main--> Basic LLM Chain
Gemini Chat Model         --ai_languageModel--> Basic LLM Chain
Structured Output Parser  --ai_outputParser--> Basic LLM Chain
Basic LLM Chain           --main--> Sheets: Read Operators
Sheets: Read Operators    --main--> Code: Pick Operator
Code: Pick Operator       --main--> Sheets: Append Application
Sheets: Append Application --main--> Set: Format Reply
Set: Format Reply         --main--> Telegram: Send Reply
```

8 connections total (7 `main` + 2 langchain typed `ai_languageModel` + `ai_outputParser`).

---

## Final acceptance

- 9 nodes on the canvas (7 main + 2 sub-attached).
- 8 connections including the 2 langchain typed connections.
- 1 trigger (Telegram).
- `validate_workflow` returns no errors.
- Send `"Avtokredit olmoqchiman 50 mln so'm mashina uchun"` from your Telegram → within 5 seconds:
  - 1 new row in `Applications` sheet with `category=kredit`, `urgency=medium`, `operator_name=<your kredit operator>`.
  - Reply in your Telegram chat with operator's name + contact.
- Send `"Kartam yo'qoldi tezda blokirovka qiling!!!"` → row with `category=karta, urgency=high`, reply with karta operator.

When both above tests pass, the bot is live.

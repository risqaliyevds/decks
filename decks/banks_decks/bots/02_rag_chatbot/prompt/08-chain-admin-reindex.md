# Reindex — re-ingest all active documents

> 17 nodes for /reindex command. Reads active docs, asks for confirmation, on Yes loops over docs (downloads from Drive, runs through embedding + vector store), counts processed, replies done.

**Node count:** 17

**Build order (topological):**

1. `Reindex Init Read Docs`
2. `Reindex Init Build Prompt`
3. `Reindex Init Set State`
4. `Reindex Confirm Decide`
5. `Reindex Confirm If Yes`
6. `Reindex Yes Read Docs`
7. `Reindex Done Count`
8. `Reindex Done Clear State`
9. `Reindex Done Reply`
10. `Reindex Yes Download`
11. `Reindex Insert Vector Store`
12. `Reindex Gemini Embeddings`
13. `Reindex Data Loader`
14. `Reindex Text Splitter`
15. `Reindex Yes Loop`
16. `Reindex No Clear State`
17. `Reindex No Reply`

---

## Reindex Init Read Docs

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2368, 2816]
- **Always output data:** true
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Reindex Init Build Prompt`

### Parameters

```json
{
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "Documents"
  },
  "filtersUI": {
    "values": [
      {
        "lookupColumn": "status",
        "lookupValue": "active"
      }
    ]
  },
  "options": {}
}
```

---

## Reindex Init Build Prompt

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [2688, 2816]
- **Inbound:**
  - from `Reindex Init Read Docs` → input 0
- **Outbound:**
  - output 0 → `Reindex Init Set State`

### Parameters

```json
{
  "jsCode": "const allItems = $input.all();\nconst items = [];\nfor (const it of allItems) { if (it.json && it.json.doc_id) items.push(it); }\nconst count = items.length;\nconst estSeconds = Math.max(10, count * 8);\nif (count === 0) return [{ json: { reply_text: 'Aktiv hujjat yoq. /add_doc bilan qoshing.', count: 0, est_seconds: 0, empty: true } }];\nconst reply = 'Indeksni qayta qurmoqchimisiz? ' + count + ' ta hujjat qayta indekslanadi (~' + estSeconds + ' sek).\\n/yes - davom etish - /no - bekor qilish';\nreturn [{ json: { reply_text: reply, count: count, est_seconds: estSeconds, empty: false } }];\n"
}
```

---

## Reindex Init Set State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [3008, 2816]
- **Inbound:**
  - from `Reindex Init Build Prompt` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "operation": "appendOrUpdate",
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "AdminStates"
  },
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"={{ $json.empty ? \\\"IDLE\\\" : \\\"REINDEX_CONFIRM\\\" }}\",\"stash\":\"\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"/reindex\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Reindex Confirm Decide

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [1344, 3392]
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Reindex Confirm If Yes`

### Parameters

```json
{
  "jsCode": "const route = $('Compute Route').first().json;\nconst cmd = (route.command || '').toLowerCase();\nconst text = (route.text || '').toLowerCase().trim();\nlet decision;\nif (cmd === '/yes' || text === 'yes' || text === 'ha') decision = 'yes';\nelse if (cmd === '/no' || text === 'no' || text === 'yoq') decision = 'no';\nelse decision = 'invalid';\nreturn [{ json: { decision: decision } }];\n"
}
```

---

## Reindex Confirm If Yes

- **Node type:** `n8n-nodes-base.if`
- **Type version:** 2.3
- **Position:** [1568, 3392]
- **Inbound:**
  - from `Reindex Confirm Decide` → input 0
- **Outbound:**
  - output 0 → `Reindex Yes Read Docs`
  - output 1 → `Reindex No Clear State`

### Parameters

```json
{
  "conditions": {
    "options": {
      "caseSensitive": true,
      "leftValue": "",
      "typeValidation": "strict",
      "version": 2
    },
    "conditions": [
      {
        "id": "cond-rx-yes",
        "leftValue": "={{ $json.decision }}",
        "rightValue": "yes",
        "operator": {
          "type": "string",
          "operation": "equals"
        }
      }
    ],
    "combinator": "and"
  },
  "options": {}
}
```

---

## Reindex Yes Read Docs

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [1856, 3104]
- **Always output data:** true
- **Inbound:**
  - from `Reindex Confirm If Yes` → input 0
- **Outbound:**
  - output 0 → `Reindex Yes Loop`

### Parameters

```json
{
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "Documents"
  },
  "filtersUI": {
    "values": [
      {
        "lookupColumn": "status",
        "lookupValue": "active"
      }
    ]
  },
  "options": {}
}
```

---

## Reindex Done Count

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [2368, 3008]
- **Inbound:**
  - from `Reindex Yes Loop` → input 0
- **Outbound:**
  - output 0 → `Reindex Done Clear State`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "doc_count",
        "value": "={{ $('Reindex Yes Read Docs').all().length }}",
        "type": "number"
      },
      {
        "id": "2",
        "name": "total_chunks",
        "value": "={{ $('Reindex Insert Vector Store').all().reduce((s, it) => s + (it.json && (it.json.documentsCount || it.json.chunksAdded || 0) || 0), 0) }}",
        "type": "number"
      }
    ]
  },
  "options": {}
}
```

---

## Reindex Done Clear State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 3008]
- **Inbound:**
  - from `Reindex Done Count` → input 0
- **Outbound:**
  - output 0 → `Reindex Done Reply`

### Parameters

```json
{
  "operation": "appendOrUpdate",
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "AdminStates"
  },
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"IDLE\",\"stash\":\"\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"admin_reindex_done\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Reindex Done Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 3008]
- **Inbound:**
  - from `Reindex Done Clear State` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "reply_text",
        "value": "={{ 'Reindex tugadi: ' + $('Reindex Done Count').item.json.doc_count + ' hujjat, ' + $('Reindex Done Count').item.json.total_chunks + ' chunks.' }}",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Reindex Yes Download

- **Node type:** `n8n-nodes-base.googleDrive`
- **Type version:** 3
- **Position:** [2368, 3312]
- **Inbound:**
  - from `Reindex Yes Loop` → input 0
- **Outbound:**
  - output 0 → `Reindex Insert Vector Store`

### Parameters

```json
{
  "operation": "download",
  "fileId": {
    "__rl": true,
    "mode": "id",
    "value": "={{ $json.drive_file_id }}"
  },
  "options": {
    "binaryPropertyName": "data"
  }
}
```

---

## Reindex Insert Vector Store

- **Node type:** `@n8n/n8n-nodes-langchain.vectorStoreInMemory`
- **Type version:** 1.3
- **Position:** [2624, 3200]
- **Inbound:**
  - from `Reindex Yes Download` → input 0
  - from `Reindex Gemini Embeddings` → input 0 *(via ai_embedding)*
  - from `Reindex Data Loader` → input 0 *(via ai_document)*
- **Outbound:**
  - output 0 → `Reindex Yes Loop`

### Parameters

```json
{
  "mode": "insert",
  "memoryKey": {
    "__rl": true,
    "mode": "list",
    "value": "bank_pdf_corpus",
    "cachedResultName": "bank_pdf_corpus"
  },
  "clearStore": "={{ $('Reindex Yes Loop').context.currentRunIndex === 0 }}"
}
```

---

## Reindex Gemini Embeddings

- **Node type:** `@n8n/n8n-nodes-langchain.embeddingsGoogleGemini`
- **Type version:** 1
- **Position:** [2624, 3424]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 *(via ai_embedding)* → `Reindex Insert Vector Store`

### Parameters

```json
{
  "modelName": "models/gemini-embedding-001"
}
```

---

## Reindex Data Loader

- **Node type:** `@n8n/n8n-nodes-langchain.documentDefaultDataLoader`
- **Type version:** 1.1
- **Position:** [2752, 3424]
- **Inbound:**
  - from `Reindex Text Splitter` → input 0 *(via ai_textSplitter)*
- **Outbound:**
  - output 0 *(via ai_document)* → `Reindex Insert Vector Store`

### Parameters

```json
{
  "dataType": "binary",
  "textSplittingMode": "custom",
  "options": {
    "metadata": {
      "metadataValues": [
        {
          "name": "source_filename",
          "value": "={{ $('Reindex Yes Download').item.json.name }}"
        },
        {
          "name": "drive_file_id",
          "value": "={{ $('Reindex Yes Download').item.json.id }}"
        },
        {
          "name": "reindexed_at",
          "value": "={{ $now.toISO() }}"
        }
      ]
    }
  }
}
```

---

## Reindex Text Splitter

- **Node type:** `@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter`
- **Type version:** 1
- **Position:** [2752, 3632]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 *(via ai_textSplitter)* → `Reindex Data Loader`

### Parameters

```json
{
  "chunkSize": 800,
  "chunkOverlap": 120,
  "options": {}
}
```

---

## Reindex Yes Loop

- **Node type:** `n8n-nodes-base.splitInBatches`
- **Type version:** 3
- **Position:** [2144, 3104]
- **Inbound:**
  - from `Reindex Yes Read Docs` → input 0
  - from `Reindex Insert Vector Store` → input 0
- **Outbound:**
  - output 0 → `Reindex Done Count`
  - output 1 → `Reindex Yes Download`

### Parameters

```json
{
  "options": {}
}
```

---

## Reindex No Clear State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 3808]
- **Inbound:**
  - from `Reindex Confirm If Yes` → input 0
- **Outbound:**
  - output 0 → `Reindex No Reply`

### Parameters

```json
{
  "operation": "appendOrUpdate",
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "AdminStates"
  },
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"IDLE\",\"stash\":\"\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"admin_reindex_cancel\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Reindex No Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 3808]
- **Inbound:**
  - from `Reindex No Clear State` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "reply_text",
        "value": "Bekor qilindi.",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

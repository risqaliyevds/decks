# Delete Doc — list, pick, confirm, soft-delete

> 13 nodes for /delete command. Reads docs, presents numbered list, captures user pick, prompts for confirmation, and on Yes marks deleted in sheet + trashes Drive file.

**Node count:** 13

**Build order (topological):**

1. `Delete Init Read Docs`
2. `Delete Init Format Stash`
3. `Delete Init Set State`
4. `Delete Num Pick`
5. `Delete Num Set State`
6. `Delete Confirm Decide`
7. `Delete Confirm If Yes`
8. `Delete Confirm Yes Mark Doc Deleted`
9. `Delete Confirm Yes Trash Drive File`
10. `Delete Confirm Yes Clear State`
11. `Delete Confirm Yes Reply`
12. `Delete Confirm No Clear State`
13. `Delete Confirm No Reply`

---

## Delete Init Read Docs

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2368, 2048]
- **Always output data:** true
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Delete Init Format Stash`

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

## Delete Init Format Stash

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [2688, 2048]
- **Inbound:**
  - from `Delete Init Read Docs` → input 0
- **Outbound:**
  - output 0 → `Delete Init Set State`

### Parameters

```json
{
  "jsCode": "const allItems = $input.all();\nconst items = [];\nfor (const it of allItems) { if (it.json && it.json.doc_id) items.push(it); }\nif (items.length === 0) {\n  return [{ json: { reply_text: 'Hujjat yoq. /add_doc bilan qoshing.', stash_payload: '[]', empty: true } }];\n}\nconst stashList = [];\nfor (let i = 0; i < items.length; i++) {\n  const j = items[i].json;\n  stashList.push({ n: i + 1, doc_id: j.doc_id, title: j.title || j.original_filename || '(untitled)', drive_file_id: j.drive_file_id || '' });\n}\nconst lines = [];\nfor (const s of stashList) lines.push(s.n + '. ' + s.title + ' (' + s.doc_id + ')');\nconst reply = 'Hujjatlar:\\n' + lines.join('\\n') + '\\n\\nQaysi raqamli hujjatni ochiramiz? Raqamni yuboring (yoki /cancel).';\nreturn [{ json: { reply_text: reply, stash_payload: JSON.stringify(stashList), empty: false } }];\n"
}
```

---

## Delete Init Set State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [3008, 2048]
- **Inbound:**
  - from `Delete Init Format Stash` → input 0
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
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"={{ $json.empty ? \\\"IDLE\\\" : \\\"AWAITING_DELETE_NUM\\\" }}\",\"stash\":\"={{ $json.stash_payload }}\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"/delete_doc\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Delete Num Pick

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [2688, 2240]
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Delete Num Set State`

### Parameters

```json
{
  "jsCode": "const route = $('Compute Route').first().json;\nconst text = (route.text || '').trim();\nconst num = parseInt(text, 10);\nlet stashList = [];\ntry { stashList = JSON.parse(route.stash || '[]'); } catch (e) { stashList = []; }\nif (!Number.isInteger(num) || num < 1 || num > stashList.length) {\n  const lines = [];\n  for (const s of stashList) lines.push(s.n + '. ' + s.title + ' (' + s.doc_id + ')');\n  return [{ json: { reply_text: 'Notogri raqam. 1-' + stashList.length + ' oraliqdagi raqam kiriting:\\n' + lines.join('\\n') + '\\n\\nYoki /cancel.', next_state: 'AWAITING_DELETE_NUM', next_stash: route.stash || '[]', invalid: true } }];\n}\nconst picked = stashList[num - 1];\nreturn [{ json: { reply_text: 'Tasdiqlaysizmi: \\'' + picked.title + '\\'? /yes - ochirish - /no - bekor qilish', next_state: 'AWAITING_DELETE_CONFIRM', next_stash: JSON.stringify({ doc_id: picked.doc_id, title: picked.title, drive_file_id: picked.drive_file_id || '' }), invalid: false } }];\n"
}
```

---

## Delete Num Set State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [3008, 2240]
- **Inbound:**
  - from `Delete Num Pick` → input 0
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
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"={{ $json.next_state }}\",\"stash\":\"={{ $json.next_stash }}\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"/delete_doc\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Delete Confirm Decide

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [1568, 2432]
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Delete Confirm If Yes`

### Parameters

```json
{
  "jsCode": "const route = $('Compute Route').first().json;\nconst cmd = (route.command || '').toLowerCase();\nconst text = (route.text || '').toLowerCase().trim();\nlet payload = {};\ntry { payload = JSON.parse(route.stash || '{}'); } catch (e) { payload = {}; }\nlet decision;\nif (cmd === '/yes' || text === 'yes' || text === 'ha') decision = 'yes';\nelse if (cmd === '/no' || text === 'no' || text === 'yoq') decision = 'no';\nelse decision = 'invalid';\nreturn [{ json: { decision: decision, doc_id: payload.doc_id || '', title: payload.title || '', drive_file_id: payload.drive_file_id || '' } }];\n"
}
```

---

## Delete Confirm If Yes

- **Node type:** `n8n-nodes-base.if`
- **Type version:** 2.3
- **Position:** [1856, 2432]
- **Inbound:**
  - from `Delete Confirm Decide` → input 0
- **Outbound:**
  - output 0 → `Delete Confirm Yes Mark Doc Deleted`
  - output 1 → `Delete Confirm No Clear State`

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
        "id": "cond-yes",
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

## Delete Confirm Yes Mark Doc Deleted

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2144, 2432]
- **Inbound:**
  - from `Delete Confirm If Yes` → input 0
- **Outbound:**
  - output 0 → `Delete Confirm Yes Trash Drive File`

### Parameters

```json
{
  "operation": "update",
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
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"doc_id\":\"={{ $('Delete Confirm Decide').item.json.doc_id }}\",\"status\":\"deleted\",\"deleted_at\":\"={{ $now.toISO() }}\"},\"matchingColumns\":[\"doc_id\"],\"schema\":[{\"id\":\"doc_id\",\"displayName\":\"doc_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"status\",\"displayName\":\"status\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"deleted_at\",\"displayName\":\"deleted_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Delete Confirm Yes Trash Drive File

- **Node type:** `n8n-nodes-base.googleDrive`
- **Type version:** 3
- **Position:** [2368, 2432]
- **Inbound:**
  - from `Delete Confirm Yes Mark Doc Deleted` → input 0
- **Outbound:**
  - output 0 → `Delete Confirm Yes Clear State`

### Parameters

```json
{
  "operation": "deleteFile",
  "fileId": {
    "__rl": true,
    "mode": "id",
    "value": "={{ $('Delete Confirm Decide').item.json.drive_file_id }}"
  },
  "options": {
    "deletePermanently": false
  }
}
```

---

## Delete Confirm Yes Clear State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 2432]
- **Inbound:**
  - from `Delete Confirm Yes Trash Drive File` → input 0
- **Outbound:**
  - output 0 → `Delete Confirm Yes Reply`

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
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"IDLE\",\"stash\":\"\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"admin_delete_done\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Delete Confirm Yes Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 2432]
- **Inbound:**
  - from `Delete Confirm Yes Clear State` → input 0
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
        "value": "={{ 'Ochirildi (soft delete): ' + $('Delete Confirm Decide').item.json.title + '\\nVector chunks /reindex paytida ochiriladi.\\nDrive fayl trashga kochirildi.' }}",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Delete Confirm No Clear State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 2624]
- **Inbound:**
  - from `Delete Confirm If Yes` → input 0
- **Outbound:**
  - output 0 → `Delete Confirm No Reply`

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
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"IDLE\",\"stash\":\"\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"admin_delete_cancel\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Delete Confirm No Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 2624]
- **Inbound:**
  - from `Delete Confirm No Clear State` → input 0
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

# Admin simple paths — Help / List / Stats / Cancel

> 7 nodes covering the four read-only or no-op admin paths. Each is short (1-2 nodes) and feeds directly into Send Reply.

**Node count:** 7

**Build order (topological):**

1. `Admin Help Reply`
2. `List Docs Read Documents`
3. `List Docs Format`
4. `Stats Read Docs`
5. `Stats Format`
6. `Cancel Clear State`
7. `Cancel Reply`

---

## Admin Help Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 768]
- **Inbound:**
  - from `Route Request` → input 0
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
        "value": "Admin buyruqlari:\n/list_docs - indekslangan hujjatlar\n/add_doc - yangi PDF/MD qoshish\n/delete_doc - hujjat ochirish\n/reindex - indeksni qayta qurish\n/stats - statistika\n/cancel - joriy amalni bekor qilish\n\nFoydalanuvchi savollari uchun: oddiygina kredit savolingizni yozing.",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## List Docs Read Documents

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 960]
- **Always output data:** true
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `List Docs Format`

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

## List Docs Format

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [3008, 960]
- **Inbound:**
  - from `List Docs Read Documents` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "jsCode": "const items = $input.all();\nif (!items || items.length === 0 || !items[0].json || !items[0].json.doc_id) {\n  return [{ json: { reply_text: 'Indekslangan hujjat yoq. /add_doc bilan qoshing.' } }];\n}\nconst lines = [];\nconst max = Math.min(items.length, 50);\nfor (let i = 0; i < max; i++) {\n  const r = items[i].json;\n  const title = r.title || r.original_filename || '(untitled)';\n  const docId = r.doc_id || '(no-id)';\n  const addedAt = r.added_at ? String(r.added_at).split('T')[0] : '';\n  lines.push((i + 1) + '. ' + title + ' (' + docId + ')' + (addedAt ? ' - ' + addedAt : ''));\n}\nconst reply = 'Indekslangan hujjatlar (' + items.length + '):\\n' + lines.join('\\n');\nreturn [{ json: { reply_text: reply } }];\n"
}
```

---

## Stats Read Docs

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 4000]
- **Always output data:** true
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Stats Format`

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
  "options": {}
}
```

---

## Stats Format

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [3008, 4000]
- **Inbound:**
  - from `Stats Read Docs` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "jsCode": "const allItems = $input.all();\nconst items = [];\nfor (const it of allItems) { if (it.json && it.json.doc_id) items.push(it); }\nconst active = []; const deleted = [];\nfor (const it of items) {\n  if (it.json.status === 'deleted') deleted.push(it);\n  else active.push(it);\n}\nlet totalChunks = 0;\nfor (const it of active) totalChunks += (Number(it.json.chunk_count) || 0);\nconst sortedActive = active.slice().sort(function(a, b){ return (Number(b.json.chunk_count) || 0) - (Number(a.json.chunk_count) || 0); });\nconst top5 = sortedActive.slice(0, 5);\nconst topLines = [];\nfor (let i = 0; i < top5.length; i++) {\n  const j = top5[i].json;\n  const t = j.title || j.original_filename || '(untitled)';\n  const c = Number(j.chunk_count) || 0;\n  topLines.push((i + 1) + '. ' + t + ' - ' + c + ' chunks');\n}\nconst reply = 'Stats:\\n- Aktiv hujjatlar: ' + active.length + '\\n- Ochirilgan: ' + deleted.length + '\\n- Jami chunks (aktiv): ' + totalChunks + '\\n- Eng katta hujjatlar:\\n' + (topLines.length ? topLines.join('\\n') : '   (yoq)');\nreturn [{ json: { reply_text: reply } }];\n"
}
```

---

## Cancel Clear State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 4192]
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Cancel Reply`

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
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"IDLE\",\"stash\":\"\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"/cancel\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Cancel Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 4192]
- **Inbound:**
  - from `Cancel Clear State` → input 0
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

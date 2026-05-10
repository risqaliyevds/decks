# Initial ingestion — Manual Trigger bootstrap

> 13 nodes in a separate workflow path triggered manually. Lists Drive files, loops over them, downloads each, runs through embedding + vector store, builds a row per doc, appends to Documents sheet. Used to bootstrap the initial corpus.

**Node count:** 13

**Build order (topological):**

1. `Hujjat indeksini yangilash`
2. `List Drive Files`
3. `Loop Over Files`
4. `Limit to One Summary`
5. `Build Aggregate Summary`
6. `Ingest Complete`
7. `Download File`
8. `Insert into Vector Store`
9. `Ingest Gemini Embeddings`
10. `Default Data Loader`
11. `Recursive Character Text Splitter`
12. `Build Summary Row`
13. `Append to Documents Sheet`

---

## Hujjat indeksini yangilash

- **Node type:** `n8n-nodes-base.manualTrigger`
- **Type version:** 1
- **Position:** [0, 4816]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 → `List Drive Files`

### Parameters

```json
{}
```

---

## List Drive Files

- **Node type:** `n8n-nodes-base.googleDrive`
- **Type version:** 3
- **Position:** [224, 4816]
- **Inbound:**
  - from `Hujjat indeksini yangilash` → input 0
- **Outbound:**
  - output 0 → `Loop Over Files`

### Parameters

```json
{
  "resource": "fileFolder",
  "operation": "search",
  "searchMethod": "query",
  "queryString": "'1cPPP9FSi3Znoetgth69RA-2gvxbYdHjR' in parents and trashed = false and (mimeType = 'text/markdown' or mimeType = 'text/plain' or mimeType = 'application/pdf')",
  "returnAll": true,
  "filter": {
    "driveId": {
      "__rl": true,
      "mode": "list",
      "value": "My Drive"
    },
    "folderId": {
      "__rl": true,
      "mode": "id",
      "value": "1cPPP9FSi3Znoetgth69RA-2gvxbYdHjR"
    },
    "whatToSearch": "files",
    "includeTrashed": false
  },
  "options": {
    "fields": [
      "id",
      "name",
      "mimeType",
      "webViewLink"
    ]
  }
}
```

---

## Loop Over Files

- **Node type:** `n8n-nodes-base.splitInBatches`
- **Type version:** 3
- **Position:** [448, 4816]
- **Inbound:**
  - from `List Drive Files` → input 0
  - from `Append to Documents Sheet` → input 0
- **Outbound:**
  - output 0 → `Limit to One Summary`
  - output 1 → `Download File`

### Parameters

```json
{
  "options": {}
}
```

---

## Limit to One Summary

- **Node type:** `n8n-nodes-base.limit`
- **Type version:** 1
- **Position:** [672, 4416]
- **Inbound:**
  - from `Loop Over Files` → input 0
- **Outbound:**
  - output 0 → `Build Aggregate Summary`

### Parameters

```json
{}
```

---

## Build Aggregate Summary

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [960, 4416]
- **Inbound:**
  - from `Limit to One Summary` → input 0
- **Outbound:**
  - output 0 → `Ingest Complete`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "total_files",
        "value": "={{ $('List Drive Files').all().length }}",
        "type": "number"
      },
      {
        "id": "2",
        "name": "total_chunks",
        "value": "={{ $('Build Summary Row').all().reduce((sum, item) => sum + (item.json.chunk_count || 0), 0) }}",
        "type": "number"
      },
      {
        "id": "3",
        "name": "completed_at",
        "value": "={{ $now.toISO() }}",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Ingest Complete

- **Node type:** `n8n-nodes-base.noOp`
- **Type version:** 1
- **Position:** [1248, 4416]
- **Inbound:**
  - from `Build Aggregate Summary` → input 0
- **Outbound:** *(none — terminal)*

### Parameters

```json
{}
```

---

## Download File

- **Node type:** `n8n-nodes-base.googleDrive`
- **Type version:** 3
- **Position:** [672, 4816]
- **Inbound:**
  - from `Loop Over Files` → input 0
- **Outbound:**
  - output 0 → `Insert into Vector Store`

### Parameters

```json
{
  "resource": "file",
  "operation": "download",
  "fileId": {
    "__rl": true,
    "mode": "id",
    "value": "={{ $json.id }}"
  },
  "options": {
    "binaryPropertyName": "data"
  }
}
```

---

## Insert into Vector Store

- **Node type:** `@n8n/n8n-nodes-langchain.vectorStoreInMemory`
- **Type version:** 1.3
- **Position:** [896, 4816]
- **Inbound:**
  - from `Download File` → input 0
  - from `Ingest Gemini Embeddings` → input 0 *(via ai_embedding)*
  - from `Default Data Loader` → input 0 *(via ai_document)*
- **Outbound:**
  - output 0 → `Build Summary Row`

### Parameters

```json
{
  "mode": "insert",
  "memoryKey": {
    "__rl": true,
    "mode": "list",
    "value": "bank_pdf_corpus",
    "cachedResultName": "bank_pdf_corpus"
  }
}
```

---

## Ingest Gemini Embeddings

- **Node type:** `@n8n/n8n-nodes-langchain.embeddingsGoogleGemini`
- **Type version:** 1
- **Position:** [912, 5040]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 *(via ai_embedding)* → `Insert into Vector Store`

### Parameters

```json
{
  "modelName": "models/gemini-embedding-001"
}
```

---

## Default Data Loader

- **Node type:** `@n8n/n8n-nodes-langchain.documentDefaultDataLoader`
- **Type version:** 1.1
- **Position:** [1040, 5040]
- **Inbound:**
  - from `Recursive Character Text Splitter` → input 0 *(via ai_textSplitter)*
- **Outbound:**
  - output 0 *(via ai_document)* → `Insert into Vector Store`

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
          "value": "={{ $('Download File').item.json.name }}"
        },
        {
          "name": "drive_file_id",
          "value": "={{ $('Download File').item.json.id }}"
        },
        {
          "name": "mime_type",
          "value": "={{ $('Download File').item.json.mimeType }}"
        }
      ]
    }
  }
}
```

---

## Recursive Character Text Splitter

- **Node type:** `@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter`
- **Type version:** 1
- **Position:** [1040, 5248]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 *(via ai_textSplitter)* → `Default Data Loader`

### Parameters

```json
{
  "chunkSize": 800,
  "chunkOverlap": 120,
  "options": {}
}
```

---

## Build Summary Row

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [1248, 4816]
- **Inbound:**
  - from `Insert into Vector Store` → input 0
- **Outbound:**
  - output 0 → `Append to Documents Sheet`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "doc_id",
        "value": "={{ $('Download File').item.json.id }}",
        "type": "string"
      },
      {
        "id": "2",
        "name": "title",
        "value": "={{ $('Download File').item.json.name }}",
        "type": "string"
      },
      {
        "id": "3",
        "name": "original_filename",
        "value": "={{ $('Download File').item.json.name }}",
        "type": "string"
      },
      {
        "id": "4",
        "name": "drive_url",
        "value": "={{ \"https://drive.google.com/file/d/\" + $('Download File').item.json.id + \"/view\" }}",
        "type": "string"
      },
      {
        "id": "5",
        "name": "drive_file_id",
        "value": "={{ $('Download File').item.json.id }}",
        "type": "string"
      },
      {
        "id": "6",
        "name": "chunk_count",
        "value": "={{ Array.isArray($json) ? $json.length : ($json.chunksAdded || $json.documentsCount || 0) }}",
        "type": "number"
      },
      {
        "id": "7",
        "name": "embedding_model",
        "value": "models/gemini-embedding-001",
        "type": "string"
      },
      {
        "id": "8",
        "name": "vector_store_namespace",
        "value": "bank_pdf_corpus",
        "type": "string"
      },
      {
        "id": "9",
        "name": "added_at",
        "value": "={{ $now.toISO() }}",
        "type": "string"
      },
      {
        "id": "10",
        "name": "added_by",
        "value": "ingest_workflow",
        "type": "string"
      },
      {
        "id": "11",
        "name": "status",
        "value": "active",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Append to Documents Sheet

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [1472, 4928]
- **Inbound:**
  - from `Build Summary Row` → input 0
- **Outbound:**
  - output 0 → `Loop Over Files`

### Parameters

```json
{
  "operation": "append",
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
  "columns": "{\"mappingMode\":\"autoMapInputData\",\"value\":{},\"matchingColumns\":[],\"schema\":[],\"attemptToConvertTypes\":false,\"convertFieldsToString\":false}",
  "options": {
    "cellFormat": "USER_ENTERED",
    "useAppend": true
  }
}
```

---

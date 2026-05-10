# Spine — Telegram trigger → switch routing

> 6-node entrypoint that receives every Telegram message, looks up the user's admin status, computes which command/path applies, and switches to one of 14 outputs.

**Node count:** 6

**Build order (topological):**

1. `Telegram Trigger`
2. `Parse Input`
3. `Lookup Admins`
4. `Lookup AdminStates`
5. `Compute Route`
6. `Route Request`

---

## Telegram Trigger

- **Node type:** `n8n-nodes-base.telegramTrigger`
- **Type version:** 1.2
- **Position:** [0, 2048]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 → `Parse Input`

### Parameters

```json
{
  "updates": [
    "message"
  ],
  "additionalFields": {}
}
```

---

## Parse Input

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [224, 2048]
- **Inbound:**
  - from `Telegram Trigger` → input 0
- **Outbound:**
  - output 0 → `Lookup Admins`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "chat_id",
        "value": "={{ String($json.message.chat.id) }}",
        "type": "string"
      },
      {
        "id": "2",
        "name": "user_id",
        "value": "={{ String($json.message.from.id) }}",
        "type": "string"
      },
      {
        "id": "3",
        "name": "text",
        "value": "={{ ($json.message.text || $json.message.caption || \"\").trim() }}",
        "type": "string"
      },
      {
        "id": "4",
        "name": "command",
        "value": "={{ ($json.message.text || \"\").trim().startsWith(\"/\") ? ($json.message.text || \"\").trim().split(\" \")[0].toLowerCase() : \"\" }}",
        "type": "string"
      },
      {
        "id": "5",
        "name": "has_file",
        "value": "={{ Boolean($json.message.document) }}",
        "type": "boolean"
      },
      {
        "id": "6",
        "name": "file_id",
        "value": "={{ $json.message.document ? $json.message.document.file_id : \"\" }}",
        "type": "string"
      },
      {
        "id": "7",
        "name": "file_name",
        "value": "={{ $json.message.document ? $json.message.document.file_name : \"\" }}",
        "type": "string"
      },
      {
        "id": "8",
        "name": "file_mime",
        "value": "={{ $json.message.document ? $json.message.document.mime_type : \"\" }}",
        "type": "string"
      },
      {
        "id": "9",
        "name": "callback_data",
        "value": "={{ $json.callback_query ? $json.callback_query.data : \"\" }}",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Lookup Admins

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [448, 2048]
- **Always output data:** true
- **Inbound:**
  - from `Parse Input` → input 0
- **Outbound:**
  - output 0 → `Lookup AdminStates`

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
    "mode": "list",
    "value": "gid=0",
    "cachedResultName": "Admins"
  },
  "filtersUI": {
    "values": [
      {
        "lookupColumn": "chat_id",
        "lookupValue": "={{ $json.chat_id }}"
      }
    ]
  },
  "options": {}
}
```

---

## Lookup AdminStates

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [672, 2048]
- **Always output data:** true
- **Inbound:**
  - from `Lookup Admins` → input 0
- **Outbound:**
  - output 0 → `Compute Route`

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
    "value": "AdminStates"
  },
  "filtersUI": {
    "values": [
      {
        "lookupColumn": "chat_id",
        "lookupValue": "={{ $('Parse Input').item.json.chat_id }}"
      }
    ]
  },
  "options": {
    "returnFirstMatch": true
  }
}
```

---

## Compute Route

- **Node type:** `n8n-nodes-base.code`
- **Type version:** 2
- **Position:** [896, 2048]
- **Inbound:**
  - from `Lookup AdminStates` → input 0
- **Outbound:**
  - output 0 → `Route Request`

### Parameters

```json
{
  "jsCode": "const parsed = $('Parse Input').first().json;\nconst adminRows = $('Lookup Admins').all();\nconst isAdmin = adminRows.length > 0 && adminRows.some(function(r){ return String(r.json && r.json.chat_id || '') === String(parsed.chat_id); });\nlet pendingState = 'IDLE'; let enteredAt = null; let stash = null;\ntry {\n  const stateRows = $('Lookup AdminStates').all();\n  const stateRow = stateRows.find(function(r){ return String(r.json && r.json.chat_id || '') === String(parsed.chat_id); });\n  if (stateRow && stateRow.json) {\n    pendingState = stateRow.json.state || 'IDLE';\n    enteredAt = stateRow.json.entered_at || null;\n    stash = stateRow.json.stash || null;\n  }\n} catch (e) { pendingState = 'IDLE'; }\nconst stateExpired = enteredAt && (Date.now() - new Date(enteredAt).getTime()) > 3600 * 1000;\nconst effectiveState = stateExpired ? 'IDLE' : pendingState;\nconst command = (parsed.command || '').toLowerCase();\nconst text = (parsed.text || '').trim();\nconst hasFile = Boolean(parsed.has_file);\nlet routeKey;\nif (!isAdmin) routeKey = 'qa';\nelse if (command === '/cancel') routeKey = 'admin_cancel';\nelse if (effectiveState === 'AWAITING_DOC' && hasFile) routeKey = 'admin_add_doc_file';\nelse if (effectiveState === 'AWAITING_DOC') routeKey = 'admin_add_doc_waiting';\nelse if (effectiveState === 'AWAITING_DELETE_NUM') routeKey = 'admin_delete_doc_num';\nelse if (effectiveState === 'AWAITING_DELETE_CONFIRM') routeKey = 'admin_delete_doc_confirm';\nelse if (effectiveState === 'REINDEX_CONFIRM') routeKey = 'admin_reindex_confirm';\nelse if (command === '/help') routeKey = 'admin_help';\nelse if (command === '/list_docs') routeKey = 'admin_list_docs';\nelse if (command === '/add_doc') routeKey = 'admin_add_doc_init';\nelse if (command === '/delete_doc') routeKey = 'admin_delete_doc_init';\nelse if (command === '/reindex') routeKey = 'admin_reindex_init';\nelse if (command === '/stats') routeKey = 'admin_stats';\nelse routeKey = 'qa';\nreturn [{ json: Object.assign({}, parsed, { route_key: routeKey, is_admin: isAdmin, pending_state: effectiveState, raw_state: pendingState, state_expired: stateExpired, stash: stash }) }];"
}
```

---

## Route Request

- **Node type:** `n8n-nodes-base.switch`
- **Type version:** 3.4
- **Position:** [1104, 1856]
- **Inbound:**
  - from `Compute Route` → input 0
- **Outbound:**
  - output 0 → `Q&A AI Agent`
  - output 1 → `Admin Help Reply`
  - output 2 → `List Docs Read Documents`
  - output 3 → `Add Doc Init Set State`
  - output 4 → `Add Doc Waiting Reply`
  - output 5 → `Add Doc File Get File`
  - output 6 → `Delete Init Read Docs`
  - output 7 → `Delete Num Pick`
  - output 8 → `Delete Confirm Decide`
  - output 9 → `Reindex Init Read Docs`
  - output 10 → `Reindex Confirm Decide`
  - output 11 → `Stats Read Docs`
  - output 12 → `Cancel Clear State`

### Parameters

```json
{
  "rules": {
    "values": [
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-qa",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "qa",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "qa"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-help",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_help",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_help"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-list",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_list_docs",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_list_docs"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-addinit",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_add_doc_init",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_add_doc_init"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-addwait",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_add_doc_waiting",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_add_doc_waiting"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-addfile",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_add_doc_file",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_add_doc_file"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-delinit",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_delete_doc_init",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_delete_doc_init"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-delnum",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_delete_doc_num",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_delete_doc_num"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-delcnf",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_delete_doc_confirm",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_delete_doc_confirm"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-rxinit",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_reindex_init",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_reindex_init"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-rxcnf",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_reindex_confirm",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_reindex_confirm"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-stats",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_stats",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_stats"
      },
      {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 3
          },
          "conditions": [
            {
              "id": "cond-cancel",
              "leftValue": "={{ $json.route_key }}",
              "rightValue": "admin_cancel",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "renameOutput": true,
        "outputKey": "admin_cancel"
      }
    ]
  },
  "options": {
    "fallbackOutput": "extra",
    "renameFallbackOutput": "noop"
  }
}
```

---

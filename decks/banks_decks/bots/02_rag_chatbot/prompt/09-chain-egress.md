# Egress convergence — Send Reply

> 1 node. Every chain (Q&A, admin) converges here to send the formatted reply back via Telegram.

**Node count:** 1

**Build order (topological):**

1. `Send Reply`

---

## Send Reply

- **Node type:** `n8n-nodes-base.telegram`
- **Type version:** 1.2
- **Position:** [3232, 2032]
- **Inbound:**
  - from `QA Format Reply` → input 0
  - from `Admin Help Reply` → input 0
  - from `List Docs Format` → input 0
  - from `Add Doc Init Reply` → input 0
  - from `Add Doc Waiting Reply` → input 0
  - from `Add Doc File Reply` → input 0
  - from `Delete Init Set State` → input 0
  - from `Delete Num Set State` → input 0
  - from `Delete Confirm Yes Reply` → input 0
  - from `Delete Confirm No Reply` → input 0
  - from `Reindex Init Set State` → input 0
  - from `Reindex Done Reply` → input 0
  - from `Reindex No Reply` → input 0
  - from `Stats Format` → input 0
  - from `Cancel Reply` → input 0
- **Outbound:** *(none — terminal)*

### Parameters

```json
{
  "chatId": "={{ $('Parse Input').item.json.chat_id }}",
  "text": "={{  $json.reply_text }}",
  "additionalFields": {
    "appendAttribution": false
  }
}
```

---

# Recreation prompts — BankYordamchi classifier bot

Two ways to rebuild this bot from scratch:

## Way 1 — Single-shot AI prompt

Paste **`00-MASTER-PROMPT.md`** into an AI session that has the n8n MCP tools (`search_nodes`, `get_node_types`, `validate_workflow`, `create_workflow_from_code`). The AI builds the entire 7-node workflow in one go.

This bot is small enough (7 nodes, 3 integrations, no state machine) that a single prompt handles the whole spec. No chunking needed.

## Way 2 — Manual build, following the design folder

Open `../README.md` and `../design/workflow-graph.md` and click through n8n's UI. ~15-30 minutes for a beginner.

**Recommended manual build order:**

1. Set up credentials + Sheets (see `../README.md` → "How to use this folder").
2. Add **Telegram Trigger** node, configure with your bot's credential.
3. Add **Google Sheets: Read Operators** + **Google Sheets: Append Application** nodes (configure both with your spreadsheet ID + correct tab name; don't connect them yet).
4. Add **Gemini Chat Model** + **Basic LLM Chain** + **Structured Output Parser** nodes. Connect Gemini and Output Parser to Basic LLM Chain via the langchain channels.
5. Paste the system prompt from `../prompts/system-prompt.md` into the Basic LLM Chain's system message field.
6. Connect: Telegram Trigger → Basic LLM Chain → Sheets: Read Operators.
7. Add **Code: Pick Operator** node. Paste the JS from `../design/workflow-graph.md`.
8. Connect: Sheets: Read Operators → Code: Pick Operator → Sheets: Append Application.
9. Add **Set: Format Reply** node. Paste the reply template from `../design/workflow-graph.md`.
10. Add **Telegram: Send Reply** node. Configure chatId + text expressions per the spec.
11. Connect: Sheets: Append Application → Set: Format Reply → Telegram: Send Reply.
12. Activate the workflow.
13. Test by sending `Avtokredit olmoqchiman` from a Telegram account to your bot. You should see a reply within 5 seconds.

## Files

| File | Purpose |
|---|---|
| `README.md` | This file |
| `00-MASTER-PROMPT.md` | The single-shot prompt — everything an AI needs to recreate the bot |

## Why no per-chain chunks here?

The RAG bot at `../../02_rag_chatbot/prompt/` has 14 files because it has 77 nodes across 8 logical chains. Chunking is necessary for AI agents to keep details straight.

This classifier has 7 nodes total. A single 5-page prompt holds the whole spec without any AI losing detail mid-generation.

If you ever extend this bot (add admin commands, multi-turn memory, more categories), revisit and chunk if it grows past ~20 nodes.

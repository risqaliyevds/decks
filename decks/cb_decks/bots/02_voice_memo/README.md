# 02 · Voice memo → CRM bot · 11-deck, 12-deck

**Status:** design phase complete · workflow build pending.
**Built by:** participants in modules 11 (Agent dizayn) and 12 (Murakkab jarayonlar).

## What it does

Bankir holds a Telegram **voice message** after a customer meeting → bot transcribes Uzbek audio → AI extracts structured fields (`customer_name`, `decision`, `follow_up`, `sentiment`, `next_step_date`) → logs a row to the CRM Sheet → optionally schedules a reminder.

Single-turn from the user's perspective; **multi-step pipeline** under the hood (transcribe → extract → save → confirm).

## Why this bot (vs. the document analyzer it replaces)

Pedagogical positioning across the 3 bots:

| | Bot 01 | Bot 02 | Bot 03 |
|---|---|---|---|
| **Input modality** | Text | **Voice (audio)** | Text + files |
| **Turns** | Single-turn | Single-turn pipeline | Multi-turn agent |
| **Mental model** | *AI o'qiydi va javob beradi* | *AI eshitadi va yozib qoldiradi* | *AI suhbat o'tkazadi va ish bajaradi* |
| **AI capability shown** | RAG | **Audio + structured extraction** | State + memory + handoff |

Voice is the **only modality not used elsewhere in the curriculum**. Strong "wow" moment for non-technical audience: bankers immediately picture themselves dictating after meetings instead of typing notes.

## Design artifacts

Read in order:

1. [`design/conversation-flow.md`](./design/conversation-flow.md) — single-turn voice flow + text command branch + callback branch
2. [`design/workflow-graph.md`](./design/workflow-graph.md) — n8n graph (~11 nodes main + 4 in helper branches)
3. [`design/data-schema.md`](./design/data-schema.md) — Sheets layout (Transcripts + Meetings), Drive folders
4. [`prompts/extraction-prompt.md`](./prompts/extraction-prompt.md) — extraction LLM prompt with JSON schema

## Architecture summary

```
Telegram voice
       ↓
   Download → Drive (audio archive)
       ↓
   Gemini audio transcribe → Uzbek text
       ↓
   Save transcript draft (Sheet)
       ↓
   Gemini Chat: extract structured JSON
       ↓
   Save Meeting row (Sheet)
       ↓
   Send confirmation (Telegram, formatted)
```

11 nodes for the voice path. ~3 more for `/recent`, `/search`, `/help` text commands. ~3 more if optional reminder-scheduler is included (a separate scheduled workflow).

## Use case (bankir's day)

> Bankir finishes a 30-minute meeting with a kredit applicant. On the way back to their desk, they hold the Telegram voice button and say:
>
> *"Aliyev Vali bilan uchrashdim. Avtokredit so'ramoqda, 200 mln so'm, 12 oy. Garov sifatida o'z kvartirasini taklif qildi. Hujjatlarni ertaga olib keladi. Mijoz xushmuomala, qiziqishi yuqori."*
>
> 15 seconds later, a confirmation comes back:
>
> ```
> ✓ Saqlandi (Meeting #M-20260508-A4)
> Mijoz: Aliyev Vali
> Qaror: avtokredit so'rovi qabul qilindi (200M / 12 oy / kvartira garov)
> Keyingi qadam: hujjatlarni qabul qilish (2026-05-09)
> Kayfiyat: qiziqish yuqori
> ```

Bankir's notes are in the CRM. They didn't open a laptop. Total time: ~20 seconds.

## Module 11 + 12 lesson flow (~2 hours combined)

- **Module 11 (dizayn seminar, 60 min):** group sketches the pipeline on paper. What fields matter for *their* department? (kredit vs depozit vs HR vs komplaens have different "next steps"). What's the failure mode if the audio is unclear?
- **Module 12 (namoyish + tahlil, 60 min):** instructor live-builds the voice path on projector. Group debugs together — typical edge cases:
  - Silent / very short voice → reject early
  - Multi-speaker (mijoz va bankir gaplashayotgan paytda yozilgan) → bot should distinguish
  - Mixed language (Uzbek + Russian banking terms) → Gemini handles, validate
  - "Ertaga", "bir hafta ichida" → bot must compute absolute date

## Implementation TBD

- [ ] `workflow.example.json` — n8n export, 11 nodes voice path
- [ ] `workflow-with-reminders.example.json` — extended export with reminder scheduler
- [ ] `prompts/extraction-prompt.md` already drafted — refine with real meeting transcripts
- [ ] `docs/test-fixtures/` — 5 synthetic voice memos in Uzbek (use Gemini TTS or record real samples) for testing

## Series terminology hooks

Module 11 introduces:
- **Speech-to-Text (STT)** — voice ni matnga aylantirish
- **Function Calling / Schema** — AI ga aniq formatdagi JSON ni qaytarishga majburlash

Module 12 introduces:
- **Pipeline** — bir necha LLM chaqiruvlari ketma-ket
- **Idempotent design** — bir voice memo'ni 2 marta yuborsa, 2 ta row paydo bo'lmasligi kerak

Closing slides of 11-deck and 12-deck recap each pair (cb_decks/CLAUDE.md ≥2 atama qoidasi).

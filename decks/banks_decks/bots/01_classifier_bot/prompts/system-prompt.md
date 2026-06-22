# Classifier system prompt (Uzbek)

This is the system message for the **Basic LLM Chain** node (sub-attached to **Gemini Chat Model**). It turns Gemini into a strict classifier + extractor.

Set it as the `messages.messageValues[0].message` parameter. No `=` prefix needed (it's a static string, not an n8n expression).

## Full system prompt

```
Sen BankYordamchi - Ipak Yo'li Bank ning mijozlar uchun yordamchi botisiz.

VAZIFA: Foydalanuvchi yozgan xabarni o'qing va uni quyidagi 5 toifadan biriga ajrating:
- kredit (har qanday kredit so'rovi: avtokredit, ipoteka, mikrokredit, biznes krediti)
- karta (bank kartasi: debit, kredit, virtual, yo'qolgan/o'g'irlangan karta)
- depozit (jamg'arma hisobi, omonat, foiz stavkalari)
- shikoyat (xizmat sifati, xato, noroziliklik)
- info (umumiy savollar, bank haqida, filial haqida — yuqoridagi 4 toifaga to'g'ri kelmaydiganlar)

Foydalanuvchi xabaridan quyidagilarni ajrating:
- subject: 1 jumlali qisqa mavzu (max 80 belgi). Misol: "Avtokredit so'rovi"
- details: foydalanuvchi yozgan to'liq matn (uni o'zgartirmang, asl holida saqlang)
- urgency: low / medium / high
  - high: shoshilinch holat ("kartam yo'qolgan", "pul o'g'irlandi", "tezda kerak")
  - medium: oddiy so'rov yoki shikoyat
  - low: faqat ma'lumot olish, shoshilmagan

CHIQARISH FORMATI: faqat sof JSON, hech qanday boshqa matn, hech qanday markdown, hech qanday tushuntirish:
{"category":"kredit","subject":"Avtokredit so'rovi","details":"foydalanuvchi yozgan asl matn","urgency":"medium"}

QOIDALAR:
1. Kategoriyani aniq tanlang. Agar shubha bo'lsa "info" tanlang.
2. urgency aniqlanmasa "medium" qo'ying.
3. Foydalanuvchi qaysi alifboda yozgan bo'lsa (latin yoki cyrillic), siz ham xuddi shu alifboni saqlang. subject va details — foydalanuvchi alifbosida.
4. Hech qachon JSON dan tashqari matn yozmang. Markdown belgilari (```json, **, _) ishlatmang.
5. JSON kalitlari aniq shu nomlar: category, subject, details, urgency. Boshqa kalit qo'shmang.
6. Shaxsiy ma'lumotlar (passport raqami, karta raqami, parol) — details ichida saqlang, lekin alohida ko'chirmang.
```

## Why each rule

| Rule | Reason |
|---|---|
| **Bank identity** | Tells the model it's not a general chatbot — it's branded staff. |
| **5 fixed categories** | The Operators sheet has these exact category strings. Mismatch = no operator found. |
| **`subject` max 80 chars** | Sheets cell stays readable; admin can scan a list of subjects at a glance. |
| **`details` = original text, untouched** | Audit trail. The bot must not paraphrase the customer's words. |
| **Urgency rules with examples** | LLMs are fuzzy on urgency without explicit signals. Stolen card = high. Asking the rate = low. |
| **Strictly JSON, no markdown** | The Basic LLM Chain's output parser breaks on markdown wrappers like ` ```json ... ``` `. |
| **Alphabet preservation** | Uzbek customers write in either Latin or Cyrillic. Operators read both. Do not auto-translate. |
| **Exact key names** | The Sheets append step uses `autoMapInputData` — column names must match keys. |
| **PII stays in `details`** | We don't separate sensitive data into its own field — keep the audit log atomic. |

## Output parser (paired Structured Output Parser node)

The Basic LLM Chain has a **Structured Output Parser** sub-attached. Its JSON Schema:

```json
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
```

n8n's Structured Output Parser will reject any LLM output that doesn't match this schema, forcing a retry. That's why the JSON-only rule in the system prompt is critical.

## Sanity check the prompt with these test inputs

After connecting Gemini and the Output Parser, manually test the chain (n8n's "Execute step" button) with these:

| Input | Expected category | Expected urgency |
|---|---|---|
| `Avtokredit olmoqchiman, 50 mln, mashina uchun` | kredit | medium |
| `Kartam yo'qoldi tezda blokirovka qiling!!!` | karta | high |
| `Omonat foizi qancha?` | depozit | low |
| `Mening pulim hisobimda yo'q!!! Yordam bering` | shikoyat | high |
| `Filial soat nechagacha ishlaydi?` | info | low |
| `Привет` | info | low |
| `Кредитная карта нужна` (cyrillic) | karta | medium |

If the chain returns wrong categories or non-JSON, refine the prompt and re-test. Common adjustments:
- Add a tricky example to the system prompt as a few-shot demo.
- Lower temperature further (0.1 if 0.2 still inconsistent).
- Tighten the urgency rules with more examples.

## Production hardening (if you take this beyond demo)

For real customer use, consider:
- **PII stripping** — strip card numbers, passport numbers from `details` before saving (regex-based Code node between Chain and Append).
- **Few-shot examples** — add 3-5 actual past examples to the system prompt for higher accuracy.
- **Confidence threshold** — have the LLM also output `confidence: 0..1` and route low-confidence to a human review queue.
- **Multi-message context** — store the last N messages per `chat_id` and pass them to the chain so follow-ups in a conversation get classified together.

For the seminar demo, none of the above is needed. The 5-category, 4-field, single-shot version is exactly the right complexity.

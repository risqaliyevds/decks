Read the deck at {{DECK_ABS}}:
- {{DECK_ABS}}/content.md
- {{DECK_ABS}}/notes.md
- {{DECK_ABS}}/index.html
- {{DECK_ABS}}/screenshots/

Also read the project rules:
- C:/projects/slides/CLAUDE.md
- C:/projects/slides/decks/cb_decks/CLAUDE.md (for atamalar mapping per module + audience rules)

Then write {{DECK_ABS}}/codex_review.md — a punch-list review.

Focus areas (in priority order):
1. **Atamalar coverage** — does the deck introduce + recap the ≥2 designated AI atamalar for this module per the mapping table in cb_decks/CLAUDE.md? Names should be clean, definitions in bankir tilida, and a closing recap row should ask the audience to repeat the meaning.
2. **Governance fit for Markaziy Bank audience** — non-technical, compliance-aware, business framing. Drop: vendor absolutism ("eng yaxshi", "kafolatlangan", "faqat shu"), casual metaphors that wouldn't survive an audit committee, slogan-based safety claims (replace with contract/control framing).
3. **Numeric precision** — replace shaky precise numbers (latencies, percentages, prices, token counts) with testing-discipline framing ("real hujjat va savol bilan o'lchanadi", "deploymentga bog'liq").
4. **Bank decision artifact** — does the deck end with a reusable artifact (qaror varaqasi / decision sheet / pilot ruxsat shartlari), not just Q&A? Managers should leave with something they can fill out Monday morning.
5. **Uzbek language quality** — natural Uzbek, not literal English translations ("kechikkan kirish" for "data entry", "qaytib ketadigan" for "takeaways" are flags), consistent terminology throughout the deck.

Output format (markdown):

```
Verdict: SHIP | NEEDS-FIXES | MAJOR-REWORK
Score: N/10

# Top 5 content improvements

## 1. <issue title>
<2-3 lines on what's wrong>
**Rewrite (Uzbek):**
> <concrete rewrite ready to paste into the deck>

## 2. ...

# Additional punch list (max 5 bullets)
- ...
```

Be concrete: every "issue" must include an exact Uzbek rewrite the deck author can paste. No vague suggestions like "improve clarity".

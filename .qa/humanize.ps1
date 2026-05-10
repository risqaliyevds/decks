# .qa/humanize.ps1 — Windows convenience wrapper for humanize.mjs
# Usage:
#   .\.qa\humanize.ps1 decks\cb_decks\1_deck
#   .\.qa\humanize.ps1 decks\cb_decks\1_deck --no-screenshots
#   .\.qa\humanize.ps1 decks\cb_decks\1_deck --inplace

$env:NODE_OPTIONS = "--use-system-ca"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& node "$here\humanize.mjs" @args
exit $LASTEXITCODE

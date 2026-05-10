# .qa/review.ps1 — Windows convenience wrapper
# Sets NODE_OPTIONS=--use-system-ca to handle corporate cert MITM, then invokes review.mjs.
# Usage:
#   .\.qa\review.ps1 decks\cb_decks\1_deck
#   .\.qa\review.ps1 decks\cb_decks\1_deck --no-screenshots

$env:NODE_OPTIONS = "--use-system-ca"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& node "$here\review.mjs" @args
exit $LASTEXITCODE

# .export/build.ps1 — Windows wrapper for build.mjs
# Usage:
#   .\.export\build.ps1 decks\cb_decks\1_deck                    (both PDF + PPTX)
#   .\.export\build.ps1 decks\cb_decks\1_deck --pdf              (PDF only)
#   .\.export\build.ps1 decks\cb_decks\1_deck --pptx             (PPTX only)
#   .\.export\build.ps1 decks\cb_decks\1_deck --skip-screenshots (use existing PNGs)

$env:NODE_OPTIONS = "--use-system-ca"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& node "$here\build.mjs" @args
exit $LASTEXITCODE

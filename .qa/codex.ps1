param([Parameter(Mandatory=$true)][string]$DeckPath)
node "$PSScriptRoot\codex.mjs" $DeckPath

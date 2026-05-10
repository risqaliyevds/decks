# .qa/enhance.ps1 — Windows wrapper for enhance.mjs
$env:NODE_OPTIONS = "--use-system-ca"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& node "$here\enhance.mjs" @args
exit $LASTEXITCODE

# .qa/illustrate.ps1 — Windows wrapper for illustrate.mjs
$env:NODE_OPTIONS = "--use-system-ca"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& node "$here\illustrate.mjs" @args
exit $LASTEXITCODE

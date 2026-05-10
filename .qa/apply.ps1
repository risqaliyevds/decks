# .qa/apply.ps1 — Windows wrapper for apply.mjs (HTML rebuilder)
$env:NODE_OPTIONS = "--use-system-ca"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& node "$here\apply.mjs" @args
exit $LASTEXITCODE

# .qa/agent.ps1 — Windows wrapper for agent.mjs orchestrator
$env:NODE_OPTIONS = "--use-system-ca"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
& node "$here\agent.mjs" @args
exit $LASTEXITCODE

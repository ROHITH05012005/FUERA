# Auto-push script for Windows PowerShell
# Saves you from manually running git add/commit/push each time
# Place this file in the root of the repo (e.g., auto_push.ps1) and run it whenever you want to sync.

# Stage all changes
git add -A

# Check if there are staged changes
if (git diff --cached --quiet) {
    Write-Host "No changes to commit."
    exit 0
}

# Create a timestamped commit message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Auto‑commit at $timestamp"

# Push to the remote main branch
git push origin main

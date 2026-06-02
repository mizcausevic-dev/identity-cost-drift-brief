$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $repoRoot "screenshots"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

foreach ($existingFile in Get-ChildItem -Path $outputDir -Filter "*.png" -ErrorAction SilentlyContinue) {
  Remove-Item $existingFile.FullName -Force
}

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Path,
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets
  )

  $width = 1600
  $height = 900
  $bitmap = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.Clear([System.Drawing.Color]::FromArgb(7, 17, 29))

  $bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(13, 26, 43))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(103, 224, 190), 2)
  $titleBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(237, 242, 255))
  $bodyBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(159, 176, 207))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(103, 224, 190))

  $fontTitle = New-Object System.Drawing.Font("Georgia", 40, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
  $fontFooter = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)

  $rect = New-Object System.Drawing.Rectangle 20, 20, 1560, 820
  $graphics.FillRectangle($bgBrush, $rect)
  $graphics.DrawRectangle($panelPen, $rect)

  $graphics.DrawString("Identity Cost Drift Brief", $fontSub, $accentBrush, 70, 85)
  $graphics.DrawString($Title, $fontTitle, $titleBrush, 70, 150)
  $graphics.DrawString($Subtitle, $fontBody, $bodyBrush, (New-Object System.Drawing.RectangleF(70, 240, 1380, 110)))

  $y = 360
  foreach ($bullet in $Bullets) {
    $graphics.FillEllipse($accentBrush, 85, $y + 13, 12, 12)
    $graphics.DrawString($bullet, $fontBody, $titleBrush, 110, $y)
    $y += 84
  }

  $graphics.DrawString("Synthetic proof render for README packaging.", $fontFooter, $bodyBrush, 70, 770)
  $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)

  $graphics.Dispose()
  $bitmap.Dispose()
}

New-ScenarioImage -Path (Join-Path $outputDir "01-overview-proof.png") -Title "Board-facing identity-cost drift stays visible before platform spend turns into folklore" -Subtitle "This surface turns license waste, guest sprawl, duplicated controls, and reclaim failure into one board-readable identity-cost map." -Bullets @(
  "Which lanes are leaking cost discipline because entitlements are not reclaimed tightly enough.",
  "Where duplication, review burden, or control gaps are weakening the identity story.",
  "What should be reclaimed, consolidated, standardized, contained, or escalated next."
)

New-ScenarioImage -Path (Join-Path $outputDir "02-drift-register-proof.png") -Title "Drift register keeps each lane, owner, audience, and next move attached" -Subtitle "Every route retains the drift tier, operating story, accountable owner, and immediate remediation step." -Bullets @(
  "Each lane stays connected to one owner and one board-facing audience.",
  "Spend pressure is visible before it turns into another vague platform-budget discussion.",
  "The next corrective move sits next to the lane instead of disappearing into a separate memo."
)

New-ScenarioImage -Path (Join-Path $outputDir "03-cost-tiers-proof.png") -Title "Cost tiers show whether license waste, review drag, duplication, or control gaps are causing the drift" -Subtitle "The dominant identity-cost dimension remains visible so leadership can tighten the right thing first." -Bullets @(
  "The blocking issue is explicit instead of implied.",
  "Waste, review burden, duplication, and control coverage stay readable at a glance.",
  "Each lane ties to a concrete intervention instead of a generic access-budget complaint."
)

New-ScenarioImage -Path (Join-Path $outputDir "04-remediation-posture-proof.png") -Title "Remediation posture keeps cleanup decisions grounded in owners and recoverable cost" -Subtitle "Composite recovery score, recoverable cost, and next moves stay grounded in the same operating view." -Bullets @(
  "Reclaim, consolidate, standardize, escalate, and contain decisions stay tied to one owner.",
  "Recoverable cost is visible before the next review cycle.",
  "Boards and operators can see which cleanup motion should move first."
)

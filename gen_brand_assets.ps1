$ErrorActionPreference = "Continue"
$key = (Get-Content -Path "C:\Users\avata\Desktop\website project\gemini_key.txt" -Raw).Trim()
$outDir = "C:\Users\avata\Desktop\Jeweler Made Images\banners"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$assets = @(
  @{
    name = "favicon"
    prompt = "A minimal luxury brand favicon design for a custom jewelry brand called Jeweler Made. The design shows the bold capital letter J in an elegant serif typeface, perfectly centered, in solid black ink on a pure white square background. Vector-clean, sharp edges, simple, no decorations, no diamonds, no ornaments. The J occupies most of the frame with just a small white margin. Square 1:1 aspect ratio."
  },
  @{
    name = "og-share-image"
    prompt = "Editorial luxury jewelry brand social-share open-graph image, 1200x630 widescreen format. Left side of the frame: bold serif wordmark JEWELER MADE in solid black with smaller spaced uppercase tagline CUSTOM FINE JEWELRY below. Right side of the frame: a tasteful close-up product image of an 18k yellow gold ring with an emerald-cut diamond, photographed against a pure white background. Soft directional studio lighting. Clean, sophisticated, brand-forward composition. Wide horizontal aspect ratio."
  },
  @{
    name = "brand-story-image"
    prompt = "Editorial luxury jewelry-making lifestyle photograph, no human figures. Composition: a clean workshop scene of jeweler's tools laid out on a pure white surface - engraved burnisher, calipers, polished mandrel, files, and a small velvet jewelry pouch. Top-down flat-lay arrangement, soft directional studio lighting from upper left, sharp focus, fine art editorial photography aesthetic. Pure white seamless background #FFFFFF, no shadows, no extra props. 4:3 aspect ratio. Ultra-high resolution."
  },
  @{
    name = "custom-process-image"
    prompt = "Editorial luxury jewelry hero photograph in 16:9 widescreen, showing the custom design process. A pristine white surface with three carefully arranged items in a row: a small velvet ring box at left, an unset solitaire diamond resting on a square of white silk in the center, and a finished 18k white gold solitaire ring at right. Top-down view. Negative space around each item. Pure white seamless background #FFFFFF, soft directional studio lighting, sharp focus, fine art editorial photography aesthetic. No human figures, no shadows. Ultra-high resolution. 16:9 aspect ratio."
  }
)

foreach ($a in $assets) {
  $out = Join-Path $outDir "$($a.name).jpg"
  if (Test-Path $out) { Write-Output "skip $($a.name)"; continue }
  $body = @{
    contents = @(@{ parts = @(@{ text = $a.prompt }) })
    generationConfig = @{ responseModalities = @("IMAGE") }
  } | ConvertTo-Json -Depth 8 -Compress
  $uri = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=$key"
  try {
    $resp = Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body -TimeoutSec 180
    $part = $resp.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
    if ($part) {
      $bytes = [Convert]::FromBase64String($part.inlineData.data)
      [System.IO.File]::WriteAllBytes($out, $bytes)
      Write-Output "ok $($a.name) bytes=$($bytes.Length)"
    } else {
      Write-Output "fail $($a.name) reason=$($resp.candidates[0].finishReason)"
    }
  } catch {
    Write-Output "err $($a.name): $($_.Exception.Message)"
  }
}
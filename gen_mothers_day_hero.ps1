$ErrorActionPreference = "Continue"
$key = (Get-Content -Path "C:\Users\avata\Desktop\website project\gemini_key.txt" -Raw).Trim()
$outDir = "C:\Users\avata\Desktop\Jeweler Made Images\banners"

$prompt = "Wide cinematic photograph in landscape 16:9 format for a luxury jewelry website hero banner. A beautiful arrangement of fine jewelry pieces, including a diamond necklace, gold rings, and pearl earrings, artfully displayed on soft blush pink and white fabric with scattered rose petals and a small gift box with a satin ribbon. Warm golden soft lighting from the left. The mood is romantic, celebratory, and elegant but welcoming. Soft focus background with bokeh. Plenty of open space on the right side for text overlay. The color palette is warm golds, soft pinks, whites, and creams. Mothers Day gift-giving theme. Ultra-high resolution editorial photography. No text, no words, no letters in the image."

$out = Join-Path $outDir "hero-mothers-day.jpg"
if (Test-Path $out) { Write-Output "skip"; exit }

$body = @{
  contents = @(@{ parts = @(@{ text = $prompt }) })
  generationConfig = @{ responseModalities = @("IMAGE") }
} | ConvertTo-Json -Depth 8 -Compress

$uri = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=$key"
try {
  $resp = Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body -TimeoutSec 180
  $part = $resp.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
  if ($part) {
    $bytes = [Convert]::FromBase64String($part.inlineData.data)
    [System.IO.File]::WriteAllBytes($out, $bytes)
    Write-Output "ok bytes=$($bytes.Length)"
  } else {
    Write-Output "fail reason=$($resp.candidates[0].finishReason)"
  }
} catch {
  Write-Output "err: $($_.Exception.Message)"
}

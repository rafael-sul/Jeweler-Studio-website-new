$ErrorActionPreference = "Continue"
$key = (Get-Content -Path "C:\Users\avata\Desktop\website project\gemini_key.txt" -Raw).Trim()
$outDir = "C:\Users\avata\Desktop\Jeweler Made Images\banners"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$banners = @(
  @{
    name = "banner-hero-craftsmanship"
    prompt = "Cinematic editorial luxury jewelry photograph in a 16:9 widescreen format. Composition: a softly lit close-up scene on a smooth pure white surface, slightly off-center to the right side of the frame to leave generous negative space on the left for headline text. A single exquisite custom-made 18k yellow gold ring with a large emerald-cut diamond center stone sits gracefully on the surface, with a finely engraved hand jeweler's tool (a small burnisher) and a strand of pure white silk ribbon arranged tastefully nearby. Background: pure white seamless #FFFFFF with the softest hint of warm directional studio lighting from the upper left creating gentle gradient depth. No human figures. No props beyond what is described. Ultra-high resolution, very shallow depth of field, fine art editorial aesthetic, professional commercial jewelry advertising photography quality, sharp focus on the ring, beautifully soft bokeh elsewhere. 16:9 widescreen aspect ratio."
  },
  @{
    name = "banner-collection-arrangement"
    prompt = "Cinematic editorial luxury jewelry photograph in a 16:9 widescreen format. Composition: a curated overhead arrangement of fine jewelry on a pure white seamless background, with negative space on the left third of the frame for headline text overlay. The right two-thirds shows a tasteful flat-lay of mixed jewelry: a delicate 18k white gold diamond necklace draped in a gentle curve, a pear-cut emerald drop pendant, a slender pave diamond tennis bracelet, and two solitaire diamond stud earrings, all arranged with negative space between each piece, soft even directional studio lighting from above, sharp focus, no shadows, no props beyond the jewelry. Ultra-high resolution, fine art editorial aesthetic, professional commercial jewelry advertising photography quality. 16:9 widescreen aspect ratio."
  },
  @{
    name = "banner-macro-detail"
    prompt = "Cinematic macro close-up luxury jewelry photograph in a 16:9 widescreen format. Composition: extreme close-up of a brilliant round cut diamond solitaire engagement ring nestled at the right side of the frame, with significant negative space on the left for headline text overlay. The ring sits on a pure white seamless background. Soft directional studio lighting brings out the prismatic fire and brilliance of the diamond facets. Very shallow depth of field with sharp focus on the diamond table and gentle bokeh on the band. No human figures, no shadows, no props. Ultra-high resolution, fine art editorial aesthetic, professional commercial jewelry advertising photography quality. 16:9 widescreen aspect ratio."
  }
)

foreach ($b in $banners) {
  $out = Join-Path $outDir "$($b.name).jpg"
  if (Test-Path $out) { Write-Output "skip $($b.name) (exists)"; continue }
  $body = @{
    contents = @(@{ parts = @(@{ text = $b.prompt }) })
    generationConfig = @{ responseModalities = @("IMAGE") }
  } | ConvertTo-Json -Depth 8 -Compress
  $uri = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=$key"
  try {
    $resp = Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body -TimeoutSec 180
    $part = $resp.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
    if ($part) {
      $bytes = [Convert]::FromBase64String($part.inlineData.data)
      [System.IO.File]::WriteAllBytes($out, $bytes)
      Write-Output "ok $($b.name) bytes=$($bytes.Length)"
    } else {
      $reason = $resp.candidates[0].finishReason
      Write-Output "fail $($b.name) reason=$reason"
    }
  } catch {
    Write-Output "err $($b.name): $($_.Exception.Message)"
  }
}
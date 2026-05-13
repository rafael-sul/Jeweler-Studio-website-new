$ErrorActionPreference = "Continue"
$key = (Get-Content -Path "C:\Users\avata\Desktop\website project\gemini_key.txt" -Raw).Trim()
$outDir = "C:\Users\avata\Desktop\Jeweler Made Images\banners"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

# Portrait-orientation category card images for the Dwell collection bento layout.
# Style brief: pure white seamless background, cinematic single-key directional lighting from upper left
# creating soft natural shadow, generous negative space, one hero piece per image, editorial fine-art aesthetic.

$cards = @(
  @{
    name = "card-necklaces"
    prompt = "Editorial fine-jewelry photograph in vertical 4:5 portrait format. A single 18k white gold diamond rivière necklace laid in a graceful crescent curve across the lower two-thirds of the frame, with the largest center diamond resting at the bottom center. Photographed from directly above on a pure white seamless background (#FFFFFF). Soft cinematic side-lighting from the upper left creates the gentlest natural shadow beneath the necklace, giving depth without heaviness. Generous negative space in the upper third of the frame. Sharp focus, ultra-high resolution, fine art editorial photography aesthetic, restrained and luxurious composition. No props, no surface texture, no human figures."
  },
  @{
    name = "card-rings"
    prompt = "Editorial fine-jewelry photograph in vertical 4:5 portrait format. A single sculptural engagement ring photographed in classic catalog packshot style: 18k white gold solitaire with a brilliant round diamond, head and gemstone centered in the frame and tilted slightly forward so the gem table faces the viewer dead-on, the band shoulders curving out and behind the setting. The ring stands upright on a pure white seamless background (#FFFFFF). Soft cinematic side-lighting from the upper left creates the gentlest natural shadow, giving depth without heaviness. Generous negative space around the subject. Sharp focus, ultra-high resolution, fine art editorial photography. No props."
  },
  @{
    name = "card-earrings"
    prompt = "Editorial fine-jewelry photograph in vertical 4:5 portrait format. A matched pair of 18k white gold pear-cut diamond drop earrings photographed side by side, hanging from invisible supports so they appear to float. Both earrings vertical, posts up, equal spacing between them, centered in the frame. Pure white seamless background (#FFFFFF). Soft cinematic side-lighting from the upper left creates the gentlest natural shadow. Generous negative space above and below. Sharp focus, ultra-high resolution, fine art editorial photography. No props."
  },
  @{
    name = "card-pendants"
    prompt = "Editorial fine-jewelry photograph in vertical 4:5 portrait format. A single 18k white gold pendant with a pear-cut diamond center stone surrounded by a halo, suspended on a fine chain that forms a clean symmetrical V-shape rising into the upper frame. The pendant rests in the lower-center area. Pure white seamless background (#FFFFFF). Soft cinematic side-lighting from the upper left creates the gentlest natural shadow. Generous negative space around the chain. Sharp focus, ultra-high resolution, fine art editorial photography. No props."
  },
  @{
    name = "card-chains"
    prompt = "Editorial fine-jewelry photograph in vertical 4:5 portrait format. A single solid 18k yellow gold Cuban link chain laid in an elegant continuous S-curve across the lower two-thirds of the frame, photographed from directly above. The clasp is visible at the top of the curve. Pure white seamless background (#FFFFFF). Soft cinematic side-lighting from the upper left creates the gentlest natural shadow beneath the chain. Generous negative space in the upper portion of the frame. Sharp focus, ultra-high resolution, fine art editorial photography. No props."
  },
  @{
    name = "card-accessories"
    prompt = "Editorial fine-jewelry photograph in vertical 4:5 portrait format. A single 18k white gold tennis bracelet with continuous round brilliant diamonds laid in a graceful continuous S-curve across the lower two-thirds of the frame, photographed from directly above. The clasp visible at the top right of the curve. Pure white seamless background (#FFFFFF). Soft cinematic side-lighting from the upper left creates the gentlest natural shadow. Generous negative space in the upper portion of the frame. Sharp focus, ultra-high resolution, fine art editorial photography. No props."
  }
)

foreach ($c in $cards) {
  $out = Join-Path $outDir "$($c.name).jpg"
  if (Test-Path $out) { Write-Output "skip $($c.name)"; continue }
  $body = @{
    contents = @(@{ parts = @(@{ text = $c.prompt }) })
    generationConfig = @{ responseModalities = @("IMAGE") }
  } | ConvertTo-Json -Depth 8 -Compress
  $uri = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=$key"
  try {
    $resp = Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body -TimeoutSec 180
    $part = $resp.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
    if ($part) {
      $bytes = [Convert]::FromBase64String($part.inlineData.data)
      [System.IO.File]::WriteAllBytes($out, $bytes)
      Write-Output "ok $($c.name) bytes=$($bytes.Length)"
    } else {
      Write-Output "fail $($c.name) reason=$($resp.candidates[0].finishReason)"
    }
  } catch {
    Write-Output "err $($c.name): $($_.Exception.Message)"
  }
}
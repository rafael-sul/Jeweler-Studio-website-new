$ErrorActionPreference = "Continue"
$key = (Get-Content -Path "C:\Users\avata\Desktop\website project\gemini_key.txt" -Raw).Trim()
$outDir = "C:\Users\avata\Desktop\Jeweler Made Images\extra-angles"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$products = @(
  @{
    slug = "eternal-whisper-band"
    angles = @(
      @{
        name = "eternal-whisper-band-angle2"
        prompt = "Editorial fine-jewelry photograph. A single delicate wedding band in 18k white gold with pavé-set diamonds, photographed at a dramatic 3/4 angle from slightly above and to the right, the band standing upright and tilted about 30 degrees toward the viewer. Sharp focus on the diamond detail along the band's top surface, with gentle bokeh fall-off toward the back. Pure white seamless background hex FFFFFF. Soft cinematic side-lighting from the upper left creates a gentle natural shadow. Ultra-high resolution, fine art editorial photography. No props, no human figures."
      },
      @{
        name = "eternal-whisper-band-detail"
        prompt = "Extreme close-up macro photograph of an 18k white gold wedding band with pavé-set diamonds. The camera is at ring level, focused tightly on the diamonds along the top of the band, showing individual facets catching light and creating tiny spectral flashes. Shallow depth of field so only 3-4 stones are in sharp focus. Pure white seamless background hex FFFFFF. Cinematic lighting from upper left. Ultra-high resolution macro photography, fine art editorial aesthetic. No props."
      }
    )
  },
  @{
    slug = "lumina-frost-aviators"
    angles = @(
      @{
        name = "lumina-frost-aviators-angle2"
        prompt = "Editorial luxury eyewear photograph. A pair of platinum-tone aviator sunglasses with diamond-encrusted frames, photographed at a 3/4 angle from slightly above and to the right, temples folded, lenses facing slightly upward. The light catches the diamond pave along the brow bar. Pure white seamless background hex FFFFFF. Soft cinematic side-lighting from the upper left. Ultra-high resolution, fine art editorial photography. No props, no human figures."
      },
      @{
        name = "lumina-frost-aviators-detail"
        prompt = "Close-up detail photograph of luxury aviator sunglasses focusing on the diamond-encrusted brow bar and bridge area. Camera angle slightly below eye level, showing the intricate pavé diamond setting along the frame edge. Shallow depth of field, the temple arms softly out of focus behind. Pure white seamless background hex FFFFFF. Cinematic side-lighting from upper left. Ultra-high resolution macro photography, editorial fine-art aesthetic. No props."
      }
    )
  },
  @{
    slug = "chromatic-ruby-sapphire-necklace"
    angles = @(
      @{
        name = "chromatic-ruby-sapphire-angle2"
        prompt = "Editorial fine-jewelry photograph. An 18k white gold necklace with alternating natural ruby and blue sapphire stones in bezel settings, laid in a sweeping arc across the frame, photographed from a low 30-degree angle rather than directly above. The perspective emphasizes the depth and height of each stone setting. Pure white seamless background hex FFFFFF. Soft cinematic side-lighting from the upper left. Ultra-high resolution, fine art editorial photography. No props, no human figures."
      },
      @{
        name = "chromatic-ruby-sapphire-detail"
        prompt = "Extreme close-up macro photograph of an 18k white gold necklace center section showing a vivid red ruby flanked by two blue sapphires in bezel settings. Focus tight on the center ruby, showing internal color saturation and facet reflections. Shallow depth of field, adjacent stones slightly soft. Pure white seamless background hex FFFFFF. Cinematic lighting from upper left. Ultra-high resolution macro photography. No props."
      }
    )
  },
  @{
    slug = "perfect-pear-luxe-drop-earrings"
    angles = @(
      @{
        name = "perfect-pear-drop-angle2"
        prompt = "Editorial fine-jewelry photograph. A single 14k gold drop earring with a pear-cut green emerald suspended from a diamond-studded bail, photographed in profile view from the side, showing the earring's depth and the way the emerald hangs from the finding. The earring appears to float against a pure white seamless background hex FFFFFF. Soft cinematic side-lighting from the upper left. Ultra-high resolution, fine art editorial photography. No props, no human figures."
      },
      @{
        name = "perfect-pear-drop-detail"
        prompt = "Extreme close-up macro photograph of a pear-cut green emerald gemstone in a 14k gold prong setting with small diamond accents on the bail above. Camera focused on the emerald's table facet, showing deep green color saturation and natural garden inclusions. Shallow depth of field. Pure white seamless background hex FFFFFF. Cinematic lighting from upper left creating a soft highlight on the gem surface. Ultra-high resolution macro photography. No props."
      }
    )
  },
  @{
    slug = "grand-pavilion-double-halo"
    angles = @(
      @{
        name = "grand-pavilion-angle2"
        prompt = "Editorial fine-jewelry photograph. A 14k gold cocktail ring with a large emerald-cut green gemstone center surrounded by a double halo of round diamonds, photographed at a dramatic low side angle showing the ring profile, the height of the setting, the double row of diamonds stepping up to the center stone, and the sculpted band shoulders. Ring standing upright. Pure white seamless background. Soft cinematic side-lighting from the upper left. Ultra-high resolution, fine art editorial photography. No props."
      },
      @{
        name = "grand-pavilion-detail"
        prompt = "Extreme close-up macro photograph of a cocktail ring center, an emerald-cut green gemstone surrounded by a double halo of round brilliant diamonds in 14k gold. Camera directly above, looking straight down at the stone table, capturing the geometric step-cut facets of the emerald stone and the concentric circles of diamonds radiating outward. Shallow depth of field so the band blurs away. Pure white seamless background. Cinematic lighting from upper left. Ultra-high resolution macro photography. No props."
      }
    )
  }
)

foreach ($p in $products) {
  foreach ($a in $p.angles) {
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
}

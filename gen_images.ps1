$ErrorActionPreference = "Continue"
$key = (Get-Content -Path "C:\Users\avata\Desktop\website project\gemini_key.txt" -Raw).Trim()
$outDir = "C:\Users\avata\Desktop\Jeweler Made Images"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$logPath = "C:\Users\avata\Desktop\website project\gen_log.txt"
"Started $(Get-Date -Format o)" | Out-File -FilePath $logPath -Encoding utf8

$framing = @{
  necklace  = "Composition: the necklace is laid completely flat in a graceful symmetrical U-curve, photographed from directly above (top-down view), pendant or centerpiece at the bottom center of the frame, both ends of the chain curving symmetrically upward, the entire piece fully visible and centered."
  ring      = "Composition: classic engagement-ring catalog packshot, head-on view with the setting filling the frame. The ring's head (setting + main gemstone) is centered and large, occupying roughly the upper two-thirds of the frame. The main gemstone faces the camera dead-on so the viewer looks straight into the table/face of the stone. The camera sits at the height of the gemstone with a very slight downward tilt so a sliver of the gem's depth is visible. The prongs, halo, and surrounding setting details are fully visible around the gemstone. The band's SHOULDERS emerge from the left and right sides of the setting and curve back and downward, but the rest of the band (the bottom loop) is HIDDEN behind the setting and not visible in the frame. Do NOT show a vertical band dropping below the setting. Do NOT use a top-down view, three-quarter angle, or side profile. The gem looks straight at the viewer."
  pendant   = "Composition: vertical orientation, the pendant centered in the lower half of the frame, the chain forming a clean symmetrical V-shape above it, photographed straight-on (eye-level)."
  earrings  = "Composition: matched pair shown side by side, both earrings vertically oriented with the posts at the top, equal spacing between them, centered in the frame, photographed straight-on."
  chain     = "Composition: the chain is laid completely flat in a graceful continuous S-curve, photographed from directly above (top-down view), the clasp visible at the top right of the frame, the entire chain fully in view."
  bracelet  = "Composition: the bracelet is laid completely flat in a graceful continuous S-curve, photographed from directly above (top-down view), the clasp visible at the top right of the frame, the entire bracelet fully in view."
  cufflinks = "Composition: matched pair shown side by side, both cufflinks face-up viewed from directly above, equal spacing between them, centered in the frame."
}

$styleSuffix = " Background: pure white seamless #FFFFFF, no shadow, no props, no surface, no reflection. Soft even studio lighting, ultra-high resolution, sharp focus, fine jewelry e-commerce catalog style, 1:1 square aspect ratio."

# All 87 products. Each: slug, category, subject prompt. Product 1 is re-generated under new consistent framing.
$products = @(
  @{ slug="celestial-cascade-rivire"; cat="necklace"; subject="An 18k white gold cascading riviere necklace with graduated round brilliant diamonds, hand-set heritage style." },
  @{ slug="sapphire-cluster-tennis-necklace"; cat="necklace"; subject="An 18k white gold tennis necklace with alternating royal blue sapphire clusters and pave diamond accents, flexible line." },
  @{ slug="aurora-pave-diamond-choker"; cat="necklace"; subject="An 18k yellow gold pave diamond choker, close-fitting collar style with continuous brilliant white diamonds." },
  @{ slug="emerald-trilogy-pendant-necklace"; cat="necklace"; subject="A three-stone emerald-cut Colombian emerald pendant on a fine 18k yellow gold chain, past-present-future setting." },
  @{ slug="eternal-halo-diamond-necklace"; cat="necklace"; subject="A 14k white gold necklace with a round brilliant diamond pendant surrounded by a delicate diamond halo, on a fine sliding chain." },
  @{ slug="ruby-diamond-lariat-y-necklace"; cat="necklace"; subject="A 14k rose gold Y-shaped lariat necklace ending in a pear-cut ruby drop framed by pave diamonds." },
  @{ slug="whisper-bezel-diamond-station"; cat="necklace"; subject="An 18k white gold station necklace with bezel-set round diamonds spaced along a fine chain, minimal modern style." },
  @{ slug="pear-cut-sapphire-drop-necklace"; cat="necklace"; subject="An 18k white gold necklace with a pear-cut Ceylon sapphire drop bordered with pave diamonds, on a fine chain." },
  @{ slug="grand-constellation-diamond-necklace"; cat="necklace"; subject="An 18k yellow gold collar necklace with scattered diamonds set in an asymmetric constellation pattern across the front." },
  @{ slug="marquise-emerald-diamond-riviera"; cat="necklace"; subject="An 18k white gold riviera necklace with alternating marquise emeralds and round brilliant diamonds, graduated in size." },
  @{ slug="verona-twisted-rope-necklace"; cat="necklace"; subject="A hand-twisted solid 18k yellow gold rope necklace with a hidden box clasp, polished finish." },
  @{ slug="tahitian-pearl-diamond-pendant-necklace"; cat="necklace"; subject="A single peacock-toned Tahitian pearl pendant capped with pave diamonds, on a fine 18k white gold chain." },
  @{ slug="heritage-mixed-gemstone-necklace"; cat="necklace"; subject="An 18k yellow gold heritage-style necklace with hand-set mixed gemstones - emerald, ruby, sapphire, diamond - across the front." },
  @{ slug="pave-heart-diamond-solitaire-necklace"; cat="necklace"; subject="A 14k white gold pave diamond heart pendant on a cable chain." },
  @{ slug="tiered-brilliant-diamond-necklace"; cat="necklace"; subject="An 18k white gold layered drape necklace with three tiers of graduated round brilliant diamonds." },
  @{ slug="oval-yellow-diamond-halo-necklace"; cat="necklace"; subject="An 18k yellow gold necklace with a fancy-yellow oval diamond pendant surrounded by a white diamond halo." },
  @{ slug="linked-bezel-diamond-necklace"; cat="necklace"; subject="An 18k white gold necklace with linked bezel-set round diamonds in a continuous sculptural chain." },
  @{ slug="cascading-drop-diamond-necklace"; cat="necklace"; subject="An 18k white gold necklace with a waterfall cascade of marquise and round brilliant diamonds from the center." },
  @{ slug="royal-sapphire-cluster-necklace"; cat="necklace"; subject="An 18k white gold necklace with a central royal blue Ceylon sapphire framed by a cluster of round and marquise diamonds." },
  @{ slug="multi-color-tourmaline-statement-necklace"; cat="necklace"; subject="An 18k yellow gold statement necklace set with pink, green, and watermelon tourmalines bordered with diamonds." },

  @{ slug="solitaire-whisper-round-brilliant-ring"; cat="ring"; subject="A 1.5-carat round brilliant diamond solitaire engagement ring on a knife-edge 18k white gold band." },
  @{ slug="emerald-cut-diamond-three-stone-ring"; cat="ring"; subject="An 18k white gold three-stone ring with a center emerald-cut diamond flanked by two tapered baguette diamonds." },
  @{ slug="verona-pave-eternity-band"; cat="ring"; subject="An 18k white gold 2mm eternity band set with continuous pave round brilliant diamonds around the entire band." },
  @{ slug="cushion-sapphire-halo-engagement-ring"; cat="ring"; subject="An 18k white gold engagement ring with a cushion-cut royal blue Ceylon sapphire surrounded by a halo of round brilliant diamonds." },
  @{ slug="pavilion-asscher-diamond-ring"; cat="ring"; subject="A 14k white gold platinum-look ring with a 2-carat Asscher-cut diamond center stone in a double-claw setting." },
  @{ slug="marquise-ruby-diamond-cluster-ring"; cat="ring"; subject="An 18k yellow gold cluster ring with a central marquise Burmese ruby surrounded by alternating round and marquise diamonds." },
  @{ slug="twisted-vine-diamond-ring"; cat="ring"; subject="A 14k rose gold twisted-vine ring with pave diamonds set along an organic sculptural band." },
  @{ slug="pear-cut-diamond-bypass-ring"; cat="ring"; subject="An 18k white gold bypass ring with two pear-cut diamonds set point-to-tail." },
  @{ slug="celestial-east-west-oval-ring"; cat="ring"; subject="An 18k yellow gold ring with an oval diamond set horizontally east-west across the finger." },
  @{ slug="yellow-diamond-cushion-halo-ring"; cat="ring"; subject="A fancy-yellow cushion-cut diamond ring framed by a white diamond halo, 18k yellow and white gold band." },
  @{ slug="heritage-diamond-cocktail-ring"; cat="ring"; subject="An oversized 18k yellow gold cocktail ring with a center round brilliant diamond and stepped diamond shoulders." },
  @{ slug="sapphire-diamond-toi-et-moi-ring"; cat="ring"; subject="An 18k white gold toi-et-moi ring with a pear-cut sapphire and pear-cut diamond meeting on a single band." },
  @{ slug="frost-princess-cut-solitaire"; cat="ring"; subject="An 18k white gold solitaire ring with a 1.25-carat princess-cut diamond in a four-claw setting." },
  @{ slug="trilogy-emerald-step-cut-ring"; cat="ring"; subject="An 18k yellow gold trilogy ring with three step-cut Colombian emeralds set across a polished band." },
  @{ slug="vintage-filigree-diamond-ring"; cat="ring"; subject="An 18k yellow gold vintage filigree ring with a central round diamond surrounded by hand-engraved openwork detail." },
  @{ slug="pave-band-stack-trio-ring"; cat="ring"; subject="Three slim 14k white gold pave diamond bands stacked together as a trio on a single ring finger profile." },
  @{ slug="aurora-round-halo-diamond-ring"; cat="ring"; subject="An 18k white gold ring with a round brilliant diamond center surrounded by a halo and pave diamond shoulders." },
  @{ slug="bezel-set-round-diamond-solitaire"; cat="ring"; subject="An 18k yellow gold ring with a round brilliant diamond fully bezel-set in a low-profile modern setting." },
  @{ slug="statement-oval-sapphire-cocktail-ring"; cat="ring"; subject="An 18k white gold cocktail ring with a 4-carat oval royal blue sapphire surrounded by a double halo of round diamonds." },
  @{ slug="diamond-knife-edge-eternity-ring"; cat="ring"; subject="An 18k white gold knife-edge eternity ring with pave diamonds set along a sharp architectural band." },

  @{ slug="solitaire-bezel-diamond-pendant"; cat="pendant"; subject="A 14k white gold pendant with a round brilliant diamond fully bezel-set, on a fine chain." },
  @{ slug="pear-cut-diamond-halo-pendant"; cat="pendant"; subject="An 18k white gold pendant with a pear-cut diamond surrounded by a delicate diamond halo, on a fine chain." },
  @{ slug="emerald-trilogy-drop-pendant"; cat="pendant"; subject="An 18k yellow gold vertical drop pendant with three Colombian emeralds set top to bottom, on a fine chain." },
  @{ slug="heart-cut-diamond-solitaire-pendant"; cat="pendant"; subject="An 18k rose gold pendant with a heart-cut diamond solitaire, on a fine chain." },
  @{ slug="whisper-marquise-diamond-pendant"; cat="pendant"; subject="A 14k white gold pendant with a marquise diamond set north-south, on a fine chain." },
  @{ slug="sapphire-cluster-heritage-pendant"; cat="pendant"; subject="An 18k yellow gold heritage-style cluster pendant with round sapphires and diamonds, on a fine chain." },
  @{ slug="tahitian-pearl-drop-pendant"; cat="pendant"; subject="A peacock-toned Tahitian pearl drop pendant capped with pave diamonds, on an 18k white gold chain." },
  @{ slug="round-diamond-floating-halo-pendant"; cat="pendant"; subject="A 14k white gold pendant with a round diamond floating within a delicate halo, on a fine chain." },
  @{ slug="verona-cross-diamond-pendant"; cat="pendant"; subject="An 18k yellow gold pave diamond cross pendant, on a fine chain." },
  @{ slug="ruby-diamond-heart-locket-pendant"; cat="pendant"; subject="An 18k yellow gold diamond-edged heart locket pendant with a ruby accent, on a fine chain." },
  @{ slug="constellation-diamond-star-pendant"; cat="pendant"; subject="An 18k yellow gold star-silhouette pendant with a scattered diamond constellation, on a fine chain." },
  @{ slug="oval-emerald-bezel-solo-pendant"; cat="pendant"; subject="An 18k yellow gold pendant with an oval emerald in a slim bezel, on a fine chain." },

  @{ slug="perfect-pear-diamond-drop-earrings"; cat="earrings"; subject="A matched pair of 18k white gold pear-cut diamond drop earrings with pave halos and posts." },
  @{ slug="halo-round-brilliant-studs"; cat="earrings"; subject="A matched pair of 18k white gold round brilliant diamond stud earrings each surrounded by a pave halo." },
  @{ slug="emerald-cut-diamond-solitaire-studs"; cat="earrings"; subject="A matched pair of 18k white gold emerald-cut diamond solitaire stud earrings in martini settings." },
  @{ slug="cascade-diamond-chandelier-earrings"; cat="earrings"; subject="A matched pair of 18k white gold chandelier earrings with layered cascading diamond drops." },
  @{ slug="sapphire-drop-pendant-earrings"; cat="earrings"; subject="A matched pair of 18k white gold drop earrings with pear-cut royal blue sapphires below pave diamond pendants." },
  @{ slug="frost-asscher-diamond-studs"; cat="earrings"; subject="A matched pair of 18k white gold Asscher-cut diamond stud earrings in four-claw settings." },
  @{ slug="marquise-diamond-climber-earrings"; cat="earrings"; subject="A matched pair of 18k white gold ear climber earrings with a line of graduated marquise diamonds tracing the ear." },
  @{ slug="whisper-pave-hoop-earrings"; cat="earrings"; subject="A matched pair of 18k yellow gold continuous pave diamond hoop earrings." },
  @{ slug="tahitian-pearl-diamond-drop-earrings"; cat="earrings"; subject="A matched pair of 18k white gold earrings with peacock-toned Tahitian pearl drops below diamond stud caps." },
  @{ slug="aurora-oval-diamond-studs"; cat="earrings"; subject="A matched pair of 18k white gold oval diamond solitaire stud earrings." },
  @{ slug="ruby-halo-drop-earrings"; cat="earrings"; subject="A matched pair of 18k yellow gold drop earrings with Burmese ruby drops surrounded by diamond halos." },
  @{ slug="linear-bezel-diamond-drop"; cat="earrings"; subject="A matched pair of 18k white gold linear drop earrings with three bezel-set diamonds graduated in size." },
  @{ slug="three-stone-diamond-drop-earrings"; cat="earrings"; subject="A matched pair of 18k white gold three-stone drop earrings with a center round diamond and pear-cut accents." },
  @{ slug="verona-twisted-hoop-earrings"; cat="earrings"; subject="A matched pair of hand-twisted 18k yellow gold hoop earrings with a polished finish." },
  @{ slug="yellow-diamond-cushion-halo-studs"; cat="earrings"; subject="A matched pair of fancy-yellow cushion diamond stud earrings with white diamond halos, 18k yellow and white gold." },

  @{ slug="heritage-18k-cuban-link-chain"; cat="chain"; subject="A solid 18k yellow gold Cuban link chain, heavyweight and polished." },
  @{ slug="solid-gold-rope-chain-14k"; cat="chain"; subject="A solid 14k yellow gold rope chain in classic medium weight." },
  @{ slug="verona-18k-figaro-chain"; cat="chain"; subject="A solid 18k yellow gold Figaro link chain with alternating link sizes." },
  @{ slug="diamond-cut-box-chain-14k"; cat="chain"; subject="A 14k white gold diamond-cut box chain with sharp facets and high shine." },
  @{ slug="aurora-franco-chain-18k-yellow"; cat="chain"; subject="A solid 18k yellow gold Franco chain with flexible square links." },
  @{ slug="pave-diamond-tennis-chain-14k-white"; cat="chain"; subject="A 14k white gold continuous pave diamond tennis chain, every link set with brilliant white diamonds." },
  @{ slug="twisted-foxtail-chain-14k-yellow"; cat="chain"; subject="A solid 14k yellow gold foxtail chain, sleek and modern." },
  @{ slug="solid-gold-wheat-chain-18k-rose"; cat="chain"; subject="A solid 18k rose gold wheat-link chain with an intricate pattern." },
  @{ slug="mariner-anchor-link-chain-14k"; cat="chain"; subject="A solid 14k yellow gold mariner anchor link chain, masculine nautical style." },
  @{ slug="round-snake-chain-18k-white"; cat="chain"; subject="A solid 18k white gold round snake chain, fluid and polished." },
  @{ slug="statement-curb-link-chain-14k-yellow"; cat="chain"; subject="A heavyweight 14k yellow gold curb link chain, statement weight." },
  @{ slug="diamond-station-cable-chain-18k"; cat="chain"; subject="An 18k yellow gold cable chain with bezel-set diamond stations every two inches." },

  @{ slug="verona-tennis-bracelet-round-diamond"; cat="bracelet"; subject="An 18k white gold tennis bracelet with continuous round brilliant diamonds, flexible line." },
  @{ slug="pave-diamond-cuff-bracelet-18k"; cat="bracelet"; subject="An 18k white gold cuff bracelet set with continuous pave diamonds across the top surface." },
  @{ slug="aurora-diamond-bangle"; cat="bracelet"; subject="A slim 18k yellow gold bangle bracelet with pave diamond highlights." },
  @{ slug="sapphire-diamond-charm-bracelet"; cat="bracelet"; subject="A delicate 18k white gold bracelet with sapphire and diamond charms hanging from a fine chain." },
  @{ slug="heritage-signet-diamond-cufflinks"; cat="cufflinks"; subject="A matched pair of round 18k yellow gold signet cufflinks set with pave diamond centers." },
  @{ slug="diamond-eternity-bezel-bracelet"; cat="bracelet"; subject="An 18k white gold bracelet with bezel-set diamonds in a continuous modern minimalist line." },
  @{ slug="constellation-diamond-anklet"; cat="bracelet"; subject="A fine 14k yellow gold anklet with scattered diamonds set in a star constellation pattern." },
  @{ slug="emerald-diamond-mixed-tennis-bracelet"; cat="bracelet"; subject="An 18k yellow gold tennis bracelet with alternating emeralds and round diamonds in a flexible line." }
)

$total = $products.Count
$ok = 0; $fail = 0; $skipped = 0
"Total products to generate: $total" | Out-File -FilePath $logPath -Append -Encoding utf8

for ($i = 0; $i -lt $total; $i++) {
  $p = $products[$i]
  $outPath = Join-Path $outDir "$($p.slug).jpg"
  if (Test-Path $outPath) {
    $skipped++
    "[$($i+1)/$total] SKIP (exists): $($p.slug)" | Out-File -FilePath $logPath -Append -Encoding utf8
    continue
  }
  $frame = $framing[$p.cat]
  $fullPrompt = "Studio product photograph of $($p.subject) $frame$styleSuffix"
  $body = @{
    contents = @(@{ parts = @(@{ text = $fullPrompt }) })
    generationConfig = @{ responseModalities = @("IMAGE") }
  } | ConvertTo-Json -Depth 8 -Compress
  $uri = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=$key"
  try {
    $resp = Invoke-RestMethod -Uri $uri -Method Post -ContentType "application/json" -Body $body -TimeoutSec 180
    $part = $resp.candidates[0].content.parts | Where-Object { $_.inlineData } | Select-Object -First 1
    if ($part) {
      $bytes = [Convert]::FromBase64String($part.inlineData.data)
      [System.IO.File]::WriteAllBytes($outPath, $bytes)
      $ok++
      "[$($i+1)/$total] OK $($p.slug) ($($bytes.Length) bytes)" | Out-File -FilePath $logPath -Append -Encoding utf8
    } else {
      $fail++
      "[$($i+1)/$total] NO_IMAGE $($p.slug)" | Out-File -FilePath $logPath -Append -Encoding utf8
    }
  } catch {
    $fail++
    "[$($i+1)/$total] ERROR $($p.slug): $($_.Exception.Message)" | Out-File -FilePath $logPath -Append -Encoding utf8
    Start-Sleep -Seconds 3
  }
  Start-Sleep -Milliseconds 500
}

"Finished $(Get-Date -Format o) ok=$ok fail=$fail skipped=$skipped" | Out-File -FilePath $logPath -Append -Encoding utf8
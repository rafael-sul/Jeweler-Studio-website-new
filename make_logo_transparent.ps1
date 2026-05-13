Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\avata\Desktop\Jeweler Made Images\banners\logo-jeweler-made-v2.jpg"
$outPath = "C:\Users\avata\Desktop\Jeweler Made Images\banners\jeweler-made-logo-transparent.png"

$src = [System.Drawing.Image]::FromFile($srcPath)
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, 0, 0, $src.Width, $src.Height)
$g.Dispose()
$src.Dispose()

$threshold = 225
for ($y = 0; $y -lt $bmp.Height; $y++) {
  for ($x = 0; $x -lt $bmp.Width; $x++) {
    $px = $bmp.GetPixel($x, $y)
    if ($px.R -ge $threshold -and $px.G -ge $threshold -and $px.B -ge $threshold) {
      $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
    }
  }
}

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$fi = Get-Item $outPath
Write-Output "ok size=$($fi.Length) dims=$($fi.Name)"

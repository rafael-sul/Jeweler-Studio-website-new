# Reads upload_targets.json and POSTs each image to its signed GCS URL in parallel.
# upload_targets.json shape: [{slug, file, url, parameters: [{name, value}], resourceUrl}, ...]
param(
  [string]$TargetsFile = "C:\Users\avata\Desktop\website project\upload_targets.json"
)

$targets = Get-Content $TargetsFile -Raw | ConvertFrom-Json
$resultsFile = "C:\Users\avata\Desktop\website project\upload_results.json"
$results = @()

$jobs = foreach ($t in $targets) {
  Start-Job -ScriptBlock {
    param($slug, $url, $params, $filePath, $resourceUrl)
    try {
      $tempBoundary = "----PSBoundary$([guid]::NewGuid())"
      $contentBytes = [System.IO.File]::ReadAllBytes($filePath)
      $sb = [System.Text.StringBuilder]::new()
      $crlf = "`r`n"
      foreach ($p in $params) {
        [void]$sb.Append("--$tempBoundary$crlf")
        [void]$sb.Append("Content-Disposition: form-data; name=`"$($p.name)`"$crlf$crlf")
        [void]$sb.Append("$($p.value)$crlf")
      }
      [void]$sb.Append("--$tempBoundary$crlf")
      [void]$sb.Append("Content-Disposition: form-data; name=`"file`"; filename=`"$([System.IO.Path]::GetFileName($filePath))`"$crlf")
      [void]$sb.Append("Content-Type: image/jpeg$crlf$crlf")
      $preBytes = [System.Text.Encoding]::UTF8.GetBytes($sb.ToString())
      $postBytes = [System.Text.Encoding]::UTF8.GetBytes("$crlf--$tempBoundary--$crlf")
      $body = New-Object byte[] ($preBytes.Length + $contentBytes.Length + $postBytes.Length)
      [Array]::Copy($preBytes, 0, $body, 0, $preBytes.Length)
      [Array]::Copy($contentBytes, 0, $body, $preBytes.Length, $contentBytes.Length)
      [Array]::Copy($postBytes, 0, $body, $preBytes.Length + $contentBytes.Length, $postBytes.Length)
      $req = [System.Net.HttpWebRequest]::Create($url)
      $req.Method = "POST"
      $req.ContentType = "multipart/form-data; boundary=$tempBoundary"
      $req.ContentLength = $body.Length
      $req.Timeout = 120000
      $stream = $req.GetRequestStream()
      $stream.Write($body, 0, $body.Length)
      $stream.Close()
      $resp = $req.GetResponse()
      $status = [int]$resp.StatusCode
      $resp.Close()
      return @{ slug = $slug; status = $status; ok = ($status -eq 201); resourceUrl = $resourceUrl }
    } catch {
      return @{ slug = $slug; status = 0; ok = $false; error = $_.Exception.Message; resourceUrl = $resourceUrl }
    }
  } -ArgumentList $t.slug, $t.url, $t.parameters, $t.file, $t.resourceUrl
}

$results = $jobs | Wait-Job | Receive-Job
$jobs | Remove-Job
$results | ConvertTo-Json -Depth 5 | Out-File -FilePath $resultsFile -Encoding utf8
$ok = ($results | Where-Object { $_.ok }).Count
$fail = ($results | Where-Object { -not $_.ok }).Count
Write-Output "uploaded ok=$ok fail=$fail results=$resultsFile"
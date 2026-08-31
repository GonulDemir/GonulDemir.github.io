param(
    [Parameter(Mandatory = $false)]
    [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot),

    [Parameter(Mandatory = $false)]
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$requestHeaders = @{
    'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0 Safari/537.36'
    'Accept'     = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
}

function Get-LinkedInAssetId {
    param([string]$Url)

    $decoded = [System.Net.WebUtility]::HtmlDecode($Url)
    if ($decoded -match '/v2/(?<asset>[^/]+)/') {
        return $Matches['asset']
    }
    if ($decoded -match 'media(?<asset>[^/?#]+)$') {
        return $Matches['asset']
    }
    return $null
}

function Get-ImageExtension {
    param(
        [string]$ContentType,
        [string]$Url
    )

    $mime = ($ContentType -split ';')[0].Trim().ToLowerInvariant()
    switch ($mime) {
        'image/jpeg' { return '.jpg' }
        'image/png'  { return '.png' }
        'image/webp' { return '.webp' }
        'image/gif'  { return '.gif' }
        'image/svg+xml' { return '.svg' }
    }

    $pathExtension = [IO.Path]::GetExtension(([Uri]$Url).AbsolutePath).ToLowerInvariant()
    if ($pathExtension -in @('.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg')) {
        if ($pathExtension -eq '.jpeg') { return '.jpg' }
        return $pathExtension
    }

    throw "Unsupported image content type '$ContentType' for $Url"
}

$blogRoot = Join-Path $RepoRoot 'src\content\blog'
$imageRoot = Join-Path $RepoRoot 'public\images\articles'
$articleFiles = Get-ChildItem -LiteralPath $blogRoot -Filter '*.mdx' -File
$linkedinPattern = 'https://media\.licdn\.com/[^\s\)\]\"''<>]+'
$processedArticles = 0
$processedImages = 0

foreach ($articleFile in $articleFiles) {
    $raw = [IO.File]::ReadAllText($articleFile.FullName, [Text.Encoding]::UTF8)
    $oldUrls = @([regex]::Matches($raw, $linkedinPattern) | ForEach-Object { $_.Value.TrimEnd('*') } | Select-Object -Unique)
    if ($oldUrls.Count -eq 0) {
        continue
    }

    if ($raw -notmatch '(?m)^sourceUrl:\s*(?<url>https://(?:www\.|[a-z]{2}\.)?linkedin\.com/pulse/[^\r\n]+)') {
        throw "No LinkedIn sourceUrl found in $($articleFile.Name)"
    }
    $sourceUrl = $Matches['url'].Trim()
    $slug = [IO.Path]::GetFileNameWithoutExtension($articleFile.Name)

    Write-Output "Fetching article: $slug"
    $page = Invoke-WebRequest -Uri $sourceUrl -UseBasicParsing -Headers $requestHeaders -TimeoutSec 60
    if ($page.StatusCode -ne 200) {
        throw "LinkedIn returned HTTP $($page.StatusCode) for $sourceUrl"
    }

    $currentByAsset = @{}
    $currentCoverUrl = $null
    $currentPattern = '(?:src|data-delayed-url)="(?<url>https://media\.licdn\.com/[^\"]+)"'
    foreach ($match in [regex]::Matches($page.Content, $currentPattern)) {
        $currentUrl = [System.Net.WebUtility]::HtmlDecode($match.Groups['url'].Value)
        if (-not $currentCoverUrl -and $currentUrl -match '/article-cover_image-') {
            $currentCoverUrl = $currentUrl
        }
        $assetId = Get-LinkedInAssetId -Url $currentUrl
        if ($assetId -and -not $currentByAsset.ContainsKey($assetId)) {
            $currentByAsset[$assetId] = $currentUrl
        }
    }

    $resolved = @()
    foreach ($oldUrl in $oldUrls) {
        $assetId = Get-LinkedInAssetId -Url $oldUrl
        if (-not $assetId) {
            throw "Could not extract a LinkedIn asset ID from $oldUrl"
        }
        if ($currentByAsset.ContainsKey($assetId)) {
            $resolvedUrl = $currentByAsset[$assetId]
        } elseif ($oldUrl -match '/media[^/?#]+$' -and $currentCoverUrl) {
            $resolvedUrl = $currentCoverUrl
            Write-Output "  Cover asset changed: $assetId -> $(Get-LinkedInAssetId -Url $currentCoverUrl)"
        } else {
            throw "Asset $assetId from $($articleFile.Name) was not found on its live LinkedIn page"
        }
        $resolved += [pscustomobject]@{
            OldUrl = $oldUrl
            NewUrl = $resolvedUrl
            AssetId = $assetId
        }
    }

    if ($DryRun) {
        Write-Output "  OK: $($resolved.Count) image references resolved"
        $processedArticles++
        $processedImages += $resolved.Count
        continue
    }

    $articleImageDir = Join-Path $imageRoot $slug
    if (-not (Test-Path -LiteralPath $articleImageDir)) {
        New-Item -ItemType Directory -Path $articleImageDir -Force | Out-Null
    }

    $updated = $raw
    $figureNumber = 0
    foreach ($item in $resolved) {
        $isCover = $item.NewUrl -match '/article-cover_image-' -or $item.OldUrl -match '/media[A-Za-z0-9_-]+$'
        if ($isCover) {
            $baseName = 'cover'
        } else {
            $figureNumber++
            $baseName = 'figure-{0:D2}' -f $figureNumber
        }

        $temporaryPath = Join-Path $articleImageDir ($baseName + '.download')
        $downloadHeaders = @{
            'User-Agent' = $requestHeaders['User-Agent']
            'Referer'    = $sourceUrl
            'Accept'     = 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
        $response = Invoke-WebRequest -Uri $item.NewUrl -UseBasicParsing -Headers $downloadHeaders -TimeoutSec 90 -OutFile $temporaryPath -PassThru
        $contentType = [string]$response.Headers['Content-Type']
        if (-not $contentType.StartsWith('image/', [StringComparison]::OrdinalIgnoreCase)) {
            throw "Expected an image for $($item.AssetId), received '$contentType'"
        }

        $extension = Get-ImageExtension -ContentType $contentType -Url $item.NewUrl
        $destinationPath = Join-Path $articleImageDir ($baseName + $extension)
        Move-Item -LiteralPath $temporaryPath -Destination $destinationPath -Force

        $relativeUrl = "/images/articles/$slug/$baseName$extension"
        $updated = $updated.Replace($item.OldUrl, $relativeUrl)
        Write-Output "  Saved $baseName$extension"
    }

    if ([regex]::IsMatch($updated, $linkedinPattern)) {
        throw "LinkedIn image references remain in $($articleFile.Name); the file was not rewritten"
    }

    [IO.File]::WriteAllText($articleFile.FullName, $updated, $utf8NoBom)
    $processedArticles++
    $processedImages += $resolved.Count
    Write-Output "  Updated $($articleFile.Name)"
}

Write-Output "Completed: $processedArticles articles, $processedImages localized image references. DryRun=$DryRun"

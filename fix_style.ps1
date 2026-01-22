$head = Get-Content css\style.css -TotalCount 1799
$fix = Get-Content fix_block.css
$tail = Get-Content css\style.css | Select-Object -Skip 1973
$result = $head + $fix + $tail
$result | Set-Content css\style.css
Write-Host "Style.css fixed successfully."

$filePath = "c:\Users\porim\.gemini\antigravity\scratch\edumirar-website\images\ロゴ全体画像.svg"
$newFilePath = "c:\Users\porim\.gemini\antigravity\scratch\edumirar-website\images\ロゴ全体画像_bg.svg"
$lines = Get-Content -Path $filePath -Encoding UTF8
$lines[1] = '<svg id="_レイヤー_2" data-name="レイヤー 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -244.33 1133.86 767.16"><rect x="-100" y="-344.33" width="1333.86" height="967.16" fill="#901d42" />'
$lines | Set-Content -Path $newFilePath -Encoding UTF8

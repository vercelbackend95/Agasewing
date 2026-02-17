# Windows local testing for `php-api/public_html/api/contact.php`

## 1) Set paths (PowerShell, run this first in the same session)
```powershell
$PhpRoot = 'C:\Users\Ja\AppData\Local\Microsoft\WinGet\Packages\PHP.PHP.8.3_Microsoft.Winget.Source_8wekyb3d8bbwe'
$PhpExe  = Join-Path $PhpRoot 'php.exe'
$PhpIni  = Join-Path $PhpRoot 'php.ini'
$ApiRoot = 'C:\dev\Agasewing\php-api'

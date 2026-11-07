@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Instale o Node.js 24 LTS recomendado ou a linha 22 a partir da versao 22.13.0 em https://nodejs.org e abra este arquivo de novo.
  pause
  exit /b 1
)

node -e "const [major,minor]=process.versions.node.split('.').map(Number);process.exit((major===22&&minor>=13)||major>=24?0:1)"
if errorlevel 1 (
  echo Esta versao do Node.js nao atende ao projeto. Use Node.js 24 LTS ou 22.13.0 na linha 22.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Instalando dependencias. Isso acontece so na primeira vez...
  if exist package-lock.json (
    call npm ci
  ) else (
    call npm install
  )
  if errorlevel 1 (
    echo Falha ao instalar as dependencias.
    pause
    exit /b 1
  )
)

echo Gerando o site...
call npm run build
if errorlevel 1 (
  echo Falha ao gerar o site.
  pause
  exit /b 1
)

echo Abrindo o site em http://127.0.0.1:8787 ...
start "" cmd /c "timeout /t 8 /nobreak >nul & start http://127.0.0.1:8787"
call npm run preview
pause

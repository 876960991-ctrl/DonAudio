@echo off
chcp 65001 > nul
title DONAUDIO - Deploy to Vercel
cd /d "%~dp0"

echo.
echo ================================================
echo   東方之音 DONAUDIO - Vercel Deploy
echo ================================================
echo.
echo Current dir: %CD%
echo.

where vercel > nul 2>&1
if errorlevel 1 (
  echo [1/3] Installing Vercel CLI globally...
  call npm install -g vercel
  if errorlevel 1 (
    echo.
    echo [X] Install failed. Check network or run manually: npm install -g vercel
    pause
    exit /b 1
  )
  echo [OK] Vercel CLI installed.
) else (
  echo [1/3] Vercel CLI already installed, skipping.
)

echo.
echo [2/3] Checking login status...
call vercel whoami > nul 2>&1
if errorlevel 1 (
  echo Need to login. Browser will open for authorization.
  echo.
  pause
  call vercel login
  if errorlevel 1 (
    echo [X] Login failed. Please retry.
    pause
    exit /b 1
  )
)

echo.
echo [3/3] Deploying...
echo.
echo Tip: First time Vercel will ask:
echo    Set up and deploy?         -^> Y
echo    Which scope?               -^> Enter for default
echo    Link to existing project?  -^> N
echo    Project name?              -^> Enter for "donaudio"
echo    Code directory?            -^> Enter for "./"
echo    Modify settings?           -^> N
echo.

call vercel --prod

echo.
echo ================================================
echo Deploy URL is printed above. Copy and share.
echo ================================================
echo.
pause

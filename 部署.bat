@echo off
chcp 65001 > nul
title 東方之音 DONAUDIO - 一键部署到 Vercel
cd /d "%~dp0"

echo.
echo ================================================
echo   東方之音 DONAUDIO - Vercel 一键部署
echo ================================================
echo.
echo 当前目录: %CD%
echo.

REM 检查 vercel CLI 是否已安装
where vercel > nul 2>&1
if errorlevel 1 (
  echo [1/3] 首次运行，正在全局安装 Vercel CLI...
  call npm install -g vercel
  if errorlevel 1 (
    echo.
    echo ❌ 安装失败。请检查网络，或手动运行：npm install -g vercel
    pause
    exit /b 1
  )
  echo ✅ Vercel CLI 安装完成
) else (
  echo [1/3] Vercel CLI 已安装，跳过安装
)

echo.
echo [2/3] 检查登录状态...
call vercel whoami > nul 2>&1
if errorlevel 1 (
  echo 需要登录 Vercel。下一步会打开浏览器让你授权。
  echo.
  pause
  call vercel login
  if errorlevel 1 (
    echo ❌ 登录失败，请重试。
    pause
    exit /b 1
  )
)
for /f "tokens=*" %%i in ('vercel whoami 2^>nul') do echo ✅ 当前账号: %%i

echo.
echo [3/3] 开始部署...
echo.
echo 💡 首次部署 Vercel 会问几个问题：
echo    • Set up and deploy ...? --> Y
echo    • Which scope?         --> 回车用默认
echo    • Link to existing?    --> N
echo    • Project name?        --> 回车用默认 donaudio 或自己起
echo    • Code directory?      --> 回车用 ./
echo    • Modify settings?     --> N
echo.
echo 要部署到生产环境（--prod）请稍等后按提示执行：vercel --prod
echo.

call vercel --prod

echo.
echo ================================================
echo 部署完成后 URL 会打印在上面，复制即可分享。
echo ================================================
echo.
pause

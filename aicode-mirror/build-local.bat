@echo off
echo ========================================
echo AI Code Mirror 本地构建脚本
echo ========================================

:: 检查 Node.js 是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

echo.
echo [1/3] 构建前端...
cd frontend
call npm install
call npm run build

if not exist "dist" (
    echo [错误] 前端构建失败
    pause
    exit /b 1
)

echo [成功] 前端构建完成

echo.
echo [2/3] 安装后端依赖...
cd ..\backend
call npm install --production

echo [成功] 后端依赖安装完成

echo.
echo [3/3] 创建部署包...
cd ..
if exist "deploy-package" rd /s /q deploy-package
mkdir deploy-package

:: 复制前端构建文件
xcopy /E /I /Y frontend\dist deploy-package\frontend\dist

:: 复制后端文件
xcopy /E /I /Y backend deploy-package\backend
:: 删除 node_modules（将在服务器上安装）
if exist "deploy-package\backend\node_modules" rd /s /q deploy-package\backend\node_modules

:: 复制配置和脚本
copy nginx.conf deploy-package\
copy deploy.sh deploy-package\
copy setup-server.sh deploy-package\
copy ecosystem.config.cjs deploy-package\backend\
copy 部署文档.md deploy-package\
copy 快速部署指南.md deploy-package\

echo.
echo ========================================
echo 构建完成！
echo 部署包位置: %cd%\deploy-package
echo.
echo 下一步:
echo 1. 将 deploy-package 文件夹上传到服务器 /var/www/aicode-mirror
echo 2. SSH 连接到服务器
echo 3. 运行 setup-server.sh 初始化服务器
echo 4. 运行 deploy.sh 部署应用
echo ========================================
pause

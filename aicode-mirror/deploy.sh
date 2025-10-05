#!/bin/bash

# AI Code Mirror 部署脚本
# 用于阿里云 ECS Linux 服务器

set -e  # 遇到错误立即退出

echo "========================================="
echo "AI Code Mirror 部署脚本"
echo "========================================="

# 配置变量
PROJECT_DIR="/var/www/aicode-mirror"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
NGINX_CONF="/etc/nginx/sites-available/aicode-mirror"
REPO_URL="your-git-repo-url"  # 替换为你的 Git 仓库地址

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    log_error "请使用 root 用户或 sudo 运行此脚本"
    exit 1
fi

# 1. 拉取最新代码
log_info "拉取最新代码..."
cd $PROJECT_DIR
git pull origin master || {
    log_warn "Git pull 失败，可能是首次部署"
}

# 2. 构建前端
log_info "构建前端..."
cd $FRONTEND_DIR
npm install --production=false
npm run build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    log_error "前端构建失败，dist 目录不存在"
    exit 1
fi

log_info "前端构建成功"

# 3. 安装后端依赖
log_info "安装后端依赖..."
cd $BACKEND_DIR
npm install --production

# 4. 创建日志目录
mkdir -p $BACKEND_DIR/logs

# 5. 重启后端服务
log_info "重启后端服务..."
if pm2 describe aicode-mirror-backend > /dev/null 2>&1; then
    pm2 restart aicode-mirror-backend
    log_info "后端服务已重启"
else
    pm2 start ecosystem.config.cjs
    log_info "后端服务已启动"
fi

# 6. 保存 PM2 配置
pm2 save

# 7. 重启 Nginx
log_info "重启 Nginx..."
nginx -t && systemctl reload nginx

# 8. 显示服务状态
log_info "服务状态:"
pm2 status

echo ""
log_info "========================================="
log_info "部署完成！"
log_info "前端地址: http://your-domain.com"
log_info "后端地址: http://your-domain.com/api"
log_info "========================================="

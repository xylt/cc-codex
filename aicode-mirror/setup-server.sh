#!/bin/bash

# AI Code Mirror 服务器初始化脚本
# 用于首次配置阿里云 ECS Linux 服务器

set -e

echo "========================================="
echo "AI Code Mirror 服务器初始化"
echo "========================================="

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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

# 1. 更新系统
log_info "更新系统包..."
apt update && apt upgrade -y

# 2. 安装必要工具
log_info "安装必要工具..."
apt install -y git curl wget vim ufw

# 3. 安装 Node.js (使用 NodeSource)
log_info "安装 Node.js 18.x..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# 验证安装
node --version
npm --version

# 4. 安装 PM2
log_info "安装 PM2..."
npm install -g pm2

# 设置 PM2 开机自启
pm2 startup systemd -u root --hp /root
log_info "PM2 已配置为开机自启"

# 5. 安装 Nginx
log_info "安装 Nginx..."
apt install -y nginx

# 启动并设置开机自启
systemctl start nginx
systemctl enable nginx

# 6. 安装 MongoDB (可选，如果使用本地数据库)
log_info "是否安装 MongoDB? (y/n)"
read -r install_mongo
if [ "$install_mongo" = "y" ]; then
    log_info "安装 MongoDB..."

    # 导入 MongoDB GPG key
    curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-6.0.gpg

    # 添加 MongoDB 源
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list

    # 安装
    apt update
    apt install -y mongodb-org

    # 启动并设置开机自启
    systemctl start mongod
    systemctl enable mongod

    log_info "MongoDB 已安装并启动"
fi

# 7. 配置防火墙
log_info "配置防火墙..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# 8. 创建项目目录
log_info "创建项目目录..."
mkdir -p /var/www/aicode-mirror
cd /var/www/aicode-mirror

# 9. 配置 Git (如果使用私有仓库)
log_info "是否配置 Git SSH key? (y/n)"
read -r setup_git
if [ "$setup_git" = "y" ]; then
    log_info "生成 SSH key..."
    ssh-keygen -t rsa -b 4096 -C "your-email@example.com" -f /root/.ssh/id_rsa -N ""
    log_info "请将以下公钥添加到 Git 仓库的 Deploy Keys:"
    cat /root/.ssh/id_rsa.pub
    log_info "按任意键继续..."
    read -r
fi

# 10. 克隆项目 (如果使用 Git)
log_info "是否克隆 Git 仓库? (y/n)"
read -r clone_repo
if [ "$clone_repo" = "y" ]; then
    log_info "请输入 Git 仓库地址:"
    read -r repo_url
    git clone "$repo_url" .
fi

# 11. 创建必要的目录
mkdir -p /var/www/aicode-mirror/backend/logs
mkdir -p /var/www/aicode-mirror/frontend/dist

# 12. 配置权限
chown -R www-data:www-data /var/www/aicode-mirror

log_info "========================================="
log_info "服务器初始化完成！"
log_info ""
log_info "已安装的软件:"
log_info "- Node.js: $(node --version)"
log_info "- npm: $(npm --version)"
log_info "- PM2: $(pm2 --version)"
log_info "- Nginx: $(nginx -v 2>&1)"
if [ "$install_mongo" = "y" ]; then
    log_info "- MongoDB: $(mongod --version | head -n 1)"
fi
log_info ""
log_info "下一步:"
log_info "1. 配置 .env.production 文件"
log_info "2. 复制 nginx.conf 到 /etc/nginx/sites-available/"
log_info "3. 运行 deploy.sh 进行部署"
log_info "========================================="

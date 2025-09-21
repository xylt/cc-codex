# AI代码镜像 - AI Code Mirror

一个模仿 [aicodemirror.com](https://www.aicodemirror.com/) 设计的完整AI编程平台，使用Vue.js + Node.js构建。

## 🌟 功能特性

### 前端功能
- ✅ **响应式首页** - 模仿原网站设计，包含英雄区域、模型介绍、功能展示
- ✅ **定价页面** - 四种套餐（免费版、专业版、高级版、企业版）
- ✅ **教程页面** - 详细的使用指南和FAQ
- ✅ **用户认证** - 登录/注册系统，支持表单验证
- ✅ **用户仪表板** - 使用统计、API密钥管理、账户设置
- ✅ **现代UI设计** - 使用渐变色彩、卡片布局、响应式设计

### 后端功能
- ✅ **RESTful API** - 完整的后端API接口
- ✅ **用户认证** - JWT令牌认证，密码加密
- ✅ **API密钥管理** - 创建、更新、删除API密钥
- ✅ **使用统计** - 用户使用量跟踪和分析
- ✅ **安全中间件** - 速率限制、CORS、Helmet安全头
- ✅ **数据验证** - 输入验证和错误处理

## 🛠️ 技术栈

### 前端
- **Vue.js 3** - 渐进式JavaScript框架
- **Vue Router** - 客户端路由
- **Axios** - HTTP客户端
- **CSS3** - 现代CSS特性和响应式设计

### 后端
- **Node.js** - JavaScript运行时
- **Express.js** - Web应用框架
- **MongoDB** - NoSQL数据库（模型定义已准备）
- **JWT** - JSON Web Tokens认证
- **bcryptjs** - 密码加密

## 📁 项目结构

```
aicode-mirror/
├── frontend/                 # Vue.js前端应用
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   │   ├── Header.vue   # 导航头部
│   │   │   └── Footer.vue   # 页脚
│   │   ├── views/           # 页面组件
│   │   │   ├── Home.vue     # 首页
│   │   │   ├── Pricing.vue  # 定价页面
│   │   │   ├── Tutorial.vue # 教程页面
│   │   │   ├── Login.vue    # 登录/注册页面
│   │   │   └── Dashboard.vue# 用户仪表板
│   │   ├── App.vue          # 根组件
│   │   └── main.js          # 入口文件
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend/                 # Node.js后端API
    ├── src/
    │   ├── controllers/     # 控制器
    │   ├── middleware/      # 中间件
    │   ├── models/          # 数据模型
    │   ├── routes/          # 路由定义
    │   └── utils/           # 工具函数
    ├── server.js            # 服务器入口
    ├── package.json
    └── .env.example         # 环境变量模板
```

## 🚀 快速开始

### 环境要求
- Node.js >= 16.x
- npm >= 8.x
- MongoDB >= 4.x（可选，用于数据持久化）

### 1. 克隆项目
```bash
git clone <repository-url>
cd aicode-mirror
```

### 2. 安装依赖

#### 安装前端依赖
```bash
cd frontend
npm install
```

#### 安装后端依赖
```bash
cd ../backend
npm install
```

### 3. 环境配置

在后端目录创建 `.env` 文件：
```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件，配置以下变量：
```env
# 基本配置
PORT=3001
NODE_ENV=development

# 数据库（可选，暂时使用内存数据）
MONGODB_URI=mongodb://localhost:27017/aicode-mirror

# JWT密钥（重要：生产环境请更换）
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS配置
CORS_ORIGIN=http://localhost:3000

# 速率限制
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

### 4. 启动应用

#### 启动后端服务器
```bash
cd backend
npm run dev
```
后端服务将在 `http://localhost:3001` 启动

#### 启动前端开发服务器
```bash
cd frontend
npm run dev
```
前端应用将在 `http://localhost:3000` 启动

### 5. 访问应用

打开浏览器访问 `http://localhost:3000` 即可看到完整的AI代码镜像网站。

## 📱 功能演示

### 首页
- 英雄区域展示核心价值主张
- Claude模型系列介绍（Haiku、Sonnet、Opus）
- IDE集成展示
- 功能特性卡片

### 定价页面
- 四种套餐对比
- 积分计费说明
- 常见问题解答

### 教程页面
- 快速开始指南
- 功能详细说明
- 高级用法介绍
- 支持资源

### 用户系统
- 注册/登录表单
- 社交登录占位
- 仪表板统计
- API密钥管理

## 🔧 开发指南

### 添加新页面
1. 在 `frontend/src/views/` 创建Vue组件
2. 在 `frontend/src/main.js` 添加路由
3. 在导航组件中添加链接

### 添加API接口
1. 在 `backend/src/controllers/` 创建控制器
2. 在 `backend/src/routes/` 定义路由
3. 在 `backend/server.js` 注册路由

### 样式定制
- 主色调：`#D2691E` (橙棕色)
- 辅助色：`#8B4513` (深棕色)
- 背景色：`#faf8f5` (米白色)

## 🚀 部署

### 前端部署
```bash
cd frontend
npm run build
```
将 `dist/` 目录部署到静态文件服务器（如Nginx、Vercel、Netlify）

### 后端部署
```bash
cd backend
npm start
```
部署到Node.js托管服务（如Heroku、Railway、阿里云等）

### 环境变量
生产环境请确保设置以下环境变量：
- `NODE_ENV=production`
- `JWT_SECRET=` (强密钥)
- `MONGODB_URI=` (生产数据库)
- `CORS_ORIGIN=` (前端域名)

## 🤝 贡献

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -am '添加新功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 创建Pull Request

## 📄 许可证

MIT License

## 🆘 支持

如有问题，请：
1. 查看本README文档
2. 检查Issues页面
3. 创建新Issue描述问题

## 🌟 特别说明

本项目是对 aicodemirror.com 网站的学习和模仿实现，仅用于技术学习和演示目的。设计风格和布局参考了原网站，但所有代码均为原创实现。

---

**开发者**: AI Code Mirror Team
**版本**: 1.0.0
**最后更新**: 2024年
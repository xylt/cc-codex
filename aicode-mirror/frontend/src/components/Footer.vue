<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <span class="logo-icon">🔮</span>
            <span class="logo-text">AI代码镜像</span>
          </div>
          <p class="footer-desc">
            专业的AI编程平台，为中国开发者提供稳定、安全、实惠的Claude Code服务。
          </p>
        </div>

        <div class="footer-section">
          <h4>产品</h4>
          <ul>
            <li><a href="/pricing">定价方案</a></li>
            <li><a href="/tutorial">使用教程</a></li>
            <li><a href="/">API文档</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>支持</h4>
          <ul>
            <li><a href="/">帮助中心</a></li>
            <li><a href="/">联系我们</a></li>
            <li><a href="/">社区论坛</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>关于</h4>
          <ul>
            <li><a href="/">关于我们</a></li>
            <li><a href="/">隐私政策</a></li>
            <li><a href="/">服务条款</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 AI代码镜像. 保留所有权利.</p>
        <div class="social-links">
          <a href="#" class="social-link">📧</a>
          <a href="#" class="social-link">💬</a>
          <a href="#" class="social-link">🐱</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: #2C1810;
  color: #E5DDD5;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  color: #D2691E;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.logo-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.footer-desc {
  color: #B8AFA6;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: #B8AFA6;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #D2691E;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid #4A3429;
  color: #8B7D74;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: rgba(210, 105, 30, 0.2);
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  text-decoration: none;
  transition: all 0.3s;
}

.social-link:hover {
  background: #D2691E;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
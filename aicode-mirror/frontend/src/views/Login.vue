<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <span class="logo-icon">🔮</span>
            <span class="logo-text">AI代码镜像</span>
          </div>
          <h2>{{ isRegister ? '注册账户' : '登录账户' }}</h2>
          <p>{{ isRegister ? '加入我们，开启AI编程之旅' : '欢迎回来，继续你的编程之旅' }}</p>
        </div>

        <form @submit.prevent="handleSubmit" class="login-form">
          <div class="form-group">
            <label for="email">邮箱地址</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="请输入邮箱地址"
              :class="{ error: errors.email }"
            >
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div v-if="isRegister" class="form-group">
            <label for="name">用户名</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="请输入用户名"
              :class="{ error: errors.name }"
            >
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="password">密码</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              placeholder="请输入密码"
              :class="{ error: errors.password }"
            >
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div v-if="isRegister" class="form-group">
            <label for="confirmPassword">确认密码</label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              placeholder="请再次输入密码"
              :class="{ error: errors.confirmPassword }"
            >
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>

          <div v-if="!isRegister" class="form-options">
            <label class="checkbox">
              <input type="checkbox" v-model="form.remember">
              <span class="checkmark"></span>
              记住我
            </label>
            <a href="#" class="forgot-password">忘记密码？</a>
          </div>

          <div v-if="isRegister" class="form-group">
            <label class="checkbox">
              <input type="checkbox" v-model="form.agree" required>
              <span class="checkmark"></span>
              我同意<a href="#" class="link">服务条款</a>和<a href="#" class="link">隐私政策</a>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? '处理中...' : (isRegister ? '注册账户' : '登录') }}
          </button>

          <div class="divider">
            <span>或</span>
          </div>

          <div class="social-login">
            <button type="button" class="btn btn-social" @click="socialLogin('github')">
              <span class="social-icon">🐱</span>
              GitHub登录
            </button>
            <button type="button" class="btn btn-social" @click="socialLogin('google')">
              <span class="social-icon">🌐</span>
              Google登录
            </button>
          </div>
        </form>

        <div class="login-footer">
          <p v-if="!isRegister">
            还没有账户？
            <a href="#" @click.prevent="isRegister = true" class="link">立即注册</a>
          </p>
          <p v-else>
            已有账户？
            <a href="#" @click.prevent="isRegister = false" class="link">立即登录</a>
          </p>
        </div>
      </div>

      <div class="login-benefits">
        <h3>为什么选择AI代码镜像？</h3>
        <div class="benefits-list">
          <div class="benefit-item">
            <div class="benefit-icon">⚡</div>
            <div class="benefit-content">
              <h4>极速响应</h4>
              <p>中国优化网络，毫秒级AI响应</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">🔒</div>
            <div class="benefit-content">
              <h4>安全可靠</h4>
              <p>企业级安全保障，代码隐私保护</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">💰</div>
            <div class="benefit-content">
              <h4>价格实惠</h4>
              <p>透明计费，无隐藏费用</p>
            </div>
          </div>

          <div class="benefit-item">
            <div class="benefit-icon">🛠️</div>
            <div class="benefit-content">
              <h4>简单集成</h4>
              <p>支持主流IDE，一键安装</p>
            </div>
          </div>
        </div>

        <div class="stats">
          <div class="stat-item">
            <div class="stat-number">10K+</div>
            <div class="stat-label">开发者信赖</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">服务可用性</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50ms</div>
            <div class="stat-label">平均响应时间</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      isRegister: false,
      loading: false,
      form: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        remember: false,
        agree: false
      },
      errors: {}
    }
  },
  mounted() {
    // 检查URL参数，如果有plan参数则显示注册表单
    if (this.$route.query.plan) {
      this.isRegister = true
    }
  },
  methods: {
    async handleSubmit() {
      this.errors = {}

      if (!this.validateForm()) {
        return
      }

      this.loading = true

      try {
        if (this.isRegister) {
          await this.register()
        } else {
          await this.login()
        }
      } catch (error) {
        console.error('Authentication error:', error)
        this.handleError(error)
      } finally {
        this.loading = false
      }
    },

    validateForm() {
      const errors = {}

      // 邮箱验证
      if (!this.form.email) {
        errors.email = '请输入邮箱地址'
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        errors.email = '邮箱地址格式不正确'
      }

      // 密码验证
      if (!this.form.password) {
        errors.password = '请输入密码'
      } else if (this.form.password.length < 6) {
        errors.password = '密码长度至少6位'
      }

      if (this.isRegister) {
        // 用户名验证
        if (!this.form.name) {
          errors.name = '请输入用户名'
        } else if (this.form.name.length < 2) {
          errors.name = '用户名长度至少2位'
        }

        // 确认密码验证
        if (!this.form.confirmPassword) {
          errors.confirmPassword = '请确认密码'
        } else if (this.form.password !== this.form.confirmPassword) {
          errors.confirmPassword = '两次输入的密码不一致'
        }
      }

      this.errors = errors
      return Object.keys(errors).length === 0
    },

    async login() {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.form.email,
            password: this.form.password
          })
        })

        const data = await response.json()

        if (data.success) {
          // 保存token和用户信息
          localStorage.setItem('authToken', data.data.token)
          localStorage.setItem('user', JSON.stringify(data.data.user))

          // 跳转到仪表板
          this.$router.push('/dashboard')
        } else {
          throw new Error(data.message || '登录失败')
        }
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    async register() {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.form.name,
            email: this.form.email,
            password: this.form.password
          })
        })

        const data = await response.json()

        if (data.success) {
          // 保存token和用户信息
          localStorage.setItem('authToken', data.data.token)
          localStorage.setItem('user', JSON.stringify(data.data.user))

          // 跳转到仪表板
          this.$router.push('/dashboard')
        } else {
          throw new Error(data.message || '注册失败')
        }
      } catch (error) {
        console.error('Register error:', error)
        throw error
      }
    },

    handleError(error) {
      if (error.response?.status === 401) {
        this.errors.general = '邮箱或密码错误'
      } else if (error.response?.status === 409) {
        this.errors.email = '该邮箱已被注册'
      } else {
        this.errors.general = '服务器错误，请稍后重试'
      }
    },

    socialLogin(provider) {
      // 模拟社交登录
      alert(`${provider === 'github' ? 'GitHub' : 'Google'}登录功能开发中...`)
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #faf8f5 0%, #f0e6d6 100%);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.login-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.login-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: #2C1810;
}

.logo-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.login-header h2 {
  color: #2C1810;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.login-header p {
  color: #666;
  font-size: 1rem;
}

.login-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2C1810;
  font-weight: 500;
}

.form-group input[type="email"],
.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #D2691E;
  box-shadow: 0 0 0 3px rgba(210, 105, 30, 0.1);
}

.form-group input.error {
  border-color: #ff3b30;
}

.error-message {
  color: #ff3b30;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #e1e5e9;
  border-radius: 4px;
  margin-right: 0.5rem;
  position: relative;
  transition: all 0.3s;
}

.checkbox input:checked + .checkmark {
  background: #D2691E;
  border-color: #D2691E;
}

.checkbox input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.forgot-password,
.link {
  color: #D2691E;
  text-decoration: none;
  font-weight: 500;
}

.forgot-password:hover,
.link:hover {
  text-decoration: underline;
}

.btn-full {
  width: 100%;
  margin-bottom: 1.5rem;
}

.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e1e5e9;
}

.divider span {
  background: white;
  padding: 0 1rem;
  color: #666;
}

.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-social {
  background: white;
  border: 2px solid #e1e5e9;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn-social:hover {
  border-color: #D2691E;
  background: rgba(210, 105, 30, 0.05);
}

.social-icon {
  font-size: 1.2rem;
}

.login-footer {
  text-align: center;
}

.login-footer p {
  color: #666;
}

/* Benefits Section */
.login-benefits {
  padding: 2rem;
}

.login-benefits h3 {
  color: #2C1810;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
}

.benefits-list {
  margin-bottom: 3rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.benefit-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  background: rgba(210, 105, 30, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-content h4 {
  color: #2C1810;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.benefit-content p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.stat-item {
  background: rgba(210, 105, 30, 0.1);
  padding: 1.5rem 1rem;
  border-radius: 12px;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #D2691E;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }

  .login-card {
    padding: 2rem;
  }

  .login-header h2 {
    font-size: 1.5rem;
  }

  .social-login {
    grid-template-columns: 1fr;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .form-options {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
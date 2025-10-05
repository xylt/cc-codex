<template>
  <div class="dashboard">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div class="container">
        <div class="subscription-plans">
          <!-- FREE Plan -->
          <div class="plan-card free" :class="{ active: currentPlan.type === 'free' }">
            <div class="plan-header">
              <h3 class="plan-name">FREE</h3>
              <span v-if="currentPlan.type === 'free'" class="current-badge">当前订阅</span>
            </div>
            <div class="plan-content">
              <p class="plan-desc">体验 Claude Code 的基础功能<br>适合轻度使用和初次体验</p>
            </div>
          </div>

          <!-- PLUS Plan -->
          <div class="plan-card plus" :class="{ active: currentPlan.type === 'plus' }">
            <div class="plan-header-row">
              <div class="plan-left">
                <h3 class="plan-name">PLUS</h3>
                <span v-if="currentPlan.type === 'plus'" class="current-badge-inline">当前订阅</span>
                <p class="plan-desc">支持每日基础体验，轻度使用</p>
              </div>
              <div class="plan-right">
                <button v-if="currentPlan.type !== 'plus'" @click="showPaymentModal('plus')" class="upgrade-btn">
                  立即升级
                </button>
              </div>
            </div>
          </div>

          <!-- PRO Plan -->
          <div class="plan-card pro" :class="{ active: currentPlan.type === 'pro' }">
            <div class="plan-header-row">
              <div class="plan-left">
                <h3 class="plan-name">PRO</h3>
                <span v-if="currentPlan.type === 'pro'" class="current-badge-inline">当前订阅</span>
                <p class="plan-desc">畅享 Claude 4.5 Sonnet 模型，满足日常开发</p>
              </div>
              <div class="plan-right">
                <button v-if="currentPlan.type !== 'pro'" @click="showPaymentModal('pro')" class="upgrade-btn">
                  立即升级
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="dashboard-content">
      <div class="container">
        <div class="dashboard-grid">
          <!-- 售后服务 Module -->
          <div class="support-section">
            <div class="support-card">
              <div class="support-icon">💬</div>
              <div class="support-content">
                <h3>售后服务</h3>
                <p class="support-text">如有任何问题，请添加客服微信</p>
                <div class="wechat-info">
                  <span class="wechat-label">微信号：</span>
                  <span class="wechat-id">aicode-support</span>
                  <button class="copy-wechat-btn" @click="copyWechatId">复制</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 当前积分 Module -->
          <div class="credits-section">
            <div class="section-title">
              <h2>当前积分</h2>
              <div class="help-icon" title="积分说明">
                <i>?</i>
              </div>
            </div>

            <div class="credits-content">
              <!-- Time Range Selector -->
              <div class="time-range">
                <span class="range-label">价格时段</span>
                <div class="time-chart">
                  <div class="time-bar">
                    <div class="time-segment weekend" style="width: 28.6%;">
                      <span class="time-label">周末</span>
                    </div>
                    <div class="time-segment weekday" style="width: 71.4%;">
                      <span class="time-label">工作日</span>
                    </div>
                  </div>
                  <div class="time-scale">
                    <span>0:00</span>
                    <span>8:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                  </div>
                </div>
                <div class="current-status">
                  <span class="status-text">当前: 空闲时段 (13:17)</span>
                  <div class="status-indicators">
                    <span class="indicator weekend">空闲(0.95倍)</span>
                  </div>
                </div>
              </div>

              <!-- Credits Usage -->
              <div class="credits-usage">
                <div class="usage-stats">
                  <div class="usage-number">{{ stats.creditsUsed }} / {{ stats.totalCredits }}</div>
                  <div class="usage-bar">
                    <div class="usage-fill" :style="{ width: (stats.creditsUsed / stats.totalCredits * 100) + '%' }"></div>
                  </div>
                </div>
                <div class="usage-details">
                  <div class="recharge-info">
                    <span>补充率: {{ rechargeRate }} 积分/小时</span>
                  </div>
                  <div class="last-recharge">
                    <span>上次补充时间: {{ lastRechargeTime }}</span>
                  </div>
                </div>
                <div class="usage-limit">
                  <span class="limit-text">FREE用户每天使用上限为3000积分</span>
                </div>
              </div>
            </div>
          </div>

          <!-- API管理 Module -->
          <div class="api-management-section">
            <div class="section-title">
              <h2>API密钥</h2>
              <button v-if="!hasApiKey" class="btn btn-primary btn-sm" @click="showApiKeyModal = true">
                设置密钥
              </button>
              <button v-else class="btn btn-secondary btn-sm" @click="showApiKeyModal = true">
                重新生成
              </button>
            </div>

            <div class="api-keys-list">
              <div v-if="!hasApiKey" class="empty-state">
                <div class="empty-icon">🔑</div>
                <p>还没有设置API密钥</p>
                <p class="hint">点击"设置密钥"按钮创建您的专属API密钥</p>
                <button class="btn btn-primary" @click="showApiKeyModal = true">
                  设置密钥
                </button>
              </div>

              <div v-else class="api-key-item">
                <div class="key-info">
                  <div class="key-name">{{ apiKeyData.name }}</div>
                  <div class="key-value">
                    <code>{{ apiKeyData.masked }}</code>
                    <button class="copy-btn" @click="copyApiKey(apiKeyData.key)">
                      📋
                    </button>
                  </div>
                  <div class="key-meta">
                    创建于 {{ formatDate(apiKeyData.createdAt) }}
                    <span v-if="apiKeyData.lastUsed">· 最后使用 {{ formatTime(apiKeyData.lastUsed) }}</span>
                  </div>
                </div>
                <div class="key-actions">
                  <button class="btn-icon danger" @click="deleteApiKey()" title="删除">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- API使用教程 Module -->
          <div class="tutorial-section">
            <div class="section-title">
              <h2>API使用教程</h2>
              <router-link to="/tutorial" class="btn btn-secondary btn-sm">
                查看完整教程
              </router-link>
            </div>

            <div class="tutorial-content">
              <div class="quick-start">
                <h3>快速开始</h3>
                <div class="tutorial-steps">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>获取API密钥</h4>
                      <p>在API管理中创建你的第一个密钥</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>配置环境</h4>
                      <p>将密钥添加到你的开发环境中</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>发送请求</h4>
                      <p>开始使用Claude Code进行开发</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="code-example">
                <h3>示例代码</h3>
                <div class="code-block">
                  <pre><code>curl -X POST "https://api.aicodemirror.com/v1/chat" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-3-sonnet",
    "messages": [{"role": "user", "content": "生成一个排序函数"}]
  }'</code></pre>
                </div>
                <button class="copy-code-btn" @click="copyCode">复制代码</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div v-if="showPayment" class="modal-overlay" @click="closePaymentModal">
      <div class="modal payment-modal" @click.stop>
        <div class="modal-header">
          <h3>升级到 {{ selectedPlan === 'plus' ? 'PLUS' : 'PRO' }} 方案</h3>
          <button class="close-btn" @click="closePaymentModal">×</button>
        </div>

        <div class="modal-body">
          <div class="payment-info">
            <div class="plan-summary">
              <h4>套餐详情</h4>
              <div class="summary-item">
                <span>方案名称：</span>
                <strong>{{ selectedPlan === 'plus' ? 'PLUS' : 'PRO' }}</strong>
              </div>
              <div class="summary-item">
                <span>价格：</span>
                <strong class="price">¥{{ selectedPlan === 'plus' ? '99' : '199' }}/月</strong>
              </div>
              <div class="summary-item">
                <span>每日积分：</span>
                <strong>{{ selectedPlan === 'plus' ? '5000' : '10000' }} 积分</strong>
              </div>
            </div>

            <div class="payment-methods">
              <h4>支付方式</h4>
              <div class="payment-options">
                <div class="payment-option active">
                  <span class="payment-icon">💳</span>
                  <span class="payment-name">支付宝支付</span>
                </div>
              </div>
            </div>

            <div v-if="qrCodeUrl" class="qr-code-section">
              <h4>请扫码支付</h4>
              <div class="qr-code-container">
                <img :src="qrCodeUrl" alt="支付二维码" class="qr-code">
                <p class="qr-hint">使用支付宝扫描二维码完成支付</p>
              </div>
              <div class="payment-status">
                <div v-if="paymentStatus === 'pending'" class="status-pending">
                  <div class="spinner"></div>
                  <span>等待支付中...</span>
                </div>
                <div v-else-if="paymentStatus === 'success'" class="status-success">
                  <span class="status-icon">✅</span>
                  <span>支付成功！</span>
                </div>
                <div v-else-if="paymentStatus === 'failed'" class="status-failed">
                  <span class="status-icon">❌</span>
                  <span>支付失败，请重试</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closePaymentModal">
            取消
          </button>
          <button v-if="!qrCodeUrl" class="btn btn-primary" @click="generatePaymentQRCode">
            生成支付二维码
          </button>
        </div>
      </div>
    </div>

    <!-- API Key Modal -->
    <div v-if="showApiKeyModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ hasApiKey ? '重新生成API密钥' : '设置API密钥' }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>

        <div class="modal-body">
          <div v-if="hasApiKey" class="warning-message">
            <p>⚠️ 重新生成密钥将使旧密钥失效</p>
            <p>请确保更新所有使用该密钥的应用</p>
          </div>

          <div class="form-group">
            <label>密钥名称</label>
            <input
              v-model="keyForm.name"
              type="text"
              placeholder="为密钥起个名字，如：主要开发密钥"
              required
            >
          </div>

          <div v-if="newGeneratedKey" class="generated-key-section">
            <div class="success-message">
              <p>✅ 密钥已生成成功！</p>
              <p class="warning">请立即复制保存，关闭后将无法再次查看完整密钥</p>
            </div>
            <div class="key-display">
              <code>{{ newGeneratedKey }}</code>
              <button class="copy-btn" @click="copyApiKey(newGeneratedKey)">
                📋 复制
              </button>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">
            {{ newGeneratedKey ? '关闭' : '取消' }}
          </button>
          <button v-if="!newGeneratedKey" class="btn btn-primary" @click="generateApiKey">
            {{ hasApiKey ? '重新生成' : '生成密钥' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      user: {
        name: '开发者',
        email: 'developer@example.com'
      },
      stats: {
        creditsUsed: 0,
        totalCredits: 3000
      },
      currentPlan: {
        name: 'FREE',
        type: 'free',
        description: '体验 Claude & Codex 双AI引擎的基础功能，适合轻度使用和初次体验'
      },
      rechargeRate: 0,
      lastRechargeTime: '2025-09-01 14:00:00',
      hasApiKey: false,
      apiKeyData: {
        name: '',
        key: '',
        masked: '',
        createdAt: null,
        lastUsed: null
      },
      showApiKeyModal: false,
      newGeneratedKey: null,
      keyForm: {
        name: 'My API Key'
      },
      // Remote stats (pseudo-data filled via API)
      fetchingStats: false,
      apiError: null,
      apiFactor: 1,
      apiDailyCost: 0,
      apiDailyLimit: 0,
      // Payment related
      showPayment: false,
      selectedPlan: null,
      paymentMethod: 'alipay',
      qrCodeUrl: null,
      paymentStatus: null, // pending, success, failed
      paymentCheckInterval: null,
      orderId: null
    }
  },
  mounted() {
    this.loadUserData()
    this.fetchUsageStats()
    this.loadApiKey()
  },
  methods: {
    async fetchUsageStats() {
      this.fetchingStats = true
      this.apiError = null
      // 优先通过后端聚合接口获取（避免浏览器跨域/CORS）
      try {
        const API_BASE2 = '/api/stats'
        const TARGET_DAILY_POINTS = 3000
        const DEMO_API_KEY = 'cr_5d99ac41ab9251b0730e64f7714f75e08e1d9c9651deecffae8de6d36969365b'
        const resp2 = await fetch(`${API_BASE2}/user-points`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: DEMO_API_KEY, targetDailyPoints: TARGET_DAILY_POINTS })
        })
        const json2 = await resp2.json().catch(() => ({}))
        if (json2 && json2.success) {
          const data = json2.data || {}
          const limits = data.limits || {}
          const dailyCost = Number(limits.currentDailyCost ?? 0)
          const dailyLimit = Number(limits.dailyCostLimit ?? 0)
          const factor = Number(data.conversion?.factor ?? (dailyLimit > 0 ? TARGET_DAILY_POINTS / dailyLimit : 1))
          const usedPts = Number(data.conversion?.pointsUsed ?? Math.round(dailyCost * factor))

          this.apiDailyCost = dailyCost
          this.apiDailyLimit = dailyLimit
          this.apiFactor = factor
          this.stats.totalCredits = TARGET_DAILY_POINTS
          this.stats.creditsUsed = Math.max(0, Math.min(TARGET_DAILY_POINTS, usedPts))
          this.rechargeRate = Math.max(0, Math.round(TARGET_DAILY_POINTS / 24))
          this.lastRechargeTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
          this.fetchingStats = false
          return
        }
      } catch (e) {
        // 后端不可用则继续走旧路径（直接请求远端）
      }
      const API_BASE = 'http://claudeai.asia:8080/apiStats/api'
      // NOTE: 用于演示的示例 key。实际项目请勿在前端硬编码。
      const DEMO_API_KEY = 'cr_5d99ac41ab9251b0730e64f7714f75e08e1d9c9651deecffae8de6d36969365b'
      try {
        // Step 1: 获取 key id
        const keyRes = await fetch(`${API_BASE}/get-key-id`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: DEMO_API_KEY })
        })
        const keyJson = await keyRes.json().catch(() => ({}))
        const apiId = keyJson?.apiId || keyJson?.data?.apiId || keyJson?.id || null

        // Step 2: 获取 user-stats
        let statsJson = null
        if (apiId) {
          const statsRes = await fetch(`${API_BASE}/user-stats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiId })
          })
          statsJson = await statsRes.json().catch(() => ({}))
        }

        const limits = statsJson?.limits || statsJson?.data?.limits || {}
        const dailyCost = Number(limits?.currentDailyCost ?? 0)
        const dailyLimit = Number(limits?.dailyCostLimit ?? limits?.dailyLimit ?? 0)

        // 目标每日积分上限（与前端显示一致）
        const TARGET_DAILY_POINTS = 3000
        const factor = dailyLimit > 0 ? TARGET_DAILY_POINTS / dailyLimit : 1
        const usedPts = Math.max(0, Math.min(TARGET_DAILY_POINTS, Math.round(dailyCost * factor)))

        // 更新到界面
        this.apiDailyCost = dailyCost
        this.apiDailyLimit = dailyLimit
        this.apiFactor = factor
        this.stats.totalCredits = TARGET_DAILY_POINTS
        this.stats.creditsUsed = usedPts
        // 估算每小时补充率（简单均摊）
        this.rechargeRate = Math.max(0, Math.round(TARGET_DAILY_POINTS / 24))
        this.lastRechargeTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
      } catch (err) {
        // 失败则填充伪数据
        this.apiError = '获取用量失败，已填充伪数据'
        const TARGET_DAILY_POINTS = 3000
        const used = Math.floor(800 + Math.random() * 900) // 800~1700
        this.stats.totalCredits = TARGET_DAILY_POINTS
        this.stats.creditsUsed = used
        this.rechargeRate = Math.round(TARGET_DAILY_POINTS / 24)
      } finally {
        this.fetchingStats = false
      }
    },
    loadUserData() {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.user = JSON.parse(userData)
      }
    },

    formatTime(timestamp) {
      const now = Date.now()
      const diff = now - timestamp

      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
      return Math.floor(diff / 86400000) + '天前'
    },

    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString('zh-CN')
    },

    copyApiKey(value) {
      navigator.clipboard.writeText(value).then(() => {
        alert('API密钥已复制到剪贴板')
      })
    },

    copyCode() {
      const code = `curl -X POST "https://api.aicodemirror.com/v1/chat" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "claude-3-sonnet",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`
      navigator.clipboard.writeText(code).then(() => {
        alert('示例代码已复制到剪贴板')
      })
    },

    copyWechatId() {
      const wechatId = 'aicode-support'
      navigator.clipboard.writeText(wechatId).then(() => {
        alert('微信号已复制到剪贴板')
      }).catch(() => {
        alert('复制失败，请手动复制：' + wechatId)
      })
    },

    async loadApiKey() {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const response = await fetch('/api/api-keys', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()
        if (data.success && data.data.hasApiKey) {
          this.hasApiKey = true
          this.apiKeyData = {
            name: data.data.apiKey.name,
            key: '', // 不显示完整key
            masked: data.data.apiKey.masked,
            createdAt: data.data.apiKey.createdAt,
            lastUsed: data.data.apiKey.lastUsed
          }
        }
      } catch (error) {
        console.error('Failed to load API key:', error)
      }
    },

    async generateApiKey() {
      if (!this.keyForm.name.trim()) {
        alert('请输入密钥名称')
        return
      }

      try {
        const token = localStorage.getItem('authToken')
        const response = await fetch('/api/api-keys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: this.keyForm.name
          })
        })

        const data = await response.json()
        if (data.success) {
          this.newGeneratedKey = data.data.apiKey.key
          this.hasApiKey = true
          this.apiKeyData = {
            name: data.data.apiKey.name,
            key: data.data.apiKey.key,
            masked: data.data.apiKey.masked,
            createdAt: data.data.apiKey.createdAt,
            lastUsed: null
          }
          alert('API密钥生成成功！请立即复制保存')
        } else {
          alert('生成失败：' + data.message)
        }
      } catch (error) {
        console.error('Failed to generate API key:', error)
        alert('生成API密钥失败')
      }
    },

    async deleteApiKey() {
      if (!confirm('确定要删除API密钥吗？此操作不可撤销，删除后所有使用该密钥的应用将无法访问。')) {
        return
      }

      try {
        const token = localStorage.getItem('authToken')
        const response = await fetch('/api/api-keys', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()
        if (data.success) {
          this.hasApiKey = false
          this.apiKeyData = {
            name: '',
            key: '',
            masked: '',
            createdAt: null,
            lastUsed: null
          }
          alert('API密钥已删除')
        } else {
          alert('删除失败：' + data.message)
        }
      } catch (error) {
        console.error('Failed to delete API key:', error)
        alert('删除API密钥失败')
      }
    },

    closeModal() {
      this.showApiKeyModal = false
      this.newGeneratedKey = null
      this.keyForm = {
        name: 'My API Key'
      }
    },

    // Payment methods
    showPaymentModal(plan) {
      this.selectedPlan = plan
      this.showPayment = true
      this.paymentMethod = 'alipay'
      this.qrCodeUrl = null
      this.paymentStatus = null
    },

    closePaymentModal() {
      this.showPayment = false
      this.selectedPlan = null
      this.qrCodeUrl = null
      this.paymentStatus = null
      this.paymentMethod = 'alipay'
      this.orderId = null
      if (this.paymentCheckInterval) {
        clearInterval(this.paymentCheckInterval)
        this.paymentCheckInterval = null
      }
    },

    async generatePaymentQRCode() {
      try {
        console.log('发起支付请求...', {
          userId: this.user.id || 'demo-user-id',
          plan: this.selectedPlan,
          paymentMethod: 'alipay'
        })

        // 调用后端 API 创建支付订单
        const response = await fetch('/api/payment/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            userId: this.user.id || 'demo-user-id', // 从登录信息获取用户ID
            plan: this.selectedPlan,
            paymentMethod: 'alipay'
          })
        })

        console.log('收到响应:', response.status, response.statusText)

        // 检查响应状态
        if (!response.ok) {
          const text = await response.text()
          console.error('HTTP Error:', response.status, text)
          throw new Error(`HTTP Error: ${response.status} - ${text}`)
        }

        const contentType = response.headers.get('content-type')
        console.log('Content-Type:', contentType)

        let data
        if (contentType && contentType.includes('application/json')) {
          data = await response.json()
        } else {
          const text = await response.text()
          console.log('Non-JSON response:', text)
          if (text) {
            data = JSON.parse(text)
          } else {
            throw new Error('Empty response from server')
          }
        }

        console.log('解析后的数据:', data)

        if (data.success) {
          this.qrCodeUrl = data.data.qrCodeUrl
          this.orderId = data.data.orderId
          this.paymentStatus = 'pending'

          console.log('支付订单已创建:', this.orderId)

          // 开始轮询支付状态
          this.startPaymentStatusCheck()
        } else {
          throw new Error(data.message || '创建支付订单失败')
        }
      } catch (error) {
        console.error('生成支付二维码失败:', error)
        alert('生成支付二维码失败: ' + error.message)
      }
    },

    startPaymentStatusCheck() {
      // 轮询检查支付状态
      this.paymentCheckInterval = setInterval(async () => {
        try {
          const response = await fetch('/api/payment/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: this.orderId })
          })

          const data = await response.json()

          if (data.success && data.data.status === 'success') {
            this.paymentStatus = 'success'
            clearInterval(this.paymentCheckInterval)

            // 调用支付成功回调
            await this.handlePaymentSuccess()

            setTimeout(() => {
              this.closePaymentModal()
              this.currentPlan.type = this.selectedPlan
              alert('支付成功！您的套餐已升级，API Key 已生成')
              // 刷新页面数据
              this.loadUserData()
            }, 2000)
          } else if (data.data.status === 'failed') {
            this.paymentStatus = 'failed'
            clearInterval(this.paymentCheckInterval)
          }
        } catch (error) {
          console.error('检查支付状态失败:', error)
        }
      }, 3000)
    },

    async handlePaymentSuccess() {
      try {
        const response = await fetch('/api/payment/success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: this.user.id || 'demo-user-id',
            plan: this.selectedPlan,
            orderId: this.orderId,
            paymentMethod: 'alipay'
          })
        })

        const data = await response.json()

        if (data.success) {
          // 更新用户的 API Key
          console.log('API Key generated:', data.data.apiKey)
          // 这里可以将新的 API Key 添加到 apiKeys 列表中
          if (data.data.apiKey) {
            const newKey = {
              id: Date.now(),
              name: `auto-key-${this.user.name}`,
              value: data.data.apiKey,
              masked: data.data.apiKey.substring(0, 8) + '...' + data.data.apiKey.substring(data.data.apiKey.length - 5),
              createdAt: Date.now(),
              lastUsed: null
            }
            this.apiKeys.push(newKey)
          }
        } else {
          console.error('处理支付成功回调失败:', data.message)
        }
      } catch (error) {
        console.error('处理支付成功回调失败:', error)
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.dashboard-header {
  background: #f5f5f5;
  padding: 2rem 0 3rem;
}

.subscription-plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.plan-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  min-height: 160px;
  display: flex;
  flex-direction: column;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.plan-card.active {
  border: 2px solid #007aff;
}

.plan-header {
  margin-bottom: 1rem;
  position: relative;
}

.plan-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.plan-left {
  flex: 1;
}

.plan-right {
  display: flex;
  align-items: center;
}

.plan-name {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #2C1810;
}

.plan-card.free .plan-name {
  color: #666;
}

.plan-card.plus .plan-name {
  color: #2C1810;
}

.plan-card.pro .plan-name {
  color: #2C1810;
}

.current-badge {
  display: inline-block;
  background: #999;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  position: absolute;
  top: 0;
  right: 0;
}

.current-badge-inline {
  display: inline-block;
  background: #999;
  color: white;
  padding: 0.25rem 0.7rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.plan-card.free .current-badge {
  background: #999;
}

.plan-card.plus .current-badge {
  background: #999;
}

.plan-card.pro .current-badge {
  background: #999;
}

.plan-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.plan-desc {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
}

.upgrade-btn {
  background: #d0d0d0;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 18px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  align-self: flex-start;
  border: none;
  cursor: pointer;
}

.plan-card.plus .upgrade-btn {
  background: #d0d0d0;
}

.plan-card.pro .upgrade-btn {
  background: #e8a87c;
}

.upgrade-btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

.dashboard-content {
  padding: 2rem 0;
}

.dashboard-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title h2 {
  color: #2C1810;
  margin: 0;
  font-size: 1.5rem;
}

.help-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}

.help-icon i {
  font-style: normal;
  color: #666;
  font-weight: bold;
}

/* Support Section */
.support-section {
  background: linear-gradient(135deg, #fff9f0 0%, #ffe8d0 100%);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.support-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.support-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.support-content {
  flex: 1;
}

.support-content h3 {
  color: #2C1810;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.support-text {
  color: #666;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.wechat-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8f9fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.wechat-label {
  color: #666;
  font-size: 0.9rem;
}

.wechat-id {
  color: #2C1810;
  font-weight: 600;
  font-size: 1.1rem;
  font-family: 'Monaco', 'Menlo', monospace;
}

.copy-wechat-btn {
  background: #D2691E;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-left: auto;
}

.copy-wechat-btn:hover {
  background: #B8860B;
  transform: scale(1.05);
}

.copy-wechat-btn:active {
  transform: scale(0.95);
}

/* Credits Section */
.credits-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.credits-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.time-range {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.range-label {
  font-weight: 600;
  color: #2C1810;
  margin-bottom: 1rem;
  display: block;
}

.time-chart {
  margin: 1rem 0;
}

.time-bar {
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  margin-bottom: 0.5rem;
}

.time-segment {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
}

.time-segment.weekend {
  background: #34c759;
}

.time-segment.weekday {
  background: #007aff;
}

.time-scale {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
}

.current-status {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-text {
  color: #34c759;
  font-weight: 600;
}

.indicator {
  background: rgba(52, 199, 89, 0.2);
  color: #34c759;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.credits-usage {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.usage-stats {
  margin-bottom: 1rem;
}

.usage-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2C1810;
  margin-bottom: 1rem;
}

.usage-bar {
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.usage-fill {
  height: 100%;
  background: linear-gradient(90deg, #D2691E, #B8860B);
  border-radius: 10px;
  transition: width 0.3s;
}

.usage-details {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.usage-limit {
  text-align: center;
  color: #dc3545;
  font-weight: 600;
  font-size: 0.9rem;
}

/* API Management Section */
.api-management-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.api-keys-list {
  min-height: 200px;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.empty-state .hint {
  color: #999;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.warning-message {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.warning-message p {
  margin: 0.25rem 0;
  color: #856404;
  font-size: 0.9rem;
}

.generated-key-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.success-message {
  margin-bottom: 1rem;
}

.success-message p {
  margin: 0.25rem 0;
  color: #155724;
}

.success-message .warning {
  color: #856404;
  font-size: 0.9rem;
  font-weight: 600;
}

.key-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.key-display code {
  flex: 1;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  word-break: break-all;
}

.key-display .copy-btn {
  padding: 0.5rem 1rem;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.key-display .copy-btn:hover {
  background: #005fb8;
}

.api-key-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.key-info {
  flex: 1;
}

.key-name {
  font-weight: 600;
  color: #2C1810;
  margin-bottom: 0.5rem;
}

.key-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.key-value code {
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.copy-btn:hover {
  background: #f0f0f0;
}

.key-meta {
  font-size: 0.8rem;
  color: #999;
}

.key-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-icon:hover {
  background: #f0f0f0;
}

.btn-icon.danger:hover {
  background: rgba(255, 59, 48, 0.1);
}

/* Tutorial Section */
.tutorial-section {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tutorial-content {
  display: grid;
  gap: 2rem;
}

.quick-start h3,
.code-example h3 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.tutorial-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007aff, #005fb8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  color: #2C1810;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.step-content p {
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  position: relative;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #2C1810;
}

.copy-code-btn {
  background: #007aff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.copy-code-btn:hover {
  background: #005fb8;
}

/* Common Button Styles */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #007aff;
  color: white;
}

.btn-primary:hover {
  background: #005fb8;
}

.btn-secondary {
  background: #f8f9fa;
  color: #2C1810;
  border: 1px solid #e9ecef;
}

.btn-secondary:hover {
  background: #e9ecef;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h3 {
  color: #2C1810;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.modal-body {
  padding: 2rem;
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

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

.permissions {
  display: flex;
  gap: 1rem;
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
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
  background: #007aff;
  border-color: #007aff;
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

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #f0f0f0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .subscription-plans {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .support-card {
    flex-direction: column;
    text-align: center;
  }

  .wechat-info {
    flex-direction: column;
    align-items: stretch;
  }

  .copy-wechat-btn {
    margin-left: 0;
    width: 100%;
  }

  .plan-card {
    min-height: auto;
  }

  .plan-header-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .plan-right {
    width: 100%;
  }

  .plan-name {
    font-size: 1.5rem;
  }

  .upgrade-btn {
    align-self: stretch;
    width: 100%;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .tutorial-content {
    grid-template-columns: 1fr;
  }

  .tutorial-steps {
    gap: 1.5rem;
  }

  .step {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .api-key-item {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .key-actions {
    width: 100%;
    justify-content: center;
  }

  .usage-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .current-status {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .modal {
    width: 95%;
    margin: 1rem;
  }

  .modal-body {
    padding: 1rem;
  }

  .permissions {
    flex-direction: column;
  }

  .time-scale {
    font-size: 0.7rem;
  }

  .time-segment {
    font-size: 0.7rem;
  }
}

/* Payment Modal Styles */
.payment-modal {
  max-width: 600px;
}

.payment-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.plan-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.plan-summary h4 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item span {
  color: #666;
}

.summary-item strong {
  color: #2C1810;
}

.summary-item .price {
  font-size: 1.5rem;
  color: #D2691E;
}

.payment-methods h4 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.payment-options {
  display: flex;
  gap: 1rem;
}

.payment-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  border: 2px solid #D2691E;
  border-radius: 12px;
  background: #faf8f5;
  box-shadow: 0 4px 12px rgba(210, 105, 30, 0.15);
}

.payment-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.payment-name {
  font-weight: 600;
  color: #2C1810;
}

.qr-code-section {
  text-align: center;
}

.qr-code-section h4 {
  color: #2C1810;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.qr-code-container {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.qr-code {
  width: 200px;
  height: 200px;
  border: 4px solid white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

.qr-hint {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.payment-status {
  padding: 1rem;
}

.status-pending,
.status-success,
.status-failed {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-success {
  background: #d4edda;
  color: #155724;
}

.status-failed {
  background: #f8d7da;
  color: #721c24;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #856404;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.status-icon {
  font-size: 1.5rem;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .payment-option {
    padding: 1.25rem;
  }
}
</style>

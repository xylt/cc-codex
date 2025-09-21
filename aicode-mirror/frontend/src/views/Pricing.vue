<template>
  <div class="pricing">
    <!-- Header Section -->
    <section class="pricing-header">
      <div class="container">
        <h1 class="page-title">选择适合你的方案</h1>
        <p class="page-subtitle">
          支持Claude & Codex双引擎，透明定价，按需付费，随时升级降级
        </p>
        <div class="supported-models">
          <div class="model-badge">
            <span class="model-icon">🤖</span>
            Claude AI
          </div>
          <div class="model-badge">
            <span class="model-icon">⚡</span>
            OpenAI Codex
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Plans -->
    <section class="pricing-plans">
      <div class="container">
        <div class="plans-grid">
          <!-- Free Plan -->
          <div class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">免费版</h3>
              <div class="plan-price">
                <span class="currency">¥</span>
                <span class="amount">0</span>
                <span class="period">/月</span>
              </div>
              <p class="plan-desc">适合个人学习和小型项目</p>
            </div>

            <div class="plan-features">
              <h4>包含功能：</h4>
              <ul>
                <li>✅ 每月 1,000 点积分</li>
                <li>✅ Claude Haiku + Codex 基础模型</li>
                <li>✅ 基础IDE集成</li>
                <li>✅ 社区支持</li>
                <li>❌ 高级模型</li>
                <li>❌ 优先支持</li>
              </ul>
            </div>

            <div class="plan-action">
              <button class="btn btn-secondary btn-full" @click="selectPlan('free')">
                免费开始
              </button>
            </div>
          </div>

          <!-- Pro Plan -->
          <div class="plan-card featured">
            <div class="popular-badge">最受欢迎</div>
            <div class="plan-header">
              <h3 class="plan-name">专业版</h3>
              <div class="plan-price">
                <span class="currency">¥</span>
                <span class="amount">99</span>
                <span class="period">/月</span>
              </div>
              <p class="plan-desc">适合专业开发者和小团队</p>
            </div>

            <div class="plan-features">
              <h4>包含功能：</h4>
              <ul>
                <li>✅ 每月 10,000 点积分</li>
                <li>✅ Claude Haiku/Sonnet + Codex 高级模型</li>
                <li>✅ 高级IDE集成</li>
                <li>✅ 邮件支持</li>
                <li>✅ 代码审查功能</li>
                <li>✅ 团队协作 (最多5人)</li>
              </ul>
            </div>

            <div class="plan-action">
              <button class="btn btn-primary btn-full" @click="selectPlan('pro')">
                选择专业版
              </button>
            </div>
          </div>

          <!-- Max Plan -->
          <div class="plan-card">
            <div class="plan-header">
              <h3 class="plan-name">高级版</h3>
              <div class="plan-price">
                <span class="currency">¥</span>
                <span class="amount">299</span>
                <span class="period">/月</span>
              </div>
              <p class="plan-desc">适合大型团队和企业</p>
            </div>

            <div class="plan-features">
              <h4>包含功能：</h4>
              <ul>
                <li>✅ 每月 50,000 点积分</li>
                <li>✅ 全部Claude模型 + Codex系列</li>
                <li>✅ 企业级集成</li>
                <li>✅ 优先技术支持</li>
                <li>✅ 高级分析报告</li>
                <li>✅ 团队协作 (最多20人)</li>
              </ul>
            </div>

            <div class="plan-action">
              <button class="btn btn-primary btn-full" @click="selectPlan('max')">
                选择高级版
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Credit System -->
    <section class="credit-system">
      <div class="container">
        <h2 class="section-title">积分计费说明</h2>
        <p class="section-subtitle">
          透明的积分制度，让你清楚知道每次使用的成本
        </p>

        <div class="credit-table">
          <div class="table-header">
            <div class="col">模型</div>
            <div class="col">输入成本</div>
            <div class="col">输出成本</div>
            <div class="col">使用场景</div>
          </div>

          <div class="table-row">
            <div class="col model-name">
              <span class="model-icon">⚡</span>
              Claude Haiku
            </div>
            <div class="col">1积分/1000字符</div>
            <div class="col">2积分/1000字符</div>
            <div class="col">快速代码补全、简单问答</div>
          </div>

          <div class="table-row">
            <div class="col model-name">
              <span class="model-icon">🎯</span>
              Claude Sonnet
            </div>
            <div class="col">5积分/1000字符</div>
            <div class="col">10积分/1000字符</div>
            <div class="col">复杂代码生成、逻辑分析</div>
          </div>

          <div class="table-row">
            <div class="col model-name">
              <span class="model-icon">🚀</span>
              Claude Opus
            </div>
            <div class="col">15积分/1000字符</div>
            <div class="col">30积分/1000字符</div>
            <div class="col">架构设计、深度代码审查</div>
          </div>

          <div class="table-row">
            <div class="col model-name">
              <span class="model-icon">💻</span>
              Codex Base
            </div>
            <div class="col">2积分/1000字符</div>
            <div class="col">3积分/1000字符</div>
            <div class="col">代码生成、补全优化</div>
          </div>

          <div class="table-row">
            <div class="col model-name">
              <span class="model-icon">🔥</span>
              Codex Advanced
            </div>
            <div class="col">8积分/1000字符</div>
            <div class="col">12积分/1000字符</div>
            <div class="col">复杂代码重构、算法优化</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq">
      <div class="container">
        <h2 class="section-title">常见问题</h2>

        <div class="faq-grid">
          <div class="faq-item">
            <h4>可以随时升级或降级套餐吗？</h4>
            <p>是的，你可以随时在控制台中升级或降级套餐。升级立即生效，降级将在下个计费周期生效。</p>
          </div>

          <div class="faq-item">
            <h4>积分会过期吗？</h4>
            <p>积分不会过期，但是每月会重置为套餐对应的额度。未使用的积分不会累积到下个月。</p>
          </div>

          <div class="faq-item">
            <h4>支持哪些付款方式？</h4>
            <p>我们支持支付宝、微信支付、银行卡等多种付款方式。企业客户还支持对公转账。</p>
          </div>

          <div class="faq-item">
            <h4>如何获取发票？</h4>
            <p>登录控制台，在计费页面可以申请电子发票。企业客户可以申请增值税专用发票。</p>
          </div>

          <div class="faq-item">
            <h4>有免费试用吗？</h4>
            <p>新用户注册即可获得免费版账户，包含1000积分。你也可以申请专业版的7天免费试用。</p>
          </div>

          <div class="faq-item">
            <h4>退款政策是什么？</h4>
            <p>如果你对服务不满意，可以在购买后7天内申请全额退款。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>准备开始了吗？</h2>
          <p>选择最适合你的方案，立即体验AI编程的强大功能</p>
          <router-link to="/login" class="btn btn-primary btn-large">
            立即注册
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Pricing',
  methods: {
    selectPlan(plan) {
      if (plan === 'free') {
        this.$router.push('/login')
      } else {
        // 跳转到注册/登录页面并传递选择的方案
        this.$router.push({ path: '/login', query: { plan } })
      }
    }
  }
}
</script>

<style scoped>
.pricing {
  padding-top: 2rem;
}

/* Header Section */
.pricing-header {
  padding: 3rem 0;
  background: linear-gradient(135deg, #faf8f5 0%, #f0e6d6 100%);
  text-align: center;
}

.page-title {
  font-size: 3rem;
  color: #2C1810;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.supported-models {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.model-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #2C1810;
}

.model-icon {
  font-size: 1.2rem;
}

/* Pricing Plans */
.pricing-plans {
  padding: 4rem 0;
  background: white;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.plan-card {
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  transition: all 0.3s;
}

.plan-card:hover {
  border-color: #D2691E;
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(210, 105, 30, 0.1);
}

.plan-card.featured {
  border-color: #D2691E;
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(210, 105, 30, 0.15);
}


.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #D2691E, #8B4513);
  color: white;
  padding: 8px 24px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f0f0f0;
}

.plan-name {
  font-size: 1.5rem;
  color: #2C1810;
  margin-bottom: 1rem;
  font-weight: 600;
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 1rem;
}

.currency {
  font-size: 1.2rem;
  color: #666;
  margin-right: 0.25rem;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
  color: #2C1810;
}

.period {
  font-size: 1rem;
  color: #666;
  margin-left: 0.25rem;
}

.plan-desc {
  color: #666;
  font-size: 0.95rem;
}

.plan-features {
  margin-bottom: 2rem;
}

.plan-features h4 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.plan-features ul {
  list-style: none;
}

.plan-features li {
  color: #555;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.btn-full {
  width: 100%;
  justify-content: center;
}

/* Credit System */
.credit-system {
  padding: 4rem 0;
  background: linear-gradient(135deg, #faf8f5 0%, #f0e6d6 100%);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2C1810;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.credit-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  background: #2C1810;
  color: white;
  font-weight: 600;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.col {
  padding: 1.5rem 1rem;
  display: flex;
  align-items: center;
}

.model-name {
  font-weight: 600;
  color: #2C1810;
}

.model-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

/* FAQ Section */
.faq {
  padding: 4rem 0;
  background: white;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.faq-item {
  background: #faf8f5;
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid #D2691E;
}

.faq-item h4 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
}

/* CTA Section */
.cta {
  padding: 4rem 0;
  background: linear-gradient(135deg, #2C1810, #8B4513);
  color: white;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .supported-models {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .model-badge {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .plans-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .col {
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .table-header .col {
    background: #8B4513;
    font-weight: 600;
    text-align: center;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }

  .credit-table {
    font-size: 0.9rem;
  }
}
</style>
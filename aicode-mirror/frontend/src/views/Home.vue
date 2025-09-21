<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="highlight">双引擎AI编程</span><br>
            为中国开发者而生
          </h1>
          <p class="hero-subtitle">
            Claude & Codex双AI引擎驱动<br>
            稳定、安全、实惠的编程服务
          </p>
          <div class="ai-engines">
            <div class="engine-badge">
              <span class="engine-icon">🤖</span>
              Claude AI
            </div>
            <div class="plus">+</div>
            <div class="engine-badge">
              <span class="engine-icon">⚡</span>
              OpenAI Codex
            </div>
          </div>
          <div class="hero-actions">
            <router-link to="/login" class="btn btn-primary btn-large">
              立即开始
            </router-link>
            <router-link to="/tutorial" class="btn btn-secondary btn-large">
              查看教程
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="code-preview">
            <div class="code-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="title">AI编程助手</span>
            </div>
            <div class="code-content">
              <div class="code-line">
                <span class="comment">// AI代码生成示例</span>
              </div>
              <div class="code-line">
                <span class="keyword">function</span>
                <span class="function">calculateSum</span>(<span class="param">arr</span>) {
              </div>
              <div class="code-line indent">
                <span class="keyword">return</span> arr.<span class="method">reduce</span>((a, b) => a + b, <span class="number">0</span>);
              </div>
              <div class="code-line">}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Models Section -->
    <section class="models">
      <div class="container">
        <h2 class="section-title">双AI引擎模型</h2>
        <p class="section-subtitle">Claude & Codex全系列模型，满足不同需求</p>

        <div class="models-grid">
          <div class="model-card haiku">
            <div class="model-icon">⚡</div>
            <h3>Claude Haiku</h3>
            <p class="model-desc">快速响应，适合简单任务</p>
            <ul class="model-features">
              <li>极速代码补全</li>
              <li>基础问题解答</li>
              <li>语法检查</li>
            </ul>
            <div class="model-performance">
              <div class="performance-bar">
                <div class="bar haiku-bar" style="width: 60%"></div>
              </div>
              <span>性能等级</span>
            </div>
          </div>

          <div class="model-card sonnet featured">
            <div class="featured-badge">推荐</div>
            <div class="model-icon">🎯</div>
            <h3>Claude Sonnet</h3>
            <p class="model-desc">平衡性能与速度的最佳选择</p>
            <ul class="model-features">
              <li>智能代码生成</li>
              <li>复杂逻辑分析</li>
              <li>代码重构建议</li>
            </ul>
            <div class="model-performance">
              <div class="performance-bar">
                <div class="bar sonnet-bar" style="width: 80%"></div>
              </div>
              <span>性能等级</span>
            </div>
          </div>

          <div class="model-card opus">
            <div class="model-icon">🚀</div>
            <h3>Claude Opus</h3>
            <p class="model-desc">最强性能，处理复杂项目</p>
            <ul class="model-features">
              <li>架构级代码生成</li>
              <li>深度代码审查</li>
              <li>算法优化</li>
            </ul>
            <div class="model-performance">
              <div class="performance-bar">
                <div class="bar opus-bar" style="width: 100%"></div>
              </div>
              <span>性能等级</span>
            </div>
          </div>

          <div class="model-card codex">
            <div class="model-icon">💻</div>
            <h3>Codex Base</h3>
            <p class="model-desc">专业代码生成，优化补全</p>
            <ul class="model-features">
              <li>精准代码补全</li>
              <li>多语言支持</li>
              <li>函数生成</li>
            </ul>
            <div class="model-performance">
              <div class="performance-bar">
                <div class="bar codex-bar" style="width: 70%"></div>
              </div>
              <span>性能等级</span>
            </div>
          </div>

          <div class="model-card codex-advanced">
            <div class="model-icon">🔥</div>
            <h3>Codex Advanced</h3>
            <p class="model-desc">高级代码重构，算法优化</p>
            <ul class="model-features">
              <li>复杂重构建议</li>
              <li>性能优化</li>
              <li>代码解释</li>
            </ul>
            <div class="model-performance">
              <div class="performance-bar">
                <div class="bar codex-advanced-bar" style="width: 90%"></div>
              </div>
              <span>性能等级</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- IDE Integration Section -->
    <section class="integration">
      <div class="container">
        <div class="integration-content">
          <div class="integration-text">
            <h2>无缝IDE集成</h2>
            <p class="integration-desc">
              支持VS Code和JetBrains全系列IDE<br>
              让AI成为你的编程伙伴
            </p>
            <ul class="integration-features">
              <li>✅ 实时代码建议</li>
              <li>✅ 智能错误修复</li>
              <li>✅ 自动文档生成</li>
              <li>✅ 代码风格统一</li>
            </ul>
            <router-link to="/tutorial" class="btn btn-primary">
              查看集成教程
            </router-link>
          </div>
          <div class="integration-visual">
            <div class="ide-preview">
              <div class="ide-sidebar">
                <div class="folder">📁 src</div>
                <div class="file active">📄 main.js</div>
                <div class="file">📄 utils.js</div>
                <div class="folder">📁 components</div>
              </div>
              <div class="ide-editor">
                <div class="editor-tabs">
                  <span class="tab active">main.js</span>
                </div>
                <div class="editor-content">
                  <div class="editor-line">
                    <span class="line-number">1</span>
                    <span class="code">import { createApp } from 'vue'</span>
                  </div>
                  <div class="editor-line">
                    <span class="line-number">2</span>
                    <span class="code">import App from './App.vue'</span>
                  </div>
                  <div class="editor-line">
                    <span class="line-number">3</span>
                    <span class="code"></span>
                  </div>
                  <div class="editor-line">
                    <span class="line-number">4</span>
                    <span class="code">const app = createApp(App)</span>
                  </div>
                </div>
                <div class="ai-suggestion">
                  <span class="ai-badge">AI建议</span>
                  <span class="suggestion">app.mount('#app')</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">为什么选择我们</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>极速响应</h3>
            <p>中国优化网络，毫秒级响应时间</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>数据安全</h3>
            <p>企业级安全保障，代码隐私保护</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>价格实惠</h3>
            <p>透明计费，无隐藏费用</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🛠️</div>
            <h3>简单集成</h3>
            <p>一键安装，即刻使用</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>开始你的AI编程之旅</h2>
          <p>立即注册，体验智能编程的魅力</p>
          <router-link to="/login" class="btn btn-primary btn-large">
            免费开始
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  padding: 4rem 0;
  background: linear-gradient(135deg, #faf8f5 0%, #f0e6d6 100%);
  position: relative;
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #2C1810;
}

.highlight {
  background: linear-gradient(135deg, #D2691E, #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.ai-engines {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.engine-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: #2C1810;
  font-size: 0.9rem;
}

.engine-icon {
  font-size: 1.2rem;
}

.plus {
  font-size: 1.5rem;
  font-weight: bold;
  color: #D2691E;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.1rem;
}

/* Code Preview */
.code-preview {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
}

.code-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #444;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.title {
  color: #ccc;
  margin-left: auto;
  font-size: 0.9rem;
}

.code-content {
  padding: 1.5rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-line {
  color: #e6e6e6;
  margin-bottom: 0.5rem;
}

.indent {
  padding-left: 2rem;
}

.comment { color: #7c7c7c; }
.keyword { color: #ff79c6; }
.function { color: #50fa7b; }
.param { color: #f8f8f2; }
.method { color: #8be9fd; }
.number { color: #bd93f9; }

/* Models Section */
.models {
  padding: 5rem 0;
  background: white;
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
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.model-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  position: relative;
  border: 2px solid transparent;
}

.model-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.model-card.featured {
  border-color: #D2691E;
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: linear-gradient(135deg, #D2691E, #8B4513);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.model-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.model-card h3 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.model-desc {
  color: #666;
  margin-bottom: 1.5rem;
}

.model-features {
  list-style: none;
  margin-bottom: 2rem;
}

.model-features li {
  color: #555;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1rem;
}

.model-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #50fa7b;
  font-weight: bold;
}

.model-performance {
  text-align: left;
}

.performance-bar {
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.bar {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
}

.haiku-bar { background: linear-gradient(90deg, #ffbd2e, #ff8c00); }
.sonnet-bar { background: linear-gradient(90deg, #D2691E, #8B4513); }
.opus-bar { background: linear-gradient(90deg, #8B4513, #5D2F0A); }
.codex-bar { background: linear-gradient(90deg, #00d4aa, #00b894); }
.codex-advanced-bar { background: linear-gradient(90deg, #e84393, #fd79a8); }

/* Integration Section */
.integration {
  padding: 5rem 0;
  background: linear-gradient(135deg, #faf8f5 0%, #f0e6d6 100%);
}

.integration-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.integration h2 {
  font-size: 2.5rem;
  color: #2C1810;
  margin-bottom: 1.5rem;
}

.integration-desc {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.integration-features {
  list-style: none;
  margin-bottom: 2rem;
}

.integration-features li {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #555;
}

/* IDE Preview */
.ide-preview {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
}

.ide-sidebar {
  background: #2d2d2d;
  padding: 1rem;
  min-width: 150px;
  border-right: 1px solid #444;
}

.folder, .file {
  color: #ccc;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s;
}

.file.active {
  color: #D2691E;
}

.ide-editor {
  flex: 1;
  position: relative;
}

.editor-tabs {
  background: #2d2d2d;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #444;
}

.tab {
  color: #ccc;
  padding: 0.5rem 1rem;
  background: #1e1e1e;
  border-radius: 4px 4px 0 0;
}

.editor-content {
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85rem;
}

.editor-line {
  display: flex;
  margin-bottom: 0.5rem;
}

.line-number {
  color: #666;
  width: 30px;
  text-align: right;
  margin-right: 1rem;
}

.code {
  color: #e6e6e6;
}

.ai-suggestion {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(210, 105, 30, 0.1);
  border: 1px solid #D2691E;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.8rem;
}

.ai-badge {
  background: #D2691E;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  margin-right: 0.5rem;
}

.suggestion {
  color: #D2691E;
}

/* Features Section */
.features {
  padding: 5rem 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 12px;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2C1810;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* CTA Section */
.cta {
  padding: 5rem 0;
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

/* Responsive Design */
@media (max-width: 768px) {
  .hero .container,
  .integration-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .models-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
  }

  .ai-engines {
    flex-direction: column;
    gap: 0.75rem;
  }

  .engine-badge {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .plus {
    font-size: 1.2rem;
  }

  .code-preview {
    transform: none;
  }

  .ide-preview {
    flex-direction: column;
  }

  .ide-sidebar {
    min-width: auto;
  }
}
</style>
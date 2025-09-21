<template>
  <div class="tutorial">
    <!-- Header Section -->
    <div class="tutorial-header">
      <div class="container">
        
        <h1 class="page-title">
          <i class="fas fa-graduation-cap"></i>
          Claude Code 使用教程
        </h1>
        <p class="page-subtitle">
          跟着这个教程，你可以轻松在自己的电脑上安装并使用 Claude Code。
        </p>
      </div>
    </div>

    <!-- Platform Selection -->
    <div class="platform-section">
      <div class="container">
        <div class="platform-tabs">
          <button
            class="platform-tab"
            :class="{ active: activePlatform === 'windows' }"
            @click="activePlatform = 'windows'"
          >
            <i class="fab fa-windows"></i>
            Windows
          </button>
          <button
            class="platform-tab"
            :class="{ active: activePlatform === 'macos' }"
            @click="activePlatform = 'macos'"
          >
            <i class="fab fa-apple"></i>
            macOS
          </button>
          <button
            class="platform-tab"
            :class="{ active: activePlatform === 'linux' }"
            @click="activePlatform = 'linux'"
          >
            <i class="fab fa-linux"></i>
            Linux / WSL2
          </button>
        </div>
      </div>
    </div>

    <!-- Tutorial Content -->
    <div class="tutorial-content">
      <div class="container">
        <!-- Windows Tutorial -->
        <div v-if="activePlatform === 'windows'" class="tutorial-steps">
          <!-- Step 1: Install Node.js -->
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">1</span>
              <h3>安装 Node.js 环境</h3>
            </div>
            <p class="step-description">
              Claude Code 需要 Node.js 环境才能运行。
            </p>

            <div class="install-method">
              <h4>
                <i class="fab fa-windows"></i>
                Windows 安装方法
              </h4>

              <div class="method-option">
                <h5>方法一：官网下载（推荐）</h5>
                <ol>
                  <li>打开浏览器访问 <code>https://nodejs.org/</code></li>
                  <li>点击 "LTS" 版本进行下载（推荐长期支持版本）</li>
                  <li>下载完成后双击 <code>.msi</code> 文件</li>
                  <li>按照安装向导完成安装，保持默认设置即可</li>
                </ol>
              </div>

              <div class="method-option">
                <h5>方法二：使用包管理器</h5>
                <p>如果你安装了 Chocolatey 或 Scoop，可以使用命令行安装：</p>
                <div class="code-block">
                  <div class="code-header">
                    <span>命令行安装</span>
                    <button class="copy-btn" @click="copyCode('choco')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code># 使用 Chocolatey
choco install nodejs

# 或使用 Scoop
scoop install nodejs</code></pre>
                  </div>
                </div>
              </div>

              <div class="tips-box">
                <h6>Windows 注意事项</h6>
                <ul>
                  <li>• 建议使用 PowerShell 而不是 CMD</li>
                  <li>• 如果遇到权限问题，尝试以管理员身份运行</li>
                  <li>• 某些杀毒软件可能会误报，需要添加白名单</li>
                </ul>
              </div>

              <div class="verify-box">
                <h6>验证安装是否成功</h6>
                <p>安装完成后，打开 PowerShell 或 CMD，输入以下命令：</p>
                <div class="code-block">
                  <div class="code-header">
                    <span>验证安装</span>
                    <button class="copy-btn" @click="copyCode('verify-node')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code>node --version
npm --version</code></pre>
                  </div>
                </div>
                <p>如果显示版本号，说明安装成功了！</p>
              </div>
            </div>
          </div>

          <!-- Step 2: Install Claude Code -->
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">2</span>
              <h3>安装 Claude Code</h3>
            </div>

            <div class="install-method">
              <h4>
                <i class="fas fa-download"></i>
                安装 Claude Code
              </h4>
              <p>打开 PowerShell 或 CMD，运行以下命令：</p>

              <div class="code-block">
                <div class="code-header">
                  <span>全局安装</span>
                  <button class="copy-btn" @click="copyCode('install-claude')">复制</button>
                </div>
                <div class="code-content">
                  <pre><code># 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code</code></pre>
                </div>
              </div>

              <p class="method-description">
                这个命令会从 npm 官方仓库下载并安装最新版本的 Claude Code。
              </p>

              <div class="tips-box">
                <h6>提示</h6>
                <ul>
                  <li>• 建议使用 PowerShell 而不是 CMD，功能更强大</li>
                  <li>• 如果遇到权限问题，以管理员身份运行 PowerShell</li>
                </ul>
              </div>

              <div class="verify-box">
                <h6>验证 Claude Code 安装</h6>
                <p>安装完成后，输入以下命令检查是否安装成功：</p>
                <div class="code-block">
                  <div class="code-header">
                    <span>验证安装</span>
                    <button class="copy-btn" @click="copyCode('verify-claude')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code>claude --version</code></pre>
                  </div>
                </div>
                <p>如果显示版本号，恭喜你！Claude Code 已经成功安装了。</p>
              </div>
            </div>
          </div>

          <!-- Step 3: Environment Variables -->
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">3</span>
              <h3>设置环境变量</h3>
            </div>

            <div class="install-method">
              <h4>
                <i class="fas fa-cog"></i>
                配置 Claude Code 环境变量
              </h4>
              <p>为了让 Claude Code 连接到你的中转服务，需要设置两个环境变量：</p>

              <div class="env-methods">
                <div class="env-method">
                  <h5>方法一：PowerShell 临时设置（当前会话）</h5>
                  <p>在 PowerShell 中运行以下命令：</p>
                  <div class="code-block">
                    <div class="code-header">
                      <span>临时设置</span>
                      <button class="copy-btn" @click="copyCode('temp-env')">复制</button>
                    </div>
                    <div class="code-content">
                      <pre><code>$env:ANTHROPIC_BASE_URL = "https://api.aicodemirror.com"
$env:ANTHROPIC_AUTH_TOKEN = "你的API密钥"</code></pre>
                    </div>
                  </div>
                  <p class="warning">💡 记得将 "你的API密钥" 替换为在控制台中创建的实际密钥。</p>
                </div>

                <div class="env-method">
                  <h5>方法二：PowerShell 永久设置（用户级）</h5>
                  <p>在 PowerShell 中运行以下命令设置用户级环境变量：</p>
                  <div class="code-block">
                    <div class="code-header">
                      <span>永久设置</span>
                      <button class="copy-btn" @click="copyCode('perm-env')">复制</button>
                    </div>
                    <div class="code-content">
                      <pre><code># 设置用户级环境变量（永久生效）
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.aicodemirror.com", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的API密钥", [System.EnvironmentVariableTarget]::User)</code></pre>
                    </div>
                  </div>

                  <p>查看已设置的环境变量：</p>
                  <div class="code-block">
                    <div class="code-header">
                      <span>查看环境变量</span>
                      <button class="copy-btn" @click="copyCode('check-env')">复制</button>
                    </div>
                    <div class="code-content">
                      <pre><code># 查看用户级环境变量
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_BASE_URL", [System.EnvironmentVariableTarget]::User)
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", [System.EnvironmentVariableTarget]::User)</code></pre>
                    </div>
                  </div>
                  <p class="info">💡 设置后需要重新打开 PowerShell 窗口才能生效。</p>
                </div>
              </div>

              <div class="verify-box">
                <h6>验证环境变量设置</h6>
                <p>设置完环境变量后，可以通过以下命令验证是否设置成功：</p>
                <div class="code-block">
                  <div class="code-header">
                    <span>验证环境变量</span>
                    <button class="copy-btn" @click="copyCode('test-env')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code># PowerShell 中查看环境变量
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: First Use -->
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">4</span>
              <h3>开始使用 Claude Code</h3>
            </div>

            <div class="install-method">
              <h4>
                <i class="fas fa-rocket"></i>
                第一次使用
              </h4>
              <p>现在一切都准备好了，让我们开始使用 Claude Code！</p>

              <div class="code-block">
                <div class="code-header">
                  <span>启动 Claude Code</span>
                  <button class="copy-btn" @click="copyCode('start-claude')">复制</button>
                </div>
                <div class="code-content">
                  <pre><code># 在项目目录中启动 Claude Code
claude</code></pre>
                </div>
              </div>

              <div class="success-box">
                <h6>🎉 恭喜！</h6>
                <p>如果一切顺利，你应该能看到 Claude Code 的欢迎界面。现在你可以开始与 AI 进行编程协作了！</p>
              </div>

              <div class="tips-box">
                <h6>使用技巧</h6>
                <ul>
                  <li>• 用自然语言描述你想要实现的功能</li>
                  <li>• 可以让 AI 帮你写代码、解释代码、调试代码</li>
                  <li>• 支持多种编程语言和框架</li>
                  <li>• 随时可以使用 Ctrl+C 退出</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- macOS Tutorial -->
        <div v-if="activePlatform === 'macos'" class="tutorial-steps">
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">1</span>
              <h3>安装 Node.js 环境</h3>
            </div>
            <p class="step-description">
              Claude Code 需要 Node.js 环境才能运行。
            </p>

            <div class="install-method">
              <h4>
                <i class="fab fa-apple"></i>
                macOS 安装方法
              </h4>

              <div class="method-option">
                <h5>方法一：官网下载</h5>
                <ol>
                  <li>打开浏览器访问 <code>https://nodejs.org/</code></li>
                  <li>下载 macOS Installer (.pkg)</li>
                  <li>双击下载的 .pkg 文件安装</li>
                </ol>
              </div>

              <div class="method-option">
                <h5>方法二：使用 Homebrew（推荐）</h5>
                <div class="code-block">
                  <div class="code-header">
                    <span>Homebrew 安装</span>
                    <button class="copy-btn" @click="copyCode('brew-node')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code># 安装 Homebrew（如果还没安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 使用 Homebrew 安装 Node.js
brew install node</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <span class="step-number">2</span>
              <h3>安装和配置 Claude Code</h3>
            </div>

            <div class="install-method">
              <div class="code-block">
                <div class="code-header">
                  <span>安装和配置</span>
                  <button class="copy-btn" @click="copyCode('macos-setup')">复制</button>
                </div>
                <div class="code-content">
                  <pre><code># 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 设置环境变量
export ANTHROPIC_BASE_URL="https://api.aicodemirror.com"
export ANTHROPIC_AUTH_TOKEN="你的API密钥"

# 启动 Claude Code
claude</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Linux Tutorial -->
        <div v-if="activePlatform === 'linux'" class="tutorial-steps">
          <div class="step-card">
            <div class="step-header">
              <span class="step-number">1</span>
              <h3>安装 Node.js 环境</h3>
            </div>

            <div class="install-method">
              <h4>
                <i class="fab fa-linux"></i>
                Linux / WSL2 安装方法
              </h4>

              <div class="code-block">
                <div class="code-header">
                  <span>使用包管理器安装</span>
                  <button class="copy-btn" @click="copyCode('linux-node')">复制</button>
                </div>
                <div class="code-content">
                  <pre><code># Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL/Fedora
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs

# Arch Linux
sudo pacman -S nodejs npm</code></pre>
                </div>
              </div>
            </div>
          </div>

          <div class="step-card">
            <div class="step-header">
              <span class="step-number">2</span>
              <h3>安装和配置 Claude Code</h3>
            </div>

            <div class="install-method">
              <div class="code-block">
                <div class="code-header">
                  <span>安装和配置</span>
                  <button class="copy-btn" @click="copyCode('linux-setup')">复制</button>
                </div>
                <div class="code-content">
                  <pre><code># 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 设置环境变量（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export ANTHROPIC_BASE_URL="https://api.aicodemirror.com"' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN="你的API密钥"' >> ~/.bashrc

# 重新加载配置
source ~/.bashrc

# 启动 Claude Code
claude</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- API Key Section -->
        <div class="api-key-section" v-if="false">
          <div class="api-key-card">
            <h3>
              <i class="fas fa-key"></i>
              获取 API 密钥
            </h3>
            <p>在设置环境变量之前，你需要先获取 API 密钥：</p>
            <ol>
              <li>访问 <router-link to="/dashboard">控制台</router-link></li>
              <li>在 "API 密钥" 部分点击 "创建新密钥"</li>
              <li>复制生成的密钥</li>
              <li>将密钥替换到上面命令中的 "你的API密钥" 位置</li>
            </ol>
            <div class="cta-buttons">
              <router-link to="/dashboard" class="btn-primary">
                <i class="fas fa-external-link-alt"></i>
                前往控制台
              </router-link>
            </div>
          </div>
        </div>

        <!-- Codex Config Section -->
        <div class="codex-section">
          <div class="step-card codex-card">
            <h3>
              <i class="fas fa-code"></i>
              Codex 配置教程（OpenAI 兼容）
            </h3>
            <p class="codex-desc">为使用 OpenAI/Codex 生态的 SDK 或工具配置环境变量。</p>

            <div class="env-methods">
              <div class="env-method">
                <h5>Windows（PowerShell）临时设置</h5>
                <div class="code-block">
                  <div class="code-header">
                    <span>临时设置</span>
                    <button class="copy-btn" @click="copyCode('codex-win-temp')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code>$env:OPENAI_API_BASE = "https://api.aicodemirror.com"
$env:OPENAI_API_KEY = "你的API密钥"</code></pre>
                  </div>
                </div>
              </div>

              <div class="env-method">
                <h5>Windows（PowerShell）永久设置</h5>
                <div class="code-block">
                  <div class="code-header">
                    <span>永久设置</span>
                    <button class="copy-btn" @click="copyCode('codex-win-perm')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code>[System.Environment]::SetEnvironmentVariable("OPENAI_API_BASE", "https://api.aicodemirror.com", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "你的API密钥", [System.EnvironmentVariableTarget]::User)</code></pre>
                  </div>
                </div>
              </div>

              <div class="env-method">
                <h5>macOS / Linux</h5>
                <div class="code-block">
                  <div class="code-header">
                    <span>Shell 配置</span>
                    <button class="copy-btn" @click="copyCode('codex-nix')">复制</button>
                  </div>
                  <div class="code-content">
                    <pre><code>echo 'export OPENAI_API_BASE="https://api.aicodemirror.com"' >> ~/.bashrc
echo 'export OPENAI_API_KEY="你的API密钥"' >> ~/.bashrc
source ~/.bashrc</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div class="verify-box">
              <h6>验证 Codex 环境变量</h6>
              <p>验证是否设置成功：</p>
              <div class="code-block">
                <div class="code-header">
                  <span>Windows</span>
                  <button class="copy-btn" @click="copyCode('codex-check-win')">复制</button>
                </div>
                <div class="code-content">
                  <pre><code>echo $env:OPENAI_API_BASE
echo $env:OPENAI_API_KEY</code></pre>
                </div>
              </div>
              <div class="code-block">
                <div class="code-header">
                  <span>macOS / Linux</span>
                  <button class="copy-btn" @click="copyCode('codex-check-nix')">复制</button>
                </div>
                <div class="code-content">
                  <pre><code>echo $OPENAI_API_BASE
echo $OPENAI_API_KEY</code></pre>
                </div>
              </div>
              <p class="info">提示：将上面的“你的API密钥”替换为在控制台创建的实际密钥。</p>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="faq-section">
          <h3>
            <i class="fas fa-question-circle"></i>
            常见问题
          </h3>
          <div class="faq-list">
            <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
              <div class="faq-question" @click="toggleFaq(index)">
                <span>{{ faq.question }}</span>
                <span class="faq-icon" :class="{ open: faq.open }">▼</span>
              </div>
              <div class="faq-answer" v-show="faq.open">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tutorial',
  data() {
    return {
      activePlatform: 'windows',
      faqs: [
        {
          question: '如何获取API密钥？',
          answer: '登录控制台后，在"API密钥"页面可以生成和管理你的密钥。',
          open: false
        },
        {
          question: '为什么安装失败？',
          answer: '请检查网络连接，确保有足够的权限，并尝试以管理员身份运行命令。',
          open: false
        },
        {
          question: '环境变量设置后不生效？',
          answer: '请重新打开终端窗口，或者重启电脑。确保命令拼写正确。',
          open: false
        },
        {
          question: 'Claude Code 启动失败？',
          answer: '检查 Node.js 是否正确安装，环境变量是否设置正确，API密钥是否有效。',
          open: false
        }
      ]
    }
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open
    },

    copyCode(type) {
      const codes = {
        'choco': `# 使用 Chocolatey
choco install nodejs

# 或使用 Scoop
scoop install nodejs`,
        'verify-node': `node --version
npm --version`,
        'install-claude': `# 全局安装 Claude Code
npm install -g @anthropic-ai/claude-code`,
        'verify-claude': `claude --version`,
        'temp-env': `$env:ANTHROPIC_BASE_URL = "https://api.aicodemirror.com"
$env:ANTHROPIC_AUTH_TOKEN = "你的API密钥"`,
        'perm-env': `# 设置用户级环境变量（永久生效）
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_BASE_URL", "https://api.aicodemirror.com", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", "你的API密钥", [System.EnvironmentVariableTarget]::User)`,
        'check-env': `# 查看用户级环境变量
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_BASE_URL", [System.EnvironmentVariableTarget]::User)
[System.Environment]::GetEnvironmentVariable("ANTHROPIC_AUTH_TOKEN", [System.EnvironmentVariableTarget]::User)`,
        'test-env': `# PowerShell 中查看环境变量
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN`,
        'start-claude': `# 在项目目录中启动 Claude Code
claude`,
        'brew-node': `# 安装 Homebrew（如果还没安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 使用 Homebrew 安装 Node.js
brew install node`,
        'macos-setup': `# 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 设置环境变量
export ANTHROPIC_BASE_URL="https://api.aicodemirror.com"
export ANTHROPIC_AUTH_TOKEN="你的API密钥"

# 启动 Claude Code
claude`,
        'linux-node': `# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL/Fedora
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs

# Arch Linux
sudo pacman -S nodejs npm`,
        'linux-setup': `# 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 设置环境变量（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export ANTHROPIC_BASE_URL="https://api.aicodemirror.com"' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN="你的API密钥"' >> ~/.bashrc

# 重新加载配置
source ~/.bashrc

# 启动 Claude Code
claude`
        ,
        'codex-win-temp': `$env:OPENAI_API_BASE = "https://api.aicodemirror.com"
$env:OPENAI_API_KEY = "你的API密钥"`,
        'codex-win-perm': `[System.Environment]::SetEnvironmentVariable("OPENAI_API_BASE", "https://api.aicodemirror.com", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "你的API密钥", [System.EnvironmentVariableTarget]::User)`,
        'codex-nix': `echo 'export OPENAI_API_BASE="https://api.aicodemirror.com"' >> ~/.bashrc
echo 'export OPENAI_API_KEY="你的API密钥"' >> ~/.bashrc
source ~/.bashrc`,
        'codex-check-win': `echo $env:OPENAI_API_BASE
echo $env:OPENAI_API_KEY`,
        'codex-check-nix': `echo $OPENAI_API_BASE
echo $OPENAI_API_KEY`
      }

      navigator.clipboard.writeText(codes[type]).then(() => {
        alert('代码已复制到剪贴板')
      }).catch(() => {
        alert('复制失败，请手动复制')
      })
    }
  }
}
</script>

<style scoped>
.tutorial {
  background: #f8f9fa;
  min-height: 100vh;
}

/* Header */
.tutorial-header {
  background: white;
  padding: 2rem 0;
  border-bottom: 1px solid #e9ecef;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.breadcrumb {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #007aff;
  text-decoration: none;
}

.breadcrumb span {
  color: #666;
  margin: 0 0.5rem;
}

.page-title {
  font-size: 2.5rem;
  color: #2C1810;
  margin-bottom: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  text-align: center;
}

.page-title i {
  color: #007aff;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

/* Platform Section */
.platform-section {
  background: white;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.platform-tabs {
  display: flex;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
}

.platform-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  color: #666;
}

.platform-tab.active {
  background: white;
  color: #007aff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.platform-tab i {
  font-size: 1.1rem;
}

/* Tutorial Content */
.tutorial-content {
  padding: 3rem 0;
}

.tutorial-steps {
  max-width: 800px;
  margin: 0 auto;
}

.step-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #007aff, #5ac8fa);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.step-header h3 {
  color: #2C1810;
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
}

.step-description {
  color: #666;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Install Methods */
.install-method h4 {
  color: #2C1810;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.install-method h4 i {
  color: #007aff;
}

.method-option {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.method-option h5 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.method-option ol,
.method-option ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.method-option li {
  margin-bottom: 0.5rem;
  color: #555;
  line-height: 1.5;
}

.method-description {
  color: #666;
  font-size: 0.95rem;
  margin: 1rem 0;
}

/* Code Blocks */
.code-block {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  margin: 1.5rem 0;
}

.code-header {
  background: #2d2d2d;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ccc;
  font-size: 0.9rem;
}

.copy-btn {
  background: #007aff;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s;
}

.copy-btn:hover {
  background: #005fb8;
}

.code-content {
  padding: 1.5rem;
  font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e6e6e6;
  overflow-x: auto;
}

.code-content pre {
  margin: 0;
  white-space: pre-wrap;
}

.code-content code {
  background: #2d2d2d;
  color: #e6e6e6;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: inherit;
}

/* Info Boxes */
.tips-box,
.verify-box,
.success-box {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.tips-box h6,
.verify-box h6,
.success-box h6 {
  color: #0369a1;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
}

.success-box {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.success-box h6 {
  color: #15803d;
}

.tips-box ul,
.verify-box ul {
  margin: 0;
  padding-left: 1rem;
}

.tips-box li,
.verify-box li {
  margin-bottom: 0.5rem;
  color: #0369a1;
}

.warning {
  color: #d97706;
  font-weight: 500;
  font-size: 0.9rem;
}

.info {
  color: #0369a1;
  font-weight: 500;
  font-size: 0.9rem;
}

/* Environment Variables */
.env-methods {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.env-method {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.env-method h5 {
  color: #2C1810;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

/* API Key Section */
.api-key-section {
  margin: 3rem 0;
}

.api-key-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.api-key-card h3 {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.api-key-card ol {
  text-align: left;
  max-width: 400px;
  margin: 1.5rem auto;
}

.api-key-card li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.cta-buttons {
  margin-top: 1.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #667eea;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}

/* FAQ Section */
.faq-section {
  margin: 3rem 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.faq-section h3 {
  color: #2C1810;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.faq-section h3 i {
  color: #007aff;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.faq-question {
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #2C1810;
  transition: background 0.3s;
}

.faq-question:hover {
  background: #f8f9fa;
}

.faq-icon {
  transition: transform 0.3s;
  color: #007aff;
  font-size: 0.8rem;
}

.faq-icon.open {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: #666;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .platform-tabs {
    flex-direction: column;
    max-width: none;
  }

  .step-card {
    padding: 1.5rem;
  }

  .step-header {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .env-methods {
    gap: 1.5rem;
  }

  .code-header {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .code-content {
    padding: 1rem;
    font-size: 0.8rem;
  }

  .api-key-card {
    margin: 0 1rem;
    padding: 1.5rem;
  }
}

/* Hide deprecated API Key card on tutorial page */
.api-key-section { display: none; }

/* Minor spacing for Codex section */
.codex-section {
  margin: 3rem 0;
}

.codex-card {
  max-width: 800px;
  margin: 0 auto 2rem;
}

.codex-card h3 {
  color: #2C1810;
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.codex-desc {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}
</style>

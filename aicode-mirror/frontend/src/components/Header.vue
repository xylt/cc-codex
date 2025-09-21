<template>
  <header class="header">
    <div class="container">
      <nav class="nav">
        <div class="nav-brand">
          <router-link to="/" class="logo">
            <span class="logo-icon">🔮</span>
            <span class="logo-text">CC-Codex</span>
          </router-link>
        </div>

        <div class="nav-menu" :class="{ active: menuOpen }">
          <router-link to="/" class="nav-link" @click="closeMenu">首页</router-link>
          <router-link to="/pricing" class="nav-link" @click="closeMenu">定价</router-link>
          <router-link to="/tutorial" class="nav-link" @click="closeMenu">教程</router-link>
        </div>

        <div class="nav-actions">
          <template v-if="!isLoggedIn">
            <router-link to="/login" class="btn btn-secondary">登录</router-link>
            <router-link to="/login" class="btn btn-primary">注册</router-link>
          </template>
          <template v-else>
            <router-link to="/dashboard" class="btn btn-secondary">控制台</router-link>
            <button class="btn btn-primary" @click="logout">退出</button>
          </template>
        </div>

        <button class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuOpen: false
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('authToken')
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    closeMenu() {
      this.menuOpen = false
    },
    logout() {
      localStorage.removeItem('authToken')
      if (this.$route.path === '/dashboard') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.nav-brand .logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.2rem;
}

.logo-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #8B4513;
}

.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-actions {
    gap: 0.5rem;
  }

  .btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-bottom">
        <p>&copy; 2025 CC-Codex. 保留所有权利.</p>
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
  padding: 1.5rem 0 1rem;
  margin-top: auto;
}
.footer-bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid #4A3429;
  color: #8B7D74;
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
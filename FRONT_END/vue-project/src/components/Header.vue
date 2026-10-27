<template>
  <header class="navbar">
    <div class="logo" @click="$router.push('/')" style="cursor: pointer;">
      <img src="@/assets/logo.png" alt="Logo" />
      <span class="brand">sachweb<span class="red">.vn</span></span>
    </div>

    <nav class="nav-links">
      <a href="#" @click.prevent="$router.push('/')">Trang chủ</a>
      <a href="#" class="nav-rules-btn" @click.prevent="showRulesModal = true">
        <i class="fas fa-book-open"></i> Nội quy hệ thống
      </a>
      <a href="#" @click.prevent>Giới thiệu</a>
      <a href="#" @click.prevent>Tin tức</a>
      <a href="#" @click.prevent>Liên hệ</a>
    </nav>

    <div class="search-bar">
      <input type="text" placeholder="Nhập từ khóa" />
      <span class="search-icon">🔍</span>
    </div>

    <div class="auth-cart">
    </div>

    <!-- Modal Popup Nội Quy Hệ Thống -->
    <transition name="fade">
      <div v-if="showRulesModal" class="modal-overlay" @click.self="showRulesModal = false">
        <div class="modal-card">
          <div class="modal-header">
            <h3><i class="fas fa-scroll"></i> NỘI QUY HỆ THỐNG</h3>
            <button class="btn-close-modal" @click="showRulesModal = false">&times;</button>
          </div>
          <div class="modal-body">
            <ul class="rules-list">
              <li>
                <div class="rule-icon"><i class="fas fa-check-circle"></i></div>
                <div class="rule-text"><strong>1.</strong> Độc giả phải đăng nhập tài khoản để thực hiện mượn sách.</div>
              </li>
              <li>
                <div class="rule-icon"><i class="fas fa-check-circle"></i></div>
                <div class="rule-text"><strong>2.</strong> Nhân viên có quyền kiểm tra, duyệt hoặc từ chối các đơn đăng ký mượn.</div>
              </li>
              <li>
                <div class="rule-icon"><i class="fas fa-check-circle"></i></div>
                <div class="rule-text"><strong>3.</strong> Quản trị viên có toàn quyền quản lý nhân sự, độc giả và danh mục sách.</div>
              </li>
              <li>
                <div class="rule-icon"><i class="fas fa-check-circle"></i></div>
                <div class="rule-text"><strong>4.</strong> Mỗi độc giả được mượn tối đa 3 quyển sách trong cùng một thời điểm.</div>
              </li>
              <li>
                <div class="rule-icon"><i class="fas fa-check-circle"></i></div>
                <div class="rule-text"><strong>5.</strong> Độc giả phải hoàn trả sách đúng thời hạn quy định để tránh phí phạt.</div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn-confirm" @click="showRulesModal = false">Đã Hiểu</button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      showRulesModal: false
    };
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  flex-wrap: wrap;
  font-family: 'K2D', sans-serif;
  position: relative;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  width: 55px;
  height: 55px;
  object-fit: contain;
}

.brand {
  font-weight: 700;
  font-size: 1.4rem;
  color: #1e3a8a;
}

.brand .red {
  color: #ef4444;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #374151;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
  padding: 6px 12px;
  border-radius: 8px;
}

.nav-links a:hover {
  color: #007bff;
  background-color: #f0f7ff;
}

.nav-rules-btn {
  color: #0066cc !important;
  background-color: #e6f2ff;
  border: 1px solid #b8daff;
}

.nav-rules-btn:hover {
  background-color: #0066cc !important;
  color: #ffffff !important;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 25px;
  padding: 0.35rem 0.9rem;
  background-color: #f9fafb;
  transition: all 0.2s ease;
}

.search-bar:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
  background-color: #fff;
}

.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  padding: 0.2rem 0.4rem;
  font-size: 15px;
}

.search-icon {
  color: #6b7280;
  cursor: pointer;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal-card {
  background: rgba(255, 255, 255, 0.95);
  width: 90%;
  max-width: 540px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
  animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #0066cc, #00458f);
  color: #fff;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-close-modal {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  opacity: 0.85;
  transition: transform 0.2s, opacity 0.2s;
}

.btn-close-modal:hover {
  opacity: 1;
  transform: scale(1.15);
}

.modal-body {
  padding: 24px;
}

.rules-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.rules-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 12px;
  border-left: 4px solid #007bff;
  font-size: 15px;
  color: #334155;
  line-height: 1.5;
}

.rule-icon {
  color: #007bff;
  font-size: 18px;
  margin-top: 2px;
}

.rule-text strong {
  color: #0f172a;
}

.modal-footer {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: center;
}

.btn-confirm {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  border: none;
  padding: 10px 32px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: all 0.2s ease;
}

.btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 123, 255, 0.4);
}

/* Animations */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(15px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>

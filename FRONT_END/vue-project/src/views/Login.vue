<template>
  <div class="page">
    <!-- Card Đăng Nhập -->
    <div class="card">
      <div class="welcome-box text-center mb-4">
        <h1 class="welcome-title">CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG</h1>
        <p class="welcome-subtitle">Vui lòng chọn vai trò để đăng nhập và sử dụng các chức năng</p>
      </div>

      <!-- Các nút đăng nhập -->
      <button @click="navigateToReaderLogin" class="btn btn-primary btn-lg">
        <i class="fas fa-user-graduate me-2"></i> Đăng Nhập Độc Giả
      </button>
      <button @click="navigateToStaffLogin" class="btn btn-success btn-lg">
        <i class="fas fa-user-tie me-2"></i> Đăng Nhập Nhân Viên
      </button>
      <button @click="navigateToAdministratorLogin" class="btn btn-warning btn-lg">
        <i class="fas fa-user-shield me-2"></i> Đăng Nhập Quản Trị
      </button>
    </div>

    <!-- Footer nhỏ bên dưới -->
    <div class="footer-copy">
      <p>&copy; 2025 Hệ Thống Mượn Sách Trực Tuyến</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginCard',
  methods: {
    navigateToReaderLogin() {
      this.$router.push('/ReaderLogin');
    },
    navigateToStaffLogin() {
      this.$router.push('/StaffLogin');
    },
    navigateToAdministratorLogin() {
      this.$router.push('/AdminLogin');
    }
  }
};
</script>

<style scoped>
.page {
  font-family: 'K2D', sans-serif;
  background: linear-gradient(135deg, rgba(0, 102, 204, 0.85), rgba(0, 102, 204, 0.25));
  background-size: cover;
  background-position: center;
  min-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  position: relative;
}

/* Card đăng nhập */
.card {
  border-radius: 24px;
  padding: 45px 35px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 20px 40px rgba(0, 51, 102, 0.2);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 0.8s ease-out;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0px 25px 50px rgba(0, 51, 102, 0.28);
}

.welcome-box {
  background: linear-gradient(135deg, #0066cc, #00458f);
  padding: 22px 18px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 77, 153, 0.25);
  margin-bottom: 24px;
}

.welcome-title {
  font-size: 21px;
  font-weight: 700;
  color: #ffffff !important;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

.welcome-subtitle {
  color: #e0f2fe !important;
  font-size: 14px;
  margin-bottom: 0;
  font-weight: 400;
  line-height: 1.4;
}

.btn {
  font-size: 16px;
  font-weight: 600;
  padding: 14px 20px;
  border-radius: 12px;
  transition: all 0.25s ease;
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: scale(1.03);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
}

.btn-success {
  background: linear-gradient(135deg, #28a745, #1e7e34);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107, #d39e00);
  color: #212529;
}

.footer-copy {
  margin-top: 30px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
# 📚 HỆ THỐNG QUẢN LÝ MƯỢN TRẢ SÁCH THƯ VIỆN

**Đề tài:** Phát triển ứng dụng Web - Quản lý mượn trả sách  
**Sinh viên thực hiện:** Mã Quốc Đạt  
**Mã số sinh viên:** B2207514  

---

## 🛠️ Công Nghệ Sử Dụng

- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.io, Multer, Tesseract.js, gTTS
- **Frontend:** Vue.js 3, Vue Router, Axios, Socket.io-client, Bootstrap
- **Cơ sở dữ liệu:** MongoDB

---

## 📁 Cấu Trúc Thư Mục

```text
├── BACK_END/                   # Mã nguồn Backend API & kết nối MongoDB
│   ├── config/                 # Cấu hình CSDL (database.js)
│   ├── controllers/            # Controller xử lý nghiệp vụ
│   ├── database_sample/        # Dữ liệu CSDL mẫu (JSON)
│   ├── models/                 # Mongoose Schema (Book, Reader, Staff,...)
│   ├── routes/                 # Định tuyến API
│   ├── uploads/                # Thư mục lưu trữ hình ảnh tải lên
│   ├── app.js                  # Entry point Backend server
│   └── package.json
│
├── FRONT_END/                  # Giao diện người dùng
│   └── vue-project/            # Ứng dụng Vue.js (SPA)
│       ├── public/             # Tài nguyên tĩnh
│       ├── src/                # Components, views, router, assets
│       └── package.json
│
├── DANH_SACH_TOI_UU.md         # Báo cáo các điểm cần tối ưu hóa hệ thống
├── .gitignore                  # Cấu hình loại trừ file của Git
└── README.md                   # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Khởi chạy Backend

```bash
cd BACK_END
npm install
npm start
```
> Backend chạy mặc định tại: `http://localhost:3000` (hoặc cổng được cấu hình trong file `.env`)

### 2. Khởi chạy Frontend

```bash
cd FRONT_END/vue-project
npm install
npm run serve
```
> Frontend truy cập tại: `http://localhost:8080`

# TỔNG HỢP CÁC ĐIỂM CẦN TỐI ƯU HÓA CHO TOÀN BỘ DỰ ÁN

Tài liệu này tổng hợp chi tiết các đề xuất tối ưu hóa về **Kiến trúc dữ liệu**, **Bảo mật**, **Hiệu năng Backend** và **Trải nghiệm Frontend (UI/UX)** nhằm nâng cấp hệ thống trở nên chuyên nghiệp, an toàn và mở rộng tốt hơn.

---

## 1. 🗄️ TỐI ƯU KIẾN TRÚC DỮ LIỆU & QUẢN LÝ ĐƠN MƯỢN

### 1.1. Chuyển đổi dữ liệu Đơn mượn từ `localStorage` sang MongoDB (Rất quan trọng)
- **Vấn đề hiện tại:** 
  - Tại `ThuVienOnline.vue`, khi độc giả mượn sách, dữ liệu được lưu dưới dạng mảng xen kẽ `[idSach1, tenDG1, idSach2, tenDG2]` trong `localStorage` của trình duyệt.
  - Các trang duyệt của nhân viên (`DanhSachDonDangKyMuon.vue`, `NhanVienDuyetTraSach.vue`) và trang theo dõi của độc giả (`DocGiaXemSachDaMuon.vue`, `YeuCauTraSachTuDocGia.vue`) đều đọc trực tiếp từ `localStorage`.
  - **Hệ quả:** Dữ liệu chỉ nằm trên 1 máy / 1 trình duyệt. Nếu nhân viên đăng nhập trên máy khác sẽ không thấy đơn mượn của độc giả. Nếu độc giả xoá cache trình duyệt thì mất toàn bộ lịch sử.
- **Giải pháp tối ưu:**
  - Tạo một MongoDB Schema `BorrowRequest` hoặc mở rộng bảng `Transaction` (`THEODOIMUONSACH`) với các trường:
    ```javascript
    {
      MADOCGIA: String,
      MASACH: String,
      NGAYDANGKY: { type: Date, default: Date.now },
      TRANGTHAI: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected', 'return_requested', 'returned'], 
        default: 'pending' 
      },
      MSNV_DUYET: String,
      NGAYDUYET: Date,
      NGAYTRA: Date
    }
    ```
  - Xây dựng các API RESTful:
    - `POST /api/borrow-requests`: Độc giả gửi yêu cầu mượn.
    - `GET /api/borrow-requests/my-requests`: Độc giả xem lịch sử đơn mượn của mình.
    - `GET /api/borrow-requests/pending`: Nhân viên xem danh sách các đơn đang chờ duyệt.
    - `PUT /api/borrow-requests/:id/approve` và `/reject`: Nhân viên duyệt hoặc từ chối đơn.
    - `PUT /api/borrow-requests/:id/request-return`: Độc giả yêu cầu trả sách.

---

## 2. 🔐 BẢO MẬT & XÁC THỰC (SECURITY & AUTHENTICATION)

### 2.1. Mã hóa mật khẩu (Password Hashing)
- **Vấn đề hiện tại:** Mật khẩu độc giả và nhân viên đang lưu dưới dạng văn bản thô (Plain text) trong CSDL.
- **Giải pháp tối ưu:**
  - Sử dụng thư viện `bcryptjs` (đã có sẵn trong `package.json`).
  - Trước khi lưu vào DB: `const hashPassword = await bcrypt.hash(rawPassword, 10);`.
  - Khi đăng nhập: `const isMatch = await bcrypt.compare(Password, user.Password);`.

### 2.2. Triển khai Xác thực JWT (JSON Web Token) & Route Guard
- **Vấn đề hiện tại:** Trạng thái đăng nhập chỉ lưu tên thô vào `localStorage.setItem('HoTenNV', ...)`, người dùng có thể chỉnh sửa `localStorage` hoặc gõ thẳng URL để truy cập các trang nội bộ mà không có phiên làm việc an toàn.
- **Giải pháp tối ưu:**
  - Khi đăng nhập thành công, Backend trả về một chuỗi `token` (JWT) chứa `id`, `role` và thời gian hết hạn.
  - Cài đặt Vue Router Navigation Guard (`router.beforeEach`) trên Frontend để kiểm tra token và phân quyền trước khi cho phép vào các trang quản trị (`AdminLogin`, `ThemSach`, `DanhSachDonDangKyMuon`,...).

### 2.3. Quản lý Admin bằng CSDL thay vì Hardcode
- **Vấn đề hiện tại:** Trong `staffControllers.js`, danh sách tài khoản Admin đang được fix cứng trong mã nguồn (`['Lê Quốc Bảo', 'Lê Thị Thu Hà']`).
- **Giải pháp tối ưu:**
  - Tạo bảng `Account` hoặc thêm trường `Role: 'admin' | 'staff' | 'reader'` trong CSDL để dễ dàng cấp quyền, đổi mật khẩu và quản lý động.

---

## 3. ⚡ TỐI ƯU HIỆU NĂNG BACKEND (PERFORMANCE & API DESIGN)

### 3.1. Phân trang phía Server (Server-Side Pagination)
- **Vấn đề hiện tại:** Các API `getAllBooks`, `getAllReader`, `getAllStaff` đang tải toàn bộ dữ liệu từ database về frontend (`find()`), sau đó frontend mới cắt mảng (`.slice()`) để phân trang.
- **Hệ quả:** Khi số lượng sách/độc giả lên đến hàng nghìn bản ghi, thời gian phản hồi API và dung lượng truyền tải mạng sẽ rất lớn.
- **Giải pháp tối ưu:**
  - Triển khai phân trang tại MongoDB:
    ```javascript
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const total = await Book.countDocuments();
    res.json({ total, page, totalPages: Math.ceil(total / limit), data: books });
    ```

### 3.2. Tìm kiếm với Text Index & Regex tối ưu
- Tạo Index trong MongoDB cho các trường thường xuyên tìm kiếm như `MASACH`, `TENSACH`, `MADOCGIA`, `HoTenNV` để tăng tốc độ truy vấn gấp nhiều lần.

---

## 4. 🎨 TỐI ƯU TRẢI NGHIỆM FRONTEND (UI/UX & SPA)

### 4.1. Chuẩn hóa điều hướng hoàn toàn bằng Vue Router
- **Vấn đề hiện tại:** Một số hàm quay lại / chuyển trang tại các component (`ThemDocGia.vue`, `ThemSach.vue`, `ThemNhaXuatBan.vue`) vẫn sử dụng `window.location.href`.
- **Giải pháp tối ưu:**
  - Thay toàn bộ bằng `this.$router.push('/...')` để trang web chuyển đổi tức thì, giữ nguyên trạng thái SPA mà không bị reload lại tài nguyên CSS/JS.

### 4.2. Tối ưu hóa Layout & Tính tương thích thiết bị (Responsive)
- **Vấn đề hiện tại:** Một số trang sử dụng chiều cao cố định lớn (`height: 1400px;`, `height: 1600px;`) hoặc khoảng cách cứng (`padding-left: 550px;`), gây ra khoảng trắng thừa hoặc vỡ giao diện trên màn hình nhỏ.
- **Giải pháp tối ưu:**
  - Sử dụng `min-height: 100vh;` kết hợp Flexbox / Bootstrap Grid (`row`, `col-md-...`) để nội dung co giãn tự nhiên theo kích thước màn hình máy tính bảng và điện thoại.

### 4.3. Nâng cấp thông báo từ `alert()` sang Toast/Popup hiện đại
- **Vấn đề hiện tại:** Dự án đang sử dụng hàm mặc định của trình duyệt: `alert('Đăng nhập thành công')`, `alert('Lỗi...')` làm gián đoạn trải nghiệm người dùng.
- **Giải pháp tối ưu:**
  - Tích hợp thư viện thông báo nhẹ nhàng như `vue-toastification` hoặc `SweetAlert2` để hiển thị thông báo đẹp mắt, tự biến mất sau 2-3 giây.

### 4.4. Xử lý ảnh sách (Image Fallback / Placeholder)
- Thêm ảnh bìa mặc định khi đường dẫn `LINKANH` bị lỗi hoặc trống:
  ```html
  <img :src="book.LINKANH || require('@/assets/default-book.png')" @error="$event.target.src = require('@/assets/default-book.png')" />
  ```

---

## 5. 📦 TỔNG KẾT THỨ TỰ ƯU TIÊN NÂNG CẤP

| Thứ tự | Hạng mục tối ưu | Mức độ ưu tiên | Lợi ích mang lại |
| :---: | :--- | :---: | :--- |
| **1** | Chuyển luồng mượn/trả sách từ `localStorage` sang MongoDB | ⭐⭐⭐⭐⭐ **Cao nhất** | Dữ liệu đồng bộ tập trung, không bị mất khi đổi máy |
| **2** | Băm mật khẩu (Bcrypt) & Phân quyền bảo mật | ⭐⭐⭐⭐ **Cao** | Đảm bảo an toàn thông tin người dùng |
| **3** | Phân trang phía Server (Server-side Pagination) | ⭐⭐⭐ **Trung bình** | Tối ưu tốc độ tải khi dữ liệu lớn |
| **4** | Nâng cấp Toast Notifications thay thế `alert()` | ⭐⭐⭐ **Trung bình** | Giao diện hiện đại, trải nghiệm mượt mà |
| **5** | Chuẩn hóa Responsive & Layout động | ⭐⭐ **Thấp** | Hiển thị đẹp trên mọi kích thước màn hình |

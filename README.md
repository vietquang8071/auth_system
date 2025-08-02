# Hệ thống đăng nhập và phân quyền đơn giản
Hệ thống đăng nhập và phân quyền admin user cơ bản, sử dụng giả dữ liệu users là một danh sách


## 🚀 Tính năng chính

- ✅ Đăng nhập bằng email và mật khẩu
- ✅ Phân quyền người dùng (admin, user)
- ✅ Sử dụng `session` để duy trì đăng nhập
- ✅ Middleware kiểm tra quyền truy cập
- ✅ Không sử dụng database – dữ liệu người dùng giả lập

## 📁 Cấu trúc thư mục

.
├── src/
│ ├── data/ # Danh sách người dùng giả lập (users.js)
│ ├── middlewares/ # Middleware xử lý xác thực và phân quyền
│ ├── routes/ # Các route chính: /auth, /admin, /user
│ ├── strategies/ # Cấu hình Passport Strategy (local-strategy.js)
│ ├── utils/ # Hàm tiện ích (hashing, compare password...)
│ └── app.js # File chính khởi tạo server Express
├── .gitignore
└── README.md


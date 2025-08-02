# Hệ thống đăng nhập và phân quyền đơn giản
Hệ thống đăng nhập và phân quyền admin user cơ bản, sử dụng giả dữ liệu users là một danh sách


## 🚀 Tính năng chính

- ✅ Đăng nhập bằng email và mật khẩu
- ✅ Phân quyền người dùng (admin, user)
- ✅ Sử dụng `session` để duy trì đăng nhập
- ✅ Middleware kiểm tra quyền truy cập
- ✅ Không sử dụng database – dữ liệu người dùng giả lập
# Cấu trúc thư mục
.
├── src/
│   ├── data/           # Chứa dữ liệu người dùng giả lập (users.js)
│   ├── middlewares/    # Middleware xác thực, phân quyền
│   ├── routes/         # Các route của hệ thống (auth, user, admin)
│   ├── strategies/     # Cấu hình Passport (local strategy)
│   ├── utils/          # Hàm tiện ích: mã hóa, so sánh mật khẩu,...
│   └── app.js          # File chính khởi chạy ứng dụng Express
├── .gitignore          
└── README.md           

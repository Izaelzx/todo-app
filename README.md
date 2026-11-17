# 📝 Todo App

Ứng dụng quản lý công việc đơn giản, viết bằng HTML, CSS và JavaScript thuần (không cần framework, không cần cài đặt).

## Tính năng

- Thêm, xóa, đánh dấu hoàn thành công việc
- Nhấp đúp để sửa nội dung (Enter để lưu, Esc để hủy)
- Lọc: Tất cả / Đang làm / Hoàn thành
- Xóa nhanh các việc đã xong
- Tự động lưu bằng `localStorage`, tải lại trang vẫn còn dữ liệu
- Giao diện responsive, dùng được trên điện thoại

## Cách chạy

```bash
git clone https://github.com/<ten-cua-ban>/todo-app.git
cd todo-app
```

Sau đó mở file `index.html` bằng trình duyệt. Hoặc chạy server cục bộ:

```bash
python -m http.server 8000
# mở http://localhost:8000
```

## Triển khai bằng GitHub Pages

1. Vào **Settings → Pages** của repository
2. Ở mục **Source**, chọn nhánh `main` và thư mục `/ (root)`
3. Lưu lại, sau vài phút trang sẽ có tại `https://<ten-cua-ban>.github.io/todo-app/`

## Cấu trúc thư mục

```
todo-app/
├── index.html   # Giao diện
├── style.css    # Kiểu dáng
├── app.js       # Logic ứng dụng
├── README.md
├── LICENSE
└── .gitignore
```

## Giấy phép

Phát hành theo giấy phép [MIT](LICENSE).

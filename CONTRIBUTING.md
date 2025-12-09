# Contributing to DevOrbit

Xin chào! Rất vui vì bạn đã quan tâm và muốn đóng góp cho **DevOrbit**.

Chúng mình (mình) rất hoan nghênh mọi sự đóng góp, từ việc sửa lỗi nhỏ, cải thiện tài liệu, cho đến những tính năng mới toanh.

## 🚀 Bắt đầu nhanh

Để đóng góp code, bạn làm theo các bước cơ bản sau nhé:

1.  **Fork** repository này về tài khoản GitHub của bạn.
2.  **Clone** fork của bạn về máy:
    ```bash
    git clone https://github.com/trahoangdev/dev-orbit.git
    cd dev-orbit
    ```
3.  **Cài đặt dependencies**:
    ```bash
    npm install
    ```
4.  **Chạy thử nghiệm** (Development Server):
    ```bash
    npm run dev
    ```
    Truy cập `http://localhost:3000` để xem kết quả.

## 🛠 Quy trình Pull Request (PR)

1.  Tạo một branch mới từ `main` cho tính năng hoặc bản sửa lỗi của bạn:
    ```bash
    git checkout -b feature/ten-tinh-nang-moi
    # hoặc
    git checkout -b fix/loi-can-sua
    ```
2.  Thực hiện thay đổi code (hãy chắc chắn code chạy ổn và không gây lỗi nhé).
3.  Commit thay đổi của bạn với message rõ ràng, dễ hiểu:
    ```bash
    git commit -m "feat: thêm tính năng ABC"
    # hoặc
    git commit -m "fix: sửa lỗi hiển thị header"
    ```
4.  Push lên fork của bạn:
    ```bash
    git push origin feature/ten-tinh-nang-moi
    ```
5.  Vào GitHub và tạo **Pull Request** về repository gốc.

## 🎨 Code Style

Dự án này sử dụng:
*   **Next.js 14+** (App Router)
*   **TypeScript**
*   **Tailwind CSS**
*   **ESLint & Prettier** để format code.

Vui lòng đảm bảo code của bạn tuân thủ các quy chuẩn này để giữ cho source code luôn sạch đẹp và đồng bộ.

## 🐞 Báo lỗi (Issues)

Nếu bạn tìm thấy bug hoặc có ý tưởng mới, đừng ngần ngại tạo một [Issue](https://github.com/trahoangdev/blog-starter-app/issues) nhé. Hãy mô tả chi tiết vấn đề và kèm theo ảnh chụp màn hình nếu có thể.

Cảm ơn bạn đã đóng góp! Happy Coding! 🚀

# DevOrbit — Blog & Portfolio by trahoangdev

**DevOrbit** là không gian cá nhân của mình - nơi chia sẻ kiến thức lập trình, lưu trữ các dự án cá nhân và hành trình phát triển sự nghiệp Fullstack Developer. Dự án được xây dựng dựa trên Next.js (App Router), Markdown và TailwindCSS với giao diện hiện đại, tối giản.

## 🌟 Tính năng nổi bật

- **Blog Engine mạnh mẽ**: Viết bài bằng Markdown, hỗ trợ syntax highlighting, tối ưu SEO.
- **Giao diện hiện đại**: Thiết kế theo phong cách tối giản, chú trọng trải nghiệm đọc (Typography), responsive trên mọi thiết bị.
- **Hệ thống bình luận**: Tích hợp **Giscus** (GitHub Discussions) cho phép độc giả thảo luận trực tiếp.
- **Trang giới thiệu (About)**: Profile chi tiết với Tech Stack được trực quan hóa bằng icon sinh động (Java, Spring Boot, Next.js, v.v.).
- **Chứng chỉ (Certificates)**: Khu vực trưng bày các chứng chỉ chuyên môn và thành tích học tập.
- **Tiện ích**: Nút cuộn lên đầu trang (Scroll to Top), Modal thông tin dự án (Project Info), Dark Mode.
- **Chất lượng Code (Engineering)**:
  - Tự động Format code với **Prettier**.
  - **Husky** & **Lint-staged** ngăn chặn bad commit.
  - **Vitest** cho Unit Testing nhanh chóng.
  - **GitHub Actions** tự động hóa quy trình CI/CD.

## 🛠 Công nghệ sử dụng

- **Core**: Next.js 15 (App Router), React 19, TypeScript.
- **Styling**: TailwindCSS 3.4.
- **Content**: Markdown, remarks/html.
- **Icons**: `tech-stack-icons` (cho Tech Stack), SVG icons.
- **Deployment**: Vercel.
- **Comments**: Giscus.
- **PWA**: Hỗ trợ cài đặt ứng dụng trên desktop/mobile.
- **Social Share**: Chia sẻ bài viết lên Facebook, Twitter, LinkedIn.
- **Code Quality**: Prettier, Husky, Lint-staged.
- **Testing**: Vitest, React Testing Library.
- **CI/CD**: GitHub Actions.

## 📂 Cấu trúc thư mục

- `src/app` – Chứa Source code chính:
  - `_components`: Các UI component tái sử dụng (Header, Footer, Container, Comments...).
  - `about`: Trang giới thiệu.
  - `certificates`: Trang chứng chỉ.
  - `posts`: Dynamic route cho bài viết chi tiết.
- `src/lib` – Các hàm xử lý logic (đọc file bài viết, convert markdown).
- `src/interfaces` – Định nghĩa TypeScript interfaces/types.
- `_posts` – Kho lưu trữ bài viết (Markdown file).
- `public` – Tài nguyên tĩnh (hình ảnh, logo, favicon).

## 🚀 Chạy dự án

Cài đặt dependencies:

```bash
npm install
```

Chạy môi trường phát triển:

```bash
npm run dev
# Truy cập http://localhost:3000
```

Build cho production:

```bash
npm run build
npm run build
npm start
```

Kiểm tra chất lượng code:

```bash
# Format code
npm run format

# Chạy Unit Test
npm test

# Phân tích Bundle size
npm run analyze
```

## ✍️ Viết bài mới

1. Tạo file Markdown trong thư mục `_posts`, ví dụ `_posts/new-post.md`.
2. Thêm front-matter vào đầu file:

```yaml
---
title: "Tiêu đề bài viết"
excerpt: "Mô tả ngắn gọn về nội dung bài viết để hiển thị preview."
coverImage: "/assets/blog/cover-image.jpg"
date: "2025-12-10"
author:
  name: Hoàng Trọng Trà
  picture: "/assets/blog/authors/tra2.png"
ogImage:
  url: "/assets/blog/cover-image.jpg"
---
Nội dung bài viết sử dụng cú pháp Markdown...
```

## 🤝 Đóng góp (Contributing)

Mọi sự đóng góp đều được hoan nghênh! Vui lòng xem chi tiết tại file [CONTRIBUTING.md](CONTRIBUTING.md).

## Giấy phép (License)

Dự án này được cấp phép dưới [MIT License](LICENSE).

## ☕ Donate/Sponsor

Nếu bạn thấy dự án này hữu ích, hãy cân nhắc mời mình một ly cà phê nhé! Sự ủng hộ của bạn là động lực để mình duy trì và phát triển thêm nhiều nội dung chất lượng.

<a href="https://www.buymeacoffee.com/trahoangdev" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## 🌐 Kết nối

- **GitHub**: [trahoangdev](https://github.com/trahoangdev)
- **Facebook**: [trahoangdev](https://www.facebook.com/trahoangdev)
- **LinkedIn**: [Hoàng Trọng Trà](https://www.linkedin.com/in/trahoangdev/)
- **Email**: [trahoangdev@gmail.com](mailto:trahoangdev@gmail.com)

---

© 2025 DevOrbit. Built with ❤️ by trahoangdev.

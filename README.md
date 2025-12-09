# DevOrbit — blog by trahoangdev

DevOrbit là blog cá nhân của **trahoangdev**, dựng tĩnh với Next.js (App Router), Markdown và TailwindCSS. Nội dung được lưu trong Markdown để dễ soạn thảo và version control.

## Công nghệ chính
- Next.js 15 (App Router), React 19 RC, TypeScript.
- TailwindCSS 3.4, PostCSS/Autoprefixer.
- Markdown -> HTML qua remark/remark-html; front-matter đọc bằng gray-matter.

## Cấu trúc thư mục
- `src/app` – trang chủ, trang bài viết, layout và các component giao diện.
- `src/lib` – hàm đọc bài (`api.ts`), chuyển Markdown (`markdownToHtml.ts`), hằng số (`constants.ts`).
- `src/interfaces` – định nghĩa kiểu `Post`, `Author`.
- `_posts` – nơi lưu các bài viết Markdown.
- `public` – static assets, favicon/OG.

## Chạy dự án
```bash
npm install
npm run dev
# mở http://localhost:3000
```

Build & production:
```bash
npm run build
npm start
```

## Viết bài mới
1) Tạo file Markdown trong `_posts`, ví dụ `_posts/hello-world.md`.  
2) Thêm front-matter tối thiểu:
```
---
title: Hello World
date: "2025-01-01"
coverImage: "/assets/blog/hello-world/cover.jpg"
excerpt: Ngắn gọn nội dung bài.
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
author:
  name: trahoangdev
  picture: "/assets/authors/trahoangdev.jpg"
---

Nội dung bài viết ở đây...
```
3) Ảnh nên đặt dưới `public/assets/...` và tham chiếu bằng đường dẫn tuyệt đối bắt đầu `/`.

## Theming
- Hiện tại theme switcher đã ẩn khỏi layout. Có thể kích hoạt lại bằng cách render `ThemeSwitcher` trong `src/app/layout.tsx`.

## Triển khai
- Có thể deploy lên Vercel hoặc bất kỳ nền tảng tĩnh nào (Next.js SSR disabled). Lệnh build: `npm run build`.

## Ghi chú
- Mã nguồn gốc dựa trên Next.js blog-starter, đã được tùy biến cho DevOrbit. Nếu phát hiện lỗi hoặc cần thêm tính năng, mở issue/PR trực tiếp. 

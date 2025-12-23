# Checklist Cải Thiện Dự Án DevOrbit

## 1. Cấu trúc & Cấu hình Dự án (Project Configuration)
- [x] **PWA Support**: Thêm file `public/manifest.json` và cấu hình icons để hỗ trợ cài đặt ứng dụng (Progressive Web App).
- [x] **Error Handling**: Thêm file `src/app/error.tsx` (và `global-error.tsx`) để xử lý lỗi giao diện người dùng một cách chuyên nghiệp thay vì để trang trắng hoặc lỗi mặc định.
- [x] **SEO Conflicts**: Đã xử lý (Xóa `public/robots.txt` và `public/sitemap.xml` tĩnh, tắt sitemap generator trong script để ưu tiên App Router Metadata API).
- [x] **Security**: Đã chạy `npm audit fix` để vá các lỗ hổng bảo mật.
- [x] **Loading States**: `loading.tsx` đã có Skeleton UI cho Header và Hero Post.
- [x] **Bình luận (Comments)**: Đã kiểm tra cấu hình Giscus (khớp với repo `trahoangdev/dev-orbit`).
- [x] **Bài viết liên quan (Related Posts)**: Đã được implement trong `src/app/posts/[slug]/page.tsx` và `src/lib/api.ts`.
- [ ] **Mục lục (Table of Contents)**: Kiểm tra `table-of-contents.tsx`, đảm bảo nó hoạt động tốt với các bài viết dài và scroll spy (highlight mục đang đọc).

## 5. Chất lượng Code (Code Quality)
- [x] **Image Optimization**: Kiểm tra việc sử dụng `next/image` đã tối ưu thuộc tính `sizes` và `priority` cho các ảnh quan trọng (LCP) chưa.
- [x] **Font Loading**: Đã kiểm tra `src/app/layout.tsx`. Sử dụng `next/font/google` (Inter) đã tối ưu (preload, swap).
- [ ] **Testing**: Cân nhắc thêm Unit Test (Jest/Vitest) cho các hàm utility trong `src/lib`.
- [ ] **Type Checking**: Rà soát `any` type trong TypeScript, định nghĩa interface rõ ràng cho dữ liệu Post/Author.
- [ ] **Refactoring**: Tách nhỏ các component lớn nếu cần thiết.

## 6. Tài liệu (Documentation)
- [x] **README.md**: Cập nhật hướng dẫn cài đặt, biến môi trường (Environment Variables) cần thiết, và các tính năng mới (PWA, Social Share).
- [ ] **CHANGELOG**: Theo dõi các thay đổi lớn của dự án.

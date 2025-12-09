---
title: "Next.js & Spring Boot: Chuyện tích hợp Frontend - Backend"
excerpt: "Xử lý CORS, cấu hình Proxy, quản lý biến môi trường và thiết kế Fetch Wrapper Type-safe khi kết nối Next.js với Java API."
coverImage: "/assets/blog/preview/nextjs-frontend-call-java-api.png"
date: "2025-12-06"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/nextjs-frontend-call-java-api.png"
tags: ["nextjs", "java", "fullstack", "spring-boot"]
---

Trong mô hình Modern Web App, chúng ta thường tách đôi giang sơn: Backend (Spring Boot/Java) chạy port 8080, Frontend (Next.js) chạy port 3000.
Và kịch bản quen thuộc xảy ra: **CORS Error** đỏ lòm console. 🛑

## 1. CORS: Kẻ thù hay Người bạn?

CORS (Cross-Origin Resource Sharing) là cơ chế bảo mật của trình duyệt, ngăn chặn trang web A gọi API của trang web B.

**Cách giải quyết:**

*   **Cách 1: Cho phép từ Backend (Spring Boot)**
    ```java
    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000") // Chỉ định rõ domain Frontend
                    .allowedMethods("GET", "POST", "PUT", "DELETE");
        }
    }
    ```
    Đây là cách chuẩn cho Production.

*   **Cách 2: Next.js Rewrite (Proxy)**
    Trong `next.config.js`, ta có thể đánh lừa trình duyệt:
    ```js
    async rewrites() {
        return [
          { source: '/api/:path*', destination: 'http://localhost:8080/api/:path*' }
        ]
    }
    ```
    Lúc này Frontend gọi `/api/users`, Next.js server sẽ âm thầm gọi sang Java. Trình duyệt không hề biết chuyện này -> **Không bị CORS**.

## 2. Quản lý biến môi trường (Environment Variables)

Đừng hardcode `http://localhost:8080` trong code!

Tạo file `.env.local`:
```properties
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```
Lưu ý: Tiền tố `NEXT_PUBLIC_` là bắt buộc nếu bạn muốn biến này hiển thị ở phía Client (Browser). Nếu không có, nó chỉ đọc được ở Server Side (Node.js).

## 3. Server Component vs Client Component Fetching

Next.js 13+ (App Router) thay đổi cách chúng ta fetch data.

*   **Server Component (Mặc định):**
    ```tsx
    async function UsersPage() {
      // Chạy trực tiếp trên server Next.js -> Gọi thẳng tới Java Backend
      // Không lo CORS (vì Server-to-Server), bảo mật API Key tốt hơn.
      const res = await fetch(`${process.env.API_URL}/users`, { cache: 'no-store' });
      const users = await res.json();
      return <div>...</div>;
    }
    ```

*   **Client Component (`"use client"`):**
    Dùng khi cần tương tác (onClick, useEffect). Lúc này fetch chạy trên trình duyệt -> Cần xử lý CORS như mục 1. Nên dùng thư viện như **React Query (TanStack Query)** để quản lý state, caching, re-fetch.

## 4. Xây dựng Type-safe Fetch Wrapper

Đừng dùng `fetch` trần trụi. Hãy viết một wrapper để tự động gắn Token và xử lý lỗi.

```typescript
// utils/http.ts
async function http<T>(path: string, config?: RequestInit): Promise<T> {
  const token = localStorage.getItem("accessToken");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...config?.headers,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...config,
    headers,
  });

  if (!res.ok) {
    // Xử lý lỗi tập trung: 401 logout, 500 show toast...
    throw new Error("API Error");
  }
  return res.json();
}

// Sử dụng:
const user = await http<UserDTO>("/users/1"); // Có type check UserDTO
```

## Tổng kết

Tích hợp Frontend-Backend không khó, nhưng cần hiểu rõ luồng đi của dữ liệu. Ưu tiên **Server Fetching** trong Next.js để giảm tải cho client và đơn giản hóa vấn đề CORS/Authentication.

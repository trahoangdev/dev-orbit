---
title: "Next.js & Spring Boot: Kiến trúc tích hợp Frontend - Backend chuẩn Enterprise"
excerpt: "Xử lý triệt để vấn đề CORS, bảo mật API Key với Server Component, mô hình BFF (Backend for Frontend) và xây dựng Type-safe Http Client."
coverImage: "/assets/blog/preview/nextjs-frontend-call-java-api.png"
date: "2025-12-06"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/nextjs-frontend-call-java-api.png"
tags: ["nextjs", "java", "fullstack", "spring-boot", "architecture"]
---

Trong thế giới Modern Web Development, việc tách biệt **Frontend (Next.js/React)** và **Backend (Spring Boot/Java)** đang là tiêu chuẩn (Microservices hoặc Headless Architecture). Tuy nhiên, khi ghép đôi hai "kẻ khổng lồ" này, chúng ta thường gặp vô số vấn đề đau đầu: CORS, Authentication State, bảo mật API Key, v.v.

Bài viết này sẽ hướng dẫn bạn xây dựng một kiến trúc giao tiếp vững chắc, bảo mật và dễ bảo trì.

## 1. CORS (Cross-Origin Resource Sharing): Kẻ thù số 1

Kịch bản kinh điển: Frontend chạy `localhost:3000`, Backend chạy `localhost:8080`.
Frontend gọi API -> Trình duyệt chặn lại và hét vào mặt bạn: `Access to fetch at ... from origin ... has been blocked by CORS policy`.

### Giải pháp 1: Cấu hình phía Spring Boot (Production Recommended)
Đây là cách chính thống. Backend phải chủ động cho phép Frontend truy cập.

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Áp dụng cho mọi API
                        .allowedOrigins("https://devorbit.vercel.app", "http://localhost:3000") // Whitelist domain
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true) // Cho phép gửi cookie/auth
                        .maxAge(3600);
            }
        };
    }
}
```

### Giải pháp 2: Next.js Rewrite (Proxy - Development Trick)
Nếu bạn lười config Backend hoặc muốn giấu địa chỉ API thật, hãy dùng tính năng `Rewrites` của Next.js. Next.js server sẽ đứng giữa làm Proxy trung gian.

`next.config.js`:
```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Frontend gọi tới /api/users
        destination: 'http://localhost:8080/api/:path*', // Next.js chuyển tiếp sang 8080
      },
    ]
  },
}
```
-> **Lợi ích**: Trình duyệt thấy Frontend gọi `localhost:3000/api/...` (chung origin) nên không check CORS.

## 2. Server Components: Cuộc cách mạng về Data Fetching

Next.js 13+ mang đến **App Router** và **React Server Components (RSC)**. Đây là game changer.

### Vấn đề của Client-side Fetching (Truyền thống)
1.  Lộ API URL và logic gọi API trên browser.
2.  Phụ thuộc vào mạng client (chậm).
3.  Vấn đề Waterfall (gọi API cha xong mới gọi API con).

### Giải pháp: Fetch trên Server
Fetch data trực tiếp trong Component (mặc định là Server Component). Code này chạy trên Node.js server của Next.js, **không bao giờ gửi xuống browser**.

```tsx
// app/dashboard/page.tsx
// Đây là async component chạy trên server
export default async function DashboardPage() {
  // Gọi trực tiếp tới Java Backend qua mạng nội bộ (hoặc internet)
  // Không lo CORS vì là Server-to-Server communication!
  // API Key này an toàn tuyệt đối, client không bao giờ biết.
  const res = await fetch(`${process.env.INTERNAL_API_URL}/stats/daily`, {
    headers: {
        'X-API-KEY': process.env.SECRET_API_KEY 
    },
    next: { revalidate: 60 } // Cache kết quả 60 giây (ISR)
  });
  
  const stats = await res.json();

  return (
    <div className="p-4">
      <h1>Hôm nay có {stats.visitors} người truy cập</h1>
    </div>
  );
}
```

## 3. Quản lý Authentication: Cookie vs Header

Khi Frontend và Backend tách rời, Authentication là bài toán khó.

*   **Header (Bearer Token)**: Dễ triển khai, nhưng phải lưu token ở LocalStorage (dễ bị XSS).
*   **HttpOnly Cookie**: An toàn nhất, Browser tự động gửi, JS không đọc được.

**Mô hình đề xuất (BFF Pattern - Backend for Frontend):**

1.  Next.js tạo một Route Handler `/api/auth/login`.
2.  Client post username/password lên Next.js.
3.  Next.js gọi sang Spring Boot lấy JWT.
4.  Next.js set **HttpOnly Cookie** chứa JWT vào response trả về Client.
5.  Các request sau từ Client lên Next.js (qua Server Action hoặc Middleware), Next.js đọc Cookie, lấy JWT và gắn vào Header `Authorization` để gọi Spring Boot.

-> Spring Boot vẫn dùng Bearer Token (Stateless), nhưng Client Web dùng Cookie (Secure). Next.js đứng giữa làm cầu nối chuyển đổi. An toàn tuyệt đối!

## 4. Xây dựng Type-safe Http Client

Đừng rải rác `fetch` khắp nơi. Hãy tập trung nó lại và sử dụng TypeScript Generics.

```typescript
// lib/http.ts
type ApiConfig = RequestInit & {
  // Thêm custom config nếu cần
};

async function http<T>(path: string, config?: ApiConfig): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; // Client side only

  const response = await fetch(`${baseUrl}${path}`, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config?.headers,
    },
  });

  if (!response.ok) {
    // Centralized Error Handling
    if (response.status === 401) {
        // Redirect to login or refresh token logic
    }
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Có lỗi xảy ra');
  }

  return response.json();
}

// Sử dụng
interface User {
    id: number;
    name: string;
}

// Hàm này trả về Promise<User> -> Auto-completetion xịn xò
const getUser = (id: number) => http<User>(`/users/${id}`);
```

## Tổng kết

Việc tích hợp Next.js và Spring Boot đòi hỏi tư duy về mặt kiến trúc hệ thống chứ không chỉ là code. Hãy tận dụng sức mạnh của **Server Components** để bảo mật và tối ưu hiệu năng, đồng thời cân nhắc kỹ lưỡng chiến lược CORS và Authentication phù hợp.

Combo **Next.js (Frontend đỉnh cao)** + **Spring Boot (Backend vững chãi)** chính là vũ khí tối thượng của Fullstack Developer hiện tại.

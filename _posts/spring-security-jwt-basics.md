---
title: "Spring Security & JWT: Cơ chế Authentication hiện đại"
excerpt: "Giải mã kiến trúc stateless của JWT, cách hoạt động của Security Filter Chain và tại sao bạn cần Refresh Token."
coverImage: "/assets/blog/preview/spring-security-jwt-basics.png"
date: "2025-12-08"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/spring-security-jwt-basics.png"
tags: ["java", "spring-security", "security", "jwt"]
---

Nếu bạn đang xây dựng REST API cho Mobile App hoặc Single Page App (React/Angular), **Session-based Authentication** (truyền thống) không còn phù hợp. Chúng ta cần một cơ chế **Stateless** (phi trạng thái), và **JWT (JSON Web Token)** là tiêu chuẩn vàng.

## 1. Tại sao lại là Stateless?

*   **Session**: Server lưu thông tin đăng nhập trong RAM (HttpSession). Nếu hệ thống có 1 triệu user -> Tốn RAM. Nếu scale ra nhiều server -> Phải đồng bộ session (Redis Session).
*   **JWT (Stateless)**: Server **KHÔNG** lưu gì cả. Tất cả thông tin (User ID, Role, Hạn dùng) được gói gọn trong cái chuỗi Token string và đưa cho Client giữ.
    *   Mỗi request, Client gửi kèm token.
    *   Server chỉ cần kiểm tra chữ ký (Signature) xem token có bị fake không.

## 2. Kiến trúc Spring Security Filter Chain

Spring Security thực chất là một chuỗi các Filter (Bộ lọc) chặn trước cửa Controller.

Request ---> [Filter 1] ---> [Filter 2] ---> **[JwtAuthenticationFilter]** ---> [Filter N] ---> Controller

Chúng ta cần viết một class `JwtAuthenticationFilter` extends `OncePerRequestFilter`:

1.  Lấy Header `Authorization: Bearer <token>`.
2.  Parse token, validate chữ ký.
3.  Lấy username từ token -> Load UserDetails từ DB (hoặc build cứng).
4.  Lưu vào `SecurityContextHolder`.

```java
// Khi SecurityContext có User, Spring coi như request này đã đăng nhập
SecurityContextHolder.getContext().setAuthentication(authentication);
```

## 3. Access Token & Refresh Token: Bộ đôi hoàn hảo

Nếu Access Token có hạn vĩnh viễn -> Hacker trộm được token coi như toang hệ thống.
Nếu Access Token hạn ngắn (5 phút) -> User phải đăng nhập lại liên tục -> Trải nghiệm tệ.

**Giải pháp:**
*   **Access Token**: Hạn 15 phút. Dùng để gọi API tài nguyên.
*   **Refresh Token**: Hạn 7-30 ngày. Chỉ dùng để... **xin Access Token mới**.

**Quy trình:**
1.  Login -> Trả về Access + Refresh Token.
2.  Client gọi API với Access Token.
3.  Access Token hết hạn -> API trả về 401.
4.  Client âm thầm gọi `/api/auth/refresh-token` gửi Refresh Token lên.
5.  Server check Refresh Token (còn hạn, đúng user) -> Cấp Access Token mới.
6.  Client retry lại API ban đầu. User không hề biết gì cả.

## 4. Lưu Token ở đâu cho an toàn?

*   **LocalStorage**: Dễ bị tấn công XSS (Cross-Site Scripting). JS độc hại có thể đọc trộm token.
    *   *Solution:* Dùng `HttpOnly Cookie` cho Refresh Token. Cookie này JS không đọc được, chỉ trình duyệt tự gửi đi. Access Token vẫn có thể để memory variable hoặc LocalStorage (chấp nhận rủi ro thấp hơn).

## Tổng kết

Triển khai Spring Security với JWT thoạt đầu khá rắc rối (với đống config `SecurityFilterChain`), nhưng nó đem lại khả năng mở rộng tuyệt vời. Hãy nhớ: **Không bao giờ tin tưởng Client**, luôn validate token chặt chẽ ở mọi request.

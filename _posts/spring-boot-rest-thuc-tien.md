---
title: "Spring Boot REST API: Những sai lầm 'chí mạng' của Newbie"
excerpt: "Đừng chỉ trả về 200 OK cho mọi thứ. Học cách xây dựng REST API chuẩn mực với DTO Pattern, Global Exception Handler và Response Wrapping."
coverImage: "/assets/blog/preview/spring-boot-rest-thuc-tien.png"
date: "2025-12-07"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/spring-boot-rest-thuc-tien.png"
tags: ["java", "spring-boot", "backend", "api"]
---

Khi mới học Spring Boot, chúng ta thường viết Controller kiểu "mì ăn liền": Gọi Repository, lấy Entity, trả về `ResponseEntity.ok(entity)`. Chạy ngon lành!

Nhưng trong dự án thực tế, cách làm này chứa đựng vô số rủi ro. Hãy cùng xem các sai lầm phổ biến và cách khắc phục.

## 1. Expose Entity trực tiếp ra API
**Sai lầm:** Trả về trực tiếp `@Entity` (JPA Entity) cho Client.
```java
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id).get();
}
```

**Hậu quả:**
*   **Lộ thông tin nhạy cảm:** Mật khẩu hash, lương, thông tin nội bộ có thể vô tình bị serialize thành JSON gửi về client.
*   **Infinite Recursion:** Nếu Entity có quan hệ 2 chiều (`@OneToMany`, `@ManyToOne`), Jackson sẽ lặp vô tận (StackOverflowError).
*   **Tight Coupling:** Sửa DB schema làm thay đổi luôn cấu trúc API, làm vỡ Client App.

**Giải pháp: DTO (Data Transfer Object)**
Luôn luôn map Entity sang DTO trước khi trả về.
```java
public class UserDTO {
    private String username;
    private String email;
    // Không bao gồm password hay internalStatus
}
// Dùng thư viện MapStruct để map tự động cho nhàn
```

## 2. N+1 Query Problem
Đây là kẻ giết chết hiệu năng âm thầm số 1.
Khi bạn lấy 1 list 10 `Orders`, và mỗi order bạn lại gọi `order.getCustomer().getName()` (Lazy Loading).
Hibernate sẽ bắn:
*   1 câu SQL để lấy 10 Orders.
*   10 câu SQL (N) để lấy Customer cho từng Order.
=> Tổng cộng 11 query. Nếu list là 1000, bạn giết chết Database.

**Giải pháp:** Dùng `JOIN FETCH` trong JPQL hoặc `@EntityGraph`.
```java
@Query("SELECT o FROM Order o JOIN FETCH o.customer")
List<Order> findAllWithCustomer();
```
Câu này chỉ bắn đúng **1 query** lấy cả Order lẫn Customer.

## 3. Trả về 200 OK cho mọi lỗi
Nhiều bạn có thói quen `catch (Exception e)` và trả về một JSON `{ "error": "Lỗi rồi", "code": 500 }` nhưng HTTP Status code vẫn là **200 OK**.
Điều này làm client (Frontend/Mobile) rất khó bắt lỗi chuẩn.

**Chuẩn RESTful:**
*   **200 OK**: Thành công.
*   **201 Created**: Tạo mới thành công (POST).
*   **400 Bad Request**: Validation lỗi, input sai.
*   **401 Unauthorized**: Chưa đăng nhập.
*   **403 Forbidden**: Đăng nhập rồi nhưng không có quyền.
*   **404 Not Found**: Tìm không thấy resource.
*   **500 Internal Server Error**: Bug của server (NullPointer, DB down...).

## 4. Global Exception Handling
Đừng `try-catch` lặp đi lặp lại trong mỗi Controller. Spring cung cấp `@ControllerAdvice` để xử lý lỗi tập trung.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse(404, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGenerics(Exception ex) {
        // Log error ra file/sentry
        return new ErrorResponse(500, "Có lỗi xảy ra, vui lòng liên hệ admin");
    }
}
```
Code Controller của bạn sẽ sạch bong, chỉ tập trung vào logic nghiệp vụ (Happy Path).

## Tổng kết
Viết API thì dễ, viết API chuẩn, bảo mật và hiệu năng cao mới khó. Hãy bắt đầu tập thói quen dùng DTO và xử lý Exception chuẩn ngay từ hôm nay. Đừng để Frontend dev phải than trời mỗi khi tích hợp API của bạn! 😂

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

Nhưng trong dự án thực tế, cách làm này chứa đựng vô số rủi ro. Hãy cùng xem các sai lầm phổ biến và các Best Practices (RESTful Design) mà mọi Backend Dev cần biết.

## 1. Anti-Pattern: Expose Entity trực tiếp ra API
**Sai lầm:** Trả về trực tiếp `@Entity` (JPA Entity) cho Client.
```java
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id).get(); // Rủi ro NoSuchElementException
}
```

**Hậu quả:**
*   **Leak Security Info:** Mật khẩu hash, lương, thông tin audit (`created_by`, `modified_date`) bị lộ.
*   **Infinite Recursion:** Nếu Entity có quan hệ 2 chiều (`User <-> Order`), Jackson sẽ serialize vòng tròn -> StackOverflowError.
*   **Tight Coupling:** Nếu bạn đổi tên cột trong DB, API response đổi theo -> vỡ Client App (Frontend/Mobile).

**Giải pháp: DTO (Data Transfer Object)**
Luôn luôn map Entity sang DTO. DTO là POJO thuần túy, chỉ chứa field cần thiết.
```java
public class UserDTO {
    private String username;
    private String email;
    // Không bao gồm password
}
// Dùng MapStruct hoặc ModelMapper để convert tự động
```

## 2. N+1 Query Problem: Sát thủ hiệu năng
Đây là vấn đề kinh điển của ORM (Hibernate).
Khi bạn lấy list 10 `Orders`, mặc định `Customer` bên trong là Lazy Loading.
Khi vòng lặp chạy và gọi `order.getCustomer().getName()`:
*   1 câu SQL lấy 10 Orders.
*   10 câu SQL (N) để lấy Customer cho TỪNG Order.
=> Tổng cộng 11 query. Nếu list 1.000 dòng -> 1.001 query -> Database "ngất".

**Giải pháp:**
Dùng `JOIN FETCH` trong JPQL hoặc `@EntityGraph` để lấy dữ liệu trong **1 query duy nhất**.
```java
@Query("SELECT o FROM Order o JOIN FETCH o.customer")
List<Order> findAllWithCustomer();
```

## 3. Validation: Đừng tin tưởng Client
Đừng bao giờ check `if (user.getEmail() == null)` thủ công. Hãy dùng **Bean Validation (Hibernate Validator)**.

```java
public class CreateUserReq {
    @NotNull(message = "Username cannot be null")
    @Size(min = 3, max = 50)
    private String username;

    @Email(message = "Email invalid")
    private String email;
}

// Controller
public ResponseEntity<?> create(@Valid @RequestBody CreateUserReq req) { ... }
```
Nếu dữ liệu sai, Spring sẽ ném `MethodArgumentNotValidException` tự động.

## 4. HTTP Status Code: Đừng trả về 200 cho mọi thứ
Nhiều hệ thống cũ trả về `{ "code": 500, "message": "error" }` nhưng HTTP Header vẫn là **200 OK**. Điều này sai chuẩn REST và gây khó khăn cho monitoring tools.

Hãy dùng đúng code:
*   **200 OK**: Thành công (GET, PUT).
*   **201 Created**: Tạo mới thành công (POST).
*   **204 No Content**: Xóa thành công (DELETE).
*   **400 Bad Request**: Input sai (Validation error).
*   **401 Unauthorized**: Chưa login.
*   **403 Forbidden**: Login rồi nhưng không có quyền.
*   **404 Not Found**: ID không tồn tại.
*   **500 Internal Server Error**: Bug server.

## 5. Global Exception Handling
Thay vì `try-catch` trong mọi Controller, hãy dùng `@RestControllerAdvice`. Đây là AOP (Aspect Oriented Programming) giúp tách biệt code xử lý lỗi ra khỏi logic nghiệp vụ.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse(404, ex.getMessage());
    }
    
    // Bắt lỗi Validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> 
            errors.put(error.getField(), error.getDefaultMessage()));
        return errors;
    }
}
```

## 6. Pagination & Filtering
Đừng bao giờ trả về `List<User>` (findAll) nếu bảng có > 100 dòng. Hãy luôn dùng `Pageable`.

```java
// Controller
public Page<UserDTO> getAll(Pageable pageable) {
    return userService.findAll(pageable);
}
// Client gọi: /api/users?page=0&size=10&sort=name,desc
```
Spring Data JPA hỗ trợ việc này tận răng, bạn không cần viết SQL `LIMIT OFFSET`.

## Tổng kết
Viết API thì dễ (AI viết hộ cũng được), nhưng thiết kế API **Robust (Bền vững)**, an toàn và dễ bảo trì là câu chuyện khác. Hãy áp dụng các quy tắc trên ngay từ hôm nay để nâng tầm Project của bạn!

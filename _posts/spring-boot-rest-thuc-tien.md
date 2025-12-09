---
title: "Spring Boot REST API: Những sai lầm 'kém sang' cần loại bỏ ngay"
excerpt: "Đừng chỉ trả về 200 OK cho mọi thứ. Học cách thiết kế REST API chuẩn mực với DTO, Global Exception Handler, N+1 Prevention và Response Wrapper."
coverImage: "/assets/blog/preview/spring-boot-rest-thuc-tien.png"
date: "2025-12-07"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/spring-boot-rest-thuc-tien.png"
tags: ["java", "spring-boot", "backend", "api", "best-practices"]
---

Khi mới học Spring Boot, chúng ta thường viết Controller kiểu "mì ăn liền": Gọi Repository, lấy Entity, rồi `return` thẳng cái Entity đó ra ngoài. Client nhận được JSON, mọi thứ chạy ngon lành.

Nhưng trong môi trường Production, cách làm này chứa đựng những quả bom nổ chậm. Hãy cùng điểm mặt những sai lầm phổ biến và cách khắc phục để code "sang" và chuyên nghiệp hơn.

## 1. Anti-Pattern: Trả Entity trực tiếp ra API

❌ **Sai lầm:**
```java
@GetMapping("/{id}")
public User getUser(@PathVariable Long id) {
    return userRepository.findById(id).get();
}
```

**Tại sao sai?**
1.  **Lộ thông tin nhạy cảm**: Entity thường chứa `passwordHash`, `salary`, `audit_logs`. Trả cả cục Entity là bạn đang "mời gọi" hacker.
2.  **Infinite Recursion (Vòng lặp vô tận)**: Nếu User có list `Orders`, và Order lại trỏ ngược về `User`. Jackson (thư viện JSON) sẽ chạy vòng tròn đến khi tràn bộ nhớ (StackOverflowError).
3.  **Tight Coupling**: API bị dính chặt vào cấu trúc Database. Sửa tên cột trong DB -> API đổi key -> Frontend/Mobile App crash.

✅ **Giải pháp: DTO (Data Transfer Object)**
Luôn dùng DTO - một POJO thuần túy, chỉ chứa những gì Client cần.
```java
public class UserResponseDTO {
    private String username;
    private String email;
    // Tuyệt đối không có password
}
// Dùng MapStruct để convert Entity -> DTO tự động 1 nốt nhạc
```

## 2. N+1 Query Problem: Sát thủ hiệu năng thầm lặng

Dùng Hibernate/JPA rất sướng, nhưng coi chừng.
Giả sử bạn lấy danh sách 10 `Orders`. Mỗi Order có 1 `createBy` (User). Mặc định là Lazy Loading.
Khi vòng lặp chạy biến đổi sang JSON:
*   1 Query lấy List Order.
*   Với mỗi Order, Hibernate lén chạy thêm 1 Query lấy User.
-> Tổng: 1 + 10 = 11 queries.
Nếu List có 1000 item -> **1001 queries**. Database quá tải ngay lập tức.

✅ **Giải pháp:**
Sử dụng `JOIN FETCH` trong câu JPQL để lấy tất cả trong **1 query duy nhất**.
```java
@Query("SELECT o FROM Order o JOIN FETCH o.createBy")
List<Order> findAllWithUser();
```

## 3. Validation: Đừng check null thủ công

Đừng viết những dòng code dài dòng dở hơi này:
```java
if (req.getUsername() == null || req.getUsername().isEmpty()) {
    return ResponseEntity.badRequest().body("Username thieu");
}
```

✅ **Giải pháp: Bean Validation (Hibernate Validator)**
Khai báo luật ngay trên DTO:
```java
public class CreateUserReq {
    @NotBlank(message = "Username không được để trống")
    @Size(min = 6, message = "Tối thiểu 6 ký tự")
    private String username;

    @Email
    private String email;
}

// Controller
public void create(@Valid @RequestBody CreateUserReq req) { ... }
```
Spring tự động validate, nếu sai sẽ ném Exception. Code logic sạch bong!

## 4. HTTP Status Code: Đừng trả 200 cho lỗi

Rất nhiều hệ thống (đặc biệt là dân tay ngang) thích trả về `{ "code": 500, "mess": "Lỗi rồi" }` nhưng HTTP Header vẫn để là **200 OK**.
Điều này làm hỏng ý nghĩa của REST và gây khó khăn cho monitoring tools.

✅ **Hãy dùng đúng semantic:**
*   **200 OK**: Thành công.
*   **201 Created**: Tạo mới (POST) ok.
*   **204 No Content**: Xóa (DELETE) ok, không có gì trả về.
*   **400 Bad Request**: Validation lỗi, Input sai.
*   **401 Unauthorized**: Chưa login / Token hết hạn.
*   **403 Forbidden**: Login rồi nhưng không đủ quyền (User đòi vào trang Admin).
*   **404 Not Found**: Tìm ID không thấy.
*   **500 Internal Server Error**: Code server bị bug (NullPointer...).

## 5. Global Exception Handler: Gom lỗi về một mối

Thay vì try-catch chi chít trong từng Controller, hãy sử dụng `@RestControllerAdvice`.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Bắt lỗi không tìm thấy
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(Exception ex) {
        return new ErrorResponse(404, ex.getMessage());
    }

    // Bắt lỗi Validation (400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidation(MethodArgumentNotValidException ex) {
        // Map field lỗi -> message lỗi
        return ex.getBindingResult().getFieldErrors().stream()
                 .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
    }
}
```
Giờ đây Controller của bạn chỉ tập trung vào Happy Path, còn lỗi lầm cứ ném exception ra, có người lo hết.

## Tổng kết

REST API không chỉ là URL. Nó là hợp đồng (Contract) giữa Frontend và Backend. Một API tốt phải **Predictable** (dễ đoán), **Secure** (An toàn) và **Efficient** (Hiệu quả).
Áp dụng những tips trên sẽ giúp bạn thoát kiếp "Newbie" và tiến gần hơn tới chuẩn Enterprise.

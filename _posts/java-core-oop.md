---
title: "Java Core: Clean Code & SOLID Principles - Code có Tâm và Tầm"
excerpt: "Viết code chạy được là chưa đủ. Học cách áp dụng SOLID, DRY, KISS và Strategy Pattern để biến mớ code 'Spaghetti' thành kiến trúc nghệ thuật."
coverImage: "/assets/blog/preview/java-core-oop.png"
date: "2025-12-03"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra2.png"
ogImage:
  url: "/assets/blog/preview/java-core-oop.png"
tags: ["java", "oop", "clean-code", "architecture"]
---

"Code thối" (Code smells) là cụm từ ám chỉ những đoạn mã rối rắm, khó đọc, khó bảo trì và là mầm mống của mọi con bug. Sự khác biệt giữa một Junior Dev "thợ code" và một Senior Engineer "nghệ nhân" không nằm ở việc ai gõ phím nhanh hơn, mà là ai thiết kế hệ thống **Bền vững (Maintainable)** hơn.

Hôm nay, chúng ta sẽ "dọn dẹp" những thói quen xấu và áp dụng tư duy SOLID vào thực tế.

## 1. Đa hình (Polymorphism) thay thế IF/ELSE

Đây là bài học vỡ lòng quan trọng nhất. Switch-Case hay If-Else dài dằng dặc là kẻ thù của sự mở rộng.

**Bài toán:** Tính phí vận chuyển (Shipping Fee).

### ❌ Cách làm thủ công (Procedural)
```java
public class ShippingService {
    public double calculate(String type) {
        if (type.equals("STANDARD")) return 30000;
        else if (type.equals("EXPRESS")) return 50000;
        else if (type.equals("GRAB_BIKE")) return 15000; // Mới thêm
        else if (type.equals("AHA_MOVE")) return 20000;  // Mới thêm
        // ... Càng ngày càng dài, sửa ở đây rất dễ break logic cũ
        return 0;
    }
}
```
**Vấn đề**: Vi phạm nguyên tắc Open/Closed. Mỗi lần có đối tác mới, bạn phải sửa class cũ.

### ✅ Cách làm chuẩn OOP (Strategy Pattern)
```java
// 1. Định nghĩa Interface (Hợp đồng)
public interface ShippingStrategy {
    double calculate(double weight);
}

// 2. Chia nhỏ logic ra các class riêng biệt
public class StandardShipping implements ShippingStrategy {
    public double calculate(double weight) { return 30000; }
}

public class ExpressShipping implements ShippingStrategy {
    public double calculate(double weight) { return 50000 + weight * 10; }
}

// 3. Sử dụng (Dependency Injection)
public class OrderService {
    public double processOrder(Order order, ShippingStrategy shipping) {
        // Class này KHÔNG CẦN BIẾT logic tính toán cụ thể bên trong
        // Nó chỉ biết: "Ê strategy, tính tiền cho tao!"
        return shipping.calculate(order.getWeight());
    }
}
```
-> Muốn thêm `GrabExpress`? Chỉ cần tạo class mới implement interface. Code cũ giữ nguyên 100%. An toàn tuyệt đối!

## 2. SOLID: 5 Nguyên tắc vàng

### S - Single Responsibility (Đơn nhiệm)
Một class chỉ nên có **MỘT lý do duy nhất để thay đổi**.
*   Đừng để class `User` vừa chứa thông tin User, vừa có hàm `saveToDatabase()`, vừa có hàm `sendEmail()`.
*   Hãy tách ra: `User` (Entity), `UserRepository` (DB), `EmailService` (Mail).

### O - Open/Closed (Đóng/Mở)
Open for Extension, Closed for Modification. (Ví dụ Strategy Pattern ở trên là minh chứng rõ nhất).

### L - Liskov Substitution (LSP)
Class con phải thay thế hoàn toàn được class cha mà không làm hỏng chương trình.
*   **Ví dụ sai:** `Square` extends `Rectangle`. Vì `setWidth` của hình vuông sẽ đổi luôn chiều cao -> Phá vỡ logic hình chữ nhật (chiều dài độc lập chiều rộng).
*   **Bài học:** Kế thừa phải dựa trên **Hành vi (Behavior)** chứ không phải cấu trúc dữ liệu.

### I - Interface Segregation (Phân tách Interface)
Đừng bắt cá leo cây. Đừng ép Client implement những hàm họ không dùng.
*   ❌ `interface Animal { fly(); swim(); run(); }` -> Con Chó implement cái này thì phải implement `fly()` rỗng à?
*   ✅ Tách nhỏ: `Flyable`, `Swimmable`, `Runnable`. Chó chỉ gán `Runnable`.

### D - Dependency Inversion (Đảo ngược phụ thuộc)
Module cấp cao không nên phụ thuộc module cấp thấp. Cả hai nên phụ thuộc vào **Abstraction (Interface)**.
*   Service không nên gọi trực tiếp `MySQLDriver`.
*   Service nên gọi `DatabaseConnection` interface. Sau này đổi sang `PostgreSQL` hay `MongoDB` thì Service không cần sửa 1 dòng code. -> Đây là cốt lõi của **Spring Framework (DI Container)**.

## 3. Composition over Inheritance (Ưu tiên Sắp xếp hơn Kế thừa)

`extends` tạo ra sự kết dính chết người (Tight Coupling). Con phụ thuộc chặt vào Cha. Thay đổi ở Cha có thể làm chết Con (Fragile Base Class).
Và Java chỉ cho đơn kế thừa. Nếu `User` extends `BaseEntity` rồi thì không thể extends `SystemUser` được nữa.

**Giải pháp: Composition (Chứa đựng)**
Thay vì "Là một" (Is-A), hãy dùng "Có một" (Has-A).
```java
// Thay vì class User extends Logger (Sai)
class User {
    private final Logger logger; // Composition (Đúng)
    // Dễ dàng thay thế Logger này bằng FileLogger, ConsoleLogger lúc runtime
}
```

## 4. DRY & KISS: Đơn giản là vĩ đại

*   **DRY (Don't Repeat Yourself)**: Code lặp lại > 2 lần? Refactor ra hàm chung. Code trùng lặp là nơi trú ẩn của bug (sửa chỗ này quên chỗ kia).
*   **KISS (Keep It Simple, Stupid)**: Code đơn giản thể hiện trình độ. Đừng viết những dòng code "pro vip" 1 dòng (One-liner) nhưng không ai hiểu nổi. Code là để con người đọc, sau đó máy mới chạy.

## 5. Quy tắc đặt tên (Naming Convention)

Lời khuyên từ cuốn sách "Clean Code" (Robert C. Martin):
1.  **Tên biến**: Phải trả lời câu hỏi "Tại sao nó tồn tại?".
    *   `int d;` (Sai - d là gì? Days? Dates? Distance?)
    *   `int daysSinceCreation;` (Đúng).
2.  **Tên hàm**: Phải là Động từ. `calculatePayment()`, `validateUser()`.
3.  **Số lượng tham số**: Tối đa 3. Nếu nhiều hơn, hãy gom chúng vào một Object (`CreateUserRequest`).
4.  **Comment**: Code tốt tự giải thích (**Self-documenting**). Comment dùng để giải thích "Why" (Tại sao làm vậy), không giải thích "What" (Code làm gì).

## Tổng kết

Viết Clean Code lúc đầu sẽ tốn thời gian hơn 30%. Nhưng về sau, nó giúp bạn tiết kiệm 300% thời gian debug và bảo trì. Hãy biến việc viết code sạch thành thói quen, không phải nhiệm vụ.

> *"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."*

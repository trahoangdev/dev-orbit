---
title: "Java Core: Clean Code & SOLID Principles thực chiến"
excerpt: "Viết code chạy được là chưa đủ. Code phải 'sạch', dễ bảo trì và mở rộng. Cùng tìm hiểu SOLID, DRY, KISS và những nguyên tắc thiết kế OOP quan trọng."
coverImage: "/assets/blog/preview/java-core-oop.png"
date: "2025-12-03"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/java-core-oop.png"
tags: ["java", "oop", "clean-code"]
---

"Code thối" (Code smells) là thuật ngữ chỉ những đoạn code khó đọc, khó sửa, và dễ sinh bug. Để tránh trở thành "tác giả" của những đống code thối đó, lập trình viên Java cần nằm lòng các nguyên tắc thiết kế hướng đối tượng (OOP Design Principles).

Hôm nay, chúng ta không học lý thuyết suông. Chúng ta sẽ xem cách áp dụng vào thực tế.

## 1. Đa hình (Polymorphism) không chỉ là Overriding

Nhiều bạn nghĩ Đa hình chỉ là `Animal a = new Dog()`. Nhưng sức mạnh thực sự của nó là giúp hệ thống **Loose Coupling** (liên kết lỏng).

**Ví dụ:** Bạn viết chức năng thanh toán.

```java
// ❌ Cách làm cứng nhắc (Tightly Coupled)
public class PaymentService {
    public void pay(String type) {
        if (type.equals("MOMO")) {
            // code xử lý momo
        } else if (type.equals("ZALO")) {
            // code xử lý zalo
        }
        // Thêm phương thức mới lại phải sửa class này -> Vi phạm Open/Closed Principle
    }
}
```

**✅ Cách làm chuẩn OOP:**
Dùng Interface để định nghĩa hành vi chung.

```java
public interface PaymentStrategy {
    void pay(double amount);
}

public class MomoPayment implements PaymentStrategy { ... }
public class ZaloPayment implements PaymentStrategy { ... }

// Service không cần biết chi tiết, chỉ cần biết Interface
public class PaymentService {
    private PaymentStrategy strategy;
    
    public void process(double amount) {
        strategy.pay(amount);
    }
}
```

## 2. SOLID: Kim chỉ nam cho mọi kiến trúc

### S - Single Responsibility Principle (Đơn nhiệm)
Một class chỉ nên có **một lý do duy nhất để thay đổi**.
*   Đừng để class `User` vừa lưu thông tin user, vừa gửi email, vừa in hóa đơn.
*   Tách ra: `User`, `EmailService`, `InvoicePrinter`.

### O - Open/Closed Principle (Đóng/Mở)
Mở rộng dễ dàng (Open for extension), nhưng hạn chế sửa đổi code cũ (Closed for modification). Ví dụ Payment ở trên là minh chứng rõ nhất. Thêm cổng thanh toán mới chỉ cần tạo class mới implement interface, không cần sửa logic cũ.

### L - Liskov Substitution Principle
Class con phải thay thế được class cha mà không làm hỏng chương trình.
*   Nếu `Bird` có hàm `fly()`, thì đừng tạo class `Penguin extends Bird` rồi ném exception `CantFlyException` trong hàm `fly()`. Chim cánh cụt không biết bay thì không nên kế thừa từ lớp Chim Biết Bay.

### I - Interface Segregation Principle
Đừng ép client implement những hàm mà họ không dùng.
*   Thay vì 1 interface `Worker` bự với (`code()`, `test()`, `manage()`), hãy tách thành `Coder`, `Tester`, `Manager`.

### D - Dependency Inversion Principle
Module cấp cao không nên phụ thuộc module cấp thấp. Cả hai nên phụ thuộc vào abstraction (Interface).
*   `OrderService` (cao) không nên `new OracleDatabase()` (thấp).
*   `OrderService` nên phụ thuộc interface `Database`. Sau này đổi sang `MySQLDatabase` hay `MongoDatabase` đều được.

## 3. Composition over Inheritance (Ưu tiên Sắp xếp hơn Kế thừa)

Kế thừa (`extends`) là con dao hai lưỡi. Nó tạo ra liên kết chặt chẽ (is-a relationship). Nếu class Cha thay đổi, toàn bộ cây gia phả bị ảnh hưởng.

Hầu hết các trường hợp, hãy dùng **Composition** (has-a relationship).
*   Thay vì `class Customer extends User`, hãy dùng `class Customer` chứa một field `private User userProfile`. Linh hoạt hơn rất nhiều.

## Tổng kết

Viết code Clean không làm cho chương trình chạy nhanh hơn (đôi khi còn chậm hơn xíu do wrap nhiều lớp), nhưng nó làm cho **tốc độ phát triển** (Development Speed) nhanh hơn về lâu dài. 

> "Code được đọc nhiều hơn là được viết." - Hãy viết code sao cho người đến sau (hoặc chính bạn 6 tháng sau) không phải thốt lên lời cay đắng.

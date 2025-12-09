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

Hôm nay, chúng ta không học lý thuyết suông. Chúng ta sẽ xem cách áp dụng vào thực tế với những ví dụ đau thương.

## 1. Đa hình (Polymorphism) vs Câu lệnh IF/ELSE

Nhiều bạn nghĩ Đa hình chỉ là học thuật. Nhưng sức mạnh thực sự của nó là giúp loại bỏ **Switch Case** hoặc chuỗi **If/Else** dài ngoằng.

**Bài toán:** Tính phí vận chuyển.

```java
// ❌ Cách làm thủ công (Procedural)
public class ShippingService {
    public double calculateFee(String type) {
        if (type.equals("STANDARD")) return 30000;
        else if (type.equals("EXPRESS")) return 50000;
        else if (type.equals("GRAB")) return 70000;
        // Mỗi lần thêm 1 loại ship mới, phải sửa class này -> Rủi ro bug
        return 0;
    }
}
```

**✅ Cách làm chuẩn OOP (Strategy Pattern):**

```java
public interface ShippingStrategy {
    double calculate();
}

public class StandardShipping implements ShippingStrategy {
    public double calculate() { return 30000; }
}

public class ExpressShipping implements ShippingStrategy {
    public double calculate() { return 50000; }
}

// Service cực kỳ sạch và tuân thủ Open/Closed
public class ShippingService {
    public double process(ShippingStrategy strategy) {
        return strategy.calculate();
    }
}
```
Muốn thêm loại ship mới? Chỉ cần tạo class mới implement interface. Code cũ không cần đụng vào!

## 2. SOLID: Kim chỉ nam cho mọi kiến trúc

### S - Single Responsibility Principle (Đơn nhiệm)
Một class chỉ nên có **một lý do duy nhất để thay đổi**.
*   **Sai:** Class `Order` chứa logic tính giá, lưu DB, gửi email, in hóa đơn.
*   **Đúng:**
    *   `Order`: Chỉ chứa dữ liệu (Entity).
    *   `OrderRepository`: Lưu DB.
    *   `OrderService`: Logic nghiệp vụ.
    *   `EmailNotification`: Gửi mail.

### O - Open/Closed Principle (Đóng/Mở)
Mở rộng dễ dàng (Open for extension), nhưng hạn chế sửa đổi code cũ (Closed for modification). Ví dụ Strategy Pattern ở trên là minh chứng rõ nhất.

### L - Liskov Substitution Principle (LSP)
Class con phải thay thế được class cha mà không làm hỏng chương trình.
**Ví dụ kinh điển:** Hình Vuông là con Hình Chữ Nhật?
Trong toán học: Đúng.
Trong OOP: **Sai!**
```java
// Nếu Square extends Rectangle
Rectangle r = new Square();
r.setWidth(5);
r.setHeight(10); // Với Square, setHeight(10) sẽ đổi luôn width thành 10
// -> r.area() trả về 100 thay vì 50. Logic sai hoàn toàn!
```
**Bài học:** Kế thừa phải dựa trên hành vi (behavior), không phải chỉ là cấu trúc,

### I - Interface Segregation Principle
Đừng ép client implement những hàm mà họ không dùng.
Thà có 3 interfaces nhỏ (`Readable`, `Writable`, `Executable`) còn hơn 1 interface khổng lồ (`GodInterface`).

### D - Dependency Inversion Principle
Module cấp cao không nên phụ thuộc module cấp thấp. Cả hai nên phụ thuộc vào abstraction (Interface).
*   **High-level:** `CustomerService` (Nghiệp vụ quan trọng).
*   **Low-level:** `MySQLDriver`, `FileLogger` (Chi tiết kỹ thuật).
*   **Abstraction:** `DatabaseConnection`, `Logger`.

Nhờ nguyên lý này, ta mới có Spring Framework và cơ chế **Dependency Injection (DI)** thần thánh.

## 3. Composition over Inheritance (Ưu tiên Sắp xếp hơn Kế thừa)

Kế thừa (`extends`) là con dao hai lưỡi. Nó tạo ra liên kết chặt chẽ (is-a relationship). Nếu class Cha thay đổi, toàn bộ cây gia phả bị ảnh hưởng (Fragile Base Class problem).
Hơn nữa, Java chỉ hỗ trợ đơn kế thừa. Bạn đã extends `BaseController` thì không thể extends `BaseEntity` nữa.

Hầu hết các trường hợp, hãy dùng **Composition** (has-a relationship).
*   Thay vì `class Customer extends Loggable`, hãy dùng `class Customer` chứa một field `private Logger logger`. 
*   Linh hoạt thay đổi hành vi lúc runtime (Dependency Injection).

## 4. DRY & KISS

*   **DRY (Don't Repeat Yourself):** Đừng copy-paste code. Nếu logic lặp lại > 2 lần, hãy tách hàm. Nhưng đừng DRY một cách mù quáng (Over-engineering), đôi khi trùng lặp một chút để dễ đọc còn hơn là gom nhóm quá mức trừu tượng.
*   **KISS (Keep It Simple, Stupid):** Code đơn giản nhất có thể. Code phức tạp thể hiện cái tôi, code đơn giản thể hiện trình độ.

## 5. Clean Code Etiquette

1.  **Tên biến có nghĩa:** `int d;` (Sai) -> `int elapsedDays;` (Đúng).
2.  **Hàm ngắn:** Một hàm chỉ làm 1 việc. Tốt nhất < 20 dòng.
3.  **Hạn chế tham số:** Hàm có > 3 tham số là dấu hiệu cần refactor (gom vào Object).
4.  **Comment tại sao (Why), không phải cái gì (What):** Code đã nói lên "làm cái gì" rồi. Comment chỉ giải thích logic nghiệp vụ phức tạp hoặc lý do tại sao chọn giải pháp này.

## Tổng kết

Viết code Clean không làm cho chương trình chạy nhanh hơn (đôi khi còn chậm hơn xíu do wrap nhiều lớp), nhưng nó làm cho **tốc độ phát triển** (Development Speed) nhanh hơn về lâu dài. Code thối sẽ làm chậm team lại vì "sợ sửa", "sợ bug".

> "Hãy code như thể người bảo trì code sau này là một kẻ sát nhân điên cuồng và hắn biết địa chỉ nhà bạn."

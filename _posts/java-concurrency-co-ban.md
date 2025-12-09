---
title: "Java Concurrency: Đừng đùa với Đa luồng"
excerpt: "Đa luồng (Multi-threading) là con dao hai lưỡi. Tìm hiểu về Race Condition, Visibility Problem, Deadlock và tại sao bạn nên dùng ExecutorService thay vì new Thread()."
coverImage: "/assets/blog/preview/java-concurrency-co-ban.png"
date: "2025-12-02"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/java-concurrency-co-ban.png"
tags: ["java", "concurrency", "backend"]
---

Trong thế giới lập trình Java, **Concurrency (Đồng thời)** vừa là sức mạnh, vừa là cơn ác mộng lớn nhất của developer. Một ứng dụng chạy mượt mà trên máy local (1 user) có thể sập ngay lập tức khi deploy lên production với 1000 users đồng thời.

Tại sao? Vì **Race Condition**, **Deadlock** và **Memory Visibility**.

## 1. Race Condition: Khi 1 + 1 không bằng 2

Hãy xem đoạn code kinh điển sau:

```java
public class Counter {
    private int count = 0;

    public void increment() {
        count++; // Nhìn thì đơn giản, nhưng thực tế là 3 bước: Read -> Modify -> Write
    }
}
```

Nếu 2 luồng (Thread A và Thread B) cùng gọi `increment()`:
1.  A đọc `count` = 0.
2.  B đọc `count` = 0 (trước khi A kịp ghi giá trị mới).
3.  A ghi `count` = 1.
4.  B ghi `count` = 1.

=> Kết quả: Chúng ta mong đợi là 2, nhưng thực tế chỉ là 1. Dữ liệu bị sai lệch. Đây là **Race Condition**.

**Giải pháp:**
*   Dùng từ khóa `synchronized`: `public synchronized void increment()`. Đảm bảo chỉ 1 luồng được vào hàm này tại 1 thời điểm.
*   Dùng `AtomicInteger`: `count.incrementAndGet()`. Hiệu năng tốt hơn nhờ CAS (Compare-And-Swap) ở cấp độ phần cứng.

## 2. Visibility Problem và từ khóa `volatile`

Java Memory Model (JMM) quy định mỗi Thread có thể có một bộ nhớ cache riêng (CPU Cache) để tăng tốc độ.
Nếu Thread A sửa biến `flag = true` ở cache của nó, chưa chắc Thread B đã nhìn thấy sự thay đổi đó nếu RAM chưa kịp đồng bộ.

```java
private volatile boolean running = true;
```

Từ khóa `volatile` đảm bảo giá trị của biến luôn được đọc/ghi trực tiếp từ **Main Memory (RAM)**, giúp mọi luồng luôn nhìn thấy giá trị mới nhất.

> **Lưu ý:** `volatile` KHÔNG đảm bảo tính nguyên tử (atomicity). Nó chỉ giải quyết vấn đề nhìn thấy (visibility). Đừng dùng nó thay thế cho `synchronized` hoặc `Atomic` trong các phép toán đếm.

## 3. ExecutorService: Đừng bao giờ `new Thread()` thủ công

Thời sinh viên, chúng ta hay viết:
```java
new Thread(() -> {
    // do something
}).start();
```

Trong thực tế doanh nghiệp, đây là điều cấm kỵ. Tại sao?
1.  **Chi phí khởi tạo:** Tạo Thread rất tốn kém tài nguyên OS.
2.  **Khó quản lý:** Nếu có 10.000 request đến, bạn tạo 10.000 threads => Server Crash (Out Of Memory).

**Giải pháp:** Dùng **ThreadPool** (ExecutorService).

```java
// Tạo một bể chứa cố định 10 thợ (threads)
ExecutorService executor = Executors.newFixedThreadPool(10);

for (int i = 0; i < 1000; i++) {
    executor.submit(() -> {
        System.out.println("Xử lý task bởi: " + Thread.currentThread().getName());
    });
}
```
ThreadPool giúp tái sử dụng các Thread đã tạo, kiểm soát số lượng luồng tối đa, tránh làm sập hệ thống.

## 4. Virtual Threads (Java 21): Tương lai là đây

Nếu bạn đang dùng Java 21+, khái niệm **Virtual Threads** (Project Loom) đang thay đổi cuộc chơi. Nó cho phép tạo hàng triệu luồng ảo "siêu nhẹ" (như Goroutines của Go) mà không tốn nhiều RAM.

```java
// Java 21
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
}
```

## Kết luận

Lập trình đa luồng không dành cho những tay mơ. Hãy nắm vững:
1.  **Synchronization** & **Atomic Variables** để bảo vệ dữ liệu.
2.  **ThreadPool** để quản lý tài nguyên.
3.  **Concurrent Collections** (bài trước) để tránh lỗi ngớ ngẩn.

Nếu không cần thiết, hãy để Framework (như Spring Web) lo phần đa luồng cho bạn. Xử lý tay (Manual threading) rất dễ bắn vào chân mình! 🔫

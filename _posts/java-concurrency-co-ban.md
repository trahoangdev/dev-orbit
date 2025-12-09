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

## 1. Thread Life Cycle & Context Switching

Trước khi đi sâu vào code, hãy hiểu giá phải trả. Mỗi Thread trong Java map trực tiếp 1-1 với Kernel Thread của hệ điều hành.
*   **Stack Size:** Mặc định mỗi thread tốn khoảng 1MB RAM (stack size). 1000 threads -> mất 1GB RAM chỉ để... tồn tại.
*   **Context Switching:** CPU phải dừng thread này, lưu trạng thái (registers), load trạng thái thread kia để chạy. Quá nhiều thread dẫn đến CPU chỉ bận rộn việc switch mà không làm việc chính (Thrashing).

## 2. Race Condition: Khi 1 + 1 không bằng 2

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

### Cách 1: Synchronized (Monitor Lock)
```java
public synchronized void increment() {
    count++;
}
```
Từ khóa `synchronized` đảm bảo tính **Mutual Exclusion (Mutex)**. Chỉ 1 luồng được vào hàm này, các luồng khác phải chờ (Blocked).
*Ưu điểm:* Dễ dùng.
*Nhược điểm:* Hiệu năng thấp nếu lock quá lâu.

### Cách 2: Atomic Variables
```java
private AtomicInteger count = new AtomicInteger(0);

public void increment() {
    count.incrementAndGet();
}
```
Dùng cơ chế CAS (Compare-And-Swap) ở mức phần cứng. Không block luồng, hiệu năng cực cao cho các phép toán đếm đơn giản.

### Cách 3: ReentrantLock
```java
private final ReentrantLock lock = new ReentrantLock();

public void increment() {
    lock.lock();
    try {
        count++;
    } finally {
        lock.unlock(); // BẮT BUỘC phải unlock trong finally
    }
}
```
Linh hoạt hơn `synchronized` (có thể `tryLock()`, lock công bằng - fairness).

## 3. Visibility Problem và từ khóa `volatile`

Java Memory Model (JMM) quy định mỗi Thread có thể có một bộ nhớ cache riêng (CPU Cache L1/L2) để tăng tốc độ.
Nếu Thread A sửa biến `flag = true` ở cache của nó, chưa chắc Thread B đã nhìn thấy sự thay đổi đó nếu RAM (Main Memory) chưa kịp đồng bộ.

```java
private volatile boolean running = true;
```

Từ khóa `volatile` thiết lập **Happens-Before relationship**.
*   Mọi thao tác ghi vào biến volatile sẽ được flush ngay lập tức xuống RAM.
*   Mọi thao tác đọc biến volatile sẽ đọc trực tiếp từ RAM.

> **Lưu ý:** `volatile` KHÔNG đảm bảo tính nguyên tử (atomicity). Nó chỉ giải quyết vấn đề nhìn thấy (visibility). Đừng dùng nó thay thế cho `synchronized` để đếm số.

## 4. Deadlock (Khóa chết)

Tình huống: Anh A giữ chìa khóa xe, cần bằng lái của anh B. Anh B giữ bằng lái, cần chìa khóa xe của anh A.
Cả hai chờ nhau đến tận thế.

```java
// Ví dụ Deadlock
synchronized(ResourceA) {
    synchronized(ResourceB) {
        // do something
    }
}

// Ở thread khác làm ngược lại
synchronized(ResourceB) {
    synchronized(ResourceA) { // Chết chắc!
        // do something
    }
}
```

**Cách phòng tránh:**
*   Luôn lock theo một thứ tự nhất định (A -> B).
*   Dùng `tryLock()` với timeout để thoát ra nếu chờ quá lâu.

## 5. ExecutorService: Đừng bao giờ `new Thread()` thủ công

Trong thực tế doanh nghiệp, `new Thread()` là điều cấm kỵ.
1.  **Chi phí khởi tạo:** Tạo Thread rất tốn kém tài nguyên OS.
2.  **Khó kiểm soát:** Nếu có 10.000 request đến, bạn tạo 10.000 threads -> Server Crash (Out Of Memory).

**Giải pháp:** Dùng **ThreadPool** (ExecutorService).

```java
// FixedThreadPool: Bể chứa cố định 10 thợ
ExecutorService executor = Executors.newFixedThreadPool(10);

for (int i = 0; i < 1000; i++) {
    executor.submit(() -> {
        System.out.println("Processing task by " + Thread.currentThread().getName());
        // Task logic
    });
}
executor.shutdown();
```
ThreadPool giúp tái sử dụng Thread, giới hạn số lượng luồng, và có hàng đợi (BlockingQueue) để chứa các task chưa được xử lý.

Các loại Pool phổ biến:
*   `newFixedThreadPool(n)`: Số luồng cố định. Dùng cho server tải cao.
*   `newCachedThreadPool()`: Tạo luồng vô hạn nếu cần. Cẩn thận OOM.
*   `newSingleThreadExecutor()`: Chỉ 1 luồng, xử lý tuần tự.

## 6. CompletableFuture (Java 8+)

Dùng để xử lý bất đồng bộ hiện đại (tương tự Promise trong JS).

```java
CompletableFuture.supplyAsync(() -> fetchUserString()) // Chạy ở thread khác
    .thenCombine(
        CompletableFuture.supplyAsync(() -> fetchOrderString()), 
        (user, order) -> user + " bought " + order
    )
    .thenAccept(System.out::println) // Kết quả cuối cùng
    .join();
```

## 7. Virtual Threads (Java 21): Tương lai là đây

Project Loom đã mang đến **Virtual Threads** - luồng ảo "siêu nhẹ" được quản lý bởi JVM chứ không phải OS.
Bạn có thể tạo **hàng triệu** virtual threads mà không tốn RAM. Nó biến code bất đồng bộ phức tạp (Reactive) trở về code đồng bộ đơn giản (Imperative).

```java
// Java 21
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 100_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1)); // Không block OS Thread
            return i;
        });
    });
}
```
Virtual Thread cực kỳ phù hợp cho các tác vụ I/O bound (gọi DB, gọi API).

## Kết luận

Concurrency là một chủ đề khó nhưng mang lại hiệu năng to lớn. Hãy bắt đầu từ việc hiểu rõ `Safety` (đúng đắn) trước khi nghĩ đến `Liveness` (tốc độ). Và luôn nhớ: **Immutability (Bất biến)** là bạn thân nhất của Đa luồng. Nếu object không thể thay đổi, bạn không cần phải lock nó!

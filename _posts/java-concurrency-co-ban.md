---
title: "Java Concurrency: Đừng đùa với Đa luồng"
excerpt: "Đa luồng (Multi-threading) là con dao hai lưỡi. Tìm hiểu sâu về Race Condition, Memory Visibility, Deadlock và tại sao Virtual Threads (Java 21) là cuộc cách mạng."
coverImage: "/assets/blog/preview/java-concurrency-co-ban.png"
date: "2025-12-02"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra2.png"
ogImage:
  url: "/assets/blog/preview/java-concurrency-co-ban.png"
tags: ["java", "concurrency", "backend", "performance"]
---

Trong lập trình Java Backend, **Concurrency (Đồng thời)** vừa là sức mạnh tối thượng để scale hệ thống, vừa là cơn ác mộng lớn nhất của developer. Một ứng dụng chạy mượt mà trên máy local (1 user) có thể sập ngay lập tức (Crash) hoặc sai lệch dữ liệu tài chính (Data Race) khi deploy lên production với 1000 users đồng thời.

Tại sao? Vì **Race Condition**, **Deadlock** và **Memory Visibility**.

Hôm nay, chúng ta sẽ không chỉ học cách dùng `Thread`, mà học cách **kiểm soát** nó.

## 1. Bản chất của Thread & Context Switching

Trước khi code, hãy hiểu giá phải trả (Cost).
Trong mô hình Java truyền thống (Platform Thread): **1 Java Thread = 1 OS Thread**.
*   **Chi phí RAM:** Mặc định mỗi thread ngốn khoảng **1MB** stack size (dù chưa làm gì). 10.000 threads -> mất 10GB RAM.
*   **Chi phí CPU (Context Switching):** Khi CPU chuyển từ thread A sang thread B, nó phải lưu trạng thái (registers, cache) của A và load B. Quá nhiều thread dẫn đến việc CPU chỉ bận rộn... switch mà không thực sự xử lý logic (Thrashing).

## 2. Race Condition: Khi 1 + 1 != 2

Đây là lỗi phổ biến nhất. Hãy xem đoạn code kinh điển đếm số lượng request:

```java
public class Counter {
    private int count = 0;

    public void increment() {
        count++; // Nhìn thì đơn giản, nhưng thực tế là 3 bước: Read -> Modify -> Write
    }
}
```

Nếu 2 luồng (A & B) chạy song song:
1.  A đọc `count` = 0.
2.  B đọc `count` = 0 (trước khi A kịp ghi xuống RAM).
3.  A ghi `count` = 1.
4.  B ghi `count` = 1.
-> Kết quả: Mất 1 lần đếm! 

**Giải pháp:**

### Chiến thuật 1: Synchronized (Monitor Lock)
```java
public synchronized void increment() {
    count++;
}
```
*   **Ưu điểm**: Dễ dùng. Đảm bảo **Mutual Exclusion** (chỉ 1 người vào toilet 1 lúc).
*   **Nhược điểm**: Hiệu năng thấp nếu giữ lock quá lâu (Blocking).

### Chiến thuật 2: Atomic Variables (Non-blocking)
```java
private AtomicInteger count = new AtomicInteger(0);

public void increment() {
    count.incrementAndGet();
}
```
*   Dùng **CAS (Compare-And-Swap)** ở tầng phần cứng CPU.
*   **Nhanh hơn synchronized** rất nhiều vì không block thread, chỉ retry nếu thất bại.

## 3. Memory Visibility & `volatile`

Java Memory Model (JMM) cho phép mỗi Thread copy biến từ RAM vào **CPU Cache (L1/L2)** để chạy cho nhanh.
Hậu quả: Thread A sửa biến `flag = true` ở cache của nó, Thread B (chạy trên core khác) vẫn nhìn thấy `flag = false` ở cache cũ.

**Giải pháp: `volatile`**
```java
private volatile boolean isRunning = true;
```
Từ khóa này ép buộc Java: "Ê, mỗi lần đọc/ghi biến này phải **chọc thẳng xuống RAM (Main Memory)**, cấm cache!".
-> Đảm bảo mọi thread luôn nhìn thấy giá trị mới nhất.

## 4. Deadlock: Cặp đôi hoàn cảnh

Tình huống:
*   Thread 1: Giữ Lock A, chờ Lock B.
*   Thread 2: Giữ Lock B, chờ Lock A.
-> Cả hai đứng chờ nhau đến... Reset Server.

**Cách phòng tránh:**
1.  **Thứ tự Lock nhất quán**: Luôn lock A trước, rồi mới lock B.
2.  **Lock Timeout**: Dùng `tryLock(time)` của `ReentrantLock`. Nếu chờ 5s không được thì bỏ cuộc, trả lỗi, đừng chờ mãi mãi.

## 5. ExecutorService: Quản lý Thread như Pro

Trong Enterprise App, `new Thread()` thủ công là điều **CẤM KỴ**. Bởi vì nếu không kiểm soát số lượng, một đợt DDOS nhỏ cũng khiến server OutOfMemory ngay.

Hãy dùng **ThreadPool**:

```java
// Chỉ cho phép tối đa 10 thread chạy cùng lúc
ExecutorService executor = Executors.newFixedThreadPool(10);

for (int i = 0; i < 1000; i++) {
    executor.submit(() -> {
        System.out.println("Xử lý task bằng " + Thread.currentThread().getName());
        // Code nghiệp vụ ở đây
    });
}
executor.shutdown();
```
Tasks chưa được xử lý sẽ nằm trong **Wait Queue**. Server luôn an toàn, không bao giờ bị quá tải RAM.

## 6. Java 21: Virtual Threads - Kỷ nguyên mới

Đây là thay đổi lớn nhất lịch sử Java. **Virtual Threads (Project Loom)**.
Nó là thread "ảo", siêu nhẹ, được quản lý bởi JVM (không phải OS).
*   **RAM**: Chỉ tốn vài KB (so với 1MB của OS Thread).
*   **Switching**: Cực nhanh.
*   **Blocking**: Khi code gọi DB/API (IO blocking), Virtual Thread tự động "nhường sân" cho thằng khác chạy mà không block OS Thread bên dưới.

```java
// Java 21: Tạo 1 TRIỆU Thread? Chuyện nhỏ!
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 1_000_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(1000); // Ngủ 1s nhưng không tốn tài nguyên
            return i;
        });
    });
}
```
Virtual Thread biến code bất đồng bộ phức tạp (Promises/Reactive) trở lại thành code đồng bộ đơn giản (Imperative style), nhưng hiệu năng vẫn cao khủng khiếp.

## Tổng kết

Concurrency giống như cầm dao mổ trâu. Dùng đúng thì giải quyết bài toán lớn dễ dàng, dùng sai thì... đứt tay.
Hãy bắt đầu với `Safety` (Concurrency không lỗi) trước, sau đó mới tối ưu `Liveness` (Tốc độ). Và nhớ: `Immutability` (Bất biến) là bạn thân nhất của Thread Safety.

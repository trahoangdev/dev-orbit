---
title: "Tối ưu Java Collections: Cuộc chiến giữa List, Set và Map"
excerpt: "Phân tích chuyên sâu về hiệu năng của ArrayList vs LinkedList, cơ chế hoạt động của HashMap và cách lựa chọn cấu trúc dữ liệu tối ưu cho ứng dụng Java."
coverImage: "/assets/blog/preview/java-collections-hieu-nang.png"
date: "2025-12-01"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/java-collections-hieu-nang.png"
tags: ["java", "backend", "performance"]
---

Trong phỏng vấn Java Backend, câu hỏi về **Java Collections Framework (JCF)** luôn là món "khai vị" kinh điển. Nhưng không chỉ dừng lại ở việc *kể tên* các Interface, điều phân biệt giữa một Senior và Junior nằm ở chỗ họ hiểu sâu sắc về **cơ chế hoạt động (internals)** và **độ phức tạp thuật toán (Big O)** của từng loại như thế nào.

Hôm nay, chúng ta sẽ "mổ xẻ" những class phổ biến nhất để xem điều gì thực sự diễn ra bên dưới.

## 1. List Interface: ArrayList vs LinkedList - Huyền thoại và Sự thật

Hầu hết sách giáo khoa đều dạy:
> "Dùng `ArrayList` khi truy xuất nhiều, dùng `LinkedList` khi thêm/xóa nhiều."

Thực tế năm 2025: **Hãy dùng `ArrayList` cho 99% trường hợp.** Tại sao?

### Memory Locality (Tính cục bộ bộ nhớ)
*   **ArrayList**: Lưu trữ dữ liệu trong một mảng liên tục (contiguous array). Khi CPU load một phần tử, nó sẽ load luôn các phần tử lân cận vào **CPU Cache Line**. Điều này giúp việc duyệt mảng cực nhanh.
*   **LinkedList**: Các Node nằm rải rác trong Heap memory. Để duyệt, CPU phải nhảy cóc (pointer chasing) lung tung trong bộ nhớ, gây ra **Cache Miss** liên tục.

### Benchmark Thêm/Xóa
Dù lý thuyết nói `LinkedList` remove là O(1), nhưng trước đó bạn phải tốn O(n) để *tìm* ra node cần xóa. Trong khi đó, `ArrayList` dùng `System.arraycopy` (native code) để dịch chuyển phần tử cực nhanh. Trừ khi bạn đang làm việc với Queue/Deque, `LinkedList` hiếm khi thắng `ArrayList`.

```java
// Tip: Luôn khởi tạo ArrayList với capacity dự kiến để tránh resize mảng
List<String> users = new ArrayList<>(10000); 
```

## 2. Map Interface: Bí mật của HashMap

`HashMap` là trái tim của rất nhiều hệ thống. Hiểu nó là điều bắt buộc.

### Cơ chế Put/Get (Java 8+)
1.  **Hashing**: Tính `hashCode()` của Key.
2.  **Indexing**: Dùng bit manipulation `(n - 1) & hash` để tìm bucket (ngăn chứa).
3.  **Collision Handling**:
    *   Nếu bucket trống: Thêm Node mới.
    *   Nếu bucket đã có (Collision): Java dùng **Linked List** để nối đuôi.
    *   **Đặc biệt**: Khi Linked List dài quá 8 phần tử (TREEIFY_THRESHOLD), nó sẽ tự động chuyển thành **Red-Black Tree** (Cây đỏ đen) để giảm độ phức tạp tìm kiếm từ O(n) xuống **O(log n)**.

```java
/*
 * Vì sao String hay được dùng làm Key?
 * Vì String là Immutable và cache lại hash code. 
 * Tính hash 1 lần, dùng mãi mãi -> Hiệu năng cực cao.
 */
Map<String, User> userMap = new HashMap<>();
```

## 3. Set Interface: HashSet vs TreeSet

*   **HashSet**: Thực chất bên dưới nó dùng... `HashMap`! Key là phần tử bạn thêm vào, Value là một dummy object (`PRESENT`). Tốc độ O(1). Dùng khi cần lọc trùng và không quan tâm thứ tự.
*   **TreeSet**: Implement `NavigableSet`, bên dưới dùng `TreeMap` (Red-Black Tree). Tốc độ O(log n). Dùng khi cần dữ liệu luôn được **sắp xếp**.

### Ví dụ thực tế: Lọc danh sách IP blacklisted

```java
// Dùng HashSet cho tốc độ tra cứu cực nhanh O(1)
Set<String> blacklistedIps = new HashSet<>();
blacklistedIps.add("192.168.1.1");

if (blacklistedIps.contains(incomingIp)) {
    blockUser();
}
```

## 4. Concurrent Collections: An toàn trong đa luồng

Đừng bao giờ dùng `HashMap` trong môi trường Multi-thread nếu không muốn bị race condition hoặc infinite loop (trong Java 7).

*   **Vector / Hashtable**: Cổ lỗ sĩ, synchronize toàn bộ method -> Nút thắt cổ chai (Bottleneck). **Đừng dùng**.
*   **Collections.synchronizedMap**: Tương tự như trên, lock trên `this`.
*   **ConcurrentHashMap**: Ngôi sao sáng. Nó chia Map thành các **Segments** (hoặc dùng CAS & synchronized block trên từng Node trong Java 8) để lock mịn hơn (fine-grained locking). Nhiều luồng có thể đọc/ghi đồng thời trên các bucket khác nhau mà không chặn nhau.

## Tổng kết

| Collection | Get | Add | Remove | Note |
| :--- | :--- | :--- | :--- | :--- |
| **ArrayList** | O(1) | O(1)* | O(n) | Nhanh, cache-friendly. Mặc định nên dùng. |
| **LinkedList** | O(n) | O(1) | O(1) | Tốn bộ nhớ, cache-miss nhiều. Chỉ dùng làm Queue/Deque. |
| **HashSet** | O(1) | O(1) | O(1) | Không thứ tự. Nhanh nhất để check tồn tại. |
| **TreeSet** | O(log n) | O(log n) | O(log n) | Luôn sắp xếp. |
| **HashMap** | O(1) | O(1) | O(1) | Hiểu về hashCode & equals là bắt buộc. |

Hiểu công cụ mình dùng là bước đầu tiên để trở thành một Software Engineer chuyên nghiệp. Đừng chỉ code cho chạy, hãy code cho **hiệu năng** và **khả năng mở rộng**.

Happy Coding! 🚀

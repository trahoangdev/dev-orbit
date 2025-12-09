---
title: "Tối ưu Java Collections: Cuộc chiến hiệu năng giữa List, Set và Map"
excerpt: "Phân tích `ArrayList` vs `LinkedList` ở mức Memory Layout, bí mật `HashMap` hoạt động với Red-Black Tree, và cách chọn Collection đúng đắn để code chạy nhanh như gió."
coverImage: "/assets/blog/preview/java-collections-hieu-nang.png"
date: "2025-12-01"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/java-collections-hieu-nang.png"
tags: ["java", "backend", "performance", "algorithms"]
---

Trong các buổi phỏng vấn Java Backend, câu hỏi về **Java Collections Framework (JCF)** luôn là món "khai vị" kinh điển. Nhưng không chỉ dừng lại ở việc *kể tên* các Interface, điều phân biệt giữa một Senior và Junior nằm ở chỗ họ hiểu sâu sắc về **cơ chế hoạt động (internals)**, **quản lý bộ nhớ** và **độ phức tạp thuật toán (Big O)** của từng loại.

Hôm nay, chúng ta sẽ "mổ xẻ" những class phổ biến nhất để xem điều gì thực sự diễn ra bên dưới lớp vỏ bọc API tiện dụng đó.

## 1. List: ArrayList vs LinkedList - Huyền thoại và Sự thật

Hầu hết sách giáo khoa cũ đều dạy máy móc rằng:
> "Dùng `ArrayList` khi truy xuất nhiều. Dùng `LinkedList` khi thêm/xóa nhiều."

Thực tế năm 2025: **Hãy dùng `ArrayList` cho 99% trường hợp.** Tại sao lại phũ phàng với `LinkedList` như vậy?

### 1.1. Memory Locality (Tính cục bộ bộ nhớ) - Kẻ quyết định tốc độ
CPU không đọc từng byte từ RAM. Nó đọc từng khối (Cache Line, thường là 64 bytes).

*   **ArrayList**: Dữ liệu là một mảng liên tục (contiguous array) trong RAM. Khi CPU load phần tử `a[i]`, nó vô tình load luôn `a[i+1], a[i+2]...` vào L1/L2 Cache. Do đó, việc duyệt mảng (`for-loop`) cực nhanh nhờ **Cache Hit**.
*   **LinkedList**: Các Node nằm rải rác khắp nơi trong Heap memory (phụ thuộc vào lúc `new Node()`). Để duyệt từ Node A sang Node B, CPU phải nhảy cóc (pointer chasing). Điều này gây ra **Cache Miss** liên tục, khiến CPU phải đợi dữ liệu từ RAM (chậm hơn Cache hàng trăm lần).

### 1.2. Overhead bộ nhớ
*   **ArrayList**: Tốn bộ nhớ đúng bằng kích thước mảng chứa Object Reference. Khá tiết kiệm.
*   **LinkedList**: Với mỗi phần tử, bạn phải "nuôi" thêm một object `Node` béo ú chứa:
    1.  Object Header (12-16 bytes).
    2.  Reference tới Data.
    3.  Reference `Next` node.
    4.  Reference `Prev` node.
    => **Tốn gấp 4-5 lần bộ nhớ** so với ArrayList để chứa cùng một lượng dữ liệu.

### 1.3. Thêm/Xóa có thực sự O(1)?
Lý thuyết nói `LinkedList` remove là O(1). Đúng, NHƯNG chỉ đúng **nếu bạn đã cầm sẵn cái Node đó trong tay**. 
Thực tế: Để xóa phần tử thứ 5000, `LinkedList` phải duyệt từ đầu đến node 5000 (O(n)), sau đó mới link lại pointer (O(1)). Tổng cộng vẫn là O(n).
Trong khi đó, `ArrayList` dùng `System.arraycopy` (native code cực nhanh được tối ưu bởi CPU vector instructions) để dịch chuyển phần tử. Thực tế benchmark thường cho thấy `ArrayList` vẫn thắng hoặc ngang ngửa `LinkedList` kể cả khi thêm/xóa giữa list.

## 2. HashMap: Kiệt tác thuật toán

`HashMap` là cấu trúc dữ liệu quan trọng nhất. Hiểu nó là điều bắt buộc.

### 2.1. Cơ chế cơ bản (Hashing & Buckets)
Bên trong `HashMap` là một mảng các "xô" (buckets).
1.  **Hashing**: Tính `hashCode()` của Key. Java áp dụng thêm hàm `hash()` phụ trợ (`key.hashCode() ^ (h >>> 16)`) để đảo bit, giúp phân tán dữ liệu đều hơn.
2.  **Indexing**: Vị trí `index = (n - 1) & hash`.
3.  **Collision (Va chạm)**: Nếu 2 key khác nhau nhưng cùng rơi vào một bucket? Java dùng **Linked List** để xâu chuỗi chúng lại tại bucket đó.

### 2.2. Sự tiến hóa trong Java 8 (Red-Black Tree)
Nếu Hacker cố tình tạo ra hàng triệu key có cùng hashCode (Hash Flooding Attack), bucket đó sẽ trở thành một Linked List dài vô tận. Tốc độ tìm kiếm tụt từ O(1) xuống **O(n)** -> Server bị treo (Denial of Service).

Để khắc phục, Java 8 đưa ra cơ chế **Treeify**:
*   Khi độ dài Linked List trong 1 bucket > 8 (`TREEIFY_THRESHOLD`).
*   VÀ tổng số phần tử trong Map > 64.
*   -> Java tự động biến Linked List đó thành **Red-Black Tree (Cây đỏ đen)**.

Kết quả: Tốc độ tìm kiếm trong trường hợp xấu nhất được cải thiện từ O(n) về **O(log n)**. Một cải tiến tuyệt vời!

```java
// Tip: String là Key tốt nhất cho HashMap (hoặc ConcurrentHashMap)
// Vì String là Immutable và nó cache lại giá trị hash code ngay lần đầu tính toán.
// Những lần get() sau không cần tính lại hash -> Cực nhanh.
```

## 3. Set: Không chỉ là "Danh sách không trùng"

*   **HashSet**: Thực chất bên dưới là... `HashMap`! Phần tử bạn add vào chính là Key, còn Value là một object rỗng (`private static final Object PRESENT = new Object()`). Tốc độ O(1).
*   **TreeSet**: Implement `NavigableSet`, bên dưới dùng `TreeMap` (Red-Black Tree). Dữ liệu luôn được **sắp xếp** (theo Comparable hoặc Comparator). Tốc độ O(log n). Dùng khi cần hiển thị danh sách theo thứ tự alphabet hoặc điểm số.
*   **LinkedHashSet**: Kết hợp Hash table và Linked list. Giữ nguyên **thứ tự thêm vào** (Insertion Order). Dùng khi bạn muốn deduplicate list input của user nhưng muốn tôn trọng thứ tự họ nhập.

## 4. Concurrent Collections: Đa luồng an toàn

Trong môi trường Multi-thread (như Web Server), dùng `HashMap` hay `ArrayList` thường (không synchronized) sẽ dẫn đến sai lệch dữ liệu hoặc crash app.

*   ❌ **Vector / Hashtable / Collections.synchronizedMap**: Giải pháp cổ lỗ sĩ. Nó dùng `synchronized` trên toàn bộ method. Khi Thread A đang đọc, Thread B không được ghi và cũng không được đọc. -> **Nút thắt cổ chai (Bottleneck)**.
*   ✅ **ConcurrentHashMap**: Ngôi sao sáng.
    *   Nó không lock toàn bộ Map. Nó chỉ lock **từng bucket nhỏ** (Java 7 dùng Segment, Java 8+ dùng CAS và synchronized trên head node).
    *   Cho phép nhiều thread đọc/ghi đồng thời cực nhanh mà vẫn an toàn.
*   ✅ **CopyOnWriteArrayList**: Dùng cho trường hợp **Đọc nhiều - Ghi cực ít** (List cấu hình, List Listener). Mỗi lần thêm/xóa, nó... copy toàn bộ mảng cũ sang mảng mới. Rất an toàn nhưng tốn kém nếu ghi nhiều.

## Tổng kết: Cheat Sheet

| Collection | Get | Add | Contains | Nên dùng khi nào? |
| :--- | :--- | :--- | :--- | :--- |
| **ArrayList** | O(1) | O(1)* | O(n) | Mặc định. Nhanh, nhẹ, cache-friendly. |
| **LinkedList** | O(n) | O(1) | O(n) | Hầu như không dùng. Trừ khi làm Queue/Deque. |
| **HashSet** | O(1) | O(1) | O(1) | Cần tìm kiếm cực nhanh, loại bỏ trùng lặp. |
| **TreeSet** | O(log n) | O(log n) | O(log n) | Cần danh sách luôn sắp xếp tự động. |
| **HashMap** | O(1) | O(1) | O(1) | Key-Value mapping. |
| **ConcurrentHashMap**| O(1) | O(1) | O(1) | Map trong môi trường đa luồng. |

Hiểu công cụ mình dùng là bước đầu tiên để trở thành một Software Engineer chuyên nghiệp. Đừng chỉ code cho chạy, hãy code cho **hiệu năng** và **khả năng mở rộng**.

Happy Coding! 🚀

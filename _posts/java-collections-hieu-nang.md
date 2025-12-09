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
Dù lý thuyết nói `LinkedList` remove là O(1), nhưng trước đó bạn phải tốn O(n) để *tìm* ra node cần xóa. Trong khi đó, `ArrayList` dùng `System.arraycopy` (native code) để dịch chuyển phần tử cực nhanh. 

**Cơ chế Grow của ArrayList:**
Khi mảng đầy, ArrayList sẽ tạo mảng mới có kích thước **1.5 lần** mảng cũ (công thức `oldCapacity + (oldCapacity >> 1)`). Sau đó copy toàn bộ dữ liệu sang. Đây là thao tác tốn kém O(n), nhưng nhờ *amortized analysis* (phân tích khấu hao), trung bình nó vẫn là O(1).

```java
// Tip: Luôn khởi tạo ArrayList với capacity dự kiến để tránh resize mảng
// Nếu bạn biết sẽ chứa 10.000 phần tử, hãy khai báo ngay từ đầu.
List<String> users = new ArrayList<>(10000); 
```

### Overhead của LinkedList
Mỗi phần tử của `ArrayList` chỉ tốn bộ nhớ cho Object đó.
Mỗi phần tử của `LinkedList` tốn thêm bộ nhớ cho: `Node Object Header` + `Previous Pointer` + `Next Pointer`.
=> Với một danh sách Integer, `LinkedList` có thể tốn gấp 4-5 lần bộ nhớ so với `ArrayList`.

## 2. Map Interface: Bí mật của HashMap

`HashMap` là trái tim của rất nhiều hệ thống. Hiểu nó là điều bắt buộc.

### Cơ chế Put/Get (Java 8+)
1.  **Hashing**: Tính `hashCode()` của Key. Java dùng thêm một hàm `hash()` phụ trợ (`key.hashCode() ^ (h >>> 16)`) để đảo bit, giúp phân tán dữ liệu đều hơn (giảm va chạm).
2.  **Indexing**: Dùng bit manipulation `(n - 1) & hash` để tìm bucket (ngăn chứa).
3.  **Collision Handling**:
    *   Nếu bucket trống: Thêm Node mới.
    *   Nếu bucket đã có (Collision): Java dùng **Linked List** để nối đuôi.
    *   **Đặc biệt**: Khi Linked List dài quá 8 phần tử (TREEIFY_THRESHOLD) và mảng có độ dài > 64, nó sẽ tự động chuyển thành **Red-Black Tree** (Cây đỏ đen) để giảm độ phức tạp tìm kiếm từ O(n) xuống **O(log n)**.

```java
/*
 * Vì sao String hay được dùng làm Key?
 * Vì String là Immutable và cache lại hash code (biến hash). 
 * Tính hash 1 lần, dùng mãi mãi -> Hiệu năng cực cao khi làm Key.
 */
Map<String, User> userMap = new HashMap<>();
```

### Load Factor và Resize
Mặc định `loadFactor` là 0.75. Nghĩa là khi Map đầy 75%, nó sẽ nhân đôi kích thước mảng bucket (Rehashing).
Quá trình Rehashing cực kỳ tốn kém vì phải tính lại vị trí cho TẤT CẢ phần tử.
-> **Tip Performance**: Nếu biết trước số lượng, hãy set initial capacity: `new HashMap<>(expectedSize / 0.75 + 1)`.

## 3. Set Interface: HashSet vs TreeSet vs LinkedHashSet

*   **HashSet**: Thực chất bên dưới nó dùng... `HashMap`! Key là phần tử bạn thêm vào, Value là một dummy object (`PRESENT = new Object()`). Tốc độ O(1). Dùng khi cần lọc trùng và không quan tâm thứ tự.
*   **TreeSet**: Implement `NavigableSet`, bên dưới dùng `TreeMap` (Red-Black Tree). Tốc độ O(log n). Dùng khi cần dữ liệu luôn được **sắp xếp** (ví dụ: Top leaderboards).
*   **LinkedHashSet**: Kết hợp giữa Hash table và Linked list. Nó giữ nguyên **thứ tự thêm vào** (Insertion Order). Dùng khi bạn muốn deduplicate list mà không làm đảo lộn thứ tự.

### Ví dụ thực tế: Lọc danh sách IP blacklisted

```java
// Dùng HashSet cho tốc độ tra cứu cực nhanh O(1)
Set<String> blacklistedIps = new HashSet<>();
blacklistedIps.add("192.168.1.1");
blacklistedIps.add("10.0.0.1");

// Kiểm tra 1 triệu request xem có nằm trong blacklist không
if (blacklistedIps.contains(incomingIp)) {
    blockUser();
}
```

## 4. Immutable Collections (Java 9+)

Từ Java 9, chúng ta có `List.of()`, `Set.of()`, `Map.of()`.
Đặc điểm:
*   Bất biến (Immutable): Gọi `.add()`, `.remove()` sẽ ném `UnsupportedOperationException`.
*   Không cho phép `null`.
*   Hiệu năng cao hơn do không cần tính toán resize.
*   Thread-safe (vì bất biến).

```java
List<String> cities = List.of("Hanoi", "Saigon", "Danang");
// cities.add("Hue"); // Bắn Exception ngay lập tức
```

## 5. Concurrent Collections: An toàn trong đa luồng

Đừng bao giờ dùng `HashMap` trong môi trường Multi-thread nếu không muốn bị race condition hoặc infinite loop (trong Java 7).

*   **Vector / Hashtable**: Cổ lỗ sĩ, synchronize toàn bộ method -> Nút thắt cổ chai (Bottleneck). **Đừng dùng**.
*   **Collections.synchronizedMap**: Tương tự như trên, lock trên `this`.
*   **ConcurrentHashMap**: Ngôi sao sáng. 
    *   **Java 7**: Dùng Segment Locking (chia map thành 16 mảnh nhỏ để lock riêng).
    *   **Java 8+**: Dùng `CAS` (Compare-And-Swap) cho việc thêm node mới và `synchronized` block chỉ trên node đầu bucket (head node) khi có va chạm. Cực kỳ tối ưu.
    *   Hỗ trợ `ConcurrentHashMap.KeySetView` để dùng như ConcurrentHashSet.
*   **CopyOnWriteArrayList**: Dùng khi đọc cực nhiều nhưng ghi cực ít (ví dụ: List Listeners). Mỗi lần ghi (add/remove) nó sẽ copy toàn bộ mảng cũ sang mảng mới -> Rất tốn kém nếu ghi nhiều.

## Tổng kết

Bảng `cheat sheet` cho anh em lựa chọn:

| Collection | Get | Add | Remove | Contains | Note |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ArrayList** | O(1) | O(1)* | O(n) | O(n) | Nhanh, cache-friendly. Mặc định nên dùng. *Amortized O(1). |
| **LinkedList** | O(n) | O(1) | O(1) | O(n) | Tốn bộ nhớ, cache-miss nhiều. Chỉ dùng làm Queue/Deque. |
| **HashSet** | O(1) | O(1) | O(1) | O(1) | Không thứ tự. Nhanh nhất để check tồn tại (Deduplicate). |
| **TreeSet** | O(log n) | O(log n) | O(log n) | O(log n) | Luôn sắp xếp. Chậm hơn HashSet. |
| **LinkedHashSet**| O(1) | O(1) | O(1) | O(1) | Giữ thứ tự insert. Tốn thêm bộ nhớ cho pointer. |
| **HashMap** | O(1) | O(1) | O(1) | O(1) | Hiểu về hashCode & equals là bắt buộc. |

Hiểu công cụ mình dùng là bước đầu tiên để trở thành một Software Engineer chuyên nghiệp. Đừng chỉ code cho chạy, hãy code cho **hiệu năng** và **khả năng mở rộng**.

Happy Coding! 🚀

---
title: "JavaScript Asynchronous: Giải mã Event Loop & Async Await"
excerpt: "Hiểu sâu về cơ chế đơn luồng của JS: Call Stack, Web APIs, Microtask Queue và cách làm chủ Async/Await để tránh những lỗi Waterfall chết người."
coverImage: "/assets/blog/preview/javascript-async-await.png"
date: "2025-12-04"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra2.png"
ogImage:
  url: "/assets/blog/preview/javascript-async-await.png"
tags: ["javascript", "frontend", "async", "event-loop"]
---

JavaScript là ngôn ngữ **Single-threaded** (đơn luồng). Nghĩa là tại một thời điểm, nó chỉ có thể chạy đúng 1 dòng lệnh, trên 1 nhân CPU.
Vậy câu hỏi triệu đô: **Tại sao JS có thể xử lý hàng ngàn request đồng thời, fetch API ầm ầm, hiệu ứng mượt mà mà không bị treo (Freeze)?**

Mọi bí mật nằm ở **Event Loop**.

## 1. Kiến trúc Runtime: Bức tranh toàn cảnh

JS Runtime (V8 Engine trong Chrome/Node.js) không chạy một mình. Nó phối hợp nhịp nhàng giữa các bộ phận:

1.  **Call Stack (Ngăn xếp)**: Nơi thực thi code chính (Main Thread). Code chạy kiểu LIFO (Vào sau ra trước). Đây là nơi duy nhất code JS thực sự chạy.
2.  **Web APIs** (Browser) / **C++ APIs** (Node): Đây là các thread ngầm (đa luồng) do trình duyệt/OS cung cấp. `setTimeout`, `fetch`, `DOM Events` thực chất chạy ở đây, KHÔNG chạy trên thread chính của JS.
3.  **Callback Queue (Task Queue)**: Hàng đợi chứa các kết quả trả về từ Web APIs (`setTimeout` xong, click event xảy ra...).
4.  **Microtask Queue (VIP Queue)**: Hàng đợi ưu tiên cao, dành riêng cho `Promise` và `MutationObserver`.

## 2. Event Loop: Gã điều phối cần mẫn

Event Loop là một vòng lặp vô tận, hoạt động theo thuật toán cực đơn giản:

```javascript
while (true) {
  if (CallStack.isEmpty()) {
    // 1. Ưu tiên chạy hết sạch Microtask (Promise)
    while (!MicrotaskQueue.isEmpty()) {
      execute(MicrotaskQueue.dequeue());
    }

    // 2. Nếu rảnh thì mới bốc 1 cái Macrotask (setTimeout) lên chạy
    if (!CallbackQueue.isEmpty()) {
      execute(CallbackQueue.dequeue());
    }
  }
}
```

**Ví dụ Hack Não:**
```javascript
console.log('1');

setTimeout(() => console.log('2'), 0); // Macrotask

Promise.resolve().then(() => console.log('3')); // Microtask

console.log('4');

// Output: 1 -> 4 -> 3 -> 2
// Dù setTimeout 0ms, nó vẫn là công dân hạng 2, phải xếp hàng sau Promise (hạng VIP).
```

## 3. Async/Await: Cú pháp "Kẹo ngọt" (Syntactic Sugar)

Ngày xưa dùng Callback Hell (`callback(Result, callback2...)`) quá khổ sở. JS đẻ ra Promise.
Promise vẫn hơi rối (`.then().then()`). ES2017 đẻ ra `Async/Await`.

Thực chất, `async/await` chỉ là cách viết khác của Promise, giúp code bất đồng bộ **trông có vẻ như** đồng bộ (Top-down), dễ đọc hơn.

```javascript
async function main() {
  try {
    console.log("Bat dau fetch...");
    const data = await fetchUser(); // Tạm dừng hàm main, nhường Thread cho việc khác
    console.log("Co data:", data);  // Chỉ chạy khi fetchUser xong (Promise resolved)
  } catch (err) {
    console.error("Loi:", err);     // Bắt lỗi reject dễ dàng như code đồng bộ
  }
}
```

## 4. Những sai lầm "chết người" về hiệu năng

### Lỗi 1: Waterfall (Tuần tự hóa vô lý)
Bạn cần lấy User và Posts. 2 cái này không liên quan nhau.

❌ **Cách viết chậm (Tuần tự):**
```javascript
const user = await getUser();   // Mất 2s
const posts = await getPosts(); // Mất 2s
// Tổng cộng: 4s chờ đợi
```

✅ **Cách viết nhanh (Song song - Parallel):**
```javascript
// Bắn cả 2 request đi cùng lúc
const userPromise = getUser();
const postsPromise = getPosts();

// Chờ cả 2 quay về
const user = await userPromise;
const posts = await postsPromise;
// Tổng cộng: Max(2s, 2s) = 2s. Nhanh gấp đôi!
```

Hoặc xịn hơn dùng `Promise.all`:
```javascript
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

### Lỗi 2: Await trong vòng lặp (ForEach)
`forEach` của Array không hỗ trợ `await`.

❌ **Sai:**
```javascript
users.forEach(async (u) => {
  await save(u); 
});
console.log("Done"); 
// Chữ "Done" sẽ hiện ra TRƯỚC khi save xong. Code chạy loạn xạ.
```

✅ **Đúng (Tuần tự):** Dùng `for...of`
```javascript
for (const u of users) {
  await save(u); // Xong ông này mới tới ông kia
}
```

✅ **Đúng (Song song - Nhanh nhất):** `Promise.all` + `map`
```javascript
await Promise.all(users.map(u => save(u))); // Chạy 100 ông cùng lúc
```

## Tổng kết

*   JS đơn luồng nhưng nhờ Event Loop và Web APIs nên nó xử lý I/O cực đỉnh.
*   Microtask (Promise) luôn được ưu tiên chạy trước Macrotask (SetTimeout).
*   Hãy dùng `Async/Await` cho code sạch, nhưng đừng quên tư duy `Parallel` (Song song) với `Promise.all` để tối ưu tốc độ.

Làm chủ Event Loop chính là chìa khóa để trở thành Senior JavaScript Developer.

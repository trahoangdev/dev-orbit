---
title: "JavaScript Asynchronous: Từ cơ chế Event Loop đến Async/Await"
excerpt: "Đào sâu vào cơ chế hoạt động của JavaScript Engine: Call Stack, Event Loop, Microtask Queue và cách làm chủ lập trình bất đồng bộ."
coverImage: "/assets/blog/preview/javascript-async-await.png"
date: "2025-12-04"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/javascript-async-await.png"
tags: ["javascript", "frontend", "async"]
---

JavaScript là ngôn ngữ **Single-threaded** (đơn luồng). Điều này có nghĩa là tại một thời điểm, nó chỉ có thể làm **một việc duy nhất**. Vậy tại sao JS có thể xử lý hàng ngàn request đồng thời, fetch API ầm ầm mà không bị treo giao diện?

Câu trả lời nằm ở **Event Loop** - trái tim của JavaScript Runtime.

## 1. Kiến trúc JavaScript Runtime

Hãy tưởng tượng JS Runtime (như V8 trong Chrome) gồm các thành phần:

*   **Call Stack**: Nơi thực thi code. Code chạy theo nguyên tắc LIFO (Last In, First Out). Stack chỉ có 1 cái duy nhất. Nếu bạn chặn Stack (ví dụ `while(true)`), trình duyệt sẽ đơ (Freeze).
*   **Web APIs** (Browser) / **C++ APIs** (Node.js): Nơi xử lý các tác vụ nặng như `setTimeout`, `fetch`, DOM events, File I/O. Đây là nơi "phép màu" đa luồng diễn ra. Trình duyệt tự dùng các thread C++ ngầm để xử lý, không liên quan thread chính JS.
*   **Callback Queue (Task Queue)**: Hàng đợi chứa các callback của `setTimeout`, `setInterval`.
*   **Microtask Queue**: Hàng đợi VIP, chứa các callback của `Promise.then`, `queueMicrotask`, `MutationObserver`.

## 2. Event Loop hoạt động như thế nào?

Event Loop có một nhiệm vụ đơn giản nhưng quan trọng, lặp đi lặp lại vô tận:

1.  Kiểm tra **Call Stack** có rỗng không?
2.  Nếu Stack rỗng:
    *   Kiểm tra **Microtask Queue**. Chạy **HẾT** các task trong Microtask Queue cho đến khi rỗng. (Đây là lý do Promise thường chạy trước setTimeout).
    *   Nếu Microtask Queue rỗng, mới lấy **MỘT** task từ **Callback Queue** (Macrotask) đẩy vào Stack.
3.  Lặp lại.

```javascript
console.log('1. Script start');

setTimeout(() => {
  console.log('2. setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise 1');
})
.then(() => {
    console.log('4. Promise 2');
});

console.log('5. Script end');

// Output thứ tự:
// 1. Script start (Stack)
// 5. Script end    (Stack)
// 3. Promise 1     (Microtask)
// 4. Promise 2     (Microtask - chained)
// 2. setTimeout    (Macrotask - dù set 0ms vẫn phải xếp hàng sau Microtask)
```

## 3. Promise: Sự cứu rỗi khỏi Callback Hell

Ngày xưa (`jQuery`), chúng ta viết:
```javascript
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
             // Chào mừng đến địa ngục hình tam giác
        });
    });
});
```

Promise giải quyết vấn đề "đảo ngược điều khiển" (Inversion of Control) và Indentation.
Các method quan trọng:
*   `Promise.all([p1, p2])`: Chạy song song, chờ cả 2 xong (Fail-fast: 1 cái lỗi là reject hết).
*   `Promise.allSettled([p1, p2])`: Chờ cả 2 xong, không quan tâm thành công hay thất bại.
*   `Promise.race([p1, p2])`: Lấy kết quả của cái nào xong trước.

## 4. Async/Await: Chân ái (ES2017)

`async/await` thực chất là **Syntactic Sugar** (cú pháp kẹo ngọt) cho Promise. Nó giúp code bất đồng bộ nhìn như code đồng bộ (top-down), dễ đọc và dễ try-catch hơn hẳn.

```javascript
async function fetchUser() {
    try {
        const response = await fetch('/api/user'); // Dừng tại đây, trả control cho Event Loop
        const user = await response.json();        // Khi nào có data, nhảy lại vào stack chạy tiếp
        console.log(user);
    } catch (error) {
        console.error("Lỗi rồi:", error);
    }
}
```

## 5. Sai lầm chết người khi dùng Async/Await

### Lỗi 1: "Tuần tự hóa" không cần thiết (Waterfall)
Rất nhiều dev viết như này:
```javascript
// ❌ Chậm: Chạy tuần tự, mất 2s + 2s = 4s
const user = await getUser();
const posts = await getPosts();
```
Tại sao phải chờ lấy user xong mới đi lấy posts? 2 việc này không liên quan nhau.

```javascript
// ✅ Nhanh: Chạy song song (Parallel), mất max(2s, 2s) = 2s
const userPromise = getUser();
const postsPromise = getPosts();

const user = await userPromise;
const posts = await postsPromise;

// Hoặc clean hơn:
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

### Lỗi 2: Dùng `await` trong `forEach`
`forEach` không được thiết kế cho async. Nó chỉ gọi callback rồi bỏ qua, không chờ await.

```javascript
// ❌ Sai: Code sẽ chạy xong trước khi các saveToDb hoàn tất
users.forEach(async (user) => {
    await saveToDb(user);
});
console.log('Done'); // Dòng này in ra TRƯỚC khi save xong!

// ✅ Giải pháp 1: Dùng for...of (Tuần tự)
for (const user of users) {
    await saveToDb(user); 
}

// ✅ Giải pháp 2: Promise.all + map (Song song) - Nhanh nhất
await Promise.all(users.map(user => saveToDb(user)));
```

### Lỗi 3: Quên Handle Error
Khi dùng `await`, nếu Promise reject, nó sẽ throw Error. Nếu không có `try...catch`, app (hoặc component React) sẽ crash. 
Trong Node.js, nó có thể làm crash cả process server (`UnhandledPromiseRejectionWarning`).

## Tổng kết

Hiểu về Event Loop giúp bạn gỡ rối những bug khó đỡ liên quan đến thứ tự hiển thị UI hay dữ liệu không đồng nhất. `Async/Await` rất mạnh, nhưng hãy dùng nó một cách khôn ngoan, đặc biệt là tận dụng `Promise.all` để tối ưu hiệu năng.

JavaScript không đơn thuần là "kịch bản", nó là cả một hệ thống điều phối tinh vi.

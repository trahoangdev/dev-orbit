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

*   **Call Stack**: Nơi thực thi code. Code chạy theo nguyên tắc LIFO (Last In, First Out).
*   **Web APIs** (Browser) / **C++ APIs** (Node.js): Nơi xử lý các tác vụ nặng như `setTimeout`, `fetch`, DOM events. Đây là nơi "phép màu" đa luồng diễn ra (nhưng nằm ngoài JS thread).
*   **Callback Queue (Task Queue)**: Hàng đợi chứa các callback của `setTimeout`, `setInterval`.
*   **Microtask Queue**: Hàng đợi VIP, chứa các callback của `Promise`, `queueMicrotask`.

## 2. Event Loop hoạt động như thế nào?

Event Loop có một nhiệm vụ đơn giản nhưng quan trọng:

1.  Kiểm tra **Call Stack** có rỗng không?
2.  Nếu Stack rỗng, kiểm tra **Microtask Queue**. Nếu có, đẩy hết vào Stack để chạy.
3.  Nếu Microtask Queue rỗng, mới kiểm tra **Callback Queue**. Lấy **một** task đẩy vào Stack.
4.  Lặp lại.

> **Quy tắc vàng:** Microtask (Promise) luôn có độ ưu tiên cao hơn Macrotask (setTimeout).

```javascript
console.log('1. Script start');

setTimeout(() => {
  console.log('2. setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise');
});

console.log('4. Script end');

// Output:
// 1. Script start
// 4. Script end
// 3. Promise  <-- Promise chen ngang trước setTimeout dù setTimeout 0ms
// 2. setTimeout
```

## 3. Từ Callback Hell đến Async/Await

### Thời kỳ đen tối: Callback Hell
```javascript
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            getMoreData(c, function(d) {
                 // Chào mừng đến địa ngục hình tam giác
            });
        });
    });
});
```

### Sự cứu rỗi: Promise
Promise giúp code phẳng hơn và xử lý lỗi tập trung (`.catch`). Nhưng vẫn còn hơi rườm rà với `.then()`.

### Chân ái: Async/Await (ES2017)
`async/await` thực chất là **Syntactic Sugar** (cú pháp kẹo ngọt) cho Promise. Nó giúp code bất đồng bộ nhìn như code đồng bộ.

```javascript
async function fetchUser() {
    try {
        const response = await fetch('/api/user');
        const user = await response.json();
        console.log(user);
    } catch (error) {
        console.error("Lỗi rồi:", error);
    }
}
```

## 4. Sai lầm chết người khi dùng Async/Await

### Lỗi 1: Quên `await`
Kết quả trả về là một Promise object chứ không phải dữ liệu thật.

### Lỗi 2: Tuần tự hóa không cần thiết (Waterfall)
```javascript
// ❌ Chậm: Chạy tuần tự, mất 2s + 2s = 4s
const user = await getUser();
const posts = await getPosts();

// ✅ Nhanh: Chạy song song (Parallel), mất max(2s, 2s) = 2s
const [user, posts] = await Promise.all([
    getUser(),
    getPosts()
]);
```

### Lỗi 3: Dùng `await` trong `forEach`
`forEach` không hỗ trợ async. Nó sẽ không đợi callback async chạy xong.
**Giải pháp**: Dùng vòng lặp `for...of` hoặc `Promise.all` với `map`.

```javascript
// ❌ Sai: Code sẽ chạy xong trước khi các saveToDb hoàn tất
users.forEach(async (user) => {
    await saveToDb(user);
});

// ✅ Đúng
for (const user of users) {
    await saveToDb(user); // Tuần tự
}

// ✅ Đúng và nhanh hơn (Song song)
await Promise.all(users.map(user => saveToDb(user)));
```

## Tổng kết

Hiểu về Event Loop giúp bạn gỡ rối những bug khó đỡ liên quan đến thứ tự hiển thị UI hay dữ liệu không đồng nhất. `Async/Await` rất mạnh, nhưng hãy dùng nó một cách khôn ngoan, đặc biệt là khi xử lý các tác vụ song song `Promise.all`.

JavaScript không đơn thuần là "kịch bản", nó là cả một hệ thống điều phối tinh vi.

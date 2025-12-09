---
title: "JavaScript ES6+: Những tính năng 'phải biết' năm 2025"
excerpt: "Tổng hợp các tính năng Modern JavaScript (ES6 đến ES15) định hình cách chúng ta code ngày nay: Arrow Functions, Destructuring, Optional Chaining, Nullish Coalescing..."
coverImage: "/assets/blog/preview/javascript-es6.png"
date: "2025-12-05"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/javascript-es6.png"
tags: ["javascript", "frontend", "es6", "tips"]
---

Ngày xưa, code JavaScript giống như đi xe đạp. Còn bây giờ với **Modern JavaScript (ES6+)**, chúng ta đang lái siêu xe.

Nếu bạn quay lại code JS sau một thời gian code Java/C#, hoặc bạn là newbie đang học JS, bài viết này sẽ tổng hợp những "vũ khí" lợi hại nhất mà bạn **bắt buộc phải biết** để không trở thành "người tối cổ" trong mắt đồng nghiệp.

## 1. Let & Const (Quên cái `var` đi)

Đây là quy tắc số 1: **Đừng bao giờ dùng `var` nữa.**

*   **`var`**: Scope tùm lum (Function Scope), dễ gây lỗi hoisting (dùng trước khi khai báo).
*   **`let/const`**: Block Scope (trong `{}`), chặt chẽ và an toàn.

```javascript
// ❌ BAD (var)
if (true) {
  var x = 10;
}
console.log(x); // 10 -> Vẫn truy cập được bên ngoài if? Vô lý!

// ✅ GOOD (let/const)
if (true) {
  let y = 10;
  const PI = 3.14;
}
// console.log(y); // ReferenceError: y is not defined -> Chuẩn cơm mẹ nấu!
```

> **Tip**: Luôn dùng **`const`** mặc định. Chỉ dùng **`let`** khi bạn thực sự cần gán lại giá trị cho biến đó.

## 2. Arrow Function: Viết code hay làm thơ?

Không chỉ giúp code ngắn gọn, Arrow Function còn giải quyết nỗi đau `this` (cái bóng ma ám ảnh bao thế hệ dev JS).

```javascript
// Truyền thống
const sum = function(a, b) {
  return a + b;
};

// Arrow Function
const sum = (a, b) => a + b; // Implicit return nếu chỉ có 1 dòng

// Ứng dụng trong Array Method (Cực phê)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]
```

**Lưu ý:** Arrow Function không có `this` của riêng nó, nó lấy `this` từ context bao quanh (Lexical scoping). Cực tiện khi dùng trong Callback hoặc Event Handler của React/Class.

## 3. Destructuring & Spread Operator: Ma thuật cú pháp

### Destructuring (Bóc tách)

Giúp bạn lấy dữ liệu từ Object/Array nhanh như một cơn gió.

```javascript
const user = {
  name: "Hoàng Trọng Trà",
  age: 22,
  address: {
    city: "HCMC",
    district: "Binh Thanh"
  }
};

// Cách cũ: const city = user.address.city;

// Cách mới (Xịn sò)
const { name, address: { city } } = user; 
console.log(name, city); // "Hoàng Trọng Trà", "HCMC"
```

### Spread Operator (`...`)

Dùng để copy, gộp mảng/object.

```javascript
const listA = [1, 2];
const listB = [3, 4];

// Gộp mảng - Không cần dùng concat()
const combined = [...listA, ...listB]; // [1, 2, 3, 4]

// Copy Object (Shallow copy)
const cloneUser = { ...user, role: "ADMIN" }; 
// Tạo object mới giống hệt user cũ, nhưng đè thuộc tính role
```

## 4. Modern Operators: Code ít, hiểu nhiều

Hai toán tử mới xuất hiện gần đây (ES2020) đã cứu rỗi cuộc đời dev JS khỏi hàng tá dòng `if/else`.

### Optional Chaining (`?.`) - "Nếu có thì đi tiếp"

Không còn nỗi lo `Cannot read property 'x' of undefined`.

```javascript
// ❌ Cũ: Kiểm tra từng cấp
if (user && user.address && user.address.street) {
  console.log(user.address.street);
}

// ✅ Mới: Một phát ăn ngay
console.log(user?.address?.street); 
// Nếu user null -> dừng -> trả về undefined. Không crash app!
```

### Nullish Coalescing (`??`) - "Nếu rỗng thì lấy mặc định"

Khác với `||` (OR), `??` chỉ bắt `null` hoặc `undefined`, **không** bắt `0` hay `""` (chuỗi rỗng).

```javascript
const count = 0;

// Dùng ||
const result1 = count || 10; // Result = 10 (Sai! 0 là giá trị hợp lệ mà)

// Dùng ??
const result2 = count ?? 10; // Result = 0 (Đúng ý đồ)
```

## 5. Async/Await: Tạm biệt Callback Hell

Xử lý bất đồng bộ (Asynchronous) chưa bao giờ dễ đọc đến thế. Nó biến code bất đồng bộ nhìn "như là" đồng bộ (Synchronous).

```javascript
// Promise Chain (Hơi rối)
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/Await (Sạch đẹp, dễ try/catch)
const loadUsers = async () => {
  try {
    const res = await fetch('/api/users');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Lỗi rồi:", err);
  }
};
```

## 6. Template Literals: String thần thánh

Quên dấu `+` để nối chuỗi đi. Dùng backtick (`` ` ``) và `${}`.

```javascript
const name = "DevOrbit";
const greeting = `Chào mừng bạn đến với ${name}, 
nơi chúng ta có thể viết chuỗi trên nhiều dòng 
mà không cần dùng ký tự \n phức tạp.`;
```

## Tổng kết

JavaScript phát triển cực nhanh (mỗi năm một bản ES mới). Việc nắm vững những tính năng trên không chỉ giúp code bạn ngắn hơn, sạch hơn mà còn giúp bạn dễ dàng tiếp cận các Framework hiện đại như React, Vue hay backend với Node.js.

Hãy tập thói quen dùng chúng mỗi ngày thay vì cú pháp cũ, bạn sẽ thấy mình "lên trình" rõ rệt đấy! Happy Coding! 🚀

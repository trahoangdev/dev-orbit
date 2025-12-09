---
title: "ES6+ Features: Vũ khí tối thượng của Modern JS Developer"
excerpt: "Không chỉ là Arrow Function. Hãy làm chủ Destructuring, Spread Operator, Optional Chaining và Nullish Coalescing để viết code JS ngắn gọn và an toàn hơn."
coverImage: "/assets/blog/preview/javascript-es6-cho-nguoi-moi.png"
date: "2025-12-05"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/javascript-es6-cho-nguoi-moi.png"
tags: ["javascript", "es6", "frontend"]
---

Nếu bạn vẫn đang viết `var` và nối chuỗi bằng dấu `+`, chào mừng bạn đến với cỗ máy thời gian, nhưng chúng ta đang ở năm 2025 rồi!

ES6 (ECMAScript 2015) và các phiên bản sau nó (ES2020+) đã thay đổi hoàn toàn bộ mặt của JavaScript. Dưới đây là những tính năng "sát thủ" mà bạn dùng hàng ngày trong React/Next.js.

## 1. Destructuring: "Mổ xẻ" Object/Array

Đừng viết:
```javascript
const name = user.name;
const age = user.age;
const city = user.address.city;
```

Hãy viết:
```javascript
const { name, age, address: { city } } = user;
```
Destructuring không chỉ giúp tiết kiệm dòng code, mà còn giúp trích xuất dữ liệu sâu (nested) cực kỳ thanh lịch. Bạn cũng có thể gán giá trị mặc định: `const { role = 'GUEST' } = user;`

## 2. Spread & Rest Operator (...)

*   **Spread (Rải ra):** Copy object/array nông (shallow copy) hoặc gộp chúng lại.
    ```javascript
    const baseUser = { name: 'Tra', age: 22 };
    // Clone và ghi đè thuộc tính - Pattern cực phổ biến trong Redux/State Management
    const updatedUser = { ...baseUser, age: 23, role: 'ADMIN' }; 
    ```

*   **Rest (Gom lại):** Dùng trong tham số hàm.
    ```javascript
    function sum(...numbers) {
        return numbers.reduce((a, b) => a + b, 0);
    }
    ```

## 3. Optional Chaining (?.) & Nullish Coalescing (??)

Đây là cặp đôi hoàn hảo để trị lỗi `Cannot read property of undefined`.

**Ngày xưa:**
```javascript
const street = user && user.address && user.address.street;
```

**Ngày nay (ES2020):**
```javascript
const street = user?.address?.street; // Nếu user null, trả về undefined luôn, không crash
```

**Nullish Coalescing (??):** Chỉ lấy giá trị mặc định nếu bên trái là `null` hoặc `undefined`. Khác với `||` (OR) là nó không bắt các giá trị falsy như `0` hay `""`.

```javascript
const amount = 0;
const display1 = amount || 10; // ra 10 -> Sai logic vì 0 là số lượng hợp lệ
const display2 = amount ?? 10; // ra 0 -> Đúng
```

## 4. Arrow Function và cạm bẫy `this`

Arrow function `() => {}` không chỉ là cách viết tắt. Sự khác biệt cốt lõi là **Context (ngữ cảnh) của `this`**.

*   Function thường: `this` phụ thuộc vào *nơi nó được gọi* (dynamic scoping).
*   Arrow Function: `this` phụ thuộc vào *nơi nó được định nghĩa* (lexical scoping). Nó không có `this` riêng, nó "mượn" `this` của scope bao ngoài.

Đó là lý do trong React Class Component ngày xưa, chúng ta dùng Arrow Function để không phải `.bind(this)`.

## 5. Modules (Import/Export)

Tạm biệt `require()` của CommonJS (Node.js cũ), chúng ta dùng ES Modules.
*   `export default`: Mỗi file 1 cái chính.
*   `export const`: Xuất khẩu nhiều món lặt vặt (Named Export).

**Tip:** Hãy ưu tiên **Named Export** để IDE (VS Code) có thể auto-import và refactor dễ dàng hơn. Default export đôi khi gây khó khăn khi đổi tên file.

## Tổng kết

JavaScript hiện đại rất đẹp và mạnh mẽ. Việc nắm vững các cú pháp này giúp code của bạn trong sáng, ít lỗi logic (nhờ `?.` và `??`) và "Pro" hơn rất nhiều. Đừng để mình trở thành "Legacy Developer" nhé!

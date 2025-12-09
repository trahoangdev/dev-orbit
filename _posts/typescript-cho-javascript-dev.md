---
title: "TypeScript cho JS Dev: Từ 'Any' đến 'Type Hero'"
excerpt: "Đừng dùng TypeScript như 'JavaScript có chú thích'. Tìm hiểu về Generics, Utility Types (Partial, Pick) và tại sao 'any' là kẻ thù của dự án."
coverImage: "/assets/blog/preview/js-to-ts.png"
date: "2025-12-08"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra.png"
ogImage:
  url: "/assets/blog/preview/js-to-ts.png"
tags: ["typescript", "javascript", "frontend"]
---

Nhiều bạn chuyển từ JS sang TS và code như sau:
```typescript
function processData(data: any): any { ... }
```
Đây gọi là **"AnyScript"**, không phải TypeScript. Dùng `any` đồng nghĩa với việc bạn tắt bỏ bộ kiểm tra của TS, và chấp nhận rủi ro runtime error quay trở lại.

Hãy cùng nâng trình TypeScript lên level tiếp theo.

## 1. Interface vs Type ?

Câu hỏi muôn thuở. Về cơ bản chúng giống nhau 90%, nhưng:
*   **Interface**: Dùng để định nghĩa hình dáng của Object. Có tính năng **Declaration Merging** (tự gộp nếu khai báo trùng tên) -> Tốt cho viết thư viện. Có thể `extends`.
*   **Type**: Linh hoạt hơn. Dùng cho primitive types, union types (`string | number`), tuple.

> **Lời khuyên:** Dùng `interface` cho Object/Class props. Dùng `type` cho các trường hợp phức tạp như Union, Intersection.

## 2. Generics: Viết code tái sử dụng

Generics cho phép bạn viết 1 hàm xử lý được nhiều kiểu dữ liệu khác nhau mà vẫn giữ được Type Safety.

```typescript
// Hàm này trả về T, nghĩa là đầu vào kiểu gì thì đầu ra kiểu đó
function wrapInArray<T>(item: T): T[] {
    return [item];
}

const strArr = wrapInArray("Hello"); // Tự hiểu là string[]
const numArr = wrapInArray(123);     // Tự hiểu là number[]
```
Nếu không dùng Generics, bạn phải dùng `any`, và mất đi type safety (TS không biết đầu ra là mảng string hay number).

## 3. Utility Types: "Vũ khí" có sẵn

TypeScript cung cấp sẵn nhiều Utility Types cực mạnh để biến đổi type:

*   **Partial<T>**: Biến mọi field thành optional.
    ```typescript
    interface User { id: number; name: string; }
    function updateUser(id: number, fields: Partial<User>) { ... }
    updateUser(1, { name: "New Name" }); // OK, không cần truyền id
    ```

*   **Pick<T, K>**: Chỉ lấy vài field.
*   **Omit<T, K>**: Bỏ đi vài field. (Rất hay dùng để loại bỏ field nhạy cảm hoặc field ID khi tạo mới).
*   **Record<K, T>**: Định nghĩa object map. `Record<string, number>` tương đương `{ [key: string]: number }`.

## 4. Union Types & Type Narrowing

Sức mạnh thực sự của TS nằm ở việc xử lý logic rẽ nhánh dựa trên Type.

```typescript
type Status = 'LOADING' | 'SUCCESS' | 'ERROR';

function handleStatus(status: Status) {
    // TS sẽ nhắc code gợi ý (IntelliSense) chỉ hiện 3 giá trị trên.
    // Nếu bạn gõ "PENDING" -> Lỗi ngay lúc compile.
}
```

## 5. Đừng bao giờ dùng `as` (Type Assertion) bừa bãi

`const user = {} as User;`

Đây là lời nói dối với compiler: "Tao thề cái object rỗng này là User đấy, tin tao đi".
Kết quả: `user.name.toUpperCase()` sẽ crash runtime vì `name` là undefined.

**Giải pháp:** Hãy để TS suy luận (inference) hoặc khai báo đúng cấu trúc ngay từ đầu.

## Tổng kết

TypeScript không chỉ là công cụ bắt lỗi, nó là công cụ thiết kế (Design Tool). Viết Type tốt giúp bạn tư duy rõ ràng về dữ liệu (Data Flow) trước khi viết logic.

Hãy cố gắng loại bỏ `any` khỏi dự án, và bạn sẽ thấy giấc ngủ ngon hơn mỗi khi deploy. 😴

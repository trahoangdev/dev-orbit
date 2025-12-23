---
title: "TypeScript cho JS Dev: Từ 'AnyScript' đến 'Type Hero'"
excerpt: "Đừng biến TypeScript thành 'AnyScript'. Hướng dẫn toàn diện về Generics, Utility Types (Pick, Omit), kỹ thuật Type Narrowing và tại sao bạn cần bỏ ngay thói quen dùng 'as'."
coverImage: "/assets/blog/preview/js-to-ts.png"
date: "2025-12-08"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra2.png"
ogImage:
  url: "/assets/blog/preview/js-to-ts.png"
tags: ["typescript", "javascript", "frontend", "tips"]
---

Rất nhiều bạn (trong đó có mình ngày xưa) khi chuyển từ JS sang TS thường code kiểu đối phó: Gặp lỗi đỏ -> thêm `: any` -> hết lỗi -> deploy.
Chúc mừng, bạn vừa viết ra **"AnyScript"**, một ngôn ngữ vừa dài dòng vừa vô dụng, không tận dụng được chút sức mạnh nào của TypeScript cả.

Bài viết này sẽ giúp bạn nâng trình TS, viết code type-safe thực thụ.

## 1. Interface vs Type: Khác gì nhau?

Đây là câu hỏi phỏng vấn kinh điển.
*   **Interface**:
    *   Thiên về OOP (`class A implements B`).
    *   Có khả năng **Declaration Merging** (Gộp định nghĩa). Nếu bạn khai báo `interface User` 2 lần, TS sẽ tự gộp các field lại làm 1. Điều này cực quan trọng khi viết Library.
*   **Type Alias**:
    *   Linh hoạt hơn.
    *   Định nghĩa được **Union Type** (`type Status = 'active' | 'inactive'`).
    *   Định nghĩa **Primitive** (`type ID = string | number`).
    *   Định nghĩa **Tuple** (`type Point = [x: number, y: number]`).

> **Tip:** Dùng `interface` cho Object/Class public. Dùng `type` cho Function, Union và các biến thể phức tạp.

## 2. Generics: Siêu nhân tái sử dụng

Generics giống như "tham số" dành cho kiểu dữ liệu. Nó giúp function hoạt động với nhiều kiểu dữ liệu khác nhau mà vẫn giữ type chặt chẽ.

```typescript
// T là một biến type (Type variable)
function wrapResponse<T>(data: T) {
    return {
        code: 200,
        message: 'Success',
        result: data
    };
}

const userRes = wrapResponse<User>(userData); // result sẽ là User
const listRes = wrapResponse<Post[]>(postData); // result sẽ là Post[]
```
Nếu không dùng Generics, bạn sẽ phải viết `wrapResponseUser`, `wrapResponsePost`... hoặc dùng `any` (tệ hại).

## 3. Utility Types: Vũ khí bí mật

TS cung cấp một kho vũ khí hạng nặng để biến đổi type (Type Transformation). Đừng bao giờ định nghĩa lại từ đầu.

*   `Partial<T>`: Biến tất cả field thành optional `?`. (Dùng cho hàm update 1 phần dữ liệu).
*   `Required<T>`: Ngược lại, bắt buộc tất cả.
*   `Pick<T, 'key1' | 'key2'>`: Chọn vài field để tạo type mới. (Tạo DTO từ Entity).
*   `Omit<T, 'password'>`: Loại bỏ field password. (Cực hay dùng).
*   `Record<Key, Value>`: Định nghĩa Map/Dictionary Object. Thay vì viết `object` chung chung, hãy viết `Record<string, number>` (Map key string -> value number).

## 4. Discriminated Unions (Type Narrowing)

Đây là pattern mạnh nhất của TS xử lý logic rẽ nhánh, thay thế hoàn toàn cờ hiệu `boolean`.

```typescript
type Response = 
  | { state: 'LOADING' } 
  | { state: 'SUCCESS'; data: User } 
  | { state: 'ERROR'; error: string };

function render(res: Response) {
    if (res.state === 'LOADING') {
        // Ở đây TS biết chắc chắn không có data hay error
        showLoader();
    } else if (res.state === 'SUCCESS') {
        // TS biết chắc chắn có res.data. Tuyệt vời!
        showUser(res.data); 
    } else {
        // TS biết chắc chắn có res.error
        showError(res.error);
    }
}
```
Pattern này giúp code cực kỳ an toàn, không bao giờ truy cập nhầm biến (ví dụ access `data` khi đang `error`).

## 5. Đừng lạm dụng `as` (Type Assertion)

```typescript
const user = {} as User; // Cú lừa!
user.name.toUpperCase(); // Runtime Error: undefined is not an object
```
`as` là cách bạn nói với Compiler: "Tao biết tao đang làm gì, im đi và tin tao". Nếu bạn sai, App nổ tung.
**Tránh dùng `as` tối đa.** Hãy define type đúng ngay từ đầu hoặc dùng Type Guard.

## Tổng kết

TypeScript không chỉ là công cụ bắt lỗi chính tả. Nó là công cụ **Thiết kế (Design)**.
Viết Type tốt giúp bạn tư duy rõ ràng về luồng dữ liệu (Data Flow) trước cả khi viết logic. Và quan trọng nhất: Type chính là tài liệu sống (Documentation) xịn nhất, không bao giờ lỗi thời.

Bỏ `any`, học generics, dùng utility types, và bạn sẽ thấy yêu TypeScript hơn bao giờ hết. Happy Coding! 🚀

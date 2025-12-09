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

## 1. Interface vs Type Alias: Cuộc chiến không hồi kết

Về cơ bản chúng giống nhau 90%, nhưng có sự khác biệt tinh tế:
*   **Interface**:
    *   Tốt cho **OOP**: `class UserImpl implements IUser`.
    *   **Declaration Merging**: Nếu khai báo 2 interface cùng tên, TS sẽ tự gộp lại. (Cực hữu ích khi viết thư viện hoặc mở rộng `Window` object).
*   **Type**:
    *   Linh hoạt hơn (Powerful).
    *   Hỗ trợ **Union Types** (`string | number`), **Primitive Types**, **Tuple**.
    *   Không thể merge.

> **Lời khuyên:** Dùng `interface` cho Object/Class definition (public API). Dùng `type` cho Function signature, Union, và các logic biến đổi type phức tạp.

## 2. Generics: Viết code tái sử dụng đỉnh cao

Generics cho phép bạn viết 1 hàm/class xử lý được nhiều kiểu dữ liệu khác nhau mà vẫn giữ được Type Safety. Nó giống như "tham số" cho kiểu dữ liệu.

```typescript
// T là một biến kiểu dữ liệu (Type variable)
function wrapInArray<T>(item: T): T[] {
    return [item];
}

const strArr = wrapInArray("Hello"); // TS tự hiểu T là string -> trả về string[]
const numArr = wrapInArray(123);     // TS tự hiểu T là number -> trả về number[]
```
**Ứng dụng thực tế:** API Response Wrapper.
```typescript
interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

// Khi dùng:
const userRes: ApiResponse<User> = ...;
const postRes: ApiResponse<Post[]> = ...;
```

## 3. Utility Types: "Vũ khí" có sẵn

TypeScript cung cấp sẵn nhiều Utility Types cực mạnh để biến đổi type mà không cần viết lại từ đầu:

*   **Partial<T>**: Biến mọi field thành optional (`?`). (Dùng cho hàm update).
*   **Required<T>**: Ngược lại với Partial, bắt buộc mọi field.
*   **Pick<T, K>**: Chỉ lấy vài field K từ T. (Tạo DTO).
*   **Omit<T, K>**: Bỏ đi vài field K từ T. (Ví dụ bỏ `password` khỏi object `User`).
*   **Record<K, T>**: Định nghĩa object map. `Record<string, number>` tương đương `{ [key: string]: number }`. (Rất hay dùng thay cho `object`). (Ví dụ: config map, cache).

## 4. Union Types & Type Narrowing (Discriminated Unions)

Sức mạnh thực sự của TS nằm ở việc xử lý logic rẽ nhánh.

```typescript
type Response = 
  | { status: 'SUCCESS'; data: User } 
  | { status: 'ERROR'; error: string };

function handleResponse(res: Response) {
    if (res.status === 'SUCCESS') {
        // TS biết chắc chắn res.data tồn tại ở đây
        console.log(res.data.name); 
    } else {
        // TS biết chắc chắn res.error tồn tại ở đây
        console.error(res.error); 
    }
}
```
Pattern này gọi là **Discriminated Unions** (dựa vào 1 trường chung `status` để phân biệt). Cực kỳ an toàn và Clean code thay vì check null lung tung.

## 5. Đừng bao giờ dùng `as` (Type Assertion) bừa bãi

`const user = {} as User;`

Đây là lời nói dối với compiler: "Tao thề cái object rỗng này là User đấy, tin tao đi (trust me bro)".
TS sẽ im lặng, nhưng khi chạy code: `user.name.toUpperCase()` sẽ crash runtime vì `name` là `undefined`.

**Giải pháp:**
*   Khai báo đúng ngay từ đầu: `const user: User = { name: '...', age: ... };`
*   Nếu chưa có data, cho phép null: `const user: User | null = null;`

## 6. Advanced: `keyof` và `typeof`

*   `typeof`: Lấy type của một biến giá trị JS.
    ```typescript
    const config = { theme: 'dark', version: 1 };
    type Config = typeof config; // { theme: string; version: number; }
    ```
*   `keyof`: Lấy danh sách key của type (thành Union string).
    ```typescript
    type ConfigKeys = keyof Config; // "theme" | "version"
    ```

## Tổng kết

TypeScript không chỉ là công cụ bắt lỗi (Linter), nó là công cụ thiết kế (Design Tool). Viết Type tốt giúp bạn tư duy rõ ràng về **Data Flow** trước khi viết logic. Và quan trọng nhất: Nó là tài liệu sống (Documentation) tuyệt vời nhất cho team của bạn.

Loại bỏ `any`, ngủ ngon hơn! 😴

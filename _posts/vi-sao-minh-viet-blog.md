---
title: "Vì sao mình viết Blog? Hành trình từ 'StackOverflow Copy-Paster' đến người chia sẻ"
excerpt: "Tâm sự mỏng của một sinh viên năm cuối về lý do bắt đầu con đường 'viết lách' đầy chông gai. Không phải để nổi tiếng, mà để trưởng thành và kết nối."
coverImage: "/assets/blog/preview/anonymous-5k.jpg"
date: "2025-12-09"
author:
  name: "trahoangdev"
  picture: "/assets/blog/authors/tra2.png"
ogImage:
  url: "/assets/blog/preview/anonymous-5k.jpg"
tags: ["story", "career", "blogging", "share", "life"]
---

Chào các bạn, lại là mình, **Hoàng Trọng Trà** đây. 👋

Hôm nay xin phép dẹp qua một bên mấy cái `NullPointerException`, `React Hydration Error` hay những thuật toán đau đầu. Mình muốn ngồi xuống, pha một ly cà phê (loại 15k ở căn tin HUTECH thôi nhưng vẫn đậm đà lắm) và tâm sự một chút về lý do tại sao cái blog **DevOrbit** này lại tồn tại trên bản đồ Internet.

Có bao giờ bạn tự hỏi, tại sao một sinh viên năm cuối, đang sấp mặt với đồ án tốt nghiệp và deadline thực tập, lại dành thời gian quý báu để... viết blog không?

## 1. Nguyên do (The "Why"): Nỗi đau của bộ não cá vàng

Thú thật, mình từng (và đôi khi vẫn là) một **"StackOverflow Consumer"** chính hiệu. Quy trình làm việc của mình gói gọn trong vòng lặp vô tận, một vòng lặp chắc hẳn quen thuộc với 99% anh em dev:

```text
Code -> Gặp Bug -> Copy Error Message -> Paste vào Google 
-> Click link StackOverflow đầu tiên -> Scroll xuống Green Checkmark ✅ 
-> Copy Solution -> Paste vào IDE -> Run -> Pray 🙏
```

Nghe quen không? Rất hiệu quả, rất nhanh gọn. Nhưng nó có một tác dụng phụ cực lớn: **Kiến thức trôi tuột đi**. 

Đỉnh điểm là vào một ngày đẹp trời năm 3, mình gặp một cái lỗi liên quan đến cấu hình `CORS` trên Spring Boot khi deploy Docker. Mình đã mất 2 ngày trời, lục tung cả Internet, lội page thứ 10 của Google (vùng đất chết mà không ai dám bén mảng tới) nhưng vẫn vô vọng.

Cuối cùng, sau 48h vật lộn và nạp vào người lượng caffeine đủ để giết chết một con voi, mình fix được nó. Nguyên nhân? Một dòng config thiếu trong `application.yml` mà mình đã... từng fix cách đó 3 tháng nhưng quên béng mất.

Lúc đó, mình nhận ra một sự thật phũ phàng: 
> **"Bộ não cá vàng của mình chắc chắn sẽ quên cái lỗi ngu ngốc này - một lần nữa - trong vòng 2 tuần tới."**

Và thế là mình bắt đầu viết. Không phải để khoe khoang, mà là để **GHI LẠI**. Ban đầu là viết Note cá nhân trên Notion. Sau đó mình nghĩ: *"Tại sao không public nó nhỉ? Biết đâu, ở một góc nào đó trên thế giới, có một anh em dev khác cũng đang đập bàn phím vì đúng cái lỗi này?"*

## 2. Băn khoăn (The "Fear"): Hội chứng kẻ mạo danh

Khi có ý định public bài viết đầu tiên, mình rén lắm chứ. Hàng loạt câu hỏi tiêu cực hiện lên trong đầu - thứ mà người ta gọi là **Imposter Syndrome** (Hội chứng kẻ mạo danh):

*   *"Mình mới là sinh viên, trình độ đâu mà viết? Ai thèm đọc?"*
*   *"Lỡ viết sai kiến thức cơ bản rồi bị mấy anh Senior/Expert vào 'tế' thì sao? Quê độ chết!"*
*   *"Kỹ năng viết của mình chán ngắt, viết rồi có ai hiểu không?"*
*   *"Viết blog có ra tiền không? Hay lại tốn thời gian hosting, domain vô bổ?"*

Nhưng rồi, mình đọc được một câu nói thay đổi tư duy của mình:

> **"You don't have to be an expert to teach. You just have to be one step ahead of someone else."** 
> *(Bạn không cần phải là chuyên gia để dạy người khác. Bạn chỉ cần đi trước họ một bước chân.)*

Đúng vậy! Mình không viết cho những Senior 10 năm kinh nghiệm. Mình viết cho **"Bản thân mình của ngày hôm qua"**, cho những bạn sinh viên năm 1, năm 2 đang loay hoay setup môi trường, đang hoảng loạn vì những lỗi syntax cơ bản. Và nếu các cao thủ có ghé qua và góp ý sửa lỗi, thì đó chẳng phải là cơ hội tuyệt vời để mình được Mentor miễn phí sao? Lãi to!

Thế là mình nhắm mắt đưa chân, `git push origin master` và ấn nút **Deploy**.

## 3. Phương pháp (The "How"): DevOrbit Style

Mình không phải nhà văn, văn điểm 6 thời cấp 3 là minh chứng rõ nhất cho khả năng ngôn ngữ của mình. Nên mình chọn phong cách viết của **DevOrbit** theo 3 quy tắc cốt lõi (The 3Cs):

### 3.1. Keep it Simple (KISS) - Đơn giản hóa
Mình cố gắng giải thích mọi thứ như đang kể chuyện cho thằng bạn cùng bàn nghe. Không dùng từ ngữ hàn lâm đao to búa lớn nếu không cần thiết. Thay vì nói *"Dependency Injection là một design pattern giảm sự phụ thuộc..."*, mình sẽ nói *"Nó giống như việc bạn đi ăn phở, bạn không cần tự nuôi bò và trồng hành, quán phở (Container) sẽ chuẩn bị (Inject) sẵn cho bạn ăn."*

### 3.2. Show me the code - Thực chiến
Dân IT chúng ta nói chuyện bằng code. Một dòng code chạy được, một cái demo sờ tận tay, lôi cuốn và thuyết phục hơn 1000 lời chém gió lý thuyết suông. Mọi bài viết trên blog này mình đều cố gắng kèm theo code mẫu hoặc git repo.

### 3.3. Learn in Public - Học công khai
Học cái gì, viết cái đó. Không cần phải đợi thành chuyên gia mới được chia sẻ. Quá trình học hỏi, mắc sai lầm, rồi sửa sai công khai mới là thứ đáng quý. Nó cho thấy sự chân thực và nỗ lực.

## 4. Cái tâm và tầm (Heart & Vision)

Nghe tiêu đề hơi "đa cấp" một tí nhưng thực sự đó là kim chỉ nam của mình. 🤣

*   **Cái Tâm**: Mình viết bằng sự chân thành (và đôi khi là sự ức chế tột cùng với bug). Mình muốn chia sẻ những gì thực tế nhất, những "cú lừa", những "cạm bẫy" mình đã dính phải để các bạn đi sau né được. Blog này hoàn toàn phi lợi nhuận, không quảng cáo rác, không clickbait.
*   **Cái Tầm**: Mình hy vọng **DevOrbit** sẽ là cuốn nhật ký sống động ghi lại hành trình trưởng thành của mình. Từ một cậu sinh viên code dạo đến một Fullstack Developer chuyên nghiệp. Để sau này, 5 năm hay 10 năm nữa nhìn lại: *"À, hóa ra ngày xưa mình cũng từng ngây ngô và nhiệt huyết đến thế."*

## 5. Lời nhắn gửi

Cảm ơn bạn đã kiên nhẫn đọc đến tận đây (hoặc scroll chuột xuống đây). Sự hiện diện của bạn là động lực rất lớn cho mình.

*   Nếu bạn thấy bài viết hay/vui/có ích: Hãy **Share** nó cho bạn bè.
*   Nếu bạn thấy sai/dở/ngu ngơ: Hãy **Comment** chửi nhiệt tình (nhớ nhẹ tay và kèm solution fix giúp mình nhé).

⚠️ **Cảnh báo vui**: 
Nếu bạn đọc xong bài này, làm **Ghost Reader** (đọc chùa) mà không để lại bất kỳ tương tác một chiếc reaction nào... hãy cẩn thận. Có thể tối nay, ngay trước khi bạn định đi ngủ, **Production sẽ bị sập**, **Server sẽ Time Out**, hoặc **Deadline sẽ bị Boss dời lên sớm 3 ngày** đấy!

*Just kidding (or not).*

---
*Ký tên đóng dấu,*
**Hoàng Trọng Trà**
*Thanh niên code dạo, tác giả của những dòng code đầy bug này.*

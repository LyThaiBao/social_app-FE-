



<!-- Some thing hard when I code this web -->
I must handle couple key of requester and addresser in friendship


Vấn đề: Quản lý vòng đời và Hủy tiến trình Upload File (Upload Cancellation)
1. Thách thức (Challenges)
Trong quá trình phát triển tính năng upload file cho SocialApp, tôi đối mặt với bài toán tối ưu hóa trải nghiệm người dùng (UX) và tài nguyên hệ thống:

Vấn đề: Khi người dùng chọn nhầm file hoặc muốn hủy tác vụ upload đang diễn ra, việc để request chạy đến cùng gây lãng phí băng thông (bandwidth) và tài nguyên lưu trữ trên Cloudinary.

Rủi ro: Nếu chỉ đơn thuần xóa file trên UI (Local State), request thực tế vẫn đang chạy ngầm trên Network, dẫn đến việc dữ liệu rác vẫn được ghi vào hệ thống backend hoặc gây lỗi nếu request kết thúc sau khi user đã thoát khỏi ngữ cảnh hiện tại.

2. Các phương án tiếp cận
Phương án 1 (Hủy phía Server): Upload xong mới gọi API xóa.

Đánh giá: Dễ triển khai nhưng gây lãng phí tài nguyên (tốn tiền lưu trữ, tốn băng thông) và tạo thêm độ trễ (latency) không cần thiết.

Phương án 2 (Hủy giữa chừng tại Cloud): Can thiệp trực tiếp để dừng quá trình upload trên Cloudinary.

Đánh giá: Bất khả thi vì API upload của các dịch vụ Cloud thường là "Atomic" (xử lý trọn gói).

Phương án tối ưu (Hủy tại Client - Frontend): Ngắt kết nối ngay từ phía trình duyệt.

3. Giải pháp kỹ thuật (The Solution)
Tôi áp dụng AbortController kết hợp với AbortSignal để kiểm soát luồng dữ liệu. Điều này tương tự như cơ chế quản lý tiến trình trong Hệ điều hành (OS):

Tư duy hệ thống: Tôi ví von hành động này với việc gửi một Signal (ví dụ SIGUSR2) tới một tiến trình (Process) để yêu cầu nó thực hiện "Graceful Shutdown" (dừng công việc và dọn dẹp tài nguyên).

Triển khai: * Tạo một AbortController instance mỗi khi bắt đầu một request upload.

Truyền signal vào hàm fetch hoặc các service network.

Khi người dùng nhấn "Hủy", tôi gọi phương thức .abort(). Trình duyệt sẽ ngay lập tức cắt đứt kết nối TCP stream đang truyền dữ liệu, giúp Backend nhận được tín hiệu "Client disconnected" và dừng việc xử lý dữ liệu ngay lập tức.

Kết quả: Tài nguyên mạng được giải phóng ngay lập tức, không có dữ liệu dư thừa trên server, hệ thống đảm bảo tính toàn vẹn (data integrity) mà không cần thêm API xóa tốn kém.
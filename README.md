# 🏮 Yuelight Tea - Website Quán Cà Phê Cổ Trang Trung Hoa

## 📋 Tổng quan
Website hoàn chỉnh cho quán cà phê cổ trang Trung Hoa "Yuelight Tea" với đầy đủ chức năng giả lập như website thật.

## 🎯 Tính năng chính

### 🔐 Hệ thống đăng nhập/đăng ký
- **Đăng nhập**: Bất kỳ email và mật khẩu nào đều có thể đăng nhập
- **Đăng ký**: Tạo tài khoản mới với thông tin cá nhân
- **Lưu trữ**: Thông tin người dùng được lưu trong localStorage
- **Trạng thái**: Hiển thị tên người dùng khi đã đăng nhập

### 🛒 Hệ thống giỏ hàng
- **Thêm sản phẩm**: Click "Thêm vào giỏ" trên bất kỳ sản phẩm nào
- **Quản lý số lượng**: Tăng/giảm số lượng sản phẩm
- **Xóa sản phẩm**: Loại bỏ sản phẩm khỏi giỏ hàng
- **Lưu trữ**: Giỏ hàng được lưu tự động trong localStorage
- **Tính tổng**: Tự động tính tổng tiền và cập nhật

### 📅 Hệ thống đặt chỗ
- **Đặt bàn**: Chọn ngày, giờ, số lượng khách, khu vực
- **Thuê trang phục**: Chọn loại trang phục cổ trang
- **Workshop**: Đăng ký các lớp học văn hóa
- **Lưu trữ**: Lịch sử đặt chỗ được lưu trong localStorage

### 💳 Hệ thống thanh toán
- **Giả lập thanh toán**: Xử lý thanh toán như thật
- **Mã đơn hàng**: Tạo mã đơn hàng duy nhất
- **Xóa giỏ hàng**: Tự động xóa giỏ hàng sau thanh toán
- **Thông báo**: Hiển thị kết quả thanh toán

### 📧 Hệ thống liên hệ
- **Form liên hệ**: Gửi tin nhắn với các chủ đề khác nhau
- **Newsletter**: Đăng ký nhận tin tức
- **Thông báo**: Xác nhận gửi tin nhắn thành công

## 📁 Cấu trúc file

```
web/
├── index.html          # Trang chủ
├── shop.html           # Trang menu/sản phẩm
├── about.html          # Trang về chúng tôi
├── location.html       # Trang địa điểm
├── login.html          # Trang đăng nhập/đăng ký
├── cart.html           # Trang giỏ hàng
├── booking.html        # Trang đặt chỗ
├── contact.html        # Trang liên hệ
├── demo.html           # Trang demo chức năng
├── script.js           # JavaScript chính
├── cart-functions.js   # JavaScript cho giỏ hàng
├── img/                # Thư mục hình ảnh
└── README.md           # File hướng dẫn
```

## 🚀 Cách sử dụng

### 1. Mở website
- Mở file `index.html` trong trình duyệt
- Hoặc mở `demo.html` để test các chức năng

### 2. Demo nhanh
- Truy cập `demo.html` để test tất cả chức năng
- Click các nút demo để trải nghiệm
- Xem trạng thái hệ thống real-time

### 3. Sử dụng thực tế
- **Đăng nhập**: Vào `login.html`, nhập bất kỳ email/mật khẩu nào
- **Mua sắm**: Vào `shop.html`, click "Thêm vào giỏ"
- **Xem giỏ hàng**: Vào `cart.html` để quản lý sản phẩm
- **Đặt chỗ**: Vào `booking.html` để đặt bàn/thuê trang phục
- **Thanh toán**: Click "Thanh toán ngay" trong giỏ hàng

## 🎨 Thiết kế

### Màu sắc chủ đạo
- **Đỏ cung đình**: `#DC2626` (red-600)
- **Vàng hoàng gia**: `#F59E0B` (amber-500)
- **Nâu cà phê**: Custom coffee palette

### Font chữ
- **Inter**: Font chính cho tiếng Việt
- **Noto Sans SC**: Font cho chữ Hán (nếu cần)

### Responsive
- **Mobile-first**: Thiết kế ưu tiên mobile
- **Breakpoints**: sm, md, lg, xl
- **Flexible**: Tự động điều chỉnh theo màn hình

## 🔧 Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Styling với Tailwind CSS
- **JavaScript ES6+**: Tương tác và logic
- **LocalStorage**: Lưu trữ dữ liệu local
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## 📱 Tính năng responsive

- **Mobile**: Tối ưu cho điện thoại
- **Tablet**: Giao diện thân thiện
- **Desktop**: Trải nghiệm đầy đủ
- **Touch-friendly**: Dễ sử dụng trên cảm ứng

## 🎭 Chức năng đặc biệt

### Giả lập hoàn chỉnh
- **Không cần backend**: Tất cả chức năng hoạt động offline
- **Dữ liệu thật**: Lưu trữ và khôi phục dữ liệu
- **UX như thật**: Trải nghiệm người dùng chân thực
- **Thông báo**: Hệ thống notification đầy đủ

### Tối ưu UX
- **Loading states**: Hiển thị trạng thái tải
- **Smooth animations**: Chuyển động mượt mà
- **Error handling**: Xử lý lỗi thân thiện
- **Success feedback**: Phản hồi thành công rõ ràng

## 🎯 Mục tiêu người dùng

### Giới trẻ 16-30 tuổi
- **Sống ảo**: Chụp ảnh với trang phục cổ trang
- **Trải nghiệm**: Workshop văn hóa thú vị
- **Social**: Chia sẻ trên mạng xã hội

### Tín đồ phim cổ trang
- **Authentic**: Trải nghiệm chân thực
- **Costume**: Thuê trang phục đa dạng
- **Atmosphere**: Không gian cung đình

### Người trung niên 30-50 tuổi
- **Relax**: Không gian thư giãn
- **Culture**: Tìm hiểu văn hóa
- **Quality**: Chất lượng dịch vụ cao

## 📞 Thông tin liên hệ

- **Địa chỉ**: 334/33 Nguyễn Văn Linh, Quận 7, TP.HCM
- **Giờ mở cửa**: 08:00 - 22:30 (Hàng ngày)
- **Hotline**: 0909.123.456
- **Email**: yuelighttea@gmail.com

## 🏆 Kết luận

Website Yuelight Tea được thiết kế để mang đến trải nghiệm hoàn chỉnh như một website thật, với đầy đủ chức năng từ đăng nhập, mua sắm, đặt chỗ đến thanh toán. Tất cả đều được giả lập một cách chân thực để người dùng có thể trải nghiệm đầy đủ mà không cần backend thật.

**Lưu ý**: Đây là website demo, tất cả dữ liệu được lưu trong localStorage của trình duyệt và sẽ mất khi xóa cache.

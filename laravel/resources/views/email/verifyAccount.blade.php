<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email xác thực tài khoản</title>
</head>

<body>
    <div style="margin: 0 auto; width: 100%;max-width: 600px;">
        <h1 style="text-align: center;font-size: 40px;">Xác thực tài khoản</h1>
        <p>Chào <b>{{ $lastname }}</b>, </p>
        <p>Chúng tôi đã nhận được yêu cầu mở tài khoản trên trang web thức ăn
            nhanh của chúng tôi</p>
        <p>Để xác nhận email đăng ký, vui lòng ấn vào nút <b>"Xác thực"</b></p>
        <div style="text-align: center;">
            <button style="background-color: #0d6efd;color : #ffffff; padding : 0.75rem 1rem;font-size: 1.5rem;outline: none;border-width: 0px;border-radius: 10px;"><a href="{{$link}}" style="text-decoration: none;color : #ffffff">Xác thực</a></button>
          </div>        <p>Trong trường hợp nút "Xác thực" không hoạt động, bạn hãy copy link dưới và dán vào trình duyệt.
            <p><b>{{ $link }}</b></p>
        </p>
        <p>Link xác thực sẽ hết hạn vào lúc {{$link_expired}}</p>
        <p> Nếu đây không phải yêu cầu xác thực của bạn, bạn có thể bỏ qua email
            này. Có thể một ai đó đã gõ nhầm địa chỉ email của bạn.</p>
        <p> Chúng tôi xin chân thành cảm ơn.
        </p>
    </div>
</body>

</html>
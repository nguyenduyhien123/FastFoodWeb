import "../../assets/css/components/Register.css";
export default function Register() {
  return (
    <form className="form">
      <p className="title">Đăng ký </p>
      <p className="message">Đăng ký và bắt đầu order thôi! </p>

      <div className="flex">
        <label>
          <input required="" placeholder="" type="text" className="input" />
          <span>Tên đăng nhập </span>
        </label>

        <label>
          <input required="" placeholder="" type="text" className="input" />
          <span>Họ tên</span>
        </label>
      </div>

      <label>
        <input required="" placeholder="" type="email" className="input" />
        <span>Email</span>
      </label>

      <label>
        <input required="" placeholder="" type="text" className="input" />
        <span>Số điện thoại</span>
      </label>
      <label>
        <input required="" placeholder="" type="date" className="input" />
        <span>Ngày sinh</span>
      </label>
      <label>
        <input required="" placeholder="" type="password" className="input" />
        <span>Mật khẩu</span>
      </label>
      <label>
        <input required="" placeholder="" type="password" className="input" />
        <span>Nhập lại mật khẩu</span>
      </label>
      <button className="submit">Đăng ký</button>
      <p className="signin">
        Bạn đã có tài khoản ? <a href="#">Đăng nhập</a>
      </p>
    </form>
  );
}

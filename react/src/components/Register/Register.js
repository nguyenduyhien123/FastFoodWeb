import { useEffect, useRef, useState } from 'react'
import '../../assets/css/components/register/register.scss'
import validator from 'validator'
import Form from 'react-bootstrap/Form';

export function Register() {
  const [account, setAccount] = useState({ firstname: '', lastname: '', password: '', passwordConfirm: '', email: '', agree: false });
  const [accountError, setAccountError] = useState({});
  const emailRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [activeSubmit, setActiveSubmit] = useState(true);
  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setAccount({ ...account, [name]: value });
  }
  function validateForm() {
    if (account.firstname != '' && account.lastname != '' && account.password != '' && account.password.length >= 8 && account.passwordConfirm != '' && account.password == account.passwordConfirm && validator.isEmail(account.email) && account.agree) {
      setActiveSubmit(false);
    }
    else {
      setActiveSubmit(true);
    }
  }
  useEffect(() => {
    validateForm();
  }, [account])
  console.log(account);
  return <div className="form-register"><form className="form">
    <p className="title">Đăng ký tài khoản </p>
    <p className="message">Đăng ký ngay để mua hàng trên web </p>
    <div className="flex">
      <div>
        <label ref={firstnameRef} onBlur={(e) => {
          if (account.firstname == '') {
            firstnameRef.current.className = 'empty';
            setAccountError({ ...accountError, firstname: 'Họ và tên đệm không được để trống' })
          }
          else if (account.firstname.length < 2) {
            firstnameRef.current.className = 'invalid'
            setAccountError({ ...accountError, firstname: 'Họ và tên phải có ít nhất 2 ký tự' })
          }
          else {
            firstnameRef.current.className = ''
            setAccountError({ ...accountError, firstname: '' })
          }
        }}>
          <input className="input" type="text" name="firstname" placeholder="" required onChange={handleChange} />
          <span>Họ và tên đệm</span>

        </label>
        <div className="text-error">{accountError?.firstname}</div>
      </div>
      <div>
        <label ref={lastnameRef} onBlur={(e) => {
          if (account.lastname == '') {
            lastnameRef.current.className = 'empty';
            setAccountError({ ...accountError, lastname: 'Tên không được để trống' })
          }
          else {
            lastnameRef.current.className = ''
            setAccountError({ ...accountError, lastname: '' })
          }
        }}>
          <input className="input" type="text" name="lastname" placeholder="" required onChange={handleChange} />
          <span>Tên</span>
        </label>
        <div className="text-error">{accountError?.lastname}</div>

      </div>
    </div>
    <div>
      <label ref={emailRef} onBlur={(e) => {
        if (account.email == '') {
          emailRef.current.className = 'empty';
          setAccountError({ ...accountError, email: 'Email không được để trống' })
        }
        else if (!validator.isEmail(account.email)) {
          emailRef.current.className = 'invalid'
          setAccountError({ ...accountError, email: 'Định dạng email không hợp lệ' })
        }
        else {
          emailRef.current.className = ''
          setAccountError({ ...accountError, email: '' })
        }

      }}>
        <input className="input" type="email" name="email" placeholder="" required onChange={handleChange} />
        <span>Email</span>
      </label>
      <div className="text-error">{accountError?.email}</div>
    </div>
    <div>
      <label ref={passwordRef} onBlur={(e) => {
        if (account.password == '') {
          passwordRef.current.className = 'empty';
          setAccountError({ ...accountError, password: 'Mật khẩu không được để trống' })
        }
        else if (account.password.length < 8) {
          passwordRef.current.className = 'invalid';
          setAccountError({ ...accountError, password: 'Mật khẩu phải có ít nhất 8 ký tự' })
        }
        else {
          passwordRef.current.className = ''
          setAccountError({ ...accountError, password: '' })
        }

      }}>
        <input className="input" type="password" name="password" placeholder="" required onChange={handleChange} />
        <span>Mật khẩu</span>
      </label>
      <div className="text-error">{accountError?.password}</div>

    </div>
    <div>
      <label ref={confirmPasswordRef} onBlur={(e) => {
        if (account.passwordConfirm == '') {
          confirmPasswordRef.current.className = 'empty';
          setAccountError({ ...accountError, passwordConfirm: 'Nhập lại mật khẩu không được để trống' })
        }
        else if (account.passwordConfirm != account.password) {
          confirmPasswordRef.current.className = 'invalid';
          setAccountError({ ...accountError, passwordConfirm: 'Mật khẩu không trùng khớp' })
        }
        else {
          confirmPasswordRef.current.className = ''
          setAccountError({ ...accountError, passwordConfirm: '' })
        }
      }}>
        <input className="input" type="password" name="passwordConfirm" placeholder="" required onChange={handleChange} />
        <span>Nhập lại mật khẩu</span>
      </label>
      <div className="text-error">{accountError?.passwordConfirm}</div>
    </div>
    <div>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Đồng ý với điều khoản của chúng tôi"
        onClick={(e) => { setAccount({ ...account, agree: e.target.checked }) }}
      />
    </div>
    <button className="submit w-100" disabled={activeSubmit}>Đăng ký</button>
    <p className="signin">Đã có tài khoản ? <a href="#">Đăng nhập</a> </p>
  </form>
  </div>
}
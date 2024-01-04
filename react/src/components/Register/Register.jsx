import { useContext, useEffect, useRef, useState } from "react";
import validator from 'validator'
import "./Regiser.scss";
import {Form} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {ClipLoader} from "react-spinners";
import { AuthContext } from "../../context/AuthContext";
const overrideCliploader = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
  borderWidth : "5px"
};
export default function Register() {
  const {isRegisterLoading,handleRegisterUser, registerUserError,updateRegisterInfo,registerInfo} = useContext(AuthContext);
  const [account, setAccount] = useState({ email: "", password: "" });
  const emailRef = useRef();
  const passwordRef = useRef();
  const [disableButtonSubmit, setDisableButtonSubmit] = useState(false);
  const [acountError, setAccountError] = useState({});

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    updateRegisterInfo({...registerInfo, [name] : value})
  }
  
  return (
    <div>
      <form className="form border" onSubmit={handleRegisterUser}>
        <div className="item">
      <div className="flex-column">
          <label>Họ và tên đệm </label>
        </div>
        <div
          className="inputForm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 32 32"
            height="20"
          >
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            placeholder="Họ và tên đệm"
            className="input"
            type="text"
            onChange={handleChange}
            name="firstname"
          />
        </div>
        {registerUserError?.firstname ? <div className="text-danger">{registerUserError?.firstname[0]}</div> : ''}
        </div>
        <div className="item">
        <div className="flex-column">
          <label>Tên</label>
        </div>
        <div
          className="inputForm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 32 32"
            height="20"
          >
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            placeholder="Tên"
            className="input"
            type="text"
            onChange={handleChange}
            name="lastname"
          />
        </div>
        {registerUserError?.lastname ? <div className="text-danger">{registerUserError?.lastname[0]}</div> : ''}

        </div>
        <div className="item">
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div
          className="inputForm"
          ref={emailRef}
          onBlur={(e) => {
            let email = account.email;
            console.log(validator.isEmail(email));
            if (validator.isEmail(email) == true) {
              emailRef.current.className = "inputForm input-validate is-valid";
            } else {
              emailRef.current.className =
                "inputForm input-validate is-not-valid";
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 32 32"
            height="20"
          >
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            placeholder="Email"
            className="input"
            type="text"
            onChange={handleChange}
            name="email"
          />
        </div>
        {registerUserError?.email ? <div className="text-danger">{registerUserError?.email[0]}</div> : ''}

        </div>
        <div className="text-danger " style={{ display: "none" }}>
          Email phải đúng định dạng và không để trống
        </div>
        <div className="item">
        <div className="flex-column">
          <label>Mật khẩu </label>
        </div>
        <div
          className="inputForm"
          ref={passwordRef}
          onBlur={(e) => {
            let password = account.password;
            if (validator.isEmpty(password) == true || password.length <= 7) {
              passwordRef.current.className =
                "inputForm input-validate is-not-valid";
            } else {
              passwordRef.current.className =
                "inputForm input-validate is-valid";
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="-64 0 512 512"
            height="20"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            placeholder="Mật khẩu"
            className="input"
            type="password"
            onChange={handleChange}
            name="password"
          />
        </div>
        {registerUserError?.password ? <div className="text-danger">{registerUserError?.password[0]}</div> : ''}


        </div>
        <div className="item">
        <div className="flex-column">
          <label>Số điện thoại </label>
        </div>
        <div
          className="inputForm"
          ref={emailRef}
          onBlur={(e) => {
            let email = account.email;
            console.log(validator.isEmail(email));
            if (validator.isEmail(email) == true) {
              emailRef.current.className = "inputForm input-validate is-valid";
            } else {
              emailRef.current.className =
                "inputForm input-validate is-not-valid";
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 32 32"
            height="20"
          >
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            placeholder="Số điện thoại"
            className="input"
            type="tel"
            onChange={handleChange}
            name="phone"
          />
        </div>
        {registerUserError?.phone ? <div className="text-danger">{registerUserError?.phone[0]}</div> : ''}

        </div>
        <div className="flex-row">
          <div>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              label="Tôi đã đọc và đồng ý các chính sách"
              name="remember"
              onChange={(e) =>
                setAccount({ ...account, remember: e.target.checked })
              }
            />
          </div>
        </div>
        <button type="submit" className="button-submit"> {isRegisterLoading ? <ClipLoader
  color="#36d7b7"
  size={35}
  speedMultiplier={1}
  cssOverride={overrideCliploader}

/> : 'Đăng ký'} </button>
        <p className="p">
         Đã có tài khoản? <Link to="/accounts/signin"><span className="span">Đăng nhập</span></Link>
        </p>
      </form>
    </div>
  );
}

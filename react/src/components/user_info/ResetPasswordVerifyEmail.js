import { LabelField } from '../fields';
import './ResetPasswordVerifyEmail.scss';
import { Row, Col, Alert } from 'react-bootstrap';
import { Button } from "../elements"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


export const ResetPasswordVerifyEmail = () => {
    const [email, setEmail] = useState();
    const [emailError, setEmailError] = useState();
    const handleChange = (e) => {
        let value = e.target.value;
        setEmail(value)
    }
    const handleResetPassword = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/reset-password/verifyEmail',
            data: { email: email },
            withCredentials: true,
        })
            .then((res) => {
                Swal.fire({
                    title: res?.data?.message || "Cập nhật thành công",
                    text: res?.data?.description,
                    icon: 'success',
                });
                setEmailError([]);
            })
            .catch((res) => {
                if (res?.response?.data?.errors) {
                    setEmailError(res?.response?.data?.errors)
                    Swal.fire({
                        title: res?.response?.data?.errors?.email[0] || "Cập nhật thất bại",
                        icon: 'error',
                    });
                    return;
                }
                if (res?.response?.data?.message) {
                    Swal.fire({
                        title: res?.response?.data?.message || "Cập nhật thất bại",
                        icon: 'error',
                    });
                }
            })
    };
    return <div className="reset-password">
 <h1 className='text-center mb-3'>Bạn quên mật khẩu ư?</h1>
                    <Alert variant='info' className='text-center'>Đừng lo, Chúng tôi sẽ gửi email có liên kết đặt lại mật khẩu tới email của bạn !</Alert>
                    <LabelField
                        type={"email"}
                        placeholder={"Địa chỉ email của bạn tại đây ..."}
                        fieldSize="w-100 h-md"
                        name="email"
                        onChange={handleChange}
                    />
                    {emailError?.email && <p className='text-danger'>{emailError?.email}</p>}
                    <Button className={"mc-btn green w-100 mt-3"} icon="restart_alt" text="Đặt lại mật khẩu" onClick={handleResetPassword}></Button>
    </div>
}
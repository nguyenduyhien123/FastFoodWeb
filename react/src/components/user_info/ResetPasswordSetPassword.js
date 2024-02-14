import { Row, Col, Alert } from 'react-bootstrap';
import { Anchor, Button } from "../elements"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { SyncLoader } from "react-spinners";
import { CardHeader, CardLayout } from "../cards";
import Breadcrumb from "../Breadcrumb";
import IconAlert from '../IconAlert';
import { IconField } from '../fields';
export const ResetPasswordSetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // Lấy tham số từ query string
    const queryParams = new URLSearchParams(location.search);
    // Lấy email và secure_code để đặt lại mật khẩu
    const emailParam = queryParams.get('email');
    const secureCodeParam = queryParams.get('secure_code');
    const [showComponent, setShowComponent] = useState();
    const [passwordUser, setPasswordUser] = useState({});
    const [passwordUserError, setPasswordUserError] = useState([]);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPasswordUser({ ...passwordUser, [name]: value })
    }
    const handleResetPassword = () => {
        if (emailParam && secureCodeParam) {
            let data = {
                ...passwordUser, email: emailParam,
                secure_code: secureCodeParam
            }
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/auth/reset-password/setPassword',
                data: data,
                withCredentials: true,
            })
                .then((res) => {
                    Swal.fire({
                        title: res?.data?.message || "Cập nhật thành công",
                        text: res?.data?.description,
                        icon: 'success',
                    });
                    navigate('/');
                })
                .catch((res) => {
                    if (res?.response?.data?.errors) {
                        setPasswordUserError(res?.response?.data?.errors)
                        Swal.fire({
                            title: 'Vui lòng nhập đầy đủ thông tin' || "Cập nhật thất bại",
                            icon: 'error',
                        });
                    }
                    if (res?.response?.data?.message) {
                        Swal.fire({
                            title: res?.response?.data?.message || "Cập nhật thất bại",
                            icon: 'error',
                        });
                    }
                })
        }
    };
    useEffect(() => {
        if (emailParam && secureCodeParam) {
            let data = {
                email: emailParam,
                secure_code: secureCodeParam
            }
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/auth/check-token-reset-password',
                withCredentials: true,
                data: data
            })
                .then((res) => {
                    setShowComponent(1)
                    return
                })
                .catch((err) => {
                    setShowComponent(2)
                    return
                })
        }
        else {
            setShowComponent(2)
        }
    }, []);
    const displayComponent = (id) => {
        switch (id) {
            case 1:
                return <>
                    <Col xl={12}><CardLayout>
                        <Breadcrumb className={"text-center mb-3"} title="Cập nhật mật khẩu mới"></Breadcrumb>
                        <Alert variant='info' className='text-center'>Bạn có thể cập nhật lại mật khẩu dễ dàng rồi!</Alert>
                        <Row>
                            <Col xs={12} md={6}><IconField icon="add_moderator" type="password" placeholder="Mật khẩu mới" classes="w-100 h-lg" passwordVisible name="password" onChange={handleChange} alert={passwordUserError?.password} /></Col>
                            <Col xs={12} md={6}><IconField icon="verified_user" type="password" placeholder="Xác nhận mật khẩu" classes="w-100 h-lg" passwordVisible name="password_confirmation" onChange={handleChange} /></Col>
                        </Row>
                        <Button className={"mc-btn red w-100 mt-4"} icon="restart_alt" text="Đặt lại mật khẩu" onClick={handleResetPassword}></Button>
                    </CardLayout></Col>
                </>
            case 2:
                return <>
                    <Col xl={12}><CardLayout>
                        <Breadcrumb className={"text-center"} title="Xác thực qua email"></Breadcrumb>
                        <Alert variant='warning' className='text-center mt-3'>Link xác thực đã hết hạn hoặc không chính xác</Alert>
                        <Anchor className={"mc-btn primary w-100 mt-4"} icon="arrow_forward" href="/accounts/reset-password/verify-email" >Tới trang đặt lại mật khẩu</Anchor>
                    </CardLayout></Col>
                </>
        }
    }
    return <div className="w-50 mx-auto">
        {displayComponent(showComponent)}
    </div>
}
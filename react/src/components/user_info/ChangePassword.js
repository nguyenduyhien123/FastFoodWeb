import { Button } from "../elements"
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { IconField } from "../fields";
import { CardLayout } from "../cards";
import DivideTitle from "../DivideTitle";
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

export const ChangePassword = () => {
    const [passwordUser, setPasswordUser] = useState({});
    const [passwordUserError, setPasswordUserError] = useState([]);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPasswordUser({ ...passwordUser, [name]: value })
    }
    const handleChangePassword = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/auth/change-password',
            data: passwordUser,
            withCredentials: true,
        })
            .then((res) => {
                Swal.fire({
                    title: res?.data?.message || "Cập nhật thành công",
                    icon: 'success',
                });
            })
            .catch((res) => {
                if (res?.response?.data?.errors) {
                    setPasswordUserError(res?.response?.data?.errors)
                    Swal.fire({
                        title: 'Vui lòng nhập đầy đủ thông tin ' || "Cập nhật thất bại",
                        icon: 'error',
                    });
                    return;
                }
                if (res?.response?.data?.message) {
                    setPasswordUserError([])
                    Swal.fire({
                        title: res?.response?.data?.message || "Cập nhật thất bại",
                        icon: 'error',
                    });
                }
            })

    }
<<<<<<< HEAD
    console.log(passwordUserError);
=======
    // console.log(passwordUserError);
>>>>>>> master
    return <CardLayout>
        <DivideTitle as={"h2"} title="Đổi mật khẩu" className="mb-4" />
        <Row className='mt-3'>
            <Col xs={12} md={12}><IconField icon="lock" type="password" placeholder="Mật khẩu cũ" classes="w-100 h-lg" passwordVisible name="password_old" onChange={handleChange} alert={passwordUserError?.password_old} /></Col>
            <Col xs={12} md={6}><IconField icon="add_moderator" type="password" placeholder="Mật khẩu mới" classes="w-100 h-lg" passwordVisible name="password" onChange={handleChange} alert={passwordUserError?.password}/></Col>
            <Col xs={12} md={6}><IconField icon="verified_user" type="password" placeholder="Xác nhận mật khẩu" classes="w-100 h-lg" passwordVisible name="password_confirmation" onChange={handleChange} /></Col>
        </Row>
        <Button className="mc-btn primary w-100 mt-3" icon="verified" text="Đổi mật khẩu" onClick={handleChangePassword} />    </CardLayout>
}
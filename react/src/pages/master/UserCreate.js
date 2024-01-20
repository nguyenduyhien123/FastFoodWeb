import React, { useEffect, useState } from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { LegendField, LegendTextarea, IconField } from "../../components/fields";
import { Item, Anchor, Box, Button, Image, Text } from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, FileUpload } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userEdit.json";
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';


export default function UserCreate() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({});
    const [roles, setRoles] = useState([]);
    const [accountError, setAccountError] = useState({});
    const getAllRole = () => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/getAllRoleExceptAdmin`,
            withCredentials: true,
        })
            .then((res) => {
                setRoles(res.data)
                setAccount({ ...account, role_id: res.data[0].id });
            })
            .catch(err => console.log('Gọi API lấy role bị lỗi'))
    }
    useEffect(() => {
        getAllRole();
    }, [])
    console.log(roles);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAccount({ ...account, [name]: value })
    }
    const handleChooseImage = (e) => {
        let name = e.target.name;
        let file = e.target.files[0];
        if (file) {

            setAccount({ ...account, [name]: file })
        }
    }
    const handleSubmit = (e) => {
        let data = { ...account };
        axios({
            method: 'post',
            url: `http://localhost:8000/api/users`,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        })
            .then(res => {
                Swal.fire({
                    title: res?.data?.message || "Thêm thành công",
                    icon: 'success',
                  });
                navigate(`/admin/user-list`)
            })
            .catch(err => {
                console.log('Thêm thất bại');
                Swal.fire({
                    title: "Vui lòng nhập đầy đủ dữ liệu",
                    icon: 'error',
                  });
                setAccountError(err.response.data.errors)
            })
    }
    console.log(account);
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title={"Tạo tài khoản mới"}>
                        {data?.breadcrumb.map((item, index) => (
                            <Item key={index} className="mc-breadcrumb-item">
                                {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                            </Item>
                        ))}
                    </Breadcrumb>
                </Col>
                <Col xl={12}>
                                    <Row>
                                        <Col xl={4}>
                                            {/* Ảnh đại diện */}
                                            {account?.avatar && <Box className="mc-user-avatar"><Image src={  URL.createObjectURL(account?.avatar) }  alt={ "Ảnh đại diện" } ></Image>
                                            </Box>}
                                            {!account?.avatar && <Box className="mc-user-avatar"><Image src={  `http://localhost:8000/storage/Uploads/no-avatar.png` }  alt={ "Ảnh đại diện" } ></Image></Box>}
                                            
                                                <FileUpload icon="cloud_upload" text="Chọn ảnh" name="avatar" accept="image/png, image/jpeg, image/jpgm, image/gif" onChange={handleChooseImage} />
                                                {accountError?.avatar && <Text className={"text-danger text-center"}>{accountError?.avatar[0]}</Text>}
                                        </Col>
                                        <Col xl={8}>
                                            <Row>
                                                <Col xl={6}><LegendField title={"Loại tài khoản"} option={roles} name="role_id" alert={accountError?.role_id} onChange={handleChange} /></Col>
                                                <Col xl={6}><LegendField type={"password"} title={"Mật khẩu"} value={account?.password} name="password" onChange={handleChange} alert={accountError?.password} /></Col>
                                                <Col xl={6}><LegendField title={"Họ"} value={account?.lastname} name="lastname" onChange={handleChange} alert={accountError?.lastname} /></Col>
                                                <Col xl={6}><LegendField title={"Tên"} value={account?.firstname} name="firstname" onChange={handleChange} alert={accountError?.firstname} /></Col>
                                                <Col xl={12}><LegendTextarea title={"Mô tả"} value={account?.description || ""} name="description" onChange={handleChange} alert={accountError?.description} /></Col>
                                                <Col xl={6}><LegendField title={"Email"} value={account?.email || ""} name="email" onChange={handleChange} alert={accountError?.email} /></Col>
                                                <Col xl={6}><LegendField title={"Số điện thoại"} value={account?.phone || ""} name="phone" onChange={handleChange} alert={accountError?.phone} /></Col>
                                                <Col xl={6}><LegendField title={"Địa chỉ"} value={account?.address || ""} name="address" onChange={handleChange} alert={accountError?.address} /></Col>
                                                <Col xl={6}><LegendField type={"date"} title={"Ngày sinh"} value={account?.birthday || ""} name="birthday" onChange={handleChange} alert={accountError?.birthday} /></Col>
                                                <Button className="mc-btn primary  text-right" icon="add_circle" text="Tạo tài khoản" onClick={handleSubmit} />
                                            </Row>

                                        </Col>
                                    </Row>
                </Col>
            </Row>
        </PageLayout>
    )
}
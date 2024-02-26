import React, { useEffect, useState } from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { LegendField, LegendTextarea, IconField } from "../../components/fields";
import { Item, Anchor, Box, Button, Image, Text } from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, FileUpload } from "../../components"; 
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userEdit.json";

import axios  from "axios";
import {useParams, useNavigate} from 'react-router-dom';


export default function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState({});
    const [accountError, setAccountError] = useState({});
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAccount({ ...account, [name]: value })
    }
    const handleChooseImage = (e) => {
        let name = e.target.name;
        let file = e.target.files[0];
        setAccount({...account, [name] : file})
    }
    const handleSubmit = (e) => {
        let data = {...account, _method : "PATCH"};
        axios({
            method: 'post',
            url: `http://localhost:8000/api/users/${id}`,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        })
            .then(res => {
<<<<<<< HEAD
                console.log('Thêm thành công');
                navigate(`/admin/user-profile/${id}`)
            })
            .catch(err => {
                console.log('Thêm thất bại');
=======
               //  console.log('Thêm thành công');
                navigate(`/admin/user-profile/${id}`)
            })
            .catch(err => {
                // console.log('Thêm thất bại');
>>>>>>> master
                setAccountError(err.response.data.errors)
            })
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/users/${id}`,
            withCredentials: true,
        })
        .then(res => {
            setAccount(res.data)

        })
<<<<<<< HEAD
        .catch(err => console.log('Gọi API profile bị lỗi'))
    }, [])
    console.log(account);
=======
        .catch(err => {
            // console.log('Gọi API profile bị lỗi')
        })
    }, [])
    // console.log(account);
>>>>>>> master
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title={ "Cập nhật thông tin tài khoản" }>
                        {data?.breadcrumb.map((item, index) => (
                            <Item key={ index } className="mc-breadcrumb-item">
                                {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                            </Item>
                        ))}
                    </Breadcrumb>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <Tabs defaultActiveKey="profile" id="mc" className="mc-tabs">
                            <Tab eventKey="profile" title="Chỉnh sửa thông tin cá nhân" className="mc-tabpane profile">
                                <TabCard title="public information">
                                    <Row>
                                        <Col xl={4}>
                                            {/* Ảnh đại diện */}
                                            <Box className="mc-user-avatar-upload">
                                                {account?.avatar && <Box className="mc-user-avatar"><Image src={ typeof account?.avatar == 'string' ?  account?.avatar?.startsWith('https') === true ? account?.avatar : `http://localhost:8000/storage/uploads/${account?.avatar}`  : URL.createObjectURL(account?.avatar)}  alt={ data?.avatar?.alt } ></Image></Box>}
                                                <FileUpload icon="cloud_upload" text="Chọn ảnh" name="avatar" accept="image/png, image/jpeg, image/jpgm, image/gif" onChange={handleChooseImage} />
                                            </Box>
                                        </Col>
                                        <Col xl={8}>
                                            <Row>
                                                <Col xl={6}><LegendField title={"Họ" } value={ account?.lastname || ""} name="lastname" onChange={handleChange} alert={accountError?.lastname}/></Col>
                                                <Col xl={6}><LegendField title={ "Tên" } value={ account?.firstname || ""} name="firstname" onChange={handleChange} alert={accountError?.firstname}/></Col>
                                                <Col xl={12}><LegendTextarea title={ "Mô tả" } value={ account?.description || "" } name="description" onChange={handleChange} alert={accountError?.description}/></Col>
                                                <Col xl={6}><LegendField title={ "Email" } value={account?.email || "" } name="email" onChange={handleChange} alert={accountError?.email}/></Col>
                                        <Col xl={6}><LegendField title={ "Số điện thoại" } value={ account?.phone || "" } name="phone" onChange={handleChange} alert={accountError?.phone}/></Col>
                                        <Col xl={6}><LegendField title={ "Địa chỉ" } value={ account?.address || "" } name="address" onChange={handleChange} alert={accountError?.address}/></Col>
                                        <Col xl={6}><LegendField type={"date"} title={ "Ngày sinh" } value={ account?.birthday || "" } name="birthday" onChange={handleChange} alert={accountError?.birthday}/></Col>
                                            </Row>
                                            
                                        </Col>
                                    </Row>
                                </TabCard>
                                <Button className="mc-btn primary  text-right" icon="verified" text="Cập nhật thông tin" onClick={handleSubmit}/>
                            </Tab>
                            <Tab eventKey="password" title="Thay đổi mật khẩu" className="mc-tabpane password">
                                <TabCard title="generate password">
                                    <Row>
                                        <Col xs={12} md={12}><IconField icon="lock" type="password" placeholder="current password" classes="w-100 h-lg" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconField icon="add_moderator" type="password" placeholder="new password" classes="w-100 h-lg" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconField icon="verified_user" type="password" placeholder="confirm password" classes="w-100 h-lg" passwordVisible /></Col>
                                    </Row>
                                </TabCard>
                                <Button className="mc-btn primary" icon="verified" text="Cập nhật thông tin" />
                            </Tab>
                            <Tab eventKey="settings" title="Các cài đặt khác" className="mc-tabpane settings">
                                <Row xs={1} md={2}>
                                    <Col>
                                        <TabCard title="activity email settings">
                                            <Form.Check type="switch" id="switch1" label="Someone adds you as a connection" />
                                            <Form.Check type="switch" id="switch2" label="you're sent a direct message" defaultChecked/>
                                            <Form.Check type="switch" id="switch3" label="New membership approval" defaultChecked/>
                                            <Form.Check type="switch" id="switch4" label="Send Copy To Personal Email" defaultChecked/>
                                            <Form.Check type="switch" id="switch5" label="Tips on getting more out of PCT-themes" />
                                        </TabCard>
                                    </Col>
                                    <Col>
                                        <TabCard title="product email settings">
                                            <Form.Check type="checkbox" id="check1" label="Someone adds you as a connection" defaultChecked/>
                                            <Form.Check type="checkbox" id="check2" label="you're sent a direct message" defaultChecked/>
                                            <Form.Check type="checkbox" id="check3" label="New membership approval" defaultChecked/>
                                            <Form.Check type="checkbox" id="check4" label="Send Copy To Personal Email" />
                                            <Form.Check type="checkbox" id="check5" label="Tips on getting more out of PCT-themes" />
                                        </TabCard>
                                    </Col>
                                </Row>
                                <Button className="mc-btn primary" icon="verified"  text="Cập nhật thay đổi" />
                            </Tab>
                        </Tabs>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
import React, { useEffect, useState } from "react";
import { Row, Col, Tab, Tabs, Form } from "react-bootstrap";
import { LegendField, LegendTextarea, IconField } from "../../components/fields";
import { Item, Anchor, Box, Button, Image } from "../../components/elements";
import { CardLayout, TabCard } from "../../components/cards";
import { Breadcrumb, FileUpload } from "../../components"; 
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/myAccount.json";
import axios  from "axios";

export default function MyAccount() {
    const [account, setAccount] = useState({});
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/accounts/',
            withCredentials: true,          
        })
        .then(res => setAccount(res.data))
    }, []);
   //  console.log(account);
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title={ data?.pageTitle }>
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
                                                <Box className="mc-user-avatar"><Image src={ account?.avatar}  alt={ data?.avatar.alt } ></Image></Box>
                                                <FileUpload icon="cloud_upload" text="upload" />
                                            </Box>
                                        </Col>
                                        <Col xl={8}>
                                            <Row>
                                                <Col xl={6}><LegendField title={"Họ" } value={ account?.lastname } /></Col>
                                                <Col xl={6}><LegendField title={ "Tên" } value={ account?.firstname } /></Col>
                                                <Col xl={12}><LegendTextarea title={ "Mô tả" } value={ account?.description || "Mô tả ..." } /></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </TabCard>
                                <TabCard title="Thông tin riêng tư">
                                    <Row>
                                        <Col xl={4}><LegendField title={ data?.id.title } value={ data?.id.value } /></Col>
                                        <Col xl={4}><LegendField title={ data?.role.title } option={ data?.role.option } activeOption={ data?.role.activeOption } /></Col>
                                        <Col xl={4}><LegendField title={ data?.status.title } option={ data?.status.option } activeOption={ data?.status.activeOption } /></Col>
                                        <Col xl={4}><LegendField title={ "Email" } value={account?.email || "" } /></Col>
                                        <Col xl={4}><LegendField title={ "Số điện thoại" } value={ account?.phone || "" } /></Col>
                                        <Col xl={4}><LegendField title={ "Địa chỉ" } value={ account?.address || "Vui lòng nhập địa chỉ" } /></Col>
                                        <Col xl={12}><LegendTextarea title={ data?.address.title } longText={ data?.address.longText } /></Col>
                                    </Row>
                                </TabCard>
                                <TabCard title="social information">
                                    <Row xs={1} md={2}>
                                        {data?.social.map((item, index)=> (
                                            <Col key={ index }>
                                                <LegendField 
                                                    type = { item.type }
                                                    value = { item.value }
                                                    title = { item.title } 
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </TabCard>
                                <Button className="mc-btn primary" icon="verified" text="save changes" />
                            </Tab>
                            <Tab eventKey="password" title="Thay đổi mật khẩu" className="mc-tabpane password">
                                <TabCard title="generate password">
                                    <Row>
                                        <Col xs={12} md={12}><IconField icon="lock" type="password" placeholder="current password" classes="w-100 h-lg" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconField icon="add_moderator" type="password" placeholder="new password" classes="w-100 h-lg" passwordVisible /></Col>
                                        <Col xs={12} md={6}><IconField icon="verified_user" type="password" placeholder="confirm password" classes="w-100 h-lg" passwordVisible /></Col>
                                    </Row>
                                </TabCard>
                                <Button className="mc-btn primary" icon="verified" text="save changes" />
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
                                <Button className="mc-btn primary" icon="verified" text="update changes" />
                            </Tab>
                        </Tabs>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
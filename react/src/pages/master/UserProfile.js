import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor } from "../../components/elements";
import { Breadcrumb, RoundAvatar, DivideTitle, DuelText } from "../../components";
import { CardLayout, CardHeader, FloatCard, ActivityCard } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userProfile.json";
import { useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom'
import moment from 'moment';



export default function UserProfile() {
    const {id} = useParams();
    const [profile, setProfile] = useState({});
    const [float, setFloat] = useState( [
        { "title": "Tổng đơn hàng", "digit": "5789", "icon": "shopping_cart", "variant": "sm purple" }, 
        { "title": "Tổng đánh giá", "digit": "2373", "icon": "hotel_class", "variant": "sm yellow" },
        { "title": "Tổng sản phẩm", "digit": "7893", "icon": "shopping_bag", "variant": "sm green" }
    ]);
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/users/${id}`,
            withCredentials: true,
        })
        .then(res => {
            setProfile(res.data)
            setFloat([...float, float[0].digit = 50]);

        })
        .catch(err => {
            // console.log('Gọi API profile bị lỗi')
        })
    }, [])
    // console.log(profile);
    return ( 
        <PageLayout>
            <Row> 
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title="Thông tin cá nhân">
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={5}>
                    <CardLayout>
                        <CardHeader title="Thông tin cá nhân" dotsMenu={ data?.dotsMenu } />
                        <Box className="mc-user-group">
                            <Box className="mc-user-profile">
                                <RoundAvatar 
                                    src={ profile?.avatar?.startsWith('https') === true ? profile?.avatar : `http://localhost:8000/storage/uploads/${profile?.avatar}` } 
                                    alt={ "Ảnh đại diện" } 
                                    size={ data?.profile.size } 
                                />
                                <DuelText 
                                    title={ profile?.firstname }
                                    descrip={ profile?.description  } 
                                    size={ data?.profile.size }
                                />
                            </Box>
                            <Box className="mb-4">
                                <DivideTitle title="Thông tin cơ bản" className="mb-4" />
                                <List className="mc-user-metalist">
                                <Item>
                                    {profile?.role?.name === "Nhân viên" && <Icon className="material-icons yellow">store</Icon>}
                                    {profile?.role?.name === "Khách hàng" && <Icon className="material-icons green">person</Icon>}
                                    {profile?.role?.name === "Admin" && <Icon className="material-icons purple">settings</Icon>}

                                    <Text as="span">{profile?.role?.name}</Text>
                                </Item>
                                        <Item>
                                            <Icon>{ "phone_in_talk" }</Icon>
                                            <Text as="span">{ profile?.phone }</Text>
                                        </Item>
                                        <Item>
                                            <Icon>{ "feed" }</Icon>
                                            <Text as="span">{ profile?.email }</Text>
                                        </Item>
                                        <Item>
                                            <Icon>{ "celebration" }</Icon>
                                            <Text as="span">{moment(profile?.birthday).format('DD/MM/YYYY')}</Text>
                                        </Item>
                                        <Item>
                                            <Icon>{ "map" }</Icon>
                                            <Text as="span">{ profile?.address }</Text>
                                        </Item>
                                </List>
                            </Box>
                            <Box className="mb-4">
                                <DivideTitle title={ "Mô tả bản thân" } className="mb-3" />
                                <Text className="mc-user-bio mb-4">{ profile?.description }</Text>
                            </Box>

                            {/* <Box>
                                <DivideTitle title="elsewhere" className="mb-4" />
                                <Box className="mc-user-social">
                                    {data?.social.map((item, index)=> (
                                        <Anchor 
                                            key = { index } 
                                            href = { item.path }
                                            text = { item.type }
                                            iconClass = { item.icon }
                                            className = { item.type }
                                        />
                                    ))}
                                </Box>
                            </Box> */}
                        </Box>
                    </CardLayout>
                </Col>
                <Col xl={7}>
                    <Row>
                        {float?.map((item, index) => (
                            <Col md={4} lg={4} key={ index }>
                                <FloatCard 
                                    variant={ item.variant }
                                    digit={ item.digit }
                                    title={ item.title }
                                    icon={ item.icon }
                                />
                            </Col>
                        ))}
                        {/* <Col xl={12}>
                            <ActivityCard 
                                style={{ height: "540px" }}
                                title={ data?.activity.title }
                                dotsMenu={ data?.activity.dotsMenu }
                                items={ data?.activity.items }
                            />
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        </PageLayout>
    )
}
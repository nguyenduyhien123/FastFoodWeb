import React from "react";
import { Row, Col } from "react-bootstrap";
import { List, Item, Icon, Text, Box, Anchor } from "../../components/elements";
import { Breadcrumb, RoundAvatar, DivideTitle, DuelText } from "../../components";
import { CardLayout, CardHeader, FloatCard, ActivityCard } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userProfile.json";

export default function UserProfile() {
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title="user profile">
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
                        <CardHeader title="user information" dotsMenu={ data?.dotsMenu } />
                        <Box className="mc-user-group">
                            <Box className="mc-user-profile">
                                <RoundAvatar 
                                    src={ data?.profile.src } 
                                    alt={ data?.profile.alt } 
                                    size={ data?.profile.size } 
                                />
                                <DuelText 
                                    title={ data?.profile.fullname }
                                    descrip={ data?.profile.username } 
                                    size={ data?.profile.size }
                                />
                            </Box>
                            <Box className="mb-4">
                                <DivideTitle title="communication" className="mb-4" />
                                <List className="mc-user-metalist">
                                    {data?.contact.map((item, index)=> (
                                        <Item key={ index }>
                                            <Icon>{ item.icon }</Icon>
                                            <Text as="span">{ item.text }</Text>
                                        </Item>
                                    ))}
                                </List>
                            </Box>
                            <Box className="mb-4">
                                <DivideTitle title={ data?.bio.title } className="mb-3" />
                                <Text className="mc-user-bio mb-4">{ data?.bio.descrip }</Text>
                            </Box>
                            <Box>
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
                            </Box>
                        </Box>
                    </CardLayout>
                </Col>
                <Col xl={7}>
                    <Row>
                        {data?.float.map((item, index) => (
                            <Col md={4} lg={4} key={ index }>
                                <FloatCard 
                                    variant={ item.variant }
                                    digit={ item.digit }
                                    title={ item.title }
                                    icon={ item.icon }
                                />
                            </Col>
                        ))}
                        <Col xl={12}>
                            <ActivityCard 
                                style={{ height: "540px" }}
                                title={ data?.activity.title }
                                dotsMenu={ data?.activity.dotsMenu }
                                items={ data?.activity.items }
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </PageLayout>
    )
}
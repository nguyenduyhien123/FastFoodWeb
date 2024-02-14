import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Box, Text, Item, Anchor, Button } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { Breadcrumb, DivideTitle } from "../../components";
import CardLayout from "../../components/cards/CardLayout";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/settings.json";

export default function Settings() {
    return (
        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={ data?.pageTitle }>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>
            <CardLayout className="p-sm-5">
                <Box className="mb-5">
                    <DivideTitle title="informations" className="mb-4" />
                    <Row>
                        <Col xl={4}>
                            <Text className="mc-setting-descrip">Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </Col>
                        <Col xl={8} className="ps-xl-5">
                            <Row>
                                <Col xl={6}><LabelField label="site title" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField label="tagline" type="text" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField label="email address" type="email" fieldSize="w-100 h-md" /></Col>
                                <Col xl={6}><LabelField label="website url" type="url" fieldSize="w-100 h-md" /></Col>
                                <Col xl={12}><LabelTextarea label="description" fieldSize="w-100 h-text-md" /></Col>
                            </Row>
                        </Col>
                    </Row>
                </Box>
                <Box className="mb-5">
                    <DivideTitle title="accessibility" className="mb-4" />
                    <Row>
                        <Col xl={4}>
                            <Text className="mc-setting-descrip">Lorem Ipsum is simply dummy text of the printing and typesetting industry dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        </Col>
                        <Col xl={8} className="ps-xl-5">
                            <Form.Check type="checkbox" id="checkbox4" className="mb-3" label="Send notification on each user registration" defaultChecked/>
                            <Form.Check type="checkbox" id="checkbox1" className="mb-3" label="All registration is enabled on this site" defaultChecked/>
                            <Form.Check type="checkbox" id="checkbox2" className="mb-3" label="You're sent a direct message" />
                            <Form.Check type="checkbox" id="checkbox3" className="mb-3" label="New membership approval" />
                        </Col>
                    </Row>
                </Box>
                <Button className="mc-btn primary" icon="verified" text="save all changes" />
            </CardLayout>
        </PageLayout>
    )
}
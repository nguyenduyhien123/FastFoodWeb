import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb, DivideTitle } from "../../components";
import { CardHeader } from "../../components/cards";
import { IconField, IconTextarea, LabelField, LabelTextarea, LegendField, LegendTextarea } from "../../components/fields";
import { Box, Item, Anchor } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/fields.json";

export default function Forms() {
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
                    <Box className="mc-card">
                        <CardHeader title="icon fields" />
                        <Row xs={1} md={2} xl={3}>
                            <Col>
                                <DivideTitle title="small size" className="mb-3 mt-3" />
                                <IconField icon="email" type="text" classes="w-100 h-sm gray" />
                                <IconField icon="verified_user" classes="w-100 h-sm gray" option={["admin", "member", "client"]} />
                                <IconTextarea icon="feed" classes="w-100 h-text-sm mb-0 gray" />
                            </Col>
                            <Col>
                                <DivideTitle title="medium size" className="mb-3 mt-3" />
                                <IconField icon="email" type="text" classes="w-100 h-md gray" />
                                <IconField icon="verified_user" classes="w-100 h-md gray" option={["admin", "member", "client"]} />
                                <IconTextarea icon="feed" classes="w-100 h-text-md mb-0 gray" />
                            </Col>
                            <Col>
                                <DivideTitle title="large size" className="mb-3 mt-3" />
                                <IconField icon="email" type="text" classes="w-100 h-lg gray" />
                                <IconField icon="verified_user" classes="w-100 h-lg gray" option={["admin", "member", "client"]} />
                                <IconTextarea icon="feed" classes="w-100 h-text-lg mb-0 gray" />
                            </Col>
                        </Row>
                    </Box>
                </Col>
                <Col xl={12}>
                    <Box className="mc-card">
                        <CardHeader title="legend fields" />
                        <Row xs={1} md={2} xl={3}>
                            <Col>
                                <DivideTitle title="small size" className="mb-4 mt-3" />
                                <LegendField type="text" fieldSize="w-100 h-sm" className="mb-4" />
                                <LegendField fieldSize="w-100 h-sm" className="mb-4" option={["admin", "member", "client"]} />
                                <LegendTextarea fieldSize="w-100 h-text-sm" />
                            </Col>
                            <Col>
                                <DivideTitle title="medium size" className="mb-4 mt-3" />
                                <LegendField type="text" fieldSize="w-100 h-md" className="mb-4" />
                                <LegendField fieldSize="w-100 h-md" className="mb-4" option={["admin", "member", "client"]} />
                                <LegendTextarea fieldSize="w-100 h-text-md" />
                            </Col>
                            <Col>
                                <DivideTitle title="large size" className="mb-4 mt-3" />
                                <LegendField type="text" fieldSize="w-100 h-lg" className="mb-4" />
                                <LegendField fieldSize="w-100 h-lg" className="mb-4" option={["admin", "member", "client"]} />
                                <LegendTextarea fieldSize="w-100 h-text-lg" />
                            </Col>
                        </Row>
                    </Box>
                </Col>
                <Col xl={12}>
                    <Box className="mc-card">
                        <CardHeader title="label fields" />
                        <Row xs={1} md={2} xl={3}>
                            <Col>
                                <DivideTitle title="small size" className="mb-4 mt-3" />
                                <LabelField label="text field" type="text" fieldSize="w-100 h-sm" labelDir="label-col mb-4" />
                                <LabelField label="select option" fieldSize="w-100 h-sm" labelDir="label-col mb-4" option={["admin", "member", "client"]} />
                                <LabelTextarea label="long textarea" fieldSize="w-100 h-text-sm" labelDir="label-col"  />
                            </Col>
                            <Col>
                                <DivideTitle title="medium size" className="mb-4 mt-3" />
                                <LabelField label="text field" type="text" fieldSize="w-100 h-md" labelDir="label-col mb-4" />
                                <LabelField label="select option" fieldSize="w-100 h-md" labelDir="label-col mb-4" option={["admin", "member", "client"]} />
                                <LabelTextarea label="long textarea" fieldSize="w-100 h-text-md" labelDir="label-col"  />
                            </Col>
                            <Col>
                                <DivideTitle title="large size" className="mb-4 mt-3" />
                                <LabelField label="text field" type="text" fieldSize="w-100 h-lg" labelDir="label-col mb-4" />
                                <LabelField label="select option" fieldSize="w-100 h-lg" labelDir="label-col mb-4" option={["admin", "member", "client"]} />
                                <LabelTextarea label="long textarea" fieldSize="w-100 h-text-lg" labelDir="label-col"  />
                            </Col>
                        </Row>
                    </Box>
                </Col>
            </Row>
        </PageLayout>
    )
}
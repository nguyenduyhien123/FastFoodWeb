import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb, DivideTitle } from "../../components";
import { Box, Item, Anchor, Button } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/buttons.json";

export default function Buttons() {
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
                    <Box className="mc-card p-md-5">
                        <Row xs={1} md={2}>
                            <Col>
                                <DivideTitle title="Bootstrap buttons" className="mb-4" />
                                <Box className="mb-4">
                                    {data?.bootstrap.btns.map((item, index) => (
                                        <Button key={ index } className={ item.classes }>{ item.label }</Button>
                                    ))}
                                </Box>
                                <Box>
                                    {data?.bootstrap.small.map((item, index) => (
                                        <Button key={ index } className={ item.classes }>{ item.label }</Button>
                                    ))}
                                </Box>
                            </Col>
                            <Col>
                                <DivideTitle title="custom buttons" className="mb-4" />
                                <Box className="mb-4">
                                    {data?.custom.btns.map((item, index) => (
                                        <Button key={ index } icon={ item.icon } text={ item.label } className={ item.classes } />
                                    ))}
                                </Box>
                                <Box>
                                    {data?.custom.small.map((item, index) => (
                                        <Button key={ index } icon={ item.icon } text={ item.label } className={ item.classes } />
                                    ))}
                                </Box>
                            </Col>
                        </Row>
                    </Box>
                </Col>
            </Row>
        </PageLayout>
    )
}
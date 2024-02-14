import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { CardHeader } from "../../components/cards";
import { Item, Anchor, Box, Text } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/colors.json";

export default function Colors() {
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
                {data?.variants.map((item, index) => (
                    <Col key={ index } xl={12}>
                        <Box className="mc-card p-4">
                            <CardHeader title={ item.title } />
                            <Box className="mc-color-group">
                                {item.colors.map((color, serial) => (
                                    <Box key={ serial } className="mc-color">
                                        <Box style={{ background: color.code }}></Box>
                                        <Text as="span">
                                            <Text as="small">{ color.name }</Text>
                                            <Text as="small">{ color.code }</Text>
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Col>
                ))}
            </Row>
        </PageLayout>
    )
}
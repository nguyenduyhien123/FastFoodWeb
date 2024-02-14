import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { CardHeader } from "../../components/cards";
import { Item, Anchor, Box, Heading } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/headings.json";

export default function Headings() {
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
                    <Box className="mc-card p-4">
                        <CardHeader title="custom headings" />
                        <Heading as="h1" className="text-capitalize m-4">h1. customize heading variants</Heading>
                        <Heading as="h2" className="text-capitalize m-4">h2. customize heading variants</Heading>
                        <Heading as="h3" className="text-capitalize m-4">h3. customize heading variants</Heading>
                        <Heading as="h4" className="text-capitalize m-4">h4. customize heading variants</Heading>
                        <Heading as="h5" className="text-capitalize m-4">h5. customize heading variants</Heading>
                        <Heading as="h6" className="text-capitalize m-4">h6. customize heading variants</Heading>
                    </Box>
                </Col>
            </Row>
        </PageLayout>
    )
}
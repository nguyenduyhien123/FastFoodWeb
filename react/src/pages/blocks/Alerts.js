import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { Breadcrumb, IconAlert } from "../../components";
import { Box, Item, Anchor } from "../../components/elements";
import { CardHeader } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/alerts.json";

export default function Alerts() {
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
                        <CardHeader title="bootstrap alerts" />
                        {data?.bootstrap.map((item, index) => (
                            <Alert key={ index } variant={ item.variant } dismissible>{ item.label }</Alert>
                        ))}
                    </Box>
                </Col>
                <Col xl={12}>
                    <Box className="mc-card">
                        <CardHeader title="custom alerts" />
                        {data?.custom.map((item, index) => (
                            <IconAlert 
                                key={ index }
                                classes={ item.classes } 
                                icon={ item.icon }
                                title={ item.title }
                                text={ item.text }
                            />
                        ))}
                    </Box>
                </Col>
            </Row>
        </PageLayout>
    )
}
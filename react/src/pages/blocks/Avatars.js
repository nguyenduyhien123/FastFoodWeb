import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb, RoundAvatar } from "../../components";
import { CardHeader } from "../../components/cards";
import { Item, Anchor, Box } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/avatars.json";

export default function Avatars() {
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
                        <CardHeader title="custom avatars" />
                        <RoundAvatar src="images/avatar/08.webp" alt="avatar" size="xl d-inline-flex m-3" />
                        <RoundAvatar src="images/avatar/08.webp" alt="avatar" size="lg d-inline-flex m-3" />
                        <RoundAvatar src="images/avatar/08.webp" alt="avatar" size="md d-inline-flex m-3" />
                        <RoundAvatar src="images/avatar/08.webp" alt="avatar" size="sm d-inline-flex m-3" />
                        <RoundAvatar src="images/avatar/08.webp" alt="avatar" size="xs d-inline-flex m-3" />
                    </Box>
                </Col>
            </Row>
        </PageLayout>
    )
}
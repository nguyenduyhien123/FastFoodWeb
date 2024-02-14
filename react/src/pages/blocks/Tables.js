import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { CardHeader } from "../../components/cards";
import { Item, Anchor, Box } from "../../components/elements";
import { ProductsTable, UsersTable, PagesTable, TrafficsTable } from "../../components/tables";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/tables.json";

export default function Tables() {
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
                        <CardHeader 
                            title={ data?.products.title } 
                            dotsMenu={ data?.products.dotsMenu } 
                        />
                        <ProductsTable 
                            thead={ data?.products.thead } 
                            tbody={ data?.products.tbody } 
                        />
                    </Box>
                </Col>
                <Col xl={12}>
                    <Box className="mc-card">
                        <CardHeader 
                            title={ data?.users.title } 
                            dotsMenu={ data?.users.dotsMenu } 
                        />
                        <UsersTable 
                            thead={ data?.users.thead } 
                            tbody={ data?.users.tbody } 
                        />
                    </Box>
                </Col>
                <Col xl={5}>
                    <Box className="mc-card">
                        <CardHeader 
                            title={ data?.pages.title } 
                            dotsMenu={ data?.pages.dotsMenu } 
                        />
                        <PagesTable 
                            thead={ data?.pages.thead }
                            tbody={ data?.pages.tbody }
                        />
                    </Box>
                </Col>
                <Col xs={12} xl={7}>
                    <Box className="mc-card">
                        <CardHeader 
                            title={ data?.traffics.title } 
                            dotsMenu={ data?.traffics.dotsMenu } 
                        />
                        <TrafficsTable 
                            thead = { data?.traffics.thead } 
                            tbody = { data?.traffics.tbody }
                        />
                    </Box>
                </Col>
            </Row>
        </PageLayout>
    )
}
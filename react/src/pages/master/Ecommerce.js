import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box, Item, Anchor } from "../../components/elements";
import { EcommerceCard, SalesCard, ProductsCard, RevenueCard, ClientsCard, ActivityCard, OrdersCard } from "../../components/cards";

export default function Ecommerce() {
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Box className="mc-card">
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb?.map((item, index) => (
                                <Item key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </Item>
                            ))}
                        </Breadcrumb>
                    </Box>
                </Col>
                <Col xs={12} xl={8}>
                    <Row xs={1} sm={2}>
                        {data?.heros?.map((item, index) => (
                            <Col key={index}>
                                <EcommerceCard
                                    icon={item.icon}
                                    trend={item.trend}
                                    title={item.title}
                                    number={item.number}
                                    variant={item.variant}
                                    percent={item.percent}
                                    compare={item.compare}
                                    dotsMenu={item.dotsMenu}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xs={12} xl={4}>
                    <SalesCard
                        title={data?.sales.title}
                        amount={data?.sales.amount}
                        percent={data?.sales.percent}
                        trendIcon={data?.sales.trendIcon}
                        dotsMenu={data?.sales.dotsMenu}
                        compare={data?.sales.compare}
                        chart={data?.sales.chart}
                    />
                </Col>
                <Col xl={12}>
                    <ProductsCard
                        title={data?.products.title}
                        dotsMenu={data?.products.dotsMenu}
                        table={data?.products.table}
                    />
                </Col>
                <Col xl={8}>
                    <RevenueCard
                        title={data?.revenue.title}
                        field={data?.revenue.field}
                        report={data?.revenue.report}
                        chart={data?.revenue.chart}
                    />
                </Col>
                <Col xl={4}>
                    <OrdersCard
                        title={data?.orders.title}
                        dotsMenu={data?.orders.dotsMenu}
                        items={data?.orders.items}
                    />
                </Col>
                <Col xl={6}>
                    <ClientsCard
                        title={data?.clients.title}
                        dotsMenu={data?.clients.dotsMenu}
                        table={data?.clients.table}
                    />
                </Col>
                <Col xl={6}>
                    <ActivityCard
                        title={data?.activity.title}
                        dotsMenu={data?.activity.dotsMenu}
                        items={data?.activity.items}
                    />
                </Col>
            </Row>
        </PageLayout>
    );
}

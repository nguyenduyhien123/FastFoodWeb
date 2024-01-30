import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb, DivideTitle } from "../../components";
import { Box, Item, Anchor } from "../../components/elements";
import { CRMCard, EcommerceCard, SalesCard, AnalyticsCard, RevenueCard, OrdersCard, DevicesCard } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/blocks/charts.json";

export default function Charts() {
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Box className="mc-card">
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </Box>
                </Col>
                <Col xl={8}>
                    <DivideTitle title="step area chart" className="mb-4 mt-3" />
                    <RevenueCard 
                        title={ data?.revenue.title }
                        field={ data?.revenue.field }
                        report={ data?.revenue.report }
                        chart={ data?.revenue.chart }
                    />
                </Col>
                <Col xl={4}>
                    <DivideTitle title="Round pie chart" className="mb-4 mt-3" />
                    <OrdersCard 
                        title={ data?.orders.title }
                        dotsMenu={ data?.orders.dotsMenu }
                        items={ data?.orders.items }
                    />
                </Col>
                <Col xs={12} xl={8}>
                    <DivideTitle title="arrow icon chart" className="mb-4 mt-4" />
                    <Row xs={1} md={2}>
                        {data?.heros.map((item, index) => (
                            <Col key={ index }>
                                <EcommerceCard 
                                    icon = { item.icon }
                                    trend = { item.trend }
                                    title = { item.title }
                                    number = { item.number }
                                    variant = { item.variant }
                                    percent = { item.percent }
                                    compare = { item.compare }
                                    dotsMenu = { item.dotsMenu }
                                /> 
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xs={12} xl={4}>
                    <DivideTitle title="natural area chart" className="mb-4 mt-4" />
                    <SalesCard 
                        title={ data?.sales.title } 
                        amount={ data?.sales.amount } 
                        percent={ data?.sales.percent }
                        trendIcon={ data?.sales.trendIcon }
                        dotsMenu = { data?.sales.dotsMenu }
                        compare={ data?.sales.compare }
                        chart={ data?.sales.chart }
                    />
                </Col>
                <DivideTitle title="gradient bar chart" className="pt-4" />
                {data?.crms.map((item, index) => (
                    <Col xl={6} key={ index }>
                        <CRMCard 
                            variant={ item.variant }
                            content={ item.content }
                            status={ item.status }
                            dataKey={ item.dataKey }
                            dataSet={ item.dataSet }
                        />
                    </Col>
                ))}
                <DivideTitle title="gradient line chart" className="pt-4" />
                {data?.analytics.map((item, index) => (
                    <Col xs={12} md={6} xl={3} key={ index }>
                        <AnalyticsCard
                            digit={ item.digit }
                            label={ item.label }
                            dataSet={ item.dataSet }
                            dataKey={ item.dataKey }
                            variant={ item.variant }
                            dotsMenu={ item.more }
                        />
                    </Col>
                ))}
                <Col xl={12}>
                    <DivideTitle title="double bar chart" className="mb-4 mt-4" />
                    <DevicesCard 
                        title={ data?.device.title }
                        icon={ data?.device.icon }
                        option={ data?.device.option }
                        chart={ data?.device.chart }
                    />
                </Col>
            </Row>
        </PageLayout>
    )
}
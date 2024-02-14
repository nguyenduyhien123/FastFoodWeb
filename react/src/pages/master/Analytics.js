import React from "react";
import data from "../../data/master/analytics.json";
import PageLayout from "../../layouts/PageLayout";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { Box, Item, Anchor } from "../../components/elements";
import { TrafficsTable, PagesTable } from "../../components/tables";
import { CardHeader, AnalyticsCard, DevicesCard, CountriesCard } from "../../components/cards";

export default function Analytics() {
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
                {data?.mixed.map((item, index) => (
                    <Col xl={3} key={ index }>
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
                <Col xl={7}>
                    <DevicesCard 
                        title={ data?.device.title }
                        icon={ data?.device.icon }
                        option={ data?.device.option }
                        chart={ data?.device.chart }
                    />
                </Col>
                <Col xs={12} xl={5}>
                    <CountriesCard 
                        title={ data?.country.title }
                        dotsMenu={ data?.country.dotsMenu }
                        items={ data?.country.items }
                    />
                </Col>
                <Col xl={5}>
                    <Box className="mc-card">
                        <CardHeader 
                            title={ data?.pages.title } 
                            dotsMenu={ data?.dotsMenu } 
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
                            title={ data?.traffic.title } 
                            dotsMenu={ data?.dotsMenu } 
                        />
                        <TrafficsTable 
                            thead = { data?.traffic.thead } 
                            tbody = { data?.traffic.tbody }
                        />
                    </Box>
                </Col>
            </Row>
        </PageLayout>
    )
}
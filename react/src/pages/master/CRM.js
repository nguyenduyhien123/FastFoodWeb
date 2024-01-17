import React from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import { Item, Anchor} from "../../components/elements";
import { CRMCard, DealsCard, ClientsCard, ActivityCard } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/crm.json";

export default function CRM() {
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <Breadcrumb title={ data?.breadcrumb.title }>
                        {data?.breadcrumb.items.map((item, index) => (
                            <Item key={ index } className="mc-breadcrumb-item">
                                {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                            </Item>
                        ))}
                    </Breadcrumb>
                </Col>
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
                <Col xl={12}>
                    <DealsCard 
                        title={ data?.deals.title }
                        dotsMenu={ data?.deals.dotsMenu }
                        table={ data?.deals.table }
                    />
                </Col>
                <Col xl={6}>
                    <ClientsCard 
                        title={ data?.clients.title }
                        dotsMenu={ data?.clients.dotsMenu }
                        table={ data?.clients.table }
                    />
                </Col>
                <Col xl={6}>
                    <ActivityCard 
                        title={ data?.activity.title }
                        dotsMenu={ data?.activity.dotsMenu }
                        items={ data?.activity.items }
                    />
                </Col>
            </Row>
        </PageLayout>
    )
}
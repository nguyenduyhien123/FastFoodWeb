import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ecommerce.json";
import { Box, Item, Anchor } from "../../components/elements";
import { EcommerceCard, SalesCard, ProductsCard, RevenueCard, ClientsCard, ActivityCard, OrdersCard } from "../../components/cards";
import axios from 'axios';

export default function Ecommerce() {
    const [totals, setTotals] = useState([]);
    const getTotals = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/analysis/',
            withCredentials: true,
        })
            .then(res => {
                setTotals(res.data)
            })
            .catch(() => {

            })
    }
    useEffect(() => {
        getTotals()
    }, [])
    const showPercent = (val) =>
    {
        return val > 0 ? `+${val}%` : `${val}%`
    }
    const trendFunc = (val) => {
        if(val > 0)
        {
            return 'trending_up';
        }
        else if(val == 0)
        {
            return 'trending_flat';
        }
        else 
        {
            return 'trending_down'
        }
    }
    // Các dữ liệu tạo component 
    const heros = [
        {
            "variant": "green",
            "title": "Tổng số người dùng",
            "number": totals?.countUser || 0,
            "icon": "account_circle",
            "trend": trendFunc(totals?.percentageIncreaseUser),
            "percent": showPercent(totals?.percentageIncreaseUser),
            "compare": "Tháng trước",
            "dotsMenu": {
                "dots": "more_vert",
                "dropdown": [
                    { "icon": "history", "text": "last day" },
                    { "icon": "history", "text": "last week" },
                    { "icon": "history", "text": "last month" },
                    { "icon": "history", "text": "last year" }
                ]
            }
        },
        {
            "variant": "purple",
            "title": "Tổng số đơn hàng",
            "number": totals?.countOrder || 0,
            "icon": "shopping_cart",
            "trend": trendFunc(totals?.percentageIncreaseOrder),
            "percent": showPercent(totals?.percentageIncreaseOrder),
            "compare": "Tháng trước",
            "dotsMenu": {
                "dots": "more_vert",
                "dropdown": [
                    { "icon": "history", "text": "last day" },
                    { "icon": "history", "text": "last week" },
                    { "icon": "history", "text": "last month" },
                    { "icon": "history", "text": "last year" }
                ]
            }
        },
        {
            "variant": "blue",
            "title": "Tổng số sản phẩm",
            "number": totals?.countProduct || 0,
            "icon": "shopping_bag",
            "trend": trendFunc(totals?.percentageIncreaseProduct),
            "percent": showPercent(totals?.percentageIncreaseProduct),
            "compare": "Tháng trước",
            "dotsMenu": {
                "dots": "more_vert",
                "dropdown": [
                    { "icon": "history", "text": "last day" },
                    { "icon": "history", "text": "last week" },
                    { "icon": "history", "text": "last month" },
                    { "icon": "history", "text": "last year" }
                ]
            }
        },
        {
            "variant": "yellow",
            "title": "Tổng số đánh giá",
            "number": totals?.countRate || 0,
            "icon": "hotel_class",
            "trend": trendFunc(totals?.percentageIncreaseRate),
            "percent": showPercent(totals?.percentageIncreaseRate),
            "compare": "Tháng trước",
            "dotsMenu": {
                "dots": "more_vert",
                "dropdown": [
                    { "icon": "history", "text": "last day" },
                    { "icon": "history", "text": "last week" },
                    { "icon": "history", "text": "last month" },
                    { "icon": "history", "text": "last year" }
                ]
            }
        }
    ]
    // đơn hàng
    const orders =    {
        "title": "orders overview",
        "dotsMenu": {
            "dots": "more_horiz",
            "dropdown": [
                { "icon": "history", "text": "last day" },
                { "icon": "history", "text": "last week" },
                { "icon": "history", "text": "last month" },
                { "icon": "history", "text": "last year" }
            ]
        },
        "items": [
            { "name": "pending", "value": 547, "color": "purple", "icon": "pending" },
            { "name": "shipped", "value": 398, "color": "blue", "icon": "add_circle" },
            { "name": "recieved", "value": 605, "color": "green", "icon": "check_circle" },
            { "name": "cancelled", "value": 249, "color": "red", "icon": "cancel" },
            { "name": "refunded", "value": 176, "color": "yellow", "icon": "error" }
        ]
    }
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
                        {heros?.map((item, index) => (
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
                        title={orders.title}
                        dotsMenu={orders.dotsMenu}
                        items={orders.items}
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

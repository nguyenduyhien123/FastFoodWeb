import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Text, List, Item, Image, Anchor, Heading } from "../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../components/elements/Table";
import CardLayout from "../../components/cards/CardLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceDetails.json";
import {useParams} from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';

export default function InvoiceDetails() {
    let stt = 0;
    const {id} = useParams();
    const [invoice, setInvoice] = useState([]);
    const getInvoice = () => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/invoices/${id}`,
            withCredentials: true,
        })
        .then((res) => {
            let invoice1 = res.data[0];
            invoice1.invoice_detail.forEach(item => {
                let imageJSON = JSON.parse(item?.product?.image);
                item.product.image = imageJSON;
            });
            setInvoice(invoice1);
        })
        .catch(() => {

        })
    }
    useEffect(() => {
        getInvoice();
    }, [])
    console.log(invoice);
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout className="p-md-5">
                        <Box className="mc-invoice-head">
                            <Image src={ data?.logo.src } alt={ data?.logo.alt } />
                            <Heading as="h2">{`Hoá đơn ${invoice?.code}`}</Heading>
                        </Box>
                        <Box className="mc-invoice-group">
                            <Box className="mc-invoice-recieved">
                                <Heading as="h6">{ "Thông tin người nhận" }</Heading>
                                <Text>Họ tên : { invoice?.user?.fullname }</Text>
                                <Text>Địa chỉ email : { invoice?.user?.email }</Text>
                            </Box>
                            <Box className="mc-invoice-shipment">
                                <Heading as="h6">{ "Thông tin giao hàng "}</Heading>
                                <Text>Địa chỉ :{  invoice.address }</Text>
                            </Box>
                        </Box>
                        <Box className="mc-table-responsive">
                            <Table className="mc-table">
                                <Thead className="mc-table-head">
                                    <Tr>
                                        {data?.table.thead.map((item, index) => (
                                            <Th key={ index }>{ item }</Th>
                                        ))}
                                    </Tr>
                                </Thead>
                                <Tbody className="mc-table-body">
                                    {invoice?.invoice_detail?.map((item, index) => (
                                        <Tr key={ index }>
                                            <Td>{ ++stt }</Td>
                                            <Td>
                                                <Box className="mc-table-product sm">
                                                    <Image src={ item?.product?.image[0] } alt={ "Ảnh sản phẩm" } />
                                                    <Text>{  item?.product?.name }</Text>
                                                </Box>
                                            </Td>
                                            <Td>{  item?.product?.price }</Td>
                                            <Td>{ item?.quantity }</Td>
                                            <Td>{ item?.total }</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                        <Box className="mc-invoice-list-group">
                            <List className="mc-invoice-list">
                                {/* {data?.list.map((item, index) => (
                                    <Item key={ index }>
                                        <Text as="span" className="title">{ item.title }</Text>
                                        <Text as="span" className="clone">:</Text>
                                        { item.digit && <Text as="span" className={`digit ${ item.addClass ? item.addClass : "" }`}>{ item.digit }</Text> }
                                        { item.status && <Text as="span" className={`status ${ item.variant ? item.variant : "" }`}>{ item.status }</Text> }
                                    </Item>
                                ))} */}
                                        <Item>
                                        <Text  as="span" className="title fs-3">Tổng tiền</Text>
                                        <Text  as="span" className="clone fs-3">:</Text>
                                        { invoice?.total_price && <Text as="span" className={`digit fs-3 fw-bold`}>{ invoice?.total_price.toLocaleString("vi-VN") }</Text> }
                                    </Item>
                                    <Text>{invoice?.payment_method?.name}</Text>
                            </List>
                        </Box>
                        <Text className="mc-invoice-note">Cảm ơn bạn đã đặt hàng KHV. Nếu bạn có bất kỳ khiếu nại nào về đơn đặt hàng này, vui lòng gọi điện hoặc gửi email cho chúng tôi. (Thuế GTGT đã được tính ). Đây là hóa đơn do hệ thống tạo ra và không cần chữ ký hoặc con dấu.

</Text>
                        <Box className="mc-invoice-btns">
                        <Anchor 
                                    icon={ "print" }
                                    text={ "In hoá đơn"}
                                    className={"btn btn-success"}
                                /> 
                        </Box>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
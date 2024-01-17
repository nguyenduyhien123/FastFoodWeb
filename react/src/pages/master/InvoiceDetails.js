import React from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Text, List, Item, Image, Anchor, Heading } from "../../components/elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../../components/elements/Table";
import CardLayout from "../../components/cards/CardLayout";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/invoiceDetails.json";

export default function InvoiceDetails() {
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
                            <Heading as="h2">{ data?.title }</Heading>
                        </Box>
                        <Box className="mc-invoice-group">
                            <Box className="mc-invoice-recieved">
                                <Heading as="h6">{ data?.recieved.title }</Heading>
                                <Text>{ data?.recieved.text }</Text>
                            </Box>
                            <Box className="mc-invoice-shipment">
                                <Heading as="h6">{ data?.shipment.title }</Heading>
                                <Text>{ data?.shipment.text }</Text>
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
                                    {data?.table.tbody.map((item, index) => (
                                        <Tr key={ index }>
                                            <Td>{ item.id }</Td>
                                            <Td>
                                                <Box className="mc-table-product sm">
                                                    <Image src={ item.src } alt={ item.alt } />
                                                    <Text>{ item.name }</Text>
                                                </Box>
                                            </Td>
                                            <Td>{ item.price }</Td>
                                            <Td>{ item.discount }</Td>
                                            <Td>{ item.quantity }</Td>
                                            <Td>{ item.amount }</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                        <Box className="mc-invoice-list-group">
                            <List className="mc-invoice-list">
                                {data?.list.map((item, index) => (
                                    <Item key={ index }>
                                        <Text as="span" className="title">{ item.title }</Text>
                                        <Text as="span" className="clone">:</Text>
                                        { item.digit && <Text as="span" className={`digit ${ item.addClass ? item.addClass : "" }`}>{ item.digit }</Text> }
                                        { item.status && <Text as="span" className={`status ${ item.variant ? item.variant : "" }`}>{ item.status }</Text> }
                                    </Item>
                                ))}
                            </List>
                        </Box>
                        <Text className="mc-invoice-note">{ data?.note }</Text>
                        <Box className="mc-invoice-btns">
                            {data?.button.map((item, index) => (
                                <Anchor 
                                    key={ index }
                                    href={ item.path }
                                    icon={ item.icon }
                                    text={ item.text }
                                    className={ item.classes }
                                /> 
                            ))}
                        </Box>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
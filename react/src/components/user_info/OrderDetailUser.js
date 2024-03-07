import { useEffect, useState } from "react"
import DivideTitle from "../DivideTitle"
import { CardLayout } from "../cards"
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import './OrderDetailUser.scss';
import moment from 'moment';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button, Form } from "../elements";

export const OrderDetailUser = () => {
    const { code } = useParams();
    const [order, setOrder] = useState({});
    const getOrder = (order_code) => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/getInvoiceByUserAndCode',
            withCredentials: true,
            data: {
                code: order_code
            }
        })
            .then((res) => {
                let invoice1 = res.data;
                invoice1.invoice_detail.forEach(item => {
                    let imageJSON = JSON.parse(item?.product?.image);
                    item.product.image = imageJSON;
                });
                setOrder(invoice1);
            })
            .catch((err) => {

            })
    }
    const variantStatus = (status) => {
        switch (status) {
            case 'placed':
                return 'blue';
            case 'verified':
                return 'purple';
            case 'delivering':
                return 'yellow';
            case 'delivered':
                return 'green';
            case 'cancelled':
                return 'red';
        }
    }
    useEffect(() => {
        getOrder(code);
    }, []);
    const thead = ['STT', 'Sản phẩm', 'Số lượng', 'Đơn giá', 'Thành tiền'];
    return <>
        <Col xl={10} className="mx-auto customer-order-detail">
            <CardLayout>
                <DivideTitle as={"h2"} title="Thông tin đơn hàng" className="mb-4" />
                <div className="card">
                    <div className="card-body order-info">
                        <div className="order-info">
                            <Col xl={7}>
                                <Text ><span>Mã đơn hàng :</span> <strong>{code}</strong></Text>
                                <Text ><span>Thời gian :</span> <strong>{moment(order?.created_at).format('DD/MM/YYYY HH:mm:ss')}</strong></Text>
                                <Text ><span>Địa chỉ nhận hàng :</span> <strong>{order?.address}</strong></Text>
                                <Text ><span>Ghi chú :</span> <strong>{order?.note}</strong></Text>
                                <Text ><span>Trạng thái đơn hàng :</span> <strong>{order?.last_status?.invoice_status?.name_vi}</strong></Text>
                                <Text ><span>Phương thức thanh toán :</span> <strong>{order?.payment_method?.name}</strong></Text>
                                <Text ><span>Trạng thái thanh toán :</span> <strong>{order?.paid_at ? `Đã thanh toán vào lúc ${moment(order?.paid_at).format('DD/MM/YYYY HH:mm:ss')}` : 'Chưa thanh toán'}</strong></Text>
                            </Col>
                        </div>
                        <div className="mt-2">
                            <h4>Danh sách sản phẩm</h4>
                            <Col xl={12} className="mt-2">
                                <Box className="mc-table-responsive">
                                    <Table className="mc-table order-user-detail">
                                        <Thead className="mc-table-head gradient-22">
                                            <Tr>
                                                {thead.map((item, index) => (
                                                    <Th key={index}>{item}</Th>
                                                ))}
                                            </Tr>
                                        </Thead>
                                        {order?.invoice_detail?.length > 0 && <>
                                            <Tbody className="mc-table-body even">
                                                {order?.invoice_detail?.map((item, index) => (
                                                    <Tr key={index}>
                                                        <Td>{index + 1}</Td>
                                                        <Td className={"d-flex align-items-center gap-3"}>
                                                            <Image src={item?.product?.image[0]} alt={"Ảnh sản phẩm"} className={"image-product"} />
                                                            <Text className={"fw-bolder"}>{item?.product?.name}</Text>
                                                        </Td>
                                                        <Td>{item?.quantity}</Td>
                                                        <Td>{item?.product?.price}</Td>
                                                        <Td className={"fw-bold"}>{item?.total}</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody></>
                                        }
                                    </Table>
                                </Box>
                            </Col>
                        </div>
                        <div className="mt-1">
                            <Col xl={12}>
                                <Text className={"text-end fs-4"}><span>Tổng tiền :</span> <strong>{order?.total_price?.toLocaleString("vi-VN")}</strong></Text>
                            </Col>
                        </div>
                        <div className="d-flex justify-content-center">
                            <form action={`http://localhost:8000/api/printInvoice?code=${code}`} method="POST" target="_blank">
                            <Button icon={"print"} text={"In hoá đơn"} className={"mc-btn primary m-2 fs-4"} type={"submit"} />                            </form>
                        </div>
                    </div>
                </div>
            </CardLayout>
        </Col>
    </>
}
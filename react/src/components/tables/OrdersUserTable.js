import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button, Form } from "../elements";
import moment from 'moment';
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
import 'sweetalert2/src/sweetalert2.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { Row, Col, Tab, Tabs, Form as FormBootstrap } from "react-bootstrap";

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
export default function OrdersUserTable({ thead, tbody, getAllProduct }) {

    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [dataModal, setDataModal] = useState({});

    useEffect(() => { setData(tbody) }, [tbody]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if (name === "allCheck") {
            const checkData = data?.map((item) => {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((item) =>
                item.name === name ? { ...item, isChecked: checked } : item
            );
            setData(checkData);
        }
    }
    const handleDeleteProduct = (id) => {
        let data = { _method: "DELETE" };
        axios({
            method: 'post',
            url: `http://localhost:8000/api/products/${id}`,
            withCredentials: true,
            data: data
        })
            .then(res => {
                Swal.fire({
                    title: res?.data?.message || "Xoá thành công",
                    icon: 'success',
                });
                getAllProduct();
            })
            .catch(err => {
                Swal.fire({
                    title: err?.response?.data?.message || "Xoá thành công",
                    icon: 'success',
                });
            })
    }
    const handleUpdateStatusProduct = (id, check) => {
        let data = { status: check };
        const apiUpdateStatusProduct = axios({
            method: 'post',
            url: `http://localhost:8000/api/update/updateStatusProduct/${id}`,
            withCredentials: true,
            data: data
        });
        toast.promise(
            apiUpdateStatusProduct.then(res => {
                getAllProduct();
            }),
            {
                pending: 'Đang cập nhật trạng thái',
                success: 'Cập nhật trạng thái thành công',
                error: 'Cập nhật bị lỗi',
                autoClose: 4000,
                hideProgressBar: true,
                pauseOnHover: false,
                closeOnClick: false,
                pauseOnFocusLoss: false
            }
        );
    }
    return (
        <>
            <ToastContainer />

            <Box className="mc-table-responsive">
                <Table className="mc-table order-user">
                    <Thead className="mc-table-head danger">
                        <Tr>
                            {thead.map((item, index) => (
                                <Th key={index}>{item}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    {data?.length > 0 && <>
                        <Tbody className="mc-table-body even">
                            {data?.map((item, index) => (
                                <Tr key={index}>
                                    <Td>{index + 1}</Td>
                                    <Td className={"fw-bolder"}>{item?.code}</Td>
                                    <Td className={"fw-bold"}>{item?.total_price?.toLocaleString('vi-VI')}</Td>
                                    <Td>{item?.payment_method?.name}</Td>
                                    <Td><p className={`mc-table-badge ${variantStatus(item?.last_status?.invoice_status?.name_en)}`}>{item?.last_status?.invoice_status?.name_vi}</p></Td>
                                    <Td>{moment(item?.created_at).format('DD/MM/YYYY HH:mm:ss')}</Td>
                                    <Td>
                                        <Box className="mc-table-action">
                                            <Anchor href={`/accounts/manage-order/${item?.code}`} title="View" className="material-icons view">visibility</Anchor>
                                        </Box>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody></>
                    }
                </Table>
                {data?.length === 0 && <>
                    <div className="mc-table no-data">
                        <img src="/images/not_order.png" className="no-order-image" />
                        <h2 className="text-center">Chưa có đơn hàng</h2>
                    </div>
                </>}
                <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                    <Box className="mc-alert-modal">
                        <Icon type="new_releases" />
                        <Heading as="h3">Bạn có chắc!</Heading>
                        <Text as="p">Muốn xoá sản phẩm <span className="fw-bold ">{dataModal?.name}</span> không?</Text>
                        <Modal.Footer>
                            <Button type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>Không, đóng cửa sổ này</Button>
                            <Button type="button" className="btn btn-danger" onClick={() => {
                                setAlertModal(false)
                                handleDeleteProduct(dataModal?.id);
                            }}>Có, tôi muốn xoá</Button>
                        </Modal.Footer>
                    </Box>
                </Modal>
            </Box>
        </>

    );
}
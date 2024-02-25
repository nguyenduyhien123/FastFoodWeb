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


export default function ProductTypesTable({ thead, tbody, getAllProductType }) {

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
    const handleDeleteProductType = (id) => {
        let data = { _method: "DELETE" };
        axios({
            method: 'post',
            url: `http://localhost:8000/api/producttypes/${id}`,
            withCredentials: true,
            data: data
        })
            .then(res => {
                Swal.fire({
                    title: res?.data?.message || "Xoá thành công",
                    icon: 'success',
                });
                getAllProductType();
            })
            .catch(err => {
                Swal.fire({
                    title: err?.response?.data?.message || "Xoá thành công",
                    icon: 'success',
                });
            })
    }
    return (
        <>
            <ToastContainer />
            <Box className="mc-table-responsive">
                <Table className="mc-table product">
                    <Thead className="mc-table-head primary">
                        <Tr>
                            <Th>
                                <Box className="mc-table-check">
                                    <Input
                                        type="checkbox"
                                        name="allCheck"
                                        checked={data?.filter((item) => item.isChecked !== true).length < 1}
                                        onChange={handleCheckbox}
                                    />
                                    <Text>STT</Text>
                                </Box>
                            </Th>
                            {thead.map((item, index) => (
                                <Th key={index}>{item}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody className="mc-table-body even">
                        {data?.map((item, index) => (
                            <Tr key={index}>
                                <Td title={index + 1}>
                                    <Box className="mc-table-check">
                                        <Input
                                            type="checkbox"
                                            name={item.name}
                                            checked={item?.isChecked || false}
                                            onChange={handleCheckbox}
                                        />
                                        <Text>#{index + 1}</Text>
                                    </Box>
                                </Td>
                                <Td>
                                    <Box className="mc-table-product md">
                                        {item?.image && <Image src={item?.image?.startsWith('https') ? item?.image : `http://localhost:8000/storage/uploads/${item?.image}`} alt={item?.alt} />}
                                        <Box className="mc-table-group">
                                            <Heading as="h6">{item?.name}</Heading>
                                            <Text>{item?.description}</Text>
                                        </Box>
                                    </Box>
                                </Td>
                                <Td>{item?.created_at}</Td>
                                <Td>{item?.updated_at}</Td>
                                <Td>
                                    <Box className="mc-table-action">
                                        <Anchor href={`/admin/producttype-edit/${item?.id}`} title="Edit" className="material-icons edit">edit</Anchor>
                                        <Button title="Delete" className="material-icons delete" onClick={() => {
                                            setAlertModal(true)
                                            setDataModal(item)
                                        }}>delete</Button>
                                    </Box>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                    <Box className="mc-alert-modal">
                        <Icon type="new_releases" />
                        <Heading as="h3">Bạn có chắc!</Heading>
                        <Text as="p">Muốn xoá danh mục <span className="fw-bold ">{dataModal?.name}</span> không?</Text>
                        <Modal.Footer>
                            <Button type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>Không, đóng cửa sổ này</Button>
                            <Button type="button" className="btn btn-danger" onClick={() => {
                                setAlertModal(false)
                                handleDeleteProductType(dataModal?.id);
                            }}>Có, tôi muốn xoá</Button>
                        </Modal.Footer>
                    </Box>
                </Modal>
            </Box>
        </>

    );
}
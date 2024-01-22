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


export default function ProductsTable({ thead, tbody, setDataProductTable }) {

    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);
    const [dataModal, setDataModal]  = useState({});

    useEffect(()=> { setData(tbody) }, [tbody]);

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        if(name === "allCheck") {
            const checkData = data?.map((item)=> {
                return { ...item, isChecked: checked };
            });
            setData(checkData);
        }
        else {
            const checkData = data?.map((item) => 
                item.name === name ? {...item, isChecked: checked} : item
            );
            setData(checkData);
        }
    }
    const getAllProduct = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/products/',
            withCredentials: true,          
        })
        .then(res => setDataProductTable(res.data))
        .catch(err => console.log('GỌI APi ds user bị lỗi'))
    }
    const handleDeleteProduct = (id) => {
        let data = { _method : "DELETE"};
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
        let data = { status : check };
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
            <Table className="mc-table product">
                <Thead className="mc-table-head primary">
                    <Tr>
                        <Th>
                            <Box className="mc-table-check">
                                <Input 
                                    type="checkbox" 
                                    name="allCheck"
                                    checked={ data?.filter((item)=> item.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
                                />
                                <Text>STT</Text>
                            </Box>
                        </Th>
                        {thead.map((item, index) => (
                            <Th key={ index }>{ item }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {data?.map((item, index) => (
                        <Tr key={ index }> 
                            <Td title={ index + 1 }>
                                <Box className="mc-table-check">
                                    <Input 
                                        type="checkbox" 
                                        name={item.name} 
                                        checked={ item?.isChecked || false }
                                        onChange={ handleCheckbox } 
                                    />
                                    <Text>#{ index + 1 }</Text>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-product md">
                                {(Array.isArray(item?.image) && item.image.length > 0) && (
  <Image src={ item?.image[0] } alt={ item?.alt } /> 
)}
                                {/* {!item?.image &&  <Image src={ item?.image } alt={ item?.alt } />} */}
                                    <Box className="mc-table-group">
                                        <Heading as="h6">{ item?.name }</Heading>
                                        <Text>{ item?.description }</Text>
                                    </Box>
                                </Box>
                            </Td>
                            <Td>{ item?.price }</Td>
                            <Td>{ item?.product_type?.name }</Td>
                            <Td>
                            <FormBootstrap.Check type="switch" name="status" label={ item?.status ? 'Còn hiệu lực' : 'Hết hiệu lực' } checked={item?.status} onChange={(e) => {
                                handleUpdateStatusProduct(item?.id, e.target.checked);
                            }}/>
                            
                            </Td>
                            <Td>{ item?.star }</Td>
                            <Td>{ item?.created_at}</Td>
                            <Td>{ item?.updated_at }</Td>

                            {/* <Td>
                                <Box className="mc-table-price">
                                    <del>{ item.price.previous }</del>
                                    <Text>{ item.price.present }</Text>
                                </Box>
                            </Td>
                            <Td>{ item.stock }</Td>
                            <Td>
                                <Box className="mc-table-rating">
                                    <Icon>{ item.rating?.icon }</Icon>
                                    <Heading>{ item.rating?.percent }</Heading>
                                    <Text>({ item.rating?.number })</Text>
                                </Box>
                            </Td> */}
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href={`/admin/product-view/${item?.id}`} title="View" className="material-icons view">visibility</Anchor>
                                    <Anchor href={`/admin/product-edit/${item?.id}`} title="Edit" className="material-icons edit">edit</Anchor>
                                    <Button title="Delete" className="material-icons delete" onClick={()=> {
                                        setAlertModal(true)
                                        setDataModal(item)
                                    }}>delete</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal show={ alertModal } onHide={()=> setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">Bạn có chắc!</Heading>
                    <Text as="p">Muốn xoá sản phẩm <span className="fw-bold ">{dataModal?.name}</span> không?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setAlertModal(false)}>Không, đóng cửa sổ này</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> {
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
import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Image, Input, Text, Box, Icon, Anchor, Option, Heading } from "../elements";
import userInfo from "../../data/master/userList.json";
import moment from 'moment';
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';


export default function UsersTable({ thead, tbody, setDataUserTable }) {
    const [data, setData] = useState([]);
    const [userData, setUserData] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);
    const [blockModal, setBlockModal] = React.useState(false);
    const [dataModal, setDataModal]  = useState({});
    useEffect(() => { setData(tbody) }, [tbody]);
    const getAllUser = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/users/',
            withCredentials: true,          
        })
        .then(res => setDataUserTable(res.data))
        .catch(err => console.log('GỌI APi ds user bị lỗi'))
    }
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
    const handleDeleteAccount = (id) => {
        let data = { _method : "DELETE"};
        axios({
            method: 'post',
            url: `http://localhost:8000/api/users/${id}`,
            withCredentials: true,
            data: data
        })
        .then(res => {
                Swal.fire({
                title: res?.data?.message || "Xoá thành công",
                icon: 'success',
              });
              getAllUser();
        })
        .catch(err => {
            Swal.fire({
                title: err?.response?.data?.message || "Xoá thành công",
                icon: 'success',
              });
        })
    }
    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
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
                                <Text>uid</Text>
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
                            <Td title="id">
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
                            <Td title={item.name}>
                                <Box className="mc-table-profile">
                                    <Image src={item?.avatar?.startsWith('https') === true ? item?.avatar : `http://localhost:8000/storage/uploads/${item?.avatar}`} alt={"Ảnh đại diện"}></Image>
                                    <Text>{item?.email}</Text>
                                </Box>
                            </Td>
                            <Td title={item.role}>
                                <Box className="mc-table-icon role">
                                    {item?.role.name === "Nhân viên" && <Icon className="material-icons yellow">store</Icon>}
                                    {item?.role.name === "Khách hàng" && <Icon className="material-icons green">person</Icon>}
                                    {item?.role.name === "Admin" && <Icon className="material-icons purple">settings</Icon>}

                                    <Text as="span">{item.role.name}</Text>
                                </Box>
                            </Td>
                            <Td title={item.lastname}>{item.lastname}</Td>
                            <Td title={item.firstname}>{item.firstname}</Td>
                            {/* <Td title={item.birthday}>{moment(item.birthday).format('DD/MM/YYYY')}</Td> */}
                            <Td title={item.email_verified_at}>
                                {item.email_verified_at ? <Text className="mc-table-badge green">Đã xác thực</Text> : <Text className="mc-table-badge red">Chưa xác thực</Text>}
                                {/* {item.status === "pending" && <Text className="mc-table-badge purple">{item.status}</Text>}
                                {item.status === "blocked" && <Text className="mc-table-badge red">{item.status}</Text>} */}
                            </Td>
                            {/* <Td title={item.description}>{item.description}</Td> */}
                            <Td title={item.phone}>{item.phone}</Td>
                            {/* <Td title={item.status}>
                                {item.status === "approved" && <Text className="mc-table-badge green">{item.status}</Text>}
                                {item.status === "pending" && <Text className="mc-table-badge purple">{item.status}</Text>}
                                {item.status === "blocked" && <Text className="mc-table-badge red">{item.status}</Text>}
                            </Td> */}
                            <Td title={item.created_at}>{item.created_at}</Td>
                            <Td title={item.updated_at}>{item.updated_at}</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href={`/admin/user-profile/${item.id}`} title="View" className="material-icons view">visibility</Anchor>
                                    <Anchor href={`/admin/user-edit/${item.id}`} title="Edit" className="material-icons edit">edit</Anchor>
                                    {/* <Button title="Edit" className="material-icons edit" onClick={() => setEditModal(true, setUserData(item))}>edit</Button> */}
                                    <Button title="Block" className="material-icons block" onClick={() => {
                                    
                                    setBlockModal(true)
                                    setDataModal(item);
                                    }}>block</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal show={editModal} onHide={() => setEditModal(false, setUserData(""))}>
                <Box className="mc-user-modal">
                    <Image src={userData.src} alt={userData?.alt} />
                    <Heading as="h4">{userData?.name}</Heading>
                    <Text as="p">{userData?.email}</Text>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>role</Form.Label>
                        <Form.Select>
                            <Option>{userData?.role ? userData?.role.text : ""}</Option>
                            {userInfo.role.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="form-group inline">
                        <Form.Label>status</Form.Label>
                        <Form.Select>
                            <Option>{userData?.status}</Option>
                            {userInfo.status.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setEditModal(false)}>close popup</Button>
                        <Button type="button" className="btn btn-success" onClick={() => setEditModal(false)}>save Changes</Button>
                    </Modal.Footer>
                </Box>
            </Modal>

            <Modal show={blockModal} onHide={() => setBlockModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">Bạn có chắc chắn!</Heading>
                    <Text as="p">Bạn có muốn chắc xoá Tài khoản {dataModal?.fullname}?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setBlockModal(false)}>Không, đóng cửa sổ</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => {
                            handleDeleteAccount(dataModal?.id)
                            setBlockModal(false)
                        }}>Có, tôi muốn xoá</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    )
}
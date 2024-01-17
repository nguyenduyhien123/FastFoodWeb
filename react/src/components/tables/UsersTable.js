import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button, Image, Input, Text, Box, Icon, Anchor, Option, Heading } from "../elements";
import userInfo from "../../data/master/userList.json";


export default function UsersTable({ thead, tbody }) {

    const [data, setData] = useState([]);
    const [userData, setUserData] = React.useState("");
    const [editModal, setEditModal] = React.useState(false);
    const [blockModal, setBlockModal] = React.useState(false);

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
                                    checked={ data?.filter((item)=> item.isChecked !== true).length < 1 } 
                                    onChange={ handleCheckbox } 
                                />
                                <Text>uid</Text>
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
                            <Td title="id">
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
                            <Td title={ item.name }>
                                <Box className="mc-table-profile">
                                    <Image src={ item.src } alt={ item.alt } />
                                    <Text>{ item.name }</Text>
                                </Box>
                            </Td>
                            <Td title={ item.role }>
                                <Box className="mc-table-icon role">
                                    { item.role.text === "vendor" && <Icon className="material-icons yellow">{ item.role.icon }</Icon> }
                                    { item.role.text === "member" && <Icon className="material-icons green">{ item.role.icon }</Icon> }
                                    { item.role.text === "admin" && <Icon className="material-icons purple">{ item.role.icon }</Icon> }
                                    { item.role.text === "founder" && <Icon className="material-icons blue">{ item.role.icon }</Icon> }
                                    <Text as="span">{ item.role.text }</Text>
                                </Box>
                            </Td>
                            <Td title={ item.email }>{ item.email }</Td>
                            <Td title={ item.password }>{ item.password }</Td>
                            <Td title={ item.phone }>{ item.phone }</Td>
                            <Td title={ item.status }>
                                { item.status === "approved" && <Text className="mc-table-badge green">{ item.status }</Text> }
                                { item.status === "pending" && <Text className="mc-table-badge purple">{ item.status }</Text> }
                                { item.status === "blocked" && <Text className="mc-table-badge red">{ item.status }</Text> }
                            </Td>
                            <Td title={ item.created }>{ item.created }</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href="/user-profile" title="View" className="material-icons view">{ item.action.view }</Anchor>
                                    <Button title="Edit" className="material-icons edit" onClick={()=> setEditModal(true, setUserData(item))}>{ item.action.edit }</Button>
                                    <Button title="Block" className="material-icons block" onClick={()=> setBlockModal(true)}>{ item.action.block }</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal show={ editModal } onHide={()=> setEditModal(false, setUserData(""))}>
                <Box className="mc-user-modal">
                    <Image src={ userData.src } alt={ userData?.alt } />
                    <Heading as="h4">{ userData?.name }</Heading>
                    <Text as="p">{ userData?.email }</Text>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>role</Form.Label>
                        <Form.Select>
                            <Option>{ userData?.role ? userData?.role.text : "" }</Option>
                            {userInfo.role.map((item, index)=> (
                                <Option key={ index } value={ item }>{ item }</Option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="form-group inline">
                        <Form.Label>status</Form.Label>
                        <Form.Select>
                            <Option>{ userData?.status }</Option>
                            {userInfo.status.map((item, index)=> (
                                <Option key={ index } value={ item }>{ item }</Option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setEditModal(false)}>close popup</Button>
                        <Button type="button" className="btn btn-success" onClick={()=> setEditModal(false)}>save Changes</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
            
            <Modal show={ blockModal } onHide={()=> setBlockModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to block this user's account?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setBlockModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> setBlockModal(false)}>yes, block</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    )
}
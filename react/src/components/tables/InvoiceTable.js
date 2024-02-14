import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Heading, Anchor, Icon, Box, Text, Input, Image, Button } from "../elements";
import moment from "moment";
export default function InvoiceTable({ thead, tbody }) {
    const [alertModal, setAlertModal] = React.useState(false);
    const [data, setData] = useState([]);

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
                            <Td>
                                <Box className="mc-table-check">
                                    <Input
                                        type="checkbox"
                                        name={item.name}
                                        checked={item?.isChecked || false}
                                        onChange={handleCheckbox}
                                    />
                                    <Text>{item.id}</Text>
                                </Box>
                            </Td>
                            <Td>
                                <Box className="mc-table-profile">
                                    <Image src={item?.user?.avatar} alt={"Ảnh đại diện"} />
                                    <Text>{item?.user?.email}</Text>
                                </Box>
                            </Td>
                            <Td>{item?.code}</Td>
                            {/* <Td>{ item?.payment_method?.name }</Td> */}
                            {/* <Td><Text className={`mc-table-badge ${ item.status.variant }`}>{ item.status.text }</Text></Td> */}
                            <Td>{item?.total_price?.toLocaleString("vi-VN")}</Td>
                            <Td>{item?.address}</Td>
                            <Td><p className={`mc-table-badge ${variantStatus(item?.last_status?.invoice_status?.name_en)}`}>{item?.last_status?.invoice_status?.name_vi}</p></Td>
                            <Td>{moment(item?.created_at).format('DD/MM/YYYY HH:mm:ss')}</Td>
                            <Td>{moment(item?.updated_at).format('DD/MM/YYYY HH:mm:ss')}</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor title="View" href={`/admin/invoice-details/${item?.id}`} className="material-icons view">visibility</Anchor>
                                    <Anchor title="Download" href="#" className="material-icons download" download>download</Anchor>
                                    <Button title="Delete" className="material-icons delete" onClick={() => setAlertModal(true)}>delete</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal show={alertModal} onHide={() => setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this invoice?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={() => setAlertModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={() => setAlertModal(false)}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    )
}
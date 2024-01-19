import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Anchor, Heading, Box, Text, Input, Image, Icon, Button } from "../elements";
import moment from 'moment';

export default function ProductsTable({ thead, tbody }) {

    const [alertModal, setAlertModal] = useState(false);
    const [data, setData] = useState([]);

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
                            <Td>{ item?.status ? 'Còn hàng' : 'Hết hàng' }</Td>
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
                                    <Button title="Delete" className="material-icons delete" onClick={()=> setAlertModal(true)}>delete</Button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal show={ alertModal } onHide={()=> setAlertModal(false)}>
                <Box className="mc-alert-modal">
                    <Icon type="new_releases" />
                    <Heading as="h3">are your sure!</Heading>
                    <Text as="p">Want to delete this product?</Text>
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setAlertModal(false)}>nop, close</Button>
                        <Button type="button" className="btn btn-danger" onClick={()=> setAlertModal(false)}>yes, delete</Button>
                    </Modal.Footer>
                </Box>
            </Modal>
        </Box>
    );
}
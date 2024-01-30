import React from "react";
import { Box, Image, Text, Anchor } from "../elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";

export default function ClientsTable({ thead, tbody }) {
    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
                <Thead className="mc-table-head">
                    <Tr>
                        {thead.map((item, index) => (
                            <Th key={ index }>{ item }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body">
                    {tbody.map((item, index) => (
                        <Tr key={ index }> 
                            <Td>
                                <Box className="mc-table-profile">
                                    <Image src={ item.src } alt={ item.alt } />
                                    <Text>{ item.name }</Text>
                                </Box>
                            </Td>
                            <Td>{ item.order }</Td>
                            <Td>{ item.amount }</Td>
                            <Td>
                                <Box className="mc-table-action">
                                    <Anchor href="/message" title="Chat" className="material-icons chat">{ item.action.chat }</Anchor>
                                    <Anchor href="/user-profile" title="View" className="material-icons view">{ item.action.view }</Anchor>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}
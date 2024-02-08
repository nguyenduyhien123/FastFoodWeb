import React from "react";
import { Box, Icon, Text } from "../elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";

export default function TrafficsTable({ thead, tbody }) {
    return (
        <Box className="mc-table-responsive">
            <Table className="mc-table">
                <Thead className="mc-table-head primary">
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
                                <Box className="mc-table-icon">
                                    <Icon type={ item.source.icon } />
                                    <Text>{ item.source.text }</Text>
                                </Box>
                            </Td>
                            <Td>{ item.users }</Td>
                            <Td>{ item.sessions }</Td>
                            <Td>{ item.bounce }</Td>
                            <Td>{ item.duration }</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}
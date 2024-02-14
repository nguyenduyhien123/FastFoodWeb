import React from "react";
import { Anchor, Box, Icon } from "../elements";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";

export default function PagesTable({ thead, tbody }) {
    return (
        <Box className="mc-table-responsive thin-scrolling" style={{ height: "382px" }}>
            <Table className="mc-table">
                <Thead className="mc-table-head sticky gray">
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
                                    <Icon type="open_in_new" style={{ fontSize: "18px" }} />
                                    <Anchor href={ item.path }>{ item.path }</Anchor>
                                </Box>
                            </Td>
                            <Td>{ item.visitor }</Td>
                            <Td>{ item.bounce }</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}
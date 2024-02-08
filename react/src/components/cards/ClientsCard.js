import React from "react";
import Box from "../elements/Box";
import CardHeader from "./CardHeader";
import ClientsTable from "../tables/ClientsTable";

export default function ClientsCard({ title, dotsMenu, table }) {
    return (
        <Box className="mc-card">
            <CardHeader title={ title } dotsMenu={ dotsMenu } />
            <ClientsTable thead={ table.thead } tbody={ table.tbody } />
        </Box>
    )
}
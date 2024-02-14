import React from "react";
import { Box, Heading } from "../elements";

export default function TabCard({ title, children }) {
    return (
        <Box className="mc-tab-card">
            <Heading as="h6" className="mc-tab-card-title">{ title }</Heading>
            { children }
        </Box>
    )
}
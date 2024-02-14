import React from "react";
import { Box, List, Heading } from "./elements";

export default function Breadcrumb({ title, children, className }) {
    return (
        <Box className={`mc-breadcrumb ${ className ? className : "" }`}>
            <Heading className="mc-breadcrumb-title">{ title }</Heading>
            <List className="mc-breadcrumb-list">{ children }</List>
        </Box>
    )
}
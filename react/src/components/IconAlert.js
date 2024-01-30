import React from "react";
import { Icon, Box, Text, Button, Heading } from "./elements";

export default function IconAlert({ classes, icon, title, text }) {
    return (
        <Box className={`mc-alert ${ classes }`}>
            <Icon type={ icon } />
            <Heading>{ title }<Text as="span">{ text }</Text></Heading>
            <Button className="material-icons">close</Button>
        </Box>
    )
}
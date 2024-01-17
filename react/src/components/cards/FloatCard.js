import React from "react";
import { Box, Text, Icon, Heading } from "../elements";

export default function FloatCard({ variant, digit, title, icon }) {
    return (
        <Box className={`mc-float-card ${ variant }`}>
            <Heading>{ digit }</Heading>
            <Text>{ title }</Text>
            <Icon>{ icon }</Icon>
        </Box>
    )
}
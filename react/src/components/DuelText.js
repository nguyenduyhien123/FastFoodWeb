import React from "react";
import { Box, Text, Heading } from "./elements";

export default function DuelText({ size, title, descrip, timesTamp }) {
    return (
        <Box className={`mc-duel-text ${ size ? size : "md" }`}>
            <Heading className="mc-duel-text-title">
                { title }
                {timesTamp && <Text as="small">{ timesTamp }</Text>}
            </Heading>
            <Text className="mc-duel-text-descrip">{ descrip }</Text>
        </Box>
    )
}
import React from "react";
import { Box, Image } from "./elements";

export default function RoundAvatar({ size, src, alt }) {
    return (
        <Box className={`mc-round-avatar ${ size || "md" }`}>
            <Image src={ src } alt={ alt } />
        </Box>
    )
}
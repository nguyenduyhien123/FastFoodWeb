import React from "react";
import DotsMenu from "../DotsMenu";
import { Box, Heading, Anchor } from "../elements";

export default function CardHeader({ title, dotsMenu, button }) {
    return (
        <Box className="mc-card-header">
            { title && <Heading as="h4" className="mc-card-title">{ title }</Heading> }
            { dotsMenu && <DotsMenu dots={ dotsMenu.dots } dropdown={ dotsMenu.dropdown } /> }
            { button && <Anchor className="mc-btn" href={ button.path } icon={ button.icon } text={ button.text } /> }
        </Box>
    )
}
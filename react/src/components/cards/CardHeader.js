import React from "react";
import DotsMenu from "../DotsMenu";
import { Box, Heading, Anchor, Text } from "../elements";

export default function CardHeader({ title, dotsMenu, button, fontTitle }) {
    return (
        <Box className="mc-card-header">
            { (title && !fontTitle )&& <Heading as="h4" className="mc-card-title">{ title }</Heading> }
            { fontTitle && <Text className={`mc-card-title fs-${fontTitle}`}>{ title }</Text> }

            { dotsMenu && <DotsMenu dots={ dotsMenu.dots } dropdown={ dotsMenu.dropdown } /> }
            { button && <Anchor className="mc-btn" href={ button.path } icon={ button.icon } text={ button.text } /> }
        </Box>
    )
}
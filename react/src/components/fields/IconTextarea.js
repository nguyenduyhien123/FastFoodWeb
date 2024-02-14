import React from "react";
import { Box, Icon, Textarea } from "../elements";

export default function IconTextarea({ classes, icon, placeholder, children, ...rest }) {
    return (
        <Box className={`mc-icon-field textarea ${ classes || "w-md h-text-sm white" }`}>
            <Icon type={ icon || "account_circle" } />
            <Textarea placeholder={ placeholder || "Long textarea..." }>{ children }</Textarea>
       </Box>
    )
}
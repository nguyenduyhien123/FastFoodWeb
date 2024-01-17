import React from "react";
import { Box, Input, Label, Icon, Text } from "./elements";

export default function FileUpload({ icon, text }) {
    return (
        <>
            {text ?
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input type="file" id="avatar" />
                    <Label htmlFor="avatar">
                        <Icon>{ icon || "cloud_upload" }</Icon>
                        <Text as="span">{ text || "upload" }</Text>
                    </Label>
                </Box>
            :
                <Box className={`mc-file-upload ${ text ? "button" : "icon" }`}>
                    <Input type="file" id="avatar" />
                    <Label htmlFor="avatar" className="material-icons">{ icon || "cloud_upload" }</Label>
                </Box>
            }
        </>
    )
}
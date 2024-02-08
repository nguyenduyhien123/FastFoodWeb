import React from "react";
import { Box, Label, Textarea } from "../elements";

export default function LabelTextarea({ label, labelDir, fieldSize, placeholder, ...rest }) {
    return (
        <Box className={`mc-label-field-group ${ label ? labelDir || "label-col" : "" }`}>
            {label && <Label className="mc-label-field-title">{ label }</Label>}
            <Textarea 
                className={`mc-label-field-textarea ${ fieldSize || "w-md h-text-md" }`} 
                placeholder={ placeholder || "Type here..." }
                { ...rest } 
            ></Textarea>
        </Box>
    )
}
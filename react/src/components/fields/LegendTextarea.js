import React from "react";
import { Fieldset, Legend, Text, Textarea } from "../elements";

export default function LegendTextarea({ title, longText, placeholder, fieldSize,alert, ...rest }) {
    return (
        <>
        <Fieldset className="mc-fieldset">
            <Legend>{ title || "legend" }</Legend>
            <Textarea 
                defaultValue = { longText }
                className={`${ fieldSize || "w-100 h-text-md" }`}
                placeholder={ placeholder || "Long textarea..." }
                { ...rest }
            >
            </Textarea>
        </Fieldset>
         {alert && <Text className="text-danger">{alert[0]}</Text>}
         </>
    )
}
import React from "react";
import { Fieldset, Legend, Textarea } from "../elements";

export default function LagendTextarea({ title, longText, placeholder, fieldSize, ...rest }) {
    return (
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
    )
}
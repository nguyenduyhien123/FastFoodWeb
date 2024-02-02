import React from "react";
import { Fieldset, Legend, Select, Option, Input, Text } from "../elements";

export default function LegendField({ title, type, value, placeholder, fieldSize, option, className, activeOption,alert,readonly, ...rest }) {
    return (
        <>
        <Fieldset className={`mc-fieldset ${ className ? className : "" }`}>
            <Legend>{ title || "legend" }</Legend>
            {option ? 
            <>
                <Select value={value} {...rest} className={`${ fieldSize || "w-100 h-md" }`}>
                    {activeOption && <Option value={activeOption?.id}>{ activeOption?.name || "Select Option" }</Option>}
                    {option.map((item, index)=> (
                        <Option key={ item?.id } value={ item?.id }>{ item?.name }</Option>
                    ))}
                </Select>
                {alert && <Text className="text-danger">{alert[0]}</Text>}
 
                </>
            :
            <>
                <Input 
                    type = { type || "text" } 
                    defaultValue = { value } 
                    placeholder = { placeholder || "Type here..." }
                    className = {`${ fieldSize || "w-100 h-md" }`}
                    readOnly={readonly}
                    { ...rest } 
                />
                </>
            }
        </Fieldset>
        {alert && <Text className="text-danger">{alert}</Text>}
        </>
    )
}
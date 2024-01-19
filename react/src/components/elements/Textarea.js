import React from "react";
import Text from "./Text";

export default function Textarea({ type, placeholder, className, children,alert, ...rest }) {
    return <><textarea type={ type || "text" } placeholder={ placeholder } className={ className } {...rest}>{ children }</textarea>                {alert && <Text className="text-danger">{alert[0]}</Text>}</>

}
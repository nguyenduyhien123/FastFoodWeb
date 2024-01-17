import React from "react";

export default function DivideTitle({ as, className, title, children }) {
    const Component = as || "h6";
    return <Component className={`mc-divide-title ${ className ? className : "" }`}>{ title || children || "divide title" }</Component>
}
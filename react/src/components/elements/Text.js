import React from "react";

export default function Text({ as, style, children, className }) {
    const Component = as || "p";
    return <Component className={ className } style={ style }>{ children }</Component>
}
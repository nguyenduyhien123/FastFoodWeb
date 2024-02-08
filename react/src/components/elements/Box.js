import React from "react";

export default function Box({ as, children, className, style }) {
    const Component = as || "div";
    return <Component style={ style } className={ className }>{ children }</Component>
}
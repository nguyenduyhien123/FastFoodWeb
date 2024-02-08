import React from "react";

export default function Heading({ as, children, className }) {
    const Component = as || "h3";
    return <Component className={ className }>{ children }</Component>
}
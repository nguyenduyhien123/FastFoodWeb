import React from "react";

export default function Section({ as, children, className }) {
    const Component = as || "section";
    return <Component className={ className }>{ children }</Component>
}
import React from "react";

export default function Icon({ as, className, style, type, children, ...rest }) {
    const Component = as || "i";
    return (
        <Component style={ style } className={ className ? className : "material-icons" } {...rest}>
            { type || children }
        </Component>
    )
}
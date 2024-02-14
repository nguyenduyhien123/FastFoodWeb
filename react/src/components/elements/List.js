import React from "react";

export default function List({ children, className, style }) {
    return <ul className={ className } style={ style }>{ children }</ul>
}
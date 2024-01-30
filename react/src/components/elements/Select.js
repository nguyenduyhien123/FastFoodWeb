import React from "react";

export default function Select({ children, className, ...rest }) {
    return <select className={ className } { ...rest }>{ children }</select>
}
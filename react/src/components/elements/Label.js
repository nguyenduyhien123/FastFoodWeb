import React from "react";

export default function Label({ text, children, className, ...rest }) {
    return <label className={ className } { ...rest }>{ text } { children }</label>
}
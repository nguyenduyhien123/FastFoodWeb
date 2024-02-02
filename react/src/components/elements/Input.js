import React from "react";

export default function Input({ type, placeholder, className, readonly , ...rest }) {
    return <input type={ type || "text" } placeholder={ placeholder } className={ className } { ...rest } />
}
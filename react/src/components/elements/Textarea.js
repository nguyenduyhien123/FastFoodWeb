import React from "react";

export default function Textarea({ type, placeholder, className, children }) {
    return <textarea type={ type || "text" } placeholder={ placeholder } className={ className }>{ children }</textarea>
}
import React from "react";

export default function Item({ className, children, onClick }) {
    return <li className={ className} onClick={ onClick }>{ children }</li>
}
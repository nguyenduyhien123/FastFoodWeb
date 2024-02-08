import React from "react";

export default function Form({ children, className }) {
    return <form className={ className }>{ children }</form>
}
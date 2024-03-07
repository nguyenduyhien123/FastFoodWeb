import React from "react";

export default function Option({ children, value, ...rest }) {
    return <option {...rest} value={ value }>{ children }</option>
}
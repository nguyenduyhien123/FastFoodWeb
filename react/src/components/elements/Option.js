import React from "react";

export default function Option({ children, value }) {
    return <option value={ value }>{ children }</option>
}
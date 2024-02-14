import React from "react";
import Box from "../elements/Box";

export default function CardLayout ({ className, children }) {
    return <Box className={`mc-card ${ className ? className : "" }`}> { children }</Box>
}
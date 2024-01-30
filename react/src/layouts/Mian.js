import React, { useContext } from "react";
import { DrawerContext } from "../context/Drawer";
import Box from "../components/elements/Box";

export default function Main({ children }) {
    const { drawer } = useContext(DrawerContext);
    return <Box as="main" className={`mc-main ${ drawer ? "active" : "" }`}>{ children }</Box>
}
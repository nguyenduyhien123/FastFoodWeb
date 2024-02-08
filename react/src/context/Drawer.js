import { createContext, useState } from "react";

export const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const mediaQuery = window.matchMedia("(max-width: 991px)");
    const [drawer, setDrawer] = useState( mediaQuery.matches ? false : true );
    const toggleDrawer = () => setDrawer(!drawer);

    return (
        <DrawerContext.Provider value={{ drawer, toggleDrawer }}>
            { children }
        </DrawerContext.Provider>
    )
}
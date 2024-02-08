import React, { useContext } from "react";
import { MultipleMenu, Logout } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";
import data from "../data/master/sidebar.json";

export default function Sidebar() {
    
    const { drawer } = useContext(DrawerContext);
    
    return (
        <Section as="aside" className={`mc-sidebar thin-scrolling ${ drawer ? "active" : "" }`}>
            <MultipleMenu data={ data?.navs }  />
            <Logout data={ data?.button } />
        </Section>
    )
}
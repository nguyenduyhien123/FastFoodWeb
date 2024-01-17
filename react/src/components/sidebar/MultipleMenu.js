import React from "react";
import MenuItem from "./MenuItem";
import { List, Menu, Heading } from "../elements";

export default function MultipleMenu({ data }) {

    return (
        <>
            {data?.map((item, index) => (
                <Menu key={ index }  className="mc-sidebar-menu">
                    <Heading as="h5" className="mc-sidebar-menu-title">{ item.title }</Heading>
                    <List className="mc-sidebar-menu-list">
                        {item.menu.map((item, index) => ( 
                            <MenuItem 
                                key = { index } 
                                item = { item } 
                            />  
                        ))}
                    </List>
                </Menu>
            ))}
        </>
    );
}
import React from "react";
import { Anchor, Button } from "./elements";
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownMenu({ dropdown }) {
    return (
        <Dropdown.Menu align="end" className="mc-dropdown-paper">
            {dropdown.map((item, index) => (
                item.path ?
                <Anchor
                    key={index}
                    href={item.path}
                    icon={item.icon}
                    text={item.text}
                    onClick={item.onClick}
                    className="mc-dropdown-menu"
                />
                :
                <Button
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    onClick={item.onClick}
                    className="mc-dropdown-menu"
                />
            ))}
        </Dropdown.Menu>
    )
}
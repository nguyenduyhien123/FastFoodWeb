import React from "react";
import Icon from "../components/elements/Icon"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from "./DropdownMenu";

export default function DotsMenu({ dots, dropdown }) {
    return (
        <Dropdown bsPrefix="mc-dropdown">
            <Dropdown.Toggle bsPrefix="mc-dropdown-toggle"><Icon type={ dots } /></Dropdown.Toggle>
            <DropdownMenu className="mc-dropdown-paper" dropdown={ dropdown } />
        </Dropdown>
    )
}
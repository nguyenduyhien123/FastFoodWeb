import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor } from "../elements";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileDropdown({ name, username, image, dropdown }) {
    const {logoutUser} = useContext(AuthContext);
    return (
        <Dropdown className="mc-header-user">
            <Dropdown.Toggle className="mc-dropdown-toggle">
                <RoundAvatar src={ image } alt="avatar" size="xs" />
                <DuelText title={ name } descrip={ name } size="xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                {dropdown.map((item, index) => (
                    <Anchor
                        key={index}
                       icon={item.icon}
                        text={item.text}
                        className="mc-dropdown-menu"
                        onClick={logoutUser}
                        isBtn={true}
                    />
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
import React from "react";
import { Dropdown } from "react-bootstrap";
import { Button, Icon, Text, Image } from "../elements";

export default function LanguageDropdown({ title, icon, addClass, dropdown }) {
    return (
        <Dropdown title={ title }>
            <Dropdown.Toggle className={`mc-dropdown-toggle mc-header-icon ${ addClass }`}>
                <Icon type={ icon } />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                {dropdown.map((item, index) => (
                    <Button key={ index } className={`mc-header-language ${ item.check ? item.check  : "" }`}>
                        <Image src={ item.flag } alt="flag" />
                        <Text as="span">{ item.name }</Text>
                    </Button>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}
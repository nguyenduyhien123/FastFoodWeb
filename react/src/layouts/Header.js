import React, { useContext, useState, useRef } from 'react';
import { LanguageDropdown, WidgetDropdown, ProfileDropdown } from '../components/headerAdmin';
import { Button, Section, Box, Input } from "../components/elements";
import { DrawerContext } from '../context/Drawer';
import { ThemeContext } from '../context/Themes';
import { Logo } from '../components';
import data from "../data/master/header.json";
import { AuthContext } from '../context/AuthContext';

export default function Header() {
    const {userInfo} = useContext(AuthContext)
    const { drawer, toggleDrawer } = useContext(DrawerContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const searchRef = useRef();
    const [scroll, setScroll] = useState("fixed");
    const [search, setSearch] = useState("");

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) setScroll("sticky");
        else setScroll("fixed");
    });

    document.addEventListener('mousedown', (event) => {
        if (!searchRef.current?.contains(event.target)) {
            setSearch("");
        }
    })

    return (
        <Section as="header" className={`mc-header ${ scroll }`}>
            <Logo 
                src = { data?.logo.src }
                alt = { data?.logo.alt }
                name = { data?.logo.name }
                href = { data?.logo.path } 
            />
            <Box className="mc-header-group">
                <Box className="mc-header-left">
                    <Button 
                        icon={ data?.search.icon } 
                        className="mc-header-icon search" 
                        onClick={()=> setSearch("show")}
                    />
                    <Button 
                        icon={ drawer ? "menu_open" : "menu" } 
                        className="mc-header-icon toggle" 
                        onClick={ toggleDrawer } 
                    />
                    <Box className={`mc-header-search-group ${ search }`}>
                        <form className="mc-header-search" ref={ searchRef }>
                            <Button className="material-icons">{ data?.search.icon }</Button>
                            <Input type="search" placeholder={ data?.search.placeholder } />
                        </form>
                    </Box>
                </Box>
                <Box className="mc-header-right">
                    <Button 
                        icon={ theme }
                        title={ data.theme.title }
                        onClick={ toggleTheme }
                        className={`mc-header-icon ${ data.theme.addClass }`}
                    />
                    {/* <LanguageDropdown  
                        icon={ data.language.icon }
                        title={ data.language.title }
                        addClass={ data.language.addClass }
                        dropdown={ data.language.dropdown }
                    />
                    <WidgetDropdown 
                        icon={ data.cart.icon }
                        title={ data.cart.title }
                        badge={ data.cart.badge }
                        addClass={ data.cart.addClass }
                        dropdown={ data.cart.dropdown }
                    />
                    <WidgetDropdown 
                        icon={ data.message.icon }
                        title={ data.message.title }
                        badge={ data.message.badge }
                        addClass={ data.message.addClass }
                        dropdown={ data.message.dropdown }
                    />
                    <WidgetDropdown 
                        icon={ data.notify.icon }
                        title={ data.notify.title }
                        badge={ data.notify.badge }
                        addClass={ data.notify.addClass }
                        dropdown={ data.notify.dropdown }
                    /> */}
                    <ProfileDropdown 
                        name={ userInfo?.firstname }
                        image={ userInfo?.avatar || "Xin chào"}
                        // username={ data.profile.username || ""}
                        dropdown={ data.profile.dropdown }
                    />
                </Box>
            </Box>
        </Section>
    );
}


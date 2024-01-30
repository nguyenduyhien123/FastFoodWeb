import React from "react";
import { Box, Text, Form, Image, Button, Anchor, Heading, Input, Label, Icon } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/register.json";
 
export default function Register() {
    return (
        <Box className="mc-register">
            <Box className="mc-register-banner">
                <Image 
                    className="mc-register-banner-pattern" 
                    src={ data?.pattern.src } 
                    alt={ data?.pattern.alt } 
                />
                <Box className="mc-register-banner-content">
                    <Heading as="h2" className="mc-register-banner-title">{ data?.title.banner }</Heading>
                    <Text as="p" className="mc-register-banner-descrip">{ data?.descrip }</Text>
                    <Anchor 
                        icon = { data?.anchor.icon } 
                        text = { data?.anchor.text } 
                        href = { data?.anchor.path }
                        className = "mc-btn primary" 
                    />
                </Box>
            </Box>
            <Form className="mc-register-form">
                <Logo 
                    src = { data?.logo.src } 
                    alt = { data?.logo.alt } 
                    href = { data?.logo.path } 
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title.from }</Heading>
                {data?.input.map((item, index) => (
                    <IconField 
                        key = { index }
                        icon = { item.icon }
                        type = { item.type }
                        classes = { item.fieldSize }
                        placeholder = { item.placeholder }
                        passwordVisible = { item.passwordVisible }
                    />
                ))}
                
                <Box className="mc-auth-checkbox">
                    <Input type="checkbox" id="checkbox" />
                    <Label text={ data?.checkLabel } htmlFor="checkbox" />
                </Box>
                <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }>{ data?.button.text }</Button>
                <Box className="mc-auth-divide"><Text as="span">{ data?.divide.text }</Text></Box>
                <Box className="mc-auth-connect">
                    {data?.connect.map((item, index) => (
                        <Anchor key={ index } href={ item.path } className={ item.classes }>
                            <Icon className={ item.icon }></Icon>
                            <Text as="span">{ item.text }</Text>
                        </Anchor>
                    ))}
                </Box>
                <Box className="mc-register-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Form>
        </Box>
    )
}
import React from "react";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/login.json";

export default function Login() {
    return (
        <Box className="mc-auth"> 
            <Image
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt }
                className="mc-auth-pattern"  
            />
            <Box className="mc-auth-group">
                <Logo 
                    src = { data?.logo.src }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
                <Form className="mc-auth-form">
                    {data?.input.map((item, index) => (
                        <IconField 
                            key = { index }
                            icon = { item.icon }
                            type = { item.type }
                            option = { item.option }
                            classes = { item.fieldSize }
                            placeholder = { item.placeholder }
                            passwordVisible = { item.passwordVisible }
                        />
                    ))}
                    <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }>{ data?.button.text }</Button>
                    <Anchor className="mc-auth-forgot" href={ data?.forgot.path }>{ data?.forgot.text }</Anchor>
                    <Box className="mc-auth-divide"><Text as="span">{ data?.divide.text }</Text></Box>
                    <Box className="mc-auth-connect">
                        {data?.connect.map((item, index) => (
                            <Anchor key={ index } href={ item.path } className={ item.classes }>
                                <i className={ item.icon }></i>
                                <span>{ item.text }</span>
                            </Anchor>
                        ))}
                    </Box>
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Box>
        </Box>
    );
}
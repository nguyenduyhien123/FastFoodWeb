import React from "react";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../../components/elements";
import IconField from "../../components/fields/IconField";
import Logo from "../../components/Logo";
import data from "../../data/master/forgot.json";

export default function ForgotPassword() {
    return (
        <Box className="mc-auth">
            <Image 
                className="mc-auth-pattern" 
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt } 
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
                            classes = { item.fieldSize }
                            placeholder = { item.placeholder }
                            passwordVisible = { item.passwordVisible }
                        />
                    ))}
                    <Button className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }>{ data?.button.text }</Button>
                </Form>
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Box>
        </Box>
    );
}
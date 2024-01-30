import React from "react";
import { Row, Col } from "react-bootstrap";
import { Box, List, Item, Icon, Text, Form, Button, Input } from "../../components/elements";
import { DotsMenu, DuelText, RoundAvatar } from "../../components";
import CardLayout from "../../components/cards/CardLayout";
import IconField from "../../components/fields/IconField"
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/message.json";

export default function Message() {
    return (
        <PageLayout>
            <Row>
                <Col md={5} xl={4}>
                    <CardLayout className="p-0">
                        <Box className="mc-message-user">
                            <Box className="mc-message-user-filter">
                                <IconField 
                                    type={ data?.search.type }
                                    icon={ data?.search.icon }
                                    classes={ data?.search.fieldSize }
                                    placeholder={ data?.search.placeholder }
                                />
                                <DotsMenu 
                                    dots={ data?.dots.icon }
                                    dropdown={ data?.dots.menu } 
                                />
                            </Box>
                            <List className="mc-message-user-list thin-scrolling">
                                {data?.users.map((item, index) => (
                                    <Item key={ index } className={`mc-message-user-item ${ item.active ? item.active : "" }`}>
                                        <RoundAvatar 
                                            src={ item.src }
                                            alt={ item.alt } 
                                            size={`xs ${ item.status ? item.status : "" }`}
                                        />
                                        <DuelText 
                                            title={ item.name }
                                            timesTamp={ item.time }
                                            descrip = { item.text }
                                            size={`xs ${ item.mark ? item.mark : "" }`}
                                            gap="4px" 
                                        />
                                        { item.mark && <Text as="sup">{ item.badge }</Text> }
                                        <DotsMenu dots={ item.more.icon } dropdown={ item.more.menu }  />
                                    </Item>
                                ))}
                            </List>
                        </Box>
                    </CardLayout>
                </Col>
                <Col md={7} xl={8}>
                    <CardLayout>
                        <Box className="mc-message-chat">
                            <Box className="mc-message-chat-header">
                                <RoundAvatar src="images/avatar/01.webp" alt="avatar" size="xs" />
                                <DuelText title="miron mahmud" descrip="active now" size="xs" gap="4px" />
                                <Box className="mc-message-chat-action-group">
                                    {data?.actions.map((item, index) => (
                                        <Icon 
                                            key={ index } 
                                            type={ item.icon } 
                                            title={ item.title }
                                            onClick={ item.event } 
                                        />
                                    ))}
                                </Box>
                            </Box>
                            <List className="mc-message-chat-list thin-scrolling">
                                {data?.chats.map((chat, index) => (
                                    <Item key={ index } className="mc-message-chat-item">
                                        <RoundAvatar src={ chat.src } alt="avatar" size="mc-message-chat-user" />
                                        <Box className="mc-message-chat-group">
                                            {chat.text.map((message, index) => (
                                                <Box key={ index } className="mc-message-chat-text">
                                                    <Text key={ index }>{ message.text }</Text>
                                                    {message.icon.map((icon, index) => (
                                                        <Icon key={ index } type={ icon } />
                                                    ))}
                                                </Box>
                                            ))}
                                            <Text className="mc-message-chat-datetime">{ chat.time }</Text>
                                        </Box>
                                    </Item>
                                ))}
                            </List>
                            <Form className="mc-message-chat-footer">
                                <Input type="text" placeholder="Type a message"></Input>
                                <Button type="button" className="material-icons">send</Button>
                            </Form>
                        </Box>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
import React from "react";
import { Image, List, Box, Icon, Text, Item, Anchor, Button } from "../../components/elements";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/notification.json";

export default function Notification() {
    return (
        <PageLayout>
            <CardLayout className="mb-4">
                <Breadcrumb title={ data?.pageTitle }>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>
            <CardLayout>
                <CardHeader title="all notification" dotsMenu={ data?.dotsMenu } />
                <List className="mc-notify-list">
                    {data?.notify.map((item, index) => (
                        <Item className="mc-notify-item" key={ index }>
                            <Anchor className="mc-notify-content" href={ item.path }>
                                <Box className="mc-notify-media">
                                    <Image src={ item.src } alt={ item.alt } />
                                    <Icon className={`material-icons ${ item.icon.variant }`}>{ item.icon.label }</Icon>
                                </Box>
                                <Box className="mc-notify-meta">
                                    <Text as="span"><Text as="b">{ item.note.user }</Text> { item.note.text } <Text as="b">{ item.note.reason }</Text></Text>
                                    <Text as="small">{ item.time }</Text>
                                </Box>
                            </Anchor>
                            <Button className="mc-notify-close"><Icon>{ item.button }</Icon></Button>
                        </Item>
                    ))}
                </List>
            </CardLayout>
        </PageLayout>
    )
}
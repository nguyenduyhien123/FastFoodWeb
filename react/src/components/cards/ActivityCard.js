import React from "react";
import CardHeader from "./CardHeader";
import DivideTitle from "../DivideTitle";
import { Box, List, Item, Text, Image, Heading, Anchor } from "../elements";

export default function ActivityCard({ title, dotsMenu, items, style }) {
    return (
        <Box className="mc-card">
            <CardHeader title={ title } dotsMenu={ dotsMenu } />
            <List className="mc-activity-card-list thin-scrolling" style={ style }>
                {items.map((item, index)=> (
                    <Item key={ index } className="mc-activity-card-item">
                        <Box className="mc-activity-card-title">
                            <DivideTitle as="h6" title={ item.title } />
                            <Text as="small">{ item.time }</Text>
                        </Box>
                        <Box className="mc-activity-card-body">
                            {item.text && <Text className="mc-activity-card-text">{ item.text }</Text> }
                            {item.media &&
                                <Box className="mc-activity-card-media">
                                    <Image src={ item.media.src } alt={ item.media.alt } />
                                    <Heading as="h6">{ item.media.name }</Heading>
                                </Box>
                            }
                            { item.button && <Anchor href={ item.button.path } className="mc-btn primary sm">{ item.button.label }</Anchor> }
                        </Box>
                    </Item>
                ))}
            </List>
        </Box>
    )
}
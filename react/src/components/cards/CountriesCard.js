import React from "react";
import CardHeader from "./CardHeader";
import { List, Item, Image, Heading, Text, Box } from "../elements";

export default function CountriesCard({ title, dotsMenu, items }) {
    return (
        <Box className="mc-card">
            <CardHeader title={ title } dotsMenu={ dotsMenu } />
            <List className="mc-countries-card-list thin-scrolling">
                {items.map((item, index) => (
                    <Item key={ index } className="mc-countries-card-item">
                        <Box>
                            <Image src={ item.src } alt={ item.alt } />
                            <Heading as="h6">
                                <Text as="span">{ item.name.title }</Text>
                                { item.name.text }
                            </Heading>
                        </Box>
                        <Heading as="h6"><Text as="span">{ item.sales.title }</Text>{ item.sales.text }</Heading>
                        <Heading as="h6"><Text as="span">{ item.bounce.title }</Text>{ item.bounce.text }</Heading>
                    </Item>
                ))}
            </List>
        </Box>
    )
}
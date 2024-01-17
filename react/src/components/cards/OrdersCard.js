import React from "react";
import { CardHeader } from ".";
import { OrdersChart } from "../charts";
import { Box, List, Item, Heading, Text, Icon } from "../elements";

export default function OrdersCard({ title, dotsMenu, items }) {
    return (
        <Box className="mc-card">
            <CardHeader title={title} dotsMenu={dotsMenu} />
            <OrdersChart chart={ items } />
            <List className="mc-order-card-list">
                {items.map((item, index) => (
                    <Item key={ index } className="mc-order-card-item">
                        <Icon className={`material-icons ${ item.color }`}>{ item.icon }</Icon>
                        <Text as="p">{ item.name }</Text>
                        <Heading as="h5">{ item.value }</Heading>
                    </Item>
                ))}
            </List>
        </Box>
    )
}
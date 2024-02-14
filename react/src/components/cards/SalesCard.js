import React from "react";
import { CardHeader } from ".";
import { SalesChart } from "../charts";
import { Box, Text, Heading, Icon } from "../elements";

export default function SalesCard ({ chart, title, amount, percent, trendIcon, compare, dotsMenu }) {
    return (
        <Box className="mc-sales-card">
            <Box className="mc-sales-card-group">
                <CardHeader title={ title } dotsMenu={ dotsMenu } />
                <Box className={`mc-sales-card-amount ${trendIcon === "trending_up" ? "green" : "red"}`}>
                    <Heading as="h3">{ amount }</Heading>
                    <Text>{ percent }<Icon type={ trendIcon }/></Text>
                </Box>
                <Text className="mc-sales-card-compare">{ compare }</Text>
            </Box>
            <SalesChart chart={ chart } />
        </Box>
    );
}
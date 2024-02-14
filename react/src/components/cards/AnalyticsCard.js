import React from "react";
import DotsMenu from "../DotsMenu";
import { AnalyticsChart } from "../charts";
import { Box, Text, Heading } from "../elements";

export default function AnalyticsCard({ digit, label, variant, dataSet, dataKey, dotsMenu }) {
    return (
        <Box className={`mc-analytics-card ${ variant.name }`}>
            <Box className="mc-analytics-card-group">
                <Box className="mc-analytics-card-content">
                    <Heading>{ digit }</Heading>
                    <Text>{ label }</Text>
                </Box>
                <DotsMenu 
                    dots={ dotsMenu.icon } 
                    dropdown={ dotsMenu.menu } 
                />
            </Box>
            <AnalyticsChart 
                dataSet={ dataSet } 
                dataKey={ dataKey }
                variant={ variant.color }
            />
        </Box>
    )
}
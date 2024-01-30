import React from "react";
import { IconField } from "../fields";
import { RevenueChart } from "../charts";
import { Box, Heading, Text, Icon } from "../elements";

export default function RevenueCard({ title, field, report, chart }) {
    return (
        <Box className="mc-card">
            <Box className="mc-revenue-card-header">
                <Heading as="h5" className="mc-card-title">{title}</Heading>
                <IconField icon={field.icon} option={field.option} classes="w-sm h-sm" />
            </Box>
            <Box className="mc-revenue-card-group">
                {report.map((item, index) => (
                    <Box key={index} className="mc-revenue-card-report">
                        <Icon className={`material-icons ${item.variant}`}>{item.icon}</Icon>
                        <Heading><Text as="span">{item.label}</Text> {item.number}</Heading>
                    </Box>
                ))}
            </Box>
            <RevenueChart chart={ chart } />
        </Box>
    )
}
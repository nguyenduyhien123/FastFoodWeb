import React from "react";
import { CRMChart } from "../charts";
import { Box, Icon, Heading, Text } from "../elements";

export default function CRMCard({ variant, content, status, dataKey, dataSet }) {
    return (
        <Box className="mc-crm-card">
            <Box className="mc-crm-card-group">
                <Icon className={`material-icons ${ variant.name }`}>{ content.icon }</Icon>
                <Heading>{ content.value }</Heading>
                <Text>{ content.label }</Text>
                <Text as="span" className={ status.icon }>
                    <Text as="small">{ status.value }</Text>
                    <Text as="small">{ status.label }</Text>
                </Text>
            </Box>
            <CRMChart 
                dataKey={ dataKey }
                dataSet={ dataSet }
                variant={ variant }
            />
        </Box>
    )
}
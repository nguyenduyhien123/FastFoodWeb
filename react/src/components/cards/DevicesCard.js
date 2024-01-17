import React from "react";
import { IconField } from "../fields";
import { DevicesChart } from "../charts";
import { Box, Heading } from "../elements";

export default function DevicesCard({ title, icon, option, chart }) {
    return (
        <Box className="mc-card">
            <Box className="mc-devices-card-head">
                <Heading as="h5">{ title }</Heading>
                <IconField icon={ icon } option={ option } classes="w-sm h-sm" />
            </Box>
            <DevicesChart chart={ chart } />
        </Box>
    )
}
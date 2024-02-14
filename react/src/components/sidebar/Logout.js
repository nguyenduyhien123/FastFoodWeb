import React from "react";
import { Box, Anchor } from "../elements";

export default function Logout({ data }) {
    return (
        <Box className="mc-sidebar-logout text-center">
            <Anchor 
                href = { data?.path } 
                icon = { data?.icon } 
                text = { data?.text } 
                className = "mc-btn primary sm"
            />
        </Box>
    )
}
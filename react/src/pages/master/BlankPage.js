import React from "react";
import PageLayout from "../../layouts/PageLayout";
import { Box, Icon, Text } from "../../components/elements";

export default function BlankPage() {
    return (
        <PageLayout>
            <Box className="mc-blank">
                <Icon type="extension" />
                <Text>blank this page</Text>
            </Box>
        </PageLayout>
    )
}
import React from "react";
import { Box, List, Item, Text, Heading, Icon } from "../elements";

export default function RatingAnalytics({ graphLine, graphScore, graphStar, grapTitle, graphText }) {
    return (
        <Box className="mc-review-analytics-group">
            <Box className="mc-review-analytics-graph-group">
                <List className="mc-review-analytics-list">
                    {graphLine.map((item, index) => (
                        <Item key={ index } className="mc-review-analytics-item">
                            <Text as="span" className="mc-review-analytics-count">{ item.count }</Text>
                            <Box className="mc-review-analytics-graph"><Text as="span" style={{ width: item.graph }}></Text></Box>
                            <Text as="span" className="mc-review-analytics-user">({ item.user })</Text>
                        </Item>
                    ))}
                </List>
            </Box>
            <Box className="mc-review-analytics-detail-group">
                <Heading as="h3" className="mc-review-analytics-total">{ grapTitle }</Heading>
                <Heading as="h4" className="mc-review-analytics-score">{ graphScore }</Heading>
                <Box className="mc-review-analytics-star">
                    {graphStar.map((item, index) => (
                        <Icon key={ index } className="material-icons active">{ item }</Icon>
                    ))}
                </Box>
                <Text className="mc-review-analytics-text">{ graphText }</Text>
            </Box>
        </Box>
    )
}
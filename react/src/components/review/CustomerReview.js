import React from "react";
import DuelText from "../DuelText";
import DotsMenu from "../DotsMenu";
import RoundAvatar from "../RoundAvatar";
import { Box, List, Item, Icon, Text, Anchor } from "../elements";

export default function CustomerReview({ data }) {
    return (
        <List className="mc-review-list">
            {data?.map((item, index) => (
                <Item key={ index } className="mc-review-item">
                    <Box className="mc-review-group">
                        <Box className="mc-review-data">
                            <Box className="mc-review-head">
                                <Box className="mc-review-user">
                                    <RoundAvatar src={ item.src } alt={ item.alt } size="sm" />
                                    <DuelText title={ item.name } descrip={ item.date } size = "sm" />
                                    { item.admin ? <Text as="span" className="mc-review-admin">{ item.admin }</Text> : "" }
                                </Box>
                                <Box className="mc-review-reply">
                                    <Anchor 
                                        href = { item.button.path } 
                                        icon = { item.button.icon } 
                                        text = { item.button.text } 
                                        className = "mc-btn primary" 
                                    />
                                </Box>
                            </Box>
                            <Box className="mc-review-star">
                                {item.star.map((item, index) => (
                                    <Icon key={ index } type={ item } />
                                ))}
                            </Box>
                            <Text className="mc-review-describe">{ item.text }</Text>
                        </Box>
                        <Box className="mc-review-dots">
                            <DotsMenu 
                                dots = { item.dots.icon } 
                                dropdown = { item.dots.menu } 
                            />
                        </Box>
                    </Box>
                    {item.reply &&
                        <List>
                            {item.reply.map((item, index) => (
                                <Item key={ index }>
                                    <Box className="mc-review-group">
                                        <Box className="mc-review-data">
                                            <Box className="mc-review-head">
                                                <Box className="mc-review-user">
                                                    <RoundAvatar src={ item.src } alt={ item.alt } size="sm" />
                                                    <DuelText title={ item.name } descrip={ item.date } size = "sm" />
                                                    { item.admin ? <Text as="span" className="mc-review-admin">{ item.admin }</Text> : "" }
                                                </Box>
                                                <Box className="mc-review-reply">
                                                    <Anchor 
                                                        href = { item.button.path } 
                                                        icon = { item.button.icon } 
                                                        text = { item.button.text } 
                                                        className = "mc-btn primary" 
                                                    />
                                                </Box>
                                            </Box>
                                            {item.star &&
                                                <Box className="mc-review-star">
                                                    {item.star.map((item, index) => (
                                                        <Icon key={ index } type={ item } />
                                                    ))}
                                                </Box>
                                            }
                                            <Text className="mc-review-describe">{ item.text }</Text>
                                        </Box>
                                        <Box className="mc-review-dots">
                                            <DotsMenu 
                                                dots = { item.dots.icon } 
                                                dropdown = { item.dots.menu } 
                                            />
                                        </Box>
                                    </Box>
                                </Item>
                            ))}
                        </List>
                    }
                </Item>
            ))}
        </List>
    )
}
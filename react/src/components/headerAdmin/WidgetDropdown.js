import React from "react";
import { CardHeader } from "../cards";
import { Dropdown } from "react-bootstrap";
import { DotsMenu, RoundAvatar } from "..";
import { Icon, Text, Box, Anchor, List, Item, Image, Heading } from "../elements";

export default function WidgetDropdown({ title, icon, addClass, badge, dropdown }) {
    return (
        <Dropdown className={ addClass }>
            <Dropdown.Toggle className="mc-dropdown-toggle mc-header-icon " title={ title }>
                <Icon type={ icon } />
                <Text as="sup" className={ badge?.variant }>{ badge?.text }</Text>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                <Box className="mc-header-dropdown-group">
                    <CardHeader 
                        title={ `${dropdown?.title} (${badge?.text})` } 
                        dotsMenu={ dropdown?.dotsMenu } 
                    />
                    <List className="mc-header-dropdown-list thin-scrolling">
                        {dropdown?.items.map((item, index) => (
                            <Item key={ index } className={`mc-header-dropdown-item ${ item?.addClass ? item?.addClass : "" }`}>
                                <Anchor className="mc-header-dropdown-content" href={ item?.path }>
                                    {item?.product &&
                                        <Box className="mc-header-dropdown-shop-media">
                                            {item?.product?.images.map((image, index) => (
                                                <Image key={ index } src={ image } alt="product" />
                                            ))}
                                            <Text as="span">{ item?.product?.count }</Text>
                                        </Box>
                                    }
                                    {item?.user &&
                                        <Box className="mc-header-dropdown-message-media">
                                            <RoundAvatar 
                                                src={ item?.user?.image }
                                                alt="avatar" 
                                                size={`xs ${ item?.user?.status ? item?.user?.status : "" }`}
                                            />
                                        </Box>
                                    }
                                    {item?.notify &&
                                        <Box className="mc-header-dropdown-notify-media">
                                            <Image src={ item?.notify?.image } alt="avatar" />
                                            <Icon className={`material-icons ${ item?.notify?.variant }`}>{ item?.notify?.icon }</Icon>
                                        </Box>
                                    }
                                    <Box className="mc-header-dropdown-meta">
                                        <Heading as="h4">
                                            {item?.name && <Text as="cite">{ item?.name }</Text>}
                                            {item?.note && <span dangerouslySetInnerHTML={{ __html: item?.note}} />}
                                            {item?.shortMoment && <Text as="time">{ item?.shortMoment }</Text>}
                                        </Heading>
                                        <Text as="p">{item?.chat || item?.longMoment || `(${item?.price}) Total Price`}</Text>
                                    </Box>
                                </Anchor>
                                {item?.addClass && item?.badge && <Text as="sup">{ item?.badge }</Text>}
                                <DotsMenu 
                                    dots={ item?.more?.icon } 
                                    dropdown={ item?.more?.menu } 
                                />
                            </Item>
                        ))}
                    </List>
                    <Anchor href={ dropdown?.button?.path } className="mc-btn primary mc-header-dropdown-button" >
                        { dropdown?.button?.label }
                    </Anchor>
                </Box>
            </Dropdown.Menu>
        </Dropdown>
    )
}
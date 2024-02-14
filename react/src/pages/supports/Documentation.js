import React from "react";
import { Breadcrumb, DivideTitle } from "../../components";
import { Box, Item, Anchor, Image, Heading } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/supports/docs.json";

export default function Documentation() {
    return (
        <PageLayout>
            <Box className="mc-card">
                <Breadcrumb title={ data?.pageTitle } className="mb-4">
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
                {data?.docs.map((item, index) => (
                    <Box key={ index } className="mc-docs">
                        <DivideTitle as="h3" title={ item.heading } />
                        <p dangerouslySetInnerHTML={{ __html: item.describe }} />
                        {item.images ?
                            item.images.map((image, index) => (
                                <Image 
                                    key={ index } 
                                    src={ image } 
                                    alt="screenshot" 
                                />
                            ))
                        : ""}
                    </Box>
                ))}
                <Box className="mc-docs-footer">
                    <Heading>Need to more support?</Heading>
                    <a 
                        href="https://themeforest.net/item/duyhien-react-admin-dashboard-template/40188968/support" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mc-btn primary" 
                    >
                        <i className="material-icons">forum</i>
                        <span>contact us</span>
                    </a>
                </Box>
            </Box>
        </PageLayout>
    )
}
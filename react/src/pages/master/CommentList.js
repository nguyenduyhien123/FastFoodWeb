import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, List, Item, Icon, Text, Form, Button, Input, Anchor } from "../../components/elements";
import { Breadcrumb, DotsMenu, DuelText, RoundAvatar } from "../../components";
import CardLayout from "../../components/cards/CardLayout";
import IconField from "../../components/fields/IconField"
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/commentList.json";
import axios from 'axios'
import CustomerComment from "../../components/comment/CustomerComment";
import Comment from "../../components/comment/Comment";


export default function CommentList() {
    const [comments, setComments] = useState([]);
    const [productActive, setProductActive] = useState({});
    const [commentActiveData, setCommentActiveData] = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/summary/getProductsAndComments',
            withCredentials: true,          
        })
        .then(res => {
            var comments = res.data;
            comments.forEach(item => {
                item.image = JSON.parse(item.image)
            });
            setComments(res.data)
        })
        .catch(err => {

        })
    }, [])
    const getCommentsByProductId = (index ) => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/summary/getCommentsByCriteria',
            withCredentials: true, 
            params: {
                product_id: index || 1,
              }         
        })
        .then(res => {
            console.log(res.data);

        })
        .catch(err => {
        })
    }
    useEffect(() => {
        getCommentsByProductId(productActive?.id);
        console.log('Run .. ...');
    }, [productActive?.id])
    return (
        <PageLayout>
            <Row>
            <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className={ `mc-breadcrumb-item`} >
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col md={6} xl={4}>
                    <CardLayout className="p-0">
                        <Box className="mc-comment-user">
                            <Box className="mc-comment-user-filter">
                                <IconField 
                                    type={ data?.search.type }
                                    icon={ data?.search.icon }
                                    classes={ data?.search.fieldSize }
                                    placeholder={ data?.search.placeholder }
                                />
                                <DotsMenu 
                                    dots={ data?.dots.icon }
                                    dropdown={ data?.dots.menu } 
                                />
                            </Box>
                            <List className="mc-comment-user-list thin-scrolling">
                                {comments?.map((item, index) => (
                                    <Item key={ index } className={`mc-comment-user-item ${item?.id === productActive?.id ? 'active' : ''}`} onClick={() => setProductActive(item)}>
                                        <RoundAvatar 
                                            src={ item?.image[0] }
                                            alt={ item.alt || "Ảnh sản phẩm"} 
                                            size={`xs ${ item.status ? item.status : "" }`}
                                        />
                                        <DuelText 
                                            title={ item.name }
                                            descrip = { item?.description }
                                            size={`xs ${ item.mark ? item.mark : "" }`}
                                            gap="4px" 
                                        />
                                        { item?.comments_count && <Text as="sup">{ item?.comments_count }</Text> }
                                        {/* <DotsMenu dots={ item?.more?.icon } dropdown={ item?.more?.menu }  /> */}
                                    </Item>
                                ))}
                            </List>
                        </Box>
                    </CardLayout>
                </Col>
                <Col md={6} xl={8}>
                    <CardLayout>
                        <Box className="mc-comment-chat">
                            <Box className="mc-comment-chat-header">
                                {productActive?.image && <RoundAvatar src={productActive?.image[0]} alt="avatar" size="xs" />}
                                <DuelText title={productActive?.name} descrip={productActive?.description} size="xs" gap="4px" />
                                <Box className="mc-comment-chat-action-group">
                                </Box>
                            </Box>
                            <List className="mc-comment-chat-list thin-scrolling">
                            <Comment product_id={productActive.id}></Comment>
                            </List>
                            {/* <Form className="mc-comment-chat-footer">
                                <Input type="text" placeholder="Type a message"></Input>
                                <Button type="button" className="material-icons">send</Button>
                            </Form> */}
                        </Box>
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
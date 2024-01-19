import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../../components/cards";
import { Breadcrumb, Pagination } from "../../components";
import LabelField from "../../components/fields/LabelField";
import UsersTable from "../../components/tables/UsersTable";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/userList.json";
import axios from 'axios'

export default function UserList() {
    const [accounts, setAccounts]  = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/users/',
            withCredentials: true,          
        })
        .then(res => setAccounts(res.data))
        .catch(err => console.log('GỌI APi ds user bị lỗi'))
    }, [])
    console.log(accounts);
    return (
        <PageLayout>
            <Row> 
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                {data?.float.map((item, index) => (
                    <Col xl={4} key={ index }>
                        <FloatCard 
                            variant={ item.variant }
                            digit={ item.digit }
                            title={ item.title }
                            icon={ item.icon }
                        />
                    </Col>
                ))}
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title={ data?.cardTitle } dotsMenu={ data?.dotsMenu } />
                        <Row xs={1} sm={4} className="mb-4">
                            {data?.filter.map((item, index)=> (
                                <Col key={index}>
                                    <LabelField 
                                        type = { item.type }
                                        label = { item.label }
                                        option = { item.option }
                                        placeholder = { item.placeholder }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-sm"
                                    /> 
                                </Col>
                            ))}
                        </Row>
                        <UsersTable 
                            thead = { data?.table.thead }
                            tbody = { accounts }
                            setDataUserTable = {setAccounts}
                        />
                        <Pagination />
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}
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
    const [float, setFloat] = useState([
        { "title": "Tổng số tài khoản", "digit": "547", "icon": "functions", "variant": "lg purple" }, 
        { "title": "Đã xác thực", "digit": "605", "icon": "check_circle", "variant": "lg green" },
        { "title": "Chưa xác thực", "digit": "249", "icon": "remove_circle", "variant": "lg red" }
    ]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/users/',
            withCredentials: true,          
        })
        .then(res => setAccounts(res.data))
        .catch(err => {
            // console.log('GỌI APi ds user bị lỗi')
        })
    }, [])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/summary/getTotalUser',
            withCredentials: true,          
        })
        .then(res => {
            setFloat([...float, float[0].digit = res.data.count]);
        })
        .catch(err => {
            // console.log(err)
        })
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/summary/getTotalUserIsVerified',
            withCredentials: true,          
        })
        .then(res => {
            setFloat([...float, float[1].digit = res.data.count]);
        })
        .catch(err => {
            // console.log(err)
        })
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/summary/getTotalUserIsNotVerified',
            withCredentials: true,          
        })
        .then(res => {
            setFloat([...float, float[2].digit = res.data.count]);
        })
        .catch(err => {
            // console.log(err)
        })

    }, []);
    // console.log(accounts);
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
                {float?.map((item, index) => (
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
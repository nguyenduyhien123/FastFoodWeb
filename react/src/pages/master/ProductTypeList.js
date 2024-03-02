import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout"; 
import data from "../../data/master/productTypeList.json";
import axios from 'axios'
import ProductTypesTable from "../../components/tables/ProductTypesTable";
export const ProductTypeList = () => {
    const [productTypes, setProductTypes] = useState([])
    const headTableProductType = [ "Sản phẩm", "Ngày tạo", "Cập nhật lần cuối", "Hành động"]
    const getAllProductTypes = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/producttypes/',
            withCredentials: true,          
        })
        .then((res) => {
            setProductTypes(res.data)
        })
        .catch(err => {

        })
    }
    useEffect(() => {
        getAllProductTypes();
    }, [])
    return <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={data?.pageTitle}>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={index} className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={item.path}>{item.text}</Anchor> : item.text}
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <Row>
                            <Col xl={12}>
                                <ProductTypesTable
                                    thead = { headTableProductType } 
                                    tbody = { productTypes} 
                                    getAllProductType = {getAllProductTypes}
                                />
                                {/* {isLoadData ? <Pagination onPageChange={setProductsLoad} data={products} rows={5}/> : ''} */}
                            </Col>
                        </Row>
                    </CardLayout>
                </Col> 
            </Row>
        </PageLayout>
}
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardLayout, FloatCard } from "../../components/cards";
import ProductsTable from "../../components/tables/ProductsTable";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import Anchor from "../../components/elements/Anchor";
import PageLayout from "../../layouts/PageLayout"; 
import data from "../../data/master/productList.json";
import axios from 'axios'
export default function ProductList() {
    const [products, setProducts] = useState([])
    // const [productsLoad, setProductsLoad] = useState({start : 0, end : 0});
    const [isLoadData, setIsLoadData] = useState(false);
    const [float, setFloat] = useState([
        { "title": "Tổng sản phẩm", "digit": "0", "icon": "shopping_bag", "variant": "lg blue" }, 
        { "title": "Tổng loại sản phẩm", "digit": "0", "icon": "widgets", "variant": "lg green" },
        // { "title": "Tổng thương hiệu", "digit": "0", "icon": "verified_user", "variant": "lg purple" }
    ])
    const [productFilter, setProductFilter] = useState([
        { "label": "Hiển thị bởi", "option": ["12 row", "24 row", "36 row"] },
        { "label": "Danh mục", "option": ["mans", "womans", "kids", "accessory"] },
        { "label": "Tìm kiếm", "type": "search", "placeholder": "id / name / category / brand" }
    ])
    const headTableProduct = ['TÊN SẢN PHẨM','GIÁ','DANH MỤC','TRẠNG THÁI', 'SAO','NGÀY TẠO','CẬP NHẬT LẦN CUỐI','HÀNH ĐỘNG'];
    const [productTypes, setProductTypes] = useState([]);
    const getAllProduct = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/products/',
            withCredentials: true,          
        })
        .then((res) => {
            // console.log(res);
            var products = res.data;
            products.forEach(item => {
                item.image = JSON.parse(item.image)
            });
            setProducts(products)
            // console.log(res.data);
            setIsLoadData(true)
        })
        .catch(err => {

        })
    }
    useEffect(() => {
        getAllProduct();
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/product_types/',
            withCredentials: true,          
        })
        .then((res) => {
            setProductFilter((prevArray) => 
            {
                const newArray = [...prevArray]; // Sao chép mảng gốc
                newArray[1].option = res.data; // Thay đổi phần tử tại index
                return newArray; // Trả về mảng mới đã thay đổi
            }
            )
        })
        .catch(err => {
            
        })
    }, [])
    console.log(productFilter);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/summary/getTotalProducts',
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
            url: 'http://localhost:8000/api/summary/getTotalProductTypes',
            withCredentials: true,          
        })
        .then(res => {
            setFloat([...float, float[1].digit = res.data.count]);
        })
        .catch(err => { 
            // console.log(err)
        })

    }, []);
    return (
        <PageLayout>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ "Danh sách sản phẩm"}>
                            {/* {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))} */}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                {float?.map((item, index) => (
                    <Col key={ index } sm={6} lg={4}>
                        <FloatCard 
                            variant = { item.variant }
                            digit = { item.digit }
                            title = { item.title }
                            icon = { item.icon }
                        />
                    </Col>
                ))}
                <Col xl={12}>
                    <CardLayout>
                        <Row>
                            <Col xl={12}>
                                <ProductsTable 
                                    thead = { headTableProduct } 
                                    tbody = { products } 
                                    getAllProduct = {getAllProduct}
                                />
                                {/* {isLoadData ? <Pagination onPageChange={setProductsLoad} data={products} rows={5}/> : ''} */}
                            </Col>
                        </Row>
                    </CardLayout>
                </Col> 
            </Row> 
        </PageLayout>
    );
}

import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productUpload.json";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
export default function ProductUpload() {
    const [product, setProduct] = useState({});
    const [productError, setProductError] = useState({});
    const [productTypes, setProductTypes] = useState([]);
    const navigate = useNavigate();
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProduct({ ...product, [name]: value })
    }
    const handleChangeFile = (e) => {
        let name = e.target.name;
        let files = e.target.files;
        setProduct({ ...product, [name]: files })
    }
    const handleSubmit = (e) => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/products/',
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: product
        })
            .then(res => {
                // console.log('Thêm thành công');
                navigate('/admin/product-list')
                
            })
            .catch(err => {
                setProductError(err.response.data.errors);
                // console.log('Thêm thất bại');
            })
    }
    // console.log(product);
    const [uploadFile, setUploadFile] = React.useState('Chọn hình ảnh');
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/product_types/',
            withCredentials: true,
        })
            .then((res) => {
                setProductTypes(res.data)
                setProduct({...product, product_type_id : res.data[0].id})
            })
            .catch(err => {
                // console.log('Lỗi khi gọi DSSP')
            })
    }, [])
    return (
        <PageLayout>
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
                        <CardHeader title="Thông tin cơ bản" dotsMenu={data?.dotsMenu} />
                        <Row>
                            <Col xl={12}><LabelField type="text" label="Tên sản phẩm" fieldSize="w-100 h-md" name="name" onChange={handleChange} placeholder="Tên sản phẩm ..."/>
                                {productError?.name && <Text className="text-danger">{productError?.name[0]}</Text>}
                            </Col>
                            <Col xl={12}><LabelField type="text" label="Mô tả sản phẩm" fieldSize="w-100 h-md" name="description" onChange={handleChange} placeholder="Mô tả sản phẩm ..."/>
                                {productError?.description && <Text className="text-danger">{productError?.description[0]}</Text>}
                            </Col>
                            <Col xl={6}><LabelField label="Loại sản phẩm" option={productTypes} fieldSize="w-100 h-md" name="product_type_id" onChange={handleChange} value="0" placeholder="Loại sản phẩm ..."/>
                                {productError?.product_type_id && <Text className="text-danger">{productError?.product_type_id[0]}</Text>}
                            </Col>
                            <Col xl={6}><LabelField type="number" label="Giá" fieldSize="w-100 h-md" name="price" onChange={handleChange} placeholder="Giá ..."/>
                                {productError?.price && <Text className="text-danger">{productError?.price[0]}</Text>}
                            </Col>
                        </Row>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title="Hình ảnh sản phẩm" dotsMenu={data?.dotsMenu} />
                        <Box className="mc-product-upload-media">
                            {product["image[]"] && Array.from(product["image[]"]).map((data, index) => {
                                return <Box className="mc-product-upload-image"><Image src={URL.createObjectURL(data)} alt={data.name} /></Box>
                            })}
                            <Box className="mc-product-upload-file">
                                <Input type="file" multiple name="image[]" id="product" onChange={handleChangeFile} />
                                <Label htmlFor="product"><Icon type="collections" /><Text>{uploadFile}</Text></Label>
                            </Box> 
                        </Box>
                        {productError["image"] && <Text className="text-danger">{productError["image"][0]}</Text>}
                        <Anchor
                            className="mc-btn w-100 primary mt-5"
                            text="Thêm sản phẩm"
                            icon="cloud_upload"
                            href="#"
                            onClick={handleSubmit}
                        />
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    )
}
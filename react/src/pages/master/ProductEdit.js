import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productEdit.json";
import axios from 'axios';
import { useParams } from 'react-router-dom'
import ImageInteractive from "../../components/elements/ImageInteractive";
export default function ProductEdit() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [productTypes, setProductTypes] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [indexCurrentImage, setIndexCurrentImage] = useState(null);
    const maxImageUpload = 10;
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProduct({ ...product, [name]: value })
    }
    console.log(imageUpload);
    const handleChooseImage = (e) => {
        // let name = e.target.name;
        // let files = e.target.files;
        // setProduct({ ...product, [name]: files })
        let arrImage = product["image[]"];
        console.log('Hình ảnh ',arrImage);
        console.log('Hình ảnh đã chọn ',e.target.files);
        if (indexCurrentImage == null) {
            if (e.target.files.length) {
                for (let i = 0; i < e.target.files.length; i++) {
                    arrImage.push(e.target.files[i])
                }
            }
            console.log('123');
        }
        else {
            let newArrImage = [];
            if (e.target.files.length) {
                for (let i = 0; i < e.target.files.length && i <= maxImageUpload - arrImage.length; i++) {
                    if (e.target.files[i].size <= 1048576 * 10) {
                        newArrImage.push(e.target.files[i]);
                    }
                }
                arrImage?.splice(indexCurrentImage, 1, ...newArrImage);
            }
            console.log(456);
            setIndexCurrentImage(null);
        }
        console.log("Mảng hình ảnh", arrImage);
        setProduct({...product, "image[]" : arrImage})
    }
    const handleDeleteImage = (index) => {
        let arrImage = product["image[]"];
        arrImage?.splice(index, 1);
        setProduct({...product, "image[]" : arrImage})
    }
    const handleEditImage = (index) => {
        setIndexCurrentImage(index);
    }
    const handleSubmit = (e) => {
        let data = {...product, _method : "PATCH"};
        axios({
            method: 'post',
            url: `http://localhost:8000/api/products/${id}`,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data
        })
            .then(res => {
                console.log('Thêm thành công');
            })
            .catch(err => {
                console.log('Thêm thất bại');
            })
    }
    console.log(product);
    const [uploadFile, setUploadFile] = React.useState('Chọn hình ảnh');
    useEffect(() => {
        // Lấy ds loại sản phẩm
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/product_types/',
            withCredentials: true,
        })
            .then((res) => {
                setProductTypes(res.data)
            })
            .catch(err => console.log(err));
        // Lấy thông tin chi tiết sản phẩm
        axios({
            method: 'get',
            url: `http://localhost:8000/api/products/${id}`,
            withCredentials: true,
        })
            .then((res) => {
                console.log(res);
                var product = res.data;
                product.image = Object.values(JSON.parse(product?.image))
                // delete product["image"];
                product?.image.forEach(imageItem => {
                    if (product?.image[imageItem]?.startsWith('https') == false) {
                        product.image[imageItem] = 'http://localhost:8000/storage/uploads/' + product.image[imageItem];
                    }
                })
                product["image[]"] = product.image;
                delete product?.image;
                setProduct(res.data)
            })
            .catch(err => console.log('Gọi API chi tiết sản phẩm bị lỗi'))
    }, [])
    console.log('ABCDEF ',product["image[]"]);
    console.log('Dữ liệu products, ',product);
    const listImageDisplay = () => {
        let arr = [];
        if(product["image[]"]) 
        { 
        product["image[]"]?.forEach((data, index) => {
            if(typeof data === 'string')
            {
                arr.push(<Box className="mc-product-upload-image"><ImageInteractive src={data} alt={data.name} handleDeleteImage={() => handleDeleteImage(index)} handleEditImage={() => handleEditImage(index)} /></Box>)
            }
            else
            {
                arr.push(<Box className="mc-product-upload-image"><ImageInteractive src={URL.createObjectURL(data)} alt={data.name} handleDeleteImage={() => handleDeleteImage(index)} handleEditImage={() => handleEditImage(index)} /></Box>)
            }
        })
        }
        return arr;
    }
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
                            <Col xl={12}><LabelField type="text" label="Tên sản phẩm" fieldSize="w-100 h-md" name="name" onChange={handleChange} value={product?.name || ""} ></LabelField></Col>
                            <Col xl={12}><LabelField type="text" label="Mô tả sản phẩm" fieldSize="w-100 h-md" name="description" onChange={handleChange} value={product?.description || ""} /></Col>
                            <Col xl={6}><LabelField label="Loại sản phẩm" option={productTypes} fieldSize="w-100 h-md" name="product_type_id" onChange={handleChange} value={product?.product_type_id || ""} /></Col>
                            <Col xl={6}><LabelField type="number" label="Giá" fieldSize="w-100 h-md" name="price" onChange={handleChange} value={product?.price || ""} /></Col>
                        </Row>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title="Hình ảnh sản phẩm" dotsMenu={data?.dotsMenu} />
                        <Box className="mc-product-upload-media">
                            {listImageDisplay()}
                            {/* <Box className="mc-product-upload-image"><Image src="images/product/single/01.webp" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/single/02.webp" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/single/03.webp" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/single/04.webp" alt="product" /></Box> */}
                            <Box className="mc-product-upload-file">
                                <Input type="file" multiple name="image[]" id="product" onChange={handleChooseImage} />
                                <Label htmlFor="product"><Icon type="collections" /><Text>{uploadFile}</Text></Label>
                            </Box>
                        </Box>
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
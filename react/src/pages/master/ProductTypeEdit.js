import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Image, Input, Label, Icon, Text } from "../../components/elements";
import { LabelField, LabelTextarea } from "../../components/fields";
import { CardLayout, CardHeader } from "../../components/cards";
import Breadcrumb from "../../components/Breadcrumb";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/productEdit.json";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import ImageInteractive from "../../components/elements/ImageInteractive";
export const ProductTypeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productType, setProductType] = useState({});
    const [productTypeError, setProductTypeError] = useState({});
    useEffect(() => {
        // Lấy ds loại sản phẩm
        axios({
            method: 'get',
            url: `http://localhost:8000/api/producttypes/${id}`,
            withCredentials: true,
        })
            .then((res) => {
                setProductType(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProductType({ ...productType, [name]: value })
    }
    const handleChooseImage = (e) => {
        let name = e.target.name;
        let file = e.target.files[0];
        setProductType({ ...productType, [name]: file })
    }
    const handleSubmit = () => {
        let data = { ...productType, _method: "PATCH" };
        if(typeof data?.image == 'string')
        {
            delete data.image
        }
        axios({
            method: 'post',
            url: `http://localhost:8000/api/producttypes/${id}`,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: data 
        })
            .then(res => {
                Swal.fire({
                    title: res?.data?.message || "Cập nhật thành công",
                    icon: 'success',
                });
                navigate(`/admin/producttype-list`)
            })
            .catch(res => {
                setProductTypeError(res?.response?.data?.errors)
                Swal.fire({
                    title: res?.response?.data?.message || "Cập nhật thất bại",
                    icon: 'error',
                });
            })
    }
    const listImageDisplay = () => {
        if (productType?.image) {
                if (typeof productType?.image === 'string') {
                    return <Box className="mc-producttype-upload-image"><ImageInteractive src={productType?.image?.startsWith('https') ? productType?.image : `http://localhost:8000/storage/uploads/${productType?.image}`} alt={productType?.image.name} /></Box>
                }
                else {
                    return <Box className="mc-producttype-upload-image"><ImageInteractive src={URL.createObjectURL(productType?.image)} alt={productType?.name} /></Box>
                }
        }
    }
    console.log(productType);
    return <PageLayout>
        <Row>
            <Col xl={12}>
                <CardLayout>
                    <Breadcrumb title={"Chỉnh sửa danh mục"}>

                    </Breadcrumb>
                </CardLayout>
            </Col>
            <Col xl={12}>
                <CardLayout>
                    <CardHeader title="Thông tin cơ bản" dotsMenu={data?.dotsMenu} />
                    <Row>
                        <Col xl={6}><LabelField type="text" label="Tên danh mục" fieldSize="w-100 h-md" name="name" onChange={handleChange} value={productType?.name || ""} ></LabelField>                                {productTypeError?.name && <Text className="text-danger">{productTypeError?.name[0]}</Text>}
                        </Col>
                        <Col xl={6}>
                            <Label className="mc-label-field-title">Hình ảnh</Label>
                            <Box className="mc-product-upload-media">
                            {listImageDisplay()}
                            <Box className="mc-product-upload-file">
                                <Input type="file" name="image" id="product" onChange={handleChooseImage} />
                                <Label htmlFor="product"><Icon type="collections" /><Text>Chọn hình ảnh</Text></Label>
                            </Box>
                        </Box>
                            {productTypeError?.image && <Text className="text-danger">{productTypeError?.image[0]}</Text>}
                        </Col>
                        <Button
                            className="mc-btn w-100 primary mt-5"
                            text="Cập nhật danh mục"
                            icon="cloud_upload"
                            onClick={handleSubmit}
                        />
                    </Row>
                </CardLayout>
            </Col>
        </Row>
    </PageLayout>
} 
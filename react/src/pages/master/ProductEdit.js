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
import ImageInteractive from "../../components/elements/ImageInteractive";
import Swal from 'sweetalert2';


export default function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [productError, setProductError] = useState({});
    const [productTypes, setProductTypes] = useState([]);
    const [imageUpload, setImageUpload] = useState([]);
    const [imageDelete, setImageDelete] = useState([]);
    const [indexCurrentImage, setIndexCurrentImage] = useState(null);
    const maxImageUpload = 10;
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setProduct({ ...product, [name]: value })
    }
    const handleChooseImage = (e) => {
        let arrImage = product["image[]"];
        let imageUploadArr = imageUpload;
        if (indexCurrentImage == null) {
            if (e.target.files.length) {
                for (let i = 0; i < e.target.files.length; i++) {
                    imageUploadArr.push(e.target.files[i]);
                    arrImage.push(e.target.files[i])
                }
            }
<<<<<<< HEAD
            console.log('123');
=======
            // console.log('123');
>>>>>>> master
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
            setIndexCurrentImage(null);
        }
<<<<<<< HEAD
        console.log("Mảng hình ảnh", arrImage);
=======
        // console.log("Mảng hình ảnh", arrImage);
>>>>>>> master
        setImageUpload(imageUploadArr);
        setProduct({ ...product, "image[]": arrImage })
    }
    const handleDeleteImage = (index) => {
        let arrImage = product["image[]"];
        if (typeof arrImage[index] == 'string') {
            setImageDelete([...imageDelete, arrImage[index]]);
        }
        arrImage?.splice(index, 1);
        setProduct({ ...product, "image[]": arrImage })
    }
    const handleEditImage = (index) => {
        setIndexCurrentImage(index);
    }
    const handleSubmit = (e) => {
        let images = [];
        let dataSend = { ...product };
        dataSend["image[]"].forEach(data => {
            if (data instanceof File) {
                images.push(data);
            }
        })
        dataSend["image[]"] = images;
        dataSend.imageDelete = imageDelete;
<<<<<<< HEAD
        console.log(imageUpload);
=======
        // console.log(imageUpload);
>>>>>>> master
        let data = { ...dataSend, _method: "PATCH" };
        axios({
            method: 'post',
            url: `http://localhost:8000/api/products/${id}`,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
<<<<<<< HEAD
            data: data
=======
            data: data 
>>>>>>> master
        })
            .then(res => {
                Swal.fire({
                    title: res?.data?.message || "Cập nhật thành công",
                    icon: 'success',
                });
                navigate(`/admin/product-view/${product?.id}`)
            })
            .catch(res => {
                setProductError(res?.response?.data?.errors)
                Swal.fire({
                    title: res?.response?.data?.message || "Cập nhật thất bại",
                    icon: 'error',
                });
            })
    }
<<<<<<< HEAD
    console.log(productError);
=======
   //  console.log(productError);
>>>>>>> master
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
<<<<<<< HEAD
            .catch(err => console.log(err));
=======
            .catch(err => {
                console.log(err)
            });
>>>>>>> master
        // Lấy thông tin chi tiết sản phẩm
        axios({
            method: 'get',
            url: `http://localhost:8000/api/products/${id}`,
            withCredentials: true,
        })
            .then((res) => {
<<<<<<< HEAD
                console.log(res);
=======
                // console.log(res);
>>>>>>> master
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
<<<<<<< HEAD
    // console.log('ABCDEF ',product["image[]"]);
    // console.log('Dữ liệu products, ',product);
=======
>>>>>>> master
    const listImageDisplay = () => {
        let arr = [];
        if (product["image[]"]) {
            product["image[]"]?.forEach((data, index) => {
                if (typeof data === 'string') {
                    arr.push(<Box className="mc-product-upload-image"><ImageInteractive src={data?.startsWith('https') ? data : `http://localhost:8000/storage/uploads/${data}`} alt={data.name} handleDeleteImage={() => handleDeleteImage(index)} /></Box>)
                }
                else {
                    arr.push(<Box className="mc-product-upload-image"><ImageInteractive src={URL.createObjectURL(data)} alt={data.name} handleDeleteImage={() => handleDeleteImage(index)} /></Box>)
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
                            <Col xl={12}><LabelField type="text" label="Tên sản phẩm" fieldSize="w-100 h-md" name="name" onChange={handleChange} value={product?.name || ""} ></LabelField>                                {productError?.name && <Text className="text-danger">{productError?.name[0]}</Text>}
                            </Col>
                            <Col xl={12}><LabelField type="text" label="Mô tả sản phẩm" fieldSize="w-100 h-md" name="description" onChange={handleChange} value={product?.description || ""} />
                                {productError?.description && <Text className="text-danger">{productError?.description[0]}</Text>}

                            </Col>
                            <Col xl={6}><LabelField label="Loại sản phẩm" option={productTypes} fieldSize="w-100 h-md" name="product_type_id" onChange={handleChange} value={product?.product_type_id || ""} />
                                {productError?.product_type_id && <Text className="text-danger">{productError?.product_type_id[0]}</Text>}
                            </Col>
                            <Col xl={6}><LabelField type="number" label="Giá" fieldSize="w-100 h-md" name="price" onChange={handleChange} value={product?.price || ""} />
                                {productError?.price && <Text className="text-danger">{productError?.price[0]}</Text>}

                            </Col>
                        </Row>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title="Hình ảnh sản phẩm" dotsMenu={data?.dotsMenu} />
                        <Box className="mc-product-upload-media">
                            {listImageDisplay()}
<<<<<<< HEAD
                            {/* <Box className="mc-product-upload-image"><Image src="images/product/single/01.webp" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/single/02.webp" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/single/03.webp" alt="product" /></Box>
                            <Box className="mc-product-upload-image"><Image src="images/product/single/04.webp" alt="product" /></Box> */}
=======
>>>>>>> master
                            <Box className="mc-product-upload-file">
                                <Input type="file" multiple name="image[]" id="product" onChange={handleChooseImage} />
                                <Label htmlFor="product"><Icon type="collections" /><Text>{uploadFile}</Text></Label>
                            </Box>
                        </Box>
                        {productError?.image && <Text className="text-danger">{productError?.image[0]}</Text>}
                        <Anchor
                            className="mc-btn w-100 primary mt-5"
                            text="Cập nhật sản phẩm"
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
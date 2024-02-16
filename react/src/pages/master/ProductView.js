import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Box, Item, Text, Icon, List, Image, Heading, Button } from "../../components/elements";
import { CustomerReview, RatingAnalytics } from "../../components/review";
import { Breadcrumb, DivideTitle } from "../../components";
import PageLayout from "../../layouts/PageLayout";
import LabelTextarea from "../../components/fields/LabelTextarea";
import CardLayout from "../../components/cards/CardLayout";
import data from "../../data/master/productView.json";
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../../assets/sass/5-pages/_product-view.scss';
import {RingLoader} from "react-spinners";
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "rgb(54, 215, 183)",
  };
function isObjectWithProperties(value) {
    if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length > 0;
    }

    return false;
}

export default function ProductView() {
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState({});
    const [imageActive, setImageActive] = useState();
    const productBreadcrum = [
        { "path": "/", "text": "Trang chủ" },
        { "text": "Sản phẩm" },
        { "text": "Xem" }
    ]
const productSpecify = [
    // { "icon": "store", "title": "Thương hiệu", "text": "ecstasy" },
    { "icon": "pix", "title": "Danh mục", "text": product?.product_type?.name },
    // { "icon": "sell", "title": "Giá", "price": { "now": "$37.00", "old": "$42.00" } },
    { "icon": "sell", "title": "Giá", "text": product?.price},
    { "icon": "shopping_cart", "title": "Trạng thái", "text": product?.status ? 'Còn' : 'Không' },
    // { "icon": "hotel_class", "title": "Đánh giá", "text": "(03) review" },
    { "icon": "verified", "title": "Ngày tạo", "text": product?.created_at },
    { "icon" : "update", "title" : "Cập nhật lần cuối", "text" : product?.updated_at}
];
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/products/${id}`,
            withCredentials: true,
        })
            .then((res) => {
                // console.log(res.data);
                let p = res.data
                p.image = JSON.parse(p.image)
                setProduct(p)
                setImageActive(Object.keys(p.image)[0])
                setIsLoaded(true)
            })
            .catch(err => {
                // console.log('Lỗi khi gọi API chi tiết sản phẩm')
            })
    }, [])
    // console.log('Tên sản phẩm ', product?.name);
    return <>{isLoaded ? <>         <PageLayout>
        <CardLayout className="mb-4">
            <Breadcrumb title={'Xem sản phẩm'}>
                {productBreadcrum?.map((item, index) => (
                    <Item key={index} className="mc-breadcrumb-item">
                        {item?.path ? <Anchor className="mc-breadcrumb-link" href={item?.path}>{item?.name}</Anchor> : item?.text}
                    </Item>
                ))}
            </Breadcrumb>
        </CardLayout>
        <CardLayout className="p-lg-5">
            <Row>
                <Col xl={5}>
                    <DivideTitle title="Hình ảnh sản phẩm" className="mb-4" />
                    <Box className="mc-product-view-gallery">
                        {isObjectWithProperties(product?.image) && <Image className={"image-active-show"} key={imageActive} src={product?.image[imageActive].startsWith('https') ? product?.image[imageActive] : `http://localhost:8000/storage/uploads/${product?.image[imageActive]}`} alt={`Ảnh sản phẩm`} />}
                    </Box>
                    <Box className="mc-product-view-gallery thumbnail">
                        {product?.image && Object.keys(product?.image)?.map((item, index) => (
                            <>
                                <img className={imageActive === item ? 'image-active ' : ''} key={item} src={product?.image[item].startsWith('https') ? product?.image[item] : `http://localhost:8000/storage/uploads/${product?.image[item]}`} alt={`Ảnh sản phẩm`} onClick={() => setImageActive(item)} />
                            </>
                        ))}
                    </Box>
                    {/* <Box className="mc-product-thumbnail-image">
                        {product?.image && Object.keys(product?.image)?.map((item, index) => (
                            <Image key={ index } src={ product?.image[item]} alt={ `Ảnh sản phẩm` } />
                        ))} 
                    </Box> */}
                </Col>
                <Col xl={7}>
                    <DivideTitle title="Chi tiết sản phẩm" className="mb-4" />
                    <Box className="mc-product-view-info-group">
                        {/* Tên sản phẩm */}
                        <Heading as="h2" className="mc-product-view-info-title">{product?.name || 'Sản phẩm A'}</Heading>
                        {productSpecify?.map((item, index) => (
                            <Box key={index} className="mc-product-view-meta">
                                <Icon type={item?.icon} />
                                <Heading as="h4">{item?.title}</Heading>
                                <Text as="span">:</Text>
                                {item?.text && <Text  as="p">{item?.text}</Text>}
                                {item?.price && <Text as="p">{item?.price?.now} VND <del>{item?.price?.old}</del></Text>}
                                {item?.list &&
                                    <List>
                                        {item?.list?.map((item, index) => (
                                            <Item key={index}>{item}</Item>
                                        ))}
                                    </List>
                                }
                            </Box>
                        ))}
                    </Box>
                </Col>
                <Col xl={12}>
                    <DivideTitle title="Mô tả sản phẩm" className="mt-5 mb-4" />
                    <Box className="mc-product-view-descrip">
                        <Text>{product?.description}</Text>
                    </Box>
                </Col>
                <Col xl={12}>
                    <DivideTitle title="Phân tích đánh giá" className="mt-5 mb-4" />
                    <RatingAnalytics
                        graphLine={data?.rating.item}
                        graphScore={data?.rating.score}
                        graphStar={data?.rating.icon}
                        grapTitle={data?.rating.total}
                        graphText={data?.rating.text}
                    />
                </Col>
                <Col xl={12}>
                    <DivideTitle title="Đánh giá từ khách hàng" className="mt-5 mb-4" />
                    <CustomerReview data={data?.review} />
                </Col>
                <Col xl={12}>
                    <DivideTitle title="review reply form" className="mt-3 mb-4" />
                    <LabelTextarea placeholder="Write here..." fieldSize="w-100 h-text-xl" />
                    <Button className="mc-btn mc-review-form-btn primary">drop your replies</Button>
                </Col>
            </Row>
        </CardLayout>
    </PageLayout> </> : <>      <PageLayout>
    <RingLoader
        color={"red"}
        loading={!isLoaded}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="mc-product-notifi">Đang tải</p>
        </PageLayout></>}
    </>
}
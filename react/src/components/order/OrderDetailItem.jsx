import { Row, Col } from "react-bootstrap";
import { CardHeader, CardLayout } from "../cards";
import { Box, Button, Heading, Image, Input, Item, List, Section, Text } from "../elements";
import { useEffect, useState } from "react";
import './OrderDetailItem.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const OrderDetailItem = ({data, setCartList}) => {
    const [count, setCount] = useState(data?.quantity);
    const [cart, setCart] = useState(() => {
        let cart = data;
        return cart;
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const totalPrice = (quantity, price) => {
        return quantity * price;
    }
    const getCarts = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getCartByUser/',
            withCredentials: true,
        })
            .then((res) => {
                let data = res.data
                data.forEach(item => {
                    let imageJSON = JSON.parse(item.product.image);
                    item.product.image = imageJSON;
                });
                setCartList(data)
            })
            .catch(err => {

            })
    }
    const settingToastify = {
        autoClose: 4000, // Tự động đóng sau 4 giây
        hideProgressBar: true, // Không hiển thị thanh thời gian
        pauseOnHover: false, // Không dừng lại khi hovered
    }
    const deleteCart = () => {
        // console.log('Xoá giỏ hàng có id là ', cart?.id);
        setIsProcessing(true);
        let data = { _method: "DELETE" };
      
        const apiUpdateCart = axios({
          method: 'post',
          url: `http://localhost:8000/api/carts/${cart?.id}`,
          withCredentials: true,
          data: data
        });
      
        apiUpdateCart.then((res) => {
          getCarts();
          toast.dismiss(); // Ẩn bất kỳ thông báo nào đang hiển thị
          toast.success(res?.data?.message || 'Xoá sản phẩm khỏi giỏ hàng thành công', settingToastify);
          setIsProcessing(false);
        }).catch((error) => {
          toast.dismiss(); // Ẩn bất kỳ thông báo nào đang hiển thị
          toast.error('Xoá sản phẩm khỏi giỏ hàng thất bại', settingToastify);
          setIsProcessing(false);
        });
    };
    const updateCart = (quantity) => {
        setIsProcessing(true);
        let data = { quantity: quantity, _method: "PATCH" };
      
        const apiUpdateCart = axios({
          method: 'post',
          url: `http://localhost:8000/api/carts/${cart?.id}`,
          withCredentials: true,
          data: data
        });
      
        apiUpdateCart.then((res) => {
          getCarts();
          toast.dismiss(); // Ẩn bất kỳ thông báo nào đang hiển thị
          toast.success('Cập nhật giỏ hàng thành công', settingToastify);
          setIsProcessing(false);
        }).catch((error) => {
          toast.dismiss(); // Ẩn bất kỳ thông báo nào đang hiển thị
          toast.error('Cập nhật giỏ hàng thất bại', settingToastify);
          setIsProcessing(false);
        });
      };
    return <div className="order-detail-item">
                        <Row className="">
                        <Col xl={3} md={4} xs={4}>
                            <Image src={ cart?.product?.image["0"].startsWith('https') === true ? cart?.product?.image[0] : `http://localhost:8000/storage/uploads/${cart?.product?.image["0"]}`} className="product-image"/>
                        </Col>
                        <Col xl={8} md={6} xs={6}>
                            <Heading>{cart?.product?.name}</Heading>
                            <Text>{cart?.product?.price}</Text>
                            <Box>
                                <Box className="mc-quantity d-flex justify-content-around">
                                    <Button onClick={() => {
                                        if (count > 0 && !isProcessing) {      
                                            setCount(count - 1)                         
                                            updateCart(count - 1)
                                        }
                                    }}>-</Button>
                                    <Input min={0} max={1000} type={"number"} className="mc-input" value={count} onInput={e => {
                                        if(!isProcessing)
                                        {
                                        let number = Number(e.target.value);
                                        setCount(number)
                                        updateCart(number);
                                        }
                                    }} />
                                    <Button onClick={() => {
                                        if (count < 1000 && !isProcessing) {
                                            setCount(count + 1)
                                            updateCart(count + 1)
                                        }
                                    }}>+</Button>
                                </Box>
                            </Box>
                            <Box>
                            <Text className="text-end text-dark fw-bold fs-3">{totalPrice(count, cart?.product?.price)}</Text>
                            </Box>
                        </Col>    
                        <Col xl={1} md={2} xs={2} className="d-flex align-items-center justify-content-center">
                        {/* <Button title="Delete" className="material-icons delete" onClick={() => {
                            if(!isProcessing)
                            {
                                deleteCart();
                            }
                        }}>delete</Button> */}
                        </Col>
                        </Row>

    </div>
}
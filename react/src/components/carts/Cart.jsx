import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.scss";

const Cart = ({ setCartItemCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    console.log(cartItems);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const fetchCartItems = () => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/getCartByUser/`,
      withCredentials: true,
    })
      .then((res) => {
        let updatedCartItems = res.data.map(item => {
          if (typeof item.product.image === "string") {
            item.product.image = JSON.parse(item.product.image);
          }
          return item;
        });
        setCartItems(updatedCartItems);
      })
      .catch((error) => console.error("Lỗi khi tải giỏ hàng:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/carts/${id}`, { withCredentials: true })
      .then((res) => {
        fetchCartItems();
      })
      .catch((error) => console.error("Lỗi khi xóa sản phẩm:", error));
  };

  return (
    <div className="cart-container">
      <h1 className="wishlist-title">Giỏ hàng của bạn</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>STT</th>
            <th>Hình Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                {item.product.image ? (
                  <img
                    src={item.product.image[0]?.startsWith("https")
                      ? item.product.image[0]
                      : `http://localhost:8000/storage/uploads/${item.product.image[0]}`}
                    alt="Product"
                    className="img-thumbnail"
                  />
                ) : (
                  <span>Hình ảnh không khả dụng</span>
                )}
              </td>
              <td style={{ width: '350px', }}><Link to={`/products/${item.product.id}`} >{item.product.name}</Link></td>
              <td>{item.product.price.toLocaleString("vi-VN")} VND</td>
              <td>{item.quantity.toLocaleString("vi-VN")}</td>
              <td>{(item.quantity * item.product.price).toLocaleString("vi-VN")} VND</td>
              <td className="d-flex justify-content-around align-items-center mt-4 pb-5" style={{ width: '120px', }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary fs-5 w-100" onClick={() => {
        navigate('/accounts/payments')
      }}>Đến trang Thanh toán &nbsp;{totalPrice.toLocaleString('vi-VN')} VND</button>
    </div >
  );
};

export default Cart;

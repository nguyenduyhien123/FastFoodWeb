import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      url: `http://localhost:8000/api/carts`,
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

  const handleProductDetailClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/api/carts/${id}`, { withCredentials: true })
      .then((res) => {
        fetchCartItems();
      })
      .catch((error) => console.error("Lỗi khi xóa sản phẩm:", error));
  };

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
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
              <td style={{ width: '350px', }}>{item.product.name}</td>
              <td>{item.product.price}<u>đ</u></td>
              <td>
                <button onClick={() => handleDecrement(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </td>
              <td>{item.quantity * item.product.price}<u>đ</u></td>
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
      <h1>Tổng tiền:&nbsp;{totalPrice.toLocaleString('vi-VN')}<u>đ</u></h1>
    </div>
  );
};

export default Cart;

import axios from "axios"; // Thêm import axios
import React, { useEffect, useState } from "react";

import "./ShoppingCart.scss";

const ShoppingCart = ({ addToCart, decreaseQty, removeItem }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems(); // Gọi hàm fetchCartItems khi component được tạo

    axios({
      method: 'get',
      url: 'http://localhost:8000/api/carts/',
      withCredentials: true,
    })
      .then(res => console.log(res.data)) // Thay setWishList bằng console.log để kiểm tra dữ liệu
      .catch(error => console.error('Lỗi khi tải danh sách giỏ hàng:', error));
  }, []);

  const fetchCartItems = () => {
    // Sử dụng Axios để gọi API cho giỏ hàng
    axios.get("http://localhost:8000/api/carts/")
      .then((response) => {
        setCartItems(response.data);
        const total = response.data.reduce((price, item) => price + item.qty * item.price, 0);
        setTotalPrice(total);
      })
      .catch((error) => console.error("Error fetching cart items: ", error));
  };

  return (
    <>
      <section className="cart-items">
        <div className="container d_flex">
          <div className="cart-details">
            {!cartItems || cartItems.length === 0 && <h1 className="no-items product">No Items are added in Cart</h1>}

            {cartItems &&
              cartItems.map((item) => {
                const productQty = item.price * item.qty;

                return (
                  <div className="cart-list product d_flex" key={item.id}>
                    <div className="img">
                      <img src={item.cover} alt="" />
                    </div>
                    <div className="cart-details">
                      <h3>{item.name}</h3>
                      <h4>
                        ${item.price}.00 * {item.qty}
                        <span>${productQty}.00</span>
                      </h4>
                    </div>
                    <div className="cart-items-function">
                      <div className="removeCart">
                        <button className="removeCart" onClick={() => removeItem(item)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                      <div className="cartControl d_flex">
                        <button className="incCart" onClick={() => addToCart(item)}>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                        <button className="desCart" onClick={() => decreaseQty(item)}>
                          <i className="fa-solid fa-minus"></i>
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price"></div>
                  </div>
                );
              })}
          </div>

          <div className="cart-total product">
            <h2>Cart Summary</h2>
            <div className="d_flex">
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleOutside = (e) => {
    if (!e.target.closest('.cart-container')) {
      setIsHovered(false);
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleOutside);
    return () => {
      window.removeEventListener('click', handleOutside);
    }
  }, []);

  useEffect(() => {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const storedCartItems = JSON.parse(localStorage.getItem('carts')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleCartClick = () => {
    navigate("/shopping-cart");
  }

  return (
    <div className="cart-container" onClick={handleCartClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <span className="cart_icon">
        <i className="ri-shopping-basket-line"></i>
        <span className="badge">{cartItems.length}</span>
      </span>
      <Link to="/shopping-cart"></Link>
      <div className={`cart-products ${isHovered ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="product-info">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Giá: ${item.price}</p>
                  <p>Số Lượng: {item.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;

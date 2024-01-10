import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate(); 
  const [isHovered, setIsHovered] = useState(false);

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

  const handleCartClick = () => {
    navigate("/shopping-cart");
  }

  return (
    <div className="cart-container" onClick={handleCartClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <span className="cart_icon">
        <i className="ri-shopping-basket-line"></i>
        <span className="badge">2</span>
      </span>
      <Link to="/shopping-cart"></Link>
      <div className={`cart-products ${isHovered ? "active" : ""}`} onClick={(e) => e.stopPropagation()}>
        <h2>Your Cart</h2>
        <ul>
          <li>Sản Phẩm 1 - $20</li>
          <li>Sản Phẩm 2 - $25</li>
          {/* Add more items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Cart;

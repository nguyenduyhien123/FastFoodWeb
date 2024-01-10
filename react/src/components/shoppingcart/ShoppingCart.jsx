import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./ShoppingCart.scss";

const ShoppingCart = () => {
  const { carts, addToCart, decreaseQuantity, removeFromCart } = useContext(CartContext);

  const totalPrice = carts ? carts.reduce((price, item) => price + item.quantity * item.price, 0) : 0;

  return (
    <section className='cart-items'>
      <div className='container'>
        <div className='cart-details'>
          {(!carts || carts.length === 0) && <h1 className='no-items product'>Chưa có sản phẩm nào trong giỏ hàng</h1>}

          {carts &&
            carts.map((item) => {
              const productQty = item.price * item.quantity;

              return (
                <div className='cart-list product' key={item.id}>
                  <div className='img'>
                    <img src={item.cover} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <p>ID sản phẩm: {item.id}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <h4>
                      ${item.price}.00 * {item.quantity}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button onClick={() => removeFromCart(item.id)}>
                        <i className='fa-solid fa-xmark'></i> Xóa
                      </button>
                    </div>
                    <div className='cartControl d_flex'>
                      <button onClick={() => addToCart(item.id)}>
                        <i className='fa-solid fa-plus'></i> Thêm
                      </button>
                      <button onClick={() => decreaseQuantity(item.id)}>
                        <i className='fa-solid fa-minus'></i> Giảm
                      </button>
                    </div>
                  </div>
                  <div className='cart-item-price'></div>
                </div>
              );
            })}
        </div>

        <div className='cart-total product'>
          <h2>Tóm tắt giỏ hàng</h2>
          <div className='d_flex'>
            <h4>Tổng giá :</h4>
            <h3>${totalPrice}.00</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;

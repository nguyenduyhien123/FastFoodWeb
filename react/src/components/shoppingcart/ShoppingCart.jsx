import React from "react";
import "./ShoppingCart.scss";

const ShoppingCart = ({ CartItem, addToCart, decreaseQty, removeItem }) => {
  // Step 7: calculate total of items
  const totalPrice = CartItem ? CartItem.reduce((price, item) => price + item.qty * item.price, 0) : 0;

  // product qty total
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          {/* if hamro cart ma kunai pani item xaina bhane no display */}

          <div className='cart-details'>
            {(!CartItem || CartItem.length === 0) && <h1 className='no-items product'>No Items are added in Cart</h1>}

            {/* yasma hami le cart item lai display garaaxa */}
            {CartItem &&
              CartItem.map((item) => {
                const productQty = item.price * item.qty;

                return (
                  <div className='cart-list product d_flex' key={item.id}>
                    <div className='img'>
                      <img src={item.cover} alt='' />
                    </div>
                    <div className='cart-details'>
                      <h3>{item.name}</h3>
                      <h4>
                        ${item.price}.00 * {item.qty}
                        <span>${productQty}.00</span>
                      </h4>
                    </div>
                    <div className='cart-items-function'>
                      <div className='removeCart'>
                        {/* Thêm sự kiện onClick để gọi hàm removeItem */}
                        <button className='removeCart' onClick={() => removeItem(item)}>
                          <i className='fa-solid fa-xmark'></i>
                        </button>
                      </div>
                      {/* step 5
                    product ko qty lai inc ra des garne
                    */}
                      <div className='cartControl d_flex'>
                        <button className='incCart' onClick={() => addToCart(item)}>
                          <i className='fa-solid fa-plus'></i>
                        </button>
                        <button className='desCart' onClick={() => decreaseQty(item)}>
                          <i className='fa-solid fa-minus'></i>
                        </button>
                      </div>
                    </div>

                    <div className='cart-item-price'></div>
                  </div>
                );
              })}
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
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

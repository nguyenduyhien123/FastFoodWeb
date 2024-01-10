import React, { useState } from 'react';
import './ShoppingCart.scss';

const products = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div>
        <div className="shopping-cart-container">
            <h1>Shopping Cart</h1>
            <div className="products-section">
                <h2>Products</h2>
                <ul>
                {products.map((product) => (
                    <li key={product.id}>
                    {product.name} - ${product.price}
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </li>
                ))}
                </ul>
            </div>
            <div className="cart-section">
                <h2>Shopping Cart</h2>
                <ul>
                {cart.map((product) => (
                    <li key={product.id}>
                    {product.name} - ${product.price}
                    </li>
                ))}
                </ul>
                <p>Total: ${calculateTotal()}</p>
            </div>
        </div>
    </div>
  );
};

export default ShoppingCart;

import React, { createContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const location = useLocation();
    const [carts, setCarts] = useState([]);

    const addToCart = (idProduct) => {
        let cartItem = {
            id: idProduct,
            quantity: 1
        };

        let cartArray;
        if (localStorage.getItem('carts')) {
            cartArray = JSON.parse(localStorage.getItem('carts'));
        } else {
            cartArray = [];
        }

        let index = cartArray.findIndex((data) => {
            return data.id === idProduct;
        });

        if (index !== -1) {
            cartArray[index] = {
                id: cartArray[index].id,
                quantity: cartArray[index].quantity + 1
            };
        } else {
            cartArray.push(cartItem);
        }

        setCarts(cartArray);
        var cartJSON = JSON.stringify(cartArray);
        localStorage.setItem('carts', cartJSON);
    };

    useEffect(() => {
        let cartArray;
        if (localStorage.getItem('carts')) {
            cartArray = JSON.parse(localStorage.getItem('carts'));
        } else {
            cartArray = [];
        }
        setCarts(cartArray);
    }, [location.pathname]);

    const removeFromCart = (idProduct) => {
        let cartArray;
        if (localStorage.getItem('carts')) {
            cartArray = JSON.parse(localStorage.getItem('carts'));
        } else {
            cartArray = [];
        }
    
        let index = cartArray.findIndex((data) => {
            return data.id === idProduct;
        });
    
        if (index !== -1) {
            // Xóa sản phẩm khỏi mảng
            cartArray.splice(index, 1);
    
            // Cập nhật state và localStorage
            setCarts(cartArray);
            var cartJSON = JSON.stringify(cartArray);
            localStorage.setItem('carts', cartJSON);
        }
    };
    
    const increaseQuantity = (idProduct) => {
        let cartArray;
        if (localStorage.getItem('carts')) {
            cartArray = JSON.parse(localStorage.getItem('carts'));
        } else {
            cartArray = [];
        }

        let index = cartArray.findIndex((data) => {
            return data.id === idProduct;
        });

        if (index !== -1) {
            cartArray[index] = {
                id: cartArray[index].id,
                quantity: cartArray[index].quantity + 1
            };

            setCarts(cartArray);
            var cartJSON = JSON.stringify(cartArray);
            localStorage.setItem('carts', cartJSON);
        }
    };

    const decreaseQuantity = (idProduct) => {
        let cartArray;
        if (localStorage.getItem('carts')) {
            cartArray = JSON.parse(localStorage.getItem('carts'));
        } else {
            cartArray = [];
        }

        let index = cartArray.findIndex((data) => {
            return data.id === idProduct;
        });

        if (index !== -1 && cartArray[index].quantity > 1) {
            cartArray[index] = {
                id: cartArray[index].id,
                quantity: cartArray[index].quantity - 1
            };

            setCarts(cartArray);
            var cartJSON = JSON.stringify(cartArray);
            localStorage.setItem('carts', cartJSON);
        }
    };

    return (
        <CartContext.Provider value={{ carts, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

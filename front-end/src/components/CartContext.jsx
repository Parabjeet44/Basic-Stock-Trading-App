import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (stock) => {
    setCart((prevCart) => [...prevCart, stock]);
  };

  const removeFromCart = (symbol) => {
    setCart((prevCart) => prevCart.filter(stock => stock.symbol !== symbol));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

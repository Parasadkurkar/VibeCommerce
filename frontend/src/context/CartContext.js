

import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};


const API_URL = 'http://localhost:5000/api';


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

 
  const loadCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`);
      const data = await res.json();
      setCartItems(data.items);
      setCartTotal(data.total);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

 
  useEffect(() => {
    loadCart();
  }, []);

  
  const addToCart = async (productId, qty) => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, qty }),
      });

      if (res.ok) {
        
        await loadCart();
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
       
        await loadCart();
        return true;
      } else {
        console.error('Failed to remove from cart');
        return false;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };
  const clearCart = () => {
    setCartItems([]);
    setCartTotal(0);
  };

  
  const value = {
    cartItems,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    itemCount: cartItems.reduce((acc, item) => acc + item.qty, 0) // Total quantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
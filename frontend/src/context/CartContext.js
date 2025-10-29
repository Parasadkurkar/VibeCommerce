// in frontend/src/context/CartContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const CartContext = createContext();

// 2. Create a custom hook to use the context
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Define the API URL
const API_URL = 'http://localhost:5000/api';

// 4. Create the provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Function to fetch the cart from the backend
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

  // Load the cart when the provider first mounts
  useEffect(() => {
    loadCart();
  }, []);

  // Function to add/update an item (calls our POST API)
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
        // After adding, reload the cart to get new total and items
        await loadCart();
      } else {
        console.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Function to remove an item (calls our DELETE API)
  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // After removing, reload the cart
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

  // 5. Provide these values to all children components
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
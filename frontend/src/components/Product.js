// in frontend/src/components/Product.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Product.css'; // We will create this file next
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

// We pass in 'product' as a prop

const Product = ({ product }) => {
  const { addToCart } = useCart(); // <-- 2. GET THE FUNCTION

  // 3. CREATE A HANDLER
  const handleAddToCart = () => {
    // We add the product with a quantity of 1
    addToCart(product._id, 1);
    toast.success(`${product.name} added to cart`)// Simple confirmation
  };  


  return (
    // The 'product-card' className is for our custom CSS
    <Card className="my-3 p-3 rounded product-card">
      <Card.Img 
        src={product.image} 
        variant="top" 
        className="product-image" 
      />

      <Card.Body>
        {/* We'll make this a link later */}
        <Card.Title as="div" className="product-title">
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as="h3" className="product-price">
          ${product.price}
        </Card.Text>

        <Button 
          className="w-100" // 'w-100' makes it full-width
          variant="primary" onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
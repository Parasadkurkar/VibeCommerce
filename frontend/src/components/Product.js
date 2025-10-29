

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Product.css';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';


const Product = ({ product }) => {
  const { addToCart } = useCart();


  const handleAddToCart = () => {
    
    addToCart(product._id, 1);
    toast.success(`${product.name} added to cart`)
  };  


  return (
    
    <Card className="my-3 p-3 rounded product-card">
      <Card.Img 
        src={product.image} 
        variant="top" 
        className="product-image" 
      />

      <Card.Body>
        
        <Card.Title as="div" className="product-title">
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as="h3" className="product-price">
          ${product.price}
        </Card.Text>

        <Button 
          className="w-100"
          variant="primary" onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
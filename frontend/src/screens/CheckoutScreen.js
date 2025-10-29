// in frontend/src/screens/CheckoutScreen.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Form, Button, Image } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import './CheckoutScreen.css'; 

// 1. IMPORT THE MODAL
import ReceiptModal from '../components/ReceiptModal'; 

const CheckoutScreen = () => {
  // 2. ADD 'clearCart'
  const { cartItems, cartTotal, clearCart } = useCart(); 
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // 3. UNCOMMENT MODAL STATE
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  React.useEffect(() => {
    if (cartItems.length === 0 && !receipt) { // Don't redirect if we just placed an order
      navigate('/cart');
    }
  }, [cartItems, navigate, receipt]);

  // 4. --- UPDATE THE SUBMIT HANDLER ---
  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      // Call the backend API
      const res = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, name, email }), // Send cart and user info
      });

      if (res.ok) {
        const data = await res.json();
        setReceipt(data);     // Save the receipt
        setShowModal(true);   // Show the modal
        clearCart();          // Clear the cart in our frontend state
        toast.success('Order placed successfully!');
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* 5. UNCOMMENT THE MODAL RENDER */}
      {receipt && (
        <ReceiptModal
          show={showModal}
          onHide={() => setShowModal(false)}
          receipt={receipt}
        />
      )}

      <h1 className="mb-4">Checkout</h1>
      <Row>
        {/* ... (The rest of the JSX is identical) ... */}
        
        {/* --- Left Column: Form --- */}
        <Col md={7}>
          <Card className="summary-card p-4">
            <Form onSubmit={submitHandler}>
              {/* Customer Info Section */}
              <div className="checkout-form-section">
                <h4 className="mb-3">Customer Information</h4>
                
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="name">Full Name</Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Label htmlFor="email">Email Address</Form.Label>
                </Form.Floating>
              </div>

              {/* Payment Details Section */}
              <div className="checkout-form-section">
                <h4 className="mb-3">Payment Details (Mock)</h4>
                <Form.Floating className="mb-3">
                  <Form.Control
                    type="text"
                    id="card"
                    placeholder="4242 4242 4242 4242"
                    defaultValue="4242 4242 4242 4242"
                    disabled
                  />
                  <Form.Label htmlFor="card">Card Number</Form.Label>
                </Form.Floating>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" className="w-100 p-3 fs-5">
                Place Order & Pay ${cartTotal}
              </Button>
            </Form>
          </Card>
        </Col>

        {/* --- Right Column: Summary --- */}
        <Col md={5}>
          <Card className="summary-card">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="summary-total-title">
                  Order Summary
                </h2>
              </ListGroup.Item>

              {/* Visual Item Loop */}
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="summary-item">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="summary-item-image"
                  />
                  <div className="summary-item-details">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-qty d-block">
                      Qty: {item.qty}
                    </span>
                  </div>
                  <span className="summary-item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </ListGroup.Item>
              ))}

              {/* Subtotal Section */}
              <ListGroup.Item>
                <Row className="mt-2">
                  <Col>Subtotal ({itemCount} items)</Col>
                  <Col className="text-end">${cartTotal}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end">FREE</Col>
                </Row>
              </ListGroup.Item>

              {/* Total Section */}
              <ListGroup.Item>
                <Row className="fs-5 fw-bold">
                  <Col>Order Total</Col>
                  <Col className="text-end">${cartTotal}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutScreen;
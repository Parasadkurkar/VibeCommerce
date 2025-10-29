// in frontend/src/screens/CartScreen.js

import React from 'react';
import { Link ,useNavigate } from 'react-router-dom';
// Import InputGroup
import { Row, Col, ListGroup, Image, Button, Card, InputGroup } from 'react-bootstrap'; 
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import './CartScreen.css';
// We no longer import QuantityToggle

const CartScreen = () => {
  const { cartItems, cartTotal, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () =>{
    navigate('/checkout')
  }

  const handleRemoveFromCart = async (id, name) => {
    const success = await removeFromCart(id);
    if (success) {
      toast.error(`${name} removed from cart`);
    } else {
      toast.error(`Failed to remove ${name}`);
    }
  };

  // If cart is empty, return the centered message first.
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <Image
          src="/images/cart.jpeg"
          alt="Empty Cart"
          className="empty-cart-image"
        />
        <h2>Your cart is empty!</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Start Shopping
        </Button>
      </div>
    );
  }

  // If we get here, cart is NOT empty. Render the normal layout.
  return (
    <>
      <h1 className="mb-4">Shopping Cart</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className="cart-item-card">
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />
                  </Col>
                  <Col xs={5} md={3}>
                    <Link to={`/`} className="cart-item-name">
                      {item.name}
                    </Link>
                  </Col>
                  <Col xs={4} md={2} className="cart-item-price">
                    ${item.price}
                  </Col>

                  {/* --- THIS IS THE UPDATED BLOCK --- */}
                  <Col xs={7} md={3} className="d-flex justify-content-center">
                    {/* Quantity Toggle JSX is now inlined */}
                    <InputGroup className="cart-quantity-toggle">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="cart-toggle-btn"
                        onClick={() => {
                          if (item.qty > 1) { // Stop at 1
                            addToCart(item._id, item.qty - 1);
                          }
                        }}
                      >
                        <i className="fas fa-minus"></i>
                      </Button>
                      <InputGroup.Text className="cart-quantity-display">
                        { item.qty}
                      </InputGroup.Text>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="cart-toggle-btn"
                        onClick={() => {
                          if (item.qty < 10) { // Set a max limit of 10
                            addToCart(item._id, item.qty + 1);
                          }
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </Button>
                    </InputGroup>
                  </Col>
                  {/* --- END OF UPDATE --- */}

                  <Col xs={5} md={2} className="text-end">
                    <Button
                      type="button"
                      variant="link"
                      className="remove-btn p-0"
                      onClick={() => handleRemoveFromCart(item._id, item.name)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Summary Card */}
        <Col md={4}>
          <Card className="summary-card">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="summary-total-title">Order Summary</h2>
                <h3 className="summary-total-price my-3">
                  Total: ${cartTotal}
                </h3>
                <p className="text-muted mb-0">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="primary"
                  className="w-100 p-2"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
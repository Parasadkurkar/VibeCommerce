

import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import './LoginScreen.css'; 

const LoginScreen = () => {
  const submitHandler = (e) => {
    e.preventDefault();
   
    console.log('Login attempt');
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h1 className="text-center login-title">Sign In</h1>
        <Form onSubmit={submitHandler}>
          
          <Form.Floating className="mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="name@example.com"
              required
            />
            <Form.Label htmlFor="email">Email Address</Form.Label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <Form.Label htmlFor="password">Password</Form.Label>
          </Form.Floating>

          <Button
            type="submit"
            variant="primary"
            className="w-100 p-2 fs-5 mt-2"
          >
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            New Customer?{' '}
            <Link to="/register" className="signup-link">
              Register Here
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginScreen;
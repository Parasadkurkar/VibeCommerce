// in frontend/src/screens/LoginScreen.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import './LoginScreen.css'; // Import the new CSS

const LoginScreen = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    // No login logic for now
    console.log('Login attempt');
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h1 className="text-center login-title">Sign In</h1>
        <Form onSubmit={submitHandler}>
          {/* Email: Using floating labels */}
          <Form.Floating className="mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="name@example.com"
              required
            />
            <Form.Label htmlFor="email">Email Address</Form.Label>
          </Form.Floating>

          {/* Password: Using floating labels */}
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <Form.Label htmlFor="password">Password</Form.Label>
          </Form.Floating>

          {/* Submit Button: Matches our primary theme */}
          <Button
            type="submit"
            variant="primary"
            className="w-100 p-2 fs-5 mt-2"
          >
            Sign In
          </Button>
        </Form>

        {/* Link to Register Page */}
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
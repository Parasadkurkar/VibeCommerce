// in frontend/src/components/HeaderNavbar.js

import React from 'react';
import { Navbar, Nav, Container,Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './HeaderNavbar.css'; // We'll need to install this!
import { useCart } from '../context/CartContext';


const HeaderNavbar = () => {
  const { itemCount } = useCart(); // <-- 3. GET ITEM COUNT

  return (
    <header>
      {/* 2. UPDATE THE NAVBAR PROPS */}
      <Navbar
        variant="light"
        expand="lg"
        collapseOnSelect
        sticky="top" /* Makes it stick to the top on scroll */
        className="navbar-light  absolute" /* Our new custom class */
      >
        <Container>
          {/* 3. UPDATE THE BRAND */}
          <LinkContainer to="/">
              <Navbar.Brand className="navbar-brand-custom d-flex align-items-center">
                <img
                  src="/images/logo1.png" // ✅ Path to your logo
                  alt="Vibe Commerce Logo"
                  width="30"
                  height="30"
                  className="me-2 rounded" // Bootstrap margin-end for spacing
                />
                Vibe Commerce
              </Navbar.Brand>
            </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {/* 4. UPDATE THE NAV LINKS */}
              <LinkContainer to="/cart">
                <Nav.Link className="nav-link-custom">
                  <i className="fas fa-shopping-cart me-1"></i> Cart
                  {itemCount > 0 && (
                    <Badge
                      pill
                      bg="primary" /* Changed to primary blue */
                      className="ms-1"
                    >
                      {itemCount}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link className="nav-link-custom ms-2">
                  <i className="fas fa-user me-1"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderNavbar;


import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./HeaderNavbar.css"; 
import { useCart } from "../context/CartContext";

const HeaderNavbar = () => {
  const { itemCount } = useCart(); 

  return (
    <header>
     
      <Navbar
        variant="light"
        expand="lg"
        collapseOnSelect
        sticky="top"
       
        className="navbar-light" 
      >
        <Container>
          {/* 3. UPDATE THE BRAND */}
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand-custom d-flex align-items-center">
              <img
                src="/images/logo1.png" 
                alt="Vibe Commerce Logo"
                width="30"
                height="30"
                className="me-2 rounded" 
              />
              Vibe Commerce
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              
              <LinkContainer to="/cart">
                <Nav.Link className="nav-link-custom">
                  <i className="fas fa-shopping-cart me-1"></i> Cart
                  {itemCount > 0 && (
                    <Badge
                      pill
                      bg="primary" 
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


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import HeaderNavbar from './components/HeaderNavbar';
import HomeScreen from './screens/HomeScreen'
import CartScreen from './screens/CartScreen';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import CheckoutScreen from './screens/CheckoutScreen';
import LoginScreen from './screens/LoginScreen';


function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster position="bottom-right" />
        <HeaderNavbar />
      <main className="py-3">
        <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/login" element={<LoginScreen />} />
            </Routes>
        </Container>
      </main>
    </Router>
    </CartProvider>
  );
}

export default App;

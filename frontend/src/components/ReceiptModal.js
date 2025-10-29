

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ReceiptModal = ({ show, onHide, receipt }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onHide();

    navigate('/');
  };

  if (!receipt) {
    return null; 
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Confirmed!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center p-4">
        <i className="fas fa-check-circle fa-4x text-success mb-3"></i>
        <h4>Thank you for your purchase!</h4>
        <p>Your order has been placed successfully.</p>
        
        <div className="bg-light p-3 rounded mt-4">
          <p className="mb-1"><strong>Receipt ID:</strong> {receipt.receiptId}</p>
          <p className="mb-0"><strong>Total Paid:</strong> ${receipt.total}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Continue Shopping
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
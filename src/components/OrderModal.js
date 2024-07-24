import React, { useState } from 'react';
import Modal from 'react-modal';
import './OrderModal.css';

Modal.setAppElement('#root');

function OrderModal({ isOpen, onRequestClose, item, placeOrder }) {
  const [quantity, setQuantity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pinCode, setPinCode] = useState('');

  const handleOrder = () => {
    if (quantity && phoneNumber && pinCode) {
      placeOrder({ ...item, quantity: parseInt(quantity, 10), phoneNumber, pinCode });
      onRequestClose();
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Order Modal"
      className="order-modal"
      overlayClassName="order-modal-overlay"
    >
      <button className="close-button" onClick={onRequestClose}>X</button> {/* Add this line */}
      <div className='prdct'>
        <h2> {item.productName}</h2>
      </div>
      <form className="order-form">
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Pin Code:
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
          />
        </label>
        <button type="button" onClick={handleOrder}>Place Order</button>
      </form>
    </Modal>
  );
}

export default OrderModal;

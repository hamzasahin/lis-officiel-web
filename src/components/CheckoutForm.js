import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CheckoutForm = ({ cartItems, total, handlePlaceOrder }) => {
  const history = useHistory();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const order = {
      orderNumber: Math.floor(Math.random() * 1000000),
      orderDate: new Date().toLocaleDateString(),
      items: cartItems,
      total: total
    };

    handlePlaceOrder(order);

    history.push('/order-confirmation');
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <textarea id="shippingAddress" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="total">Total:</label>
          <span>${total.toFixed(2)}</span>
        </div>
        <button type="submit" className="btn-primary">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;

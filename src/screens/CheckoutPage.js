import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import CartSummary from '../components/CartSummary';

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-form-container">
        <h2>Billing Information</h2>
        <CheckoutForm />
      </div>
      <div className="cart-summary-container">
        <CartSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;

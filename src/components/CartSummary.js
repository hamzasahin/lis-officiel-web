import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ items }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>
      
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="free-shipping">Free</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="summary-row">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {items.length > 0 ? (
        <Link to="/checkout" className="checkout-button">
          Proceed to Checkout
        </Link>
      ) : (
        <p className="empty-cart-message">Your cart is empty</p>
      )}
      
      <div className="shipping-note">
        {subtotal < 100 && (
          <p>Add ${(100 - subtotal).toFixed(2)} more to get free shipping!</p>
        )}
      </div>
    </div>
  );
};

export default CartSummary;

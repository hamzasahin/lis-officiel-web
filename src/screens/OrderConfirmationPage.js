import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  const orderId = location.state?.orderId;

  if (!orderDetails || !orderId) {
    return <Navigate to="/" replace />;
  }

  const { items, shipping } = orderDetails;
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal >= 1000 ? 0 : 25;
  const tax = subtotal * 0.08;

  return (
    <div className="order-confirmation">
      <div className="confirmation-content">
        <div className="confirmation-header">
          <div className="check-mark">✓</div>
          <h1>Thank You for Your Order!</h1>
          <p className="order-id">Order #{orderId}</p>
        </div>

        <div className="confirmation-details">
          <div className="detail-section">
            <h2>Order Summary</h2>
            <div className="items-list">
              {items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">Quantity: {item.quantity}</span>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${(subtotal + shippingCost + tax).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h2>Shipping Information</h2>
            <div className="shipping-details">
              <p>
                {shipping.firstName} {shipping.lastName}<br />
                {shipping.street}<br />
                {shipping.city}, {shipping.state} {shipping.postalCode}<br />
                {shipping.country}
              </p>
            </div>
          </div>

          <div className="detail-section">
            <h2>What's Next?</h2>
            <div className="next-steps">
              <p>
                We'll send you a confirmation email with your order details and tracking
                information once your package ships. You can also view your order status
                anytime in your account.
              </p>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
          <Link to="/account/orders" className="view-order">
            View Order Status
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

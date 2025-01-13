import React from 'react';

import OrderItem from './OrderItem';

const OrderDetails = ({ order }) => {
  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <div className="order-info">
        <div>
          <span>Order Number:</span>
          <span>{order.orderNumber}</span>
        </div>
        <div>
          <span>Order Date:</span>
          <span>{order.orderDate}</span>
        </div>
        <div>
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="order-items">
        {order.items.map(item => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;

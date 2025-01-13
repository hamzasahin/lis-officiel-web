import React from 'react';

const OrderItem = ({ item }) => {
  return (
    <div className="order-item">
      <div className="order-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="order-item-info">
        <h3>{item.name}</h3>
        <span className="order-item-price">${item.price.toFixed(2)}</span>
        <div className="order-item-quantity">
          <span>Quantity:</span>
          <span>{item.quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

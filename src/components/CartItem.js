import React from 'react';

const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-info">
        <h3>{item.name}</h3>
        <span className="cart-item-price">${item.price.toFixed(2)}</span>
        <div className="cart-item-quantity">
          <span>Quantity:</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item, e.target.value)}
          />
        </div>
        <button className="btn-secondary" onClick={() => handleRemoveItem(item)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;

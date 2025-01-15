import React from 'react';
import './CartItem.css';

const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-info">
        <div className="cart-item-header">
          <h3>{item.name}</h3>
          <span className="cart-item-price">${item.price.toFixed(2)}</span>
        </div>
        <div className="cart-item-controls">
          <div className="quantity-control">
            <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
            <div className="quantity-input-group">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(item, Math.max(1, item.quantity - 1))}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <input
                id={`quantity-${item.id}`}
                type="number"
                min="1"
                max="10"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item, e.target.value)}
                className="quantity-input"
              />
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(item, Math.min(10, item.quantity + 1))}
                disabled={item.quantity >= 10 || item.quantity >= item.stockQuantity}
              >
                +
              </button>
            </div>
          </div>
          <button 
            className="remove-btn"
            onClick={() => handleRemoveItem(item)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

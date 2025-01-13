import React from 'react';

const WishlistItem = ({ item, handleRemoveItem }) => {
  return (
    <div className="wishlist-item">
      <div className="wishlist-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="wishlist-item-info">
        <h3>{item.name}</h3>
        <span className="wishlist-item-price">${item.price.toFixed(2)}</span>
        <button className="btn-secondary" onClick={() => handleRemoveItem(item)}>Remove</button>
      </div>
    </div>
  );
};

export default WishlistItem;

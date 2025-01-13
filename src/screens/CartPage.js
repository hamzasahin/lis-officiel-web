import React from 'react';
import CartSummary from '../components/CartSummary';
import CartItem from '../components/CartItem';

const CartPage = () => {
  const items = [
    {
      id: 1,
      name: 'Gold Plated Necklace',
      image: 'https://via.placeholder.com/300x300',
      price: 49.99,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Crystal Bracelet',
      image: 'https://via.placeholder.com/300x300',
      price: 29.99,
      quantity: 2,
    },
  ];

  return (
    <div className="cart-page">
      <div className="cart-items-container">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
};

export default CartPage;

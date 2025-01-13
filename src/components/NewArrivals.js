import React from 'react';
import ProductCard from './ProductCard';

const NewArrivals = () => {
  const products = [
    {
      id: 4,
      name: 'Pearl Drop Earrings',
      image: 'https://via.placeholder.com/300x300',
      price: 39.99,
      rating: 4.6,
      numReviews: 8,
    },
    {
      id: 5,
      name: 'Crystal & Silver Ring',
      image: 'https://via.placeholder.com/300x300',
      price: 79.99,
      rating: 4.9,
      numReviews: 12,
    },
    {
      id: 6,
      name: 'Gold Plated Chain Bracelet',
      image: 'https://via.placeholder.com/300x300',
      price: 59.99,
      rating: 4.7,
      numReviews: 6
    }
  ];

  return (
    <div className="new-arrivals">
      <h2>New Arrivals</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;

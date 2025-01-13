import React from 'react';
import { Link } from 'react-router-dom';
import './NewArrivals.css';

const NewArrivals = () => {
  const newProducts = [
    {
      id: 1,
      name: 'Sapphire Dreams Ring',
      price: '$2,499',
      image: '/images/products/sapphire-ring.jpg'
    },
    {
      id: 2,
      name: 'Diamond Tennis Bracelet',
      price: '$3,999',
      image: '/images/products/tennis-bracelet.jpg'
    },
    {
      id: 3,
      name: 'Pearl Cluster Earrings',
      price: '$1,299',
      image: '/images/products/pearl-earrings.jpg'
    }
  ];

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-main">New</span>
          <span className="title-accent">Arrivals</span>
        </h2>
        <p className="section-description">
          Be the first to discover our latest additions
        </p>
      </div>

      <div className="products-grid">
        {newProducts.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <span className="product-price">{product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;

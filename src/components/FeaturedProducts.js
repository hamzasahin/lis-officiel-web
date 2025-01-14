import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Diamond Eternity Ring',
      description: 'Classic elegance meets modern design',
      price: '$1,299',
      image: require('../assets/images/image1.jpg')
    },
    {
      id: 2,
      name: 'Pearl Drop Earrings',
      description: 'Timeless beauty for any occasion',
      price: '$899',
      image: require('../assets/images/image4.jpg')
    },
    {
      id: 3,
      name: 'Gold Chain Necklace',
      description: 'Delicate craftsmanship in 18k gold',
      price: '$1,499',
      image: require('../assets/images/image5.jpg')
    }
  ];

  return (
    <section className="featured-products">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-main">Featured</span>
          <span className="title-accent">Collection</span>
        </h2>
        <p className="section-description">
          Discover our most sought-after pieces, each one a testament to our dedication to exceptional jewelry making
        </p>
      </div>

      <div className="products-grid">
        {featuredProducts.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <span className="product-price">{product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

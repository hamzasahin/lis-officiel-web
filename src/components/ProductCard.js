import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, showCollection = false }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
        {showCollection && (
          <div className="collection-badge">
            {product.collection}
          </div>
        )}
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        {showCollection && (
          <p className="product-description">
            {product.description}
          </p>
        )}
        <div className="product-meta">
          <span className="product-price">
            ${product.price.toFixed(2)}
          </span>
          <div className="product-rating">
            <span className="rating-stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="rating-count">
              ({product.numReviews} reviews)
            </span>
          </div>
        </div>
        <Link 
          to={`/products/${product.id}`} 
          className="view-details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

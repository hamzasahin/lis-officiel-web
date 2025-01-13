import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  return (
    <section className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <span className="product-price">${product.price.toFixed(2)}</span>
        <div className="product-rating">
          <span>{product.rating.toFixed(1)}</span>
          <i className="fas fa-star"></i>
          <span>{product.numReviews} reviews</span>
        </div>
        <p>{product.description}</p>
        <button>Add to Cart</button>
      </div>
    </section>
  );
};

export default ProductDetails;

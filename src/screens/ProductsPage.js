import React from 'react';
import './ProductsPage.css';

const ProductsPage = () => {
  return (
    <div className="products-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Our Collection</h1>
          <p className="page-subtitle">Discover our curated selection of timeless jewelry pieces</p>
        </header>
        
        <div className="products-grid">
          {/* Products will be mapped here */}
          <div className="product-placeholder">Products coming soon...</div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 
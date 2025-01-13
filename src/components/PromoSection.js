import React from 'react';
import { Link } from 'react-router-dom';

const PromoSection = () => {
  return (
    <section className="promo-section">
      <div className="promo-card">
        <h2>Summer Sale</h2>
        <p>Get 25% off your purchase with code SUMMER25</p>
        <Link to="/products" className="btn-secondary">Shop Now</Link>
      </div>
    </section>
  );
};

export default PromoSection;

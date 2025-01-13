import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Welcome to Lis Officiel</h1>
        <p>Shop our collection of high-quality, affordable jewelry inspired by French design.</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    </section>
  );
};

export default HeroSection;

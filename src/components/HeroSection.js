import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
  <div className="hero-content">
    <span className="collection-label">COLLECTION</span>
    <h1 className="hero-title">
      <span className="title-main">Eternal</span>
      <span className="title-accent">Lustre</span>
    </h1>
    <p className="hero-subtitle">
      Dive into a world of timeless beauty. From the ocean’s treasures to your most cherished moments, 
      our pearl collection captures elegance and grace like no other. These pieces are designed to 
      illuminate your every occasion.
    </p>
    <button className="hero-cta">
      <span>Discover the Collection</span>
      <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    </button>
  </div>
  <div className="hero-image">
    <img 
      src={require('../assets/images/image3.jpg')} 
      alt="Elegant pearl necklaces and earrings from the Eternal Lustre collection" 
      className="hero-img rounded-image"
    />
  </div>
</section>

  );
}

export default HeroSection;

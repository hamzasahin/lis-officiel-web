import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="collection-label">COLLECTION</span>
        <h1 className="hero-title">
          <span className="title-main">Modern</span>
          <span className="title-accent">Marvels</span>
        </h1>
        <p className="hero-subtitle">
          Our classic collection features pieces that have stood the test of time. 
          From elegant pearls to stunning solitaires, these are your go-to for sophistication.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;

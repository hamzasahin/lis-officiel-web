import React from 'react';
import './PromoSection.css';
import promoImage from '../assets/images/model2.jpg';

const PromoSection = ({ title, subtitle, description }) => {
  return (
    <section className="promo-section">
      <div className="promo-content">
        <h2 className="promo-title">{title}</h2>
        <h3 className="promo-subtitle">{subtitle}</h3>
        <p className="promo-description">{description}</p>
        <button className="promo-cta">Explore Collection</button>
      </div>
      <div className="promo-image">
        <img src={promoImage} alt="Timeless Elegance" />
      </div>
    </section>
  );
};

export default PromoSection;

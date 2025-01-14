import React from 'react';
import './Lookbook.css';

const Lookbook = ({ title, subtitle, description }) => {
  return (
    <section className="lookbook">
      <div className="lookbook-content">
        <h2 className="lookbook-title">{title || "Discover Our Collection"}</h2>
        <h3 className="lookbook-subtitle">{subtitle || "Elegance in Every Detail"}</h3>
        <p className="lookbook-description">{description || "Explore our latest collection of handcrafted jewelry pieces, designed to make every moment special."}</p>
        <button className="lookbook-cta">View Lookbook</button>
      </div>
      <div className="lookbook-grid">
        <div className="lookbook-image">
          <img src={require('../assets/images/model1.jpg')} alt="Elegant woman wearing jewelry" />
        </div>
        <div className="lookbook-image">
          <img src={require('../assets/images/model2.jpg')} alt="Close-up of necklace" />
        </div>
        <div className="lookbook-image">
          <img src={require('../assets/images/model3.jpg')} alt="Ring detail shot" />
        </div>
      </div>
    </section>
  );
};

export default Lookbook;

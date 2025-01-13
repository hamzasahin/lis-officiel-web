import React from 'react';
import './Lookbook.css';

const Lookbook = ({ title, subtitle, description }) => {
  return (
    <section className="lookbook">
      <div className="lookbook-content">
        <h2 className="lookbook-title">{title}</h2>
        <h3 className="lookbook-subtitle">{subtitle}</h3>
        <p className="lookbook-description">{description}</p>
        <button className="lookbook-cta">View Lookbook</button>
      </div>
      <div className="lookbook-grid">
        <div className="lookbook-image">
          <img src="/images/lookbook/look-1.jpg" alt="Elegant woman wearing jewelry" />
        </div>
        <div className="lookbook-image">
          <img src="/images/lookbook/look-2.jpg" alt="Close-up of necklace" />
        </div>
        <div className="lookbook-image">
          <img src="/images/lookbook/look-3.jpg" alt="Ring detail shot" />
        </div>
      </div>
    </section>
  );
};

export default Lookbook;

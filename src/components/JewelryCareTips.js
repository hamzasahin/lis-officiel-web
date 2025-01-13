import React from 'react';
import './JewelryCareTips.css';

const JewelryCareTips = () => {
  const careTips = [
    {
      id: 1,
      title: 'Storage',
      tip: 'Store each piece separately in a soft cloth pouch or lined jewelry box to prevent scratches.'
    },
    {
      id: 2,
      title: 'Cleaning',
      tip: 'Clean your jewelry regularly with a soft, lint-free cloth to maintain its shine and brilliance.'
    },
    {
      id: 3,
      title: 'Protection',
      tip: 'Remove jewelry before swimming, exercising, or applying beauty products.'
    }
  ];

  return (
    <section className="care-tips">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-main">Jewelry</span>
          <span className="title-accent">Care</span>
        </h2>
        <p className="section-description">
          Keep your pieces looking beautiful with these essential care tips
        </p>
      </div>

      <div className="tips-grid">
        {careTips.map(tip => (
          <div key={tip.id} className="tip-card">
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-text">{tip.tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JewelryCareTips;

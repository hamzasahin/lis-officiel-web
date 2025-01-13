import React from 'react';

const LookbookItem = ({ image, title, subtitle }) => {
  return (
    <div className="lookbook-item">
      <img src={image} alt={title} />
      <div className="lookbook-item-text">
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

export default LookbookItem;

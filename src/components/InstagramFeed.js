import React from 'react';

const InstagramFeed = () => {
  const images = [
    'https://via.placeholder.com/150x150',
    'https://via.placeholder.com/150x150',
    'https://via.placeholder.com/150x150',
    'https://via.placeholder.com/150x150',
    'https://via.placeholder.com/150x150',
    'https://via.placeholder.com/150x150',
  ];

  return (
    <section className="instagram-feed">
      <h2>Follow us on Instagram</h2>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`Instagram post ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;

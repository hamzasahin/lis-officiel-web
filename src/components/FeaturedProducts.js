import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Aurora Luxe Diamond Hoops',
      image: 'https://via.placeholder.com/400x400',
      price: 1249.00,
      rating: 4.8,
      numReviews: 42,
      description: '18k gold hoops graced with a trail of sparkling diamonds',
      materials: ['18k Gold', 'Diamonds'],
      collection: 'Modern Marvels'
    },
    {
      id: 2,
      name: 'Golden Embrace Hoops',
      image: 'https://via.placeholder.com/400x400',
      price: 899.00,
      rating: 4.7,
      numReviews: 35,
      description: 'Timeless elegance in a modern silhouette',
      materials: ['24k Gold Plated'],
      collection: 'Golden Classics'
    },
    {
      id: 3,
      name: 'Carnelian Solitaire Pendant',
      image: 'https://via.placeholder.com/400x400',
      price: 549.00,
      rating: 4.9,
      numReviews: 28,
      description: 'Vibrant carnelian stone set in delicate gold',
      materials: ['18k Gold', 'Carnelian'],
      collection: 'Color Stories'
    }
  ];

  return (
    <section className="featured-products">
      <div className="section-header">
        <h2 className="section-title">Modern Marvels Collection</h2>
        <p className="section-subtitle">
          Discover our curated selection of timeless pieces
        </p>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            showCollection={true}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

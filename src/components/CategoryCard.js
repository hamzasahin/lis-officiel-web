import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${category.slug}`}>
      <div className="category-card">
        <img src={category.image} alt={category.name} />
        <h3>{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;

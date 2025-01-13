import React from 'react';
import CategoryCard from './CategoryCard';

const Sidebar = ({ categories }) => {
  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

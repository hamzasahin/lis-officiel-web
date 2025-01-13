import React from 'react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="category-filter">
      <ul>
        {categories.map(category => (
          <li key={category.id} className={category.id === activeCategory ? 'active' : ''} onClick={() => setActiveCategory(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;

'use client';

import React from 'react';

interface CategoryFilterProps {
  categories: string[]; 
  selectedCategory: string | null; 
  onCategorySelect: (category: string | null) => void; 
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        <li
          className={`cursor-pointer ${
            selectedCategory === null
              ? 'text-blue-600 font-semibold'
              : 'text-gray-800 hover:text-blue-500'
          }`}
          onClick={() => onCategorySelect(null)}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer ${
              selectedCategory === category
                ? 'text-blue-600 font-semibold'
                : 'text-gray-800 hover:text-blue-500'
            }`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;

import React from 'react';

interface CategoryFilterProps {
  uniqueCategories: string[];
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  uniqueCategories,
  selectedCategory,
  setSelectedCategory,
  setActiveDropdown,
}) => {
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category); 
    setActiveDropdown(null); 
  };

  return (
    <div className="p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Select Category</h3>
      <ul>
        <li
          className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-lg"
          onClick={() => handleCategoryChange(null)} 
        >
          All Categories
        </li>
        {uniqueCategories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-lg ${
              selectedCategory === category ? 'bg-gray-300' : ''
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;

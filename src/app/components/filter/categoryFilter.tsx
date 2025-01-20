import React from 'react';

type SelectedFilter = {
  category: string | null;
  price: string | null;
  status: string | null;
};

interface CategoryFilterProps {
  uniqueCategories: string[];
  selectedCategory: string | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<SelectedFilter>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  uniqueCategories,
  selectedCategory,
  setSelectedFilter,
  setActiveDropdown,
}) => {
  return (
    <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-10">
      <li
        className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
        onClick={() => setSelectedFilter((prev) => ({ ...prev, category: null }))}
      >
        All Categories
      </li>
      {uniqueCategories.map((category) => (
        <li
          key={category}
          className={`cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700 ${selectedCategory === category ? 'font-bold' : ''}`}
          onClick={() => {
            setSelectedFilter((prev) => ({ ...prev, category }));
            setActiveDropdown(null);
          }}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
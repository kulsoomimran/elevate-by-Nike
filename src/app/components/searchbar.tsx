'use client';

import { useState } from 'react';
import { FiFilter } from 'react-icons/fi'; // Importing a filter icon
import CategoryFilter from './cateogoryfilter';

interface SearchBarProps {
  onSearch: (query: string) => void; // Callback to handle search input
  categories: string[]; // List of categories
  selectedCategory: string | null; // Selected category
  onCategorySelect: (category: string | null) => void; // Callback for category selection
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Pass the search query to the parent
  };

  const toggleCategoryModal = () => {
    setIsCategoryOpen((prev) => !prev); // Toggle category modal
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleInputChange}
        />
        <button
          onClick={toggleCategoryModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
          aria-label="Filter by category"
        >
          <FiFilter size={20} />
        </button>
      </div>

      {/* Category Modal/Dropdown */}
      {isCategoryOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-300 shadow-lg rounded-lg z-10">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={(category) => {
              onCategorySelect(category);
              setIsCategoryOpen(false); // Close the modal after selection
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;

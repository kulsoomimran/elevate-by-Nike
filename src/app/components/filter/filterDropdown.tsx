import { FiChevronDown, FiFilter } from 'react-icons/fi';
import React from 'react';
import CategoryFilter from './categoryFilter';
import PriceFilter from './priceFilter';
import StatusFilter from './statusFilter';

interface Filter {
  category: string | null;
  price: string | null;
  status: string | null;
}

interface DropdownProps {
  activeDropdown: string | null;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  selectedFilter: Filter; // Specify the type here
  setSelectedFilter: React.Dispatch<React.SetStateAction<Filter>>; // Specify the type here
  uniqueCategories: string[];
  uniqueStatuses: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  activeDropdown,
  setActiveDropdown,
  selectedFilter,
  setSelectedFilter,
  uniqueCategories,
  uniqueStatuses,
  setSelectedCategory,
}) => {
  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        onClick={() => setActiveDropdown((prev) => (prev === 'main' ? null : 'main'))}
      >
        <FiFilter className="text-xl" />
        <span className="font-semibold">Filters</span>
        <FiChevronDown
          className={`ml-2 transition-transform ${activeDropdown === 'main' ? 'rotate-180' : ''}`}
        />
      </button>
      {activeDropdown === 'main' && (
        <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-10 max-h-72 overflow-y-auto">
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-t-lg"
            onClick={() => setActiveDropdown((prev) => (prev === 'category' ? null : 'category'))}
          >
            Filter by Category
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
            onClick={() => setActiveDropdown((prev) => (prev === 'price' ? null : 'price'))}
          >
            Filter by Price
          </li>
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-b-lg"
            onClick={() => setActiveDropdown((prev) => (prev === 'status' ? null : 'status'))}
          >
            Filter by Status
          </li>
        </ul>
      )}

      {activeDropdown === 'category' && (
        <CategoryFilter
          uniqueCategories={uniqueCategories}
          selectedCategory={selectedFilter.category}
          setSelectedCategory={setSelectedCategory}
          setActiveDropdown={setActiveDropdown}
        />
      )}

      {activeDropdown === 'price' && (
        <PriceFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          setActiveDropdown={setActiveDropdown}
        />
      )}

      {activeDropdown === 'status' && (
        <StatusFilter
          uniqueStatuses={uniqueStatuses}
          setSelectedFilter={setSelectedFilter}
          setActiveDropdown={setActiveDropdown}
        />
      )}
    </div>
  );
};

export default Dropdown;

import React from 'react';

// Define the type for selectedFilter
type SelectedFilter = {
  price: string | null;
  category: string | null;
  status: string | null;
};

interface PriceFilterProps {
  selectedFilter: SelectedFilter;
  setSelectedFilter: React.Dispatch<React.SetStateAction<SelectedFilter>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  selectedFilter,
  setSelectedFilter,
  setActiveDropdown,
}) => {
  return (
    <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-10">
      <li
        className={`cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700 ${selectedFilter.price === 'low-to-high' ? 'font-bold' : ''}`}
        onClick={() => {
          setSelectedFilter((prev) => ({ ...prev, price: 'low-to-high' }));
          setActiveDropdown(null);
        }}
      >
        Low to High
      </li>
      <li
        className={`cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700 ${selectedFilter.price === 'high-to-low' ? 'font-bold' : ''}`}
        onClick={() => {
          setSelectedFilter((prev) => ({ ...prev, price: 'high-to-low' }));
          setActiveDropdown(null);
        }}
      >
        High to Low
      </li>
    </ul>
  );
};

export default PriceFilter;
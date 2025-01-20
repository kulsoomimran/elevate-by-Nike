import React from 'react';

type SelectedFilter = {
  category: string | null;
  price: string | null;
  status: string | null;
};

interface StatusFilterProps {
  uniqueStatuses: string[];
  setSelectedFilter: React.Dispatch<React.SetStateAction<SelectedFilter>>;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  uniqueStatuses,
  setSelectedFilter,
  setActiveDropdown,
}) => {
  return (
    <ul className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md z-10">
      {uniqueStatuses.map((status) => (
        <li
          key={status}
          className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
          onClick={() => {
            setSelectedFilter((prev: SelectedFilter) => ({
              ...prev,
              status,
            }));
            setActiveDropdown(null);
          }}
        >
          {status}
        </li>
      ))}
    </ul>
  );
};

export default StatusFilter;
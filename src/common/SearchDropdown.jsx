import React, { useState } from 'react';

function SearchDropdown({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const categories = [
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
  ];

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Sending query:', searchQuery);
    if (searchQuery !== '') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="bottom-0 px-4 w-full md:px-0">
    <div className="flex justify-center w-full">
      <div className="flex items-center w-screen">
        {/* User Query Input */}
        <div className="w-full relative">
          <input
            type="search"
            className="w-full pr-10 py-2 text-sm text-gray-400 border rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-text-gray-400 dark:text-white"
            placeholder="Write a query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>


          {/* Programming Language Dropdown */}
          <div className="ml-3 mr-3">
            <select
              value={selectedOption}
              onChange={handleOptionSelect}
              className="block appearance-none bg-gray-700 border border-gray-600 hover:border-gray-500 px-3 py-2 rounded-md shadow-sm text-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300"
            >
              <option value="">Select a language</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;

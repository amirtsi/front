import React, { useState } from 'react';

const FlexTable = ({ data, columns }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterValues, setFilterValues] = useState({});

  const handleSort = (columnKey) => {
    if (columnKey === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (columnKey, value) => {
    setFilterValues({ ...filterValues, [columnKey]: value });
  };

  const filteredData = data.filter((row) =>
    columns.every((column) =>
      !filterValues[column.key] ||
      row[column.key].toLowerCase().includes(filterValues[column.key].toLowerCase())
    )
  );

  const sortedData = filteredData.slice().sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn].toLowerCase();
      const bValue = b[sortColumn].toLowerCase();
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`py-3.5 px-3 text-left text-sm font-semibold text-gray-900 ${column.className}`}
              >
                {column.label}
                {column.sortable && (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="ml-2 focus:outline-none"
                  >
                    {sortColumn === column.key ? (
                      sortOrder === 'asc' ? '↑' : '↓'
                    ) : (
                      <span className="hidden">Sort</span>
                    )}
                  </button>
                )}
                {column.filterable && (
                  <input
                    type="text"
                    value={filterValues[column.key] || ''}
                    onChange={(e) => handleFilterChange(column.key, e.target.value)}
                    placeholder={`Filter ${column.label.toLowerCase()}`}
                    className="mt-1 p-1 w-full text-sm rounded-md border border-gray-300"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`whitespace-nowrap py-4 px-3 text-sm text-gray-500 ${column.className}`}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlexTable;

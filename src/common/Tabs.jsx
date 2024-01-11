import React from 'react';

function Tabs({ tabs, activeTab, onTabChange }) {
  // Find the current active tab based on activeTab prop
  const currentActiveTab = tabs.find(tab => tab.name === activeTab);

  const handleTabClick = (tabName) => {
    // Invoke the onTabChange function passed as a prop
    onTabChange(tabName);
  };

  return (
    <div>
      <div className="hidden sm:block">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                ${tab.name === activeTab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
              `}
              aria-current={tab.name === activeTab ? 'page' : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-8">
        {/* Render the content of the current active tab */}
        {currentActiveTab && currentActiveTab.content}
      </div>
    </div>
  );
}

export default Tabs;

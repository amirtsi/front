import React from 'react';
import NavBar from '../NavBar/NavBar';
import SideNavBar from '../NavBar/SideNavBar';

export default function DashBoard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Side Navigation Bar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <SideNavBar />
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {/* Your dashboard content goes here */}
          <div className="py-6 px-4">
            {/* Your dashboard content */}
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            {/* ... other components and content */}
          </div>
        </main>
      </div>
    </div>
  );
}

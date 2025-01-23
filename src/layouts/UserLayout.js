import React from 'react';
import { Outlet } from 'react-router-dom';

// components
import Dashboard from '../components/Sidebar/usersDashboard';

export default function UserLayout() {
  return (
    <>
      <div className="flex">
        <Dashboard />
        <div className="flex-1 bg-gray-800">
          {/* Header */}
          <div className="ml-8 text-center text-white">
            {/* Render nested routes */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

import React from 'react';
import { Outlet } from 'react-router-dom';

// components
import Dashboard from '../components/Sidebar/usersDashboard';

export default function UserLayout() {
  return (
    <>
      <div className="flex bg-eco-background min-h-[calc(100vh-80px)]">
        <Dashboard />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

import React from 'react';
import { Outlet } from 'react-router-dom';

// components
import Dashboard from '../components/Sidebar/usersDashboard';

export default function UserLayout() {
  return (
    <>
      <div className="flex flex-col lg:flex-row bg-eco-background min-h-[calc(100vh-80px)]">
        <Dashboard />
        <main className="flex-1 w-full p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
}

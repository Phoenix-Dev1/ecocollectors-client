import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex bg-slate-100 min-h-screen antialiased text-slate-300 w-64">
      <div className="flex">
        <aside className="bg-gray-900 w-64 p-6  flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-white">
            <Link to="/user/welcome">
              Eco-<span className="text-blue-500">Dashboard</span>{' '}
            </Link>
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Manage your actions & activities
          </p>
          <p className="text-white">Welcome back,</p>
          <div className="flex items-center mt-1">
            <span className="text-base md:text-lg text-white font-bold block py-2 px-4">
              {currentUser.first_name} {currentUser.last_name}
            </span>
          </div>
          <nav className="mt-4">
            <div className="block py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 flex items-center mb-2">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <span className="text-lg font-bold leading-5 text-white">
                  <Link to="/user/request-status">Requests Status</Link>
                </span>
                <span className="text-sm text-white/50 hidden md:block hover:bg-white/5 transition ease-linear duration-150">
                  <Link to="/user/pending-requests">Pending</Link>
                </span>
                <span className="text-sm text-white/50 hidden md:block hover:bg-white/5 transition ease-linear duration-150">
                  <Link to="/user/completed-requests">Completed</Link>
                </span>
                <span className="text-sm text-white/50 hidden md:block hover:bg-white/5 transition ease-linear duration-150">
                  <Link to="/user/cancelled-requests">Cancelled</Link>
                </span>
              </div>
            </div>
            <div className="block py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 flex items-center mb-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <span className="text-lg font-bold leading-5 text-white">
                  Manage Account
                </span>
                <span className="text-sm text-white/50 hidden md:block hover:bg-white/5 transition ease-linear duration-150">
                  <Link to="/user/update-user-info">Personal Info</Link>
                </span>
                <span className="text-sm text-white/50 hidden md:block hover:bg-white/5 transition ease-linear duration-150">
                  <Link to="/user/change-password">Change Password</Link>
                </span>
              </div>
            </div>
            <div className="block py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 flex items-center mb-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <span className="text-lg font-bold leading-5 text-white">
                  Reports
                </span>
                <span className="text-sm text-white/50 hidden md:block">
                  Manage Your Reports
                </span>
              </div>
            </div>
            <div className="block py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 flex items-center">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>
              </div>
              <div className="ml-2">
                <span className="text-lg font-bold leading-5 text-white">
                  Settings
                </span>
                <span className="text-sm text-white/50 hidden md:block">
                  Edit App Settings
                </span>
              </div>
            </div>
          </nav>
          <footer className="mt-auto ml-auto mr-auto"></footer>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;

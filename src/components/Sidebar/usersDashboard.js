import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch the user's role from the jwt(using Node method)
    axios
      .get('/user/role')
      .then((response) => {
        setUserRole(response.data.role);
      })
      .catch((error) => {
        console.log('Role undefined - Contact support');
      });
  }, []);

  const handleWelcome = () => {
    if (currentUser.role === 1) return '/user/welcomeAdmin';
    else if (currentUser.role === 2 || currentUser.role === 5)
      return '/user/welcomeUser';
    else if (currentUser.role === 3) return '/user/welcomeRecycler';
    else if (currentUser.role === 4) return '/user/welcomeManager';
    else return '/';
  };

  if (!currentUser) {
    // Handle the case where currentUser is null or not yet loaded
    return <p>Loading...</p>;
  }

  return (
    <div className="flex bg-slate-100 min-h-screen antialiased text-slate-300">
      <div className="flex">
        <aside className="bg-gray-900 w-64 p-6  flex flex-col justify-between">
          <h1 className="text-3xl font-semibold text-white">
            <Link to={handleWelcome()}>
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
            {userRole === 1 && (
              <div className="py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 mb-2">
                <div className="flex items-center">
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
                      Admin Panel
                    </span>
                  </div>
                </div>
                <ul className="md:flex md:flex-col md:ml-6">
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/admin/user-management">User Management</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/admin/requests">Recycle Requests</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/admin/join-requests">Join Requests</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/admin/bins">Recycle Bins</Link>
                  </li>
                </ul>
              </div>
            )}

            {(userRole === 2 || userRole === 5) && (
              <div className="py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 mb-2">
                <div className="flex items-center">
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
                      Requests Status
                    </span>
                  </div>
                </div>
                <ul className="md:flex md:flex-col md:ml-6">
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/user/pending-requests">Pending</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/user/completed-requests">Completed</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/user/cancelled-requests">Cancelled</Link>
                  </li>
                </ul>
              </div>
            )}

            {userRole === 3 && (
              <div className="py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 mb-2">
                <div className="flex items-center">
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
                      Recycler Panel
                    </span>
                  </div>
                </div>
                <ul className="md:flex md:flex-col md:ml-6">
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/recycler/regional-requests">
                      Regional Requests
                    </Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/recycler/accepted-requests">
                      Accepted Requests
                    </Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/recycler/completed-requests">
                      Completed Requests
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {userRole === 4 && (
              <div className="py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 mb-2">
                <div className="flex items-center">
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
                      Manager Panel
                    </span>
                  </div>
                </div>
                <ul className="md:flex md:flex-col md:ml-6">
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/manager/join-requests">Join Requests</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/manager/recyclers-management">
                      Recyclers Management
                    </Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/manager/regional-requests">
                      Regional Requests
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {userRole !== 1 &&
              userRole !== 2 &&
              userRole !== 3 &&
              userRole !== 4 &&
              userRole !== 5 && (
                <div>
                  <p> Role undefined - Contact support </p>
                </div>
              )}

            {userRole !== 2 && userRole !== 5 && (
              <div className="py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 mb-2">
                <div className="flex items-center">
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
                      Requests Status
                    </span>
                  </div>
                </div>
                <ul className="md:flex md:flex-col md:ml-6">
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/user/pending-requests">Pending</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/user/completed-requests">Completed</Link>
                  </li>
                  <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                    <Link to="/user/cancelled-requests">Cancelled</Link>
                  </li>
                </ul>
              </div>
            )}

            <div className="py-2 px-4 rounded text-white text-lg hover:bg-white/5 transition ease-linear duration-150 mb-4">
              <div className="flex items-center">
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
                </div>
              </div>
              <ul className="md:flex md:flex-col md:ml-6">
                <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                  <Link to="/user/update-user-info">Personal Info</Link>
                </li>
                <li className="text-sm text-white/50 hover:bg-white/5 transition ease-linear duration-150">
                  <Link to="/user/change-password">Change Password</Link>
                </li>
              </ul>
            </div>
          </nav>
          <footer className="mt-auto ml-auto mr-auto"></footer>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;

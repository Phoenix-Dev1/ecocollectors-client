import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");

  //console.log(currentUser);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/user/role`,
          { withCredentials: true } // ✅ Ensures authentication
        );
        setUserRole(response.data.role);
      } catch (error) {
        console.error(
          "Error fetching user role:",
          error.response?.data || error.message || "Unknown error"
        );
      }
    };

    fetchUserRole();
  }, []);

  const handleWelcome = () => {
    if (currentUser.role === 1) return "/user/welcomeAdmin";
    else if (currentUser.role === 2 || currentUser.role === 5)
      return "/user/welcomeUser";
    else if (currentUser.role === 3) return "/user/welcomeRecycler";
    else if (currentUser.role === 4) return "/user/welcomeManager";
    else return "/";
  };

  if (!currentUser) {
    // Handle the case where currentUser is null or not yet loaded
    return <p>Loading...</p>;
  }

  return (
    <div className="flex bg-eco-background min-h-screen antialiased">
      <aside className="w-80 bg-white border-r border-gray-100 p-8 flex flex-col shadow-sm transition-all duration-300">
        <div className="mb-10">
          <Link to={handleWelcome()} className="group">
            <h1 className="text-2xl font-bold text-eco-text group-hover:text-eco-primary transition-colors">
              Eco<span className="text-eco-primary">Dashboard</span>
            </h1>
          </Link>
          <p className="text-eco-muted text-sm mt-1">Manage your actions & activities</p>
        </div>

        <div className="mb-10 p-5 bg-eco-background rounded-3xl border border-gray-100">
          <p className="text-eco-muted text-xs uppercase tracking-wider font-bold mb-2">Welcome back</p>
          <span className="text-lg font-bold text-eco-text">
            {currentUser.first_name} {currentUser.last_name}
          </span>
        </div>

        <nav className="flex-1 space-y-8 overflow-y-auto">
          {userRole === 1 && (
            <div className="space-y-3">
              <h3 className="flex items-center text-xs font-bold text-eco-muted uppercase tracking-widest px-4">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Admin Panel
              </h3>
              <ul className="space-y-1">
                {[
                  { label: "User Management", path: "/admin/user-management" },
                  { label: "Recycle Requests", path: "/admin/requests" },
                  { label: "Join Requests", path: "/admin/join-requests" },
                  { label: "Recycle Bins", path: "/admin/bins" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-eco-background hover:text-eco-primary transition-all">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* User Requests Section */}
          <div className="space-y-3">
            <h3 className="flex items-center text-xs font-bold text-eco-muted uppercase tracking-widest px-4">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Request Status
            </h3>
            <ul className="space-y-1">
              {[
                { label: "Pending", path: "/user/pending-requests" },
                { label: "Completed", path: "/user/completed-requests" },
                { label: "Cancelled", path: "/user/cancelled-requests" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-eco-background hover:text-eco-primary transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Recycler Panel */}
          {userRole === 3 && (
            <div className="space-y-3">
              <h3 className="flex items-center text-xs font-bold text-eco-muted uppercase tracking-widest px-4">
                Recycler Panel
              </h3>
              <ul className="space-y-1">
                {[
                  { label: "Regional Requests", path: "/recycler/regional-requests" },
                  { label: "Accepted Requests", path: "/recycler/accepted-requests" },
                  { label: "Completed Requests", path: "/recycler/completed-requests" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-eco-background hover:text-eco-primary transition-all">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Manager Panel */}
          {userRole === 4 && (
            <div className="space-y-3">
              <h3 className="flex items-center text-xs font-bold text-eco-muted uppercase tracking-widest px-4">
                Manager Panel
              </h3>
              <ul className="space-y-1">
                {[
                  { label: "Join Requests", path: "/manager/join-requests" },
                  { label: "Recyclers Management", path: "/manager/recyclers-management" },
                  { label: "Regional Requests", path: "/manager/regional-requests" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-eco-background hover:text-eco-primary transition-all">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Account Management */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
             <h3 className="flex items-center text-xs font-bold text-eco-muted uppercase tracking-widest px-4">
                Account
              </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/user/update-user-info" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-eco-background hover:text-eco-primary transition-all">
                  Personal Info
                </Link>
              </li>
              <li>
                <Link to="/user/change-password" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 rounded-xl hover:bg-eco-background hover:text-eco-primary transition-all">
                  Change Password
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-auto pt-6">
           <button 
             onClick={() => window.alert("EcoCollectors v2.0 - Active Support")}
             className="w-full py-3 px-4 text-xs font-bold text-eco-muted hover:text-eco-primary border border-gray-100 rounded-2xl hover:bg-eco-background transition-all"
           >
             Need Help?
           </button>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;

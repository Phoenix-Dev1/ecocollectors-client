import React, { useContext, useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { FiGrid, FiX, FiSettings, FiUser, FiBox, FiCheckCircle, FiClock, FiUsers, FiUserPlus, FiLayers, FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get("/user/role");
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        if (error.response?.status === 401) {
          logout();
        }
      }
    };
    fetchUserRole();
  }, [logout]);

  const handleWelcome = () => {
    if (currentUser.role === 1) return "/user/welcomeAdmin";
    else if (currentUser.role === 2 || currentUser.role === 5) return "/user/welcomeUser";
    else if (currentUser.role === 3) return "/user/welcomeRecycler";
    else if (currentUser.role === 4) return "/user/welcomeManager";
    else return "/";
  };

  if (!currentUser) return null;

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-24 left-4 z-50">
        <button 
          onClick={toggleMenu}
          className="p-3 bg-white shadow-xl rounded-2xl text-slate-800 border border-slate-100 hover:bg-slate-50 transition-all active:scale-95"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiGrid size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Aside */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-40
        h-full lg:h-screen w-80 
        bg-white/90 backdrop-blur-xl border-r border-slate-100 
        flex flex-col shadow-2xl lg:shadow-none
        transition-transform duration-500 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-8 pt-28 lg:pt-8 flex flex-col h-full">
          {/* Logo Section - Hidden on mobile to avoid overlap with toggle */}
          <div className="mb-10 pt-4 lg:pt-0 hidden lg:block">
            <Link to={handleWelcome()} className="group inline-block" onClick={() => setIsMobileMenuOpen(false)}>
              <h1 className="text-2xl font-black text-slate-800 tracking-tighter transition-all group-hover:scale-105">
                Eco<span className="text-emerald-500">Collectors</span>
              </h1>
              <div className="h-1 w-12 bg-emerald-500 rounded-full mt-1 transition-all group-hover:w-full"></div>
            </Link>
          </div>

          {/* User Profile Summary */}
          <div className="mb-10 p-5 glass !bg-slate-50/50 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg">
                {currentUser.first_name?.[0]}{currentUser.last_name?.[0]}
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest leading-none mb-1">Authenticated</p>
                <span className="text-sm font-black text-slate-800 truncate block max-w-[140px]">
                  {currentUser.first_name} {currentUser.last_name}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            {/* Admin Panel */}
            {userRole === 1 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Management Console</h3>
                <ul className="space-y-2">
                  {[
                    { label: "User Management", path: "/admin/user-management", icon: <FiUsers /> },
                    { label: "Recycle Requests", path: "/admin/requests", icon: <FiLayers /> },
                    { label: "Join Requests", path: "/admin/join-requests", icon: <FiUserPlus /> },
                    { label: "Recycle Bins", path: "/admin/bins", icon: <FiTrash2 /> },
                  ].map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl"
                      >
                        <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Request Status */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Activity Monitor</h3>
              <ul className="space-y-2">
                {[
                  { label: "Pending", path: "/user/pending-requests", icon: <FiClock /> },
                  { label: "Completed", path: "/user/completed-requests", icon: <FiCheckCircle /> },
                  { label: "Cancelled", path: "/user/cancelled-requests", icon: <FiX /> },
                ].map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl"
                    >
                      <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Manager Panel */}
            {userRole === 4 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Regional Manager</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Join Requests", path: "/manager/join-requests", icon: <FiUserPlus /> },
                    { label: "Recyclers", path: "/manager/recyclers-management", icon: <FiUsers /> },
                    { label: "Regional Feed", path: "/manager/regional-requests", icon: <FiLayers /> },
                  ].map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl"
                      >
                        <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recycler Panel */}
            {userRole === 3 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Recycler Tools</h3>
                <ul className="space-y-2">
                  {[
                    { label: "Open Feed", path: "/recycler/regional-requests", icon: <FiLayers /> },
                    { label: "My Pickups", path: "/recycler/accepted-requests", icon: <FiBox /> },
                    { label: "History", path: "/recycler/completed-requests", icon: <FiCheckCircle /> },
                  ].map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-300 group shadow-sm hover:shadow-xl"
                      >
                        <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Account Management */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Settings</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/user/update-user-info" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 rounded-2xl hover:bg-slate-100 transition-all group"
                  >
                    <FiUser className="text-lg" /> Personal Info
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/user/change-password" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 rounded-2xl hover:bg-slate-100 transition-all group"
                  >
                    <FiSettings className="text-lg" /> Security
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Footer Info */}
          <div className="mt-auto pt-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Version 2.0 Stable</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Dashboard;

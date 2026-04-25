import React, { useState, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import smallLogo from "../../img/sm-logo.png";
import { AuthContext } from '../../context/authContext';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';

const Navbar = () => {
  // Mobile Compatible Hook
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  React.useEffect(() => {
    if (nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [nav]);

  const handleNav = () => {
    setNav(!nav);
  };

  // Mobile
  const closeNav = () => {
    setNav(false);
  };

  // Show user name
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const loggedOut = await logout();
    if (loggedOut) {
      navigate('/'); // Redirect to the home page
    }
  };

  const handleWelcome = () => {
    if (currentUser.role === 1) return '/user/welcomeAdmin';
    else if (currentUser.role === 2 || currentUser.role === 5)
      return '/user/welcomeUser';
    else if (currentUser.role === 3) return '/user/welcomeRecycler';
    else if (currentUser.role === 4) return '/user/welcomeManager';
    else return '/';
  };

  return (
    <nav className={`sticky top-0 left-0 right-0 glass px-6 h-20 flex justify-between items-center transition-all duration-300 ${nav ? 'z-[100000]' : 'z-[1000]'}`}>
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="w-10 h-10 bg-eco-primary rounded-xl flex items-center justify-center shadow-lg shadow-eco-primary/20 transition-transform duration-300 group-hover:scale-110">
          <img src={smallLogo} className="h-6 w-6" alt="Logo" />
        </div>
        <div className="hidden lg:flex items-center">
          <span className="text-2xl font-black tracking-tight text-eco-text">
            Eco<span className="text-eco-primary">Collectors</span>
          </span>
          <span className="ml-2 text-[11px] font-extrabold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200/60 shadow-sm tracking-wide select-none">
            2.0
          </span>
        </div>
      </Link>

      <ul className="hidden md:flex items-center space-x-8">
        <li className="group">
          <Link to="/" className="flex items-center space-x-1.5 hover:text-eco-primary transition-all duration-300 font-medium text-gray-700">
            <span>Home</span>
          </Link>
        </li>
        <li className="group">
          <Link to="/map" className="flex items-center space-x-1.5 hover:text-eco-primary transition-all duration-300 font-medium text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Interactive Map</span>
          </Link>
        </li>
        {currentUser && (
          <li className="group">
            <Link to={handleWelcome()} className="flex items-center space-x-1.5 hover:text-eco-primary transition-all duration-300 font-medium text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>
        )}
        {currentUser && (currentUser.role === 2 || currentUser.role === 5) && (
          <>
            <li className={`relative group py-2`}>
              <div 
                className="flex items-center cursor-pointer hover:text-eco-primary transition-colors font-medium text-gray-700"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span>Registrations</span>
                {dropdownOpen ? (
                  <ArrowUpIcon className="w-4 h-4 ml-1" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 ml-1" />
                )}
              </div>
              <div
                className={`absolute ${
                  dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                } top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-glass-lg border border-gray-100 py-3 transition-all duration-300 z-50`}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to="/join"
                  onClick={closeNav}
                  className="block px-5 py-2.5 text-gray-700 hover:bg-eco-background hover:text-eco-primary transition-all"
                >
                  Recycler Registration
                </Link>
                <Link
                  to="/manager-join"
                  onClick={closeNav}
                  className="block px-5 py-2.5 text-gray-700 hover:bg-eco-background hover:text-eco-primary transition-all"
                >
                  Manager Registration
                </Link>
              </div>
            </li>
            <li className="hover:text-eco-primary transition-colors font-medium text-gray-700">
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </>
        )}
        
        {currentUser ? (
          <div className="flex items-center space-x-6 ml-4 pl-6 border-l border-gray-200">
            <Link 
              to={handleWelcome()} 
              className="font-bold text-eco-secondary hover:text-eco-primary transition-colors"
            >
              {currentUser.first_name}
            </Link>
            <button
              className="text-gray-500 hover:text-red-500 transition-colors font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 ml-4 pl-6 border-l border-gray-200">
            <Link to="/login" className="font-medium hover:text-eco-primary transition-colors">Login</Link>
            <Link to="/register" className="btn-primary !py-2 !px-6">Join Now</Link>
          </div>
        )}
      </ul>

      {/* Mobile menu icon */}
      <div onClick={handleNav} className={`md:hidden cursor-pointer text-gray-800 ${nav ? 'hidden' : 'block'}`}>
        <AiOutlineMenu size={24} />
      </div>

      {/* Nuclear Mobile Menu Overlay Reset */}
      {nav && (
        <div className="fixed inset-0 z-[99999] w-screen h-[100dvh] bg-white flex flex-col overflow-hidden m-0 p-0 md:hidden">
          
          {/* 1. Header Area (Logo & Close Button) */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-eco-primary rounded-xl flex items-center justify-center shadow-lg shadow-eco-primary/20">
                <img src={smallLogo} className="h-6 w-6" alt="Logo" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-black tracking-tight text-eco-text">
                  Eco<span className="text-eco-primary">Collectors</span>
                </span>
                <span className="ml-2 text-[10px] font-extrabold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full border border-emerald-200/60 shadow-sm tracking-wide select-none">
                  2.0
                </span>
              </div>
            </div>
            <button 
              onClick={closeNav} 
              className="p-2 text-slate-500 hover:text-emerald-600 transition-colors"
            >
              <AiOutlineClose size={32} />
            </button>
          </div>

          {/* 2. Navigation Links Area */}
          <div className="flex-1 flex flex-col items-center justify-start pt-12 pb-6 px-6 gap-8 bg-white overflow-y-auto">
            <Link 
              to="/" 
              onClick={closeNav}
              className="text-2xl font-semibold text-slate-800 hover:text-emerald-500 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/map" 
              onClick={closeNav}
              className="text-2xl font-semibold text-slate-800 hover:text-emerald-500 transition-colors"
            >
              Interactive Map
            </Link>
            
            {currentUser && (
              <Link 
                to={handleWelcome()} 
                onClick={closeNav}
                className="text-2xl font-semibold text-slate-800 hover:text-emerald-500 transition-colors"
              >
                Dashboard
              </Link>
            )}
            
            {currentUser ? (
              <>
                <Link 
                  to={handleWelcome()} 
                  onClick={closeNav}
                  className="text-2xl font-semibold text-eco-secondary hover:text-emerald-500 transition-colors"
                >
                  {currentUser.first_name} {currentUser.last_name}
                </Link>
                <Link 
                  to="/contact-us" 
                  onClick={closeNav}
                  className="text-2xl font-semibold text-slate-800 hover:text-emerald-500 transition-colors"
                >
                  Contact Us
                </Link>
                <button
                  className="text-2xl font-semibold text-red-500 hover:text-red-600 transition-colors"
                  onClick={() => {
                    handleLogout();
                    closeNav();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={closeNav}
                  className="text-2xl font-semibold text-slate-800 hover:text-emerald-500 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  onClick={closeNav} 
                  className="mt-4 px-10 py-4 bg-emerald-500 text-white rounded-full font-semibold text-xl shadow-lg shadow-emerald-200 active:scale-95 transition-all text-center min-w-[200px]"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

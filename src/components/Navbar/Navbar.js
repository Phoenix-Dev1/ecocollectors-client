import React, { useState, useContext } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/logo-no-bg.png';
import { AuthContext } from '../../context/authContext';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';

const Navbar = () => {
  // Mobile Compatible Hook
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <nav className="sticky top-0 left-0 right-0 z-[1000] glass px-6 h-20 flex justify-between items-center transition-all duration-300">
      <Link to="/" className="flex items-center space-x-2">
        <img className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" src={Logo} alt="Eco Collectors" />
        <span className="hidden lg:block text-xl font-bold bg-gradient-to-r from-eco-secondary to-eco-primary bg-clip-text text-transparent">
          EcoCollectors
        </span>
      </Link>

      <ul className="hidden md:flex items-center space-x-6">
        <li className="hover:text-eco-primary transition-colors font-medium">
          <Link to="/">Home</Link>
        </li>
        {currentUser && (
          <>
            <li className={`relative group py-2`}>
              <div 
                className="flex items-center cursor-pointer hover:text-eco-primary transition-colors font-medium"
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
            <li className="hover:text-eco-primary transition-colors font-medium">
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </>
        )}
        
        {currentUser ? (
          <div className="flex items-center space-x-4 ml-4 pl-6 border-l border-gray-200">
             <Link
                to="/map"
                className="btn-primary flex items-center justify-center !py-2 !px-5"
              >
                Open Map
              </Link>
            <Link 
              to={handleWelcome()} 
              className="font-semibold text-eco-secondary hover:text-eco-primary transition-colors"
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
      <div onClick={handleNav} className="block md:hidden cursor-pointer text-gray-800">
        {!nav ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={24} />}
      </div>

      {/* Mobile menu */}
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[75%] h-full bg-white shadow-2xl transition-transform duration-500 ease-in-out z-[2000] p-6'
            : 'fixed left-[-100%] top-0 h-full transition-all duration-500 z-[2000]'
        }
      >
        <div className="flex items-center mb-10">
           <img className="h-10 w-auto" src={Logo} alt="Eco Collectors" />
           <span className="ml-2 text-xl font-bold text-eco-primary">EcoCollectors</span>
        </div>
        
        <ul className="space-y-6">
          <li className="text-lg font-medium">
            <Link to="/" onClick={closeNav}>Home</Link>
          </li>
          <li className="text-lg font-medium">
            <Link to="/map" onClick={closeNav}>Live Map</Link>
          </li>
          {currentUser && (
            <>
              <li className="text-lg font-medium text-eco-secondary border-t pt-6">
                <Link to={handleWelcome()} onClick={closeNav}>
                  {currentUser.first_name} {currentUser.last_name}
                </Link>
              </li>
              <li className="text-lg font-medium">
                <Link to="/contact-us" onClick={closeNav}>Contact Us</Link>
              </li>
              <li
                className="text-lg font-medium text-red-500 cursor-pointer"
                onClick={logout}
              >
                Logout
              </li>
            </>
          )}
          {!currentUser && (
            <div className="space-y-4 pt-6 border-t">
              <Link to="/register" onClick={closeNav} className="block btn-primary text-center">Register</Link>
              <Link to="/login" onClick={closeNav} className="block text-center font-medium py-2">Login</Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

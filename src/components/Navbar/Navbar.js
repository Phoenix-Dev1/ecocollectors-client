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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
    <div className="flex justify-between items-center h-24 mx-auto px-4 text-white bg-gray-900 whitespace-nowrap z-1000">
      <ul className="hidden md:flex items-center">
        {currentUser && (
          <>
            <li>
              <Link
                to="/map"
                className="bg-indigo-600 w-12 h-12 rounded-full flex items-center justify-center font-bold hover:bg-orange-400 border-2 border-white-500 hover:border-white-600"
              >
                Map
              </Link>
            </li>
            <li className="p-4 mr-4 text-orange-500 hover:text-green-600">
              <Link to={handleWelcome()}>
                {currentUser.first_name} {currentUser.last_name}
              </Link>
            </li>
          </>
        )}
        <div className="flex justify-between items-center h-24 mx-auto px-4 text-white bg-gray-900 whitespace-nowrap z-1000">
          {currentUser && (
            <>
              <li className="p-4 hover:text-blue-600">
                <Link to="/">Home</Link>
              </li>
              <li
                className={`relative group p-4`}
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
              >
                <div className="flex items-center cursor-pointer">
                  <div className="hover:text-blue-600">
                    Further Registrations
                  </div>
                  {dropdownOpen ? (
                    <ArrowUpIcon className="w-4 h-4 ml-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 ml-1" />
                  )}
                </div>
                <div
                  className={`absolute ${
                    dropdownOpen ? 'block z-50' : 'hidden'
                  } bg-gray-900 border rounded-lg border-gray-700 mt-2 py-2 right-0`}
                >
                  <Link
                    to="/join"
                    onClick={closeNav}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Recycler Registration
                  </Link>
                  <Link
                    to="/manager-join"
                    onClick={closeNav}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Manager Registration
                  </Link>
                </div>
              </li>
              <li className="p-4 hover:text-blue-600">
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li
                className="p-4 cursor-pointer hover:text-red-500"
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          )}
        </div>
        {!currentUser && (
          <>
            <li>
              <Link
                to="/map"
                className="bg-indigo-600 w-12 h-12 mr-2 rounded-full flex items-center justify-center font-bold hover:bg-orange-400 border-2 border-white-500 hover:border-white-600"
              >
                Map
              </Link>
            </li>
            <li className="p-4 hover:text-blue-600">
              <Link to="/">Home</Link>
            </li>
            <li className="p-4 hover:text-blue-600">
              <Link to="/login">Login</Link>
            </li>
            <li className="p-4 hover:text-blue-600">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      <Link to="/" className="ml-2">
        <img className="h-16 w-26" src={Logo} alt="Eco Collectors" />
      </Link>

      {/* Mobile menu icon */}
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineMenu size={20} /> : <AiOutlineClose size={20} />}
      </div>

      {/* Mobile menu */}
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 ease-in-out duration-500 z-50'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className="w-full text-3xl font-bold m-4">
          <Link to="/" onClick={closeNav}>
            <img className="h-16 w-26" src={Logo} alt="Eco Collectors" />
          </Link>
        </h1>
        <ul className="uppercase p-4">
          <li className="p-4 hover:text-blue-600">
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li>
          {currentUser && (
            <li className="p-4 border-b border-gray-600 text-orange-500 hover:text-green-600">
              <Link to={handleWelcome()}>
                {currentUser.first_name} {currentUser.last_name}
              </Link>
            </li>
          )}
          <li className="p-4 hover:text-purple-600">
            {' '}
            <Link to="/map" onClick={closeNav}>
              {' '}
              Map
            </Link>
          </li>
          {currentUser && (
            <>
              <li className="relative group">
                <div className="p-4 hover:text-blue-600 cursor-pointer">
                  Further Registrations
                </div>
                <ul className="absolute hidden group-hover:block bg-gray-900 text-white rounded-lg mt-2">
                  <li className="p-4 hover:text-blue-600">
                    <Link to="/join" onClick={closeNav}>
                      Recycler Registration
                    </Link>
                  </li>
                  <li className="p-4 hover:text-blue-600">
                    <Link to="/manager-join" onClick={closeNav}>
                      Manager Registration
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="p-4 hover:text-blue-600">
                <Link to="/contact-us" onClick={closeNav}>
                  Contact Us
                </Link>
              </li>
              <li
                className="p-4 border-b border-gray-600 cursor-pointer hover:text-red-500"
                onClick={logout}
              >
                Logout
              </li>
            </>
          )}
          {!currentUser && (
            <>
              <li className="p-4 border-b border-gray-600 hover:text-blue-600">
                <Link to="/register" onClick={closeNav}>
                  Register
                </Link>
              </li>
              <li className="p-4 border-b border-gray-600 hover:text-blue-600">
                <Link to="/login" onClick={closeNav}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

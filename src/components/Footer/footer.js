import React from 'react';
import smallLogo from '../../img/sm-logo.png';

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 mt-auto">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img
              src={smallLogo}
              className="h-8 mr-3"
              alt="Eco Collectors Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Eco Collectors
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/about" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 hover:underline md:mr-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact-us" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{' '}
          <a href="/" className="hover:underline">
            Bar Kaziro & Liran Barzilai
          </a>
          <p>All Rights Reserved.</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

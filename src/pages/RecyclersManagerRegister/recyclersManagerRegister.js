import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateForm } from './managerFormValidation';
import axios from 'axios';
import * as moment from 'moment';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { AuthContext } from '../../context/authContext';

const RecyclersManagerRegister = () => {
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    join_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Update inputs when currentUser changes (when fetching data from local storage)
  useEffect(() => {
    if (currentUser) {
      // Fill the input fields with user data from local storage
      setInputs((prev) => ({
        ...prev,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        email: currentUser.email,
        phone: currentUser.phone,
      }));
    }
  }, [currentUser]);

  // User Credentials
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submitting the register form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the user ID to the inputs object
    const inputsWithUserId = { ...inputs, user_id: currentUser.ID };

    const isValid = validateForm(inputsWithUserId, setError, navigate); // Use the validateForm function
    if (!isValid) {
      return;
    } else {
      try {
        await axios.post(
          '/recyclersManagers/recyclerManagerRegister',
          inputsWithUserId
        );
        window.alert('Request sent successfully!');
        navigate('/');
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  // Opens a link on click
  const handleIconClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <div className="snap-start bg-gray-800 p-2 min-h-fit flex font-extrabold text-center items-center justify-center text-4xl text-white">
          <p className="w-8/12 text-center">
            {' '}
            Join Eco Collectors As A Manager!
          </p>
        </div>
        <div className="snap-start p-2 bg-gray-800 min-h-fit flex font-extrabold text-center items-center justify-center text-2xl text-white mt-5 mb-5">
          <FaFacebookF
            className="mr-5 cursor-pointer"
            onClick={() => handleIconClick('https://www.facebook.com')}
          />
          <FaTwitter
            className="mr-5 cursor-pointer"
            onClick={() => handleIconClick('https://www.twitter.com')}
          />
          <FaInstagram
            className="cursor-pointer"
            onClick={() => handleIconClick('https://www.instagram.com')}
          />
        </div>
        <div className="p-3 bg-gray-800 min-h-fit flex items-center justify-center text-8xl w-96 ml-auto mr-auto">
          <form className="m-0 p-8 bg-gray-50 dark:bg-gray-800 rounded shadow-xl">
            <div className="grid md:grid-cols-2 md:gap-6 w-fit ">
              <div className="relative z-0 w-fit mb-6 group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={inputs.first_name || ''}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  *First name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  onChange={handleChange}
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={inputs.last_name || ''}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  *Last name
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                value={inputs.email || ''}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                *Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={handleChange}
                type="tel"
                name="phone"
                id="phone"
                value={inputs.phone || ''}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                *Phone
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group h-20">
              <textarea
                onChange={handleChange}
                type="text"
                name="message"
                id="message"
                className="block py-2.5 px-0 w-full text-sm  text-gray-900 bg-transparent border-0 border-gray-300 
              min-h-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="message"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                *Message
              </label>
            </div>
            {err && (
              <p className="flex items-center justify-center text-sm text-red-700 font-semibold">
                {err}
              </p>
            )}
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
            >
              Send a message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RecyclersManagerRegister;

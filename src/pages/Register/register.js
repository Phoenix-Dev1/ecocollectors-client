import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "./formValidation"; // Import the validation functions
import axios from "axios";
import smallLogo from "../../img/sm-logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SignupForm() {
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    city: "",
    address: "",
    phone: "",
  });

  const [err, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User Credentials
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  // Submitting the register form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(inputs, setError, navigate); // Use the validateForm function

    if (!isValid) {
      return;
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/auth/register`, inputs);
        navigate("/login");
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
      <div className="leading-loose bg-gray-50 dark:bg-gray-900 overflow-auto w-96">
        <form className="m-0 p-8 bg-gray-50 dark:bg-gray-800 rounded shadow-xl">
          <a
            href="/"
            className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white "
          >
            <img className="w-8 h-8 mr-2" src={smallLogo} alt="logo" />
            Register - Eco Collectors
          </a>
          <div className="inline-block mt-2 w-1/2 pr-1">
            <label className="block text-sm text-white" htmlFor="first_name">
              First Name
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="first_name"
              name="first_name"
              type="text"
              required
              placeholder="First Name"
              aria-label="First name"
            />
          </div>
          <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
            <label className="block text-sm text-white" htmlFor="last_name">
              Last Name
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="last_name"
              name="last_name"
              type="text"
              required
              placeholder="Last Name"
              aria-label="Last Name"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm text-white" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="email"
              name="email"
              type="email"
              required
              placeholder="ex: name@example.com"
              aria-label="email"
            />
          </div>
          <div className="mt-2">
            <div className="inline-block mt-2 w-1/2 pr-1">
              <label className="block text-sm text-white" htmlFor="address">
                Address
              </label>
              <input
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
                id="address"
                name="address"
                type="text"
                required
                placeholder="Street"
                aria-label="Address"
              />
            </div>
            <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label className="block text-sm text-white" htmlFor="city">
                City
              </label>
              <input
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
                id="city"
                name="city"
                type="text"
                required
                placeholder="City"
                aria-label="City"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="text-sm block text-white" htmlFor="phone">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Enter your phone number"
              aria-label="Phone Number"
            />
          </div>
          <div className="mt-2 relative">
            <label className="text-sm block text-white" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              required
              placeholder="••••••••"
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute mt-3 inset-y-0 right-0 flex items-center pr-3"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="mt-2 relative">
            <label
              className="text-sm block text-white"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="confirm_password"
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
              required
              placeholder="••••••••"
              aria-label="Confirm Password"
            />
            <button
              type="button"
              className="absolute pt-3 inset-y-0 right-0 flex items-center pr-3"
              onClick={toggleConfirmPasswordVisibility}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <FiEyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <FiEye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {err && (
            <p className="flex items-center justify-center text-sm text-red-700 font-semibold">
              {err}
            </p>
          )}
          <div className="mt-4 flex justify-center">
            <a href="/login">
              <p className="mb-4 underline text-gray-400 hover:text-gray-50">
                Already have an account?
              </p>
            </a>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded justify-center items-center hover:bg-black"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

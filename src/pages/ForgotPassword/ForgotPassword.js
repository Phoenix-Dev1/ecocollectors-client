import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import smallLogo from "../../img/sm-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [deactivateMessage, setDeactivateMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false); // State to track reset in progress
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (isResetting) {
      return; // Prevent multiple submissions
    }

    try {
      setIsResetting(true); // Set reset in progress

      // Check if the account is active (not deactivated)
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/auth/checkActivation`,
        {
          params: { email },
          withCredentials: true, // ✅ Ensures authentication
        }
      );

      if (!response.data.active) {
        setDeactivateMessage(
          "Account is deactivated. Password reset is not allowed."
        );
        return;
      }

      // Proceed with password reset logic
      const resetResponse = await axios.post(
        `${process.env.REACT_APP_URL}/auth/forgotPassword`,
        { email },
        { withCredentials: true } // ✅ Ensures authentication
      );

      setMessage(resetResponse.data.message);

      setTimeout(() => {
        setMessage("");
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error resetting password:", error.response?.data || error);
      setMessage("Failed to reset password. Please try again later.");
    } finally {
      setIsResetting(false); // Reset state
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src={smallLogo} alt="logo" />
          Eco Collectors
        </a>
        <div className="w-full flex h-[400px] bg-white justify-center rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 mb-5">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enter your email address below, and we'll send you a new random
              password to reset your account.
            </p>
            <form
              onSubmit={handleForgotPassword}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter your email address:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isResetting} // Disable the button when reset is in progress
                className="text-sm font-medium leading-6 text-gray-900 rounded-lg shadow-md focus:outline-none w-full h-12 transition-colors duration-150 ease-in-out bg-gray-700  dark:text-white hover:bg-gray-600 hover:text-primary-500"
              >
                {isResetting ? "Resetting..." : "Reset Password"}
              </button>
              <div className="flex items-center justify-center">
                <a
                  href="/login"
                  className="text-sm font-medium text-white text-primary-600 hover:underline dark:text-primary-500"
                >
                  Back to login page
                </a>
              </div>
            </form>
            {message && (
              <p className="flex items-center justify-center text-sm text-green-600 font-semibold">
                {message}
              </p>
            )}
            {deactivateMessage && (
              <p className="flex items-center justify-center text-sm text-red-600 font-semibold">
                {deactivateMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

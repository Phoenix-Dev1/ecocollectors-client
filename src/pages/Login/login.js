import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import smallLogo from "../../img/sm-logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SignInForm() {
  const [inputs, setInputs] = useState({
    email: "barkaziro@gmail.com",
    password: "1234",
  });

  const [err, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  const handleWelcome = (userRole) => {
    if (userRole === 1) navigate("/user/welcomeAdmin");
    else if (userRole === 2 || userRole === 5) navigate("/user/welcomeUser");
    else if (userRole === 3) navigate("/user/welcomeRecycler");
    else if (userRole === 4) navigate("/user/welcomeManager");
    else navigate("/");
  };

  const handleLoginErrors = (error) => {
    if (error.response?.status === 404) {
      setError("User not found. Please check your email.");
    } else if (error.response?.status === 401) {
      const errorMessage = error.response?.data?.error;
      if (errorMessage === "Account is inactive. Login is not permitted.") {
        setError("Account is inactive. Please contact support.");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } else {
      setError("An error occurred. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRole = await login(inputs);
      handleWelcome(userRole);
    } catch (error) {
      handleLoginErrors(error);
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
        <div className="w-full h-[450px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email"
                  id="email"
                  value={inputs.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"} // Toggle input type based on visibility state
                    name="password"
                    id="password"
                    placeholder="Please enter your password"
                    value={inputs.password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
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
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="text-sm font-medium leading-6 text-gray-900 rounded-lg shadow-md focus:outline-none w-full h-12 transition-colors duration-150 ease-in-out bg-gray-700  dark:text-white hover:bg-gray-600 hover:text-primary-500"
              >
                Sign In
              </button>
              <div className="flex items-right justify-left">
                <a
                  href="/password-recovery"
                  className="text-sm font-medium text-white text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
            </form>
            {err && (
              <p className="flex items-center justify-center  text-s text-red-700 font-semibold ">
                {err}
              </p>
            )}
            <hr className="my-6 border-gray-300 w-full" />
            <div className="flex flex-col space-y-4">
              <span className="flex flex-col sm:flex-row items-center sm:items-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Don't have an account?
                </span>
                <a
                  href="/register"
                  className="ml-2 text-primary-600 hover:underline text-purple-600 dark:text-primary-500"
                >
                  Sign up
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;

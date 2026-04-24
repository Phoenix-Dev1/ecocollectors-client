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
    <div className="min-h-screen bg-eco-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-eco-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-eco-secondary/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl animate-fade-in relative z-10 px-4 md:px-0">
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <a href="/" className="group transition-transform hover:scale-105">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-eco-primary rounded-2xl flex items-center justify-center shadow-lg shadow-eco-primary/20">
                <img className="w-6 h-6 md:w-8 md:h-8" src={smallLogo} alt="logo" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tight text-eco-text">
                Eco<span className="text-eco-primary">Collectors</span>
              </span>
            </div>
          </a>
        </div>

        <div className="glass !rounded-[2rem] md:!rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-eco-primary/5 border border-white/40">
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-black text-eco-text tracking-tight">Join the Mission</h1>
            <p className="text-eco-muted mt-2 md:mt-3 font-medium text-sm md:text-base">Create your account and start making a difference</p>
          </div>

          <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="first_name">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="email">
                Email Address
              </label>
              <input
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="address">
                  Street Address
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                  id="address"
                  name="address"
                  type="text"
                  required
                  placeholder="123 Eco St"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="city">
                  City
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Green City"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-2 relative">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <input
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium pr-12 min-h-[48px]"
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-eco-primary transition-colors"
                    onClick={togglePasswordVisibility}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2 relative">
                <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="confirm_password">
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium pr-12 min-h-[48px]"
                    id="confirm_password"
                    name="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-eco-primary transition-colors"
                    onClick={toggleConfirmPasswordVisibility}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {err && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100 animate-shake">
                {err}
              </div>
            )}

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full btn-primary !py-4 shadow-xl shadow-eco-primary/20 flex items-center justify-center space-x-2 group active:scale-[0.98] mt-4 min-h-[52px]"
            >
              <span className="text-lg">Create Account</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <div className="mt-8 md:mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-eco-muted font-medium text-sm md:text-base">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-eco-primary font-black hover:text-eco-secondary transition-colors"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

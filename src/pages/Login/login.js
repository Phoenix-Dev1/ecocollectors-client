import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import smallLogo from "../../img/sm-logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SignInForm() {
  const [inputs, setInputs] = useState({
    email: "demo@gmail.com",
    password: "1q2w3e4r",
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
    <section className="min-h-screen bg-eco-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-eco-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-eco-secondary/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md animate-fade-in relative z-10 px-4 md:px-0">
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
            <h1 className="text-2xl md:text-3xl font-black text-eco-text tracking-tight">Welcome Back</h1>
            <p className="text-eco-muted mt-2 md:mt-3 font-medium text-sm md:text-base">Log in to manage your recycling impact</p>
          </div>

          <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-eco-text ml-1" htmlFor="email">
                Email Address
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                id="email"
                value={inputs.email}
                className="w-full px-5 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium placeholder:text-gray-400 min-h-[48px]"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="block text-sm font-bold text-eco-text" htmlFor="password">
                  Password
                </label>
                <a
                  href="/password-recovery"
                  className="text-xs font-bold text-eco-primary hover:text-eco-secondary transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <input
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={inputs.password}
                  className="w-full px-5 py-4 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all duration-300 font-medium pr-14 min-h-[48px]"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-eco-primary transition-colors duration-300"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {err && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100 animate-shake">
                {err}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary !py-4 shadow-xl shadow-eco-primary/20 flex items-center justify-center space-x-2 group active:scale-[0.98] min-h-[52px]"
            >
              <span className="text-lg">Sign In</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>

          <div className="mt-8 md:mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-eco-muted font-medium text-sm md:text-base">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-eco-primary font-black hover:text-eco-secondary transition-colors inline-flex items-center"
              >
                Create one now
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInForm;

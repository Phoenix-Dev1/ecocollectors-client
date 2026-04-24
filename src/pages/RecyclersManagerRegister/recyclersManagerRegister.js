import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "./managerFormValidation";
import axios from "axios";
import * as moment from "moment";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";

const RecyclersManagerRegister = () => {
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    join_date: moment().format("YYYY-MM-DD HH:mm:ss"),
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
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
          `${process.env.REACT_APP_URL}/recyclersManagers/recyclerManagerRegister`,
          inputsWithUserId
        );
        window.alert("Request sent successfully!");
        navigate("/");
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  // Opens a link on click
  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-eco-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="w-full max-w-lg">
        {/* Professional Manager Glass Card */}
        <div className="backdrop-blur-md bg-white/80 rounded-[2.5rem] shadow-2xl border border-white/40 p-8 md:p-12 transition-all duration-300">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 shadow-inner">
              <i className="fa-solid fa-briefcase text-2xl"></i>
            </div>
            <h1 className="text-3xl font-black text-eco-text leading-tight">
              Manager <span className="text-indigo-600">Onboarding</span>
            </h1>
            <p className="text-eco-muted mt-3 font-medium tracking-tight">Access our privileged workspace and lead the recycling efforts in your region.</p>
          </div>

          {/* Social Links (Slate/Indigo hovered) */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { icon: <FaFacebookF />, url: "https://facebook.com", color: "hover:bg-indigo-600" },
              { icon: <FaTwitter />, url: "https://twitter.com", color: "hover:bg-indigo-500" },
              { icon: <FaInstagram />, url: "https://instagram.com", color: "hover:bg-slate-700" }
            ].map((social, i) => (
              <button
                key={i}
                onClick={() => handleIconClick(social.url)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-100 text-slate-400 shadow-sm transition-all duration-300 ${social.color} hover:text-white hover:scale-110 hover:-translate-y-1`}
              >
                {social.icon}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="first_name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={inputs.first_name || ""}
                  className="w-full bg-white/50 border-gray-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 min-h-[48px] text-eco-text font-medium transition-all outline-none"
                  placeholder="Manager First Name"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="last_name" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={inputs.last_name || ""}
                  className="w-full bg-white/50 border-gray-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 min-h-[48px] text-eco-text font-medium transition-all outline-none"
                  placeholder="Manager Last Name"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Business Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                value={inputs.email || ""}
                className="w-full bg-white/50 border-gray-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 min-h-[48px] text-eco-text font-medium transition-all outline-none"
                placeholder="manager@ecocollectors.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Work Phone</label>
              <input
                onChange={handleChange}
                type="tel"
                name="phone"
                id="phone"
                value={inputs.phone || ""}
                className="w-full bg-white/50 border-gray-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 min-h-[48px] text-eco-text font-medium transition-all outline-none"
                placeholder="+1 (555) 000-0000"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Professional Message</label>
              <textarea
                onChange={handleChange}
                name="message"
                id="message"
                rows="3"
                className="w-full bg-white/50 border-gray-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 text-eco-text font-medium transition-all outline-none resize-none"
                placeholder="Describe your experience or goals as a regional manager..."
              />
            </div>

            {err && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl animate-shake">
                <p className="text-sm text-red-600 font-semibold text-center">{err}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all duration-300 active:scale-95 transform min-h-[56px]"
            >
              Request Access
            </button>
          </form>

          <p className="text-center text-eco-muted text-sm mt-8">
            Already registered? <a href="/login" className="text-indigo-600 font-bold hover:underline transition-colors">Sign In</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecyclersManagerRegister;

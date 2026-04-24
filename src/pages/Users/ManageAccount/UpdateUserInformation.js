import React, { useEffect, useState, useContext, useRef } from "react";
import { validateInfo } from "./ValidateInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";

export default function UpdateUserInformation() {
  const form = useRef();
  const { currentUser, logout } = useContext(AuthContext);

  // Initialize the texts state with empty values
  const [texts, setTexts] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    address: "",
    phone: "",
  });

  const [deactivated, setDeactivated] = useState(false); // State to track account deactivation
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/user/info`,
          { withCredentials: true } // Ensure cookies are included
        );
        const userData = response.data;
        setTexts({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          city: userData.city,
          address: userData.address,
          phone: userData.phone,
        });
      } catch (error) {
        setError("Error fetching user information");
        console.error(error);
      }
    };

    fetchUserInformation();
  }, []); // Run only on component mount

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateInfo(texts, setError);
    if (!isValid) return;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/user/update`,
        texts,
        { withCredentials: true } // Ensure credentials (cookies) are sent
      );

      console.log(response);

      // Update currentUser state with the new user data
      const updatedUser = {
        ...currentUser,
        first_name: texts.first_name,
        last_name: texts.last_name,
        email: texts.email,
        city: texts.city,
        address: texts.address,
        phone: texts.phone,
      };

      // Save updated user in localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/user/welcome");
    } catch (err) {
      setError(err.response?.data || "Error updating user information");
      console.error(err);
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmDeactivation = window.confirm(
      "Are you sure you want to deactivate your account? This action is irreversible."
    );

    if (!confirmDeactivation) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/user/deactivate`,
        {}, // Empty body
        { withCredentials: true } // Ensure credentials (cookies) are sent
      );

      setDeactivated(true); // Update local state
      await logout();
      navigate("/");
    } catch (error) {
      setError("Error deactivating account");
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in p-8">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-eco-text">Manage Account</h2>
        <p className="text-eco-muted mt-2">Update your personal information and contact details</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="glass !rounded-3xl p-8 shadow-sm">
          <form ref={form} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="first_name">
                  First Name
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all"
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={texts.first_name}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all"
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={texts.last_name}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all"
                id="email"
                name="email"
                type="email"
                required
                value={texts.email}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="address">
                  Street Address
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all"
                  id="address"
                  name="address"
                  type="text"
                  value={texts.address}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="city">
                  City
                </label>
                <input
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all"
                  id="city"
                  name="city"
                  type="text"
                  value={texts.city}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all"
                id="phone"
                name="phone"
                type="tel"
                value={texts.phone}
              />
            </div>

            {err && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium text-center">
                {err}
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 btn-primary !py-4"
                type="submit"
              >
                Save Changes
              </button>
              <button
                onClick={handleDeactivateAccount}
                className="px-8 py-4 text-red-600 font-bold hover:bg-red-50 rounded-2xl transition-all border border-red-100"
                type="button"
              >
                Deactivate
              </button>
            </div>
          </form>
          {deactivated && (
            <p className="text-red-600 font-bold mt-6 text-center animate-pulse">
              Your account has been deactivated.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validatePassword from "./validatePassword";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [err, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword); // Toggle password visibility state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { old_password, new_password, confirm_password } = passwords;

    // Check if new password and confirm password match
    if (new_password !== confirm_password) {
      setError("New password and confirm password do not match");
      return;
    }

    // Perform password validation checks
    const passwordErrors = validatePassword(new_password);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join("\n"));
      return;
    } else {
      setError(""); // Clear the error if password is valid
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/user/change-password`,
        { old_password, new_password },
        { withCredentials: true } // ✅ Fix: Ensure credentials (cookies) are sent
      );

      // Show success alert
      alert("Password changed successfully!");

      // Redirect to homepage
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Error changing password"); // ✅ Fix: Prevent crash if err.response is undefined
      console.error("Error changing password:", err);
    }
  };

  return (
    <div className="animate-fade-in p-8">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl font-bold text-eco-text">Security Settings</h2>
        <p className="text-eco-muted mt-2">Manage your account password and security preferences</p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="glass !rounded-3xl p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="old_password">
                Current Password
              </label>
              <input
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all pr-12"
                id="old_password"
                name="old_password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-4 top-[38px] text-gray-400 hover:text-eco-primary transition-colors"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="new_password">
                New Password
              </label>
              <input
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all pr-12"
                id="new_password"
                name="new_password"
                type={showNewPassword ? "text" : "password"}
              />
              <button
                type="button"
                className="absolute right-4 top-[38px] text-gray-400 hover:text-eco-primary transition-colors"
                onClick={toggleNewPasswordVisibility}
                tabIndex={-1}
              >
                {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-eco-text mb-2" htmlFor="confirm_password">
                Confirm New Password
              </label>
              <input
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 rounded-2xl border border-gray-200 focus:border-eco-primary focus:ring-2 focus:ring-eco-primary/20 outline-none transition-all pr-12"
                id="confirm_password"
                name="confirm_password"
                type={showNewPassword ? "text" : "password"}
              />
            </div>

            {err && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium whitespace-pre-line text-center">
                {err}
              </div>
            )}

            <button
              className="w-full btn-primary !py-4 mt-4"
              type="submit"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

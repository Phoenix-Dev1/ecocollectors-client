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
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-left">
      <div className="leading-loose bg-gray-900 overflow-auto w-96">
        <h1 className="flex items-center justify-center text-lg font-bold mb-4">
          Change your password
        </h1>
        <form
          className="m-0 p-8 bg-gray-800 rounded shadow-xl"
          onSubmit={handleSubmit}
        >
          <div className="mt-2 relative">
            <label className="text-sm block text-white" htmlFor="old_password">
              Old Password
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white pr-10"
              id="old_password"
              name="old_password"
              type={showPassword ? "text" : "password"}
              aria-label="Old Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 pt-4 justify-center"
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
            <label className="text-sm block text-white" htmlFor="new_password">
              New Password
            </label>
            <input
              onChange={handleChange}
              className="w-full px-2 py-2 bg-gray-600 rounded border border-gray-300 text-white"
              id="new_password"
              name="new_password"
              type={showNewPassword ? "text" : "password"}
              aria-label="New Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 pt-4 justify-center"
              onClick={toggleNewPasswordVisibility}
              tabIndex={-1}
            >
              {showNewPassword ? (
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
              type={showNewPassword ? "text" : "password"}
              aria-label="Confirm Password"
            />
          </div>
          {err && (
            <p className="flex items-center justify-center text-sm text-red-700 font-semibold">
              {err}
            </p>
          )}
          <div className="flex justify-center">
            <button
              className="px-4 py-1 mt-3 text-white font-light tracking-wider bg-gray-900 rounded justify-center items-center hover:bg-black"
              type="submit"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

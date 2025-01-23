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

  const [isDataFetched, setDataFetched] = useState(false);
  const [deactivated, setDeactivated] = useState(false); // State to track account deactivation
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user information from the server using the GET method
    const fetchUserInformation = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/user/info`
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
        setDataFetched(true);
      } catch (error) {
        setError("Error fetching user information");
        console.log(isDataFetched);
      }
    };

    fetchUserInformation();
  }, [isDataFetched]);

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    //console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateInfo(texts, setError);

    if (!isValid) {
      return;
    } else {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_URL}/user/update`,
          texts
        );
        console.log(response);

        // Update the currentUser state with the new user data
        const updatedUser = {
          ...currentUser,
          first_name: texts.first_name,
          last_name: texts.last_name,
          email: texts.email,
          city: texts.city,
          address: texts.address,
          phone: texts.phone,
        };

        // Update the 'user' data in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        navigate("/user/welcome");
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  const handleDeactivateAccount = async () => {
    const confirmDeactivation = window.confirm(
      "Are you sure you want to deactivate your account? This action is irreversible."
    );

    if (confirmDeactivation) {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/user/deactivate`);
        setDeactivated(true); // Update local state to reflect deactivation
        // Log out the user from the system after deactivation
        await logout();
        navigate("/");
      } catch (error) {
        setError("Error deactivating account");
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-left">
      <div className="leading-loose bg-gray-900 overflow-auto w-96">
        <h1 className="flex items-center justify-center text-lg font-bold mb-4">
          Change your information
        </h1>
        <form
          ref={form}
          className="m-0 p-8 bg-gray-800 rounded shadow-xl w-full"
        >
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
              aria-label="First name"
              value={texts.first_name}
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
              aria-label="Last Name"
              value={texts.last_name}
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
              aria-label="email"
              required
              value={texts.email}
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
                aria-label="Address"
                value={texts.address}
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
                aria-label="City"
                value={texts.city}
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
              aria-label="Phone Number"
              value={texts.phone}
            />
          </div>
          {err && (
            <p className="flex items-center justify-center text-sm text-red-700 font-semibold">
              {err}
            </p>
          )}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-4 py-1 mt-3 text-white font-light tracking-wider bg-gray-900 rounded justify-center items-center hover:bg-black"
              type="submit"
            >
              Update Account
            </button>
          </div>
        </form>
        {deactivated ? (
          <p className="text-red-600 font-medium mt-3">
            Your account is deactivated.
          </p>
        ) : (
          <div className="flex justify-center mt-3">
            <button
              onClick={handleDeactivateAccount}
              className="px-4 py-1 text-white font-light tracking-wider bg-red-600 rounded hover:bg-red-700"
              type="button"
            >
              Deactivate Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

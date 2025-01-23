import React, { useState, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./bins.module.css";

const libraries = ["places"];

const AddNewBin = () => {
  const navigate = useNavigate();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [newBinData, setNewBinData] = useState({
    address: "",
    city: "",
    lat: "",
    lng: "",
    type: "", // Default bin type
  });

  const [coordinates, setCoordinates] = useState({
    lat: 32.79413,
    lng: 34.98828,
  });

  const inputReference = useRef();
  const [typeError, setTypeError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBinData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceChanged = () => {
    const [place] = inputReference.current.getPlaces();
    if (place) {
      setNewBinData((prevData) => ({
        ...prevData,
        address: place.formatted_address,
        city: place.vicinity,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }));

      setCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleAddNewBin = async (e) => {
    e.preventDefault();

    if (!newBinData.address) {
      setAddressError(true);
      return;
    }

    if (!newBinData.type || newBinData.type === "Please Select a type") {
      setTypeError(true);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_URL}/admin/bins`, newBinData);
      setShowSuccessMessage(true); // Show success message
      setTypeError(false);
      setAddressError(false);
      setServerError(false);
      // Wait for a moment and then redirect
      setTimeout(() => {
        navigate("/admin/bins");
      }, 3000); // Redirect after 3 seconds (adjust as needed)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setServerError(error.response.data.error);
      } else {
        console.log(error);
      }
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <div className={classes.loaderWrapper}>
        <div className={classes.container}>
          <div className={classes.ring}></div>
          <div className={classes.ring}></div>
          <div className={classes.ring}></div>
          <span className={classes.loading}>Recycle</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-semibold">Add New Bin</p>
      <div className="mr-4" style={{ height: "400px", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={coordinates}
          zoom={15}
        >
          <MarkerF position={coordinates} />
        </GoogleMap>
      </div>
      <div className="mt-6 w-96">
        <h2 className="text-lg font-semibold mb-2">Enter Bin Data:</h2>
        <form onSubmit={handleAddNewBin} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="address" className="block text-white">
              Address
            </label>
            <StandaloneSearchBox
              onLoad={(ref) => (inputReference.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="address"
                id="address"
                value={newBinData.address || ""}
                onChange={handleInputChange}
              />
            </StandaloneSearchBox>
          </div>
          <div>
            <label htmlFor="city" className="block text-white">
              City
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              name="city"
              value={newBinData.city || ""}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-white">
              Type (Select)
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              value={newBinData.type || ""}
              onChange={handleInputChange}
            >
              <option value="Please Select a type">Please Select a type</option>
              <option value="blue">blue</option>
              <option value="carton">carton</option>
              <option value="electronic-waste">electronic Waste</option>
              <option value="orange">orange</option>
              <option value="purple">purple</option>
              <option value="textile">textile</option>
            </select>
          </div>
          <div>
            <label htmlFor="lat" className="block text-white">
              Latitude
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lat"
              name="lat"
              value={newBinData.lat || ""}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="lng" className="block text-white">
              Longitude
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lng"
              name="lng"
              value={newBinData.lng || ""}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="col-span-2 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add New Bin
            </button>
            {typeError && (
              <p className="text-red-500 text-sm mt-1">Please select a type</p>
            )}
            {addressError && (
              <p className="text-red-500 text-sm mt-1">
                Please enter an address
              </p>
            )}
            {showSuccessMessage && (
              <p className="text-green-600 text-sm mt-2">
                Bin added successfully! Redirecting...
              </p>
            )}
            {serverError && (
              <p className="text-red-500 text-sm mt-1">{serverError}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBin;

import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { validateInputs } from "../Users/RequestUtils";
import classes from "./UpdateRequest.module.css";

const libraries = [process.env.REACT_APP_GOOGLE_LIB];

const UpdateRequest = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [requestData, setRequestData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Add this line

  const inputReference = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceChanged = () => {
    const [place] = inputReference.current.getPlaces();
    if (place) {
      setUpdatedData((prevData) => ({
        ...prevData,
        req_address: place.formatted_address,
        req_lat: place.geometry.location.lat(),
        req_lng: place.geometry.location.lng(),
      }));
      setCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (requestStatus !== 1) {
      alert("You can't update the request in this status.");
      return;
    }

    const validatedInput = validateInputs({
      fullName: updatedData.full_name,
      reqLat: updatedData.req_lat,
      reqLng: updatedData.req_lng,
      reqAddress: updatedData.req_address,
      phoneNumber: updatedData.phone_number,
      bottlesNumber: updatedData.bottles_number,
      fromTime: updatedData.from_hour,
      toTime: updatedData.to_hour,
    });

    if (validatedInput.isValid) {
      const confirmed = window.confirm(
        "Are you sure you want to update this request?"
      );
      if (confirmed) {
        try {
          // Convert time strings to time objects for comparison
          const fromTimeObj = new Date(`1970-01-01T${updatedData.from_hour}`);
          const toTimeObj = new Date(`1970-01-01T${updatedData.to_hour}`);

          // Compare time objects
          if (fromTimeObj >= toTimeObj) {
            setErrorMessage("Please select a valid time range.");
            return;
          }

          const requestId = getRequestIdFromURL();
          await axios.put(
            `${process.env.REACT_APP_URL}/requests/userUpdate/${requestId}`,
            updatedData
          );
          setShowSuccessMessage(true);
          setErrorMessage(false);
          setTimeout(() => {
            setShowSuccessMessage(false);
            window.location.href = "/user/pending-requests";
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setErrorMessage(validatedInput.message);
    }
  };

  const getRequestIdFromURL = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get("Id");
  };

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const requestId = getRequestIdFromURL();
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/requests/${requestId}`
        ); // Adjust the endpoint URL
        setRequestData(response.data);
        setUpdatedData(response.data);
        setCoordinates({
          lat: response.data.req_lat,
          lng: response.data.req_lng,
        });
        setRequestStatus(response.data.status);
      } catch (error) {
        console.log(error);
        console.log(requestData);
      }
    };

    fetchRequestData();
  }, []);

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
      <p className="text-lg font-semibold">Update Request</p>
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
        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="req_address" className="block text-white">
              Address
            </label>
            <StandaloneSearchBox
              onLoad={(ref) => (inputReference.current = ref)}
              onPlacesChanged={handlePlaceChanged}
            >
              <input
                type="text"
                placeholder="Enter address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="req_address"
                id="req_address"
                value={updatedData.req_address || ""}
                onChange={handleInputChange}
              />
            </StandaloneSearchBox>
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-white">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone_number"
              name="phone_number"
              value={updatedData.phone_number || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="bottles_number" className="block text-white">
              Bottles Number
            </label>
            <input
              type="number"
              placeholder="Bottles Number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bottles_number"
              name="bottles_number"
              value={updatedData.bottles_number || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="full_name" className="block text-white">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="full_name"
              name="full_name"
              value={updatedData.full_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="from_hour" className="block text-white">
                From Hour
              </label>
              <input
                type="time"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="from_hour"
                name="from_hour"
                value={updatedData.from_hour || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="to_hour" className="block text-white">
                To Hour
              </label>
              <input
                type="time"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="to_hour"
                name="to_hour"
                value={updatedData.to_hour || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-span-2 text-center">
            <button
              className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Request
            </button>
            {showSuccessMessage && (
              <p className="text-green-600 mt-2">
                Request updated successfully!
              </p>
            )}
            {errorMessage && (
              <p className="text-red-600 mt-1 mb-1">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRequest;

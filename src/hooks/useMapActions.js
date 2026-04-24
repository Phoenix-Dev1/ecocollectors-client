import { useState } from "react";
import axios from "axios";
import * as moment from "moment";
import { useNavigate } from "react-router-dom";
import { validateInputs } from "../components/map/InputValidation";
import { showAddress, openGoogleMaps } from "../components/map/mapFunctions";

export const useMapActions = (currentUser, refetchRequests) => {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  const [showAddWindow, setShowAddWindow] = useState(false);
  const [err, setError] = useState(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [bottlesNumber, setBottlesNumber] = useState("");
  const [reqLat, setReqLat] = useState("");
  const [reqLng, setReqLng] = useState("");
  const [reqAddress, setReqAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const initialName = currentUser
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : "";

  const toggleFilterWindow = () => {
    setShowFilterWindow((prev) => !prev);
    setShowAddWindow(false);
  };

  const toggleAddWindow = () => {
    setShowAddWindow((prev) => !prev);
    setShowFilterWindow(false);
  };

  const handleShowAddress = (address) => {
    showAddress(setSelectedMarker, address);
  };

  const handleOpenGoogleMaps = (lat, lng) => {
    openGoogleMaps(lat, lng);
  };

  const handleSubmit = async (e, setMarkerWithIdA) => {
    if (e) e.preventDefault();

    const submittedFullName = fullName.trim() === "" ? initialName : fullName;
    const submittedPhoneNumber = phoneNumber.trim() === "" ? currentUser?.phone : phoneNumber;

    if (currentUser) {
      const validation = validateInputs({
        fullName: submittedFullName,
        reqLat,
        reqLng,
        reqAddress,
        phoneNumber: submittedPhoneNumber,
        bottlesNumber,
        fromTime,
        toTime,
      });

      if (validation.isValid) {
        try {
          await axios.post(
            `${process.env.REACT_APP_URL}/requests/add`,
            {
              fullName: submittedFullName,
              reqLat,
              reqLng,
              reqAddress,
              phoneNumber: submittedPhoneNumber,
              bottlesNumber,
              fromTime,
              toTime,
              reqDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );

          setShowAddWindow(false);
          refetchRequests();
          navigate("/map");

          // Reset Form
          setFullName("");
          setReqLat("");
          setReqLng("");
          setReqAddress("");
          setPhoneNumber("");
          setBottlesNumber("");
          setFromTime("");
          setToTime("");
          setError(null);
          if (setMarkerWithIdA) setMarkerWithIdA(0);

          window.alert("Request added successfully!");
        } catch (err) {
          console.error("Error submitting request:", err);
          setError("Failed to add request. Please try again.");
        }
      } else {
        setError(validation.message);
      }
    } else {
      navigate("/login");
    }
  };

  return {
    selectedMarker,
    setSelectedMarker,
    showFilterWindow,
    setShowFilterWindow,
    showAddWindow,
    setShowAddWindow,
    err,
    setError,
    fullName,
    setFullName,
    bottlesNumber,
    setBottlesNumber,
    reqLat,
    setReqLat,
    reqLng,
    setReqLng,
    reqAddress,
    setReqAddress,
    phoneNumber,
    setPhoneNumber,
    fromTime,
    setFromTime,
    toTime,
    setToTime,
    initialName,
    toggleFilterWindow,
    toggleAddWindow,
    handleShowAddress,
    handleOpenGoogleMaps,
    handleSubmit,
  };
};

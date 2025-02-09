import React, { useState, useEffect, useRef, useContext } from "react";
import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import axios from "axios";
import * as moment from "moment";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classes from "./map.module.css";
import {
  showAddress,
  openGoogleMaps,
  formatDate,
  formatDateTime,
  formatTime,
  typeDescriptions,
  typeColors,
} from "./mapFunctions";
import FilterWindow from "./FilterWindow";
import AddWindow from "./AddWindow";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { VscFilter } from "react-icons/vsc";
//import { GiRecycle } from 'react-icons/gi';
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import { validateInputs } from "./InputValidation";
import * as geolib from "geolib";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../LoadingPage/LoadingPage";

const libraries = [process.env.REACT_APP_GOOGLE_LIB];
const Map = () => {
  // Add request Reference
  const inputReference = useRef();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useRef();
  const initialName = currentUser
    ? currentUser.first_name + " " + currentUser.last_name
    : "";
  const [bottlesNumber, setBottlesNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [reqLat, setReqLat] = useState("");
  const [reqLng, setReqLng] = useState("");
  const [reqAddress, setReqAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [mapZoom, setMapZoom] = useState(12); // Initial zoom level

  // errors handling
  const [err, setError] = useState(null);

  // Add request Address GeoCoder Request
  const handlePlaceChanged = () => {
    const [place] = inputReference.current.getPlaces();
    if (place) {
      setReqAddress(place.formatted_address);
      setReqLat(place.geometry.location.lat());
      setReqLng(place.geometry.location.lng());
    }
  };

  // Request submit handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If fullName is empty(unchanged), use initialName
    const submittedFullName = fullName.trim() === "" ? initialName : fullName;
    // If phoneNumber is empty(unchanged), use phone number from currentUser
    const submittedPhoneNumber =
      phoneNumber.trim() === "" ? currentUser?.phone : phoneNumber;

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
            { withCredentials: true } // ✅ Ensures authentication
          );

          toggleAddWindow();
          refetchRequests();
          navigate("/map");

          // Clear form fields after successful submission
          setFullName("");
          setReqLat("");
          setReqLng("");
          setReqAddress("");
          setPhoneNumber("");
          setBottlesNumber("");
          setFromTime("");
          setToTime("");
          setError(null);
          setMarkerWithIdA(0);

          // Show an alert for successful submission
          window.alert("Request added successfully!");
        } catch (err) {
          console.error("Error submitting request:", err);
          setError("Failed to add request. Please try again.");
        }
      } else {
        setError(validation.message);
      }
    } else {
      // User is not logged in, so redirect to login page
      navigate("/login");
    }
  };

  // Loading Google API Key and Libraries
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
    loading: "async",
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showFilterWindow, setShowFilterWindow] = useState(false); // track filter window visibility
  const [showAddWindow, setShowAddWindow] = useState(false); // track add window visibility

  // Fetching by DB row type
  const type = useLocation().search;

  // Center the Map At Haifa Port
  const [center, setCenter] = useState({ lat: 32.79413, lng: 34.98828 }); // Initial center coordinates

  const handleShowAddress = (address) => {
    showAddress(setSelectedMarker, address);
  };

  const handleOpenGoogleMaps = (lat, lng) => {
    openGoogleMaps(lat, lng);
  };

  const toggleFilterWindow = () => {
    setShowFilterWindow(!showFilterWindow);
    setShowAddWindow(false);
  };

  const toggleAddWindow = () => {
    setShowAddWindow(!showAddWindow);
    setShowFilterWindow(false);
  };

  // Search bins
  const searchReference = useRef();
  const [searchLat, setSearchLat] = useState(0);
  const [searchLng, setSearchLng] = useState(0);
  const [searchAddress, setSearchAddress] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedMarkerType, setSelectedMarkerType] = useState("");
  const [searchRadius, setSearchRadius] = useState(5000); // Default search radius in meters
  const [searchClicked, setSearchClicked] = useState(false);

  console.log(searchAddress);
  // Range search
  const handleSearchRadiusChange = (e) => {
    setSearchRadius(parseInt(e.target.value)); // Parse the input value as an integer
  };

  const handleCancelSearch = () => {
    setSearchClicked(false);
    setFilteredMarkers(markers);
    setSearchRadius(5000);
    setSearchAddress("");
  };

  // updating filtered markers based on range selection
  function updateFilteredMarkers(radius) {
    if (searchLat && searchLng) {
      const filtered = markers.filter((marker) => {
        const distance = calculateDistance(
          searchLat,
          searchLng,
          marker.lat,
          marker.lng
        );
        return distance <= radius;
      });

      setFilteredMarkers(filtered);
      setSearchPerformed(true);
    }
  }

  // update filtered markers when searchRadius changes
  useEffect(() => {
    updateFilteredMarkers(searchRadius);
  }, [searchRadius]); // Trigger the effect when searchRadius changes - Do not add/remove!

  const handleSearchCoordinates = () => {
    const [place] = searchReference.current.getPlaces();
    if (place) {
      setSearchAddress(place.formatted_address);
      setSearchLat(place.geometry.location.lat());
      setSearchLng(place.geometry.location.lng());
      // console.log("searchLat: " + place.geometry.location.lat());
      // console.log("searchLng: " + place.geometry.location.lng());
      // console.log("searchAddress: " + searchAddress);
    }
  };

  // Function to calculate distance between two points
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const distance = geolib.getDistance(
      { latitude: lat1, longitude: lng1 },
      { latitude: lat2, longitude: lng2 }
    );
    if (distance <= 5000)
      // console.log(distance);
      return distance;
  };

  function filterMarkers() {
    if (searchLat && searchLng) {
      const filtered = markers.filter((marker) => {
        const distance = calculateDistance(
          searchLat,
          searchLng,
          marker.lat,
          marker.lng
        );
        return distance <= searchRadius; // 5000 meters (5 km)
      });

      setFilteredMarkers(filtered); // Update the filteredMarkers state
      // Set the map's center to the search coordinates
      const newCenter = { lat: searchLat, lng: searchLng };
      setCenter(newCenter);
      setMapZoom(15); // Change the zoom level to 15
      setSearchPerformed(true); // Set searchPerformed to true
    }
  }

  const handleFilterMarkers = () => {
    filterMarkers();
    setSearchClicked(true);
    // Update the zoom level and center of the map on successful search
    setMapZoom(15); // Change the zoom level to 16
  };

  // Function to handle changes in the dropdown selection
  const handleMarkerTypeChange = (e) => {
    setSelectedMarkerType(e.target.value);
  };

  /***** Right click solution  *****/

  // Create a state variable for the marker with id 0
  const [markerWithIdA, setMarkerWithIdA] = useState(0);

  const handleRightClick = async (event) => {
    const latLng = event.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();

    // Create a new marker
    const newMarker = new window.google.maps.Marker({
      id: "A",
      lat: lat,
      lng: lng,
      type: "addMarker",
    });

    // Set the marker with id 'A' - unique
    setMarkerWithIdA(newMarker);

    // Set the coordinates in the AddWindow
    setReqLat(lat);
    setReqLng(lng);

    try {
      // Use the Google Geocoding API to get the address
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      // Extract the formatted address from the response
      // console.table(response.data.results);
      const address = response.data.results[0]?.formatted_address;

      // Set the address in the state
      setReqAddress(address);

      // Open the AddWindow
      //toggleAddWindow();
      setShowAddWindow(true);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // NEW NEW NEW
  // Fetch Requests
  const fetchRequests = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/requests`, {
      withCredentials: true,
    });
    return res.data;
  };

  const { data: requests = [], refetch: refetchRequests } = useQuery({
    queryKey: ["requests"], // React-query will track this query by key
    queryFn: fetchRequests,
    staleTime: 30000, // Cache data for 30 seconds before fetching again
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  });

  // Fetch Bins
  const fetchActiveMarkers = async ({ queryKey }) => {
    const [, type] = queryKey; // Extract type from queryKey
    const res = await axios.get(`${process.env.REACT_APP_URL}/markers${type}`);
    return res.data;
  };

  const {
    data: markers = [],
    isLoading: markersLoading,
    isPending: markersPending,
    error: markersError,
  } = useQuery({
    queryKey: ["markers", type],
    queryFn: fetchActiveMarkers,
    staleTime: 60000, // Cache for 60 seconds
  });

  if (markersPending || markersLoading) return <LoadingPage />;
  if (markersError) return <h4>{markersError.message}</h4>;

  // Filter markers based on selectedMarkerType
  const filteredMarkersByType =
    selectedMarkerType !== ""
      ? markers.filter((marker) => marker.type === selectedMarkerType)
      : markers;

  const filteredFilteredMarkersByType =
    selectedMarkerType !== ""
      ? filteredMarkers.filter((marker) => marker.type === selectedMarkerType)
      : filteredMarkers;

  // console.log(requests);

  return (
    <div className={classes.Map}>
      <div className={classes.filters} onClick={toggleFilterWindow}>
        <VscFilter />
      </div>
      {showFilterWindow && (
        <FilterWindow
          selectedMarkerType={selectedMarkerType}
          handleMarkerTypeChange={handleMarkerTypeChange}
          toggleFilterWindow={toggleFilterWindow}
          classes={classes}
        />
      )}
      {currentUser /*{ Will only show when a user is logged in }*/ && (
        <div className={classes.add} onClick={toggleAddWindow}>
          <FaPlus />
        </div>
      )}
      {showAddWindow && (
        <AddWindow
          fullName={fullName}
          initialName={initialName}
          setFullName={setFullName}
          bottlesNumber={bottlesNumber}
          setBottlesNumber={setBottlesNumber}
          inputReference={inputReference}
          handlePlaceChanged={handlePlaceChanged}
          reqAddress={reqAddress}
          setReqAddress={setReqAddress}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          currentUser={currentUser}
          fromTime={fromTime}
          setFromTime={setFromTime}
          toTime={toTime}
          setToTime={setToTime}
          err={err}
          handleSubmit={handleSubmit}
          toggleAddWindow={toggleAddWindow}
          form={form}
          classes={classes}
        />
      )}
      {!isLoaded ? (
        <div className={classes.loaderWrapper}>
          <div className={classes.container}>
            <div className={classes.ring}></div>
            <div className={classes.ring}></div>
            <div className={classes.ring}></div>
            <span className={classes.loading}>Recycle</span>
          </div>
        </div>
      ) : (
        <GoogleMap
          mapContainerClassName={classes.mapContainer}
          gestureHandling="none"
          center={center}
          zoom={mapZoom}
          onRightClick={handleRightClick}
        >
          {/* Render the marker with id 0 */}
          {markerWithIdA && (
            <MarkerF
              key={markerWithIdA.id}
              position={{ lat: markerWithIdA.lat, lng: markerWithIdA.lng }}
              icon={{
                url: require(`../../img/icons/${markerWithIdA.type}.png`),
              }}
              onClick={() => handleShowAddress(markerWithIdA.address)}
            />
          )}
          {/* Search Bins */}
          <div className={classes.searchBox}>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <StandaloneSearchBox
              onLoad={(ref) => (searchReference.current = ref)}
              onPlacesChanged={handleSearchCoordinates}
            >
              <input
                type="text"
                className={classes.searchInput}
                placeholder="Search Recycle Bins"
                inputref={searchReference}
                onChange={(e) => setSearchAddress(e.target.value)}
                required
                onSubmit={handleFilterMarkers}
              />
            </StandaloneSearchBox>
            <button type="submit" onClick={handleCancelSearch}>
              <i className="flex flex-2 flex-col fa fa-times mr-4 hover:text-blue-500"></i>
            </button>
            <button type="submit" onClick={handleFilterMarkers}>
              <i className="flex flex-col fa fa-search hover:text-blue-500"></i>
            </button>
          </div>
          {searchClicked && (
            <div className={classes.rangeInputContainer}>
              <input
                type="range"
                min="1000" // Minimum search radius in meters
                max="10000" // Maximum search radius in meters
                step="100" // Step value for the range input
                value={searchRadius}
                onChange={handleSearchRadiusChange}
              />
              <span className={classes.rangeTextContainer}>
                <p>{searchRadius}m</p>
              </span>
            </div>
          )}
          {searchPerformed
            ? Array.isArray(filteredFilteredMarkersByType)
              ? filteredFilteredMarkersByType.map(
                  ({ id, lat, lng, type, address, last_modified }, index) => {
                    const markerClicked = selectedMarker === address;
                    return (
                      <MarkerF
                        key={`marker-${id || `${lat}-${lng}-${index}`}`} // Ensure unique key
                        position={{ lat, lng }}
                        icon={{
                          url: require(`../../img/icons/${type}.png`),
                        }}
                        onClick={() => handleShowAddress(address)}
                      >
                        {markerClicked && (
                          <InfoWindowF
                            onCloseClick={() => setSelectedMarker(null)}
                            disableAutoClose={true}
                            style={{ background: "blue" }}
                          >
                            <div className="pl-5 text-center">
                              <h1 className="text-xl font-bold mb-2 text-right">
                                {address}
                              </h1>
                              <p
                                className={`mb-2 text-center font-semibold ${typeColors[type]}`}
                              >
                                {typeDescriptions[type]}
                              </p>
                              <div className="text-center">
                                <h2 className="mb-2 text-center">
                                  Last updated: {formatDate(last_modified)}
                                </h2>
                              </div>
                              <div className="text-center">
                                <button
                                  className="bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow items-center"
                                  onClick={() => handleOpenGoogleMaps(lat, lng)}
                                >
                                  Navigate
                                </button>
                              </div>
                            </div>
                          </InfoWindowF>
                        )}
                      </MarkerF>
                    );
                  }
                )
              : null
            : Array.isArray(filteredMarkersByType)
            ? filteredMarkersByType.map(
                ({ id, lat, lng, type, address, last_modified }, index) => {
                  const markerClicked = selectedMarker === address;
                  const isAdmin = currentUser?.role === 1;
                  return (
                    <MarkerF
                      key={`marker-${id || `${lat}-${lng}-${index}`}`} // Ensure unique key
                      position={{ lat, lng }}
                      icon={{
                        url: require(`../../img/icons/${type}.png`),
                      }}
                      onClick={() => handleShowAddress(address)}
                    >
                      {markerClicked && (
                        <InfoWindowF
                          onCloseClick={() => setSelectedMarker(null)}
                          disableAutoClose={true}
                          style={{ background: "blue" }}
                        >
                          <div className="pl-5 text-center">
                            <h1 className="text-xl font-bold mb-2 text-right">
                              {address}
                            </h1>
                            <p
                              className={`mb-2 text-center font-semibold ${typeColors[type]}`}
                            >
                              {typeDescriptions[type]}
                            </p>
                            <div className="text-center">
                              <h2 className="mb-2 text-center">
                                Last updated: {formatDate(last_modified)}
                              </h2>
                            </div>
                            <div className="text-center">
                              <button
                                className="bg-white hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow items-center"
                                onClick={() => handleOpenGoogleMaps(lat, lng)}
                              >
                                Navigate
                              </button>
                              {isAdmin && (
                                <Link
                                  to={`/admin/update-bin/${id}`}
                                  className="bg-white ml-2 hover:bg-yellow-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow items-center"
                                >
                                  Update
                                </Link>
                              )}
                            </div>
                          </div>
                        </InfoWindowF>
                      )}
                    </MarkerF>
                  );
                }
              )
            : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;

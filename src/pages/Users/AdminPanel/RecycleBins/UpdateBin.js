import React, { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  MarkerF,
  StandaloneSearchBox,
  useLoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import classes from './bins.module.css';

const libraries = [process.env.REACT_APP_GOOGLE_LIB];
const UpdateBin = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
  });

  const [binData, setBinData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [serverError, setServerError] = useState('');
  const [emptyFieldsError, setEmptyFieldsError] = useState('');
  const [typeError, setTypeError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputReference = useRef(); // Ref for StandaloneSearchBox
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlaceChanged = () => {
    const [place] = inputReference.current.getPlaces();
    if (place) {
      setUpdatedData((prevData) => ({
        ...prevData,
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }));

      // Update the marker coordinates
      setCoordinates({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      'Are you sure you want to update this bin?'
    );
    if (confirmed) {
      if (!updatedData.address || !updatedData.type) {
        setEmptyFieldsError('Address and Type fields are required');
        return;
      }

      if (updatedData.type === 'Please Select a type') {
        setTypeError(true);
        return;
      }

      try {
        await axios.put(`/admin/bins/${binData.id}`, updatedData);
        setBinData((prevData) => ({ ...prevData, ...updatedData }));
        setShowSuccessMessage(true); // Show success message
        setEmptyFieldsError(''); // Clear empty fields error
        setTypeError(false); // Clear type error
        setErrorMessage(''); // Clear error message

        // Display a success message alert
        alert('Bin updated successfully!');

        navigate('/admin/bins');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage('A bin with this address and type already exists');
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setServerError(error.response.data.error);
        } else {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const binId = window.location.href.split('/').pop();
        const response = await axios.get(`/admin/bins/${binId}`);
        setBinData(response.data);
        setCoordinates({ lat: response.data.lat, lng: response.data.lng });
        setUpdatedData(response.data); // Initialize updatedData with bin data
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
      <p className="text-lg font-semibold">Update Bin {binData.id}</p>
      <div className="mr-4" style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={coordinates}
          zoom={13}
        >
          <MarkerF position={coordinates} />
        </GoogleMap>
      </div>
      <div className="mt-6 w-96">
        <h2 className="text-lg font-semibold mb-2">Edit Bin Data:</h2>
        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <div>
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
                value={updatedData.address || ''}
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
              value={updatedData.city || ''}
              onChange={handleInputChange}
              readOnly
            />
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
              value={updatedData.lat || ''}
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
              value={updatedData.lng || ''}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-white">
              Type(Select)
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              value={updatedData.type || ''}
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
            <label htmlFor="last_modified" className="block text-white">
              Last Modified
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last_modified"
              name="last_modified"
              value={binData.last_modified || ''}
              readOnly
            />
          </div>
          <div className="col-span-2 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update Bin
            </button>
            {showSuccessMessage && (
              <p className="text-green-600 mt-2">Bin updated successfully!</p>
            )}
            {serverError && (
              <p className="text-red-500 text-sm mt-2">{serverError}</p>
            )}
            {emptyFieldsError && (
              <p className="text-red-500 text-sm mt-2">{emptyFieldsError}</p>
            )}
            {typeError && (
              <p className="text-red-500 text-sm mt-2">
                Please select a valid bin type
              </p>
            )}
            {errorMessage && (
              <p className="text-red-600 mt-2">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBin;

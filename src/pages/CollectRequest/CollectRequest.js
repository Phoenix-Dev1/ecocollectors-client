import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import {
  fetchRequestById,
  updateRequestById,
  formatDate,
  formatTime,
} from './RequestFunctions';
import { useNavigate } from 'react-router-dom';

const CollectRequest = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [center, setCenter] = useState({ lat: 32.79413, lng: 34.98828 });
  const handleCancel = () => {
    navigate('/map');
  };

  const handleNotify = () => {
    const requestId = window.location.href.split('?')[1].split('=')[1];
    updateRequestById(requestId);
    navigate('/map');
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestId = window.location.href.split('?')[1].split('=')[1];
      const data = await fetchRequestById(requestId);
      setRequest(data);
      setCenter({ lat: data.req_lat, lng: data.req_lng }); // Update the center with fetched coordinates
      setIsLoading(false);
      setIsAuthenticated(true); // Change to false if authentication fails
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Authentication Failed / Request does not exist
      </div>
    );
  }

  if (!request) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Request not found
      </div>
    );
  }

  return (
    <div className="bg-gray-600 flex flex-col min-h-screen">
      <main className="text-center">
        <div className="bg-gray-600 p-3 rounded-lg shadow-md mb-2">
          {!isLoaded ? (
            <h1 className="text-xl font-semibold">Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="w-full rounded-lg shadow-md h-96"
              center={center}
              zoom={14}
            >
              <MarkerF
                position={{ lat: request.req_lat, lng: request.req_lng }}
                icon={{
                  url: require(`../../img/icons/${request.type}.png`),
                }}
              />
            </GoogleMap>
          )}
        </div>
        <div className="bg-gray-700 text-white  p-6 rounded-lg shadow-md">
          <p className="mb-2">
            <span className="font-semibold shadow-blue-500/50">
              Request Address:{' '}
            </span>
            {request.req_address}
          </p>
          <p className="mb-2">
            <span className="font-semibold shadow-blue-500/50">
              Bottles Number:{' '}
            </span>
            {request.bottles_number}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Hours: </span>
            {request.from_hour} - {request.to_hour}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Last Updated: </span>
            {formatDate(request.request_date)}{' '}
            {formatTime(request.request_date)}
          </p>
          <div className="mt-8 space-x-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold"
              onClick={handleNotify}
            >
              Notify Recycler
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-semibold"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectRequest;

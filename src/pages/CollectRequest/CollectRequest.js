import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import {
  fetchRequestById,
  updateRequestById,
  formatDate,
  formatTime,
} from './RequestFunctions';
import { useNavigate } from 'react-router-dom';
import { createRequestIcon } from '../../components/map/mapIcons';

import { FiMapPin, FiPackage, FiClock, FiCalendar, FiArrowLeft, FiCheck } from 'react-icons/fi';

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
      try {
        const requestId = window.location.href.split('?')[1].split('=')[1];
        const data = await fetchRequestById(requestId);
        if (data) {
          setRequest(data);
          setCenter({ lat: data.req_lat, lng: data.req_lng });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching request:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-eco-background flex items-center justify-center p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-eco-primary/20 border-t-eco-primary rounded-full animate-spin"></div>
          <p className="text-eco-muted font-medium animate-pulse">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !request) {
    return (
      <div className="min-h-screen bg-eco-background flex items-center justify-center p-6">
        <div className="glass !bg-white/90 p-8 rounded-[2.5rem] shadow-2xl text-center max-w-sm w-full border border-red-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiArrowLeft size={32} />
          </div>
          <h2 className="text-2xl font-black text-eco-text mb-2">Request Error</h2>
          <p className="text-eco-muted mb-8 font-medium">We couldn't find the request or authentication failed.</p>
          <button onClick={handleCancel} className="w-full btn-primary !bg-red-500 hover:!bg-red-600">
            Go Back to Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eco-background py-12 px-4 md:px-0 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-eco-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-eco-secondary/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl animate-fade-in relative z-10">
        <div className="glass !rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-eco-primary/5 border border-white/40">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-eco-text tracking-tight">Collection Request</h1>
            <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-100">
              ID: {window.location.href.split('?')[1]?.split('=')[1]}
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-3xl border-4 border-white shadow-inner h-64 md:h-80 relative group">
            {!isLoaded ? (
              <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
                <FiMapPin className="text-slate-300 w-12 h-12" />
              </div>
            ) : (
              <GoogleMap
                mapContainerClassName="w-full h-full"
                center={center}
                zoom={14}
                options={{
                  disableDefaultUI: true,
                  zoomControl: false,
                  styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }]
                }}
              >
                <MarkerF
                  position={{ lat: request.req_lat, lng: request.req_lng }}
                  icon={{
                    url: createRequestIcon(request.type),
                    scaledSize: new window.google.maps.Size(44, 44),
                    anchor: new window.google.maps.Point(22, 22),
                  }}
                />
              </GoogleMap>
            )}
            <div className="absolute top-4 left-4 glass px-4 py-2 rounded-2xl flex items-center space-x-2 text-sm font-bold text-eco-text">
              <FiMapPin className="text-eco-primary" />
              <span>{request.city || 'Location'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/50 border border-white/20">
                <div className="w-10 h-10 bg-eco-primary/10 text-eco-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiMapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-eco-muted uppercase tracking-widest mb-1">Address</p>
                  <p className="text-eco-text font-bold leading-tight">{request.req_address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/50 border border-white/20">
                <div className="w-10 h-10 bg-eco-primary/10 text-eco-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiPackage size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-eco-muted uppercase tracking-widest mb-1">Quantity</p>
                  <p className="text-eco-text font-bold leading-tight">{request.bottles_number} Bottles</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/50 border border-white/20">
                <div className="w-10 h-10 bg-eco-primary/10 text-eco-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiClock size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-eco-muted uppercase tracking-widest mb-1">Availability</p>
                  <p className="text-eco-text font-bold leading-tight">{request.from_hour} - {request.to_hour}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white/50 border border-white/20">
                <div className="w-10 h-10 bg-eco-primary/10 text-eco-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiCalendar size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-eco-muted uppercase tracking-widest mb-1">Last Update</p>
                  <p className="text-eco-text font-bold leading-tight">
                    {formatDate(request.request_date)} at {formatTime(request.request_date)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-100">
            <button
              onClick={handleNotify}
              className="flex-1 btn-primary !py-4 flex items-center justify-center space-x-2 min-h-[52px] active:scale-[0.98]"
            >
              <FiCheck className="w-5 h-5" />
              <span className="text-lg">Notify Recycler</span>
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-4 rounded-2xl border border-gray-200 text-eco-muted font-bold hover:bg-gray-50 transition-all active:scale-[0.98] min-h-[52px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectRequest;

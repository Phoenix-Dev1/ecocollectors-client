import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const libraries = [process.env.REACT_APP_GOOGLE_LIB];

export const useMapSettings = () => {
  const [center, setCenter] = useState({ lat: 32.79413, lng: 34.98828 });
  const [mapZoom, setMapZoom] = useState(12);
  const [markerWithIdA, setMarkerWithIdA] = useState(0);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: libraries,
    loading: "async",
  });

  const handleRightClick = async (event, setReqLat, setReqLng, setReqAddress, setShowAddWindow) => {
    const latLng = event.latLng;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const newMarker = {
      id: "A",
      lat: lat,
      lng: lng,
      type: "addMarker",
    };

    setMarkerWithIdA(newMarker);
    setReqLat(lat);
    setReqLng(lng);

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      const address = response.data.results[0]?.formatted_address;
      setReqAddress(address);
      setShowAddWindow(true);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  return {
    isLoaded,
    center,
    setCenter,
    mapZoom,
    setMapZoom,
    markerWithIdA,
    setMarkerWithIdA,
    handleRightClick,
  };
};

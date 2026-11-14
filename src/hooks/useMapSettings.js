import { useState } from "react";
import { useGoogleMaps } from "./useGoogleMaps";

export const useMapSettings = () => {
  const [center, setCenter] = useState({ lat: 32.79413, lng: 34.98828 });
  const [mapZoom, setMapZoom] = useState(12);
  const [markerWithIdA, setMarkerWithIdA] = useState(0);

  const { isLoaded } = useGoogleMaps();

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
      // The Maps JavaScript API geocoder works with the website-restricted key
      // (the REST geocode URL used before refuses keys with website restrictions)
      const geocoder = new window.google.maps.Geocoder();
      const { results } = await geocoder.geocode({ location: { lat, lng } });
      const address = results[0]?.formatted_address;
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

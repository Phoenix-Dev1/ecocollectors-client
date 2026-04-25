import { useState, useEffect, useCallback } from "react";
import * as geolib from "geolib";

export const useMapSearch = (markers, setCenter, setMapZoom) => {
  const [searchLat, setSearchLat] = useState(0);
  const [searchLng, setSearchLng] = useState(0);
  const [searchAddress, setSearchAddress] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedMarkerType, setSelectedMarkerType] = useState("");
  const [searchRadius, setSearchRadius] = useState(5000);
  const [searchClicked, setSearchClicked] = useState(false);

  const [debouncedRadius, setDebouncedRadius] = useState(searchRadius);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    return geolib.getDistance(
      { latitude: lat1, longitude: lng1 },
      { latitude: lat2, longitude: lng2 }
    );
  };

  // Debounce logic to prevent "The Radius Flicker"
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRadius(searchRadius);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchRadius]);

  const updateFilteredMarkers = useCallback((radius) => {
    if (searchLat && searchLng) {
      const filtered = markers.filter((marker) => {
        const distance = calculateDistance(searchLat, searchLng, marker.lat, marker.lng);
        return distance <= radius;
      });
      setFilteredMarkers(filtered);
      setSearchPerformed(true);
    }
  }, [searchLat, searchLng, markers]);

  useEffect(() => {
    updateFilteredMarkers(debouncedRadius);
  }, [debouncedRadius, updateFilteredMarkers]);

  const handleSearchCoordinates = useCallback((searchReference) => {
    // Defensive check to prevent "undefined is not iterable" crash
    const places = searchReference.current?.getPlaces();
    
    if (!places || places.length === 0) return;

    const [place] = places;
    if (place) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setSearchAddress(place.formatted_address);
      setSearchLat(lat);
      setSearchLng(lng);
      setCenter({ lat, lng });
      setMapZoom(15);
      setSearchClicked(true);
      setSearchPerformed(true);
    }
  }, [setCenter, setMapZoom]);

  const handleFilterMarkers = useCallback(() => {
    if (searchLat && searchLng) {
      updateFilteredMarkers(searchRadius);
      setCenter({ lat: searchLat, lng: searchLng });
      setMapZoom(15);
      setSearchClicked(true);
    }
  }, [searchLat, searchLng, searchRadius, updateFilteredMarkers, setCenter, setMapZoom]);

  const handleCancelSearch = useCallback(() => {
    setSearchClicked(false);
    setSearchPerformed(false);
    setFilteredMarkers(markers);
    setSearchRadius(5000);
    setSearchAddress("");
  }, [markers]);

  const handleMarkerTypeChange = useCallback((e) => {
    setSelectedMarkerType(e.target.value);
  }, []);

  return {
    searchLat,
    searchLng,
    searchAddress,
    setSearchAddress,
    filteredMarkers,
    searchPerformed,
    selectedMarkerType,
    setSelectedMarkerType,
    searchRadius,
    setSearchRadius,
    searchClicked,
    handleSearchCoordinates,
    handleFilterMarkers,
    handleCancelSearch,
    handleMarkerTypeChange,
  };
};

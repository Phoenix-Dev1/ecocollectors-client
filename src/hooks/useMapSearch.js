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

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    return geolib.getDistance(
      { latitude: lat1, longitude: lng1 },
      { latitude: lat2, longitude: lng2 }
    );
  };

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
    updateFilteredMarkers(searchRadius);
  }, [searchRadius, updateFilteredMarkers]);

  const handleSearchCoordinates = (searchReference) => {
    const [place] = searchReference.current.getPlaces();
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
  };

  const handleFilterMarkers = () => {
    if (searchLat && searchLng) {
      updateFilteredMarkers(searchRadius);
      setCenter({ lat: searchLat, lng: searchLng });
      setMapZoom(15);
      setSearchClicked(true);
    }
  };

  const handleCancelSearch = () => {
    setSearchClicked(false);
    setSearchPerformed(false);
    setFilteredMarkers(markers);
    setSearchRadius(5000);
    setSearchAddress("");
  };

  const handleMarkerTypeChange = (e) => {
    setSelectedMarkerType(e.target.value);
  };

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

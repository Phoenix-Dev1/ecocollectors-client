import React, { useRef, useContext, useMemo, useState, useEffect } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { AuthContext } from "../../context/authContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import classes from "./map.module.css";

// Custom Hooks
import { useMapData } from "../../hooks/useMapData";
import { useMapSettings } from "../../hooks/useMapSettings";
import { useMapActions } from "../../hooks/useMapActions";
import { useMapSearch } from "../../hooks/useMapSearch";

// Sub-components
import RequestMarkers from "./RequestMarkers";
import BinMarkers from "./BinMarkers";
import SearchOverlay from "./SearchOverlay";
import MapControls from "./MapControls";

// Icon Utility
import { createAddMarkerIcon } from "./mapIcons";

/**
 * RADAR PULSE SVG (Search Origin)
 */
const SEARCH_ORIGIN_SVG = `
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="9" fill="#10B981" />
  <circle cx="50" cy="50" r="9" stroke="#10B981" stroke-width="2">
    <animate attributeName="r" from="9" to="46" dur="1.5s" begin="0s" repeatCount="indefinite" />
    <animate attributeName="stroke-opacity" from="0.8" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
  </circle>
  <circle cx="50" cy="50" r="9" stroke="#10B981" stroke-width="2">
    <animate attributeName="r" from="9" to="46" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
    <animate attributeName="stroke-opacity" from="0.8" to="0" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
  </circle>
</svg>`;

const Map = () => {
  const { currentUser } = useContext(AuthContext);
  const searchReference = useRef();
  const inputReference = useRef();
  const formRef = useRef();

  // Local state for temporal search marker visibility
  const [showOriginPin, setShowOriginPin] = useState(false);
  const [mapTypeId, setMapTypeId] = useState("roadmap");

  // Initialize Custom Hooks
  const {
    requests,
    refetchRequests,
    markers,
    markersLoading,
  } = useMapData();

  const {
    isLoaded,
    center,
    setCenter,
    mapZoom,
    setMapZoom,
    markerWithIdA,
    setMarkerWithIdA,
    handleRightClick,
  } = useMapSettings();

  const {
    selectedMarker,
    setSelectedMarker,
    showFilterWindow,
    showAddWindow,
    setShowAddWindow,
    err,
    fullName,
    setFullName,
    bottlesNumber,
    setBottlesNumber,
    setReqLat,
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
  } = useMapActions(currentUser, refetchRequests, setMarkerWithIdA);

  const {
    searchLat,
    searchLng,
    setSearchAddress,
    filteredMarkers,
    searchPerformed,
    selectedMarkerType,
    searchRadius,
    setSearchRadius,
    searchClicked,
    handleSearchCoordinates,
    handleFilterMarkers,
    handleCancelSearch,
    handleMarkerTypeChange,
  } = useMapSearch(markers, setCenter, setMapZoom);

  // Derived State
  const filteredMarkersByType = useMemo(() => {
    const activeMarkers = searchPerformed ? filteredMarkers : markers;
    return selectedMarkerType !== ""
      ? activeMarkers.filter((m) => m.type === selectedMarkerType)
      : activeMarkers;
  }, [searchPerformed, filteredMarkers, markers, selectedMarkerType]);

  /**
   * SEARCH ORIGIN VISIBILITY LIFECYCLE
   * Manages the auto-hide logic for the radar pulse marker.
   */
  useEffect(() => {
    let timeoutId;
    
    // If search is performed and coordinates exist, show the pin
    if (searchPerformed && searchLat && searchLng) {
      setShowOriginPin(true);
      
      // Auto-hide after 8 seconds to declutter the map
      timeoutId = setTimeout(() => {
        setShowOriginPin(false);
      }, 10000);
    }

    // If user clicks a specific bin/request, instantly hide the origin pulse
    if (selectedMarker) {
      setShowOriginPin(false);
      if (timeoutId) clearTimeout(timeoutId);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [searchPerformed, searchLat, searchLng, selectedMarker]);

  const addWindowProps = {
    fullName,
    initialName,
    setFullName,
    bottlesNumber,
    setBottlesNumber,
    inputReference,
    handlePlaceChanged: () => {
      const places = inputReference.current?.getPlaces();
      if (!places || places.length === 0) return;

      const [place] = places;
      if (place) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setReqAddress(place.formatted_address);
        setReqLat(lat);
        setReqLng(lng);
        setCenter({ lat, lng });
        setMapZoom(15);
        setMarkerWithIdA({
          id: "A",
          lat: lat,
          lng: lng,
          type: "addMarker",
        });
      }
    },
    reqAddress,
    setReqAddress,
    phoneNumber,
    setPhoneNumber,
    currentUser,
    fromTime,
    setFromTime,
    toTime,
    setToTime,
    err,
    handleSubmit,
    toggleAddWindow,
    classes,
    form: formRef,
  };

  const filterWindowProps = {
    selectedMarkerType,
    handleMarkerTypeChange,
    toggleFilterWindow,
  };

  const searchOverlayProps = {
    searchReference,
    handleSearchCoordinates,
    setSearchAddress,
    handleFilterMarkers,
    handleCancelSearch,
    searchPerformed,
    searchRadius,
    handleSearchRadiusChange: setSearchRadius,
    searchClicked,
    toggleFilterWindow,
    showFilterWindow,
    toggleAddWindow,
    showAddWindow,
    selectedMarkerType,
    handleMarkerTypeChange,
    currentUser,
    mapTypeId,
    setMapTypeId,
  };

  const controlsProps = {
    toggleFilterWindow,
    showFilterWindow,
    toggleAddWindow,
    showAddWindow,
    currentUser,
    isLoaded,
    handleCancelSearch,
    searchPerformed,
    mapTypeId,
    setMapTypeId,
  };

  if (!isLoaded || markersLoading) return <LoadingPage />;

  return (
    <div className="relative w-full h-[calc(100vh-80px)] bg-slate-50 overflow-hidden">
    <GoogleMap
        onRightClick={(e) =>
          handleRightClick(
            e,
            setReqLat,
            setReqLng,
            setReqAddress,
            setShowAddWindow
          )
        }
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={mapZoom}
        mapTypeId={mapTypeId}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          gestureHandling: "greedy",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        <BinMarkers
          markers={filteredMarkersByType}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          currentUser={currentUser}
          handleShowAddress={handleShowAddress}
          handleOpenGoogleMaps={handleOpenGoogleMaps}
        />

        <RequestMarkers
          requests={requests}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          currentUser={currentUser}
          handleShowAddress={handleShowAddress}
          handleOpenGoogleMaps={handleOpenGoogleMaps}
        />

        {/* Temporal Search Origin Pulse Marker */}
        {showOriginPin && searchLat && searchLng && (
          <MarkerF
            position={{ lat: searchLat, lng: searchLng }}
            icon={{
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(SEARCH_ORIGIN_SVG)}`,
              scaledSize: new window.google.maps.Size(92, 92),
              anchor: new window.google.maps.Point(46, 46),
            }}
            zIndex={0} // Keep it below the bins
          />
        )}

        {markerWithIdA && (
          <MarkerF
            position={markerWithIdA}
            icon={{
              url: createAddMarkerIcon(),
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 25),
            }}
          />
        )}
      </GoogleMap>

      <SearchOverlay 
        {...searchOverlayProps} 
        filterWindowProps={filterWindowProps}
        addWindowProps={addWindowProps}
      />
      <MapControls 
        {...controlsProps} 
        filterWindowProps={filterWindowProps}
        addWindowProps={addWindowProps}
      />
    </div>
  );
};

export default Map;

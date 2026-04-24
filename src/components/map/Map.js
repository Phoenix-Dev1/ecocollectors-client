import React, { useRef, useContext, useMemo } from "react";
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
import FilterWindow from "./FilterWindow";
import AddWindow from "./AddWindow";

// Icon Utility
import { createAddMarkerIcon } from "./mapIcons";

const Map = () => {
  const { currentUser } = useContext(AuthContext);
  const searchReference = useRef();
  const inputReference = useRef();
  const formRef = useRef();

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
  } = useMapActions(currentUser, refetchRequests);

  const {
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

  const addWindowProps = {
    fullName,
    initialName,
    setFullName,
    bottlesNumber,
    setBottlesNumber,
    inputReference,
    handlePlaceChanged: () => {
      const [place] = inputReference.current.getPlaces();
      if (place) {
        setReqAddress(place.formatted_address);
        setReqLat(place.geometry.location.lat());
        setReqLng(place.geometry.location.lng());
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
    handleSubmit: (e) => handleSubmit(e, setMarkerWithIdA),
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
    selectedMarkerType,
    handleMarkerTypeChange,
  };

  const controlsProps = {
    toggleFilterWindow,
    toggleAddWindow,
    currentUser,
    isLoaded,
    handleCancelSearch,
    searchPerformed,
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
        options={{
          disableDefaultUI: true,
          zoomControl: false,
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

      <SearchOverlay {...searchOverlayProps} />
      <MapControls {...controlsProps} />

      {/* Slide-over Overlays */}
      {showFilterWindow && (
        <div className="fixed inset-0 z-[2000] flex items-end md:items-center md:justify-center p-0 md:p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md">
            <FilterWindow {...filterWindowProps} />
          </div>
        </div>
      )}

      {showAddWindow && (
        <div className="fixed inset-0 z-[2000] flex items-end md:items-center md:justify-center p-0 md:p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md">
            <AddWindow {...addWindowProps} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;

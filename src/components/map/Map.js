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
    markersPending,
    markersError,
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
    form: formRef,
  };

  if (markersPending || markersLoading) return <LoadingPage />;
  if (markersError) return <h4>{markersError.message}</h4>;

  return (
    <div className={`${classes.Map} h-[calc(100dvh-64px)] md:h-screen`}>
      <MapControls
        showFilterWindow={showFilterWindow}
        toggleFilterWindow={toggleFilterWindow}
        showAddWindow={showAddWindow}
        toggleAddWindow={toggleAddWindow}
        currentUser={currentUser}
        selectedMarkerType={selectedMarkerType}
        handleMarkerTypeChange={handleMarkerTypeChange}
        addWindowProps={addWindowProps}
        classes={classes}
      />

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
          onRightClick={(e) =>
            handleRightClick(e, setReqLat, setReqLng, setReqAddress, setShowAddWindow)
          }
        >
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

          <SearchOverlay
            searchReference={searchReference}
            handleSearchCoordinates={handleSearchCoordinates}
            setSearchAddress={setSearchAddress}
            handleCancelSearch={handleCancelSearch}
            handleFilterMarkers={handleFilterMarkers}
            searchClicked={searchClicked}
            searchRadius={searchRadius}
            handleSearchRadiusChange={setSearchRadius}
            classes={classes}
            toggleFilterWindow={toggleFilterWindow}
            showFilterWindow={showFilterWindow}
            selectedMarkerType={selectedMarkerType}
            handleMarkerTypeChange={handleMarkerTypeChange}
          />

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
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;

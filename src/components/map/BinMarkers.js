import React from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { formatDate, typeDescriptions, typeColors } from "./mapFunctions";

const BinMarkers = ({ markers, selectedMarker, setSelectedMarker, currentUser, handleShowAddress, handleOpenGoogleMaps }) => {
  return (
    <>
      {Array.isArray(markers) &&
        markers.map(({ id, lat, lng, type, address, last_modified }, index) => {
          const markerClicked = selectedMarker === address;
          const isAdmin = currentUser?.role === 1;

          return (
            <MarkerF
              key={`bin-${id || `${lat}-${lng}-${index}`}`}
              position={{ lat, lng }}
              icon={{
                url: require(`../../img/icons/${type}.png`),
              }}
              onClick={() => handleShowAddress(address)}
            >
              {markerClicked && (
                <InfoWindowF
                  onCloseClick={() => setSelectedMarker(null)}
                  disableAutoClose={true}
                >
                  <div className="p-2 min-w-[260px]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-eco-text truncate max-w-[180px]" title={address}>
                        {address}
                      </h3>
                      <div className={`p-2 rounded-xl bg-opacity-10 ${
                        type === 'plastic' ? 'bg-blue-500' : 
                        type === 'glass' ? 'bg-green-500' : 
                        type === 'paper' ? 'bg-orange-500' : 'bg-eco-primary'
                      }`}>
                         <img src={require(`../../img/icons/${type}.png`)} className="w-5 h-5 object-contain" alt={type} />
                      </div>
                    </div>
                    
                    <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className={`text-sm font-bold mb-2 ${typeColors[type] || 'text-eco-primary'}`}>
                        {typeDescriptions[type]}
                      </p>
                      <div className="flex items-center space-x-2 text-eco-muted">
                        <i className="fa fa-clock-o text-xs"></i>
                        <p className="text-[10px] font-medium uppercase tracking-tight">
                          Updated: {formatDate(last_modified)}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        className="flex-1 py-2.5 bg-eco-primary text-white font-bold text-xs rounded-xl hover:bg-eco-secondary transition-all shadow-md flex items-center justify-center space-x-2"
                        onClick={() => handleOpenGoogleMaps(lat, lng)}
                      >
                        <i className="fa fa-location-arrow"></i>
                        <span>Navigate</span>
                      </button>
                      {isAdmin && (
                        <Link
                          to={`/admin/update-bin/${id}`}
                          className="p-2.5 bg-white border border-gray-200 text-eco-text rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
                          title="Update Bin"
                        >
                          <i className="fa fa-pencil"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          );
        })}
    </>
  );
};

export default BinMarkers;

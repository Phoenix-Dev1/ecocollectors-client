import React from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FiNavigation } from "react-icons/fi";
import { formatDate, typeDescriptions, typeColors } from "./mapFunctions";
import { createMarkerIcon } from "./mapIcons";

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
                url: createMarkerIcon(type),
                scaledSize: new window.google.maps.Size(40, 40),
                anchor: new window.google.maps.Point(20, 20),
              }}
              onClick={() => handleShowAddress(address)}
            >
              {markerClicked && (
                <InfoWindowF
                  onCloseClick={() => setSelectedMarker(null)}
                  disableAutoClose={true}
                >
                  <div className="p-2 min-w-[260px] animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-eco-muted uppercase tracking-[0.2em] mb-1">Location Details</span>
                        <h3 className="text-lg font-black text-eco-text truncate max-w-[180px]" title={address}>
                          {address.split(',')[0]}
                        </h3>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white/50 ${
                        type === 'plastic' || type === 'orange' ? 'bg-orange-50' : 
                        type === 'glass' || type === 'purple' ? 'bg-purple-50' : 
                        type === 'paper' || type === 'blue' ? 'bg-blue-50' : 
                        type === 'textile' ? 'bg-lime-50' :
                        type === 'electronic-waste' ? 'bg-red-50' : 'bg-emerald-50'
                      }`}>
                         <div className={`w-3 h-3 rounded-full ${
                           type === 'plastic' || type === 'orange' ? 'bg-orange-500' : 
                           type === 'glass' || type === 'purple' ? 'bg-purple-500' : 
                           type === 'paper' || type === 'blue' ? 'bg-blue-500' : 
                           type === 'textile' ? 'bg-lime-600' :
                           type === 'electronic-waste' ? 'bg-red-500' : 'bg-emerald-500'
                         }`}></div>
                      </div>
                    </div>
                    
                    <div className="mb-6 p-5 bg-slate-50/50 backdrop-blur-sm rounded-[1.5rem] border border-slate-100">
                      <p className={`text-sm font-black uppercase tracking-wider mb-2 ${typeColors[type] || 'text-eco-primary'}`}>
                        {typeDescriptions[type]}
                      </p>
                      <div className="flex items-center space-x-2 text-eco-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <p className="text-[10px] font-bold uppercase tracking-tight">
                          Last Updated: {formatDate(last_modified)}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-3 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all shadow-md flex items-center justify-center gap-2 group active:scale-95"
                        onClick={() => handleOpenGoogleMaps(lat, lng)}
                      >
                        <FiNavigation size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>Navigate</span>
                      </button>
                      {isAdmin && (
                        <Link
                          to={`/admin/update-bin/${id}`}
                          className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                          title="Update Bin Information"
                        >
                          <AiOutlineEdit size={20} />
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

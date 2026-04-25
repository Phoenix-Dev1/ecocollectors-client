import React, { useMemo, useEffect, useRef, useState } from "react";
import { InfoWindowF, useGoogleMap } from "@react-google-maps/api";
import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { FiNavigation } from "react-icons/fi";
import { formatDate, typeDescriptions, typeColors } from "./mapFunctions";
import { createMarkerIcon } from "./mapIcons";

/**
 * CLUSTER DESIGN (Emerald Green SVG)
 */
const CLUSTER_SVG = `
<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="28" fill="#10B981" fill-opacity="0.1" />
  <circle cx="30" cy="30" r="22" fill="#10B981" fill-opacity="0.9" stroke="white" stroke-width="2" />
  <circle cx="30" cy="30" r="16" fill="#059669" />
</svg>`;

const CLUSTER_ICON_URL = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(CLUSTER_SVG.trim())}`;

const BinMarkers = ({ markers, selectedMarker, setSelectedMarker, currentUser, handleShowAddress, handleOpenGoogleMaps }) => {
  const map = useGoogleMap();
  const clustererRef = useRef(null);
  const markersRef = useRef([]); 
  
  const [activeBin, setActiveBin] = useState(null);

  // Clean and validate markers
  const validMarkers = useMemo(() => {
    if (!Array.isArray(markers)) return [];
    return markers.filter(m => !isNaN(parseFloat(m.lat)) && !isNaN(parseFloat(m.lng)));
  }, [markers]);

  /**
   * 1. STABLE CLUSTERER INITIALIZATION
   */
  useEffect(() => {
    if (!map || clustererRef.current) return;

    clustererRef.current = new MarkerClusterer({
      map,
      markers: [],
      algorithm: new SuperClusterAlgorithm({ 
        radius: 40,
        maxZoom: 14 
      }),
      renderer: {
        render: ({ count, position }) => {
          return new window.google.maps.Marker({
            position,
            icon: {
              url: CLUSTER_ICON_URL,
              scaledSize: new window.google.maps.Size(60, 60),
              anchor: new window.google.maps.Point(30, 30),
            },
            label: {
              text: String(count),
              color: "white",
              fontSize: "14px",
              fontWeight: "900",
            },
            zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + 1,
          });
        }
      }
    });

    return () => {
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
        clustererRef.current.setMap(null);
        clustererRef.current = null;
      }
    };
  }, [map]);

  /**
   * 2. STABLE MARKER LIFECYCLE (PATCHED FOR FLICKER & MEMORY LEAKS)
   */
  useEffect(() => {
    if (!map || !clustererRef.current) return;

    // 1. Prepare new markers FIRST (minimizes the empty-map window)
    const newMarkers = validMarkers.map(binData => {
      const marker = new window.google.maps.Marker({
        position: { lat: Number(binData.lat), lng: Number(binData.lng) },
        map: map, // Explicit attachment prevents the "vanishing" bug
        icon: {
          url: createMarkerIcon(binData.type),
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        },
      });

      marker.addListener("click", () => {
        handleShowAddress(binData.address);
        setActiveBin(binData);
      });

      return marker;
    });

    // 2. Helper to purge existing markers and their listeners from memory
    const clearExistingMarkers = () => {
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(m => {
          window.google.maps.event.clearInstanceListeners(m);
          m.setMap(null);
        });
        markersRef.current = [];
      }
      if (clustererRef.current) {
        clustererRef.current.clearMarkers();
      }
    };

    // 3. Swap markers (happens in a single execution block)
    clearExistingMarkers();
    
    if (newMarkers.length > 0) {
      markersRef.current = newMarkers;
      clustererRef.current.addMarkers(newMarkers);
    }

    // CLEANUP ON UNMOUNT
    return () => clearExistingMarkers();

  }, [map, validMarkers, handleShowAddress]);

  // Sync InfoWindow state
  useEffect(() => {
    if (!selectedMarker) {
      setActiveBin(null);
    } else {
      const bin = validMarkers.find(m => m.address === selectedMarker);
      if (bin) setActiveBin(bin);
    }
  }, [selectedMarker, validMarkers, setSelectedMarker]);

  return (
    <>
      {activeBin && (
        <InfoWindowF
          position={{ lat: Number(activeBin.lat), lng: Number(activeBin.lng) }}
          onCloseClick={() => {
            setSelectedMarker(null);
            setActiveBin(null);
          }}
          options={{ disableAutoClose: true }}
        >
          <div className="p-2 min-w-[260px] animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-eco-muted uppercase tracking-[0.2em] mb-1">Location Details</span>
                <h3 className="text-lg font-black text-eco-text truncate max-w-[180px]" title={activeBin.address}>
                  {activeBin.address.split(',')[0]}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white/50 ${
                activeBin.type === 'plastic' || activeBin.type === 'orange' ? 'bg-orange-50' : 
                activeBin.type === 'glass' || activeBin.type === 'purple' ? 'bg-purple-50' : 
                activeBin.type === 'paper' || activeBin.type === 'blue' ? 'bg-blue-50' : 
                activeBin.type === 'textile' ? 'bg-lime-50' :
                activeBin.type === 'electronic-waste' ? 'bg-red-50' : 'bg-emerald-50'
              }`}>
                 <div className={`w-3 h-3 rounded-full ${
                   activeBin.type === 'plastic' || activeBin.type === 'orange' ? 'bg-orange-500' : 
                   activeBin.type === 'glass' || activeBin.type === 'purple' ? 'bg-purple-500' : 
                   activeBin.type === 'paper' || activeBin.type === 'blue' ? 'bg-blue-500' : 
                   activeBin.type === 'textile' ? 'bg-lime-600' :
                   activeBin.type === 'electronic-waste' ? 'bg-red-500' : 'bg-emerald-500'
                 }`}></div>
              </div>
            </div>
            
            <div className="mb-6 p-5 bg-slate-50/50 backdrop-blur-sm rounded-[1.5rem] border border-slate-100">
              <p className={`text-sm font-black uppercase tracking-wider mb-2 ${typeColors[activeBin.type] || 'text-eco-primary'}`}>
                {typeDescriptions[activeBin.type]}
              </p>
              <div className="flex items-center space-x-2 text-eco-muted">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                <p className="text-[10px] font-bold uppercase tracking-tight">
                  Last Updated: {formatDate(activeBin.last_modified)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 py-3 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all shadow-md flex items-center justify-center gap-2 group active:scale-95"
                onClick={() => handleOpenGoogleMaps(activeBin.lat, activeBin.lng)}
              >
                <FiNavigation size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span>Navigate</span>
              </button>
              {currentUser?.role === 1 && (
                <Link
                  to={`/admin/update-bin/${activeBin.id}`}
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
    </>
  );
};

export default BinMarkers;

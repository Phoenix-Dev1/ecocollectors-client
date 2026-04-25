import React from "react";
import { VscFilter } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa";
import { RiMap2Line, RiGlobeLine, RiLandscapeLine } from "react-icons/ri";
import FilterWindow from "./FilterWindow";
import AddWindow from "./AddWindow";

const MapControls = ({
  showFilterWindow,
  toggleFilterWindow,
  showAddWindow,
  toggleAddWindow,
  currentUser,
  selectedMarkerType,
  handleMarkerTypeChange,
  addWindowProps,
  filterWindowProps,
  classes,
  mapTypeId,
  setMapTypeId,
}) => {
  const [showLayersMenu, setShowLayersMenu] = React.useState(false);

  const mapTypes = [
    { id: "roadmap", label: "Standard", icon: <RiMap2Line size={20} /> },
    { id: "hybrid", label: "Satellite", icon: <RiGlobeLine size={20} /> },
    { id: "terrain", label: "Terrain", icon: <RiLandscapeLine size={20} /> },
  ];

  return (
    <>
      {/* Dimmed backdrop for mobile modals */}
      {(showFilterWindow || showAddWindow || showLayersMenu) && (
        <div 
          className="fixed inset-0 z-[900]"
          onClick={() => {
            if (showFilterWindow) toggleFilterWindow();
            if (showAddWindow) toggleAddWindow();
            if (showLayersMenu) setShowLayersMenu(false);
          }}
        />
      )}

      <div className="fixed bottom-6 right-4 md:absolute md:bottom-8 md:left-6 md:top-auto md:right-auto z-[1000] flex flex-col gap-3">
        {/* Map Type Menu (Layers) */}
        <div className="relative flex flex-row-reverse md:flex-col items-center md:items-start gap-2">
          <button 
            onClick={() => setShowLayersMenu(!showLayersMenu)}
            className={`w-14 h-14 rounded-full md:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md active:scale-95 hover:scale-105 border border-white/40 ${
              showLayersMenu ? 'bg-emerald-600 text-white' : 'bg-white/90 text-slate-600'
            }`}
            title="Map Layers"
          >
            <RiMap2Line size={24} />
          </button>

          {showLayersMenu && (
            <div className="absolute bottom-0 right-full mr-2 md:right-auto md:bottom-full md:left-0 md:mr-0 md:mb-2 flex flex-row-reverse md:flex-col gap-2 animate-fade-in md:animate-fade-in-up">
              {mapTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setMapTypeId(type.id);
                    setShowLayersMenu(false);
                  }}
                  className={`w-14 h-14 rounded-full md:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-md border border-white/40 group ${
                    mapTypeId === type.id 
                      ? 'bg-emerald-500 text-white border-emerald-400' 
                      : 'bg-white/90 text-slate-600 hover:bg-white hover:text-emerald-500'
                  }`}
                >
                  {type.icon}
                  <span className="text-[10px] font-bold mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter FAB - Mobile Only */}
        <button 
          onClick={toggleFilterWindow}
          className={`md:hidden w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-md active:scale-95 hover:scale-105 ${
            showFilterWindow ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-600 border border-white/50'
          }`}
          title="Filter Bins"
        >
          <VscFilter size={24} />
        </button>

        {/* Add FAB - Mobile Only */}
        {currentUser && (
          <button 
            onClick={toggleAddWindow}
            className={`md:hidden w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 hover:scale-105 shadow-xl shadow-emerald-500/30 ${
              showAddWindow ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
            }`}
            title="New Request"
          >
            <FaPlus size={22} />
          </button>
        )}
      </div>

      {/* Window Overlays - Mobile Bottom Sheet */}
      {showFilterWindow && (
        <div 
          className="fixed bottom-0 inset-x-0 z-[1000] md:hidden animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <FilterWindow {...filterWindowProps} />
        </div>
      )}
      {showAddWindow && (
        <div 
          className="fixed bottom-0 inset-x-0 z-[1000] md:hidden animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <AddWindow {...addWindowProps} />
        </div>
      )}
    </>
  );
};

export default MapControls;

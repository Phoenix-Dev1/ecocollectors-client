import React from "react";
import { VscFilter } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa";
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
}) => {
  return (
    <>
      {/* Dimmed backdrop for mobile modals */}
      {(showFilterWindow || showAddWindow) && (
        <div 
          className="fixed inset-0 z-[900] md:hidden"
          onClick={() => {
            if (showFilterWindow) toggleFilterWindow();
            if (showAddWindow) toggleAddWindow();
          }}
        />
      )}

      <div className="fixed bottom-6 right-4 md:absolute md:bottom-auto md:top-24 z-[500] flex flex-col gap-3">
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

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
  classes,
}) => {
  return (
    <div className="absolute top-24 right-6 z-[500] flex flex-col space-y-4">
      {/* Filter FAB */}
      <button 
        onClick={toggleFilterWindow}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 hover:scale-105 ${
          showFilterWindow ? 'bg-eco-primary text-white' : 'bg-white text-eco-text hover:bg-eco-background'
        }`}
        title="Filter Bins"
      >
        <VscFilter size={24} />
      </button>

      {/* Add FAB */}
      {currentUser && (
        <button 
          onClick={toggleAddWindow}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 hover:scale-105 ${
            showAddWindow ? 'bg-eco-accent text-white' : 'bg-white text-eco-accent hover:bg-eco-background'
          }`}
          title="New Request"
        >
          <FaPlus size={24} />
        </button>
      )}

      {/* Window Overlays */}
      {showFilterWindow && (
        <div className="absolute top-0 right-20 w-72 animate-fade-in">
          <FilterWindow
            selectedMarkerType={selectedMarkerType}
            handleMarkerTypeChange={handleMarkerTypeChange}
            toggleFilterWindow={toggleFilterWindow}
            classes={classes}
          />
        </div>
      )}
      {showAddWindow && (
        <div className="absolute top-0 right-20 w-[400px] animate-fade-in">
           <AddWindow {...addWindowProps} toggleAddWindow={toggleAddWindow} classes={classes} />
        </div>
      )}
    </div>
  );
};

export default MapControls;

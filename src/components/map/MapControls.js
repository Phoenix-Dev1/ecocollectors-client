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

      <div className="absolute bottom-48 right-6 md:bottom-auto md:top-24 z-[500] flex flex-col space-y-4">
        {/* Filter FAB - Mobile Only (Migrated to Search Island on Desktop) */}
        <button 
          onClick={toggleFilterWindow}
          className={`md:hidden w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl active:scale-95 hover:scale-105 ${
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

        {/* Window Overlays - Mobile Bottom Sheet / Desktop Floating Card */}
        {showFilterWindow && (
          <div className="fixed bottom-0 inset-x-0 z-[1000] md:hidden animate-slide-up">
            <FilterWindow
              selectedMarkerType={selectedMarkerType}
              handleMarkerTypeChange={handleMarkerTypeChange}
              toggleFilterWindow={toggleFilterWindow}
            />
          </div>
        )}
        {showAddWindow && (
          <div className="fixed bottom-0 inset-x-0 z-[1000] md:absolute md:inset-auto md:top-0 md:right-20 w-full md:w-[400px] animate-slide-up md:animate-fade-in">
            <AddWindow {...addWindowProps} toggleAddWindow={toggleAddWindow} />
          </div>
        )}
      </div>
    </>
  );
};

export default MapControls;

import React from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { VscFilter } from "react-icons/vsc";
import FilterWindow from "./FilterWindow";

const SearchOverlay = ({
  searchReference,
  handleSearchCoordinates,
  setSearchAddress,
  handleCancelSearch,
  handleFilterMarkers,
  searchClicked,
  searchRadius,
  handleSearchRadiusChange,
  toggleFilterWindow,
  showFilterWindow,
  selectedMarkerType,
  handleMarkerTypeChange,
}) => {
  return (
    <div className="absolute top-16 md:top-6 left-4 md:left-1/2 md:-translate-x-1/2 z-[100] w-[calc(100%-2rem)] md:w-auto md:min-w-[700px]">
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-white/90 backdrop-blur-md rounded-full flex items-center p-1.5 pl-5 shadow-xl border border-white/40 transition-all duration-300 focus-within:ring-2 focus-within:ring-emerald-500/50">
          <AiOutlineSearch className="text-eco-muted w-6 h-6 mr-3 flex-shrink-0" />
          
          <div className="flex-1">
            <StandaloneSearchBox
              onLoad={(ref) => (searchReference.current = ref)}
              onPlacesChanged={() => handleSearchCoordinates(searchReference)}
            >
              <input
                type="text"
                className="w-full bg-transparent border-none focus:ring-0 text-base font-medium text-eco-text placeholder:text-eco-muted py-2"
                placeholder="Search recycling bins near you..."
                onChange={(e) => setSearchAddress(e.target.value)}
                required
              />
            </StandaloneSearchBox>
          </div>

          <div className="flex items-center pr-1.5 space-x-2">
            {searchClicked && (
              <button 
                type="button" 
                onClick={handleCancelSearch}
                className="p-2 text-eco-muted hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Clear search"
              >
                <AiOutlineClose size={20} />
              </button>
            )}
            <button 
              type="button" 
              onClick={handleFilterMarkers}
              className="flex items-center justify-center w-11 h-11 bg-eco-primary text-white rounded-full hover:bg-emerald-600 transition-all shadow-md active:scale-95 flex-shrink-0"
              title="Search"
            >
              <AiOutlineSearch size={22} />
            </button>
          </div>
        </div>

        {/* Desktop Filter Button (Control Island) */}
        <div className="hidden md:block relative">
          <button 
            onClick={toggleFilterWindow}
            className={`flex w-14 h-14 bg-white/90 backdrop-blur-md rounded-2xl items-center justify-center transition-all duration-300 shadow-xl border border-white/40 active:scale-95 hover:scale-105 group ${
              showFilterWindow || selectedMarkerType !== "" ? 'border-emerald-500/30 ring-2 ring-emerald-500/10' : ''
            }`}
            title="Filter Bins"
          >
            <VscFilter 
              size={24} 
              className={`transition-colors ${
                showFilterWindow || selectedMarkerType !== "" ? 'text-eco-primary' : 'text-eco-text group-hover:text-eco-primary'
              }`} 
            />
          </button>

          {/* Desktop Filter Dropdown */}
          {showFilterWindow && (
            <div className="absolute top-[4.5rem] right-0 w-72 z-[200] animate-fade-in">
              <FilterWindow
                selectedMarkerType={selectedMarkerType}
                handleMarkerTypeChange={handleMarkerTypeChange}
                toggleFilterWindow={toggleFilterWindow}
              />
            </div>
          )}
        </div>
      </div>

      {searchClicked && (
        <div className="mt-4 mx-auto max-w-md bg-white/90 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-4 animate-fade-in shadow-lg border border-white/40">
          <span className="text-xs font-black text-eco-text uppercase tracking-wider whitespace-nowrap">Search Radius</span>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={searchRadius}
            onChange={(e) => handleSearchRadiusChange(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-eco-primary"
          />
          <span className="bg-emerald-50 px-3 py-1 rounded-xl text-xs font-black text-emerald-700 border border-emerald-100">
            {searchRadius}m
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchOverlay;

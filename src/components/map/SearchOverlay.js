import React from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";

const SearchOverlay = ({
  searchReference,
  handleSearchCoordinates,
  setSearchAddress,
  handleCancelSearch,
  handleFilterMarkers,
  searchClicked,
  searchRadius,
  handleSearchRadiusChange,
  classes,
}) => {
  return (
    <>
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4">
      <div className="glass !rounded-3xl flex items-center p-2 pl-4 space-x-2 transition-all duration-300 focus-within:shadow-glass-lg focus-within:border-eco-primary/30">
        <StandaloneSearchBox
          onLoad={(ref) => (searchReference.current = ref)}
          onPlacesChanged={() => handleSearchCoordinates(searchReference)}
        >
          <input
            type="text"
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-eco-text placeholder:text-eco-muted"
            placeholder="Search recycling bins near you..."
            onChange={(e) => setSearchAddress(e.target.value)}
            required
          />
        </StandaloneSearchBox>
        <div className="flex items-center pr-2 border-l border-gray-200 ml-2">
          <button 
            type="button" 
            onClick={handleCancelSearch}
            className="p-2 text-eco-muted hover:text-red-500 transition-colors"
            title="Clear search"
          >
            <i className="fa fa-times text-lg"></i>
          </button>
          <button 
            type="button" 
            onClick={handleFilterMarkers}
            className="p-2 bg-eco-primary text-white rounded-2xl hover:bg-eco-secondary transition-all shadow-md active:scale-95"
            title="Search"
          >
            <i className="fa fa-search text-lg"></i>
          </button>
        </div>
      </div>

      {searchClicked && (
        <div className="mt-4 glass !rounded-2xl p-4 flex items-center space-x-4 animate-fade-in">
          <span className="text-xs font-bold text-eco-muted uppercase tracking-wider whitespace-nowrap">Radius</span>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={searchRadius}
            onChange={(e) => handleSearchRadiusChange(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-eco-primary"
          />
          <span className="bg-eco-background px-3 py-1 rounded-xl text-xs font-bold text-eco-primary border border-eco-primary/20">
            {searchRadius}m
          </span>
        </div>
      )}
    </div>
    </>
  );
};

export default SearchOverlay;

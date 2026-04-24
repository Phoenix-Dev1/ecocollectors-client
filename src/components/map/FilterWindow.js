import React from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const FilterWindow = ({
  selectedMarkerType,
  handleMarkerTypeChange,
  toggleFilterWindow,
}) => {
  const filterOptions = [
    { value: "", label: "All Bins", color: null },
    { value: "request", label: "Recycle Requests", color: "bg-red-500" },
    { value: "blue", label: "Blue (Paper)", color: "bg-blue-500" },
    { value: "carton", label: "Carton (Beverage)", color: "bg-yellow-700" },
    { value: "electronic-waste", label: "Electronic Waste", color: "bg-gray-800" },
    { value: "orange", label: "Orange (Packaging)", color: "bg-orange-500" },
    { value: "purple", label: "Purple (Glass)", color: "bg-purple-600" },
    { value: "textile", label: "Textile / Clothing", color: "bg-green-800" },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-fade-in relative">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-eco-background/50">
        <h3 className="text-sm font-black text-eco-text uppercase tracking-widest">Filter by Type</h3>
        <button 
          onClick={toggleFilterWindow}
          className="p-1.5 hover:bg-gray-100 rounded-full text-eco-muted transition-colors"
        >
          <AiOutlineClose size={18} />
        </button>
      </div>
      
      <ul className="py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {filterOptions.map((option) => (
          <li
            key={option.value}
            className={`px-5 py-3.5 flex items-center justify-between cursor-pointer transition-all duration-200 group ${
              selectedMarkerType === option.value 
                ? "bg-emerald-50/80 text-emerald-700" 
                : "text-eco-text hover:bg-gray-50"
            }`}
            onClick={() => handleMarkerTypeChange({ target: { value: option.value } })}
          >
            <div className="flex items-center space-x-3">
              {option.color ? (
                <span className={`w-3 h-3 rounded-full ${option.color} shadow-sm`}></span>
              ) : (
                <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-400"></span>
              )}
              <span className={`text-sm font-bold ${selectedMarkerType === option.value ? "text-emerald-800" : "text-eco-text"}`}>
                {option.label}
              </span>
            </div>
            
            {selectedMarkerType === option.value && (
              <AiOutlineCheck className="text-emerald-600 animate-scale-in" size={16} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterWindow;

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
    <div className="bg-white md:bg-white/95 md:backdrop-blur-md rounded-t-[2.5rem] rounded-b-none md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-slide-up md:animate-fade-in relative pt-2 md:pt-0">
      {/* Mobile Drag Handle */}
      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-2 mb-1 md:hidden" />
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white md:bg-transparent">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Filter by Type</h3>
        <button 
          onClick={toggleFilterWindow}
          className="p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-full text-slate-400 transition-all"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>
      
      <ul className="p-3 space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
        {filterOptions.map((option) => (
          <li
            key={option.value}
            className={`px-4 py-3 flex items-center justify-between cursor-pointer transition-all duration-200 rounded-xl group ${
              selectedMarkerType === option.value 
                ? "bg-emerald-50 text-emerald-900" 
                : "text-slate-600 hover:bg-slate-50"
            }`}
            onClick={() => handleMarkerTypeChange({ target: { value: option.value } })}
          >
            <div className="flex items-center space-x-3">
              {option.color ? (
                <span className={`w-3.5 h-3.5 rounded-full ${option.color} shadow-sm ring-2 ring-white`}></span>
              ) : (
                <span className="w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-300 ring-2 ring-white"></span>
              )}
              <span className={`text-sm font-bold ${selectedMarkerType === option.value ? "text-emerald-900" : "text-slate-700"}`}>
                {option.label}
              </span>
            </div>
            
            {selectedMarkerType === option.value && (
              <AiOutlineCheck className="text-emerald-600 animate-scale-in" size={18} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterWindow;

import React from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { AiOutlineClose } from "react-icons/ai";

const AddWindow = ({
  fullName,
  initialName,
  setFullName,
  bottlesNumber,
  setBottlesNumber,
  inputReference,
  handlePlaceChanged,
  reqAddress,
  setReqAddress,
  phoneNumber,
  setPhoneNumber,
  currentUser,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  err,
  handleSubmit,
  toggleAddWindow,
  classes,
  form,
}) => {
  return (
    <div className="bg-white md:bg-white/95 md:backdrop-blur-md rounded-t-[2.5rem] rounded-b-none md:rounded-3xl shadow-2xl border border-white/50 overflow-hidden animate-slide-up md:animate-fade-in relative pt-2 md:pt-0">
      {/* Mobile Drag Handle */}
      <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-2 mb-1 md:hidden" />
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-eco-background/50">
        <h3 className="text-sm font-black text-eco-text uppercase tracking-widest">New Request</h3>
        <button 
          onClick={toggleAddWindow}
          className="p-1.5 hover:bg-gray-100 rounded-full text-eco-muted transition-colors"
        >
          <AiOutlineClose size={18} />
        </button>
      </div>

      <form ref={form} id="addRequest" onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <div className="space-y-1.5">
          <label htmlFor="full_name" className="block text-xs font-black text-eco-text uppercase tracking-wider ml-1">
            Full Name
          </label>
          <input
            name="full_name"
            id="full_name"
            value={fullName || initialName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all font-medium min-h-[44px]"
            placeholder={!currentUser ? "Enter your full name" : initialName}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="number_of_bottles" className="block text-xs font-black text-eco-text uppercase tracking-wider ml-1">
            Bottles
          </label>
          <input
            onChange={(e) => setBottlesNumber(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all font-medium min-h-[44px]"
            placeholder="0"
            id="number_of_bottles"
            name="number_of_bottles"
            value={bottlesNumber}
            type="number"
            min="1"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="req_address" className="block text-xs font-black text-eco-text uppercase tracking-wider ml-1">
            Address
          </label>
          <StandaloneSearchBox
            onLoad={(ref) => (inputReference.current = ref)}
            onPlacesChanged={handlePlaceChanged}
          >
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all font-medium min-h-[44px]"
              placeholder="Search or Right-Click Map"
              ref={inputReference}
              value={reqAddress}
              onChange={(e) => setReqAddress(e.target.value)}
              required
            />
          </StandaloneSearchBox>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phoneNumber" className="block text-xs font-black text-eco-text uppercase tracking-wider ml-1">
            Phone number
          </label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all font-medium min-h-[44px]"
            placeholder="Enter your number"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber || currentUser?.phone || ""}
            type="tel"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="from_hour" className="block text-xs font-black text-eco-text uppercase tracking-wider ml-1">
              From
            </label>
            <input
              onChange={(e) => setFromTime(e.target.value)}
              id="from_hour"
              name="from_hour"
              type="time"
              value={fromTime}
              className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all font-medium min-h-[44px]"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="to_hour" className="block text-xs font-black text-eco-text uppercase tracking-wider ml-1">
              To
            </label>
            <input
              onChange={(e) => setToTime(e.target.value)}
              id="to_hour"
              name="to_hour"
              type="time"
              value={toTime}
              className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 focus:border-eco-primary focus:ring-4 focus:ring-eco-primary/10 outline-none transition-all font-medium min-h-[44px]"
              required
            />
          </div>
        </div>

        {err && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold text-center border border-red-100 animate-shake">
            {err}
          </div>
        )}

        <button 
          type="submit"
          className="w-full py-3.5 bg-eco-accent text-white rounded-xl font-black uppercase tracking-widest hover:bg-eco-accent/90 transition-all shadow-lg active:scale-95 min-h-[48px]"
        >
          Add Request
        </button>
      </form>
    </div>
  );
};

export default AddWindow;

import React from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { AiOutlineClose } from 'react-icons/ai';

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
    <div className={classes.addForm}>
      <form ref={form} id="addRequest" onSubmit={handleSubmit} action="#">
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-black">
            Full Name
          </label>
          <input
            name="full_name"
            id="full_name"
            value={fullName || initialName} // Use fullName or initialName as the value
            onChange={(e) => setFullName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={!currentUser ? 'Enter your full name' : initialName}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="number_of_bottles" className="block text-black">
            Bottles
          </label>
          <input
            onChange={(e) => setBottlesNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="0"
            id="number_of_bottles"
            name="number_of_bottles"
            value={bottlesNumber}
            type="number"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="req_address" className="block text-black">
            Address
          </label>
          <StandaloneSearchBox
            onLoad={(ref) => (inputReference.current = ref)}
            onPlacesChanged={handlePlaceChanged}
          >
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Location"
              ref={inputReference}
              value={reqAddress}
              onChange={(e) => setReqAddress(e.target.value)}
              required
            />
          </StandaloneSearchBox>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-black">
            Phone number
          </label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your number"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber || currentUser?.phone || ''} // Set initial value
            type="tel"
            required
          />
        </div>
        <div className="flex mb-4">
          <div className="mr-4">
            <label htmlFor="from_hour" className="block text-black">
              From
            </label>
            <input
              onChange={(e) => setFromTime(e.target.value)}
              id="from_hour"
              name="from_hour"
              type="time"
              value={fromTime}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="to_hour" className="block text-black">
              To
            </label>
            <input
              onChange={(e) => setToTime(e.target.value)}
              id="to_hour"
              name="to_hour"
              type="time"
              value={toTime}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
        </div>
        {err && (
          <p className="flex items-center justify-center text-sm text-red-700 font-semibold mb-2">
            {err}
          </p>
        )}
        <button className="text-white bg-blue-600 py-2 px-4 rounded hover:bg-blue-800 ml-11">
          Add Request
        </button>
      </form>
      <div className={classes.closeAddWindow} onClick={toggleAddWindow}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default AddWindow;

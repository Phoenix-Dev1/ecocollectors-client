import axios from "axios";

// Utils
// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Recycle Bins
export async function fetchAllRecycleBins(typeFilter = null) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/admin/recycleBins`,
      {
        params: { type: typeFilter }, // Pass the type filter to the API
        withCredentials: true, // ✅ Ensure JWT is sent
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Deactivate bin
export async function deactivateBin(binId) {
  try {
    await axios.put(
      `${process.env.REACT_APP_URL}/admin/deactivateBin/${binId}`,
      {}, // ✅ Must include an empty body for PUT requests
      { withCredentials: true } // ✅ Ensure JWT is sent
    );
  } catch (error) {
    console.error("Error deactivating bin:", error);
    throw error;
  }
}

// Activate bin
export const activateBin = async (binId) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_URL}/admin/activateBin/${binId}`,
      {}, // Empty object for the request body
      { withCredentials: true } // ✅ Ensures authentication token is sent
    );
  } catch (error) {
    console.error("Error activating bin:", error);
    throw error;
  }
};

import api from "../../../../api/axios";

// Utils
// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Recycle Bins
export async function fetchAllRecycleBins(typeFilter = null) {
  try {
    const res = await api.get(
      "/admin/recycleBins",
      {
        params: { type: typeFilter }, // Pass the type filter to the API
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
    await api.put(
      `/admin/deactivateBin/${binId}`,
      {} // ✅ Must include an empty body for PUT requests
    );
  } catch (error) {
    console.error("Error deactivating bin:", error);
    throw error;
  }
}

// Activate bin
export const activateBin = async (binId) => {
  try {
    await api.put(
      `/admin/activateBin/${binId}`,
      {} // Empty object for the request body
    );
  } catch (error) {
    console.error("Error activating bin:", error);
    throw error;
  }
};

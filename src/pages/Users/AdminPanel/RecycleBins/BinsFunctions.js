import axios from 'axios';

// Utils
// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Recycle Bins
export async function fetchAllRecycleBins(typeFilter = null) {
  try {
    const res = await axios.get(`/admin/recycleBins`, {
      params: { type: typeFilter }, // Pass the type filter to the API
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

// Deactivate bin
export async function deactivateBin(binId) {
  try {
    await axios.put(`/admin/deactivateBin/${binId}`);
  } catch (error) {
    console.error('Error deactivating bin:', error);
    throw error;
  }
}

// Activate bin
export const activateBin = async (binId) => {
  try {
    await axios.put(`/admin/activateBin/${binId}`);
  } catch (error) {
    console.error('Error activating bin:', error);
    throw error;
  }
};

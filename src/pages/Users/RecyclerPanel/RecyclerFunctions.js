import axios from "axios";

// Recycle Requests
export async function fetchAllRequests(statusFilter = null) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/recycler/all-requests`,
      {
        params: { status: statusFilter }, // Pass the status filter to the API
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Function to fetch accepted requests from the server
export async function fetchAcceptedRequests() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/recycler/accepted-requests`
    ); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted requests:", error);
    return []; // Return an empty array on error
  }
}

// Function to update request status
export async function updateRequestStatus(requestId, newStatus) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_URL}/recycler/requests/${requestId}`,
      {
        status: newStatus,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating request status:", error);
    throw error;
  }
}

// Function to fetch completed requests from the server
export async function fetchCompletedRequests() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/recycler/completed-requests`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

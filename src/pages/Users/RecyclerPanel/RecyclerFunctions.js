import axios from "axios";

// Recycle Requests
export async function fetchAllRequests(statusFilter = null) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/recycler/all-requests`,
      {
        params: { status: statusFilter },
        withCredentials: true, // ✅ Ensure credentials (cookies) are sent
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching all requests:", err);
    throw err;
  }
}

// Function to fetch accepted requests from the server
export async function fetchAcceptedRequests() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/recycler/accepted-requests`,
      { withCredentials: true } // ✅ Ensure credentials are included
    );
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
      { status: newStatus },
      { withCredentials: true } // ✅ Ensure credentials are included
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
      `${process.env.REACT_APP_URL}/recycler/completed-requests`,
      { withCredentials: true } // ✅ Ensure credentials are included
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching completed requests:", error);
    throw error;
  }
}

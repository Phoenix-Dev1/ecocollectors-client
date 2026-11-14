import api from "../../../api/axios";

// Recycle Requests
export async function fetchAllRequests(statusFilter = null) {
  try {
    const response = await api.get(
      "/recycler/all-requests",
      {
        params: { status: statusFilter },
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
    const response = await api.get("/recycler/accepted-requests");
    return response.data;
  } catch (error) {
    console.error("Error fetching accepted requests:", error);
    return []; // Return an empty array on error
  }
}

// Function to update request status
export async function updateRequestStatus(requestId, newStatus) {
  try {
    const response = await api.put(
      `/recycler/requests/${requestId}`,
      { status: newStatus }
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
    const response = await api.get("/recycler/completed-requests");
    return response.data;
  } catch (error) {
    console.error("Error fetching completed requests:", error);
    throw error;
  }
}

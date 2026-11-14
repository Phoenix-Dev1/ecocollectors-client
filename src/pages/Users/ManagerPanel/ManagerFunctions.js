import api from "../../../api/axios";

// Recyclers
export async function fetchAllRecyclers() {
  try {
    const res = await api.get("/manager/recyclers");
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const toggleRecyclerActivation = async (userID, newStatus) => {
  try {
    const res = await api.put(
      `/manager/recyclers/${userID}`,
      { active: newStatus }
    );
    return res.data;
  } catch (error) {
    console.error("Error toggling user activation:", error);
    throw error;
  }
};

// Recyclers Requests
export async function fetchRecyclerJoinRequests(statusFilter = null) {
  try {
    const response = await api.get(
      "/manager/join-requests",
      {
        params: { status: statusFilter },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateRecyclerJoinRequestStatus(
  joinID,
  newStatus,
  userID
) {
  try {
    const res = await api.put(
      `/manager/join-requests/${joinID}`,
      { status: newStatus, userID: userID }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Recycle Requests
export async function fetchAllRequests(statusFilter = null) {
  try {
    const response = await api.get(
      "/manager/all-requests",
      {
        params: { status: statusFilter },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateRequestStatus(requestId, newStatus) {
  try {
    const response = await api.put(
      `/manager/requests/${requestId}`,
      { status: newStatus }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Search requests By UserId
export async function searchRequestsByUserId(searchTerm) {
  try {
    const response = await api.get(
      "/manager/search-requests",
      {
        params: { searchTerm },
      }
    );

    // Check if results are empty and return an empty array
    if (response.data.length === 0) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Status meanings mapping
export const statusMeanings = {
  1: "Awaits Recycler",
  2: "Awaits Approval",
  3: "Completed",
  4: "Canceled",
  5: "Awaits Pickup",
};

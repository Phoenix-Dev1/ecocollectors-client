import api from "../../../api/axios";

// Users
export async function fetchAllUsers() {
  try {
    const res = await api.get("/admin/users");
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const toggleUserActivation = async (userID, newStatus) => {
  try {
    const res = await api.put(`/admin/users/${userID}`, { active: newStatus });
    return res.data;
  } catch (error) {
    console.error("Error toggling user activation:", error);
    throw error;
  }
};

// Recyclers Managers
export async function fetchJoinRequests(statusFilter = null) {
  try {
    const response = await api.get(
      "/admin/join-requests",
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

export async function updateJoinRequestStatus(joinID, newStatus, userID) {
  try {
    const res = await api.put(
      `/admin/join-requests/${joinID}`,
      {
        status: newStatus,
        userID: userID,
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Recycle Requests
export const fetchAllRequests = async (statusFilter) => {
  try {
    // B2: the admin list, not the public map list (which has open requests only)
    const response = await api.get("/admin/all-requests", {
      params: { status: statusFilter || undefined },
    });

    return response.data || []; // Ensure it never returns undefined
  } catch (error) {
    console.error("Error fetching requests:", error);
    return []; // Return empty array on error
  }
};

export async function updateRequestStatus(requestId, newStatus) {
  try {
    const response = await api.put(
      `/admin/requests/${requestId}`,
      {
        status: newStatus,
      }
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
      "/admin/search-requests",
      {
        params: { searchTerm },
      }
    );

    if (response.data.length === 0) {
      return [];
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Define a mapping of status numbers to their meanings
export const statusMeanings = {
  1: "Awaits Recycler",
  2: "Awaits Approval",
  3: "Completed",
  4: "Canceled",
  5: "Awaits Pickup",
};

import axios from "axios";

// Users
export async function fetchAllUsers() {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/admin/users`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const toggleUserActivation = async (userID, newStatus) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/admin/users/${userID}`,
      { active: newStatus },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error toggling user activation:", error);
    throw error;
  }
};

// Recyclers Managers
export async function fetchJoinRequests(statusFilter = null) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/admin/join-requests`,
      {
        params: { status: statusFilter },
        withCredentials: true,
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
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/admin/join-requests/${joinID}`,
      {
        status: newStatus,
        userID: userID,
      },
      { withCredentials: true }
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
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/admin/all-requests`,
      {
        params: { status: statusFilter },
        withCredentials: true,
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
    const response = await axios.put(
      `${process.env.REACT_APP_URL}/admin/requests/${requestId}`,
      {
        status: newStatus,
      },
      { withCredentials: true } // ✅ Ensure credentials are sent
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
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/admin/search-requests`,
      {
        params: { searchTerm },
        withCredentials: true, // ✅ Add credentials
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

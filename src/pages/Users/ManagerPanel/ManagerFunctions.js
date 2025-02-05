import axios from "axios";

// Recyclers
export async function fetchAllRecyclers() {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/manager/recyclers`,
      { withCredentials: true } // ✅ Fix: Ensure credentials (cookies) are sent
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export const toggleRecyclerActivation = async (userID, newStatus) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/manager/recyclers/${userID}`,
      { active: newStatus },
      { withCredentials: true } // ✅ Fix: Include credentials
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
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/manager/join-requests`,
      {
        params: { status: statusFilter },
        withCredentials: true, // ✅ Fix: Include credentials
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
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/manager/join-requests/${joinID}`,
      { status: newStatus, userID: userID },
      { withCredentials: true } // ✅ Fix: Include credentials
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
      `${process.env.REACT_APP_URL}/manager/all-requests`,
      {
        params: { status: statusFilter },
        withCredentials: true, // ✅ Fix: Include credentials
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
      `${process.env.REACT_APP_URL}/manager/requests/${requestId}`,
      { status: newStatus },
      { withCredentials: true } // ✅ Fix: Include credentials
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
      `${process.env.REACT_APP_URL}/manager/search-requests`,
      {
        params: { searchTerm },
        withCredentials: true, // ✅ Fix: Include credentials
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

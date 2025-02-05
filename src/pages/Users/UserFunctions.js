import axios from "axios";

// Fetch all user Requests
export async function fetchUserRequests(id) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/dashboardUser/${id}`,
      { withCredentials: true } // ✅ Ensures authentication
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching user requests:", err.response?.data || err);
    return null;
  }
}

// Fetch Recycler info based on request id
export async function fetchRecyclerDetails(id) {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/dashboardRecycler/${id}`,
      { withCredentials: true } // ✅ Ensures authentication
    );
    return res.data;
  } catch (err) {
    console.error(
      "Error fetching recycler details:",
      err.response?.data || err
    );
    return null;
  }
}

// accept recycler arrival - changing status to 5
export async function acceptRequest(requestId) {
  const confirmed = window.confirm("Are you sure you want to accept?");
  if (!confirmed) return null;

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      { status: 5 },
      { withCredentials: true } // ✅ Ensures authentication
    );
    return res.data;
  } catch (err) {
    console.error("Error accepting request:", err.response?.data || err);
    return null;
  }
}

// Decline Recycler pickup request
export async function declineRequest(requestId) {
  const confirmed = window.confirm(
    "Are you sure you want to cancel pickup/decline?"
  );
  if (!confirmed) return null;

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      { status: 1 },
      { withCredentials: true } // ✅ Ensures authentication
    );
    return res.data;
  } catch (err) {
    console.error("Error declining request:", err.response?.data || err);
    return null;
  }
}

// Canceling a request BUT keeping it in the db
export async function cancelRequest(requestId) {
  const confirmed = window.confirm("Are you sure you want to cancel?");
  if (!confirmed) return null;

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      { status: 4 },
      { withCredentials: true } // ✅ Ensures authentication
    );
    return res.data;
  } catch (err) {
    console.error("Error canceling request:", err.response?.data || err);
    return null;
  }
}

// Accepting and closing request
export async function acceptAndCloseRequest(requestId, newBottlesNumber) {
  const confirmed = window.confirm(
    "Are you sure you want to accept and close this request?"
  );
  if (!confirmed) return null;

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      { status: 3, newBottlesNumber },
      { withCredentials: true } // ✅ Ensures authentication
    );
    return res.data;
  } catch (err) {
    console.error("Error closing request:", err.response?.data || err);
    return null;
  }
}

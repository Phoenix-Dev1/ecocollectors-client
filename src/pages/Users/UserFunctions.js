import { toast } from "react-hot-toast";
import api, { apiErrorMessage } from "../../api/axios";

// Show why a change failed (a 401 already has its own message and redirect)
function reportError(err, fallback) {
  if (err.response?.status !== 401) toast.error(apiErrorMessage(err, fallback));
}

// Fetch all user Requests
export async function fetchUserRequests(id) {
  try {
    const res = await api.get(`/dashboardUser/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching user requests:", err.response?.data || err);
    return null;
  }
}

// Fetch Recycler info based on request id
export async function fetchRecyclerDetails(id) {
  try {
    const res = await api.get(`/dashboardRecycler/${id}`);
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
    const res = await api.put(`/dashboardUser/${requestId}`, { status: 5 });
    return res.data;
  } catch (err) {
    console.error("Error accepting request:", err.response?.data || err);
    reportError(err, "Could not accept the pickup. Please try again.");
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
    const res = await api.put(`/dashboardUser/${requestId}`, { status: 1 });
    return res.data;
  } catch (err) {
    console.error("Error declining request:", err.response?.data || err);
    reportError(err, "Could not decline the pickup. Please try again.");
    return null;
  }
}

// Canceling a request BUT keeping it in the db
export async function cancelRequest(requestId) {
  const confirmed = window.confirm("Are you sure you want to cancel?");
  if (!confirmed) return null;

  try {
    const res = await api.put(`/dashboardUser/${requestId}`, { status: 4 });
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
    const res = await api.put(
      `/dashboardUser/${requestId}`,
      { status: 3, newBottlesNumber }
    );
    return res.data;
  } catch (err) {
    console.error("Error closing request:", err.response?.data || err);
    return null;
  }
}

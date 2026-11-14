import { toast } from "react-hot-toast";
import api, { apiErrorMessage } from "../../api/axios";

// Fetching Request details from DB
export async function fetchRequestById(id) {
  try {
    const res = await api.get(`/requests/recycle/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching request by ID:", err.response?.data || err);
    return null;
  }
}

// Updating the request Status
export async function updateRequestById(id) {
  try {
    const res = await api.put(
      `/requests/${id}`,
      {} // ✅ Include an empty object for the request body
    );
    return res.data;
  } catch (err) {
    console.error("Error updating request by ID:", err.response?.data || err);
    // e.g. 409 when another recycler claimed it first (a 401 has its own message)
    if (err.response?.status !== 401) {
      toast.error(apiErrorMessage(err, "Could not claim the request. Please try again."));
    }
    return null;
  }
}

// Format Date & Time
export function formatDate(datetime) {
  const date = new Date(datetime);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function formatTime(datetime) {
  const date = new Date(datetime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedTime;
}

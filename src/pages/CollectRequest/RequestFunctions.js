import axios from 'axios';

// Fetching Request details from DB
export async function fetchRequestById(id) {
  //console.log(id);
  try {
    const res = await axios.get(`/requests/recycle/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Updating the request Status
export async function updateRequestById(id) {
  //console.log(id);
  try {
    const res = await axios.put(`/requests/${id}`);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
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

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedTime;
}

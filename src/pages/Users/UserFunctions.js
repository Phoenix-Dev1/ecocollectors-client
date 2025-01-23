import axios from "axios";

// Fetch all user Requests
export async function fetchUserRequests(id) {
  //console.log(id);
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/dashboardUser/${id}`
    );
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Fetch Recycler info based on request id
export async function fetchRecyclerDetails(id) {
  //console.log(id);
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_URL}/dashboardRecycler/${id}`
    );
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// accept recycler arrival - changing status to 5
export async function acceptRequest(requestId) {
  const confirmed = window.confirm("Are you sure you want to accept?");
  if (!confirmed) {
    return null; // Request not confirmed, return null or handle accordingly
  }

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      { status: 5 }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Decline Recycler pickup request
export async function declineRequest(requestId) {
  const confirmed = window.confirm(
    "Are you sure you want to cancel pickup/decline?"
  );
  if (!confirmed) {
    return null; // Request not confirmed, return null or handle accordingly
  }

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      { status: 1 }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Canceling a request BUT keeping it in the db
export async function cancelRequest(requestId) {
  const confirmed = window.confirm("Are you sure you want to cancel?");
  if (!confirmed) {
    return null; // Request not confirmed, return null or handle accordingly
  }
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      { status: 4 }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Accepting and closing request
export async function acceptAndCloseRequest(requestId, newBottlesNumber) {
  const confirmed = window.confirm(
    "Are you sure you want to accept and close this request?"
  );
  if (!confirmed) {
    return null; // Request not confirmed
  }

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_URL}/dashboardUser/${requestId}`,
      {
        status: 3,
        newBottlesNumber: newBottlesNumber, // Pass the new bottles number
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

import axios from "axios";

// Every API call goes through this instance. It sends the login token as
// `Authorization: Bearer`, which works on Safari/iOS, where the cross-site
// access_token cookie is blocked. withCredentials stays on only while the
// server still accepts that cookie; it can go once the server stops reading it.
const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  withCredentials: true,
});

// The logged-in user saved by AuthContext, or null (also for a corrupt entry).
export function getStoredUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && typeof user === "object" ? user : null;
  } catch {
    return null;
  }
}

api.interceptors.request.use((config) => {
  const user = getStoredUser();
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// A message to show for a failed call. The server answers 4xx with a JSON
// string, and 404/500/429 with { error }.
export function apiErrorMessage(error, fallback) {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (typeof data?.error === "string") return data.error;
  return fallback;
}

// Called with the error when a protected call answers 401 (no, expired or
// invalid token, or a deactivated account). Set by <SessionExpiry />.
let unauthorizedHandler = null;

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    // /auth/* answers 401 for a wrong password: that is not an expired session.
    if (
      error.response?.status === 401 &&
      !url.startsWith("/auth/") &&
      unauthorizedHandler
    ) {
      unauthorizedHandler(error);
    }
    return Promise.reject(error);
  }
);

export default api;

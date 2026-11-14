import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import api, { getStoredUser } from "../api/axios";
import { queryClient } from "../queryClient";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  const login = useCallback(async (inputs) => {
    const res = await api.post("/auth/login", inputs);
    // Save the token now: the next page's first API calls run in its effects,
    // before this provider's effect would store it (no Bearer → 401 on Safari).
    localStorage.setItem("user", JSON.stringify(res.data));
    // Drop everything cached for the previous user (e.g. the map's is_mine flags)
    queryClient.clear();
    setCurrentUser(res.data);
    return res.data.role;
  }, []);

  // Ends the session here first, so the user is logged out even when the
  // server can't be reached. The call only clears the old access_token cookie.
  const logout = useCallback(async () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
    queryClient.clear();
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    return true;
  }, []);

  // Merge profile changes (e.g. after "Personal Info" is saved).
  const updateCurrentUser = useCallback((changes) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...changes } : prev));
  }, []);

  const value = useMemo(
    () => ({ currentUser, login, logout, updateCurrentUser }),
    [currentUser, login, logout, updateCurrentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

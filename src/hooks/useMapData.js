import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const useMapData = () => {
  const type = useLocation().search;
  const { currentUser } = useContext(AuthContext);

  // Fetch Requests
  const fetchRequests = async () => {
    const res = await api.get("/requests");
    return res.data;
  };

  const { data: requests = [], refetch: refetchRequests } = useQuery({
    // The answer depends on who asks (is_mine), and statuses change as people
    // claim and accept: cache per user and refetch on every visit to the map.
    queryKey: ["requests", currentUser?.ID ?? "anonymous"],
    queryFn: fetchRequests,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  // Fetch Bins
  const fetchActiveMarkers = async ({ queryKey }) => {
    const [, type] = queryKey;
    const res = await api.get(`/markers${type}`);
    return res.data;
  };

  const {
    data: markers = [],
    isLoading: markersLoading,
    isPending: markersPending,
    error: markersError,
  } = useQuery({
    queryKey: ["markers", type],
    queryFn: fetchActiveMarkers,
    staleTime: 60000,
  });

  return {
    requests,
    refetchRequests,
    markers,
    markersLoading,
    markersPending,
    markersError,
    type,
  };
};

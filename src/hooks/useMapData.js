import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const useMapData = () => {
  const type = useLocation().search;

  // Fetch Requests
  const fetchRequests = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/requests`, {
      withCredentials: true,
    });
    return res.data;
  };

  const { data: requests = [], refetch: refetchRequests } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
    staleTime: 60000,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  // Fetch Bins
  const fetchActiveMarkers = async ({ queryKey }) => {
    const [, type] = queryKey;
    const res = await axios.get(`${process.env.REACT_APP_URL}/markers${type}`);
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

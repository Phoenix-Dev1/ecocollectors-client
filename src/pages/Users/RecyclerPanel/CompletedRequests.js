import React from "react";
import DataTable from "react-data-table-component";
import { fetchCompletedRequests } from "./RecyclerFunctions";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const CompletedRequests = () => {
  const {
    data: completedRequests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["completedRequests"],
    queryFn: fetchCompletedRequests,
    staleTime: 60000, // Cache results for 60 seconds
    cacheTime: 300000, // Keep data in cache for 5 minutes
    refetchOnWindowFocus: false, // Prevent unnecessary re-fetching
  });

  const columns = [
    { name: "Request ID", selector: (row) => row.request_id, sortable: true },
    {
      name: "Address",
      selector: (row) => row.req_address || "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Bottles Number",
      selector: (row) => row.bottles_number || 0,
      sortable: true,
      wrap: true,
    },
    {
      name: "Collector Name",
      selector: (row) => row.full_name || "N/A",
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Collector Phone",
      selector: (row) => row.phone_number || "N/A",
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Request Date",
      selector: (row) =>
        row.request_date
          ? format(new Date(row.request_date), "dd/MM/yyyy - HH:mm")
          : "N/A",
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Completion Date",
      selector: (row) =>
        row.completed_date
          ? format(new Date(row.completed_date), "dd/MM/yyyy - HH:mm")
          : "N/A",
      sortable: true,
      center: true,
      wrap: true,
    },
  ];

  if (isLoading) return <p>Loading completed requests...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  const afterFetch = completedRequests;

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Completed Requests:</h2>
      {afterFetch.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={completedRequests}
            striped
            highlightOnHover
            pagination
            className="border w-full"
          />
        </div>
      ) : (
        <p>No completed requests found</p>
      )}
    </div>
  );
};

export default CompletedRequests;

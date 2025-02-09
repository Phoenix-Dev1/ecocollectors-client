import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import DataTable from "react-data-table-component";
import { fetchUserRequests, fetchRecyclerDetails } from "../UserFunctions";
import axios from "axios";
import { format } from "date-fns";

const Completed = () => {
  const { currentUser } = useContext(AuthContext);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [recyclerDetails, setRecyclerDetails] = useState({});

  // Fetch completed requests **only once**
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.ID) return;
      const data = await fetchUserRequests(currentUser.ID);
      setCompletedRequests(data);
    };

    fetchData();
  }, [currentUser]); // ✅ Only runs when currentUser changes

  // Fetch recycler details **only once after fetching completed requests**
  useEffect(() => {
    const fetchRecyclerData = async () => {
      const uniqueRecyclerIds = [
        ...new Set(completedRequests.map((req) => req.recycler_id)),
      ].filter((id) => id && id !== "null"); // Remove invalid IDs

      const detailsArray = await Promise.all(
        uniqueRecyclerIds.map(fetchRecyclerDetails)
      );

      // Convert array into an object (id → recycler details) for fast lookup
      const recyclerMap = uniqueRecyclerIds.reduce((acc, id, index) => {
        acc[id] = detailsArray[index] || {
          first_name: "Unknown",
          last_name: "",
          phone: "N/A",
        };
        return acc;
      }, {});

      setRecyclerDetails(recyclerMap);
    };

    if (
      completedRequests.length > 0 &&
      Object.keys(recyclerDetails).length === 0
    ) {
      fetchRecyclerData();
    }
  }, [completedRequests]); // ✅ Runs **only after fetching completed requests**

  // Define columns for the data table
  const columns = [
    {
      name: "Address",
      selector: (row) => row.req_address || "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Bottles Number",
      selector: (row) => row.bottles_number || "0",
      sortable: true,
      center: true,
    },
    {
      name: "Recycler Name",
      selector: (row) => row.recyclerFullName || "Awaiting Recycler",
      sortable: true,
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.recyclerPhone || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Request Date",
      selector: (row) => row.request_date || "N/A",
      sortable: true,
      center: true,
      cell: (row) =>
        row.request_date && row.request_date !== "0000-00-00 00:00:00"
          ? format(new Date(row.request_date), "dd/MM/yyyy, HH:mm")
          : "N/A",
    },
    {
      name: "Completed Date",
      selector: (row) => row.completed_date || "N/A",
      sortable: true,
      center: true,
      cell: (row) =>
        row.completed_date && row.completed_date !== "0000-00-00 00:00:00"
          ? format(new Date(row.completed_date), "dd/MM/yyyy, HH:mm")
          : "N/A",
    },
  ];

  // Transform completedRequests data to include recycler details
  const data = completedRequests.map((request) => ({
    ...request,
    recyclerFullName: recyclerDetails[request.recycler_id]
      ? `${recyclerDetails[request.recycler_id].first_name} ${
          recyclerDetails[request.recycler_id].last_name
        }`
      : "Awaiting Recycler",
    recyclerPhone: recyclerDetails[request.recycler_id]?.phone || "N/A",
  }));

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Completed Requests:</h2>
      {data.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={data}
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

export default Completed;

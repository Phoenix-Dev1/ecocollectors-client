import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import DataTable from "react-data-table-component";
import { fetchUserRequests, fetchRecyclerDetails } from "../UserFunctions";
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
  }, [completedRequests, recyclerDetails]); // ✅ satisfy ESLint

  // Define columns for the data table
  const columns = [
    {
      name: "Address",
      selector: (row) => row.req_address || "N/A",
      sortable: true,
      wrap: true,
    },
    {
      name: "Bottles",
      selector: (row) => row.bottles_number || "0",
      sortable: true,
      center: true,
    },
    {
      name: "Recycler",
      selector: (row) => row.recyclerFullName || "Awaiting Recycler",
      sortable: true,
      center: true,
    },
    {
      name: "Phone",
      selector: (row) => row.recyclerPhone || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Scheduled",
      selector: (row) => row.request_date || "N/A",
      sortable: true,
      center: true,
      cell: (row) =>
        row.request_date && row.request_date !== "0000-00-00 00:00:00"
          ? format(new Date(row.request_date), "dd/MM/yyyy, HH:mm")
          : "N/A",
    },
    {
      name: "Completed",
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
    <div className="p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-eco-text">Completed Requests</h2>
        <p className="text-eco-muted text-sm mt-1">History of your successful recycling collections</p>
      </div>

      {data.length > 0 ? (
        <div className="glass !rounded-3xl p-6 shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
            striped
            highlightOnHover
            pagination
            customStyles={{
              table: {
                style: {
                  backgroundColor: 'transparent',
                },
              },
              headRow: {
                style: {
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  border: 'none',
                  marginBottom: '8px',
                },
              },
              headCells: {
                style: {
                  fontWeight: 'bold',
                  color: '#065f46',
                  textTransform: 'uppercase',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                },
              },
              rows: {
                style: {
                  borderRadius: '12px',
                  border: 'none',
                  marginBottom: '4px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#f0fdf4 !important',
                    transform: 'scale(1.005)',
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="glass !rounded-3xl p-20 text-center">
          <div className="w-16 h-16 bg-eco-background rounded-2xl flex items-center justify-center mx-auto mb-4">
             <i className="fa fa-info-circle text-eco-primary text-2xl"></i>
          </div>
          <p className="text-eco-muted font-medium">No completed requests found in your history.</p>
        </div>
      )}
    </div>
  );
};

export default Completed;

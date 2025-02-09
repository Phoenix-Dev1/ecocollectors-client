import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import DataTable from "react-data-table-component";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { red, green } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUserRequests,
  fetchRecyclerDetails,
  acceptRequest,
  declineRequest,
  cancelRequest,
  acceptAndCloseRequest,
} from "../UserFunctions";
import { renderButtons, modalStyle } from "../RequestUtils";
import { format } from "date-fns";

const Pending = () => {
  const { currentUser } = useContext(AuthContext);
  const [selectedBottles, setSelectedBottles] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);

  // Fetch pending requests using React Query
  const { data: pendingRequests = [], refetch } = useQuery({
    queryKey: ["pendingRequests", currentUser?.ID],
    queryFn: async () => {
      if (!currentUser?.ID) return [];
      const data = await fetchUserRequests(currentUser.ID);
      return data.filter(
        (request) => request.status !== 3 && request.status !== 4
      );
    },
    staleTime: 60000, // Cache data for 60 seconds
    refetchOnWindowFocus: false,
  });

  // Fetch recycler details for requests
  const { data: recyclerDetails = [] } = useQuery({
    queryKey: ["recyclerDetails", pendingRequests],
    queryFn: async () => {
      if (!pendingRequests.length) return [];
      const recyclerIds = pendingRequests.map((request) => request.recycler_id);
      return Promise.all(
        recyclerIds.map((recyclerId) => fetchRecyclerDetails(recyclerId))
      );
    },
    enabled: pendingRequests.length > 0,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  // Merge recycler details into pending requests
  const processedRequests = pendingRequests.map((request, index) => ({
    ...request,
    recyclerFullName:
      request.status === 4
        ? "Canceled"
        : recyclerDetails[index]?.[0]
        ? `${recyclerDetails[index][0].first_name} ${recyclerDetails[index][0].last_name}`
        : "Awaits Recycler",
    recyclerPhone: recyclerDetails[index]?.[0]?.phone || "",
  }));

  // Modal handlers
  const openModal = (request) => {
    setCurrentRequest(request);
    setSelectedBottles(request.bottles_number);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Handle Accept & Close action
  const handleAcceptAndCloseWithBottles = async (
    requestId,
    newBottlesNumber
  ) => {
    if (newBottlesNumber > 0) {
      try {
        const response = await acceptAndCloseRequest(
          requestId,
          newBottlesNumber
        );
        if (response) {
          closeModal();
          refetch();
        }
      } catch (error) {
        console.error("Error accepting and closing request:", error);
      }
    } else {
      alert("Invalid bottle number. Please enter a number greater than 0.");
    }
  };

  // Table columns
  const columns = [
    {
      name: "Request Date",
      selector: (row) =>
        format(new Date(row.request_date), "dd/MM/yyyy - HH:mm"),
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Address",
      selector: (row) => row.req_address,
      sortable: true,
      wrap: true,
    },
    {
      name: "Bottles Number",
      selector: (row) => row.bottles_number,
      sortable: true,
      center: true,
    },
    {
      name: "Recycler Name",
      selector: (row) => row.recyclerFullName,
      sortable: true,
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.recyclerPhone,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
      cell: (row) => {
        const statuses = {
          1: "Awaits Recycler",
          2: "Awaits Approval",
          3: "Completed",
          4: "Cancelled",
          5: "Awaits Pickup",
        };
        return statuses[row.status] || "Unknown Status";
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col">
          {renderButtons(
            row.status,
            row.request_id,
            async () => {
              await acceptRequest(row.request_id);
              refetch();
            },
            async () => {
              await declineRequest(row.request_id);
              refetch();
            },
            async () => {
              await cancelRequest(row.request_id);
              refetch();
            },
            () => openModal(row)
          )}
        </div>
      ),
      center: true,
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Pending Requests:</h2>
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Final Bottles Number
          </Typography>
          <input
            className="border border-black text-center mb-4"
            type="number"
            value={selectedBottles}
            onChange={(e) => setSelectedBottles(e.target.value)}
          />
          {selectedBottles <= 0 && (
            <p className="text-red-500 mb-4">Bottles cannot be less than 0</p>
          )}
          <Button
            sx={{ bgcolor: green[500], color: "white" }}
            onClick={() =>
              handleAcceptAndCloseWithBottles(
                currentRequest.request_id,
                selectedBottles
              )
            }
            disabled={selectedBottles <= 0}
          >
            Accept & Close
          </Button>
          <Button
            onClick={closeModal}
            sx={{ bgcolor: red[500], color: "white" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <DataTable
        columns={columns}
        data={processedRequests}
        striped
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default Pending;

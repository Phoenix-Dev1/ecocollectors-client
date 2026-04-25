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

  // Custom styles for the DataTable
  const customStyles = {
    table: {
      style: {
        width: '100%',
      },
    },
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#f1f5f9',
        backgroundColor: '#f8fafc',
      },
    },
    headCells: {
      style: {
        color: '#64748b',
        fontSize: '0.75rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
    },
    cells: {
      style: {
        fontSize: '0.875rem',
        color: '#334155',
        paddingTop: '16px',
        paddingBottom: '16px',
      },
    },
    rows: {
      style: {
        minHeight: '72px',
        borderBottomColor: '#f1f5f9',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: '#f0fdf4 !important',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    pagination: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: '#f1f5f9',
      },
    },
  };

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
      name: "Date",
      selector: (row) =>
        format(new Date(row.request_date), "dd/MM/yyyy · HH:mm"),
      sortable: true,
      center: true,
      minWidth: '200px',
    },
    {
      name: "Address",
      selector: (row) => row.req_address,
      sortable: true,
      wrap: true,
      grow: 4,
    },
    {
      name: "Bottles",
      selector: (row) => row.bottles_number,
      sortable: true,
      center: true,
      minWidth: '100px',
    },
    {
      name: "Recycler",
      selector: (row) => row.recyclerFullName,
      sortable: true,
      center: true,
      minWidth: '180px',
    },
    {
      name: "Phone",
      selector: (row) => row.recyclerPhone,
      sortable: true,
      center: true,
      minWidth: '140px',
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
      minWidth: '160px',
      cell: (row) => {
        const statusConfig = {
          1: { text: "Awaits Recycler", classes: "bg-amber-50 text-amber-700 border-amber-100" },
          2: { text: "Awaits Approval", classes: "bg-purple-50 text-purple-700 border-purple-100" },
          3: { text: "Completed", classes: "bg-emerald-50 text-emerald-700 border-emerald-100" },
          4: { text: "Cancelled", classes: "bg-red-50 text-red-700 border-red-100" },
          5: { text: "Awaits Pickup", classes: "bg-blue-50 text-blue-700 border-blue-100" },
        };
        const config = statusConfig[row.status] || { text: "Unknown", classes: "bg-gray-50 text-gray-700 border-gray-100" };
        
        return (
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${config.classes} whitespace-nowrap`}>
            {config.text}
          </span>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-3 py-2">
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
      minWidth: '350px',
    },
  ];

  return (
    <div className="w-full p-4 md:p-8 md:px-12 animate-fade-in">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Pending Requests</h2>
          <p className="text-slate-500 text-sm font-medium">Manage and review all active recycling requests.</p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
          <span className="text-emerald-700 font-bold text-sm">{processedRequests.length} Active Items</span>
        </div>
      </div>

      <Modal 
        open={modalOpen} 
        onClose={closeModal}
        className="flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-slide-up border border-slate-100 outline-none">
          <div className="bg-emerald-500 p-8 text-center">
            <Typography variant="h5" className="text-white font-black uppercase tracking-widest">
              Confirm Collection
            </Typography>
            <p className="text-emerald-100 text-xs mt-2 font-medium">Verify the final bottle count before closing.</p>
          </div>

          <div className="p-10 space-y-8">
            <div className="text-center space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Final Bottle Count</label>
              <input
                className="w-full text-5xl font-black text-center text-emerald-600 bg-slate-50 py-6 rounded-3xl border-2 border-transparent focus:border-emerald-500 focus:bg-white focus:ring-8 focus:ring-emerald-500/10 transition-all outline-none"
                type="number"
                value={selectedBottles}
                onChange={(e) => setSelectedBottles(e.target.value)}
              />
              {selectedBottles <= 0 && (
                <p className="text-red-500 text-[10px] font-black uppercase animate-shake">Count must be greater than zero</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                onClick={() =>
                  handleAcceptAndCloseWithBottles(
                    currentRequest.request_id,
                    selectedBottles
                  )
                }
                disabled={selectedBottles <= 0}
              >
                Accept & Close
              </button>
              <button
                onClick={closeModal}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <DataTable
          columns={columns}
          data={processedRequests}
          pagination
          customStyles={customStyles}
          highlightOnHover
          pointerOnHover
          noHeader
        />
      </div>
    </div>
  );
};

export default Pending;

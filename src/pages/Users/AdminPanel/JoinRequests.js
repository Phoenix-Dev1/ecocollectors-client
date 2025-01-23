import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import { fetchJoinRequests, updateJoinRequestStatus } from './AdminFunctions';

const JoinRequests = () => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null); // Initialize as null to show all requests

  const filterByStatus = (status) => {
    setSelectedStatusFilter(status);
  };

  const clearStatusFilter = () => {
    setSelectedStatusFilter(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJoinRequests(selectedStatusFilter); // Pass the selected status filter
      setJoinRequests(data);
    };

    fetchData();
  }, [selectedStatusFilter]);

  const handleUpdateStatus = async (joinID, newStatus, userID) => {
    try {
      await updateJoinRequestStatus(joinID, newStatus, userID);
      const updatedRequests = joinRequests.map((request) =>
        request.join_id === joinID ? { ...request, status: newStatus } : request
      );
      setJoinRequests(updatedRequests);
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  const handleApproveRequest = async (joinID, userID) => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to approve this request?'
      );
      if (confirmed) {
        await handleUpdateStatus(joinID, 3, userID); // Approve
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleDeclineRequest = async (joinID) => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to decline this request?'
      );
      if (confirmed) {
        await handleUpdateStatus(joinID, 2); // Decline
      }
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  const columns = [
    {
      cell: (row) => (
        <div>
          {row.status === 1 ? (
            <div>
              <button
                onClick={() => handleApproveRequest(row.join_id, row.user_id)} // Pass user_id here
                className="px-2 py-1 rounded bg-green-500 text-white mb-2 mt-2"
                disabled={row.status === 2 || row.status === 3} // Disable if already Declined or Approved
              >
                {row.status === 3 ? 'Approved' : 'Approve'}
              </button>
              <button
                onClick={() => handleDeclineRequest(row.join_id)} // Decline button
                className="px-2 py-1 rounded bg-red-500 text-white"
              >
                Decline
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleUpdateStatus(row.join_id, row.status)}
              className={`px-2 py-1 rounded ${
                row.status === 2
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
              disabled
            >
              {row.status === 2 ? 'Declined' : 'Approved'}
            </button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    /*
    {
      name: 'Join ID',
      selector: (row) => row.join_id,
      sortable: true,
      wrap: true,
    },
    {
      name: 'User ID',
      selector: (row) => row.user_id,
      sortable: true,
      wrap: true,
    },
    */
    {
      name: 'Join Date',
      selector: (row) => format(new Date(row.join_date), 'dd/MM/yyyy'), // Format the date
      sortable: true,
      wrap: true,
    },
    {
      name: 'First Name',
      selector: (row) => row.first_name,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Last Name',
      selector: (row) => row.last_name,
      sortable: true,
      wrap: true,
    },
    { name: 'Email', selector: (row) => row.email, sortable: true, wrap: true },
    { name: 'Phone', selector: (row) => row.phone, sortable: true, wrap: true },
    { name: 'Message', selector: (row) => row.message, wrap: true },
    /*
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
      wrap: true,
    },
    */
  ];

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Join Requests:</h2>
      <div className="mb-3">
        <button
          onClick={() => filterByStatus(1)}
          className="px-2 py-1 rounded bg-blue-500 text-white mx-2"
        >
          Pending
        </button>
        <button
          onClick={() => filterByStatus(2)}
          className="px-2 py-1 rounded bg-red-500 text-white mx-2"
        >
          Declined
        </button>
        <button
          onClick={() => filterByStatus(3)}
          className="px-2 py-1 rounded bg-green-500 text-white mx-2"
        >
          Approved
        </button>
        <button
          onClick={clearStatusFilter}
          className="px-2 py-1 rounded bg-gray-500 text-white mx-2"
        >
          Clear Filter
        </button>
      </div>
      {joinRequests.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={joinRequests}
            striped
            highlightOnHover
            pagination
            className="border w-full"
          />
        </div>
      ) : (
        <p>No join requests found</p>
      )}
    </div>
  );
};

export default JoinRequests;

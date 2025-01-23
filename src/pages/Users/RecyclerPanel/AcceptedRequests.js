import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {
  fetchAcceptedRequests,
  updateRequestStatus,
} from './RecyclerFunctions';
import { format } from 'date-fns';

const AcceptedRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAcceptedRequests();
      setAcceptedRequests(data);
    };

    fetchData();
  }, [acceptedRequests]);

  const handleCancel = async (requestId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this request?'
    );

    if (confirmed) {
      try {
        await updateRequestStatus(requestId, 1); // Update status to 'awaits recycler'
        const updatedRequests = acceptedRequests.map((request) =>
          request.request_id === requestId
            ? { ...request, status: 1 } // Update the status locally to 'awaits recycler'
            : request
        );
        setAcceptedRequests(updatedRequests);
      } catch (error) {
        console.error('Error canceling pickup:', error);
      }
    }
  };
  const columns = [
    { name: 'Request ID', selector: (row) => row.request_id, sortable: true },
    {
      name: 'Collector Name',
      selector: (row) => {
        if (row.status === 5) {
          return row.full_name;
        } else if (row.status === 2) {
          return 'Awaits Approval';
        } else {
          return ''; // Return empty string or other text for other status values
        }
      },
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Collector Phone',
      selector: (row) => {
        if (row.status === 5) {
          return row.phone_number;
        } else if (row.status === 2) {
          return 'Awaits Approval';
        } else {
          return ''; // Return empty string or other text for other status values
        }
      },
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Request Date',
      selector: (row) =>
        format(new Date(row.request_date), 'dd/MM/yyyy - HH:mm'),
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Address',
      selector: (row) => row.req_address,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Bottles Number',
      selector: (row) => row.bottles_number,
      sortable: true,
      wrap: true,
    },
    /* { name: 'Recycler ID', selector: (row) => row.recycler_id, sortable: true },*/
    {
      name: 'Status',
      selector: (row) => {
        if (row.status === 2) {
          return 'Awaits User Approval';
        } else if (row.status === 5) {
          return 'Awaits Your Pickup';
        } else {
          return ''; // Return empty string or other text for other status values
        }
      },
      sortable: true,
      wrap: true,
    },

    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex flex-col">
          {row.status === 2 ? (
            <button
              onClick={() => handleCancel(row.request_id)}
              className="px-2 py-1 rounded bg-yellow-500 text-white mx-2"
            >
              Cancel Pickup
            </button>
          ) : null}
          {row.status === 5 ? (
            <button
              onClick={() => handleCancel(row.request_id)}
              className="px-2 py-1 rounded bg-red-500 text-white mx-2"
            >
              Cancel Request
            </button>
          ) : null}
        </div>
      ),
    },
  ];

  const data = acceptedRequests.map((request) => ({
    ...request,
  }));

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Accepted Requests:</h2>
      {acceptedRequests.length > 0 ? (
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
        <p>No accepted requests found</p>
      )}
    </div>
  );
};

export default AcceptedRequests;

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fetchAllRequests } from './RecyclerFunctions';
import { format } from 'date-fns';

const RegionalRecyclerRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(1); // Initialize as 1 - Awaits recycler

  const filterByStatus = (status) => {
    setSelectedStatusFilter(status);
  };

  const clearStatusFilter = () => {
    setSelectedStatusFilter(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllRequests(selectedStatusFilter);
      setAllRequests(data);
    };

    fetchData();
  }, [selectedStatusFilter]);

  const columns = [
    { name: 'Request ID', selector: (row) => row.request_id, sortable: true },
    {
      name: 'Collector Name',
      selector: (row) => row.full_name,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Request Date',
      selector: (row) =>
        format(new Date(row.request_date), 'dd/MM/yyyy - HH:MM'), // Format the date
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
    },
    {
      name: 'Recycler Name',
      selector: (row) =>
        row.recycler_first_name && row.recycler_last_name
          ? `${row.recycler_first_name} ${row.recycler_last_name}`
          : 'Not Assigned',
      sortable: true,
      wrap: true,
    },
  ];

  // Transform data as needed
  const data = allRequests.map((request) => ({
    ...request,
  }));
  //console.table(data);

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Regional Requests:</h2>
      <div className="mb-3">
        <button
          onClick={() => filterByStatus(1)}
          className="px-2 py-1 rounded bg-blue-500 text-white mx-2"
        >
          Awaits Recycler
        </button>
        <button
          onClick={() => filterByStatus(2)}
          className="px-2 py-1 rounded bg-red-500 text-white mx-2"
        >
          Awaits User Approval
        </button>
        <button
          onClick={() => filterByStatus(3)}
          className="px-2 py-1 rounded bg-green-500 text-white mx-2"
        >
          Completed
        </button>
        <button
          onClick={() => filterByStatus(4)}
          className="px-2 py-1 rounded bg-gray-500 text-white mx-2"
        >
          Canceled
        </button>
        <button
          onClick={() => filterByStatus(5)}
          className="px-2 py-1 rounded bg-orange-500 text-white mx-2"
        >
          Awaits Recycler Pickup
        </button>
        <button
          onClick={clearStatusFilter}
          className="px-2 py-1 rounded bg-gray-500 text-white mx-2"
        >
          Clear Filter
        </button>
      </div>
      {allRequests.length > 0 ? (
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
        <p>No requests found</p>
      )}
    </div>
  );
};

export default RegionalRecyclerRequests;

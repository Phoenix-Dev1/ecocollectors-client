import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { format } from 'date-fns';
import {
  fetchAllRequests,
  updateRequestStatus,
  searchRequestsByUserId,
  statusMeanings,
} from './AdminFunctions';

const AllRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const filterByStatus = (status) => {
    setSelectedStatusFilter(status);
  };

  const clearStatusFilter = () => {
    setSelectedStatusFilter(null);
    setSearchResults([]);
    setSearchInput('');
  };

  const handleSearch = async () => {
    try {
      const results = await searchRequestsByUserId(searchInput);

      if (results.length === 0) {
        setSearchResults([]);
        setAllRequests([]);
      } else {
        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error searching requests:', error);
    }
  };

  const handleCancelRequest = async (requestId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this request?'
    );

    if (confirmed) {
      try {
        await updateRequestStatus(requestId, 4);
        await handleSearch('user_id');
      } catch (error) {
        console.error('Error canceling request:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllRequests(selectedStatusFilter);
      setAllRequests(data);
    };

    fetchData();
  }, [selectedStatusFilter]);

  const columns = [
    { name: 'User ID', selector: (row) => row.user_id, sortable: true },
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
        format(new Date(row.request_date), 'dd/MM/yyyy - HH:MM'),
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
      name: 'Status',
      selector: (row) => statusMeanings[row.status],
      sortable: true,
      wrap: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex flex-col">
          {row.status === 1 || row.status === 2 || row.status === 5 ? (
            <button
              onClick={() => handleCancelRequest(row.request_id)}
              className="px-2 py-1 rounded bg-yellow-500 text-white mx-2"
            >
              Cancel
            </button>
          ) : null}
        </div>
      ),
    },
  ];

  const data =
    searchResults.length > 0
      ? searchResults
      : allRequests.map((request) => ({ ...request }));

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">All Requests</h2>
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
      <div className="flex justify-center">
        <div className="flex">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter user id "
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-2 py-1 rounded border text-black"
            />
            <button
              onClick={() => handleSearch('user_id')}
              className="px-2 py-1 rounded bg-blue-500 text-white ml-2"
            >
              Search by User ID
            </button>
          </div>
        </div>
      </div>
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
        <p>
          {searchResults.length > 0 ? 'No requests found' : 'No results found'}
        </p>
      )}
    </div>
  );
};

export default AllRequests;

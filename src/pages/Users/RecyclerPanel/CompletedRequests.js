import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fetchCompletedRequests } from './RecyclerFunctions';
import { format } from 'date-fns';

const CompletedRequests = () => {
  const [completedRequests, setCompletedRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompletedRequests();
      setCompletedRequests(data);
    };

    fetchData();
  }, [completedRequests]);

  const columns = [
    { name: 'Request ID', selector: (row) => row.request_id, sortable: true },
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
    {
      name: 'Collector Name',
      selector: (row) => row.full_name,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: 'Collector Phone',
      selector: (row) => row.phone_number,
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
      name: 'Completion date',
      selector: (row) =>
        format(new Date(row.completed_date), 'dd/MM/yyyy - HH:mm'),
      sortable: true,
      center: true,
      wrap: true,
    },
  ];

  const data = completedRequests.map((request) => ({
    ...request,
  }));

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Completed Requests:</h2>
      {completedRequests.length > 0 ? (
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

export default CompletedRequests;

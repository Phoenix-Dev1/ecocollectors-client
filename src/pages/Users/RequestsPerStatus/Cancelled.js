import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/authContext';
import DataTable from 'react-data-table-component';
import { fetchUserRequests, fetchRecyclerDetails } from '../UserFunctions';
import { format } from 'date-fns';

const Cancelled = () => {
  const { currentUser } = useContext(AuthContext);
  const [cancelledRequests, setCancelledRequests] = useState([]);

  // Fetching user request by user id
  useEffect(() => {
    const fetchData = async () => {
      const userId = currentUser.ID;
      const data = await fetchUserRequests(userId);
      setCancelledRequests(data.filter((request) => request.status === 4));
    };

    fetchData();
  }, [currentUser]);

  // fetching recycler details based on recycler id in user_request table
  useEffect(() => {
    const fetchRecyclerData = async () => {
      const recyclerIds = cancelledRequests.map(
        (request) => request.recycler_id
      );
      const recyclerDetails = await Promise.all(
        recyclerIds.map((recyclerId) => fetchRecyclerDetails(recyclerId))
      );
      setCancelledRequests((prevCancelledRequests) => {
        const updatedCancelledRequests = prevCancelledRequests.map(
          (request, index) => {
            const recyclerDetail = recyclerDetails[index];
            if (recyclerDetail && recyclerDetail.length > 0) {
              request.recycler = recyclerDetail[0];
            }
            return request;
          }
        );
        return updatedCancelledRequests;
      });
    };

    if (cancelledRequests.length > 0) {
      fetchRecyclerData();
    }
  }, [cancelledRequests, cancelledRequests.length]); // Use cancelledRequests.length as the dependency

  // Define columns for the data table
  const columns = [
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
      center: true,
    },
    {
      name: 'Recycler Name',
      selector: (row) => row.recyclerFullName,
      sortable: true,
      center: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.recyclerPhone,
      sortable: true,
      center: true,
    },
  ];

  // Transform cancelledRequests data to include 'recyclerFullName' and 'recyclerPhone'
  const data = cancelledRequests.map((request) => ({
    ...request,
    recyclerFullName:
      request.status === 4
        ? 'None'
        : request.recycler
        ? `${request.recycler.first_name} ${request.recycler.last_name}`
        : 'Awaits Recycler',
    recyclerPhone: request.recycler ? request.recycler.phone : 'None',
  }));

  // Custom styles for the table
  const customStyles = {
    table: {
      style: {
        minWidth: '100%',
      },
    },
    rows: {
      style: {
        textAlign: 'center',
      },
    },
  };

  // Custom cell renderer to allow text wrapping for the "Address" column
  const customCell = (cell) => {
    return (
      <div
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          textAlign: 'center',
        }}
      >
        {cell}
      </div>
    );
  };

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Cancelled Requests:</h2>
      {cancelledRequests.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={data}
            striped
            highlightOnHover
            pagination
            customStyles={customStyles}
            customCell={customCell}
            className="border w-full"
          />
        </div>
      ) : (
        <p>No cancelled requests found</p>
      )}
    </div>
  );
};

export default Cancelled;

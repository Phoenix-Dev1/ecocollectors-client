import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { fetchAllUsers, toggleUserActivation } from './AdminFunctions';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllUsers();
      setUsers(data);
    };

    fetchData();
  }, []);

  const handleToggleActivation = async (userID, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1;

      // Show a confirmation dialog before deactivating
      if (
        newStatus === 0 &&
        !window.confirm('Are you sure you want to deactivate this user?')
      ) {
        return;
      }

      await toggleUserActivation(userID, newStatus);
      const updatedUsers = users.map((user) =>
        user.ID === userID ? { ...user, active: newStatus } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error toggling user activation:', error);
    }
  };

  const columns = [
    {
      // Conditionally render the activate/deactivate button
      cell: (row) => (
        <button
          onClick={() => handleToggleActivation(row.ID, row.active)}
          className={`px-2 py-1 rounded ${
            row.active ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {row.active ? 'Deactivate' : 'Activate'}
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    { name: 'ID', selector: (row) => row.ID, sortable: true, wrap: true },
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
    { name: 'City', selector: (row) => row.city, sortable: true, wrap: true },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
      wrap: true,
    },
    { name: 'Phone', selector: (row) => row.phone, sortable: true, wrap: true },
    {
      name: 'Amount',
      selector: (row) => row.amount || '0',
      sortable: true,
      wrap: true,
    },
    {
      name: 'Active',
      selector: (row) => (row.active ? 'Yes' : 'No'),
      sortable: true,
      wrap: true,
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">All Users:</h2>
      {users.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={users}
            striped
            highlightOnHover
            pagination
            className="border w-full"
          />
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserManagement;

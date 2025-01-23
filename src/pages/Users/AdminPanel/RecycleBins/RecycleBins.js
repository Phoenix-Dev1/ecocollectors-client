import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {
  fetchAllRecycleBins,
  capitalizeFirstLetter,
  deactivateBin,
  activateBin,
} from './BinsFunctions';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const RecycleBins = () => {
  const [recycleBins, setRecycleBins] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(false);
  const navigate = useNavigate();

  const filterByType = (type) => {
    setSelectedTypeFilter(type);
    setDataRefreshTrigger(!dataRefreshTrigger);
  };

  const clearTypeFilter = () => {
    setSelectedTypeFilter(null);
    setDataRefreshTrigger(!dataRefreshTrigger);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllRecycleBins(selectedTypeFilter);
      setRecycleBins(data);
    };

    fetchData();
  }, [selectedTypeFilter, dataRefreshTrigger]);

  // Deactivate bin
  const handleDeactivateBin = async (binId) => {
    const confirmed = window.confirm(
      'Are you sure you want to deactivate this bin?'
    );
    if (confirmed) {
      try {
        await deactivateBin(binId);
        setDataRefreshTrigger(!dataRefreshTrigger); // Refresh data after deactivation
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Activate bin
  const handleActivateBin = async (binId) => {
    const confirmed = window.confirm(
      'Are you sure you want to activate this bin?'
    );
    if (confirmed) {
      try {
        await activateBin(binId);
        setDataRefreshTrigger(!dataRefreshTrigger); // Refresh data after activation
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Update Bin
  const handleUpdateBin = (binId) => {
    // Navigate to the update page with the selected bin's ID
    navigate(`/admin/update-bin/${binId}`);
  };

  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
      wrap: true,
    },
    { name: 'City', selector: (row) => row.city, sortable: true, wrap: true },
    {
      name: 'Latitude',
      selector: (row) => row.lat,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Longitude',
      selector: (row) => row.lng,
      sortable: true,
      wrap: true,
    },
    /*
    { name: 'Type', selector: (row) => row.type, sortable: true, wrap: true },*/
    {
      name: 'Last Modified',
      selector: (row) => format(new Date(row.last_modified), 'dd/MM/yyyy'), // Format the date

      sortable: true,
      wrap: true,
    },
    /*
    {
      name: 'Active',
      selector: (row) => (row.active ? 'Active' : 'Inactive'),
      sortable: true,
      wrap: true,
    },
    */
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          {row.active ? (
            <button
              onClick={() => handleDeactivateBin(row.id)}
              className="px-2 py-1 rounded mt-2 mb-2 bg-red-500 text-white mx-2"
            >
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => handleActivateBin(row.id)}
              className="px-2 py-1 rounded mt-2 mb-2 bg-green-500 text-white mx-2"
            >
              Activate
            </button>
          )}
          <button
            onClick={() => handleUpdateBin(row.id)} // Call the update function
            className="px-2 py-1 rounded mt-2 mb-2 bg-blue-500 text-white mx-2"
          >
            Update
          </button>
        </div>
      ),
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Recycle Bins:</h2>
      <button
        className="px-2 py-1 rounded bg-blue-500 hover:bg-orange-400 text-white mx-2 mb-3 w-1/3"
        onClick={() => navigate('/admin/add-bin')}
      >
        Add New Bin
      </button>
      <div className="mb-3">
        <button
          onClick={() => filterByType('blue')}
          className="px-2 py-1 rounded bg-blue-500 text-white mx-2"
        >
          Blue
        </button>
        <button
          onClick={() => filterByType('orange')}
          className="px-2 py-1 rounded bg-orange-500 text-white mx-2"
        >
          Orange
        </button>
        <button
          onClick={() => filterByType('purple')}
          className="px-2 py-1 rounded bg-purple-500 text-white mx-2"
        >
          Purple
        </button>
        <button
          onClick={() => filterByType('carton')}
          className="px-2 py-1 rounded bg-yellow-600 text-white mx-2"
        >
          Carton
        </button>
        <button
          onClick={() => filterByType('electronic-waste')}
          className="px-2 py-1 rounded bg-gray-400 text-white mx-2"
        >
          Electronic Waste
        </button>
        <button
          onClick={() => filterByType('textile')}
          className="px-2 py-1 rounded bg-green-500 text-white mx-2"
        >
          Textile
        </button>
        <button
          onClick={clearTypeFilter}
          className="px-2 py-1 rounded bg-rose-500 text-white mx-2"
        >
          Clear Filter
        </button>
      </div>
      {selectedTypeFilter && (
        <div className="mb-3">
          <p>Bin Type: {capitalizeFirstLetter(selectedTypeFilter)}</p>
        </div>
      )}
      {recycleBins.length > 0 ? (
        <div className="mr-4 ">
          <DataTable
            columns={columns}
            data={recycleBins}
            striped
            highlightOnHover
            pagination
            className="border w-full"
          />
        </div>
      ) : (
        <p>No recycle bins found</p>
      )}
    </div>
  );
};

export default RecycleBins;

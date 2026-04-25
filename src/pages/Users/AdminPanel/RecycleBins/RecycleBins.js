import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {
  fetchAllRecycleBins,
  capitalizeFirstLetter,
  deactivateBin,
  activateBin,
} from './BinsFunctions';
import { FiGrid, FiX, FiSettings, FiUser, FiBox, FiCheckCircle, FiClock, FiUsers, FiUserPlus, FiLayers, FiTrash2 } from "react-icons/fi";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const RecycleBins = () => {
  const [recycleBins, setRecycleBins] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState(null);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(false);
  const navigate = useNavigate();

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
        paddingTop: '8px',
        paddingBottom: '8px',
      },
    },
    rows: {
      style: {
        minHeight: '52px',
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

  const baseBtnClass = "px-4 py-1.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 whitespace-nowrap shadow-sm";

  const columns = [
    { name: 'ID', selector: (row) => row.id, sortable: true, width: '80px' },
    {
      name: 'Address',
      selector: (row) => row.address,
      sortable: true,
      wrap: true,
      grow: 3,
    },
    { name: 'City', selector: (row) => row.city, sortable: true, wrap: true, minWidth: '120px' },
    {
      name: 'Latitude',
      selector: (row) => row.lat,
      sortable: true,
      minWidth: '110px',
    },
    {
      name: 'Longitude',
      selector: (row) => row.lng,
      sortable: true,
      minWidth: '110px',
    },
    {
      name: 'Last Modified',
      selector: (row) => format(new Date(row.last_modified), 'dd/MM/yyyy · HH:mm'),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex items-center gap-2 py-2">
          {row.active ? (
            <button
              onClick={() => handleDeactivateBin(row.id)}
              className={`${baseBtnClass} bg-red-500 hover:bg-red-600 text-white shadow-red-500/20`}
            >
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => handleActivateBin(row.id)}
              className={`${baseBtnClass} bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20`}
            >
              Activate
            </button>
          )}
          <button
            onClick={() => handleUpdateBin(row.id)}
            className={`${baseBtnClass} bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20`}
          >
            Update
          </button>
        </div>
      ),
      center: true,
      minWidth: '300px',
    },
  ];

  const filterBtnClass = (type, colorClass) => `px-4 py-2 rounded-full font-black uppercase text-[9px] tracking-widest transition-all active:scale-90 border-2 ${
    selectedTypeFilter === type 
    ? `${colorClass} border-transparent text-white shadow-lg` 
    : `bg-white border-slate-100 text-slate-400 hover:border-slate-200`
  }`;

  return (
    <div className="max-w-none mx-auto w-full p-4 md:p-8 md:px-12 animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Recycle Bins</h2>
          <p className="text-slate-500 text-sm font-medium">Manage geographic distribution of recycling points.</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => filterByType('blue')}
            className={filterBtnClass('blue', 'bg-blue-500')}
          >
            Blue
          </button>
          <button
            onClick={() => filterByType('orange')}
            className={filterBtnClass('orange', 'bg-orange-500')}
          >
            Orange
          </button>
          <button
            onClick={() => filterByType('purple')}
            className={filterBtnClass('purple', 'bg-purple-500')}
          >
            Purple
          </button>
          <button
            onClick={() => filterByType('carton')}
            className={filterBtnClass('carton', 'bg-amber-600')}
          >
            Carton
          </button>
          <button
            onClick={() => filterByType('electronic-waste')}
            className={filterBtnClass('electronic-waste', 'bg-slate-600')}
          >
            Electronic
          </button>
          <button
            onClick={() => filterByType('textile')}
            className={filterBtnClass('textile', 'bg-emerald-500')}
          >
            Textile
          </button>
          <button
            onClick={clearTypeFilter}
            className="px-4 py-2 rounded-full font-black uppercase text-[9px] tracking-widest bg-rose-50 text-rose-600 border-2 border-rose-100 hover:bg-rose-100 transition-all"
          >
            Clear
          </button>
        </div>

        <button
          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 active:scale-95 whitespace-nowrap"
          onClick={() => navigate('/admin/add-bin')}
        >
          Add New Bin
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {recycleBins.length > 0 ? (
          <DataTable
            columns={columns}
            data={recycleBins}
            pagination
            customStyles={customStyles}
            highlightOnHover
            pointerOnHover
            noHeader
          />
        ) : (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <FiTrash2 className="text-slate-300 w-10 h-10" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No recycle bins found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecycleBins;

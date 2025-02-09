import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import DataTable from "react-data-table-component";
import { fetchUserRequests, fetchRecyclerDetails } from "../UserFunctions";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const Cancelled = () => {
  const { currentUser } = useContext(AuthContext);

  // Fetch user requests using react-query
  const { data: cancelledRequests = [] } = useQuery({
    queryKey: ["cancelledRequests", currentUser.ID],
    queryFn: async () => {
      const data = await fetchUserRequests(currentUser.ID);
      return data.filter((request) => request.status === 4);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  // Fetch recycler details only if there are cancelled requests
  const { data: recyclerDetails = {} } = useQuery({
    queryKey: ["recyclerDetails", cancelledRequests],
    queryFn: async () => {
      const recyclerIds = cancelledRequests.map((req) => req.recycler_id);
      const detailsArray = await Promise.all(
        recyclerIds.map((id) => fetchRecyclerDetails(id))
      );
      return Object.fromEntries(
        detailsArray.map((detail, index) => [recyclerIds[index], detail[0]])
      );
    },
    enabled: cancelledRequests.length > 0,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  const columns = [
    {
      name: "Request Date",
      selector: (row) =>
        format(new Date(row.request_date), "dd/MM/yyyy - HH:mm"),
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Address",
      selector: (row) => row.req_address,
      sortable: true,
      wrap: true,
    },
    {
      name: "Bottles Number",
      selector: (row) => row.bottles_number,
      sortable: true,
      center: true,
    },
    {
      name: "Recycler Name",
      selector: (row) =>
        recyclerDetails[row.recycler_id]?.first_name +
          " " +
          recyclerDetails[row.recycler_id]?.last_name || "None",
      sortable: true,
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => recyclerDetails[row.recycler_id]?.phone || "None",
      sortable: true,
      center: true,
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold mb-4">Cancelled Requests:</h2>
      {cancelledRequests.length > 0 ? (
        <div className="mx-auto w-full px-4 md:max-w-3xl lg:max-w-4xl xl:max-w-6xl text-center">
          <DataTable
            columns={columns}
            data={cancelledRequests}
            striped
            highlightOnHover
            pagination
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

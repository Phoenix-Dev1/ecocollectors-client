import React from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { FiNavigation } from "react-icons/fi";
import { formatDateTime } from "./mapFunctions";
import { createRequestIcon } from "./mapIcons";
import { ROLE, COLLECTOR_ROLES } from "../../utils/roles";
import { acceptRequest, declineRequest } from "../../pages/Users/UserFunctions";

// Request statuses shown on the public map (the server sends only these two)
const AWAITS_RECYCLER = 1;
const AWAITS_APPROVAL = 2;

const RequestMarkers = ({ requests, selectedMarker, setSelectedMarker, currentUser, handleShowAddress, handleOpenGoogleMaps, onRequestChanged }) => {
  const queryClient = useQueryClient();

  // The owner accepts or declines the recycler who claimed the request.
  // Both helpers ask for confirmation and report errors; null = nothing changed.
  const answerRecycler = async (action, requestId, successMessage) => {
    const result = await action(requestId);
    if (!result) return;
    toast.success(successMessage);
    setSelectedMarker(null);
    onRequestChanged?.();
    queryClient.invalidateQueries({ queryKey: ["pendingRequests"] });
  };

  return (
    <>
      {Array.isArray(requests) &&
        requests.map((request) => {
          const {
            request_id,
            req_lat,
            req_lng,
            req_address,
            bottles_number,
            from_hour,
            to_hour,
            request_date,
            status,
            type,
            is_mine,
          } = request;

          const markerClicked = selectedMarker === req_address;
          // is_mine comes from the server (the public list has no user ids).
          // Requests can be edited only while no recycler has claimed them.
          const canUpdate =
            (Boolean(is_mine) || currentUser?.role === ROLE.ADMIN) &&
            status === AWAITS_RECYCLER;
          // A recycler claimed the owner's request: the owner accepts or declines
          const canAnswer = Boolean(is_mine) && status === AWAITS_APPROVAL;
          // The server refuses claims on your own or an already claimed request
          const canCollect =
            COLLECTOR_ROLES.includes(currentUser?.role) &&
            !is_mine &&
            status === AWAITS_RECYCLER;

          return (
            <MarkerF
              key={`request-${request_id}`}
              position={{ lat: req_lat, lng: req_lng }}
              icon={{
                url: createRequestIcon(type),
                scaledSize: new window.google.maps.Size(44, 44),
                anchor: new window.google.maps.Point(22, 22),
              }}
              onClick={() => handleShowAddress(req_address)}
            >
              {markerClicked && (
                <InfoWindowF
                  onCloseClick={() => setSelectedMarker(null)}
                  disableAutoClose={true}
                >
                  <div className="p-2 min-w-[280px]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-eco-text truncate max-w-[180px]" title={req_address}>
                        {req_address}
                      </h3>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        status === AWAITS_APPROVAL ? 'bg-purple-100 text-purple-700' : 'bg-eco-background text-eco-primary'
                      }`}>
                        {status === AWAITS_APPROVAL ? 'Awaits approval' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div>
                        <p className="text-[10px] font-bold text-eco-muted uppercase tracking-tight mb-1">Bottles</p>
                        <div className="flex items-center space-x-1.5">
                          <i className="fa fa-shopping-bag text-eco-primary text-xs"></i>
                          <p className="text-sm font-bold text-eco-text">{bottles_number}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-eco-muted uppercase tracking-tight mb-1">Time Window</p>
                        <div className="flex items-center space-x-1.5">
                          <i className="fa fa-clock-o text-eco-primary text-xs"></i>
                          <p className="text-sm font-bold text-eco-text">{from_hour} - {to_hour}</p>
                        </div>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-gray-200/60">
                        <p className="text-[10px] font-bold text-eco-muted uppercase tracking-tight mb-1">Scheduled Date</p>
                        <div className="flex items-center space-x-1.5">
                          <i className="fa fa-calendar text-eco-primary text-xs"></i>
                          <p className="text-sm font-bold text-eco-text">{formatDateTime(request_date)}</p>
                        </div>
                      </div>
                    </div>

                    {canAnswer && (
                      <p className="mb-3 text-xs font-medium text-eco-muted">
                        A recycler wants to collect this request. Accept to confirm the pickup.
                      </p>
                    )}

                    <div className="flex gap-2">
                      {canAnswer && (
                        <>
                          <button
                            type="button"
                            onClick={() => answerRecycler(acceptRequest, request_id, "Pickup accepted")}
                            className="flex-1 py-3 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all shadow-md text-center flex items-center justify-center active:scale-95"
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => answerRecycler(declineRequest, request_id, "Pickup declined: the request is open again")}
                            className="flex-1 py-3 bg-white border border-red-200 text-red-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-50 transition-all text-center flex items-center justify-center active:scale-95 shadow-sm"
                          >
                            Decline
                          </button>
                        </>
                      )}
                      {canUpdate && (
                        <Link
                          to={`/user/update-request?Id=${request_id}`}
                          className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all text-center flex items-center justify-center active:scale-95 shadow-sm"
                        >
                          Update
                        </Link>
                      )}
                      {canCollect && (
                        <Link
                          to={`/collect?Id=${request_id}`}
                          className="flex-1 py-3 bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all shadow-md text-center flex items-center justify-center active:scale-95"
                        >
                          Collect
                        </Link>
                      )}
                      {currentUser?.role !== 2 &&
                        currentUser?.role !== 5 &&
                        status !== AWAITS_APPROVAL &&
                        currentUser && (
                          <button
                            className="w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm active:scale-95"
                            onClick={() => handleOpenGoogleMaps(req_lat, req_lng)}
                            title="Navigate"
                          >
                            <FiNavigation size={20} />
                          </button>
                        )}
                    </div>
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          );
        })}
    </>
  );
};

export default RequestMarkers;

import React from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { formatDateTime } from "./mapFunctions";

const RequestMarkers = ({ requests, selectedMarker, setSelectedMarker, currentUser, handleShowAddress, handleOpenGoogleMaps }) => {
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
            user_id,
          } = request;

          const markerClicked = selectedMarker === req_address;
          const isCurrentUser = currentUser?.ID === user_id || currentUser?.role === 1;

          return (
            <MarkerF
              key={`request-${request_id}`}
              position={{ lat: req_lat, lng: req_lng }}
              icon={{
                url: require(`../../img/icons/${type}.png`),
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
                        status === 2 ? 'bg-green-100 text-green-700' : 'bg-eco-background text-eco-primary'
                      }`}>
                        {status === 2 ? 'Collected' : 'Pending'}
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

                    <div className="flex space-x-2">
                      {isCurrentUser && (
                        <Link
                          to={`/user/update-request?Id=${request_id}`}
                          className="flex-1 py-2.5 bg-white border border-gray-200 text-eco-text font-bold text-xs rounded-xl hover:bg-gray-50 transition-all text-center"
                        >
                          Update
                        </Link>
                      )}
                      {currentUser &&
                        (currentUser.role === 1 ||
                          (currentUser.ID !== user_id &&
                            currentUser.role !== 2 &&
                            currentUser.role !== 5 &&
                            status !== 2)) && (
                          <Link
                            to={`/collect?Id=${request_id}`}
                            className="flex-1 py-2.5 bg-eco-primary text-white font-bold text-xs rounded-xl hover:bg-eco-secondary transition-all shadow-md text-center"
                          >
                            Collect
                          </Link>
                        )}
                      {currentUser?.role !== 2 &&
                        currentUser?.role !== 5 &&
                        status !== 2 &&
                        currentUser && (
                          <button
                            className="p-2.5 bg-eco-background text-eco-primary rounded-xl hover:bg-eco-primary/10 transition-all border border-eco-primary/20"
                            onClick={() => handleOpenGoogleMaps(req_lat, req_lng)}
                            title="Navigate"
                          >
                            <i className="fa fa-location-arrow"></i>
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

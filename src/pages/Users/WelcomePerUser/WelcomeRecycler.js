import React, { useState, useEffect } from "react";
import axios from "axios";

const WelcomeRecycler = () => {
  const [totalRequestsPickedUp, setTotalRequestsPickedUp] = useState(0);
  const [totalRecycledBottles, setTotalRecycledBottles] = useState(0);
  const [avgClosingTime, setAvgClosingTime] = useState("");
  const [currentMonthRecycledBottles, setCurrentMonthRecycledBottles] =
    useState(0);
  const [last3UsersNames, setLast3UsersNames] = useState(0);
  const [openRequests, setOpenRequests] = useState(0);

  useEffect(() => {
    const fetchRecyclerData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/user/welcomeRecycler`
        );
        setTotalRequestsPickedUp(res.data.totalRequestsPickedUp);
        setTotalRecycledBottles(res.data.totalRecycledBottles);
        setAvgClosingTime(res.data.avgClosingTime);
        setCurrentMonthRecycledBottles(res.data.currentMonthRecycledBottles);
        setLast3UsersNames(res.data.last3UsersNames);
        setOpenRequests(res.data.openRequests);
      } catch (error) {
        console.error("Error fetching recycler data:", error);
        setTotalRequestsPickedUp(-1);
        setTotalRecycledBottles(-1);
        setAvgClosingTime(-1);
        setCurrentMonthRecycledBottles(-1);
        setLast3UsersNames(-1);
        setOpenRequests(-1);
      }
    };
    fetchRecyclerData();
  }, []);

  const renderMetricCards = () => {
    const currentDate = new Date();
    const currentMonth = new Intl.DateTimeFormat("en", {
      month: "long",
    }).format(currentDate);
    const metricStyles = [
      {
        title: "Total Requests Picked Up",
        cardStyle:
          "bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600",
        titleStyle: "text-green-600",
        value: totalRequestsPickedUp,
      },
      {
        title: "Total Number Of Bottles Recycled",
        cardStyle:
          "bg-gradient-to-b from-indigo-200 to-indigo-100 border-b-4 border-indigo-500",
        titleStyle: "text-indigo-500",
        value: totalRecycledBottles,
      },
      {
        title: `Bottles Collected This Month (${currentMonth})`,
        cardStyle:
          "bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-indigo-yellow",
        titleStyle: "text-yellow-500",
        value: currentMonthRecycledBottles,
      },
      {
        title: "Last 3 Users Picked Up From",
        cardStyle:
          "bg-gradient-to-b from-purple-300 to-purple-200 border-b-4 border-purple-500",
        titleStyle: "text-purple-500",
        value:
          last3UsersNames.length > 0 ? (
            last3UsersNames.map((request, index) => (
              <div key={`last-request-${index}`}>{request.full_name}</div>
            ))
          ) : (
            <div>No Completed Requests</div> // Display a message when no completed requests
          ),
      },
      {
        title: "Open Requests To Pick Up",
        cardStyle:
          "bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500",
        titleStyle: "text-pink-500",
        value: openRequests,
      },
      {
        title: "Average Request Closing Time",
        cardStyle:
          "bg-gradient-to-b from-red-200 to-red-100 border-b-4 border-red-500",
        titleStyle: "text-red-500",
        value: avgClosingTime,
      },
    ];

    return metricStyles.map((metric, index) => {
      const { title, cardStyle, titleStyle, value } = metric;

      return (
        <div
          className="w-full md:w-1/2 xl:w-1/3 p-6"
          key={`metric-card-${index}`}
        >
          <div className={`border rounded-lg shadow-xl p-5 ${cardStyle}`}>
            <h2 className={`text-lg font-semibold ${titleStyle}`}>{title}</h2>
            <p className="text-gray-600 mt-2">{value}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <main>
      <div className="flex flex-col md:flex-row">
        <section>
          <div className="bg-gray-800 pt-3">
            <h1
              className="font-bold text-5xl cursor-pointer mb-4 mt-6"
              style={{
                "--s": "0.1em",
                "--c": "#2c4bff",
                color: "var(--c)",
                paddingBottom: "var(--s)",
                background: `linear-gradient(90deg,var(--c) 50%,#000 0) calc(100% - var(--_p,0%))/200% 100%,linear-gradient(var(--c) 0 0) 0% 100%/var(--_p,0%) var(--s) no-repeat`,
                WebkitBackgroundClip: "text,padding-box",
                backgroundClip: "text,padding-box",
                transition: "0.5s",
              }}
              onMouseEnter={(e) => {
                e.target.style.setProperty("--_p", "100%");
                e.target.style.setProperty("--c", "#2c4bff");
              }}
              onMouseLeave={(e) => {
                e.target.style.setProperty("--_p", "0%");
                e.target.style.setProperty("--c", "#ffffff");
              }}
            >
              Welcome Recycler!
            </h1>
          </div>
          <div
            id="main"
            className="main-content flex-1 bg-gray-700 mt-4 md:mt-2 pb-24 md:pb-5"
          >
            <div className="mb-6 flex flex-wrap font-bold text-2xl">
              {renderMetricCards()}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WelcomeRecycler;

import React, { useState, useEffect } from "react";
import axios from "axios";

const WelcomeUser = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalRecycledBottles, setTotalRecycledBottles] = useState(0);
  const [avgClosingTime, setAvgClosingTime] = useState(0);
  const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
  const [last3RecyclersNames, setLast3RecyclersNames] = useState(0);
  const [currentMonthRecycledBottles, setCurrentMonthRecycledBottles] =
    useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/user/welcomeUser`,
          { withCredentials: true }
        );
        setTotalRequests(res.data.totalRequests);
        setTotalRecycledBottles(res.data.totalRecycledBottles);
        setAvgClosingTime(res.data.avgClosingTime);
        setTotalCompletedRequests(res.data.totalCompletedRequests);
        setLast3RecyclersNames(res.data.last3RecyclersNames);
        setCurrentMonthRecycledBottles(res.data.currentMonthRecycledBottles);
      } catch (error) {
        setTotalRequests(-1);
        setTotalRecycledBottles(-1);
        setAvgClosingTime(-1);
        setTotalCompletedRequests(-1);
        setLast3RecyclersNames(-1);
        setCurrentMonthRecycledBottles(-1);
      }
    };
    fetchUserData();
  }, []);

  const renderMetricCards = () => {
    const currentDate = new Date();
    const currentMonth = new Intl.DateTimeFormat("en", {
      month: "long",
    }).format(currentDate);

    const metrics = [
      {
        title: "Total Requests",
        value: totalRequests,
        icon: "fa-list-check",
        color: "text-blue-500",
        bg: "bg-blue-50",
      },
      {
        title: "Bottles Recycled",
        value: totalRecycledBottles,
        icon: "fa-bottle-water",
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      },
      {
        title: "Completed",
        value: totalCompletedRequests,
        icon: "fa-circle-check",
        color: "text-amber-500",
        bg: "bg-amber-50",
      },
      {
        title: "Recent Recyclers",
        value: last3RecyclersNames.length > 0 ? (
          <div className="space-y-1">
            {last3RecyclersNames.slice(0, 3).map((request, index) => (
              <div key={index} className="text-sm font-medium">{request.full_name}</div>
            ))}
          </div>
        ) : "None yet",
        icon: "fa-users",
        color: "text-purple-500",
        bg: "bg-purple-50",
      },
      {
        title: `${currentMonth} Impact`,
        value: `${currentMonthRecycledBottles} Bottles`,
        icon: "fa-calendar-check",
        color: "text-pink-500",
        bg: "bg-pink-50",
      },
      {
        title: "Avg. Closing Time",
        value: removeNegativeSigns(avgClosingTime),
        icon: "fa-clock",
        color: "text-indigo-500",
        bg: "bg-indigo-50",
      },
    ];

    return metrics.map((metric, index) => (
      <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={index}>
        <div className="glass !rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white/20 group">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${metric.bg} ${metric.color} rounded-2xl flex items-center justify-center text-xl transition-transform group-hover:scale-110`}>
              <i className={`fa-solid ${metric.icon}`}></i>
            </div>
          </div>
          <h3 className="text-eco-muted font-medium text-sm uppercase tracking-wider">{metric.title}</h3>
          <div className="text-2xl font-bold text-eco-text mt-1">
            {metric.value}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-eco-text">
          Welcome back, <span className="bg-gradient-to-r from-eco-primary to-eco-secondary bg-clip-text text-transparent">Collector!</span>
        </h1>
        <p className="text-eco-muted mt-2 text-lg">Here's a summary of your environmental impact</p>
      </div>

      <div className="flex flex-wrap -m-4">
        {renderMetricCards()}
      </div>
    </div>
  );
};

// GMT Bug quick fix
function removeNegativeSigns(timeString) {
  // Remove all minus signs from the string
  return timeString.includes("-") ? timeString.replace(/-/g, "") : timeString;
}

export default WelcomeUser;

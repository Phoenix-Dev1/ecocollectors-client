import React, { useState, useEffect } from "react";
import axios from "axios";

const WelcomeAdmin = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalRecycledBottles, setTotalRecycledBottles] = useState(0);
  const [avgClosingTime, setAvgClosingTime] = useState(0);
  const [activeBinsCount, setActiveBinsCount] = useState(0);
  const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
  const [currentMonthCollectedBottles, setCurrentMonthCollectedBottles] =
    useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/user/welcomeAdmin`,
          { withCredentials: true }
        );
        setTotalRequests(res.data.totalRequests);
        setTotalRecycledBottles(res.data.totalRecycledBottles);
        setAvgClosingTime(res.data.avgClosingTime);
        setActiveBinsCount(res.data.activeBinsCount);
        setTotalCompletedRequests(res.data.totalCompletedRequests);
        setCurrentMonthCollectedBottles(res.data.currentMonthCollectedBottles);
      } catch (err) {
        setTotalRequests(-1);
        setTotalRecycledBottles(-1);
        setAvgClosingTime(-1);
        setActiveBinsCount(-1);
        setTotalCompletedRequests(-1);
        setCurrentMonthCollectedBottles(-1);
      }
    };
    fetchData();
  }, []);

  const renderMetricCards = () => {
    const currentDate = new Date();
    const currentMonth = new Intl.DateTimeFormat("en", {
      month: "long",
    }).format(currentDate);

    const metrics = [
      {
        title: "Total Requests",
        subtitle: "All platform users",
        value: totalRequests,
        icon: "fa-list-check",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
      },
      {
        title: "Bottles Recycled",
        subtitle: "Global ecosystem total",
        value: totalRecycledBottles,
        icon: "fa-bottle-water",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      },
      {
        title: "Active Bins",
        subtitle: "Deployed in system",
        value: activeBinsCount,
        icon: "fa-trash-can",
        color: "text-amber-600",
        bg: "bg-amber-50",
      },
      {
        title: "Completed Work",
        subtitle: "Fulfilled requests",
        value: totalCompletedRequests,
        icon: "fa-circle-check",
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        title: `${currentMonth} Collection`,
        subtitle: "Current month impact",
        value: `${currentMonthCollectedBottles} Bottles`,
        icon: "fa-calendar-day",
        color: "text-pink-600",
        bg: "bg-pink-50",
      },
      {
        title: "Avg. Resolution",
        subtitle: "Closing time efficiency",
        value: `${avgClosingTime} min`,
        icon: "fa-clock",
        color: "text-slate-600",
        bg: "bg-slate-50",
      },
    ];

    return metrics.map((metric, index) => (
      <div className="w-full sm:w-1/2 lg:w-1/3 p-4" key={index}>
        <div className="backdrop-blur-md bg-white/70 rounded-[2rem] p-8 border border-white/40 shadow-sm hover:shadow-xl transition-all duration-500 group">
          <div className="flex items-center justify-between mb-6">
            <div className={`w-14 h-14 ${metric.bg} ${metric.color} rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
              <i className={`fa-solid ${metric.icon}`}></i>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-black text-eco-muted uppercase tracking-[0.2em] mb-1">{metric.subtitle}</span>
              <div className="h-1.5 w-12 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${metric.bg.replace('bg-', 'bg-').replace('50', '500')} w-2/3`}></div>
              </div>
            </div>
          </div>
          <h3 className="text-eco-muted font-bold text-sm uppercase tracking-wider">{metric.title}</h3>
          <div className="text-4xl font-black text-eco-text mt-2 tracking-tight">
            {metric.value === -1 ? (
              <span className="text-red-400">Error</span>
            ) : (
              metric.value
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="animate-fade-in font-poppins">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
          <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em]">Administrator Terminal</span>
        </div>
        <h1 className="text-5xl font-black text-eco-text leading-[1.1]">
          Welcome Back, <br />
          <span className="bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">System Admin.</span>
        </h1>
        <p className="text-eco-muted mt-4 text-xl font-medium max-w-2xl leading-relaxed">
          Monitor the global ecosystem performance and manage platform-wide recycling operations from your command center.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="flex flex-wrap -m-4">
        {renderMetricCards()}
      </div>

      {/* Quick Actions Placeholder */}
      <div className="mt-16 p-10 backdrop-blur-xl bg-slate-900/5 rounded-[3rem] border border-slate-200/50 relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-slate-800 mb-2">Platform Overview</h2>
          <p className="text-slate-500 font-medium">All systems are operational. You have 0 pending join requests to review today.</p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-700"></div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;

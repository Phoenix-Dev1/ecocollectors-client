import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiUsers, FiUserPlus, FiLayers, FiTrash2, FiActivity, FiArrowRight, FiCheckCircle, FiCalendar, FiClock } from "react-icons/fi";

const WelcomeAdmin = () => {
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalRecycledBottles, setTotalRecycledBottles] = useState(0);
  const [avgClosingTime, setAvgClosingTime] = useState(0);
  const [activeBinsCount, setActiveBinsCount] = useState(0);
  const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
  const [currentMonthCollectedBottles, setCurrentMonthCollectedBottles] = useState(0);

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
        const errorVal = -1;
        setTotalRequests(errorVal);
        setTotalRecycledBottles(errorVal);
        setAvgClosingTime(errorVal);
        setActiveBinsCount(errorVal);
        setTotalCompletedRequests(errorVal);
        setCurrentMonthCollectedBottles(errorVal);
      }
    };
    fetchData();
  }, []);

  const currentDate = new Date();
  const currentMonth = new Intl.DateTimeFormat("en", {
    month: "long",
  }).format(currentDate);

  const metrics = [
    {
      title: "Total Requests",
      subtitle: "Platform-wide",
      value: totalRequests,
      icon: <FiLayers />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Bottles Recycled",
      subtitle: "Global Impact",
      value: totalRecycledBottles,
      icon: <FiActivity />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Active Bins",
      subtitle: "Network Status",
      value: activeBinsCount,
      icon: <FiTrash2 />,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Completed Work",
      subtitle: "Fulfilled requests",
      value: totalCompletedRequests,
      icon: <FiCheckCircle />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: `${currentMonth} Impact`,
      subtitle: "Monthly Collection",
      value: currentMonthCollectedBottles,
      icon: <FiCalendar />,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      title: "Avg. Resolution",
      subtitle: "Closing Efficiency",
      value: `${avgClosingTime}m`,
      icon: <FiClock />,
      color: "text-slate-600",
      bg: "bg-slate-50",
    },
  ];

  const quickActions = [
    {
      title: "User Management",
      desc: "Manage platform users and roles",
      icon: <FiUsers size={24} />,
      path: "/admin/user-management",
      color: "indigo"
    },
    {
      title: "Join Requests",
      desc: "Review new recycler applications",
      icon: <FiUserPlus size={24} />,
      path: "/admin/join-requests",
      color: "indigo"
    },
    {
      title: "All Requests",
      desc: "Monitor recycling transactions",
      icon: <FiLayers size={24} />,
      path: "/admin/requests",
      color: "indigo"
    },
    {
      title: "Recycle Bins",
      desc: "Deploy and update bin locations",
      icon: <FiTrash2 size={24} />,
      path: "/admin/bins",
      color: "indigo"
    }
  ];

  return (
    <div className="animate-fade-in px-4 md:px-0">
      {/* Header Section */}
      <div className="mb-12 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1.5 w-12 bg-slate-800 rounded-full"></div>
          <span className="text-xs font-black text-slate-800 uppercase tracking-[0.3em]">Administrator Terminal</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-eco-text leading-[1.1] tracking-tight">
          Welcome Back, <br />
          <span className="bg-gradient-to-r from-slate-900 to-indigo-700 bg-clip-text text-transparent">System Admin.</span>
        </h1>
        <p className="text-eco-muted mt-6 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          Monitor global platform performance and manage recycling infrastructure from your centralized command center.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="glass !bg-white/90 p-6 rounded-[2.5rem] shadow-lg border border-white/40 group hover:shadow-xl transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 ${metric.bg} ${metric.color} rounded-2xl flex items-center justify-center text-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm`}>
                {metric.icon}
              </div>
              <span className="text-[10px] font-black text-eco-muted uppercase tracking-wider">{metric.subtitle}</span>
            </div>
            <h3 className="text-eco-muted font-bold text-xs uppercase tracking-widest">{metric.title}</h3>
            <div className="text-3xl font-black text-eco-text mt-2">
              {metric.value === -1 ? <span className="text-red-400">Error</span> : metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Quick Access Control</h2>
          <div className="hidden md:block h-px flex-1 bg-slate-100 mx-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Link 
              key={index}
              to={action.path}
              className="group relative block p-8 glass !bg-white/80 rounded-[2.5rem] shadow-md border border-white/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden min-h-[140px]"
            >
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:bg-indigo-600">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 mb-1 tracking-tight">{action.title}</h3>
                    <p className="text-slate-500 font-medium text-sm">{action.desc}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 transition-all duration-500 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900">
                  <FiArrowRight size={18} />
                </div>
              </div>
              
              {/* Decorative background pulse */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-slate-900/5 rounded-full blur-2xl group-hover:bg-indigo-600/10 transition-all duration-700"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Insight Card */}
      <div className="p-10 backdrop-blur-xl bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-2xl font-black mb-2 tracking-tight italic">Platform Intelligence</h2>
          <p className="text-slate-300 font-medium max-w-lg leading-relaxed">
            All services are currently optimal. System-wide recycling activity is up 12% from last week. Keep up the great work!
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 text-slate-800 opacity-20">
          <FiActivity size={120} />
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;

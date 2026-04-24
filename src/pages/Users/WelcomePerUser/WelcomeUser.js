import React, { useState, useEffect, useContext } from "react";
import api from "../../../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { FiMap, FiClock, FiCheckCircle, FiUser, FiSettings, FiArrowRight, FiActivity, FiUsers, FiCalendar } from "react-icons/fi";

const WelcomeUser = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalRecycledBottles, setTotalRecycledBottles] = useState(0);
  const [avgClosingTime, setAvgClosingTime] = useState(0);
  const [totalCompletedRequests, setTotalCompletedRequests] = useState(0);
  const [last3RecyclersNames, setLast3RecyclersNames] = useState([]);
  const [currentMonthRecycledBottles, setCurrentMonthRecycledBottles] = useState(0);

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
        setLast3RecyclersNames(res.data.last3RecyclersNames || []);
        setCurrentMonthRecycledBottles(res.data.currentMonthRecycledBottles);
      } catch (error) {
        console.error("Session potentially expired or unauthorized:", error);
        if (error.response?.status === 401) {
          logout();
        }
        setTotalRequests(-1);
        setTotalRecycledBottles(-1);
        setAvgClosingTime(-1);
        setTotalCompletedRequests(-1);
        setLast3RecyclersNames([]);
        setCurrentMonthRecycledBottles(-1);
      }
    };
    fetchUserData();
  }, [logout]);

  const currentDate = new Date();
  const currentMonth = new Intl.DateTimeFormat("en", { month: "long" }).format(currentDate);

  const metrics = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: <FiActivity />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Completed",
      value: totalCompletedRequests,
      icon: <FiCheckCircle />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Success Rate",
      value: totalRequests > 0 ? `${Math.round((totalCompletedRequests / totalRequests) * 100)}%` : "0%",
      icon: <FiActivity />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: `${currentMonth} Count`,
      value: currentMonthRecycledBottles,
      icon: <FiCalendar />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Impact Score",
      value: totalRecycledBottles,
      icon: <FiCheckCircle />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Avg. Resolution",
      value: removeNegativeSigns(avgClosingTime),
      icon: <FiClock />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const quickLinks = [
    { label: "Pending", path: "/user/pending-requests", icon: <FiClock />, color: "emerald" },
    { label: "History", path: "/user/completed-requests", icon: <FiCheckCircle />, color: "emerald" },
    { label: "Profile", path: "/user/update-user-info", icon: <FiUser />, color: "emerald" },
    { label: "Security", path: "/user/change-password", icon: <FiSettings />, color: "emerald" },
  ];

  return (
    <div className="animate-fade-in px-4 md:px-0 font-poppins pb-12">
      {/* 🌟 HERO SECTION - THE WOW FACTOR */}
      <div className="relative overflow-hidden mb-12 rounded-[3rem] bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400 shadow-2xl p-8 md:p-12 text-white group">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1.5 w-12 bg-white/40 rounded-full"></div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/80">Environmental Leader</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
            Greetings, <br />
            <span className="text-emerald-100 italic">{currentUser?.first_name || "Collector"}!</span>
          </h1>
          
          <p className="text-emerald-50/90 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-xl">
            You've diverted <span className="text-white font-black underline decoration-emerald-300 underline-offset-4">{totalRecycledBottles} units</span> from landfills. Your contribution is shaping a greener future.
          </p>
          
          <Link 
            to="/map" 
            className="inline-flex items-center gap-4 bg-white text-emerald-600 px-8 py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-emerald-900/20 hover:-translate-y-1 transition-all group/btn active:scale-95"
          >
            <FiMap className="text-2xl" />
            Launch Interactive Map
            <FiArrowRight className="transition-transform group-hover/btn:translate-x-2" />
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl transition-all duration-1000 group-hover:bg-white/20"></div>
        <div className="absolute right-10 bottom-10 opacity-10 text-white">
          <FiMap size={300} />
        </div>
      </div>

      {/* 📊 METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="glass !bg-white/90 p-8 rounded-[2.5rem] shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 group hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${metric.bg} ${metric.color} rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                {metric.icon}
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-eco-muted uppercase tracking-widest block mb-1">Live Stat</span>
                <div className="h-1 w-8 bg-emerald-100 rounded-full ml-auto"></div>
              </div>
            </div>
            <h3 className="text-eco-muted font-bold text-xs uppercase tracking-[0.1em]">{metric.title}</h3>
            <div className="text-3xl font-black text-eco-text mt-2 tracking-tight truncate">
              {metric.value === -1 ? "---" : metric.value}
            </div>
          </div>
        ))}
      </div>

      {/* 🔗 QUICK ACTIONS */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight italic">Quick Access</h2>
          <div className="hidden md:block h-px flex-1 bg-emerald-50 mx-8"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.path}
              className="group p-6 md:p-8 glass !bg-white/80 rounded-[2.5rem] shadow-md border border-white/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col items-center text-center justify-center"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl md:text-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <h3 className="text-sm md:text-lg font-black text-slate-800 tracking-tight">{link.label}</h3>
              <p className="hidden md:block text-slate-400 text-[10px] font-bold mt-2 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Manage</p>
            </Link>
          ))}
        </div>
      </div>

      {/* 👥 RECENT RECYCLERS WIDGET */}
      <div className="mt-12 p-8 glass !bg-emerald-50/30 border border-emerald-100 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner">
            <FiUsers size={28} />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-800">Collector Community</h4>
            <p className="text-slate-500 text-sm font-medium">Recent users who completed collections in your area.</p>
          </div>
        </div>
        
        <div className="flex -space-x-3 overflow-hidden">
          {last3RecyclersNames.length > 0 ? (
            last3RecyclersNames.slice(0, 5).map((user, i) => (
              <div key={i} title={user.full_name} className="inline-block h-12 w-12 rounded-2xl ring-4 ring-white bg-emerald-500 text-white flex items-center justify-center font-black text-sm transition-transform hover:scale-110 hover:z-10 cursor-pointer">
                {user.full_name?.[0]}
              </div>
            ))
          ) : (
            <span className="text-slate-400 text-sm italic font-medium">Waiting for the first impact of the day!</span>
          )}
        </div>
      </div>
    </div>
  );
};

// GMT Bug quick fix
function removeNegativeSigns(timeString) {
  if (!timeString) return "0h";
  const str = String(timeString);
  return str.includes("-") ? str.replace(/-/g, "") : str;
}

export default WelcomeUser;

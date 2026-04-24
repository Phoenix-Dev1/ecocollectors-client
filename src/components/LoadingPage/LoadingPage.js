import React from "react";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center space-y-8 animate-fade-in">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-eco-background border-t-eco-primary animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-eco-primary animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-eco-text animate-bounce">EcoCollectors</h2>
        <p className="text-eco-muted font-medium tracking-widest uppercase text-xs mt-2">Saving the planet, one bin at a time</p>
      </div>
    </div>
  );
};

export default LoadingPage;

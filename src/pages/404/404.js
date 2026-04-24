import React from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../../img/disc.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12 bg-eco-background antialiased relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-eco-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-eco-secondary/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10">
        
        {/* Text Content */}
        <div className="text-center lg:text-left lg:w-1/2">
          <div className="relative mb-8 inline-block lg:block">
             <span className="text-8xl md:text-[150px] font-black text-eco-primary/10 absolute -top-16 -left-4 lg:-left-20 select-none pointer-events-none tracking-tighter">
               404
             </span>
             <h1 className="text-4xl md:text-6xl font-black text-eco-text leading-tight mb-6 relative">
               Oops! You've drifted <br />
               <span className="bg-gradient-to-r from-eco-primary to-eco-secondary bg-clip-text text-transparent italic">
                 off the map.
               </span>
             </h1>
          </div>
          
          <p className="text-lg md:text-xl text-eco-muted mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
            The page you're looking for doesn't exist or has been recycled into something new.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              className="btn-primary !px-12 !py-4 text-lg shadow-xl shadow-eco-primary/20 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              onClick={() => navigate('/')}
            >
              Back to Safety
            </button>
            <button
              className="px-10 py-4 font-bold text-eco-muted hover:text-eco-primary transition-all rounded-2xl hover:bg-white/50 border border-transparent hover:border-gray-100 w-full sm:w-auto"
              onClick={() => navigate('/contact-us')}
            >
              Report Issue
            </button>
          </div>
        </div>

        {/* Illustration Section */}
        <div className="lg:w-1/2 flex justify-center relative group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-eco-primary/20 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-1000 opacity-50"></div>
          <img 
            src={illustration} 
            alt="Page not found illustration" 
            className="w-full max-w-[320px] md:max-w-md drop-shadow-2xl transition-all duration-500 hover:rotate-2 hover:scale-105 hue-rotate-[240deg] saturate-[1.8] brightness-90"
          />
        </div>

      </div>
    </div>
  );
};

export default NotFound;

import React from "react";
import smallLogo from "../../img/sm-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/40 mt-auto relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-eco-primary/5 rounded-full blur-3xl -mb-32 -mr-32"></div>
      
      <div className="w-full max-w-7xl mx-auto px-6 py-4 md:py-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4">
          {/* Brand & Mission - Hidden on Mobile for compactness */}
          <div className="hidden md:flex flex-col md:flex-row items-center gap-8">
            <a href="/" className="group flex items-center transition-transform hover:scale-105 shrink-0">
              <div className="w-10 h-10 bg-eco-primary rounded-xl flex items-center justify-center shadow-lg shadow-eco-primary/20 mr-3">
                <img src={smallLogo} className="h-6 w-6" alt="Logo" />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-black tracking-tight text-eco-text">
                  Eco<span className="text-eco-primary">Collectors</span>
                </span>
                <span className="ml-2 text-[10px] font-extrabold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full border border-emerald-200/60 shadow-sm tracking-wide select-none">
                  2.0
                </span>
              </div>
            </a>
            
            <div className="h-8 w-px bg-gray-200"></div>
 
            <p className="text-eco-muted font-medium text-xs max-w-md text-left leading-tight">
              Empowering communities to build a sustainable future through innovative recycling solutions.
            </p>
          </div>
 
          {/* Navigation - Always Visible, Compact on Mobile */}
          <div className="flex flex-col items-center md:items-end w-full md:w-auto">
            <nav className="w-full">
              <ul className="flex flex-row justify-center md:justify-end gap-6 md:gap-6 text-[12px] md:text-sm font-bold text-eco-text">
                <li>
                  <a href="/about" className="hover:text-eco-primary transition-colors">About Us</a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-eco-primary transition-colors">Privacy</a>
                </li>
                <li>
                  <a href="/contact-us" className="hover:text-eco-primary transition-colors">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
 
        {/* Bottom Bar - Ultra Compact on Mobile */}
        <div className="mt-4 pt-3 border-t border-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3">
          <span className="text-[10px] md:text-xs text-eco-muted font-medium text-center md:text-left">
            © {currentYear} <span className="text-eco-text font-bold">EcoCollectors.</span> Made with ♥ by Bar Kaziro & Liran.
          </span>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

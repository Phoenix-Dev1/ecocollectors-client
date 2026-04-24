import React from "react";
import smallLogo from "../../img/sm-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/40 mt-auto relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-eco-primary/5 rounded-full blur-3xl -mb-32 -mr-32"></div>
      
      <div className="w-full max-w-7xl mx-auto px-6 py-3.5 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
            <a href="/" className="group flex items-center transition-transform hover:scale-105 shrink-0">
              <div className="w-9 h-9 bg-eco-primary rounded-xl flex items-center justify-center shadow-lg shadow-eco-primary/20 mr-3">
                <img src={smallLogo} className="h-5 w-5" alt="Logo" />
              </div>
              <span className="text-xl font-black tracking-tight text-eco-text">
                Eco<span className="text-eco-primary">Collectors</span>
              </span>
            </a>
            
            <div className="hidden md:block h-6 w-px bg-gray-200"></div>

            <p className="text-eco-muted font-medium text-[11px] md:text-xs max-w-xs md:max-w-md text-center md:text-left leading-tight">
              Empowering communities to build a sustainable future through innovative recycling solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <nav>
              <ul className="flex flex-wrap justify-center gap-6 text-sm font-bold text-eco-text">
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

        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs text-eco-muted font-medium text-center md:text-left">
            © {currentYear} <span className="text-eco-text font-bold">EcoCollectors.</span> Developed by Bar Kaziro & Liran Barzilai.
          </span>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

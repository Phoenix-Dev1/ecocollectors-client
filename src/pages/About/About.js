import ec from '../../img/logo-no-bg.png';
import liran from '../../img/liran.jpg';
import bar from '../../img/bar.jpg';
import manager from '../../img/recyclers-manager-icon.png';
import maps from '../../img/google-maps-icon.webp';

export default function About() {
  return (
    <div className="animate-fade-in bg-eco-background min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
           <div className="absolute top-10 right-10 w-64 h-64 bg-eco-primary/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-10 left-10 w-64 h-64 bg-eco-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-eco-primary/10 rounded-2xl shadow-xl mb-8 group hover:scale-110 transition-transform">
             <img src={ec} alt="Eco-Collectors" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-eco-text tracking-tight mb-6">
            Our Mission for a <span className="text-eco-primary italic">Greener</span> Haifa
          </h1>
          <p className="text-xl text-eco-muted leading-relaxed font-medium">
            Eco-Collectors is a recycling initiative founded by students at the Technion University. 
            We are dedicated to promoting sustainability and contributing to a cleaner environment through technology and community action.
          </p>
        </div>
      </section>

      {/* Team & Operations Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Team Member: Liran */}
          <div className="glass !rounded-[2.5rem] p-8 shadow-glass hover:shadow-glass-lg transition-all duration-500 group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                <img src={liran} alt="Liran" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-eco-text">Liran</h3>
                <p className="text-eco-primary font-bold text-sm uppercase tracking-wider">The Collector</p>
              </div>
            </div>
            <p className="text-eco-muted leading-relaxed font-medium">
              Liran gathers bottles for recycling from various sources across Haifa. He ensures every collected item is handled with care and directed to the proper facilities.
            </p>
          </div>

          {/* Team Member: Bar */}
          <div className="glass !rounded-[2.5rem] p-8 shadow-glass hover:shadow-glass-lg transition-all duration-500 group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                <img src={bar} alt="Bar" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-eco-text">Bar</h3>
                <p className="text-eco-secondary font-bold text-sm uppercase tracking-wider">The Recycler</p>
              </div>
            </div>
            <p className="text-eco-muted leading-relaxed font-medium">
              Bar oversees the recycling process. He coordinates with collectors, validates requests, and manages the placement of materials in designated recycling centers.
            </p>
          </div>

          {/* Management */}
          <div className="glass !rounded-[2.5rem] p-8 shadow-glass hover:shadow-glass-lg transition-all duration-500 group">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <img src={manager} alt="Manager" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-eco-text">Operations</h3>
                <p className="text-amber-500 font-bold text-sm uppercase tracking-wider">Management</p>
              </div>
            </div>
            <p className="text-eco-muted leading-relaxed font-medium">
              Our operations team oversees all activities, approves new recyclers, and ensures that user complaints are addressed promptly to maintain high service standards.
            </p>
          </div>

          {/* Technology */}
          <div className="lg:col-span-3 glass !rounded-[2.5rem] p-10 mt-8 shadow-glass flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-eco-primary/5 rounded-full -mr-16 -mt-16"></div>
            
            <div className="w-32 h-32 flex-shrink-0 bg-blue-50 rounded-[2rem] flex items-center justify-center shadow-inner relative z-10">
              <img src={maps} alt="Google Maps" className="w-20 h-20 object-contain" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-eco-text mb-4">Precision Recycling with Google Maps</h3>
              <p className="text-lg text-eco-muted leading-relaxed font-medium max-w-3xl">
                We've integrated high-precision mapping to connect collectors and recyclers efficiently. 
                Our platform allows users to pin collection requests in real-time, focusing on optimizing routes and reducing carbon footprint across Haifa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-eco-text mb-8">Ready to make an impact?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/register" className="btn-primary !px-10 !py-4 shadow-xl shadow-eco-primary/20">Get Started</a>
          <a href="/contact-us" className="px-10 py-4 bg-white text-eco-text font-black rounded-2xl border border-gray-200 hover:bg-eco-background transition-all">Contact Us</a>
        </div>
      </section>
    </div>
  );
}

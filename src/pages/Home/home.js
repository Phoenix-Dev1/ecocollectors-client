import './home.css';
import React from 'react';
import QuizCard from './QuizCard';
import { 
  faAngleUp, 
  faNewspaper, 
  faLeaf, 
  faRecycle, 
  faGlassMartiniAlt, 
  faCogs, 
  faBoxOpen, 
  faMicrochip 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  return (
    <div className="bg-eco-background min-h-screen antialiased text-eco-text overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-eco-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-black mb-8 leading-tight tracking-tight">
            Saving the planet, <br />
            <span className="bg-gradient-to-r from-eco-primary to-eco-secondary bg-clip-text text-transparent">
              one bin at a time
            </span>
          </h1>
          <p className="text-xl text-eco-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the 
            <span className="inline-flex items-center align-middle mx-1.5">
              <span className="text-eco-primary font-bold">EcoCollectors</span>
              <span className="text-[14px] font-black bg-gradient-to-br from-emerald-400 to-teal-500 bg-clip-text text-transparent ml-1 tracking-tighter select-none">
                2.0
              </span>
            </span> 
            community in making Israel cleaner. 
            Locate bins, schedule collections, and contribute to a sustainable future while protecting our environment.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <a href="/map" className="btn-primary !px-10 !py-4 text-lg flex items-center space-x-2 group">
              <svg className="w-6 h-6 md:w-5 md:h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Live Map</span>
            </a>
            <a href="/about" className="px-10 py-4 font-bold hover:text-eco-primary transition-all border border-gray-200 rounded-2xl hover:bg-white shadow-sm">Learn More</a>
          </div>
        </div>
      </section>

      {/* Bins Grid */}
      <main className="container mx-auto pb-32 px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Sorting Guide</h2>
          <p className="text-eco-muted">Learn how to properly dispose of your waste</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          {/* Blue Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faNewspaper} className="text-blue-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-blue-600">Blue Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Newspapers, magazines, cardboard, and paper packaging.
            </p>
          </div>

          {/* Brown Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-orange-900/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col group">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faLeaf} className="text-orange-900 text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-orange-900">Brown Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Organic waste: fruits, vegetables, and food scraps.
            </p>
          </div>

          {/* Quiz Card - The Centerpiece */}
          <div className="md:col-span-2 lg:col-span-2 h-full">
            <div className="h-full rounded-[2.5rem] p-1 bg-gradient-to-br from-eco-primary to-emerald-400 shadow-xl shadow-eco-primary/20">
              <QuizCard />
            </div>
          </div>

          {/* Orange Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-orange-500/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col group">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faRecycle} className="text-orange-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-orange-600">Orange Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Plastic, metal packaging, and beverage cartons.
            </p>
          </div>

          {/* Purple Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col group">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faGlassMartiniAlt} className="text-purple-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-600">Purple Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Glass bottles, jars, and all glass packaging.
            </p>
          </div>

          {/* Gray Bin */}
          <div className="md:col-span-2 lg:col-span-2 glass !rounded-3xl p-8 hover:shadow-gray-400/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col group">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faCogs} className="text-gray-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-600">Gray Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Metallic waste: melted and cast into new products. Metallic waste includes steel and aluminum items like cans, foil, and small metal scrap.
            </p>
          </div>

          {/* Cartoner */}
          <div className="md:col-span-2 lg:col-span-2 glass !rounded-3xl p-8 hover:shadow-yellow-500/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col group">
            <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faBoxOpen} className="text-yellow-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-yellow-600">Cartoner</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Thick cardboard packages. Please flatten before disposal to save space. We accept all sizes of corrugated cardboard and heavy paperboard.
            </p>
          </div>

          {/* E-Waste */}
          <div className="md:col-span-2 lg:col-span-2 glass !rounded-3xl p-8 hover:shadow-red-500/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 min-h-[220px] flex flex-col group">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FontAwesomeIcon icon={faMicrochip} className="text-red-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-red-600">E-Waste</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Old appliances, batteries, and electronic components. Proper disposal prevents hazardous materials from leaching into the soil and groundwater.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <a
            href="#top"
            className="w-14 h-14 bg-white shadow-md flex items-center justify-center text-eco-primary text-lg rounded-2xl hover:bg-eco-primary hover:text-white transition-all duration-300"
          >
            <FontAwesomeIcon icon={faAngleUp} />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;

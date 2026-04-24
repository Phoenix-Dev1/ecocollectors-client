import './home.css';
import React from 'react';
import QuizCard from './QuizCard';
import { quizData } from './quizData';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  const randomIndex = Math.floor(Math.random() * quizData.length);
  const randomQuiz = quizData[randomIndex];
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
            Join the EcoCollectors community in making Israel cleaner. 
            Locate bins, schedule collections, and earn points while protecting our environment.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <a href="/map" className="btn-primary !px-10 !py-4 text-lg">Live Map</a>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Blue Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-blue-500">
            <h3 className="text-xl font-bold mb-3 text-blue-600">Blue Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Newspapers, magazines, cardboard, and paper packaging.
            </p>
          </div>
          {/* Brown Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-orange-900">
            <h3 className="text-xl font-bold mb-3 text-orange-900">Brown Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Organic waste: fruits, vegetables, and food scraps.
            </p>
          </div>
          {/* Orange Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-orange-500">
            <h3 className="text-xl font-bold mb-3 text-orange-600">Orange Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Plastic, metal packaging, and beverage cartons.
            </p>
          </div>
          {/* Purple Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-purple-500">
            <h3 className="text-xl font-bold mb-3 text-purple-600">Purple Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Glass bottles, jars, and all glass packaging.
            </p>
          </div>
          {/* Gray Bin */}
          <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-gray-400">
            <h3 className="text-xl font-bold mb-3 text-gray-600">Gray Bin</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Metallic waste: melted and cast into new products.
            </p>
          </div>
          {/* Cartoner */}
          <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-3 text-yellow-600">Cartoner</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Thick cardboard packages. Please flatten before disposal.
            </p>
          </div>
          {/* E-Waste */}
          <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-2 border-t-4 border-red-500">
            <h3 className="text-xl font-bold mb-3 text-red-600">E-Waste</h3>
            <p className="text-sm text-eco-muted leading-relaxed">
              Old appliances, batteries, and electronic components.
            </p>
          </div>
          {/* Quiz Card */}
          <div>
            <QuizCard quiz={randomQuiz} />
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

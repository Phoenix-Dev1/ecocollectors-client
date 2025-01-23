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
    <div className="font-sans bg-gray-800 dark:bg-gray-800 text-white">
      <main className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-semibold mb-12 text-center unique-text">
            Welcome to Eco Collectors! ♻️
          </h1>
          <p className="text-lg mb-12 text-center">
            Join us in making Israel cleaner! At Eco Collectors, we're on a
            mission to help you recycle right and find recycling facilities.
            Together, we can create a greener Israel for the future.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blue Bin */}
            <div className="bin-card bg-blue-500 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">Blue Bin</h2>
              <p className="text-gray-300">
                Newspapers, magazines, cardboard, paper packaging, and more.
              </p>
            </div>
            {/* Brown Bin */}
            <div className="bin-card bg-orange-900 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">Brown Bin</h2>
              <p className="text-gray-300">
                Fruits, vegetables, food scraps, and more.
              </p>
            </div>
            {/* Orange Bin */}
            <div className="bin-card bg-orange-500 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">Orange Bin</h2>
              <p className="text-gray-300">
                Plastic packaging, metal packaging, beverage cartons, and more.
              </p>
            </div>
            {/* Purple Bin */}
            <div className="bin-card bg-purple-500 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">Purple Bin</h2>
              <p className="text-gray-300">
                Glass bottles, jars, and glass packaging.
              </p>
            </div>
            {/* Gray Bin */}
            <div className="bin-card bg-gray-500 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">Gray Bin</h2>
              <p className="text-gray-300">
                Metallic waste. Recycled by melting and casting into new
                products.
              </p>
            </div>
            {/* Cartoner */}
            <div className="bin-card bg-yellow-500 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">Cartoner</h2>
              <p className="text-gray-300">
                Thick cardboard packages. Flatten before disposal.
              </p>
            </div>
            {/* E-Waste */}
            <div className="bin-card bg-red-500 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">E-Waste</h2>
              <p className="text-gray-300">
                Dispose old electrical appliances, batteries, and more at
                collection facilities.
              </p>
            </div>
            {/* Green Bin */}
            <div className="bin-card bg-green-700 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">Green Bin</h2>
              <p className="text-gray-300">
                For waste that can't be sorted elsewhere. Some materials may be
                sorted and recycled.
              </p>
            </div>
            {/* Random Quiz Card */}
            <QuizCard quiz={randomQuiz} />
          </div>
          <div className="flex justify-center mt-16">
            <a
              href="#top"
              className="w-12 h-12 bg-blue-700 flex items-center justify-center text-white text-lg rounded-full hover:bg-blue-900"
            >
              <FontAwesomeIcon icon={faAngleUp} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { quizData } from './quizData';

const QuizCard = () => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with a random quiz
  useEffect(() => {
    setQuizIndex(Math.floor(Math.random() * quizData.length));
  }, []);

  const handleAction = () => {
    setIsAnimating(true);
    setTimeout(() => {
      if (showAnswer) {
        // Get new random quiz
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * quizData.length);
        } while (nextIndex === quizIndex);
        
        setQuizIndex(nextIndex);
        setShowAnswer(false);
      } else {
        setShowAnswer(true);
      }
      setIsAnimating(false);
    }, 200);
  };

  const currentQuiz = quizData[quizIndex];

  return (
    <div className="h-[380px] md:h-[320px] bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 pb-10 flex flex-col relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-eco-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="flex items-center space-x-3 mb-6 relative z-10 shrink-0">
        <div className="w-10 h-10 bg-eco-primary/10 rounded-xl flex items-center justify-center">
           <svg className="w-6 h-6 text-eco-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
        <h2 className="text-xl font-black text-eco-text">Eco Quiz</h2>
      </div>

      <div className={`flex-grow flex flex-col relative z-10 transition-opacity duration-300 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {!showAnswer ? (
          <div className="animate-fade-in">
            <p className="text-lg font-bold text-eco-text mb-2">Question:</p>
            <p className="text-eco-muted font-medium leading-relaxed italic">
              "{currentQuiz.question}"
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-sm font-bold text-eco-primary uppercase tracking-widest mb-2">Correct Answer</p>
            <div className="p-4 bg-eco-primary/5 rounded-2xl border border-eco-primary/10">
              <p className="text-eco-text font-black text-xl leading-snug">{currentQuiz.answer}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 relative z-10 shrink-0">
        <button
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg ${
            showAnswer 
            ? 'bg-eco-text text-white hover:bg-black shadow-black/10' 
            : 'bg-eco-primary text-white hover:bg-eco-secondary shadow-eco-primary/20'
          }`}
          onClick={handleAction}
        >
          {showAnswer ? 'Next Question' : 'Check Answer'}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;

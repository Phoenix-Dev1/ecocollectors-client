import React, { useState } from 'react';

const QuizCard = ({ quiz }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="glass !rounded-3xl p-8 hover:shadow-glass-lg transition-all duration-300 relative overflow-hidden group min-h-[280px] flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-eco-primary/10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-eco-primary/10 rounded-xl flex items-center justify-center">
           <svg className="w-6 h-6 text-eco-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
        <h2 className="text-xl font-black text-eco-text">Eco Quiz</h2>
      </div>

      <p className="text-eco-muted font-medium mb-8 flex-grow leading-relaxed">
        {quiz.question}
      </p>

      <div className="mt-auto">
        <button
          className="w-full btn-primary !py-3 !text-sm flex items-center justify-center space-x-2 shadow-lg shadow-eco-primary/10"
          onClick={toggleAnswer}
        >
          <span>{showAnswer ? 'Hide Answer' : 'Check Answer'}</span>
        </button>

        {showAnswer && (
          <div className="mt-4 p-4 bg-eco-primary/5 rounded-2xl border border-eco-primary/10 animate-fade-in">
            <p className="text-sm font-bold text-eco-primary uppercase tracking-wider mb-1">Correct Answer</p>
            <p className="text-eco-text font-medium">{quiz.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;

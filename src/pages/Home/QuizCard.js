import React, { useState } from 'react';

const QuizCard = ({ quiz }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="bin-card bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-md shadow-md transition duration-300 transform hover:scale-105 text-black">
      <h2 className="text-xl font-semibold mb-2">Recycling Quiz</h2>
      <p className="text-black">{quiz.question}</p>
      <button
        className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-900"
        onClick={toggleAnswer}
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>
      {showAnswer && (
        <div className="mt-4 text-black">
          <strong>Answer:</strong> {quiz.answer}
        </div>
      )}
    </div>
  );
};

export default QuizCard;

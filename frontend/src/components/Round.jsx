import React, { useEffect, useState } from 'react';

const questionsData = [
  {
    question: 'What is the size of int in C?',
    options: ['2 Bytes', '4 Bytes', '8 Bytes', 'Depends on Compiler'],
    correctAnswer: 'Depends on Compiler',
  },
  {
    question: 'Which of the following is a valid C keyword?',
    options: ['class', 'volatile', 'interface', 'extends'],
    correctAnswer: 'volatile',
  },
  {
    question: 'Which operator is used to access the value at the address stored in a pointer?',
    options: ['&', '*', '->', '%'],
    correctAnswer: '*',
  },
  {
    question: 'Who is the father of C language?',
    options: ['Bjarne Stroustrup', 'James Gosling', 'Dennis Ritchie', 'Guido van Rossum'],
    correctAnswer: 'Dennis Ritchie',
  },
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Round = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    // Shuffle questions on mount
    setQuestions(shuffleArray([...questionsData]));
  }, []);

  useEffect(() => {
    // Timer countdown
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    setTimer(60);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert('Quiz Finished!'); 
      // Aage koi route pe le jana ho toh yahan navigate kara dena
    }
  };

  if (questions.length === 0) return null; // Jab tak shuffle nahi hota loading nahi dikhana

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 relative">

      {/* Timer Top Right */}
      <div className="absolute top-4 right-6 bg-white shadow-lg rounded-full px-6 py-2 font-bold text-purple-700">
        {timer} sec
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        C Programming Quiz Competition
      </h1>

      {/* Question Section */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        <h2 className="text-2xl font-semibold mb-6">{questions[currentQuestionIndex].question}</h2>

        <div className="flex flex-col space-y-4 mb-8">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`py-3 px-4 rounded-xl border-2 
                ${selectedOption === option ? 'border-purple-500 bg-purple-100' : 'border-gray-300'}
                hover:border-purple-400 transition-all`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Submit
        </button>

      </div>

    </div>
  );
};

export default Round;

import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';  // Import both toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // CSS for toastify

const questionsData = [
  {
    id: 'q1',  // Unique ID for the question
    questionImage: 'https://example.com/image1.jpg', // Question Image URL
    options: ['2 Bytes', '4 Bytes', '8 Bytes', 'Depends on Compiler'],
    correctAnswer: 'Depends on Compiler',
  },
  {
    id: 'q2',  // Unique ID for the question
    questionImage: 'https://example.com/image2.jpg', // Question Image URL
    options: ['class', 'volatile', 'interface', 'extends'],
    correctAnswer: 'volatile',
  },
  {
    id: 'q3',  // Unique ID for the question
    questionImage: 'https://example.com/image3.jpg', // Question Image URL
    options: ['&', '*', '->', '%'],
    correctAnswer: '*',
  },
  {
    id: 'q4',  // Unique ID for the question
    questionImage: 'https://example.com/image4.jpg', // Question Image URL
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
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(30 * 60); // Timer for entire round (30 minutes)
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false); // For modal visibility
  const [isChecked, setIsChecked] = useState(false); // For checkbox in modal

  useEffect(() => {
    setQuestions(shuffleArray([...questionsData]));
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleSubmit();
    }
  }, [timer]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: option,
    }));
  };

  const handleSubmit = () => {
    questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctAnswer) {
        setScore((prev) => prev + 1);
      }
    });
    toast.success('Submit successfully!');
    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = '/dashboard'; // Redirect to dashboard after submit
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleModalSubmit = () => {
    if (isChecked) {
      handleSubmit();
      setShowModal(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (questions.length === 0) return null; // Loading until questions are shuffled

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 relative">
      <div className="absolute top-4 right-6 bg-white shadow-lg rounded-full px-6 py-2 font-bold text-purple-700">
        {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
      </div>

      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        C Programming Quiz Competition
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        {/* Question Section */}
        <h2 className="text-2xl font-semibold mb-6">Question {currentQuestionIndex + 1}</h2>
        <img
          src={questions[currentQuestionIndex].questionImage}
          alt="Question"
          className="mb-6 w-full h-auto object-cover rounded-lg"
        />

        <div className="flex flex-col space-y-4 mb-8">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${questions[currentQuestionIndex].id}`}
                value={option}
                checked={selectedOptions[questions[currentQuestionIndex].id] === option}
                onChange={() => handleOptionSelect(option)}
                className="form-radio text-purple-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="w-1/4 bg-purple-500 text-white py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="w-1/4 bg-purple-500 text-white py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Submit Button on Last Question */}
        {currentQuestionIndex === questions.length - 1 && (
          <button
            onClick={() => setShowModal(true)}
            disabled={!selectedOptions[questions[currentQuestionIndex].id]}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
          >
            Submit
          </button>
        )}

<p className="mt-4 text-xl text-purple-600">Your Score: {score}</p>
      </div>

      {/* Modal for Confirm Submit */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold">Are you sure you want to submit?</h3>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                I confirm to submit.
              </label>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleModalClose}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                disabled={!isChecked}
                className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container for Toastify */}
      <ToastContainer />
    </div>
  );
};

export default Round;

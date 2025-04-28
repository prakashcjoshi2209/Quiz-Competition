import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex flex-col p-8 bg-gradient-to-br from-blue-200 via-white to-purple-300">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <img 
          src="/abesit.jpg" 
          alt="College Logo" 
          className="h-20 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <p className="text-right text-2xl font-semibold italic text-gray-700 max-w-lg">
          "The only way to do great work is to love what you do." 
          <br />
          <span className="text-sm text-gray-500">- Steve Jobs</span>
        </p>
      </div>

      {/* Center Button */}
      <div className="flex-1 flex items-center justify-center">
        <button 
          onClick={handleGetStarted}
          className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;

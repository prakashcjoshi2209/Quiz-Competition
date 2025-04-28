// src/LeetCodeQuestion.js
import React from 'react';

const LeetCodeQuestion = () => {
  const question = {
    title: "Two Sum",
    description: "Given an array of integers, return the indices of the two numbers that add up to a specific target.",
    input: "nums = [2,7,11,15], target = 9",
    output: "[0, 1]",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mb-8">
      {/* Title and Description */}
      <h2 className="text-3xl font-semibold text-blue-700">{question.title}</h2>
      <p className="mt-4 text-lg text-gray-700">{question.description}</p>

      {/* Input and Output */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium text-green-600">Input</h3>
          <pre className="mt-2 text-sm font-mono text-gray-600">{question.input}</pre>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-medium text-red-600">Output</h3>
          <pre className="mt-2 text-sm font-mono text-gray-600">{question.output}</pre>
        </div>
      </div>

      {/* Divider for better UI separation */}
      <div className="my-6 border-t border-gray-300"></div>

      {/* Question Tips or Constraints */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800">Tips:</h3>
        <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
          <li>Think about how to reduce time complexity.</li>
          <li>Try to come up with an optimal solution.</li>
        </ul>
      </div>
    </div>
  );
};

export default LeetCodeQuestion;

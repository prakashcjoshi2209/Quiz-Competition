// import React, { useState } from 'react';
// import CodeEditor from './CodeEditor'; // Code editor component import
// import LeetCodeQuestion from './LeetCodeQuestion'; // LeetCode question component import

// const CodingPlatform = () => {
//   const [code, setCode] = useState('// Write your code here...');
//   const [output, setOutput] = useState('');
//   const [isRunning, setIsRunning] = useState(false); // To track if the code is being run
//   const [isTestCasePassed, setIsTestCasePassed] = useState(null); // To store if test cases passed

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//   };

//   const handleReset = () => {
//     setCode('// Write your code here...');
//     setOutput('');
//     setIsTestCasePassed(null);
//   };

//   const handleRun = async () => {
//     setIsRunning(true);
//     setOutput('Running test cases...');

//     // Simulate the test case evaluation process
//     setTimeout(() => {
//       // Mock test case logic (Here we are just simulating a successful test case)
//       const passed = code.includes('return [0, 1]'); // Basic check for "Two Sum" solution
//       setIsTestCasePassed(passed);
//       setOutput(passed ? 'Test cases passed!' : 'Test cases failed!');
//       setIsRunning(false);
//     }, 2000); // Simulate a 2-second delay for test case evaluation
//   };

//   const handleSubmit = async () => {
//     const response = await fetch('/api/submit-code', {
//       method: 'POST',
//       body: JSON.stringify({ code }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const result = await response.json();
//     setOutput(result.message || 'Code submitted successfully!');
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50 shadow-xl rounded-xl border border-gray-300">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">React Code Editor</h1>

//       {/* LeetCode Question Display */}
//       <LeetCodeQuestion />

//       {/* Code Editor Section */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-4">Write Your Code</h2>
//         <CodeEditor value={code} onChange={handleCodeChange} />
//       </div>

//       {/* Buttons for Run, Submit and Reset */}
//       <div className="mt-6 flex justify-center space-x-6">
//         <button
//           onClick={handleRun}
//           disabled={isRunning} // Disable Run button while running the test
//           className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
//         >
//           {isRunning ? 'Running...' : 'Run'}
//         </button>

//         <button
//           onClick={handleSubmit}
//           disabled={!isTestCasePassed} // Disable Submit if test case hasn't passed
//           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//         >
//           Submit
//         </button>

//         <button
//           onClick={handleReset}
//           className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
//         >
//           Reset
//         </button>
//       </div>

//       {/* Output Display */}
//       <div className="mt-8 bg-gray-100 p-6 rounded-lg border-t-4 border-blue-600">
//         <h2 className="text-xl font-medium text-gray-700">Output:</h2>
//         <pre className="mt-4 p-4 bg-white rounded-lg shadow-sm text-sm font-mono text-gray-600">{output}</pre>
//       </div>
//     </div>
//   );
// };

// export default CodingPlatform;

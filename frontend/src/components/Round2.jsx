import React, { useState } from "react";
import axios from "axios";

const Round2 = () => {
  const [code, setCode] = useState(`#include<stdio.h>
#include<conio.h>

int main() {
    char ch;
    printf("Enter a character: ");
    ch = getch();
    printf("\\nYou entered: %c", ch);
    return 0;
}`);
  const [output, setOutput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState(""); // For capturing user input

  const handleRun = async () => {
    setOutput("Running...");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: 50, // 50 = C (GCC)
          stdin: userInput, // Pass the user input here
        },
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "db385a7c9emsh892883af85d90d3p15d71fjsna52920cc5457", // Replace with your actual key
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      if (response.data.stdout) {
        setOutput(response.data.stdout);
      } else if (response.data.stderr) {
        setOutput(`Error: ${response.data.stderr}`);
      } else if (response.data.compile_output) {
        setOutput(`Compile Error: ${response.data.compile_output}`);
      } else {
        setOutput("No output");
      }
    } catch (err) {
      console.error(err);
      setOutput("❌ Error running code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setOutput("");
    setUserInput(""); // Reset user input
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (output.trim().includes("You entered: ")) {
      setSubmitted(true);
      setOutput("✅ Correct Output. Code submitted!");
    } else {
      setSubmitted(false);
      setOutput("❌ Incorrect Output. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Round 2 - C Code Editor
        </h1>

        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Enter Input (for `getch()`):
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter a character"
          />
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={handleRun}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run"}
          </button>
          <button
            onClick={handleReset}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-all transform hover:scale-105"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            Submit
          </button>
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg border border-gray-300 shadow-inner">
          <h2 className="font-semibold text-lg mb-2">Output:</h2>
          <pre className="whitespace-pre-wrap text-gray-800">{output}</pre>
        </div>

        {submitted && (
          <div className="mt-4 text-green-600 font-semibold text-center">
            ✅ Your code has been submitted!
          </div>
        )}
      </div>
    </div>
  );
};

export default Round2;

import React, { useState } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/themes/prism-tomorrow.css";

const Round2 = () => {
  const [code, setCode] = useState(`#include<stdio.h>

int main() {
    char name[20];
    printf("Enter your name: ");
    scanf("%s", name);
    printf("Hello %s", name);
    return 0;
}`);
  const [terminal, setTerminal] = useState("💻 Click Run to provide input...\n");
  const [input, setInput] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [hasRunOnce, setHasRunOnce] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRun = async () => {
    if (!inputVisible) {
      setTerminal("💻 Please enter your input below 👇 and click Run again to execute the code.\n");
      setInputVisible(true);
      return;
    }

    if (!input.trim()) {
      setTerminal((prev) => prev + "❗ Input is required before running the code.\n");
      return;
    }

    setIsSubmitting(true);
    setTerminal((prev) => prev + `> ${input}\nRunning...\n`);

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: 50,
          stdin: input,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      let output = "No output";
      if (response.data.stdout) {
        output = response.data.stdout;
      } else if (response.data.stderr) {
        output = `Error: ${response.data.stderr}`;
      } else if (response.data.compile_output) {
        output = `Compile Error: ${response.data.compile_output}`;
      }

      setTerminal((prev) => prev + output + "\n");
      setHasRunOnce(true);
    } catch (err) {
      console.error(err);
      setTerminal((prev) => prev + "❌ Error running code.\n");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setInput("");
    setTerminal("💻 Terminal reset. Click Run to provide input...\n");
    setSubmitted(false);
    setInputVisible(false);
    setHasRunOnce(false);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTerminal((prev) => prev + "✅ Code submitted successfully!\n");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-4 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto bg-gray-900 text-white rounded-xl shadow-lg p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Round 2 - C Code Editor</h1>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="w-full md:w-1/2 h-48 border border-gray-700 rounded-lg p-3 bg-gray-800 text-white overflow-auto">
            <h2 className="text-md font-semibold mb-1">Question Description</h2>
            <p className="text-sm">
              Write a C program that asks for your name and prints it with a greeting.
              Use <code>scanf</code> for input and <code>printf</code> for output.
            </p>
          </div>

          <div
            className="w-full md:w-1/2 h-48 border border-gray-700 rounded-lg font-mono text-sm overflow-auto"
            style={{ backgroundColor: "#2d2d2d" }}
          >
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.c, "c")}
              padding={12}
              style={{
                backgroundColor: "#2d2d2d",
                color: "#f8f8f2",
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 13,
                minHeight: "100%",
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3 justify-center">
          <button
            onClick={handleRun}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Running..." : "Run"}
          </button>

          <button
            onClick={handleReset}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all"
          >
            Reset
          </button>
        </div>

        {/* Terminal and Input */}
        <div className="mt-4 bg-black text-green-400 p-3 rounded-lg border border-gray-700 shadow-inner font-mono">
          <div className="whitespace-pre-wrap text-sm mb-2">{terminal}</div>

          {inputVisible && (
            <input
              type="text"
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm"
              placeholder="Type your input here (e.g., Vikash)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </div>

        {hasRunOnce && (
          <div className="mt-4 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              Submit
            </button>
          </div>
        )}

        {submitted && (
          <div className="mt-3 text-green-400 font-semibold text-center">
            ✅ Your code has been submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Round2;

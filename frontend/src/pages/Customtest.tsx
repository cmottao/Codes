import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { customtest } from "../api/customtest";

/**
 * The `CustomTest` component provides an interface for users to run custom C++ code
 * with optional input and view the output.
 *
 * Features:
 * - Textareas for users to input C++ code and custom input.
 * - Displays execution output, including runtime and results.
 * - Calls the `customtest` API to execute the provided code.
 * - Handles API responses and displays execution logs or errors.
 * - Uses `useState` to manage code, input, and output states.
 * - Updates the output state dynamically to show execution status.
 */


function CustomTest() {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    setOutput("Running...");
    try {
      const { data } = await customtest(code, input);

      if (data.status === "OK") {
        setOutput(`Execution Time: ${data.execution_time}s\nOutput:\n${data.output}`);
      } else {
        setOutput(`Status: ${data.status}\nLog:\n${data.log}`);
      }
    } catch (e) {
      setOutput("An error occurred while executing the code.");
    }
  };

  return (
    <>
      <Nav  activeTab="customtest" />
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-semibold mb-4">Custom Test</h2>
        <div className="w-full max-w-4xl flex space-x-6 h-96">
          <div className="w-2/3 flex flex-col space-y-4">
            <textarea
              className="w-full flex-grow p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 font-mono resize-none"
              placeholder="Paste your C++ code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="w-1/3 flex flex-col space-y-4 h-full">
            <textarea
              className="w-full flex-grow p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 font-mono resize-none"
              placeholder="Enter custom input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          <textarea
            className="w-full h-1/2 p-4 border rounded-lg shadow-sm bg-gray-100 font-mono overflow-auto resize-none"
            placeholder="Output will be displayed here."
            value={output}
            readOnly
          />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="w-[100px] h-[35px] text-white rounded-[8px] bg-main"
          onClick={handleRun}
        >
          Run Code
        </button>
      </div>
      <Footer />
    </>
  );
}

export default CustomTest;
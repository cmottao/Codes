import { useEffect, useState } from "react";
import DropFile from "./DropFile";
import { NewProblem } from "../types/NewProblem";
import { createProblem } from "../api/problems";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * This code defines a `CreateProblemForm` component for a problem-setting platform.
 * It allows users (problem setters) to create new programming problems by filling in
 * various fields, including the problem name, statement, test cases, expected output,
 * and editorial. 
 * 
 * - Uses state hooks to manage form inputs and uploaded content.
 * - Validates user input to ensure required fields are provided and constraints are met.
 * - Upon submission, it sends the problem data to the backend using `createProblem()`.
 * - The problem setter cannot modify test cases or expected output after submission.
 * - Uses `DropFile` components for uploading `.md` and `.txt` files.
 * - If the problem is successfully created, the page reloads and an alert is displayed.
 * - Utilizes Tailwind CSS for styling.
 */


function CreateProblemForm() {
  const { user } = useAuth();
  const { handle } = useParams<{ handle: string }>();
  const [newProblem, setNewProblem] = useState<NewProblem | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [timeLimit, setTimeLimit] = useState<number | null>(null);
  const [memoryLimit, setMemoryLimit] = useState<number | null>(null);
  const [statementContent, setStatementContent] = useState<string | null>(null);
  const [testCasesContent, setTestCasesContent] = useState<string | null>(null);
  const [expectedOutContent, setExpectedOutContent] = useState<string | null>(null);
  const [editorialContent, setEditorialContent] = useState<string | null>(null);

  useEffect(() => {
    if (newProblem) {
      createProblem(newProblem)
        .then(() => {window.location.reload(); alert("The problem was successfully created") } )
        .catch((error) => { alert("Something went wrong. Please try again later."); console.log("Error", error) });
    }
  }, [newProblem]);

  const handleSubmit = () => {
    if (!name || !timeLimit || !memoryLimit || !statementContent || !testCasesContent || !expectedOutContent || !editorialContent) {
      alert("Please make sure to fill in all the required fields.");
      return;
    }

    if (timeLimit <= 0 || timeLimit > 5) {
      alert("Please enter a valid positive time limit less than or equal to 5.");
      return;
    }
    
    if (memoryLimit <= 0 || memoryLimit > 1024) {
      alert("Please enter a valid positive memory limit less than or equal to 1024.");
      return;
    }
  
    setNewProblem({
      name: name,
      statement: statementContent,
      editorial: editorialContent,
      time_limit_seconds: timeLimit,
      memory_limit_mb: memoryLimit,
      problemsetter_handle:  user?.handle || "",
      input: testCasesContent,
      output: expectedOutContent,
    });
  };

  return(
    <div className="bg-white w-[1000px] border-solid border-[#B8B8B8] border-[1px] rounded-[15px] p-[25px] flex flex-col items-center shadow-[1px_2px_4px_#00000040]">
      <div className="w-[800px]">
        <h1 className="font-[500] text-[30px]">Add Problem</h1>
        <div className="pl-[30px] border-solid border-l-[4px] border-[#3B3B3B] h-[150px] flex flex-col justify-center my-[20px]">
          <p className="font-[400] text-[20px] w-[700px]">
          Be careful! You will not be able to edit the test cases or expected output in the future. It is also recommended to provide a clear and complete explanation of the input constraints and output format (with examples if possible) within the problem statement.
            </p>
        </div>
      </div>
      
      <div className="w-[900px] flex flex-col items-center gap-[20px]">
        <div className="flex justify-around w-[inherit]">
          <div className="flex flex-col gap-[20px]">
              <div className="">
              <p>Name</p>
              <input type="text" className="w-[350px] h-[45px] border-solid border-[#B8B8B8] border-[1px] rounded-[5px] pl-[5px]" 
                onChange={(e) => {setName(e.target.value)}}
              />
            </div>
            <div>
              <p>Statement (.md file)</p>
              <div 
                className="w-[350px] h-[150px] rounded-[5px]">
                  <DropFile contentSetter={setStatementContent} fileExtension=".md"/>
              </div>
            </div>

            <div>
              <p>TestCases (.txt file)</p>
              <div 
                className="w-[350px] h-[150px] rounded-[5px]">
                  <DropFile contentSetter={setTestCasesContent} fileExtension=".txt"/>
              </div>
            </div>
            
          </div>
          <div className="flex flex-col justify-end gap-[20px]">
            <div>
              <p>TimeLimit (s)</p>
              <input type="number" className="w-[350px] h-[45px] border-solid border-[#B8B8B8] border-[1px] rounded-[5px] pl-[5px]" 
                onChange={(e) => {setTimeLimit(parseInt(e.target.value))}}
              />
            </div>

            <div>
              <p>MemoryLimit (MB)</p>
              <input type="number" className="w-[350px] h-[45px] border-solid border-[#B8B8B8] border-[1px] rounded-[5px] pl-[5px]" 
                onChange={(e) => {setMemoryLimit(parseInt(e.target.value))}}
              />
            </div>

            <div>
              <p>Expected output (.txt file)</p>
              <div 
                className="w-[350px] h-[150px] rounded-[5px]">
                  <DropFile contentSetter={setExpectedOutContent} fileExtension=".txt"/>
              </div>
            </div>

          </div>
        </div>
        <div>
          <p>Editorial (.md file)</p>
          <div 
            className="w-[800px] h-[150px] rounded-[5px]">
              <DropFile contentSetter={setEditorialContent} fileExtension=".md"/>
          </div>
        </div>
        <button className="bg-main w-[250px] h-[30px] rounded-[8px]" onClick={() => handleSubmit()}>
          <span className="font-[500] text-[20px] text-white">Add problem</span>
        </button>
      </div>
    </div>
  );
}

export default CreateProblemForm

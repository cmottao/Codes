import { useEffect, useState } from "react";
import DropFile from "./DropFile";
import { useParams } from "react-router-dom";
import { updateProblem, readProblem } from "../api/problems";

/**
 * This component, `EditProblemForm`, provides an interface for users to edit
 * an existing programming problem by updating its statement and editorial files.
 *
 * Features:
 * - Fetches problem data using a unique identifier (`handle`) from the URL.
 * - Displays a dropdown list of problems, allowing users to select one for editing.
 * - Enables users to upload new `.md` files for the problem statement and editorial.
 * - Validates that at least one file is updated before submission.
 * - Sends the updated content to the backend API (`updateProblem`) and refreshes the page upon success.
 *
 */


function EditProblemForm() {
  const [editorialContent, setEditorialContent] = useState<string | null>(null);
  const [statementContent, setStatementContent] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("");

  const { handle } = useParams();
  const [problems, setProblems] = useState<Array<ProblemsetterProblemRow>>([]);

  useEffect(() => {
    const loadProblems = async () => {
      if (handle) {
        try {
          const data = await readProblem(handle);
          setProblems(data.data.problems);
        } catch (error) {
          alert("Something went wrong. Please try again later.");
          console.error("Error: ", error);
        }
      }
    };
    loadProblems();
  }, [handle]);

  const handleSubmit = async () => {
    if (!selectedValue) {
      alert("You need to choose a problem.");
      return;
    }
  
    const updateData: Record<string, string> = {}; 
    if (statementContent) {
      updateData.statement = statementContent;
    }
    if (editorialContent) {
      updateData.editorial = editorialContent;
    }
  
    if (Object.keys(updateData).length === 0) {
      alert("You need to update at least one file.");
      return;
    }
  
    try {
      await updateProblem(Number(selectedValue), updateData);
      window.location.reload();
      alert("Your changes have been applied!");
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error("Error: ", error);
    }
  };
  

  return (
    <div className="bg-white w-[1000px] border-solid border-[#B8B8B8] border-[1px] rounded-[15px] p-[25px] flex flex-col items-center shadow-[1px_2px_4px_#00000040]">
      <div className="w-[800px]">
        <h1 className="font-[500] text-[30px]">Edit Problem</h1>
        <div className="pl-[30px] border-solid border-l-[4px] border-[#3B3B3B] h-[100px] flex flex-col justify-center my-[15px]">
          <p className="font-[400] text-[20px] w-[700px]">
            Statement and editorial will be overwritten if a new file is
            uploaded, otherwise, they will remain the same.
          </p>
        </div>
      </div>

      <div className="h-[150px] flex flex-col items-center justify-around">
        <div className="w-[800px]">
          <h1 className="font-[500] text-[27px]">Search</h1>
        </div>

        <div className="mb-[20px] flex justify-star items-center w-[800px] gap-[50px]">
          <div className="flex flex-col gap-2">
            <p>Select problem (Id - Name)</p>
            <select
              id="problem-select"
              className="w-[350px] h-[45px] border border-[#B8B8B8] rounded-[5px] pl-[5px] text-black"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <option value="" disabled hidden>
                Id - Name
              </option>
              {problems.map((p) => (
                <option key={p.problem_id} value={p.problem_id}>
                  {p.problem_id} - {p.problem_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="w-[900px] flex flex-col items-center gap-[20px]">
        <div className="w-[800px]">
          <h1 className="font-[500] text-[27px]">Edit</h1>
        </div>
        <div className="flex justify-around w-[inherit]">
          <div>
            <p>Statement (.md file)</p>
            <div className="w-[350px] h-[200px] rounded-[5px]">
              <DropFile
                contentSetter={setStatementContent}
                fileExtension=".md"
              />
            </div>
          </div>

          <div>
            <p>Editorial (.md file)</p>
            <div className="w-[350px] h-[200px] rounded-[5px]">
              <DropFile
                contentSetter={setEditorialContent}
                fileExtension=".md"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-main w-[250px] h-[30px] rounded-[8px]"
          onClick={() => handleSubmit()}
        >
          <span className="font-[500] text-[20px] text-white">
            Save changes
          </span>
        </button>
      </div>
    </div>
  );
}

export default EditProblemForm;

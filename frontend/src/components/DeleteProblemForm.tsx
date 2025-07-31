import { useEffect, useState } from "react";
import { deleteProblem, readProblem } from "../api/problems";
import { useParams } from "react-router-dom";

/**
 * The `DeleteProblemForm` component allows users to delete a programming problem 
 * from a list of available problems.
 *
 * Features:
 * - Fetches the list of problems associated with a given identifier (`handle`) from the URL.
 * - Displays a dropdown menu for users to select a problem to delete.
 * - Validates that a problem is selected before allowing deletion.
 * - Sends a request to delete the selected problem using `deleteProblem`.
 * - Reloads the page upon successful deletion to reflect the changes.
 * - Uses `useEffect` to load problems when the component mounts or when the handle changes.
 * - Uses `useState` to manage the list of problems and the selected problem ID.
 */


function DeleteProblemForm() {

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

  const handleDelete = async () => {
    if (!selectedValue) {
      alert("You need to choose a problem.");
      return;
    }
  
    try {
      await deleteProblem(Number(selectedValue));
      window.location.reload();
      alert("Your changes have been applied!");
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error("Error: ", error);
    }
  };

  return(
    <div className="display-none bg-white h-[400px] w-[1000px] border-solid border-[#B8B8B8] border-[1px] rounded-[15px] p-[25px] shadow-[1px_2px_4px_#00000040] flex flex-col justify-between items-center">
      <div className="w-[800px]">
        <h1 className="font-[500] text-[30px]">Delete Problem</h1>
      </div>

      <div className="mb-[35px] flex justify-center items-center w-[900px]  ">
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

      <button className="bg-main w-[250px] h-[30px] rounded-[8px]" onClick={() => handleDelete()}>
        <span className="font-[500] text-[20px] text-white">Delete</span>
      </button>
    </div>
  );
}

export default DeleteProblemForm;

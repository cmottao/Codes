import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readProblem } from "../api/problems";

/**
 * This code defines a reusable "ProblemsetterProblemsTable component"
 * which defines a table that contains all the necessary information for a problemsetter
 */

function ProblemsetterProblemsTable(){

  const { handle } = useParams();
  const [problems, setProblems] = useState<Array<ProblemsetterProblemRow>>([]);


  useEffect(() => {
   
    const loadProblems = async () => {
      if(handle){
        
        try {
          const data = await readProblem(handle); 
          setProblems(data.data.problems.reverse())
      
        } catch (error) {
          console.log("Error", error)
          alert("Something went wrong. Please try again later.");
        }
      } 
      
    };
    loadProblems(); 
  }, [handle]);

  return(
    <div className="bg-white w-[1000px]  border-solid border-[#B8B8B8] border-[1px] rounded-[15px] p-[25px] shadow-[1px_2px_4px_#00000040] flex flex-col items-center gap-[30px]">
      <div className="w-[800px]">
        <h1 className="font-[500] text-[30px]">My problems</h1>
      </div>
      
      
      <table className="border-collapse w-[800px] shadow-[0_1px_4px_#00000040] rounded-[15px] bg-white">
      <thead>
        <tr className="border-solid border-[#f3f3f3] border-b-[3px]">
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span>Id</span>
          </th>
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span>Problem Name</span>
          </th>
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span>Editorial</span>
          </th>
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span><span className="text-[#19BF6E]">Accepted</span> / Submissions</span>
          </th>
        </tr>
      </thead>
      <tbody className="text-center">
        {problems.map((p) => (
          <tr key={p.problem_id}>
            <td className="font-[400] text-[15px] w-[200px] h-[50px]">
              <Link to={`/problems/${p.problem_id}`}>
                <span className="transition-[0.3s] hover:text-[#235598] cursor-pointer underline">{p.problem_id}</span>
              </Link>
            </td>
            <td className="font-[400] text-[15px] w-[200px] h-[50px]">
              {p.problem_name}
            </td>
            <td className="font-[400] text-[15px] w-[200px] h-[50px]">
            <Link 
              to={`/problems/${p.problem_id}/editorial`}
              className="text-[#4E80C4] underline"
            >
              {p.problem_editorial.length > 20
                ? `${p.problem_editorial.slice(0, 20)}...`
                : p.problem_editorial}
            </Link>
            </td>
            <td className="font-[400] text-[15px] w-[200px] h-[50px]">
              <span className="text-[#19BF6E]">{p.accepted_submissions}</span> / {p.total_submissions}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    </div>
  );
}

export default ProblemsetterProblemsTable;
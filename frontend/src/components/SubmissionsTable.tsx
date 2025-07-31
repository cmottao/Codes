import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/*
The `SubmissionsTable` component displays a list of submissions made by a user.

Props:
- `submissions`: An array of `SubmissionRow` objects containing:
  - `id`: Unique identifier for the submission.
  - `problem_name`: The problem the submission is for.
  - `status`: The result of the submission (e.g., AC, WA, TL).
  - `date`: The submission timestamp.

Features:
- Uses `statusMessage` function to convert status codes into human-readable messages.
- Highlights accepted submissions (`AC`) in green.
- Displays a custom message if the user has no submissions.
- Each row is clickable and opens the submission details in a new tab.
- The first column contains a clickable link to the submission's page.
- Dynamic styling for hover effects and rounded corners.
- Formats the date using `toLocaleString` for readability.

*/


interface SubmissionsTableProps {
  submissions: Array<SubmissionRow>;
}

function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const { user } = useAuth();
  const { handle } = useParams();
  
  const statusMessage = (s: string) => {
    if (s == "AC") {
      return "Accepted";
    } else if (s == "WA") {
      return "Wrong Answer";
    } else if (s == "TL") {
      return "Time Limit Exceeded";
    } else if (s == "RT") {
      return "Runtime Error";
    } else if (s == "CE") {
      return "Compilation Error";
    } else if (s == "QU") {
      return "In Queue";
    }
  };
  if (submissions.length == 0) {
    if(user?.handle === handle){
      return <span className="text-[#464646] font-[700] text-[20px]">{"You haven't submitted any code :("}</span>;
    } else {
      return <span className="text-[#464646] font-[700] text-[20px]">{`${handle} hasn't submitted any code :(`}</span>;
    }
  } else {
    return (
      <table className="border-collapse w-[80%] shadow-[0_1px_4px_#00000040] rounded-[15px] bg-white">
        <tr className="border-solid border-[#f3f3f3] border-b-[3px]">
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span>Id</span>
          </th>
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span>Problem Name</span>
          </th>
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span>Veredict</span>
          </th>
          <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
            <span>Date</span>
          </th>
        </tr>
        {submissions.map((s, i) => {
          const formattedDate = new Date(s.date).toLocaleString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          return (
            <tr 
              key={s.id}
              className={`${s.status == "AC" ? "bg-[#19BF6E] text-white hover:bg-[#18ad65]" : "hover:bg-[#f0f0f0] "}  cursor-pointer transition-colors duration-[0.3s]`}
              onClick={() => {window.open(`/submissions/${s.id}`, "_blank")}}
              >
              <th className={`font-[400] text-[15px] w-[200px] h-[50px] ${i == (submissions.length - 1) ? "rounded-bl-[15px]" : ""}`}>
                <Link to={`/submissions/${s.id}`} target="_blank">
                  <span className="transition-[0.3s] hover:text-[#235598] cursor-pointer underline">{s.id}</span>
                </Link>
              </th>
              <th className=" font-[400] text-[15px] w-[200px] h-[50px]">
                {s.problem_name}
              </th>
              <th className="font-[400] text-[15px] w-[200px] h-[50px] ">
                {statusMessage(s.status)}
              </th>
              <th className={`font-[400] text-[15px] w-[200px] h-[50px] ${i == (submissions.length - 1) ? "rounded-br-[15px]" : ""}`}>
                {formattedDate}
              </th>
            </tr>
          );
        })}
      </table>
    );
  }
}

export default SubmissionsTable;

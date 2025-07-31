import SyntaxHighligther from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Nav from "../components/Nav";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getSubmission } from "../api/submissions";
import { AxiosError } from "axios";
import NotFound from "./NotFound";

/**
 * The submission detail component fetches and displays details of a specific submission,
 * including metadata such as the contestant, problem name, verdict, execution time, and date.
 * It also renders the submitted source code with syntax highlighting and provides a copy button.
 * If the submission is not found, it displays a "Not Found" page.
 */


function SubmissionDetail() {
  const { id } = useParams();
  const [ submission, setSubmission ] = useState<SubmissionDetail|null>(null);
  const [ notFound, setNotFound ] = useState<boolean>(false);


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

  useEffect(() => {
    const fetchSubmission = async () => {
      if(id){
        try {
          const res = await getSubmission(parseInt(id));
          setSubmission(res.data);
        } catch ( e ) {
          if(e instanceof AxiosError  && e.status == 404){
            setNotFound(true);
          }
        }
      }
    };

    fetchSubmission();
  },[]);

  if(submission){
    return (
      <>
        <div>
          <div className="flex flex-col justify-around items-center">
            <Nav/>
            <div className="h-[80px] w-[100vw] bg-white text-center align-middle ">
              <h1 className="font-[500] text-[30px] leading-[80px]">
                Submission: {submission.id}
              </h1>
            </div>
            
            <table className="border-collapse w-[80%] shadow-[0_1px_4px_#00000040] rounded-[15px] bg-white">
              <tr className="border-solid border-[#f3f3f3] border-b-[3px]">
                <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
                  <span>Contestant</span>
                </th>
                <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
                  <span>Problem Name</span>
                </th>
                <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
                  <span>Veredict</span>
                </th>
                <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
                  <span>Execution time</span>
                </th>
                <th className="text-[#4E80C4] text-[18px] w-[200px] h-[50px]">
                  <span>Date</span>
                </th>
              </tr>
  
              <tr>
                <th className="font-[400] text-[15px] w-[200px] h-[50px]">
                  <Link to={`/users/${submission.contestant}`}>
                    <span className="transition-[0.3s] hover:text-[#235598] cursor-pointer underline">{submission.contestant}</span>
                  </Link>
                </th>
                <th className="font-[400] text-[15px] w-[200px] h-[50px]">
                  <Link to={`/problems/${submission.problemId}`}>
                    <span className="transition-[0.3s] hover:text-[#235598] cursor-pointer underline">{submission.problemName}</span>
                  </Link>
                </th>
                <th className="font-[400] text-[15px] w-[200px] h-[50px]">
                  <span>{statusMessage(submission.status)}</span>
                </th>
                <th className="font-[400] text-[15px] w-[200px] h-[50px]">
                  <span>{submission.executionTime} s</span>
                </th>
                <th className="font-[400] text-[15px] w-[200px] h-[50px]">
                  <span>{submission.date.slice(0,10)}</span>
                </th>
              </tr>
            </table>
            
            <div className="min-h-[calc(100vh-160px)] ">
              <div className="w-[70vw] border-solid border-[1px] border-[#c2c2c2] rounded-[10px]  mt-[30px] ">
                <div className="border-solid border-b-[1px] border-[#c2c2c2] h-[35px] px-[10px] py-[4px]">
                  <div className="float-left">
                    <h3 className="text-[#4E80C4] text-[18px] font-[650]">Submission Code:</h3>
                  </div>
                  <div className="float-right">
                    <button className=" h-[25px] w-[50px] rounded-[5px] bg-[#f3f3f3] hover:bg-[#D9D9D9]"
                    onClick={() => {navigator.clipboard.writeText(submission.code)}}>Copy</button>
                  </div>
                </div>
                <div className="rounded-b-[10px] p-[4px] bg-[#f8f8ff]">
                  <SyntaxHighligther language={"cpp"} style={docco}>
                    {submission.code}
                  </SyntaxHighligther>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <Footer/>
      </>
  
    );
  } else {
    if(notFound){
      return <NotFound/>
    }
    return <p>Loading...</p>;
  }

}

export default SubmissionDetail;

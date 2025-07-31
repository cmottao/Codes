import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { getProblemById } from "../api/problems";
import NotFound from "./NotFound";
import { AxiosError } from "axios";

// Render markdown
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

/*
This component renders a problem page.  
It fetches the problem data by its ID and displays its details, including author, name, time limit, and statement.  
If the problem is not found, it shows a 404 Not Found page.  
*/


function Problem(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState<ProblemInfo>();
  const [notFound, setNotFound] = useState<boolean>(false);
  

  useEffect(() => {
    const getProblem = async () => {
      if(id && !isNaN(parseInt(id))){
        try {
          const res = await getProblemById(parseInt(id));
          setProblem(res.data);
        } catch (e) {
          if(e instanceof AxiosError && e.status == 404){
            setNotFound(true);
          }
        }
      }
    };
    getProblem();
  }, []);

  if(problem){
    return (
      <>
        <Nav/>
        <div className="w-[100vw] min-h-[calc(100vh-80px)] bg-white flex flex-col items-center py-[30px]">
          <div className="h-[300px] flex flex-col items-center justify-around">
            <div className="w-[200px] py-[5px] border-solid border-black border-[1px] rounded-[5px] text-center">
              <h3 className="font-[400] text-[20px]">By <span className="font-[700]">{problem.author}</span></h3>
            </div>
            <h1 className="font-[400] text-[45px]">{problem.name}</h1>
            <div className="text-center">
              <h3 className="font-[700] text-[20px]">Time Limit:</h3>
              <span className="font-[20px]">{`${problem.timeLimitSeconds} Second${problem.timeLimitSeconds > 1 ? "s" : ""}`}</span>
            </div>
            <svg width={60} height={3}>
              <rect x={0} y={0} width={60} height={3} fill="#959393"/>
            </svg>
            <div className="w-[330px] text-center">
              <p className="font-[700] text-[12px] text-[#ABABAB]">Problem editorial and submit pages can be found at the bottom of this page</p>
            </div>
          </div>
          <div className="w-[70vw] my-[30px]">
  
              <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-semibold">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-semibold">{children}</h3>,
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                }}>
                {problem.statement}
              </Markdown>
  
          </div>
          <div className="flex justify-around w-[50vw]">
              <button className="bg-main w-[250px] h-[45px] text-center rounded-[8px]" onClick={() => {navigate(`/problems/${id}/editorial`)}}>
                <span className="font-[700] text-white text-[20px]">Need a Hint?</span>
              </button>
              <button className="bg-main w-[250px] h-[45px] text-center rounded-[8px]" onClick={() => {navigate(`/problems/${id}/submit`)}}>
                <span className="font-[700] text-white text-[20px]">Submit</span>
              </button>
          </div>
        </div>
        <Footer/>
      </>
    );
  } else {
    if(notFound){
      return <NotFound/>
    } else {
      return <p>loading...</p>
    }

  }

}

export default Problem;
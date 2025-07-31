import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import { getProblemById } from "../api/problems";
import { AxiosError } from "axios";
import NotFound from "./NotFound";

// Render markdown
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

/**
 * The `Editorial` component displays the editorial content for a problem.
 *
 * Features:
 * - Fetches problem details based on the `id` from the URL.
 * - Renders markdown content, including mathematical expressions using `remarkMath` and `rehypeKatex`.
 * - Implements a progressive content reveal system:
 *   - Initially displays 25% of the editorial content.
 *   - Allows users to expand in increments of 25% or show the entire editorial.
 *   - Uses a smooth fading effect at the bottom when content is partially displayed.
 * - Handles errors such as problem not found (renders `NotFound` component).
 * - Uses a `useRef` to dynamically calculate content height.
 */



function Editorial(){
  const { id } = useParams();
  const [problem, setProblem] = useState<ProblemInfo|null>(null);
  const [visiblePercentage, setVisiblePercentage] = useState<number>(25);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    //Scroll height is the height of everything that is inside the div (even if it overflows)
    if(divRef.current?.scrollHeight){
      setContentHeight(divRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [problem]);

  const increaseVisibility = () => {
    setVisiblePercentage(Math.min(100, visiblePercentage + 25));
  };

  if(problem){
    return(
      <>
        <Nav/>
        <div className="w-[100vw] min-h-[calc(100vh-80px)] py-[30px] px-[100px] flex flex-col items-center gap-[30px]">
          <div className="flex flex-col items-center">
            <h3 className="text-main font-[300] text-[20px]">Editorial</h3>
            <h1 className="font-[500] text-[30px]">{problem.name}</h1>
          </div>
  
          <div className="border-solid border-l-[3px] border-main px-[15px] overflow-hidden h-[396px] w-[80vw]"
            ref={divRef}
            style={{
              height: `${Math.ceil(visiblePercentage*contentHeight/100)}px`,
              WebkitMaskImage:
              visiblePercentage < 100
                ? "linear-gradient(to bottom, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0))"
                : "none",
            }}
            >
            <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-semibold">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold">{children}</h3>,
                p: ({ children }) => <p className="mb-4">{children}</p>,
              }}>
              {problem.editorial}
            </Markdown>
          </div>
          {visiblePercentage < 100 
            ? <span className="text-main font-[500] text-[20px] cursor-pointer" onClick={increaseVisibility}>Read more...</span> 
            : ''}
          {visiblePercentage < 100 
            ? <button className="w-[130px] h-[38px] bg-main text-white rounded-[5px] text-[20px]" 
              onClick={() => setVisiblePercentage(100)}>Show All</button> 
            : ''}
        </div>
        <Footer/>
      </>
    );
  } else {
    if(notFound){
      return <NotFound/>
    } else {
      return <p>Loading...</p>;  
    }
  }

}

export default Editorial;
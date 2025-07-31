import { useState } from "react";
import Nav from "../components/Nav";
import SecondLevelMenu from "../components/SecondLevelMenu";
import Footer from "../components/Footer";
import CreateProblemForm from "../components/CreateProblemForm";
import DeleteProblemForm from "../components/DeleteProblemForm";
import EditProblemForm from "../components/EditProblemForm";
import ProblemsetterProblemsTable from "../components/ProblemsetterProblemsTable";

function Problemsetter(){
  const [option, setOption] = useState<"Create" | "Read" | "Update" | "Delete">("Create");

  const LoadForm = () => {
    if(option == "Create"){
      return <CreateProblemForm/>;
    } else if (option == "Read"){
      return <ProblemsetterProblemsTable/>
    } else if(option == "Update") {
      return <EditProblemForm/>;
    } else if(option == "Delete"){
      return <DeleteProblemForm/>;
    }
  };
  return (
    <>
      <Nav  activeTab="problemsetter" />
      <div className="h-[100px] w-[100vw] bg-white text-center align-middle pt-[10px]">
        <h1 className="font-[500] text-[30px] leading-[100px]">Problemsetter</h1>
      </div>

      <div className="w-[100vw] h-[80px]">
        <SecondLevelMenu options={["Create", "Read", "Update", "Delete"]} labels={["Add Problem", "My Problems", "Edit Problem", "Delete Problem"]} selected={option} select={setOption}/>
      </div>

      <div className="w-[100vw] bg-[#D9D9D9] min-h-[calc(100vh-260px)] py-[30px] flex justify-center">
        {LoadForm()}
      </div>

      <Footer/>
    </>
  );
}

export default Problemsetter;
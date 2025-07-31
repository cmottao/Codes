import { useEffect, useState } from "react";
import ActivityGraph from "../components/ActivityGraph";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import SubmissionsTable from "../components/SubmissionsTable";
import UserStats from "../components/UserStats";
import { Link, useParams } from "react-router-dom";
import { getUserSubmissions } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { AxiosError } from "axios";
import NotFound from "./NotFound";

/*
The Profile component displays a user's profile page, including their handle, last submissions, and activity graph.  
If the logged-in user is viewing their own profile, a welcome message appears.  
It fetches the last four submissions using the `getUserSubmissions` API call and displays them in a table.  
If the user handle does not exist, the NotFound component is shown.  
A link to view all submissions is provided.  
*/


function Profile() {

  const [lastubmissions, setLastSubmissions] = useState<Array<SubmissionRow>|null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);

  const { handle } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!handle || typeof handle !== "string") {
        console.error(`Invalid handle: ${handle}`);
        return;
      }
  
      try {
        const response = await getUserSubmissions(handle, 4, 1, "all");
        setLastSubmissions(response.data.submissions.reverse());
      } catch (error) {
        if(error instanceof AxiosError && error.status == 404){
          setNotFound(true);
        } else {
          console.error(`Error fetching submissions`, error);
        }
      }
    };
  
    fetchSubmissions();
  }, [handle]);

  if(lastubmissions){
    return (
      <>
        <Nav/>
        <div className="flex flex-col items-center justify-around gap-[20px]">
          <div className="text-center mt-[15px]">
            {user?.handle === handle ? <h3 className="text-main font-[300] text-[20px]">Welcome Back!</h3> : ''}
            <h1 className="text-[30px] font-[500]">{handle}</h1>
          </div>
          <div className="w-[1000px]">
            <UserStats />
          </div>
          <div className="w-[1000px] bg-[#F3F3F3] py-[30px] text-center flex items-center flex-col rounded-[30px] shadow-[1px_2px_4px_#00000040]">
            <h1 className="font-[500] text-[35px] py-[15px] ">
              Last Submissions
            </h1>
  
            <SubmissionsTable submissions={lastubmissions} />
            
            <span className="mt-[20px] cursor-pointer text-[20px] text-main transition-[0.3s] hover:text-[#235598] ">
              <Link to={`/users/${handle}/submissions`} target="_blank">See all submissions</Link>
            </span>
            
          </div>
  
          <div className="w-[100vw] h-[220px] flex items-start justify-center">
            <ActivityGraph />
          </div>
        </div>
  
        <Footer/>
      </>
    );
  } else {
    if(notFound){
      return <NotFound/>;
    } else {
      return <p>Loading...</p>;
    }
  }

}

export default Profile;

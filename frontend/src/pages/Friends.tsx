import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SecondLevelMenu from "../components/SecondLevelMenu";
import Footer from "../components/Footer";
import { getContestantsForFriendsPage, searchContestantsForFriendsPage } from "../api/contestants";
import PageSelector from "../components/PageSelector";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createFriendship, deleteFriendship } from "../api/friend";

/*
This component renders the Friends page, allowing users to search for and manage friends.  
It includes filtering options, a search bar, and pagination.  
Users can add or remove friends, and the list updates dynamically.  
*/


function Friends() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<"all" | "friends">("all");
  const [page, setPage] = useState<number>(1);
  const [numOfPages, setNumOfPages] = useState<number>(0);
  const [search, setSearch] = useState<string | null>(null);
  const [contestants, setContestants] = useState<Array<ContestantInfoRow> | null>(null);
  const pageLenght = 5;
  
  const handleToggleFriend = async (friendHandle: string, isCurrentlyFriend: boolean) => {
    if (!user) return alert("User not authenticated");
  
    const newFriend: Friend = {
      contestantHandle: user.handle,
      friendHandle: friendHandle,
    };
  
    try {
      if (isCurrentlyFriend) {
        await deleteFriendship(newFriend);
      } else {
        await createFriendship(newFriend);
      }
  
      setContestants((prev) => {
        if (!prev) return [];

        const index = prev.findIndex((u) => u.handle === friendHandle);
        if (index === -1) return prev;
      
        const updatedContestants = [...prev];
        updatedContestants[index] = { ...updatedContestants[index], isFriend: !isCurrentlyFriend };
      
        return updatedContestants;
      });
    } catch (error) {
      console.error(`Error ${isCurrentlyFriend ? "removing" : "adding"} friend:`, error);
      alert(`Failed to ${isCurrentlyFriend ? "remove" : "add"} friend.`);
    }
  };
  

  const changeFilter = (o: "all" | "friends" ) => {
    setFilter(o);
    setPage(1);
    setSearch(null);
    (document.getElementById("search-bar") as HTMLInputElement).value = "";
  };

  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const displayList = ()=>{
    if(filter === "friends" && contestants?.length == 0){
      return <p className="text-[#464646] font-[700] text-[20px]">{"It seems like you don't have any friends yet :("}</p>;
    }  else if (search && contestants?.length == 0){
      return <p className="text-[#464646] font-[700] text-[20px]">{"It seems like the user you are searching for doesn't exist :("}</p>;
    } else {
      const buffer:any = [];
      contestants?.map(u => {
        buffer.push(
        <div className="bg-white shadow-[1px_2px_4px_#00000040] rounded-[8px] w-[750px] h-[100px] flex justify-around items-center">
          <div className="w-[200px]">
            <Link to={`/users/${u.handle}`} target="_blank">
              <h3 className="font-[700] text-[18px]">{u.handle}</h3>
            </Link>
            <p><span className="text-[#19BF6E]">{u.ACSubmissions}</span>/{u.submissions}</p>
          </div>
          <div className="text-[#464646]">
            <h3 className="font-[700] text-[15px]">Last Submission</h3>

            <p>{u.lastSubmissionDaysAgo ? `${u.lastSubmissionDaysAgo} day${u.lastSubmissionDaysAgo != 1 ? 's': ''} ago` : "No submissions"}</p>
          </div>
          <button 
            className={`${u.isFriend ? "bg-white border-solid border-[#D7D7D7] border-[2px]" : "bg-main"} w-[85px] h-[35px] rounded-[8px]`}
            onClick={() => handleToggleFriend(u.handle, u.isFriend)}>
            <span className={`${u.isFriend ? "text-main" : "text-white"} font-[500] `}>
              {u.isFriend ? "Remove" : "Add"}
            </span>
          </button>
         </div>
        );
      })

      return buffer;
    }
  };

  useEffect(() => {
    const get = async () => {
      if(user?.handle){

        if(search){
          setFilter("all");
          const res = await searchContestantsForFriendsPage(pageLenght, page, search);
          setContestants(res.data.contestants);
          setNumOfPages(res.data.numOfPages);
        } else {
          const res = await getContestantsForFriendsPage(pageLenght, page, filter);
          setContestants(res.data.contestants);
          setNumOfPages(res.data.numOfPages);
        }
      }
    };

    get();
  }, [filter, page, search]);


  if(contestants){
    return (
      <>
        <Nav activeTab="friends"/>
        <div className="h-[100px] w-[100vw] bg-white text-center align-middle pt-[10px]">
          <h1 className="font-[500] text-[30px] leading-[100px]">Add Friends</h1>
        </div>
        
        <div className="w-[100vw] h-[80px] bg-white">
          <div className="w-[60vw]">
            <SecondLevelMenu options={["all", "friends"]} labels={["All Users", "Friends"]} selected={filter} select={changeFilter}/>
          </div>
          <div className="w-[40vw] h-[80px] float-right flex justify-center items-center" >
            <input id="search-bar" type="search" className="border-solid border-[#B8B8B8] border-[3px] rounded-[10px] w-[200px] h-[35px] p-[3px] placeholder:text-center" 
            placeholder="Search..."
            onChange={e => handleSearchBar(e)}/>
          </div>
        </div>
  
        <div className="w-[100vw] bg-[#D9D9D9] min-h-[calc(100vh-260px)] py-[30px]">
          <div className="flex flex-col justify-around gap-[20px] items-center">
            {displayList()}
            <div className="mt-[20px]">
              <PageSelector numOfPages={numOfPages} currentPage={page} setPage={setPage}/>
            </div>
          </div>
        </div>
  
        <Footer/>
      </>
    );
  } else {
    return (<p>Loading...</p>)
  }


}

export default Friends;

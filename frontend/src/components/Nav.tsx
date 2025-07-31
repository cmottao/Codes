import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * This code defines a navigation bar component for a coding platform using React and React Router.
 * The `Nav` component displays different navigation links based on the authenticated user's role.
 * 
 * - If the user is logged in, it shows their profile link, "Problems," "Custom Test," and additional
 *   tabs like "Friends" (for contestants) and "Problemsetter" (for problem setters).
 * - If the user is not logged in, it displays "Login" and "Register" options.
 * - The component also includes a logout function that logs out the user and updates the authentication state.
 * - The `activeTab` prop determines which tab is currently selected, highlighting it with a border.
 * - Tailwind CSS is used for styling, and React Router's `Link` component is used for navigation.
 */


interface NavProps {
  activeTab?: "problems" | "friends" | "problemsetter" | "customtest";
}

function Nav({ activeTab }: NavProps) {
  const { user } = useAuth();
  const { logout_context } = useAuth();

  const handleLogout = async () => {
    try {
      await logout_context();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const loadLogoutOrRegister = () => {
    if(user){
      return (
        <div className={`w-[18vw] flex justify-around items-center px-[20px] leading-[80px]`} onClick={handleLogout}>
          <span className={`text-[18px] cursor-pointer transition-[0.3s] hover:text-[#235598] font-[300]`}>
            Logout
          </span>
        </div>
      );
    } else {
      return (
        <div className='w-[18vw] flex justify-around items-center px-[20px]'>
          <div className={`h-[80px] align-middle leading-[80px]`}>
            <Link to={"/login"}>
              <span className={`text-[18px] cursor-pointer transition-[0.3s] hover:text-[#235598] font-[300]`}>
                Login
              </span>
            </Link>
          </div>
          <span className="font-[300]">Or</span>
          <div className={`h-[80px] align-middle leading-[80px]`}>
            <Link to={"/register"}>
              <span className={`text-[18px] cursor-pointer transition-[0.3s] hover:text-[#235598] font-[300]`}>
                Register
              </span>
            </Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="h-[80px] w-[100vw] sticky bg-white shadow-[0_2px_4px_#00000040] top-0 z-[1000]">
      <div className="flex flex-row">
        <Link to={user ? `/users/${user.handle}` : ''}>
          <div className="text-center h-[80px] w-[12vw] align-middle leading-[80px]">
            <span className="text-[30px] font-[500]"><span className="text-main">C</span>od<span className="text-main">es</span></span>
          </div>
        </Link>

        <div className="h-[80px] w-[70vw] flex flex-row justify-around align-middle leading-[80px] text-center">
          <div className={`h-[80px] ${activeTab == "problems" ? "border-solid border-[#4E80C4] border-b-[3px]" : ""}`}>
            <Link to={"/problems"}>
              <span className={`text-[18px] cursor-pointer ${activeTab == "problems" ? "text-[#4E80C4] font-[500]" : "font-[300]"} transition-[0.3s] hover:text-[#235598]`}>
                Problems
              </span>
            </Link>

          </div>

          <div className={`h-[80px] ${activeTab == "customtest" ? "border-solid border-[#4E80C4] border-b-[3px]" : ""}`}>
            <Link to={"/customtest"}>
              <span className={`text-[18px] cursor-pointer ${activeTab == "customtest" ? "text-[#4E80C4] font-[500]" : "font-[300]"} transition-[0.3s] hover:text-[#235598]`}>
                Custom Test
              </span>
            </Link>

          </div>

          {(user?.roles.includes("contestant")) ? 
            (<div className={`h-[80px] ${activeTab == "friends" ? "border-solid border-[#4E80C4] border-b-[3px]" : ""}`} >
              <Link to={"/friends"}>
                <span className={`text-[18px] cursor-pointer  ${activeTab == "friends" ? "text-[#4E80C4] font-[500]" : "font-[300]"} transition-[0.3s] hover:text-[#235598]`}>
                  Friends
                </span>
              </Link>
            </div>) : <></>
          }

          {(user?.roles.includes("problem_setter")) ?
            (<div className={`h-[80px] ${activeTab == "problemsetter" ? "border-solid border-[#4E80C4] border-b-[3px]" : ""}`}>
              <Link to={`/problemsetter/${user.handle}`}>
                <span className={`text-[18px] cursor-pointer ${activeTab == "problemsetter" ? "text-[#4E80C4] font-[500]" : "font-[300]"} transition-[0.3s] hover:text-[#235598]`}>
                  Problemsetter
                </span>
              </Link>
            </div>) : <></>
          }

        </div>
        
        {loadLogoutOrRegister()}

      </div>

    </div>
  );
}

export default Nav;
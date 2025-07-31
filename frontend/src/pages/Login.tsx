import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { AxiosError } from "axios";
import ErrorMessage from "../components/ErrorMesage";

/*
This component renders the Login page, allowing users to authenticate with their handle and password.  
It includes error handling, redirects authenticated users, and provides a sign-up link for new users.  
*/


function Login() {
  const [handle, setHandle] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string|undefined>();
  const { login_context, isAuthenticated, user } = useAuth();
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    try {
      await login_context(handle, password);
      navigate(`/users/${user?.handle}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        const resData = e.response?.data as { message?: string };
        setError(true);
        setErrorMessage(resData.message);
        setTimeout(() => setError(false), 3000);
      } else {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/users/${user?.handle}`);
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className=" h-[100vh] w-[100vw] flex justify-center items-center bg-[linear-gradient(white_50%,#4E80C4_50%)]">
        <div className="min-h-[450px] min-w-[460px] shadow-[0_0_8px_#00000040] rounded-[15px] bg-white p-[15px] flex flex-col items-center justify-center gap-[30px]">
          <h1 className="text-[45px] font-[500] text-center">Login</h1>
          <div className="flex flex-col items-center gap-[30px]">
                        
            <div className={` w-[300px]`}>
              <ErrorMessage active={error} message={errorMessage ? errorMessage : ""} />
            </div>

            <div>
              <label className="text-[20px] font-[400] block">Handle</label>
              <input
                type="text"
                className="border-solid border-[2px] border-[#B8B8B8] rounded-[8px] w-[300px] h-[35px] p-1"
                onChange={(e) => setHandle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[20px] font-[400] block">Password</label>
              <input
                type="password"
                className="border-solid border-[2px] border-[#B8B8B8] rounded-[8px] w-[300px] h-[35px] p-1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Link to="/register" className="text-[#4E80C4] underline">
                Don't have an account? Sign up!
              </Link>
            </div>

            <div>
              <button
                className="bg-main w-[145px] h-[38px] rounded-[5px]"
                onClick={handleSubmit}
              >
                <span className="text-white font-[500] text-[20px]">Enter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;

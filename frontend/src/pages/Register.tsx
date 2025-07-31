import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ErrorMessage from "../components/ErrorMesage";
import { AxiosError } from "axios";

/*
The Register component provides a user registration form with fields for handle, first name, last name, and password.  
It validates that the password and confirmation match before attempting to register using the `register_context` function.  
If the registration is successful, it redirects the user to their profile page.  
Error messages are displayed when registration fails, and an existing session redirects to the profile page.  
A link to the login page is provided for users who already have an account.  
*/


function Register() {
  const [handle, setHandle] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string|undefined>();
  const { register_context, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmedPassword) {
      setError(true);
      setErrorMessage("Passwords do not match");
      setTimeout(() => setError(false), 3000);
      return;
    }

    try {
      await register_context(handle, password, firstName, secondName);
      navigate(`/users/${user?.handle}`);
    } catch (e) {
      if(e instanceof AxiosError){
        const resData = e.response?.data as {message?: string};
        setError(true);
        setErrorMessage(resData.message);
        setTimeout(() => setError(false), 3000);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/users/${user?.handle}`);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="bgx">
        <div className=" h-[100vh] w-[100vw] flex justify-center items-center bg-[linear-gradient(white_50%,#4E80C4_50%)]">
          <div className="min-h-[550px] min-w-[460px] shadow-[0_0_8px_#00000040] rounded-[15px] bg-white p-[15px] flex flex-col items-center justify-around">
            <h1 className="text-[45px] font-[500] text-center">Register</h1>
            
            <div className=" w-[400px]">
              <ErrorMessage active={error} message={errorMessage ? errorMessage : ""}/>
            </div>

            <div className="flex flex-col items-center gap-[10px] mt-[10px]">
              <div>
                <label className="text-[20px] font-[400] block">Handle</label>
                <input
                  type="text"
                  className="border-solid border-[2px] border-[#B8B8B8] rounded-[8px] w-[300px] h-[35px] p-1"
                  onChange={(e) => setHandle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[20px] font-[400] block">First name</label>
                <input
                  type="text"
                  className="border-solid border-[2px] border-[#B8B8B8] rounded-[8px] w-[300px] h-[35px] p-1"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[20px] font-[400] block">Last Name</label>
                <input
                  type="text"
                  className="border-solid border-[2px] border-[#B8B8B8] rounded-[8px] w-[300px] h-[35px] p-1"
                  onChange={(e) => setSecondName(e.target.value)}
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
                <label className="text-[20px] font-[400] block">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="border-solid border-[2px] border-[#B8B8B8] rounded-[8px] w-[300px] h-[35px] p-1"
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </div>

              <div>
                <Link to="/login" className="text-[#4E80C4] underline">
                  Already have an account? Log in!
                </Link>
              </div>


              <div>
                <button
                  className="bg-main w-[145px] h-[38px] rounded-[5px]"
                  onClick={handleSubmit}
                >
                  <span className="text-white font-[500] text-[20px]">
                    Enter
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;

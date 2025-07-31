import Footer from "../components/Footer";
import Nav from "../components/Nav";

/*
This component renders the Home page, introducing users to the platform.  
It features a welcome message, a brief description, and a call-to-action button.  
*/


function Home(){
  return (
    <>
      <Nav/>
      <div className="h-[100vh] w-[100vw] bg-white p-[30px]">
        <div className="h-[50vh] flex flex-col justify-around">
          <p className="w-[500px]">
            <h1 className="text-[#ABABAB] text-[40px] font-[600]">Ready for a new challenge?</h1>
          </p>

          <div className="text-[20px] w-[700px] h-[150px] flex flex-col justify-around">
            <p>You are about to find thousands of coding challenges gathered in one single place!</p>
            <p>What are you waiting for? Join us at <span className="text-main">C</span>od<span className="text-main">es</span>, and take you coding skills to the next level!</p>
          </div>

          <button className="bg-main w-[250px] h-[45px] text-center rounded-[8px]">
            <span className="font-[700] text-white text-[20px]">Start coding!</span>
          </button>
        </div>

      </div>

      <Footer/>
    </>
  );
}

export default Home;
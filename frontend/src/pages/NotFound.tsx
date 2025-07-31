import Footer from "../components/Footer";
import Nav from "../components/Nav";

/*
This component renders a simple 404 Not Found page.  
It displays a message informing the user that the requested page does not exist.  
*/


function NotFound(){
  return(
    <>
      <Nav/>
        <div className="w-[100vw] h-[calc(100vh-80px)] bg-[#D9D9D9] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[#464646] font-[700] text-[100px]">404</h1>
            <p className="text-[#464646] font-[700] text-[40px]">Page not found</p>
          </div>
        </div>
      <Footer/>
    </>
  );
}

export default NotFound;
import yt from "../static/yt.png";
import email from "../static/email.png";
import phone from "../static/phone.png";
import gh from "../static/gh.png";

/**
 * Footer section of the page
 * shows some relevant information about the project and the developers
 */

function Footer() {
  return (
    <div className="mt-[100px] h-[200px] w-[100vw] bg-white bottom-0 absolute px-[50px] pt-[20px]">
      <div className=" border-solid border-b-[1px] pb-[140px] border-[#9A9A9A] h-[130px] flex justify-around">
        <div className="w-[500px]">
          <h1 className="font-[500] text-[30px]"><span className="text-main">C</span>od<span className="text-main">es</span></h1>
          <p className="font-[500] text-[12px] text-[#464646]">Codes was developed by three Systems and Computer Engineering students from the National University of Colombia:
          Cristian Motta, Juan Esteban Santacruz, and Sebastian Andrade.</p>
        </div>

          <div className="text-center flex-row justify-around gap-[10px]">
            <h3 className="py-[5px] text-[15px]"><span className="text-main">C</span>ristian</h3>
            <div className="flex justify-center items-center leading-[16px] py-[5px]">
              <img src={email} className="pr-[2px] h-[15px] w-auto inline" />
              <p className="mx-[3px] text-[13px]">cmottao@unal.edu.co</p>
            </div>
            <div className="flex justify-center items-center leading-[16px]  py-[5px]">
              <img src={phone} className="h-[15px] w-auto inline" />
              <p className="mx-[3px] text-[13px]">+57 318 5382148</p>
            </div>
            <div className="flex justify-center items-center leading-[16px]  py-[5px]">
              <a href="https://github.com/cmottao" target="_blank">
                <img src={gh} className="h-[15px] w-auto inline" />
              </a>
            </div>
          </div>

          <div className="text-center flex-row justify-around gap-[10px]">
            <h3 className="py-[5px] text-[15px]"><span className="text-main">E</span>steban</h3>
            <div className="flex justify-center items-center leading-[16px] py-[5px]">
              <img src={email} className="pr-[2px] h-[15px] w-auto inline" />
              <p className="mx-[3px] text-[13px]">justantacruzc@unal.edu.co</p>
            </div>
            <div className="flex justify-center items-center leading-[16px]  py-[5px]">
              <img src={phone} className="h-[15px] w-auto inline" />
              <p className="mx-[3px] text-[13px]">+57 317 3588999</p>
            </div>
            <div className="flex justify-center items-center leading-[16px]  py-[5px] gap-[5px]">
              <a href="https://github.com/Jestebansamt" target="_blank">
                <img src={gh} className="h-[15px] w-auto inline" />
              </a>
              <a href="https://www.youtube.com/@document0761" target="_blank">
                <img src={yt} className="h-[15px] w-auto inline" />
              </a>
            </div>
          </div>

          <div className="text-center flex-row justify-around gap-[10px]">
            <h3 className="py-[5px] text-[15px]"><span className="text-main">S</span>ebastian</h3>
            <div className="flex justify-center items-center leading-[16px] py-[5px]">
              <img src={email} className="pr-[2px] h-[15px] w-auto inline" />
              <p className="mx-[3px] text-[13px]">sandradec@unal.edu.co</p>
            </div>
            <div className="flex justify-center items-center leading-[16px]  py-[5px]">
              <img src={phone} className="h-[15px] w-auto inline" />
              <p className="mx-[3px] text-[13px]">+57 318 5392147</p>
            </div>
            <div className="flex justify-center items-center leading-[16px]  py-[5px]">
              <a href="https://github.com/Sgewux" target="_blank">
                <img src={gh} className="h-[15px] w-auto inline" />
              </a>
            </div>
          </div>

      </div>
      <div className="align-middle h-[70px] leading-[70px] pl-[40px]">
        <p className="text-[#464646] tetx-[20px]">© 2025 Codes. All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;

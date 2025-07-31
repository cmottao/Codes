/**
 * `PageSelector` is a pagination component that allows users to navigate between pages.
 * 
 * - Accepts `numOfPages` (total pages), `currentPage` (active page), and `setPage` (state setter) as props.
 * - Provides next and previous buttons to navigate through pages, with proper enabling/disabling logic.
 * - Allows direct page input; users can type a page number and press "Enter" to navigate.
 * - Prevents invalid page navigation (ensures input is within valid page range).
 * - Uses an input field to display the current page and allows user-defined navigation.
 * - Hides the component if `numOfPages` is 0.
 */

interface pageSelectorProps {
  numOfPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function PageSelector({ numOfPages, currentPage, setPage }: pageSelectorProps) {

  const handleInputChange = (e: any) => {
    if(e.key == "Enter"){
      const nw: number = parseInt(e.target.value);
      e.target.value = "";
      if(!isNaN(nw)){
        if(nw > 0 && nw <= numOfPages){
          setPage(nw);
        }
      }
    }
  };

  const handleChangePage = (add: number) => {
    (document.getElementById("page-input") as HTMLInputElement).value = "";
    setPage(currentPage + add);
  };

  return (
    <div className={`flex flex-row border-solid border-[#D9D9D9] border-[2px] ] ${numOfPages > 0 ? "" : "hidden"}`}>
      <button className="bg-white h-[30px] w-[30px] rounded-l-[10px] disabled:cursor-not-allowed" onClick={() => handleChangePage(-1)} disabled={currentPage == 1}>
        {"<"}
      </button>
      <div className="bg-white h-[30px] px-[5px] text-center border-solid mx-[2px] align-middle leading-[30px]">
        <span>Page</span>
        <input id="page-input" type="text" 
          placeholder={numOfPages != 0 ? currentPage.toString() : '0'} 
          className={` placeholder:text-[#000000] mx-[5px] text-center`} 
          size={numOfPages.toString().length}
          onKeyUp={(e) => handleInputChange(e)}
        />   
        <span>of {numOfPages}</span>
      </div>
      <button className="bg-white h-[30px] w-[30px] rounded-r-[10px] disabled:cursor-not-allowed " onClick={() => handleChangePage(1)} disabled={currentPage >= numOfPages}>
        {">"}
      </button>
    </div>
  );
}

export default PageSelector;

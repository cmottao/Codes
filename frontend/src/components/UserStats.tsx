import { useEffect, useState } from "react";
import check from "../static/check.png";
import calendar from "../static/calendar.png";
import lightbulb from "../static/lightbulb.png";
import { useParams } from "react-router-dom";
import { get_AC_statistics } from "../api/user";

/**
 * The `UserStats` component displays a user's problem-solving statistics
 * in a visually appealing format using three statistic cards.
 *
 * Features:
 * - Fetches and displays three key statistics:
 *   1. Total problems solved.
 *   2. Problems solved in the last month.
 *   3. Total submissions made.
 * - Retrieves the user's handle from the URL using `useParams`.
 * - Calls the `get_AC_statistics` API to fetch the user's statistics.
 * - Uses `useState` to manage the retrieved statistics.
 * - Uses `useEffect` to fetch data when the component mounts or when the handle changes.
 * - Displays statistics using three styled cards, each containing an icon and text.
 */


function UserStats() {
  const { handle } = useParams();
  const [solvedProblems, setSolvedProblems] = useState<number>(0);
  const [solvedLastMonth, setSolvedLastMonth] = useState<number>(0);
  const [submissions, setSubmissions] = useState<number>(0);

  useEffect(() => {
    const get = async () => {
      if (!handle || typeof handle !== "string") {
        console.error(`Invalid handle: ${handle}`);
        return;
      }

      try {
        const response = await get_AC_statistics(handle);
        setSolvedProblems(response.data["totalAC"]);
        setSolvedLastMonth(response.data["recentAC"]);
        setSubmissions(response.data["totalSubmissions"]);
      } catch (error) {
        console.error(`Error fetching`, error);
      }
    };

    get();
  }, [handle]);

  return (
    <div className="flex flex-row flex-wrap justify-around my-[50px]">
      <div className="h-[120px] w-[300px] bg-[#f3f3f3] shadow-[1px_2px_4px_#00000040] rounded-[10px] py-[15px] px-[30px]">
        <div>
          <div className="w-[240px] h-[50px] flex items-center">
            <img src={check} className="h-[35px] w-[35px]" />
            <span className="text-[35px] font-[500] mx-[15px]">
              {solvedProblems}
            </span>
          </div>
          <span className="font-[300] text-[18px] text-[#7D7C7C]">
            Problem solved for all time
          </span>
        </div>
      </div>
      <div className="h-[120px] w-[300px] bg-[#f3f3f3] shadow-[1px_2px_4px_#00000040] rounded-[10px] py-[15px] px-[30px]">
        <div>
          <div className="w-[240px] h-[50px] flex items-center">
            <img src={calendar} className="h-[35px] w-[35px]" />
            <span className="text-[35px] font-[500] mx-[15px]">
              {solvedLastMonth}
            </span>
          </div>
          <span className="font-[300] text-[18px] text-[#7D7C7C]">
            Problems solved last month
          </span>
        </div>
      </div>
      <div className="h-[120px] w-[300px] bg-[#f3f3f3] shadow-[1px_2px_4px_#00000040] rounded-[10px] py-[15px] px-[30px]">
        <div>
          <div className="w-[240px] h-[50px] flex items-center">
            <img src={lightbulb} className="h-[35px] w-[35px]" />
            <span className="text-[35px] font-[500] mx-[15px]">
              {submissions}
            </span>
          </div>
          <span className="font-[300] text-[18px] text-[#7D7C7C]">
            Total submissions
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserStats;

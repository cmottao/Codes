import { useEffect, useState } from "react";
import { getSubmissionActivity } from "../api/contestants";
import { useParams } from "react-router-dom";

/*
*The `ActivityGraph` component visualizes a user's submission activity over the past year in a GitHub-style heatmap. 
*It fetches submission data from the API based on the `handle` obtained from the URL parameters. 
*The activity data is structured as a grid of colored squares, where each square represents a day's submissions, with different shades indicating varying submission frequencies.
* Labels for months and weekdays are also generated. If the data is still loading, a "Loading..." message is displayed.
*/


function ActivityGraph() {
  const [activity, setActivity] = useState<Array<SubmissionActivity>>();
  const { handle } = useParams();

  const today = new Date(Date.now());
  //const today = new Date(Date.parse("2025-01-12T00:00:00"));
  const numDays = 52 * 7 + today.getDay();
  let currDate = new Date(today.getTime());
  currDate.setDate(today.getDate() - numDays);

  const format = (d: Date) => {
    const month =
      d.getMonth() + 1 >= 10 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`;
    const day = d.getDate() + 1 >= 10 ? `${d.getDate()}` : `0${d.getDate()}`;

    return `${d.getFullYear()}-${month}-${day}`;
  };

  useEffect(() => {
    const getActivity = async () => {
      if (handle) {
        const res = await getSubmissionActivity(
          handle,
          format(currDate),
          format(today)
        );
        setActivity(res.data);
      }
    };

    getActivity();
  }, []);

  const getColorByFreq = (freq: number) => {
    if (freq > 8) {
      return "#216E39";
    } else if (freq > 5) {
      return "#30A14E";
    } else if (freq > 2) {
      return "#40C463";
    } else {
      return "#8bdc99";
    }
  };

  const generateSquares = () => {
    let k = 0;
    const eq = (a: Date, b: Date) => {
      return (
        a.getFullYear() == b.getFullYear() &&
        a.getMonth() == b.getMonth() &&
        a.getDate() == b.getDate()
      );
    };

    let buffer = [];
    for (let i = 0; i < 52; i++) {
      let col = [];
      for (let j = 0; j < 7; j++) {
        if (
          activity &&
          activity[k] !== undefined &&
          eq(currDate, new Date(Date.parse(activity[k].date + "T00:00:00")))
        ) {
          col.push(
            <rect
              width={11}
              height={11}
              y={13 * j}
              fill={getColorByFreq(activity[k].numberOfSubmissions)}
            />
          );
          k++;
        } else {
          col.push(
            <rect
              width={11}
              height={11}
              y={13 * j}
              fill="rgba(235, 237, 240, 1)"
            />
          );
        }

        currDate.setDate(currDate.getDate() + 1);
      }

      buffer.push(<g transform={`translate(${13 * i},0)`}>{col}</g>);
    }

    let col = [];
    for (let j = 0; j <= today.getDay(); j++) {
      if (
        activity &&
        activity[k] !== undefined &&
        eq(currDate, new Date(Date.parse(activity[k].date + "T00:00:00")))
      ) {
        col.push(
          <rect
            width={11}
            height={11}
            y={13 * j}
            fill={getColorByFreq(activity[k].numberOfSubmissions)}
          />
        );
        k++;
      } else {
        col.push(
          <rect
            width={11}
            height={11}
            y={13 * j}
            fill="rgba(235, 237, 240, 1)"
          />
        );
      }

      currDate.setDate(currDate.getDate() + 1);
    }

    buffer.push(<g transform={`translate(${13 * 52},0)`}>{col}</g>);
    return buffer;
  };

  const generateLabels = () => {
    let buffer = [];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let currMonth = new Date().getMonth();
    //let currMonth = new Date(Date.parse("2025-05-21T00:00:00")).getMonth();

    for (let i = 0; i < 13; i++) {
      buffer.push(
        <text x={i * 55} y={-5} className="text-[#000000] text-[10px]">
          {months[currMonth]}
        </text>
      );
      currMonth = (currMonth + 1) % 12;
    }

    buffer.push(
      <text x={-22} y={22} className="text-[#000000] text-[10px]">
        Mon
      </text>
    );
    buffer.push(
      <text x={-22} y={48} className="text-[#000000] text-[10px]">
        Wed
      </text>
    );
    buffer.push(
      <text x={-22} y={74} className="text-[#000000] text-[10px]">
        Fri
      </text>
    );

    return buffer;
  };

  if (activity) {
    return (
      <div>
        <svg viewBox="-22 -20 721 200" width={1000}>
          <g>
            {generateSquares()}
            {generateLabels()}
          </g>
        </svg>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default ActivityGraph;
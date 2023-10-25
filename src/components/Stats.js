import { useState } from "react";
import "./Stats.css";
import StatsItems from "./StatsItems";
import { useProgress } from "../store/ProgressContext";

// const r = document.querySelector(":root");
// r.style.setProperty("--hours-deg", `${hoursHandlea}deg`);

const Stats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [statsState, setStatsState] = useState([]);

  const { user } = useProgress();

  const today = Date.now();
  // const day = today.getDate();
  // const month = today.getMonth();
  // const year = today.getFullYear();
  // console.log(day, month, year);
  console.log(today);

  const clickHandler = (e) => {
    const controller = new AbortController();
    e.preventDefault();
    fetchStats(controller);
  };

  async function fetchStats(controller) {
    try {
      setIsLoading(true);
      setError("");
      // const url = user
      //   ? `http://127.0.0.1:3001/api/v1/stats?user=${user}&endDate[gt]=${+today}`
      //   : `http://127.0.0.1:3001/api/v1/stats`;
      const url = user
        ? `https://productivityapp.onrender.com/api/v1/stats?user=${user}&endDate[gt]=${+today}`
        : `https://productivityapp.onrender.com/api/v1/stats`;

      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) throw new Error("Something went wrong with fetching stats");

      const result = await res.json();
      // console.log(result);
      const data = result.data.stats;
      console.log(data);

      setStatsState(data);

      if (data.Response === "False") throw new Error("Stats not found");
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="fetchButtonContainer">
        <button className="fetchButton" onClick={clickHandler}>
          Fetch
        </button>
      </div>
      {statsState.length > 0 && <StatsItems statsState={statsState} />}
    </div>
  );
};

export default Stats;

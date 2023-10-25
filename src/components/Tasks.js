import { useRef } from "react";
import { useState } from "react";
import styles from "./Tasks.module.css";
import TaskCard from "./TaskCard";
import TaskCards from "./TaskCards";
import RemainingTime from "./RemainingTime";
import { useEffect } from "react";
import { useProgress } from "../store/ProgressContext";

const Tasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [combinedTasksState, setCombinedTasksState] = useState([]);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const endTime = new Date(year, month, day + 1, 0, 0);

  const { combinedTasksState } = useProgress();

  // async function clickHandler(e) {
  // const controller = new AbortController();
  // e.preventDefault();
  // const allTasks = await fetchTasks(controller);
  // const allProgress = await fetchProgress(controller);
  // const combinedTasks = await allTasks.map((task, i) => {
  //   let obj = allProgress.find(
  //     (progress) => progress.activity === task.activity
  //   );
  //   if (!obj) {
  //     return task;
  //   } else {
  //     return { ...task, duration: obj.duration, level: obj.level };
  //   }
  // });
  // console.log(combinedTasks);
  // setCombinedTasksState(combinedTasks);
  // }

  // useEffect(() => {
  //   if (!user) return;
  //   const func = async () => {
  //     const controller = new AbortController();
  //     const allTasks = await fetchTasks(controller);
  //     const allProgress = await fetchProgress(controller);
  //     const combinedTasks = await allTasks.map((task, i) => {
  //       let obj = allProgress.find(
  //         (progress) => progress.activity === task.activity
  //       );
  //       if (!obj) {
  //         return task;
  //       } else {
  //         return { ...task, duration: obj.duration, level: obj.level };
  //       }
  //     });
  //     console.log(combinedTasks);
  //     setCombinedTasksState(combinedTasks);
  //   };
  //   func();
  // }, [user, fetchProgress]);

  // async function fetchTasks(controller) {
  //   try {
  //     setIsLoading(true);
  //     setError("");
  //     const url = `http://127.0.0.1:3001/api/v1/daily`;

  //     const res = await fetch(url, { signal: controller.signal });

  //     if (!res.ok) throw new Error("Something went wrong with fetching tasks");

  //     const result = await res.json();
  //     // console.log(result);
  //     const data = result.data.tasks;
  //     console.log(data);
  //     if (data.Response === "False") throw new Error("Stats not found");
  //     return data;
  //   } catch (err) {
  //     if (err.name !== "AbortError") {
  //       console.log(err.message);
  //       setError(err.message);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // async function fetchProgress(controller) {
  //   try {
  //     setIsLoading(true);
  //     setError("");
  //     const url = `http://127.0.0.1:3001/api/v1/progress?year=${year}&month=${month}&day=${day}`;

  //     const res = await fetch(url, { signal: controller.signal });

  //     if (!res.ok)
  //       throw new Error("Something went wrong with fetching progress");

  //     const result = await res.json();
  //     // console.log(result);
  //     const data = result.data.progress;
  //     console.log(data);
  //     if (data.Response === "False") throw new Error("Stats not found");
  //     return data;
  //   } catch (err) {
  //     if (err.name !== "AbortError") {
  //       console.log(err.message);
  //       setError(err.message);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <div className="container">
      {/* <div className="fetchButtonContainer">
        <button className="fetchButton" onClick={clickHandler}>
          Fetch Tasks
        </button>
      </div> */}
      <RemainingTime endTime={endTime} />
      {combinedTasksState.length > 0 && (
        <TaskCards tasks={combinedTasksState} />
      )}
    </div>
  );
};

export default Tasks;

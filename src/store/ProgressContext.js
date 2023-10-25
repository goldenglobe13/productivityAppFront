import { useState } from "react";
import { createContext, useContext } from "react";

const ProgressContext = createContext();

const ProgressProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [combinedTasksState, setCombinedTasksState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function tasksHandler() {
    const controller = new AbortController();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const allTasks = await fetchTasks(controller);
    const allProgress = await fetchProgress(year, month, day, controller);
    const combinedTasks = await allTasks.map((task, i) => {
      let obj = allProgress.find(
        (progress) => progress.activity === task.activity
      );
      if (!obj) {
        return { ...task, duration: 0, level: 0 };
      } else {
        return { ...task, duration: obj.duration, level: obj.level };
      }
    });
    console.log(combinedTasks);
    setCombinedTasksState(combinedTasks);
  }

  async function fetchTasks(controller) {
    try {
      setIsLoading(true);
      setError("");
      // const url = `http://127.0.0.1:3001/api/v1/daily`;
      const url = `https://productivityapp.onrender.com/api/v1/daily`;

      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) throw new Error("Something went wrong with fetching tasks");

      const result = await res.json();
      // console.log(result);
      const data = result.data.tasks;
      console.log(data);
      if (data.Response === "False") throw new Error("Stats not found");
      return data;
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchProgress(year, month, day, controller) {
    try {
      setIsLoading(true);
      setError("");
      // const url = `http://127.0.0.1:3001/api/v1/progress?year=${year}&month=${month}&day=${day}`;
      const url = `https://productivityapp.onrender.com
      /api/v1/progress?year=${year}&month=${month}&day=${day}`;

      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok)
        throw new Error("Something went wrong with fetching progress");

      const result = await res.json();
      // console.log(result);
      const data = result.data.progress;
      console.log(data);
      if (data.Response === "False") throw new Error("Stats not found");
      return data;
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
    <ProgressContext.Provider
      value={{
        user,
        setUser,
        combinedTasksState,
        fetchTasks,
        fetchProgress,
        tasksHandler,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined)
    throw new Error("ProgressContext was used outside ProgressProvider");
  return context;
}

export { ProgressProvider, useProgress };

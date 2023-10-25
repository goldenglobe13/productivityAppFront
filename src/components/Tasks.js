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

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const endTime = new Date(year, month, day + 1, 0, 0);

  const { combinedTasksState } = useProgress();

  return (
    <div className="container">
      <RemainingTime endTime={endTime} />
      {combinedTasksState.length > 0 && (
        <TaskCards tasks={combinedTasksState} />
      )}
    </div>
  );
};

export default Tasks;

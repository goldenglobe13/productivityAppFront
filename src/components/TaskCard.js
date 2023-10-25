import { useState } from "react";
import styles from "./TaskCard.module.css";
import { useRef } from "react";
import { useProgress } from "../store/ProgressContext";

const bgStyleObj = {
  ProgrammingNewConcepts: "rgba(175, 0, 0, 0.9)",
  ProgrammingConsolidating: "rgba(175, 0, 0, 0.7)",
  ProgrammingProject: "rgba(175, 0, 0, 0.5)",
  ProgrammingLeetcode: "rgba(175, 0, 0, 0.3)",
  English: "rgba(200, 88, 147, 0.7)",
  PianoTraining: "rgba(0, 88, 147, 0.9)",
  PianoSightReading: "rgba(0, 88, 147, 0.7)",
  Revit: "rgba(0, 200, 100, 0.7)",
  Economics: "rgba(200, 200, 0, 0.7)",
  Gym: "rgba(200, 200, 200, 0.7)",
};

const TaskCard = ({ activity, levels, duration, level }) => {
  const [time, setTime] = useState(duration);
  const [levelState, setLevelState] = useState(level);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // console.log(time);
  const { user, tasksHandler } = useProgress();
  // console.log(user);

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  const bgColor = bgStyleObj[activity];
  const timeRef = useRef("");

  // console.log(levels);
  // console.log(level);

  function changeHandler(e) {
    e.preventDefault();
    setTime(timeRef.current.value);
    let levelLocal = 0;
    for (let i = 0; i < levels.length; i++) {
      if (timeRef.current.value >= levels[i]) {
        levelLocal = i + 1;
      } else {
        break;
      }
    }
    setLevelState(levelLocal);
  }

  function submitHandler(e) {
    e.preventDefault();
    async function createAndFetch() {
      await createProgress({
        user: user,
        activity: activity,
        duration: +time,
        level: +levelState,
        year: year,
        month: month,
        day: day,
        createdAt: new Date(),
      });
      await tasksHandler();
    }
    createAndFetch();
  }

  async function createProgress(obj) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    try {
      setIsLoading(true);
      setError("");
      const url = `http://127.0.0.1:3001/api/v1/progress`;

      const res = await fetch(url, requestOptions);
      console.log(res);
      if (!res.ok) throw new Error("Something went wrong with fetching tasks");

      const result = await res.json();
      console.log(result);
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
    <>
      <div
        className={styles.taskContainer}
        style={{ backgroundColor: bgColor }}
      >
        <div className={styles.taskTitle}>{activity}</div>
        {levels.map((levelItem, i) => (
          <div
            className={`timeLeftContainer ${
              +duration >= +levelItem && "finished"
            }`}
            key={i}
          >
            <div>{`${levelItem}min`}</div>
          </div>
        ))}

        <div>{duration}</div>
        <form onSubmit={submitHandler}>
          <label htmlFor="time">time (min):</label>
          <input
            type="number"
            id="time"
            name="time"
            min={0}
            defaultValue={duration}
            step={10}
            ref={timeRef}
            onChange={changeHandler}
          />
          <div className="fetchButtonContainer">
            <button className="fetchButton">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskCard;

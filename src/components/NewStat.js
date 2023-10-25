import { useRef } from "react";
import { useState } from "react";
import styles from "./NewStat.module.css";
import { useProgress } from "../store/ProgressContext";

const NewStat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [newStats, setNewStats] = useState({});
  const { user } = useProgress();

  const typeRef = useRef("");
  const chargeRef = useRef("");
  const durationRef = useRef("");

  // console.log(newStats);

  function submitHandler(e) {
    e.preventDefault();
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    console.log(day, month, year);
    const endDates = new Date(
      year,
      month,
      day + +durationRef.current.value,
      0,
      0
    );
    console.log(endDates);
    const endDate = +endDates;
    console.log(endDate);
    const statsObj = {
      user: user,
      type: typeRef.current.value,
      charge: +chargeRef.current.value,
      duration: +durationRef.current.value,
      endDate: +endDate,
      createdAt: new Date(),
    };
    createStats(statsObj);
  }

  async function createStats(obj) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    try {
      setIsLoading(true);
      setError("");
      // const url = `http://127.0.0.1:3001/api/v1/stats`;
      const url = `https://productivityapp.onrender.com/api/v1/stats`;

      const res = await fetch(url, requestOptions);
      console.log(res);
      if (!res.ok) throw new Error("Something went wrong with fetching stats");

      const result = await res.json();
      console.log(result);

      // const answer = data.options[0];
      // let mappedOptions = [];
      // [...data.opsIndex].forEach((item, i) => {
      //   mappedOptions[item - 1] = [...data.options][i];
      // });
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
      <form className={styles.form} onSubmit={submitHandler}>
        <label htmlFor="type-select">type:</label>
        <select name="type" id="type-select" ref={typeRef}>
          <option value="">--Please choose the type--</option>
          <option value="Episodes">Episodes</option>
          <option value="Movies">Movies</option>
          <option value="Games">Games</option>
        </select>
        <label htmlFor="charge">Charge:</label>
        <input
          type="number"
          id="charge"
          name="charge"
          min={20}
          step={20}
          ref={chargeRef}
        />
        <label htmlFor="duration">Duration:</label>
        <input
          type="number"
          id="duration"
          name="duration"
          min={1}
          defaultValue={1}
          step={1}
          ref={durationRef}
        />
        <div className="fetchButtonContainer">
          <button className="fetchButton">Submit</button>
        </div>
      </form>
    </>
  );
};

export default NewStat;

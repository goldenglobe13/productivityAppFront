import { CSSTransition } from "react-transition-group";
import styles from "./DigitalClock.module.css";

import { useEffect, useState } from "react";
import { useProgress } from "../store/ProgressContext";

let defaultTime;

const DigitalClock = () => {
  const nowa = new Date();
  const hoursGenerala = nowa.getHours();
  const minutesa = nowa.getMinutes();
  const secondsa = nowa.getSeconds();

  const { tasksHandler } = useProgress();

  defaultTime = (
    <>
      <div className={styles.twoDa}>{`${
        hoursGenerala < 10 ? "0" : ""
      }${hoursGenerala}`}</div>
      <div className={styles.oneDa}>:</div>
      <div className={styles.twoDa}>{`${
        minutesa < 10 ? "0" : ""
      }${minutesa}`}</div>
      <div className={styles.oneDa}>:</div>
      <div className={styles.twoDa}>{`${
        secondsa < 10 ? "0" : ""
      }${secondsa}`}</div>
    </>
  );

  const [time, setTime] = useState(defaultTime);
  // const isTime = time !== "" ? true : false;
  // console.log(isTime);

  useEffect(() => {
    let x = setInterval(() => {
      const now = new Date();
      const hoursGeneral = now.getHours();
      const hours = now.getHours() <= 12 ? now.getHours() : now.getHours() - 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      if (hoursGeneral === 0 && minutes === 0 && seconds === 0) {
        tasksHandler();
      }

      // const ampm = hours >= 12 ? "AM" : "PM";

      setTime(
        <>
          <div className={styles.twoDa}>{`${
            hoursGeneral < 10 ? "0" : ""
          }${hoursGeneral}`}</div>
          <div className={styles.oneDa}>:</div>
          <div className={styles.twoDa}>{`${
            minutes < 10 ? "0" : ""
          }${minutes}`}</div>
          <div className={styles.oneDa}>:</div>
          <div className={styles.twoDa}>{`${
            seconds < 10 ? "0" : ""
          }${seconds}`}</div>
        </>
      );
    }, 1000);
    return () => clearInterval(x);
  }, [hoursGenerala, minutesa, secondsa]);

  return (
    <>
      <CSSTransition in={true} appear={true} timeout={700} classNames="myClass">
        <div className={styles.timeContainer}>
          <div className={styles.time}>{time}</div>
        </div>
      </CSSTransition>
    </>
  );
};

export default DigitalClock;

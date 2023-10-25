import { CSSTransition } from "react-transition-group";
import styles from "./RemainingTime.module.css";

import { useEffect, useState } from "react";

let defaultTime;

const RemainingTime = ({ endTime }) => {
  // console.log(+endTime);
  const now = Date.now();
  // console.log(now);
  const remaning = +endTime - now;
  // console.log(remaning);

  const days = Math.floor(remaning / (1000 * 60 * 60 * 24));
  // console.log(days);
  const hours = Math.floor(
    (remaning % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaning % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaning % (1000 * 60)) / 1000);
  const cents = Math.floor(remaning % 1000);

  defaultTime = (
    <>
      <div className={styles.days}>{`${days}d`}</div>
      <div className={styles.twoDa}>{`${hours < 10 ? "0" : ""}${hours}`}</div>
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

  const [time, setTime] = useState(defaultTime);
  // const isTime = time !== "" ? true : false;
  // console.log(isTime);

  useEffect(() => {
    if (remaning <= 0) {
      setTime(<div>Times up!</div>);
      return;
    }
    let x = setInterval(() => {
      const hours = Math.floor(
        (remaning % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remaning % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaning % (1000 * 60)) / 1000);

      // const ampm = hours >= 12 ? "AM" : "PM";

      setTime(
        <>
          <div className={styles.twoDa}>{`${days}d`}</div>
          <div className={styles.twoDa}>{`${
            hours < 10 ? "0" : ""
          }${hours}`}</div>
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
  }, [days, hours, minutes, seconds, remaning]);

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

export default RemainingTime;

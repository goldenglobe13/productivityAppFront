import styles from "./RewardCard.module.css";

const RewardCard = ({ title, done, remaining, completed }) => {
  return (
    <>
      <div className={styles.taskContainer}>
        <div className={styles.taskTitle}>{title}</div>
        <div className={styles.taskTitle}>{done}</div>
        <div className={styles.taskTitle}>{remaining}</div>
        {completed && (
          <div className="fetchButtonContainer">
            <button className="fetchButton">Claim Reward!</button>
          </div>
        )}
      </div>
    </>
  );
};

export default RewardCard;

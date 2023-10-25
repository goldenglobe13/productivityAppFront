import "./StatsItem.css";
import RemainingTime from "./RemainingTime";

const bgStyleObj = {
  Episodes: "rgba(175, 0, 0, 0.888)",
  Games: "rgba(0, 88, 147, 0.888)",
  Movies: "Pink",
};

const StatsItem = ({ endTime, allocatedTime, type }) => {
  const bgColor = bgStyleObj[type];

  return (
    <div className="rewardContainer" style={{ backgroundColor: bgColor }}>
      <div className="rewardTitle">{type}</div>
      <div className="timeLeftContainer">
        <div className="timeLeft">{`${allocatedTime}min`}</div>
      </div>
      <RemainingTime endTime={endTime} />
    </div>
  );
};

export default StatsItem;

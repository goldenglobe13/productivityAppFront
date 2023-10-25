import StatsItem from "./StatsItem";

const StatsItems = ({ statsState }) => {
  return (
    <div>
      {statsState.map((item, i) => {
        return (
          <StatsItem
            endTime={new Date(item.endDate)}
            allocatedTime={item.charge}
            type={item.type}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default StatsItems;

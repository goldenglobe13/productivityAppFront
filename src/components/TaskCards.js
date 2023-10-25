import TaskCard from "./TaskCard";

const TaskCards = ({ tasks }) => {
  return (
    <>
      {tasks.length > 0 &&
        tasks.map((item, i) => (
          <TaskCard
            key={i}
            activity={item.activity}
            levels={item.levels}
            duration={item.duration === undefined ? 0 : item.duration}
            level={item.level === undefined ? 0 : item.level}
          />
        ))}
    </>
  );
};

export default TaskCards;

import { useProgress } from "../store/ProgressContext";
import RewardCard from "./RewardCard";

const Rewards = () => {
  const { combinedTasksState } = useProgress();
  console.log(combinedTasksState);
  const [finished, sum] = combinedTasksState.reduce(
    function (acc, cur, i) {
      console.log(`Iteration ${i}: ${acc}`);
      acc[0] = cur.level > 0 ? acc[0] + 1 : acc[0];
      acc[1] += cur.duration;
      return acc;
    },
    [0, 0]
  );
  console.log(finished);
  console.log(sum);
  return (
    <>
      <RewardCard
        title={`All Tasks`}
        done={`${finished}/${combinedTasksState.length}`}
        remaining={`${combinedTasksState.length - finished} Remaining`}
        completed={finished === combinedTasksState.length ? true : false}
      />
      <RewardCard
        title={`All Tasks Duration`}
        done={` ${sum}min/240min`}
        remaining={`${240 - sum}min Remaining`}
        completed={sum >= 240 ? true : false}
      />
    </>
  );
};

export default Rewards;

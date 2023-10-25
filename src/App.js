import "./App.css";
import DigitalClock from "./components/DigitalClock";
import Login from "./components/Login";
import NewStat from "./components/NewStat";
import Rewards from "./components/Rewards";
import Stats from "./components/Stats";
import TaskCard from "./components/TaskCard";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div>
      <Login />
      <DigitalClock />
      <Rewards />
      <Stats />
      <NewStat />
      <Tasks />
      {/* <TaskCard
        type="ProgrammingLeetcode"
        levelsArr={[10, 20, 30, 60]}
        endTime={new Date(2023, 9, 18, 0, 0)}
      />
      <TaskCard
        type="Revit"
        levelsArr={[10, 30, 60, 120]}
        endTime={new Date(2023, 9, 18, 0, 0)}
      />
      <TaskCard
        type="PianoSightReading"
        levelsArr={[10, 20, 30, 60]}
        endTime={new Date(2023, 9, 18, 0, 0)}
      /> */}
      {/* <Tasks /> */}
    </div>
  );
}

export default App;

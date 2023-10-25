import { useProgress } from "../store/ProgressContext";

const Login = () => {
  const { user, setUser, tasksHandler } = useProgress();
  console.log(user);

  const clickHandler = (e) => {
    e.preventDefault();
    setUser("amin");
    tasksHandler();
  };
  return (
    <div className="fetchButtonContainer">
      <button className="fetchButton" onClick={clickHandler}>
        Login
      </button>
    </div>
  );
};

export default Login;

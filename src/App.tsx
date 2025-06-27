import pomodoro from "./assets/pomodoro.jpg";
import "./App.css";
import Timer from "./components/timer";
import TaskList from "./components/TaskList/task-list";

function App() {
  return (
    <>
      <div>
        <img src={pomodoro} className="logo" alt="Pomodoro technique logo" />
      </div>
      <h1>Pomodoro timer</h1>
      <div className="card">
        <div>
          <Timer initialMinutes={0.25} />
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import Task from "../Task/task";
import CreateTask from "../CreateTask/create-task";
import Popup from "../../reusables/Popup/popup";
import styles from "./task-list.module.css";
interface TaskData {
  id: number;
  title: string;
  area: string;
  minutes: number;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleCreateTask = (task: {
    title: string;
    area: string;
    minutes: number;
  }) => {
    const newTask: TaskData = {
      ...task,
      id: Date.now(), // Unique ID based on timestamp
    };
    console.log("Creating task:", newTask);

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>My Tasks</h2>
        <button onClick={() => setShowModal(true)}>＋</button>
      </div>

      <Popup isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateTask onCreate={handleCreateTask} />
      </Popup>

      <p>Total tasks: {tasks.length}</p>

      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          area={task.area}
          timeAlloted={task.minutes}
        />
      ))}
    </div>
  );
};

export default TaskList;
